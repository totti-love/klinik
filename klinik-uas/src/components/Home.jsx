import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function Home() {
  // Data grafik
  const pasien = [
    { jenis_kelamin: "Laki-laki", jumlah: 120 },
    { jenis_kelamin: "Perempuan", jumlah: 150 },
  ];

  // Konfigurasi Highcharts
  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Grafik Kunjungan Pasien Berdasarkan Jenis Kelamin - 2025",
      align: "left",
    },
    subtitle: {
      text: "Source: Klinik Medisfera App",
      align: "left",
    },
    xAxis: {
      categories: pasien.map((row) => row.jenis_kelamin), // Kategori berdasarkan jenis kelamin
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Jumlah Pasien",
      },
    },
    tooltip: {
      valueSuffix: " pasien",
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Jenis Kelamin",
        data: pasien.map((row) => row.jumlah), // Data jumlah pasien
      },
    ],
  };

  return (
    <div className="container">
      <h2 className="text-center mt-5 mb-15 ms-5">
        Selamat Datang Di Aplikasi Klinik Medisfera
      </h2>
      <p className="text-center">Kami siap membantu kebutuhan kesehatan Anda.</p>

      {/* Grafik Highcharts */}
      <div className="mt-5">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
}
