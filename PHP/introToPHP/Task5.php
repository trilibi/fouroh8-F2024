<?php
$str5 = 'football';
$str6 = 'footboll';
$encoded = '';
for($i=0; $i < strlen(str4); $i++) {
	$letter = substr($str4, $i, 1);
	$encoded .= chr(ord($letter)+1);
}
echo $encoded;
echo "\n";

$decoded = '';
for($i=0; $i < strlen($encoded); $i++) {
	$letter = substr($encoded, $i, 1);
	$decoded .= chr(ord($letter)-1);
}
echo $decoded;


for ($i = 0; $i < strlen($str5); $i++) {
	$letter = substr($str5, $i, 1);
	$encoded .= chr(ord($letter) + 1);
}
echo $encoded;
echo "\n";

$decoded = '';
for ($i = 0; $i < strlen($encoded); $i++) {
	$letter = substr($encoded, $i, 1);
	$decoded .= chr(ord($letter) - 1);
}
echo $decoded;
?>
