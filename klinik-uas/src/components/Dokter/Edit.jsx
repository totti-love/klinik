/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";  // Mengimpor React, useState, dan useEffect dari library React
import { useParams, useNavigate } from "react-router-dom";  // Mengimpor useParams dan useNavigate dari react-router-dom untuk menangani parameter dan navigasi
import axios from "axios";  // Mengimpor axios untuk melakukan request HTTP

export default function Edit() {
  const { id } = useParams();  // Mengambil parameter "id" dari URL menggunakan useParams
  const navigate = useNavigate();  // Menggunakan useNavigate untuk navigasi setelah proses selesai
  const [nama, setNama] = useState("");  // Menginisialisasi state 'nama' untuk menyimpan nama fakultas
  const [keahlian, setKeahlian] = useState("");
  const [jenis_kelamin, setJenisKelamin] = useState("");
  const [error, setError] = useState(null);  // Menginisialisasi state 'error' untuk menyimpan pesan error jika ada

  // Mengambil data dokter berdasarkan id ketika komponen pertama kali dimuat
  useEffect(() => {
    //mengambil data dokter berdasarkan id
    axios
      .get(`https://project-uas-eight.vercel.app/api/api/dokter/${id}`)  // Mengirimkan request GET untuk mendapatkan data fakultas berdasarkan ID
      .then((response) => {
        setNama(response.data.nama);  // Jika sukses, mengisi state 'nama' dengan nama fakultas dari response
        setKeahlian(response.data.keahlian);
        setJenisKelamin(response.data.jenis_kelamin);
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Menangani error jika request gagal
        setError("Data tidak ditemukan"); // Menampilkan pesan error jika data tidak ditemukan
      });
  }, [id]);  // useEffect akan dijalankan ulang setiap kali 'id' berubah

  // Menghandle perubahan input saat pengguna mengetik di form
  const handleChangeNama = (e) => {
    setNama(e.target.value);  // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };

  const handleChangeKeahlian = (e) => {
    setKeahlian(e.target.value);
  };

  const handleChangeJenisKelamin = (e) => {
    setJenisKelamin(e.target.value);
  };

  // Menghandle submit form untuk mengedit data fakultas
  const handleSubmit = (e) => {
    e.preventDefault();  // Mencegah reload halaman saat form disubmit
    axios
      .put(`https://project-uas-eight.vercel.app/api/api/dokter/${id}`, { nama,keahlian,jenis_kelamin })  // Mengirimkan request PATCH untuk mengupdate data fakultas berdasarkan ID
      .then((response) => {
        navigate("/dokter");  // Jika update berhasil, navigasi kembali ke halaman list fakultas
      })
      .catch((error) => {
        console.error("Error updating data:", error);  // Menampilkan error di console jika ada kesalahan
        setError("Gagal mengupdate data");  // Mengubah state 'error' jika terjadi kesalahan dalam proses update
      });
  };

  return (
    <div>
      <h2>Edit Data Dokter</h2>  
      {error && <p className="text-danger">{error}</p>}  {/* Menampilkan pesan error jika ada */}
      <form onSubmit={handleSubmit}>  {/* Form untuk mengedit nama fakultas */}
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">Nama Dokter</label>  {/* Label untuk input nama */}
          <input
            type="text"
            className="form-control"
            id="nama"
            value={nama}  // Mengisi nilai input dengan state 'nama'
            onChange={handleChangeNama}  // Mengubah nilai input saat ada perubahan (user mengetik)
            required  // Input wajib diisi
          />
        </div>
        <div className="mb-3">
          <label htmlFor="keahlian" className="form-label">Keahlian</label>  {/* Label untuk input nama */}
          <input
            type="text"
            className="form-control"
            id="keahlian"
            value={keahlian}  // Mengisi nilai input dengan state 'nama'
            onChange={handleChangeKeahlian}  // Mengubah nilai input saat ada perubahan (user mengetik)
            required  // Input wajib diisi
          />
        </div>
        <div className="mb-3">
          <label htmlFor="jenis_kelamin" className="form-label">Jenis Kelamin</label>  {/* Label untuk input nama */}
          <input
            type="text"
            className="form-control"
            id="jenis_kelamin"
            value={jenis_kelamin}  // Mengisi nilai input dengan state 'nama'
            onChange={handleChangeJenisKelamin}  // Mengubah nilai input saat ada perubahan (user mengetik)
            required  // Input wajib diisi
          />
        </div>
        <button type="submit" className="btn btn-primary">Simpan</button> 
      </form>
    </div>
  );
}
