from __future__ import annotations

import logging
from datetime import UTC, date, datetime
from urllib.parse import urlparse

import httpx

from app.core.config import settings
from app.integrations.shared_models import MatchData
from app.integrations.sports.client import SportsAPIClient

logger = logging.getLogger(__name__)

_STATUS_MAP = {
    "TBD": "scheduled",
    "NS": "scheduled",
    "1H": "live",
    "HT": "live",
    "2H": "live",
    "ET": "live",
    "BT": "live",
    "P": "postponed",
    "SUSP": "suspended",
    "INT": "live",
    "FT": "finished",
    "AET": "finished",
    "PEN": "finished",
    "PST": "postponed",
    "CANC": "cancelled",
    "ABD": "cancelled",
    "AWD": "finished",
    "WO": "finished",
    "LIVE": "live",
}

_LEAGUE_CODE_MAP = {
    "PL": "39",
    "CL": "2",
    "SA": "135",
    "PD": "140",
    "BL1": "78",
    "FL1": "61",
}


class FootballDataSportsAPIClient(SportsAPIClient):
    def __init__(self) -> None:
        if not settings.football_data_api_key:
            raise ValueError("FOOTBALL_DATA_API_KEY is required when SPORTS_PROVIDER=football_data")
        self.base_url = settings.football_data_base_url.strip().strip('"').rstrip("/")
        host = urlparse(self.base_url).netloc
        self.headers = {
            "X-RapidAPI-Key": settings.football_data_api_key.strip().strip('"'),
            "X-RapidAPI-Host": host,
        }
        self.league_ids = [_LEAGUE_CODE_MAP.get(code, code) for code in settings.football_data_competition_codes]

    async def get_matches_for_date(self, target_date: date, locale: str) -> list[MatchData]:
        logger.info(
            "sports_api_call",
            extra={"provider": "api_football", "operation": "get_matches_for_date", "date": target_date.isoformat()},
        )
        matches: list[MatchData] = []
        async with httpx.AsyncClient(base_url=self.base_url, headers=self.headers, timeout=20.0) as client:
            for league_id in self.league_ids:
                season = _season_for_date(target_date)
                try:
                    response = await client.get("/fixtures", params={"league": league_id, "season": season, "date": target_date.isoformat()})
                    response.raise_for_status()
                    payload = response.json()
                except httpx.HTTPError:
                    logger.exception(
                        "sports_api_request_failed",
                        extra={"provider": "api_football", "league_id": league_id, "date": target_date.isoformat()},
                    )
                    continue
                if payload.get("message"):
                    logger.warning(
                        "sports_api_provider_message",
                        extra={"provider": "api_football", "league_id": league_id, "message": payload.get("message")},
                    )
                    continue
                matches.extend(self._map_match(match_payload) for match_payload in payload.get("response", []))

        unique_matches = {match.external_match_id: match for match in matches}
        return sorted(unique_matches.values(), key=lambda item: item.start_time)

    async def get_match_details(self, external_match_id: str, locale: str) -> MatchData | None:
        logger.info(
            "sports_api_call",
            extra={"provider": "api_football", "operation": "get_match_details", "external_match_id": external_match_id},
        )
        async with httpx.AsyncClient(base_url=self.base_url, headers=self.headers, timeout=20.0) as client:
            try:
                response = await client.get("/fixtures", params={"id": external_match_id})
                response.raise_for_status()
                payload = response.json()
            except httpx.HTTPError:
                logger.exception(
                    "sports_api_request_failed",
                    extra={"provider": "api_football", "external_match_id": external_match_id},
                )
                return None
        if payload.get("message"):
            logger.warning(
                "sports_api_provider_message",
                extra={"provider": "api_football", "external_match_id": external_match_id, "message": payload.get("message")},
            )
            return None
        fixtures = payload.get("response", [])
        if not fixtures:
            return None
        return self._map_match(fixtures[0])

    def _map_match(self, payload: dict) -> MatchData:
        fixture = payload.get("fixture") or {}
        league = payload.get("league") or {}
        teams = payload.get("teams") or {}
        home_team = teams.get("home") or {}
        away_team = teams.get("away") or {}
        status = (fixture.get("status") or {}).get("short") or "NS"
        home_name = home_team.get("name") or "Unknown home team"
        away_name = away_team.get("name") or "Unknown away team"
        competition_name = league.get("name") or "Football"
        venue = (fixture.get("venue") or {}).get("name")
        return MatchData(
            external_match_id=str(fixture.get("id")),
            competition_name=competition_name,
            home_team=home_name,
            away_team=away_name,
            start_time=_parse_datetime(fixture.get("date")),
            status=_STATUS_MAP.get(str(status).upper(), str(status).lower()),
            venue=venue,
            description=f"{home_name} vs {away_name} in {competition_name}",
        )


def _parse_datetime(value: str | None) -> datetime:
    if not value:
        return datetime.now(UTC)
    return datetime.fromisoformat(value.replace("Z", "+00:00"))


def _season_for_date(target_date: date) -> int:
    return target_date.year if target_date.month >= 7 else target_date.year - 1
