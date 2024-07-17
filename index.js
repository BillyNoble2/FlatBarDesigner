    // Wait until the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', (event) => {
    // Get the button element
    const button = document.getElementById('submitLogIn');

    // Add an event listener to the button
    button.addEventListener('click', () => {
        // Change the location to the new HTML file
        window.location.href = 'Designer.html';
    });
});
