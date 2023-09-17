from pydantic import Field

from .standard import StandardResponse


class RailwayDeliveryResponse(StandardResponse):
    distance: int = Field(examples=[1000])
    cost: int = Field(examples=[100_000])
