
from sqlmodel import SQLModel, Field, Relationship


# Datos básicos de una categoría
class CategoriaBase(SQLModel):
    nombre: str = Field(min_length=2, max_length=50)
    descripcion: str = Field(max_length=200)


# Tabla de categorías en la base de datos
class Categoria(CategoriaBase, table=True):
    id: int | None = Field(default=None, primary_key=True)

    productos: list["Producto"] = Relationship(back_populates="categoria")


# Datos que recibimos para crear una categoría
class CategoriaCreate(CategoriaBase):
    pass


# Datos que devolvemos al consultar una categoría
class CategoriaPublic(CategoriaBase):
    id: int
