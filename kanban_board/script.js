const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists

const allInList = {
  dragList: document.querySelector('.drag-list'),
  listColumns: document.querySelectorAll('.drag-item-list'),
  backlogList: document.getElementById('backlog-list'),
  progressList: document.getElementById('progress-list'),
  completeList: document.getElementById('complete-list'),
  onHoldList: document.getElementById('on-hold-list'),
};

// Columns
const columns = ['backlog', 'progress', 'complete', 'on-hold'];

// Items
let updatedOnLoad = false;

// Initialize Arrays dealing with localStorage
let columnArrays = {
  backlogListArray: [],
  progressListArray: [],
  completeListArray: [],
  onHoldListArray: [],
};

// Drag Functionality
let draggedItem;
let currentColumn;
let enteredColumn;

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
    for (const column in columnArrays) {
      const columnName = column.slice(0, -9);
      columnArrays[column] = JSON.parse(localStorage[`${columnName}Items`]);
    }
  } else {
    columnArrays.backlogListArray = [
      'Release the course',
      'Sit back and relax',
    ];
    columnArrays.progressListArray = ['Work on projects', 'Listen to music'];
    columnArrays.completeListArray = ['Being cool', 'Getting stuff done'];
    columnArrays.onHoldListArray = ['Being uncool'];
  }
}

// Set localStorage Arrays
function updateSavedColumns() {
  for (const column in columnArrays) {
    const columnName = column.slice(0, -9);

    localStorage.setItem(
      `${columnName}Items`,
      JSON.stringify(columnArrays[column])
    );
  }
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // List Item
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item');
  listEl.textContent = item;
  listEl.setAttribute('draggable', true);
  listEl.setAttribute('ondragstart', 'drag(event)');

  // Append El into list
  columnEl.appendChild(listEl);
}

function insertItemEl(columnEl, item) {
  // List Item
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item');
  listEl.textContent = item;
  listEl.setAttribute('draggable', true);
  listEl.setAttribute('ondragstart', 'drag(event)');

  // Append El into list
  columnEl.appendChild(listEl);
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // console.log('UPDATE DOM');
  // Check localStorage once
  if (!updatedOnLoad) {
    getSavedColumns();
  }

  let columnIndex = 0;
  for (const column in columnArrays) {
    columnArrays[column].forEach((item, itemIndex) => {
      createItemEl(
        allInList[`${column.slice(0, -5)}`],
        columnIndex,
        item,
        itemIndex
      );
    });
    columnIndex++;
  }

  // Run getSavedColumns only once, Update Local Storage
  updatedOnLoad = true;
  updateSavedColumns();
}

// Allows arrays to reflect Drag and Drop items
function rebuildArrays() {
  console.log(columnArrays);
  for (let columnKey in columnArrays) {
    columnArrays[columnKey] = [];
    const columnName = columnKey.slice(0, -5);
    for (let i = 0; i < allInList[columnName].children.length; i++) {
      columnArrays[columnKey].push(
        allInList[columnName].children[i].textContent
      );
    }
  }
  updateSavedColumns();
}

// When Item Start Dragging
function drag(event) {
  draggedItem = event.target;
}

// Column Allows for Item to Drop
function allowDrop(e) {
  e.preventDefault();
}

// When Item Enters Column Area
function dragEnter(e) {
  // Identify column number
  const column = columns.indexOf(
    e.target.closest('.drag-column').classList[1].slice(0, -7)
  );
  allInList.listColumns[column].classList.add('over');
  currentColumn = column;
  enteredColumn = e.target.closest('.drag-column').classList[1];
}

// When Item Leaves Column Area
function dragLeave(e) {
  console.log(`enteredColumn: ${enteredColumn}`);
  console.log(currentColumn);
  if (e.target.closest('.drag-column').classList[1] !== enteredColumn) {
    e.target.classList.remove('over');
  }
}

// Dropping Item into Column
function drop(e) {
  e.preventDefault();

  // Remove Background Color/Padding
  allInList.listColumns.forEach(column => column.classList.remove('over'));

  // Add Item to column of items
  const parent = allInList.listColumns[currentColumn];
  parent.appendChild(draggedItem);

  rebuildArrays();
}

function showSaveInputBox(e) {
  if (e.target.closest('.add-btn') && !e.target.closest('.solid')) {
    // Hide Add Item btn
    e.target.closest('.add-btn').style.visibility = 'hidden';

    // Add Save Item btn
    const saveItemBtn = document.createElement('div');
    saveItemBtn.classList.add('add-btn', 'solid');
    saveItemBtn.innerHTML = `<span>Save Item</span>`;
    saveItemBtn.style.display = 'flex';
    e.target.closest('.add-btn-group').appendChild(saveItemBtn);

    // Add input container for typing
    const addContainer = document.createElement('div');
    addContainer.classList.add('add-container');
    addContainer.innerHTML = `<div class='add-item' contentEditable='true'></div>`;
    addContainer.style.display = 'flex';
    e.target.closest('.drag-column').appendChild(addContainer);

    // //////////////////////////////////
    // Event when clicking Save Item btn
    saveItemBtn.addEventListener('click', e => {
      // Identify current column
      const currentColumn = e.target.closest('.drag-column');

      // Get content in input box
      const inputText = currentColumn.querySelector('.add-item').textContent;

      if (inputText !== '') {
        // Insert inputBox to targeted column of items
        insertItemEl(currentColumn.querySelector('.drag-item-list'), inputText);

        // Update the main Arrays, then save the main Arrays to localStorage
        rebuildArrays();
      }

      // Remove inputBox
      e.target.closest('.drag-column').querySelector('.add-container').remove();

      // Set Add Item btn back to visible
      e.target
        .closest('.add-btn-group')
        .querySelector('.add-btn').style.visibility = 'visible';

      // Remove Save Item btn
      saveItemBtn.remove();
    });
  }
}

// On Load
updateDOM();

// Add event listeners for column when we drag item
allInList.listColumns.forEach(column => {
  column.addEventListener('drop', drop);
  column.addEventListener('dragover', allowDrop);
  column.addEventListener('dragenter', dragEnter);
  column.addEventListener('dragleave', dragLeave);
});

// Add event listener to dragList containing all columns
// Use bubling to read the what column add item is
allInList.dragList.addEventListener('click', showSaveInputBox);
