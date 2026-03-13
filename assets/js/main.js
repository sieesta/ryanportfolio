/*=============== TYPEWRITER EFFECT ===============*/
const typewriterText = "Ryan Cabalida";
const typewriterElement = document.getElementById('typewriter');
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    if (!isDeleting && charIndex < typewriterText.length) {
        // Typing
        typewriterElement.textContent += typewriterText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 150);
    } else if (!isDeleting && charIndex === typewriterText.length) {
        // Pause at end before deleting
        isDeleting = true;
        setTimeout(typeWriter, 2000);
    } else if (isDeleting && charIndex > 0) {
        // Deleting
        typewriterElement.textContent = typewriterText.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeWriter, 100);
    } else if (isDeleting && charIndex === 0) {
        // Pause at start before typing again
        isDeleting = false;
        setTimeout(typeWriter, 500);
    }
}

// Start typewriter effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD BLUR TO HEADER ===============*/
const blurHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the blur-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('blur-header') 
                       : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message')

const sendEmail = (e) =>{
    e.preventDefault()

    // serviceID - templateID - #form - publicKey
    emailjs.sendForm('service_YOUR_SERVICE_ID', 'template_YOUR_TEMPLATE_ID', '#contact-form', 'YOUR_PUBLIC_KEY')
    .then(() =>{
        // Show sent message
        contactMessage.textContent = 'Message sent successfully ✅'

        // Remove message after five seconds
        setTimeout(() =>{
            contactMessage.textContent = ''
        }, 5000)

        // Clear input fields
        contactForm.reset()
    }, () =>{
        // Show error message
        contactMessage.textContent = 'Message not sent (service error) ❌'
    })
}

contactForm.addEventListener('submit', sendEmail)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
    const scrollDown = window.scrollY

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== PORTFOLIO GALLERY ===============*/
const portfolioCards = document.querySelectorAll('.project-gallery')
const portfolioLightbox = document.getElementById('portfolio-lightbox')
const portfolioLightboxImg = document.getElementById('portfolio-lightbox-img')
const portfolioLightboxClose = document.getElementById('portfolio-lightbox-close')
const portfolioLightboxNext = document.getElementById('portfolio-lightbox-next')

let lightboxImages = []
let lightboxTitles = []
let lightboxIndex = 0

const renderPortfolioLightbox = () => {
    if (!portfolioLightboxImg || !lightboxImages.length) return

    const imageSrc = lightboxImages[lightboxIndex]
    const imageTitle = lightboxTitles[lightboxIndex] || lightboxTitles[0] || 'Portfolio preview'

    portfolioLightboxImg.src = imageSrc
    portfolioLightboxImg.alt = imageTitle
}

const openPortfolioLightbox = (images, startIndex, titles = []) => {
    if (!portfolioLightbox || !portfolioLightboxImg) return

    lightboxImages = images
    lightboxTitles = titles
    lightboxIndex = startIndex || 0

    renderPortfolioLightbox()

    if (portfolioLightboxNext) {
        portfolioLightboxNext.style.display = lightboxImages.length > 1 ? 'grid' : 'none'
    }

    portfolioLightbox.classList.add('show-lightbox')
    portfolioLightbox.setAttribute('aria-hidden', 'false')
    document.body.classList.add('body-lock')
}

const closePortfolioLightbox = () => {
    if (!portfolioLightbox || !portfolioLightboxImg) return

    portfolioLightbox.classList.remove('show-lightbox')
    portfolioLightbox.setAttribute('aria-hidden', 'true')
    portfolioLightboxImg.src = ''
    lightboxImages = []
    lightboxTitles = []
    lightboxIndex = 0
    document.body.classList.remove('body-lock')
}

portfolioCards.forEach(card => {
    const images = (card.dataset.images || '')
        .split('|')
        .map(image => image.trim())
        .filter(Boolean)

    const titles = (card.dataset.titles || '')
        .split('|')
        .map(title => title.trim())

    let currentIndex = 0

    const cardImage = card.querySelector('.projects__img')
    const cardTitle = card.querySelector('.projects__title')
    const imageButton = card.querySelector('.projects__image-button')
    const nextButton = card.querySelector('.projects__next')
    const counter = card.querySelector('.projects__counter')

    const updateGalleryCard = () => {
        const currentImage = images[currentIndex] || images[0]
        const currentTitle = titles[currentIndex] || titles[0] || cardTitle.textContent

        if (cardImage && currentImage) {
            cardImage.src = currentImage
            cardImage.alt = currentTitle
        }

        if (cardTitle && currentTitle) {
            cardTitle.textContent = currentTitle
        }

        if (counter) {
            counter.textContent = `${currentIndex + 1} / ${images.length}`
        }
    }

    if (images.length) {
        updateGalleryCard()
    }

    if (images.length <= 1) {
        if (nextButton) nextButton.style.display = 'none'
        if (counter) counter.style.display = 'none'
    } else if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length
            updateGalleryCard()
        })
    }

    if (imageButton && cardImage) {
        imageButton.addEventListener('click', () => {
            openPortfolioLightbox(images, currentIndex, titles)
        })
    }
})

if (portfolioLightbox && portfolioLightboxClose) {
    portfolioLightboxClose.addEventListener('click', closePortfolioLightbox)

    portfolioLightbox.addEventListener('click', (event) => {
        if (event.target === portfolioLightbox) {
            closePortfolioLightbox()
        }
    })
}

if (portfolioLightboxNext) {
    portfolioLightboxNext.addEventListener('click', () => {
        if (lightboxImages.length <= 1) return

        lightboxIndex = (lightboxIndex + 1) % lightboxImages.length
        renderPortfolioLightbox()
    })
}

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && portfolioLightbox && portfolioLightbox.classList.contains('show-lightbox')) {
        closePortfolioLightbox()
    }
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true // Animations repeat
})

sr.reveal(`.home__perfil, .about__image, .contact__mail`, {origin: 'right'})
sr.reveal(`.home__greeting, .home__name, .home__info, .about__container .section__title-1, .about__info, .contact__social, .contact__data`, {origin: 'left'})
sr.reveal(`.services__card, .projects__card`, {interval: 100})
