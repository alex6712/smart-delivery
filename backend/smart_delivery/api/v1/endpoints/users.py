from typing import Annotated, AnyStr

from fastapi import APIRouter, Depends, Path, status
from fastapi.exceptions import HTTPException
from fastapi.responses import RedirectResponse
from sqlalchemy.ext.asyncio import AsyncSession

from smart_delivery.api.dependencies import get_session, validate_access_token
from smart_delivery.api.services import user_service
from smart_delivery.database.tables.entities import User
from smart_delivery.schemas.responses import UserResponse

router = APIRouter(
    prefix="/users",
    tags=["users"],
)


@router.get(
    "/me",
    response_model=UserResponse,
    status_code=status.HTTP_200_OK,
    summary="Personal page.",
)
async def get_me(user: Annotated[User, Depends(validate_access_token)]):
    """User's personal page method.

    Returns information about the owner of the token.

    Parameters
    ----------
    user : User
        The user is received from dependence on authorization.

    Returns
    -------
    user : UserResponse
        Response with user's info.
    """
    return user


@router.get(
    "/{username}",
    response_model=UserResponse,
    status_code=status.HTTP_200_OK,
    summary="User page.",
)
async def get_person(
    username: Annotated[
        AnyStr,
        Path(description="Login of the user whose personal page you want to go to."),
    ],
    user: Annotated[User, Depends(validate_access_token)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """User's page method.

    If the owner of the token sends a request to this method,
    then a redirect to the personal page is returned.
    In another case, the page of the requested user is returned.

    Parameters
    ----------
    username : AnyStr
        The name of the user whose page is being requested.
    user : User
        The user is received from dependence on authorization.
    session : AsyncSession
        Request session object.

    Returns
    -------
    user : UserResponse
        Response with user's info.
    """
    if user.username == username:
        return RedirectResponse("/api/v1/users/me")

    if (result := await user_service.get_user_by_username(session, username)) is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'User "{username}" not found.',
        )

    return result
