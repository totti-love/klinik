/* eslint-disable no-unused-vars */
// src/components/Prodi/Create.jsx
import React, { useState, useEffect } from "react"; // Import React dan hooks
import axios from "axios"; // Import axios untuk melakukan HTTP request

export default function CreateDokter() {
  // Inisialisasi state untuk menyimpan nama prodi
  const [nama, setNama] = useState("");
  // Inisialisasi state untuk menyimpan ID fakultas yang dipilih
  const [keahlian, setKeahlian] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
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
      setError("Nama Dokter are required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }
    if (keahlian.trim() === "") {
      setError("Keahlian are required"); 
      return; 
    }
    if (jenisKelamin.trim() === "") {
      setError("Jenis Kelamin are required"); 
      return; 
    }

    try {
      // Melakukan HTTP POST request untuk menyimpan data dokter
      const response = await axios.post(
        "https://project-uas-eight.vercel.app/api/api/dokter", // Endpoint API yang dituju
        {
          nama: nama, // Data nama 
          keahlian: keahlian,
          jenisKelamin: jenisKelamin,
        }
      );

      // Jika response HTTP status 201 (Created), berarti berhasil
      if (response.status === 201) {
        // Tampilkan pesan sukses jika dokter berhasil dibuat
        setSuccess("Data Dokter Berhasil Dibuat!");
        setNama(""); // Kosongkan input form setelah sukses submit
        setKeahlian("");
        setJenisKelamin("");
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
      <h2 className="mb-4">Create Dokter</h2>
      {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
      {error && <div className="alert alert-danger">{error}</div>}
      {/* Jika ada pesan sukses, tampilkan dalam alert bootstrap */}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        {/* Tangani event submit dengan handleSubmit */}
        <div className="mb-3">
          <label className="form-label">Nama Dokter</label>
          {/* Input untuk nama prodi dengan class bootstrap */}
          <input
            type="text"
            className="form-control"
            id="nama"
            value={nama} // Nilai input disimpan di state namaProdi
            onChange={(e) => setNama(e.target.value)} // Update state saat input berubah
            placeholder="Enter Dokter Name" // Placeholder teks untuk input
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Keahlian</label>
          {/* Input untuk keahlian dengan class bootstrap */}
          <input
            type="text"
            className="form-control"
            id="keahlian"
            value={keahlian} // Nilai input disimpan di state keahlian
            onChange={(e) => setKeahlian(e.target.value)} // Update state saat input berubah
            placeholder="Enter Keahlian Name" // Placeholder teks untuk input
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Jenis Kelamin</label>
          {/* Input untuk jenis kelamin dengan class bootstrap */}
          <input
            type="text"
            className="form-control"
            id="jenisKelamin"
            value={jenisKelamin} // Nilai input disimpan di state jenisKelamin
            onChange={(e) => setJenisKelamin(e.target.value)} // Update state saat input berubah
            placeholder="Enter Jenis Kelamin" // Placeholder teks untuk input
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
