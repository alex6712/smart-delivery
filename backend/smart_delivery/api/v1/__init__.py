from fastapi import APIRouter

from smart_delivery.api.v1.endpoints import (
    auth_router,
    delivery_router,
    root_router,
    users_router,
)

api_v1_router = APIRouter(
    prefix="/api/v1",
)
api_v1_router.include_router(auth_router)
api_v1_router.include_router(delivery_router)
api_v1_router.include_router(root_router)
api_v1_router.include_router(users_router)
