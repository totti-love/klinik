import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2"; //import SweerAlert2
export default function List() {
  //state obat
  const [obat, setObat] = useState([]);

  useEffect(() => {
    axios
      .get("https://project-uas-eight.vercel.app/api/api/obat")
      .then((response) => {
        console.log(response);
        setObat(response.data.data);
      });
  }, []);

  const handleDelete = (id, nama) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this! obat: ${nama}",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Lakukan penghapusan jika dikonfirmasi
        axios
          .delete(`https://project-uas-eight.vercel.app/api/api/obat/${id}`)
          .then((response) => {
            // Hapus obat dari state setelah sukses dihapus dari server
            setObat(obat.filter((o) => o.id !== id));
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
      <h2 className="mt-3 mb-3">List Data obat</h2>
      <NavLink to="/obat/create" className="btn btn-primary mb-3">
        Tambah
      </NavLink>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Kode Obat</th>
            <th>Nama Obat</th>
            <th>Jumlah</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {obat.map((data) => (
            <tr key={data.id}>
              <td>{data.kode}</td>
              <td>{data.nama}</td>
              <td>{data.jumlah}</td>
              <td>
                <NavLink
                  to={`/obat/edit/${data.id}`}
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