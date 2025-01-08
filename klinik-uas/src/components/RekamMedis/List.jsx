import React, { useEffect, useState } from "react"
import axios from "axios"
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function List() {
    const [rekamMedis, setRekamMedis] = useState([]);
    useEffect(() => {
        axios
            .get("https://project-uas-eight.vercel.app/api/api/rekamMedis")
            .then((response) => {
                console.log(response)
                setRekamMedis(response.data.data)
            })
    }, [])
    const handleDelete = (id, nama) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this! Rekam Medis: ${nama}",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          // Lakukan penghapusan jika dikonfirmasi
          axios
            .delete(`https://project-uas-eight.vercel.app/api/api/rekamMedis/${id}`)
            .then((response) => {
              // Hapus fakultas dari state setelah sukses dihapus dari server
              setRekamMedis(rekamMedis.filter((f) => f.id !== id));
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
        <h2 className="mt-3 mb-3 ms-3">List Rekam Medis</h2>
                <NavLink to="/rekamMedis/create" className="btn btn-primary mb-3 ms-3">
                  Tambah
                </NavLink>

        <table className="table mt-3">
          <thead>
            <tr className="text-center font-weight-bolder opacity-5 bg-success text-white p-3">
              <th >Kode</th>
              <th>Tanggal</th>
              <th>Kunjungan</th>
              <th>Obat</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rekamMedis.map((data) => (
              <tr className="text-center" key={data.id}>
                <td>{data.kode}</td>
                <td>{data.tanggal}</td>
                <td>{data.kunjungan.kode}</td>
                <td>{data.obat.nama}</td>
                <td>
                  <NavLink
                  to={`/rekamMedis/edit/${data.id}`}
                  className="btn btn-warning me-2"
                >
                  Edit
                </NavLink>
                  <button
                    onClick={()=> handleDelete(data.id,data.obat.nama)}
                    className="btn btn-danger">Hapus
                  </button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }