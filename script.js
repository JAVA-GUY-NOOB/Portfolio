document.addEventListener('DOMContentLoaded', () => {
    const goodbyeButton = document.getElementById('goodbye-button');
    goodbyeButton.addEventListener('click', () => {
        document.body.innerHTML = '<div class="goodbye-message">Goodbye! Hope to see you again!</div>';
        document.body.style.background = '#ffccbc'; /* Light orange background */
    });
});
