
function Galeria({ imagenes, abrirModal, eliminarImagen, columnas = 4 }) {
  const estiloGrid = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columnas}, 1fr)`,
    gap: '16px',
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  
  return (
    <div style={estiloGrid}>
      {imagenes.map((imagen, index) => (
        <div key={index} className="tarjeta-imagen">
          <img
            src={imagen.url}
            alt={imagen.titulo}
            className="imagen-galeria"
            onClick={() => abrirModal(imagen)}
          />
          <p className="titulo-imagen">{imagen.titulo}</p>
          {imagen.categoria === 'Usuario' && (
            <button
              onClick={() => eliminarImagen(imagen)}
              style={{ marginTop: '5px', padding: '5px', fontSize: '12px'
            , marginLeft: "5rem" , marginBottom: "1rem"}}
            >
              Eliminar
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Galeria;

  