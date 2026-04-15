from __future__ import annotations

import logging

from app.db.base import Base
from app.db.session import engine
from app.models import admin_user, redirect_campaign, redirect_setting, stream_link  # noqa: F401

logger = logging.getLogger(__name__)


async def ensure_database_schema() -> None:
    async with engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)

    logger.info("database_schema_verified")
