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

// We want to return a simple array of books that includes the title, id, author, and cover image
for ($i = 0; $i < $books_length; $i++) {
    print_r($i);
	$book =  $books->response->books[$i];
    $simple_books[] = [
        'title' => $book->title,
        'id' => $book->id,
        'author' => $book->author,
        'cover_image' => $book->cover
    ];
}

print_r($simple_books);
?>