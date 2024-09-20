var submit = () => {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    alert(format(name, age));
}

var format = (name, age) => {
    if (age === "" || age === null){
        age = 20;
    }

    if (name === "" || age === null){
        name = "User"
    }

    return "Hello "+ name + 
    "\nYou are " + age + " years old.";
}