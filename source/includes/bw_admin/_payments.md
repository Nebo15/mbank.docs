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
