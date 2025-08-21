import { useState } from "react";
import styled from "styled-components";
import HRDiagram from "./components/HRDiagram";
import StarModal from "./components/StarModal";
import type { StarData } from "./types/StarData";

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
  color: white;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.header`
  text-align: center;
  padding: 2rem 0;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 2px solid #4a90e2;
`;

const Title = styled.h1`
  font-size: 3rem;
  background: linear-gradient(45deg, #4a90e2, #f5f7fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  text-shadow: 0 0 20px rgba(74, 144, 226, 0.3);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #b3b3b3;
  margin: 0.5rem 0 0 0;
`;

const MainContent = styled.main`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

function App() {
  const [selectedStar, setSelectedStar] = useState<StarData | null>(null);

  const handleStarClick = (star: StarData) => {
    setSelectedStar(star);
  };

  const handleCloseModal = () => {
    setSelectedStar(null);
  };

  return (
    <AppContainer>
      <Header>
        <Title>Diagrama HR Interactivo</Title>
        <Subtitle>
          Explora las estrellas y sus propiedades astronómicas
        </Subtitle>
      </Header>

      <MainContent>
        <HRDiagram onStarClick={handleStarClick} />
      </MainContent>

      {selectedStar && (
        <StarModal star={selectedStar} onClose={handleCloseModal} />
      )}
    </AppContainer>
  );
}

export default App;
