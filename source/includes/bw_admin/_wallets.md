#Кошельки
##Загрузка кошелька

```shell
curl -H 'X-Project-ID:mbank' -uuser:user http://sandbox.wallet.best/adm2/wallets/+380631345678
```

```json
{
    "meta": {
        "code": 200,
        "time": 1.413015
    },
    "data": {
        "created_at": "2015-01-13T21:51:41.436Z",
        "amount": 598,
        "enabled": true,
        "active": true,
        "phone": "+380631345678",
        "statistics": {
            "cards": {
                "active_count": 1,
                "count": 189
            },
            "payments": {
                "lifetime": {
                    "turnover": 14643,
                    "count": 272,
                    "in_turnover": 2707,
                    "in_count": 1,
                    "out_turnover": 11525,
                    "out_count": 47,
                    "in_out_turnover": 0,
                    "in_out_count": 0,
                    "p2p_turnover": 631,
                    "p2p_count": 14
                },
                "last_month": {
                    "turnover": 58,
                    "count": 1,
                    "in_turnover": 0,
                    "in_count": 0,
                    "out_turnover": 0,
                    "out_count": 0,
                    "in_out_turnover": 58,
                    "in_out_count": 1,
                    "p2p_turnover": 0,
                    "p2p_count": 0
                }
            }
        },
        "cards": [
            {
                "card_id": 10189,
                "state": "active",
                "title": "541715******7260",
                "type": "MasterCard",
                "lifetime_turnover": 2610,
                "card_holder_name": "DKLJFLHSKD",
                "last_payment_status": "declined",
                "bin_info": {
                    "bin": "541715",
                    "brand": "MASTERCARD",
                    "sub_brand": "",
                    "country_code": "RU",
                    "country_name": "Russian Federation",
                    "bank": "JSCB BANK OF MOSCOW",
                    "card_type": "CREDIT",
                    "card_category": "STANDARD",
                    "latitude": "60",
                    "longitude": "100",
                    "query_time": "388.476µs"
                }
            },
            {
                "card_id": 10870,
                "state": "used",
                "title": "541715******7260",
                "type": "MasterCard",
                "lifetime_turnover": 155,
                "card_holder_name": "test test",
                "last_payment_status": "completed"
            },
            {
                "card_id": 9416,
                "state": "pending",
                "lifetime_turnover": 0
            },
            {
                "card_id": 9417,
                "state": "deleted",
                "title": "541715******7260",
                "type": "MasterCard",
                "lifetime_turnover": 0
            }
        ],
        "limits": {
            "amount": {
                "in": {
                    "limit": 15000,
                    "available": 15000
                },
                "out": {
                    "limit": 15000,
                    "available": 15000
                },
                "p2p": {
                    "limit": 15000,
                    "available": 15000
                },
                "wallet": {
                    "limit": 60000,
                    "available": 59402
                }
            },
            "turnover": {
                "monthly": {
                    "in": {
                        "limit": 200000,
                        "available": 200000
                    },
                    "out": {
                        "limit": 200000,
                        "available": 200000
                    },
                    "p2p": {
                        "limit": 40000,
                        "available": 40000
                    }
                }
            },
            "cards": {
                "active": {
                    "limit": 10,
                    "available": 9
                }
            }
        },
        "person": {
            "family_name": "Дрыга",
            "given_name": "Андрей",
            "patronymic_name": "Александрович",
            "passport_series_number": "2202655885",
            "passport_issued_at": "2012-02-27",
            "itn": "330500938709",
            "ssn": "11223344595",
            "status": "data_entered"
        },
        "has_picture": true,
        "picture_url": "http:\/\/sandbox.wallet.best\/img\/wallets\/7a\/91c\/54291c7a56c35f205da91f9d.jpg?1422258292",
        "email": "test@wallet.best",
        "email_send_frequency": null,
        "contacts_count": 0,
        "projects": [
            "mbank"
        ]
    }
}
```

###См.  Поиск по кошелькам проекта Админстративное API Mserver
Дополнительные поля, которые передаются в ответе:

* `has_picture` - имеет ли изображение
* `picture_url` - урл изображения
* `email`
* `email_send_frequency` - ?
* `contacts_count` - кол-во контактов
* `projects` - к каким проектам относится
* `lock_reason` - причина блокировки (если заблокирован) 
##Удаление кошелька

```shell
curl -H 'X-Project-ID:mbank' -H 'Content-type:application/json' -X DELETE -u user:user "http://sandbox.wallet.best/adm2/wallets/+123457643395"
```

```json
{
    "meta": {
        "code": 200,
        "time": 0.270401
    },
    "data": {}
}
```

Работает только на DEV сервере

##Изменение email кошелька

```shell
curl -H 'X-Project-ID:mbank' -H 'Content-type:application/json' -X POST -u user:user -d '{"email":"test@testdt.com"}' http://sandbox.wallet.best/adm2/wallets/+12345842116/email
```

```json
{
    "meta": {
        "code": 200,
        "time": 0.270401
    },
    "data": {}
}
```

##Изменение person/status кошелька

```shell
curl -H 'X-Project-ID:mbank' -H 'Content-type:application/json' -X POST -u user:user -d '{"person_status":"data_entered"}' http://sandbox.wallet.best/adm2/wallets/+12345842117/person/status
```

```json
{
    "meta": {
        "code": 200,
        "time": 0.270401
    },
    "data": {}
}
```

###Изменяемые поля

* `person_status` - Изменить статус верификации (см. Изменение статуса персональных данныхv)

##Заставить сменить пароль

```shell
curl -H 'X-Project-ID:mbank' -H 'Content-type:application/json' -X POST -u user:user -d '{"password_reset":true}' http://sandbox.wallet.best/adm2/wallets/+12345842117/password/reset
```

```json
{
    "meta": {
        "code": 200,
        "time": 0.270401
    },
    "data": {}
}
```

###Изменяемые поля (разные запросы)
* `password_reset` - (true|false) - заставить сменить пароль

##Удаление аватарки пользователя

```shell
$curl -H 'X-Project-ID:mbank' -H 'Content-type:application/json' -X DELETE -u user:user http://sandbox.wallet.best/adm2/wallets/+123457443658/icon
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {}
}
```


##Получение списка устройств кошелька

```shell
curl -H 'X-Project-ID:mbank' -X GET -u user:user http://sandbox.wallet.best/adm2/wallets/+12345471665/devices

```

```json
{
    "meta": {
        "code": 200
    },
    "data": [
        {
            "id": "d4760f14-6f66-43ce-b096-6703c18e56ca",
            "info": {
                "pin_enabled": "0",
                "carrier": "Carrier:06",
                "carrier_country_code": "255",
                "permission_contacts": "1",
                "permission_photo": "1",
                "permission_location": "1",
                "permission_push": "1",
                "bluetooth_enabled": "1",
                "wifi_connected": "1"
            },
            "apns_badge": 0
        },
        {
            "id": "d4760f14-6f66-43ce-b096-6703c18e56cs",
            "info": {
                "pin_enabled": "0",
                "carrier": "Carrier:06",
                "carrier_country_code": "255",
                "permission_contacts": "1",
                "permission_photo": "1",
                "permission_location": "1",
                "permission_push": "1",
                "bluetooth_enabled": "1",
                "wifi_connected": "1"
            },
            "apns_badge": 0
        }
    ]
}
```

Список устройств, с которых пользователь заходил в приложения

##Блокировка кошелька

```shell
curl  -X POST -u user:user -d '{"message":"message","reason":"reason"}' http://sandbox.wallet.best/adm2/wallets/+12345334867/disable
```

```json
{
    "meta": {
        "code": 200,
        "time": 0.270401
    },
    "data": {}
}
```

* `message` - Сообщение, которое увидит пользователь
* `reason` - Причина блокировки

##Разблокировка кошелька

```shell
curl  -X POST -u user:user http://sandbox.wallet.best/adm2/wallets/+12345334867/enable
```

```json
{
    "meta": {
        "code": 200,
        "time": 0.270401
    },
    "data": {}
}
```

##Получение списка пересекающихся кошельков

```shell
curl -H 'X-Project-ID:mbank' -X GET -u user:user http://sandbox.wallet.best/adm2/wallets/+380631345678/intersecting
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "by_ip": [
            {
                "phone": "+12345031449",
                "created_at": "2015-03-02T13:39:49+00:00",
                "active": true
            },
            {
                "phone": "+12345040280",
                "created_at": "2015-01-13T16:08:45+00:00",
                "active": true
            }
        ],
        "by_card": [
            {
                "phone": "+79260000122",
                "created_at": "2015-01-14T15:29:47+00:00",
                "active": true
            },
            {
                "phone": "+380931254212",
                "created_at": "2015-03-03T10:24:13+00:00",
                "active": true
            }
        ],
        "by_identification_data": {
            "by_person": [],
            "by_passport": [
                {
                    "phone": "+79261111111",
                    "created_at": "2015-01-14T14:38:45+00:00",
                    "active": true
                },
                {
                    "phone": "+380503839001",
                    "created_at": "2015-01-14T14:40:30+00:00",
                    "active": true
                }
            ]
        },
        "by_udid": [],
        "by_contacts": []
    }
}
```

Список кошельков - у которых совпадают данные

* `by_ip` - Заходили с одного ip
* `by_card` - Привязанна одна и та же карта
* `by_identification_data`
* * `by_person` - совпадают идентификационные данные;
* * `by_passport` - совпадают паспортные данные
* `by_udid` - заходили с одного устройства
* `by_contacts` - степень похожести телефонной книги составляет >= 20%
