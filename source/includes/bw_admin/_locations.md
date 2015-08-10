#Точки пополнения

##Загрузка списка точек пополения
```shell
curl -uuser:user https://sandbox.wallet.best/adm2/locations/?size=1
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
            "id": "554ce380cccc9082250041f2",
            "name": {
                "ru_RU": "Имя точки пополнения 7",
                "en_US": null
            },
            "group": "verification",
            "type": {
                "ru_RU": "Терминал",
                "en_US": null
            },
            "worktime": {
                "ru_RU": "Круглосуточно",
                "en_US": null
            },
            "address": {
                "ru_RU": "Россия, Абдулино, Ясный пр.Ленина 2",
                "en_US": null
            },
            "longitude": 53.658752,
            "latitude": 53.690968,
            "localized_fields": [
                "name",
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
* `name` - имя точки пополнения
* `group` - группа точки [replenishment|verification|money_transfer]
* `type` - тип точки
* `worktime` - время работы
* `address` - адрес
* `longitude` - долгота
* `latitude` - широта
* `localized_fields` - массив с локализированными полями

##Получение точки пополнения по id

```shell
$ curl -uuser:user https://sandbox.wallet.best/adm2/locations/554ce380cccc9082250041f2
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": "554ce380cccc9082250041f2",
        "name": {
            "ru_RU": "Имя точки пополнения 7",
            "en_US": null
        },
        "type": {
            "ru_RU": "Терминал",
            "en_US": null
        },
        "group": "verification",
        "worktime": {
            "ru_RU": "Круглосуточно",
            "en_US": null
        },
        "address": {
            "ru_RU": "Россия, Абдулино, Ясный пр.Ленина 2",
            "en_US": null
        },
        "longitude": 53.658752,
        "latitude": 53.690968,
        "localized_fields": [
            "name",
            "type",
            "worktime",
            "address"
        ]
    }
}
```

##Добавление точки пополнения (руками)

```shell
curl -H 'Content-type:application/json' -uuser:user -d '{"type":"Type?Oo","worktime":"Worktime","name":"Some name","address":"Some address string","group":"Some group","source_id":"admin","latitude":151413.123,"longitude":100500.123,"projects":"mbank"}' https://sandbox.wallet.best/adm2/locations/
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": "554ce621cccc9093300041b3",
        "name": {
            "ru_RU": "Some name",
            "en_US": null
        },
        "type": {
            "ru_RU": "Type?Oo",
            "en_US": null
        },
        "group": "Some group",
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
            "name",
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
* `name` - имя точки
* `group` - группа [replenishment|verification|money_transfer]
* `source_id` - (admin|best|elecsnet)
* `address` - адрес
* `longitude` - долгота
* `latitude` - широта

##Изменение точки пополнения

```shell
curl -H 'Content-type:application/json' -X POST -uuser:user -d '{"type":{"ru_RU":"Type","en_US":"Type english"},"worktime":{"ru_RU":"Worktime","en_US":null},"address":{"ru_RU":"Address ru","en_US":"Address en"},"latitude":1514113.123,"longitude":1005100.123,"name":"Some name","group":"verification","source_id":"admin"}' https://sandbox.wallet.best/adm2/locations/554ce621cccc9093300041b3
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": "554ce621cccc9093300041b3",
        "name": {
            "ru_RU": "Some name",
            "en_US": null
        },
        "type": {
            "ru_RU": "Type",
            "en_US": "Type english"
        },
        "group": "verification",
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
            "name",
            "type",
            "worktime",
            "address"
        ]
    }
}
```

Аналогичный запрос, как и при добавлении

##Добавление точек пополнения из файла

```shell
curl -uuser:user -H 'Content-Type: multipart/form-data' -X POST -F "file=/Users/Samorai/www/mbank.api/tests/data/csv/replenishment_points.csv" https://sandbox.wallet.best/adm2/locations/file
```

```json
{
    "meta": {
        "code": 200
    },
    "data": [
        {
            "id": "554ce7fecccc90d8240041e7",
            "name": {
                "ru_RU": "Имя точки пополнения 1",
                "en_US": null
            },
            "type": {
                "ru_RU": "Терминал",
                "en_US": null
            },
            "worktime": {
                "ru_RU": "Круглосуточно",
                "en_US": null
            },
            "address": {
                "ru_RU": "Россия, Абдулино, ул. Коммунистическая д. 85",
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
           "id": "554ce7ffcccc90d8240041e8",
           "name": {
               "ru_RU": "Имя точки пополнения 2",
               "en_US": null
           },
           "type": {
               "ru_RU": "Терминал",
               "en_US": null
           },
           "worktime": {
               "ru_RU": "Круглосуточно",
               "en_US": null
           },
           "address": {
               "ru_RU": "Россия, Абдулино, с.Северное ул.Чапаева 41",
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


Имя;Адрес;Тип;group;Время работы;source_id
Имя точки пополнения 1;Россия, Абдулино, ул. Коммунистическая д. 85;Терминал;verification;Круглосуточно;admin
Имя точки пополнения 2;Россия, Абдулино, с.Северное ул.Чапаева 41;Терминал;verification;Круглосуточно;admin

В ответе будет список точек, которые были добавлены.
Пример формата файла:

| Имя; | Адрес; | Тип; | group; | Время работы; | source_id |
|------------------- |:------------------- |:------------|:------------|:------------|:------------|
| Имя точки пополнения 1; | Россия, Абдулино, ул. Коммунистическая д. 85; | Терминал; | verification; | Круглосуточно; | admin; |
| Имя точки пополнения 2; | Абдулино, с.Северное ул.Чапаева 41; | Терминал; | verification; | Круглосуточно; | admin; |

##Удаление точки пополнения

```shell
curl -uuser:user -X DELETE sandbox.wallet.best/adm2/locations/554ce815cccc9056320041d3
```

```json
{
    "meta": {
        "code": 200
    }
}
```
