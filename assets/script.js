class Testimonials {
    testimonialWidth = document.querySelector('.testimonial-entry').clientWidth;
    testimonialArray = document.querySelector('.testimonial-array');
    currentIndex = 0;

    constructor(interval){
        this.interval = interval;
    }

    setWidth() {
        window.addEventListener('resize', () => {
            this.testimonialWidth = document.querySelector('.testimonial-entry').clientWidth;
            console.log(this.testimonialWidth);
        })
    }

    resetBubbles() {
        const bubbles = document.querySelectorAll('.testimonials-bubbles__entry');
        bubbles.forEach(entry => {
            entry.classList.remove('testimonials-bubbles__entry--active');
        })
    }

    moveSlider(index) {
        this.testimonialArray.style.transform = `translateX(-${this.testimonialWidth*index}px)`;
    }
    
    changeBubble(bubble) {
        this.resetBubbles();
        bubble.classList.add('testimonials-bubbles__entry--active');
    }

    createBubble (index){
        const bubble = document.createElement('div');
        bubble.classList.add('testimonials-bubbles__entry');
    
        if (index === this.currentIndex) {
            bubble.classList.add('testimonials-bubbles__entry--active');
        }
    
        bubble.addEventListener('click', () => {
            this.changeBubble(bubble);
            this.moveSlider(index);
            this.currentIndex = index;
        })
        return bubble;
    }

    generateBubbles() {
        const bubblesContainer = document.querySelector('.testimonials-bubbles');
        const testimonials = document.querySelectorAll('.testimonial-entry');
        testimonials.forEach((entry, index) => {
            bubblesContainer.appendChild(this.createBubble(index));
        });
        this.testimonialArray.style.gridTemplateColumns = `repeat(${testimonials.length+1}, 100%)`;
        console.log(this.testimonialArray.style);
    }

    arrowListeners() {
        const arrowRight = document.querySelector('.testimonial-nav--right');
        const arrowLeft = document.querySelector('.testimonial-nav--left');
        const bubbles = document.querySelectorAll('.testimonials-bubbles__entry');


        arrowRight.addEventListener('click', () => {
           this.advanceSlider();
        })

        arrowLeft.addEventListener('click', () => {
            if (this.currentIndex <= 0){
                return;
            }
            this.currentIndex--;
            this.moveSlider(this.currentIndex % bubbles.length);
            this.changeBubble(bubbles[this.currentIndex % bubbles.length]);
        })
    }

    advanceSlider() {
        const bubbles = document.querySelectorAll('.testimonials-bubbles__entry');
        this.currentIndex++;
        this.moveSlider(this.currentIndex % bubbles.length);
        this.changeBubble(bubbles[this.currentIndex % bubbles.length]);
    }

    autoPlay() {
        let testInterval;
        testInterval = setInterval(() => {
           this.advanceSlider();
        }, this.interval);

        this.testimonialArray.addEventListener('mouseenter', (e) => {
            clearInterval(testInterval);
        })
    }

    initialise() {
        this.generateBubbles();
        this.arrowListeners();
        this.autoPlay();
        this.setWidth();
    }
}

const instance = new Testimonials(3000);
instance.initialise();

    