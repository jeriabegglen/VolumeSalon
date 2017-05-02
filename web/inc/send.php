<?php

error_reporting(E_ALL ^ E_NOTICE);
$post = (!empty($_POST)) ? true : false;
if ($post)
{
	$to = 'mail@mail.mail'; // insert your email for contacts form sending data
	$subject = stripslashes($_POST['name']) . " via Family Responsive Onepage";
	$name = stripslashes($_POST['name']);
	if (!filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL))
	{
		echo 'Your email address must be in the format of name@domain.com';
		exit();
	}
	$email = trim($_POST['email']);
	$message = trim($_POST['message']);
	$website = trim($_POST['website']);
	$message = "<br>$message <br><br>";
	$message.="---<br>Best regards,<br><strong>$name</strong>";
	if ($website)
	{
		$message.="<br><a href='$website'>$website</a>";
	}
	$Reply = $email;
	$from = $name;


	// Let's send the email.

	$headers = "from: $from <$Reply>\nReply-To: $Reply \nContent-type: text/html";

	$mail = mail($to, $subject, $message, $headers);

	if ($mail)
	{
		echo 'success';
	}
	else
	{
		echo 'Something going wrong with sending mail...';
	}
}
else
{
	echo 'You can not access it directly!';
}
?>
