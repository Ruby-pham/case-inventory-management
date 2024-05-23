let myExportStorage = new Storage('Stock Export Report');
let exportQuantity = myExportStorage.exportQuantity;

function showExport() {
    document.getElementById('storage').innerHTML = `
    <table cellspacing="0" cellpadding="10">
    <tr><h3>STOCK EXPORT REPORT</h3></tr>
    <tr class="search">
    <lable>Search Item : </lable>
    <input type="text" id="search" placeholder="Search follow name">
    <button onclick="searchExport()">Search</button>
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
    <tbody id = 'exportQuantity'>
</tbody>
</table>
    `
    let html = ``;
    for (let i = 0; i < exportQuantity.length; i++) {
        let amount = exportQuantity[i].quantity * exportQuantity[i].price;
        html += `
        <tr>
        <td>${i+1}</td>
         <td>${exportQuantity[i].id}</td>
         <td>${exportQuantity[i].date}</td>
        <td>${exportQuantity[i].name}</td>
        <td>${exportQuantity[i].unit}</td>
        <td>${convertNumber(exportQuantity[i].quantity)}</td>
        <td>${convertNumber(exportQuantity[i].price)}</td>
        <td>${convertNumber(amount)}</td>
        <td><img src = '${exportQuantity[i].image}' alt=""></td>
        <td><button onclick="updateExport(${i})">Update</button></td>
        <td><button onclick="removeExport(${i})">Delete</button></td>
        </tr>
        `
    }
    document.getElementById('exportQuantity').innerHTML = html;

    let sumExport = document.getElementById('exportQuantity');
    let tr = sumExport.children;
    let sumExQuantity = 0;
    let Amount = 0;
    for (let i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td');
        let totalQuantity = parseInt(td[5].innerHTML);
        let totalAmount = parseInt(td[7].innerHTML);
        sumExQuantity += totalQuantity;
        Amount += totalAmount;
    }
    document.getElementById('exportQuantity').innerHTML = `
    ${html}
    <tr>
    <th colspan="5">Total</th>
    <th>${convertNumber(sumExQuantity)}</th>
    <th></th>
    <th>${convertMoney(Amount)}</th>
    <th colspan="3"></th>
</tr>
    `
}

function showExportAdd() {
    document.getElementById('storage').innerHTML = `
    <h3 class="title-enter">STOCK EXPORT REPORT</h3>
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
    <button onclick="addExport()">Add</button>
</center>
     
    </div>
    `
}

function addExport() {
    let id = document.getElementById('id').value;
    let date = document.getElementById('date').value;
    let name = document.getElementById('name').value;
    let unit = document.getElementById('unit').value;
    let quantity = document.getElementById('quantity').value;
    let price = document.getElementById('price').value;
    let amount = document.getElementById('amount').value;
    let image = document.getElementById('image').value;
    let newExport = new Export(id, date, name, unit, quantity, price, amount, image);
    myExportStorage.addExport(newExport);
    showExport();

}

function updateExport(index) {
    oldExportQuantity = exportQuantity[index];
    document.getElementById('storage').innerHTML = `
    <h3 class="title-enter">UPDATE PRODUCT</h3>
     <div class = 'background-form'>
     <center>
     <label>Product Code : </label><br>
    <input type="text" id ='id' value="${oldExportQuantity.id}"><br>
     <label>Date: </label><br>
    <input type="text" id ='date' value="${oldExportQuantity.date}"><br>
     <label>Product Name: </label><br>
    <input type="text" id ='name' value="${oldExportQuantity.name}"><br>
    <label>Unit: </label><br>
    <input type="text" id ='unit' value="${oldExportQuantity.unit}"><br>
    <label>Quantity: </label><br>
    <input type="text" id ='quantity' value="${oldExportQuantity.quantity}"><br>
     <label>Price: </label><br>
    <input type="text" id ='price' value="${oldExportQuantity.price}"><br>
    <label>Amount: </label><br>
    <input type="text" id ='amount' value='Do not enter here'><br>
    <label>Image: </label><br>
    <input type="text" id ='image' value="${oldExportQuantity.image}"><br>
    <button onclick="saveExport(${index})">Save</button>
    </center>
    </div>
    
    `
}

function saveExport(index) {
    let id = document.getElementById('id').value;
    let date = document.getElementById('date').value;
    let name = document.getElementById('name').value;
    let unit = document.getElementById('unit').value;
    let quantity = document.getElementById('quantity').value;
    let price = document.getElementById('price').value;
    let amount = document.getElementById('amount').value;
    let image = document.getElementById('image').value;
    let updateExport = new Export(id, date, name, unit, quantity, price, amount, image);
    myExportStorage.updateExport(index, updateExport);
    showExport();

}

function removeExport(index) {
    let isConfirm = confirm(`Are you sure?`);
    if (isConfirm) {
        myExportStorage.removeExport(index);
        showExport();
    }
}
function searchExport(){
    let searchInput = document.getElementById('search').value.trim();
    let searchItem = new Export('', '',searchInput, '', '', '', '', '');
    let searchResultExport = myExportStorage.searchExport(searchItem);
    exportQuantity = searchResultExport; // Cập nhật danh sách nhập khẩu với kết quả tìm kiếm
    showExport();
}
function convertNumber(x) {
    x = new Intl.NumberFormat("de-DE").format(x);
    return x;
}
function convertMoney(x) {
    x = new Intl.NumberFormat("en-US", { style: "currency", "currency":"USD" }).format(x);
    return x;
}