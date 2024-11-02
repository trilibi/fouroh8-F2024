<?php
$str1 ='033000';
$str2 = 'PHP stands for PHP: Hypertext Preprocessor, it is a widely-used, open source scripting
language';
$str3 = 'www.example.com/public_html/index.php';
$str4 = 'the quick brown fox jumps over the lazy dog.';
$str5 = 'football';
$str6 = 'footboll';
$a = substr($str1, 0, 2);
$b = substr($str1, 2, 2);
$c = substr($str1, 4, 2);
$result = $a.':' .$b.':' .$c;
print_r($result);

echo "\n";

print_r([$a, $b, $c]);
$bits = [substr($str1, 0, 2), substr($str1, 2, 2), substr($str1, 4, 2)];
print_r(implode(':', $bits));

print_r(strlen($str4));
for($i = 0; $i < strlen($str4); $i++) {
    echo $i. "-> ". substr($str4,$i,1). "\n";
    $encoded .= ord(substr($str4, $i, 1)) . " ";
}
echo $encoded;

$encoded = '';
for($i = 0; $i < strlen($str4); $i++) {
    $letter = substr($str4, $i, 1);
    echo $i. "-> ". $letter. ' -> '. ord($letter).chr(ord($letter) + 1). "\n";
    $emcpded.= chr(ord(substr($str4,$i,1)) + 1);
}
echo $encoded;
?>