# Кошельки

## Поиск по кошелькам проекта

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

```shell
$ curl -uadmin:admin "https://www.synq.ru/mserver2-dev/admin/wallets?family_name=арсен&active=true&order_by=payment_count&order_direction=desc"
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

## Аналитика по кошелькам

### Параметры

* `group_by` - поле для группировки
* `tick` (day|month) - выбор разреза при группировке (день|месяц). По умолчанию - день.

### Фильтры:
(См. "Поиск по кошелькам")

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
* `disabled` - по статусу блокировки (true|false)

### Группировки:

* `created_at` - вернет количество новых регистрацией за каждый `tick`

> Количество зарегистрированных кошельков с фильтром

```shell
$ curl -uadmin:admin "https://www.synq.ru/mserver2-dev/admin/wallets/count?active=true"
```

```json
{
   "meta":{
      "code":200
   },
   "data":{
      "count":200
   }
}
```

> Динамика регистраций кошельков с фильтром

```shell
$ curl -uadmin:admin "https://www.synq.ru/mserver2-dev/admin/wallets_count?group_by=created_at&tick=day&created_after=2014-01-01"
```

```json
{
   "meta":{
      "code":200
   },
   "data":[
      {
         "tick":"2014-06-01",
         "data":{
            "count":125477.16
         }
      },
      {
         "tick":"2014-06-02",
         "data":{
            "count":0
         }
      },
      {
         "tick":"2014-06-03",
         "data":{
            "count":0
         }
      }
   ]
}
```


## Загрузка кошелька

### Поля ответа:

* `phone`
* `amount`
* `enabled`
* `active`
* `role`
* `created_at`
* `person.*` - идентификационные данные пользователя
* `cards.*` - данные по картам прикреплённым к кошельку
* `cards.state` - (created | pending | active | failed | deleted | used) - состояние карты
* `cards.3ds` - (unknown | success | failed | none) - вид 3D Secure
* `cards.last_payment_status` - (created | processing | completed | declined) - статус последнего платежа
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

```shell
$ curl -uuser:user "https://www.synq.ru/mserver2-dev/admin/wallets/%2B79260000006"
```

```json
{
   "meta":{
      "code":200
   },
   "data":{
      "phone":"+79260000006",
      "amount":65572.14,
      "enabled":true,
      "active":true,
      "role":"user",
      "created_at":"2014-06-01T12:43:52.876Z",
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
      "cards":[
         {
            "card_id":14,
            "state":"used",
            "title":"541715******2399",
            "type":"MasterCard",
            "3ds":"none",
            "lifetime_turnover":245435.56,
            "card_holder_name":"Ivanov Ivan",
            "last_payment_status":"completed"
         }
      ],
      "limits":{
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
               "limit": 15000,
               "available": 15000
            },
         },
         "turnover": {
             "monthly": {
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
             },
         },
         "cards": {
            "active": {
               "limit": 10,
               "available": 8,
            }
         }
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
}
```

## Загрузка IP адресов кошелька

```shell
$ curl -uuser:user "https://www.synq.ru/mserver2-dev/admin/wallets/%2B12345657367/ip"
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

## Получение кода активации кошелька

```shell
$ curl -uuser:user "https://www.synq.ru/mserver2-dev/admin/wallets/%2B12345657367/security_code"
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


## Блокировка кошелька

### Параметры

* `message` - сообщение для пользователя кошелька, объясняющее причину блокировки и как дальше жить
* `reason` - сообщение для сотрудников проекта о причине блокировки (не видно клиенту)

```shell
$ curl -uuser:user  -H 'Content-type:application/json' --data '{"message": "Заблокирован до выяснения.", "reason": "Клиент - кардер." }' "https://www.synq.ru/mserver2-dev/admin/wallets/%2B12345657367/disable"
```

```json
{
   "meta":{
      "code":200
   },
   "data":{
      "phone":"+12345657367",
      "amount":10000,
      "reset_password":false,
      "lock_message":"Заблокироваан до выяснения.",
      "verified":false,
      "enabled":false,
      "active":true,
      "lock_reason":"Клиент - кардер.",
      "locked_at":"2014-08-14T16:46:42.122Z"
   }
}
```


## Разблокировка кошелька

```shell
$ curl -uuser:user -X POST "https://www.synq.ru/mserver2-dev/admin/wallets/%2B12345657367/enable"
```

```json
{
   "meta":{
      "code":200
   },
   "data":{
      "phone":"+12345657367",
      "amount":10000,
      "reset_password":false,
      "verified":false,
      "enabled":true,
      "active":true
   }
}
```

## Получение списка персональных данных

Информация выдаётся постранично.

### Параметры постраничного запроса

`page` - номер страницы начиная с 0
`size` - размер страницы
`order_by` - сортировка по полю, имя поля указывается в snake_case стиле
`order_direction` - направление сортировки
`status` - фильтр по статусу сообщений. Например, для получения списка кошельков ожидающих идентификации

```shell
$ curl -uuser:user "https://www.synq.ru/mserver2-dev/admin/persons?page=1&size=2&order_by=givenName&order_direction=desc&status=data_entered
```

```json
{
   "meta":{
      "page":{
         "total_elements":6
      },
      "code":200
   },
   "data":[
      {
         "family_name":"Дергачёв",
         "given_name":"Андрей",
         "patronymic_name":"Петрович",
         "passport_series_number":"45112456789",
         "passport_issued_at":"2007-06-07",
         "itn":"526317984689",
         "status":"data_entered",
         "verified_at":"2014-10-30T11:11:52.401Z",
         "changed_at":"2014-09-08T15:47:10.411Z",
         "wallet":{
            "phone":"+380631345678"
         }
      },
      {
         "family_name":"Арсеньев",
         "given_name":"Алексей",
         "patronymic_name":"Александрович",
         "passport_series_number":"2202655111",
         "passport_issued_at":"2012-02-02",
         "itn":"330500938709",
         "status":"data_entered",
         "changed_at":"2014-10-24T15:09:12.019Z",
         "wallet":{
            "phone":"+380503839987"
         }
      }
   ]
}
```

## Изменение статуса персональных данных

### Параметры

* `wallet` - номер телефона в международном формате
* `status` - `data_entered` | `data_verified` статус персональных данных
* `level` - `anonymous` | `identified` | `personified` уровень пользователя (опционально, по умолчанию `identified`)

```shell
$ curl  -H 'Content-type:application/json' -uuser:user -d '{"status": "data_verified", "level": "identified"}' "https://www.synq.ru/mserver2-dev/admin/persons/%2B79260000006/update_status"
```

> Результат содержит `"status": "data_verified", "verified_at": "2014-10-22T10:26:12.035Z"`

```json
{
   "meta":{
      "code":200
   },
   "data":{
      "family_name":"Иванов",
      "given_name":"Иван",
      "patronymic_name":"Иванович",
      "passport_series_number":"1122334455",
      "passport_issued_at":"2012-12-20",
      "itn":"330500938709",
      "ssn":"11223344595",
      "status":"data_verified",
      "verified_at":"2014-10-22T10:26:12.035Z",
      "changed_at":"2014-10-22T10:26:10.604Z",
      "wallet":{
         "phone":"+380935895452"
      }
   }
}
```


## Отчет об остатке кошельков проекта за период

### Параметры

* `date_from`, `date_to` - Временной промежуток

```shell
$ curl -uadmin:admin "https://www.synq.ru/mserver2-dev/admin/wallets/balance?from=2014-07-11&to=2014-07-13"
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



## Удаление кошелька

<aside class="warning">Команда работает только на dev сервере</aside>

```shell
$ curl -uuser:user -X DELETE https://www.synq.ru/mserver2-dev/admin/wallets/+79260000006
```

```json
{
   "meta":{
      "code":200
   }
}
```
