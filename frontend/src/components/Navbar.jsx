
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const enlaces = [
    { nombre: "Inicio", ruta: "/" },
    { nombre: "Productos", ruta: "/productos" },
    { nombre: "Categorías", ruta: "/productos/categorias" },
    { nombre: "Favoritos", ruta: "/favoritos" },
    { nombre: "Contacto", ruta: "/contacto" },
  ];

  return (
    <nav className="bg-slate-950 border-b border-slate-800 text-white px-6 md:px-10 py-5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5">
        <Link to="/" className="text-3xl font-black text-violet-400">
          TechStore
        </Link>

        <div className="flex flex-wrap justify-center gap-3 md:gap-7">
          {enlaces.map((enlace) => (
            <NavLink
              key={enlace.ruta}
              to={enlace.ruta}
              end={enlace.ruta === "/"}
              className={({ isActive }) =>
                `text-sm md:text-base font-semibold transition ${
                  isActive
                    ? "text-violet-400"
                    : "text-slate-300 hover:text-white"
                }`
              }
            >
              {enlace.nombre}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
