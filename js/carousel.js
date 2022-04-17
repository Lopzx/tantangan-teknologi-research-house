function initialize(carousel_items, list){
    const clone_first_node = carousel_items[0]
                            .cloneNode(true);

    const clone_last_node = carousel_items[carousel_items.length - 1]
                            .cloneNode(true);

    list.insertBefore(clone_first_node, carousel_items[carousel_items.length - 1].nextElementSibling);
    list.insertBefore(clone_last_node, carousel_items[0]);

    Array.from(carousel_items).forEach((element) => {        
        element.style.transform = `translateX(${-100}%)`
    });
    current_transform = -100;
}

function check_index() {
    if(current_active_item === 0){
        const last_image_position = -(carousel_items.length - 2) * 100;
        Array.from(carousel_items).forEach((element) => {
            current_transform = last_image_position;
            element.style.transform = `translateX(${last_image_position}%)`;
        })
        current_active_item = carousel_items.length - 2;
    } else if (current_active_item === carousel_items.length - 1) {
        const first_image_position = -100;
        Array.from(carousel_items).forEach((element) => {
            current_transform = first_image_position;
            element.style.transform = `translateX(${first_image_position}%)`;
        })
        current_active_item = 1;
    }
}

function apply_transition(){
    Array.from(carousel_items).forEach((element) => {   
        element.style.transition = "all 1.5s ease";
    });
}

const carousel_container = document.getElementById("carousel_container");
const carousel_items = document.getElementsByClassName("carousel-item");
const carousel_item_background = [
    '/img/carousel/background/botol1.jpg',
    '/img/carousel/background/botol2.jpg',
    '/img/carousel/background/botol3.jpg',
    '/img/carousel/background/botol4.jpg'
];

const back_button = document.getElementById("back_button");
const next_button = document.getElementById("next_button");

let current_transform = 0;
initialize(carousel_items, carousel_container);

let clickable_flag = true;
let background_index = 0;
let current_active_item = 1;
back_button.addEventListener("click",() => {
    if(clickable_flag) {
        apply_transition();
        clickable_flag = false;
        Array.from(carousel_items).forEach((element,i) => {
            const current_transform_value = getComputedStyle(element).getPropertyValue("transform");
            const matrix = new DOMMatrixReadOnly(current_transform_value);
            element.style.transform = `translateX(${current_transform + 100}%)`
            element.childNodes[1].style.transform = 'rotate(20deg)'
        });
        current_transform += 100;
        setTimeout(()=>{
            check_index();
            clickable_flag = true;
        },1400);
        if(--background_index === -1){
            background_index = carousel_item_background.length - 1;
        }
        carousel_container.style.backgroundImage = `url(${carousel_item_background[background_index]})`
        --current_active_item;
    }
});

next_button.addEventListener("click",() => {
    if(clickable_flag) {
        apply_transition();
        clickable_flag = false;
        Array.from(carousel_items).forEach((element) => {
        const current_transform_value = getComputedStyle(element).getPropertyValue("transform");
        const matrix = new DOMMatrixReadOnly(current_transform_value);
        element.style.transform = `translateX(${current_transform - 100}%)`
        element.childNodes[1].style.transform = 'rotate(-20deg)'
    });
    current_transform -= 100;
    setTimeout(()=>{
        check_index();
        clickable_flag = true;
    },1400);
    if(++background_index === carousel_item_background.length){
        background_index = 0;
    }
    carousel_container.style.backgroundImage = `url(${carousel_item_background[background_index]})`
    ++current_active_item;
    }
});

//EVENT LISTENER
Array.from(carousel_items).forEach((element) => {
    element.addEventListener('transitionend',() => {
        element.style.transform = `translateX(${current_transform}%)`;
        element.style.transition = "all 0s"
        element.childNodes[1].style.transform = 'rotate(0deg)';        
    });
});