import uuid

from sqlalchemy import PrimaryKeyConstraint, UniqueConstraint, func
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
)
from sqlalchemy.types import String, Uuid

from smart_delivery.database.tables.base import Base


class User(Base):
    __tablename__ = "user"

    __table_args__ = (
        PrimaryKeyConstraint("id", name="user_pkey"),
        UniqueConstraint("username", name="user_username_uk"),
        UniqueConstraint("email", name="user_email_uk"),
        UniqueConstraint("phone", name="user_phone_uk"),
        {
            "comment": "Table for users of Genshin Impact Characters Analyzer.",
        },
    )

    id: Mapped[uuid.UUID] = mapped_column(Uuid(), server_default=func.gen_random_uuid())
    username: Mapped[str] = mapped_column(String(256))
    password: Mapped[str] = mapped_column(String(256))
    email: Mapped[str] = mapped_column(String(256), nullable=True)
    phone: Mapped[str] = mapped_column(String(256), nullable=True)
    refresh_token: Mapped[str] = mapped_column(
        String(256), nullable=True, comment="Refresh token for access token."
    )

    def __repr__(self) -> str:
        return (
            f"<{self.__class__.__name__}("
            f"id={self.id!r}, "
            f"username={self.username!r}, "
            f"password={self.password!r}, "
            f"email={self.email!r}, "
            f"phone={self.phone!r}, "
            f"refresh_token={self.refresh_token!r}"
            f")>"
        )
