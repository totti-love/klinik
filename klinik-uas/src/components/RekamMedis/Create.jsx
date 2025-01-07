/* eslint-disable no-unused-vars */
// src/components/Prodi/Create.jsx
import React, { useState, useEffect } from "react"; // Import React dan hooks
import axios from "axios"; // Import axios untuk melakukan HTTP request

export default function CreateRekamMedis() {
  // Inisialisasi state untuk menyimpan nama prodi
  const [kode, setKode] = useState("");
  // Inisialisasi state untuk menyimpan ID fakultas yang dipilih
  const [tanggal, setTanggal] = useState("");
  const [kunjungan_id, setKunjunganId] = useState("");
  const [kunjunganList, setKunjunganList] = useState("");
  const [obat_id, setObatId] = useState("");
  const [obatList, setObatList] = useState("");
  const [error, setError] = useState("");
  // Inisialisasi state untuk menyimpan pesan sukses
  const [success, setSuccess] = useState("");

  // Mengambil daftar kunjungan dari API saat komponen dimuat
  useEffect(() => {
    const fetchKunjungan = async () => {
      try {
        const response = await axios.get(
          "https://project-uas-eight.vercel.app/api/api/kunjungan"
        );
        setKunjunganList(response.data.data); // Simpan data kunjungan ke dalam state
      } catch (error) {
        setError("Failed to fetch kunjungan data");
      }
    };

    fetchKunjungan(); // Panggil fungsi untuk mengambil data fakultas
  }, []); // Kosongkan array dependensi agar hanya dijalankan sekali saat komponen dimuat

  // Mengambil daftar pasien dari API saat komponen dimuat
  useEffect(() => {
    const fetchObat = async () => {
      try {
        const response = await axios.get(
          "https://project-uas-eight.vercel.app/api/api/obat"
        );
        setObatList(response.data.data); // Simpan data dokter ke dalam state
      } catch (error) {
        setError("Failed to fetch obat data");
      }
    };

    fetchObat(); // Panggil fungsi untuk mengambil data fakultas
  }, []);

  // Fungsi yang akan dijalankan saat form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman setelah form disubmit
    setError(""); // Reset pesan error sebelum proses
    setSuccess(""); // Reset pesan sukses sebelum proses

    // Validasi input: jika nama,keahlian,jenisKelamin kosong, set pesan error
    if (kode.trim() === "") {
      setError("Kode are required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }
    if (tanggal.trim() === "") {
      setError("Tanggal Lahir are required"); 
      return; 
    }
 
    try {
      // Melakukan HTTP POST request untuk menyimpan data rekam medis
      const response = await axios.post(
        "https://project-uas-eight.vercel.app/api/api/rekamMedis", // Endpoint API yang dituju
        {
          kode: kode, 
          tanggal: tanggal,
          kunjungan_id: kunjungan_id,
          obat_id: obat_id,
        }
      );

      // Jika response HTTP status 201 (Created), berarti berhasil
      if (response.status === 201) {
        // Tampilkan pesan sukses jika dokter berhasil dibuat
        setSuccess("Data Rekam Medis Berhasil Dibuat!");
        setKode(""); // Kosongkan input form setelah sukses submit
        setTanggal("");
        setKunjunganId("");
        setObatId("");
      } else {
        // Jika tidak berhasil, tampilkan pesan error
        setError("Gagal membuat data rekam medis!");
      }
    } catch (error) {
      // Jika terjadi error (misal masalah jaringan), tampilkan pesan error
      setError("An error occurred while creating rekam medis");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create Data Rekam Medis</h2>
      {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
      {error && <div className="alert alert-danger">{error}</div>}
      {/* Jika ada pesan sukses, tampilkan dalam alert bootstrap */}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        {/* Tangani event submit dengan handleSubmit */}
        <div className="mb-3">
          <label className="form-label">Kode Rekam Medis</label>
          {/* Input untuk nama prodi dengan class bootstrap */}
          <input
            type="text"
            className="form-control"
            id="kode"
            value={kode} // Nilai input disimpan di state namaProdi
            onChange={(e) => setKode(e.target.value)} // Update state saat input berubah
            placeholder="Enter Kode Kunjungan" // Placeholder teks untuk input
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tanggal Rekam Medis</label>
          {/* Input untuk keahlian dengan class bootstrap */}
          <input
            type="date"
            className="form-control"
            id="tanggal"
            value={tanggal} // Nilai input disimpan di state keahlian
            onChange={(e) => setTanggal(e.target.value)} // Update state saat input berubah
            placeholder="Enter Tanggal Rekam Medis " // Placeholder teks untuk input
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Kunjungan</label>
          {/* Dropdown untuk memilih pasien */}
          <select
            className="form-select"
            id="kunjungan_id"
            value={kunjungan_id} // Nilai dropdown disimpan di state pasienId
            onChange={(e) => setKunjunganId(e.target.value)} // Update state saat pilihan berubah
          >
            <option value="">Pilih Kunjungan</option>
            {kunjunganList.map((kunjungan) => (
              <option key={kunjungan_id.id} value={kunjungan_id.id}>
                {/* Set key dan value untuk masing-masing kunjungan */}
                {kunjungan_id.nama} {/* Nama kunjungan sebagai teks di dropdown */}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Obat</label>
          {/* Dropdown untuk memilih pasien */}
          <select
            className="form-select"
            id="obat_id"
            value={obat_id} // Nilai dropdown disimpan di state obatId
            onChange={(e) => setObatId(e.target.value)} // Update state saat pilihan berubah
          >
            <option value="">Pilih Obat</option>
            {obatList.map((obat_id) => (
              <option key={obat_id.id} value={obat_id.id}>
                {/* Set key dan value untuk masing-masing kunjungan */}
                {obat_id.nama} {/* Nama Obat sebagai teks di dropdown */}
              </option>
            ))}
          </select>
        </div>
        {/* Tombol submit dengan class bootstrap */}
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}
