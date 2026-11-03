import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { obtenerProducto } from "../services/productos";

function DetalleProducto() {
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id || id === "undefined") {
      setError("El producto no tiene un ID válido.");
      setCargando(false);
      return;
    }

    setCargando(true);
    setError("");

    obtenerProducto(id)
      .then((datos) => {
        setProducto(datos);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, [id]);

  if (cargando) {
    return (
      <p className="text-white p-8">
        Cargando producto...
      </p>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-900 text-white p-8">
        <p className="text-red-400 mb-4">{error}</p>
        <Link to="/productos" className="text-violet-400 underline">
          Volver al catálogo
        </Link>
      </main>
    );
  }

  if (!producto) return null;

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      <article className="bg-slate-800 rounded-xl p-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-4">
          {producto.nombre}
        </h1>

        <p className="text-slate-300 mb-4">
          {producto.descripcion}
        </p>

        <p className="text-violet-400 text-2xl font-bold">
          ${producto.precio}
        </p>

        <p className="mt-3">
          Stock disponible: {producto.stock}
        </p>

        <Link
          to="/productos"
          className="inline-block bg-violet-600 p-3 rounded mt-6"
        >
          Volver al catálogo
        </Link>
      </article>
    </main>
  );
}

export default DetalleProducto;