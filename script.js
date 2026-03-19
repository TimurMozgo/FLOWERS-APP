const tg = window.Telegram.WebApp;
tg.expand();

// Переход от приветствия к категориям
function showCategories() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('categories-screen').style.display = 'flex';
}

// Показ товаров выбранной категории
function showCategory(type) {
    document.getElementById('categories-screen').style.display = 'none';
    const shop = document.getElementById('shop-screen');
    const grid = document.getElementById('products-grid');
    const title = document.getElementById('category-title');
    
    shop.style.display = 'flex';
    grid.innerHTML = ''; // Очистка сетки

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
            { name: 'Туя Смарагд', price: 450, icon: '🌲' },
            { name: 'Газон (рулон)', price: 300, icon: '🌱' },
            // Новые надежные ссылки на картинки
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

    // Создание карточек
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        
        // Если есть ссылка на картинку - ставим её, если нет - ставим эмодзи
        const media = item.imgUrl 
            ? `<img src="${item.imgUrl}" class="card-img" style="width:100px; height:100px; border-radius:50%; object-fit:cover; margin-bottom:10px;">`
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

function goBack() {
    document.getElementById('shop-screen').style.display = 'none';
    document.getElementById('categories-screen').style.display = 'flex';
}

// Функция заказа
function order(item, price) {
    const webhookUrl = 'https://tiktiok.xyz/webhook-test/e9d8d207-1c6b-44c2-a053-c41479cb32e6';

    tg.showConfirm(`Заказать ${item} за ${price} грн?`, (confirmed) => {
        if (confirmed) {
            document.body.innerHTML = '<div class="screen"><h2 style="color:white;">Оформляем заказ...</h2></div>';
            
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
                document.body.innerHTML = `<div class="screen"><h2 style="color:white;">✅ ${msg}</h2></div>`;
                setTimeout(() => tg.close(), 3000);
            });
        }
    });
}