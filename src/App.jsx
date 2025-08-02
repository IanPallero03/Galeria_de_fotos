import { useState } from 'react';
import Galeria from './galeria';
import ModalImagen from './ModalImagen';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';


function App() {
  const [imagenesUsuario, setImagenesUsuario] = useState([]);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [indiceActual, setIndiceActual] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
  const [busqueda, setBusqueda] = useState('');
  const [columnas, setColumnas] = useState(4); // valor inicial

  const [modoOscuro, setModoOscuro] = useState(false);

  const toggleModoOscuro = () => setModoOscuro(!modoOscuro);

  // Seccion IMAGENES POR DEFECTO
  const imagenes = [
    { url: 'imagenes/naturaleza1.webp', titulo: 'Montañas', categoria: 'Naturaleza' },
    { url: 'imagenes/naturaleza2.webp', titulo: 'Campo', categoria: 'Naturaleza' },
    { url: 'imagenes/naturaleza3.webp', titulo: 'Bosque', categoria: 'Naturaleza' },
    { url: 'imagenes/naturaleza4.webp', titulo: 'Parque', categoria: 'Naturaleza' },
    { url: 'imagenes/mascota1.webp', titulo: 'Loro', categoria: 'Mascotas' },
    { url: 'imagenes/mascota2.webp', titulo: 'Gato', categoria: 'Mascotas' },
    { url: 'imagenes/mascota3.webp', titulo: 'Bóxer', categoria: 'Mascotas' },
    { url: 'imagenes/mascota4.webp', titulo: 'Bulldog', categoria: 'Mascotas' },
    { url: 'imagenes/ciudad1.webp', titulo: 'Florencia', categoria: 'Ciudades' },
    { url: 'imagenes/ciudad2.webp', titulo: 'New York', categoria: 'Ciudades' },
    { url: 'imagenes/ciudad3.webp', titulo: 'Venecia', categoria: 'Ciudades' },
    { url: 'imagenes/ciudad4.webp', titulo: 'Buenos Aires', categoria: 'Ciudades' },
  ];

  //SECCION SUBIR IMAGENES
  const handleSubirImagen = (e) => {
    const archivos = e.target.files; // toma todos los archivos
  
    if (!archivos || archivos.length === 0) return;
  
    Array.from(archivos).forEach((archivo) => {
      const lector = new FileReader();
  
      lector.onloadend = () => {
        const nuevaImagen = {
          url: lector.result,
          titulo: archivo.name,
          categoria: 'Usuario'
        };
        setImagenesUsuario(prev => [nuevaImagen, ...prev]);
      };
  
      lector.readAsDataURL(archivo);
    });
  };
  
// SECCION ELIMINAR IMAGENES
  const eliminarImagen = (imagenAEliminar) => {
    setImagenesUsuario(prev =>
      prev.filter(imagen => imagen.url !== imagenAEliminar.url)
    );
  };

  // SECCION ABRIR IMAGENES
  const abrirModal = (imagen) => {
    const indice = imagenesFiltradas.findIndex(img => img.url === imagen.url);
    setIndiceActual(indice);
    setImagenSeleccionada(imagen);
  };
  
  //SECCION CERRAR IMAGENES

  const cerrarModal = () => {
    setImagenSeleccionada(null);
    setIndiceActual(null);
  };
  

  const todasLasImagenes = [...imagenesUsuario, ...imagenes];
  const imagenesFiltradas = todasLasImagenes.filter(imagen => {
    const coincideCategoria =
      categoriaSeleccionada === 'Todas' || imagen.categoria === categoriaSeleccionada;
    const coincideBusqueda = imagen.titulo.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  return (
    <>
      <video
      key={modoOscuro ? 'noche' : 'dia'} // <-- Forzamos la recarga
    autoPlay
    loop
    muted
    playsInline
    className="fondo-video"
  >
    <source
      src={modoOscuro ? 'fondo-noche.mp4' : 'fondo-dia.mp4'}
      type="video/mp4"
    />
  </video>
    <div className={modoOscuro ? 'fondo-noche' : 'fondo-noche'}>

    {/* Botón Modo Día/Noche */}
    <div style={{ textAlign: 'right', padding: '10px' }}>
      <button className="boton-modo" onClick={toggleModoOscuro}>
        <FontAwesomeIcon icon={modoOscuro ? faSun : faMoon} />
      </button>
    </div>
  
   {/* SECCION BURBUJAS DE FONDO */}
    <div className="burbujas">
  {[...Array(10)].map((_, i) => (
    <div
      key={i}
      className="burbuja"
      style={{
        left: `${Math.random() * 100}%`,
        animationDuration: `${6 + Math.random() * 6}s`,
        width: `${20 + Math.random() * 40}px`,
        height: `${20 + Math.random() * 40}px`,
      }}
    />
  ))}
</div>
      {/* SECCION GALERIA DE IMAGENES */}
    <h1 style={{ textAlign: 'center', marginTop: '20px',color: "black" }}>Galería de Imágenes</h1>
    
    {/* SECCION SUBIR IMAGENES */}
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
    <p style={{ fontWeight: '600', fontSize: '1.5rem', marginBottom: '12px', color: "#2c7e88" }}>
    Subir desde mi PC</p>
        <input type="file" accept="image/*" multiple onChange={handleSubirImagen} />
      </div>


    {/* SECCION BUSCAR IMAGENES POR TITULO */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
    <input
      type="text"
      placeholder="Buscar por título..."
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
      style={{
        padding: '8px',
        width: '220px',
        borderRadius: '6px',
        border: '1px solid #ccc',
      }}
    />
  </div>

    {/* SECCION CATEGORIAS */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
    <p style={{ fontWeight: '600', fontSize: '1.2rem', marginBottom: '10px',color: "#2c7e88" }}>
      Categorías
    </p>
    <div style={{ display: 'inline-flex', gap: '10px', flexWrap: 'wrap' }}>
      <button onClick={() => setCategoriaSeleccionada('Todas')}>Todas</button>
      <button onClick={() => setCategoriaSeleccionada('Naturaleza')}>Naturaleza</button>
      <button onClick={() => setCategoriaSeleccionada('Mascotas')}>Mascotas</button>
      <button onClick={() => setCategoriaSeleccionada('Ciudades')}>Ciudades</button>
    </div>
  </div>

    {/* SECCION CONTADOR DE CANTIDAD DE IMAGENES */}
  <p style={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold',color: "white" }}>
    Imágenes mostradas: {imagenesFiltradas.length}
  </p>

  <div style={{ textAlign: 'center', margin: '20px' }}>
  <p style={{ fontWeight: '600', fontSize: '1.2rem', color: "#2c7e88" }}>Vista de galería</p>
  
  
  <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '20px' }}>
  <button
    onClick={() => setColumnas(1)}
    style={{ backgroundColor: columnas === 1 ? '#2c7e88' : '#ddd', color: columnas === 1 ? 'white' : 'black' }}
  >1x1</button>

  <button
    onClick={() => setColumnas(2)}
    style={{ backgroundColor: columnas === 2 ? '#2c7e88' : '#ddd', color: columnas === 2 ? 'white' : 'black' }}
  >2x2</button>

  <button
    onClick={() => setColumnas(3)}
    style={{ backgroundColor: columnas === 3 ? '#2c7e88' : '#ddd', color: columnas === 3 ? 'white' : 'black' }}
  >3x3</button>

  <button
    onClick={() => setColumnas(4)}
    style={{ backgroundColor: columnas === 4 ? '#2c7e88' : '#ddd', color: columnas === 4 ? 'white' : 'black' }}
  >4x4</button>
</div>
</div>

  <Galeria
  imagenes={imagenesFiltradas}
  abrirModal={abrirModal}
  eliminarImagen={eliminarImagen}
  imagenesUsuario={imagenesUsuario}
  setImagenesUsuario={setImagenesUsuario}
  columnas={columnas} // <- Aca lo pasás
/>



<ModalImagen
    imagen={imagenSeleccionada}
    cerrarModal={cerrarModal}
    imagenes={imagenesFiltradas}
    indiceActual={indiceActual}
    setIndiceActual={setIndiceActual}
  />

    </div>
    </>
  );
}

export default App;



