document.addEventListener('DOMContentLoaded', () => {
    const addItemButton = document.getElementById('add-item-btn');
    const itemInput = document.getElementById('item-input');
    const shoppingList = document.getElementById('shopping-list');
    const markAllButton = document.getElementById('mark-all-btn');
    const unmarkAllButton = document.getElementById('unmark-all-btn');
    const clearAllButton = document.getElementById('clear-all-btn');

    const loadItems = () => {
        const savedItems = JSON.parse(localStorage.getItem('shoppingList')) || [];
        savedItems.forEach(item => addItemToList(item.text, item.purchased));
    };

    const saveItems = () => {
        const items = [];
        shoppingList.querySelectorAll('li').forEach(li => {
            items.push({ text: li.querySelector('.item-text').textContent.trim(), purchased: li.classList.contains('purchased') });
        });
        localStorage.setItem('shoppingList', JSON.stringify(items));
    };

    const addItemToList = (text, purchased = false) => {
        const listItem = document.createElement('li');
        listItem.className = `list-group-item d-flex justify-content-between align-items-center${purchased ? ' purchased' : ''}`;
        
        // Create check icon
        const checkIcon = document.createElement('span');
        checkIcon.className = 'check-icon';
        checkIcon.innerHTML = '&#10003;'; // Checkmark symbol
        checkIcon.style.visibility = purchased ? 'visible' : 'hidden'; // Set initial visibility

        //Create text span
        const itemText = document.createElement('span');
        itemText.className = 'item-text';
        itemText.textContent = text;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'btn btn-danger btn-sm btn-remove';
        listItem.appendChild(checkIcon);
        listItem.appendChild(itemText);
        listItem.appendChild(removeButton);

        shoppingList.appendChild(listItem);

        // Toggle purchased status
        listItem.addEventListener('click', () => {
            listItem.classList.toggle('purchased');
            checkIcon.style.visibility = listItem.classList.contains('purchased') ? 'visible' : 'hidden';
            saveItems();
        });

        //Remove item
        removeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            shoppingList.removeChild(listItem);
            saveItems();
        });
    };

    addItemButton.addEventListener('click', () => {
        const itemText = itemInput.value.trim();
        if (itemText) {
            addItemToList(itemText);
            itemInput.value = '';
            saveItems();
        }
    } );

    markAllButton.addEventListener('click', () => {
        shoppingList.querySelectorAll('li').forEach(li => {
            li.classList.add('purchased');
            li.querySelector('.check-icon').style.visibility = 'visible';
        });
        saveItems();
    } );

    unmarkAllButton.addEventListener('click', () => {
        shoppingList.querySelectorAll('li').forEach( li => { 
            li.classList.remove('purchased'); 
            li.querySelector('.check-icon').style.visibility = 'hidden';
        });
        saveItems();
    });

    clearAllButton.addEventListener('click', () => {
        shoppingList.innerHTML = '';
        localStorage.removeItem('shoppingList');
    });

    // Load saved items on page load
    loadItems();
});
