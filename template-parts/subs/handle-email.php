<?php

$input = file_get_contents('php://input');
$sub_data = json_decode($input);

require_once("../../../../../wp-load.php");
global $wpdb;

http_response_code(200); // PHP 5.4 or greater

$email_type = $sub_data->email_type;

$email_to = $sub_data->data->email;
$email_subject = $sub_data->email_subject;
$email_message = file_get_contents('../../wp-content/themes/stingingfly/template-parts/email/' . $email_type . '.php');
$email_headers = array('Content-Type: text/html; charset=UTF-8');
$sent = wp_mail( $email_to, $email_subject, $email_message, $email_headers );

if ($sent) {
	//Success!
	echo json_encode([
		"message" => "User Updated"
	]);
	return;
} else {
	echo json_encode([
		"message" => "There was an error: email not sent."
	]);
	return;
}