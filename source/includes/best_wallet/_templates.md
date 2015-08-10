#Шаблоны платежей

Шаблоны платежей предназначены для платежей типа 'out' для [сервисов](#services). Потому для создания платежа обязательно поле `service_id`

Поля шаблона

* `name` - имя шаблона
* `type` - ** public | private**
* `amount` - сумма платежа
* `service_id` - id сервиса, обязательное поле при создании
* `parameters` - массив с параметрами и их значением в формате: {param_id : param_value}
* `disabled` - массив с id параметров, которые в форме шаблона нельзя изменить {'phone', 'name'}
* `wallet` - объект [кошелька](#wallet)

## Создание шаблонов

```shell
$ curl -H "Authorization: Bearer b48a991e-e010-4329-9817-f8389a774c45" -H 'Content-type:application/json'
-d '{"name": "Template", "amount": 350, "type": "public", "service_id": 1000,
"parameters": {"phoneNumber": "+380509990088"}, "disabled": ["phoneNumber"]}'
https://sandbox.wallet.best/v1/payments/templates
```

```json
{
    "meta": {
        "code": 200,
        "urgent_data": {
            "amount": 2370,
            "unseen_payments": 1
        }
    },
    "data": {
        "id": "54d23587a60ad674680041be"
    }
}
```
## Получения списка шаблонов

Список шаблонов с постраничной навигацией и возможностью фильтрации. Параметры запроса:

* `size` - кол-во элементов в списке (по-умолчанию 20)
* `page` - страница списка
* `type` - ** public | private**
* `phone` - телефон кошелька
* `service_id` - id сервиса

### Важно!

Если *type* не передан или *type* = **private**, то вернутся шаблоны только для авторизированного кошелька,
а переданный телефон в параметре *phone* будет проигнорирован

Если же нужно получить список по другим кошелькам - используйте тип **public**

```shell
$ curl -H "Authorization: Bearer b48a991e-e010-4329-9817-f8389a774c45" https://sandbox.wallet.best/v1/payments/templates
```
```json
{
    "meta": {
        "code": 200,
        "urgent_data": {
            "amount": 2370,
            "unseen_payments": 1
        }
    },
    "data": [
        {
            "id": "54d23418a60ad674680041bd",
            "name": "aloha",
            "type": "public",
            "amount": {
                "value": 1000,
                "disabled": false
            },
            "service": {
                "id": 1690,
                "name": "ТСЖ Монолит-престиж",
                "icon_url": null,
                "limit": "",
                "minsum": 1,
                "maxsum": 15000,
                "verification_required": false,
                "params": [
                    {
                        "id": "address",
                        "is_disabled": false,
                        "is_hidden": false,
                        "is_required": true,
                        "min_length": 3,
                        "max_length": 255,
                        "range_start": 0,
                        "range_end": 0,
                        "patterns": [
                            {
                                "pattern": "",
                                "description": ""
                            }
                        ],
                        "pattern": "",
                        "pattern_desc": "Введите ваш домашний адрес",
                        "type": "string",
                        "title": "Адрес",
                        "default_value": null,
                        "suggested_values": [],
                        "items": null,
                        "value": "Мухосранск, ул. Выбитых окон, дом 1"
                    },
                    ...
                ],
                "category": {
                    "id": "549c92fb56c35f660ecd341f",
                    "name": "Коммунальные услуги",
                    "group": "",
                    "icon_url_32x32": ""
                    "amount": 3
                }
            }
        },
        ...
    ]
}
```

## Получения шаблона по id

```shell
$ curl -H "Authorization: Bearer b48a991e-e010-4329-9817-f8389a774c45"
https://sandbox.wallet.best/v1/payments/templates/5422dd02b7f47b52010041a9
```
```json
{
    "meta": {
        "code": 200,
        "urgent_data": {
            "amount": 2370,
            "unseen_payments": 1
        }
    },
    "data": {
        "id": "54d23587a60ad674680041be",
        "name": "",
        "type": "",
        "amount": {
            "value": 0,
            "disabled": false
        },
        "service": {
            "id": 0,
            "name": "ЖКУ Москва",
            "icon_url": null,
            "limit": "",
            "minsum": 1,
            "maxsum": 15000,
            "verification_required": false,
            "params": [
                {
                    "id": "126",
                    "is_disabled": false,
                    "is_hidden": false,
                    "is_required": false,
                    "min_length": 3,
                    "max_length": 250,
                    "range_start": 0,
                    "range_end": 0,
                    "patterns": [
                        {
                            "pattern": "",
                            "description": ""
                        }
                    ],
                    "pattern": "",
                    "pattern_desc": "от  3 до 250 символов",
                    "type": "string",
                    "title": "Адрес проживания",
                    "default_value": null,
                    "suggested_values": [],
                    "items": null,
                    "value": ""
                },
                ...
            ]
        }
    }
}
```

## Изменение шаблона

```shell
$ curl -H "Authorization: Bearer b48a991e-e010-4329-9817-f8389a774c45" -H 'Content-type:application/json'
-d '{"name": "Template", "amount": 350, "type": "public", "service_id": 1000,
"params": {"phoneNumber": "+380509990088"}, "disabled": ["phoneNumber"]}'
https://sandbox.wallet.best/v1/payments/templates/5422dd02b7f47b52010041a9
```

```json
{
    "meta": {
        "code": 200
    }
}
```

## Удаление шаблона

Удалить можно только свои шаблоны
```shell
$ curl -H "Authorization: Bearer b48a991e-e010-4329-9817-f8389a774c45" -X DELETE
https://sandbox.wallet.best/v1/payments/templates/5422dd02b7f47b52010041a9
```

```json
{
    "meta": {
        "code": 200
    }
}
```
