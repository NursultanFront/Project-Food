window.addEventListener("DOMContentLoaded", () => {
    //----------------------Tabs------------------//

    const tabs = document.querySelectorAll(".tabheader__item"); // Табы (фитнес, премиум, постное и сбалансированное)
    const tabsContent = document.querySelectorAll(".tabcontent"); // Контент табов (картинки и описание)
    const tabsParent = document.querySelector(".tabheader__items"); // Родитель tabs

    // Функция чтобы спрятать (очистить) табы
    function hideTabContent() {
        tabsContent.forEach((item) => {
            item.classList.add("hide"); // Добавляем класс Hide
            item.classList.remove("show", "fade"); // Удаляем класс Show
        });

        tabs.forEach((item) => {
            item.classList.remove("tabheader__item_active"); // Удаляем класс активности
        });
    }
    // Функция чтобы показать табы
    function showTabContent(i = 0) {
        tabsContent[i].classList.add("show", "fade"); // Добавляем класс Show
        tabsContent[i].classList.remove("hide"); // Удаляем класс hide
        tabs[i].classList.add("tabheader__item_active"); // добавляем класс активности (только одному)
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;

        if (target && target.classList.contains("tabheader__item")) {
            console.log(target);
            //Если у таргета имеется класс tabheader__item
            tabs.forEach((item, i) => {
                //Тогда перебираем табы
                if (target == item) {
                    //если таргет и item совпадают то...
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //---------------------- Timer ---------------//

    //Шаблон для таймера

    const deadline = "2021-02-03";
    function getTimeRemainning(endtime) {
        //функция получить разницу между датами!!!
        const t = Date.parse(endtime) - Date.parse(new Date()); // Date.parse метод Date, смотри в интернете
        const days = Math.floor(t / (1000 * 60 * 60 * 24)); // Дни считаются милисекундами,поэтому оставшиейся дни (t) мы разделяем на сколько милисекнуд в одном дне
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24); // %24 показывает оставшиейся время
        const minutes = Math.floor((t / 1000 / 60) % 60); // опять таки как и в прошлый раз
        const seconds = Math.floor((t / 1000) % 60); // опять таки как и в прошлый раз

        return {
            //создаем объект и возвращаем его/ по сути эта функция возвращает объект
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }

    function getZero(num) {
        // Функция помощник для того чтобы сделать числа в таймере двухзначными(вместо 9 дней будет 09 дней)
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector("#days");
        const hours = timer.querySelector("#hours");
        const minutes = timer.querySelector("#minutes");
        const seconds = timer.querySelector("#seconds");
        const timeInterval = setInterval(updateClock, 1000);

        updateClock(); //чтобы когда обновляли цифры в счетчике не ждали секунду

        function updateClock() {
            const obj = getTimeRemainning(endtime); //отсюда получаем объект из функции

            days.innerHTML = getZero(obj.days);
            hours.innerHTML = getZero(obj.hours);
            minutes.innerHTML = getZero(obj.minutes);
            seconds.innerHTML = getZero(obj.seconds);

            if (obj.total <= 0) {
                //Если счетчик станет равен нулю или отрицателен, то оно прекратит функцию timeInterval
                clearInterval(timeInterval);
            }
        }
    }

    setClock(".timer", deadline);

    //---------------------Modal--------------//

    const modalTrigger = document.querySelectorAll("[data-modal]"); // buttons которые вызывают модальные окна
    const modal = document.querySelector(".modal"); // само мадальное окно

    // Алгоритм: открытие модального окна и закрытие модального окна
    // Функция открытия
    function openModal() {
        modal.classList.add("show"); // Добавляем класс show чтобы увидеть
        modal.classList.remove("hide"); // Удаляем класс
        document.body.style.overflow = "hidden"; // чтобы пропал скролл

        clearInterval(modalTimerId); // Если мы вызывали сами это модальное окно то оно отменяет SetTimeOut
    }

    //Открытие модального окна
    modalTrigger.forEach((btn) => {
        btn.addEventListener("click", openModal);
    });
    // Функция Закрытия

    function closeModal() {
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }
    // modalCloseBtn.addEventListener("click", closeModal);

    // Здесь Модальное окно закрывается если мы нажмём вне модального окна
    modal.addEventListener("click", (e) => {
        console.log(e);
        if (e.target === modal || e.target.getAttribute("data-close") === "") {
            closeModal();
        }
    });
    // Здесь закрывается если мы нажмем Esc и если у modal есть класс show
    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 30000); // Таймер для открытия Модального Окна

    // Функция для показа модального окна по окончания скролла (ШАБЛОН)
    function showModalByScroll() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight
        ) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll); // Удаляет Листенер когда один раз выполняется функция, то есть оно срабатывает один раз и все!!!
        }
    }

    window.addEventListener("scroll", showModalByScroll); // Сам Листенер для скролла

    //-------------------Classes--------------//

    class MenuCard {
        //всегда с большой буквы // Добавляем rest Оператор ...classes (Массив)
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector); //Здесь лежит DOM элемент
            this.transfer = 420;
            this.changeToTenge();
        }
        changeToTenge() {
            this.price = this.price * this.transfer;
        }

        render() {
            // Cоздаем Div
            const element = document.createElement("div");
            //Так как classes это массив, то проверяем его на length
            if (this.classes.length === 0) {
                this.element = "menu__item";
                element.classList.add(this.element);
            } else {
                this.classes.forEach((className) =>
                    element.classList.add(className)
                );
            }
            // Создаем HTML структуру
            element.innerHTML = ` 
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> тенге/день</div>
                </div>
            `;
            // Добавляем этот DOM элемент в parent
            this.parent.append(element);
        }
    }

    //Создаем объект который без ссылки (let div = menuCard) то есть используется один раз
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        14,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        "Меню “Премиум”",
        "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
        21,
        ".menu .container"
    ).render();

    //---------------------- Forms -----------//

    const forms = document.querySelectorAll("form"); // Получаем все формы

    // Объект для message
    const message = {
        loading: "img/forms/spinner.svg",
        success: "Спасибо!!! Скоро мы с вами свяжемся",
        failure: "Что то пошло не так",
    };
    // Так как у нас много форм мы вызываем функцию для
    forms.forEach((item) => {
        postData(item);
    });

    // Функция которая отвечает за постинг данных
    function postData(form) {
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

            // Настраиваем fetch
            fetch("server.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(object), // здесь object превращаем в JSON формат
            })
                .then((data) => data.text())
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
        openModal(); // Вызываем основное модальное окно

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
        }, 5000);
    }
});

//
