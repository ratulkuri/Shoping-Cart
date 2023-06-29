
export const toggleModal = ({...props}) => {
    let {triggerElm, targetElm = null} = props

    if(!!triggerElm) {
        if(!targetElm) {
            let targetElmSelector = triggerElm.getAttribute("data-modal-target");
            targetElm = document.querySelector(targetElmSelector);
        }

        if (!!targetElm) {
            if (targetElm.classList.contains("show")) {
                targetElm.classList.remove("show");
            } else {
                targetElm.classList.add("show");
            }
        }
    }
}