#(BW ADM) Регистры

##Загрузка списка регистров
```shell
curl -uuser:user http://api.mbank.dev/adm2/registries?size=2
```

```json
{
    "meta": {
        "page": {
            "page": 1,
            "size": 2,
            "total_elements": 3
        },
        "code": 200
    },
    "data": [
        {
            "id": "55423dafcccc9048990041ac",
            "name": "test.xlsx",
            "type": "testType3",
            "user": "test",
            "date": "2015-04-10T00:00:00+00:00",
            "file": "http:\/\/api.mbank.dev\/registries\/af\/23d\/test.xlsx"
        },
        {
            "id": "55423dadcccc90b39a0041ac",
            "name": "test.xls",
            "type": "testType2",
            "user": "test",
            "date": "2015-04-16T00:00:00+00:00",
            "file": "http:\/\/api.mbank.dev\/registries\/ad\/23d\/test.xls"
        }
    ]
}
```
### Ответ
* `id` - идентификатор регистра
* `name` - Название регистра (имя файла)
* `type` - тип регистра
* `date` - дата за которую загружен геристр
* `file` - url файла для скачивания


### Параметры (опциональные)
* `date_from` и `date_to` - границы диапазона дат создания платежей
* `page` - номер (начиная с 0) страницы, которую запрашивает клиент, по умолчанию 0
* `size` - размер страницы, которую запрашивает клиент, по умолчанию 20


##Загрузка регистра по id

```shell
curl -uuser:user http://api.mbank.dev/adm2/registry/55423dafcccc9048990041ac
```

```json
{
    "meta": {
        "code": 200
    },
    "data": [
        {
            "id": "55423dafcccc9048990041ac",
            "name": "test.xlsx",
            "type": "testType3",
            "user": "test",
            "date": "2015-04-10T00:00:00+00:00",
            "file": "http:\/\/api.mbank.dev\/registries\/af\/23d\/test.xlsx"
        }
    ]
}
```

При загрузке - Вы получите те же саммые данные, что и при списке

##Добавление регистра
Добавление регистра происходит в две итерации
Принимаемые типы файлов:

* 'text/csv',
* 'text/plain',
* 'application/vnd.ms-excel',
* 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
* 'application/zip',
* 'application/gzip'

```shell
$ curl -H 'Content-type:application/json' -uuser:user -d '{"date":"2015-04-11","type":"testType4"}' http://api.mbank.dev/adm2/registry
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "url_for_upload_file": "\/adm2\/registry\/55424de7cccc9049990041b1"
    }
}
```

> После первого запроса на полученный url нужно загрузить файл

```shell
$ curl -uuser:user -H 'Content-Type: multipart/form-data' -X POST -F "file=@path_to_file/test.xls" http://api.mbank.dev/adm2/registry/55424de7cccc9049990041b1
```

```json
{
    "meta": {
        "code": 200
    },
    "data": {
        "id": "55424de7cccc9049990041b1",
        "name": "test.xls",
        "type": "testType4",
        "user": "test",
        "date": 1428710400,
        "file": "http:\/\/api.mbank.dev\/registries\/ec\/250\/test.xls"
    }
}
```
