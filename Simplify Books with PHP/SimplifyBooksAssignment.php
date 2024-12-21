<?php

$results = file_get_contents('https://google.com/books.json');
$books = json_decode($results);
print_r($books->response->books[0]->title);

$simple = [];
$simple[] = 4;
print_r($simple);

echo "\n_________________\n";

$simple_books = [];

$books_length = count($books->response->books);
echo $books_length;

for ($i=0; $i < $books_length; $i++) {
    print_r($i);
    $book =  $books->response->books[$i];
    $simple_books[] = [
        'title' => $book->title,
        'id' => $book->id,
        'author' => $book->author,
        'cover_image' => $book->cover,
    ];
}
print_r($simple_books);