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
$smtp->SMTPAuth = true;
$smtp->SMTPSecure = 'ssl';

$to = '';
$from = '';


$mail_settings_string = file_get_contents('mailSettings.txt');

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
			$from = $prop_val;
		}
		elseif ($prop_name == "Password") {
			$smtp->Password = $prop_val;
		}
		elseif ($prop_name == "To") {
			$to = $prop_val;
		}
	}

}

$subject = 'Заявка с сайта 4 сезона';
$message = '<h3>Новая заявка на сайте</h3> <br> ';

$smtp->setFrom($from, '4seasons.ru');
$smtp->addReplyTo($from);
$smtp->addAddress($to);

$fields = array('user_apart', 'user_name', 'user_email', 'user_phone', 'user_whishes');
$fields_labels = array('Дом: ', 'Имя: ', 'E-mail: ', 'Телефон: ', 'Комментарий: ');

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


if($smtp->send()){
	echo '1';
}
else{
	echo '2';
}
?>