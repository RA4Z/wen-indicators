import { useState, useEffect } from 'react';
import MapaMundi from 'pages/MapaMundi'; // Importe o componente MapaMundi
import './App.css'

function App() {
  const [showContainer, setShowContainer] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowContainer(true); // Mostrar a container

      setTimeout(() => {
        setShowContainer(false); // Ocultar a container após 20 segundos
      }, 40000);
    }, 300000);

    return () => clearInterval(interval); // Limpar o intervalo quando o componente for desmontado
  }, []);

  return (
    <>
      {showContainer && (
        <div className="container">
          <div className="text">
            Developed and Prototyped by Robert Aron Zimmermann robertn@weg.net
          </div>
        </div>
      )}
      <MapaMundi />
    </>
  );
}

export default App;