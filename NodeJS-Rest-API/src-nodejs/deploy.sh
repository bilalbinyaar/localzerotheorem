docker build -t node-docker-project .
docker tag node-docker-project gcr.io/zt-backend-381310/redis-rest-api
docker push gcr.io/zt-backend-381310/redis-rest-api