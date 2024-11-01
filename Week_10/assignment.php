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
    print_r("Output for ex1: " . $results);
    echo "\n";

    #excercise2
    $position = strpos($str2, 'PHP');
    if($position !== false){
        print_r("Output for ex2: The PHP word is present at position: " . $position);
        echo "\n";
    } 
    else{
        print_r("Output for ex2: The PHP word is not present.");
        echo "\n";
    }

    #excercise3
    $filename = basename($str3);
    print_r("Output for ex3: " . $filename);
    echo "\n";

    #excercise4
    $firstThePosition = strpos($str4, 'the');
    if ($firstThePosition !== false) {
        $modifiedStr4 = substr($str4, 0, $firstThePosition) . 'That' . substr($str4, $firstThePosition + strlen('the'));
    } else {
        $modifiedStr4 = $str4; # keep the string, no "the" found
    }
    print_r("Output for ex4: " . $modifiedStr4);
    echo "\n";

    #excercise5
    $firstDiffChar = '';
    for ($i = 0; $i < min(strlen($str5), strlen($str6)); $i++) {
        if ($str5[$i] !== $str6[$i]) {
            $firstDiffChar = $str5[$i] . " and " . $str6[$i];
            break; # exit loop after finding the difference
        }
    }
    print_r("Output for ex5: The first different characters are: " . $firstDiffChar. " at position " . $i);
    echo "\n";

    #excercise6
    $encoded = '';
    for($i=0; $i<strlen($str4); $i++){
        $letter = substr($str4, $i, 1);
        #echo $i. "->". $letter . "->" . ord($letter). "\n";
        $encoded .= chr(ord($letter)+1);
    }
    print_r("Output for ex6: " . $encoded);
    echo "\n";
    
?>