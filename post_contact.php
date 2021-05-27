<?php

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;


require_once "includes/phpmailer/Exception.php";
require_once "includes/phpmailer/PHPMailer.php";
require_once "includes/phpmailer/SMTP.php";

$identity = $_POST['identity'];
$email = $_POST['email'];
$message = $_POST['message'];

//var_dump($identity, $email , $message);

$mail = new PHPMailer(true);

try{
    //Configuration
    //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output

    //On configure le SMTP
    $mail->isSMTP();                                          //Send using SMTP
    $mail->Host       = 'smtp.mailtrap.io';                   //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                 //Enable SMTP authentication
    $mail->Username   = '7591aed9a4f30e';                     //SMTP username
    $mail->Password   = '8fff484b31dbbd';                     //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;       //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 2525;                                 //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above   

    //Charset
    $mail->Charset = "utf-8";

    //Destinataires
    $mail->addAddress("marie.collin.dev@gmail.com");
    //Expediteur
    $mail->setFrom($email);
    //Contenu
    $mail->Subject = "Nouveau message de : " . $identity . " Via Portfolio";
    $mail->Body = $message;

    //Envoie
    $mail->send();
    echo "Message envoyé";
    header('Location: index.phtml?#contact');

}catch (Exception $e) {
    echo "Message non envoyé. Error: {$mail->ErrorInfo}";
}



