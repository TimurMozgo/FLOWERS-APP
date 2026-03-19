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
            { name: 'Букет "Весна"', price: 850, icon: '🌸' },
            { name: 'Розы Микс', price: 1200, icon: '🌹' }
        ];
    } else if (type === 'dacha') {
        title.innerText = "ДЛЯ ДАЧИ";
        items = [
            { name: 'Туя Смарагд', price: 450, icon: '🌲' },
            { name: 'Лопата (титан)', price: 800, imgUrl: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=300&q=80' },
            { name: 'Перчатки', price: 150, imgUrl: 'https://images.unsplash.com/photo-1589923158776-cb4485d99fd6?auto=format&fit=crop&w=300&q=80' }
        ];
    } 
    // НОВЫЕ ТОВАРЫ ДЛЯ НОВЫХ КАТЕГОРИЙ
    else if (type === 'seeds') {
        title.innerText = "СЕМЕНА";
        items = [
            { name: 'Семена Петунии', price: 120, imgUrl: 'https://images.unsplash.com/photo-1581014165187-57351a92e6f3?w=300' },
            { name: 'Семена Укропа', price: 80, icon: '🌱' }
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

    // Отрисовка карточек с поддержкой картинок и эмодзи
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
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