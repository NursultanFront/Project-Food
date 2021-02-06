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

export default tabs;
