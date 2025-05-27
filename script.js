document.addEventListener("DOMContentLoaded", () => {
  // Get the checkbox toggler for the main menu
  const toggler = document.getElementById("toggler");
  const navbar = document.querySelector(".navbar");

  // Get all dropdown menu items
  const dropdowns = document.querySelectorAll(".navbar .dropdown");

  // Toggle main navigation menu on toggler click
  toggler.addEventListener("change", () => {
    if (toggler.checked) {
      // When opening the main menu, close any open submenus
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("active");
      });
    }
  });

  // Handle dropdown submenu toggling for mobile
  dropdowns.forEach((dropdown) => {
    const dropdownLink = dropdown.querySelector("a"); // The main link of the dropdown

    dropdownLink.addEventListener("click", (e) => {
      // Prevent default link behavior if it's a dropdown parent
      // This allows the link to only toggle the submenu, not navigate
      if (dropdown.classList.contains("dropdown")) {
        e.preventDefault();
      }

      // Toggle the 'active' class on the clicked dropdown
      dropdown.classList.toggle("active");

      // Close other open submenus (optional, but cleaner UX)
      dropdowns.forEach((otherDropdown) => {
        if (otherDropdown !== dropdown) {
          otherDropdown.classList.remove("active");
        }
      });
    });
  });

  // Optional: Close main menu when a navigation link is clicked
  navbar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      // Check if the link is not part of a dropdown (or if you want to close even for dropdowns)
      // You might want to refine this if you want dropdowns to stay open after clicking a submenu item
      if (!link.closest(".dropdown")) {
        // Only close if it's a top-level nav link
        toggler.checked = false; // Uncheck the toggler to hide the menu
      }
    });
  });

  // You had an `abrirCarrito()` function in your HTML. Define it here if needed.
  // Example placeholder:
  const cartIcon = document.getElementById("cart-icon");
  if (cartIcon) {
    cartIcon.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default link behavior
      alert("Opening shopping cart!");
      // Add your actual shopping cart logic here
    });
  }
});






document.addEventListener('DOMContentLoaded', () => {
    // --- Brands Carousel Functionality ---
    const carouselSlide = document.getElementById('carouselSlide');
    const carouselDotsContainer = document.getElementById('carouselDots');
    const carouselItems = document.querySelectorAll('.carousel-slide .carousel-item');

    // Get the total number of unique items (assuming you duplicated them for infinite scroll)
    const uniqueItemsCount = carouselItems.length / 2; // Assuming you have exactly two sets of items

    let currentIndex = 0;
    let itemsPerView = 5; // Default for large screens
    let autoSlideInterval;

    // Function to update itemsPerView based on screen width
    const updateItemsPerView = () => {
        if (window.innerWidth <= 480) {
            itemsPerView = 1;
        } else if (window.innerWidth <= 768) {
            itemsPerView = 2;
        } else if (window.innerWidth <= 991) {
            itemsPerView = 3;
        } else if (window.innerWidth <= 1200) {
            itemsPerView = 4;
        } else {
            itemsPerView = 5;
        }
        updateCarouselPosition(); // Recalculate position after itemsPerView changes
    };

    // Function to generate/update carousel dots
    const generateDots = () => {
        carouselDotsContainer.innerHTML = ''; // Clear existing dots
        for (let i = 0; i < uniqueItemsCount; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === currentIndex % uniqueItemsCount) { // Use modulo for active dot
                dot.classList.add('active');
            }
            dot.dataset.index = i; // Store index for navigation
            dot.addEventListener('click', () => {
                clearInterval(autoSlideInterval); // Stop auto-slide on manual navigation
                currentIndex = i; // Move to the clicked dot's index
                updateCarouselPosition();
                startAutoSlide(); // Restart auto-slide
            });
            carouselDotsContainer.appendChild(dot);
        }
    };

    // Function to update carousel position
    const updateCarouselPosition = () => {
        const itemWidth = carouselItems[0].offsetWidth;
        const translateXValue = -currentIndex * itemWidth;
        carouselSlide.style.transform = `translateX(${translateXValue}px)`;

        // Update active dot
        const dots = document.querySelectorAll('.carousel-dots .dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex % uniqueItemsCount) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    // Function for automatic sliding
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(() => {
            currentIndex++;
            if (currentIndex >= uniqueItemsCount) {
                // If we've reached the end of the unique items,
                // smoothly transition to the start of the duplicated set
                // then instantly reset position to the first item (visual loop)
                const itemWidth = carouselItems[0].offsetWidth;
                const transitionToFirstDuplicate = -uniqueItemsCount * itemWidth;

                carouselSlide.style.transition = 'transform 0.5s ease-in-out';
                carouselSlide.style.transform = `translateX(${transitionToFirstDuplicate}px)`;

                // After the transition, instantly reset to the beginning of the first set
                setTimeout(() => {
                    carouselSlide.style.transition = 'none'; // Disable transition for instant reset
                    currentIndex = 0;
                    carouselSlide.style.transform = `translateX(0px)`;
                    updateCarouselPosition(); // Update dot and position
                    // Re-enable transition for next slide
                    setTimeout(() => { carouselSlide.style.transition = 'transform 0.5s ease-in-out'; }, 50);
                }, 500); // Wait for the transition to complete
            } else {
                updateCarouselPosition();
            }
        }, 3000); // Slide every 3 seconds
    };

    // Initialize carousel on page load
    const initializeCarousel = () => {
        updateItemsPerView(); // Determine initial items per view
        generateDots(); // Generate dots based on unique items count
        updateCarouselPosition(); // Set initial position
        startAutoSlide(); // Start auto-sliding
    };

    // Handle window resize to re-calculate items per view and reposition
    window.addEventListener('resize', () => {
        clearInterval(autoSlideInterval); // Stop auto-slide during resize
        updateItemsPerView();
        generateDots(); // Re-generate dots if needed (e.g., if item count changes)
        updateCarouselPosition();
        startAutoSlide(); // Restart auto-slide after resize
    });

    initializeCarousel(); // Call initialization function
});
