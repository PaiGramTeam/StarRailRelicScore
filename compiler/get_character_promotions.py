from httpx import get

url = "https://raw.githubusercontent.com/fribbels/hsr-optimizer/main/src/data/character_promotions.json"


def get_content() -> str:
    req = get(url)
    return req.text


def save_content(content: str) -> None:
    with open(
        "../src/starrailrelicscore/data/character_promotions.json",
        "w",
        encoding="utf-8",
    ) as file:
        file.write(content)


def main():
    content = get_content()
    save_content(content)


if __name__ == "__main__":
    main()
