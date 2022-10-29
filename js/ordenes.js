const clientName = document.getElementById("name")
const product = document.getElementById("product")
const portion = document.getElementById("portion")
const sauce = document.getElementById("sauce")
const addProductButton = document.getElementById("add-product-button")
const previewOrder = document.getElementById("preview")
let previewClientName = document.getElementById("preview-order-name")
let previewOrderProducts = document.getElementById("preview-order-products")
let previewOrderCost = document.getElementById("preview-order-cost")
let productsInOrder = 0
let productsNameInOrder = []

portion.style.display = "none"
sauce.style.display = "none"


function deletes(mensaje){
    alert("se elimino el boton " + mensaje)
}

clientName.addEventListener("keydown" && "keyup", namePreview )
product.addEventListener("change",cambio)
addProductButton.addEventListener("click", addProduct)

function namePreview(){
    previewClientName.innerHTML = `<p>Nombre</p>
    <p>${clientName.value}</p>`
}

function cambio(){
    if(product.value === "extras"){
        alert("entro a extras")
        portion.style.display = "none"
        sauce.style.display = "none"
    }

    else{
        portion.style.display = "inline"
        sauce.style.display = "inline"
    }
}


function addProduct (){
    productsInOrder++
    productsNameInOrder[productsInOrder] = portion.value + " de " + product.value + " " + sauce.value
    console.log(productsNameInOrder)
    previewOrderProducts.innerHTML += `<p> ${productsNameInOrder[productsInOrder]} <button onclick="deleteProduct(${productsInOrder})">x</button> </p>`

    portion.value = ""
    portion.style.display = "none"
    sauce.value = ""
    sauce.style.display = "none"
    product.value = ""
    orderCost()
}

function deleteProduct(product){
    let x = 1
    productsNameInOrder.splice(product,1)
    previewOrderProducts.innerHTML = `<p> Pedido </p>`
    
    productsNameInOrder.forEach(element => {

        previewOrderProducts.innerHTML += `<p> ${element} <button onclick="deleteProduct(${x})">x</button> </p>`
        x++
        console.log(x)
        console.log(productsNameInOrder);
        orderCost()
    });

    console.log(productsNameInOrder)
}

function orderCost(){
    let mediosKilos = 0
    let kilos = 0
    productsNameInOrder.forEach(product =>{

        if(product.indexOf("1/2") > -1){
            mediosKilos++
            console.log("hay " + mediosKilos + " medios jen la orden")
        }

        else if (product.indexOf("1 kg") > -1){
            kilos++
            console.log("hay " + kilos + " kg en la orden")
        }

        else {

        }
    })
}