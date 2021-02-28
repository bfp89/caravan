<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../forms/PHPMailer/src/Exception.php';
require '../forms/PHPMailer/src/PHPMailer.php';
require '../forms/PHPMailer/src/SMTP.php';

//PHPMailer Object
$mail = new PHPMailer(true); //Argument true in constructor enables exceptions

//Enable SMTP debugging.
$mail->SMTPDebug = 3;                               
//Set PHPMailer to use SMTP.
$mail->isSMTP();            
//Set SMTP host name                          
$mail->Host = "smtp.ionos.co.uk";
//Set this to true if SMTP host requires authentication to send email
$mail->SMTPAuth = true;                          
//Provide username and password     
$mail->Username = "contact@benpenny.co.uk";                 
$mail->Password = "Teanotwar1!";                           
//If SMTP requires TLS encryption then set it
$mail->SMTPSecure = "tls";                           
//Set TCP port to connect to
$mail->Port = 25;                                   

$mail->From = "contact@benpenny.co.uk";
$mail->FromName = "Ben Penny";

$mail->addAddress($_POST['email'], $_POST['name']);

$mail->isHTML(true);

$mail->Subject = "Subject Text";
$mail->Body = "<i>Mail body in HTML</i>";
$mail->AltBody = "This is the plain text version of the email content";

try {
    $mail->send();
    echo "Message has been sent successfully";
} catch (Exception $e) {
    echo "Mailer Error: " . $mail->ErrorInfo;
}
?>