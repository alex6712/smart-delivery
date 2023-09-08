from datetime import datetime, timedelta
from typing import AnyStr, Dict

from jose import jwt

from smart_delivery.core.config import get_settings

settings = get_settings()


def jwt_encode(to_encode: Dict) -> AnyStr:
    """Encodes the passed dictionary into a JWT.

    Parameters
    ----------
    to_encode : Dict
        The dictionary to be nested in the JWT.

    Returns
    -------
    token : AnyStr
        JSON Web Token.
    """
    return jwt.encode(
        to_encode, key=settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM
    )


def jwt_decode(token: AnyStr) -> Dict:
    """Decodes the passed JWT into a dictionary.

    Parameters
    ----------
    token : AnyStr
        JWT from which the dictionary will be obtained.

    Returns
    -------
    dictionary : Dict
        Dictionary with information from JWT.
    """
    return jwt.decode(
        token, key=settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM]
    )


def create_jwt(data: Dict, expires_delta: timedelta) -> AnyStr:
    """Creates a JWT.

    As input, it receives information for encoding and the life of the token.

    Parameters
    ----------
    data : Dict
        Dictionary with data.
    expires_delta : timedelta
        Token lifetime.

    Returns
    -------
    token : AnyStr
        JSON Web Token.
    """
    to_encode = data.copy()
    to_encode.update({"exp": datetime.utcnow() + expires_delta})

    return jwt_encode(to_encode)


def create_jwt_pair(
    access_token_data: Dict,
    refresh_token_data: Dict = None,
    at_expires_delta: timedelta = timedelta(
        minutes=settings.ACCESS_TOKEN_LIFETIME_MINUTES
    ),
    rt_expires_delta: timedelta = timedelta(days=settings.REFRESH_TOKEN_LIFETIME_DAYS),
) -> Dict[AnyStr, AnyStr]:
    """Creates a JWT pair consisting of an access token and a refresh token.

    Parameters
    ----------
    access_token_data : Dict
        The information to be encoded into the access token.
    refresh_token_data : Dict
        The information to be encoded into the refresh token.
    at_expires_delta : timedelta
        The lifetime of the access token.
    rt_expires_delta : timedelta
        Refresh token lifetime.

    Returns
    -------
    tokens : Dict[AnyStr, AnyStr]
        JWT pair (access_token + refresh_token).
    """
    if refresh_token_data is None:
        refresh_token_data = access_token_data

    return {
        "access_token": create_jwt(access_token_data, at_expires_delta),
        "refresh_token": create_jwt(refresh_token_data, rt_expires_delta),
    }
