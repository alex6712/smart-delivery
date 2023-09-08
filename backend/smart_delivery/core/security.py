from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_(
    secret: str | bytes, scheme: str = None, category: str = None, **kwargs
) -> str:
    """Proxy for ``CriptContext.hash()`` method.

    Gets the parameters needed to perform hashing and returns the result.

    Parameters
    ----------
    secret : str or bytes
        The password to be hashed.
    scheme : str or bytes, optional
        The scheme by which hashing will be performed. Optional argument.
        If not passed, the schema given to the context will be used.

        .. deprecated:: 1.7
            Support for this keyword has been deprecated and will be removed in Passlib 2.0.
    category : str, optional
        If specified, any category-related default values
        will be changed to the default values of that category.

    Returns
    -------
    hashed : str or bytes
        Password hashed according to the established scheme and settings.
    """
    return pwd_context.hash(secret, scheme, category, **kwargs)


def verify(
    secret: str | bytes,
    hashed: str | bytes,
    scheme: str = None,
    category: str = None,
    **kwargs
) -> bool:
    """Proxy for ``CriptContext.verify()`` method.

    Checks the passed password against the passed hash.

    Parameters
    ----------
    secret : str or bytes
        The password being checked.
    hashed : str or bytes
        Hashed password.
    scheme : str or bytes, optional
        The scheme by which hashing will be performed. Optional argument.
        If not passed, the schema given to the context will be used.

        .. deprecated:: 1.7
            Support for this keyword has been deprecated and will be removed in Passlib 2.0.
    category : str, optional
        If specified, any category-related default values
        will be changed to the default values of that category.

    Returns
    -------
    equality : bool
        ``True`` if the password hash matches the one passed, ``False`` otherwise.
    """
    return pwd_context.verify(secret, hashed, scheme, category, **kwargs)
