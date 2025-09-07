document.addEventListener('DOMContentLoaded', function() {
  // Tab functionality
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  // Handle tab clicks
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      
      // Remove active class from all buttons and panes
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));
      
      // Add active class to clicked button and corresponding pane
      button.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // Initialize product galleries for each tab pane
  function initProductGallery(container) {
    const mainImage = container.querySelector('.main-image img');
    const thumbnails = container.querySelectorAll('.product-thumbnails img');
    
    if (thumbnails.length > 0) {
      // Set first thumbnail as active by default
      thumbnails[0].classList.add('active');
      
      // Handle thumbnail clicks
      thumbnails.forEach(thumb => {
        thumb.addEventListener('click', (e) => {
          e.preventDefault();
          // Update main image
          mainImage.src = thumb.src;
          
          // Update active state
          thumbnails.forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
        });
      });
    }
  }
  
  // Initialize all product galleries
  document.querySelectorAll('.tab-pane').forEach(pane => {
    initProductGallery(pane);
  });
});
