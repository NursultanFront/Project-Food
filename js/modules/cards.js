import { getResouce } from "../services/services";

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

    getResouce("http://localhost:3000/menu").then((data) => {
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

export default cards;
