document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a');
    const page = document.getElementsByClassName("page");
  
    links.forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default jump behavior
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  });