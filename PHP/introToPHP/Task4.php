<?php
$str4 = 'the quick brown fox jumps over the lazy dog.';
$str4_output = preg_replace('/the/', 'That', $str4, 1);
echo $str4_output;