from fastapi import status
from pydantic import BaseModel, Field


class StandardResponse(BaseModel):
    """Standard response model from the server.

    Used as the base response model for any request from this application.

    This means that any response from the server will contain the response code ``code``
    and a message from the server ``message`` in the body of the response.

    See Also
    --------
    pydantic.BaseModel

    Attributes
    ----------
    code : int
        The status code of the response from the server.
    message : str
        Message from the server.
    """

    code: int = Field(default=status.HTTP_200_OK, example=status.HTTP_200_OK)
    message: str = Field(default="Success!", example="Success!")
