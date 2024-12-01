// Function to initialize navbar dropdown functionality
function initializeNavBar() {
    const navBarElement = document.getElementById("navbar-container");
    if (navBarElement) {
        navBarElement.addEventListener('mouseover', (e) => {
            if (e.target.matches('.navbar li')) {
                const dropdown = e.target.querySelector('.dropdown-menu');
                if (dropdown) {
                    dropdown.style.display = 'block';
                }
            }
        });

        navBarElement.addEventListener('mouseout', (e) => {
            if (e.target.matches('.navbar li')) {
                const dropdown = e.target.querySelector('.dropdown-menu');
                if (dropdown) {
                    dropdown.style.display = 'none';
                }
            }
        });
    }
}

// Function to initialize the carousel
function initializeCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        let currentIndex = 0;
        const items = carouselContainer.querySelectorAll('.carousel-item');
        const totalItems = items.length;

        if (totalItems > 0) {
            function showItem(index) {
                items.forEach((item, i) => {
                    item.style.display = i === index ? 'block' : 'none';
                });
            }

            function nextItem() {
                currentIndex = (currentIndex + 1) % totalItems;
                showItem(currentIndex);
            }

            function previousItem() {
                currentIndex = (currentIndex - 1 + totalItems) % totalItems;
                showItem(currentIndex);
            }

            // Set up buttons for next and previous, if they exist
            const nextButton = document.querySelector('.carousel-next');
            const prevButton = document.querySelector('.carousel-prev');
            if (nextButton && prevButton) {
                nextButton.addEventListener('click', nextItem);
                prevButton.addEventListener('click', previousItem);
            }

            // Automatically start showing the first item
            showItem(currentIndex);

            // Optionally add auto-rotation (e.g., every 3 seconds)
            setInterval(nextItem, 3000);
        }
    }
}

// Paragraph Generator Initialization
function initializeParagraphGenerator() {
    const generateBtn = document.getElementById('generateBtn');
    const output = document.getElementById('output');

    if (generateBtn && output) {
        generateBtn.addEventListener('click', async () => {
            const apiURL = "https://recapitating-massive.onrender.com/generate_paragraph?num_sentences=10";
            output.innerText = "Loading...";
            try {
                const response = await fetch(apiURL);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const data = await response.json();
                output.innerText = data.paragraph || "Error: Unable to generate a paragraph.";
            } catch (error) {
                console.error("Fetch Error:", error);
                output.innerText = `Error: Unable to connect to the server. Please try again later.`;
            }
        });
    }
}

// Fetch JSON data for books
let jsonData;
let allRatedBooks = new Set();

async function fetchJsonData() {
    try {
        const response = await fetch("/ENG6806/originalprojects/newnovelcuriosity/newnovel.json");
        if (!response.ok) throw new Error("Network response was not ok");
        jsonData = await response.json();
        const displayedBooks = getRandomBooks(jsonData, 10);
        displayBooks(displayedBooks);
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
}

// Generate random books
function getRandomBooks(jsonData, count) {
    const books = [
        ...jsonData.Proto_New_Novel_Precursors_to_the_Movement_Before_1948.map(book => ({ ...book, genre: "Proto-New Novel" })),
        ...jsonData.New_Novel_Core_Works_of_the_Movement_1948_1965.Key_Authors.map(book => ({ ...book, genre: "New Novel Core Works" })),
        ...jsonData.New_Novel_Core_Works_of_the_Movement_1948_1965.Other_Authors_Aligning_with_the_Movement.map(book => ({ ...book, genre: "New Novel Core Works" })),
        ...jsonData.Post_New_Novel_Influenced_by_the_Movement_1966_Present.map(book => ({ ...book, genre: "Post-New Novel" }))
    ].filter(book => !allRatedBooks.has(book.title));
    return books.sort(() => 0.5 - Math.random()).slice(0, count);
}

// Display books for rating
function displayBooks(books) {
    const bookList = document.getElementById("book-list");
    if (!bookList) return;
    bookList.innerHTML = "";
    books.forEach((book, index) => {
        const bookContainer = document.createElement("div");
        bookContainer.className = "book-container";

        const bookTitle = document.createElement("div");
        bookTitle.className = "book-title";
        bookTitle.textContent = `${book.title} by ${book.author} (${book.year}, ${book.country})`;

        const ratingOptions = document.createElement("div");
        ratingOptions.className = "rating-options";
        [1, 2, 3, 4, 5].forEach(rating => {
            const label = document.createElement("label");
            const input = document.createElement("input");
            input.type = "radio";
            input.name = `rating-${index}`;
            input.value = rating;
            label.appendChild(input);
            label.appendChild(document.createTextNode(rating));
            ratingOptions.appendChild(label);
        });

        const notReadLabel = document.createElement("label");
        const notReadInput = document.createElement("input");
        notReadInput.type = "radio";
        notReadInput.name = `rating-${index}`;
        notReadInput.value = "not-read";
        notReadLabel.appendChild(notReadInput);
        notReadLabel.appendChild(document.createTextNode("Haven't read it"));
        ratingOptions.appendChild(notReadLabel);

        bookContainer.appendChild(bookTitle);
        bookContainer.appendChild(ratingOptions);
        bookList.appendChild(bookContainer);
    });
}

// Load the CSS once DOM is ready
function loadCSS(filePath) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = filePath;
    link.type = "text/css";
    link.onload = () => console.log(`CSS Loaded: ${filePath}`);
    link.onerror = () => console.error(`Failed to load CSS: ${filePath}`);
    document.head.appendChild(link);
}

// Initialize everything once DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    initializeNavBar(); // Initialize navbar dropdown functionality
    initializeCarousel(); // Initialize carousel functionality
    initializeParagraphGenerator(); // Initialize paragraph generator
    fetchJsonData(); // Fetch book data
    loadCSS("/ENG6806/project_root/static/css/style.css"); // Load CSS
});
