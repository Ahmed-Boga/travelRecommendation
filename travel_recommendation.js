// <================Fetch data from the JSON file================>
async function fetchFunction() {
  try {
    const response = await fetch("travel_recommendation_api.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Or handle the error differently
  }
}

// <================Function to perform search================>
async function performSearch(event) {
  event.preventDefault();

  const searchTerm = document.getElementById("searchInput").value.toLowerCase();

  const travelData = await fetchFunction();
  let results = [];

  for (const category in travelData) {
    for (const iterator of travelData[category]) {
      if (category.toLocaleLowerCase().includes(searchTerm)) {
        console.log(iterator);
        results.push(iterator);

        console.log(Object.hasOwnProperty.call(iterator, "cities"));
      } else {
        if (
          Object.hasOwnProperty.call(iterator, "cities") &&
          iterator["name"].toLocaleLowerCase().includes(searchTerm)
        ) {
          results = iterator["cities"];
        }
      }
    }
  }

  displayResults(results); // Use the filteredData for your search logic
}

// <================Function to display search results================>
function displayResults(results) {
  const resultsContainer = document.querySelector(".right-section");
  console.log(resultsContainer);
  resultsContainer.innerHTML = "";

  if (results.length === 0) {
    resultsContainer.innerHTML = `<div class="destination-card"> <p>No results found.</p>
          </div>
        `;
    return;
  }

  results.forEach((item) => {
    const resultElement = document.createElement("div");
    resultElement.className = "destination-card";
    resultElement.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}" class="destination-image">
            <h3 >${item.name}</h3>
            <p>${item.description}</p>
            <p>Current Time: <span class="time-${item.timezone}"></span></p>
            <button id="leftsidebutton">Visit</button>
        `;
    resultsContainer.appendChild(resultElement);

    updateTime(item.timezone, `time-${item.timezone}`); //  Display current time for the location (Task 10)
  });
}

// <================Function to clear search results (Task 9)================>
function clearResults() {
  const resultsContainer = (document.querySelector(".right-section").innerHTML =
    "");
  document.getElementById("searchInput").value = "";
}

// <================Function to update time for a specific timezone (Task 10)================>
function updateTime(timezone, elementId) {
  const options = {
    timeZone: timezone,
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  function updateClock() {
    const currentTime = new Date().toLocaleTimeString("en-US", options);
    const timespans = document.getElementsByClassName(elementId);
    for (const key of timespans) {
      key.textContent = currentTime;
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

// <================Event listeners================>
document.getElementById("searchForm").addEventListener("submit", performSearch);
document.getElementById("resetButton").addEventListener("click", clearResults);
