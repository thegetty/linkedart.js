import requests
import json
import os
import re

BASE_URL = "https://data.getty.edu/"

DATA_PATH = "."
TEST_DATA_PATH = "../data/mocks/"


def get_url(objId, path):
    """
    Extracts out the ID from the file 

    Args:
        objId (string): the objectId/filename
        path (string): the file path to look through

    Returns:
        url (string): the URL to download the updated record from
    """
    id = objId.replace(".json", "")
    with open(f"{path}/{id}.json", "r") as file:
        obj = json.load(file)
        fullId = obj["id"]
        file.close()
    url = fullId
    idParts = fullId.split("/")
    if len(idParts) < 2:
        return url

    url = ""
    for part in reversed(idParts):
        if "getty" not in part and "http" not in part:
            if url != "":
                url = part + "/" + url
            else:
                url = part
        if url[0] == "/":
            url = url[1:]
    return BASE_URL + url


def replace_test_files(path):
    """
    Replaces all UUID named files within the known path

    Args:
        path (string): the local file path to look through

    """
    for r, d, f in os.walk(path):
        for file in f:
            if ".json" in file and re.search(
                "^(\d+|\w{8}-\w{4}-\w{4}-\w{4}-\w{12}).json$", file
            ):
                url = get_url(file, r)
                print(url)
                if "http" in url:
                    newFile = requests.get(url)
                    with open(f"{r}/{file}", "w") as file:
                        file.write(json.dumps(newFile.json()))


replace_test_files(TEST_DATA_PATH)
