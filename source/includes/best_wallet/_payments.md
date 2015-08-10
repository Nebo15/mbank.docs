#Платежи

Платеж - это операция движения денежных средств между счетами mserver выполняемая по распоряжению пользователя. Платежи различаются по типу:

| Тип платежа | Описание                                                                                          |
|:------------|:--------------------------------------------------------------------------------------------------|
| `out`       | Вывод средств со счета кошелька пользователя в пользу провайдера (провайдер КредитПилот)          |
| `p2p`       | Перевод денег со счета кошелька пользователя на счет кошелька другого пользователя                |
| `in`        | Ввод средств на счет кошелька пользователя через провайдера (провайдеры КредитПилот, ИПСП, Рапида)|
| `inout`     | Транзит средств от ИПСП в пользу КредитПилот                                                      |

Поля, общие для всех типов платежей

* `type` - in|out|p2p тип Платежа
* `client_payment_id` - клиентский идентификатор (UUID)
* `amount` - сумма к зачислению в рублях
* `total` - полная сумма Платежа с учетом комиссии в рублях. Необязательное
* `createdAt` - время создания
* `processedAt` - время завершения online обработки
* `status` - состояние
* `decline_reason` - причина отказа в проведении

Поля для платежей типа `out` / `inout` (вывод денег)

* `service` - назначение платежа
* `outbound` - провайдер, на счет которого были отправлены деньги со счете кошелька
* `parameters` - параметры платежа, например номер карты/телефона

Поля для типа `in` / `inout` (ввод денег)

* `inbound` - провайдер, со счета которого деньги пришли на счет кошелька
* `card` - карта с которой прошло пополнение

Поля для типа `p2p` (перевод между кошельками)

* `destination` - кошелек назначения перевода
* `message` - сообщение адресату перевода

## Статусы платежа

| Код статуса платежа   | Описание                                                                                     |
| :-------------------  |:---------------------------------------------------------------------------------------------|
| `created`             | Платеж создан (например вызовом POST /payments) и ожидает от клиента команды на исполнение   |
| `processing`          | Платеж был запущен в обработку (например вызовом POST /payments/{id}/pay и исполняется       |
| `completed`           | Платеж успешно исполнен                                                                      |
| `declined`            | Платеж отклонен, с уточнением причины в поле `decline_reason`                                |

## Причины отказа в проведении платежа

| Код причины отказа    | Описание                                                                                     |
| :-------------------  |:---------------------------------------------------------------------------------------------|
| `invalid_data`        | Неверные данные платежа (например неверный номер карты/номер телефона)                       |
| `insufficient_funds`  | Недостаточно средств на счете кошелька                                                       |
| `internal_error`      | Что-то пошло не так, обратитесь в поддержку                                                  |


## Клиентский идентификатор платежа

Клиент обязан генерировать [UUID](http://wikipedia.org/wiki/UUID) для каждого отдельного платежа и передавать его в поле `client_payment_id` платежного запроса. По спецификации UUID должен быть в нижнем регистре (33b958e5-042b-4fb2-bf9e-e4198125e050). Если в процессе создания платежа клиент получил ошибку I/O, он должен повторять запрос создания платежа с тем же самым `client_payment_id` до получения ответа. Гарантируется, что платеж с данным `client_payment_id` будет создан не более 1 раза.

## Проведение платежа

Для передачи mserver платежа на исполнение клиент следует общепринятому в платежной индустрии двухфазному протоколу. В первой фазе, подготовительной, клиент создает в mserver Платеж с необходимыми параметрами.
По завершении подготовительной фазы клиент получает от mserver информацию о полной стоимости платежа (поле `total`) и предъявляет полную стоимость платежа пользователю кошелька.
В случае согласия пользователя с условиями исполнения платежа клиент от имени пользователя инициирует исполнение подготовленного платежа (вторая фаза, платежная).

![проведение платежа](http://www.websequencediagrams.com/cgi-bin/cdraw?lz=dGl0bGUg0JTQstGD0YXRhNCw0LfQvdGL0Lkg0L_Qu9Cw0YLQtdC2AAoJ0YDQvtGC0L7QutC-0LsgbXNlcnZlcgoKbm90ZSBvdmVyIGNsaWVudCwAEwg6INCf0L7QtNCzADIHstC4AE8Fu9GM0LDRjyAAbQewCgoANAYtPgAxCVBPU1QgL3BheW1lbnRzIHtwYXJhbXN9AGcGcmlnaHQgb2YAYAkKAIEGCCDRgdC-0LfQtNCw0LXRggCBPA0sCiDRgNCw0YHRgdGH0LjRgtGL0LIAIAi60L7QvNC40YHRgdC40Y4KINC90LjQutGC0L4AAwiD0LTQsCDQtdGJ0LUg0L3QtQCCHQq40YIKZW5kIG5vdGUKCgCCEwctPgCCCgY6IHtpZDogMTIzLCBhbW91bnQ6IDEwMCwgdG90YWw6IDExMCwgbmV4dF9hY3Rpb246IHBheX0AglEHbGVmAIFlBQBEBwog0LrQu9C40LXQvQCBWQa-0LrQsNC3AIFADL_QvgCCXgW3AIJuBQCDQQa70Y4gCgAUB9C90YPRjiDRgQCDSQW40LzQvtGB0YLRjACDag6wIDExMCDRgAoAOheMAIJnBrMAhCYFgdC10L0AggQN0YwAgggLAIQGHgCEYQsAg2ouLzEyMy9wYXkAg3YhAFQFh9C40L0AhBAJ0YAAhQ0FvtC0AIEoBgCFaA0AgloO0YMAhXkGtdC00LvQsNCzAIRYBtGB0Y8g0L4AhhUFsNGI0LgAgmgG0YwKAIUCBQCCWgbRjwCERQUAhCILAIJXBQCEJQoAhBwSAIN_DWdldH0Ahg0TR0UAgXgPAIRjE3N0YXR1czogY29tcGxldGVkAIY4BwCEMSO70YPRhwCGPQcAgSshIAoAWQogKNC40YEAhGAI0LXQvSkKIFlheSEAhhcJ&s=modern-blue)

### Платеж в пользу сервиса

Параметры:

* `type` = **out** - тип платежа
* `client_payment_id` - клиентский идентификатор платежа
* `amount` -  сумма к зачислению
* `service` - назначение платежа, идентификатор Сервиса
* `parameters` - параметры платежного запроса в соответствии с /services/{service}

```shell
$ curl -u+79261111111:password -H 'Content-type:application/json'
 -d '{"type": "out", "client_payment_id": "e731a7e2-c553-4295-867e-1023359bee28",
 "amount": 100, "service": 61, "parameters": {"phoneNumber": "9267101283",
 "BIK": "044583151", "Name": "name", "SName": "sname", "Fam": "fam"}}'
 http://sandbox.wallet.best/v1/payments
```

```json
{
    "meta": {
        "code": 200,
        "next_action": "update",
        "time": 0.376464
    },
    "data": {
        "id": 1401089240377,
        "client_payment_id": "e731a7e2-c553-4295-867e-1023359bee28",
        "amount": 100,
        "created_at": "2014-08-05T15:09:37.832Z",
        "status": "created",
        "type": "out",
        "service": {
            "id": 61,
            "name": "Мультибанк"
        },
        "parameters": [
            {
                "id": "phoneNumber",
                "is_disabled": false,
                "is_hidden": false,
                "is_required": false,
                "min_length": null,
                "max_length": null,
                "pattern": null,
                "pattern_desc": null,
                "type": null,
                "title": "№ Телефона (10 цифр)",
                "suggested_values": [
                    "9267101283",
                    "9267101283"
                ],
                "items": null,
                "service_param_pattern_id": null,
                "is_changed": false
            },
            {
                "id": "BIK",
                "is_disabled": false,
                "is_hidden": false,
                "is_required": false,
                "min_length": null,
                "max_length": null,
                "pattern": null,
                "pattern_desc": null,
                "type": null,
                "title": "БИК",
                "suggested_values": [
                    "044583151",
                    "044583151"
                ],
                "items": null,
                "service_param_pattern_id": null,
                "is_changed": false
            },
            {
                "id": "Name",
                "is_disabled": false,
                "is_hidden": false,
                "is_required": false,
                "min_length": null,
                "max_length": null,
                "pattern": null,
                "pattern_desc": null,
                "type": null,
                "title": "Имя Отправителя",
                "suggested_values": [
                    "name",
                    "name"
                ],
                "items": null,
                "service_param_pattern_id": null,
                "is_changed": false
            },
            {
                "id": "SName",
                "is_disabled": false,
                "is_hidden": false,
                "is_required": false,
                "min_length": null,
                "max_length": null,
                "pattern": null,
                "pattern_desc": null,
                "type": null,
                "title": "Отчество Отправителя",
                "suggested_values": [
                    "sname",
                    "sname"
                ],
                "items": null,
                "service_param_pattern_id": null,
                "is_changed": false
            },
            {
                "id": "Fam",
                "is_disabled": false,
                "is_hidden": false,
                "is_required": false,
                "min_length": null,
                "max_length": null,
                "pattern": null,
                "pattern_desc": null,
                "type": null,
                "title": "Фамилия Отправителя",
                "suggested_values": [
                    "fam",
                    "fam"
                ],
                "items": null,
                "service_param_pattern_id": null,
                "is_changed": false
            }
        ],
        "outbound": {
            "id": 35,
            "code": "tpr_out",
            "name": "ООО ТПР (провайдер)"
        }
    }
}
```

Коды ошибок

* `missing_type` - отсутствует обязательный параметр type
* `missing_client_payment_id` - отсутствует обязательный параметр client_payment_id
* `missing_amount` - отсутствует обязательный параметр amount
* `invalid_amount` - неверная сумма платежа, должно быть min <= amount <= max, где min и max - минимальная и максимальная сумма для Сервиса
* `missing_service` - отсутствует обязательный параметр service
* `service_not_found` - запрошенный сервис не найдет
* `missing_parameters` - не передан обязательный параметр parameters

### Перевод между кошельками

Параметры:

* `type` = **p2p** - тип платежа
* `client_payment_id` - клиентский идентификатор платежа
* `amount` -  сумма перевода
* `destination` - кошелек назначения перевода
* `message` - сообщение адресату перевода (опционально)

```shell
$ curl -u+79261111111:password -H 'Content-type:application/json'
 -d '{"type": "p2p", "client_payment_id": "071c6d23-7508-4e35-ad92-852308a47677", "amont": 100,
 "destination": "+79261111112", "message": "Съешь ещё этих мягких французских булок, да выпей чаю"}'
 http://sandbox.wallet.best/v1/payments
```

```json
{
  "meta" : {
    "code" : 200,
    "next_action" : "pay"
  },
  "data" : {
    "id" : 1401089237211,
    "client_payment_id" : "071c6d23-7508-4e35-ad92-852308a47677",
    "amount" : 100,
    "total" : 100.00,
    "created_at" : "2014-07-01T06:30:01.277Z",
    "status" : "created",
    "type" : "p2p",
    "destination" : {
      "phone" : "+79261111112"
    },
    "message" : "Съешь ещё этих мягких французских булок, да выпей чаю"
  }
}
```

Коды ошибок

* `missing_type` - отсутствует обязательный параметр type
* `missing_client_payment_id` - отсутствует обязательный параметр client_payment_id
* `missing_amount` - отсутствует обязательный параметр amount
* `invalid_amount` - сумма перевода должна быть > 0
* `missing_destination` - отсутствует обязательный параметр destination
* `destination_not_found` - кошелек назначения платежа не найден
* `invalid_destination` - попытка отправить p2p перевод самому себе
* `insufficient_funds` - недостаточно средств для выполнения p2p перевода


### Пополнение кошелька

Пополнение кошелька пользователя через запросы к API возможно с использованием пластиковых карт. Существуют 3 сценария пополнения кошелька с карты:

* однократное пополнение
* однократное пополнение с сохранением данных карты для последующего использования ("привязка карты")
* пополнение с сохраненной ранее карты ("рекарринг")

Параметры:

* `type` = **in** - тип платежа
* `client_payment_id` - клиентский идентификатор платежа
* `amount` -  сумма к зачислению
* `store_card` - true|false - сохранить карту, чтобы использовать ее для платежей в дальнейшем (опциональный)
* `card` - идентификатор сохраненной карты с которой будут списаны деньги (опциональный)

Пример однократного пополнения

Создаем платеж:

```shell
$ curl -u +79261111111:password -H 'Content-type:application/json' -d '{"type": "in", "client_payment_id": "071c6d23-7508-4e35-ad92-852308a47678", "amount": 100}' http://sandbox.wallet.best/v1/payments
```

```json
{
  "meta" : {
    "code" : 200,
    "next_action" : "pay"
  },
  "data" : {
    "id" : 1401089237212,
    "client_payment_id" : "071c6d23-7508-4e35-ad92-852308a47678",
    "amount" : 100,
    "total" : 100.00,
    "created_at" : "2014-07-01T06:55:27.870Z",
    "status" : "created",
    "type" : "in",
    "inbound" : {
      "id" : 62,
      "code" : "ipsp_in",
      "name" : "ООО ИПСП (агент)"
    },
    "card" : {
      "state" : "created"
    }
  }
}
```

Платим:

```shell
$curl -u +79261111111:password -H 'Content-type:application/json' -X POST http://sandbox.wallet.best/v1/payments/1401089237212/pay
```

```json
{
  "meta" : {
    "code" : 200,
    "next_action" : "get"
  },
  "data" : {
    "id" : 1401089237212,
    "client_payment_id" : "071c6d23-7508-4e35-ad92-852308a47678",
    "amount" : 100,
    "total" : 100,
    "created_at" : "2014-07-01T06:55:27.870Z",
    "status" : "processing",
    "type" : "in",
    "inbound" : {
      "id" : 62,
      "code" : "ipsp_in",
      "name" : "ООО ИПСП (агент)"
    },
    "card" : {
      "state" : "pending",
      "payment_page_url" : "https://test1.ipsp.com/frontend/endpoint?product_id=1721&desc=mserver2&payment_type=S&amount=100.00&currency=RUB&cf=1401089237212&locale=ru&hash=3d49fa2b7ceb67f8ad7ed7f2247dd2cad1c4acdc"
    }
  }
}
```
далее следует перенаправить пользователя на платежную страницу по ссылке из поля `card.payment_page_url`.

Пример однократного пополнения с сохранением данных карты

Создаем платеж:

```shell
$ curl -u +79261111111:password -H 'Content-type:application/json' -d '{"type": "in", "client_payment_id": "071c6d23-7508-4e35-ad92-852308a47679", "amount": 100, "store_card": true}' http://sandbox.wallet.best/v1/payments
```

```json
{
  "meta" : {
    "code" : 200,
    "next_action" : "pay"
  },
  "data" : {
    "id" : 1401089237231,
    "client_payment_id" : "071c6d23-7508-4e35-ad92-852308a47679",
    "amount" : 100,
    "total" : 100.00,
    "created_at" : "2014-07-01T08:31:24.058Z",
    "status" : "created",
    "type" : "in",
    "inbound" : {
      "id" : 62,
      "code" : "ipsp_in",
      "name" : "ООО ИПСП (агент)"
    },
    "card" : {
      "id" : 21,
      "state" : "created"
    }
  }
}
```

Платим:

```shell
$ curl -u +79261111111:password -H 'Content-type:application/json' -X POST http://sandbox.wallet.best/v1/payments/1401089237231/pay
```

```json
{
  "meta" : {
    "code" : 200,
    "next_action" : "get"
  },
  "data" : {
    "id" : 1401089237231,
    "client_payment_id" : "071c6d23-7508-4e35-ad92-852308a47679",
    "amount" : 100,
    "total" : 100,
    "created_at" : "2014-07-01T08:31:24.058Z",
    "status" : "processing",
    "type" : "in",
    "inbound" : {
      "id" : 62,
      "code" : "ipsp_in",
      "name" : "ООО ИПСП (агент)"
    },
    "card" : {
      "id" : 21,
      "state" : "pending",
      "payment_page_url" : "https://test1.ipsp.com/frontend/endpoint?product_id=1721&desc=mserver2&payment_type=S&amount=100.00&currency=RUB&cf=1401089237231&locale=ru&biller_client_id=21&perspayee_expiry=0150&recur_freq=1&hash=5136f2cb7fd77f98b1df86d4644338e5a10dab98"
    }
  }
}
```

далее следует перенаправить пользователя на платежную страницу по ссылке из поля `card.payment_page_url`.

Убедимся, что платеж успешен и карта сохранена:

```shell
$ curl -u +79261111111:password http://sandbox.wallet.best/v1/payments/1401089237231
```

```json
{
  "meta" : {
    "code" : 200
  },
  "data" : {
    "id" : 1401089237231,
    "client_payment_id" : "071c6d23-7508-4e35-ad92-852308a47679",
    "amount" : 100,
    "total" : 100,
    "created_at" : "2014-07-01T08:31:24.058Z",
    "processed_at" : "2014-07-01T08:39:40.173Z",
    "status" : "completed",
    "type" : "in",
    "inbound" : {
      "id" : 62,
      "code" : "ipsp_in",
      "name" : "ООО ИПСП (агент)"
    },
    "card" : {
      "id" : 21,
      "state" : "active",
      "title" : "541715******2399",
      "type" : "MasterCard"
    }
  }
}
```

Пример пополнения с сохраненной карты

Используем карту #21 сохраненную в предыдущем примере.

Создаем платеж:

```shell
$ curl -u +79261111111:password -H 'Content-type:application/json' -d '{"type": "in", "client_payment_id": "071c6d23-7508-4e35-ad92-852308a47689", "amount": 100, "card": 21}' http://sandbox.wallet.best/v1/payments
```

```json
{
  "meta" : {
    "code" : 200,
    "next_action" : "pay"
  },
  "data" : {
    "id" : 1401089237232,
    "client_payment_id" : "071c6d23-7508-4e35-ad92-852308a47653",
    "amount" : 100,
    "total" : 100.00,
    "created_at" : "2014-07-01T08:58:51.143Z",
    "status" : "created",
    "type" : "in",
    "inbound" : {
      "id" : 62,
      "code" : "ipsp_in",
      "name" : "ООО ИПСП (агент)"
    },
    "card" : {
      "id" : 21,
      "state" : "active",
      "title" : "541715******2399",
      "type" : "MasterCard"
    }
  }
}
```

Платим:

```shell
$ curl -u+79261111111:password -H 'Content-type:application/json' -X POST http://sandbox.wallet.best/v1/payments/1401089237232/pay
```

```json
{
  "meta" : {
    "code" : 200,
    "next_action" : "get"
  },
  "data" : {
    "id" : 1401089237232,
    "client_payment_id" : "071c6d23-7508-4e35-ad92-852308a47653",
    "amount" : 100,
    "total" : 100,
    "created_at" : "2014-07-01T12:04:49.330Z",
    "status" : "processing",
    "type" : "in",
    "inbound" : {
      "id" : 62,
      "code" : "ipsp_in",
      "name" : "ООО ИПСП (агент)"
    },
    "card" : {
      "id" : 25,
      "state" : "active",
      "title" : "541715******2399",
      "type" : "MasterCard"
    }
  }
}
```

## Транзитный платеж

Транзитный платеж соединяет в одном действии зачисление денег на кошелек через поставщика ввода средств (в настоящее время ИПСП) и списание денег со счета кошелька в пользу поставщика вывода средств (в настоящее время КредитПилот).

По аналогии с пополнением кошелька возможны следующие варианты транзитного платежа:

* однократное списание с карты
* однократное списание с карты с сохранением данных карты для последующего использования (“привязка карты”)
* списание средств с сохраненной ранее карты (“рекарринг”)

Параметры:

* `type` = **inout** - тип платежа
* `client_payment_id` - клиентский идентификатор платежа
* `amount` - сумма к зачислению
* `service` - назначение платежа, идентификатор Сервиса
* `parameters` - параметры платежного запроса в соответствии с /services/{service_id}
* `card` - идентификатор сохраненной карты с которой будут списаны деньги (опциональный)
* `store_card` - **true | false** - сохранить карту, чтобы использовать ее для платежей в дальнейшем (опциональный)

### Однократное списание с карты

Создаем платеж:

```shell
$ curl -u+79261111111:password -H 'Content-type:application/json'
-d '{"type": "inout", "client_payment_id": "021c6d23-7508-4e35-ad92-852308a47689", "amount": 100, "service": 834,
"parameters": {"phoneNumber": "9267101283"}}'
http://sandbox.wallet.best/v1/payments
```

```json
{
    "meta": {
        "code": 200,
        "urgent_data": {
            "amount": 9999,
            "unseen_payments": 1
        },
        "next_action": "pay",
        "time": 0.418221
    },
    "data": {
        "id": 25778,
        "client_payment_id": "021c6d23-7508-4e35-ad92-852308a47689",
        "amount": 100,
        "total": 103,
        "created_at": "2015-03-17T13:49:13.394Z",
        "status": "created",
        "type": "inout",
        "service": {
            "id": 834,
            "name": "Мегафон"
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
                "patterns": [],
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
            "state": "created"
        },
        "wallet": {
            "phone": "+79261111111"
        }
    }
}
```

Платим:
```shell
curl -u+79261111111:password -H 'Content-type:application/json' -X POST http://sandbox.wallet.best/v1/payments/25818/pay
```

```json
{
    "meta": {
        "code": 200,
        "next_action": "get",
        "time": 0.317098
    },
    "data": {
        "id": 25818,
        "client_payment_id": "131c6d23-7508-4e35-ad92-852308a47689",
        "amount": 100,
        "total": 103,
        "created_at": "2015-03-17T15:03:41.606Z",
        "status": "processing",
        "type": "inout",
        "service": {
            "id": 834,
            "name": "Мегафон"
        },
        "parameters": [
            {
                "code": "phoneNumber",
                "name": "№ Телефона",
                "value": "9267101283"
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
            "payment_page_url": "https:\/\/test1.ipsp.com\/frontend\/endpoint?product_id=1721&desc=TestWallet&payment_type=S&amount=103.00&currency=RUB&cf=25818&locale=ru&hash=afbe9967151306a3e69900d5e3bffd7b5ef8475c"
        },
        "wallet": {
            "phone": "+79261111111"
        }
    }
}
```

Далее следует перенаправить пользователя на платежную страницу по ссылке из поля `card.payment_page_url`

### С сохранением данных карты

Сценарий ничем не отличается от предыдущего, кроме передачи флага `store_card` = **true** при создании платежа.
Идентификатор карты, возвращенный в `data.card.id` можно впоследствии использовать для пополнения счета кошелька или выполнения транзитных платежей с сохраненной карты.

Создаем платеж:
```shell
$ curl -u+79261111111:password -H 'Content-type:application/json'
-d '{"type": "inout", "client_payment_id": "021c6d23-7508-4e35-ad92-852308a47689", "amount": 100, "store_card": true,
"service": 834, "parameters": {"phoneNumber": "9267101283"}}'
http://sandbox.wallet.best/v1/payments
```

```json
{
    "meta": {
        "code": 200,
        "urgent_data": {
            "amount": 9999,
            "unseen_payments": 1
        },
        "next_action": "pay",
        "time": 0.330981
    },
    "data": {
        "id": 25778,
        "client_payment_id": "021c6d23-7508-4e35-ad92-852308a47689",
        "amount": 100,
        "total": 103,
        "created_at": "2015-03-17T13:49:13.394Z",
        "status": "created",
        "type": "inout",
        "service": {
            "id": 834,
            "name": "Мегафон"
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
                "patterns": [],
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
            "state": "created"
        },
        "wallet": {
            "phone": "+79261111111"
        }
    }
}
```
Платим:
```shell
curl -u+79261111111:password -H 'Content-type:application/json' -X POST http://sandbox.wallet.best/v1/payments/25818/pay
```

```json
{
    "meta": {
        "code": 200,
        "next_action": "get",
        "time": 0.317098
    },
    "data": {
        "id": 25818,
        "client_payment_id": "131c6d23-7508-4e35-ad92-852308a47689",
        "amount": 100,
        "total": 103,
        "created_at": "2015-03-17T15:03:41.606Z",
        "status": "processing",
        "type": "inout",
        "service": {
            "id": 834,
            "name": "Мегафон"
        },
        "parameters": [
            {
                "code": "phoneNumber",
                "name": "№ Телефона",
                "value": "9267101283"
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
        "card" : {
            "id" : 7222,
            "state" : "active",
            "title" : "541715******6825",
            "type" : "MasterCard"
        },
        "wallet": {
            "phone": "+79261111111"
        }
    }
}
```

### C сохраненной карты

Транзитный платеж с сохраненной карты отличается от платежа с однократным списанием только указанием идентификатора карты в поле `card` при создании платежа.

Создаем платеж:
```shell
$ curl -u+79261111111:password -H 'Content-type:application/json'
-d '{"type": "inout", "client_payment_id": "021c6d23-7508-4e35-ad92-852308a47689", "amount": 100, "card": 21, "service": 834,
"parameters": {"phoneNumber": "9267101283"}}'
http://sandbox.wallet.best/v1/payments
```

```json
{
    "meta": {
        "code": 200,
        "urgent_data": {
            "amount": 9999,
            "unseen_payments": 1
        },
        "next_action": "pay",
        "time": 0.32556
    },
    "data": {
        "id": 25778,
        "client_payment_id": "021c6d23-7508-4e35-ad92-852308a47689",
        "amount": 100,
        "total": 103,
        "created_at": "2015-03-17T13:49:13.394Z",
        "status": "created",
        "type": "inout",
        "service": {
            "id": 834,
            "name": "Мегафон"
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
                "patterns": [],
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
        "card" : {
            "id" : 21,
            "state" : "active",
            "title" : "541715******6825",
            "type" : "MasterCard"
        },
        "wallet": {
            "phone": "+79261111111"
        }
    }
}
```

### Отложенный выбор типа платежа

Пользователь может отложить выбор типа платежа между out и inout до подтверждения платежа. Платеж может быть создан, как платеж со счета кошелька out, затем, если клиент передумал и решил заплатить картой, при подтверждении платежа вызовом

*POST /payments/{:id}/pay*

нужно передать в теле запроса следующие поля:

Поля запроса подтверждения платежа для смены типа **in** -> **inout**

* `type` = **inout** - тип платежа
* `store_card` - true | false - сохранить карту, чтобы использовать ее для платежей в дальнейшем (опциональный)
* `card` - идентификатор сохраненной карты с которой будут списаны деньги (опциональный)

Создаем платеж используя кошелек как источник средств:

```shell
curl -u+79261111111:password -H 'Content-type:application/json'
-d '{"type": "out", "amount": 100, "client_payment_id": "021c6d23-7508-4e35-ad92-852308a47689", "service": 834, "parameters": {"phoneNumber": "9267101283"}}'
http://sandbox.wallet.best/v1/payments
```
```json
{
    "meta": {
        "code": 200,
        "urgent_data": {
            "amount": 9999,
            "unseen_payments": 1
        },
        "next_action": "pay",
        "time": 0.468765
    },
    "data": {
        "id": 25832,
        "client_payment_id": "221c6d23-7508-4e35-ad92-852308a47689",
        "amount": 100,
        "total": 103,
        "created_at": "2015-03-18T12:40:02.248Z",
        "status": "created",
        "type": "out",
        "service": {
            "id": 834,
            "name": "Мегафон"
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
                "patterns": [],
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
        "outbound": {
            "id": 1,
            "code": "tpr_out",
            "name": "Кредит Пилот"
        },
        "wallet": {
            "phone": "+79261111111"
        }
    }
}
```

Решаем заплатить сохраненной картой с ID 7222:

```shell
curl -u+79261111111:password -H 'Content-type:application/json'
-d '{"type": "inout", "card": 7222}'
http://sandbox.wallet.best/v1/payments/25832/pay
```
```json
{
    "meta": {
        "code": 200,
        "next_action": "get",
        "time": 0.317098
    },
    "data": {
        "id": 25818,
        "client_payment_id": "131c6d23-7508-4e35-ad92-852308a47689",
        "amount": 100,
        "total": 103,
        "created_at": "2015-03-17T15:03:41.606Z",
        "status": "processing",
        "type": "inout",
        "service": {
            "id": 834,
            "name": "Мегафон"
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
                "patterns": [],
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
        "card" : {
            "id" : 7222,
            "state" : "active",
            "title" : "541715******6825",
            "type" : "MasterCard"
        },
        "wallet": {
            "phone": "+79261111111"
        }
    }
}
```

## Получение истории платежей

Сервис может быть выключеным, но в момент проведения транзакции был активен. Такой сервис будет помечен флагом `is_disabled`
```shell
$ curl -u +79261111111:password -H 'Content-type:application/json' http://sandbox.wallet.best/v1/payments?page=0&size=35
```

Параметры `page` и `size` в запросе позволяют задать номер (начиная с 0) и размер страницы, которую запрашивает клиент. По умолчанию номер страницы - 0 и размер страницы - 35 платежей. Опциона��ьные параметры `type` и `status` позволяют фильтровать платежи по типу и статусу. По умолчанию, платежи со статусом `created` не попадают в список, чтобы их увидеть, необходимо задать этот статус явно. Статусы и типы можно перечислять через запятую, например: `status=created,completed`.

Если платеж еще не был просмотрен, у него будет поле `unseen` со зачением **true**
Просмотренным платеж считается, когда он вернулся в списке. Если же платеж присутствует на второй странице выписки, а она не была запрошена - платеж будет считаться непросмотренным 

```json
{
    "meta": {
        "code": 200,
        "urgent_data": {
            "amount": 9971.34,
            "unseen_payments": 1
        },
        "page": {
            "total_elements": 4
        }
    },
    "data": [
        {
            "id": 1401089244809,
            "client_payment_id": "495e4210-18bc-4301-b388-5dda972865e6",
            "amount": 5,
            "total": 8.03,
            "created_at": "2014-10-30T14:21:12.406Z",
            "processed_at": "2014-10-30T14:21:20.309Z",
            "status": "completed",
            "type": "out",
            "service": {
                "id": 1,
                "name": "Мегафон",
                "is_disabled": true
            },
            "parameters": [
                {
                    "code": "phoneNumber",
                    "name": "№ телефона (10 цифр)",
                    "value": "9263456782"
                }
            ],
            "outbound": {
                "id": 35,
                "code": "tpr_out",
                "name": "ООО ТПР (провайдер)"
            },
            "wallet": {
                "phone": "+380631345678"
            },
            "remote_check": "1414678875803",
            "title": "",
            "subtitle": "",
            "description": "",
            "unseen": true
        },
        {
            "id": 1401089244494,
            "client_payment_id": "df9180aa-a359-420d-8f3c-009a1bb8fac6",
            "amount": 55,
            "total": 55,
            "created_at": "2014-10-27T16:09:26.058Z",
            "processed_at": "2014-10-27T16:09:28.936Z",
            "status": "completed",
            "type": "in",
            "inbound": {
                "id": 62,
                "code": "ipsp_in",
                "name": "ООО ИПСП (агент)"
            },
            "card": {
                "id": 2727,
                "state": "active",
                "title": "541715******9149",
                "type": "MasterCard"
            },
            "wallet": {
                "phone": "+380631345678"
            }
        },
        {
            "id": 1401089244492,
            "client_payment_id": "087a9555-d25b-400c-af5b-ef1c5a99b145",
            "amount": 1000,
            "total": 1015,
            "created_at": "2014-10-27T16:07:34.282Z",
            "processed_at": "2014-10-27T16:07:47.922Z",
            "status": "completed",
            "type": "out",
            "service": {
                "id": 6,
                "name": "Яндекс.Деньги",
                "is_disabled": false
            },
            "parameters": [
                {
                    "code": "phoneNumber",
                    "name": "№ счёта (1-32 цифры):",
                    "value": "55855555"
                }
            ],
            "outbound": {
                "id": 35,
                "code": "tpr_out",
                "name": "ООО ТПР (провайдер)"
            },
            "wallet": {
                "phone": "+380631345678"
            },
            "remote_check": "1414426063287",
            "title": "",
            "subtitle": "",
            "description": ""
        },
        {
            "id": 1401089244493,
            "client_payment_id": "a0449e92-a853-4a80-bc47-11b453c54ab9",
            "amount": 1015,
            "total": 1015,
            "created_at": "2014-10-27T16:07:37.952Z",
            "processed_at": "2014-10-27T16:07:39.822Z",
            "status": "completed",
            "type": "in",
            "inbound": {
                "id": 62,
                "code": "ipsp_in",
                "name": "ООО ИПСП (агент)"
            },
            "card": {
                "id": 2727,
                "state": "active",
                "title": "541715******9149",
                "type": "MasterCard"
            },
            "wallet": {
                "phone": "+380631345678"
            }
        },
        {
            "id": 1401089244491,
            "client_payment_id": "54851a0b-4b60-4497-ab94-7f1b49eb9db0",
            "amount": 1000,
            "total": 1015,
            "created_at": "2014-10-27T16:05:57.109Z",
            "processed_at": "2014-10-27T16:05:57.264Z",
            "status": "declined",
            "decline_reason": "invalid_data",
            "type": "out",
            "service": {
                "id": 17,
                "name": "Триколор ТВ",
                "is_disabled": false
            },
            "parameters": [
                {
                    "code": "578",
                    "name": "Тип платежа",
                    "value": "588255585"
                },
                {
                    "code": "phoneNumber",
                    "name": "№ агент.договора или приёмного оборудования (1-14 цифр)",
                    "value": "588255585"
                }
            ],
            "outbound": {
                "id": 35,
                "code": "tpr_out",
                "name": "ООО ТПР (провайдер)"
            },
            "wallet": {
                "phone": "+380631345678"
            },
            "title": "",
            "subtitle": "",
            "description": ""
        }
    ]
}
```

## Сброс счетчика непросмотренных платежей

Возможно обнулить счетчик непросмотренных платежей

```shell
$ curl -u +79261111111:password -H 'Content-type:application/json' http://sandbox.wallet.best/v1/payments/reset_unseen
```
```json
{
    "meta": {
        "code": 200,
        "urgent_data": {
            "amount": 9862
        }
    },
    "data": "ok"
}
```

## Уведомления об изменении статуса платежа

Для уведомления внешней системы об изменениях статуса платежа mserver выполняет POST запрос на URL указанный в настройках проекта.
Для авторизации запрос должен содержать `app_id` и `access_token` ( результат `sha1( app_id + app_secret )`.
Уведомление передается в теле POST запроса в виде объекта платежной операции сериализованного в JSON. Например:

```json
{
  "created_at" : "2014-08-02T14:37:20.102Z",
  "payment" : {
    "id" : 1401089240253,
    "client_payment_id" : "a02b1416-b9c1-4782-88c5-da4d78b32f8d",
    "amount" : 1,
    "total" : 1,
    "created_at" : "2014-08-02T14:36:02.997Z",
    "processed_at" : "2014-08-02T14:37:20.102Z",
    "status" : "completed",
    "type" : "in",
    "inbound" : {
      "id" : 62,
      "code" : "ipsp_in",
      "name" : "ООО ИПСП (агент)"
    },
    "card" : {
      "state" : "used",
      "title" : "541715******2399",
      "type" : "MasterCard"
    }
  },
  "from" : "processing",
  "to" : "completed",
  "type" : "complete"
}
```

Поля

* `created_at` - момент времени совершения платежной операции
* `payment` - стандартное представление объекта платежа описанное выше
* `from` - начальный статус платежа
* `to` - конечный статус платежа
* `type` - тип платежной операции, см. ниже

Типы платежных операций

| Тип                   | Описание                                                                            |
| :-------------------  |:------------------------------------------------------------------------------------|
| `complete`            | Платеж проведен                                                                     |
| `decline`             | Платеж отклонен                                                                     |
| `undo`                | Отмена ранее успешного платежа (сторно)                                             |
| `redo`                | Ранее отмененный платеж сделан успешным (сторно сторно and we need to go deeper)    |


## Webhook для логирования переводов Бэста

```shell
$ curl 'https://sandbox.wallet.best/v1/payments/best/p2p' -X POST -H 'Content-type:application/json' -d '{"payment_id": 12345678, "sender": {"id":7777777, "phone": "+79250101212"}, "recipient": {"id":88888888, "phone": "+79110992233"}}'
```

```json
{
    "meta": {
        "code": 200
    }
}
```

Коды ошибок

* `empty_request` - в запросе отсутствуют данные для логирования
