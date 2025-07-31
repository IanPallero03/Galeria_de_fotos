import { useEffect } from 'react';

function ModalImagen({ imagen, cerrarModal, imagenes, indiceActual, setIndiceActual }) {
  if (!imagen) return null;

  const irAAnterior = () => {
    setIndiceActual((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
  };

  const irASiguiente = () => {
    setIndiceActual((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));
  };

  // Detectar flechas del teclado
  useEffect(() => {
    const manejarTeclado = (e) => {
      if (e.key === 'ArrowRight') irASiguiente();
      else if (e.key === 'ArrowLeft') irAAnterior();
      else if (e.key === 'Escape') cerrarModal();
    };

    window.addEventListener('keydown', manejarTeclado);
    return () => window.removeEventListener('keydown', manejarTeclado);
  }, [imagen, indiceActual]);

  return (
    <div className="modal">
      <button className="boton-desplazamiento" onClick={irAAnterior}>&lt;</button>
      
      <div className="modal-contenido">
        <img src={imagenes[indiceActual].url} alt={imagenes[indiceActual].titulo} />
        <p>{imagenes[indiceActual].titulo}</p>

        <button onClick={cerrarModal}>Cerrar</button>
        <a
          href={imagen.url}
          download={imagen.titulo}
          className="boton-descargar"
        >
          Descargar imagen
        </a>
      </div>

      <button className="boton-desplazamiento" onClick={irASiguiente}>&gt;</button>
    </div>
  );
}

export default ModalImagen;

  