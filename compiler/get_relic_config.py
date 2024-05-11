from httpx import get

url = "https://raw.githubusercontent.com/PaiGramTeam/HonkaiStarRailWikiDataParser/remote/data/relic_config.json"


def get_content() -> str:
    req = get(url)
    return req.text


def save_content(content: str) -> None:
    with open(
        "../src/starrailrelicscore/data/relic_config.json", "w", encoding="utf-8"
    ) as file:
        file.write(content)


def main():
    content = get_content()
    save_content(content)


if __name__ == "__main__":
    main()
