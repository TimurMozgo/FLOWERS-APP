// 1. Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand(); // Разворачиваем на весь экран

// 2. Навигация: Переход с главного экрана к категориям
// Это оживляет кнопку "Смотреть каталог"
function showCategories() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('categories-screen').style.display = 'flex';
}

// 3. Навигация: Переход от товаров назад к категориям
function goBack() {
    document.getElementById('shop-screen').style.display = 'none';
    document.getElementById('categories-screen').style.display = 'flex';
}

// 4. Основная функция: Показ товаров выбранной категории
function showCategory(type) {
    // Скрываем экран категорий
    document.getElementById('categories-screen').style.display = 'none';
    
    const shop = document.getElementById('shop-screen');
    const grid = document.getElementById('products-grid');
    const title = document.getElementById('category-title');
    
    // Показываем экран магазина
    shop.style.display = 'flex';
    grid.innerHTML = ''; // Очищаем сетку перед добавлением новых товаров

    let items = [];

    // Наполняем базу товаров (6 категорий как ты просил)
    if (type === 'bouquets') {
        title.innerText = "БУКЕТЫ";
        items = [
            { name: 'Букет "Весна"', price: 850, icon: '🌸' },
            { name: 'Розы Микс', price: 1200, icon: '🌹' }
        ];
    } else if (type === 'dacha') {
        title.innerText = "ДЛЯ ДАЧИ";
        items = [
            { name: 'Туя Смарагд', price: 450, icon: '🌲' },
            { name: 'Лопата (титан)', price: 800, imgUrl: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=300' },
            { name: 'Перчатки', price: 150, imgUrl: 'https://images.unsplash.com/photo-1589923158776-cb4485d99fd6?w=300' }
        ];
    } else if (type === 'seeds') {
        title.innerText = "СЕМЕНА";
        items = [
            { name: 'Петуния', price: 120, icon: '🌱' },
            { name: 'Астры', price: 90, icon: '🌻' }
        ];
    } else if (type === 'fertilizers') {
        title.innerText = "УДОБРЕНИЯ";
        items = [
            { name: 'Азот', price: 250, icon: '🧪' },
            { name: 'Органика', price: 300, icon: '💩' }
        ];
    } else if (type === 'care') {
        title.innerText = "ИНСТРУМЕНТЫ";
        items = [
            { name: 'Секатор', price: 400, icon: '✂️' },
            { name: 'Лейка', price: 350, icon: '🚿' }
        ];
    } else if (type === 'pots') {
        title.innerText = "КОМНАТНЫЕ";
        items = [
            { name: 'Драцена', price: 900, icon: '🪴' },
            { name: 'Кактус', price: 200, icon: '🌵' }
        ];
    }

    // Создаем карточки товаров программно
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        
        // Выбираем: показать фото или эмодзи
        const media = item.imgUrl 
            ? `<img src="${item.imgUrl}" class="card-img">`
            : `<div class="icon">${item.icon}</div>`;

        card.innerHTML = `
            ${media}
            <p class="product-name">${item.name}</p>
            <p class="price">${item.price} грн</p>
            <button class="btn" onclick="order('${item.name}', ${item.price})">Заказать</button>
        `;
        grid.appendChild(card);
    });
}

function order(itemName, itemPrice) {
    tg.showConfirm(`Заказать ${itemName} за ${itemPrice} грн?`, (confirmed) => {
        if (confirmed) {
            // Показываем плашку "Подождите..."
            tg.MainButton.setText("ОТПРАВКА ЗАКАЗА...");
            tg.MainButton.show();
            tg.MainButton.disable();

            // 2. Данные для отправки
            const orderData = {
                user: tg.initDataUnsafe.user?.username || "Anonymous",
                userId: tg.initDataUnsafe.user?.id,
                product: itemName,
                price: itemPrice,
                date: new Date().toLocaleString()
            };

            // 3. ОТПРАВКА В n8n (замени URL на свой из n8n)
            fetch('https://tiktiok.xyz/webhook-test/e9d8d207-1c6b-44c2-a053-c41479cb32e6', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            })
            .then(response => {
                if (response.ok) {
                    tg.showAlert("✅ Заказ отправлен! Аудитор скоро свяжется с вами.");
                } else {
                    tg.showAlert("❌ Ошибка при отправке. Попробуйте позже.");
                }
            })
            .catch(error => {
                tg.showAlert("⚠️ Ошибка сети. Проверьте соединение.");
            })
            .finally(() => {
                tg.MainButton.hide(); // Прячем кнопку загрузки
            });
        }
    });
}