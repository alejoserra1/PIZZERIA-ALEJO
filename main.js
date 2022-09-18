const pizzas = [

    {id: 1, nombre: "Verdeo", ingredientes: ["Cebolla de verdeo", " Salsa de Tomate", " Muzzarela",], precio: 780, img: "pizza-verdeo.jpg"},
    
    {id: 2, nombre: "Especial", ingredientes: ["Muzzarella", " Jamon", " Aceitunas", " Morrón"], precio: 500, img: "pizza-especial.jpg"},
    
    {id: 3, nombre: "Roquefort", ingredientes: [ "Salsa de Tomate"," Roquefort", " Aceitunas"], precio: 700, img: "pizza-roquefort.jpg"},
    
    {id: 4, nombre: "Pepperoni", ingredientes: ["Salsa de Tomate", " Muzzarela", " Pepperoni",], precio: 800, img: "pizza-pepperoni.jpg"},
    
    {id: 5, nombre: "Bolognesa", ingredientes: ["Carne picada", " Salsa de Tomate" , " Muzzarela",], precio: 810, img: "pizza-bolognesa.jpg"},
    
    {id: 6, nombre: "Salchichas", ingredientes: ["Salsa de Tomate", " Muzzarela", " Salchichas"], precio: 990, img: "pizza-salchichas.png"},
    
];
    
const idDeLaPizza = document.getElementById("numeroPizza");
const cantPizza = document.getElementById("cantidadPizzas");
const formulario = document.querySelector(".addForm");
const cardContainer = document.querySelector(".cardContainer");
const deleteButton = document.querySelector(".delete-btn");
const aceptButton = document.querySelector(".button-accept")

let listaPizzas = JSON.parse(localStorage.getItem("pizzas")) || [];

const showError = (input, message) => {
    const campoForm = input.parentElement;
    const errorField = campoForm.querySelector("small");

    errorField.classList.remove("success");
    errorField.classList.add("error");

    errorField.textContent = message;
}

const showSuccess = (input) => {
    const campoForm = input.parentElement;
    const errorField = campoForm.querySelector("small");

    errorField.classList.add("success");
    errorField.classList.remove("error");

    errorField.textContent = "";
}

const validarId = (idElegido) => {

    valid = false

    let id = +idElegido;

    const pizzaElegida = pizzas.filter(pizza => pizza['id'] === id)

    if (pizzaElegida.length === 0) {
        showError(idDeLaPizza,"El número ingresado es inválido.")
    } else {
        showSuccess(idDeLaPizza)
        valid = true;
    }

    return valid;
}

const validarCantidad = (cantidad) => {
    valid = false;

    let cantidadElegida = +cantidad

    if (cantidadElegida <= 0) {
        showError(cantPizza, "Ordene por lo menos 1 pizza.")
    } else if (cantidadElegida > 8) {
        showError(cantPizza, "Máximo de pizzas por pedido (8).")
    } else {
        showSuccess(cantPizza)
        valid = true;
    };

    return valid;


}

const extraerPizza = (idElegido) => {
    let id = +idElegido;
    const pizzaElegida = pizzas.filter(pizza => pizza['id'] === id).shift();
    return pizzaElegida;
}

const isValidForm = () => {
    const idValid = validarId(idDeLaPizza.value);
    const qValid = validarCantidad(cantPizza.value);

    return (idValid && qValid);
}

const calcularTotal = (precio) => {
    const cantidad = cantPizza.value;
    const total =  cantidad * precio;
    return total; 
}

const renderPizza = (pizza) => {

    const {id, nombre, ingredientes, precio, img} = pizza;

    return `<div class="front">
                <img class="imgDeLaPizza" src="${img}" alt="img-piza">
                <h2 class="nombrePizza">${nombre}</h2>
                <h4 class="precioPizza">$${precio} c/u</h4>
                    <div class="precioTotal">
                        <h3>Precio Total: $${calcularTotal(precio)}</h3>
                    </div>
                    <div class="ingredientes">
                  <ul> Ingredientes: 
                    <li>${ingredientes}</li>
                  </ul></div>
            </div>`

            
}


const saveToLocalStorage = () => {
    localStorage.setItem("Pizzas", JSON.stringify(listaPizzas));
};


const renderListaPizzas = () => {
    cardContainer.innerHTML = listaPizzas.join("");
}

const addPizza = (e) => {
    e.preventDefault();

    const pizzaElegida = extraerPizza(idDeLaPizza.value);

    if (isValidForm()) {
        const pizzaNueva = renderPizza(pizzaElegida);
        listaPizzas = [...listaPizzas, pizzaNueva];
        renderListaPizzas(pizzaElegida);
        saveToLocalStorage();
        hideDeleteButton(listaPizzas);
    }
}

const hideDeleteButton = (listaPizzas) => {
    if (listaPizzas.length === 0) {
        deleteButton.classList.add("hidden")
        aceptButton.classList.remove("hidden")
    } else {
        deleteButton.classList.remove("hidden")
        aceptButton.classList.add("hidden")
    }
}

const borrarPizza = () => {
    listaPizzas = [];

    saveToLocalStorage();
    renderListaPizzas();
    hideDeleteButton(listaPizzas);
}

const init = () => {
    renderListaPizzas();
    formulario.addEventListener("submit", addPizza);
    deleteButton.addEventListener("click", borrarPizza);
    hideDeleteButton(listaPizzas);
};

init();
