#Сервисы

*Сервис - это назначение платежа. Сервис содержит описание параметров, которые должны быть переданы в платежном запросе
конечным пользователем.*

Параметры сервисов мапятся в админке, потому могут отличаться от MServer.
Когда пользователь заполняется данные для сервиса, они попадают в базу знаний, на основе которой можно выделить шаблоны для параметров.

Поля:

* `id` - идентификатор сервиса, передается в платежном запросе в поле `service` для указания назначения платежа
* `name` - человекочитаемое имя сервиса
* `keywords` - подсказки для поиска (ключевые слова через запятую)
* `minsum`, `maxsum` - минимальная и максимальная сумма платежа, включительно
* `status` - **online | offline** статус доступности сервиса для совершения платежей
* `verification_required` - требуется ли идентификация плательщика для проведения платежа,
* `parameters` - массив параметров для платежа, содержит в себе объекты со свойствами, которые описаны ниже.
* `category` - объект со следующими свойствами (DEPRECATED):
* `groups` - массив групп (категорий) к которым относится сервис
* `rate` - комиссия в формате массива со значениями:
 * `fix` - фиксированная
 * `percent` - процент от суммы
 * `min` - минимальный размер комиссии, опционально
 * `max` - максимальный размер комиссии, опционально

Параметры:

* `id` - идентификатор параметра. Может дублироваться с другим параметром ТОЛЬКО в другом сервисе
* `is_disabled` - состояние параметра. Неактивен
* `is_hidden` - состояние параметра. Невидимый
* `is_required` - состояние параметра. Обязательный
* `min_length`, `max_length` - минимальная и максимальная длина значения параметра платежа
* `patterns` - массив объектов со следующими свойствами:
 * `pattern` - регулярное выражение, которому должно удовлетворять значение параметра платежа
 * `description` - человекочитаемый текст ошибки, если значение не попадает под выражение `pattern`
* `pattern` - регулярное выражение, которому должно удовлетворять значение параметра платежа
* `pattern_description` - человекочитаемый текст ошибки, если значение не попадает под выражение `pattern`
* `type` - типы мапятся, могут добавлятся или изменятся. Существуют устоявшиеся:
 * string - строка
 * phone - телефон
 * email - почта
 * number - число
 * enum - выбор
* `title` - человекочитаемое имя параметра
* `default_value` - человекочитаемое имя параметра
* `suggested_values` - человекочитаемое имя параметра
* `items` - возможные значения параметра платежа с типом enum
* `range_start` - **Необязательно поле**. Начало диапазона чисел
* `range_end` - **Необязательно поле**. Конец диапазона чисел

Поля `range_start` и `range_end` нужны для создания диапазона чисел.
Например нужно сделать выбор по годам начиная от 1901 и заканчивая 2000



## Загрузка списка сервисов

Список отдается с постраничной навигацией. Если существует следующая страница с сервисами - в *meta* параметр **has_next_page** будет true, в ином случае - false.

В ответе в *meta* присутствует параметр **request_time** со значением UNIX timestamp.
Если делать запрос с параметром **If-Modified-Since** в котором будет указан timestamp предыдущего запроса, то ответ может быть с HTTP кодом 304.

В *meta* возвращаются *suggestions* в количестве до 5 с учетом *geo* и *project_id*. Это сервисы отсортированные по количеству платежей за месяц в обратном порядке.

Параметры:

* `size` - кол-во элементов в списке (по-умолчанию 20)
* `page` - страница (по-умолчанию 1)
* `group_id` - id группы. Не обязательно.
* `name` - подстрока, входящая (в любом месте) в название сервиса или в keywords. Не обязательно.
* `geo_id` - Не обязательно.

```shell
$ curl -u+79261111111:p@ssw0rD https://sandbox.wallet.best/v1/services
```

```json
{
    "meta": {
        "request_time": 1407428185,
        "code": 200,
        "has_next_page": true,
        "urgent_data": {
            "amount": 2370,
            "unseen_payments": 1
        },
        "suggestions": [
            {
                "id": 1000,
                "name": "Теле2",
                "keywords": "",
                "status": "online",
                "icon_url": "http:\/\/api.mbank.dev\/img\/services\/53359fb2255c741a749f0c44.png?1432896868",
                "limit": "Лимитов нет",
                "rate": {
                    "fix": 0,
                    "percent": 0
                },
                "verification_required": false,
                "group": {
                    "id": "53359fb2255c741a749f0c42",
                    "name": "Мобильная связь"
                }
            },
            {
                "id": 1161,
                "name": "Steam",
                "keywords": "",
                "status": "online",
                "icon_url": "http:\/\/api.mbank.dev\/img\/services\/53a6f8f456c35f166462c6c8.png?1432896868",
                "limit": "",
                "rate": {
                    "fix": 0,
                    "percent": 0
                },
                "verification_required": false,
                "group": {
                    "id": "53359fb2255c741a749f0c47",
                    "name": "Игры и социальные сети"
                }
            },
            {
                "id": 834,
                "name": "МегаФон",
                "keywords": "",
                "status": "online",
                "icon_url": "http:\/\/api.mbank.dev\/img\/services\/542949a556c35f205de5a52d.png?1432896868",
                "limit": "",
                "rate": {
                    "fix": 0,
                    "percent": 0
                },
                "verification_required": false,
                "group": {
                    "id": "53359fb2255c741a749f0c42",
                    "name": "Мобильная связь"
                }
            }
        ]
    },
    "data": [
        {
            "id": 1,
            "name": "Мегафон",
            "keywords": "",
            "status": "online",
            "icon_url": "https:\/\/api.mbank.ru\/img\/providers\/dev_834.png",
            "limit": "",
            "rate": {
                "fix": 0,
                "percent": 0
            },
            "verification_required": true,
            "groups": [
                {
                    "id": "53359fb2255c741a749f0c4b",
                    "name": "Интернет провайдеры"
                }
            ],
            "geo": [
                [
                    "Москва",
                    "Центральный округ",
                    "Российская Федерация"
                ],
                [
                    "Питер",
                    "Вохомский район",
                    "Костромская область",
                    "Центральный округ",
                    "Российская Федерация"
                ]
            ]
        },
        {
            "id": 1000,
            "name": "Tele2",
            "keywords": "",
            "status": "offline",
            "icon_url": "https:\/\/api.mbank.ru\/img\/providers\/dev_1000.png",
            "limit": "",
            "rate": {
                "fix": 0,
                "percent": 0
            },
            "verification_required": false,
            "groups": [
                {
                    "id": "53359fb2255c741a749f0c59",
                    "name": "Мобильная связь зарубежья"
                }
            ]
        }
    ]
}
```

## Загрузка списка групп

Поле `amount` содержит количество включенных сервисов в группе. В ответе в meta присутствует параметр request_time со значением UNIX timestamp.
Если делать запрос с параметром **If-Modified-Since** в котором будет указан timestamp предыдущего запроса, то ответ может быть с HTTP кодом 304

```shell
$ curl -u +79261111111:p@ssw0rD https://sandbox.wallet.best/v1/groups
```

```json
{
    "meta": {
        "request_time": 1423147436,
        "code": 200,
        "urgent_data": {
            "amount": 2370,
            "unseen_payments": 1
        }
    },
    "data": [
        {
            "id": 3,
            "name": "Мобильная связь",
            "keywords": "",
            "group": "cellular",
            "type": "cellular",
            "amount": 8
        },
        {
            "id": 895,
            "name": "Мобильная связь зарубежья",
            "keywords": "",
            "group": "",
            "type": "",
            "amount": 20
        },
        {
            "id": 4,
            "name": "Игры и социальные сети",
            "keywords": "",
            "group": "",
            "type": "",
            "amount": 4
        }
    ]
}
```

## Загрузка списка сервисов по группам

В ответе в meta присутствует параметр request_time со значением UNIX timestamp.
Если делать запрос с параметром **If-Modified-Since** в котором будет указан timestamp предыдущего запроса, то ответ может быть с HTTP кодом 304.

В метаданных есть поле `suggestion_rules` c массивом **код оператора в международном формате** : **ID сервиса**
```shell
$ curl -u+79261111111:p@ssw0rD https://sandbox.wallet.best/v1/services/groups
```

```json
{
    "meta": {
        "request_time": 1407182553,
        "suggestion_rules": {
            "+7920": 1,
            "+7939": 1,
            "+7900": 3,
            "+7968": 3,
            "+7910": 2,
            "+7911": 2,
            "+7901": 5,
            "+7953": 5
        },
        "code": 200
    },
    "data": {
        {
            "id": 3,
            "name": "Мобильная связь",
            "group": "Cellular",
            "type": "Cellular",
            "services": {
                {
                    "id": 1000,
                    "name": "Tele2",
                    "status": "online",
                    "icon_url": "https:\/\/api.mbank.ru\/img\/providers\/dev_1000.png",
                    "limit": "",
                    "rate": {
                        "fix": 0,
                        "percent": 0
                    },
                    "verification_required": true
                },
                {
                    "id": 770,
                    "name": "Билайн",
                    "status": "online",
                    "icon_url": "https:\/\/api.mbank.ru\/img\/providers\/dev_770.png",
                    "limit": "",
                    "rate": {
                        "fix": 0,
                        "percent": 0
                    },
                    "verification_required": true
                }
            }
        },
        {
            "id": 12,
            "name": "Игры и социальные сети",
            "group": "",
            "type": "",
            "services": {
                {
                    "id": 1066,
                    "name": "Одноклассники",
                    "status": "online",
                    "icon_url": "https:\/\/api.mbank.ru\/img\/providers\/dev_1068.png",
                    "limit": ""
                    "rate": {
                        "fix": 0,
                        "percent": 0
                    },
                    "verification_required": true
                }
            }
        }
    }
}
```

## Информация о сервисе по id

```shell
$ curl -u+79261111111:p@ssw0rD https://sandbox.wallet.best/v1/services/42
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": 770,
        "name": "Билайн",
        "keywords": "билайн, белайн, белаин, пчелайн",
        "icon_url": "https:\/\/api.mbank.ru\/img\/providers\/dev_770.png",
        "limit": "",
        "rate": {
            "fix": 0,
            "percent": 0
        },
        "minsum": 2,
        "maxsum": 15000,
        "status": "online",
        "verification_required": false,
        "parameters": [
            {
                "id": "phoneNumber",
                "is_disabled": false,
                "is_hidden": false,
                "is_required": false,
                "min_length": 10,
                "max_length": 10,
                "range_start": 1,
                "range_end": 12,
                "patterns": [
                    {
                        "pattern": "^\\d{10}$a",
                        "description": "№ телефона не 10 цифр"
                    },
                    {
                        "pattern": "^\\d{16}$a",
                        "description": "№ карточки не 16 цифр"
                    }
                ],
                "pattern": "^\\d{10}$a",
                "pattern_desc": "10 цифр",
                "type": "phone",
                "title": "Номер телефона",
                "default_value": "[phone:+79267101280]",
                "suggested_values": [
                    "+79267101280",
                    "+79267101250"
                ],
                "items": [
                    {
                        "code": "1",
                        "value": "Оплата по № Догoвора"
                    },
                    {
                        "code": "2",
                        "value": "Оплата по № Карты"
                    },
                    {
                        "code": "3",
                        "value": "Оплата по № Счета"
                    }
                ],
                "service_param_pattern_id": null,
                "is_changed": false
            }
        ],
        "category": {
            "id": "549c92fb56c35f660ecd341f",
            "name": "Мобильная связь",
            "group": "Cellular",
            "type": "Cellular",
            "amount": 3
        },
        "groups": [
            {
                "id": "53359fb2255c741a749f0c42",
                "name": "Мобильная связь",
                "group": "cellular",
                "type": "cellular",
                "keywords": "",
                "amount": 0,
                "services_count": 9
            }
        ]
    }
}
```

## Поиск сервиса по MNP

Параметры (все обязательны):

* `provider_id`
* `provider_region_code`

```shell
$ curl -u+79261111111:p@ssw0rD https://sandbox.wallet.best/v1/services/mnp?provider_id=beline&provider_region_code=ru
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": 770,
        "name": "Билайн",
        "keywords": "",
        "icon_url": "http:\/\/api.mbank.dev\/img\/services\/53359fb2255c741a749f0c45.png?1433497473",
        "limit": "",
        "minsum": 2,
        "maxsum": 15000,
        "rate": {
            "fix": 0,
            "percent": 0
        },
        "status": "online",
        "verification_required": false,
        "parameters": [
            {
                "id": "phoneNumber",
                "is_disabled": false,
                "is_hidden": false,
                "is_required": true,
                "min_length": 12,
                "max_length": 12,
                "range_start": 0,
                "range_end": 0,
                "patterns": [
                    {
                        "pattern": "",
                        "description": ""
                    },
                    {
                        "pattern": "^\\+7[0-9]{10}$",
                        "description": {
                            "ru_RU": "Номер телефона РФ начиная с +7 (в международном формате). Например, +79261112233"
                        }
                    }
                ],
                "pattern": "^\\+7[0-9]{10}$",
                "pattern_desc": "Номер телефона РФ начиная с +7 (в международном формате). Например, +79261112233",
                "type": "phone",
                "title": "Номер телефона, начиная с +7",
                "default_value": null,
                "suggested_values": [],
                "items": null
            }
        ],
        "category": {
            "id": "53359fb2255c741a749f0c42",
            "mserver_id": "53359fb2255c741a749f0c42",
            "name": "Мобильная связь",
            "group": "cellular",
            "keywords": "",
            "icon_url_32x32": "",
            "amount": 0
        }
    }
}
```

## Определение ОПСОСа по номеру телефона

```shell
$ curl https://sandbox.wallet.best/v1/services/mobile/79261111111
```

```json
{
  "meta": {
    "code": 200
  },
  "data": {
    "id": 834,
    "name": "МегаФон",
    "icon_url": "https://sandbox.wallet.best/img/providers/dev_834.png",
    "limit": "",
    "rate": {
        "fix": 0,
        "percent": 0
    },
    "minsum": 1,
    "maxsum": 15000,
    "parameters": [
      {
        "id": "phoneNumber",
        "title": "Номер телефона",
        "pattern": null,
        "pattern_desc": "10 цифр",
        "min_length": 10,
        "max_length": 10,
        "type": "phone"
      }
    ]
  }
}
```

## Заявка на добавление нового сервиса

Создает в Intercom.io завку на добавление сервиса.

Параметры:

* `title` - наименование сервиса

```shell
$ curl -X POST -H 'Content-type:application/json'
-u+79261111111:p@ssw0rD -d '{"title" : "%SERVICE TITLE%" }'
https://sandbox.wallet.best/v1/services/order
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "created_at": 1407185953,
        "updated_at": 1407185953,
        "read": true,
        "created_by_user": true,
        "user": {
            "email": "",
            "user_id": "+79261111111",
            "name": null,
            "is_admin": false,
            "avatar": {}
        },
        "message_type": "conversation",
        "messages": [
            {
                "id": 2006929,
                "created_at": 1407185953,
                "url": null,
                "html": "<p>User: {code:javascript}{}{code}\n<br>{quote}Просит добавить сервис: 'TEST_TEST_TEST'{quote}\n<\/p>",
                "subject": "",
                "from": {
                    "email": "",
                    "user_id": "+79261111111",
                    "name": null,
                    "is_admin": false,
                    "avatar": {}
                },
                "attachments": []
            }
        ],
        "message_id": 2006929,
        "thread_id": 2006929,
        "interrupt": true
    }
}
```

Коды ошибок

* `missing_title` - не передан заголовок сервиса
* `wallet_not_found` - кошелек с переданным номером телефона не найден


## География, населенные пункты

Метод определяет населенный пункт пользователя по IP и возвращает список предустановленных (major) городов или результаты поиска по названию если параметры не переданы. Город, если определили автоматически, находится в `meta.geo`.

Параметры:

* `filter_by` - использовать фильтр, поддерживается: `title`. Не обязательно.
* `title` - подстрока, входящая (в любом месте) в название населенного пункта, работает вместе с `filter_by=title`. Не обязательно.

```shell
$ curl -u +79261111111:p@ssw0rD https://sandbox.wallet.best/v1/geo?filter_by=title\&title=%D0%BC%D0%BE%D1%81%D0%BA%D0%B2
```

```json
{
    "meta": {
        "geo": {
            "id": "54be73b2b7f47bef910042b3",
            "title": "Лобня",
            "inside": [
                {
                    "id": "54be73b2b7f47bef910041e4",
                    "title": "Московская область"
                },
                {
                    "id": "54be73b2b7f47bef910041a8",
                    "title": "Центральный округ"
                },
                {
                    "id": "54be73b2b7f47bef910041a7",
                    "title": "Российская Федерация"
                }
            ]
        },
        "code": 200,
        "urgent_data": {
            "amount": 2370,
            "unseen_payments": 1
        }
    },
    "data": [
        {
            "id": "54be73b2b7f47bef910041ff",
            "title": "Москва",
            "inside": [
                {
                    "id": "54be73b2b7f47bef910041a8",
                    "title": "Центральный округ"
                },
                {
                    "id": "54be73b2b7f47bef910041a7",
                    "title": "Российская Федерация"
                }
            ]
        },
        {
            "id": "54be73b6b7f47bef9100a49a",
            "title": "Москвина",
            "inside": [
                {
                    "id": "54be73b6b7f47bef9100a493",
                    "title": "Кудымкарский район"
                },
                {
                    "id": "54be73b2b7f47bef910041fe",
                    "title": "Пермский край"
                },
                {
                    "id": "54be73b2b7f47bef910041ae",
                    "title": "Приволжский округ"
                },
                {
                    "id": "54be73b2b7f47bef910041a7",
                    "title": "Российская Федерация"
                }
            ]
        },
        {
            "id": "54be73b8b7f47bef9100be4a",
            "title": "Москвитино",
            "inside": [
                {
                    "id": "54be73b8b7f47bef9100be3b",
                    "title": "Свободненский район"
                },
                {
                    "id": "54be73b2b7f47bef910041d1",
                    "title": "Амурская область"
                },
                {
                    "id": "54be73b2b7f47bef910041ab",
                    "title": "Дальневосточный округ"
                },
                {
                    "id": "54be73b2b7f47bef910041a7",
                    "title": "Российская Федерация"
                }
            ]
        },
        {
            "id": "54be73b2b7f47bef9100436e",
            "title": "Москвич",
            "inside": [
                {
                    "id": "54be73b2b7f47bef91004365",
                    "title": "Домодедовский район"
                },
                {
                    "id": "54be73b2b7f47bef910041e4",
                    "title": "Московская область"
                },
                {
                    "id": "54be73b2b7f47bef910041a8",
                    "title": "Центральный округ"
                },
                {
                    "id": "54be73b2b7f47bef910041a7",
                    "title": "Российская Федерация"
                }
            ]
        }
    ]
}
```
