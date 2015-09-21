# Пользователи (Администраторы)

## Создание пользователей

### Параметры

* `login` - логин пользователя
* `password` - пароль пользователя

```shell
$ curl -H 'Content-type:application/json' -u admin:admin -d '{"login":"testadminuser", "password":"strongpassword"}' https://www.synq.ru/mserver2-dev/admin/users
```

```json
{
  "meta" : {
    "code" : 200
  },
  "data" : {
    "id" : 134432,
    "login" : "testadminuser"
  }
}
```

## Разблокировка пользователя

```shell
$ curl -u admin:admin -X POST https://www.synq.ru/mserver2-dev/admin/users/133829/enable
```

```json
{
  "meta" : {
    "code" : 200
  }
}
```

## Блокировка пользователя

### Параметры

Пэйлоад является необязательным параметром

* `message` - сообщение для пользователя кошелька, объясняющее причину блокировки и как дальше жить (Необязательный параметр)
* `reason` - сообщение для сотрудников проекта о причине блокировки. Это сообщение не видно клиенту. (Необязательный параметр)


```shell
$ curl -u admin:admin -d '{"message": "text message", "reason": "text reason"}' https://www.synq.ru/mserver2-dev/admin/users/133829/disable
```

```json
{
  "meta" : {
    "code" : 200
  }
}
```

## Установка ролей пользователя

### Параметры

* `roles` - роли пользователя

```shell
$ curl -H 'Content-type:application/json' -u admin:admin -d '{"roles": ["user", "spectator"]}' https://www.synq.ru/mserver2-dev/admin/users/133829/roles
```

```json
{
  "meta" : {
    "code" : 200
  }
}
```	
