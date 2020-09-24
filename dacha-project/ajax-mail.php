<?php
$to = 'hkiop1@yandex.ru';
$subject = 'Заявка с сайта';
$message = htmlspecialchars('');

$headers = 'From: project-dacha@project-dacha.ru' . "\r\n" .
    'Reply-To: project-dacha@project-dacha.ru' . "\r\n" .
  	'Content-type: text/html; charset=iso-8859-1' . "\r\n" .
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