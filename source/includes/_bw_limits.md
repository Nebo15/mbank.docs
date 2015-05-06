#BW Лимиты

## Лимиты платежей

```shell
$ сurl -u+79261111111:p@ssw0rD -H 'Content-type:application/json' http://sandbox.wallet.best/v1/limits
```

```json
{
    "meta": {
        "code": 200,
        "urgent_data": {
            "amount": 581,
            "unseen_payments": 1
        }
    },
    "data": [
        {
            "title": "Максимальный остаток на счет",
            "description": "Сумма сверх указанного лимита будет временно недоступна для любых операций",
            "limits": [
                {
                    "type": "bool",
                    "value": true,
                    "status": "anonymous"
                },
                {
                    "type": "string",
                    "value": "60000",
                    "status": "verified"
                },
                {
                    "type": "bool",
                    "value": false,
                    "status": "personified"
                }
            ]
        }
    ]
}
```
