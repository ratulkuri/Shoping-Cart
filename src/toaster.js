const closeToast = (wrapperElm, toastElm) => {
    toastElm.remove();
    if(!wrapperElm.hasChildNodes()) {
        wrapperElm.classList.add("hidden")
    }
}

export const Swipe = ({parent, main, left, right, actionLeft, actionRight, distance = 80, autoHide, duration}) => {
    if(main !== undefined && parent !== undefined) {
        const minDistance = distance;
        let swipeContainer = document.createElement("div");
        swipeContainer.classList.add("swiper-container");

        let leftElementTemplate = `<div class="action left-element"></div>`;
        let swipeElementTemplate = `<div class="swipe-element"></div>`;
        let rightElementTemplate = `<div class="action right-element"></div>`;

        if(actionLeft !== undefined) {
            swipeContainer.innerHTML = leftElementTemplate;
            if(left !== undefined) {
                let leftElement = swipeContainer.querySelector(".action.left-element");
                leftElement.innerHTML = left;
            }
        }

        swipeContainer.innerHTML += swipeElementTemplate;
        let swipeElement = swipeContainer.querySelector(".swipe-element");
        swipeElement.appendChild(main);

        if(actionRight !== undefined) {
            swipeContainer.innerHTML += rightElementTemplate;
            if(right !== undefined) {
                let rightElement = swipeContainer.querySelector(".action.right-element");
                rightElement.innerHTML = right;
            }
        }

        parent.appendChild(swipeContainer);

        if(autoHide) {
            main.classList.add("auto-hide");
            setTimeout(() => closeToast(parent, swipeContainer), duration);
        }

        swipeContainer.querySelector(".close-toaster").addEventListener("click", (e) => {
            closeToast(parent, swipeContainer);
        })

        swipeContainer.addEventListener("touchend", (e) => {
            // console.log(e);

            const swipeDistance = swipeContainer.scrollLeft - swipeContainer.clientWidth;
            // console.log(swipeDistance, swipeContainer.scrollLeft, swipeContainer.clientWidth);
            if(actionLeft !== undefined && actionRight !== undefined) {
                if (swipeDistance < minDistance * -1) {
                    console.log('swiped left')
                    if(actionLeft !== undefined && typeof actionLeft === "function") {
                        actionLeft();
                        swipeContainer.remove();
                    }
                } else if (swipeDistance > minDistance) {
                    console.log('swiped right')
                    if(actionRight !== undefined && typeof actionRight === "function") {
                        actionRight();
                        swipeContainer.remove();
                    }
                }
            } else if(actionLeft !== undefined) {
                if (swipeDistance * -1 > minDistance) {
                    console.log("swiped right");
                    actionLeft();
                    swipeContainer.remove();
                }
            } else if(actionRight !== undefined) {
                if (swipeContainer.scrollLeft > minDistance) {
                    console.log("swiped right");
                    actionRight();
                    swipeContainer.remove();
                }
            }

        })
        // swipeContainer.addEventListener("touchend", () => {
        //     console.log("swipe touchend triggered");
        //     const swipeDistance = swipeContainer.scrollLeft - swipeContainer.clientWidth;
        //     console.log(swipeDistance, swipeContainer.scrollLeft, swipeContainer.clientWidth);
        //     if (swipeDistance < minDistance * -1) {
        //         console.log('swiped left')
        //         if(actionLeft !== undefined && typeof actionLeft === "function") {
        //             actionLeft();
        //             swipeContainer.remove()
        //         }
        //     } else if (swipeDistance > minDistance) {
        //         console.log('swiped right')
        //         if(actionRight !== undefined && typeof actionRight === "function") {
        //             actionRight();
        //             swipeContainer.remove()
        //         }
        //     } else {
        //         console.log(`did not swipe ${minDistance}px`)
        //     }
        // })

    } else {
        return false
    }

}

const success = ({message, autoHide = true, duration = 5000, swipe = false}) => {
    if (!message) {
        return false
    }
    let toastWrapper = document.querySelector(".toast-wrapper");
    if(!toastWrapper) {
        toastWrapper = document.createElement("div");
        toastWrapper.classList.add("toast-wrapper");
        document.querySelector("body").appendChild(toastWrapper);
    }

    let successToast = document.createElement("div");
    successToast.classList.add("toast", "success");
    successToast.setAttribute("role", "alert");

    let successHtml = `
    <div class="z-10 inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
        <span class="sr-only">Check icon</span>
    </div>
    <div class="z-10 message ml-4 mr-10 text-sm font-normal">${message}</div>
    <button type="button" class="close-toaster z-10 ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>`

    successToast.innerHTML = successHtml;

    if(toastWrapper?.classList?.contains("hidden")){
        toastWrapper.classList.remove("hidden")
    }

    if (swipe) {
        Swipe({
            parent: toastWrapper,
            main: successToast,
            actionRight: () => closeToast(toastWrapper, successToast),
            distance: 120,
            autoHide: autoHide,
            duration: duration,
        })
    } else {
        toastWrapper.appendChild(successToast);
        if(autoHide) {
            successToast.classList.add("auto-hide");
            setTimeout(() => closeToast(toastWrapper, successToast), duration);
        }

        successToast.querySelector(".close-toaster").addEventListener("click", () => {
            closeToast(toastWrapper, successToast)
        })
    }


}

const error = ({message, autoHide = true, duration = 5000, swipe = false}) => {
    let toastWrapper = document.querySelector(".toast-wrapper");
    if(!toastWrapper) {
        toastWrapper = document.createElement("div");
        toastWrapper.classList.add("toast-wrapper");
        document.querySelector("body").appendChild(toastWrapper);
    }

    let errorToast = document.createElement("div");
    errorToast.classList.add("toast", "error");
    errorToast.setAttribute("role", "alert");

    let errorHtml = `
    <div class="z-10 inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        <span class="sr-only">Error icon</span>
    </div>
    <div class="z-10 message ml-4 mr-10 text-sm font-normal">${message}</div>
    <button type="button" class="close-toaster z-10 ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>`

    errorToast.innerHTML = errorHtml;

    if(toastWrapper?.classList?.contains("hidden")){
        toastWrapper.classList.remove("hidden")
    }

    if (swipe) {
        Swipe({
            parent: toastWrapper,
            main: errorToast,
            actionRight: () => closeToast(toastWrapper, errorToast),
            distance: 120,
            autoHide: autoHide,
            duration: duration,
        })
    } else {
        toastWrapper.appendChild(errorToast);
    }

    if(autoHide) {
        errorToast.classList.add("auto-hide");
        setTimeout(() => closeToast(toastWrapper, errorToast), duration);
    }
    errorToast.querySelector(".close-toaster").addEventListener("click", () => {
        closeToast(toastWrapper, errorToast)
    })
}

const warning = ({message, autoHide = true, duration = 5000, swipe = false}) => {
    let toastWrapper = document.querySelector(".toast-wrapper");
    if(!toastWrapper) {
        toastWrapper = document.createElement("div");
        toastWrapper.classList.add("toast-wrapper");
        document.querySelector("body").appendChild(toastWrapper);
    }

    let warningToast = document.createElement("div");
    warningToast.classList.add("toast", "warning");
    warningToast.setAttribute("role", "alert");

    let warningHtml = `
    <div class="z-10 inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
        <span class="sr-only">Warning icon</span>
    </div>
    <div class="z-10 message ml-4 mr-10 text-sm font-normal">${message}</div>
    <button type="button" class="close-toaster z-10 ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>`

    warningToast.innerHTML = warningHtml;

    if(toastWrapper?.classList?.contains("hidden")){
        toastWrapper?.classList?.remove("hidden")
    }

    if (swipe) {
        Swipe({
            parent: toastWrapper,
            main: warningToast,
            actionRight: () => closeToast(toastWrapper, warningToast),
            distance: 120,
            autoHide: autoHide,
            duration: duration,
        })
    } else {
        toastWrapper.appendChild(warningToast);
        if(autoHide) {
            warningToast.classList.add("auto-hide");
            setTimeout(() => closeToast(toastWrapper, warningToast), duration);
        }
        warningToast.querySelector(".close-toaster").addEventListener("click", () => {
            closeToast(toastWrapper, warningToast)
        })
    }

}

const Toast = {
    success,
    error,
    warning
}

export default Toast;