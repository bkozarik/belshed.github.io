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
$smtp->Password = 'davtck867'; // Ваш пароль от почты с которой будут отправляться письма

$mail_settings_string = file_get_contents('mailSettings.txt');

$to = '';

if(!empty($mail_settings_string)){
	$settings_strings = explode("\n", $mail_settings_string);

	foreach ($settings_strings as $key => $string) {
		$prop_name = trim(explode(":", $string)[0]);
		$prop_val = trim(explode(":", $string)[1]);
		
		if($prop_name == "Smtp port"){
			$smtp->Port = $prop_val;
		}
		elseif ($prop_name == "Smtp host") {
			$smtp->Host = $prop_val;
		}
		elseif ($prop_name == "Email") {
			$to = $prop_val;
		}
		elseif ($prop_name == "Password") {
			$smtp->Password = $prop_val;
		}
	}

}

$from = $to;

$subject = 'Заявка с сайта Проект-Дача.рф';
$message = '<h3>Новая заявка на сайте</h3> <br> ';

$smtp->setFrom($from, 'Проект-Дача.рф');
$smtp->addReplyTo($from);
$smtp->addAddress($to);

$fields = array('order_place', 'project_name', 'user_name', 'user_email', 'user_tel', 'user_question', 'complectation', 'materials', 'city', 'budget', 'square');
$fields_labels = array('Заявка пришла из: ', 'Скачанный проект: ', 'Имя: ', 'E-mail: ', 'Телефон: ', 'Вопрос: ', 'Комплектация: ', 'Материалы: ', 'Город: ', 'Бюджет: ', 'Площадь: ');

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