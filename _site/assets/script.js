const resetBubbles = () => {
    const bubbles = document.querySelectorAll('.testimonials-bubbles__entry');
    bubbles.forEach(entry => {
        entry.classList.remove('testimonials-bubbles__entry--active');
    })
}

const createBubble = (width, array, index) => {
    let bubble = document.createElement('div');
    bubble.classList.add('testimonials-bubbles__entry');

    if (index === 0) {
        bubble.classList.add('testimonials-bubbles__entry--active');
    }

    bubble.addEventListener('click', () => {
        resetBubbles();
        array.style.transform = `translateX(-${width*index}px)`;
        bubble.classList.add('testimonials-bubbles__entry--active');
    })
    return bubble;
}

const testimonialArrows = (width) => {
    const arrowRight = document.querySelector('.testimonial-nav--right');
    const arrowLeft = document.querySelector('.testimonial-nav--left');
    const testimonialArray = document.querySelector('.testimonial-array');

    arrowRight.addEventListener('click', () => {
        let currentPosition = parseInt(testimonialArray.style.transform.match(/\d+/g), 10);
        testimonialArray.style.transform = `translateX(-${currentPosition += width}px)`;
    });
    arrowLeft.addEventListener('click', () => {
        let currentPosition = parseInt(testimonialArray.style.transform.match(/\d+/g), 10);
        testimonialArray.style.transform = `translateX(-${currentPosition -= width}px)`;
    });
}

const testimonialsFunction = function() {
    const bubblesContainer = document.querySelector('.testimonials-bubbles');
    const testimonials = document.querySelectorAll('.testimonial-entry');
    const testimonialArray = document.querySelector('.testimonial-array');

    testimonials.forEach((entry, index) => {
        bubblesContainer.appendChild(createBubble(testimonials[0].clientWidth, testimonialArray, index));
    });

    testimonialArrows(testimonials[0].clientWidth);
}();

