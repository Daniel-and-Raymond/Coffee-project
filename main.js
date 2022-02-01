"use strict"
// initializing variables
const divBody = document.querySelector('#coffees');
const roastSelection = document.querySelector('#roast-options');
const addCoffeeSelection = document.querySelector('#roast-selection-add');
const searchInput = document.querySelector('#roast-search');
const addCoffeeInput = document.querySelector('#add-coffee-input');
const searchBtn = document.querySelector('#search-coffee');
const addCoffeeBtn = document.querySelector('#add-submit');
const storedCoffee = JSON.parse(localStorage.getItem('listOfCoffee'));

// jquery to give transition of fading in and our when switching between add your own coffee and browse our list
$(document).ready(function () {
    $('#switch-modal').click(function () {
        $('#modal-one').fadeOut(500);
        $('#modal-two').fadeIn(2000);
    });
    $('#back').click(function () {
        $('#modal-two').fadeOut(500);
        $('#modal-one').fadeIn(3000);
    });
});

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
// initializing coffee array
let coffees = [];

// determining local stored data within your browser
function getStoredData() {
    // if not undefined use local storage
    if (storedCoffee) {
        coffees = storedCoffee
    } else if (!storedCoffee) {              // if no local storage use this array of objects
        coffees = [
            {id: 1, name: 'Light City', roast: 'light'},
            {id: 2, name: 'Half City', roast: 'light'},
            {id: 3, name: 'Cinnamon', roast: 'light'},
            {id: 4, name: 'City', roast: 'medium'},
            {id: 5, name: 'American', roast: 'medium'},
            {id: 6, name: 'Breakfast', roast: 'medium'},
            {id: 7, name: 'High', roast: 'dark'},
            {id: 8, name: 'Continental', roast: 'dark'},
            {id: 9, name: 'New Orleans', roast: 'dark'},
            {id: 10, name: 'European', roast: 'dark'},
            {id: 11, name: 'Espresso', roast: 'dark'},
            {id: 12, name: 'Viennese', roast: 'dark'},
            {id: 13, name: 'Italian', roast: 'dark'},
            {id: 14, name: 'French', roast: 'dark'},
        ];
    }
}

getStoredData();

// setting html layout and assigning value
function renderCoffee(coffee) {
    let html = '<div class="coffee">';
    html += '<h2>' + coffee.name + '</h2>';
    html += '<p>' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

// sorting and looping through an array of objects to display proper roast when clicked
function renderCoffees(coffees) {
    let coffeeCopy = coffees.slice(); //making copy of original array
    let sortedCoffees = customSort({data: coffeeCopy, sortField: 'roast'}) //sorting with custom sort
    let html = '';
    for (let i = 0; i < sortedCoffees.length; i++) { // looping through and assigning each coffee object
        html += renderCoffee(sortedCoffees[i]);
    }
    return html;
}

// sorts by their type of roasts
const customSort = ({data, sortField}) => {
    const sortBy = ['light', 'medium', 'dark'] //setting sort parameters
    const sortByObject = sortBy.reduce((obj, item, index) => {
        return { // returns obj sorted by parameters
            ...obj,
            [item]: index
        }
    }, {})
    return data.sort((a, b) => sortByObject[a[sortField]] - sortByObject[b[sortField]]) //returning sort
}

// to update the ui
function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let selectedRoast = roastSelection.value.toLowerCase().split(' ');
    let filteredCoffees = [];
    coffees.forEach(function (coffee) {
        if (coffee.roast === selectedRoast[0]) {
            filteredCoffees.push(coffee);
        }
    });
    if (selectedRoast[0] === "all") {
        divBody.innerHTML = renderCoffees(coffees);
    } else {
        divBody.innerHTML = renderCoffees(filteredCoffees);

    }
}

// search through  coffee list
function searchCoffeeName() {
    const searchInputName = searchInput.value
    const searchNormalized = searchInputName.charAt(0).toUpperCase() + searchInputName.slice(1);
    const searchCoffees = [];
    coffees.forEach(function (coffee) {
        if (searchNormalized === coffee.name.slice(0, searchNormalized.length)) {
            searchCoffees.push(coffee);
        }
    });
    divBody.innerHTML = renderCoffees(searchCoffees);
}

// adds coffee to the list and alerts user if no input is in the add coffee search
const addCoffee = function (e) {
    e.preventDefault();
    // Getting roast selection
    let addedRoast = addCoffeeSelection.value.toLowerCase().split(' ');
    // Getting the value from add-coffee-input
    let coffeeInput = addCoffeeInput.value.split(' ');
    console.log(coffeeInput)
    if (coffeeInput[0] !== '') {
        let coffeeList = [];
        // turning the beginning of each word uppercase
        coffeeInput.forEach(function (coffee) {
            coffeeList.push((coffee.charAt(0).toUpperCase() + coffee.slice(1)));
        })
        // creating the new coffee object
        const newCoffeeObj = {
            id: coffees.length + 1,
            name: coffeeList.join(' '),
            roast: addedRoast[0].toLowerCase(),
        }
        coffees.push(newCoffeeObj)
        updateCoffees(e);
        addCoffeeInput.value = '';
        localStorage.setItem('listOfCoffee', JSON.stringify(coffees))
    } else {
        alert('Please enter the name of a coffee');
    }
}


divBody.innerHTML = renderCoffees(coffees);

//Event Listeners
searchInput.addEventListener('keyup', searchCoffeeName);
searchBtn.addEventListener('click', updateCoffees);
addCoffeeBtn.addEventListener('click', addCoffee)
