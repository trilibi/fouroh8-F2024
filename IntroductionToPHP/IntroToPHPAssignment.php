<?php

// Adam Nelson - PHP Practice

$str1 ='033000';
$str2 = 'PHP stands for PHP: Hypertext Preprocessor, it is a widely-used, open source scripting
language';
$str3 = 'www.example.com/public_html/index.php';
$str4 = 'the quick brown fox jumps over the lazy dog.';
$str5 = 'football';
$str6 = 'footboll';

//Part 1
$segmentLength = 2;
$segments = str_split($str1, $segmentLength);
echo implode(':', $segments) . "\n";

//Part 2
if(str_contains($str2, 'PHP')) {
    print_r('The PHP word is present at ' . strpos($str2, "PHP"));
} else {
    print_r('The PHP word is not present');
}
echo "\n";

//Part 3
echo basename($str3) . "\n";

//Part 4
$str4 = 'That '.substr($str4, 4); 
echo $str4;
echo "\n";

//Part 5
$i = 0;
while ($str5[$i] == $str6[$i]) {
    $i++;
}
echo $i." -> ".$str5[$i]." != ".$str6[$i];
echo "\n";

//Part 6
$encode = '';

for($i = 0; $i < strlen($str4); $i++) {
    $letter = substr($str4, $i, 1);
    $encode .= chr(ord(substr($str4, $i, 1)) + 1);
}
echo $encode;
echo "\n";

$decode = '';

for($i = 0; $i < strlen($encode); $i++) {
    $letter = substr($encode, $i, 1);
    $decode .= chr(ord($letter) - 1);
}
echo $decode;
echo "\n";