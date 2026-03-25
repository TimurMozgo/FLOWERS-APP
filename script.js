// URL твоего Webhook в n8n, который тянет данные из Google Sheets
const WEBHOOK_URL = 'https://твой-n8n.com/webhook/get-flowers';

async function loadProducts() {
    try {
        const response = await fetch(WEBHOOK_URL);
        const data = await response.json();
        
        const catalog = document.getElementById('catalog');
        catalog.innerHTML = ''; // Очищаем лоадер

        data.forEach(item => {
            const card = `
                <div class="card">
                    <img src="${item.ImageURL}" alt="${item.Name}">
                    <h3>${item.Name}</h3>
                    <p>${item.Price} грн</p>
                    <button class="buy-btn" onclick="buyProduct('${item.ID}')">Купить</button>
                </div>
            `;
            catalog.innerHTML += card;
        });
    } catch (e) {
        console.error("Ошибка загрузки:", e);
    }
}

function buyProduct(id) {
    alert("Идем в Monobank за товаром ID: " + id);
    // Тут будет fetch запрос к n8n для генерации ссылки на оплату
}

loadProducts();