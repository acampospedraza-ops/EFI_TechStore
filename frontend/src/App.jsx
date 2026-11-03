import { Routes, Route, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Categorias from "./pages/Categorias";
import Favoritos from "./pages/Favoritos";
import Contacto from "./pages/Contacto";
import DetalleProducto from "./pages/DetalleProducto";

function ProductosLayout() {
  return <Outlet />;
}

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Inicio />} />

        <Route path="/productos" element={<ProductosLayout />}>
          <Route index element={<Productos />} />
          <Route path="categorias" element={<Categorias />} />
        </Route>

        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/productos/:id" element={<DetalleProducto />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </>
  );
}

export default App;