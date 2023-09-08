from uuid import UUID

from pydantic import EmailStr, Field
from pydantic_extra_types.phone_numbers import PhoneNumber

from .standard import StandardResponse


class UserResponse(StandardResponse):
    """A response model with user data.

    Used as a response from the server to a query about a user.

    See Also
    --------
    schemas.responses.standard.StandardResponse
    schemas.user.UserSchema

    Attributes
    ----------
    id : UUID
        User's UUID.
    username : str
        User login.
    email : EmailStr
        The user's email address.
    phone : PhoneNumber
        The user's mobile phone number.
    """

    id: UUID = Field(example="7a0fac1b-0ff6-46ab-906b-a4eb173bce21")
    username: str = Field(example="someone")
    email: EmailStr = Field(default=None, example="someone@post.domen")
    phone: PhoneNumber = Field(default=None, example="+7 900 000-00-00")
