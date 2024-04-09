docker build -t myimage .
docker stop mycontainer
docker rm mycontainer
# The port 8123 is also referenced
# in the Dockerfile for the env variable
docker run -d --name mycontainer -p 8123:3000 myimage
open "http://localhost:8123"

# list containers
# docker ps -a
