
import { Link } from "react-router-dom";
import { useFavoritos } from "../context/FavoritosContext";

function Favoritos() {
  const { favoritos, cambiarFavorito } = useFavoritos();

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-14">
      <div className="max-w-7xl mx-auto">

        <p className="text-violet-400 uppercase tracking-widest text-sm font-bold mb-3">
          Tu selección
        </p>

        <h1 className="text-4xl font-black mb-4">
          Mis favoritos ❤️
        </h1>

        <p className="text-slate-400 mb-10">
          Acá encontrás los productos que guardaste.
        </p>

        {favoritos.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">
            <p className="text-5xl mb-5">💜</p>

            <h2 className="text-2xl font-bold mb-3">
              Todavía no tenés favoritos
            </h2>

            <p className="text-slate-400 mb-7">
              Explorá el catálogo y guardá los productos que te interesen.
            </p>

            <Link
              to="/productos"
              className="inline-block bg-violet-600 hover:bg-violet-500 px-6 py-3 rounded-xl font-bold transition"
            >
              Explorar productos →
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoritos.map((producto) => (
              <article
                key={producto.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
              >
                <div className="text-5xl mb-5">💻</div>

                <h2 className="text-xl font-bold mb-2">
                  {producto.nombre}
                </h2>

                <p className="text-slate-400 mb-4">
                  {producto.descripcion}
                </p>

                <p className="text-2xl font-black text-violet-400 mb-6">
                  ${Number(producto.precio).toLocaleString("es-AR")}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to={`/productos/${producto.id}`}
                    className="bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-lg font-semibold"
                  >
                    Ver detalle
                  </Link>

                  <button
                    onClick={() => cambiarFavorito(producto)}
                    className="border border-slate-700 hover:border-red-500 px-4 py-2 rounded-lg"
                  >
                    Quitar ❤️
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}

export default Favoritos;
