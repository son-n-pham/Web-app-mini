'use strict';
const btnsShowModal = document.querySelectorAll('.show-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsShowModal.forEach(btn => {
  btn.addEventListener('click', (e, observer) => {
    openModal();
  });
});

btnCloseModal.addEventListener('click', () => {
  closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (!overlay.classList.contains('hidden')) {
      closeModal();
    }
  }
});

overlay.addEventListener('click', closeModal);
