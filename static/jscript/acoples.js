// Smooth scroll functionality for the scroll-down button
document.addEventListener('DOMContentLoaded', function() {
    const scrollDownButton = document.querySelector('.scroll-down');
    const mainContent = document.querySelector('.main-content');

    if (scrollDownButton && mainContent) {
        scrollDownButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            try {
                // Get header height or use a default value
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 100;
                
                // Get the position of the main content
                const mainContentPosition = mainContent.getBoundingClientRect().top + window.pageYOffset;
                const scrollPosition = mainContentPosition - headerHeight - 20; // 20px extra space
                
                // Smooth scroll to the main content
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
                
                // Add focus to the main content for better accessibility
                mainContent.setAttribute('tabindex', '-1');
                mainContent.focus();
            } catch (error) {
                console.error('Error during smooth scrolling:', error);
                // Fallback to instant scroll if smooth scrolling fails
                window.scrollTo(0, mainContent.offsetTop);
            }
        });
        
        // Add cursor pointer to indicate it's clickable
        scrollDownButton.style.cursor = 'pointer';
    }
});
