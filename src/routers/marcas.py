
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlmodel import paginate
from sqlmodel import Session, select

from src.database import get_db
from src.models.marcas import Marca, MarcaCreate, MarcaPublic


router = APIRouter(prefix="/marcas", tags=["Marcas"])


# Crear una marca
@router.post(
    "/",
    response_model=MarcaPublic,
    status_code=status.HTTP_201_CREATED
)
def crear_marca(marca_in: MarcaCreate, db: Session = Depends(get_db)):
    marca = Marca.model_validate(marca_in)
    db.add(marca)
    db.commit()
    db.refresh(marca)
    return marca


# Obtener todas las marcas con paginación
@router.get("/", response_model=Page[MarcaPublic])
def listar_marcas(db: Session = Depends(get_db)):
    return paginate(db, select(Marca))


# Obtener una marca por su ID
@router.get(
    "/{marca_id}",
    response_model=MarcaPublic,
    responses={404: {"description": "Marca no encontrada"}}
)
def obtener_marca(marca_id: int, db: Session = Depends(get_db)):
    marca = db.get(Marca, marca_id)

    if marca is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Marca no encontrada",
        )

    return marca


# Modificar una marca
@router.put(
    "/{marca_id}",
    response_model=MarcaPublic,
    responses={404: {"description": "Marca no encontrada"}}
)
def modificar_marca(
    marca_id: int,
    marca_in: MarcaCreate,
    db: Session = Depends(get_db),
):
    marca = db.get(Marca, marca_id)

    if marca is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Marca no encontrada",
        )

    marca.sqlmodel_update(marca_in.model_dump())
    db.add(marca)
    db.commit()
    db.refresh(marca)
    return marca


# Eliminar una marca
@router.delete(
    "/{marca_id}",
    responses={404: {"description": "Marca no encontrada"}}
)
def eliminar_marca(marca_id: int, db: Session = Depends(get_db)):
    marca = db.get(Marca, marca_id)

    if marca is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Marca no encontrada",
        )

    db.delete(marca)
    db.commit()

    return {"mensaje": "Marca eliminada correctamente"}
