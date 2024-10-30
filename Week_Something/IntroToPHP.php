<?php
//Question 1
	$str1 ='033000';

	$part1 = substr($str1, 0, 2);
	$part2 = substr($str1, 2, 2);
	$part3 = substr($str1, 4, 2);
	$result = $part1.':'.$part2.':'.$part3;
	print_r($result);

//Question 2
	$str2 = 'PHP stands for PHP: Hypertext Preprocessor, it is a widely-used, open source scripting language';
	$pos = strpos($str2, "PHP");

	if($pos !== false){
		echo "\nThe PHP word is present at $pos \n";
	} else {
		echo "\nThe PHP word is not present.";
	}

//Quesiton 3
	$str3 = 'www.example.com/public_html/index.php';
	$fileLocation = strrpos($str3, "/") + 1;
	$fileName = substr($str3, $fileLocation);
	echo "The file name is: $fileName \n";

//Question 4
	$str4 = 'the quick brown fox jumps over the lazy dog.';
	$array4 = explode(" ", $str4);
	$array4[strpos($str4, "the")] = "That";
	$newString = implode(" ",$array4);

	echo "$newString \n";

//Question 5
	//Part A
	$str5 = 'football';
	$str6 = 'footboll';
	
	for($i = 0; $i < strlen($str5); $i++){
		if($str5[$i] !== $str6[$i]){
			echo "Position $i or Character $str5[$i] and $str6[$i] are different. \n";
		}
	}
	
	//Part B
	$encodedMessage = "";
	for($j = 0; $j < strlen($str4); $j++){
		$letter = $str4[$j];
		$encodedMessage .= chr(ord($letter) + 1);
	}

	print_r($encodedMessage);





?>