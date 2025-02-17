const brands = ["AKRAPOVIC", "ALPINESTARS", "ARROW", "BAJA DESIGNS", "DAYTONA", "JOHN DOE", "KLIM", "KNOX", "LEATT", "QUAD LOCK", "RUKKA", "SP CONNECT", "WRS", "WUNDERLICH", "OTHER"];

// create brands
function populateBrandSelect(selectElement) {
  brands.forEach(brand => {
    const option = document.createElement('option');
    option.value = brand;
    option.textContent = brand;
    selectElement.appendChild(option);
  });
}

// add new item
function addItemLine() {
  const itemsContainer = document.getElementById('itemsContainer');
  const itemCount = itemsContainer.querySelectorAll('.item-line').length + 1;

  const itemLine = document.createElement('div');
  itemLine.classList.add('item-line');

  // select brand
  const brandDiv = document.createElement('div');
  const brandLabel = document.createElement('label');
  brandLabel.setAttribute('for', 'brand_' + itemCount);
  brandLabel.textContent = 'Brand *';
  const brandSelect = document.createElement('select');
  brandSelect.id = 'brand_' + itemCount;
  brandSelect.name = 'brand[]';
  brandSelect.required = true;
  const defaultOption = document.createElement('option');
  defaultOption.value = "";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.hidden = true;
  defaultOption.textContent = 'Select Brand';
  brandSelect.appendChild(defaultOption);
  populateBrandSelect(brandSelect);
  brandDiv.appendChild(brandLabel);
  brandDiv.appendChild(brandSelect);

  // item name input
  const itemNameDiv = document.createElement('div');
  const itemNameLabel = document.createElement('label');
  itemNameLabel.setAttribute('for', 'itemName_' + itemCount);
  itemNameLabel.textContent = 'Item Name or Part Number *';
  const itemNameInput = document.createElement('input');
  itemNameInput.type = 'text';
  itemNameInput.id = 'itemName_' + itemCount;
  itemNameInput.name = 'itemName[]';
  itemNameInput.required = true;
  itemNameDiv.appendChild(itemNameLabel);
  itemNameDiv.appendChild(itemNameInput);

  // agreed price input create
  const priceDiv = document.createElement('div');
  const priceLabel = document.createElement('label');
  priceLabel.setAttribute('for', 'agreedPrice_' + itemCount);
  priceLabel.textContent = 'Agreed Price';
  const priceInput = document.createElement('input');
  priceInput.type = 'number';
  priceInput.id = 'agreedPrice_' + itemCount;
  priceInput.name = 'agreedPrice[]';
  priceDiv.appendChild(priceLabel);
  priceDiv.appendChild(priceInput);

  // delete button for item lines
  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.textContent = '-';
  removeButton.classList.add('remove-item');
  removeButton.addEventListener('click', () => {
    itemLine.remove(); // Remove this item line
  });

  // append everything
  itemLine.appendChild(brandDiv);
  itemLine.appendChild(itemNameDiv);
  itemLine.appendChild(priceDiv);
  itemLine.appendChild(removeButton);
  itemsContainer.appendChild(itemLine);
}

// auto save and keep for 30 mins
const form = document.getElementById('orderForm');
const STORAGE_KEY = 'orderFormData';
const STORAGE_TIMESTAMP_KEY = 'orderFormTimestamp';
const EXPIRY = 30 * 60 * 1000;
// save form every event
function saveFormData() {
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => {
    if (obj[key]) {
      if (Array.isArray(obj[key])) {
        obj[key].push(value);
      } else {
        obj[key] = [obj[key], value];
      }
    } else {
      obj[key] = value;
    }
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  localStorage.setItem(STORAGE_TIMESTAMP_KEY, Date.now());
}

// load form within 30 mins
function loadFormData() {
  const timestamp = localStorage.getItem(STORAGE_TIMESTAMP_KEY);
  if (timestamp && (Date.now() - timestamp < EXPIRY)) {
    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (savedData) {
      for (const key in savedData) {
        const element = form.elements[key];
        if (element) {
          // array
          if (Array.isArray(savedData[key])) {
            savedData[key].forEach((value, index) => {
              element[index].value = value;
            });
          } else {
            element.value = savedData[key];
          }
        }
      }
    }
  }
}

// clear saved data
function clearFormData() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STORAGE_TIMESTAMP_KEY);
}

// clearbutton listner
document.getElementById('clearButton').addEventListener('click', () => {
  form.reset();
  clearFormData();
});

// submit handler
form.addEventListener('submit', function(e) {
    e.preventDefault();
  
    // get values from form
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const orderDate = document.getElementById('orderDate').value;
    const salesperson = document.getElementById('salesperson').value;
    
    // get items
    const items = [];
    const itemElements = document.querySelectorAll('.item-line');
    itemElements.forEach((item, index) => {
        const brand = item.querySelector(`#brand_${index + 1}`).value;
        const itemName = item.querySelector(`#itemName_${index + 1}`).value;
        const agreedPrice = item.querySelector(`#agreedPrice_${index + 1}`).value;
        items.push({ brand, itemName, agreedPrice });
    });
  
    // create summary
    let itemSummary = items.map(item => `${item.brand} - ${item.itemName} ($${item.agreedPrice})`).join(', ');
  
    // show order summary
    alert(`Order placed!\n\nCustomer: ${customerName}\nPhone: ${customerPhone}\nOrder Date: ${orderDate}\nSalesperson: ${salesperson}\nItems: ${itemSummary}`);
  
    clearFormData();  // clear form
  });
  

// saving form listeners
form.addEventListener('input', saveFormData);
window.addEventListener('load', loadFormData);

//first line initial
const firstItemLine = document.querySelector('.item-line');
if (firstItemLine) {
  populateBrandSelect(firstItemLine.querySelector('select'));
}

//add item line with plus
document.getElementById('addItemButton').addEventListener('click', addItemLine);
