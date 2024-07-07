// // Global variable to store the fetched data
// let travelData = [];

// Fetch data from the JSON file
async function fetchFunction() {
  try {
    const response = await fetch("travel_recommendation_api.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Or handle the error differently
  }
}

// // Function to perform search
// async function performSearch(event) {
//   event.preventDefault();

//   const searchTerm = document.getElementById("searchInput").value.toLowerCase();

//   const travelData = await fetchFunction();
//   let results = [];

//   for (const travelArray in travelData) {
//     if (travelArray.toLowerCase().includes(searchTerm)) {
//       results = travelData[travelArray];
//     } else {
//       travelData[travelArray].filter((item) => {
//         if (item.name.toLowerCase().includes(searchTerm)) {
//           console.log(travelArray);
//           console.log(item.cities);
//           console.log(item.name.toLowerCase().includes(searchTerm));
//           results = item.cities;
//         }
//       });
//     }
//   }

//   console.log(results);
//   // Use the filteredData for your search logic
//   displayResults(results);
// }

async function performSearch(event) {
  event.preventDefault();

  const searchTerm = document.getElementById("searchInput").value.toLowerCase();

  const travelData = await fetchFunction();
  let results = [];

  // Loop through each property (countries, temples, beaches)
  for (const category in travelData) {
    // Check if search term matches the category name (optional)
    if (
      !category.toLowerCase().includes(searchTerm) &&
      category[name].toLowerCase().includes(searchTerm)
    ) {
      console.log(`${category},${searchTerm}`);
      for (const key in object) {
        if (key == "cities") {
          console.log(key);
          for (const city of key) {
            console.log(city);
            results.push(city); // Add all items from the category
            return; // Skip filtering within the category if the category itself matches
          }
        }
      }
    }

    // Filter items within the current category
    const filteredItems = travelData[category].filter(
      (item) => item.name.toLowerCase().includes(searchTerm) && !item.cities
    );

    // Add filtered items to the results
    results.push(...filteredItems);
  }

  console.log(results);
  // Use the filteredData for your search logic
  displayResults(results);
}

// Function to display search results
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
            <p>Current Time: <span id="time-${item.id}"></span></p>
            <button id="leftsidebutton">Visit</button>
        `;
    resultsContainer.appendChild(resultElement);

    // Display current time for the location (Task 10)
    updateTime(item.timezone, `time-${item.id}`);
  });
}

// Function to update time for a specific timezone (Task 10)
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
    document.getElementById(elementId).textContent = currentTime;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

// Function to clear search results (Task 9)
function clearResults() {
  document.getElementById("searchInput").value = "";
  document.getElementById("searchResults").innerHTML = "";
}

// Event listeners
document.getElementById("searchForm").addEventListener("submit", performSearch);
document.getElementById("resetButton").addEventListener("click", clearResults);
