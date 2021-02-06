import tabs from "./modules/tabs";
import modals, { openModal } from "./modules/modals";
import timer from "./modules/timer";
import cards from "./modules/cards";
import calc from "./modules/calc";
import forms from "./modules/forms";
import slider from "./modules/slider";

window.addEventListener("DOMContentLoaded", () => {
    const modalTimerId = setTimeout(function () {
        openModal(".modal", modalTimerId);
    }, 2000); // Таймер для открытия Модального Окна

    tabs(
        ".tabheader__item",
        ".tabcontent",
        ".tabheader__items",
        "tabheader__item_active"
    );
    modals("[data-modal]", ".modal", modalTimerId);
    timer(".timer", "2021-03-02");
    cards();
    calc();
    forms("form", modalTimerId);
    slider();
});
