

<?php

 

                $executionStartTime = microtime(true);

 

                require 'PHPMailer/PHPMailerAutoload.php';

               

                $mail = new PHPMailer;               

               

                $mail->Subject = "Contact form";

                $subject = "Form Confirmation";
                $message = "I have received your message";
 

                $body = "Sent: " . date("Y-m-d H:i") . "<br>";

                $body .= "From: " . $_REQUEST['name'] . "<br>";

                $body .= "Email: " . $_REQUEST['email'] . "<br>";

                $body .= $subject . "<br><br>";

                $body .= $message . "<br><br>";

                $body .= "-------------------- end of message<br><br>";

 

    //$mail->debug

 

                $mail->setFrom('benp11@hotmail.com', 'Ben Penny');

               

                $mail->addAddress('benp11@hotmail.com');

 

                $mail->isHTML(true);

               

                $mail->msgHTML($body);

 

                $mail->send();

   

                $output['status']['code'] = "200";

                $output['status']['name'] = "ok";

                $output['status']['description'] = "success";

                $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";

                $output['data'] = [];

               

                header('Content-Type: application/json; charset=UTF-8');

 

                echo json_encode($output, JSON_UNESCAPED_UNICODE);

 

?>