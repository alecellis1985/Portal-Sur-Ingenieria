<?php

// Replace this with your own email address
$siteOwnersEmail = 'contacto@psi.com.uy';
if($_POST) {
   $mensaje = trim(stripslashes($_POST['mensaje']));
   $nombre = trim(stripslashes($_POST['nombre']));
   $email= trim(stripslashes($_POST['email']));
   $telefono = $_POST['telefono'];
   
	if (empty($nombre) || strlen($nombre) < 2) {
		$error['nombre'] = "Por favor ingrese nombre.";
	}

	if (!preg_match('/^[a-z0-9&\'\.\-_\+]+@[a-z0-9\-]+\.([a-z0-9\-]+\.)*+[a-z]{2}/is', $email)) {
		$error['email'] = "El email no es valido.";
	}
	
	if (strlen($mensaje) < 15) {
		$error['message'] = "El mensaje debe contener mas de 50 caracteres.";
	}

	$subject = $nombre . " quiere saber mas";

	$messageBody = "";
	$messageBody .= "<p><b>Contact this person at:</b> " . $email . "</p>";
	$messageBody .= "<p><b>Nombre:</b> " . $nombre . "</p>";
	$messageBody .= "<p><b>Mensaje:</b> " . $mensaje . "</p>";
	
	$messageBody .= "<br>" . "\n";
	$messageBody = strip_tags($messageBody,'<p><br><b>');

   // Set From: header
   $from =  $name . " <" . $email . ">";

   // Email Headers
	$headers = "From: " . $from . "\r\n";
	$headers .= "Reply-To: ". $email . "\r\n";
 	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

   if (!$error) {
      ini_set("sendmail_from", $siteOwnersEmail); // for windows server
      $mail = mail($siteOwnersEmail, $subject, $messageBody, $headers);
	if ($mail) { echo "OK"; }
      else { echo "Something went wrong. Please try again."; }
	}
	else {
		$response = "Por favor llene todos los valores necesarios.";
		echo $response;

	}
}
?>