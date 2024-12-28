/* eslint-disable no-unused-vars */
// src/components/Obat/Create.jsx
import React, { useState } from "react"; // Import React dan useState untuk menggunakan state hooks
import axios from "axios"; // Import axios untuk melakukan HTTP request

export default function CreateObat() {
  // Inisialisasi state untuk menyimpan nama Obat
  const [kode, setKode] = useState("");
  const [namaObat, setNamaObat] = useState("");
  const [jumlah, setJumlah] = useState("");
  // Inisialisasi state untuk menyimpan pesan error
  const [error, setError] = useState("");
  // Inisialisasi state untuk menyimpan pesan sukses
  const [success, setSuccess] = useState("");

  // Fungsi yang akan dijalankan saat form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman setelah form disubmit
    setError(""); // Reset pesan error sebelum proses
    setSuccess(""); // Reset pesan sukses sebelum proses

    // Validasi input: jika namaObat kosong, set pesan error
    if (kode.trim() === "") {
      setError("Kode is required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }

    if (namaObat.trim() === "") {
      setError("Nama Obat is required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }
    if (jumlah.trim() === "") {
      setError("jumlah is required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }

    try {
      // Melakukan HTTP POST request untuk menyimpan data Obat
      const response = await axios.post(
        "https://project-uas-eight.vercel.app/api/api/obat", // Endpoint API yang dituju
        {
          kode: kode, // Data yang dikirim berupa objek JSON dengan properti 'nama'
          nama: namaObat,
          jumlah: jumlah,
        }
      );

      // Jika response HTTP status 201 (Created), berarti berhasil
      if (response.status === 201) {
        // Tampilkan pesan sukses jika Obat berhasil dibuat
        setSuccess("Obat created successfully!");
        setNamaObat(""); // Kosongkan input form setelah sukses submit
        setKode("");
        setJumlah("");
      } else {
        // Jika tidak berhasil, tampilkan pesan error
        setError("Failed to create Obat");
      }
    } catch (error) {
      // Jika terjadi error (misal masalah jaringan), tampilkan pesan error
      setError("An error occurred while creating Obat");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create Obat</h2>
      {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
      {error && <div className="alert alert-danger">{error}</div>}
      {/* Jika ada pesan sukses, tampilkan dalam alert bootstrap */}
      {success && <div className="alert alert-success">{success}</div>}
      {/* Form untuk mengisi nama Obat */}
      <form onSubmit={handleSubmit}>
        {/* Tangani event submit dengan handleSubmit */}
        <div className="mb-3">
          <label className="form-label">Kode Obat</label>
          {/* Input untuk nama Obat dengan class bootstrap */}
          <input
            type="text"
            className="form-control"
            id="kode"
            value={kode} // Nilai input disimpan di state namaObat
            onChange={(e) => setKode(e.target.value)} // Update state saat input berubah
            placeholder="Enter Kode Name" // Placeholder teks untuk input
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nama Obat</label>
          {/* Input untuk nama Obat dengan class bootstrap */}
          <input
            type="text"
            className="form-control"
            id="namaObat"
            value={namaObat} // Nilai input disimpan di state namaObat
            onChange={(e) => setNamaObat(e.target.value)} // Update state saat input berubah
            placeholder="Enter Obat Name" // Placeholder teks untuk input
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Jumlah Obat</label>
          {/* Input untuk nama Obat dengan class bootstrap */}
          <input
            type="text"
            className="form-control"
            id="jumlah"
            value={jumlah} // Nilai input disimpan di state namaObat
            onChange={(e) => setJumlah(e.target.value)} // Update state saat input berubah
            placeholder="Enter jumlah Obat" // Placeholder teks untuk input
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}