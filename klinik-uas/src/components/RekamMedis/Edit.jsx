/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"; // Mengimpor React, useState, dan useEffect dari library React
import { useParams, useNavigate } from "react-router-dom"; // Mengimpor useParams dan useNavigate dari react-router-dom
import axios from "axios"; // Mengimpor axios untuk melakukan request HTTP

export default function Edit() {
  const { id } = useParams(); // Mengambil parameter "id" dari URL menggunakan useParams
  const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi setelah proses selesai
  const [kode, setKode] = useState(""); // Menginisialisasi state 'nama' untuk menyimpan nama prodi
  const [tanggal, setTanggal] = useState(""); // Menginisialisasi state 'nama' untuk menyimpan nama prodi
  const [kunjungan_id, setKunjunganId] = useState(""); // Menginisialisasi state 'fakultas' untuk menyimpan ID fakultas terpilih
  const [kunjunganList, setKunjunganList] = useState([]); // Menginisialisasi state 'listFakultas' untuk menyimpan daftar fakultas dari API
  const [obat_id, setObatId] = useState("");
  const [obatList, setObatList] = useState([]);
  const [error, setError] = useState(null); // Menginisialisasi state 'error' untuk menyimpan pesan error jika ada

  // Mengambil data rekam medis berdasarkan id ketika komponen pertama kali dimuat
  useEffect(() => {
    // Mengambil data rekam medis berdasarkan ID
    axios
      .get(`https://project-uas-eight.vercel.app/api/api/rekamMedis/${id}`)
      .then((response) => {
        setKode(response.data.kode);
        setTanggal(response.data.tanggal);
        setKunjunganId(response.data.kunjungan_id); 
        setObatId(response.data.obat_id.id); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error); 
        setError("Data tidak ditemukan"); 
      });

    // Mengambil data kunjungan untuk dropdown
    axios
      .get("https://project-uas-eight.vercel.app/api/api/kunjungan") // Request ke API kunjungan
      .then((response) => {
        setKunjunganList(response.data.data); // Menyimpan daftar kunjungan ke dalam state 'listKunjungan'
      })
      .catch((error) => {
        console.error("Error fetching pasien data:", error); // Menangani error jika request gagal
      });
  

    // Mengambil data obat untuk dropdown
    axios
        .get("https://project-uas-eight.vercel.app/api/api/obat") // Request ke API obat
        .then((response) => {
            setObatList(response.data.data); // Menyimpan daftar obat ke dalam state 'listObat'
        })
        .catch((error) => {
            console.error("Error fetching obat data:", error); // Menangani error jika request gagal
        });
    }, [id]);// useEffect akan dijalankan ulang setiap kali 'id' berubah

  // Menghandle perubahan input saat pengguna mengetik di form
  const handleChangeKode = (e) => {
    setKode(e.target.value); // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };

  const handleChangeTanggal = (e) => {
    setTanggal(e.target.value); // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };
  
  // Menghandle perubahan dropdown kunjungan
  const handleFakultasChangeKunjungan = (e) => {
    setKunjunganId(e.target.value); // Mengubah state 'fakultas' sesuai dengan pilihan yang dipilih pengguna di dropdown
  };

  // Menghandle perubahan dropdown obat
  const handleFakultasChangeObat = (e) => {
    setObatId(e.target.value); // Mengubah state 'fakultas' sesuai dengan pilihan yang dipilih pengguna di dropdown
  };

  // Menghandle submit form untuk mengedit data rekam medis
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman saat form disubmit
    axios
      .put(`https://project-uas-eight.vercel.app/api/api/rekamMedis/${id}`, { kode, tanggal,
        kunjungan_id : kunjungan_id, obat_id : obat_id}) // Mengirimkan request PATCH untuk mengupdate data rekam medis berdasarkan ID
      .then((response) => {
        navigate("/rekamMedis"); // Jika update berhasil, navigasi kembali ke halaman list prodi
      })
      .catch((error) => {
        console.error("Error updating data:", error); // Menampilkan error di console jika ada kesalahan
        setError("Gagal mengupdate data"); // Mengubah state 'error' jika terjadi kesalahan dalam proses update
      });
  };

  return (
    <div>
      <h2 className="mt-3 mb-3 ms-3">Edit Data Rekam Medis</h2> {/* Menampilkan judul halaman */}
      {error && <p className="text-danger">{error}</p>} {/* Menampilkan pesan error jika ada */}
      <form onSubmit={handleSubmit}> {/* Form untuk mengedit nama prodi */}
        <div className="mb-3">
          <label htmlFor="kode" className="form-label">
            Kode Rekam Medis
          </label> {/* Label untuk input nama prodi */}
          <input
            type="text" className="form-control" id="kode" value={kode} // Mengisi nilai input dengan state 'nama'
            onChange={handleChangeKode} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <div className="mb-3 ms-3">
          <label htmlFor="tanggal" className="form-label">
            Tanggal Rekam Medis
          </label> {/* Label untuk input nama prodi */}
          <input
            type="date" className="form-control" id="tanggal" value={tanggal} // Mengisi nilai input dengan state 'nama'
            onChange={handleChangeTanggal} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <div className="mb-3 ms-3">
          <label htmlFor="kunjungan" className="form-label">
            Kunjungan Pasien
          </label> {/* Label untuk dropdown pasien */}
          <select
            className="form-select" id="kunjungan_id" value={kunjungan_id} // Mengisi nilai dropdown dengan state 'pasien'
            onChange={handleFakultasChangeKunjungan} // Mengubah nilai dropdown saat pengguna memilih pasien
            required // Dropdown wajib dipilih
          >
            <option value="">Pilih Kunjungan</option> {/* Default option untuk dropdown */}
            {kunjunganList.map(
              // Melakukan mapping dari daftar pasien untuk menampilkan setiap pasien sebagai opsi
              (f) => (
                <option key={f.id} value={f.id}>
                  {f.kode} {/* Menampilkan nama pasien */}
                </option>
              )
            )}
          </select>
        </div>
        <div className="mb-3 ms-3">
          <label htmlFor="obat" className="form-label">
            Nama Obat
          </label> {/* Label untuk dropdown dokter */}
          <select
            className="form-select" id="obat_id" value={obat_id} // Mengisi nilai dropdown dengan state 'dokter'
            onChange={handleFakultasChangeObat} // Mengubah nilai dropdown saat pengguna memilih dokter
            required // Dropdown wajib dipilih
          >
            <option value="">Pilih Obat</option> {/* Default option untuk dropdown */}
            {obatList.map(
              // Melakukan mapping dari daftar dokter untuk menampilkan setiap dokter sebagai opsi
              (f) => (
                <option key={f.id} value={f.id}>
                  {f.nama} {/* Menampilkan nama dokter */}
                </option>
              )
            )}
          </select>
        </div>
        <button type="submit" className="btn btn-secondary ms-3">
          Simpan
        </button>{" "}
        {/* Tombol untuk submit form */}
      </form>
    </div>
  );
}