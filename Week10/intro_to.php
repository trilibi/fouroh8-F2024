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
	print_r('The PHP word is present at '.$str2_pos."\n");
} else {
	print_r("The PHP word is not present\n");
}
//3
$file = explode('/', $str3);
$file = $file[count($file) - 1];
echo $file;
//4
print_r("\nThat".substr($str4, 3));
//5
for ($i = 0; $i < strlen($str5); $i++) {
	echo "\n".$str5[$i].' '.$str6[$i];
	if ($str5[$i] != $str6[$i]) {
		print_r("\n".$str5[$i]." is not ".$str6[$i]."\n");
		$i = strlen($str5);
	}
}
//6
for ($i = 0; $i < strlen($str4); $i++) {
	$str4[$i] = chr(ord($str4[$i]) + 1);
}
print_r($str4);
