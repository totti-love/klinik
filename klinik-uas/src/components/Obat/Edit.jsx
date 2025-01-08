/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";  // Mengimpor React, useState, dan useEffect dari library React
import { useParams, useNavigate } from "react-router-dom";  // Mengimpor useParams dan useNavigate dari react-router-dom untuk menangani parameter dan navigasi
import axios from "axios";  // Mengimpor axios untuk melakukan request HTTP

export default function Edit() {
  const { id } = useParams();  // Mengambil parameter "id" dari URL menggunakan useParams
  const navigate = useNavigate();  // Menggunakan useNavigate untuk navigasi setelah proses selesai
  const [kode, setKode] = useState("");  // Menginisialisasi state 'kode' untuk menyimpan kode fakultas
  const [nama, setNama] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [error, setError] = useState(null);  // Menginisialisasi state 'error' untuk menyimpan pesan error jika ada

  // Mengambil data obat berdasarkan id ketika komponen pertama kali dimuat
  useEffect(() => {
    //mengambil data obat berdasarkan id
    axios
      .get(`https://project-uas-eight.vercel.app/api/api/obat/${id}`)  // Mengirimkan request GET untuk mendapatkan data fakultas berdasarkan ID
      .then((response) => {
        setKode(response.data.kode);  // Jika sukses, mengisi state 'kode' dengan kode fakultas dari response
        setNama(response.data.nama);
        setJumlah(response.data.jumlah);
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Menangani error jika request gagal
        setError("Data tidak ditemukan"); // Menampilkan pesan error jika data tidak ditemukan
      });
  }, [id]);  // useEffect akan dijalankan ulang setiap kali 'id' berubah

  // Menghandle perubahan input saat pengguna mengetik di form
  const handleChangekode = (e) => {
    setKode(e.target.value);  // Mengubah state 'kode' sesuai dengan nilai input yang diisi pengguna
  };

  const handleChangenama = (e) => {
    setNama(e.target.value);
  };

  const handleChangeJumlah = (e) => {
    setJumlah(e.target.value);
  };

  // Menghandle submit form untuk mengedit data fakultas
  const handleSubmit = (e) => {
    e.preventDefault();  // Mencegah reload halaman saat form disubmit
    axios
      .put(`https://project-uas-eight.vercel.app/api/api/obat/${id}`, { kode,nama,jumlah })  // Mengirimkan request PATCH untuk mengupdate data fakultas berdasarkan ID
      .then((response) => {
        navigate("/obat");  // Jika update berhasil, navigasi kembali ke halaman list fakultas
      })
      .catch((error) => {
        console.error("Error updating data:", error);  // Menampilkan error di console jika ada kesalahan
        setError("Gagal mengupdate data");  // Mengubah state 'error' jika terjadi kesalahan dalam proses update
      });
  };

  return (
    <div>
      <h2 className="mt-3 mb-3 ms-3">Edit Data obat</h2>  
      {error && <p className="text-danger">{error}</p>}  {/* Menampilkan pesan error jika ada */}
      <form onSubmit={handleSubmit}>  {/* Form untuk mengedit kode fakultas */}
        <div className="mb-3 ms-3">
          <label htmlFor="kode" className="form-label">kode obat</label>  {/* Label untuk input kode */}
          <input
            type="text"
            className="form-control"
            id="kode"
            value={kode}  // Mengisi nilai input dengan state 'kode'
            onChange={handleChangekode}  // Mengubah nilai input saat ada perubahan (user mengetik)
            required  // Input wajib diisi
          />
        </div>
        <div className="mb-3 ms-3">
          <label htmlFor="nama" className="form-label">nama</label>  {/* Label untuk input kode */}
          <input
            type="text"
            className="form-control"
            id="nama"
            value={nama}  // Mengisi nilai input dengan state 'kode'
            onChange={handleChangenama}  // Mengubah nilai input saat ada perubahan (user mengetik)
            required  // Input wajib diisi
          />
        </div>
        <div className="mb-3 ms-3">
          <label htmlFor="jumlah" className="form-label">Jumlah</label>  {/* Label untuk input kode */}
          <input
            type="text"
            className="form-control"
            id="jumlah"
            value={jumlah}  // Mengisi nilai input dengan state 'kode'
            onChange={handleChangeJumlah}  // Mengubah nilai input saat ada perubahan (user mengetik)
            required  // Input wajib diisi
          />
        </div>
        <button type="submit" className="btn btn-secondarysecondary ms-3">Simpan</button> 
      </form>
    </div>
  );
}
