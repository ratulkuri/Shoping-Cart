
export const toggleModal = ({...props}) => {
    let {triggerElm, targetElm = null} = props

    if(!!triggerElm) {
        if(!targetElm) {
            let targetElmSelector = triggerElm.getAttribute("data-modal-target");
            targetElm = document.querySelector(targetElmSelector);
        }

        if (!!targetElm) {
            if (targetElm.classList.contains("show")) {
                // const hideModalEvent = new CustomEvent("modal.hide", {
                //     detail: {},
                //     bubbles: true,
                //     cancelable: true,
                //     composed: false,
                // });
                targetElm.classList.remove("show");
                // targetElm.dispatchEvent(hideModalEvent);
            } else {
                // const showModalEvent = new CustomEvent("modal.show", {
                //     detail: {},
                //     bubbles: true,
                //     cancelable: true,
                //     composed: false,
                // });
                targetElm.classList.add("show");
                // targetElm.dispatchEvent(showModalEvent);
            }
        }
    }
}