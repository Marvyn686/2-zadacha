
const inputElement: HTMLInputElement = document.getElementById('title') as HTMLInputElement;
const createBtn: HTMLButtonElement = document.getElementById('create') as HTMLButtonElement;
const listElement: HTMLUListElement = document.getElementById('list') as HTMLUListElement;

// Определяем тип для заметки
interface Note {
    title: string;
    completed: boolean;
}

//Тип Array<T> принимает общий аргумент, который указывает структуру
const notes: Array<Note> = [
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
    listElement.innerHTML = '';
    if (notes.length === 0) {
        listElement.innerHTML = '<p>Нет элементов</p>';
        return;
    }
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
listElement.onclick = function (event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const index = parseInt(target.dataset.index || '', 10);
    const type = target.dataset.type;

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

// кнопки
function getNoteTemplate(note: Note, index: number): string {
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