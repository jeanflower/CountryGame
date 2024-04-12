import pytest
from app.findPaths import (
    hasCodeFromName,
    hasNameFromCode,
    findCodeFromName,
    findNameFromCode,
    getNeighbors,
    getShortestPathUsingCodes,
    getShortestPathUsingNames,
)


def test_hasCodeFromName():
    assert hasCodeFromName("United Kingdom") == True
    assert hasCodeFromName("junk") == False


def test_hasNameFromCode():
    assert hasNameFromCode("GB") == True
    assert hasNameFromCode("junk") == False


def test_findCodeFromName():
    assert findCodeFromName("United Kingdom") == "GB"
    assert findCodeFromName("junk") == "junk"


def test_findNameFromCode():
    assert findNameFromCode("GB") == "United Kingdom"
    assert findNameFromCode("junk") == "junk"


def test_getNeighbors():
    assert getNeighbors("") == []
    assert getNeighbors("junk") == []
    # neighours of Kuwait
    # by code
    assert getNeighbors("KW") == ["IQ", "SA"]
    # by name
    assert getNeighbors(findCodeFromName("Kuwait")) == [
        findCodeFromName("Iraq"),
        findCodeFromName("Saudi Arabia"),
    ]


def test_getShortestPathUsingCodes():
    assert getShortestPathUsingCodes("IQ", "IQ") == ["IQ"]
    assert getShortestPathUsingCodes("IQ", "SA") == ["IQ", "SA"]
    assert getShortestPathUsingCodes("IQ", "GB") == []

    assert getShortestPathUsingCodes("junk", "GB") == []

def test_getShortestPathUsingName():
    assert getShortestPathUsingNames("Iraq", "Iraq") == ["Iraq"]
    assert getShortestPathUsingNames("Iraq", "Saudi Arabia") == ["Iraq", "Saudi Arabia"]
    assert getShortestPathUsingNames("Iraq", "United Kingdom") == []

    assert getShortestPathUsingNames("junk", "United Kingdom") == ['ERROR not recognised junk']
