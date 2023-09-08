from typing import Annotated

from fastapi import APIRouter, Depends, status

from smart_delivery.core.config import Settings, get_settings
from smart_delivery.schemas.responses import AppInfoResponse, StandardResponse

router = APIRouter(
    tags=["root"],
)


@router.get(
    "/",
    response_model=StandardResponse,
    status_code=status.HTTP_200_OK,
    summary="Functionality check.",
)
async def root():
    """Root path for API health check.

    Does nothing but give positive feedback to the request.

    Returns
    -------
    response : StandardResponse
        Answer about the correct operation of the server.
    """
    return {"message": "API works!"}


@router.get(
    "/app_info",
    response_model=AppInfoResponse,
    status_code=status.HTTP_200_OK,
    summary="Application information.",
)
async def app_info(settings: Annotated[Settings, Depends(get_settings)]):
    """Path to get information about the server side of the application.

    Information received:
        * app_name : str, application name;
        * app_version : str, smart_delivery version;
        * app_description : str, full description of the application;
        * app_summary : str, a short description of the application;
        * admin_name : str, full name of the person in charge;
        * admin_email : str, email address to contact the person in charge.

    Parameters
    ----------
    settings : Settings
        Application settings.

    Returns
    -------
    response : AppInfoResponse
        A response containing information about the server side of the application.
    """
    return {
        "app_name": settings.APP_NAME,
        "app_version": settings.APP_VERSION,
        "app_description": settings.APP_DESCRIPTION,
        "app_summary": settings.APP_SUMMARY,
        "admin_name": settings.ADMIN_NAME,
        "admin_email": settings.ADMIN_EMAIL,
    }
