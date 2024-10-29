<?php
//Question 1
	$str1 ='033000';


//Question 2
	$str2 = 'PHP stands for PHP: Hypertext Preprocessor, it is a widely-used, open source scripting
	language';
	$pos = strpos($str2, "PHP");

	if($pos !== false){
		echo "The PHP word is present at $pos \n";
	} else {
		echo "The PHP word is not present.";
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
			echo "Position $i or Character $str5[$i] and $str6[$i] are different.";
		}
	}
	
	//Part B






?>