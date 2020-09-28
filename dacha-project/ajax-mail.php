<?php

$to = 'sercom92@gmail.com';
$from = 'проект-дача.рф <проект-дача@проект-дача.рф>';
$subject = 'Заявка с сайта Проект-Дача.рф';
$message = htmlspecialchars('');

$headers = 'From: ' . $from . "\r\n" .
    'Reply-To: ' . $from . "\r\n" .
  	'Content-type: text/html; charset=utf-8' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

$fields = array('user_name', 'user_email', 'user_tel', 'user_question', 'complectation', 'materials', 'city', 'budget', 'square');
$fields_labels = array('Имя: ', 'E-mail: ', 'Телефон: ', 'Вопрос: ', 'Комплектация: ', 'Материалы: ', 'Город: ', 'Бюджет: ', 'Площадь: ');

foreach($fields as $key => $field){
	if(isset($_POST[$field])){
    	$message .= "<b>" . htmlspecialchars($fields_labels[$key]) . "</b>" . htmlspecialchars($_POST[$field]) . "<br>";
    }
}

mail($to, $subject, $message, $headers);
?>