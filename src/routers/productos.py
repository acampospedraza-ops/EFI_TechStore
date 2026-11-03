
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlmodel import paginate
from sqlmodel import Session, select

from src.database import get_db
from src.models.productos import Producto, ProductoCreate, ProductoPublic
from src.models.marcas import Marca
from src.models.categorias import Categoria


router = APIRouter(prefix="/productos", tags=["Productos"])


# Crear un producto
@router.post(
    "/",
    response_model=ProductoPublic,
    status_code=status.HTTP_201_CREATED,
    responses={404: {"description": "Marca o categoría no encontrada"}}
)
def crear_producto(producto_in: ProductoCreate, db: Session = Depends(get_db)):

    if db.get(Marca, producto_in.marca_id) is None:
        raise HTTPException(status_code=404, detail="Marca no encontrada")

    if db.get(Categoria, producto_in.categoria_id) is None:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")

    producto = Producto.model_validate(producto_in)
    db.add(producto)
    db.commit()
    db.refresh(producto)

    return producto


# Listar productos con paginación
@router.get("/", response_model=Page[ProductoPublic])
def listar_productos(db: Session = Depends(get_db)):
    return paginate(db, select(Producto))


# Buscar un producto por ID
@router.get(
    "/{producto_id}",
    response_model=ProductoPublic,
    responses={404: {"description": "Producto no encontrado"}}
)
def obtener_producto(producto_id: int, db: Session = Depends(get_db)):

    producto = db.get(Producto, producto_id)

    if producto is None:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    return producto


# Modificar un producto
@router.put(
    "/{producto_id}",
    response_model=ProductoPublic,
    responses={404: {"description": "Producto, marca o categoría no encontrada"}}
)
def modificar_producto(
    producto_id: int,
    producto_in: ProductoCreate,
    db: Session = Depends(get_db)
):

    producto = db.get(Producto, producto_id)

    if producto is None:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    if db.get(Marca, producto_in.marca_id) is None:
        raise HTTPException(status_code=404, detail="Marca no encontrada")

    if db.get(Categoria, producto_in.categoria_id) is None:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")

    producto.sqlmodel_update(producto_in.model_dump())
    db.add(producto)
    db.commit()
    db.refresh(producto)

    return producto


# Eliminar un producto
@router.delete(
    "/{producto_id}",
    responses={404: {"description": "Producto no encontrado"}}
)
def eliminar_producto(producto_id: int, db: Session = Depends(get_db)):

    producto = db.get(Producto, producto_id)

    if producto is None:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    db.delete(producto)
    db.commit()

    return {"mensaje": "Producto eliminado correctamente"}
