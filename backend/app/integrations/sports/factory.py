from __future__ import annotations

from functools import lru_cache

from app.core.config import settings
from app.integrations.sports.client import SportsAPIClient
from app.integrations.sports.football_data import FootballDataSportsAPIClient
from app.integrations.sports.mock import MockSportsAPIClient


@lru_cache
def get_sports_client() -> SportsAPIClient:
    provider = settings.sports_provider.lower()
    if provider == "mock":
        return MockSportsAPIClient()
    if provider == "football_data":
        return FootballDataSportsAPIClient()
    raise ValueError(f"Unsupported sports provider: {settings.sports_provider}")
