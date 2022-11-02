const clientName = document.getElementById("name")
const product = document.getElementById("product")
const portion = document.getElementById("portion")
const sauce = document.getElementById("sauce")
const addProductButton = document.getElementById("add-product-button")
const finishOrderButton = document.getElementById("end-order")
const previewOrder = document.getElementById("preview")
const previewClientName = document.getElementById("preview-order-name")
const previewOrderProducts = document.getElementById("preview-order-products")
const previewOrderCost = document.getElementById("preview-order-cost")
const extras = document.getElementById("extras")
let productsInOrder = 0
let productsNameInOrder = []
let today = new Date()


class pedido{
    constructor(id,nombre,pedido,costo){
        this.id = id
        this.nombre = nombre
        this.pedido = pedido
        this.costo = costo
    }
}

getDate()

clientName.addEventListener("keydown" && "keyup", namePreview )
product.addEventListener("change",cambio)
addProductButton.addEventListener("click", addProduct)
finishOrderButton.addEventListener("click", finishOrder)



//NAME PREVIEW 
function namePreview(){
    previewClientName.innerHTML = `<p>Nombre</p>
    <p>${clientName.value}</p>`
}


//PRODUCT SELECTION
function cambio(){
    if(product.value === "extras"){
        extras.style.display = "inline"
        document.querySelector(".portion").style.display = "none"
        document.querySelector(".sauces").style.display = "none"
        document.querySelector(".extras").style.display = "block"
    }

    else if(product.value === ""){
        document.querySelector(".portion").style.display = "none"
        document.querySelector(".sauces").style.display = "none"
        document.querySelector(".extras").style.display = "none"
    }

    else{
        document.querySelector(".portion").style.display = "block"
        document.querySelector(".sauces").style.display = "block"
        document.querySelector(".extras").style.display = "none"
    }
}


//ADD NEW PRODUCT
function addProduct (){
    
    if(product.value === "extras"){
        if(extras.value === ""){
            alert("Selecciona un producto valido")
        }

        else{
            productsInOrder++
            console.log(extras.value + " <---- esta fue la opcion")
            productsNameInOrder[productsInOrder] = extras.value
            previewOrderProducts.innerHTML += `<p> ${productsNameInOrder[productsInOrder]} <button onclick="deleteProduct(${productsInOrder})">x</button> </p>`
            product.value = ""
            extras.value = ""
            document.querySelector(".extras").style.display = "none"
            orderCost()
        }
        



    }

    else{
        if(portion.value === "" | product.value === "" | sauce.value === ""){
            alert("hay algo mal en tu orden")
        }

        else{
            productsInOrder++
        productsNameInOrder[productsInOrder] = portion.value + " de " + product.value + " " + sauce.value
        console.log(productsNameInOrder)
        previewOrderProducts.innerHTML += `<p> ${productsNameInOrder[productsInOrder]} <button onclick="deleteProduct(${productsInOrder})">x</button> </p>`

        portion.value = ""
        sauce.value = ""
        product.value = ""
        document.querySelector(".portion").style.display = "none"
        document.querySelector(".sauces").style.display = "none"
        orderCost()
        }
    }
}



//DELETE PRODUCT
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

    productsInOrder = productsNameInOrder.length -1
    console.log("hay " + productsInOrder + " productos en la orden")
    console.log(productsNameInOrder)
}



//ORDER TOTAL $
function orderCost(){
    let mediosKilos = 0
    let kilos = 0
    let totalCost = 0
    productsNameInOrder.forEach(product =>{

        if(product.indexOf("1/2 kg de Alitas") > -1){
            mediosKilos++
            totalCost += 110
        }

        else if (product.indexOf("1 kg de Alitas") > -1){
            kilos++
            totalCost += 200
        }

        else if (product.indexOf("1/2 kg de boneless") > -1) {
            mediosKilos++
            totalCost += 130
        }

        else if (product.indexOf("1 kg de boneless") > -1){
            totalCost += 250
        }
        else if (product.indexOf("papas a la francesa") > -1 | product.indexOf("aros de cebolla") > -1 ){
            console.log("seleccionaste papas pero no aparece en el costo")
            totalCost += 50
        }
        else {}
    })

    previewOrderCost.innerHTML = `<p>Total</p>
    <p>$${totalCost}</p>`

    console.log("hay " + mediosKilos + " medio kilo en la orden")
    console.log("hay " + kilos + " kg en la orden")
    console.log("Tu orden es de: $" + totalCost)
    return totalCost
}

//FINISH ORDER

function finishOrder(){
    if(productsNameInOrder.length < 2){
        alert("no tienes productos en tu orden")
    }

    else{
        alert("tienes "+(productsNameInOrder.length -1)+ " pedidos en tu orden")
        let ordersArray = []
        let productsHtml = ""

        productsNameInOrder.forEach(product =>{
            productsHtml += `<p>${product}</p>`

        })


        //ordersArray = JSON.parse(localStorage.getItem(getDate()))
        let order
        console.log(ordersArray + " esto es lo que imprime el ordersArray cuando no hay ningun elemento")
        if(ordersArray === null){
            console.log("ordersArray es igual a null")
            order = new pedido(1,clientName.value,productsHtml,orderCost())
        }
        else{
            order = new pedido(ordersArray.length + 1,clientName.value,productsHtml,orderCost())
        }
        console.log(order)

        ordersArray.push(order)
        localStorage.setItem(getDate(),JSON.stringify(ordersArray))
        
    }
}

//GET ORDERS

function getOrders (){
    let ordersArray = []
    if(JSON.parse(localStorage.getItem(getDate())) === null){
        console.log("NO HAY ORDENES")
    }

    else{
        ordersArray = JSON.parse(localStorage.getItem(getDate()))
    }

    console.log("GET ORDERS FUNCTION")
    console.log(ordersArray)
}

//DATE
function getDate(){
    let todayF = today.getDate() + "/" + (today.getMonth() +1) + "/" + today.getFullYear()
    let datePrint = document.querySelector(".date")
    datePrint.innerHTML = todayF
    console.log("entro a la funcion")
    console.log(datePrint)
    return todayF
}