// 1. Константы и переменные
const WEBHOOK_URL = 'ТВОЯ_ССЫЛКА_ИЗ_N8N'; // Не забудь вставить свою!
let currentProduct = { name: '', price: 0 };
let quantity = 1;

// 2. Функция загрузки товаров (если используешь n8n)
async function loadFlowers() {
    const container = document.querySelector('.catalog-grid');
    if (!container) return; // Если мы не на странице каталога

    try {
        const response = await fetch(WEBHOOK_URL);
        const data = await response.json();
        
        // Очищаем и рендерим (создаем карточки)
        container.innerHTML = data.map(item => `
            <div class="card">
                <div class="card-img" style="background-image: url('${item.ImageURL}');"></div>
                <div class="card-content">
                    <h3>${item.Name}</h3>
                    <div class="price">${item.Price} грн</div>
                    <button class="buy-btn" onclick="openOrderModal('${item.Name}', ${item.Price}, '${item.ImageURL}')">Заказать</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.log("Пока работаем на статике или n8n спит");
    }
}

// 3. ЛОГИКА ОКНА ВЫБОРА (Вместо старой buyProduct)
function openOrderModal(name, price, imgUrl) {
    currentProduct = { name, price };
    quantity = 1;
    
    document.getElementById('modalProductName').innerText = name;
    document.getElementById('modalProductPrice').innerText = price + ' грн/шт';
    document.getElementById('modalProductImg').style.backgroundImage = `url('${imgUrl}')`;
    document.getElementById('flowerQty').value = quantity;
    updateTotal();

    document.getElementById('orderModal').style.display = 'flex';
}

function changeQty(delta) {
    quantity = Math.max(1, quantity + delta);
    document.getElementById('flowerQty').value = quantity;
    updateTotal();
}

function updateTotal() {
    const total = currentProduct.price * quantity;
    document.getElementById('totalPrice').innerText = total;
}

function closeModal() {
    document.getElementById('orderModal').style.display = 'none';
}

function confirmOrder() {
    const total = currentProduct.price * quantity;
    // Вот тут будет магия оплаты
    alert(`Босс, заказ принят! ${currentProduct.name} x${quantity} шт. Итого: ${total} грн.`);
    closeModal();
}

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', loadFlowers);