
from logging.config import fileConfig

from alembic import context
from sqlmodel import SQLModel

from src.models import Marca, Categoria, Producto
from src.database import engine


# Configuración de Alembic
config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)


# Metadatos de los modelos
target_metadata = SQLModel.metadata


def run_migrations_offline() -> None:
    """Ejecuta las migraciones sin conexión directa."""

    url = str(engine.url)

    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Ejecuta las migraciones con conexión a la base de datos."""

    with engine.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            render_as_batch=True,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
