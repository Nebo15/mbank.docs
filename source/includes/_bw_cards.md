#BW Карты

Карта - это сохраненный в mserver токен, с помощью которого пользователь кошелька может пополнять счет без ввода данных пластиковой карты.

Поля

* `id` - уникальный идентификатор карты
* `state` - состояние карты, см. ниже
* `title` - название карты, в качестве названия сейчас используется маскированный номер карты
* `type` - бренд карты: Visa/MasterCard/...

Состояния карты

| Код состояния карты   | Описание                                                                                     |
| :-------------------  |:---------------------------------------------------------------------------------------------|
| `created`             | Карта только что создана                                                                     |
| `pending`             | Карта сохраняется (ожидается уведомление от IPSP о успехе/неуспехе карточной транзакции      |
| `active`              | Карта сохранена, может быть использована для повторных платежей                              |
| `failed`              | Карта не сохранена (и уже не будет)                                                          |
| `used`                | Карта использована для однократного пополнения

## Создание карты

Параметры

* `card_success_url` - URL на который пользователь будет перенаправлен в случае успешного сохранения карты, опционально
* `card_failure_url` - URL на который пользователь будет перенаправлен в случае неуспешного сохранения карты, опционально

```shell
$ curl -u+79261111111:p@ssw0rD -H 'Content-type:application/json' -d '{"card_success_url": "http://ya.ru", "card_failure_url": "http://google.com"}' http://sandbox.wallet.best/v1/cards
```

```json
{
  "meta" : {
    "code" : 200
  },
  "data" : {
    "id" : 62,
    "state" : "pending",
    "payment_page_url" : "https://test1.ipsp.com/frontend/endpoint?product_id=1721&desc=mserver2&payment_type=A&amount=1.00&currency=RUB&biller_client_id=1f95c7b9-74e5-4fd7-983d-c8d03d90347e&perspayee_expiry=0150&recur_freq=1&locale=ru&hash=cace0d7de544a25d2aa685ef12263a10655d9058"
  }
}
```

далее следует перенаправить пользователя на платежную страницу по ссылке из поля `payment_page_url`. После ввода пользователем данных карты на платежной странице  и получения mserver уведомления от IPSP об успехе или неуспехе карточной транзакции карта перейдет в состояние `active` или `failed`.

Коды ошибок

* `active_cards_limit` - превышено максимально возможное количество активных карт

## Загрузка карты

```shell
$ curl -u+79261111111:p@ssw0rD -H 'Content-type:application/json' http://sandbox.wallet.best/v1/cards/62
```

```json
{
  "meta" : {
    "code" : 200
  },
  "data" : {
    "id" : 62,
    "state" : "active",
    "title" : "541715******2399",
    "type" : "MasterCard"
  }
}
```

Как видно, карта успешно сохранена и может быть использована для пополнения счета кошелька.

## Получение списка карт

Опциональный параметр `state` позволяет фильтровать карты по состоянию.

```shell
$ curl -u+79261111111:p@ssw0rD -H 'Content-type:application/json' http://sandbox.wallet.best/v1/cards?state=active,pending
```

```json
{
  "meta" : {
    "code" : 200
  },
  "data" : [ {
    "id" : 62,
    "state" : "active",
    "title" : "541715******2399",
    "type" : "MasterCard"
  } ]
}
```

## Удаление карты

```shell
$ сurl -u+79261111111:p@ssw0rD -H 'Content-type:application/json'
 -X DELETE http://sandbox.wallet.best/v1/cards/62
```

```json
{
  "meta" : {
    "code" : 200
  }
}
```