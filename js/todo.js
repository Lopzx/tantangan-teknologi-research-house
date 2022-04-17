//Button
const add_btn = document.getElementById('add-btn');

//Input
const input_box = document.getElementById('text-input');

//todo-list
const todo_box = document.getElementById('todo-box');

add_btn.addEventListener('click', () => {
    const value = input_box.value;
    todo_box.innerHTML += `
    <div class="list-item">
        <input type="checkbox">
        <p>${value}</p>
        <button type="button" class="bg-red delete-btn">U</button>
    </div>
    `, 'text/html';

    input_box.value = '';
});

todo_box.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        e.target.parentElement.remove();
    }
});