let myStorage = new Storage('Stock Import Report');
let importQuantity = myStorage.importQuantity;
function showImport() {
    document.getElementById('storage').innerHTML = `
    <table cellspacing="0" cellpadding="10">
    <tr><h3>STOCK IMPORT REPORT</h3></tr>
    <tr class="search">
    <lable>Search Item : </lable>
    <input type="text" id="search" placeholder="Search follow name">
    <button onclick="searchUser()">Search</button>
    </tr><br>
    <tr>Currency : USD</tr>
    <tr class ='title'>
    <th>NO.</th>
    <th>Item Code</th>
    <th>Date</th>
    <th>Name</th>
    <th>Unit</th>
    <th>Quantity</th>
    <th>Price</th>
    <th>Amount</th>
    <th>Image</th>
    <th colspan="2">Action</th>
</tr>
    <tbody id = 'importQuantity'>
</tbody>
</table>
    `
    let html = ``;
    for (let i = 0; i < importQuantity.length; i++) {
        let amount = importQuantity[i].quantity * importQuantity[i].price;
        html += `
        <tr>
        <td>${i+1}</td>
         <td>${importQuantity[i].id}</td>
         <td>${importQuantity[i].date}</td>
        <td>${importQuantity[i].name}</td>
        <td>${importQuantity[i].unit}</td>
        <td>${convertNumber(importQuantity[i].quantity)}</td>
        <td>${convertNumber(importQuantity[i].price)}</td>
        <td>${convertNumber(amount)}</td>
        <td><img src = '${importQuantity[i].image}' alt=""></td>
        <td><button onclick="update(${i})">Update</button></td>
        <td><button onclick="remove(${i})">Delete</button></td>
        </tr>
        `
    }
    document.getElementById('importQuantity').innerHTML = html;

    let sumImport = document.getElementById('importQuantity');
    let tr = sumImport.children;
    let sumQuantity = 0;
    let Amount = 0;
    for (let i = 0; i <tr.length; i++) {
        let td = tr[i].getElementsByTagName('td');
        let totalQuantity = parseInt(td[5].innerHTML);
        let totalAmount = parseInt(td[7].innerHTML);
        sumQuantity+=totalQuantity;
        Amount+=totalAmount;
    }
    document.getElementById('importQuantity').innerHTML = `
    ${html}
    <tr>
    <th colspan="5">Total</th>
    <th>${convertNumber(sumQuantity)}</th>
    <th></th>
    <th>${convertMoney(Amount)}</th>
    <th colspan="3"></th>
</tr>
    `
}

function showImportAdd() {
    document.getElementById('storage').innerHTML = `
    <h3 class="title-enter">STOCK IMPORT REPORT</h3>
    <div class = 'background-form'>
    <center>
    <label>Product Code : </label><br>
    <input type="text" id ='id' placeholder="Product-Code"><br>
    <label>Date: </label><br>
    <input type="text" id ='date' placeholder="date"><br>
    <label>Product Name: </label><br>
    <input type="text" id ='name' placeholder="Name"><br>
    <label>Unit: </label><br>
    <input type="text" id ='unit' placeholder="Unit"><br>
    <label>Quantity: </label><br>
    <input type="text" id ='quantity' placeholder="Quantity"><br>
    <label>Price: </label><br>
    <input type="text" id ='price' placeholder="Price"><br>
    <label>Amount: </label><br>
    <input type="text" id ='amount' placeholder="Do not enter here"><br>
    <label>Image: </label><br>
    <input type="text" id ='image' placeholder="Image"><br>
    <button onclick="addImport()">Add</button>
</center>
     
    </div>
    `
}
function addImport() {
    let id = document.getElementById('id').value;
    let date = document.getElementById('date').value;
    let name = document.getElementById('name').value;
    let unit = document.getElementById('unit').value;
    let quantity = document.getElementById('quantity').value;
    let price = document.getElementById('price').value;
    let amount = document.getElementById('amount').value;
    let image = document.getElementById('image').value;
    let newImport = new Import(id, date, name,unit, quantity, price,amount, image);
    myStorage.addImport(newImport);
    showImport();

}
function update(index){
    oldImportQuantity = importQuantity[index];
    // amount = importQuantity[index].quantity*importQuantity[index].price;
    document.getElementById('storage').innerHTML = `
    <h3 class="title-enter">UPDATE PRODUCT</h3>
     <div class = 'background-form'>
     <center>
     <label>Product Code : </label><br>
    <input type="text" id ='id' value="${oldImportQuantity.id}"><br>
     <label>Date: </label><br>
    <input type="text" id ='date' value="${oldImportQuantity.date}"><br>
     <label>Product Name: </label><br>
    <input type="text" id ='name' value="${oldImportQuantity.name}"><br>
    <label>Unit: </label><br>
    <input type="text" id ='unit' value="${oldImportQuantity.unit}"><br>
    <label>Quantity: </label><br>
    <input type="text" id ='quantity' value="${oldImportQuantity.quantity}"><br>
     <label>Price: </label><br>
    <input type="text" id ='price' value="${oldImportQuantity.price}"><br>
    <label>Amount: </label><br>
    <input type="text" id ='amount' value="Do not enter here"><br>
    <label>Image: </label><br>
    <input type="text" id ='image' value="${oldImportQuantity.image}"><br>
    <button onclick="saveImport(${index})">Save</button>
    </center>
    </div>
    
    `
}
function saveImport(index){
    let id = document.getElementById('id').value;
    let date = document.getElementById('date').value;
    let name = document.getElementById('name').value;
    let unit = document.getElementById('unit').value;
    let quantity = document.getElementById('quantity').value;
    let price = document.getElementById('price').value;
    let amount = document.getElementById('amount').value;
    let image = document.getElementById('image').value;
    let updateImport= new Import(id, date, name,unit, quantity, price,amount, image);
    myStorage.updateImport(index, updateImport);
    showImport();

}
function remove(index){
    let isConfirm = confirm(`Are you sure?`);
    if(isConfirm){
        myStorage.removeImport(index);
        showImport();
    }
}
function searchUser(){
    let searchInput = document.getElementById('search').value.trim();
    let searchItem = new Import('', '',searchInput, '', '', '', '', '');
    let searchResultImport = myStorage.searchimport(searchItem);
    importQuantity = searchResultImport; // Cập nhật danh sách nhập khẩu với kết quả tìm kiếm
    showImport();
}
function convertNumber(x) {
    x = new Intl.NumberFormat("de-DE").format(x);
    return x;
}
function convertMoney(x) {
    x = new Intl.NumberFormat("en-US", { style: "currency", "currency":"USD" }).format(x);
    return x;
}




