<?php
    $str1 = '033000';
    $str2 = 'PHP stands for PHP: Hypertext Preprocessor, it is a widely-used, open source scripting language';
    $str3 = 'www.example.com/public_html/index.php';
    $str4 = 'the quick brown fox jumps over the lazy dog.';
    $str5 = 'football';
    $str6 = 'footboll';

    //Q1
    $chunks = str_split($str1, 2);
    $time = implode(':', $chunks);
    echo "Q1: " . $time . "<br>";

    //Q2
    $pos = strpos($str2, 'PHP');
    if($pos !== false) {
        echo "Q2: The PHP word is present at " . $pos . "<br>";
    }
    else{
        echo "Q2: The PHP word is not present. <br>";
    }

    //Q3
    $fileName = basename($str3);
    echo "Q3: " . $fileName . "<br>";

    //Q4
    $result = preg_replace("/\bthe\b/", 'That', $str4);
    echo "Q4: " . $result . "<br>";

    //Q5
    $diffPos = -1;
    for ($i = 0; $i < min(strlen($str5), strlen($str6)); $i++) {
        if ($str5[$i] !== $str6[$i]) {
            $diffPos = $i;
            break;
        }
    }
    if ($diffPos != -1) {
        echo "Q5: The first character that is different between str5 and str6 is " . $diffPos . "(" . $str5[$diffPos] . " vs " . $str6[$diffPos] . ") <br>";
    } else {
        echo "Q5: The strings are same. <br>";
    }

    //Q6
    $encrypt = '';
    for ($i = 0; $i < strlen($str4); $i++) {
        $char = $str4[$i];
        if (ctype_alpha($char)) {
            if ($char === 'z') {
                $encrypt .= 'a';
            } elseif ($char === 'Z') {
                $encrypt .= 'A';
            } else {
                $encrypt .= chr(ord($char) + 1);
            }
        } else {
            $encrypt .= $char;
        }
    }
    echo "Q6: Encrypted string is '" . $encrypt . "'" . "<br>";
?>