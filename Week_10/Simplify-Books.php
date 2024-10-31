<!--
 * Simplify Books with PHP
 * https://canvas.unk.edu/courses/48785/assignments/654621
 * Nova Solarz
 * 2024-10-30
 -->

<?php
$results = file_get_contents('https://google.com/books.json');
$books = json_decode($results);

print_r($books->response->books[0]->title);

$simple = [];
$simple[] = 4; // same as array.push() in JS
print_r($simple);

$simple_books = [];
$books_length = count($books->response->books); // count() == length()
echo $books_length;

// TODO: v
// we want to return a simple array of books that includes title, id, author, and cover-image.
for($i = 0; $i < $books_length; $i++) {
    $book = $books->response->books[$i];
    $simple_books[] = [
        'title' => $book->title
    ];
}
print_r($simple_books);