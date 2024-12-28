import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2"; //import SweerAlert2

export default function List() {
  //state pasien
  const [pasien, setPasien] = useState([]);

  useEffect(() => {
    axios.get("https://project-uas-eight.vercel.app/api/api/pasien")
      .then((response) => {
      console.log(response);
      setPasien(response.data.data);
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
          .delete(`https://project-uas-eight.vercel.app/api/api/pasien/${id}`)
          .then((response) => {
            // Hapus dokter dari state setelah sukses dihapus dari server
            setPasien(pasien.filter((f) => f.id !== id));
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
      <h2 className="mt-3 mb-3">List Data Pasien</h2>
      <NavLink to="/pasien/create" className="btn btn-primary mb-3">
        Tambah
      </NavLink>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Tanggal Lahir</th>
            <th>Jenis Kelamin</th>
            <th>Alamat</th>
            <th>No Telp</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {pasien.map((data) => (
            <tr key={data.id}>
              <td>{data.nama}</td>
              <td>{data.tanggal_lahir}</td>
              <td>{data.jenis_kelamin}</td>
              <td>{data.alamat}</td>
              <td>{data.no_telp}</td>
              <td>
                <NavLink
                  to={`/pasien/edit/${data.id}`}
                  className="btn btn-warning"
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
