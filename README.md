# genesis

Тествоое задание к вакансии Full stack JS-developer

## Table of contents

-  [Overview](#overview)
   -  [Conditions](#conditions)
   -  [Links](#links)
-  [Process](#process)
   -  [Tech Stack](#tech-stack)
-  [Project Setup](#project-setup)
   -  [Dev mode](#compile-and-hot-reload-for-development)
   -  [Production mode](#type-check-compile-and-minify-for-production)
   -  [Linting](#lint-with-eslint)

## OverView

### Conditions

Визуальная часть:

Сверстать 3 компонента соответсвуя дизайн карте

-  Кнопка с прелоадером
-  Выпадающий список (dropdown)
-  Область отображения результатов полученных на эндопинте

Функционал фронтенда:

-  Создание 3 видов сущностей соотвествующих эндпоинту
-  Отправка POST запроса с выбранной сущностью:
   -  Получение данных и их отображение или вывод ошибок
   -  Сохарнение полученных данных до конца сессии

### Links

> Может не работать если изменился или истёк срок accsess токена.
> Live URL: [Genezis-testovoe](https://genesis-tz.vercel.app/)

## Process

### Tech Stack

-  Typescript
-  Vue
-  Pinia
-  Axios
-  VueUse
-  EsLint

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
