.PHONY: run build build-front build-back push push-front push-back deploy deploy-front deploy-back


# Atomic receipes

run:
	docker-compose -f "docker-compose.yml" up -d --build


deploy: deploy-front deploy-back

deploy-front:
	cd front && npm run build && npm run deploy && cd ..

deploy-back:
	cd back && pipenv run zappa update dev && cd ..
