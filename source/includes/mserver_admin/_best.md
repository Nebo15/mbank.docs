# Интеграция с БЭСТ

## Поиск переводов клиента БЭСТ

Запрос на поиск переводов по идентификатору клиента денежных переводов БЭСТ. Запрос возвращает токен, который позволяет забрать результаты поиска в случае готовности.
После того, как результаты поиска получены, они не будут доступны.

### Параметры

* `type` - тип перевода, возможные значения:
`out` – переводы, отправленные клиентом;
`in` – переводы, полученные клиентом или отправленные ему, но еще не полученные;
`processing` – переводы, отправленные клиенту, но еще не полученные.

```shell
curl -uadmin:test -X POST https://www.synq.ru/mserver2-dev/admin/best/client/147/transfer/search?type=out
```

```json
{
  "meta" : {
    "code" : 200
  },
  "data" : "735796@656055620"
}
```

## Получение результатов поиска переводов

Имея токен, идентифицирующий результат поиска можно получить список найденных переводов клиента БЭСТ.

```shell
curl -uadmin:test https://www.synq.ru/mserver2-dev/admin/best/client/transfer/search/735796@656055620
```

```json
{
  "meta" : {
    "code" : 200,
    "page" : {
      "total_elements" : 1
    }
  },
  "data" : [ {
    "sender" : {
      "data" : {
        "country" : {
          "numeric" : "643"
        },
        "lastname" : "Арсеньев",
        "firstname" : "Алексей",
        "patronymic" : "Александрович",
        "isresident" : 1
      },
      "address" : {
        "phone" : "79261111111"
      },
      "data_extended" : {
        "birth_day" : "1982-01-01T21:00:00.000+0000",
        "birth_place" : "Город Орёл Орловской области"
      },
      "identification" : {
        "type" : "1",
        "series" : "2202",
        "number" : "655885",
        "issuer" : "Отделом УФМС России по гор Орёл",
        "issue_date" : "2013-02-06T20:00:00.000+0000",
        "dep_code" : "770-105"
      }
    },
    "receiver" : {
      "data" : {
        "country" : {
          "numeric" : "643"
        },
        "lastname" : "Арсеньев",
        "firstname" : "Алексей",
        "patronymic" : "Александрович",
        "isresident" : 1
      },
      "address" : { },
      "data_extended" : { },
      "identification" : { }
    },
    "number" : 413258621,
    "amount" : 30,
    "currency_alpha" : "RUR",
    "note" : "test payment",
    "smstosender" : 0,
    "smstoreceiver" : 0,
    "checknumber" : "33977399",
    "creating_date" : "2014-12-24T21:00:00.000+0000",
    "fee" : 30.00,
    "amount_charge" : 30,
    "currency_charge" : "RUR",
    "rate" : 1.0
  } ]
}
```

### Коды ошибок

* `report_in_progress` - данные ещё не готовы, повторите запрос позже

Рекомендуется опрашивать готовность данных поиска не чаще чем раз в 10 секунд.