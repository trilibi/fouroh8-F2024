<?php

$results = file_get_contents('https://google.com/books.json');
$books = json_decode($results);
print_r($books->response->books[0]->title);
#print_r($books->response->books[0]);
echo "\n";

$simple = [];
$simple[] = 4;
print_r($simple);

$simple_books = [];
$books_length = count($books->response->books);
echo $books_length;
echo "\n";

# we want to return a simple array of books that includes title, id, author and cover image
for($i = 0; $i < $books_length ;$i++){
	print_r($i);
	$book = $books->response->books[$i];
	$simple_books[] = [
			'id' => $book->id,
			'title' => $book->title,
			'author' => $book->author,
			'cover' => $book->cover
		];
}
echo "\n";
print_r($simple_books);
?>