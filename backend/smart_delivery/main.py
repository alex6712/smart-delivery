from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from smart_delivery.api.v1 import api_v1_router
from smart_delivery.core.config import get_settings

settings = get_settings()

tags_metadata = [
    {
        "name": "root",
        "description": "Getting information about **application**.",
    },
    {
        "name": "authorization",
        "description": "**Registration** and **authentication** operations.",
    },
    {
        "name": "users",
        "description": "Operations with **users**. Getting _information_ about them.",
    },
]

smart_delivery = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description=settings.APP_DESCRIPTION,
    summary=settings.APP_SUMMARY,
    contact={
        "name": settings.ADMIN_NAME,
        "email": settings.ADMIN_EMAIL,
    },
    openapi_tags=tags_metadata,
)

smart_delivery.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

smart_delivery.include_router(api_v1_router)
