#Категории

## Загрузка списка категорий
```shell
$ curl -uuser:user "http://sandbox.wallet.best/adm2/categories/"
```
```json
{
    "meta": {
        "code": 200
    },
    "data": [
        {
            "id": "549c92fb56c35f660ecd341f",
            "name": {
                "ru_RU": "Денежные переводы",
                "en_US": null
            },
            "group": "",
            "keywords": "",
            "position": 13,
            "amount": 3,
            "localized_fields": [
                "name"
            ]
        }
        ...
    ]
}
```
* `id` - id категории
* `name` - локализированное название категории
* `group` - группа, к которой относится категория
* `position` - позиция категории в списке
* `amount` - кол-во привязанных к категории сервисов
* `localized_fields` - массив с локализированными полями


## Добавление категории

```shell
$ curl -H 'Content-type:application/json' -X POST -u user:user -d '{"name":"some_name","group":"some_group","position":1,"projects":["mbank","bov"]}' http://sandbox.wallet.best/adm2/categories/
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": "55421733cccc904a990041a8",
        "name": {
            "ru_RU": "some_name",
            "en_US": null
        },
        "group": "some_group",
        "keywords": "",
        "position": 1,
        "amount": 0,
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
$ curl -H 'Content-type:application/json' -X POST -u user:user -d '{"name":{"ru_RU":"some_name_edited", "en_US":"some_en_name"},"group":"some_group","position":1,"projects":["mbank","bov"], "keywords":"one,two,three"}' http://sandbox.wallet.best/adm2/categories/55421733cccc904a990041a8
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": "55421733cccc904a990041a8",
        "name": {
            "ru_RU": "some_name_edited",
            "en_US": "some_en_name"
        },
        "group": "some_group",
        "keywords":"one,two,three",
        "position": 1,
        "amount": 0,
        "localized_fields": [
            "name"
        ]
    }
}
```
При редактировании категории передаются те же самые поля, что и при создании

## Удаление категории

```shell
$ curl -X DELETE -uuser:user http://sandbox.wallet.best/adm2/categories/55421733cccc904a990041a8
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
