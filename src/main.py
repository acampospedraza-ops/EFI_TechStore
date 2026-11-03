
from fastapi import FastAPI
from fastapi_pagination import add_pagination
from fastapi.middleware.cors import CORSMiddleware

from src.routers.marcas import router as marcas_router
from src.routers.categorias import router as categorias_router
from src.routers.productos import router as productos_router


app = FastAPI(
    title="TechStore API",
    description="API para administrar una tienda de informática",
    version="1.0.0",
)


# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def inicio():
    return {"mensaje": "Bienvenido a TechStore"}


# Conectar los routers
app.include_router(marcas_router)
app.include_router(categorias_router)
app.include_router(productos_router)

# Activar paginación
add_pagination(app)
