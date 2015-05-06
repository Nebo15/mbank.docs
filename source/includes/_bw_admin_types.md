#(BW ADM) Типы

* `id` - идентификатор
* `title` - название
* `description` - описание
* `regex_map` - Регулярное выражения поиска (Правило преобразования MServer&rarr;Client)
* `regex_map_value` - Значение для замены (Значение преобразования MServer&rarr;Client)
* `regex_unmap` - Регулярное выражения поиска (Правило преобразования Client&rarr;MServer)
* `regex_unmap_value` - Значение для замены (Значение преобразования Client&rarr;MServer)


##Получение списка типов

```shell
curl -uuser:user api.mbank.dev/adm2/types
```

```json
{
    "meta": {
        "code": 200
    },
    "data": [
        {
            "id": "5542652ecccc90abb20041b8",
            "title": "phone",
            "description": "Номер телефона (локальный формат, Финляндия)",
            "regex_map": "^.*$",
            "regex_map_value": "+358$0",
            "regex_unmap": "^\\+358",
            "regex_unmap_value": ""
        },
        {
            "id": "5542652ecccc90abb20041b9",
            "title": "phone",
            "description": "Номер телефона (локальный формат, Болгария)",
            "regex_map": "^.*$",
            "regex_map_value": "+359$0",
            "regex_unmap": "^\\+359",
            "regex_unmap_value": ""
        }
        ...
    ]
}
```
##Получение типа по id

```shell
curl  -H 'X-Project-ID:mbank' -uuser:user api.mbank.dev/adm2/type/5542652ecccc90abb20041b8
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": "5542652ecccc90abb20041b8",
        "title": "phone",
        "description": "Номер телефона (локальный формат, Финляндия)",
        "regex_map": "^.*$",
        "regex_map_value": "+358$0",
        "regex_unmap": "^\\+358",
        "regex_unmap_value": ""
    }
}
```

##Добавление типа

```shell
curl  -H 'X-Project-ID:mbank' -H 'Content-type:application/json' -uuser:user -X POST -d '{"title":"new_title","description":"description_for_new_title","regex_map":"\/^$\/$","regex_map_value":"\/^$\/$","regex_unmap":"100500","regex_unmap_value":"100500"}' http://api.mbank.dev/adm2/type
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": "5549b733cccc904b09004261",
        "title": "new_title",
        "description": "description_for_new_title",
        "regex_map": "\/^$\/$",
        "regex_map_value": "\/^$\/$",
        "regex_unmap": "100500",
        "regex_unmap_value": "100500"
    }
}
```

* `title` - название
* `description` - описание
* `regex_map` - Регулярное выражения поиска (Правило преобразования MServer&rarr;Client)
* `regex_map_value` - Значение для замены (Значение преобразования MServer&rarr;Client)
* `regex_unmap` - Регулярное выражения поиска (Правило преобразования Client&rarr;MServer)
* `regex_unmap_value` - Значение для замены (Значение преобразования Client&rarr;MServer)

##Изменение типа

```shell
curl  -H 'X-Project-ID:mbank' -H 'Content-type:application/json' -uuser:user -X POST -d '{"id": "5549b733cccc904b09004261", "title":"edited title","description":"edited description","regex_map":"\/^$\/$","regex_map_value":"\/^$\/$","regex_unmap":"100500","regex_unmap_value":"100500"}' http://api.mbank.dev/adm2/type

```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": "5549b733cccc904b09004261",
        "title": "edited title",
        "description": "edited description",
        "regex_map": "\/^$\/$",
        "regex_map_value": "\/^$\/$",
        "regex_unmap": "100500",
        "regex_unmap_value": "100500"
    }
}
```

Запрос на изменение типа аналогичен с запросом на создание типа, только с передачей идентификатора типа

##Удаление типа

```shell
curl -H 'X-Project-ID:mbank' -H 'Content-type:application/json' -X DELETE -u test:password  -d '{"id":"5549b733cccc904b09004261"}' http://api.mbank.dev/adm2/type
```

```json
{
    "meta": {
        "code": 200
    },
    "data": "5549b733cccc904b09004261"
}
```
