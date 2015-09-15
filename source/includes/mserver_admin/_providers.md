# Провайдеры

## Загрузка списка провайдеров

```shell
$ curl -uadmin:admin https://www.synq.ru/mserver2-dev/admin/services
```

```json
 {
  "meta" : {
    "code" : 200,
    "page" : {
      "total_elements" : 391
    }
  },
  "data" : [ {
    "id" : 1670,
    "name" : "CityLink (Королёв)",
    "min" : 10,
    "max" : 15000,
    "verification_required" : false,
    "parameters" : [ {
      "code" : "phoneNumber",
      "min_length" : 6,
      "max_length" : 7,
      "name" : "Логин",
      "pattern" : "^.{6,7}$",
      "type" : "text",
      "pattern_description" : "Логин",
      "items" : [ ]
    } ],
    "rate" : {
      "fix" : 0,
      "percent" : 3
    }
  }]
  }
```
