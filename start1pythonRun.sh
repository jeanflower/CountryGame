set -x # verbose mode for running script

uvicorn app.main:app
# simply starts the server 

# the following starts the server and opens a browser at the right page
#uvicorn app.main:app&
#open "http://localhost:8000"

# then we need to clean up and kill the process afterwards..
#
#ps
# lists processes
#
#ps | grep app.main:app | awk {'print $1'}
# lists the PIDs for commands matching app.main:app
# the last will always be this ps grep 
# the earlier one(s) will include the python invocations to start server
#
#kill 12345
# kills the process with PID = 12345

# jeanflower@MacBook-Pro CountryGame % ./start1pythonRun.sh                               
# + open http://localhost:8000
# + uvicorn app.main:app
# jeanflower@MacBook-Pro CountryGame % INFO:     Started server process [90672]
# INFO:     Waiting for application startup.
# INFO:     Application startup complete.
# INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
# INFO:     127.0.0.1:62828 - "GET / HTTP/1.1" 200 OK

# jeanflower@MacBook-Pro CountryGame % ps | grep app.main:app | awk {'print $1'}
# 90672
# 90705
# jeanflower@MacBook-Pro CountryGame % kill 90672                               
# jeanflower@MacBook-Pro CountryGame % INFO:     Shutting down
# INFO:     Waiting for application shutdown.
# INFO:     Application shutdown complete.
# INFO:     Finished server process [90672]
# jeanflower@MacBook-Pro CountryGame % 



