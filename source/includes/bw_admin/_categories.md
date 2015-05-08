#Категории

## Загрузка списка категорий
```shell
$ curl -uuser:user "http://sandbox.wallet.best/adm2/categories"
```
```json
{
    "meta": {
        "code": 200
    },
    "data": [
        {
            "id": "53359fb2255c741a749f0c42",
            "mserver_id": 3,
            "name": {
                "ru_RU": "Мобильная связь",
                "en_US": "Cellular providers"
            },
            "group": "cellular",
            "position": 1,
            "services_count": 8,
            "localized_fields": [
                "name"
            ]
        }
        ...
    ]
}
```
* `id` - id категории
* `mserver_id` - id категории на mserver
* `name` - локализированное название категории
* `group` - группа, к которой относится категория
* `position` - позиция категории в списке
* `services_count` - кол-во привязанных к категории сервисов
* `localized_fields` - массив с локализированными полями


## Добавление категории

```shell
$ curl  -X POST -u user:user -d '{"name":"some_name","group":"some_group","position":1,"projects":["mbank","bov"]}' http://sandbox.wallet.best/adm2/category
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": "55421733cccc904a990041a8",
        "mserver_id": 0,
        "name": {
            "ru_RU": "some_name",
            "en_US": null
        },
        "group": "some_group",
        "position": 1,
        "services_count": 0,
        "localized_fields": [
            "name"
        ]
    }
}
```

* `name` - локализированное название категории (либо строка)
* `group` - группа, к которой относится категория
* `position` - позиция категории в списке
* `projects` - список проектов, к которым эта категория относится


## Редактирование категории
```shell
$ curl -X POST -u user:user -d '{"name":{"ru_RU":"some_name_edited", "en_US":"some_en_name"},"group":"some_group","position":1,"projects":["mbank","bov"], "id":"55421733cccc904a990041a8"}' http://sandbox.wallet.best/adm2/category
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": "55421733cccc904a990041a8",
        "mserver_id": 0,
        "name": {
            "ru_RU": "some_name_edited",
            "en_US": "some_en_name"
        },
        "group": "some_group",
        "position": 1,
        "services_count": 0,
        "localized_fields": [
            "name"
        ]
    }
}
```
При редактировании категории передаются те же самые поля, что и при создании
Дополнительно передается id категории

## Удаление категории

```shell
$ curl -H 'Content-type:application/json' -X DELETE -d '{"id":"549c92fb56c35f660ecd341f"}' -uuser:user http://sandbox.wallet.best/adm2/category
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {}
}
```


## Сортировка категорий

```shell
$ curl -X POST -u user:user -d '{"projects":["mbank"],"categories_ids":["53359fb2255c741a749f0c5d","537e28f756c35f87701cddf5",
"53359fb2255c741a749f0c47","53359fb2255c741a749f0c5b",
"53359fb2255c741a749f0c4b","549c92fb56c35f660ecd341f","53a1ca0656c35fe0767b8a93","53359fb2255c741a749f0c50",
"53359fb2255c741a749f0c42","53359fb2255c741a749f0c58",
"53359fb2255c741a749f0c4d","545abac556c35fcc2848c11f","53359fb2255c741a749f0c59"]}' http://sandbox.wallet.best/adm2/categories/sort
```

```json
{
    "meta": {
        "code": 200
    }
}
```
Необходимо передать проекты, для которых будет менять сортировка и массив idшников категорий, в том порядке, в котором они должны быть отсортированны
