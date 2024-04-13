# See https://fastapi.tiangolo.com/deployment/docker/#build-a-docker-image-for-fastapi
# See https://fastapi.tiangolo.com/tutorial/request-files/
# for VSCode to stop warnings, install dependencies locally e.g.
# python3 -m pip3 install fastapi

from fastapi import FastAPI, File, UploadFile
from fastapi.responses import HTMLResponse
import shutil
import cv2

# https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
# https://fastapi.tiangolo.com/tutorial/cors/
from fastapi.middleware.cors import CORSMiddleware

from .findPaths import getShortestPathUsingNames

# print(cv2.__version__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins="*", #Tell browsers we allow cross-origin traffic
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/hello")
def read_root():
    return {"Hello": "World"}

# the endpoint to receive a file
@app.post("/uploadFile/")
async def create_upload_file(file: UploadFile = File(...)):
    file_location = f"/tmp/{file.filename}"
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)

    sample_image = cv2.imread(file_location)
    mean = sample_image.mean()
    return {
        "info": f"file '{file.filename}' saved at '{file_location}', mean val {mean}"
    }


@app.get("/")
async def main():
    content = """
<!DOCTYPE html>
<html>
<head>
    <title>Python app demo</title>
</head>
<body>
    <a href='/game'>game</a>
    <br/>
    <a href='/upload'>upload file</a>
</body>
</html>
    """
    return HTMLResponse(content=content)

# the page to allow users to upload a file
@app.get("/upload")
async def main():
    content = """
<!DOCTYPE html>
<html>
<head>
    <title>Upload</title>
</head>
<body>
    <form action="/uploadFile/" method="post" enctype="multipart/form-data">
        <!-- File input field -->
        <label for="file">Choosen file will be saved on server :</label>
        <input type="file" id="file" name="file" accept=".txt, .pdf, .jpg, .png">
 
        <br><br>
         
        <!-- Submit button -->
        <input type="submit" value="Upload">
    </form>
</body>
</html>
    """
    return HTMLResponse(content=content)


def getHTMLForGame(start="", end="", path=""):
    result = """
<!DOCTYPE html>
<html>
<head>
    <title>Country paths</title>
</head>
<body>
    <form action="/path" method="get">
        <!-- File input field -->
        <input type="text" id="start" name="start">
        <input type="text" id="end" name="end">

        <br><br>
        
        <!-- Submit button -->
        <input type="submit" value="Get path">
    </form>
"""
    if start != "":
        # This signals that we have played
        result = (
            result
            + "Path from "
            + start
            + " to "
            + end
            + """
<div>
"""
        )
        if len(path) == 0:
            result = result + "You shall not pass"
        for country in path:
            result = result + "<br/>" + country
        result = (
            result
            + """
  </div>"""
        )
    result = (
        result
        + """
</body>
</html>
    """
    )
    return result


@app.get("/game")
async def main():
    content = getHTMLForGame()
    return HTMLResponse(content=content)


@app.get("/path")
async def find_path(start: str = "", end: str = ""):

    path = getShortestPathUsingNames(start, end)
    print(path)

    content = getHTMLForGame(start, end, path)
    return HTMLResponse(content=content)


@app.get("/pathRaw")
async def find_path(start: str = "", end: str = ""):
    path = getShortestPathUsingNames(start, end)
    return path
