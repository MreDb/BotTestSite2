let collecting = false;
let balance = 0;
let userId = /* Получите user_id из хранилища (например, localStorage или session) */;

async function startCollect() {
    if (collecting) return;

    collecting = true;
    const collectingDiv = document.getElementById("collecting");
    collectingDiv.innerHTML = "Сбор монет начался...";

    const interval = setInterval(async () => {
        const response = await fetch('/collect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: userId }),
        });

        const data = await response.json();
        balance = data.balance;

        collectingDiv.innerHTML = `Баланс: ${balance.toFixed(4)} монет`;

        if (balance >= 0.36) {
            clearInterval(interval);
            collectingDiv.innerHTML = `Вы собрали ${balance.toFixed(4)} монет. Нажмите, чтобы забрать.`;
            const collectButton = document.createElement('button');
            collectButton.innerHTML = "Забрать монеты";
            collectButton.onclick = () => {
                collecting = false;
                balance = 0;
                collectingDiv.innerHTML = "";
            };
            collectingDiv.appendChild(collectButton);
        }
    }, 3000);
}
