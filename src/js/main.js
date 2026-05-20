import '../css/main.css';

document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const header = item.querySelector('.faq-question');
    if (header) {
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('faq-open');
        document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('faq-open'));
        if (!isOpen) item.classList.add('faq-open');
      });
    }
  });
});
