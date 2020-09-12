<?php
$to = 'hkiop1@yandex.ru';
$subject = 'Заявка с сайта Dentko.by';
$message = htmlspecialchars('');

$headers = 'From: dentko@dentko.by' . "\r\n" .
    'Reply-To: dentko@dentko.by' . "\r\n" .
  	'Content-type: text/html; charset=iso-8859-1' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

$fields = array('name', 'tel', 'mail', 'rate', 'category', 'comment');
$fields_labels = array('Имя: ', 'Телефон: ', 'E-mail: ', 'Оценка: ', 'Категория: ', 'Комментарий: ');

foreach($fields as $key => $field){
	if(isset($_POST[$field])){
    	$message .= "<b>" . htmlspecialchars($fields_labels[$key]) . "</b>" . htmlspecialchars($_POST[$field]) . "<br>";
    }
}

mail($to, $subject, $message, $headers);
?>