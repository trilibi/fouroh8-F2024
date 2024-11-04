<?php
$str1 ='033000';
$str2 = 'PHP stands for PHP: Hypertext Preprocessor, it is a widely-used, open source scripting
language';
$str3 = 'www.example.com/public_html/index.php';
$str4 = 'the quick brown fox jumps over the lazy dog.';
$str5 = 'football';
$str6 = 'footboll';

// Q1: Split the string $str1 into chunks of a specific size (e.g. 2), and put : to separate chunks.
// Expected output for the $str1 is: 03:30:00
$a = substr($str1, 0, 2);
$b = substr($str1, 2, 2);
$c = substr($str1, 4, 2);

$str1 = $a .":" . $b . ":" . $c;
print_r($str1. "\n");

/*
Q2,  Check whether the string $str2 contains PHP, 
*/ 
$array = explode(" ", $str2); // split by spaces

for($i=0; $i < count($array); $i++) {
	if($array[$i] == "PHP") {
		print_r("The PHP word is present at". " $i ". "\n");
		break;
	} else {
		print_r("The PHP word is not present." . "\n");
	}
}

/*
Q3: Extract the file name from the string 
*/
echo basename($str3. "\n"); // using basename function to retruns the trailling name component of a path
/* 

/*
Q4: Replace the firsrt the of the string $str4 with That
*/
$array1 = explode(" ", $str4); // using explode function to split string

for($i=0; $i < count($array1); $i++) {
	if($array1[$i] == "the") {
		$array1[$i] = "That";
		break;
	}
}

print_r(implode(" ", $array1). "\n"); //impode is reverse function of explode, making array to sring with specific element between each 

/*
Q5-0:Find the first charactyer that is different between $str5 and $str6
*/
for($i=0; $i < strlen($str5); $i++) {
	if ($str5[$i] != $str6[$i]) {
		print_r("The first character that is different between '$str5' and '$str6' is ". $str5[$i]. " and $str6[$i]". "\n"); 
		break; 
	}
}

/*
Q5-01:  Encrypt the string $str4, replace each character in the input string with the next
alphabetic character (e.g. a→b, b→c, ... z→a).
*/

for($i=0; $i<strlen($str4); $i++) {
	if($str4[$i] != " ") {
		if(ord($str4[$i]) >= 97 && ord($str4[$i]) < 122) { // a = 97, and z=122 in ASCII
			$str4[$i] = chr(ord($str4[$i]) + 1); 
		} else if(ord($str4[$i] == 122)) {	// is it is "z" it should be converted to "a"
			$str4[$i] = 97;
		} 
	}
}

print_r($str4); 
