# Провайдеры

## Создание провайдера

### Параметры

* `code` - код провайдера
* `name` - имя провайдера
* `jur_name` - юр. имя провайдера

```shell
$ curl -H 'Content-type:application/json' -u admin:admin -d '{"code":"rest_provider_1", "name":"Test provider 1", "jur_name": "Some info"}' https://www.synq.ru/mserver2-dev/admin/providers
```

```json
{
  "meta" : {
    "code" : 200
  },
  "data" : {
    "id" : 124,
    "code" : "rest_provider_1",
    "name" : "Test provider 1"
  }
}
```

## Редактирование провайдера

### Параметры

* `code` - код провайдера
* `name` - имя провайдера
* `jur_name` - юр. имя провайдера

```shell
$ curl -H 'Content-type:application/json' -u admin:admin -d '{"code":"rest_provider_2", "name":"Test provider 2", "jur_name": "Some info (changed)"}' https://www.synq.ru/mserver2-dev/admin/providers/124
```

```json
{
  "meta" : {
    "code" : 200
  },
  "data" : {
    "id" : 124,
    "code" : "rest_provider_2",
    "name" : "Test provider 2"
  }
}
```

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

## Создание сервиса провайдера

### Параметры

* `name` - человекочитаемое имя сервиса
* `min, max` - минимальная и максимальная сумма платежа, включительно
* `parameters.code` - ключ параметра платежа
* `parameters.comments` - комментарий параметра платежа
* `parameters.min_length, parameters.max_length` - минимальная и максимальная длина значения параметра
* `parameters.pattern` - регулярное выражение, которому должно удовлетворять значение параметра 
* `parameters.pattern_description` - человекочитаемое описание для pattern
* `parameters.title` - заголовок параметра
* `parameters.type` - numeric|text|enum тип параметра, число/текст/перечисление
* `parameters.items` - возможные значения параметра с типом enum

```shell
$ curl -H 'Content-type:application/json' -u admin:admin -d '{"name":"Provider service #1", "min":"10", "max": "10000", "parameters" : [{"code": "param1", "comments": "test comment", "min_length": 1, "max_length": 10, "pattern": "*", "pattern_description": "Phone number", "title" : "test title", "type": "numeric"}, {"code": "param2", "comments": "test comment2", "min_length": 1, "max_length": 10, "pattern": "***", "pattern_description": "Phone number2", "title" : "test title2", "type": "text", "items": [{"code" : "item1", "value": "Test Item 1"}, {"code" : "item2", "value": "Test Item 2"}]}]}' https://www.synq.ru/mserver2-dev/admin/providers/124/services
```

```json
{
  "meta" : {
    "code" : 200
  },
  "data" : {
    "id" : 7208,
    "service_id" : 0,
    "name" : "Provider service #1",
    "min" : 10,
    "max" : 10000,
    "payment_type" : 0,
    "updated_at" : "2015-09-28T09:05:15.189Z",
    "version" : "0",
    "provider" : {
      "id" : 124,
      "code" : "rest_provider_2",
      "name" : "Test provider 2"
    },
    "parameters" : [ {
      "code" : "param2",
      "comments" : "test comment2",
      "min_length" : 1,
      "max_length" : 10,
      "pattern" : "***",
      "pattern_description" : "Phone number2",
      "title" : "test title2",
      "type" : "text",
      "items" : [ {
        "code" : "item1",
        "value" : "Test Item 1"
      }, {
        "code" : "item2",
        "value" : "Test Item 2"
      } ]
    }, {
      "code" : "param1",
      "comments" : "test comment",
      "min_length" : 1,
      "max_length" : 10,
      "pattern" : "*",
      "pattern_description" : "Phone number",
      "title" : "test title",
      "type" : "numeric",
      "items" : [ ]
    } ]
  }
}
```

## Редактирование сервиса провайдера

### Параметры

* `name` - человекочитаемое имя сервиса
* `min, max` - минимальная и максимальная сумма платежа, включительно
* `parameters.code` - ключ параметра платежа
* `parameters.comments` - комментарий параметра платежа
* `parameters.min_length, parameters.max_length` - минимальная и максимальная длина значения параметра
* `parameters.pattern` - регулярное выражение, которому должно удовлетворять значение параметра 
* `parameters.pattern_description` - человекочитаемое описание для pattern
* `parameters.title` - заголовок параметра
* `parameters.type` - numeric|text|enum тип параметра, число/текст/перечисление
* `parameters.items` - возможные значения параметра с типом enum

```shell
$ curl -H 'Content-type:application/json' -u admin:admin -d '{"name":"Provider service #1-2", "min":"10", "max": "10000", "parameters" : [{"code": "param1-2", "comments": "test comment", "min_length": 1, "max_length": 10, "pattern": "*", "pattern_description": "Phone number", "title" : "test title-2", "type": "numeric"}, {"code": "param2", "comments": "test comment2-2", "min_length": 1, "max_length": 10, "pattern": "***", "pattern_description": "Phone number2-2", "title" : "test title2-2", "type": "text", "items": [{"code" : "item1-2", "value": "Test Item 1-2"}, {"code" : "item2-2", "value": "Test Item 2-2"}]}]}' https://www.synq.ru/mserver2-dev/admin/providers/services/7208
```

```json
{
  "meta" : {
    "code" : 200
  },
  "data" : {
    "id" : 7208,
    "service_id" : 0,
    "name" : "Provider service #1-2",
    "min" : 10,
    "max" : 10000,
    "payment_type" : 0,
    "updated_at" : "2015-09-28T09:26:21.493Z",
    "version" : "0",
    "provider" : {
      "id" : 124,
      "code" : "rest_provider_2",
      "name" : "Test provider 2"
    },
    "parameters" : [ {
      "code" : "param1-2",
      "comments" : "test comment",
      "min_length" : 1,
      "max_length" : 10,
      "pattern" : "*",
      "pattern_description" : "Phone number",
      "title" : "test title-2",
      "type" : "numeric",
      "items" : [ ]
    }, {
      "code" : "param2",
      "comments" : "test comment2-2",
      "min_length" : 1,
      "max_length" : 10,
      "pattern" : "***",
      "pattern_description" : "Phone number2-2",
      "title" : "test title2-2",
      "type" : "text",
      "items" : [ {
        "code" : "item2-2",
        "value" : "Test Item 2-2"
      }, {
        "code" : "item1-2",
        "value" : "Test Item 1-2"
      } ]
    } ]
  }
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
