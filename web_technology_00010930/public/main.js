const { async } = require("validate.js");

function search() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search-input");
  filter = input.value.toUpperCase();
  table = document.getElementById("modules_table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function myFunction() {
  timeout = setTimeout(chechNewModuleTitle, 3000);
}

async function chechNewModuleTitle() {
  let titleInput = document.getElementById('module-title')
  let result = checkIfExists(titleInput.value)
}

async function checkIfExists(titleNew) {
  let response = await fetch('http://localhost:3000/api/all/');
  let data = await response.json();
  var submitBtn = document.getElementById('add-module-btn');
  var showDanger = document.getElementById("show-danger");
  let titleInput = document.getElementById('module-title')

  let availableModulesTitle = []
  for (let i in data) {
    let oneTitle = data[i].title.toLowerCase()
    availableModulesTitle.push(oneTitle)
  }
  if (availableModulesTitle.includes(titleNew.toLowerCase())) {
    submitBtn.disabled = true
    showDanger.classList.remove('d-none')
    titleInput.classList.add('border-danger')
  } else {
    submitBtn.disabled = false
    showDanger.classList.add('d-none')
    titleInput.classList.remove('border-danger')
  }


}

async function fillUpdateModal(module_id) {
  let updateModal = document.getElementById('update-modal')
  updateModal.action = '/update/module/' + module_id + '/'
  fetch('http://localhost:3000/api/get/' + module_id)
    .then(response => response.json())
    .then(data => writeData(data));
}

async function writeData(module) {
  let inputTitle = document.getElementById('module-title')
  let inputDescription = document.getElementById('module-text')
  let inputPrice = document.getElementById('module-price')
  let inputDate = document.getElementById('startDate')
  let inputStatus = document.getElementById('module-status')

  inputTitle.value = module.title
  inputDescription.value = module.description
  inputPrice.value = module.price

  if (module.full == true) {
    inputStatus.checked = true
  } else {
    inputStatus.checked = false
  }

  var d = new Date(module.startDate).toLocaleDateString().split('/');
  var today = d[2] + "-" + ("0" + d[0]).slice(-2) + "-" + ("0" + d[1]).slice(-2);
  inputDate.value = today
}


function deleteFillModuleForm(module_id) {
  let deleteForm = document.getElementById('delete-form')
  deleteForm.action = '/delete/module/' + module_id + '/'
}


async function addToCart(module_id) {
  let currentStatus = document.getElementById('add-to-cart')
  if (currentStatus.innerText == 'Add to cart') {
    cartAdd(module_id)
  } else {
    removeFromCart(module_id)
  }
}
async function cartAdd(module_id) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: module_id })
  };
  fetch(`http://localhost:3000/cart/add/${module_id}`, requestOptions)
    .then(response => response.json())
    .then(data => addToCartFillBtn());
}

async function removeFromCart(module_id) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: module_id })
  };
  fetch(`http://localhost:3000/cart/remove/${module_id}`, requestOptions)
    .then(response => response.json())
    .then(data => removeFromCartFillBtn());
}

function addToCartFillBtn() {
  let addToCartBtn = document.getElementById('add-to-cart')
  addToCartBtn.innerText = 'Remove from cart'
  addToCartBtn.classList.remove('btn-primary')
  addToCartBtn.classList.add('btn-outline-danger')
}

function removeFromCartFillBtn() {
  let addToCartBtn = document.getElementById('add-to-cart')
  addToCartBtn.innerText = 'Add to cart'
  addToCartBtn.classList.remove('btn-outline-danger')
  addToCartBtn.classList.add('btn-primary')
}

function searchQuery() {
  let searchForm = document.getElementById('search-form')
  let searchInput = document.getElementById('search-input')
  searchForm.action = '/search/?q=' + searchInput.value
}