<?php

class Smath {
  public $numOne;
  public $numTwo;

  public function __construct($numOne, $numTwo) {
    if(!$numOne || !$numTwo) {
      $this->numOne = 10;
      $this->numTwo = 20;
    } else{
    $this->numOne = $numOne;
    $this->numTwo = $numTwo;
    }
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
    return $this->numOne / $this->numTwo;
  }

  public function __tostring() {
    return "Smath: Smath Complete with {$this->numOne} and {$this->numTwo}";
  }
}
?>
<html>
  <head>
    <title>PHP Form & Class</title>
  </head>
  <body>
    <form action="" method="">
      <label>Num 1 
        <input name="numOne" 
          value="<?= isset($_REQUEST["numOne"]) ? $_REQUEST["numOne"] : '' ?>" />
      </label>  
      <label>Num 2 
        <input name="numTwo" 
        value="<?= isset($_REQUEST["numTwo"]) ? $_REQUEST["numTwo"] : '' ?>" />
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
          echo "<p style='color:green'>Smaths as string: {$maths}</p>";
        } catch (Throwable $e) {
          echo "<p style='color:red'>Add a __toString method</p>";
        }
      }
    ?>
  </body>
</html>