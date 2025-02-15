var inputElement = document.getElementById('title');
var createBtn = document.getElementById('create');
var listElement = document.getElementById('list');
//Тип Array<T> принимает общий аргумент, который указывает структуру
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
    listElement.innerHTML = '';
    if (notes.length === 0) {
        listElement.innerHTML = '<p>Нет элементов</p>';
        return;
    }
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
// кнопки
function getNoteTemplate(note, index) {
    return "\n        <li class=\"list-group-item d-flex justify-content-between align-items-center\">\n            <span class=\"".concat(note.completed ? 'text-decoration-line-through' : '', "\">").concat(note.title, "</span>\n            <span>\n                <span class=\"btn btn-small btn-").concat(note.completed ? 'warning' : 'success', "\" data-index=\"").concat(index, "\" data-type=\"toggle\">&check;</span>\n                <span class=\"btn btn-small btn-danger\" data-type=\"remove\" data-index=\"").concat(index, "\">&times;</span>\n            </span>\n        </li>\n    ");
}
// Первоначальная отрисовка
render();
