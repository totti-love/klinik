import React, { useState, useEffect } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function Home() {
  const [chartData, setChartData] = useState([]); // State untuk menyimpan data jumlah pasien
  const [loading, setLoading] = useState(true); // State untuk loading indikator

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://project-uas-eight.vercel.app/api/api/pasien");
        console.log(response.data); // Debugging untuk memeriksa respons API
        const data = Array.isArray(response.data.data) ? response.data.data : []; // Pastikan respons memiliki properti data yang berupa array
  
        const maleCount = data.filter((item) => item.jenis_kelamin === "L").length;
        const femaleCount = data.filter((item) => item.jenis_kelamin === "P").length;
  
        setChartData([maleCount, femaleCount]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  const chartOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: "Statistik Jenis Pasien",
    },
    xAxis: {
      categories: ["Laki-Laki", "Perempuan"], // Menggunakan kategori Laki-Laki dan Perempuan
      title: {
        text: "Jenis Kelamin",
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
        data: chartData, // Data jumlah pasien berdasarkan jenis kelamin
      },
    ],
  };

  if (loading) {
    return <div>Loading...</div>; // Tampilan loading saat data belum selesai diambil
  }

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
