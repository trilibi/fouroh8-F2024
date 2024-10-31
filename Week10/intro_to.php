<?php
$str1 ='033000';
$str2 = 'PHP stands for PHP: Hypertext Preprocessor, it is a widely-used, open source scripting
language';
$str3 = 'www.example.com/public_html/index.php';
$str4 = 'the quick brown fox jumps over the lazy dog.';
$str5 = 'football';
$str6 = 'footboll';
//1
$str1 = substr($str1, 0, 2).':'.substr($str1, 2, 2).':'.substr($str1, 4, 2);
print_r($str1."\n");
//2
$str2_pos = strpos($str2, 'PHP');
if ($str2_pos >= 0) {
	print_r('The PHP word is present at '.$str2_pos.'.');
} else {
	print_r('The PHP word is not present');
}
//3
