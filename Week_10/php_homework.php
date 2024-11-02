<?php
$str1 = '033000';
$str2 = 'PHP stands for PHP: Hypertext Preprocessor, it is a widely-used, open source scripting
language';
$str3 = 'www.example.com/public_html/index.php';
$str4 = 'the quick brown fox jumps over the lazy dog.';
$str5 = 'football';
$str6 = 'footboll';

// Q1
$split_array = str_split($str1, 2);
foreach ($split_array as $x){
	if ($x != end($split_array)) {
	print_r($x.':');
		
	}
	else {
		print_r($x);
	}
}
	
print_r("\n");

// Q2
echo "The PHP word is present at ", strpos("$str2", "PHP"), "\n";

// Q3
$split_str3 = explode("/", $str3);
foreach ($split_str3 as $section) {
	if (str_contains($section, ".php")) {
		$file = $section;
	}
}
print_r($file."\n");

// Q4
$str4_replaced = str_replace("the", "That", $str4);
echo $str4_replaced, "\n";

// Q5
$str5_letters = str_split($str5);
$str6_letters = str_split($str6);

for ($x = 0; $x < count($str5_letters); $x++) {
	if ($str5_letters[$x] != $str6_letters[$x]) {
		print_r("The letter '".$str5_letters[$x]."' in string 5 does not match the letter '".$str6_letters[$x]."' in string 6 at position ".($x+1)."\n");		
		}
	}
    
// Q6
$str4_split = str_split($str4,1);
$enc_str4_array = [];

foreach ($str4_split as $char) {
	if ($char != " " and $char != "." and $char != "z") {
		$char_ascii = ord($char) + 1;
		array_push($enc_str4_array, chr($char_ascii));
	}
	else if ($char == "z") {
		array_push($enc_str4_array, "a"); //Special exception turning "z" to "a" since next ascii code is "{" and not "a"
	}
	else {
		array_push($enc_str4_array, $char);
	}
}

$enc_str4 = implode("",$enc_str4_array);
print_r($enc_str4."\n");

$enc_str4_split = str_split($enc_str4);
$dec_str4_array = [];

foreach ($enc_str4_split as $char) {
	if ($char != " " and $char != "." and $char != "a") {
		$char_ascii = ord($char) - 1;
		array_push($dec_str4_array, chr($char_ascii));
	}
	else if ($char == "z") {
		array_push($dec_str4_array, "z"); // Reverse of exception on line 60, convert "a" to "z"
	}
	else {
		array_push($dec_str4_array, $char);
	}
}

$dec_str4 = implode("",$dec_str4_array);
print_r($dec_str4."\n");
?>