<?php
$str2 = 'PHP stands for PHP: Hypertext Preprocessor, it is a widely-used, open source scripting language';
$position = strpos($str2, 'PHP');
if ($position !== false) {
    echo "The PHP word is present at position $position";
} 
else {
    echo "The PHP word is not present";
}