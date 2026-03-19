// --- Инициализация Telegram WebApp ---
const tg = window.Telegram.WebApp;
tg.expand();

// --- 1. ФУНКЦИИ НАВИГАЦИИ (Решают проблему кнопки) ---

// Функция, которая оживляет кнопку "Смотреть каталог"
function showCategories() {
    // Прячем приветствие
    document.getElementById('welcome-screen').style.display = 'none';
    // Показываем категории
    document.getElementById('categories-screen').style.display = 'flex';
}

// Функция, которая оживляет кнопку "Назад" в каталоге
function goBack() {
    // Прячем каталог товаров
    document.getElementById('shop-screen').style.display = 'none';
    // Возвращаем категории
    document.getElementById('categories-screen').style.display = 'flex';
}

// --- 2. ФУНКЦИЯ КАТАЛОГА (Показ товаров) ---

function showCategory(type) {
    // Скрываем плитки категорий
    document.getElementById('categories-screen').style.display = 'none';
    const shop = document.getElementById('shop-screen');
    const grid = document.getElementById('products-grid');
    const title = document.getElementById('category-title');
    
    // Показываем экран магазина
    shop.style.display = 'flex';
    grid.innerHTML = ''; // Чистим сетку перед загрузкой новых товаров

    let items = [];

    // ТВОИ ТОВАРЫ (я добавил новые для теста)
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
            // ТОВАРЫ С КАРТИНКАМИ
            { 
                name: 'Лопата (титан)', 
                price: 800, 
                imgUrl: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=300&q=80' 
            },
            { 
                name: 'Перчатки садовые', 
                price: 150, 
                imgUrl: 'https://images.unsplash.com/photo-1589923158776-cb4485d99fd6?auto=format&fit=crop&w=300&q=80' 
            }
        ];
    } 
    // НОВЫЕ ТОВАРЫ ДЛЯ НОВЫХ КАТЕГОРИЙ (с круглыми картинками)
    else if (type === 'seeds') {
        title.innerText = "СЕМЕНА";
        items = [
            { name: 'Семена Петунии', price: 120, icon: '🌱' }
        ];
    } else if (type === 'fertilizers') {
        title.innerText = "УДОБРЕНИЯ";
        items = [
            { name: 'Жидкий Азот', price: 250, icon: '🧪' }
        ];
    } else if (type === 'care') {
        title.innerText = "ИНСТРУМЕНТЫ";
        items = [
            { name: 'Секатор', price: 400, icon: '✂️' }
        ];
    } else if (type === 'pots') {
        title.innerText = "КОМНАТНЫЕ";
        items = [
            { name: 'Драцена', price: 900, icon: '🪴' }
        ];
    }

    // Создаем карточки товаров
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        
        // Логика: если есть imgUrl, выводим тег img, иначе выводим эмодзи
        const productMedia = item.imgUrl 
            ? `<img src="${item.imgUrl}" alt="${item.name}" class="card-img">`
            : `<div class="icon">${item.icon}</div>`;

        card.innerHTML = `
            ${productMedia}
            <p class="product-name">${item.name}</p>
            <p class="price">${item.price} грн</p>
            <button class="btn" onclick="order('${item.name}', ${item.price})">Купить</button>
        `;
        grid.appendChild(card);
    });
}

// --- 3. ФУНКЦИЯ ЗАКАЗА ---

function order(item, price) {
    // Для теста используем подтверждение от Telegram
    tg.showConfirm(`Заказать ${item} за ${price} грн?`, (confirmed) => {
        if (confirmed) {
            tg.showAlert("✅ Заказ принят! Аудитор скоро свяжется с вами.");
        }
    });
}