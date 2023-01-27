const ar = [];
var selectedRow = null;
let flag = false;
var rIndex,
  table = document.getElementById("crud");
function onFormSubmit() {
  if (flag === false) {
    addData();
   }else {
    updateRecord();
    // editHtmlTbleSelectedRow();
   }
  resetForm();
  flag=false;
}

function check(id) {
  for (let i = 0; i < ar.length; i++) {
    if (ar[i] === id) {
      return true;
    }
  }
  return false;
}

function updateRecord() {
  document.getElementById("id").disabled = true;

  var id = document.getElementById("id").value;
  var name = document.getElementById("name").value;
  var price = document.getElementById("price").value;
  selectedRow.cells[0].innerHTML = id;
  selectedRow.cells[1].innerHTML = name;
  selectedRow.cells[2].innerHTML = price;
  flag = true;
}

function remv(id) {
  for (let i = 0; i < ar.length; i++) {
    if (ar[i] === id) {
      ar.splice(i, 1);
      break;
    }
  }
}

function validateForm() {
  var id = document.getElementById("id").value;
  var name = document.getElementById("name").value;
  var price = document.getElementById("price").value;
  if (id == "" && name == "" && price == "") {
    alert("Please fill out ID, Product Name & Price!!");
    return false;
  }
  if (id == "" && price == "") {
    alert("Please fill out ID & Price!!");
    return false;
  }
  if (id == "" && name == "") {
    alert("Please fill out ID & Product Name!!");
    return false;
  }
  if (name == "" && price == "") {
    alert("Please fill out Product Name & Price!!");
    return false;
  }
  if (id == "") {
    alert("ID is required!!");
    return false;
  } else if (check(id) === true) {
    alert("Product ID is already exist!!!!\nPlease try with another ID");
    return false;
  }
  if (name == "") {
    alert("Product name is required!!");
    return false;
  }
  let pname = name;
  if (pname.length > 60) {
    alert("Please try to fill product name between 60 characters!");
    return false;
  }
  name = pname.trim();
  if (price == "") {
    alert("Price is required!!");
    return false;
  } else if (price <= 0 || price > 100000) {
    alert("price should be between 1 to 100000 !!!");
    return false;
  }

  return true;
}

function addData() {
  
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var price = document.getElementById("price").value;
    if(flag===true){
      var id = selectedRow.cells[0].innerHTML;
      remv(id);
      flag=false;
    }
    if (validateForm()) {
      ar.push(id);
      var table = document.getElementById("crud");
      var row = table.insertRow(-1);

      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      cell1.innerHTML = id;
      cell2.innerHTML = name;
      cell3.innerHTML = price;
      cell4.innerHTML = `<button class="btn-2" onClick="edit(this)">Edit</button>`;
      cell5.innerHTML = `<button class="btn-2" onclick="del(this)">Delete</button>`;
    
      flag=false;
  }

  resetForm();
}

function resetForm() {
  document.getElementById("id").value = "";
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("add").innerHTML = "Add";
  document.getElementById("id").disabled = false;
  selectedRow = null;
}

function del(td) {
  selectedRow = td.parentElement.parentElement;
  var id = selectedRow.cells[0].innerHTML;
  var name = selectedRow.cells[1].innerHTML;
  var price = selectedRow.cells[2].innerHTML;
  if (
    confirm(
      "Are you sure to delete this record?\n" +
        "ID : " +
        id +
        "\nProduct name: " +
        name +
        "\nPrice: " +
        price +
        "\n"
    )
  ) {
    row = td.parentElement.parentElement;
    document.getElementById("crud").deleteRow(row.rowIndex);
    remv(id);
    resetForm();
  }
}

function edit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("id").value = selectedRow.cells[0].innerHTML;
  document.getElementById("name").value = selectedRow.cells[1].innerHTML;
  document.getElementById("price").value = selectedRow.cells[2].innerHTML;
  document.getElementById("add").innerHTML = "Update";
  flag = true;
  updateRecord();
}

