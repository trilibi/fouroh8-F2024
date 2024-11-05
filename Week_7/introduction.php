<?php

$str1 = "033000";
$chunkSize = 2;
$chunks = str_split($str1, $chunkSize);
$formattedStr1 = implode(':', $chunks);
echo "Formatted String 1: $formattedStr1\n";

$str2 = "My name is Reiden";
$position = stripos($str2, 'Reiden');
if ($position !== false) {
    echo "My name is present at position: $position\n";
} else {
    echo "My name is not present.\n";
}

$str3 = "/path/to/file.txt";
$fileName = basename($str3);
echo "File Name: $fileName\n";

$str4 = "Hi how are you";
$modifiedStr4 = preg_replace('/\bHi\b/', 'Hello', $str4, 1);
echo "Modified String 4: $modifiedStr4\n";

$str5 = "abcdefg";
$str6 = "abcXefg";
$differentCharIndex = -1;

for ($i = 0; $i < min(strlen($str5), strlen($str6)); $i++) {
    if ($str5[$i] !== $str6[$i]) {
        $differentCharIndex = $i;
        break;
    }
}

if ($differentCharIndex !== -1) {
    echo "First different character is at index $differentCharIndex: '{$str5[$differentCharIndex]}' vs '{$str6[$differentCharIndex]}'\n";
} else {
    echo "Strings are identical up to the length of the shorter one.\n";
}

function encryptString($input) {
    $output = '';
    for ($i = 0; $i < strlen($input); $i++) {
        $char = $input[$i];
        if (ctype_alpha($char)) {
            if ($char === 'z') {
                $output .= 'a';
            } elseif ($char === 'Z') {
                $output .= 'A';
            } else {
                $output .= chr(ord($char) + 1);
            }
        } else {
            $output .= $char;
        }
    }
    return $output;
}

$encryptedStr4 = encryptString($str4);
echo "Encrypted String 4: $encryptedStr4\n";

?>
