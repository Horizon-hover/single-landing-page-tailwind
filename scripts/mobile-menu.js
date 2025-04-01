document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuButton && mobileMenu) {
      menuButton.addEventListener('click', function() {
        // Toggle menu visibility
        mobileMenu.classList.toggle('open');
        mobileMenu.classList.toggle('hidden');
        
        // Toggle button state
        this.classList.toggle('active');
        
        // Update aria-expanded for accessibility
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
      });
      
      // Close menu when clicking on links
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
          mobileMenu.classList.remove('open');
          mobileMenu.classList.add('hidden');
          menuButton.classList.remove('active');
          menuButton.setAttribute('aria-expanded', 'false');
        });
      });
    }
  });