# Получение списка геоточек

Список геоточек с возможностью фильтрации. Параметры запроса:

* `group` - фильтр по группе
* `point` - координаты для получения точек в радиусе, формат: **longitude,latitude**. Пример:
```shell
curl -u +12345675578:password http://sandbox.wallet.best/v1/locations?point=57.415033,51.446833
```
* `distance` - радиус площади в метрах, по-умолчанию 500. Работает только вместе с **point**. 
* `square` - получение точек в прямоугольном полигоне. Передать нужно две координаты - сначала левую верхнюю, затем правую нижнюю точки в формате: **longitude,latitude,longitude,latitude**. Пример:  
```shell
curl -u +12345675578:password http://sandbox.wallet.best/v1/locations?square=57.279764,51.512689,57.415033,51.446833
```

##### Внимание! Всегда передавайте коориднаты в последовательности **longitude,latitude**, а не наоборот

Поля:

* `id` - уникальный идентификатор точки
* `name` - наименование точки
* `type` - **офис | терминал | касса**
* `group` - **replenishment | verification | money_transfer**
* `worktime` - время работы
* `address` - адрес точки
* `latitude` - широта точки
* `longitude` - долгота точки

Ошибки:

* `invalid_location_group` - неправильная группа
* `missed_location_point_comma` - нет разделительной запятой между долготой и широтой для точки координат
* `missed_location_square_comma` - нет разделительной запятой между долготой и широтой для координат в полигоне
* `wrong_location_square_points_amount` - координат в полигоне должно быть ровно 4

```shell
$ curl -u +12345675578:password http://sandbox.wallet.best/v1/locations
```

```json
{
    "meta": {
        "code": 200
    },
    "data": [
        {
            "id": "54635060279871e2098b4567",
            "name": "Точка пополнения 'Денег нет'",
            "type": "Банкомат: Инвестбанк ОАО АКБ",
            "group": "replenishment",
            "worktime": "пн-пт: 09:00-20:00, сб: 10:00-16:00",
            "address": "Москва ул. Ворошилова 169-171",
            "latitude": 55.616371,
            "longitude": 37.211893
        },
        {
            "id": "54635060279871e2098b4568",
            "name": "За Казмадан!",
            "type": "Касса: СЛАВИНВЕСТБАНК ООО",
            "group": "verification",
            "worktime": "круглосуточно",
            "address": "Москва ул. маршала Жукова 1",
            "latitude": 55.676006,
            "longitude": 37.252398
        }
    ]
}
```