from __future__ import annotations

from functools import lru_cache

from app.core.config import settings
from app.integrations.news.client import NewsAPIClient
from app.integrations.news.gnews import GNewsAPIClient
from app.integrations.news.mock import MockNewsAPIClient


@lru_cache
def get_news_client() -> NewsAPIClient:
    provider = settings.news_provider.lower()
    if provider == "mock":
        return MockNewsAPIClient()
    if provider == "gnews":
        return GNewsAPIClient()
    raise ValueError(f"Unsupported news provider: {settings.news_provider}")
