"use strict"
var divBody = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
var searchInput = document.querySelector('#coffee-search');

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

function renderCoffee(coffee) {
    let html = '<div class="coffee">';
    html += '<h2>' + coffee.name + '</h2>';
    html += '<p>' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

function renderCoffees(coffees) {
    let html = '';
    for (var i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
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

searchInput.addEventListener('keyup', function () {
    const searchInputName = searchInput.value
    const searchNormalized = searchInputName.charAt(0).toUpperCase() + searchInputName.slice(1);
    const searchCoffees = []
    coffees.forEach(function (coffee) {
        if (searchNormalized === coffee.name.slice(0, searchNormalized.length)) {
            searchCoffees.push(coffee);
        }
    });
    divBody.innerHTML = renderCoffees(searchCoffees);
});

divBody.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);
