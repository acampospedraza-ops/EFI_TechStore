
from sqlmodel import SQLModel, Field, Relationship


# Datos básicos de un producto
class ProductoBase(SQLModel):
    nombre: str = Field(min_length=2, max_length=100)
    descripcion: str = Field(min_length=5, max_length=300)
    precio: float = Field(gt=0)
    stock: int = Field(ge=0)
    marca_id: int = Field(foreign_key="marca.id")
    categoria_id: int = Field(foreign_key="categoria.id")


# Tabla de productos en la base de datos
class Producto(ProductoBase, table=True):
    id: int | None = Field(default=None, primary_key=True)

    marca: "Marca" = Relationship(back_populates="productos")
    categoria: "Categoria" = Relationship(back_populates="productos")


# Datos que recibimos para crear un producto
class ProductoCreate(ProductoBase):
    pass


# Datos que devolvemos al consultar un producto
class ProductoPublic(ProductoBase):
    id: int
