// Navbar Scroll Effect
const header = document.getElementById('navbar');
window.addEventListener('scroll', () => {
   if (window.scrollY > 50) {
      header.classList.add('scrolled');
   } else {
      header.classList.remove('scrolled');
   }
});

// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
menuBtn.addEventListener('click', () => {
   navMenu.classList.toggle('show');
});

// Close menu on link click
navMenu.querySelectorAll('a').forEach(link => {
   link.addEventListener('click', () => navMenu.classList.remove('show'));
});

// Timeline Animation (Intersection Observer)
const arcItems = document.querySelectorAll('.arc-item');
const arcObserver = new IntersectionObserver((entries) => {
   entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
         setTimeout(() => {
            entry.target.classList.add('visible');
         }, index * 150);
      }
   });
}, { threshold: 0.1 });

arcItems.forEach(item => arcObserver.observe(item));

// Quotes Carousel
const quotes = [
   { text: "If miracles only happen once, what are they called the second time?", author: "Ichigo Kurosaki" },
   { text: "Since when were you under the impression that I wasn't using Kyōka Suigetsu?", author: "Sōsuke Aizen" },
   { text: "Those who do not know what love is, liken it to beauty. Those who claim to know what love is, liken it to ugliness.", author: "Gin Ichimaru" },
   { text: "The arrogance of the strong is the most fragile thing.", author: "Byakuya Kuchiki" },
   { text: "What is a heart? If I tear open your chest, will I see it?", author: "Ulquiorra Cifer" },
   { text: "Conflict is everything. Without conflict, there is only the abyss.", author: "Yhwach" }
];

const container = document.getElementById('quoteContainer');
const nav = document.getElementById('quoteNav');
let currentQuote = 0;
let quoteInterval;

// Initialize Quotes
function initQuotes() {
   quotes.forEach((q, index) => {
      // Create slide
      const slide = document.createElement('div');
      slide.className = `quote-slide ${index === 0 ? 'active' : ''}`;
      slide.innerHTML = `
         <div class="quote-text">${q.text}</div>
         <div class="quote-author">${q.author}</div>
      `;
      container.appendChild(slide);

      // Create dot
      const dot = document.createElement('div');
      dot.className = `q-dot ${index === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToQuote(index));
      nav.appendChild(dot);
   });

   startAutoPlay();
}

function goToQuote(index) {
   const slides = document.querySelectorAll('.quote-slide');
   const dots = document.querySelectorAll('.q-dot');
   
   slides[currentQuote].classList.remove('active');
   dots[currentQuote].classList.remove('active');
   
   currentQuote = index;
   
   slides[currentQuote].classList.add('active');
   dots[currentQuote].classList.add('active');

   // Reset interval
   clearInterval(quoteInterval);
   startAutoPlay();
}

function startAutoPlay() {
   quoteInterval = setInterval(() => {
      let next = (currentQuote + 1) % quotes.length;
      goToQuote(next);
   }, 5000);
}

document.addEventListener('DOMContentLoaded', initQuotes);
