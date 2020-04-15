.PHONY: run deploy build-front deploy-front deploy-back

run:
	docker-compose -f "docker-compose.yml" up -d --build && cd front && npm run serve

deploy: build-front deploy-front deploy-back

build-front:
	cd front && npm run build && cd ..

deploy-front:
	cd front && npm run deploy && cd ..

deploy-back:
	cd back && pipenv run zappa update dev && cd ..
