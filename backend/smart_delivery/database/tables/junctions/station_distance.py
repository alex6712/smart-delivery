from typing import TYPE_CHECKING

from sqlalchemy import ForeignKeyConstraint, PrimaryKeyConstraint
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)
from sqlalchemy.types import Integer

from smart_delivery.database.tables.base import Base

if TYPE_CHECKING:
    from smart_delivery.database.tables.entities import RailwayStation


class StationDistance(Base):
    __tablename__ = "station_distance"

    __table_args__ = (
        PrimaryKeyConstraint("from_code", "to_code", name="station_distance_pk"),
        ForeignKeyConstraint(
            ["from_code"],
            ["railway_station.code"],
            name="station_distance_from_code_fk",
            onupdate="CASCADE",
            ondelete="CASCADE",
        ),
        ForeignKeyConstraint(
            ["to_code"],
            ["railway_station.code"],
            name="station_distance_to_code_fk",
            onupdate="CASCADE",
            ondelete="CASCADE",
        ),
        {
            "comment": "Table representing stations' distances.",
        },
    )

    from_code: Mapped[int] = mapped_column(Integer())
    to_code: Mapped[int] = mapped_column(Integer())
    distance: Mapped[int] = mapped_column(Integer())

    from_station: Mapped["RailwayStation"] = relationship(
        "RailwayStation",
        back_populates="to_stations",
        foreign_keys=[from_code],
    )
    to_station: Mapped["RailwayStation"] = relationship(
        "RailwayStation",
        back_populates="from_stations",
        foreign_keys=[to_code],
    )

    def __repr__(self) -> str:
        return (
            f"<{self.__class__.__name__}("
            f"from_code={self.from_code!r}, "
            f"to_code={self.to_code!r}, "
            f"distance={self.distance!r}"
            f")>"
        )
