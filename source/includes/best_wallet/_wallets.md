#Кошелек

*Кошелек - учетная запись конечного пользователя в mserver. Позволяет получать информацию о доступном остатке на счете и персональных данных конечного пользователя.*

Поля:

* `phone` - номер телефона в международном формате, уникальный идентификатор Кошелька (в пределах Проекта), также является логином
* `amount` - остаток на счете кошелька, в рублях
* `name` - имя конечного пользователя, возвращается в случае, если были заданы имя и/или фамилия
* `verified` - **true | false** статус идентификации пользователя
* `level` - **anonymous | identified | personified** уровень идентификации пользователя
* `person_status` - **no_data | data_entered | data_verified** статус персональных данных пользователя
* `email` - электронная почта пользователя
* `email_send_frequency` - **never | after_payment | daily | monthly** периодичность отправки на почту лога транзакций

## Создание кошелька

Mserver: http://nebo15.github.io/mbank.docs/mserver.html#sozdanie-koshelka

##Активация кошелька

Mserver: http://nebo15.github.io/mbank.docs/mserver.html#aktivatsiya-koshelka

## Запрос повторной отправки кода активации

Mserver: http://nebo15.github.io/mbank.docs/mserver.html#zapros-povtornoy-otpravki-koda-aktivatsii

## Запрос кода для смены пароля

Mserver: http://nebo15.github.io/mbank.docs/mserver.html#zapros-koda-dlya-smeny-parolya

## Смена пароля

Mserver: http://nebo15.github.io/mbank.docs/mserver.html#smena-parolya

## Загрузка кошелька

```shell
$ curl -u+79261111111:p@ssw0rD http://sandbox.wallet.best/v1/wallet
```

```json
{
    "meta": {
        "code": 200,
        "urgent_data": {
            "amount": 1237
        },
        "time": 0.363231
    },
    "data": {
        "phone": "+79261111111",
        "amount": 1237,
        "level": "identified",
        "name": "Петян",
        "verified": true,
        "person_status": "data_verified",
        "picture_url": "http:\/\/sandbox.wallet.best\/img\/wallets\/7a\/91c\/54291c7a56c35f205da91f9d.jpg?1424445896",
        "email": "test@wallet.best",
        "can_use_autopayments": false,
        "intercom_user_hash": "82bdad9a133b1efda3aeba7b3a78e00afd0d8f4dc5a604b06663a2d6f07fc9b2"
    }
}
```

## Удаление кошелька

*Метод не работает на prod.*

```shell
$ curl -u admin_level_login:password -X DELETE http://sandbox.wallet.best/v1/wallet/%2B79261111111
```

```json
{
  "meta" : {
    "code" : 200
  }
}
```

## Внесение персональных данных пользователя

Параметры

* `family_name` - **обязательный параметр** - фамилия
* `given_name` - **обязательный параметр** - имя
* `patronymic_name` - отчество
* `passport_series_number` - серия и номер паспорта, 10 цифр
* `passport_issued_at` - дата в формате гггг-мм-дд
* `itn` - ИНН, 12 цифр
* `ssn` - СНИЛС, 11 цифр

```shell
$ curl -u+79261111111:password -H 'Content-type:application/json'
-d '{"family_name": "Арсеньев", "given_name": "Алексей", "patronymic_name": "Александрович",
"passport_series_number": "2202655885", "passport_issued_at" : "2012-02-27",
"itn": "330500938709", "ssn": "11223344595"}'
http://sandbox.wallet.best/v1/wallet/person
```

```json
{
  "meta" : {
    "code" : 200
  },
  "data" : {
    "family_name" : "Арсеньев",
    "given_name" : "Алексей",
    "patronymic_name" : "Александрович",
    "passport_series_number" : "2202655885",
    "passport_issued_at" : "2012-02-27",
    "itn" : "330500938709",
    "ssn" : "11223344595",
    "status" : "data_entered"
    "changed_at" : "2014-11-14T13:15:42.213Z"
  }
}
```

Коды ошибок

* `invalid_family_name` - фамилия длиннее 512 символов
* `invalid_given_name` - имя длиннее 512 символов
* `invalid_patronymic_name` - отчество длиннее 512 символов
* `invalid_passport_series_number` - серия/номер паспорта не соответствует формату
* `invalid_itn` - ИНН не соответствует формату
* `invalid_ssn` - СНИЛС не соответствует формату
* `person_already_verified` - перcональные данные утверждены, изменение невозможно, обратитесь в поддержку

## Загрузка персональных данных пользователя
```shell
$ curl -u+79261111111:p@ssw0rD http://sandbox.wallet.best/v1/wallet/person
```

```json
{
  "meta" : {
    "code" : 200
  },
  "data" : {
    "family_name" : "Арсеньев",
    "given_name" : "Алексей",
    "patronymic_name" : "Александрович",
    "passport_series_number" : "2202655885",
    "passport_issued_at" : "2012-02-27",
    "itn" : "330500938709",
    "ssn" : "11223344595",
    "status" : "data_verified",
    "verified_at" : "2014-05-29T17:06:20.066Z"
  }
}
```

## Загрузка картинки

Формат JPEG.

```shell
$ curl -u +79261111111:p@ssw0rD -X POST -F "file=@/path/to/image.jpg" http://sandbox.wallet.best/v1/wallet/picture
```

```json
{
    "meta" : {
        "code" : 200
    },
}
```

## Удаление картинки

```shell
$ curl -u +79261111111:p@ssw0rD -X DELETE http://sandbox.wallet.best/v1/wallet/picture
```

```json
{
    "meta" : {
        "code" : 200
    },
}
```

## Поиск кошельков

Параметры

* `contacts` - массив объектов с контактами `{"name":" Daniel Higgins","phone":" +5554787672"}` или массив с номерами телефонов в формате `{"phone": "+79990000000"}`

Если искомый кошелек не активирован, то он не найдется.

```shell
$ curl -u +12345675578:password -H 'Content-type:application/json' -d '{"contacts": [ {"phone": "+79990000000"}, {"phone": "+79260000001"}, {"phone": "+79260000002"} ]}' http://sandbox.wallet.best/v1/wallet/find
```

```json
{
    "meta": {
        "code": 200
    },
    "data": [
        "+79990000000",
        "+79260000002"
    ]
}
```

## Получение списка точек пополненя

```shell
$ curl -u +12345675578:password http://sandbox.wallet.best/v1/wallet/replenishment_points
```

```json
{
    "meta": {
        "code": 200
    },
    "data": [
        {
            "id": "54635060279871e2098b4567",
            "type": "Банкомат: Инвестбанк ОАО АКБ",
            "worktime": "пн-пт: 09:00-20:00, сб: 10:00-16:00",
            "address": "Москва ул. Ворошилова 169-171",
            "latitude": 55.616371,
            "longitude": 37.211893
        },
        {
            "id": "54635060279871e2098b4568",
            "type": "Касса: СЛАВИНВЕСТБАНК ООО",
            "worktime": "круглосуточно",
            "address": "Москва ул. маршала Жукова 1",
            "latitude": 55.676006,
            "longitude": 37.252398
        }
    ]
}
```

## Настройка периодичности отправки на почту лога транзакций

Параметры

* `email` - электронная почта получателя выписки
* `email_send_frequency` - **never | after_payment | daily | monthly** периодичность отправки на почту лога транзакций

```shell
$ curl -u +12345675578:password -d '{"email" : "test@wallet.best", "email_send_frequency" : "daily"}' http://sandbox.wallet.best/v1/wallet/settings
```
```json
{
    {
        "meta": {
            "code": 200
        }
    }
}
```

## Webhook изменения статуса кошелька (verified/personified)

Параметры

* `webhook_client_id` - id клиента (обязательно)
* `webhook_client_token` - токен клиента (обязательно)
* `phone` - Номер телефона кошелька (обязательно)
* `verified` - true
* `personified` - true

```shell
$ curl -H 'Content-type:application/json' -d '{"phone": "+12345675578", "verified": true}' http://sandbox.wallet.best/v1/wallet/status?webhook_client_id=mserver&webhook_client_token=token

```
```json
{
    {
        "meta": {
            "code": 200
        }
    }
}
```
