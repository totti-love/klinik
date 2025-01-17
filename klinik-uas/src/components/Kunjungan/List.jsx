import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2"; //import SweerAlert2

export default function List() {
  //state pasien
  const [kunjungan, setKunjungan] = useState([]);

  useEffect(() => {
    axios.get("https://project-uas-eight.vercel.app/api/api/kunjungan")
      .then((response) => {
      setKunjungan(response.data.data);
    });
  }, []);

  const handleDelete = (id, nama) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this! dokter: ${nama}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Lakukan penghapusan jika dikonfirmasi
        axios
          .delete(`https://project-uas-eight.vercel.app/api/api/kunjungan/${id}`)
          .then((response) => {
            // Hapus dokter dari state setelah sukses dihapus dari server
            setKunjungan(kunjungan.filter((f) => f.id !== id));
            // Tampilkan notifikasi sukses
            Swal.fire("Deleted!", "Your data has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting data:", error); // Menangani error
            Swal.fire(
              "Error",
              "There was an issue deleting the data.",
              "error"
            );
          });
      }
    });
  };

  return (
    <>
      <h2 className="mt-3 mb-3 ms-3">List Data Kunjungan</h2>
      <NavLink to="/kunjungan/create" className="btn btn-success mb-3 ms-3">
        + Tambah
      </NavLink>

      <table className="table mt-3">
        <thead>
          <tr className="text-center">
            <th>Kode</th>
            <th>Tanggal Kunjungan</th>
            <th>Keluhan</th>
            <th>Pasien</th>
            <th>Dokter</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {kunjungan.map((data) => (
            <tr className="text-center" key={data.id}>
              <td>{data.kode}</td>
              <td>{data.tanggal}</td>
              <td>{data.keluhan}</td>
              <td>{data.pasien.nama}</td>
              <td>{data.dokter.nama}</td>
              <td>
                <NavLink
                  to={`/kunjungan/edit/${data.id}`}
                  className="btn btn-warning me-2"
                >
                  Edit
                </NavLink>
                <button
                  onClick={() => handleDelete(data.id, data.nama)}
                  className="btn btn-danger"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
