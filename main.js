"use strict"

function renderCoffee(coffee) {
    var html = '<div class="coffee">';
    html += '<h2>' + coffee.name + '</h2>';
    html += '<p>' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for (var i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value.toLowerCase().split(" ");
    var filteredCoffees = [];
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

function keyListener() {

    var searchRoastInput = searchInput.value
    var filteredCoffees2 = [];
    var filteredcoffee3 = [];
    coffees.forEach(function (coffee) {
        filteredCoffees2.push(coffee);
    });
    var reg = new RegExp(searchRoastInput)
    filteredCoffees2.filter(function (coffee) {
        if (coffee.matches(reg)) {
            filteredcoffee3.push(coffee)
        }
    });

    divBody.innerHTML = renderCoffees(filteredcoffee3)
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
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

var divBody = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
var searchInput = document.querySelector('#coffee-search')


divBody.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);
searchInput.addEventListener('keyup', keyListener)