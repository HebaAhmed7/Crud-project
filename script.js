var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productDescInput = document.getElementById("productDesc");
var productCategoryInput = document.getElementById("productCategory");

var productsContainer;
if (localStorage.getItem("productsList") == null)//zbon gdid
{
    productsContainer = [];
}
else {
    productsContainer = JSON.parse(localStorage.getItem('productsList'));
    displayProducts();
}
function addProduct() {


    var product = {

        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value
    }
    productsContainer.push(product);
    localStorage.setItem("productsList", JSON.stringify(productsContainer));
    clearForm();
    displayProducts();

}

function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
}

function displayProducts() {

    var cartoona = ``;
    for (var i = 0; i < productsContainer.length; i++) {
        cartoona += `<tr>
        <td>${i}</td>
        <td>${productsContainer[i].name}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].category}</td>
        <td>${productsContainer[i].desc}</td>
        <td> <button onclick="prepUpdate(${i})" class="btn btn-outline-warning">update</button></td>
        <td> <button onclick="deleteProducts(${i})" class="btn btn-outline-danger">delete</button></td>
        <td> <button onclick="updateProducts(${i})" class = "btn btn-outline-info">Confirm Update</button> </td>
    </tr>`;
    }
    document.getElementById("tableBody").innerHTML = cartoona;
}

function searchProducts(term) {
    var cartoona = ``;
    for (var i = 0; i < productsContainer.length; i++) {

        if (productsContainer[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
            cartoona += `<tr>
            <td>${i}</td>
            <td>${productsContainer[i].name}</td>
            <td>${productsContainer[i].price}</td>
            <td>${productsContainer[i].category}</td>
            <td>${productsContainer[i].desc}</td>
            <td> <button onclick="prepUpdate(${i})" class="btn btn-outline-warning">update</button></td>
            <td> <button  onclick="deleteProducts(${i})" class="btn btn-outline-danger">delete</button></td>
            <td> <button  onclick="updateProducts(${i})" class = "btn btn-outline-info">Confirm Update </td>
        </tr>`;
        }
    }
    document.getElementById("tableBody").innerHTML = cartoona;
}

function deleteProducts(index) {
    productsContainer.splice(index , 1);
    displayProducts();
    localStorage.setItem("productsList", JSON.stringify(productsContainer));
}

function updateProducts(index) {
    if (productNameInput.value != "" && productPriceInput.value != "" && productCategoryInput.value != "" && productDescInput.value != "") {
        productsContainer[index].name = productNameInput.value;
        productsContainer[index].price = productPriceInput.value;
        productsContainer[index].category = productCategoryInput.value;
        productsContainer[index].desc = productDescInput.value;
        localStorage.setItem("productsList", JSON.stringify(productsContainer));
        displayProducts()
        clearForm()
    }
    else {
        window.alert("Press the update button first")
    }
}

function prepUpdate(index) {
    productNameInput.value = productsContainer[index].name;
    productPriceInput.value = productsContainer[index].price;
    productCategoryInput.value = productsContainer[index].category;
    productDescInput.value = productsContainer[index].desc;
}