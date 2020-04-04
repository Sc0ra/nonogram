.PHONY: run deploy build-front deploy-front deploy-back

# Atomic receipes

run:
	docker-compose -f "docker-compose.yml" up -d --build

deploy: build-front deploy-front deploy-back

build-front:
	cd front && npm run build && cd ..

deploy-front:
	cd front && npm run deploy && cd ..

deploy-back:
	cd back && pipenv run zappa update dev && cd ..
