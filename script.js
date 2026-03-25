const tg = window.Telegram.WebApp;
tg.expand();

let currentProduct = { name: '', price: 0 };
let quantity = 1;

// Твоя функция из кнопок HTML
function buyProduct(name, price, imgUrl) {
    console.log("Заказ букета:", name, price);
    
    currentProduct = { name, price };
    quantity = 1;
    
    // 1. Заполняем название
    const nameElem = document.getElementById('modalProductName');
    if (nameElem) nameElem.innerText = name;

    // 2. Заполняем цену за 1 шт (базовую)
    const priceElem = document.getElementById('modalProductPrice');
    if (priceElem) priceElem.innerText = price + " грн/шт";

    // 3. Ставим картинку (если она есть)
    const imgElem = document.getElementById('modalProductImg');
    if (imgElem && imgUrl) {
        imgElem.style.backgroundImage = `url('${imgUrl}')`;
    }

    // 4. Сбрасываем количество
    const qtyInput = document.getElementById('flowerQty');
    if (qtyInput) qtyInput.value = quantity;
    
    updateTotal();

    // 5. ПОКАЗЫВАЕМ ОКНО
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.style.display = 'flex';
    } else {
        console.error("Ошибка: Блок с id='orderModal' не найден!");
    }

    if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('medium');
}

function changeQty(delta) {
    quantity = Math.max(1, quantity + delta);
    const qtyInput = document.getElementById('flowerQty');
    if (qtyInput) qtyInput.value = quantity;
    
    updateTotal();
    if (tg.HapticFeedback) tg.HapticFeedback.selectionChanged();
}

function updateTotal() {
    const total = currentProduct.price * quantity;
    const totalDisplay = document.getElementById('totalPrice');
    if (totalDisplay) totalDisplay.innerText = total;
}

function closeModal() {
    document.getElementById('orderModal').style.display = 'none';
}

function confirmOrder() {
    const total = currentProduct.price * quantity;
    tg.showConfirm(`Подтверждаете заказ: ${currentProduct.name} на сумму ${total} грн?`, (ok) => {
        if (ok) {
            tg.showAlert("Босс, заказ принят! Готовим счет.");
            closeModal();
        }
    });
}

// Закрытие по клику на фон
window.onclick = function(event) {
    const modal = document.getElementById('orderModal');
    if (event.target == modal) closeModal();
}