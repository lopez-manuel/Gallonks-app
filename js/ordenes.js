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
    previewOrderProducts.innerHTML += `<p>${portion.value} de ${product.value} ${sauce.value}`
    portion.value = ""
    portion.style.display = "none"
    sauce.value = ""
    sauce.style.display = "none"
    product.value = ""
}
