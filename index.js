"use strict";

let search = $("#search");
let elregion = $("#region");
let wrapper = $(".wrapper");

let BASE_URL = "https://restcountries.com/v2";

// ALL COUNTRIES FETCHING FUNCTION

async function AllCountries() {
  wrapper.innerHTML = "<span class='loader'></span>";
  try {
    const response = await fetch(`${BASE_URL}/all`);

    console.log(response);
    const result = await response.json();
    if (response.status === 200) {
      console.log(result);
      renderCountries(result);
      renderSelect(result)
      sortRegion(result)
      searchName(result)
    } else {
      alert(response.status);
    }
  } catch (err) {
    console.log(err);
  }
}

AllCountries();

// COUNTRY RENDER FUNCTIONS

function renderCountries(data) {
  if (data) {
    wrapper.innerHTML = null;
    data.forEach((item) => {
      const card = createElement(
        "div",
        "card w-[265px] h-[336px] bg-white shadow-lg m-2",
        `
            <img
            src="${item.flag}"
            alt="flag"
            class="w-full"
          />
          <div class="card-body p-6">
            <h3 class="text-xl font-bold">${item.name}</h3>
            <ul class="mt-2">
              <li><strong>Population: </strong>${item.population}</li>
              <li><strong>Region: </strong> ${item.region}</li>
              <li><strong>Capital: </strong>${item.capital}</li>
            </ul>
          </div>

            `
      );
      wrapper.append(card)
    });
  }
}
let regions = []



function renderSelect(data) {
  data.map((item) => {
    if (!regions.includes(item.region)) {
      regions.push(item.region)
    }
  })

  regions.forEach(item => {
    const option = createElement("option", "", `<option value="${item}">${item}</option> `)
    elregion.append(option)

  });
}
console.log(regions);



function sortRegion(data) {
  elregion.addEventListener("change", e => {
    const filterregion = data.filter(item => {
      return e.target.value === item.region
    });
    renderCountries(filterregion)
  })
}

function searchName(data) {
  search.addEventListener("keyup", (e) => {
    let sortName = data.filter(item => {
      console.log(e.target.value);
      return item.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())

    })
    renderCountries(sortName)
  })
}