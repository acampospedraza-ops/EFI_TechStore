
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerCategorias } from "../services/productos";

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarCategorias() {
      try {
        const datos = await obtenerCategorias();
        setCategorias(datos);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    }

    cargarCategorias();
  }, []);

  const iconos = ["⌨️", "🖱️", "🖥️", "🎧", "💾", "🎮", "💻", "🔌"];

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-14">
      <div className="max-w-7xl mx-auto">

        <div className="mb-12">
          <p className="text-violet-400 uppercase tracking-widest text-sm font-bold mb-3">
            Explorá TechStore
          </p>

          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Nuestras categorías
          </h1>

          <p className="text-slate-400 text-lg">
            Encontrá tecnología organizada según lo que necesitás.
          </p>
        </div>

        {cargando && (
          <p className="text-slate-400">Cargando categorías...</p>
        )}

        {error && (
          <p className="text-red-400">{error}</p>
        )}

        {!cargando && !error && categorias.length === 0 && (
          <p className="text-slate-400">
            Todavía no hay categorías disponibles.
          </p>
        )}

        {!cargando && !error && categorias.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categorias.map((categoria, index) => (
              <article
                key={categoria.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-7 hover:border-violet-500 hover:-translate-y-1 transition duration-300"
              >
                <div className="w-20 h-20 rounded-2xl bg-violet-950 flex items-center justify-center text-4xl mb-6">
                  {iconos[index % iconos.length]}
                </div>

                <h2 className="text-2xl font-bold mb-3">
                  {categoria.nombre}
                </h2>

                <p className="text-slate-400 mb-6">
                  {categoria.descripcion || "Productos de esta categoría."}
                </p>

                <Link
                  to="/productos"
                  className="text-violet-400 font-bold hover:text-violet-300"
                >
                  Ver catálogo →
                </Link>
              </article>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}

export default Categorias;
