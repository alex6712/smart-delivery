from pydantic import Field

from .standard import StandardResponse


class TokenResponse(StandardResponse):
    """Response model with nested JWT.

    Used as a response from the server to an authorization request.

    Attributes
    ----------
    access_token : str
        JSON Web Token, access token.
    refresh_token : str
        JSON Web Token, refresh token.
    token_type : str
        return token type.
    """

    access_token: str = Field(
        example="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
        ".eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ"  # noqa
        ".SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    )  # noqa
    refresh_token: str = Field(
        example="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
        ".eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ"  # noqa
        ".SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    )  # noqa
    token_type: str = Field(example="bearer")
