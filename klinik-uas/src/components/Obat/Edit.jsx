/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"; // Mengimpor React, useState, dan useEffect dari library React
import { useParams, useNavigate } from "react-router-dom"; // Mengimpor useParams dan useNavigate dari react-router-dom untuk menangani parameter dan navigasi
import axios from "axios"; // Mengimpor axios untuk melakukan request HTTP

export default function Edit() {
  const { id } = useParams(); // Mengambil parameter "id" dari URL menggunakan useParams
  const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi setelah proses selesai
  const [kode, setKode] = useState("");
  const [nama, setNama] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [error, setError] = useState(null); // Menginisialisasi state 'error' untuk menyimpan pesan error jika ada

  // Mengambil data obat berdasarkan id ketika komponen pertama kali dimuat
  useEffect(() => {
    axios
      .get(`https://project-uas-eight.vercel.app/api/api/obat/${id}`) // Mengirimkan request GET untuk mendapatkan data obat berdasarkan ID
      .then((response) => {
        setKode(response.data.kode); // Jika sukses, mengisi state 'nama' dengan nama obat dari response
        setNama(response.data.nama);
        setJumlah(response.data.jumlah);
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Menampilkan pesan error di console jika request gagal
        setError("Data tidak ditemukan"); // Menampilkan pesan error jika data tidak ditemukan
      });
  }, [id]); // useEffect akan dijalankan ulang setiap kali 'id' berubah

  // Menghandle perubahan input saat pengguna mengetik di form
  const handleChangeKode = (e) => {
    setKode(e.target.value); // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };
  const handleChangeNama = (e) => {
    setNama(e.target.value); // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };
  const handleChangeJumlah = (e) => {
    setJumlah(e.target.value); // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };

  // Menghandle submit form untuk mengedit data fakultas
  const handleSubmit = (e) => {
    e.preventDefault();  // Mencegah reload halaman saat form disubmit
    axios
      .put(`https://project-uas-eight.vercel.app/api/api/obat/${id}`, {kode,nama,jumlah})  // Mengirimkan request PATCH untuk mengupdate data fakultas berdasarkan ID
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
      <h2>Edit obat</h2> {/* Menampilkan judul halaman */}
      {error && <p className="text-danger">{error}</p>}{" "}
      {/* Menampilkan pesan error jika ada */}
      <form onSubmit={handleSubmit}>
        {" "}
        {/* Form untuk mengedit nama obat */}
        <div className="mb-3">
          <label htmlFor="kode" className="form-label">
            Kode Obat
          </label>{" "}
          {/* Label untuk input nama */}
          <input
            type="text"
            className="form-control"
            id="kode"
            value={kode} // Mengisi nilai input dengan state 'nama'
            onChange={handleChangeKode} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">
            Nama Obat
          </label>{" "}
          {/* Label untuk input nama */}
          <input
            type="text"
            className="form-control"
            id="nama"
            value={nama} // Mengisi nilai input dengan state 'nama'
            onChange={handleChangeNama} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <div className="mb-3">
          <label htmlFor="jumlah" className="form-label">
            Jumlah Obat
          </label>{" "}
          {/* Label untuk input nama */}
          <input
            type="number"
            className="form-control"
            id="jumlah"
            value={jumlah} // Mengisi nilai input dengan state 'nama'
            onChange={handleChangeJumlah} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>{" "}
        {/* Tombol untuk submit form */}
      </form>
    </div>
  );
}