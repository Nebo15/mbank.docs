#Кошельки
##Загрузка кошелька

```shell
curl -H 'X-Project-ID:mbank' -uuser:user https://sandbox.wallet.best/adm2/wallets/+380631345678
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


## Отчет об остатке кошельков проекта за период

```shell
$ curl -uadmin:admin "https://sandbox.wallet.best/adm2/wallets/balance/?from=2014-07-11&to=2014-07-13"
```

```json
{
   "meta":{
      "code":200
   },
   "data":[
      {
         "tick":"2014-07-11",
         "data":{
            "amount":55572.14
         }
      },
      {
         "tick":"2014-07-12",
         "data":{
            "amount":55572.14
         }
      },
      {
         "tick":"2014-07-13",
         "data":{
            "amount":55572.14
         }
      }
   ]
}
```
### Параметры
   
* `date_from`, `date_to` - Временной промежуток


## Получение кода активации кошелька

```shell
$ curl -uuser:user "https://sandbox.wallet.best/adm2/wallets/%2B12345657367/security_code"
```

```json
{
   "meta":{
      "code":200
   },
   "data":{
      "security_code":"2899066"
   }
}
```

## Загрузка IP адресов кошелька

```shell
$ curl -uuser:user "https://sandbox.wallet.best/adm2/wallets/%2B12345657367/ip"
```

```json
{
  "meta" : {
    "code" : 200,
    "page" : {
      "total_elements" : 21
    }
  },
  "data" : [ "127.0.0.1", "::1"]
}
```

## Поиск по кошелькам проекта

```shell
$ curl -uadmin:admin "https://sandbox.wallet.best/adm2/wallets/?family_name=арсен&active=true&order_by=payment_count&order_direction=desc"
```

```json
{
   "meta":{
      "page":{
         "total_elements":4
      },
      "code":200
   },
   "data":[
      {
         "phone":"+380503839001",
         "amount":8598.17,
         "enabled":true,
         "active":true,
         "role":"user",
         "created_at":"2014-08-20T15:10:25.943Z",
         "person":{
            "family_name":"Арсеньев",
            "given_name":"Алексей",
            "patronymic_name":"Александрович",
            "passport_series_number":"2202655885",
            "passport_issued_at":"2012-02-27",
            "itn":"330500938709",
            "ssn":"11223344595",
            "status":"data_entered"
         },
         "statistics":{
            "payments":{
               "lifetime":{
                  "turnover":8,
                  "in_turnover":8,
                  "out_turnover":8,
                  "p2p_turnover":8,
                  "count":8,
                  "in_count":8,
                  "out_count":8,
                  "p2p_count":8,

               },
               "last_month":{
                  "turnover":8,
                  "in_turnover":8,
                  "out_turnover":8,
                  "p2p_turnover":8,
                  "count":8,
                  "in_count":8,
                  "out_count":8,
                  "p2p_count":8,

               }
            },
            "cards":{
               "count":4,
               "active_count":2
            }
         }
      }
   ]
}
```

### Постраничная навиция

См. выше.

### Параметры

* `order_by` - поле для сортировки
* `order_direction` - направление сортировки: asc или desc (case insensitive)

### Поля ответа:

* `phone` - номер телефона, к которому привязан кошелек
* `amount` - остаток на балансе кошелька
* `enabled` - false если кошелек заблокирован, иначе - true
* `active` - true если кошелек активирован через СМС-код
* `role` - роль пользователя (всегда равно user)
* `created_at` - дата регистрации пользователя
* `person.*` - идентификационные данные пользователя
* `statistics.payments.lifetime.turnover` - оборот по кошельку за все время
* `statistics.payments.lifetime.in_turnover` - оборот по транзакциям типа in за все время
* `statistics.payments.lifetime.out_turnover` - оборот по транзакциям типа out за все время
* `statistics.payments.lifetime.p2p_turnover` - оборот по транзакциям типа p2p за все время
* `statistics.payments.lifetime.count` - количество транзакций за все время
* `statistics.payments.lifetime.in_count` - количество транзакций типа in за все время
* `statistics.payments.lifetime.out_count` - количество транзакций типа out за все время
* `statistics.payments.lifetime.p2p_count` - количество транзакций типа out за все время
* `statistics.payments.last_month.turnover` - оборот по кошельку за последний месяц
* `statistics.payments.last_month.in_turnover` - оборот по транзакциям типа in за последний месяц
* `statistics.payments.last_month.out_turnover` - оборот по транзакциям типа out за последний месяц
* `statistics.payments.last_month.p2p_turnover` - оборот по транзакциям типа p2p за последний месяц
* `statistics.payments.last_month.count` - количество транзакций за последний месяц
* `statistics.payments.last_month.in_count` - количество транзакций типа in за последний месяц
* `statistics.payments.last_month.out_count` - количество транзакций типа out за последний месяц
* `statistics.payments.last_month.p2p_count` - количество транзакций типа out за последний месяц
* `statistics.cards.count` - количество привязанных и удаленных карт
* `statistics.cards.active_count` - количество привязанных активных карт

### Поля для сортировки:

* `statistics.payments.lifetime.*` - по любому полю со статистики транзакций за все время
* `statistics.cards.*count` - по любому count полю со статистики количества карт
* `created_at` - по дате регистрации
* `amount` - по остаткам

### Фильтры:

* `ips` - по списку IP адресов разделённых запятой
* `created_before` и `created_after` - по дате регистрации
* `person_given_name`, `person_family_name` и `person_patronymic_name` - по ФИО, поиск полного совпадения или совпадения в начале
* `person_status` - по статусу идентификации
* `person_passport_series_number` - по номеру и серии паспорта
* `phones` - по списку номеров телефонов, разделённых запятыми; поиск полного совпадения или совпадения в начале
* `card_number_first` - по первым 6-ти цифрам номера карты
* `card_number_last` - по последним 4-ем цифрам номера карты
* `card_id` - по ID карты в IPSP
* `amount_from` и `amount_to` - по сумме остатка на кошельке
* `active` - по статусу активации (true|false)
* `enabled` - по статусу блокировки (true|false)

##Удаление кошелька

```shell
curl -H 'X-Project-ID:mbank' -H 'Content-type:application/json' -X DELETE -u user:user "https://sandbox.wallet.best/adm2/wallets/+123457643395"
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
curl -H 'X-Project-ID:mbank' -H 'Content-type:application/json' -X POST -u user:user -d '{"email":"test@testdt.com"}' https://sandbox.wallet.best/adm2/wallets/+12345842116/email
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
curl -H 'X-Project-ID:mbank' -H 'Content-type:application/json' -X POST -u user:user -d '{"person_status":"data_entered"}' https://sandbox.wallet.best/adm2/wallets/+12345842117/person/status
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
* `level` - `anonymous` | `identified` | `personified` уровень пользователя (опционально, по умолчанию `identified`)

##Заставить сменить пароль

```shell
curl -H 'X-Project-ID:mbank' -H 'Content-type:application/json' -X POST -u user:user -d '{"password_reset":true}' https://sandbox.wallet.best/adm2/wallets/+12345842117/password/reset
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
$curl -H 'X-Project-ID:mbank' -H 'Content-type:application/json' -X DELETE -u user:user https://sandbox.wallet.best/adm2/wallets/+123457443658/icon
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
curl -H 'X-Project-ID:mbank' -X GET -u user:user https://sandbox.wallet.best/adm2/wallets/+12345471665/devices

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
curl  -X POST -u user:user -d '{"message":"message","reason":"reason"}' https://sandbox.wallet.best/adm2/wallets/+12345334867/disable
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
curl  -X POST -u user:user https://sandbox.wallet.best/adm2/wallets/+12345334867/enable
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
curl -H 'X-Project-ID:mbank' -X GET -u user:user https://sandbox.wallet.best/adm2/wallets/+380631345678/intersecting
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
                "active": true,
                "enabled": true
            },
            {
                "phone": "+12345040280",
                "created_at": "2015-01-13T16:08:45+00:00",
                "active": true,
                "enabled": true
            }
        ],
        "by_card": [
            {
                "phone": "+79260000122",
                "created_at": "2015-01-14T15:29:47+00:00",
                "active": true,
                "enabled": true
            },
            {
                "phone": "+380931254212",
                "created_at": "2015-03-03T10:24:13+00:00",
                "active": true,,
                "enabled": true
            }
        ],
        "by_identification_data": {
            "by_person": [],
            "by_passport": [
                {
                    "phone": "+79261111111",
                    "created_at": "2015-01-14T14:38:45+00:00",
                    "active": true,
                    "enabled": false
                },
                {
                    "phone": "+380503839001",
                    "created_at": "2015-01-14T14:40:30+00:00",
                    "active": true,
                    "enabled": true
                    
                }
            ]
        },
        "by_udid": [
            {
                "phone": "+12345284106",
                "created_at": "2015-07-09T10:03:17+00:00",
                "active": true,
                "enabled": true
            }
        ],
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
* `by_udid` - по пересечению устройств
* `by_contacts` - степень похожести телефонной книги составляет >= 20%

##Разослать PUSH уведомления списку кошельков

```shell
curl  -X POST -u user:user -d '{"event":"some_event", "message":"test", "phones":["+79107653522","+79633963636", "+7123"]}' "https://sandbox.wallet.best/adm2/wallets/pushes"
```

```json
{
    "meta": {
        "code": 200
    },
    "data": [
        "+79107653522",
        "+79633963636"
    ]
}
```

Уведомления будут разосланы только тем кошелькам, которые есть у нас

* `message` - Сообщение, которое увидит пользователь
* `event` - Евент уведомления
* `phones` - Массив номеров телефонов