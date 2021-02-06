// Алгоритм: открытие модального окна и закрытие модального окна
// Функция открытия
function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add("show"); // Добавляем класс show чтобы увидеть
    modal.classList.remove("hide"); // Удаляем класс
    document.body.style.overflow = "hidden"; // чтобы пропал скролл

    if (modalTimerId) {
        clearInterval(modalTimerId); // Если мы вызывали сами это модальное окно то оно отменяет SetTimeOut
    }
}

// Функция Закрытия

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
}

function modals(triggerSelector, modalSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggerSelector); // buttons которые вызывают модальные окна
    const modal = document.querySelector(modalSelector); // само мадальное окно

    //Открытие модального окна
    modalTrigger.forEach((btn) => {
        btn.addEventListener("click", () =>
            openModal(modalSelector, modalTimerId)
        );
    });

    // modalCloseBtn.addEventListener("click", closeModal);

    // Здесь Модальное окно закрывается если мы нажмём вне модального окна
    modal.addEventListener("click", (e) => {
        console.log(e);
        if (e.target === modal || e.target.getAttribute("data-close") === "") {
            closeModal(modalSelector);
        }
    });
    // Здесь закрывается если мы нажмем Esc и если у modal есть класс show
    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            closeModal(modalSelector);
        }
    });

    // Функция для показа модального окна по окончания скролла (ШАБЛОН)
    function showModalByScroll() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight
        ) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener("scroll", showModalByScroll); // Удаляет Листенер когда один раз выполняется функция, то есть оно срабатывает один раз и все!!!
        }
    }

    window.addEventListener("scroll", showModalByScroll); // Сам Листенер для скролла
}

export default modals;
export { closeModal };
export { openModal };
