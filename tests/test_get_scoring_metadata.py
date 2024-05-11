import pytest

from src.starrailrelicscore.client.db import get_scoring_metadata


@pytest.mark.asyncio
class TestScoringMetadata:
    @staticmethod
    def test_get_scoring_metadata_success():
        get_scoring_metadata(1205)

    @staticmethod
    @pytest.mark.xfail
    def test_get_scoring_metadata_failed():
        get_scoring_metadata(1)
