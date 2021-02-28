<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

date_default_timezone_set('Etc/UTC');

require '../forms/PHPMailer/src/Exception.php';
require '../forms/PHPMailer/src/PHPMailer.php';
require '../forms/PHPMailer/src/SMTP.php';


//Create a new PHPMailer instance
$mail = new PHPMailer();
//Tell PHPMailer to use SMTP
$mail->isSMTP();
//Enable SMTP debugging
//SMTP::DEBUG_OFF = off (for production use)
//SMTP::DEBUG_CLIENT = client messages
//SMTP::DEBUG_SERVER = client and server messages
$mail->SMTPDebug = SMTP::DEBUG_SERVER;
//Set the hostname of the mail server
$mail->Host = 'smtp.ionos.co.uk';
//Set the SMTP port number - likely to be 25, 465 or 587
$mail->Port = 465;
//Whether to use SMTP authentication
$mail->SMTPAuth = true;
//Username to use for SMTP authentication
$mail->Username = 'benp11@hotmail.com';
//Password to use for SMTP authentication
$mail->Password = 'Teanotwar1';
//Set who the message is to be sent from
$mail->setFrom('contact@benpenny.co.uk', 'Ben Penny');
//Set an alternative reply-to address
$mail->addReplyTo('benp11@hotmail.com', 'Ben Penny');
//Set who the message is to be sent to
$mail->addAddress('benp11@hotmail.com', 'Ben Penny');
//Set the subject line
$mail->Subject = 'PHPMailer SMTP test';
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
$mail->msgHTML(file_get_contents('contents.html'), __DIR__);
//Replace the plain text body with one created manually
$mail->AltBody = 'This is a plain-text message body';

//send the message, check for errors
if (!$mail->send()) {
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message sent!';
}
?>