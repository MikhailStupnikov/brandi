<?php
	
	$to = 'stupn-mikhail@yandex.ru';
	$subject = 'Brandi feedback';
	$name = strip_tags($_POST['name']);
	$email = strip_tags($_POST['email']);
	$msg = strip_tags($_POST['message']);
	$text = "Name: $name \n" .
	"Text: $msg";

	$dbc = mysqli_connect('localhost', 'Nevland', '93152nevland', 'brandi')
		   or die('Error connected MySQL-server');

	$query = "INSERT INTO message_list (name, email, message)
			  VALUES ('$name', '$email', '$msg')";

	mysqli_query($dbc, $query) or die('Error connected data base');

	mysqli_close($dbc);

	mail($to, $subject, $text, 'From: ' . $email);

?>