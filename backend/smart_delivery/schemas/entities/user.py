from pydantic import BaseModel, EmailStr, Field
from pydantic_extra_types.phone_numbers import PhoneNumber


class UserWithPasswordSchema(BaseModel):
    """Scheme of the user object with password.

    Used as a representation of information about the user, including the password.

    Attributes
    ----------
    username : str
        User login.
    email : EmailStr
        The user's email address.
    phone : PhoneNumber
        The user's mobile phone number.
    password : str
        User password.
    """

    username: str = Field(example="someone")
    email: EmailStr = Field(default=None, example="someone@post.domen")
    phone: PhoneNumber = Field(default=None, example="+7 900 000-00-00")
    password: str = Field(example="password")
