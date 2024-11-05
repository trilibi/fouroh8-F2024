<?php

// Google Books API endpoint (using 'Harry Potter' as a search example)
$searchQuery = 'Harry Potter';
$apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=' . urlencode($searchQuery);

// Retrieve JSON data from the API
$results = file_get_contents($apiUrl);
$books = json_decode($results);

if (isset($books->items)) {
    // Create a simplified array of book information
    $simple_books = [];
    $books_length = count($books->items);

    // Add title and other information to the book info array
    for ($i = 0; $i < $books_length; $i++) {
        $book = $books->items[$i]->volumeInfo;
        $simple_books[] = [
            'title' => $book->title ?? 'No Title',
            'id' => $books->items[$i]->id ?? 'No ID',
            'authors' => $book->authors[0] ?? 'Unknown Author',
            'cover' => $book->imageLinks->thumbnail ?? 'No Cover'
        ];
    }

    // Output the results
    print_r($simple_books);
} else {
    echo "No books found or an error occurred.";
}
