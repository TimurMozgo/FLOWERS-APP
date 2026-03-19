const tg = window.Telegram.WebApp;
tg.expand();

// Из приветствия в категории
function showCategories() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('categories-screen').style.display = 'flex';
}

// Показ конкретной категории
function showCategory(type) {
    document.getElementById('categories-screen').style.display = 'none';
    const shop = document.getElementById('shop-screen');
    const grid = document.getElementById('products-grid');
    const title = document.getElementById('category-title');
    
    shop.style.display = 'flex';
    grid.innerHTML = ''; // Очистка

    let items = [];

    if (type === 'bouquets') {
        title.innerText = "БУКЕТЫ";
        items = [
            { id: 'Spring Bouquet', name: 'Букет "Весна"', price: 850, icon: '🌸' },
            { id: 'Rose Mix', name: 'Розы Микс', price: 1200, icon: '🌹' },
            { id: 'Tulips', name: 'Тюльпаны', price: 650, icon: '🌷' },
            { id: 'Sunflowers', name: 'Подсолнухи', price: 900, icon: '🌻' }
        ];
    } else if (type === 'dacha') {
        title.innerText = "ДЛЯ ДАЧИ";
        items = [
            { id: 'Tuya', name: 'Туя Смарагд', price: 450, icon: '🌲' },
            { id: 'Lawn', name: 'Газон (рулон)', price: 300, icon: '🌱' }
        ];
    }

    // Генерация карточек по твоему шаблону
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="icon">${item.icon}</div>
            <p class="product-name">${item.name}</p>
            <p class="price">${item.price} грн</p>
            <button class="btn" onclick="order('${item.id}', ${item.price})">Заказать</button>
        `;
        grid.appendChild(card);
    });
}

function goBack() {
    document.getElementById('shop-screen').style.display = 'none';
    document.getElementById('categories-screen').style.display = 'flex';
}

// Твоя рабочая функция заказа с ожиданием ответа
function order(item, price) {
    const webhookUrl = 'https://tiktiok.xyz/webhook-test/e9d8d207-1c6b-44c2-a053-c41479cb32e6';

    tg.showConfirm(`Заказать ${item} за ${price} грн?`, (confirmed) => {
        if (confirmed) {
            document.body.innerHTML = '<div class="screen"><h1>Оформляем...</h1></div>';
            
            fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product: item,
                    price: price,
                    username: tg.initDataUnsafe.user?.username || "Grinzze"
                })
            })
            .then(res => res.text())
            .then(msg => {
                document.body.innerHTML = `<div class="screen"><h1>✅ ${msg}</h1></div>`;
                setTimeout(() => tg.close(), 3000);
            });
        }
    });
}