const tg = window.Telegram.WebApp;
tg.expand();

function showShop() {
    console.log("Кнопка нажата");
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('shop-screen').style.display = 'flex';
}

function order(item) {
    const webhookUrl = 'https://tiktiok.xyz/webhook-test/e9d8d207-1c6b-44c2-a053-c41479cb32e6';

    fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            product: item,
            username: tg.initDataUnsafe.user?.username || "Grinzze"
        })
    });

    tg.showConfirm(`Заказать ${item}?`, (confirmed) => {
        if (confirmed) {
            tg.sendData(item);
            tg.close();
        }
    });
}