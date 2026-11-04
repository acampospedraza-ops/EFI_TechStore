# TechStore

TechStore es una aplicación web para gestionar productos de una tienda de tecnología.

## Tecnologías utilizadas

### Frontend
- React
- JavaScript
- Vite
- Tailwind CSS
- React Router

### Backend
- Python
- FastAPI
- SQLModel
- SQLite
- Alembic

## Funcionalidades

- Visualización de productos.
- Consulta del detalle de cada producto.
- Creación de productos.
- Edición de productos.
- Eliminación de productos.
- Visualización de categorías.
- Sistema de favoritos.
- Navegación entre diferentes secciones.

## Cómo ejecutar el proyecto

### Backend

Desde la carpeta principal:

```bash
source .venv/bin/activate
python -m uvicorn src.main:app --reload
```

El backend estará disponible en `http://127.0.0.1:8000`.

La documentación de la API se encuentra en `/docs`.

### Frontend

Desde otra terminal:

```bash
cd frontend
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

## Autor

Proyecto desarrollado individualmente para el Examen Final Integrador.