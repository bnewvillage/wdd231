//dynamic form
const recipientCheckboxes = document.querySelectorAll('input[name="recipient"]');
const sizeCheckboxes = document.querySelectorAll('input[name="sizeOption"]');
const replacementCheckboxes = document.querySelectorAll('input[name="replacementStatus"]');
const customerNameField = document.getElementById('customerNameField');
const brandSelect = document.getElementById('brand');
const poNumberField = document.getElementById('poNumberField');
const requestedBySelect = document.getElementById('requestedBy');
const sizeSMLField = document.getElementById('sizeSMLField');
const sizeNumbersField = document.getElementById('sizeNumbersField');
const sizeSMLSelect = document.getElementById('sizeSML');
const otherBrandField = document.getElementById('otherBrandField');
const datePurchased = document.getElementById('datePurchased');
const dateReturnedField = document.getElementById('dateReturnedField');
const partNumberField = document.getElementById('partNumber');
const serialNumberField = document.getElementById('serialNumberField');
const serialNumber = document.getElementById('serialNumber');
const replacedYes = document.getElementById('replacedYes');
const replacedNo = document.getElementById('replacedNo');

//file upload
const fileDropZone = document.getElementById('fileDropZone');
const fileSelect = document.getElementById('fileSelect');
const fileInput = document.getElementById('uploadFiles');
const fileList = document.getElementById('fileList');


// function checkbox behave like radio
function makeCheckboxesLikeRadios(checkboxes) {
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                // uncheck others
                checkboxes.forEach(c => {
                    if (c !== this) c.checked = false;
                });
            }
        });
    });
}

makeCheckboxesLikeRadios(recipientCheckboxes);
makeCheckboxesLikeRadios(sizeCheckboxes);
makeCheckboxesLikeRadios(replacementCheckboxes);
//end of checkbox like radio

// hide and view toggles
recipientCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        if (document.getElementById('customer').checked) {
            customerNameField.classList.remove('hidden');
        } else {
            customerNameField.classList.add('hidden');
            replacedNo.checked = false;
            replacedYes.checked = false;
        }
    });
});

sizeCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        if (this.id === 'sizeOptionSML') {
            sizeSMLField.classList.remove('hidden');
            sizeNumbersField.classList.add('hidden');
        } else if (this.id === 'sizeOptionNumbers') {
            sizeSMLField.classList.add('hidden');
            sizeNumbersField.classList.remove('hidden');
        } else {
            sizeSMLField.classList.add('hidden');
            sizeNumbersField.classList.add('hidden');
        }
    });
});
//end of hide and view toggles

// change form requirements based on brand
brandSelect.addEventListener('change', () => {
    if (brandSelect.value === 'KLIM') {
        poNumberField.classList.remove('hidden');
        otherBrandField.classList.add('hidden');
        dateReturnedField.classList.add('hidden');
        serialNumberField.classList.add('hidden');
    } else if (brandSelect.value === 'Other') {
        poNumberField.classList.add('hidden');
        otherBrandField.classList.remove('hidden');
        dateReturnedField.classList.add('hidden');
        serialNumberField.classList.add('hidden');
    } else if (brandSelect.value === 'ALPINESTARS') {
        poNumberField.classList.add('hidden');
        otherBrandField.classList.add('hidden');
        dateReturnedField.classList.remove('hidden');
        serialNumberField.classList.add('hidden');
    } else if (brandSelect.value === 'AKRAPOVIC') {
        poNumberField.classList.add('hidden');
        otherBrandField.classList.add('hidden');
        dateReturnedField.classList.add('hidden');
        serialNumberField.classList.remove('hidden');
        serialNumber.setAttribute('required','');
    } else if (brandSelect.value === 'QUAD LOCK') {
        poNumberField.classList.add('hidden');
        otherBrandField.classList.add('hidden');
        dateReturnedField.classList.remove('hidden');
        serialNumberField.classList.add('hidden');
    } else if (brandSelect.value === 'LEATT') {
        poNumberField.classList.add('hidden');
        otherBrandField.classList.add('hidden');
        dateReturnedField.classList.remove('hidden');
        serialNumberField.classList.add('hidden');
    }
    else {
        poNumberField.classList.add('hidden');
        otherBrandField.classList.add('hidden');
        dateReturnedField.classList.add('hidden');
        serialNumberField.classList.add('hidden');
    }
});
//end of brand-based switches



// array of salesteam
const requestedByArray = ["Blaine", "Sergio", "Peter", "Emile", "Georgio", "Tim","Tina", "Mohammed", "Khalid", "Wissam","Joe"];
requestedByArray.sort();
requestedByArray.forEach(name => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    requestedBySelect.appendChild(option);
});

// array of brands
const brandArray = ["AKRAPOVIC", "ALPINESTARS", "ARROW", "BAJA DESIGNS", "DAYTONA", "JOHN DOE", "KLIM", "KNOX", "LEATT", "QUAD LOCK", "RUKKA", "SP CONNECT", "WRS", "WUNDERLICH", "OTHER"];
brandArray.forEach(brand => {
    const option = document.createElement('option');
    option.value = brand;
    option.textContent = brand;
    brandSelect.appendChild(option);
});

// sizes SML
const sizeArray = ["3XS","2XS","XS", "Small", "Medium", "Large", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"];
sizeArray.forEach(size => {
    const option = document.createElement('option');
    option.value = size;
    option.textContent = size;
    sizeSMLSelect.appendChild(option);
});
// end of sizes

//start of dynamic required changes
// Function to manage required attributes based on visibility
function updateRequiredFields(element) {
    if (element.classList.contains('hidden')) {
        Array.from(element.querySelectorAll('input, select, textarea')).forEach(field => {
            if (!['receiptNumber', 'color', 'sizeOptionSML', 'sizeOptionNumbers'].includes(field.id)) {
                field.removeAttribute('required');
            }
        });
    } else {
        Array.from(element.querySelectorAll('input, select, textarea')).forEach(field => {
            if (!['receiptNumber', 'color', 'sizeOptionSML', 'sizeOptionNumbers'].includes(field.id) && 
                !field.name.includes('replacementStatus'))
                replacedYes.addEventListener('change', toggleRequired);
                replacedNo.addEventListener('change', toggleRequired);
                 { // exclude switches
                field.setAttribute('required', '');
            }
        });
    }
    }
    
    // Update required fields for all initially hidden elements
    document.querySelectorAll('.hidden').forEach(e => updateRequiredFields(e));
    
    // Manage required fields for dynamic elements
    recipientCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        if (document.getElementById('customer').checked) {
            customerNameField.classList.remove('hidden');
            updateRequiredFields(customerNameField);
        } else {
            customerNameField.classList.add('hidden');
            updateRequiredFields(customerNameField);
        }
    });
    });

//end of dynamic required 


//start of file upload
let totalSize = 0;
const maxFiles = 5;
const maxSize = 100 * 1024 * 1024; // 100MB in bytes

fileDropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileDropZone.classList.add('dragover');
});

fileDropZone.addEventListener('dragleave', () => {
    fileDropZone.classList.remove('dragover');
});

fileDropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    fileDropZone.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
});

fileSelect.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

function handleFiles(files) {
    let remainingSpace = maxSize - totalSize;
    let filesToAdd = [];

    for (let file of files) {
        if (filesToAdd.length >= maxFiles) {
            alert('Maximum of 5 files can be uploaded.');
            break;
        }
        if (totalSize + file.size > maxSize) {
            alert('Total file size exceeds the limit of 100MB. Remaining space: ' + (remainingSpace / (1024 * 1024)).toFixed(2) + ' MB');
            break;
        }
        totalSize += file.size;
        filesToAdd.push(file);
        remainingSpace -= file.size;
    }

    filesToAdd.forEach(file => {
        const listItem = document.createElement('li');
        listItem.textContent = file.name + ' (' + (file.size / 1024 / 1024).toFixed(2) + ' MB)';
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.style.marginLeft = '10px';
        removeButton.addEventListener('click', () => removeFile(file, listItem));
        listItem.appendChild(removeButton);
        fileList.appendChild(listItem);
    });

    // Update input with new files for form submission
    const dataTransfer = new DataTransfer();
    Array.from(fileInput.files).concat(filesToAdd).forEach(file => dataTransfer.items.add(file));
    fileInput.files = dataTransfer.files;
}

function removeFile(fileToRemove, listItem) {
    // Remove from total size calculation
    totalSize -= fileToRemove.size;

    // Remove from file input
    const dataTransfer = new DataTransfer();
    Array.from(fileInput.files).forEach(file => {
        if (file.name !== fileToRemove.name || file.size !== fileToRemove.size) {
            dataTransfer.items.add(file);
        }
    });
    fileInput.files = dataTransfer.files;

    // Remove the list item from the DOM
fileList.removeChild(listItem);
}

//submit files
const form = document.getElementById('uploadForm');

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const spinner = document.querySelector('.loading-spinner');
        spinner.style.display = 'block';

        const files = fileInput.files;
        const folderUrl = 'YOUR_DEPLOYMENT_URL';

        for (const file of files) {
          const reader = new FileReader();
          reader.onload = async function () {
            const data = reader.result;
            const payload = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                file: data,
                fileName: file.name,
              }),
            };
            const response = await fetch(folderUrl, payload);
            const result = await response.text();
            console.log(result);
          };
          reader.readAsDataURL(file);
        }
        spinner.style.display = 'none';
        alert('Files uploaded successfully!');
      });



// Function to handle the required attribute dynamically
function toggleRequired() {
    if (replacedYes.checked) {
        replacedYes.setAttribute('required', '');
        replacedNo.removeAttribute('required');
    } else if (replacedNo.checked) {
        replacedNo.setAttribute('required', '');
        replacedYes.removeAttribute('required');
    } else {
        // Neither checkbox is checked, required both
        replacedYes.setAttribute('required');
        replacedNo.setAttribute('required');
    }
}






document.getElementById('dynamicForm').addEventListener('submit', async function(e) {
console.log('Form submission started22')
e.preventDefault();
const submitButton = document.querySelector('button[type="submit"]');
const loadingSpinner = document.querySelector('.loading-spinner');

// Show loading spinner and disable submit button
submitButton.classList.add('submit-loading');
loadingSpinner.style.display = 'block';

const formData = new FormData(this);

const files = formData.getAll('uploadFiles');

// If needed, ensure the files are still usable without conversion
files.forEach(file => {
    // Add each file back to formData directly
    formData.append('uploadFiles', file);
});


fetch(this.action, {
method: 'POST',
body: formData
})
.then(response => response.json())
.then(data => {
console.log('Success:', data);
alert('Form submitted successfully!');
})
.catch((error) => {
console.error('Error:', error);
alert('An error occurred while submitting the form.');
})
.finally(() => {
// Hide loading spinner and re-enable submit button
submitButton.classList.remove('submit-loading');
loadingSpinner.style.display = 'none';
});
});