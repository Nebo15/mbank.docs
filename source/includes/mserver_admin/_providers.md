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

## Загрузка списка сервисов провайдеров

```shell
$ curl -u admin:admin https://www.synq.ru/mserver2-dev/admin/providers/services
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
    "service_id" : 734524455,
    "name" : "MalNet (Москва)",
    "min" : 10,
    "max" : 15000,
    "payment_type" : 0,
    "updated_at" : "2014-12-29T17:01:03.081Z",
    "version" : "0",
    "provider" : {
      "id" : 1,
      "code" : "tpr_out",
      "name" : "Кредит Пилот"
    },
    "parameters" : [ {
      "code" : "phoneNumber",
      "comments" : "№ договора (1-20 символов)",
      "min_length" : 1,
      "max_length" : 20,
      "pattern" : "^[a-z0-9_\\.\\-]{1,20}$",
      "pattern_description" : "№ договора (1-20 символов)",
      "title" : "№ договора (1-20 символов)",
      "type" : "text"
    } ]
  }, {
    "service_id" : 980752136,
    "name" : "Mamba",
    "min" : 34,
    "max" : 15000,
    "payment_type" : 0,
    "updated_at" : "2014-12-29T17:01:03.117Z",
    "version" : "0",
    "provider" : {
      "id" : 1,
      "code" : "tpr_out",
      "name" : "Кредит Пилот"
    },
    "parameters" : [ {
      "code" : "phoneNumber",
      "comments" : "Логин",
      "min_length" : 1,
      "max_length" : -128,
      "pattern" : "^.{1,128}$",
      "pattern_description" : "Логин",
      "title" : "Логин",
      "type" : "text"
    } ]
  }, {
    "service_id" : 979311259,
    "name" : "Ростелеком Центр (Элтелекор) (29)",
    "min" : 0,
    "max" : 15000,
    "payment_type" : 0,
    "updated_at" : "2014-12-29T17:06:11.799Z",
    "version" : "0",
    "provider" : {
      "id" : 1,
      "code" : "tpr_out",
      "name" : "Кредит Пилот"
    },
    "parameters" : [ {
      "code" : "phoneNumber",
      "comments" : "№ моб.телефона (10 цифр)",
      "min_length" : 10,
      "max_length" : 10,
      "pattern" : "^(.{2,8}|.{20})$",
      "pattern_description" : "2-8 символов или 20 символов",
      "title" : "№ Счёта",
      "type" : "text"
    } ]
  } ]
}
```
