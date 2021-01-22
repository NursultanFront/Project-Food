window.addEventListener("DOMContentLoaded", () => {
    //Tabs

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

    // Timer

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

    //Шаблон для таймера
});
