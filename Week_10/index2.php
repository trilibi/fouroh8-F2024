<?php
$str1 ='033000';
$str2 = 'PHP stands for PHP: Hypertext Preprocessor, it is a widely-used, open source scripting
language';
$str3 = 'www.example.com/public_html/index.php';
$str4 = 'the quick brown fox jumps over the lazy dog.';
$str5 = 'football';
$str6 = 'footboll';


$results = file_get_contents('https://google.com/books.json');
$books = json_decode($results, true);
print_r($books->response->docs[0]->title);

$simple = [];
$simple[] = 4;
print_r($simple);

$simple_books = [];
$books_length = count($books->response->docs);
echo $books_length;
for ($i = 0; $i < $books_length; $i++) {
    print_r($i);
    $book = $books->response->docs[$i];
    $simple_books[] = [
        'title' => $book->title
    ];
}
print_r($simple_books);

?>
