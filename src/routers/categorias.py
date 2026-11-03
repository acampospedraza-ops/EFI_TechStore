
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlmodel import paginate
from sqlmodel import Session, select

from src.database import get_db
from src.models.categorias import Categoria, CategoriaCreate, CategoriaPublic


router = APIRouter(prefix="/categorias", tags=["Categorías"])


# Crear una categoría
@router.post(
    "/",
    response_model=CategoriaPublic,
    status_code=status.HTTP_201_CREATED
)
def crear_categoria(categoria_in: CategoriaCreate, db: Session = Depends(get_db)):
    categoria = Categoria.model_validate(categoria_in)
    db.add(categoria)
    db.commit()
    db.refresh(categoria)
    return categoria


# Listar categorías con paginación
@router.get("/", response_model=Page[CategoriaPublic])
def listar_categorias(db: Session = Depends(get_db)):
    return paginate(db, select(Categoria))


# Buscar una categoría por ID
@router.get(
    "/{categoria_id}",
    response_model=CategoriaPublic,
    responses={404: {"description": "Categoría no encontrada"}}
)
def obtener_categoria(categoria_id: int, db: Session = Depends(get_db)):
    categoria = db.get(Categoria, categoria_id)

    if categoria is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Categoría no encontrada",
        )

    return categoria


# Modificar una categoría
@router.put(
    "/{categoria_id}",
    response_model=CategoriaPublic,
    responses={404: {"description": "Categoría no encontrada"}}
)
def modificar_categoria(
    categoria_id: int,
    categoria_in: CategoriaCreate,
    db: Session = Depends(get_db),
):
    categoria = db.get(Categoria, categoria_id)

    if categoria is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Categoría no encontrada",
        )

    categoria.sqlmodel_update(categoria_in.model_dump())
    db.add(categoria)
    db.commit()
    db.refresh(categoria)
    return categoria


# Eliminar una categoría
@router.delete(
    "/{categoria_id}",
    responses={404: {"description": "Categoría no encontrada"}}
)
def eliminar_categoria(categoria_id: int, db: Session = Depends(get_db)):
    categoria = db.get(Categoria, categoria_id)

    if categoria is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Categoría no encontrada",
        )

    db.delete(categoria)
    db.commit()

    return {"mensaje": "Categoría eliminada correctamente"}
