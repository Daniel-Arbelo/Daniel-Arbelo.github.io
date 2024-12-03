<?php
// Reemplaza con tu correo electrónico real
$receiving_email_address = 'arbelohernandezdaniel@gmail.com';

// Verifica que la biblioteca exista
if (file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php')) {
  include($php_email_form);
} else {
  die('Unable to load the "PHP Email Form" Library!');
}

$contact = new PHP_Email_Form;
$contact->ajax = true;

$contact->to = $receiving_email_address;
$contact->from_name = $_POST['name'];
$contact->from_email = $_POST['email'];
$contact->subject = $_POST['subject'];

// Configuración SMTP
$contact->smtp = array(
  'host' => 'smtp.gmail.com',
  'username' => 'tu_correo@gmail.com', // Cambia esto a tu correo
  'password' => 'tu_contraseña',       // Cambia esto a tu contraseña o clave de aplicación
  'port' => '587'
);

// Agregar mensajes
$contact->add_message($_POST['name'], 'From');
$contact->add_message($_POST['email'], 'Email');
$contact->add_message($_POST['message'], 'Message', 10);

// Envía el correo
echo $contact->send();
?>
