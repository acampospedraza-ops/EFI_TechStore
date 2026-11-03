//encargado de comunicarse con fastApi
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export async function obtenerProductos() {
  const respuesta = await fetch(`${API_URL}/productos/`); //fetch realiza peticiones

  if (!respuesta.ok) {
    throw new Error("Error al obtener los productos");
  }

  const datos = await respuesta.json();
  return datos.items;
}

export async function obtenerProducto(id) {
  const respuesta = await fetch(`${API_URL}/productos/${id}`);

  if (!respuesta.ok) {
    throw new Error("Producto no encontrado");
  }

  return await respuesta.json();
}

export async function crearProducto(producto) {
  const respuesta = await fetch(`${API_URL}/productos/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo crear el producto");
  }

  return await respuesta.json();
}

export async function eliminarProducto(id) {
  const respuesta = await fetch(`${API_URL}/productos/${id}`, {
    method: "DELETE",
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo eliminar el producto");
  }

  return await respuesta.json();
}

export async function obtenerMarcas() {
  const respuesta = await fetch(`${API_URL}/marcas/`);

  if (!respuesta.ok) {
    throw new Error("Error al obtener las marcas");
  }

  const datos = await respuesta.json();
  return datos.items;
}

export async function obtenerCategorias() {
  const respuesta = await fetch(`${API_URL}/categorias/`);

  if (!respuesta.ok) {
    throw new Error("Error al obtener las categorías");
  }

  const datos = await respuesta.json();
  return datos.items;
}