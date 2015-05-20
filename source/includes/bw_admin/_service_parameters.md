#Параметры сервисов

##Добавление параметра

```shell
curl -H 'Content-type:application/json' -H 'X-Project-ID:mbank' -X POST -u user:user -d '{"id":"some_parameter_name","type":"5548d11acccc90702f0041b9","title":{"ru_RU":"parameter title"},"range_start":100500,"range_end":100501,"pattern":"\/\\d{4}\/","pattern_desc":{"ru_RU":"pattern_desc title"},"default_value":"{{last_value}}","regex_values":[111,222,333],"regex_descriptions":[{"ru_RU":"regex_description_111"},{"ru_RU":"regex_description_222"},{"ru_RU":"regex_description_333"}],"is_disabled":false,"is_hidden":false,"is_required":true}' http://sandbox.wallet.best/adm2/services/53a70ca256c35f1664f64b20/parameters
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": "53a70ca256c35f1664f64b20",
        "mserver_id": 1163,
        "name": {
            "ru_RU": "ВКонтакте"
        },
        "category": {
            "id": "53359fb2255c741a749f0c47",
            "name": {
                "ru_RU": "Игры и социальные сети",
                "en_US": null
            }
        },
        "image_exists": true,
        "icon_url": "http:\/\/sandbox.wallet.best\/img\/services\/53a70ca256c35f1664f64b20.png?1430835917",
        "labels": {
            "changed": false,
            "verification_required": false,
            "autopayment_service": false,
            "is_hidden": false,
            "is_enabled": true
        },
        "description": {
            "ru_RU": "Пользователю {{ payment.parameters.phoneNumber }}",
            "en_US": null
        },
        "subtitle": {
            "ru_RU": "Покупка голосов",
            "en_US": null
        },
        "title": {
            "ru_RU": "{{ payment.service.name }}",
            "en_US": null
        },
        "limit": {
            "ru_RU": "",
            "en_US": null
        },
        "maxsum": 15000,
        "minsum": 7,
        "geo": [],
        "parameters": [
            {
                "id": "some_parameter_name",
                "is_disabled": false,
                "is_hidden": false,
                "is_required": true,
                "min_length": null,
                "max_length": null,
                "range_start": 100500,
                "range_end": 100501,
                "patterns": [
                    {
                        "pattern": 111,
                        "description": {
                            "ru_RU": "regex_description_111"
                        }
                    },
                    {
                        "pattern": 222,
                        "description": {
                            "ru_RU": "regex_description_222"
                        }
                    },
                    {
                        "pattern": 333,
                        "description": {
                            "ru_RU": "regex_description_333"
                        }
                    }
                ],
                "pattern": "\/\\d{4}\/",
                "pattern_desc": {
                    "ru_RU": "pattern_desc title"
                },
                "type": [],
                "title": {
                    "ru_RU": "parameter title"
                },
                "default_value": "{{last_value}}",
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
        "status": "online",
        "service_statuses": [
            "online",
            "offline"
        ],
        "keywords": "",
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

### Поля
* `id` - Идентификатор
* `type` - Тип (По типу клиент идентифицирует необходимый функцинал поля ввода (могут быть разные клавиатуры, маски, валидаторы, что-угодно).)
* `title` - Название (Название поля, отображается только когда оно пустое в виде плейсхолдера.)
* `range_start` - Начальное значение
* `range_end` - Закончить на
* `pattern` - Формат
* `pattern_desc` - Текст ошибки при несовпадении формата
* `default_value` - Значение по-умолчанию
* `regex_values` - Регулярные выражения валидации данных
* `regex_descriptions` - Описание регулярных выражений валидации данных (ключи должны совпадать)
* `is_disabled` - Поле видно, но недоступно для редактирования
* `is_hidden` - Поле невидимо для пользователя
* `is_required` - Поле обязательно к заполнению
* `is_dynamic` - Динамичный параметр

###В ответе Вы получите полный сервис, к которому добавляли параметр

##Изменение параметра

```shell
curl -H 'Content-type:application/json' -H 'X-Project-ID:mbank' -X POST -u user:user -d '{"id":"some_parameter_name","type":"5548d11acccc90702f0041b9","title":{"ru_RU":"parameter title"},"range_start":100500,"range_end":100501,"pattern":"\/\\d{4}\/","pattern_desc":{"ru_RU":"pattern_desc title"},"default_value":"{{last_value}}_edited","regex_values":[111,222,333],"regex_descriptions":[{"ru_RU":"regex_description_333"},{"ru_RU":"regex_description_333"},{"ru_RU":"regex_description_333"}],"is_disabled":false,"is_hidden":false,"is_required":true}' http://sandbox.wallet.best/adm2/services/53a70ca256c35f1664f64b20/parameters/some_parameter_name
```

```json
{
    "Cм. Добавление параметра"
}
```

При редакторовании параметра запрос такой-же, как и при добавлении

##Удаление параметра

```shell
curl -H 'X-Project-ID:mbank' -X DELETE -u user:user http://sandbox.wallet.best/adm2/services/53a70ca256c35f1664f64b20/parameters/some_parameter_name
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": "53a70ca256c35f1664f64b20",
        "mserver_id": 1163,
        "name": {
            "ru_RU": "ВКонтакте"
        },
        "category": {
            "id": "53359fb2255c741a749f0c47",
            "name": {
                "ru_RU": "Игры и социальные сети",
                "en_US": null
            }
        },
        "image_exists": true,
        "icon_url": "http:\/\/sandbox.wallet.best\/img\/services\/53a70ca256c35f1664f64b20.png?1430836068",
        "labels": {
            "changed": false,
            "verification_required": false,
            "autopayment_service": false,
            "is_hidden": false,
            "is_enabled": true
        },
        "description": {
            "ru_RU": "Пользователю {{ payment.parameters.phoneNumber }}",
            "en_US": null
        },
        "subtitle": {
            "ru_RU": "Покупка голосов",
            "en_US": null
        },
        "title": {
            "ru_RU": "{{ payment.service.name }}",
            "en_US": null
        },
        "limit": {
            "ru_RU": "",
            "en_US": null
        },
        "maxsum": 15000,
        "minsum": 7,
        "geo": [],
        "parameters": [],
        "diff_source": {},
        "status": "online",
        "service_statuses": [
            "online",
            "offline"
        ],
        "keywords": "",
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

В ответе Вы получите сервис, к которому относится этот параметр без параметра.

##Загрузка параметра

```shell
curl -H 'X-Project-ID:mbank' -X GET -u user:user http://sandbox.wallet.best/adm2/services/53359fb2255c741a749f0c4c/parameters/phoneNumber
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": "phoneNumber",
        "is_disabled": false,
        "is_hidden": false,
        "is_required": true,
        "min_length": "3",
        "max_length": "9",
        "range_start": "",
        "range_end": "",
        "patterns": [],
        "pattern": "^[0-9]{3,9}$",
        "pattern_desc": {
            "ru_RU": "Номер вашего лицевого счета, от 3 до 9 цифр. Например, 12344455"
        },
        "type": {
            "id": "54293c2156c35ff85d5a241c",
            "title": "number",
            "description": "Число",
            "regex_map": "",
            "regex_map_value": "",
            "regex_unmap": "",
            "regex_unmap_value": ""
        },
        "title": {
            "ru_RU": "Номер лицевого счета"
        },
        "default_value": "",
        "suggested_values": [],
        "items": null,
        "service_param_pattern_id": "0",
        "is_dynamic": false,
        "locales": null,
        "localized_fields": [
            "title",
            "pattern_desc"
        ],
        "diff_fields": [],
        "diff_from_pattern": false
    }
}
```

##Синхронизация параметров нашего сервиса с параметрами сервиса на MServer


```shell
curl -H 'X-Project-ID:mbank' -X POST -u user:user http://sandbox.wallet.best/adm2/services/53359fb2255c741a749f0c4a/parameters/phoneNumber/sync
```

```json
{
    "Cм. Изменение параметра"
}
```

При выполении данного запроса поля параметра сервиса, которые отличаются от полей параметра сервиса мсервера заменяются

##Синхронизация items у параметров

```shell
curl  -X POST -u user:user http://sandbox.wallet.best/adm2/services/53a70d2456c35f58640fdd47/parameters/phoneNumber/items/sync
```

```json
{
    "Cм. Изменение параметра"
}
```

Тоже самое, что и при синхронизации параметра, только затрагивает поле items
