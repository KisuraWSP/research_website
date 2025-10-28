// year
document.getElementById('y').textContent = new Date().getFullYear();

// smooth anchor scroll + active link
const links = document.querySelectorAll('.navLinks a');
const nav = document.querySelector('.nav');
// Get the actual height of the sticky nav, or fallback to 70px
const navHeight = nav ? nav.offsetHeight : 70;

// --- 1. FIXED: CLICK-TO-SCROLL HANDLER ---
// This new handler offsets the scroll position to account for the sticky nav
links.forEach(a => {
    a.addEventListener('click', e => {
        const href = a.getAttribute('href') || '';
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                // Get position of the target element relative to the viewport
                const elementPosition = targetElement.getBoundingClientRect().top;
                
                // Calculate final offset position, accounting for current page scroll and nav height
                // We add a 10px buffer for spacing
                const offsetPosition = elementPosition + window.pageYOffset - navHeight - 10;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                history.replaceState(null, '', href);
            }
        }
    });
});

// --- 2. FIXED: SCROLL-SPY (INTERSECTION OBSERVER) ---
// This now uses rootMargin to create a "trigger line" just below the sticky nav
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.id;
        const link = document.querySelector(`.navLinks a[href="#${id}"]`);

        if (link) {
            if (entry.isIntersecting) {
                // When a section enters our "active zone",
                // remove 'active' from all links and add it *only* to this one.
                links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
            // No 'else' is needed. The 'active' class is only
            // ever moved to the *new* intersecting section.
        }
    });
}, {
    // Define the "active" area
    // The top margin is negative nav-height + 10px buffer.
    // This creates a "trigger line" 10px below your sticky nav.
    // The bottom margin (-40%) means a section stops being "active"
    // when its top is 60% of the way down the screen.
    rootMargin: `-${navHeight + 10}px 0px -40% 0px`,
    
    // Trigger as soon as a single pixel enters this new "active zone"
    threshold: 0
});

// Observe all the sections (this list was correct)
['about', 'scope', 'gap', 'method', 'docs', 'team'].forEach(id => {
    const el = document.getElementById(id);
    el && observer.observe(el);
});