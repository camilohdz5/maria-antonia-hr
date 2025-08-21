import React from "react";
import styled from "styled-components";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { StarData } from "../types/StarData";
import { starDatabase, getStarColor, getStarSize } from "../data/starDatabase";

const DiagramContainer = styled.div`
  background: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  padding: 2rem;
  border: 2px solid #4a90e2;
  box-shadow: 0 10px 30px rgba(74, 144, 226, 0.2);
`;

const DiagramTitle = styled.h2`
  text-align: center;
  color: #4a90e2;
  margin-bottom: 1rem;
  font-size: 1.8rem;
`;

const XAxisLabel = styled.div`
  text-align: center;
  color: #b3b3b3;
  font-size: 1rem;
  margin-top: 1rem;
`;

const YAxisLabel = styled.div`
  writing-mode: vertical-rl;
  text-orientation: mixed;
  color: #b3b3b3;
  font-size: 1rem;
  margin-right: 1rem;
`;

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #333;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #b3b3b3;
  font-size: 0.9rem;
`;

const LegendColor = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const InfoPanel = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(74, 144, 226, 0.1);
  border-radius: 8px;
  border-left: 4px solid #4a90e2;
`;

const InfoText = styled.p`
  color: #b3b3b3;
  margin: 0.5rem 0;
  font-size: 0.9rem;
  line-height: 1.4;
`;

interface HRDiagramProps {
  onStarClick: (star: StarData) => void;
}

// Tooltip personalizado
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const star = payload[0].payload as StarData;
    return (
      <div
        style={{
          background: "rgba(0, 0, 0, 0.9)",
          border: "1px solid #4a90e2",
          borderRadius: "8px",
          padding: "10px",
          color: "white",
        }}
      >
        <p style={{ margin: "0 0 5px 0", fontWeight: "bold" }}>{star.name}</p>
        <p style={{ margin: "2px 0", fontSize: "0.85rem" }}>
          Clase: {star.spectralClass}
        </p>
        <p style={{ margin: "2px 0", fontSize: "0.85rem" }}>
          Temperatura: {star.temperature.toLocaleString()} K
        </p>
        <p style={{ margin: "2px 0", fontSize: "0.85rem" }}>
          Masa: {star.mass.toFixed(2)} M☉
        </p>
        <p
          style={{ margin: "2px 0 0 0", fontSize: "0.8rem", color: "#4a90e2" }}
        >
          Haz clic para más detalles
        </p>
      </div>
    );
  }
  return null;
};

// Componente para renderizar puntos personalizados
const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  const star = payload as StarData;
  const color = getStarColor(star.temperature);
  const size = getStarSize(star.luminosity);

  return (
    <circle
      cx={cx}
      cy={cy}
      r={size}
      fill={color}
      stroke='#fff'
      strokeWidth={0.5}
      style={{ cursor: "pointer" }}
      onClick={() => props.onStarClick && props.onStarClick(star)}
    />
  );
};

const HRDiagram: React.FC<HRDiagramProps> = ({ onStarClick }) => {
  // Preparar datos para el gráfico
  const chartData = starDatabase.map((star) => ({
    ...star,
    x: star.colorIndex,
    y: star.absoluteMagnitude,
  }));

  const spectralClasses = [
    { class: "O", color: "#9bb0ff", temp: "> 30,000 K" },
    { class: "B", color: "#aabfff", temp: "10,000 - 30,000 K" },
    { class: "A", color: "#cad7ff", temp: "7,500 - 10,000 K" },
    { class: "F", color: "#f8f7ff", temp: "6,000 - 7,500 K" },
    { class: "G", color: "#fff4ea", temp: "5,200 - 6,000 K" },
    { class: "K", color: "#ffcc6f", temp: "3,700 - 5,200 K" },
    { class: "M", color: "#ff6347", temp: "< 3,700 K" },
  ];

  return (
    <DiagramContainer>
      <DiagramTitle>Diagrama de Hertzsprung-Russell</DiagramTitle>

      <div style={{ display: "flex", alignItems: "center" }}>
        <YAxisLabel>Magnitud Absoluta (más brillante ↑)</YAxisLabel>

        <ResponsiveContainer width='100%' height={500}>
          <ScatterChart
            data={chartData}
            margin={{ top: 20, right: 20, bottom: 60, left: 20 }}
          >
            <CartesianGrid strokeDasharray='3 3' stroke='#333' />
            <XAxis
              type='number'
              dataKey='x'
              domain={[-0.5, 2.2]}
              tick={{ fill: "#b3b3b3", fontSize: 12 }}
              tickCount={6}
            />
            <YAxis
              type='number'
              dataKey='y'
              domain={[16, -8]}
              tick={{ fill: "#b3b3b3", fontSize: 12 }}
              tickCount={8}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter
              data={chartData}
              shape={<CustomDot onStarClick={onStarClick} />}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <XAxisLabel>Índice de Color B-V (más azul ← → más rojo)</XAxisLabel>

      <Legend>
        {spectralClasses.map((item) => (
          <LegendItem key={item.class}>
            <LegendColor color={item.color} />
            <span>
              Tipo {item.class}: {item.temp}
            </span>
          </LegendItem>
        ))}
      </Legend>

      <InfoPanel>
        <InfoText>
          <strong>¿Cómo leer este diagrama?</strong>
        </InfoText>
        <InfoText>
          • <strong>Eje X (Índice de Color):</strong> Indica la temperatura de
          la estrella. Valores más bajos = más azul/caliente.
        </InfoText>
        <InfoText>
          • <strong>Eje Y (Magnitud Absoluta):</strong> Indica el brillo
          intrínseco. Valores más bajos = más brillante.
        </InfoText>
        <InfoText>
          • <strong>Secuencia Principal:</strong> La banda diagonal donde están
          la mayoría de estrellas, incluyendo nuestro Sol.
        </InfoText>
        <InfoText>
          • <strong>Gigantes y Supergigantes:</strong> Estrellas grandes y
          brillantes en la parte superior derecha.
        </InfoText>
        <InfoText>
          • <strong>Enanas Blancas:</strong> Estrellas pequeñas y calientes en
          la parte inferior izquierda.
        </InfoText>
        <InfoText>
          <strong>
            Haz clic en cualquier estrella para explorar sus propiedades
            detalladas.
          </strong>
        </InfoText>
      </InfoPanel>
    </DiagramContainer>
  );
};

export default HRDiagram;
