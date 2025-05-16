const btnDetailKasir = document.getElementById('detail-kasir')
const modalBoxKasir = document.getElementById("modalBoxKasir");
const closeModalBoxKasir = document.getElementById('btn-close-modal-kasir')
const btnDetailKopi = document.getElementById('detail-kopi')
const modalBoxKopi = document.getElementById("modalBoxKopi");
const closeModalBoxKopi = document.getElementById('btn-close-modal-kopi')
const track = document.getElementById('carouselTrack');
const totalItems = track.children.length; 

let visibleItems = window.innerWidth <= 499 ? 1 : 3;
const maxIndex = totalItems - visibleItems;
let currentIndex = 0;

function moveCarousel(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    const itemWidth = track.clientWidth / visibleItems;
    track.style.transform = `translateX(-${itemWidth * currentIndex}px)`;
}

// Jika kamu ingin mendeteksi perubahan ukuran layar secara langsung:
window.addEventListener('resize', () => {
    visibleItems = window.innerWidth <= 499 ? 1 : 3;
});

function moveCarouselModalBox(direction) {
    const track = document.getElementById("carouselTrackModalBox");
    const items = document.querySelectorAll(".carousel-item-modal-box");
    const totalItems = items.length;

    currentIndex += direction;

    if (currentIndex < 0) currentIndex = totalItems - 1;
    else if (currentIndex >= totalItems) currentIndex = 0;

    const offset = -currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;
}

btnDetailKasir.addEventListener("click", function() {
    modalBoxKasir.classList.add("active");
    document.body.classList.add("overflow");
})

closeModalBoxKasir.addEventListener("click", function(e) {
    e.preventDefault();
    modalBoxKasir.classList.remove("active");
    document.body.classList.remove("overflow");
})


function moveCarouselModalBoxKopi(direction) {
    const track = document.getElementById("carouselTrackModalBoxKopi");
    const items = document.querySelectorAll(".carousel-item-modal-box-kopi");
    const totalItems = items.length;

    currentIndex += direction;

    if (currentIndex < 0) currentIndex = totalItems - 1;
    else if (currentIndex >= totalItems) currentIndex = 0;

    const offset = -currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;
} 
btnDetailKopi.addEventListener("click", function() {
    modalBoxKopi.classList.add("active");
    document.body.classList.add("overflow");
})

closeModalBoxKopi.addEventListener("click", function(e) {
    e.preventDefault();
    modalBoxKopi.classList.remove("active");
    document.body.classList.remove("overflow");
})

// animasi dalam dom
document.addEventListener("DOMContentLoaded", function () {
  const head = document.querySelector(".head");
  const img = document.querySelector('.img');
  const headChildren = document.querySelectorAll('.head .profile > *');
  const imgProfile = document.querySelector('.img-profile');
  const sekolah = document.querySelector(".sekolah");
  const pengalaman = document.querySelector(".pengalaman");
  const carousel = document.querySelector('.carousel');
  const allSkillBtn = document.querySelector('.btn-all-skill');
  const track = document.querySelector('#carouselTrack');

  if (head) head.classList.add("animated-border");
  if (imgProfile) imgProfile.classList.add("animated");
  if (sekolah) sekolah.classList.add("animated-border");
  if (pengalaman) pengalaman.classList.add("animated-border");

  const observerOptions = { threshold: 0.05 };

  const animateOnIntersect = (entries, observer) => {
    entries.forEach(entry => {
      const target = entry.target;

      if (entry.isIntersecting) {
        if (target.classList.contains('img')) {
          target.classList.add('animate-left');
        }

        if (target.classList.contains('head')) {
          target.classList.add('animate-top');
          headChildren.forEach((child, index) => {
            child.style.animationDelay = `${0.3 + index * 0.2}s`;
            child.classList.add('animate-right');
          });
        }
      } else {
        if (target.classList.contains('img')) {
          target.classList.remove('animate-left');
        }

        if (target.classList.contains('head')) {
          target.classList.remove('animate-top');
          headChildren.forEach(child => {
            child.classList.remove('animate-right');
            child.style.animationDelay = '0s';
          });
        }
      }
    });
  };

  const observer = new IntersectionObserver(animateOnIntersect, observerOptions);
  if (img) observer.observe(img);
  if (head) observer.observe(head);

  const observerSekolahPengalaman = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate", "show");
        carousel.classList.add("animate-scale");
        carousel.classList.add("animate-rotate");
      } else {
        entry.target.classList.remove("animate", "show");
        entry.target.classList.remove("animate-scale");
        entry.target.classList.remove("animate-rotate");
      }
    });
  }, observerOptions);

  if (sekolah) observerSekolahPengalaman.observe(sekolah);
  if (pengalaman) observerSekolahPengalaman.observe(pengalaman);
  if (carousel) observerSekolahPengalaman.observe(carousel);

  allSkillBtn.addEventListener('click', function () {
    track.classList.add('transitioning');

    setTimeout(() => {
      const isGridView = carousel.classList.contains('grid-view');

      carousel.classList.toggle('grid-view');

      carousel.classList.remove('animate-top');
      void carousel.offsetWidth; 
      carousel.classList.add('animate-top');

      if (!isGridView) {
        allSkillBtn.textContent = "KEMBALI KE SLIDE";
      } else {
        allSkillBtn.textContent = "ALL SKILL & CERTIFICATE";
      }

      setTimeout(() => {
        track.classList.remove('transitioning');
      }, 50);
    }, 200);
  });
});


document.querySelectorAll('.carousel-caption').forEach(button => {
  button.addEventListener('click', function () {
    const img = this.previousElementSibling;
    if (img && img.tagName === 'IMG') {
      showImageModal(img.src, img.alt);
    }
    document.body.classList.add("overflow");
  });
});

function showImageModal(src, alt = "") {
  const modal = document.createElement('div');
  modal.className = 'image-modal';
  modal.innerHTML = `
    <img src="${src}" alt="${alt}">
  `;

  modal.addEventListener('click', function () {
    modal.remove();
    document.body.classList.remove("overflow");
  });

  document.body.appendChild(modal);
}

const skilsHead = document.querySelector('.skils-head');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skilsHead.style.animation = 'none';
      skilsHead.offsetHeight;
      skilsHead.style.animation = '';
    }
  });
}, { threshold: 0.5 });

observer.observe(skilsHead);

document.querySelectorAll('.carousel-item').forEach((item, index) => {
  item.style.setProperty('--i', index);
});

