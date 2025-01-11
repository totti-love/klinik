import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function Home() {
  const chartOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: "Dashboard Statistik Fakultas",
    },
    xAxis: {
      categories: [
        "Laki-Laki",
        "Perempuan",
      ],
      title: {
        text: "Data Pasien",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Jumlah Pasien",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        name: "Jumlah Pasien",
        data: [150, 200], // Data contoh jumlah pasien berdasarkan jenis kelamin
      },
    ],
  };

  return (
    <div className="container">
      <h2 className="text-center mt-5 mb-15 ms-5">
        Selamat Datang Di Aplikasi Klinik Medisfera
      </h2>
      <p className="text-center">Kami siap membantu kebutuhan kesehatan Anda.</p>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
}
