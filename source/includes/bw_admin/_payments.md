#Платежи

## Загрузка списка платежей

```shell
curl -uuser:user https://sandbox.wallet.best/adm2/payments/?size=2
```

```json
{
    "meta": {
        "code": 200,
        "page": {
            "total_elements": 2852
        },
        "time": 0.471806
    },
    "data": [
        {
            "id": 33616,
            "client_payment_id": "d292cd02-faa6-4aaf-ae52-2188182affa3",
            "amount": 45,
            "total": 45,
            "created_at": "2015-04-30T10:57:03.952Z",
            "processed_at": "2015-04-30T10:57:14.079Z",
            "status": "completed",
            "type": "inout",
            "service": {
                "id": "53359fb2255c741a749f0c44",
                "name": "Теле2",
                "mserver_id": 1000
            },
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
                    "items": null,
                    "localized_fields": [
                        "title",
                        "pattern_desc"
                    ],
                    "value": "+79267101283"
                }
            ],
            "inbound": {
                "id": 4,
                "code": "ipsp_in",
                "name": "ООО ИПСП (агент)"
            },
            "outbound": {
                "id": 1,
                "code": "tpr_out",
                "name": "Кредит Пилот"
            },
            "card": {
                "id": 17117,
                "state": "active",
                "title": "465206******2338",
                "type": "Visa"
            },
            "wallet": {
                "phone": "+12345696275",
                "amount": 10000,
                "level": "anonymous",
                "verified": false,
                "person_status": "no_data",
                "enabled": true,
                "active": true,
                "created_at": "2015-04-30T10:56:39.168Z",
                "last_seen_ip": "127.0.0.1"
            },
            "remote_check": "1430391567657",
            "auth_code": "958007",
            "ip_address": "127.0.0.1",
            "title": "Теле2",
            "subtitle": "Пополнение",
            "description": "По номеру +79267101283"
        },
        {
            "id": 33615,
            "client_payment_id": "3a97b428-73a9-4b77-aedc-cbf5771fa79f",
            "amount": 83,
            "total": 83,
            "created_at": "2015-04-30T10:56:45.373Z",
            "status": "processing",
            "type": "inout",
            "service": {
                "id": "53359fb2255c741a749f0c44",
                "name": "Теле2",
                "mserver_id": 1000
            },
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
                    "items": null,
                    "localized_fields": [
                        "title",
                        "pattern_desc"
                    ],
                    "value": "+79267101283"
                }
            ],
            "inbound": {
                "id": 4,
                "code": "ipsp_in",
                "name": "ООО ИПСП (агент)"
            },
            "outbound": {
                "id": 1,
                "code": "tpr_out",
                "name": "Кредит Пилот"
            },
            "card": {
                "state": "pending",
                "payment_page_url": "https:\/\/test1.ipsp.com\/frontend\/endpoint?product_id=1721&desc=BestWallet&payment_type=S&amount=83.00&currency=RUB&cf=33615&locale=ru&hash=a00265377f9cd33d130c4ef01f472d7e7813bea1"
            },
            "wallet": {
                "phone": "+12345696275",
                "amount": 10000,
                "level": "anonymous",
                "verified": false,
                "person_status": "no_data",
                "enabled": true,
                "active": true,
                "created_at": "2015-04-30T10:56:39.168Z",
                "last_seen_ip": "127.0.0.1"
            },
            "ip_address": "127.0.0.1",
            "title": "Теле2",
            "subtitle": "Пополнение",
            "description": "По номеру +79267101283"
        }
    ]
}
```

### Параметры (опциональные)

* `phone` - телефон кошелька, чьи платежи мы хотим видеть
* `type` - тип платежа
* `status`- статус платежа
* `service_name` - полное или частичное имя сервиса
* `service_ids` - список ID сервиса (как альтернатива service_name), ID сервисов перечисляются через запятую, например: 3,19,293
* `amount_from` и `amount_to` - границы диапазона сумм платежей, формат UTC
* `date_from` и `date_to` - границы диапазона дат создания платежей
* `page` - номер (начиная с 0) страницы, которую запрашивает клиент, по умолчанию 0
* `size` - размер страницы, которую запрашивает клиент, по умолчанию 20
* `order_by` - поле для сортировки
* `order_direction` - направление сортировки
* `client_ip` - IP адрес плательщика (или сервиса с которого поступило распоряжение на списание)
* `inbound_payment_id` - идентификатор платежа из IPSP
* `inbound_payment_status` - идентификатор платежа из IPSP
* `inbound_payment_amount_from` и `inbound_payment_amount_to` - границы диапазона сумм платежей IPSP
* `inbound_payment_date_from` и `inbound_payment_date_to` - границы диапазона дат создания платежей IPSP
* `inbound_payment_card_number_first` - поиск по первым 6 цифрам номера карты
* `inbound_payment_card_number_last` - поиск по последним 4 цифрам номера карты
* `inbound_payment_card_number_last` - поиск по последним 4 цифрам номера карты
* `inbound_payment_recurring` - фильтр по рекурентным платежам (true/false)
* `inbound_payment_card_type` - поиск по вендору карт (MASTER_CARD/VISA/..?)
* `inbound_payment_3ds` - поиск по 3ds статусу карты: unknown (ECI/SLI не получен ни на одном из шагов), attempted (06), skipped (07), successful (05)
* `inbound_payment_user_ip` - поиск по IP адресу плательщика



## Отчет о количестве платежей проекта за период

> Подсчёт всех платежей за период

```shell
$ curl -uadmin:admin "https://sandbox.wallet.best/adm2/payments/count?date_from=2014-07-11&date_to=2014-07-12"
```

```json
{
   "meta":{
      "code":200
   },
   "data":[
      {
         "tick":"2014-07-11",
         "data": {
             "count":123
         }
      },
      {
         "tick":"2014-07-12",
         "data": {
             "count":98
         }
      }
   ]
}
```

> Пример с группировкой по статусу платежей

```shell
$ curl -uadmin:admin "https://sandbox.wallet.best/adm2/payments/count?date_from=2014-07-11&date_to=2014-07-11&group_by=status&tick=3h"
```

```json
{
   "meta":{
      "code":200
   },
   "data":[
      {
         "tick":"2014-07-11T00:00:00",
         "data":{
            "count":83,
            "created":24,
            "processing":37,
            "completed":21,
            "declined":1
         }
      },
      {
         "tick":"2014-07-11T00:03:00",
         "data":{
            "count":83,
            "created":24,
            "processing":37,
            "completed":21,
            "declined":1
         }
      },
      ...
      {
         "tick":"2014-07-12T00:00:00",
         "data":{
            "count":83,
            "created":24,
            "processing":37,
            "completed":21,
            "declined":1
         }
      }
   ]
}
```

> Пример группировки по типу поставщика

```shell
$ curl -uadmin:admin "https://sandbox.wallet.best/adm2/payments/count?date_from=2014-07-11&date_to=2014-07-11&group_by=provider_types&tick=3h"
```

```json
{
   "meta":{
      "code":200
   },
   "data":[
      {
         "tick":"2014-07-12T00:00:00",
         "data":{
            "count":83,
            "providers":[
               {
                  "id" : 1,
                  "code" : "tpr_out",
                  "name" : "Кредит Пилот",
                  "type" : "outbound", 
                  "count": 50
               },
               {
                  "id" : 4,
                  "code" : "ipsp_in",
                  "name" : "ООО ИПСП (агент)",
                  "type" : "inbound",
                  "count": 50
                }
            ]
         }
      }
      ...
   ]
}
```

> Пример группировки по сервису

```shell
$ curl -uadmin:admin "https://sandbox.wallet.best/adm2/payments/count?date_from=2014-07-11&date_to=2014-07-11&group_by=service_ids&tick=3h"
```

```json
{
   "meta":{
      "code":200
   },
   "data":[
      {
         "tick":"2014-07-12T00:00:00",
         "data":{
            "count":83,
            "services":[
               {
                  "type" : "out",
                  "id" : 834,
                  "count": 50
               },
               {
                  "type" : "out",
                  "id" : 4,
                  "count": 30
                },
                {
                  "type" : "p2p",
                  "count": 20
                }
            ]
         }
      }
      ...
   ]
}
```

> Пример группировки по сервису и статусу

```shell
$ curl -uadmin:admin "https://sandbox.wallet.best/adm2/payments/count?tick=month&service_ids=1691&group_by=service_ids,status"
```

```json
{
  "meta" : {
    "code" : 200,
    "page" : {
      "total_elements" : 2
    }
  },
  "data" : [ {
    "data" : {
      "count" : 66,
      "services" : [ {
        "data" : {
          "declined" : 2,
          "created" : 51,
          "count" : 61,
          "completed" : 8
        },
        "id" : 1691,
        "type" : "out"
      }, {
        "data" : {
          "count" : 5,
          "completed" : 5
        },
        "id" : 1691,
        "type" : "inout"
      } ]
    },
    "tick" : "2015-02-28T22:00:00.000+0000"
  }, {
    "data" : {
      "count" : 15,
      "services" : [ {
        "data" : {
          "created" : 7,
          "count" : 14,
          "completed" : 7
        },
        "id" : 1691,
        "type" : "out"
      }, {
        "data" : {
          "declined" : 1,
          "count" : 1
        },
        "id" : 1691,
        "type" : "inout"
      } ]
    },
    "tick" : "2015-03-31T21:00:00.000+0000"
  } ]
}
```

### Параметры

* `date_from`, `date_to` - (фильтр) временной промежуток, по-умолчанию 1 месяц с текущего момента
* `status` - (фильтр) created | processing | completed | declined - статус платежа
* `service_ids` - (фильтр) сервис или список идентификаторов сервисов через запятую и/или флаг p2p (11,23,45,p2p)
* `group_by` - параметр группировки
* `wallet` - фильтр по номеру кошелька (смотреть данные в разрезе кошелька)
* `type` - (in | out | inout | p2p) фильтр по типу транзакции
* `tick` (30m | 3h | day | month) - выбор разреза при группировке. По умолчанию - день (day).

### Группировки
* `status` - для динамики проходимости платежей
* `service_ids` - для распределения платежей по сервисам, включая P2P как отдельный тип
* `service_ids,status` - по сервисам и статусам
* `provider_types` - по типу провайдеров, через которые проходили транзакции

## Отчет о обороте платежей проекта за период

```shell
$ curl -uadmin:admin "https://sandbox.wallet.best/adm2/payments/turnover?date_from=2014-07-11&date_to=2014-07-12"
```

```json
{
   "meta":{
      "code":200
   },
   "data":[
      {
         "tick":"2014-07-11",
         "data": {
             "amount":1233424
         }
      },
      {
         "tick":"2014-07-12",
         "data": {
             "amount":98234342
         }
      }
   ]
}
```

> Пример с группировкой по статусу платежей

```shell
$ curl -uadmin:admin "https://sandbox.wallet.best/adm2/payments/turnover?date_from=2014-07-11&date_to=2014-07-11&group_by=status&tick=3h"
```

```json
{
   "meta":{
      "code":200
   },
   "data":[
      {
         "tick":"2014-07-11T00:00:00",
         "data":{
            "amount":83324324324,
            "created":2434234,
            "processing":3723434,
            "completed":2123423,
            "declined":12
         }
      },
      ...
   ]
}
```

> Пример группировки по типу поставщика

```shell
$ curl -uadmin:admin "https://sandbox.wallet.best/adm2/payments/turnover?date_from=2014-07-11&date_to=2014-07-11&group_by=provider_types&tick=3h"
```

```json
{
   "meta":{
      "code":200
   },
   "data":[
      {
         "tick":"2014-07-12T00:00:00",
         "data":{
            "amount":83,
            "providers":[
               {
                  "id" : 1,
                  "code" : "tpr_out",
                  "name" : "Кредит Пилот",
                  "type" : "outbound", 
                  "amount": 5043
               },
               {
                  "id" : 4,
                  "code" : "ipsp_in",
                  "name" : "ООО ИПСП (агент)",
                  "type" : "inbound",
                  "amount": 1293
                }
            ]
         }
      }
      ...
   ]
}
```

> Пример группировки по сервису

```shell
$ curl -uadmin:admin "https://sandbox.wallet.best/adm2/payments/turnover?date_from=2014-07-11&date_to=2014-07-11&group_by=service_ids&tick=3h"
```

```json
{
   "meta":{
      "code":200
   },
   "data":[
      {
         "tick":"2014-07-12T00:00:00",
         "data":{
            "amount":83243,
            "services":[
               {
                  "type" : "out",
                  "id" : 834,
                  "amount": 50234
               },
               {
                  "type" : "out",
                  "id" : 4,
                  "amount": 3012
               },
               {
                  "type" : "p2p",
                  "amount": 2033
               }
            ]
         }
      }
      ...
   ]
}
```

> Пример группировки по сервису и статусу

```shell
$ curl -uadmin:admin "https://sandbox.wallet.best/adm2/payments/turnover?tick=month&service_ids=1691&group_by=service_ids,status"
```

```json
{
  "meta" : {
    "code" : 200,
    "page" : {
      "total_elements" : 2
    }
  },
  "data" : [ {
    "data" : {
      "amount" : 154,
      "services" : [ {
        "data" : {
          "amount" : 144,
          "declined" : 20,
          "created" : 114,
          "completed" : 10
        },
        "id" : 1691,
        "type" : "out"
      }, {
        "data" : {
          "amount" : 10,
          "completed" : 10
        },
        "id" : 1691,
        "type" : "inout"
      } ]
    },
    "tick" : "2015-02-28T22:00:00.000+0000"
  }, {
    "data" : {
      "amount" : 114,
      "services" : [ {
        "data" : {
          "amount" : 14,
          "created" : 7,
          "completed" : 7
        },
        "id" : 1691,
        "type" : "out"
      }, {
        "data" : {
          "amount" : 100,
          "declined" : 100
        },
        "id" : 1691,
        "type" : "inout"
      } ]
    },
    "tick" : "2015-03-31T21:00:00.000+0000"
  } ]
}
```
### Параметры

* `date_from`, `date_to` - (фильтр) временной промежуток, по-умолчанию 1 месяц с текущего момента
* `amount_from`, `amount_to` - (фильтр) по сумме платежа
* `status` - (фильтр) created | processing | completed | declined - статус платежа
* `service_ids` - (фильтр) сервис или сервисок идентификаторов сервисов через запятую и/или флаг p2p (11,23,45,p2p) 
* `group_by` - параметр группировки
* `wallet` - фильтр по номеру кошелька (смотреть данные в разрезе кошелька)
* `type` - (in | out | inout | p2p) фильтр по типу транзакции
* `tick` (30m | 3h | day | month) - выбор разреза при группировке. По умолчанию - день (day).

### Группировки
* `status` - для динамики проходимости платежей
* `service_ids` - для распределения платежей по сервисам, включая P2P как отдельный тип
* `service_ids,status` - по сервисам и статусам
* `provider_types` - по типу провайдеров, через которые проходили транзакции

> Оборот всех платежей за период
* `date_from` и `date_to` - границы диапазона дат создания платежей
* `ipsp_payment_id` - идентификатор платежа из IPSP
* `page` - номер (начиная с 0) страницы, которую запрашивает клиент, по умолчанию 0
* `size` - размер страницы, которую запрашивает клиент, по умолчанию 20
* `sort` - поле сортировки, через запятую может следовать направление