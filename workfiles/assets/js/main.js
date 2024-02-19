
// Function to fetch NASA's Astronomy Picture of the Day (APOD) based on a provided date or fetch the latest by default
async function getData(date = '') {
    try {
        // API URL with the provided date if any
        let apiUrl = "https://api.nasa.gov/planetary/apod?api_key=JwKW7caUyQo7I7qRvACfrW4L5nYHRwqMXCT8t2sT";
        if (date) {
            apiUrl += `&date=${date}`;
        }

        // Fetch the data from NASA's APOD API
        const response = await fetch(apiUrl);
        const info = await response.json();

        // Log the response data to the console for debugging
        console.log(info);

        // Select the content area to display the APOD and update its HTML based on media type
        const content = document.querySelector("#twilight");

        // Check if the media type is video or image and update the content accordingly
        if (info.media_type === "image") {
            content.innerHTML = `
                <h3>${info.title}</h3>
                <img src="${info.url}" alt="Astronomy Picture of the Day" class="img-fluid">
                <p>${info.explanation}</p>
            `;
        } else if (info.media_type === "video") {
            content.innerHTML = `
    <h3>${info.title}</h3>
    <iframe src="${info.url}" frameborder="0" allowfullscreen class="img-fluid" style="width: 100%; height: 500px;"></iframe>
    <p>${info.explanation}</p>
`;
        } else {
            // Handle other media types or missing media
            content.innerHTML = `<p>No image or video available for this date.</p>`;
        }
    } catch (error) {
        // Log and display any errors encountered during the fetch operation
        console.warn(`Error fetching APOD: ${error}`);
        content.innerHTML = `<p>Error fetching data: ${error}</p>`;
    }
}


// Add an event listener for the DOMContentLoaded event to ensure the script runs after the HTML document has been fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Add an event listener to the form to handle the submit event
    const form = document.getElementById('date-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
        const date = document.getElementById('date').value; // Retrieve the date entered by the user
        getData(date); // Fetch the APOD for the entered date
    });
});

// Fetch and display the latest APOD when the page loads
getData();
