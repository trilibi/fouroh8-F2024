<?php
$results = file_get_contents('https://google.com/books.json');
$books = json_decode($results);
print_r($books ->response->books[0]->title); 

$simple = [];
$simple[] = 4; 
print_r($simple); 

$simple_books = []; 
$books_length = count($books ->response->books); 
echo $books_length; 

// we want to return array of books that includes the title , id, author, and cover image
for($i=0; $i < $books_length; $i++) {
	print($i);
	$book = $books ->response->books[0]; 
	$simple_books[] = [
		'title' => $book->tittle
		]; 
}
print_r($simple_books); 
