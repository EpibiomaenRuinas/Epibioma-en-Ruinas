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

      // Crear imagen con carga lazy nativa
      const img = document.createElement('img');
      img.src = src;
      img.alt = "Imagen galería";
      img.loading = "lazy";

      // Al hacer click, abrir modal con la imagen
      card.onclick = () => openModal(src);

      card.appendChild(img);
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
};
