
let inventoryImport = importQuantity;
let inventoryExport = exportQuantity;

let arrOpenQuantity =[];
if(localStorage.getItem('arrOpenQuantity')){
    arrOpenQuantity= JSON.parse(localStorage.getItem('arrOpenQuantity'));
}
else {
    for (let i = 0; i <importQuantity.length; i++) {
        arrOpenQuantity.push(0);
    }
    localStorage.setItem('arrOpenQuantity', JSON.stringify(arrOpenQuantity));
}
showInventory();
changeOpenQuantity(0);
function showInventory() {
    document.getElementById('storage').innerHTML = `
    <table cellspacing="0" cellpadding="10">
    <tr><h3>STOCK INVENTORY REPORT</h3></tr>
     <tr class="search">
    <lable>Search Item : </lable>
    <input type="text" id="search" placeholder="Search follow name">
    <button onclick="searchInventory()">Search</button>
    </tr><br>
    <tr>Currency : USD</tr>
    <tr class ='title'>
    <th>NO.</th>
    <th>Item Code</th>
    <th>Date</th>
    <th>Name</th>
    <th>Unit</th>
    <th>Open</th>
    <th>Import</th>
    <th>Export</th>
     <th>Inventory</th>
    <th>Image</th>
    </tr>
        <tbody id = 'inventoryQuantity'>
        </tbody>
</table>
    `
    let html = '';
    for (let i = 0; i < inventoryImport.length; i++) {
        let inventoryQuanlity = inventoryImport[i].quantity;
        let exportQuantity=0;
        for (let j = 0; j < inventoryExport.length; j++) {
            if (inventoryImport[i].id === inventoryExport[j].id) {
                inventoryQuanlity -= inventoryExport[j].quantity;
                exportQuantity = inventoryExport[j].quantity;
            }
        }
        html += `
        <tr id="inventory">
        <td>${i+1}</td>
        <td>${inventoryImport[i].id}</td>
        <td>${inventoryImport[i].date}</td>
        <td>${inventoryImport[i].name}</td>
        <td>${inventoryImport[i].unit}</td>
        <td><input onchange='changeOpenQuantity(${i})' type="number" id="openQuantity-${inventoryImport[i].id}" value="${arrOpenQuantity[i]}"></td>
        <td>${convert(inventoryImport[i].quantity)}</td>
        <td>${convert(exportQuantity)}</td> 
        <td>${convert(inventoryQuanlity)}</td>
        <td><img src='${inventoryImport[i].image}' alt=""></td>
        </tr>`;
    }

    document.getElementById('inventoryQuantity').innerHTML = html;
    // changeOpenQuantity();

    let arrayInventory = document.getElementById('inventoryQuantity');
    let tr = Array.from(arrayInventory.children);
    let sumOpen = 0;
    let sumImport = 0;
    let sumExport = 0;
    let sumInventory = 0;
    for (let i = 0; i <tr.length; i++) {
        let td = Array.from(tr[i].getElementsByTagName('td'));
        let totalOpen = parseInt(document.getElementById(`openQuantity-${inventoryImport[i].id}`).value);
        let totalImport = parseInt(td[6].innerHTML);
        let totalExport = parseInt(td[7].innerHTML);
        let totalInventory = parseInt(td[8].innerHTML);
        sumOpen+=totalOpen;
        sumImport+=totalImport;
        sumExport+=totalExport;
        sumInventory+=totalInventory;
    }
    document.getElementById('inventoryQuantity').innerHTML = `
    ${html}
    <tr>
    <th colspan="5">Total</th>
    <th id="sumOpen">${convert(sumOpen)}</th>
    <th>${convert(sumImport)}</th>
    <th>${convert(sumExport)}</th>
    <th>${convert(sumInventory)}</th>
    <th colspan="3"></th>
</tr>
    `
}
function changeOpenQuantity(index){
    arrOpenQuantity[index]=parseInt(document.getElementById(`openQuantity-${inventoryImport[index].id}`).value);
    localStorage.setItem('arrOpenQuantity', JSON.stringify(arrOpenQuantity));
    console.log(index);

    let totalOpenQuantity = 0;
    for (let i = 0; i <inventoryImport.length; i++) {
        totalOpenQuantity+=parseInt(document.getElementById(`openQuantity-${inventoryImport[i].id}`).value);
    }
    document.getElementById('sumOpen').innerHTML=convert(totalOpenQuantity);

    let arrayInventory = document.getElementById('inventoryQuantity');
    let tr = Array.from(arrayInventory.children);

    for (let i = 0; i < tr.length; i++) {
        let row = tr[i];
        let openQuantity = parseInt(row.children[5].children[0].value);
        let importQuantity = parseInt(row.children[6].innerText);
        let exportQuantity = parseInt(row.children[7].innerText);
        let inventoryQuantity = openQuantity + importQuantity - exportQuantity;
        row.children[8].innerText = convert(inventoryQuantity);
    }
    let sumInventory = 0;
    for (let i = 0; i < tr.length; i++){
        let row = tr[i];
        let inventoryQuantity = parseInt(row.children[8].innerText.replace(/\D/g, '')); // Lấy số lượng tồn kho hiện tại từ dòng
        sumInventory += inventoryQuantity; // Thêm số lượng tồn kho của mỗi dòng vào tổng
    }
    document.getElementById('sumInventory').innerText = convert(sumInventory);
}
function convert(x) {
    x = new Intl.NumberFormat("de-DE").format(x);
    return x;
}
function searchInventory() {
    let searchText = document.getElementById('search').value.toLowerCase(); // Lấy giá trị tìm kiếm và chuyển thành chữ thường
    let filteredInventory = inventoryImport.filter(item => item.name.toLowerCase().includes(searchText)); // Lọc các mục trong inventoryImport dựa trên tên

    let html = '';
    for (let i = 0; i < filteredInventory.length; i++) {
        let inventoryQuanlity = filteredInventory[i].quantity;
        let exportQuantity = 0;
        for (let j = 0; j < inventoryExport.length; j++) {
            if (filteredInventory[i].id === inventoryExport[j].id) {
                inventoryQuanlity -= inventoryExport[j].quantity;
                exportQuantity = inventoryExport[j].quantity;
            }
        }
        html += `
        <tr id="inventory">
        <td>${i + 1}</td>
        <td>${filteredInventory[i].id}</td>
        <td>${filteredInventory[i].date}</td>
        <td>${filteredInventory[i].name}</td>
        <td>${filteredInventory[i].unit}</td>
        <td><input onchange='changeOpenQuantity()' type="number" id="openQuantity-${filteredInventory[i].id}" value="0"></td>
        <td>${convert(filteredInventory[i].quantity)}</td>
        <td>${convert(exportQuantity)}</td> 
        <td>${convert(inventoryQuanlity)}</td>
        <td><img src='${filteredInventory[i].image}' alt=""></td>
        </tr>`;
    }

    document.getElementById('inventoryQuantity').innerHTML = html;
}