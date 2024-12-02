<?php
// Enter your code here, enjoy!
$str1 ='033000';
$str2 = 'PHP stands for PHP: Hypertext Preprocessor, it is a widely-used, open source scripting
language';
$str3 = 'www.example.com/public_html/index.php';
$str4 = 'the quick brown fox jumps over the lazy dog.';
$str5 = 'football';
$str6 = 'footboll';

/*
Encrypt the string $str4, replace each character in the input string with the next
alphabetic character (e.g. a→b, b→c, ... z→a).
*/
//print_r(strlen($str4));
$encoded = '';
for($i=0;  $i < strlen($str4); $i++) {
	$letter = substr($str4, $i, 1);
	$encoded .= chr(ord($letter)+1);
}
echo $encoded;
echo "\n";

$decoded = '';
for($i=0;  $i < strlen($encoded); $i++) {
	$letter = substr($encoded, $i, 1);
	$decoded .= chr(ord($letter)-1);
}
echo $decoded;
