<?php

// 1
$str1 = '033000';
$result1 = implode(':', str_split($str1, 2));

echo "Answer 1. " . $result1 . "<br>";

// 2
$str2 = 'PHP stands for PHP: Hypertext Preprocessor, it is a widely-used, open source scripting language';
$pos = strpos($str2, "PHP");
if ($pos !== false) {
    echo "Answer 2. " . "The PHP word is present at " . $pos . "<br>";
} else {
    echo "Answer 2. " . "The PHP word is not present." . "<br>";
}

// 3
$str3 = 'www.example.com/public_html/index.php';
$result3 = basename($str3);
echo "Answer 3. " . $result3 . "<br>";

// 4
$str4 = 'the quick brown fox jumps over the lazy dog.';
$result4 = preg_replace("/the/", 'That', $str4, 1); 
echo "Answer 4. " . $result4 . "<br>";


// 5
$str5 = 'football';
$str6 = 'footboll';
$diff_pos = -1;
for ($i = 0; $i < min(strlen($str5), strlen($str6)); $i ++) {
    if ($str5[$i] !== $str6[$i]) {
        $diff_pos = $i; 
        break;
    }
}

if ($diff_pos !== -1) {
    echo "Answer 5. The first different character in str5 : " . '"' . $str5[$diff_pos] . '"' . " in str6 : " . '"' . $str6[$diff_pos] . '"' . "<br>";
} else {
    echo "Answer 5. There is no different character.";
}



// 5 - 1
$result5_1 = '';
for ($i = 0; $i < strlen($str4); $i++) {
    $str = $str4[$i];
    if (ctype_alpha($str)) {
        if ($str === 'Z') {
            $str = 'a';
        }
        elseif ($str === 'z') {
            $str = 'A';
        }
        else {
            $str = chr(ord($str) + 1);
        }
    }

    $result5_1 .= $str;
}

echo "Answer 5-1. " . $result5_1;

?>