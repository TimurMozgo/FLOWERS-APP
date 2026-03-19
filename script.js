function order(item, price) {
    const webhookUrl = 'https://tiktiok.xyz/webhook-test/e9d8d207-1c6b-44c2-a053-c41479cb32e6';

    // Сначала спрашиваем подтверждение
    tg.showConfirm(`Заказать ${item} за ${price} грн?`, (confirmed) => {
        if (confirmed) {
            // Если нажал "ОК", показываем лоадер или текст, чтобы клиент не тыкал лишний раз
            document.body.innerHTML = `<div style="text-align:center; margin-top:50%; color:white; font-family:sans-serif;">
                <h2>Оформляем заказ...</h2>
            </div>`;

            // Теперь отправляем данные в n8n
            fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product: item,
                    price: price,
                    username: tg.initDataUnsafe.user?.username || "Grinzze"
                })
            })
            .then(response => response.text()) // Ждем текст от n8n (тот самый Respond to Webhook)
            .then(message => {
                // Выводим ответ от Аудитора на экран
                document.body.innerHTML = `<div style="text-align:center; margin-top:50%; color:white; font-family:sans-serif;">
                    <h2 style="color: #4CAF50;">✅ Готово!</h2>
                    <p>${message}</p>
                </div>`;

                // Закрываем через 3 секунды, чтобы клиент прочитал
                setTimeout(() => {
                    tg.close();
                }, 3500);
            })
            .catch(error => {
                alert("Ошибка связи с сервером");
                tg.close();
            });
        }
    });
}