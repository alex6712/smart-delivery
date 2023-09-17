from asyncpg.exceptions import ConnectionDoesNotExistError
from sqlalchemy.exc import IntegrityError, ProgrammingError
from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

from smart_delivery.core.config import Settings, get_settings
from smart_delivery.database.tables.base import Base
from smart_delivery.database.tables.entities import RailwayStation
from smart_delivery.database.tables.junctions import StationDistance


async def _create_database(engine: AsyncEngine):
    """Initializing a database.

    Drops all tables, then recreates all the ones.
    This will delete all the info from existing tables, so
    this is a very unsafe operation.

    That's why this function requires confirmation of superuser.
    """
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


async def _insert_stations(session: AsyncSession):
    stations = open(
        "smart_delivery/database/initialize_data/stations.csv", "r", encoding="utf-8"
    )

    for i, row in enumerate(stations):
        split_row = []

        _open, buff = False, ""
        for char in row:
            if char == '"':
                _open = not _open
                continue

            if char == "," and not _open:
                split_row.append(buff)
                buff = ""
                continue

            buff += char

        name, _, railway_name, code, *_ = split_row

        print(f"{i}: {code}, {name}, {railway_name};")

        try:
            session.add(
                RailwayStation(code=int(code), name=name, railway_name=railway_name)
            )
            await session.commit()
        except IntegrityError as e:
            print(f"\tError: {e}")
            await session.rollback()


async def _insert_distances(session: AsyncSession):
    distances = open(
        "smart_delivery/database/initialize_data/distances.csv", "r", encoding="utf-8"
    )

    for i, row in enumerate(distances):
        from_code, _, _, to_code, _, distance, *_ = row[1:-1].split("\t")

        print(f"{i}: {from_code}, {to_code}, {distance};")

        try:
            session.add(
                StationDistance(
                    from_code=int(from_code), to_code=int(to_code), distance=distance
                )
            )
            await session.commit()
        except IntegrityError as e:
            print(f"\tError: {e}")
            await session.rollback()


async def main():
    settings: Settings = get_settings()

    database_user: str = input("Please, enter the superuser login: ")
    database_password: str = input("Please, enter the superuser password: ")

    engine: AsyncEngine = create_async_engine(
        url=f"postgresql+asyncpg://{database_user}:{database_password}@{settings.DOMAIN}"
        f":{settings.DATABASE_PORT}/{settings.DATABASE_NAME}",
        echo=False,
        pool_pre_ping=True,
    )
    async_session_maker: async_sessionmaker = async_sessionmaker(
        bind=engine, class_=AsyncSession, expire_on_commit=False
    )

    await _create_database(engine)

    async with async_session_maker() as session:
        await _insert_stations(session)
        # await _insert_distances(session)
