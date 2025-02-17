//modal toggle open close
export function modalToggle(card, modal, button){
    card.addEventListener(`click`, ()=>{
        modal.showModal();
        
    });

    button.addEventListener(`click`, ()=>{
        modal.close();
    });
}