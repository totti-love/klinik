import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2"; //import SweerAlert2

export default function List() {
  //state dokter
  const [dokter, setDokter] = useState([]);

  useEffect(() => {
    axios.get("https://project-uas-eight.vercel.app/api/api/dokter")
      .then((response) => {
      console.log(response);
      setDokter(response.data.data);
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
          .delete(`https://project-uas-eight.vercel.app/api/api/dokter/${id}`)
          .then((response) => {
            // Hapus dokter dari state setelah sukses dihapus dari server
            setDokter(dokter.filter((f) => f.id !== id));
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
      <h2 className="mt-3 mb-3 ms-3">List Data Dokter</h2>
      <NavLink to="/dokter/create" className="btn btn-success mb-3 ms-3">
        + Tambah
      </NavLink>

      <table className="table mt-3">
        <thead>
          <tr className="text-center">
            <th>Nama</th>
            <th>Keahlian</th>
            <th>Jenis Kelamin</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dokter.map((data) => (
            <tr className="text-center" key={data.id}>
              <td>{data.nama}</td>
              <td>{data.keahlian}</td>
              <td>{data.jenis_kelamin}</td>
              <td>
                <NavLink
                  to={`/dokter/edit/${data.id}`}
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
