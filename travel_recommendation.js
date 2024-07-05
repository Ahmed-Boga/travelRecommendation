// Global variable to store the fetched data
let travelData = [];

// Fetch data from the JSON file
fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        travelData = data;
        console.log('Fetched data:', travelData);
    })
    .catch(error => console.error('Error fetching data:', error));

// Function to perform search
function performSearch(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const results = travelData.filter(item => 
        item.type.toLowerCase().includes(searchTerm) ||
        item.name.toLowerCase().includes(searchTerm) ||
        item.country.toLowerCase().includes(searchTerm)
    );
    displayResults(results);
}

// Function to display search results
function displayResults(results) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    results.forEach(item => {
        const resultElement = document.createElement('div');
        resultElement.className = 'result-item';
        resultElement.innerHTML = `
            <h2>${item.name}, ${item.country}</h2>
            <img src="${item.imageUrl}" alt="${item.name}" style="max-width: 300px;">
            <p>${item.description}</p>
            <p>Current Time: <span id="time-${item.id}"></span></p>
        `;
        resultsContainer.appendChild(resultElement);

        // Display current time for the location (Task 10)
        updateTime(item.timezone, `time-${item.id}`);
    });
}

// Function to update time for a specific timezone (Task 10)
function updateTime(timezone, elementId) {
    const options = { timeZone: timezone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    
    function updateClock() {
        const currentTime = new Date().toLocaleTimeString('en-US', options);
        document.getElementById(elementId).textContent = currentTime;
    }

    updateClock();
    setInterval(updateClock, 1000);
}

// Function to clear search results (Task 9)
function clearResults() {
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').innerHTML = '';
}

// Event listeners
document.getElementById('searchForm').addEventListener('submit', performSearch);
document.getElementById('resetButton').addEventListener('click', clearResults);