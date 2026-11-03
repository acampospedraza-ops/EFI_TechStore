
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  obtenerProductos,
  crearProducto,
  eliminarProducto,
  obtenerMarcas,
  obtenerCategorias,
} from "../services/productos";
import { useFavoritos } from "../context/FavoritosContext";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [marcaId, setMarcaId] = useState("");
  const [categoriaId, setCategoriaId] = useState("");

  const [marcas, setMarcas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const { favoritos, cambiarFavorito } = useFavoritos();

  async function cargarProductos() {
    try {
      setCargando(true);
      setError("");
      const datos = await obtenerProductos();
      setProductos(datos);
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarProductos();

    async function cargarOpciones() {
      try {
        const [marcasData, categoriasData] = await Promise.all([
          obtenerMarcas(),
          obtenerCategorias(),
        ]);

        setMarcas(marcasData);
        setCategorias(categoriasData);
      } catch (error) {
        setError(error.message);
      }
    }

    cargarOpciones();
  }, []);

  async function manejarEnvio(e) {
    e.preventDefault();

    if (
      nombre.trim().length < 2 ||
      descripcion.trim().length < 5 ||
      Number(precio) <= 0 ||
      !Number.isInteger(Number(stock)) ||
      Number(stock) < 0 ||
      !marcaId ||
      !categoriaId
    ) {
      setError("Revisá los datos ingresados.");
      return;
    }

    try {
      await crearProducto({
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
        precio: Number(precio),
        stock: Number(stock),
        marca_id: Number(marcaId),
        categoria_id: Number(categoriaId),
      });

      setNombre("");
      setDescripcion("");
      setPrecio("");
      setStock("");
      setMarcaId("");
      setCategoriaId("");
      setError("");
      setMostrarFormulario(false);

      await cargarProductos();
    } catch (error) {
      setError(error.message);
    }
  }

  async function manejarEliminar(id) {
    if (!window.confirm("¿Seguro que querés eliminar este producto?")) {
      return;
    }

    try {
      await eliminarProducto(id);
      await cargarProductos();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* ENCABEZADO */}
      <section className="bg-gradient-to-r from-violet-950 via-slate-900 to-slate-950 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-violet-400 font-semibold uppercase tracking-widest text-sm mb-3">
            Tecnología para todos
          </p>

          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Nuestro <span className="text-violet-400">catálogo</span>
          </h1>

          <p className="text-slate-300 max-w-xl text-lg">
            Descubrí componentes, accesorios y productos tecnológicos
            para llevar tu equipo al siguiente nivel.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              to="/productos"
              className="bg-violet-600 hover:bg-violet-500 px-6 py-3 rounded-xl font-semibold transition"
            >
              Todos los productos
            </Link>

            <Link
              to="/productos/categorias"
              className="border border-slate-600 hover:border-violet-400 px-6 py-3 rounded-xl font-semibold transition"
            >
              Explorar categorías
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* CONTENIDO DE CATEGORÍAS */}
        <Outlet />

        {/* TÍTULO DEL CATÁLOGO */}
        <section className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold">Productos disponibles</h2>
            <p className="text-slate-400 mt-2">
              Encontrá lo que necesitás para tu computadora.
            </p>
          </div>

          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="bg-violet-600 hover:bg-violet-500 px-5 py-3 rounded-xl font-semibold transition"
          >
            {mostrarFormulario ? "Cerrar formulario" : "+ Agregar producto"}
          </button>
        </section>

        {/* FORMULARIO */}
        {mostrarFormulario && (
          <section className="bg-slate-900 border border-slate-700 rounded-2xl p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-bold mb-2">
              Nuevo producto
            </h2>

            <p className="text-slate-400 mb-6">
              Completá los datos para agregar un producto al catálogo.
            </p>

            <form onSubmit={manejarEnvio} className="grid md:grid-cols-2 gap-5">

              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Nombre del producto
                </label>
                <input
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-violet-500 outline-none"
                  placeholder="Ej: Teclado mecánico"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  minLength="2"
                  maxLength="100"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Precio
                </label>
                <input
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-violet-500 outline-none"
                  type="number"
                  placeholder="Ej: 150000"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  required
                  min="0.01"
                  step="0.01"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-slate-300 mb-2">
                  Descripción
                </label>
                <textarea
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-violet-500 outline-none"
                  placeholder="Describí el producto..."
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                  minLength="5"
                  maxLength="300"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Stock disponible
                </label>
                <input
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-violet-500 outline-none"
                  type="number"
                  placeholder="Cantidad"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                  min="0"
                  step="1"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Marca
                </label>
                <select
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-violet-500 outline-none"
                  value={marcaId}
                  onChange={(e) => setMarcaId(e.target.value)}
                  required
                >
                  <option value="">Seleccionar marca</option>
                  {marcas.map((marca) => (
                    <option key={marca.id} value={marca.id}>
                      {marca.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Categoría
                </label>
                <select
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-violet-500 outline-none"
                  value={categoriaId}
                  onChange={(e) => setCategoriaId(e.target.value)}
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-violet-600 hover:bg-violet-500 p-3 rounded-xl font-bold transition"
                >
                  Guardar producto
                </button>
              </div>
            </form>
          </section>
        )}

        {/* MENSAJES */}
        {error && (
          <div className="bg-red-950 border border-red-800 text-red-300 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        {cargando && (
          <p className="text-slate-400 py-10 text-center">
            Cargando productos...
          </p>
        )}

        {!cargando && productos.length === 0 && (
          <div className="text-center py-16 bg-slate-900 rounded-2xl border border-slate-800">
            <p className="text-5xl mb-4">📦</p>
            <h3 className="text-xl font-bold mb-2">
              Todavía no hay productos
            </h3>
            <p className="text-slate-400">
              Agregá tu primer producto para comenzar.
            </p>
          </div>
        )}

        {/* TARJETAS DE PRODUCTOS */}
        {!cargando && productos.length > 0 && (
          <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">

            {productos.map((producto) => (
              <article
                key={producto.id}
                className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-violet-500 hover:-translate-y-1 transition duration-300"
              >

                <div className="h-44 bg-gradient-to-br from-violet-950 via-slate-800 to-slate-950 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition duration-300">
                    💻
                  </span>
                </div>

                <div className="p-6">

                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs uppercase tracking-wider text-violet-400 font-bold">
                      TechStore
                    </span>

                    <span className={`text-xs px-3 py-1 rounded-full ${
                      producto.stock > 0
                        ? "bg-emerald-950 text-emerald-400"
                        : "bg-red-950 text-red-400"
                    }`}>
                      {producto.stock > 0 ? "Disponible" : "Sin stock"}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-violet-400 transition">
                    {producto.nombre}
                  </h3>

                  <p className="text-slate-400 text-sm min-h-12 mb-5">
                    {producto.descripcion}
                  </p>

                  <div className="border-t border-slate-800 pt-4">
                    <p className="text-2xl font-black text-violet-400">
                      {Number(producto.precio).toLocaleString("es-AR", {
                        style: "currency",
                        currency: "ARS",
                        maximumFractionDigits: 2,
                      })}
                    </p>

                    <p className="text-slate-500 text-sm mt-1">
                      Stock: {producto.stock} unidades
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-6">

                    <Link
                      to={`/productos/${producto.id}`}
                      className="flex-1 text-center bg-violet-600 hover:bg-violet-500 px-3 py-2 rounded-lg font-semibold text-sm transition"
                    >
                      Ver detalle
                    </Link>

                    <button
                      onClick={() => cambiarFavorito(producto)}
                      className="bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg transition"
                    >
                      {favoritos.some((item) => item.id === producto.id)
                        ? "♥"
                        : "♡"}
                    </button>

                    <button
                      onClick={() => manejarEliminar(producto.id)}
                      className="bg-red-950 hover:bg-red-900 text-red-300 px-3 py-2 rounded-lg transition"
                    >
                      Eliminar
                    </button>

                  </div>
                </div>
              </article>
            ))}

          </section>
        )}

      </div>
    </main>
  );
}

export default Productos;
