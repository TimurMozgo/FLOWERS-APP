const tg = window.Telegram.WebApp;
tg.expand();

// 1. ТВОЙ WEBHOOK ИЗ N8N (Обязательно вставь свою ссылку!)
const n8n_webhook = 'https://tiktiok.xyz/webhook-test/e9d8d207-1c6b-44c2-a053-c41479cb32e6';

let cart = []; // Массив для хранения товаров в корзине

// 2. ЛОГИКА КОРЗИНЫ
function updateCartUI() {
    const fab = document.getElementById('cart-fab');
    const count = document.getElementById('cart-count');
    count.innerText = cart.length;
    // Кнопка корзины появляется, только если в ней что-то есть
    fab.style.display = cart.length > 0 ? 'flex' : 'none';
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
    
    // Легкая вибрация телефона для подтверждения
    if (tg.HapticFeedback) {
        tg.HapticFeedback.notificationOccurred('success');
    }
    
    tg.showAlert(`✅ ${name} добавлен в корзину!`);
}

function showCart() {
    // Скрываем все экраны и показываем корзину
    document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
    const screen = document.getElementById('cart-screen');
    const list = document.getElementById('cart-items-list');
    const totalDiv = document.getElementById('cart-total');
    
    screen.style.display = 'flex';
    list.innerHTML = '';
    let total = 0;

    cart.forEach((item) => {
        total += item.price;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `<span>${item.name}</span><span>${item.price} грн</span>`;
        list.appendChild(itemDiv);
    });

    totalDiv.innerText = `ИТОГО К ОПЛАТЕ: ${total} грн`;
}

function closeCart() {
    document.getElementById('cart-screen').style.display = 'none';
    document.getElementById('categories-screen').style.display = 'flex';
}

// 3. НАВИГАЦИЯ
function showCategories() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('categories-screen').style.display = 'flex';
}

function goBack() {
    document.getElementById('shop-screen').style.display = 'none';
    document.getElementById('categories-screen').style.display = 'flex';
}

function closeDetail() {
    document.getElementById('product-detail-screen').style.display = 'none';
    document.getElementById('shop-screen').style.display = 'flex';
}

// 4. ОТРИСОВКА КАТЕГОРИЙ
function showCategory(type) {
    document.getElementById('categories-screen').style.display = 'none';
    const shop = document.getElementById('shop-screen');
    const grid = document.getElementById('products-grid');
    const title = document.getElementById('category-title');
    
    shop.style.display = 'flex';
    grid.innerHTML = ''; 

    let items = [];

    if (type === 'bouquets') {
        title.innerText = "БУКЕТЫ";
        items = [
            { name: 'Букет Весна', price: 850, imgUrl: 'https://images.unsplash.com/photo-1591886840935-2fbf28cddbc1?w=600', description: 'Нежный весенний букет из тюльпанов и мимозы.' },
            { name: 'Розы Микс', price: 1200, imgUrl: 'https://images.unsplash.com/photo-1548610371-9545b5b1499f?w=600', description: 'Классическое сочетание отборных роз разных оттенков.' }
        ];
    } else if (type === 'dacha') {
        title.innerText = "ДЛЯ ДАЧИ";
        items = [
            { name: 'Туя Смарагд', price: 450, imgUrl: 'https://images.unsplash.com/photo-1599021456807-25db0f974333?w=600', description: 'Идеальное вечнозеленое дерево для вашей изгороди.' },
            { name: 'Газон (рулон)', price: 300, imgUrl: 'https://images.unsplash.com/photo-1533460004989-cef01064af7c?w=600', description: 'Мягкий и густой изумрудный газон за один день.' }
        ];
    } else if (type === 'seeds') {
        title.innerText = "СЕМЕНА";
        items = [
            { name: 'Петуния', price: 120, imgUrl: 'https://images.unsplash.com/photo-1622383529357-37b773795293?w=600', description: 'Яркое цветение до самых заморозков.' }
        ];
    } else if (type === 'fertilizers') {
        title.innerText = "УДОБРЕНИЯ";
        items = [
            { name: 'Азот', price: 250, imgUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600', description: 'Концентрат для быстрого роста листвы.' }
        ];
    } else if (type === 'care') {
        title.innerText = "ИНСТРУМЕНТЫ";
        items = [
            { name: 'Секатор', price: 400, imgUrl: 'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=600', description: 'Профессиональный титановый инструмент.' }
        ];
    } else if (type === 'pots') {
        title.innerText = "КОМНАТНЫЕ";
        items = [
            { name: 'Драцена', price: 900, imgUrl: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=600', description: 'Домашняя пальма, очищающая воздух.' }
        ];
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => openDetail(item);

        const media = `<img src="${item.imgUrl}" class="card-img">`;

        card.innerHTML = `
            ${media}
            <p class="product-name">${item.name}</p>
            <p class="price">${item.price} грн</p>
            <button class="btn">Подробнее</button>
        `;
        grid.appendChild(card);
    });
}

// 5. ОТКРЫТИЕ ДЕТАЛЕЙ ТОВАРА
function openDetail(item) {
    document.getElementById('shop-screen').style.display = 'none';
    const detail = document.getElementById('product-detail-screen');
    detail.style.display = 'flex';

    document.getElementById('detail-image-container').innerHTML = 
        `<img src="${item.imgUrl}" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 0 0 20px 20px;">`;

    document.getElementById('detail-name').innerText = item.name;
    document.getElementById('detail-description').innerText = item.description || "Отличный выбор!";
    document.getElementById('detail-price').innerText = `${item.price} грн`;

    // Кнопка на экране деталей теперь просто добавляет в корзину
    document.getElementById('detail-order-btn').onclick = (e) => {
        e.stopPropagation();
        addToCart(item.name, item.price);
    };
}

// 6. ФИНАЛЬНАЯ ОТПРАВКА В N8N
function sendOrder() {
    if (cart.length === 0) return;

    const total = cart.reduce((sum, i) => sum + i.price, 0);

    tg.showConfirm(`Оформить заказ на ${cart.length} товаров на сумму ${total} грн?`, (confirmed) => {
        if (confirmed) {
            tg.MainButton.setText("ОБРАБОТКА АУДИТОРОМ...");
            tg.MainButton.show();

            const data = {
                user: tg.initDataUnsafe.user?.username || "Guest",
                items: cart, // Шлем массив товаров
                total_price: total
            };

            fetch(n8n_webhook, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(() => {
                tg.showAlert("✅ Аудитор подтвердил заказ! Мы уже собираем товары.");
                cart = []; // Очистка корзины
                updateCartUI();
                tg.MainButton.hide();
                showCategories(); // Возврат в меню
            })
            .catch(() => {
                tg.showAlert("❌ Ошибка связи с сервером!");
                tg.MainButton.hide();
            });
        }
    });
}