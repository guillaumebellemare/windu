<?php

if (isset($_POST['action']) && $_POST['action']=='send') {
	
	// Your code here to handle a successful verification
	$mail = new PHPMailer();
	$mail->CharSet = "utf-8"; 
	$mail->IsSMTP();
	$mail->IsHTML(true);
	
	// Your fields that you want to send	
	$name = $_POST["tNom"];
	$email = $_POST["tCourriel"];
	$comment = $_POST["tComments"];
	
	// Email information
	$mail->Subject	= "Subject"; 
	$mail->Sender	= $email;
	$mail->From		= $email;
	$mail->FromName	= $name;
	$mail->AddAddress("email@gmail.com");
	
	// Message that will be sent to the user
	$message = '';
	$message .= '<body style="background:#F6F6F6; width:100%; padding:20px; margin:0; font-family:Arial, sans-serif; color:#6d6d6d; font-size:12px;">';
		$message .= "$name <br />";
		$message .= "$email <br /><br />";
		$message .= "$comment";
	$message .= '</body>';
	
	$mail->Body = $message;

	if ($mail->Send()) {
		$msg = "<h2 class='is-success'>Votre commentaire a bien été envoyée !</h2>";
	}else{
		$msg = "<h2 class='is-failure'>Une erreur est survenue lors de l'envoi du courriel. Veuillez réessayez plus tard...</h2>" . $mail->ErrorInfo;
	}
}
