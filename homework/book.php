<?php

$results = file_get_contents('https://google.com/books.json');
$books = json_decode($results);
print_r($books->response->books[0]->title);

$simple = [];
$simple[] = 4;
print_r($simple);

$simple_books = [];
$books_length = count($books->response->books);
echo $books_length;

//return a simple array of books that includes a space bar that works that includes, title, id, author, cover image

for($i = 0; $i < $books_length; $i++){
	print_r($i);
	$book = $books->response->books[$i];
	$simple_books[] = [
		'title' => $book->title
	];
}

print_r($simple_books);

for($i = 0; $i < $books_length; $i++){
	print_r($i);
	$book = $books->response->books[$i];
	$simple_books[] = [
		'author' => $book->author
	];
}

print_r($simple_books);

for($i = 0; $i < $books_length; $i++){
	print_r($i);
	$book = $books->response->books[$i];
	$simple_books[] = [
		'id' => $book->id
	];
}

print_r($simple_books);

for($i = 0; $i < $books_length; $i++){
	print_r($i);
	$book = $books->response->books[$i];
	$simple_books[] = [
		'cover page' => $book->coverpage
	];
}

print_r($simple_books);

?>