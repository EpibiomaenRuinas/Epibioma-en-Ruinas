const imageList = [
  'imagenes/montaje/7.3Ecosistemas.png','imagenes/montaje/7.2Ecosistemas.png','imagenes/montaje/7.1Ecosistemas.png',
  'imagenes/montaje/6.3TodoLoQueTocas.png','imagenes/montaje/6.2TodoLoQueTocas.png','imagenes/montaje/6.1TodoLoQueTocas.png',
  'imagenes/montaje/5.3Abismo.png','imagenes/montaje/5.2Abismo.png','imagenes/montaje/5.1Abismo.png',
  'imagenes/montaje/4.3iaAmbiental.png','imagenes/montaje/4.2iaAmbiental.png','imagenes/montaje/4.1iaAmbiental.png',
  'imagenes/montaje/3.3Arena.png','imagenes/montaje/3.2Arena.png','imagenes/montaje/3.1Arena.png',
  'imagenes/montaje/2.3EspecieFallida.png','imagenes/montaje/2.2EspecieFallida.png','imagenes/montaje/2.1EspecieFallida.png',
  'imagenes/montaje/1.3Robot_z.png','imagenes/montaje/1.2Robot_z.png','imagenes/montaje/1.1Robot_z.png'
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

    imageList.slice(start, end).forEach(src => {
      const card = document.createElement('div');
      card.classList.add('card');

      // Guardamos la url de la imagen en data-bg para cargarla luego
      card.setAttribute('data-bg', src);

      // Onclick abrir modal con la imagen real
      card.onclick = () => openModal(src);

      page.appendChild(card);
    });

    carousel.appendChild(page);

    // Crear puntos para navegación
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.onclick = () => goToPage(i);
    dots.appendChild(dot);
  }
}

function updateCarousel() {
  const carousel = document.getElementById('carousel');
  carousel.style.transform = `translateX(-${currentPage * 100}%)`;

  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentPage);
  });

  // Forzar carga de imágenes de la página activa (y opcionalmente las vecinas)
  lazyLoadPage(currentPage);
  // Opcional: lazyLoadPage(currentPage + 1);
  // Opcional: lazyLoadPage(currentPage - 1);
}

// Carga las imágenes de fondo de la página indicada
function lazyLoadPage(pageIndex) {
  const pages = document.querySelectorAll('.gallery-page');
  if (pageIndex < 0 || pageIndex >= pages.length) return;

  const page = pages[pageIndex];
  const cards = page.querySelectorAll('.card');

  cards.forEach(card => {
    if (!card.style.backgroundImage) {
      const bg = card.getAttribute('data-bg');
      if (bg) {
        card.style.backgroundImage = `url(${bg})`;
        card.style.backgroundSize = 'cover';
        card.style.backgroundPosition = 'center';
      }
    }
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

window.onload = () => {
  createGalleryPages();
  updateCarousel();

  // Opcional: usar IntersectionObserver para cargar imágenes si el usuario
  // hace scroll y un `.gallery-page` entra en vista (solo si tienes scroll vertical)
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const page = entry.target;
          const pageIndex = Array.from(document.querySelectorAll('.gallery-page')).indexOf(page);
          lazyLoadPage(pageIndex);
          observer.unobserve(page);
        }
      });
    }, { rootMargin: "100px" });

    document.querySelectorAll('.gallery-page').forEach(page => observer.observe(page));
  }
};
