import pytest
from httpx import Response
from fastapi.testclient import TestClient
from app.main import app


@pytest.fixture
def client():
    return TestClient(app)


def test_root(client):
    response: Response = client.get("/hello")
    assert response.status_code == 200
    assert response.json() == {"Hello": "World"}


def test_pathRaw(client):
    response: Response = client.get("/pathRaw?start=Germany&end=Portugal")
    assert response.status_code == 200
    assert response.json() == ["Germany", "France", "Spain", "Portugal"]

    response: Response = client.get("/pathRaw?start=Canada&end=Portugal")
    assert response.status_code == 200
    assert response.json() == []

    response: Response = client.get("/pathRaw?start=Germany&end=Germany")
    assert response.status_code == 200
    assert response.json() == ["Germany"]


def test_pathRaw_missing_end(client):
    response: Response = client.get("/pathRaw?start=Germany")
    assert response.status_code == 200
    assert response.json() == ["ERROR not recognised "]


def test_pathRaw_missing_start(client):
    response: Response = client.get("/pathRaw?end=Germany")
    assert response.status_code == 200
    assert response.json() == ["ERROR not recognised "]

# TODO how to test the other endpoints?
def test_root(client):
    # returns a page with a couple of links, for game and upload
    pass

def test_upload(client):
    # a POST whith takes a binary file
    pass

def test_game(client):
    # a page with input boxes and a submit button
    pass

def test_path(client):
    # a page with input boxes and a submit button
    pass
