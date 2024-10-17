document.getElementById('addItemButton').addEventListener('click', function() {
    const itemInput = document.getElementById('itemInput');
    const itemText = itemInput.value.trim();

    if (itemText) {
        const itemList = document.getElementById('itemList');
        const listItem = document.createElement('li');
        listItem.textContent = itemText;
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'btn btn-danger btn-sm';
        removeButton.onclick = function() {
            itemList.removeChild(listItem);
        };

        listItem.onclick = function() {
            listItem.classList.toggle('strikethrough');
            listItem.classList.toggle('purchased');
        };

        listItem.appendChild(removeButton);
        itemList.appendChild(listItem);
        itemInput.value = ''; // Clear input field
    }
});
