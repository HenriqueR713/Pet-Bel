// ==========================================================================
// script.js — Pet Bel
// Seção Banho e Tosa: reveal em cascata ao rolar + bolhas de sabão animadas
// ==========================================================================

(function () {
  const secao = document.querySelector('.banho-tosa');
  if (!secao) return;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  // ---------- 1) Reveal on scroll ----------
  // (título fica fora dessa lista de propósito: aparece direto, sem depender do scroll)
  const alvos = secao.querySelectorAll(
    '.banho-tosa__frase, .banho-tosa__item'
  );

  if (prefersReducedMotion) {
    alvos.forEach((el) => el.classList.add('in-view'));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.classList.contains('banho-tosa__item')
              ? Array.from(el.parentElement.children).indexOf(el) * 90
              : 0;
            setTimeout(() => el.classList.add('in-view'), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.25 }
    );

    alvos.forEach((el) => observer.observe(el));
  }

  // ==========================================================================
// script.js — Pet Bel
// Reveal em cascata ao rolar, aplicado a todas as seções desse padrão
// (banho-tosa, clinica, e qualquer outra que você criar seguindo o mesmo BEM)
// ==========================================================================

(function () {
  const secoes = document.querySelectorAll('.banho-tosa, .clinica');
  if (!secoes.length) return;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  secoes.forEach((secao) => {
    // pega o nome-base da seção (ex: "banho-tosa" ou "clinica")
    // pra montar os seletores __frase e __item dinamicamente
    const prefixo = secao.classList[0];
    const alvos = secao.querySelectorAll(
      `.${prefixo}__frase, .${prefixo}__item`
    );

    if (prefersReducedMotion) {
      alvos.forEach((el) => el.classList.add('in-view'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.classList.contains(`${prefixo}__item`)
              ? Array.from(el.parentElement.children).indexOf(el) * 90
              : 0;
            setTimeout(() => el.classList.add('in-view'), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.25 }
    );

    alvos.forEach((el) => observer.observe(el));
  });
})();


 
})();