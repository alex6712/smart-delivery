import asyncio

import uvicorn

from smart_delivery.core.config import get_settings
from smart_delivery.database import main

if __name__ == "__main__":
    settings = get_settings()

    if settings.INITIALIZE_DB:
        asyncio.run(main())

    uvicorn.run(
        app="smart_delivery.main:smart_delivery",
        host=settings.DOMAIN,
        port=settings.BACKEND_PORT,
        reload=settings.DEV_MODE,
    )
