let searchInputEl = document.getElementById("searchInput");
let resultContainer = document.getElementById("resultCountries");
let url = "https://apis.ccbp.in/countries-data";
let search_results
let userEnteredText = ""

console.log(userEnteredText)

function displayEachRes(each_res) {

    let {
        name,
        flag,
        population
    } = each_res
    let all_countries_div = document.createElement("div");
    all_countries_div.classList.add("col-12", "col-md-6");


    let each_Res_container = document.createElement("div");
    each_Res_container.classList.add("country-card", "d-flex", "flex-row")

    let imageEl = document.createElement("img");
    imageEl.src = flag;
    imageEl.classList.add("country-flag", "mr-3")
    each_Res_container.appendChild(imageEl)

    let innerContainer = document.createElement("div");
    innerContainer.classList.add("d-flex", "flex-column");
    let headingEl = document.createElement("h1");
    headingEl.textContent = name;
    headingEl.classList.add("country-name")
    innerContainer.appendChild(headingEl)
    let populationEl = document.createElement("p");
    populationEl.classList.add("country-population")
    populationEl.textContent = population
    innerContainer.appendChild(populationEl);

    each_Res_container.appendChild(innerContainer)


    all_countries_div.appendChild(each_Res_container)
    resultContainer.appendChild(all_countries_div)
}

function displayData() {
    resultContainer.textContent = ""
    for (let each_res of search_results) {
        let countryName = each_res.name
        if (countryName.toLowerCase().includes(userEnteredText.toLowerCase())) {
            displayEachRes(each_res);
        }

    }
}

function getCountries() {
    let options = {
        method: "GET"
    }
    fetch(url, options)
        .then(function(response) {
            return response.json()
        })
        .then(function(jsonData) {
            search_results = jsonData;
            displayData();
        });
}


function getData(event) {
    userEnteredText = event.target.value;
    displayData();
}

console.log(userEnteredText)
getCountries()
searchInputEl.addEventListener("keydown", getData)