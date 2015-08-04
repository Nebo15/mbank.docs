#Шаблоны

##Загрузка списка шаблонов

```shell
$curl -H 'X-Project-ID:mbank' -X GET -u user:user "http://sandbox.wallet.best/adm2/templates/"
```

```json

{
    "meta": {
        "code": 200
    },
    "data": [
        {
            "id": "5429887756c35f625da94314",
            "title": {
                "ru_RU": "Фамилия"
            },
            "default_value": "{{ last_value | default(person.family_name) }}",
            "is_disabled": false,
            "is_hidden": false,
            "is_required": true,
            "is_pattern": true,
            "pattern_desc": {
                "ru_RU": "Фамилия кириллицей, длинной от 1 до 255 символов"
            },
            "range_start": "0",
            "range_end": "0",
            "pattern": "^[а-яА-ЯёЁ\\-]{1,255}$",
            "patterns": [
                {
                    "pattern": "",
                    "description": ""
                }
            ],
            "type": {
                "id": "54293c0e56c35ff85dcf6ee8",
                "title": "string",
                "description": "Строка",
                "regex_map": "",
                "regex_map_value": "",
                "regex_unmap": "",
                "regex_unmap_value": ""
            },
            "services_amount": 3,
            "localized_fields": [
                "title",
                "pattern_desc"
            ]
        }
    ]
}
```
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
* `is_pattern` - является ли шиблоном
* `patterns` - валидаторы
* `services_amount` - кол-во сервисов, параметры которых привязанны к этому шаблону
* `localized_fields` - локализированные поля

##Загрузка шаблона по id

```shell
$ curl -H 'X-Project-ID:mbank' -X GET -u user:user "http://sandbox.wallet.best/adm2/templates/5429887756c35f625da94314"
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": "5429887756c35f625da94314",
        "title": {
            "ru_RU": "Фамилия"
        },
        "default_value": "{{ last_value | default(person.family_name) }}",
        "is_disabled": false,
        "is_hidden": false,
        "is_required": true,
        "is_pattern": true,
        "pattern_desc": {
            "ru_RU": "Фамилия кириллицей, длинной от 1 до 255 символов"
        },
        "range_start": "0",
        "range_end": "0",
        "pattern": "^[а-яА-ЯёЁ\\-]{1,255}$",
        "patterns": [
            {
                "pattern": "",
                "description": ""
            }
        ],
        "type": {
            "id": "54293c0e56c35ff85dcf6ee8",
            "title": "string",
            "description": "Строка",
            "regex_map": "",
            "regex_map_value": "",
            "regex_unmap": "",
            "regex_unmap_value": ""
        },
        "items": [],
        "parameters": [
            {
                "id": "lastname",
                "is_disabled": false,
                "is_hidden": true,
                "is_required": true,
                "min_length": "1",
                "max_length": "20",
                "range_start": "0",
                "range_end": "0",
                "patterns": [
                    {
                        "pattern": "",
                        "description": ""
                    }
                ],
                "pattern": "^[а-яА-ЯёЁ\\-]{1,20}$",
                "pattern_desc": {
                    "ru_RU": "Фамилия кириллицей, длинной от 1 до 20 символов"
                },
                "type": {
                    "id": "54293c0e56c35ff85dcf6ee8",
                    "title": "string",
                    "description": "Строка",
                    "regex_map": "",
                    "regex_map_value": "",
                    "regex_unmap": "",
                    "regex_unmap_value": ""
                },
                "title": {
                    "ru_RU": "Фамилия"
                },
                "default_value": null,
                "suggested_values": [],
                "items": null,
                "service_param_pattern_id": "5429887756c35f625da94314",
                "is_dynamic": false,
                "locales": null,
                "localized_fields": [
                    "title",
                    "pattern_desc"
                ],
                "service": {
                    "service_id": "549837f456c35fa03312e225",
                    "mserver_id": 1007,
                    "name": {
                        "ru_RU": "Home Credit and Finance"
                    }
                }
            }
        ],
        "localized_fields": [
            "title",
            "pattern_desc"
        ]
    }
}
```

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
* `is_pattern` - является ли шиблоном
* `patterns` - валидаторы
* `services_amount` - кол-во сервисов, параметры которых привязанны к этому шаблону
* `localized_fields` - локализированные поля

##Создание шаблона

```shell
curl -H 'X-Project-ID:mbank' -H 'Content-type:application/json' -X POST -u user:user -d '{"service_id":"54293c0e56c35ff85dcf6ee8","parameter_id":"phoneNumber","items":null,"type":"54293c0e56c35ff85dcf6ee8","title":{"ru_RU":"Пополнение Steam"},"range_start":"","range_end":"","pattern":"^[a-zA-Z0-9_]{3,64}$","pattern_desc":{"ru_RU":"Какой-то там логин в стим"},"default_value":null,"regex_values":[],"regex_description":[],"is_required":true}' http://sandbox.wallet.best/adm2/templates/
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": "55499ac3cccc902022004236",
        "title": {
            "ru_RU": "Пополнение Steam"
        },
        "default_value": "",
        "is_disabled": false,
        "is_hidden": false,
        "is_required": true,
        "is_pattern": true,
        "pattern_desc": {
            "ru_RU": "Какой-то там логин в стим"
        },
        "range_start": "",
        "range_end": "",
        "pattern": "^[a-zA-Z0-9_]{3,64}$",
        "patterns": [],
        "type": {
            "id": "54293c0e56c35ff85dcf6ee8",
            "title": "string",
            "description": "Steam оплата",
            "regex_map": "",
            "regex_map_value": "",
            "regex_unmap": "",
            "regex_unmap_value": ""
        },
        "localized_fields": [
            "title",
            "pattern_desc"
        ]
    }
}
```
Создание шаблона с параметра сервиса (mserver_id)
Тело запроса на создание шаблона аналогично с телом запроса на изменение параметра

##Изменение шаблона

```shell
curl -H 'X-Project-ID:mbank' -H 'Content-type:application/json' -u user:user -X POST -d '{"items":null,"type":"54293c0e56c35ff85dcf6ee8","title":{"ru_RU":"Пополнение Steam"},"range_start":"","range_end":"","pattern":"^[a-zA-Z0-9_]{3,64}$","pattern_desc":{"ru_RU":"Какой-то там логин в стим"},"default_value":"{{last_value}}","regex_values":[],"regex_description":[],"is_required":true}' http://sandbox.wallet.best/adm2/templates/55499bbdcccc902022004238
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": "55499bbdcccc902022004238",
        "title": {
            "ru_RU": "Пополнение Steam"
        },
        "default_value": "{{last_value}}",
        "is_disabled": false,
        "is_hidden": false,
        "is_required": true,
        "is_pattern": true,
        "pattern_desc": {
            "ru_RU": "Какой-то там логин в стим"
        },
        "range_start": "",
        "range_end": "",
        "pattern": "^[a-zA-Z0-9_]{3,64}$",
        "patterns": [],
        "type": {
            "id": "54293c0e56c35ff85dcf6ee8",
            "title": "string",
            "description": "Steam оплата",
            "regex_map": "11",
            "regex_map_value": "22",
            "regex_unmap": "33",
            "regex_unmap_value": "44"
        },
        "parameters": [],
        "localized_fields": [
            "title",
            "pattern_desc"
        ]
    }
}
```

##Удаление шаблона

```shell
$curl -H 'X-Project-ID:mbank' -H 'Content-type:application/json' -X DELETE -u user:user http://sandbox.wallet.best/adm2/templates/55522103cccc902a550041d9
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {}
}
```
