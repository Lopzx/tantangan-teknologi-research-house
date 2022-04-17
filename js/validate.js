// Error Box
const name_error = document.getElementById('name-in-error');
const email_error = document.getElementById('email-in-error');
const password_error = document.getElementById('gender-in-error');

//Input Box
const in_name = document.getElementById('name');
const in_email = document.getElementById('email');
const in_gender = document.getElementsByClassName('input-gender');

function init_event_listener(){
    in_name.addEventListener('input', () => {
        let message = [];
        const user_input = in_name.value;
        if (user_input.length === 0) {
            message.push('Field tidak boleh kosong');
        }

        if (user_input.length <= 5) {
            message.push('Nama tidak boleh kurang dari 5 huruf');
        }
        
        if (message.length !== 0) {
            message = message.join('\n *');
            name_error.innerText = '*' + message;
        } else {
            name_error.innerText = '';
        }
    });

    in_email.addEventListener('input', () => {
        console.log('lol')
        let message = [];
        const user_input = in_email.value;
        if (user_input.length === 0) {
            message.push('Field tidak boleh kosong');
        }

        if (!user_input.includes('@')) {
            message.push('Input tidak memiliki simbol @')
        }

        if (message.length !== 0) {
            message = message.join('\n *');
            email_error.innerText = '*' +  message;
        } else {
            name_error.innerText = '';
        }
    });
}

init_event_listener();