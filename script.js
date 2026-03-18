const tg = window.Telegram.WebApp;
tg.expand();

function showShop() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('shop-screen').style.display = 'flex';
}

// Теперь функция принимает два параметра: item (название) и price (число)
function order(item, price) {
    const webhookUrl = 'https://tiktiok.xyz/webhook-test/e9d8d207-1c6b-44c2-a053-c41479cb32e6';

    fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            product: item,
            price: price, // Отправляем цену в n8n
            username: tg.initDataUnsafe.user?.username || "Grinzze"
        })
    });

    tg.showConfirm(`Заказать ${item} за ${price} грн?`, (confirmed) => {
        if (confirmed) {
            tg.sendData(item);
            tg.close();
        }
    });
}