<?php

$str1 = nl2br("03:30:00");
 chunk_split($str1,2,"");
 print_r($str1);
echo "\n";


$str2 =  "PHP stands for PHP: Hypertext Preprocessor, it is a widely-used, open source scripting language";
if (strpos($str2,"PHP") !== false) {
	print_r("The PHP word is present at position ");
	echo strpos($str2, "PHP");
}
else{
	print_r("The PHP word is not present.");
}
echo "\n";


$str3 = "www.example.com/public_html/index.php";
	echo substr(strrchr($str3, "/"), 1);
echo "\n";


$str4 = "the quick brown fox jumps over the lazy dog.";
	echo str_replace("the","That","the quick brown fox jumps over the lazy dog.");
echo "\n";

$str5 = "football";
$str6 = "footboll";
$position = strspn($str5 ^ $str6, "\0");
	printf('The difference between the strings is at position %d: "%s" vs "%s"',
    	$position, $str5[$position], $str6[$position]);
echo "\n";


$encoded = '';
for($i=0; $i < strlen($str4); $i++) {
	$letter = substr($str4, $i, 1);
	$encoded .= chr(ord($letter)+1);
}
echo $encoded;

$decoded = '';
for($i=0; $i < strlen($str4); $i++) {
	$letter = substr($str4, $i, 1);
	$encoded .= chr(ord($letter)-1);
}
echo $decoded;

?>