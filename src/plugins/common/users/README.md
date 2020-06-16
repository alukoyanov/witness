# HENTA Плагин: common/users
Система пользователей

```js
const usersPlugin = henta.getPlugin('common/users');
```

## Установка
Используйте консоль HENTA
```
p-install StandardHentaPlugins/users
```

## Методы
Получить пользователя по vkId:
```js
  const user = await usersPlugin.get(1); // Павел Дуров
```

Создать пользователя (Осторожно, может плодить дубликаты):
```js
  const user = await usersPlugin.create(1); // Павел Дуров
```

Получить пользователя по строке (ИД, ссылка, упоминание):
```js
  const user = await usersPlugin.resolve('vk.com/durov'); // Павел Дуров
```

Получить vkId по строке (ИД, ссылка, упоминание):
```js
  const userVkId = await usersPlugin.resolveVkId('vk.com/durov'); // Вернёт: 1
```

Добавить группу методов в класс пользователя:
```js
  usersPlugin.group('mygroup')
    .method('help', user => {
      user.send('Тебе нужна моя помощь, зайчик? 😏')
    })
    .end();

  // Где-нибудь
  user.mygroup.help();
```

Добавить поле в объект пользователя:
```js
  usersPlugin.field('foo', { /* Sequelize field */ });
```