# Платежи

## Поиск по платежам

### Параметры (опциональные)

* `id` - ID платежа
* `check` - номер чека платежа
* `wallet` - телефон кошелька, чьи платежи мы хотим видеть
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
* `inbound_payment_recurring` - фильтр по рекурентным платежам (true/false)
* `inbound_payment_card_type` - поиск по вендору карт (MASTER_CARD/VISA/..?)
* `inbound_payment_3ds` - поиск по 3ds статусу карты: unknown (ECI/SLI не получен ни на одном из шагов), attempted (06), skipped (07), successful (05)
* `inbound_payment_user_ip` - поиск по IP адресу плательщика

### Поля для сортировки:

* `created_at` - по дате создания
* `status` - по статусу
* `type` - по типу
* `service` - по сервису
* `processed_at` - по дате обработки

```shell
$ curl -uuser:user "https://www.synq.ru/mserver2-dev/admin/payments?service_name=mts&type=out&status=created&amount_from=0&amount_to=100000&date_from=2014-01-01T12:10:15.525Z&date_to=2014-12-01T00:00:00.00Z&order_by=amount&order_direction=desc&size=1"
```

```json
{
   "meta":{
      "page":{
         "total_elements":14
      },
      "code":200
   },
   "data":[
      {
         "id":1401089244704,
         "client_payment_id":"409c1e06-5faa-11e4-a61c-b88d12284ddc",
         "amount":12000,
         "total":12070,
         "created_at":"2014-10-29T20:29:16.495Z",
         "status":"created",
         "type":"out",
         "service":{
            "id":15,
            "name":"MTS Украина"
         },
         "parameters":[
            {
               "code":"phoneNumber",
               "name":"№ телефона (9-10 цифр)",
               "value":"0509244512"
            }
         ],
         "outbound":{
            "id":35,
            "code":"tpr_out",
            "name":"ООО ТПР (провайдер)"
         },
         "wallet":{
            "phone":"+79270000001",
            "amount":8496.32,
            "verified":false,
            "ip":"37.110.42.197"
         }
      }
   ]
}
```

> Пример фильтра по кошельку и IP

```shell
$ curl -uuser:user "https://www.synq.ru/mserver2-dev/admin/payments?wallet=%2B380935895452&client_ip=127.0.0.1&size=1"
```

```json
{
   "meta":{
      "page":{
         "total_elements":2
      },
      "code":200
   },
   "data":[
      {
         "id":1401089245266,
         "client_payment_id":"96c280f4-8e2b-40a1-b250-806bb4a4b9f1",
         "amount":10000,
         "total":10000,
         "created_at":"2014-11-04T13:02:09.409Z",
         "processed_at":"2014-11-04T13:02:13.619Z",
         "status":"completed",
         "type":"p2p",
         "wallet":{
            "phone":"+380935895452",
            "amount":0,
            "name":"Иван Иванов",
            "verified":true,
            "ip":"127.0.0.1"
         },
         "destination":{
            "phone":"+79555555555"
         },
         "direction":"out",
         "client_ip":"127.0.0.1"
      }
   ]
}
```

> Пример фильтра по inbound_payment_id (id платежа в IPSP)

```shell
$ curl -uuser:user "https://www.synq.ru/mserver2-dev/admin/payments?inbound_payment_id=6143708"
```

```json
{
   "meta":{
      "code":200,
      "page":{
         "total_elements":1
      }
   },
   "data":[
      {
         "id":1401089245752,
         "client_payment_id":"6ea16c52-669e-11e4-86b1-3c07542cf2f2",
         "amount":42,
         "total":42,
         "created_at":"2014-11-07T16:52:17.990Z",
         "processed_at":"2014-11-07T16:52:21.791Z",
         "status":"completed",
         "type":"in",
         "inbound":{
            "id":62,
            "code":"ipsp_in",
            "name":"ООО ИПСП (агент)",
            "payment":{
               "amount":4200,
               "id":1401089245752,
               "type":"SALE",
               "date":"2014-11-07T16:52:19.804Z",
               "product_id":1721,
               "currency":"RUB",
               "card_holder_name":"TESTER TESTEROV",
               "exp_year":2014,
               "exp_month":11,
               "remote_ip":"81.95.134.13",
               "user_ip":"81.95.134.13",
               "card_number_mask":"541715******2399",
               "card_type":"MASTER_CARD",
               "recurring":false,
               "steps":[
                  {
                     "date":"2014-11-07T16:52:19.867Z",
                     "status":"PASSED_0",
                     "type":"ANTIFRAUD"
                  },
                  {
                     "eci":"06",
                     "date":"2014-11-07T16:52:21.571Z",
                     "status":"PASSED_0",
                     "type":"BANK",
                     "auth_id_response":"411421",
                     "date_local_trans":"2014-11-07T13:52:21.000Z",
                     "response_code":"APPROVED_00"
                  },
                  {
                     "date":"2014-11-07T16:52:19.843Z",
                     "status":"PASSED_0",
                     "type":"PAYMENT_INPUT"
                  }
               ]
            }
         },
         "card":{
            "state":"used",
            "title":"541715******2399",
            "type":"MasterCard",
            "bin":{
               "country":"Ukraine",
               "bank":"JCB PrivatBank",
               "type":"debit"
            }
         },
         "wallet":{
            "phone":"+79270000001",
            "amount":7462.54,
            "level":"anonymous",
            "name":"Пиэчпий Мбанков",
            "verified":true,
            "person_status":"data_verified",
            "enabled":true,
            "active":true,
            "role":"user",
            "created_at":"2014-10-29T16:33:14.045Z"
         },
         "client_ip":"81.95.134.13"
      }
   ]
}
```




## Отчет о количестве платежей проекта за период

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

> Подсчёт всех платежей за период

```shell
$ curl -uadmin:admin "https://www.synq.ru/mserver2-dev/admin/payments/count?date_from=2014-07-11&date_to=2014-07-12"
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
$ curl -uadmin:admin "https://www.synq.ru/mserver2-dev/admin/payments/count?date_from=2014-07-11&date_to=2014-07-11&group_by=status&tick=3h"
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
$ curl -uadmin:admin "https://www.synq.ru/mserver2-dev/admin/payments/count?date_from=2014-07-11&date_to=2014-07-11&group_by=provider_types&tick=3h"
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
$ curl -uadmin:admin "https://www.synq.ru/mserver2-dev/admin/payments/count?date_from=2014-07-11&date_to=2014-07-11&group_by=service_ids&tick=3h"
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
$ curl -uadmin:admin "https://www.synq.ru/mserver2-dev/admin/payments/count?tick=month&service_ids=1691&group_by=service_ids,status"
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

## Отчет о обороте платежей проекта за период

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

```shell
$ curl -uadmin:admin "https://www.synq.ru/mserver2-dev/admin/payments/turnover?date_from=2014-07-11&date_to=2014-07-12"
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
$ curl -uadmin:admin "https://www.synq.ru/mserver2-dev/admin/payments/turnover?date_from=2014-07-11&date_to=2014-07-11&group_by=status&tick=3h"
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
$ curl -uadmin:admin "https://www.synq.ru/mserver2-dev/admin/payments/turnover?date_from=2014-07-11&date_to=2014-07-11&group_by=provider_types&tick=3h"
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
$ curl -uadmin:admin "https://www.synq.ru/mserver2-dev/admin/payments/turnover?date_from=2014-07-11&date_to=2014-07-11&group_by=service_ids&tick=3h"
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
$ curl -uadmin:admin "https://www.synq.ru/mserver2-dev/admin/payments/turnover?tick=month&service_ids=1691&group_by=service_ids,status"
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

