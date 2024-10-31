<?php
$str1 ='033000';
$str2 = 'PHP stands for PHP: Hypertext Preprocessor, it is a widely-used, open source scripting
language';
$str3 = 'www.example.com/public_html/index.php';
$str4 = 'the quick brown fox jumps over the lazy dog.';
$str5 = 'football';
$str6 = 'footboll';

// Q1
$a = substr($str1, 0, 2);
$b = substr($str1, 2, 2);
$c = substr($str1, 4, 2);
$results = $a.':'.$b.':'.$c;
print_r($results);
echo "\n";

// Q2
if (str_contains($str2, "PHP")) {
	echo "The PHP word is present at ".strpos($str2, "PHP")."\n";
} else {
	echo "The PHP word is not present\n";
}

// Q3
$pos = strpos($str3, "index.php");
print_r(substr($str3, $pos)."\n");

// Q4
$replace = preg_replace("/the/", "that", $str4, 1);
echo $replace."\n";

// Q5
for($i=0; $i<strlen($str5); $i++) {
	if($str5[$i] != $str6[$i]) {
		print_r("The two strings are different at position ".$i." each character being (str5) ".$str5[$i]." and (str6) ".$str6[$i]."\n");
	}
}

// Q6
$encoded = "";
for($i=0; $i<strlen($str4); $i++) {
	$letter = substr($str4, $i, 1);
	//echo	$i." -> ".$letter."\n";
	$encoded .= chr(ord($letter)+1);
	
}
echo $encoded."\n";

$decoded = "";
for($i=0; $i<strlen($encoded); $i++) {
	$letter = substr($encoded, $i, 1);
	//echo	$i." -> ".$letter."\n";
	$decoded .= chr(ord($letter)-1);
	
}
echo $decoded."\n";
?>