const WEBHOOK_URL = 'https://tiktiok.xyz/webhook-test/e9d8d207-1c6b-44c2-a053-c41479cb32e6';

// Функция создания карточки (чтобы не дублировать код)
function createCard(item) {
    return `
        <div class="card">
            <div class="card-img" style="background-image: url('${item.ImageURL}');"></div>
            <div class="card-content">
                <h3>${item.Name}</h3>
                <div class="price">${item.Price} грн</div>
                <button class="buy-btn" onclick="sendOrder('${item.Name}', ${item.Price})">Заказать</button>
            </div>
        </div>
    `;
}

async function loadFlowers() {
    const container = document.getElementById('main-grid');
    try {
        const response = await fetch(WEBHOOK_URL);
        const data = await response.json();
        
        container.innerHTML = data.map(item => createCard(item)).join('');
    } catch (error) {
        console.error("Ошибка склада:", error);
        container.innerHTML = "<p>Ошибка загрузки цветов...</p>";
    }
}

function sendOrder(name, price) {
    // Тут в будущем будет Telegram.WebApp.sendData
    alert(`Заказ: ${name} за ${price} грн принят!`);
}

// Запуск при загрузке
document.addEventListener('DOMContentLoaded', loadFlowers);