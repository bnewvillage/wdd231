const button = document.querySelector('#open-modal');
const dialog = document.querySelector('#dialog');
const noButton = document.querySelector('#not-tired');
const yesButton = document.querySelector('#tired');

button.addEventListener(`click`,()=>
    dialog.showModal());

noButton.addEventListener(`click`, ()=>{
    dialog.close();
});

yesButton.addEventListener(`click`, ()=>{
    dialog.close();
});