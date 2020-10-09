<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require './PHPMailer/src/Exception.php';
require './PHPMailer/src/PHPMailer.php';
require './PHPMailer/src/SMTP.php';

$smtp = new PHPMailer(true);
$smtp->CharSet = 'utf-8';

$smtp->isSMTP();
$smtp->Host = 'smtp.yandex.ru'; // SMTP сервер
$smtp->SMTPAuth = true;
$smtp->SMTPSecure = 'ssl'; // Тип шифрования
$smtp->Port = 465; // Порт SMTP сервера
$smtp->Password = 'quaterpast6'; // Ваш пароль от почты с которой будут отправляться письма

$to = 'belshed1@yandex.ru'; // Ваш логин от почты куда будут отправляться письма
$from = 'belshed1@yandex.ru'; // Ваш логин от SMTP сервера, он же является адресом отправителя
$subject = 'Заявка с сайта Нью-Йорк';
$message = '<h3>Новая заявка на сайте</h3> <br> ';

$smtp->setFrom($from, 'Сайт сети ресторанов "Нью-Йорк"');
$smtp->addReplyTo($from);
$smtp->addAddress($to);

$fields = array('user_name', 'user_email', 'user_tel', 'date', 'budget', 'guest_count', 'restaurant', 'company_name', 'wish');
$fields_labels = array('Имя: ', 'E-Mail: ', 'Телефон: ', 'Дата: ', 'Бюджет: ', 'Количество гостей: ', 'Ресторан: ', 'Название компании: ', 'Пожелания: ');

if(isset($_POST['isAttached'])){
	$message = '<h3>Клиент скачал меню</h3> <br> ';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'utf-8';

	$mail->isSMTP();
	$mail->Host = 'smtp.yandex.ru'; // SMTP сервер
	$mail->SMTPAuth = true;
	$mail->SMTPSecure = 'ssl'; // Тип шифрования
	$mail->Port = 465; // Порт SMTP сервера
	$mail->Password = 'quaterpast6'; // Ваш пароль от почты с которой будут отправляться письма

	$mail->setFrom($from, 'Сайт сети ресторанов "Нью-Йорк"');
	$mail->addReplyTo($from);

	$msg = 'Здравствуйте! В приложении PDF-файл с меню нашего ресторана';

	$mail->isHTML(true);
	$mail->Username = $from;
	$mail->Subject = 'Меню ресторана "Нью-Йорк"';
	$mail->Body    = $msg;
	$mail->AltBody = '';

	$mail->addAddress($_POST['user_email']);
	$mail->addAttachment('../pdf/menu.pdf');

	$mail->send();
}

foreach($fields as $key => $field){
	if(isset($_POST[$field])){
    	$message .= "<b>" . htmlspecialchars($fields_labels[$key]) . "</b>" . htmlspecialchars($_POST[$field]) . "<br>";
  	}
}

$smtp->isHTML(true);
$smtp->Username = $from;
$smtp->Subject = $subject;
$smtp->Body    = $message;
$smtp->AltBody = '';

$smtp->send();
?>