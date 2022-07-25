# Реализация плагина select по аналогии с Select2

Кастомный плагин select имеет возможность поиска элементов по ключевому запросу. Плагин работает по аналогии с существующим плагином [Select2](https://select2.org/)


## Использование
new Select2('#selector', options = {
  placeholder: "Please select item",
  allowSearch: true,
  data: [
})

#selector - div элемент, на котором будет отрисован плагин
options - список опции, со следующими свойствами:
placeholder - надпись(название) самого плагина
allowSearch - Возможность поиска по ключевому слову. Boolean значение. 
data - значения выпадающего меню. Массив из объектов

## Требования
Программно управлять плагином через следующие методы.

select(id) - Показ элемент select по id
open() - Открывает плагин select
close() - Закрывает плагин select


## Демо
[Посмотреть плагин](https://rgusseinov.github.io/select2-plugin/)
