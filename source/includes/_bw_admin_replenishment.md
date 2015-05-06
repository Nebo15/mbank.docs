#(BW ADM) Точки пополнения

##Загрузка списка точек пополения
```shell
curl -uuser:user http://api.mbank.dev/adm2/replenishment_points?size=1
```

```json
{
    "meta": {
        "page": {
            "total_elements": 235
        },
        "code": 200
    },
    "data": [
        {
            "id": "547f1cf956c35f0d41967779",
            "type": {
                "ru_RU": "Терминал",
                "en_US": null
            },
            "worktime": {
                "ru_RU": "Круглосуточно",
                "en_US": null
            },
            "address": {
                "ru_RU": "Ясный , пр.Ленина 2",
                "en_US": null
            },
            "longitude": 55.144997,
            "latitude": 51.789234,
            "localized_fields": [
                "type",
                "worktime",
                "address"
            ]
        }
    ]
}
```
### Параметры (опциональные)
* `page` - номер (начиная с 0) страницы, которую запрашивает клиент, по умолчанию 0
* `size` - размер страницы, которую запрашивает клиент, по умолчанию 20

### Ответ
* `id` - идентификатор точки пополнения
* `type` - тип точки
* `worktime` - время работы
* `address` - адрес
* `longitude` - долгота
* `latitude` - широта
* `localized_fields` - массив с локализированными полями

##Получение точки пополнения по id

```shell
$ curl -uuser:user http://api.mbank.dev/adm2/replenishment_point/547f1cf956c35f0d41967779
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": "547f1cf956c35f0d41967779",
        "type": {
            "ru_RU": "Терминал",
            "en_US": null
        },
        "worktime": {
            "ru_RU": "Круглосуточно",
            "en_US": null
        },
        "address": {
            "ru_RU": "Ясный , пр.Ленина 2",
            "en_US": null
        },
        "longitude": 55.144997,
        "latitude": 51.789234,
        "localized_fields": [
            "type",
            "worktime",
            "address"
        ]
    }
}
```

##Добавление точки пополнения (руками)

```shell
curl -uuser:user -d '{"type":"Type?Oo","worktime":"Worktime","address":"Some address string","latitude":151413.123,"longitude":100500.123,"projects":"mbank"}' http://api.mbank.dev/adm2/replenishment_point
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": "55426441cccc90b39a0041af",
        "type": {
            "ru_RU": "Type?Oo",
            "en_US": null
        },
        "worktime": {
            "ru_RU": "Worktime",
            "en_US": null
        },
        "address": {
            "ru_RU": "Some address string",
            "en_US": null
        },
        "longitude": 100500.123,
        "latitude": 151413.123,
        "localized_fields": [
            "type",
            "worktime",
            "address"
        ]
    }
}
```

###Поля
* `type` - тип точки
* `worktime` - время работы
* `address` - адрес
* `longitude` - долгота
* `latitude` - широта

##Изменение точки пополнения

```shell
curl -H 'Content-type:application/json' -X POST -uuser:user -d '{"id":"5542670dcccc9049990041b9","type":{"ru_RU":"Type","en_US":"Type english"},"worktime":{"ru_RU":"Worktime","en_US":null},"address":{"ru_RU":"Address ru","en_US":"Address en"},"latitude":1514113.123,"longitude":1005100.123}' http://api.mbank.dev/adm2/replenishment_point
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": "5542670dcccc9049990041b9",
        "type": {
            "ru_RU": "Type",
            "en_US": "Type english"
        },
        "worktime": {
            "ru_RU": "Worktime",
            "en_US": null
        },
        "address": {
            "ru_RU": "Address ru",
            "en_US": "Address en"
        },
        "longitude": 1005100.123,
        "latitude": 1514113.123,
        "localized_fields": [
            "type",
            "worktime",
            "address"
        ]
    }
}
```

Аналогичный запрос, как и при добавлении, но с передачей id точки

##Добавление точек пополнения из файла

```shell
curl -uuser:user -H 'Content-Type: multipart/form-data' -X POST -F "file=@path_to_file/replenishment_points.csv" http://api.mbank.dev/adm2/replenishment_points_file
```

```json
{
    "meta": {
        "code": 200
    },
    "data": [
        {
            "id": "554267d9cccc9000a90041b1",
            "type": {
                "ru_RU": "Терминал",
                "en_US": null
            },
            "worktime": {
                "ru_RU": "Абдулино",
                "en_US": null
            },
            "address": {
                "ru_RU": "Абдулино, ул. Коммунистическая, д. 85",
                "en_US": null
            },
            "longitude": 53.648503,
            "latitude": 53.693517,
            "localized_fields": [
                "type",
                "worktime",
                "address"
            ]
        },
        {
           "id": "554267dacccc9000a90041b2",
           "type": {
               "ru_RU": "Терминал",
               "en_US": null
           },
           "worktime": {
               "ru_RU": "Абдулино",
               "en_US": null
           },
           "address": {
               "ru_RU": "Абдулино, с.Северное , ул.Чапаева 41",
               "en_US": null
           },
           "longitude": 53.661618,
           "latitude": 53.680639,
           "localized_fields": [
               "type",
               "worktime",
               "address"
           ]
       }
    ]
}
```

В ответе будет список точек, которые были добавлены.
Пример формата файла:

| Тип; | Время работы; | Населенный пункт |
|------------------- |:------------------- |:------------|
| Терминал; | Круглосуточно; | Абдулино;ул. Коммунистическая, д. 85 |
| Терминал; | Круглосуточно; | Абдулино;с.Северное , ул.Чапаева 41 |

##Удаление точки пополнения

```shell
curl -uuser:user -X DELETE -d '{"id":"5542670dcccc9049990041b9"}' api.mbank.dev/adm2/replenishment_point
```

```json
{
    "meta": {
        "code": 200
    },
    "data": "5542670dcccc9049990041b9"
}
```
