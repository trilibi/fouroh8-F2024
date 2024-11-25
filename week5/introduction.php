<?php
// Question 1: Split the string $str1 into chunks and format as HH:MM:SS
$str1 = '033000';
$part1 = substr($str1, 0, 2);  // First two characters (HH)
$part2 = substr($str1, 2, 2);  // Next two characters (MM)
$part3 = substr($str1, 4, 2);  // Last two characters (SS)
$result = $part1 . ':' . $part2 . ':' . $part3;
print_r($result);  // Expected output: 03:30:00

// Question 2: Check if the word "PHP" is present in $str2 and its position
$str2 = 'PHP stands for PHP: Hypertext Preprocessor, it is a widely-used, open source scripting language';
$pos = strpos($str2, "PHP");
if ($pos !== false) {
    echo "\nThe PHP word is present at $pos \n";
} else {
    echo "\nThe PHP word is not present.\n";
}

// Question 3: Extract the file name from the path in $str3
$str3 = 'www.example.com/public_html/index.php';
$fileLocation = strrpos($str3, "/") + 1;  // Find position of the last "/"
$fileName = substr($str3, $fileLocation);  // Extract file name from the last "/"
echo "The file name is: $fileName \n";  // Expected output: index.php

// Question 4: Replace the first occurrence of 'the' in $str4 with 'That'
$str4 = 'the quick brown fox jumps over the lazy dog.';
$array4 = explode(" ", $str4);  // Split the string into an array of words
$array4[array_search("the", $array4)] = "That";  // Replace the first "the" with "That"
$newString = implode(" ", $array4);  // Join the words back into a string
echo "$newString \n";  // Expected output: That quick brown fox jumps over the lazy dog.

// Question 5 Part A: Find the first differing character between $str5 and $str6
$str5 = 'football';
$str6 = 'footboll';
for ($i = 0; $i < strlen($str5); $i++) {
    if ($str5[$i] !== $str6[$i]) {
        echo "Position " . ($i + 1) . " or Character $str5[$i] and $str6[$i] are different. \n";
        break;  // Only find the first difference
    }
}

// Question 5 Part B: Encode $str4 by shifting each character to the next one in the alphabet
$encodedMessage = "";
for ($j = 0; $j < strlen($str4); $j++) {
    $letter = $str4[$j];
    if (ctype_alpha($letter)) {
        $encodedMessage .= ($letter === 'z' || $letter === 'Z') ? chr(ord($letter) - 25) : chr(ord($letter) + 1);
    } else {
        $encodedMessage .= $letter;  // Keep non-alphabetic characters the same
    }
}
print_r($encodedMessage);  // Encoded message of $str4

?>
