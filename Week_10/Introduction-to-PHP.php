<?php
/*
 * Introduction to PHP
 * https://canvas.unk.edu/courses/48785/assignments/642639
 * Nova Solarz
 * 2024-10-31
 * */

// --- given code ---------------------------------------------------------------------------
$str1 ='033000';
$str2 = 'PHP stands for PHP: Hypertext Preprocessor, it is a widely-used, open source scripting
language';
$str3 = 'www.example.com/public_html/index.php';
$str4 = 'the quick brown fox jumps over the lazy dog.';
$str5 = 'football';
$str6 = 'footboll';

// --- my code -------------------------------------------------------------------------------

/* 1 ---------------------------------------------------------------------------
	split $str1 into chunks of specific size (ex. 2) and put : to delim
	espected output: 03:30:00
--------------------------------------------------------------------------- */
// way 1
$a = substr($str1, 0, 2);
$b = substr($str1, 2, 2);
$c = substr($str1, 4, 2);
$results = $a.':'.$b.':'.$c;
print_r($results);
echo "\n";

// way 2
//$bits = implode(':', [substr($str1, 0, 2), substr($str1, 2, 2), substr($str1, 4, 2)] );
//print_r($bits);
//echo "\n";

/* 2 ---------------------------------------------------------------------------
Check whether the string $str2 contains PHP,

    if yes, print the message "The PHP word is present at" + print position of first PHP
    otherwise print "The PHP word is not present."
--------------------------------------------------------------------------- */
if(str_contains($str2, 'PHP')) {
    print_r('The PHP word is present at ' . strpos($str2, "PHP"));
} else {
    print_r('The PHP word is not present');
}
echo "\n";


/* 3 ---------------------------------------------------------------------------
Extract the file name from the string $str3.
--------------------------------------------------------------------------- */
$filename = '';
$i = strlen($str3)-1;
while ($str3[$i] != '/') {
    $filename .= $str3[$i];
    $i--;
}
$filename = strrev($filename);
echo $filename;
echo "\n";


/* 4 ---------------------------------------------------------------------------
Replace the first "the" of the string $str4 with "That"
--------------------------------------------------------------------------- */
$str4 = 'That '.substr($str4, 4); // cut off "the " from $str4 with substr()
echo $str4;
echo "\n";

/* 5 ---------------------------------------------------------------------------
Find the first character that is different between $str5 and $str6
--------------------------------------------------------------------------- */
$i = 0;
while ($str5[$i] == $str6[$i]) {
    $i++;
}
echo $i." -> ".$str5[$i]." != ".$str6[$i];
echo "\n";

/* 6 ---------------------------------------------------------------------------
    Encrypt the string $str4, replace each character in the input string with the next
    alphabetic character (e.g. a→b, b→c, ... z→a).
--------------------------------------------------------------------------- */
// encrypt
$encode = '';
for($i = 0; $i < strlen($str4); $i++) {
    $letter = substr($str4, $i, 1);
    $encode .= chr(ord(substr($str4, $i, 1)) + 1);
}
echo $encode;
echo "\n";

// decrypt
$decode = '';
for($i = 0; $i < strlen($encode); $i++) {
    $letter = substr($encode, $i, 1);
    $decode .= chr(ord($letter) - 1);
}
echo $decode;
