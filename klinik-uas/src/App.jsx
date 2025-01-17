import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import Loader from "./components/Loader"; // Loader Component
import ProtectedRoute from "./components/ProtectedRoute"; // ProtectedRoute Component
import Logout from "./components/Logout";

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
const KunjunganEdit = React.lazy(() => import("./components/Kunjungan/Edit"))
const Login = React.lazy(() => import("./components/Login"));

const App = () => {
const [token, setToken] = useState(localStorage.getItem("authToken")); // Ambil token dari localStorage

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">
            <img src="medical-cross.png" alt="Brand Logo" style={{ height: '40px' }} />
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
            <li>
                {token ? ( // Tampilkan Logout jika token ada
                  <NavLink className="nav-link" to="/logout">
                    Logout
                  </NavLink>
                ) : (
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                )}
              </li> 
              <li className="nav-item">
                <NavLink to="/home" className="nav-link">
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
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <Suspense fallback={<Loader />}>
          {/* Suspense untuk fallback saat loading */}
      <Routes>
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} /> {/* Route ke halaman Home */}
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} /> 
        <Route path="/dokter" element={<ProtectedRoute><DokterList /></ProtectedRoute>} />
        <Route path="/dokter/create" element={<ProtectedRoute><DokterCreate /></ProtectedRoute>} />
        <Route path="/dokter/edit/:id" element={<ProtectedRoute> <DokterEdit /></ProtectedRoute>} />
        <Route path="/pasien" element={<ProtectedRoute><PasienList /></ProtectedRoute>} />
        <Route path="/pasien/create" element={<ProtectedRoute><PasienCreate /></ProtectedRoute>} />
        <Route path="/pasien/edit/:id" element={<ProtectedRoute><PasienEdit /></ProtectedRoute>} />
        <Route path="/kunjungan" element={<ProtectedRoute><KunjunganList /></ProtectedRoute>} />
        <Route path="/kunjungan/create" element={<ProtectedRoute><KunjunganCreate /></ProtectedRoute>} />
        <Route path="/kunjungan/edit/:id" element={<ProtectedRoute><KunjunganEdit /></ProtectedRoute>} />
        <Route path="/obat" element={<ProtectedRoute><ObatList /></ProtectedRoute>} />
        <Route path="/obat/create" element={<ProtectedRoute><ObatCreate /></ProtectedRoute>} />
        <Route path="/obat/edit/:id" element={<ProtectedRoute><ObatEdit /></ProtectedRoute>} />
      </Routes>
      </Suspense>


      </div>
    </Router>
  );
}
export default App