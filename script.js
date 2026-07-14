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


  /*
  // ---------- 2) Bolhas de sabão ----------
  if (!prefersReducedMotion) {
    const totalBolhas = 10;
    for (let i = 0; i < totalBolhas; i++) {
      const bolha = document.createElement('span');
      bolha.className = 'banho-tosa__bolha';

      const tamanho = 10 + Math.random() * 26; // 10px a 36px
      const esquerda = Math.random() * 100; // %
      const duracao = 7 + Math.random() * 6; // 7s a 13s
      const atraso = Math.random() * 10; // 0s a 10s
      const deriva = (Math.random() * 60 - 30).toFixed(0) + 'px';

      bolha.style.width = tamanho + 'px';
      bolha.style.height = tamanho + 'px';
      bolha.style.left = esquerda + '%';
      bolha.style.animationDuration = duracao + 's';
      bolha.style.animationDelay = atraso + 's';
      bolha.style.setProperty('--drift', deriva);

      secao.appendChild(bolha);
    }
  }
*/
  // ---------- 3) Preparado para o SVG da patinha (uso futuro) ----------
  // Quando você tiver o SVG da patinha, basta soltar um <img> ou <svg>
  // dentro de .banho-tosa__foto (substituindo o placeholder tracejado)
  // que o layout e as animações já vão funcionar sem mais ajustes.
})();