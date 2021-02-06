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

export default timer;
