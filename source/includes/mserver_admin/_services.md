# Сервисы

## Загрузка списка сервисов

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

## Загрузка сервиса по идентификатору

```shell
$ curl -uadmin:admin https://www.synq.ru/mserver2-dev/admin/services/834
```

```json
{
  "meta" : {
    "code" : 200
  },
  "data" : {
    "id" : 834,
    "name" : "Мегафон",
    "min" : 1,
    "max" : 15000,
    "verification_required" : false,
    "parameters" : [ {
      "code" : "phoneNumber",
      "min_length" : 10,
      "max_length" : 10,
      "name" : "№ Телефона",
      "pattern" : "^((6|9)\\d{9}|\\d{10})$",
      "type" : "numeric",
      "pattern_description" : "№ Телефона",
      "items" : [ ]
    } ],
    "rate" : {
      "fix" : 0,
      "percent" : 3
    }
  }
}
```

## Создание сервиса

### Параметры

* `name` - имя сервиса
* `verification_required` -  true | false требуется ли идентификация плательщика
* `group` - группа, куда добавить сервис
* `foreign_id` - ID сервиса провайдера, куда маршрутизировать платежи


```shell
$ curl -H 'Content-type:application/json' -u admin:admin -d '{"name":"Test Госуслуги РФ: ФНС", "verification_required": false, "group": "misc", "foreign_id": "39863886"}' https://www.synq.ru/mserver2-dev/admin/services
```

```json
{
  "meta" : {
    "code" : 200
  },
  "data" : {
    "id" : 1716,
    "name" : "Test Госуслуги РФ: ФНС"
  }
}
```

## Включение сервиса для проекта

### Параметры

* `project` - код проекта
* `rate` - комиссия (необязательный параметр в случае уже установленной комиисии, например сервис был выключен для этого проекта)

```shell
$ curl -H 'Content-type:application/json' -u admin:admin -d '{"project": "mbank", "rate": {"min": 30, "fix": 10, "max": 10000, "percent": 3.2}}' https://www.synq.ru/mserver2-dev/admin/services/1714/enable
```

```json
{
  "meta" : {
    "code" : 200
  },
  "data" : {
    "id" : 1714,
    "name" : "Test Госуслуги РФ: ФНС",
    "min" : 1,
    "max" : 15000,
    "verification_required" : false,
    "parameters" : [ {
      "code" : "phoneNumber",
      "min_length" : 15,
      "max_length" : 25,
      "name" : "Индекс Документа",
      "pattern" : "^(\\d{15}|\\d{20}|\\d{25})$",
      "type" : "numeric",
      "pattern_description" : "Индекс Документа",
      "items" : [ ]
    }, {
      "code" : "2",
      "name" : "№ Телефона",
      "pattern" : "^\\d{10}$",
      "type" : "text",
      "pattern_description" : "№ Телефона",
      "items" : [ ]
    }, {
      "code" : "3",
      "name" : "Фамилия Плательщика",
      "pattern" : "^([А-Я]{2,70}|[А-Я]{2,70}\\-[А-Я]{2,70})$",
      "type" : "text",
      "pattern_description" : "Фамилия Плательщика",
      "items" : [ ]
    }, {
      "code" : "4",
      "name" : "Имя Плательщика",
      "pattern" : "^[А-Я]{2,50}$",
      "type" : "text",
      "pattern_description" : "Имя Плательщика",
      "items" : [ ]
    }, {
      "code" : "5",
      "name" : "Отчество Плательщика",
      "pattern" : "^[А-Я ]{2,50}$",
      "type" : "text",
      "pattern_description" : "Отчество Плательщика",
      "items" : [ ]
    } ],
    "rate" : {
      "min" : 30,
      "max" : 10000,
      "fix" : 10,
      "percent" : 3.2
    }
  }
}
```

## Выключение сервиса для проекта

### Параметры

* `project` - код проекта

```shell
curl -H 'Content-type:application/json' -u admin:admin -d '{"project": "mbank"}' https://www.synq.ru/mserver2-dev/admin/services/1714/disable
```

```json
{
  "meta" : {
    "code" : 200
  },
  "data" : {
    "id" : 1714,
    "name" : "Test Госуслуги РФ: ФНС"
  }
}
```

## Установка комиссии

### Параметры

* `project` - код проекта
* `rate` - комиссия

```shell
$ curl -H 'Content-type:application/json' -u admin:admin -d '{"project": "mbank", "rate": {"min": 3, "fix": 100, "max": 1000, "percent": 30.2}}' https://www.synq.ru/mserver2-dev/admin/services/1714/rate
```

```json
{
  "meta" : {
    "code" : 200
  },
  "data" : {
    "id" : 1714,
    "name" : "Test Госуслуги РФ: ФНС",
    "min" : 1,
    "max" : 15000,
    "verification_required" : false,
    "parameters" : [ {
      "code" : "phoneNumber",
      "min_length" : 15,
      "max_length" : 25,
      "name" : "Индекс Документа",
      "pattern" : "^(\\d{15}|\\d{20}|\\d{25})$",
      "type" : "numeric",
      "pattern_description" : "Индекс Документа",
      "items" : [ ]
    }, {
      "code" : "2",
      "name" : "№ Телефона",
      "pattern" : "^\\d{10}$",
      "type" : "text",
      "pattern_description" : "№ Телефона",
      "items" : [ ]
    }, {
      "code" : "3",
      "name" : "Фамилия Плательщика",
      "pattern" : "^([А-Я]{2,70}|[А-Я]{2,70}\\-[А-Я]{2,70})$",
      "type" : "text",
      "pattern_description" : "Фамилия Плательщика",
      "items" : [ ]
    }, {
      "code" : "4",
      "name" : "Имя Плательщика",
      "pattern" : "^[А-Я]{2,50}$",
      "type" : "text",
      "pattern_description" : "Имя Плательщика",
      "items" : [ ]
    }, {
      "code" : "5",
      "name" : "Отчество Плательщика",
      "pattern" : "^[А-Я ]{2,50}$",
      "type" : "text",
      "pattern_description" : "Отчество Плательщика",
      "items" : [ ]
    } ],
    "rate" : {
      "min" : 3,
      "max" : 1000,
      "fix" : 100,
      "percent" : 30.2
    }
  }
}
```
