// Lista de imágenes (reemplaza con tus imágenes reales)
const imageList = [
  'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg',
  'img5.jpg', 'img6.jpg', 'img7.jpg', 'img8.jpg',
  'img9.jpg', 'img10.jpg', 'img11.jpg', 'img12.jpg',
  'img13.jpg', 'img14.jpg', 'img15.jpg', 'img16.jpg',
  'img17.jpg', 'img18.jpg', 'img19.jpg', 'img20.jpg', 'img21.jpg', 'img22.jpg', 'img23.jpg', 'img24.jpg', 'img25.jpg'
];

const IMAGES_PER_PAGE = 12;
let currentPage = 0;

function createGalleryPages() {
  const carousel = document.getElementById('carousel');
  const dots = document.getElementById('dots');
  const totalPages = Math.ceil(imageList.length / IMAGES_PER_PAGE);

  for (let i = 0; i < totalPages; i++) {
    const page = document.createElement('div');
    page.classList.add('gallery-page');

    const start = i * IMAGES_PER_PAGE;
    const end = start + IMAGES_PER_PAGE;

    imageList.slice(start, end).forEach((src, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('onclick', `openModal('${src}')`);

      // Puedes poner aquí <img> en lugar de fondo si quieres
      card.style.backgroundImage = `url(${src})`;
      card.style.backgroundSize = 'cover';
      card.style.backgroundPosition = 'center';

      page.appendChild(card);
    });

    carousel.appendChild(page);

    // Crear dot
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('onclick', `goToPage(${i})`);
    dots.appendChild(dot);
  }
}

function updateCarousel() {
  const carousel = document.getElementById('carousel');
  carousel.style.transform = `translateX(-${currentPage * 100}%)`;

  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentPage);
  });
}

function nextPage() {
  const totalPages = Math.ceil(imageList.length / IMAGES_PER_PAGE);
  if (currentPage < totalPages - 1) {
    currentPage++;
    updateCarousel();
  }
}

function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    updateCarousel();
  }
}

function goToPage(index) {
  currentPage = index;
  updateCarousel();
}

function openModal(imgSrc) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  modal.style.display = "block";
  modalImg.src = imgSrc;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Inicializa galería al cargar
window.onload = createGalleryPages;
