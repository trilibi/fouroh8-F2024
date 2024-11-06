<?php

$results = file_get_contents('https://google.com/books.json');
$books = json_decode($results);

// Initialize the simplified books array
$simple_books = [];

// Get the number of books
$books_length = count($books->response->books);

// Loop through each book and extract the desired properties
for ($i = 0; $i < $books_length; $i++) {
    $book = $books->response->books[$i];
    $simple_books[] = [
        'title' => $book->title,
        'id' => $book->id,
        'author' => $book->author,
        'cover_image' => $book->cover_image
    ];
}

// Print the simplified books array
print_r($simple_books);
