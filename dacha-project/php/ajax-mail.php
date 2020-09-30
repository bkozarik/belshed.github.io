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
$smtp->Password = 'canofender5'; // Ваш пароль от почты с которой будут отправляться письма

$to = 'belshed1@yandex.ru'; // Ваш логин от почты с куда будут отправляться письма
$from = 'hkiop1@yandex.ru'; // Ваш логин от SMTP сервера, он же является адресом отправителя
$subject = 'Заявка с сайта Проект-Дача.рф';
$message = '<h3>Новая заявка на сайте</h3> <br> ';

$smtp->setFrom($from, 'Проект-Дача.рф');
$smtp->addReplyTo($from);
$smtp->addAddress($to);

$fields = array('project_name', 'user_name', 'user_email', 'user_tel', 'user_question', 'complectation', 'materials', 'city', 'budget', 'square');
$fields_labels = array('Скачанный проект: ', 'Имя: ', 'E-mail: ', 'Телефон: ', 'Вопрос: ', 'Комплектация: ', 'Материалы: ', 'Город: ', 'Бюджет: ', 'Площадь: ');

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