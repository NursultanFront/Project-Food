import { closeModal, openModal } from "./modals";
import { postData } from "../services/services";

function forms(formsSelector, modalTimerId) {
    //---------------------- Forms -----------//

    const forms = document.querySelectorAll(formsSelector); // Получаем все формы

    // Объект для message
    const message = {
        loading: "img/forms/spinner.svg",
        success: "Спасибо!!! Скоро мы с вами свяжемся",
        failure: "Что то пошло не так",
    };
    // Так как у нас много форм мы вызываем функцию для
    forms.forEach((item) => {
        bindPostData(item);
    });

    // Функция которая привязывет постинг данных
    function bindPostData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault(); // Отменяем стандартное поведение браузера(то есть не перезагружаеися)

            //Когда пользователь нажимает submit, то
            let statusMessage = document.createElement("img"); // Создается изображение
            statusMessage.src = message.loading; // Нужно обязательно атрибут src для изображении
            statusMessage.style.cssText = `
            display:block;
            margin:0 auto;
        `;
            form.insertAdjacentElement("afterend", statusMessage); // Метод который позволяет помещать элемент внизу form

            const formData = new FormData(form); // Объект который отправляет данные из form

            const object = {}; // Так как FormData не превращается в JSON формат, то мы создаем объект (object) и при помощи forEach мы заполняем его теми данными которые были в FormData
            formData.forEach(function (value, key) {
                object[key] = value;
            });

            postData("http://localhost:3000/requests", JSON.stringify(object))
                .then((data) => {
                    // с Сервера возвращается data
                    console.log(data);
                    showThanksModal(message.success); //Запускается функция с надписью спасибо и все такое
                    statusMessage.remove(); // Удаляем наш spinner то есть img
                })
                .catch(() => {
                    // catch для обработки ошибки
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    // Независимо от того что операция была успешно или была ошибкой он все равно сработает и
                    form.reset(); // очистит форму
                });
        });
    }

    // Красивое оповещение пользователя
    function showThanksModal(message) {
        // Создаем функцию показа Модального окна и сюда записываем message
        const prevModalDialog = document.querySelector(".modal__dialog"); //Получаем диалоговое модальное окно

        prevModalDialog.classList.add("hide"); // Затем скрываем его
        openModal(".modal", modalTimerId); // Вызываем основное модальное окно

        const thanksModal = document.createElement("div"); // Создаем DIV
        thanksModal.classList.add("modal__dialog"); // Добвляем ему класс .modal__dialog, а потом добавляем верстку
        thanksModal.innerHTML = `
    <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
    </div>
    `;

        document.querySelector(".modal").append(thanksModal);
        // Что бы при повторном открытии модальное окно имело первоначальный вид мы создаем функцию
        setTimeout(() => {
            thanksModal.remove(); // Удаляется модальное окно которое мы создали
            prevModalDialog.classList.add("show"); // Добвляем класс show что бы вернуть изначальное модальное окно
            prevModalDialog.classList.remove("hide");
            closeModal(".modal");
        }, 5000);
    }
}

export default forms;
