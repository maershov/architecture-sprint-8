### Инструкция по настройке перед запуском
Заменить  IP (192.168.1.69) на адрес машины, с которой производим запуск 
localhost не использовать, порты не менять

Адрес менять в следующих файлах:
- frontend/.env
- docker-compose.yaml
- keycloak/realm-export.json

Запуск:

`docker-compose up -d`
