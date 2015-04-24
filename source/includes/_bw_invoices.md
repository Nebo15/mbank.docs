#BW Инвойсы

## Статусы инвойса

| Код  | Описание |
| :------------|:---------|
| `created`    | Инвойс создан |
| `canceled`   | Инвойс отменен пользователем, который его создал |
| `processing` | Инвойс был запущен в обработку методом /pay |
| `completed`  | Платеж по инвойсу успешно прошел |
| `declined`   | Платеж по инвойсу отклонен мсервером |

## Создание инвойса

Поля

* `payer` - номер телефона, кто будет платить, на кого выставляется инвойс, обязательное поле
* `amount` - сумма к оплате, обязательное поле
* `message` - произвольный текст, необязательное поле

```shell
$ curl -u +12345675578:password -H 'Content-type:application/json' -d '{"payer": "+12345678102", "amount": 350, "message": "Test invoice"}' http://sandbox.wallet.best/v1/invoices
```

```json
{
    "meta": {
        "code": 200
    },
}
```

Коды ошибок

* `missing_payer` - не указано, кто будет платить
* `payer_not_exists` - нет такого пользователя
* `invalid_payer` - нельзя выставлять счет самому себе
* `missing_amount` - не указана сумма

## Список инвойсов выставленных пользователю {#invoices_list}

```shell
$ curl -u +12345675578:password http://sandbox.wallet.best/v1/invoices
```

```json
{
    "meta": {
        "code": 200
    },
    "data": [
        {
            "_id": "5422daccb7f47b52010041a7",
            "payer": "+12345675578",
            "amount": 200,
            "recipient": "+12345678102",
            "message": null,
            "status": "processing",
            "payment_id": null
        },
        {
            "_id": "5422dc24b7f47b52010041a8",
            "payer": "+12345675578",
            "amount": 300,
            "recipient": "+12345678102",
            "message": "Test invoice",
            "status": "completed",
            "payment_id": 1401089242211
        },
        {
            "_id": "5422dd02b7f47b52010041a9",
            "payer": "+12345675578",
            "amount": 300,
            "recipient": "+12345678102",
            "message": "Test invoice",
            "status": null,
            "payment_id": null
        }
    ]
}
```

## Список инвойсов, которые выставил пользователь

```shell
$ curl -u +12345675578:password http://sandbox.wallet.best/v1/invoices/created
```

```json
{
    "meta": {
        "code": 200
    },
    "data": [
        {
            "_id": "5422cebeb7f47b53010041a7",
            "payer": "+12345671157",
            "amount": 100,
            "recipient": "+12345675578",
            "message": null,
            "status": null,
            "payment_id": null
        },
        {
            "_id": "5422cf7cb7f47b54010041a7",
            "payer": "+12345671157",
            "amount": 1050,
            "recipient": "+12345675578",
            "message": null,
            "status": "canceled",
            "payment_id": null
        }
    ]
}
```

## Повторить (продублировать) инвойс

```shell
$ curl -u +12345675578:password http://sandbox.wallet.best/v1/invoices/5422cf7cb7f47b54010041a7/duplicate
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "_id": "542423c7b7f47b58010041a8",
        "payer": "+12345671157",
        "amount": 1050,
        "recipient": "+12345675578",
        "message": null,
        "status": "canceled",
        "payment_id": null
    }
}
```

Коды ошибок

* `invalid_invoice` - нет такого инвойса

## Отменить инвойс

```shell
$ curl -u +12345675578:password http://sandbox.wallet.best/v1/invoices/5422cebeb7f47b53010041a7/cancel
```

```json
{
    "meta": {
        "code": 200
    }
}
```

Коды ошибок

* `invoice_is_processing` - инвойс процессится, уже нельзя отменить
* `invoice_is_completed` - инвойс выполнен, нет смысла отменять
* `invoice_is_already_canceled` - инвойс был отменен ранее
* `invoice_cancelling_error` - что-то пошло не так, при отмене инвойса
* `invoice_not_found` - нет такого инвойса

## Оплатить инвойс

```shell
$ curl -u +12345675578:password -X POST http://sandbox.wallet.best/v1/invoices/5422dd02b7f47b52010041a9/pay
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "meta": {
            "code": 200,
            "next_action": "pay",
            "time": 0.927491
        },
        "data": {
            "id": 1401089242256,
            "client_payment_id": "a0341db9-280f-4daa-ad09-7f10e1dce5a5",
            "amount": 300,
            "total": 300,
            "created_at": "2014-09-25T14:26:47.406Z",
            "status": "created",
            "type": "p2p",
            "wallet": {
                "phone": "+12345675578"
            },
            "destination": {
                "phone": "+12345678102"
            },
            "direction": "out",
            "message": "Test invoice"
        }
    }
}
```

Коды ошибок

* `invoice_is_processing` - уже запущен процесс оплаты для инвойса
* `invoice_is_completed` - инвойс уже оплачен
* `invoice_is_canceled` - инвойс был отменен пользователем, создавшим его
* `invoice_is_declined` - оплата по инвойсу была отменена МСервером