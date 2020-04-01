.PHONY: run build build-front build-back push push-front push-back deploy deploy-front deploy-back


# Atomic receipes

run:
	docker-compose -f "docker-compose.yml" up -d --build

build: build-front build-back
	
build-front:
	docker build ./front/ -f ./front/prod.Dockerfile -t gcr.io/nomadic-mesh-272815/nonogram/front

build-back:
	docker build ./back/ -f ./back/prod.Dockerfile -t gcr.io/nomadic-mesh-272815/nonogram/back

push: push-front push-back

push-front:
	docker push gcr.io/nomadic-mesh-272815/nonogram/front:latest

push-back:
	docker push gcr.io/nomadic-mesh-272815/nonogram/back:latest

deploy: deploy-front deploy-back

deploy-front:
	kubectl apply -f deploy/manifests/front-deployments.yaml

deploy-back:
	kubectl apply -f deploy/manifests/back-deployments.yaml
