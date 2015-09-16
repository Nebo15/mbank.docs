# Провайдеры

## Загрузка списка провайдеров

```shell
$ curl -u admin:admin https://www.synq.ru/mserver2-dev/admin/providers
```

```json
 {
  "meta" : {
    "code" : 200,
    "page" : {
      "total_elements" : 3
    }
  },
  "data" : [ {
    "id" : 1,
    "code" : "tpr_out",
    "name" : "Кредит Пилот"
  }, {
    "id" : 2,
    "code" : "tpr_in",
    "name" : "ООО ТПР (агент)"
  }, {
    "id" : 3,
    "code" : "rapida_in",
    "name" : "ПС Рапида (агент)"
  } ]
}
```
