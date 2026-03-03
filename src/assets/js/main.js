// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      const isOpen = mainNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
        mainNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Close menu when clicking a link
    mainNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mainNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
  
  // Newsletter Form Handler - sends as JSON instead of form-encoded
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const emailInput = newsletterForm.querySelector('input[name="email"]');
      const listInput = newsletterForm.querySelector('input[name="list"]');
      const submitButton = newsletterForm.querySelector('button[type="submit"]');
      
      const email = emailInput.value;
      const list = listInput ? listInput.value : 'irene-daniels';
      
      // Disable button and show loading state
      const originalButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Subscribing...';
      
      try {
        const response = await fetch('https://email-bot-server.micaiah-tasks.workers.dev/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            list: list
          })
        });
        
        const result = await response.json();
        
        if (response.ok) {
          // Success! Show confirmation
          newsletterForm.innerHTML = `
            <div style="text-align: center; padding: 1rem;">
              <p style="color: #5D6E5A; font-weight: 500;">✓ You're in! Check your inbox for a confirmation.</p>
            </div>
          `;
        } else {
          throw new Error(result.error || 'Subscription failed');
        }
      } catch (error) {
        console.error('Newsletter subscription error:', error);
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        
        // Show error message
        let errorDiv = newsletterForm.querySelector('.form-error');
        if (!errorDiv) {
          errorDiv = document.createElement('div');
          errorDiv.classList.add('form-error');
          errorDiv.style.cssText = 'color: #C27878; margin-top: 0.5rem; font-size: 0.875rem;';
          newsletterForm.appendChild(errorDiv);
        }
        errorDiv.textContent = 'Oops! Something went wrong. Please try again.';
      }
    });
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
