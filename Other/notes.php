<?php 
//Opening Tag for PHP

//You declare a variable using a $ sign
//You don't technically need the ; but it is important in php
//PHP is very powerful but is not strictly typed which can lead to vulnarbilites and problems
//Imagine Java but not strictly typed
//I have PHP installed so I can just run this on my computer but you might need to configure/install it to work on your comptuer. 
//I just recommend using a online compiler

//Most of the time PHP and HTML are mixed together. PHP is like in a little tag within a HTML page. Kinda like in line <style></style>.

function hellow($userInput) {
    echo "Hello $userInput";
}

$name = "Arianna";
$arrayName = array("Get", "Better", "Soon");

//This is just purely PHP. This is not how its usually used. You usually use it html. I don't really use PHP with HTML that much 
//But I wanted to give you something to look at 
for( $i = 1; $i <= 20; $i++){
    echo "$i\n";
}

hellow($name);
print "\n$arrayName[0]"; //Slower but will return the value 
echo "\n$arrayName[1]\n"; //Quicker and lets you concat multiple strings
print $arrayName[2];

//Closing Tag for PHP 

?>
