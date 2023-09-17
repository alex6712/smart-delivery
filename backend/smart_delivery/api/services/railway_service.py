from sqlalchemy import and_, select
from sqlalchemy.ext.asyncio import AsyncSession

from smart_delivery.database.tables.junctions import StationDistance


async def get_distance_between_stations(
    session: AsyncSession,
    departure_station_code: int,
    destination_station_code: int,
) -> StationDistance:
    """

    Parameters
    ----------
    session
    departure_station_code
    destination_station_code

    Returns
    -------

    """
    return await session.scalar(
        select(StationDistance).where(
            and_(
                StationDistance.from_code == departure_station_code,
                StationDistance.to_code == destination_station_code,
            )
        )
    )
