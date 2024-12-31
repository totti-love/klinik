/* eslint-disable no-unused-vars */
// src/components/Prodi/Create.jsx
import React, { useState, useEffect } from "react"; // Import React dan hooks
import axios from "axios"; // Import axios untuk melakukan HTTP request

export default function CreateKunjungan() {
  // Inisialisasi state untuk menyimpan nama prodi
  const [kode, setKode] = useState("");
  // Inisialisasi state untuk menyimpan ID fakultas yang dipilih
  const [tanggal, setTanggal] = useState("");
  const [keluhan, setKeluhan] = useState("");
  const [pasien_id, setPasien] = useState("");
  const [dokter_id, setDokter] = useState("");
  const [error, setError] = useState("");
  // Inisialisasi state untuk menyimpan pesan sukses
  const [success, setSuccess] = useState("");

  // Fungsi yang akan dijalankan saat form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman setelah form disubmit
    setError(""); // Reset pesan error sebelum proses
    setSuccess(""); // Reset pesan sukses sebelum proses

    // Validasi input: jika nama,keahlian,jenisKelamin kosong, set pesan error
    if (kode.trim() === "") {
      setError("Nama Pasien are required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }
    if (tanggal.trim() === "") {
      setError("Tanggal Lahir are required"); 
      return; 
    }
    if (keluhan.trim() === "") {
      setError("Jenis Kelamin are required"); 
      return; 
    }
    if (pasien_id.trim() === "") {
      setError("Alamat are required"); 
      return; 
    }
    if (dokter_id.trim() === "") {
      setError("No Telp are required"); 
      return; 
    }

    try {
      // Melakukan HTTP POST request untuk menyimpan data dokter
      const response = await axios.post(
        "https://project-uas-eight.vercel.app/api/api/kunjungan", // Endpoint API yang dituju
        {
          kode: kode, // Data nama 
          tanggal: tanggal,
          keluhan: keluhan,
          pasien_id: pasien_id,
          dokter_id: dokter_id,
        }
      );

      // Jika response HTTP status 201 (Created), berarti berhasil
      if (response.status === 201) {
        // Tampilkan pesan sukses jika dokter berhasil dibuat
        setSuccess("Data Kunjungan Berhasil Dibuat!");
        setKode(""); // Kosongkan input form setelah sukses submit
        setTanggal("");
        setKeluhan("");
        setPasien("");
        setDokter("");
      } else {
        // Jika tidak berhasil, tampilkan pesan error
        setError("Gagal membuat data kunjungan!");
      }
    } catch (error) {
      // Jika terjadi error (misal masalah jaringan), tampilkan pesan error
      setError("An error occurred while creating dokter");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create Kunjungan</h2>
      {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
      {error && <div className="alert alert-danger">{error}</div>}
      {/* Jika ada pesan sukses, tampilkan dalam alert bootstrap */}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        {/* Tangani event submit dengan handleSubmit */}
        <div className="mb-3">
          <label className="form-label">Kode Kunjungan</label>
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
          <label className="form-label">Tanggal Kunjungan</label>
          {/* Input untuk keahlian dengan class bootstrap */}
          <input
            type="date"
            className="form-control"
            id="tanggal"
            value={tanggal} // Nilai input disimpan di state keahlian
            onChange={(e) => setTanggal(e.target.value)} // Update state saat input berubah
            placeholder="Enter Tanggal Kunjungan " // Placeholder teks untuk input
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Keluhan</label>
          {/* Input untuk jenis kelamin dengan class bootstrap */}
          <input
            type="text"
            className="form-control"
            id="keluhan"
            value={keluhan} // Nilai input disimpan di state jenisKelamin
            onChange={(e) => setKeluhan(e.target.value)} // Update state saat input berubah
            placeholder="Enter Keluhan" // Placeholder teks untuk input
          />
        </div>
        
        {/* Tombol submit dengan class bootstrap */}
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}
