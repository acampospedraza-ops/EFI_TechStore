
from sqlmodel import SQLModel, Field, Relationship


# Datos básicos de una marca
class MarcaBase(SQLModel):
    nombre: str = Field(min_length=2, max_length=50)


# Tabla de marcas en la base de datos
class Marca(MarcaBase, table=True):
    id: int | None = Field(default=None, primary_key=True)

    productos: list["Producto"] = Relationship(back_populates="marca")


# Datos que recibimos para crear una marca
class MarcaCreate(MarcaBase):
    pass


# Datos que devolvemos al consultar una marca
class MarcaPublic(MarcaBase):
    id: int
