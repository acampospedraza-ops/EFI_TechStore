
from sqlmodel import Session, SQLModel, create_engine

# Dirección del archivo donde se guardará la base de datos
DATABASE_URL = "sqlite:///./techstore.db"

# Crea la conexión con SQLite
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

# Permite que los routers trabajen con la base de datos
def get_db():
    with Session(engine) as session:
        yield session
