<?php
    $str1 = '033000';
    $str2 = 'PHP stands for PHP: Hypertext Preprocessor, it is a widely-used, open source scripting language';
    $str3 = 'www.example.com/public_html/index.php';
    $str4 = 'the quick brown fox jumps over the lazy dog.';
    $str5 = 'football';
    $str6 = 'footboll';

    #excercise1
    $a = substr($str1, 0, 2);
    $b = substr($str1, 2, 2);
    $c = substr($str1, 4, 2);
    $results = $a . ':' . $b . ':' . $c;
    print_r($results);
    echo "\n";

    #excercise6
    #print_r(strlen($str4));
    #echo "\n";
    $encoded = '';
    for($i=0; $i<strlen($str4); $i++){
        $letter = substr($str4, $i, 1);
        #echo $i. "->". $letter . "->" . ord($letter). "\n";
        $encoded .= chr(ord($letter)+1);
    }
    echo $encoded;
    echo "\n";
    #print_r(ord('A'));
    #print_r(ord('B'));

    $decoded = '';
    for($i=0; $i<strlen($encoded); $i++){
        $letter = substr($encoded, $i, 1);
        #echo $i. "->". $letter . "->" . ord($letter). "\n";
        $decoded .= chr(ord($letter)-1);
    }
    echo $decoded;
?>
