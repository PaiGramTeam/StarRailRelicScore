from get_metadata import main as get_metadata
from get_character_promotions import main as get_character_promotions
from get_relic_config import main as get_relic_config


def main():
    get_metadata()
    get_character_promotions()
    get_relic_config()


if __name__ == "__main__":
    main()
