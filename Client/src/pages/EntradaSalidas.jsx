import { useEffect } from "react";
import Chart from "chart.js/auto";
import "../styles/EntradaSalida.css";

export default function EntradasSalidas() {
  useEffect(() => {
    // 📊 Gráfica de Gastos Mensuales
    const ctxGastos = document.getElementById("graficaGastos");
    new Chart(ctxGastos, {
      type: "bar",
      data: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
        datasets: [
          {
            label: "Gastos",
            data: [500, 700, 400, 900, 600],
            backgroundColor: "#1089d3",
          },
        ],
      },
    });

    // 📊 Gráfica Entradas vs Salidas
    const ctxEntradasSalidas = document.getElementById("graficaEntradasSalidas");
    new Chart(ctxEntradasSalidas, {
      type: "pie",
      data: {
        labels: ["Entradas", "Salidas"],
        datasets: [
          {
            data: [3000, 1800],
            backgroundColor: ["#12b1d1", "#f87171"],
          },
        ],
      },
    });
  }, []);

  return (
    <div className="container">
      <h2>Entradas y Salidas</h2>

      {/* Botón regresar */}
      <div className="back-section">
        <a href="/dashboard" className="back-btn">← Regresar al Dashboard</a>
      </div>

      <section className="grafica-section">
        <div className="grafica-box">
          <h3>Gastos Mensuales</h3>
          <canvas id="graficaGastos"></canvas>
        </div>
        <div className="grafica-box">
          <h3>Entradas vs Salidas</h3>
          <canvas id="graficaEntradasSalidas"></canvas>
        </div>
      </section>
    </div>
  );
}
