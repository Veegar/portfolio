document.addEventListener("DOMContentLoaded", function() {
  const words = ["Web designer", "Web developer", "Mobile app Developer", "Front-end Developer"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 150;
  const erasingSpeed = 100;
  const newWordDelay = 1000;
  const typedTextSpans = document.querySelectorAll('.typed-text');

  function type() {
      const currentWord = words[wordIndex];
      let displayText;

      if (isDeleting) {
          displayText = currentWord.substring(0, charIndex--);
      } else {
          displayText = currentWord.substring(0, charIndex++);
      }

      typedTextSpans.forEach(span => {
          span.innerText = displayText;
      });

      if (!isDeleting && charIndex === currentWord.length) {
          setTimeout(() => isDeleting = true, newWordDelay);
      } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
      }

      setTimeout(type, isDeleting ? erasingSpeed : typingSpeed);
  }

  type();
});

document.addEventListener('DOMContentLoaded', () => {
  const skills = document.querySelectorAll('.skill');

  function triggerSkillAnimation() {
      skills.forEach(skill => {
          const percentage = skill.getAttribute('data-percentage');
          const outer = skill.querySelector('.outer');
          
          // Set initial background
          outer.style.background = `conic-gradient(#4caf50 0% 0%, #ddd 0% 100%)`;
          
          // Trigger reflow to ensure the transition will be applied
          outer.offsetWidth;

          // Update the background to the target percentage
          setTimeout(() => {
              outer.style.background = `conic-gradient(#4caf50 0% ${percentage}%, #ddd ${percentage}% 100%)`;
          }, 100);  // Delay to allow initial rendering
      });
  }

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              triggerSkillAnimation();
          }
      });
  }, {
      threshold: 0.1
  });

  const skillsSection = document.querySelector('.skills');
  observer.observe(skillsSection);
});

function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar .bar span');
  skillBars.forEach((bar) => {
    bar.style.width = '0';
    setTimeout(() => {
      const targetWidth = bar.getAttribute('data-width');
      bar.style.width = targetWidth;
    }, 100); // Slight delay to ensure animation is visible
  });
}

// Function to handle scroll and click events
function handleScroll() {
  const skillsSection = document.getElementById('skills');
  const skillsLink = document.querySelector('.navbar a[href="#skills"]');
  
  if (isInViewport(skillsSection)) {
    animateSkillBars();
    skillsLink.classList.add('active');
  } else {
    skillsLink.classList.remove('active');
  }
}

// Helper function to check if an element is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Event listener for scroll events
window.addEventListener('scroll', handleScroll);

// Event listener for click events on the Skills link
document.querySelector('.navbar a[href="#skills"]').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
  animateSkillBars(); // Trigger the animation on click
});

// Initial call to handleScroll to ensure active state on load
handleScroll();


