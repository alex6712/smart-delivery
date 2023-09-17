from typing import TYPE_CHECKING

from sqlalchemy import PrimaryKeyConstraint
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)
from sqlalchemy.types import Integer, String, Float

from smart_delivery.database.tables.base import Base

if TYPE_CHECKING:
    from smart_delivery.database.tables.junctions import StationDistance


class RailwayStation(Base):
    __tablename__ = "railway_station"

    __table_args__ = (
        PrimaryKeyConstraint("code", name="railway_station_pkey"),
        {
            "comment": "Table for railway stations.",
        },
    )

    code: Mapped[int] = mapped_column(Integer())
    name: Mapped[str] = mapped_column(String())
    latitude: Mapped[float] = mapped_column(Float(), nullable=True)
    longitude: Mapped[float] = mapped_column(Float(), nullable=True)
    railway_name: Mapped[str] = mapped_column(String(256))

    to_stations: Mapped["StationDistance"] = relationship(
        "StationDistance",
        back_populates="from_station",
        foreign_keys="StationDistance.to_code",
    )
    from_stations: Mapped["StationDistance"] = relationship(
        "StationDistance",
        back_populates="to_station",
        foreign_keys="StationDistance.from_code",
    )

    def __repr__(self) -> str:
        return (
            f"<{self.__class__.__name__}("
            f"name={self.name!r}, "
            f"code={self.code!r}, "
            f"latitude={self.latitude!r}, "
            f"longitude={self.longitude!r}, "
            f"railway_name={self.railway_name!r}"
            f")>"
        )
