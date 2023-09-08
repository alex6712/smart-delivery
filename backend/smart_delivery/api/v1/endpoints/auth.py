import re
from typing import Annotated, AnyStr, Dict

from fastapi import APIRouter, Body, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from smart_delivery.api.dependencies import get_session, validate_refresh_token
from smart_delivery.api.services import user_service
from smart_delivery.core.jwt import create_jwt_pair
from smart_delivery.core.security import hash_, verify
from smart_delivery.database.tables.entities import User
from smart_delivery.schemas import UserWithPasswordSchema
from smart_delivery.schemas.responses import StandardResponse, TokenResponse

router = APIRouter(
    prefix="/auth",
    tags=["authorization"],
)


@router.post(
    "/sign_in",
    response_model=TokenResponse,
    status_code=status.HTTP_200_OK,
    summary="Authentication.",
)
async def sign_in(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """Authentication method.

    In the body of the request, receives the user's authentication data (username, password),
    performs authentication and returns a JWT.

    Parameters
    ----------
    form_data : OAuth2PasswordRequestForm
        User authentication data.
    session : AsyncSession
        Request session object.

    Returns
    -------
    response : TokenResponse
        Server response model with a nested JWT pair.
    """
    user = await user_service.get_user_by_username(session, form_data.username)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not verify(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return {**await _get_jwt_pair(user, session), "token_type": "bearer"}


@router.post(
    "/sign_up",
    response_model=StandardResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Registration.",
)
async def sign_up(
    user: Annotated[UserWithPasswordSchema, Body()],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """Registration method.

    Receives a user model (with password) as input and adds a record to the database.

    Parameters
    ----------
    user : UserWithPasswordSchema
        User object schema.
    session : AsyncSession
        Request session object.

    Returns
    -------
    response : StandardResponse
        Positive feedback about user registration.
    """
    user.password = hash_(user.password)

    try:
        await user_service.add_user(session, user)
    except IntegrityError as integrity_error:
        await session.rollback()

        if result := re.search(r'"\((.*)\)=\((.*)\)"', str(integrity_error.orig)):
            column, value = result.groups()

            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f'User with {column}="{value}" already exists!',
            )

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Not enough data in request.",
        )

    return {"code": status.HTTP_201_CREATED, "message": "User created successfully."}


@router.get(
    "/refresh",
    response_model=TokenResponse,
    status_code=status.HTTP_200_OK,
    summary="Refresh access token.",
)
async def refresh(
    user: Annotated[User, Depends(validate_refresh_token)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """Re-authentication method via refresh token.

    Gets a refresh_token in the header, checks for a match in the database
    using the encoded information, overwrites the refresh token in the database and
    returns a new ``access_token`` + ``refresh_token`` pair.

    Parameters
    ----------
    user : User
        The user is derived from a dependency on automatic authentication.
    session : AsyncSession
        Request session object.

    Returns
    -------
    response : TokenResponse
        Server response model with a nested JWT pair.
    """
    return {**await _get_jwt_pair(user, session), "token_type": "bearer"}


async def _get_jwt_pair(user: User, session: AsyncSession) -> Dict[AnyStr, AnyStr]:
    """A function to create a new pair of JWTs.

    Creates an ``access_token`` and ``refresh_token`` pair, overwrites the user's refresh token
    in the database and returns a JWT pair.

    Parameters
    ----------
    user : User
        User's ORM.
    session : AsyncSession
        Request session object.

    Returns
    -------
    tokens : Dict[AnyStr, AnyStr]
        A pair of JWTs in the form of a dictionary with two keys: access_token and refresh_token.

        ``access_token``:
            Access token (``str``).
        ``refresh_token``:
            Refresh token (``str``).
    """
    tokens = create_jwt_pair({"sub": user.username})

    try:
        await user_service.update_refresh_token(session, user, tokens["refresh_token"])
    except IntegrityError:
        await session.rollback()

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect request.",
        )

    return tokens
