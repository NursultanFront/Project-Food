/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function calc() {
    // Calculator

    const result = document.querySelector(".calculating__result span"); // Поулчаем текст вывода

    let sex, height, weight, age, ratio; // Создаем переменныее

    if (localStorage.getItem("sex")) {
        sex = localStorage.getItem("sex");
    } else {
        sex = "female";
        localStorage.setItem("sex", "female"); // По умолчанию у нас sex будет female
    }

    if (localStorage.getItem("ratio")) {
        ratio = localStorage.getItem("ratio");
    } else {
        ratio = 1.375;
        localStorage.setItem("ratio", 1.375); // По умолчанию у нас ratio будет 1.375
    }

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            // Если у нас не введен хотя бы один из параметров то ничего не будет
            result.textContent = "____";
            return; // Останавливает функцию не позволяя идти дальше
        }

        // Форумла для вычисления калории можно найти в интернете
        if (sex === "female") {
            result.textContent = Math.round(
                (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
            );
        } else {
            result.textContent = Math.round(
                (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
            );
        }
    }

    calcTotal();

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach((elem) => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute("id") === localStorage.getItem("sex")) {
                // Если оба значения из Local Storage совпадают то добавляем класс активности
                elem.classList.add(activeClass);
            }
            if (
                elem.getAttribute("data-ratio") ===
                localStorage.getItem("ratio")
            ) {
                // Если оба значения из Local Storage совпадают то добавляем класс активности
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings("#gender div", "calculating__choose-item_active");
    initLocalSettings(
        ".calculating__choose_big div",
        "calculating__choose-item_active"
    );

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach((elem) => {
            elem.addEventListener("click", (e) => {
                if (e.target.getAttribute("data-ratio")) {
                    // Если по клику в if true, то
                    ratio = +e.target.getAttribute("data-ratio"); // Присваеваем в переменную ratio данные из атрибута
                    localStorage.setItem(
                        "ratio",
                        +e.target.getAttribute("data-ratio") // Здесь устанавливаем данные для local storage
                    );
                } else {
                    sex = e.target.getAttribute("id");
                    localStorage.setItem("sex", e.target.getAttribute("id"));
                }

                elements.forEach((elem) => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                calcTotal();
            });
        });
    }

    getStaticInformation("#gender div", "calculating__choose-item_active");
    getStaticInformation(
        ".calculating__choose_big div",
        "calculating__choose-item_active"
    );

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener("input", () => {
            if (input.value.match(/\D/g)) {
                // если пользователь ввел буквы то появляется красный бордер
                input.style.border = "1px solid red";
            } else {
                input.style.border = "none";
            }
            switch (input.getAttribute("id")) {
                // Если у введенного атрибута id будет к примеру height то
                case "height":
                    height = +input.value;
                    // То к переменной height прибавиться введенное значение
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDynamicInformation("#height");
    getDynamicInformation("#weight");
    getDynamicInformation("#age");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    // Исполльзуем классы для карточек

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

    // // Axios тоже можно получить карточки
    // axios.get("http://localhost:3000/menu").then((base) => {
    //     base.data.forEach(({ img, altimg, title, descr, price }) => {
    //         new MenuCard(
    //             img,
    //             altimg,
    //             title,
    //             descr,
    //             price,
    //             ".menu .container"
    //         ).render();
    //     });
    // });

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResouce)("http://localhost:3000/menu").then((data) => {
        // так как к нам ответ приходит в виде массива то перебирем его, и используем деструктуризацию
        data.forEach(({ img, altimg, title, descr, price }) => {
            new MenuCard(
                img,
                altimg,
                title,
                descr,
                price,
                ".menu .container"
            ).render();
        });
    });

    //Создаем объект который без ссылки (let div = menuCard) то есть используется один раз
    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     ".menu .container"
    // ).render();

    // new MenuCard(
    //     "img/tabs/post.jpg",
    //     "post",
    //     'Меню "Постное"',
    //     "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    //     14,
    //     ".menu .container"
    // ).render();

    // new MenuCard(
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     "Меню “Премиум”",
    //     "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    //     21,
    //     ".menu .container"
    // ).render();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _modals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modals */ "./js/modules/modals.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



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

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", JSON.stringify(object))
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
        (0,_modals__WEBPACK_IMPORTED_MODULE_0__.openModal)(".modal", modalTimerId); // Вызываем основное модальное окно

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
            (0,_modals__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");
        }, 5000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/modals.js":
/*!******************************!*\
  !*** ./js/modules/modals.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "closeModal": () => /* binding */ closeModal,
/* harmony export */   "openModal": () => /* binding */ openModal
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modals);




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function slider() {
    // --------------------- Slider-----------------//

    let slideIndex = 1;
    const slides = document.querySelectorAll(".offer__slide"),
        prev = document.querySelector(".offer__slider-prev"),
        next = document.querySelector(".offer__slider-next"),
        total = document.querySelector("#total"),
        current = document.querySelector("#current");

    showSlides(slideIndex);

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => (item.style.display = "none"));

        slides[slideIndex - 1].style.display = "block";

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function plusSlides(n) {
        showSlides((slideIndex += n));
    }

    prev.addEventListener("click", function () {
        plusSlides(-1);
    });

    next.addEventListener("click", function () {
        plusSlides(1);
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function tabs(
    tabsSelector,
    tabsContentSelector,
    tabsParentSelector,
    activeClass
) {
    //----------------------Tabs------------------//

    const tabs = document.querySelectorAll(tabsSelector); // Табы (фитнес, премиум, постное и сбалансированное)
    const tabsContent = document.querySelectorAll(tabsContentSelector); // Контент табов (картинки и описание)
    const tabsParent = document.querySelector(tabsParentSelector); // Родитель tabs

    // Функция чтобы спрятать (очистить) табы
    function hideTabContent() {
        tabsContent.forEach((item) => {
            item.classList.add("hide"); // Добавляем класс Hide
            item.classList.remove("show", "fade"); // Удаляем класс Show
        });

        tabs.forEach((item) => {
            item.classList.remove(activeClass); // Удаляем класс активности
        });
    }
    // Функция чтобы показать табы
    function showTabContent(i = 0) {
        tabsContent[i].classList.add("show", "fade"); // Добавляем класс Show
        tabsContent[i].classList.remove("hide"); // Удаляем класс hide
        tabs[i].classList.add(activeClass); // добавляем класс активности (только одному)
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function timer(id, deadline) {
    //---------------------- Timer ---------------//

    //Шаблон для таймера

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

    setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modals */ "./js/modules/modals.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");








window.addEventListener("DOMContentLoaded", () => {
    const modalTimerId = setTimeout(function () {
        (0,_modules_modals__WEBPACK_IMPORTED_MODULE_1__.openModal)(".modal", modalTimerId);
    }, 2000); // Таймер для открытия Модального Окна

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)(
        ".tabheader__item",
        ".tabcontent",
        ".tabheader__items",
        "tabheader__item_active"
    );
    (0,_modules_modals__WEBPACK_IMPORTED_MODULE_1__.default)("[data-modal]", ".modal", modalTimerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__.default)(".timer", "2021-03-02");
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__.default)();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__.default)();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__.default)("form", modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__.default)();
});


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => /* binding */ postData,
/* harmony export */   "getResouce": () => /* binding */ getResouce
/* harmony export */ });
// Создаем функцию для постинга данных url это адрес, а data это данные для постинга
const postData = async (url, data) => {
    //внутри функции будет асинхроннйы код async
    const res = await fetch(url, {
        // Оператор await заставляет дождаться от fetch результата и тогда код идет дальше
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: data,
    });

    return await res.json(); // Возвращаем промис
};

// Получаем карточки с меню
const getResouce = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        // если будет ошибка то
        throw new Error(`Could not Fetch ${url}, status ${res.status}`);
    }

    return await res.json(); // декодирует ответ в формате JSON,
};





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map