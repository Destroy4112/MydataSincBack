import 'bootstrap/dist/css/bootstrap.min.css';
import { Productos } from '../pages/productos';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { CrearProducto } from '../pages/CrearProducto';
import { MercadoLibre } from '../pages/MercadoLibre';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Productos />} />
        <Route path="/crear" element={<CrearProducto />} />
        <Route path="/mercado" element={<MercadoLibre />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
