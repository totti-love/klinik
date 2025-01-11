import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function Home() {
  // Data grafik (contoh data, bisa diambil dari props atau API)
  const pasien = [
    { nama: "Kunjungan A", jenis_kelamin: 120 },
    { nama: "Kunjungan B", jenis_kelamin: 150 },
  ];

  // Konfigurasi Highcharts
  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Grafik Kunjungan Pasien Klinik Medisfera 2025",
      align: "left",
    },
    subtitle: {
      text: "Source: Klinik Medisfera App",
      align: "left",
    },
    xAxis: {
      categories: pasien.map((row) => row.jenis_kelamin),
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "1000 metric tons (MT)",
      },
    },
    tooltip: {
      valueSuffix: " (1000 MT)",
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Pasien",
        data: pasien.map((row) => row.jenis_kelamin),
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
