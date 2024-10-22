from httpx import get

url = "https://raw.githubusercontent.com/PaiGramTeam/hsr-optimizer/main/src/data/game_data.json"


def get_content() -> str:
    req = get(url)
    return req.text


def save_content(content: str) -> None:
    for p in [
        "../src/starrailrelicscore/data/game_data.json",
        "hsr-optimizer-api/src/data/game_data.json",
    ]:
        with open(p, "w", encoding="utf-8") as file:
            file.write(content)


def main():
    content = get_content()
    save_content(content)


if __name__ == "__main__":
    main()
