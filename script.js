const tg = window.Telegram.WebApp;
tg.expand();

// 1. ТВОЙ WEBHOOK ИЗ N8N (Вставь сюда свою ссылку)
const n8n_webhook = 'ТВОЙ_WEBHOOK_URL_ИЗ_N8N';

// 2. НАВИГАЦИЯ
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

// 3. ОТРИСОВКА КАТЕГОРИЙ
function showCategory(type) {
    document.getElementById('categories-screen').style.display = 'none';
    const shop = document.getElementById('shop-screen');
    const grid = document.getElementById('products-grid');
    const title = document.getElementById('category-title');
    
    shop.style.display = 'flex';
    grid.innerHTML = ''; 

    let items = [];

    // Список товаров с картинками и описаниями
    if (type === 'bouquets') {
        title.innerText = "БУКЕТЫ";
        items = [
            { 
                name: 'Букет Весна', 
                price: 850, 
                imgUrl: 'https://images.unsplash.com/photo-1591886840935-2fbf28cddbc1?w=600',
                description: 'Нежный весенний букет из тюльпанов и мимозы. Идеальный подарок для весеннего настроения!'
            },
            { 
                name: 'Розы Микс', 
                price: 1200, 
                imgUrl: 'https://images.unsplash.com/photo-1548610371-9545b5b1499f?w=600',
                description: 'Классическое сочетание отборных роз разных оттенков. Символ искренних чувств.' 
            }
        ];
    } else if (type === 'dacha') {
        title.innerText = "ДЛЯ ДАЧИ";
        items = [
            { 
                name: 'Туя Смарагд', 
                price: 450, 
                imgUrl: 'https://images.unsplash.com/photo-1599021456807-25db0f974333?w=600',
                description: 'Идеальное вечнозеленое дерево для вашей живой изгороди. Морозостойкая и неприхотливая.' 
            },
            { 
                name: 'Газон (рулон)', 
                price: 300, 
                imgUrl: 'https://images.unsplash.com/photo-1533460004989-cef01064af7c?w=600',
                description: 'Мягкий и густой изумрудный газон за один день. Высокая приживаемость.' 
            }
        ];
    } else if (type === 'seeds') {
        title.innerText = "СЕМЕНА";
        items = [
            { 
                name: 'Петуния', 
                price: 120, 
                imgUrl: 'https://images.unsplash.com/photo-1622383529357-37b773795293?w=600',
                description: 'Смесь окрасок для кашпо и балконов. Высокая всхожесть и яркое цветение.' 
            }
        ];
    } else if (type === 'fertilizers') {
        title.innerText = "УДОБРЕНИЯ";
        items = [
            { 
                name: 'Азот', 
                price: 250, 
                imgUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600',
                description: 'Концентрированное удобрение для быстрого роста и ярко-зеленой листвы.' 
            }
        ];
    } else if (type === 'care') {
        title.innerText = "ИНСТРУМЕНТЫ";
        items = [
            { 
                name: 'Секатор', 
                price: 400, 
                imgUrl: 'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=600',
                description: 'Профессиональный инструмент с титановым покрытием. Режет как по маслу.' 
            }
        ];
    } else if (type === 'pots') {
        title.innerText = "КОМНАТНЫЕ";
        items = [
            { 
                name: 'Драцена', 
                price: 900, 
                imgUrl: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=600',
                description: 'Домашняя пальма, которая очищает воздух и не требует частого полива.' 
            }
        ];
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        
        // Теперь ЛЮБАЯ карточка открывает экран подробностей
        card.onclick = () => openDetail(item);

        const media = item.imgUrl 
            ? `<img src="${item.imgUrl}" class="card-img">`
            : `<div class="icon">${item.icon}</div>`;

        card.innerHTML = `
            ${media}
            <p class="product-name">${item.name}</p>
            <p class="price">${item.price} грн</p>
            <button class="btn">Подробнее</button>
        `;
        grid.appendChild(card);
    });
}

// 4. ОТКРЫТИЕ ДЕТАЛЕЙ ТОВАРА
function openDetail(item) {
    document.getElementById('shop-screen').style.display = 'none';
    const detail = document.getElementById('product-detail-screen');
    detail.style.display = 'flex';

    document.getElementById('detail-image-container').innerHTML = item.imgUrl 
        ? `<img src="${item.imgUrl}" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 0 0 20px 20px;">`
        : `<div class="icon" style="font-size: 100px;">${item.icon}</div>`;

    document.getElementById('detail-name').innerText = item.name;
    document.getElementById('detail-description').innerText = item.description || "Отличный выбор для подарка!";
    document.getElementById('detail-price').innerText = `${item.price} грн`;

    document.getElementById('detail-order-btn').onclick = (e) => {
        e.stopPropagation(); // Чтобы не срабатывал клик по карточке под кнопкой
        order(item.name, item.price);
    };
}

// 5. ОТПРАВКА В N8N
function order(name, price) {
    tg.showConfirm(`Заказать ${name} за ${price} грн?`, (confirmed) => {
        if (confirmed) {
            tg.MainButton.setText("ОТПРАВКА...");
            tg.MainButton.show();

            const data = {
                user: tg.initDataUnsafe.user?.username || "Guest",
                product: name,
                price: price
            };

            fetch(n8n_webhook, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(() => {
                tg.showAlert("✅ Аудитор принял заказ!");
                tg.MainButton.hide();
            })
            .catch(() => {
                tg.showAlert("❌ Ошибка отправки!");
                tg.MainButton.hide();
            });
        }
    });
}