async function spin() {
    const userId = /* Получите user_id из хранилища (например, localStorage или session) */;
    const resultDiv = document.getElementById("result");

    const response = await fetch('/casino', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
    });

    const data = await response.json();

    if (data.error) {
        resultDiv.innerHTML = `<p>${data.error}</p>`;
        return;
    }

    const roll = data.result.join(' ');
    const message = data.win ? `Вы выиграли ${data.win} монет!` : 'Вы проиграли!';
    
    resultDiv.innerHTML = `${roll} <p>${message}</p> <p>Ваш баланс: ${data.balance.toFixed(4)} монет</p>`;
}
