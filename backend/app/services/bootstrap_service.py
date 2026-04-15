from __future__ import annotations

import logging

from sqlalchemy import select

from app.core.config import settings
from app.core.security import get_password_hash
from app.db.session import SessionLocal
from app.models.admin_user import AdminUser

logger = logging.getLogger(__name__)


async def ensure_bootstrap_admin() -> None:
    if not settings.should_bootstrap_admin:
        return

    async with SessionLocal() as session:
        existing_result = await session.execute(
            select(AdminUser).where(
                (AdminUser.username == settings.admin_bootstrap_username)
                | (AdminUser.email == settings.admin_bootstrap_email)
            )
        )
        existing = existing_result.scalar_one_or_none()

        if existing is not None:
            existing.username = settings.admin_bootstrap_username
            existing.email = settings.admin_bootstrap_email
            existing.password_hash = get_password_hash(settings.admin_bootstrap_password)
            existing.is_active = True
            existing.is_superuser = True
            await session.commit()
            logger.info("bootstrap_admin_updated", extra={"username": settings.admin_bootstrap_username})
            return

        admin = AdminUser(
            username=settings.admin_bootstrap_username,
            email=settings.admin_bootstrap_email,
            password_hash=get_password_hash(settings.admin_bootstrap_password),
            is_active=True,
            is_superuser=True,
        )
        session.add(admin)
        await session.commit()
        logger.info("bootstrap_admin_created", extra={"username": settings.admin_bootstrap_username})
