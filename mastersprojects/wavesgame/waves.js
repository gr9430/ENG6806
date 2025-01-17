let img;
let stanzasRead = 0;
let interactions = 0;
const totalInteractions = 5; // Number of interactive zones
let revealedMessages = [];

function preload() {
    img = loadImage(
        '/mastersprojects/wavesgame/images/canvas.jpg',
        () => {
            console.log('Image loaded successfully');
        },
        () => console.error('Failed to load image')
    );
}

function setup() {
    console.log('Starting setup...');
    let canvasContainer = document.getElementById('canvas-container');
    if (canvasContainer) {
        // Create the canvas with the dimensions of the image
        let canvas = createCanvas(img.width, img.height);
        canvas.parent(canvasContainer);

        // Set container dimensions to match the canvas dimensions
        canvasContainer.style.width = img.width + 'px';
        canvasContainer.style.height = (img.height * 0.75) + 'px';
        canvasContainer.style.backgroundColor = '#ffffff'; // Set background color to white

        canvas.style('max-width', '100%');
        canvas.style('height', 'auto');
    } else {
        console.error("Canvas container not found");
    }
    
    textAlign(LEFT, BOTTOM);
    textSize(16);
    console.log('Setup completed');

    // Move title and opening line to container
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
        messageContainer.style.height = (img.height * 0.75) + 'px';
        messageContainer.style.backgroundColor = "#000000"; // Set background color to black
        let title = document.createElement("h1");
        title.textContent = "The Waves Forget the Structure";
        title.className = "message-title"; // Added class for consistency with CSS styling
        messageContainer.appendChild(title);

        let openingLine = document.createElement("p");
        openingLine.textContent = "here,";
        openingLine.className = "message-opening-line"; // Added class for consistency with CSS styling
        messageContainer.appendChild(openingLine);
    }
}

function draw() {
    if (img) {
        background(255);
        image(img, 0, 0, width, height);
    } else {
        background(255);
    }

    displayStanzasCompleted();
    displayRevealedMessages();

    // Define interactive zones
    if (isWithinZone(mouseX, mouseY, 115, 770, 218, 845)) {
        cursor('pointer');
        highlightZone(115, 770, 218, 845);
    } else if (isWithinZone(mouseX, mouseY, 225, 750, 500, 910)) {
        cursor('pointer');
        highlightZone(225, 750, 500, 910);
    } else if (isWithinZone(mouseX, mouseY, 465, 470, 955, 735)) {
        cursor('pointer');
        highlightZone(465, 470, 955, 735);
    } else if (isWithinZone(mouseX, mouseY, 125, 75, 420, 740)) {
        cursor('pointer');
        highlightZone(125, 75, 420, 740);
    } else if (isWithinZone(mouseX, mouseY, 640, 5, 955, 325)) {
        cursor('pointer');
        highlightZone(640, 5, 955, 325);
    } else {
        cursor('default');
    }
}

function isWithinZone(x, y, x1, y1, x2, y2) {
    return x >= x1 && x <= x2 && y >= y1 && y <= y2;
}

function highlightZone(x1, y1, x2, y2) {
    fill(200, 200, 200, 100); // Light grey color with 40% opacity
    noStroke();
    rect(x1, y1, x2 - x1, y2 - y1);
}

function displayStanzasCompleted() {
    fill(0);
    textSize(20); // Increased text size for better visibility
    text(`Stanzas Completed: ${stanzasRead} / ${totalInteractions}`, 10, 30);
}

function displayRevealedMessages() {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
        // Clear previous messages, but keep the title and opening line
        const titleHTML = messageContainer.querySelector("h1") ? messageContainer.querySelector("h1").outerHTML : "";
        const openingLineHTML = messageContainer.querySelector("p") ? messageContainer.querySelector("p").outerHTML : "";
        
        messageContainer.innerHTML = titleHTML + openingLineHTML;

        for (let i = 0; i < revealedMessages.length; i++) {
            let paragraph = document.createElement("p");
            paragraph.textContent = revealedMessages[i];
            paragraph.className = "message-stanza"; // Added class for consistency with CSS styling
            messageContainer.appendChild(paragraph);
        }
    }
}

function mousePressed() {
    // Interactive zones with messages
    if (isWithinZone(mouseX, mouseY, 115, 770, 218, 845)) { // Bird
        addMessage("before the smoke painted the sky\nwith shadows, before stone towers rose\nto watch over the sand like sentinels.\nNo room remains for the sea’s slow song—\nedges cutting across the sky, blind\nto the waves.");
    } else if (isWithinZone(mouseX, mouseY, 225, 750, 500, 910)) { // Shore (Updated coordinates)
        addMessage("paths carve where sand once shifted\nbeneath unsteady feet. Iron holds firm,\nsharp lines drawn into the earth,\na geometry leading forward.\nThe weight of time falls in rhythm,\nnot like waves that forget what they touch.");
    } else if (isWithinZone(mouseX, mouseY, 465, 470, 955, 735)) { // Waves
        addMessage("the first sound of waves breaking on the shore,\nthe pull of the tide soft as breath,\nsmall hands once reached for shells as if to hold the sea.\nNow the wind moves like a thought, caught\nbetween the spaces where light once fell freely.\nThe air carries only shadows now—\na world remade in silence.");
    } else if (isWithinZone(mouseX, mouseY, 125, 75, 420, 740)) { // Building
        addMessage("towers rise to be followed, engines hum\nin hours marked by invisible hands.\nWheels spin in the air,\nthe hum surrounds,\ncarrying a rhythm only steel can hear.");
    } else if (isWithinZone(mouseX, mouseY, 640, 5, 955, 325)) { // Plume
        addMessage("clocks replace the pulse of the shore,\neyes shifting toward rising smoke,\ntoward fires held behind doors, where light bends\nagainst walls built of stone and air grows heavy.\nFeet forget the softness beneath them—\nnow the sky is laced with shadows,\nand the wind carries only whispers\nthrough spaces drawn by hands dreaming of steel.");
    }

    // Check if all interactions are complete
    if (interactions >= totalInteractions) {
        endGame();
    }
}

function addMessage(message) {
    if (!revealedMessages.includes(message)) {
        revealedMessages.push(message);
        interactions++;
        stanzasRead++;
    }
}

function endGame() {
    // Add a custom message to the DOM
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
        let endMessage = document.createElement("div");
        endMessage.innerHTML = "<h2>Interaction complete. Enjoy your poem!</h2>";
        endMessage.className = "end-message"; // Added class for consistency with CSS styling
        messageContainer.appendChild(endMessage);

        // Add a reset button
        let resetButton = document.createElement("button");
        resetButton.textContent = "Reset";
        resetButton.className = "reset-button"; // Added class for consistency with CSS styling
        resetButton.onclick = resetGame;
        endMessage.appendChild(resetButton);
    }
}

function resetGame() {
    stanzasRead = 0;
    interactions = 0;
    revealedMessages = [];
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
        // Clear all messages except the title and opening line
        messageContainer.innerHTML = messageContainer.querySelector("h1").outerHTML + messageContainer.querySelector("p").outerHTML;
    }
    loop(); // Restart the p5.js draw loop if it was stopped
}

// Assign p5.js functions to window object
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;

// Track if the user has navigated to prevent alert on page navigation
window.addEventListener("beforeunload", () => {
    window.hasNavigated = true;
});

console.log('Script loaded successfully');
