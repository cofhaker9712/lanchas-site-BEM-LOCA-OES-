const boats = [
  { name: 'ALFA 300', type: 'Lancha Open', capacity: '16 passageiros', location: 'Maria Farinha', price: 'R$ 2.998,00', image: 'IMG_3649.jpeg', description: 'Uma lancha aberta para dias leves, com espaço para aproveitar o mar sem pressa.', features: ['Churrasqueira', 'Banheiro', 'Sistema de som'] },
  { name: 'AZIMUT 520 FLYBRIDGE', type: 'Iate Premium', capacity: '15 passageiros', location: 'Recife · Coroa do Avião · Carneiros · Serrambi', price: 'R$ 22.990,00', image: 'IMG_3650.jpeg', description: 'Amplitude e conforto para transformar um passeio especial em uma experiência extraordinária.', features: ['Espaço gourmet', 'Churrasqueira', 'Cozinha', 'Quarto', 'Sala', 'Som Bluetooth', 'Banheiro'] },
  { name: 'NX 370 HT CABINADA', type: 'Lancha Cabinada', capacity: '13 passageiros', location: 'Carneiros', price: 'R$ 14.990,00', image: 'IMG_3651.jpeg', description: 'Uma cabine confortável e o espaço certo para aproveitar Carneiros em boa companhia.', features: ['Ar-condicionado', 'Quarto', 'Banheiro', 'Som', 'Espaço gourmet', 'Churrasqueira'] },
  { name: 'ROYAL MARINER 400 HT', type: 'Lancha Cabinada', capacity: '14 passageiros', location: 'Carneiros', price: 'R$ 16.990,00', image: 'IMG_3652.jpeg', description: 'Elegância, conforto e tudo o que você precisa para passar o dia a bordo.', features: ['Quarto', 'Banheiro', 'Som', 'Churrasqueira', 'Ar-condicionado'] },
  { name: 'VCAT 900 AURORA', type: 'Catamarã de luxo', capacity: '22 passageiros', location: 'Praia dos Carneiros', price: 'R$ 7.990,00', image: 'IMG_3653.jpeg', description: 'Espaço de sobra para reunir quem você gosta e celebrar o litoral pernambucano.', features: ['Espaço gourmet', 'Churrasqueira a gás', 'Som Bluetooth', 'Banheiro'] },
  { name: 'CIGARETTE 360 CABINADA', type: 'Lancha Cabinada', capacity: '15 passageiros', location: 'Carneiros', price: 'R$ 5.990,00', image: 'IMG_3654.jpeg', description: 'Desempenho e conforto na medida para um dia inesquecível no mar.', features: ['Quarto', 'Banheiro', 'Churrasqueira na própria lancha', 'Som Bluetooth'] },
  { name: 'VISION 320 OPEN', type: 'Lancha Open', capacity: '15 passageiros', location: 'Praia dos Carneiros', price: 'R$ 4.990,00', image: 'IMG_3655.jpeg', description: 'A escolha certa para sentir o vento, o sol e a liberdade de um dia aberto.', features: ['Banheiro', 'Churrasqueira na própria lancha', 'Som Bluetooth'] },
  { name: 'JET SKI', type: 'Jet Ski · Sea-Doo GTI 170', capacity: 'Informação a confirmar', location: 'Maria Farinha · Carneiros', price: 'R$ 998,00 / hora', image: 'IMG_3657.jpeg', description: 'Mais velocidade e diversão para explorar a água em outro ritmo.', features: ['Combustível incluso'] }
];

const fleetGrid = document.querySelector('#fleet-grid');
const boatSelect = document.querySelector('#boat-select');
const whatsappNumber = '';

boats.forEach((boat) => {
  const card = document.createElement('article');
  card.className = 'boat-card reveal';
  card.innerHTML = `<div class="boat-photo"><img src="${boat.image}" alt="${boat.name}" loading="lazy"></div><div class="boat-info"><div><h3 class="boat-name">${boat.name}</h3><p class="boat-type">${boat.type}</p></div><div class="boat-price"><small>A partir de</small>${boat.price}</div><p class="boat-description">${boat.description}</p><div class="boat-meta"><span><b>Capacidade</b> ${boat.capacity}</span><span><b>Local</b> ${boat.location}</span></div><ul class="boat-features">${boat.features.map((feature) => `<li>${feature}</li>`).join('')}</ul><button class="boat-action" data-boat="${boat.name}">Solicitar reserva ↗</button></div>`;
  fleetGrid.appendChild(card);
  const option = document.createElement('option');
  option.value = boat.name;
  option.textContent = boat.name;
  boatSelect.appendChild(option);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const mobileMenu = document.querySelector('.mobile-menu');
const menuToggle = document.querySelector('.menu-toggle');
const closeMenu = () => { mobileMenu.classList.remove('open'); mobileMenu.setAttribute('aria-hidden', 'true'); menuToggle.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-open'); };
menuToggle.addEventListener('click', () => { mobileMenu.classList.add('open'); mobileMenu.setAttribute('aria-hidden', 'false'); menuToggle.setAttribute('aria-expanded', 'true'); document.body.classList.add('menu-open'); });
document.querySelector('.menu-close').addEventListener('click', closeMenu);
document.querySelectorAll('.mobile-menu a').forEach((link) => link.addEventListener('click', closeMenu));

document.addEventListener('click', (event) => {
  const button = event.target.closest('.boat-action');
  if (!button) return;
  boatSelect.value = button.dataset.boat;
  document.querySelector('#reserva').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('#booking-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = `Olá! Gostaria de consultar a disponibilidade para uma reserva.%0A%0ANome: ${data.get('nome')}%0AWhatsApp: ${data.get('whatsapp')}%0AData: ${data.get('data')}%0AEmbarcação: ${data.get('embarcacao')}%0AMensagem: ${data.get('mensagem') || 'Gostaria de receber mais informações.'}`;
  if (whatsappNumber) window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  else alert('O formulário está pronto. Adicione o número oficial do WhatsApp em script.js para abrir a conversa automaticamente.');
});

document.querySelectorAll('.gallery-item').forEach((item) => item.addEventListener('click', () => {
  const lightbox = document.querySelector('.lightbox');
  const image = lightbox.querySelector('img');
  image.src = item.dataset.image;
  image.alt = item.querySelector('img').alt;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
}));
const closeLightbox = () => { const lightbox = document.querySelector('.lightbox'); lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden', 'true'); };
document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.querySelector('.lightbox').addEventListener('click', (event) => { if (event.target.classList.contains('lightbox')) closeLightbox(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { closeLightbox(); closeMenu(); } });
