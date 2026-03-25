// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand(); // Разворачиваем на весь экран

let currentProduct = { name: '', price: 0 };
let quantity = 1;

/**
 * Открывает окно заказа
 * @param {string} name - Название букета
 * @param {number} price - Цена за 1 шт
 * @param {string} imgUrl - Ссылка на фото (необязательно)
 */
function buyProduct(name, price, imgUrl) {
    currentProduct = { name, price };
    quantity = 1;
    
    // Заполняем текстовые данные
    document.getElementById('modalProductName').innerText = name;
    document.getElementById('flowerQty').value = quantity;
    
    // Если передали картинку — обновляем её в модалке
    const modalImg = document.getElementById('modalProductImg');
    if (modalImg && imgUrl) {
        modalImg.style.backgroundImage = `url('${imgUrl}')`;
    }
    
    updateTotal();

    // Показываем окно
    const modal = document.getElementById('orderModal');
    modal.style.display = 'flex';
    
    // Виброотклик (для кайфа в Telegram)
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('medium');
    }
}

// Изменение количества (+ или -)
function changeQty(delta) {
    quantity = Math.max(1, quantity + delta);
    document.getElementById('flowerQty').value = quantity;
    updateTotal();
    
    if (tg.HapticFeedback) {
        tg.HapticFeedback.selectionChanged();
    }
}

// Пересчет итоговой суммы
function updateTotal() {
    const total = currentProduct.price * quantity;
    const totalElement = document.getElementById('totalPrice');
    if (totalElement) {
        totalElement.innerText = total.toLocaleString(); // Красивое разделение тысяч
    }
}

// Закрытие окна
function closeModal() {
    document.getElementById('orderModal').style.display = 'none';
}

// Подтверждение заказа
function confirmOrder() {
    const total = currentProduct.price * quantity;
    
    // Показываем красивое подтверждение в стиле Telegram
    tg.showConfirm(`Подтверждаете заказ: ${currentProduct.name} (${quantity} шт.) на сумму ${total} грн?`, (isConfirmed) => {
        if (isConfirmed) {
            // Тут в будущем будет отправка данных в n8n/Bot
            tg.showAlert(`Босс, заказ принят! Скоро свяжемся.`);
            closeModal();
            
            // Если нужно закрыть Mini App после заказа:
            // tg.close(); 
        }
    });
}

// Закрытие модалки при клике на темный фон
window.onclick = function(event) {
    const modal = document.getElementById('orderModal');
    if (event.target == modal) {
        closeModal();
    }
}