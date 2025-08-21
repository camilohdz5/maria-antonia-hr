import React from "react";
import styled, { keyframes } from "styled-components";
import type { StarData } from "../types/StarData";
import { getStarColor } from "../data/starDatabase";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { 
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to { 
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 15px;
  border: 2px solid #4a90e2;
  box-shadow: 0 20px 60px rgba(74, 144, 226, 0.3);
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${slideIn} 0.3s ease-out;
  position: relative;
`;

const ModalHeader = styled.div<{ starColor: string }>`
  background: linear-gradient(
    135deg,
    ${(props) => props.starColor}20 0%,
    #4a90e240 100%
  );
  padding: 2rem;
  border-bottom: 2px solid #4a90e2;
  text-align: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #4a90e2;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(74, 144, 226, 0.3);
    transform: scale(1.1);
  }
`;

const StarName = styled.h2`
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  color: white;
  text-shadow: 0 0 10px rgba(74, 144, 226, 0.5);
`;

const StarClass = styled.p`
  margin: 0;
  font-size: 1.2rem;
  color: #4a90e2;
  font-weight: 500;
`;

const StarIcon = styled.div<{ starColor: string; size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  background: ${(props) => props.starColor};
  margin: 1rem auto;
  box-shadow: 0 0 20px ${(props) => props.starColor}80;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
      box-shadow: 0 0 20px ${(props) => props.starColor}80;
    }
    50% {
      transform: scale(1.05);
      box-shadow: 0 0 30px ${(props) => props.starColor};
    }
  }
`;

const ModalBody = styled.div`
  padding: 2rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  color: #4a90e2;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  border-bottom: 1px solid #333;
  padding-bottom: 0.5rem;
`;

const PropertyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const PropertyCard = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: #4a90e2;
    background: rgba(74, 144, 226, 0.05);
  }
`;

const PropertyLabel = styled.div`
  color: #b3b3b3;
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
`;

const PropertyValue = styled.div`
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
`;

const PropertyUnit = styled.span`
  color: #4a90e2;
  font-size: 0.9rem;
  margin-left: 0.2rem;
`;

const ConstellationBadge = styled.div`
  display: inline-block;
  background: linear-gradient(45deg, #4a90e2, #357abd);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const ExoplanetIndicator = styled.div<{ hasExoplanets: boolean }>`
  display: inline-block;
  background: ${(props) =>
    props.hasExoplanets
      ? "linear-gradient(45deg, #28a745, #20c997)"
      : "linear-gradient(45deg, #6c757d, #5a6268)"};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-left: 0.5rem;
`;

const VariableStarBadge = styled.div`
  display: inline-block;
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 0.5rem;
`;

interface StarModalProps {
  star: StarData;
  onClose: () => void;
}

const StarModal: React.FC<StarModalProps> = ({ star, onClose }) => {
  const starColor = getStarColor(star.temperature);

  // Calcular el tamaño del icono basado en el radio
  const iconSize = Math.max(40, Math.min(Math.log(star.radius + 1) * 20, 100));

  const formatNumber = (num: number, decimals: number = 2): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toFixed(decimals);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <ModalHeader starColor={starColor}>
          <CloseButton onClick={onClose}>×</CloseButton>
          <StarName>{star.name}</StarName>
          <StarClass>
            {star.spectralClass} - {star.stellarType}
          </StarClass>
          <StarIcon starColor={starColor} size={iconSize} />
          {star.constellation && (
            <ConstellationBadge>
              ✨ Constelación: {star.constellation}
            </ConstellationBadge>
          )}
          <ExoplanetIndicator hasExoplanets={star.hasExoplanets}>
            🪐{" "}
            {star.hasExoplanets
              ? "Tiene exoplanetas"
              : "Sin exoplanetas conocidos"}
          </ExoplanetIndicator>
          {star.variableType && (
            <VariableStarBadge>
              🌟 Variable: {star.variableType}
            </VariableStarBadge>
          )}
        </ModalHeader>

        <ModalBody>
          <Section>
            <SectionTitle>Propiedades Físicas Fundamentales</SectionTitle>
            <PropertyGrid>
              <PropertyCard>
                <PropertyLabel>Masa</PropertyLabel>
                <PropertyValue>
                  {formatNumber(star.mass)}
                  <PropertyUnit>M☉</PropertyUnit>
                </PropertyValue>
              </PropertyCard>
              <PropertyCard>
                <PropertyLabel>Radio</PropertyLabel>
                <PropertyValue>
                  {formatNumber(star.radius)}
                  <PropertyUnit>R☉</PropertyUnit>
                </PropertyValue>
              </PropertyCard>
              <PropertyCard>
                <PropertyLabel>Temperatura Efectiva</PropertyLabel>
                <PropertyValue>
                  {star.temperature.toLocaleString()}
                  <PropertyUnit>K</PropertyUnit>
                </PropertyValue>
              </PropertyCard>
              <PropertyCard>
                <PropertyLabel>Luminosidad</PropertyLabel>
                <PropertyValue>
                  {formatNumber(star.luminosity)}
                  <PropertyUnit>L☉</PropertyUnit>
                </PropertyValue>
              </PropertyCard>
            </PropertyGrid>
          </Section>

          <Section>
            <SectionTitle>Propiedades Observacionales</SectionTitle>
            <PropertyGrid>
              <PropertyCard>
                <PropertyLabel>Magnitud Aparente</PropertyLabel>
                <PropertyValue>
                  {star.apparentMagnitude.toFixed(2)}
                </PropertyValue>
              </PropertyCard>
              <PropertyCard>
                <PropertyLabel>Magnitud Absoluta</PropertyLabel>
                <PropertyValue>
                  {star.absoluteMagnitude.toFixed(2)}
                </PropertyValue>
              </PropertyCard>
              <PropertyCard>
                <PropertyLabel>Índice de Color (B-V)</PropertyLabel>
                <PropertyValue>{star.colorIndex.toFixed(3)}</PropertyValue>
              </PropertyCard>
              <PropertyCard>
                <PropertyLabel>Distancia</PropertyLabel>
                <PropertyValue>
                  {star.distance < 1
                    ? `${(star.distance * 365.25 * 24 * 60).toFixed(
                        1
                      )} minutos luz`
                    : `${formatNumber(star.distance)} años luz`}
                </PropertyValue>
              </PropertyCard>
            </PropertyGrid>
          </Section>

          <Section>
            <SectionTitle>Composición y Evolución</SectionTitle>
            <PropertyGrid>
              <PropertyCard>
                <PropertyLabel>Metalicidad [Fe/H]</PropertyLabel>
                <PropertyValue>
                  {star.metallicity > 0 ? "+" : ""}
                  {star.metallicity.toFixed(2)}
                  <PropertyUnit>dex</PropertyUnit>
                </PropertyValue>
              </PropertyCard>
              <PropertyCard>
                <PropertyLabel>Edad</PropertyLabel>
                <PropertyValue>
                  {star.age >= 1000
                    ? `${(star.age / 1000).toFixed(1)} mil millones de años`
                    : `${formatNumber(star.age)} millones de años`}
                </PropertyValue>
              </PropertyCard>
              {star.gravitationalAxis && (
                <PropertyCard>
                  <PropertyLabel>Eje Gravitacional</PropertyLabel>
                  <PropertyValue>
                    {formatNumber(star.gravitationalAxis)}
                    <PropertyUnit>UA</PropertyUnit>
                  </PropertyValue>
                </PropertyCard>
              )}
              {star.discoveryYear && (
                <PropertyCard>
                  <PropertyLabel>Año de Descubrimiento</PropertyLabel>
                  <PropertyValue>{star.discoveryYear}</PropertyValue>
                </PropertyCard>
              )}
            </PropertyGrid>
          </Section>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default StarModal;
