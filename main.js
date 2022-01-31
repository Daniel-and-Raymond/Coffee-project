"use strict"
const divBody = document.querySelector('#coffees');
const roastSelection = document.querySelector('#option-to-choose');
const addCoffeeSelection = document.querySelector('#roast-selection-add');
const searchInput = document.querySelector('#search-our-roast');
const addCoffeeInput = document.querySelector('#add-coffee-input');
const searchBtn = document.querySelector('#search-coffee');
const addCoffeeBtn = document.querySelector('#add-submit');
const switchModal = document.querySelector('#switch-modal');
const storedCoffee = localStorage.getItem('');
const modalOne = document.querySelector('#modal-one');
const modalTwo = document.querySelector('#modal-two');

$(document).ready(function () {
    $('#switch-modal').click(function () {
        $('#modal-one').hide();
        $('#modal-two').fadeIn(2000).show();
    })
})

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
const coffees = [
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

function getStoredData() {

}

function renderCoffee(coffee) {
    let html = '<div class="coffee">';
    html += '<h2 class="m-0">' + coffee.name + '</h2>';
    html += '<p class="mb-0 ml-2">' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

function renderCoffees(coffees) {
    let coffeeCopy = coffees.slice();
    let sortedCoffees = customSort({data: coffeeCopy, sortField: 'roast'})
    let html = '';
    for (let i = 0; i < sortedCoffees.length; i++) {
        html += renderCoffee(sortedCoffees[i]);
    }
    return html;
}

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

const addCoffee = function (e) {
    e.preventDefault();
    // Getting roast selection
    let addedRoast = addCoffeeSelection.value.toLowerCase().split(' ');
    // Getting the value from add-coffee-input
    let coffeeInput = addCoffeeInput.value.split(' ');
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
}

const customSort = ({data, sortField}) => {
    const sortBy = ['light', 'medium', 'dark']
    const sortByObject = sortBy.reduce((obj, item, index) => {
        return {
            ...obj,
            [item]: index
        }
    }, {})
    return data.sort((a, b) => sortByObject[a[sortField]] - sortByObject[b[sortField]])
}

divBody.innerHTML = renderCoffees(coffees);

//Event Listeners
searchInput.addEventListener('keyup', searchCoffeeName);
searchBtn.addEventListener('click', updateCoffees);
addCoffeeBtn.addEventListener('click', addCoffee)
