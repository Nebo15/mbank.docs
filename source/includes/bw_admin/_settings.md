#Настройки
##Загрузка списка логов

```shell
curl -H 'X-Project-ID:mbank' -X GET -u user:user "sandbox.wallet.best/adm2/logs/?size=2"
```

```json
{
    "meta": {
        "page": {
            "page": 1,
            "size": 2,
            "total_elements": 1255
        },
        "code": 200
    },
    "data": [
        {
            "text": "Удален параметр у сервиса \"Эшелон Охранная Система\"",
            "user": "test",
            "time": "2015-05-05T18:18:41+00:00"
        },
        {
            "text": "Изменен параметр \"Адрес\" для сервиса \"ТСЖ Монолит-престиж\"",
            "user": "bardack",
            "time": "2015-01-15T13:12:22+00:00"
        }
    ]
}
```

* `text` - Что сделал
* `user` - Кто сделал
* `time` - Когда сделал

### Параметры (опциональные)
* `page` - номер (начиная с 0) страницы, которую запрашивает клиент, по умолчанию 0
* `size` - размер страницы, которую запрашивает клиент, по умолчанию 20

##Загрузка списка ошибок

```shell
curl -H 'X-Project-ID:mbank' -X GET -u user:user "sandbox.wallet.best/adm2/errors/?size=2"
```

```json
{
    "meta": {
        "page": {
            "page": 1,
            "size": "2",
            "total_elements": 75
        },
        "code": 200
    },
    "data": [
        {
            "id": "5494486da60ad61b110041ba",
            "code": "save_event_fail",
            "title": {
                "ru_RU": "save event fail",
                "en_EN": "save event fail"
            },
            "localized_fields": [
                "title"
            ]
        },
        {
            "id": "5494486da60ad61b110041b9",
            "code": "bad_trigger_id_no_relation",
            "title": {
                "ru_RU": "bad trigger id no relation",
                "en_EN": "bad trigger id no relation"
            },
            "localized_fields": [
                "title"
            ]
        }
    ]
}
```

* `id` - идентификатор ошибки
* `code` - код ошибки
* `title` - описание ошибки
* `localized_fields` - локализированные поля

### Параметры (опциональные)
* `page` - номер (начиная с 0) страницы, которую запрашивает клиент, по умолчанию 0
* `size` - размер страницы, которую запрашивает клиент, по умолчанию 20
* `title` - описание ошибки
* `localized_fields` - локализированные поля


##Загрузка ошибки по id

```shell
curl -H 'X-Project-ID:mbank' -X GET -u user:user "sandbox.wallet.best/adm2/errors/5494486da60ad61b110041ba"
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": "5494486da60ad61b110041ba",
        "title": {
            "ru_RU": "save event fail",
            "en_EN": "save event fail"
        },
        "code": "save_event_fail",
        "localized_fields": [
            "title"
        ]
    }
}
```

##Добавление ошибки

```shell
curl -H 'X-Project-ID:mbank' -H 'Content-type:application/json'  -X POST -u user:user -d '{"code":"some_code","title":{"en_EN":"some_en_name","ru_RU":"some_ru_name"}}' http://sandbox.wallet.best/adm2/errors/
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": "55490aa1cccc90f621004246",
        "title": {
            "en_EN": "some_en_name",
            "ru_RU": "some_ru_name"
        },
        "code": "some_code",
        "localized_fields": [
            "title"
        ]
    }
}
```
###Параметры при добавлении ошибки

* `code` - код ошибки
* `title` - описание ошибки

##Изменение ошибки

```shell
curl -H 'X-Project-ID:mbank' -H 'Content-type:application/json'  -X POST -u user:user -d '{"code":"some_code_edited","title":{"en_EN":"some_en_name_edited","ru_RU":"some_ru_name_edited"}}' http://sandbox.wallet.best/adm2/errors/55490aa1cccc90f621004246
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": "55490aa1cccc90f621004246",
        "title": {
            "en_EN": "some_en_name_edited",
            "ru_RU": "some_ru_name_edited"
        },
        "code": "some_code_edited",
        "localized_fields": [
            "title"
        ]
    }
}
```
###Параметры при изменении ошибки

* `code` - код ошибки
* `title` - описание ошибки

##Удаление ошибки

```shell
curl -H 'X-Project-ID:mbank' -H 'Content-type:application/json' -X DELETE -u user:user http://sandbox.wallet.best/adm2/errors/55490aa1cccc90f621004246

```

```json
{
    "meta": {
        "code": 200
    }
}
```

##Загрузка списка общих настроек

```shell
curl -H 'X-Project-ID:mbank' -X GET -u user:user "http://sandbox.wallet.best/adm2/settings/common/"
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "general": {
            "support_phone": {
                "type": "input",
                "value": ""
            },
            "feedback_email": {
                "type": "input",
                "value": ""
            }
        },
        "in": {
            "payment_in_title": {
                "type": "localized",
                "value": {
                    "ru_RU": "Пополнение счета",
                    "en_US": "IN"
                }
            }
        },
        "p2p": {
            "payment_p2p_title": {
                "type": "localized",
                "value": {
                    "ru_RU": "Денежный перевод",
                    "en_US": "P2P"
                }
            }
        },
        "apns": {
            "payment_out_fail": {
                "type": "localized",
                "value": {
                    "ru_RU": "Оплата \"{{ service.name }}\" отменена",
                    "en_US": ""
                }
            }
        },
        "intercom": {
            "intercom_reply_method": {
               "type": "checkbox",
               "values": [
                   "sms",
                   "apns"
               ],
               "value": "apns"
           }
        },
        "wallet": {
            "wallet_verified_apns_message": {
                "type": "localized",
                "value": {
                    "ru_RU": "Your wallet has been verified.",
                    "en_US": ""
                }
            }
        },
        "parameters": {
            "suggested_values": {
                "type": "input",
                "value": ""
            },
            "cards_limits_text": {
                "type": "localized",
                "value": {
                    "ru_RU": "",
                    "en_US": ""
                }
            }
        },
        "transaction_log": {
            "mail_from": {
                "type": "input",
                "value": ""
            }
        },
        "autopayments": {
            "autopayments_sms_connected_threshold": {
                "type": "input",
                "value": ""
            }
        }
    }
}
```

Список общих настроек разделен на группы
* Общее
* Сообщения для in платежей
* Сообщения для p2p платежей
* Сообщения для APNS платежей
* Настройки для Intercom сообщений
* Сообщения для кошельков
* Параметры
* Лог транзацкий
* СМС автоплатежей

###Поля
Ключ - код ошибки
* `type` - тип поля [checkbox|localized|input]
* `value` - значение поля
* `values` - значения поля для типа checkbox

##Изменения списка общих настроек

```shell
curl -H 'X-Project-ID:mbank' -H 'Content-type:application/json' -X POST -u user:user -d '{"settings":{"support_phone":{"ru_RU":"edited_name_ru"},"autopayments_sms_payment_fail":{"ru_RU":"edited_name_ru"}}}' http://sandbox.wallet.best/adm2/settings/common/
```

```json
{
    "См. Загрузка списка общих настроек"
}
```

При изменении нужно передавать ключ ошибки и ее значение

##Загрузка списка лимитов

```shell
curl -H 'X-Project-ID:mbank' -X GET -u user:user "http://sandbox.wallet.best/adm2/settings/limits/"
```

```json
{
    "meta": {
        "code": 200
    },
    "data": [
        {
            "id": "53dfa37456c35f7375ebdc44",
            "title": {
                "ru_RU": "Оплата услуг",
                "en_US": null
            },
            "description": {
                "ru_RU": "Кроме перечисленных ниже",
                "en_US": null
            },
            "anonymous": {
                "type": "bool",
                "value": true,
                "status": "anonymous"
            },
            "verified": {
                "type": "bool",
                "value": true,
                "status": "verified"
            },
            "personified": {
                "type": "string",
                "value": null,
                "status": "personified"
            },
            "position": 7,
            "localized_fields": [
                "title",
                "description"
            ]
        }
    ]
}
```
* `id` - идентификатор
* `title` - Название
* `description` - Описание
* `status` - К каким статусам относится
* `limit` - Значения лимитов для статусов
* `type_limits` - Возможные типы лимитов
* `position` - Позиция в списке
* `localized_fields` - локализированные поля


##Загрузка лимита по id

```shell
$ curl -H 'X-Project-ID:mbank' -X GET -u user:user "http://sandbox.wallet.best/adm2/settings/limits/53dfa37456c35f7375ebdc44"
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": "53dfa37456c35f7375ebdc44",
        "title": {
            "ru_RU": "Оплата услуг",
            "en_US": null
        },
        "description": {
            "ru_RU": "Кроме перечисленных ниже",
            "en_US": null
        },
        "anonymous": {
            "type": "bool",
            "value": true,
            "status": "anonymous"
        },
        "verified": {
            "type": "bool",
            "value": true,
            "status": "verified"
        },
        "personified": {
            "type": "string",
            "value": null,
            "status": "personified"
        },
        "position": 7,
        "localized_fields": [
            "title",
            "description"
        ]
    }
}
```

##Сортировка лимитов

```shell
curl -H 'X-Project-ID:mbank' -H 'Content-type:application/json' -X POST -u user:user -d '{"limits_order":"53dfa35f56c35f737578012e,53dfa37456c35f7375ebdc44,53dfa38a56c35f7375e1a14c,53dfa34856c35f737505a834,54b3cc0c56c35f744758bfd0,53dfa3ac56c35f7375481acc"}' http://sandbox.wallet.best/adm2/settings/limits/sort
```

```json
{
    "meta": {
        "code": 200
    },
    "data": true
}
```
Массив idшников лимитов, в том порядке, в котором они должны быть отсортированны
##Добавление лимита


```shell
curl -H 'X-Project-ID:mbank' -H 'Content-type:application/json' -X POST -u user:user -d '{"title":{"ru_RU":"Название","en_US":"test title"},"description":{"ru_RU":"Описание","en_US":"test description"},"limit":{"anonymous":111,"verified":222,"personified":333},"status":{"anonymous":0,"verified":1,"personified":2}}' http://sandbox.wallet.best/adm2/settings/limits/
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": "554cb2d6cccc9080250041a8",
        "title": {
            "ru_RU": "Название",
            "en_US": "test title"
        },
        "description": {
            "ru_RU": "Описание",
            "en_US": "test description"
        },
        "anonymous": {
            "type": "string",
            "value": 111,
            "status": "anonymous"
        },
        "verified": {
            "type": "bool",
            "value": true,
            "status": "verified"
        },
        "personified": {
            "type": "bool",
            "value": false,
            "status": "personified"
        },
        "position": 10,
        "localized_fields": [
            "title",
            "description"
        ]
    }
}
```

* `title` - Название
* `description` - Описание
* `limit` - Значения лимитов для статусов
* `status` - К каким статусам относится

##Изменение лимита

```shell
curl -H 'X-Project-ID:mbank' -H 'Content-type:application/json' -X POST -u user:user -d '{"title":{"ru_RU":"Название","en_US":"test title edited"},"description":{"ru_RU":"Описание","en_US":"test description edited"}, "limit":{"anonymous":111,"verified":222,"personified":333},"status":{"anonymous":0,"verified":1,"personified":2}}' http://sandbox.wallet.best/adm2/settings/limits/554cb2d6cccc9080250041a8

```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": "554cb2d6cccc9080250041a8",
        "title": {
            "ru_RU": "Название",
            "en_US": "test title edited"
        },
        "description": {
            "ru_RU": "Описание",
            "en_US": "test description edited"
        },
        "anonymous": {
            "type": "string",
            "value": 111,
            "status": "anonymous"
        },
        "verified": {
            "type": "bool",
            "value": true,
            "status": "verified"
        },
        "personified": {
            "type": "bool",
            "value": false,
            "status": "personified"
        },
        "position": 12,
        "localized_fields": [
            "title",
            "description"
        ]
    }
}
```

При редактировании лимит передаются те же самые поля, что и при добалении

##Удаление лимита

```shell
curl -H 'X-Project-ID:mbank' -H 'Content-type:application/json' -X DELETE -u user:user http://sandbox.wallet.best/adm2/settings/limits/554cb2d6cccc9080250041a8
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {}
}
```
