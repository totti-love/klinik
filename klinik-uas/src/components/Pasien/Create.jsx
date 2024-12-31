/* eslint-disable no-unused-vars */
// src/components/Prodi/Create.jsx
import React, { useState, useEffect } from "react"; // Import React dan hooks
import axios from "axios"; // Import axios untuk melakukan HTTP request

export default function CreateDokter() {
  // Inisialisasi state untuk menyimpan nama prodi
  const [nama, setNama] = useState("");
  // Inisialisasi state untuk menyimpan ID fakultas yang dipilih
  const [tanggal_lahir, setTanggalLahir] = useState("");
  const [jenis_kelamin, setJenisKelamin] = useState("");
  const [alamat, setAlamat] = useState("");
  const [no_telp, setNoTelp] = useState("");
  const [error, setError] = useState("");
  // Inisialisasi state untuk menyimpan pesan sukses
  const [success, setSuccess] = useState("");

  // Fungsi yang akan dijalankan saat form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman setelah form disubmit
    setError(""); // Reset pesan error sebelum proses
    setSuccess(""); // Reset pesan sukses sebelum proses

    // Validasi input: jika nama,keahlian,jenisKelamin kosong, set pesan error
    if (nama.trim() === "") {
      setError("Nama Pasien are required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }
    if (tanggal_lahir.trim() === "") {
      setError("Tanggal Lahir are required"); 
      return; 
    }
    if (jenis_kelamin.trim() === "") {
      setError("Jenis Kelamin are required"); 
      return; 
    }
    if (alamat.trim() === "") {
      setError("Alamat are required"); 
      return; 
    }
    if (no_telp.trim() === "") {
      setError("No Telp are required"); 
      return; 
    }

    try {
      // Melakukan HTTP POST request untuk menyimpan data dokter
      const response = await axios.post(
        "https://project-uas-eight.vercel.app/api/api/pasien", // Endpoint API yang dituju
        {
          nama: nama, // Data nama 
          tanggal_lahir: tanggal_lahir,
          jenis_kelamin: jenis_kelamin,
          alamat: alamat,
          no_telp: no_telp,
        }
      );

      // Jika response HTTP status 201 (Created), berarti berhasil
      if (response.status === 201) {
        // Tampilkan pesan sukses jika dokter berhasil dibuat
        setSuccess("Data Pasien Berhasil Dibuat!");
        setNama(""); // Kosongkan input form setelah sukses submit
        setTanggalLahir("");
        setJenisKelamin("");
        setAlamat("");
        setNoTelp("");
      } else {
        // Jika tidak berhasil, tampilkan pesan error
        setError("Gagal membuat data dokter!");
      }
    } catch (error) {
      // Jika terjadi error (misal masalah jaringan), tampilkan pesan error
      setError("An error occurred while creating dokter");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create Pasien</h2>
      {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
      {error && <div className="alert alert-danger">{error}</div>}
      {/* Jika ada pesan sukses, tampilkan dalam alert bootstrap */}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        {/* Tangani event submit dengan handleSubmit */}
        <div className="mb-3">
          <label className="form-label">Nama Pasien</label>
          {/* Input untuk nama prodi dengan class bootstrap */}
          <input
            type="text"
            className="form-control"
            id="nama"
            value={nama} // Nilai input disimpan di state namaProdi
            onChange={(e) => setNama(e.target.value)} // Update state saat input berubah
            placeholder="Enter Pasien Name" // Placeholder teks untuk input
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tanggal Lahir</label>
          {/* Input untuk keahlian dengan class bootstrap */}
          <input
            type="date"
            className="form-control"
            id="tanggal_lahir"
            value={tanggal_lahir} // Nilai input disimpan di state keahlian
            onChange={(e) => setTanggalLahir(e.target.value)} // Update state saat input berubah
            placeholder="Enter Tanggal Lahir " // Placeholder teks untuk input
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Jenis Kelamin</label>
          {/* Input untuk jenis kelamin dengan class bootstrap */}
          <input
            type="text"
            className="form-control"
            id="jenis_kelamin"
            value={jenis_kelamin} // Nilai input disimpan di state jenisKelamin
            onChange={(e) => setJenisKelamin(e.target.value)} // Update state saat input berubah
            placeholder="Enter Jenis Kelamin" // Placeholder teks untuk input
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Alamat</label>
          {/* Input untuk jenis kelamin dengan class bootstrap */}
          <input
            type="text"
            className="form-control"
            id="alamat"
            value={alamat} // Nilai input disimpan di state jenisKelamin
            onChange={(e) => setAlamat(e.target.value)} // Update state saat input berubah
            placeholder="Enter Alamat" // Placeholder teks untuk input
          />
        </div>
        <div className="mb-3">
          <label className="form-label">No Telepon</label>
          {/* Input untuk jenis kelamin dengan class bootstrap */}
          <input
            type="text"
            className="form-control"
            id="no_telp"
            value={no_telp} // Nilai input disimpan di state jenisKelamin
            onChange={(e) => setNoTelp(e.target.value)} // Update state saat input berubah
            placeholder="Enter No Telp" // Placeholder teks untuk input
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
