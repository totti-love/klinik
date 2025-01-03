/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"; // Mengimpor React, useState, dan useEffect dari library React
import { useParams, useNavigate } from "react-router-dom"; // Mengimpor useParams dan useNavigate dari react-router-dom
import axios from "axios"; // Mengimpor axios untuk melakukan request HTTP

export default function Edit() {
  const { id } = useParams(); // Mengambil parameter "id" dari URL menggunakan useParams
  const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi setelah proses selesai
  const [kode, setKode] = useState(""); // Menginisialisasi state 'nama' untuk menyimpan nama prodi
  const [tanggal, setTanggal] = useState(""); // Menginisialisasi state 'nama' untuk menyimpan nama prodi
  const [keluhan, setKeluhan] = useState(""); // Menginisialisasi state 'nama' untuk menyimpan nama prodi
  const [pasien_id, setPasienId] = useState(""); // Menginisialisasi state 'fakultas' untuk menyimpan ID fakultas terpilih
  const [pasienList, setPasienList] = useState([]); // Menginisialisasi state 'listFakultas' untuk menyimpan daftar fakultas dari API
  const [dokter_id, setDokterId] = useState("");
  const [dokterList, setDokterList] = useState([]);
  const [error, setError] = useState(null); // Menginisialisasi state 'error' untuk menyimpan pesan error jika ada

  // Mengambil data kunjungan berdasarkan id ketika komponen pertama kali dimuat
  useEffect(() => {
    // Mengambil data kunjungan berdasarkan ID
    axios
      .get(`https://project-uas-eight.vercel.app/api/api/kunjungan/${id}`)
      .then((response) => {
        setKode(response.data.kode);
        setTanggal(response.data.tanggal);
        setKeluhan(response.data.keluhan); // Menyimpan nama prodi ke dalam state 'nama'
        setPasienId(response.data.pasien_id.id); // Menyimpan ID fakultas ke dalam state 'fakultas'
        setDokterId(response.data.dokter_id.id);
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Menangani error jika request gagal
        setError("Data tidak ditemukan"); // Menampilkan pesan error jika data tidak ditemukan
      });

    // Mengambil data pasien untuk dropdown
    axios
      .get("https://project-uas-eight.vercel.app/api/api/pasien") // Request ke API fakultas
      .then((response) => {
        setPasienList(response.data.data); // Menyimpan daftar fakultas ke dalam state 'listFakultas'
      })
      .catch((error) => {
        console.error("Error fetching pasien data:", error); // Menangani error jika request gagal
      });
  

    // Mengambil data dokter untuk dropdown
    axios
        .get("https://project-uas-eight.vercel.app/api/api/dokter") // Request ke API fakultas
        .then((response) => {
            setDokterList(response.data.data); // Menyimpan daftar fakultas ke dalam state 'listFakultas'
        })
        .catch((error) => {
            console.error("Error fetching dokter data:", error); // Menangani error jika request gagal
        });
    }, [id]);// useEffect akan dijalankan ulang setiap kali 'id' berubah

  // Menghandle perubahan input saat pengguna mengetik di form
  const handleChangeKode = (e) => {
    setKode(e.target.value); // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };

  const handleChangeTanggal = (e) => {
    setTanggal(e.target.value); // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };
  const handleChangeKeluhan = (e) => {
    setKeluhan(e.target.value); // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };

  // Menghandle perubahan dropdown fakultas
  const handleFakultasChangePasien = (e) => {
    setPasienId(e.target.value); // Mengubah state 'fakultas' sesuai dengan pilihan yang dipilih pengguna di dropdown
  };

  // Menghandle perubahan dropdown fakultas
  const handleFakultasChangeDokter = (e) => {
    setDokterId(e.target.value); // Mengubah state 'fakultas' sesuai dengan pilihan yang dipilih pengguna di dropdown
  };

  // Menghandle submit form untuk mengedit data kunjungan
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman saat form disubmit
    axios
      .put(`https://project-uas-eight.vercel.app/api/api/kunjungan/${id}`, { kode, tanggal, keluhan,
        pasien_id : pasien, dokter_id : dokter}) // Mengirimkan request PATCH untuk mengupdate data prodi berdasarkan ID
      .then((response) => {
        navigate("/kunjungan"); // Jika update berhasil, navigasi kembali ke halaman list prodi
      })
      .catch((error) => {
        console.error("Error updating data:", error); // Menampilkan error di console jika ada kesalahan
        setError("Gagal mengupdate data"); // Mengubah state 'error' jika terjadi kesalahan dalam proses update
      });
  };

  return (
    <div>
      <h2>Edit Kunjungan Klinik</h2> {/* Menampilkan judul halaman */}
      {error && <p className="text-danger">{error}</p>} {/* Menampilkan pesan error jika ada */}
      <form onSubmit={handleSubmit}> {/* Form untuk mengedit nama prodi */}
        <div className="mb-3">
          <label htmlFor="kode" className="form-label">
            Kode Kunjungan
          </label> {/* Label untuk input nama prodi */}
          <input
            type="text" className="form-control" id="kode" value={kode} // Mengisi nilai input dengan state 'nama'
            onChange={handleChangeKode} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tanggal" className="form-label">
            Tanggal Kunjungan
          </label> {/* Label untuk input nama prodi */}
          <input
            type="date" className="form-control" id="tanggal" value={tanggal} // Mengisi nilai input dengan state 'nama'
            onChange={handleChangeTanggal} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <div className="mb-3">
          <label htmlFor="keluhan" className="form-label">
            Keluhan Pasien
          </label> {/* Label untuk input nama prodi */}
          <input
            type="text" className="form-control" id="keluhan" value={keluhan} // Mengisi nilai input dengan state 'nama'
            onChange={handleChangeKeluhan} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pasien" className="form-label">
            Nama Pasien
          </label> {/* Label untuk dropdown pasien */}
          <select
            className="form-select" id="pasien_id" value={pasien_id} // Mengisi nilai dropdown dengan state 'pasien'
            onChange={handleFakultasChangePasien} // Mengubah nilai dropdown saat pengguna memilih pasien
            required // Dropdown wajib dipilih
          >
            <option value="">Pilih Pasien</option> {/* Default option untuk dropdown */}
            {pasienList.map(
              // Melakukan mapping dari daftar pasien untuk menampilkan setiap pasien sebagai opsi
              (f) => (
                <option key={f.id} value={f.id}>
                  {f.nama} {/* Menampilkan nama pasien */}
                </option>
              )
            )}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="dokter" className="form-label">
            Nama Dokter
          </label> {/* Label untuk dropdown dokter */}
          <select
            className="form-select" id="dokter_id" value={dokter_id} // Mengisi nilai dropdown dengan state 'dokter'
            onChange={handleFakultasChangeDokter} // Mengubah nilai dropdown saat pengguna memilih dokter
            required // Dropdown wajib dipilih
          >
            <option value="">Pilih Dokter</option> {/* Default option untuk dropdown */}
            {dokterList.map(
              // Melakukan mapping dari daftar dokter untuk menampilkan setiap dokter sebagai opsi
              (f) => (
                <option key={f.id} value={f.id}>
                  {f.nama} {/* Menampilkan nama dokter */}
                </option>
              )
            )}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Simpan
        </button>{" "}
        {/* Tombol untuk submit form */}
      </form>
    </div>
  );
}