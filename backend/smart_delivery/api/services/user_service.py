from typing import AnyStr

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from smart_delivery.database.tables.entities import User
from smart_delivery.schemas import UserWithPasswordSchema


async def get_user_by_username(session: AsyncSession, username: AnyStr) -> User:
    """Returns the user post model for further work.

    Parameters
    ----------
    session : AsyncSession
        Request session object.
    username : AnyStr
        User login, unique name.

    Returns
    -------
    user : User
        The model of the user record in the database.
    """
    return await session.scalar(select(User).where(User.username == username))


async def update_refresh_token(
    session: AsyncSession, user: User, refresh_token: AnyStr
):
    """Overwrites the user's refresh token.

    Note
    ----
    In this case, the SQLAlchemy ORM features are used, which allow you
    to change the attribute value of the user record object,
    and at the next session commit, these changes will be saved in the database.

    Parameters
    ----------
    session : AsyncSession
        Request session object.
    user : User
        User's ORM.
    refresh_token : AnyStr
        New refresh token.
    """
    user.refresh_token = refresh_token
    await session.commit()


async def add_user(session: AsyncSession, user_info: UserWithPasswordSchema):
    """Adds a user record to the database.

    Parameters
    ----------
    session : AsyncSession
        Request session object.
    user_info : UserWithPasswordSchema
        Schema of a user object with a password.
    """
    session.add(User(**user_info.model_dump()))
    await session.commit()
