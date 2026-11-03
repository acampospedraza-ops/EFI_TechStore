
import { Link } from "react-router-dom";

function Inicio() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <p className="text-violet-400 uppercase tracking-widest font-bold mb-5">
            Tecnología para todos
          </p>

          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
            Encontrá tu próxima
            <span className="text-violet-400"> tecnología.</span>
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            Explorá nuestro catálogo de productos tecnológicos.
            Encontrá periféricos, accesorios y equipos para mejorar
            tu experiencia.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/productos"
              className="bg-violet-600 hover:bg-violet-500 px-7 py-3 rounded-xl font-bold transition"
            >
              Ver productos →
            </Link>

            <Link
              to="/productos/categorias"
              className="border border-slate-700 hover:border-violet-500 px-7 py-3 rounded-xl font-bold transition"
            >
              Categorías
            </Link>
          </div>
        </div>

        <div className="bg-gradient-to-br from-violet-900 to-slate-900 border border-violet-800 rounded-3xl p-12 text-center">
          <div className="text-9xl mb-6">💻</div>
          <h2 className="text-3xl font-black mb-3">
            TECHSTORE
          </h2>
          <p className="text-slate-300">
            Todo lo que necesitás en tecnología.
          </p>
        </div>

      </section>

      <section className="border-t border-slate-800 py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

          <article className="bg-slate-900 rounded-2xl p-7">
            <div className="text-4xl mb-4">🖥️</div>
            <h3 className="text-xl font-bold mb-2">Productos</h3>
            <p className="text-slate-400">
              Conocé nuestro catálogo de tecnología.
            </p>
          </article>

          <article className="bg-slate-900 rounded-2xl p-7">
            <div className="text-4xl mb-4">⌨️</div>
            <h3 className="text-xl font-bold mb-2">Categorías</h3>
            <p className="text-slate-400">
              Encontrá productos organizados por categoría.
            </p>
          </article>

          <article className="bg-slate-900 rounded-2xl p-7">
            <div className="text-4xl mb-4">❤️</div>
            <h3 className="text-xl font-bold mb-2">Favoritos</h3>
            <p className="text-slate-400">
              Guardá los productos que más te interesan.
            </p>
          </article>

        </div>
      </section>

    </main>
  );
}

export default Inicio;
