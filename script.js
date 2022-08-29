const loadData = async (search, dataLimit) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${search}`
  );
  const data = await res.json();
  displayData(data.data, dataLimit);
};

const displayData = (phones, dataLimit) => {
  const phoneContainer = document.getElementById("phones-container");
  phoneContainer.innerHTML = "";
  //Show 10 items
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);

    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  const noPhone = document.getElementById("not-found");
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }
  phones.forEach((phone) => {
    const { brand, phone_name: name, slug, image } = phone;
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = ` 

        <div class="card h-100">
                <img src="${image}" class="card-img-top img-fluid p-5" alt="..." />
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <button onclick="phoneDetails('${slug}')" href="#" class="btn btn-primary">Show Details</button>
            </div>
        </div>

    `;
    phoneContainer.appendChild(phoneDiv);
  });
  //Stop loader
  toggleSpinner(false);
};

const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const inputValue = searchField.value;
  loadData(inputValue, dataLimit);
};

document.getElementById("btn-search").addEventListener("click", function () {
  //Start Loader
  processSearch(10);
});

const toggleSpinner = (isLoading) => {
  const spinner = document.getElementById("loader");

  if (isLoading) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

document.getElementById("btn-show-all").addEventListener("click", function () {
  processSearch();
});

// loadData();
