<?php

class Smath {
  public $numOne = 0;
  public $numTwo = 0;

  public function __construct($numOne, $numTwo) {
    $this->numOne = $numOne;
    $this->numTwo = $numTwo;
  }

  public function add() {
    return $this->numOne + $this->numTwo;
  }

  public function subtract() {
    return $this->numOne - $this->numTwo;
  }

  public function multiply() {
    return $this->numOne * $this->numTwo;
  }

  public function divide() {
    return $this->numTwo != 0 ? $this->numOne / $this->numTwo : "undefined (divide through 0 not possible)";
  }

  public function __toString(){
    return "Smaths Completed with {$this->numOne} and {$this->numTwo}";
  }
}
?>
<html>
  <head>
    <title>PHP Form & Class</title>
  </head>
  <body>
    <h1> Hello: <?php echo $_REQUEST['name'] ?? 'No Name' ?><h1>
      $_REQUEST
      <pre>
        <?php print_r($_REQUEST)?>
      </pre>
      $_GET
      <pre>
        <?php print_r($_GET)?>
      </pre>
      $_POST
      <pre>
        <?php print_r($_POST)?>
      </pre>
    <h2> Your age is:
    <form action="" method="POST">
      <label>Num 1 
        <input name="numOne" 
          value="<?= isset($_REQUEST["numOne"]) ? $_REQUEST["numOne"] : '0' ?>" />
      </label>  
      <label>Num 2 
        <input name="numTwo" 
        value="<?= isset($_REQUEST["numTwo"]) ? $_REQUEST["numTwo"] : '1' ?>" />
      </label>  
      <button type="submit" name="calculate">All the Maths</button> 
    </form>
    <?php if(isset($_REQUEST['calculate'])): ?>
    <pre style="color: navy">Form Request: <?php print_r($_REQUEST) ?></pre>
    <?php endif; ?>
    <?php
      $maths = null;

      if (isset($_REQUEST['numOne']) && isset($_REQUEST['numTwo'])) {
        $maths = new Smath($_REQUEST['numOne'], $_REQUEST['numTwo']);
      }


      if ($maths) {
        echo '<pre style="color: navy">' . print_r($maths, true) . '</pre>';
        echo "<p>The sum is {$maths->add()}</p>";
        echo "<p>The difference is {$maths->subtract()}</p>";
        echo "<p>The product is {$maths->multiply()}</p>";
        echo "<p>The quotient is {$maths->divide()}</p>";

        try {
          echo "<p>Smaths as string: {$maths}</p>";
        } catch (Throwable $e) {
          echo "<p style='color:red'>Add a __toString method</p>";
        }
      }
    ?>
  </body>
</html>