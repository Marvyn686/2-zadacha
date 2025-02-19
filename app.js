//получение элементов DOM + типизация их //          as говорю TS что такие элементы точно есть HTML
var inputElement = document.getElementById('title');
var createBtn = document.getElementById('create');
var listElement = document.getElementById('list');
//проверка на пустое значение(null) в передаваемом id/
//если inputElement = null -> тогда элемент не найден
if (!inputElement || !createBtn || !listElement) {
    throw new Error('один из элементов DOM не найден');
}
//можно типизировать через(обозначает массив) Array<Note>
//можно сделать через определене массива
var notes = [
    {
        title: 'записать блок про массивы',
        completed: false,
    },
    {
        title: 'рассказать теорию объектов',
        completed: true,
    }
];
function render() {
    //очистка элемента
    listElement.innerHTML = '';
    //проверка, есть ли элементы в массиве
    if (notes.length === 0) {
        //если список пуст =>
        listElement.innerHTML = '<p>Нет элементов</p>';
        return;
    }
    //заполнение списка
    for (var i = 0; i < notes.length; i++) {
        listElement.insertAdjacentHTML('beforeend', getNoteTemplate(notes[i], i));
    }
}
createBtn.onclick = function () {
    if (inputElement.value.trim().length === 0) {
        return;
    }
    var newNote = {
        title: inputElement.value,
        completed: false,
    };
    notes.push(newNote);
    render();
    inputElement.value = '';
};
//узнаем по какой кнопке было действие
// задал класс для функции
var FunClick = /** @class */ (function () {
    function FunClick() {
    }
    return FunClick;
}());
//event - содержит информацию о событии клика, MouseEvent - указывает, что это событие связано с мышкой
listElement.onclick = function (event) {
    var target = event.target;
    var index = parseInt(target.dataset.index || '', 10);
    var type = target.dataset.type;
    if (isNaN(index) || !type) {
        return;
    }
    if (type === 'toggle') {
        notes[index].completed = !notes[index].completed;
    }
    else if (type === 'remove') {
        notes.splice(index, 1);
    }
    render();
};
// кнопки               //note содержит свойства Notes, index -  номер в массиве notes// функция имеет тип строки
function getNoteTemplate(note, index) {
    //что прописано в li class по порядку   //стиль элем. списка//flex-контей//разделяет по ширене//выравнивает по центр и верт.
    //что прописано в span class //проверка заполнения
    //
    return "\n        <li class=\"list-group-item d-flex justify-content-between align-items-center\">\n            <span class=\"".concat(note.completed ? 'text-decoration-line-through' : '', "\">").concat(note.title, "</span>\n            <span>\n                <span class=\"btn btn-small btn-").concat(note.completed ? 'warning' : 'success', "\" data-index=\"").concat(index, "\" data-type=\"toggle\">&check;</span>\n                <span class=\"btn btn-small btn-danger\" data-type=\"remove\" data-index=\"").concat(index, "\">&times;</span>\n            </span>\n        </li>\n    ");
}
// Первоначальная отрисовка
render();
