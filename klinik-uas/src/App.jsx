import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";

//import ProtectedRoute from "./components/ProtectedRoute"; // ProtectedRoute Component
//import Logout from "./components/Logout";

const Home = React.lazy(() => import("./components/Home"))
const DokterList = React.lazy(() => import("./components/Dokter/List"))
const DokterCreate = React.lazy(() => import("./components/Dokter/Create"))
const DokterEdit = React.lazy(() => import("./components/Dokter/Edit"))
const PasienList = React.lazy(() => import("./components/Pasien/List"))
const PasienCreate = React.lazy(() => import("./components/Pasien/Create"))
const PasienEdit = React.lazy(() => import("./components/Pasien/Edit"))
const ObatList = React.lazy(() => import("./components/Obat/List"))
const ObatCreate = React.lazy(() => import("./components/Obat/Create"))
const ObatEdit = React.lazy(() => import("./components/Obat/Edit"))
const KunjunganList = React.lazy(() => import("./components/Kunjungan/List"))
const KunjunganCreate = React.lazy(() => import("./components/Kunjungan/Create"))
const RekamMedisList = React.lazy(() => import("./components/RekamMedis/List"))
const RekamMedisCreate = React.lazy(() => import("./components/RekamMedis/Create"))
const RekamMedisEdit = React.lazy(() => import("./components/RekamMedis/Edit"))

//const Login = React.lazy(() => import("./components/Login"));

const App = () => {
  //const [token, setToken] = useState(localStorage.getItem("authToken")); // Ambil token dari localStorage

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/dokter" className="nav-link">
                  Dokter
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/pasien" className="nav-link">
                  Pasien
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/kunjungan" className="nav-link">
                  Kunjungan
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/obat" className="nav-link">
                  Obat
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/rekamMedis" className="nav-link">
                  Rekam Medis
                </NavLink>
              </li>
              {/* <li>
                {token ? ( // Tampilkan Logout jika token ada
                  <NavLink className="nav-link" to="/logout">
                    Logout
                  </NavLink>
                ) : (
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                )}
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        {/* <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/logout" element={<Logout />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/dokter" element={<DokterList />} />
        <Route path="/dokter/create" element={<DokterCreate />} />
        <Route path="/dokter/edit/:id" element={<DokterEdit />} />
        <Route path="/pasien" element={<PasienList />} />
        <Route path="/pasien/create" element={<PasienCreate />} />
        <Route path="/pasien/edit/:id" element={<PasienEdit />} />
        <Route path="/kunjungan" element={<KunjunganList />} />
        <Route path="/kunjungan/create" element={<KunjunganCreate />} />
        <Route path="/obat" element={<ObatList />} />
        <Route path="/obat/create" element={<ObatCreate />} />
        <Route path="/obat/edit/:id" element={<ObatEdit />} />
        <Route path="/rekamMedis" element={<RekamMedisList />} />
        <Route path="/rekamMedis/create" element={<RekamMedisCreate />} />
        <Route path="/rekamMedis/edit/:id" element={<RekamMedisEdit />} />
      </Routes>
    </Router>
  );
}
export default App