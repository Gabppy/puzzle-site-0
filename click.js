// Array of PNG file paths
const pngItems = [
    "images-new/star-puzzle-pieces-new-02.png",
    "images-new/star-puzzle-pieces-new-03.png",
    "images-new/star-puzzle-pieces-new-04.png",
    "images-new/star-puzzle-pieces-new-05.png",
    "images-new/star-puzzle-pieces-new-06.png",
    "images-new/star-puzzle-pieces-new-07.png",
    "images-new/star-puzzle-pieces-new-08.png",
    "images-new/star-puzzle-pieces-new-09.png",
    "images-new/star-puzzle-pieces-new-10.png",
    "images-new/star-puzzle-pieces-new-11.png",
    "images-new/star-puzzle-pieces-new-12.png",
    "images-new/star-puzzle-pieces-new-13.png",
    "images-new/star-puzzle-pieces-new-14.png",
    "images-new/star-puzzle-pieces-new-15.png",
];

let imageCount = 0;

// Shuffle array to randomize order
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Shuffle the PNG items
shuffleArray(pngItems);

// Add event listener to the button
document.getElementById('addImage').addEventListener('click', function () {
    if (imageCount < 14) {
        // Remove an item from the array
        const randomImage = pngItems.pop();

        // Create an image element
        const img = document.createElement('img');
        img.src = randomImage;
        img.alt = "Puzzle piece";

        // Set initial position randomly within the viewport
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        img.style.position = 'absolute'; // Absolute positioning
        img.style.left = Math.random() * (viewportWidth - 100) + "px"; // Random X position
        img.style.top = Math.random() * (viewportHeight - 100) + "px"; // Random Y position

        // Add the image to the body (not inside #image-container)
        document.body.appendChild(img);

        // Increment the image count
        imageCount++;

        // Variables to store mouse offset and whether dragging is active
        let isDragging = false;
        let offsetX, offsetY;

        // Handle the mousedown event to start dragging
        img.addEventListener('mousedown', function (e) {
            isDragging = true;

            // Get the offset between the mouse and the top-left corner of the image
            offsetX = e.clientX - img.getBoundingClientRect().left;
            offsetY = e.clientY - img.getBoundingClientRect().top;

            img.style.cursor = 'grabbing';
            e.preventDefault(); // Prevent text selection
        });

        // Handle the mousemove event to move the image
        document.addEventListener('mousemove', function (e) {
            if (isDragging) {
                let newX = e.clientX - offsetX;
                let newY = e.clientY - offsetY;

                // Prevent image from going out of bounds of the viewport
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;

                if (newX < 0) newX = 0; 
                if (newY < 0) newY = 0;
                if (newX + img.offsetWidth > viewportWidth) newX = viewportWidth - img.offsetWidth;
                if (newY + img.offsetHeight > viewportHeight) newY = viewportHeight - img.offsetHeight;

                img.style.left = `${newX}px`;
                img.style.top = `${newY}px`;
            }
        });

        // Handle the mouseup event to stop dragging
        document.addEventListener('mouseup', function () {
            if (isDragging) {
                isDragging = false;
                img.style.cursor = 'grab';
            }
        });
    } else {
        // When all images have been added, change the button text to "DONE"
        alert("No more images to add!");
        const button = document.getElementById('addImage');
        button.textContent = "DONE?";
        document.querySelector('h3').textContent = "That’s all there is for this set! Drag and finish this puzzle now!";


        // Add event listener for the "DONE" state
        button.removeEventListener('click', arguments.callee); // Remove the previous click event

        button.addEventListener('click', function () {
            // Change the colors on clicking the "DONE" button
            button.textContent = "POST";
            document.querySelector('h3').textContent = "you’ve done it! Yay! Post about it and see all other puzzle next page!";
            document.querySelector('h1').style.color = '#E8112D';
            document.querySelector('h3').style.color = '#E8112D';
            document.querySelector('button').style.color = '#E8112D';
            document.querySelector('p').style.color = '#E8112D';
            document.querySelector('button').style.webkitTextStroke = '2px white';
            // document.body.style.backgroundColor = '#491A20';
            document.querySelector('button').addEventListener('click', function() {
                window.location.href = "post-page.html";  
            });

        });
    }
});
