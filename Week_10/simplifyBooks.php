<?php
$results = file_get_contents('https://google.com/books.json');
$books = json_decode($results)->response->books;
print_r($books[0]->title);

$simple = [];
$simple[] = 4;
print_r($simple);

$simple_books = [];
$books_length = count($books);
echo $books_length."\n";
// we want to return a simple array of books that includes the title, id, author, and cover image
for($i=0; $i < $books_length; $i++) {
	print_r($i);
	$simple_books[] = [
		'title' => $books[$i]->title,
		'id' => $books[$i]->id,
		'author' => $books[$i]->author,
		'cover image' => $books[$i]->cover
		];
}
print_r($simple_books);
?>