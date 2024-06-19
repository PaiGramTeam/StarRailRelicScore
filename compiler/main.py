from get_metadata import main as get_metadata
from get_game_data import main as get_game_data
from get_relic_config import main as get_relic_config


def main():
    get_metadata()
    get_game_data()
    get_relic_config()


if __name__ == "__main__":
    main()
