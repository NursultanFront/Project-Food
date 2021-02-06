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

export { postData };
export { getResouce };
