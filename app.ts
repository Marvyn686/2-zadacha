//получение элементов DOM + типизация их //          as говорю TS что такие элементы точно есть HTML

const inputElement = document.getElementById('title') as HTMLInputElement | null;
const createBtn = document.getElementById('create') as HTMLButtonElement | null;
const listElement = document.getElementById('list') as HTMLUListElement | null;
//проверка на пустое значение(null) в передаваемом id/
//если inputElement = null -> тогда элемент не найден
if (!inputElement || !createBtn || !listElement) {
    throw new Error('один из элементов DOM не найден')
}

// Определяем тип для заметки
//задаем интерфейс
interface Note {
    title: string;
    completed: boolean;
}

//можно типизировать через(обозначает массив) Array<Note>
//можно сделать через определене массива
const notes: Note[] = [
    {
        title: 'записать блок про массивы',
        completed: false,
    },
    {
        title: 'рассказать теорию объектов',
        completed: true,
    }
];


function render(): void {
    //очистка элемента
    listElement.innerHTML = '';
    //проверка, есть ли элементы в массиве
    if (notes.length === 0) {
        //если список пуст =>
        listElement.innerHTML = '<p>Нет элементов</p>';
        return;
    }
    //заполнение списка
    for (let i: number = 0; i < notes.length; i++) {
        listElement.insertAdjacentHTML('beforeend', getNoteTemplate(notes[i], i));
    }
}


createBtn.onclick = function (): void {
    if (inputElement.value.trim().length === 0) {
        return;
    }
    const newNote: Note = {
        title: inputElement.value,
        completed: false,
    };

    notes.push(newNote);
    render();
    inputElement.value = '';
};

//узнаем по какой кнопке было действие

// задал класс для функции
class FunClick{
    target: EventTarget;
    index: number;
    type: string;
}
//event - содержит информацию о событии клика, MouseEvent - указывает, что это событие связано с мышкой

listElement.onclick = function (event: MouseEvent): Function {
    const target = event.target as HTMLElement;
    const index: number = parseInt(target.dataset.index || '', 10);
    const type: string = target.dataset.type;

    if (isNaN(index) || !type) {
        return;
    }

    if (type === 'toggle') {
        notes[index].completed = !notes[index].completed;
    } else if (type === 'remove') {
        notes.splice(index, 1);
    }

    render();
};

// кнопки               //note содержит свойства Notes, index -  номер в массиве notes// функция имеет тип строки
function getNoteTemplate(note: Note, index: number): string {
     //что прописано в li class по порядку   //стиль элем. списка//flex-контей//разделяет по ширене//выравнивает по центр и верт.
    //что прописано в span class //проверка заполнения
    //
    return `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="${note.completed ? 'text-decoration-line-through' : ''}">${note.title}</span>
            <span>
                <span class="btn btn-small btn-${note.completed ? 'warning' : 'success'}" data-index="${index}" data-type="toggle">&check;</span>
                <span class="btn btn-small btn-danger" data-type="remove" data-index="${index}">&times;</span>
            </span>
        </li>
    `;
}

// Первоначальная отрисовка
render();