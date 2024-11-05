<?php
    // Initial string variables
    $str1 = '033000';
    $str4 = 'the quick brown fox jumps over the lazy dog.';

    // Convert $str1 to 'hour:minute:second' format
    $a = substr($str1, 0, 2);
    $b = substr($str1, 2, 2);
    $c = substr($str1, 4, 2);
    $result = $a . ':' . $b . ':' . $c;
    print_r($result); // Outputs 03:30:00

    echo "<br>";

    // Add separated time values to an array and output it
    print_r([$a, $b, $c]);
    $bits = [substr($str1, 0, 2), substr($str1, 2, 2), substr($str1, 4, 2)];
    print_r(implode(':', $bits)); // Outputs 03:30:00

    // Output the length of $str4
    print_r(strlen($str4));

    // Code to print the ASCII value of each character (character encoding)
    $encoded = ''; // Initialize
    for ($i = 0; $i < strlen($str4); $i++) {
        echo $i . " -> " . substr($str4, $i, 1) . "<br>";
        $encoded .= ord(substr($str4, $i, 1)) . " ";
    }
    echo $encoded; // Output ASCII values of each character

    echo "<br>";

    // Convert each character's ASCII value and encode to the next character
    $encoded = ''; // Initialize
    for ($i = 0; $i < strlen($str4); $i++) {
        $letter = substr($str4, $i, 1);
        echo $i . " -> " . $letter . ' -> ' . ord($letter) . ' -> ' . chr(ord($letter) + 1) . "<br>";
        $encoded .= chr(ord($letter) + 1);
    }
    echo $encoded; // Output the encoded string
?>
