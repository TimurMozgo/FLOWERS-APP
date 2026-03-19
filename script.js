const tg = window.Telegram.WebApp;
tg.expand();

// Эта функция отвечает за кнопку "Смотреть каталог"
function showShop() {
    const welcome = document.getElementById('welcome-screen');
    const shop = document.getElementById('shop-screen');
    
    if (welcome && shop) {
        welcome.style.display = 'none';
        shop.style.display = 'flex';
    } else {
        console.error("Не найдены экраны welcome-screen или shop-screen!");
    }
}

// Эта функция отвечает за заказ
function order(item, price) {
    const webhookUrl = 'https://tiktiok.xyz/webhook-test/e9d8d207-1c6b-44c2-a053-c41479cb32e6';

    tg.showConfirm(`Заказать ${item} за ${price} грн?`, (confirmed) => {
        if (confirmed) {
            // Показываем экран загрузки
            document.body.innerHTML = `
                <div style="text-align:center; margin-top:50%; color:white; font-family:sans-serif;">
                    <h2>Оформляем заказ...</h2>
                </div>`;

            fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product: item,
                    price: price,
                    username: tg.initDataUnsafe.user?.username || "Grinzze"
                })
            })
            .then(response => response.text())
            .then(message => {
                // Показываем ответ от n8n
                document.body.innerHTML = `
                    <div style="text-align:center; margin-top:50%; color:white; font-family:sans-serif;">
                        <h2 style="color: #4CAF50;">✅ Готово!</h2>
                        <p>${message}</p>
                    </div>`;
                
                // Закрываем через 3.5 секунды
                setTimeout(() => {
                    tg.close();
                }, 3500);
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert("Ошибка связи с сервером");
                tg.close();
            });
        }
    });
}