import { createContext, useContext, useState } from "react";

const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState([]);

  function cambiarFavorito(producto) {
    const existe = favoritos.some((item) => item.id === producto.id);

    if (existe) {
      setFavoritos(favoritos.filter((item) => item.id !== producto.id));
    } else {
      setFavoritos([...favoritos, producto]);
    }
  }

  return (
    <FavoritosContext.Provider value={{ favoritos, cambiarFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  return useContext(FavoritosContext);
}