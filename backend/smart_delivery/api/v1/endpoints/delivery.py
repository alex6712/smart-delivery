from typing import Annotated

from fastapi import APIRouter, Depends, Query, status, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from smart_delivery.api.dependencies import get_session
from smart_delivery.api.services import railway_service
from smart_delivery.schemas.responses import RailwayDeliveryResponse

router = APIRouter(
    prefix="/delivery",
    tags=["delivery"],
)


@router.get(
    "/railway",
    response_model=RailwayDeliveryResponse,
    status_code=status.HTTP_200_OK,
    summary="Trying to calculate cost of delivery by train.",
)
async def railway(
    session: Annotated[AsyncSession, Depends(get_session)],
    departure_station_code: Annotated[int, Query(description="Код станции отправления.")],
    destination_station_code: Annotated[int, Query(description="Код станции прибытия.")],
):
    """

    Parameters
    ----------
    session : AsyncSession
    departure_station_code : int
    destination_station_code : int

    Returns
    -------
    response : StandardResponse
    """
    distance = await railway_service.get_distance_between_stations(
        session, departure_station_code, destination_station_code
    )

    if not distance:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No data about distance between these stations.",
        )

    cost = distance.distance * 33

    return {"distance": distance.distance, "cost": cost}
