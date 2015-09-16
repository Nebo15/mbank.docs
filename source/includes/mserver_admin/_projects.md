# Проекты

## Загрузка списка проектов

```shell
$ curl -u admin:admin https://www.synq.ru/mserver2-dev/admin/projects
```

```json
{
  "meta" : {
    "code" : 200,
    "page" : {
      "total_elements" : 2
    }
  },
  "data" : [ {
    "code" : "mbank",
    "name" : "МБанк"
  }, {
    "code" : "bov",
    "name" : "Банк Воронеж"
  } ]
}
```
