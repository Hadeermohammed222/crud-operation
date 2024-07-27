let btnAdd = document.getElementById("add");
let tbody = document.getElementById("tbody");

/////////////////////////////////////////
// crud operations.
// create == add new product.
// read == display item.
// update == update item.
// delete == delete item.
// search.
// regex.
////////////////////////////////////////

var pn = document.getElementById("pn");
var pp = document.getElementById("pp");
var pc = document.getElementById("pc");
var pd = document.getElementById("pd");
var tr = '';

var productUpdate;
var number;
var allProducts = []; 

var test = localStorage.getItem("allProducts");

if(test != null){
    allProducts = JSON.parse(test);
    displayAllProducts(allProducts);
}

function addProduct(){
    //array or object.
    //logic steps.
    //single responsibility.
    
    var product = {
        name:pn.value,
        price:Number(pp.value),
        category:pc.value,
        description:pd.value
    }
  
    if(product.name == '' && product.price == 0 &&
       product.category == '' && product.description == '')
    {
       console.log('product ......')
    }
    else{
       allProducts.push(product);
       localStorage.setItem("allProducts", JSON.stringify(allProducts));
    }
}
 
function clearForm(){
    pn.value = '';
    pp.value = '';
    pc.value = '';
    pd.value = '';
}

function displayAllProducts(myArray){
    tr = '';
    myArray.forEach((product,index) => {
        tr += `<tr>
        <td>${index+1}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.category}</td>
        <td>${product.description}</td>
        <td>
            <button class="btn btn-warning" onclick ="updateElement(${index})">Update</button>
        </td>
        <td>
            <button class="btn btn-danger" onclick ="deleteElement(${index})">Delete</button>
        </td>
        </tr>
       `
    });
    tbody.innerHTML = tr;
}

function deleteElement(index){
    clearForm();
    allProducts.splice(index,1);
    localStorage.setItem("allProducts",JSON.stringify(allProducts));
    displayAllProducts(allProducts);
}

function updateElement(index){
    number = index;
    productUpdate = allProducts[index];
    pn.value = allProducts[index].name;
    pp.value = allProducts[index].price;
    pc.value = allProducts[index].category;
    pd.value = allProducts[index].description;
    btnAdd.innerHTML = "UPDATE";
}

function search(term){
    var cartona = "";
    var newArray = [];
    //(allProducts[i].name.toLowerCase()).includes(term.toLowerCase())
    for(var i=0;i<allProducts.length;i++)
    {
        if(allProducts[i].name.toLowerCase().indexOf(term) == 0 ||
           (allProducts[i].name.toLowerCase()).includes(term.toLowerCase()))
        {
        //     cartona += `<tr>
        //         <td>${i+1}</td>
        //         <td>${allProducts[i].name}</td>
        //         <td>${allProducts[i].price}</td>
        //         <td>${allProducts[i].category}</td>
        //         <td>${allProducts[i].description}</td>
        //         <td>
        //             <button class="btn btn-warning" onclick ="updateElement(${i})">Update</button>
        //         </td>
        //         <td>
        //             <button class="btn btn-danger" onclick ="deleteElement(${i})">Delete</button>
        //         </td>
        //         </tr>
        //    `
            newArray.push(allProducts[i]);
        }
    }
    displayAllProducts(newArray);
    // tbody.innerHTML = cartona;
}

btnAdd.addEventListener('click',(e)=>{
    if(btnAdd.innerHTML == 'UPDATE'){
        allProducts[number].name         = pn.value;
        allProducts[number].price        = pp.value;
        allProducts[number].category     = pc.value;
        allProducts[number].description  = pd.value;
        localStorage.setItem("allProducts", JSON.stringify(allProducts));
        btnAdd.innerHTML = 'ADD';
    }
    else{
        addProduct();
    } 
    clearForm();
    displayAllProducts(allProducts);
});
