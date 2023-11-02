<?php
header('Content-Type: text/html; charset=utf-8');
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Обработка POST-запроса (если необходимо).
    // Здесь можно добавить логику для сохранения информации о транзакциях или других операциях.
} else {
    // Отправка HTML-страницы клиенту.
    include("index.html");
}
?>
