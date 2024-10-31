<?php
$results = file_get_contents('https://google.com/books.json');
$books = json_decode($results);
//print_r($books -> response);

$simple = [];
$simple[] = 4;
print_r($simple);

$simple_books = [];
$books_length = count($books -> response -> books);
echo $books_length;

for($i = 0; $i < $books_length; $i++){
	$book = $books -> response -> books[$i];
	$simple_books[] = [
		['title' => $book -> title],
		['id' => $book -> id],
		['author' => $book -> author],
		['cover' => $book -> cover]
		];
}


//We want a simple array of books that includes a title, id, author, and cover image. 
print_r($simple_books);


?>