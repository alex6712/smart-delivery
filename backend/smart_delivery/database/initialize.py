from asyncpg.exceptions import ConnectionDoesNotExistError
from sqlalchemy.exc import ProgrammingError
from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    create_async_engine,
)

from smart_delivery.core.config import Settings, get_settings
from smart_delivery.database.tables.base import Base


async def initialize():
    """Initializing a database.

    Drops all tables, then recreates all the ones.
    This will delete all the info from existing tables, so
    this is a very unsafe operation.

    That's why this function requires confirmation of superuser.
    """
    settings: Settings = get_settings()

    database_user: str = input("Please, enter the superuser login: ")
    database_password: str = input("Please, enter the superuser password: ")

    engine: AsyncEngine = create_async_engine(
        url=f"postgresql+asyncpg://{database_user}:{database_password}@{settings.DOMAIN}"
        f":{settings.DATABASE_PORT}/{settings.DATABASE_NAME}",
        echo=False,
        pool_pre_ping=True,
    )

    error = (
        "\n\033[91mWhile initializing database:"
        "\n\tFAIL:  {fail}"
        "\n\tCAUSE: {cause}"
        "\nContinuing without initializing...\n"
    )

    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.drop_all)

        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
    except ConnectionDoesNotExistError:
        print(
            error.format(
                fail="Unable to establish a connection.",
                cause="Incorrect password or username.",
            )
        )
    except ProgrammingError:
        print(
            error.format(
                fail="Unable to establish a connection.",
                cause="User is not the superuser.",
            )
        )
    else:
        print("\n\033[92mDatabase initialized successfully.\n")
