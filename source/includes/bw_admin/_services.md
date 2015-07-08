#Сервисы

##Загрузка списка сервисов

```shell
curl -H 'X-Project-ID:mbank' -X GET -u user:user "http://sandbox.wallet.best/adm2/services/?size=1"
```

```json
{
    "meta": {
        "page": {
            "page": 1,
            "size": "1",
            "total_elements": 239
        },
        "code": 200
    },
    "data": [
        {
            "id": "53359fb2255c741a749f0c44",
            "mserver_id": 1000,
            "name": {
                "ru_RU": "Теле2",
                "en_US": "Tele2"
            },
            "groups": [
                {
                    "id": "53359fb2255c741a749f0c42",
                    "name": {
                        "ru_RU": "Мобильная связь",
                        "en_US": "Cellular providers"
                    },
                    "type": "cellular",
                    "keywords": "",
                    "position": 8,
                    "amount": 0,
                    "localized_fields": [
                        "name"
                    ]
                }
            ],
            "image_exists": true,
            "image_url": "http:\/\/sandbox.wallet.best\/img\/services\/53359fb2255c741a749f0c44.png?1422632666",
            "status": "online",
            "keywords": "",
            "labels": {
                "changed": false,
                "verification_required": false,
                "autopayment_service": false,
                "in_mserver": true,
                "is_hidden": false,
                "is_enabled": true
            },
            "rate": {
                "fix": 0,
                "percent": 0
            },
            "mnp_provider_id": null,
            "mnp_provider_region_code": null,
            "localized_fields": [
                "name",
                "group"
            ]
        }
    ]
}
```
### Параметры (опциональные)
* `page` - номер (начиная с 0) страницы, которую запрашивает клиент, по умолчанию 0
* `size` - размер страницы, которую запрашивает клиент, по умолчанию 20
* `group_id` - id группы, к которой привязан сервис
* `name` - имя сервиса (поиск)
* `status` - статус сервиса [online|offline]
* `mserver_ids` - фильтр по mserver_id (через запятую)
* `services_ids` - фильтр по id (через запятую)
* `is_enabled` - вкл/выкл


###Поля
* `id` - Идентификатор
* `mserver_id` - id сервиса на мсервере
* `name` - Название сервиса
* `group` - Группа, к которой принадлежит сервис
* `image_exists` - Существует ли изображение
* `image_url` - Линк на изображение
* `status` - Статус сервиса (online|offline)
* `keywords` - Ключевые слова (необходимы при поиске)
* `labels` - Набор ярлыков
* `labels.changed` - Совпадает ли сервис с сервисом мсервера
* `labels.verification_required` - Только для верифицированных пользователей
* `labels.autopayment_service` - Сервис относится к автоплатежу
* `labels.in_mserver` - Существует в мсервере
* `labels.is_hidden` - Скрыт
* `labels.is_enabled` - Включен
* `rate` - комиссия в формате массива со значениями:
 * `fix` - фиксированная
 * `percent` - процент от суммы
 * `min` - минимальный размер комиссии, опционально
 * `max` - максимальный размер комиссии, опционально
* `mnp_provider_id` - mnp_provider_id
* `mnp_provider_region_code` - mnp_provider_region_code

##Загрузка сервиса по id

```shell
$ curl -H 'X-Project-ID:mbank' -X GET -u user:user "http://sandbox.wallet.best/adm2/services/53359fb2255c741a749f0c44"
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": "53359fb2255c741a749f0c44",
        "mserver_id": 1000,
        "name": {
            "ru_RU": "Теле2",
            "en_US": "Tele2"
        },
        "groups": [
            {
                "id": "53359fb2255c741a749f0c42",
                "name": {
                    "ru_RU": "Мобильная связь",
                    "en_US": "Cellular providers"
                },
                "type": "cellular",
                "keywords": "",
                "position": 8,
                "amount": 0,
                "localized_fields": [
                    "name"
                ]
            }
        ],
        "image_exists": true,
        "icon_url": "http:\/\/sandbox.wallet.best\/img\/services\/53359fb2255c741a749f0c44.png?1422632666",
        "labels": {
            "changed": false,
            "verification_required": false,
            "autopayment_service": false,
            "is_hidden": false,
            "is_enabled": true
        },
        "description": {
            "ru_RU": "По номеру {{ payment.parameters.phoneNumber }}",
            "en_US": "Phone number: {{ payment.parameters.phoneNumber }}"
        },
        "subtitle": {
            "ru_RU": "Пополнение",
            "en_US": "Refill"
        },
        "title": {
            "ru_RU": "{{ payment.service.name }}",
            "en_US": "{{ payment.service.name }}"
        },
        "limit": {
            "ru_RU": "Лимитов нет",
            "en_US": "There are no limits at this time"
        },
        "maxsum": 15000,
        "minsum": 1,
        "geo": [],
        "parameters": [
            {
                "id": "phoneNumber",
                "is_disabled": false,
                "is_hidden": false,
                "is_required": true,
                "min_length": "12",
                "max_length": "12",
                "range_start": "0",
                "range_end": "0",
                "patterns": [],
                "pattern": "^\\+7[0-9]{10}$",
                "pattern_desc": {
                    "ru_RU": "Номер телефона РФ начиная с +7 (в международном формате). Например, +79261112233"
                },
                "type": {
                    "id": "54293c0456c35ff85d25992b",
                    "title": "phone",
                    "description": "Номер телефона (локальный формат, РФ)",
                    "regex_map": "^.*$",
                    "regex_map_value": "+7$0",
                    "regex_unmap": "^\\+7",
                    "regex_unmap_value": ""
                },
                "title": {
                    "ru_RU": "Номер телефона, начиная с +7"
                },
                "default_value": null,
                "suggested_values": [],
                "items": null,
                "service_param_pattern_id": "54293d3056c35ff85df83dd0",
                "is_dynamic": false,
                "locales": null,
                "localized_fields": [
                    "title",
                    "pattern_desc"
                ],
                "diff_fields": {
                    "default_value": true,
                    "is_disabled": false,
                    "is_hidden": false,
                    "is_required": false,
                    "max_length": false,
                    "min_length": false,
                    "pattern": false,
                    "pattern_desc": false,
                    "range_end": false,
                    "range_start": false,
                    "title": false,
                    "type": false
                },
                "diff_from_pattern": true
            }
        ],
        "diff_source": {},
        "status": "online",
        "service_statuses": [
            "online",
            "offline"
        ],
        "keywords": "",
        "rate": {
            "fix": 0,
            "percent": 0
        },
        "mnp_provider_id": null,
        "mnp_provider_region_code": null,
        "localized_fields": [
            "name",
            "description",
            "subtitle",
            "title",
            "limit"
        ]
    }
}
```
###Поля
* `id` - Идентификатор
* `mserver_id` - id сервиса на мсервере
* `name` - Название сервиса
* `category` - Группа, к которой принадлежит сервис
* `image_exists` - Существует ли изображение
* `image_url` - Линк на изображение
* `labels` - Набор ярлыков
* `labels.changed` - Совпадает ли сервис с сервисом мсервера
* `labels.verification_required` - Только для верифицированных пользователей
* `labels.autopayment_service` - Сервис относится к автоплатежу
* `labels.in_mserver` - Существует в мсервере
* `labels.is_hidden` - Скрыт
* `labels.is_enabled` - Включен
* `description` - описание для маппинга платежей
* `subtitle` - subtitle для маппинга платежей
* `title` - title для маппинга платежей
* `limit` - описание лимитов
* `maxsum` - максимальная сумма оплаты
* `minsum` - минимальная сумма оплаты
* `geo` - список GEO точек сервиса
* `parameters` - список параметров сервиса
* `diff_source` - список отличий от mserver
* `status` - Статус сервиса (online|offline)
* `service_statuses` - перечень возможных стутусов сервиса
* `keywords` - Ключевые слова (необходимы при поиске)
* `rate` - комиссия в формате массива со значениями:
 * `fix` - фиксированная
 * `percent` - процент от суммы
 * `min` - минимальный размер комиссии, опционально
 * `max` - максимальный размер комиссии, опционально
* `localized_fields` - локализированные поля

##Редактирование сервиса

```shell
curl -H 'X-Project-ID:mbank' -H 'Content-type:aplication/json' -X POST -u user:user -d '{"name": { "ru_RU": "Теле2", "en_US" "Tele2" }, "keywords": "", "mserver_id": 1000, "category_id": "53359fb2255c741a749f0c42", "limit_html": { "ru_RU": "Лимитов нет", "en_US": "There are no limits at this time" }, "icon_url": "http:\/\/sandbox.wallet.best\/img\/services\/53359fb2255c741a749f0c44.png?1422632666", "maxsum": 15000, "minsum": 1, "trans_title": { "ru_RU": "{{ payment.service.name }}", "en_US": "{{ payment.service.name }}" }, "trans_subtitle": { "ru_RU": "Пополнение", "en_US": "Refill" }, "trans_description": { "ru_RU": "По номеру {{ payment.parameters.phoneNumber }}", "en_US": "Phone number: {{ payment.parameters.phoneNumber }}" }, "verification_required" : true, "autopayment_service" : false, "status": "online" }'  "http://sandbox.wallet.best/adm2/services/53359fb2255c741a749f0c44"

```

```json
{
    "См. загрузка сервиса по id"
}
```
###Редактируемые поля (обязательно передавать ВСЕ поля)
* `name` - имя сервиса
* `keywords` -  Ключевые слова (строка, через запятую)
* `mserver_id` - id сервиса на мсервере
* `category_id` - id категории, к которой относится сервис
* `limit_html` - описание лимитов
* `icon_url` - Линк на изображение
* `minsum` - минимальная сумма оплаты
* `maxsum` - максимальная сумма оплаты
* `trans_description` - описание для маппинга платежей
* `trans_subtitle` - subtitle для маппинга платежей
* `trans_title` - title для маппинга платежей
* `verification_required` - требуется ли верификация
* `autopayments_service` - относится ли сервис к автоплатежу
* `status` - статус сервиса
* `geo_id` - id гео-точки (если передается - точка добавляется)
* `mnp_provider_id` - mnp_provider_id
* `mnp_provider_region_code` - mnp_provider_region_code

##Добавление иконки сервиса

```shell
curl -uuser:user -H 'Content-Type: multipart/form-data' -X POST -F "file=@path_to_file/replenishment_points.csv" http://sandbox.wallet.best/adm2/services/53359fb2255c741a749f0c44/icon
```

```json
{
    "См. загрузка сервиса по id"
}
```

##Изменение статуса сервиса

```shell
curl -H 'X-Project-ID:mbank' -H 'Content-type:aplication/json' -X POST -u user:user -d '{"status":"offline","is_enabled":false}' http://sandbox.wallet.best/adm2/services/53359fb2255c741a749f0c44/status
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": "53359fb2255c741a749f0c44",
        "mserver_id": 1000,
        "name": {
            "ru_RU": "Теле2",
            "en_US": "Tele2"
        },
        "groups": [
            {
                "id": "53359fb2255c741a749f0c42",
                "name": {
                    "ru_RU": "Мобильная связь",
                    "en_US": "Cellular providers"
                },
                "type": "cellular",
                "keywords": "",
                "position": 8,
                "amount": 0,
                "localized_fields": [
                    "name"
                ]
            }
        ],        
        "image_exists": true,
        "image_url": "http:\/\/sandbox.wallet.best\/img\/services\/53359fb2255c741a749f0c44.png?1422632666",
        "status": "offline",
        "keywords": "",
        "labels": {
            "changed": false,
            "verification_required": false,
            "autopayment_service": false,
            "is_hidden": true,
            "is_enabled": false
        },
        "mnp_provider_id": null,
        "mnp_provider_region_code": null,
        "localized_fields": [
            "name",
            "group"
        ]
    }
}
```

###Параметры

* `status` - статус сервиса (online|offline)
* `is_enabled` - статус сервиса вкл/выкл (true|false)

##Удаление сервиса

```shell
curl -H 'X-Project-ID:mbank' -X DELETE -u user:user http://sandbox.wallet.best/adm2/services/53359fb2255c741a749f0c44
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {}
}
```

##Загрузка сервисов по mserver_id

```shell
curl -H 'X-Project-ID:mbank' -X GET -u user:user "sandbox.wallet.best/adm2/services/mserver/1013,1001"
```

```json
{
    "meta": {
        "code": 200
    },
    "data": [
        {
            "id": "53a1c67c56c35fe07671be4c",
            "mserver_id": 1001,
            "name": {
                "ru_RU": "Яндекс.Деньги"
            },
            "localized_fields": [
                "name"
            ]
        },
        {
            "id": null,
            "mserver_id": 1013,
            "name": {
                "ru_RU": "Мосэнергосбыт",
                "en_US": null
            },
            "localized_fields": [
                "name"
            ]
        }
    ]
}
```

###Поля
`id` - идентификатор сервиса (null - если нету у нас)
`mserver_id` - id сервиса на mserver
`name` - имя сервиса
`localized_fields` - локализированные поля

##Загрузка списка новых сервисов

```shell
curl -H 'X-Project-ID:mbank' -X GET -u user:user "http://sandbox.wallet.best/adm2/services/new"
```

```json
{
    "meta": {
        "code": 200
    },
    "data": [
        {
            "id": 1562,
            "name": "Континент ТВ",
            "min": 10,
            "max": 15000,
            "verification": false
        },
        {
            "id": 1606,
            "name": "Росинтел (Тула)",
            "min": 1,
            "max": 15000,
            "verification": false
        }
    ]
}
```

Список не привязанных сервисов

###Поля
`id` - id сервиса на mserver
`name` - имя сервиса
`min` - минамильная сумма пополения
`max` - максимальная сумма пополнения
`verification` - локализированные поля

##Добавление сервиса

```shell
curl -H 'X-Project-ID:mbank' -X POST -u user:user -d '{"mserver_id":"1562"}' http://sandbox.wallet.best/adm2/services/
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": "554b662dcccc9058050041e5",
        "mserver_id": 1562,
        "name": {
            "ru_RU": "Континент ТВ"
        },
        "groups": [
            
        ], 
        "image_exists": false,
        "icon_exists": false,
        "icon_url": "http:\/\/sandbox.wallet.best\/img\/services\/554b662dcccc9058050041e5.png?0",
        "labels": {
            "changed": false,
            "verification_required": false,
            "autopayment_service": false,
            "is_hidden": true,
            "is_enabled": false
        },
        "description": {
            "ru_RU": "",
            "en_US": null
        },
        "subtitle": {
            "ru_RU": "",
            "en_US": null
        },
        "title": {
            "ru_RU": "",
            "en_US": null
        },
        "limit": {
            "ru_RU": "",
            "en_US": null
        },
        "maxsum": 15000,
        "minsum": 10,
        "geo": [],
        "parameters": [
            {
                "id": "phoneNumber",
                "is_disabled": false,
                "is_hidden": false,
                "is_required": false,
                "min_length": 11,
                "max_length": 12,
                "range_start": null,
                "range_end": null,
                "patterns": [],
                "pattern": "^\\d{11,12}$",
                "pattern_desc": {
                    "ru_RU": "№ Карты Доступа\\Счета"
                },
                "type": "",
                "title": {
                    "ru_RU": "№ Карты Доступа\\Счета"
                },
                "default_value": null,
                "suggested_values": [],
                "items": null,
                "service_param_pattern_id": null,
                "is_dynamic": false,
                "locales": null,
                "localized_fields": [
                    "title",
                    "pattern_desc"
                ],
                "diff_fields": [],
                "diff_from_pattern": false
            }
        ],
        "diff_source": {},
        "status": "",
        "service_statuses": [
            "online",
            "offline"
        ],
        "keywords": "",
        "mnp_provider_id": null,
        "mnp_provider_region_code": null,
        "localized_fields": [
            "name",
            "description",
            "subtitle",
            "title",
            "limit"
        ]
    }
}
```

При добавлении сервиса - создается сервис у нас, клонируя значения сервиса на mserver

##Загрузка списка гео-точек
```shell
curl -H 'X-Project-ID:mbank' -XGET -u user:user "sandbox.wallet.best/adm2/geo/"
```
```json
{
    "meta": {
        "code": 200
    },
    "data": [
        {
            "id": "54be73b7b7f47bef9100b64c",
            "title": "10 лет октября (Новичихинский район, Алтайский край, Сибирский округ, Российская Федерация)"
        },
        {
            "id": "54be73b7b7f47bef9100b639",
            "title": "12 лет октября (Поспелихинский район, Алтайский край, Сибирский округ, Российская Федерация)"
        }
    ]
}
```
### Параметры (опциональные)
* `term` - поиск по title

##Привязка гео-точки к сервису

```shell
curl  -X POST -u user:user -d '{"geo_id":"54be73b7b7f47bef9100b64c"}' http://sandbox.wallet.best/adm2/services/537e27a956c35f87703a3fa7/geo
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": "537e27a956c35f87703a3fa7",
        "mserver_id": 1101,
        "name": {
            "ru_RU": "Цезарь Сателлит"
        },
        "groups": [
            {
                "id": "537e28f756c35f87701cddf5",
                "name": {
                    "ru_RU": "Охранные службы",
                    "en_US": "null"
                },
                "type": "cellular",
                "keywords": "",
                "position": 8,
                "amount": 0,
                "localized_fields": [
                    "name"
                ]
            }
        ], 
        "image_exists": true,
        "icon_url": "http:\/\/sandbox.wallet.best\/img\/services\/537e27a956c35f87703a3fa7.png?1422632666",
        "labels": {
            "changed": false,
            "verification_required": false,
            "autopayment_service": false,
            "is_hidden": false,
            "is_enabled": true
        },
        "description": {
            "ru_RU": "",
            "en_US": null
        },
        "subtitle": {
            "ru_RU": "PIN абонента {{ payment.parameters.phoneNumber }}",
            "en_US": null
        },
        "title": {
            "ru_RU": "Пополнение {{ payment.service.name }}",
            "en_US": null
        },
        "limit": {
            "ru_RU": "",
            "en_US": null
        },
        "maxsum": 15000,
        "minsum": 10,
        "geo": [
            {
                "id": "54be73b7b7f47bef9100b64c",
                "title": "10 лет октября",
                "inside": [
                    {
                        "id": "54be73b7b7f47bef9100b645",
                        "title": "Новичихинский район"
                    },
                    {
                        "id": "54be73b2b7f47bef910041e8",
                        "title": "Алтайский край"
                    },
                    {
                        "id": "54be73b2b7f47bef910041ac",
                        "title": "Сибирский округ"
                    },
                    {
                        "id": "54be73b2b7f47bef910041a7",
                        "title": "Российская Федерация"
                    }
                ]
            }
        ],
        "parameters": [],
        "diff_source": {},
        "status": "online",
        "service_statuses": [
            "online",
            "offline"
        ],
        "keywords": "",
        "mnp_provider_id": null,
        "mnp_provider_region_code": null,
        "localized_fields": [
            "name",
            "description",
            "subtitle",
            "title",
            "limit"
        ]
    }
}
```

При добавлении, в ответе Вы получите полный сервис, такой-же, как и при запросе сервиса по id

##Удаление привязки гео-точки от сервиса

```shell
curl -H 'X-Project-ID:mbank' -H 'Content-type:application/json' -X DELETE -u user:user http://sandbox.wallet.best/adm2/services/537e27a956c35f87703a3fa7/geo/54be73b7b7f47bef9100b64c
```

```json
{
    "См. Добавление Гео Точки.":"",
    "Только в этом случае сервис будет без удаленной точки"
}
```
Удаляет гео-точку 54be73b7b7f47bef9100b64c с сервиса 537e27a956c35f87703a3fa7
