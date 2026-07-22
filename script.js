// ==========================================================================
// script.js — Pet Bel
// 1) Geração das bolhas decorativas da seção Banho e Tosa
// 2) Reveal em cascata ao rolar (banho-tosa, clinica, pet-shop, historia, etc.)
// 3) Esmaecimento dinâmico do texto de "Nossa História"
// 4) Carrossel + Lightbox da seção Dias Promocionais
// ==========================================================================

// ---------- 1) Geração das bolhas decorativas ----------
(function () {
  const container = document.querySelector('.banho-tosa__circulos');
  if (!container) return;

  // Cada item: tamanho no desktop (w), tamanho no mobile (wm),
  // posição vertical (top) e horizontal (left OU right).
  // topM / leftM / rightM são OPCIONAIS: usados só quando a bolha
  // precisa de uma posição diferente no mobile pra não colidir
  // com outra (ex: bolhas 3, 12, 22 e 26, que colidiam no mobile).
  // Pra adicionar/remover bolhas, mexa só neste array.
  const bolhas = [
    { w: 60,  wm: 54, top: '6%',  left: '4%' },                                            // 1
    { w: 22,  wm: 26, top: '16%', left: '20%' },                                            // 2
    { w: 95,  wm: 70, top: '62%', left: '2%',  topM: '58%', leftM: '0%' },                  // 3 (ajustada)
    { w: 38,  wm: 40, top: '38%', right: '6%' },                                            // 4
    { w: 18,  wm: 20, top: '80%', right: '22%' },                                           // 5
    { w: 70,  wm: 60, top: '8%',  right: '12%' },                                           // 6
    { w: 28,  wm: 30, top: '48%', left: '34%' },                                            // 7
    { w: 50,  wm: 46, top: '4%',  left: '42%' },                                            // 8
    { w: 16,  wm: 18, top: '30%', left: '12%' },                                            // 9
    { w: 44,  wm: 42, top: '70%', right: '4%' },                                            // 10
    { w: 24,  wm: 24, top: '90%', left: '30%' },                                            // 11
    { w: 80,  wm: 55, top: '56%', right: '30%', topM: '46%', rightM: '44%' },               // 12 (ajustada)
    { w: 32,  wm: 30, top: '20%', right: '32%' },                                           // 13
    { w: 20,  wm: 20, top: '84%', left: '8%' },                                             // 14
    { w: 26,  wm: 22, top: '55%', left: '6%' },                                             // 15
    { w: 46,  wm: 40, top: '68%', right: '6%' },                                            // 16
    { w: 18,  wm: 16, top: '76%', left: '40%' },                                            // 17
    { w: 34,  wm: 30, top: '92%', right: '20%' },                                           // 18
    { w: 14,  wm: 16, top: '12%', left: '48%' },                                            // 19
    { w: 66,  wm: 56, top: '26%', left: '8%' },                                             // 20
    { w: 20,  wm: 22, top: '44%', right: '18%' },                                           // 21
    { w: 100, wm: 65, top: '60%', left: '44%', topM: '74%', leftM: '34%' },                 // 22 (ajustada)
    { w: 30,  wm: 26, top: '2%',  right: '26%' },                                           // 23
    { w: 15,  wm: 16, top: '96%', left: '18%' },                                            // 24
    { w: 52,  wm: 44, top: '34%', right: '40%' },                                           // 25
    { w: 24,  wm: 18, top: '66%', left: '24%', topM: '82%', leftM: '14%' },                 // 26 (ajustada)
    { w: 38,  wm: 32, top: '88%', right: '34%' },                                           // 27
    { w: 17,  wm: 15, top: '50%', left: '16%' },                                            // 28
    { w: 62,  wm: 50, top: '14%', right: '4%' },                                            // 29
    { w: 22,  wm: 20, top: '78%', left: '52%' },                                            // 30
    { w: 45,  wm: 38, top: '40%', left: '60%' },                                            // 31
    { w: 19,  wm: 16, top: '6%',  left: '30%' },                                            // 32
  ];

  const frag = document.createDocumentFragment();

  bolhas.forEach((b) => {
    const el = document.createElement('span');
    el.className = 'banho-tosa__bolha';
    el.style.setProperty('--w', `${b.w}px`);
    el.style.setProperty('--w-mobile', `${b.wm}px`);
    el.style.setProperty('--top', b.top);
    if (b.left)  el.style.setProperty('--left', b.left);
    if (b.right) el.style.setProperty('--right', b.right);

    // posição específica pra mobile (opcional) — usada só nas bolhas
    // que colidem em telas estreitas
    if (b.topM)   el.style.setProperty('--top-mobile', b.topM);
    if (b.leftM)  el.style.setProperty('--left-mobile', b.leftM);
    if (b.rightM) el.style.setProperty('--right-mobile', b.rightM);

    frag.appendChild(el);
  });

  container.appendChild(frag);
})();

// ---------- 2) Reveal em cascata ao rolar ----------
// Aplicado a todas as seções desse padrão (banho-tosa, clinica, pet-shop,
// historia e qualquer outra que você criar seguindo o mesmo BEM)
(function () {
  const secoes = document.querySelectorAll('.banho-tosa, .clinica, .pet-shop, .historia');
  if (!secoes.length) return;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  secoes.forEach((secao) => {
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

// ---------- 3) Esmaecimento dinâmico do texto de "Nossa História" ----------
// Por padrão o início do texto fica limpo (sem esmaecer). O esmaecimento
// no topo só aparece depois que a pessoa rola pra baixo, indicando que
// há texto acima. O esmaecimento da base fica sempre visível (controlado
// só pelo CSS), já que quase sempre há mais texto abaixo.
(function () {
  const corpo = document.querySelector('.historia__corpo');
  if (!corpo) return;

  function atualizarEsmaecimento() {
    const rolouParaBaixo = corpo.scrollTop > 4;
    corpo.classList.toggle('historia__corpo--rolou', rolouParaBaixo);
  }

  corpo.addEventListener('scroll', atualizarEsmaecimento);
  atualizarEsmaecimento();
})();

// ---------- 4) Carrossel + Lightbox — Dias Promocionais ----------
// Pra adicionar/remover uma imagem da seção "Dias Promocionais", mexa
// só neste array. Todas as imagens ficam em assets/imagens/Imagens-DiaP/
// e seguem o padrão de nome img-01, img-02, img-03, img-04 (.jpeg).
(function () {
  const imagensDiaP = [
    { src: 'assets/imagens/Imagens-DiaP/img-01.jpeg', alt: 'Promoção Pet Bel 1' },
    { src: 'assets/imagens/Imagens-DiaP/img-02.jpeg', alt: 'Promoção Pet Bel 2' },
    { src: 'assets/imagens/Imagens-DiaP/img-03.jpeg', alt: 'Promoção Pet Bel 3' },
    { src: 'assets/imagens/Imagens-DiaP/img-04.jpeg', alt: 'Promoção Pet Bel 4' },
  ];

  const pista = document.querySelector('.dias-promo__pista');
  if (!pista) return;

  const janela   = document.querySelector('.dias-promo__janela');
  const btnPrev  = document.querySelector('.dias-promo__seta--prev');
  const btnNext  = document.querySelector('.dias-promo__seta--next');
  const lightbox = document.getElementById('diasPromoLightbox');
  const lbImg    = lightbox ? lightbox.querySelector('.dias-promo__lightbox-img') : null;
  const lbFechar = lightbox ? lightbox.querySelector('.dias-promo__lightbox-fechar') : null;

  // ---- Monta os slides a partir do array acima ----
  imagensDiaP.forEach((item) => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.alt;
    img.loading = 'lazy';
    img.className = 'dias-promo__slide';
    li.appendChild(img);
    pista.appendChild(li);
  });

  const slides = Array.from(pista.children);
  if (!slides.length) return;

  // ---- Quantas imagens ficam visíveis por vez (acompanha o CSS) ----
  function slidesVisiveis() {
    const largura = window.innerWidth;
    if (largura <= 480) return 1;
    if (largura <= 700) return 2;
    return 3;
  }

  let indiceAtual = 0;

  function indiceMaximo() {
    return Math.max(0, slides.length - slidesVisiveis());
  }

  function irParaIndice(indice) {
    const max = indiceMaximo();
    indiceAtual = Math.min(Math.max(indice, 0), max);

    const slide = slides[indiceAtual];
    const gapPx = parseFloat(getComputedStyle(pista).gap) || 0;
    const deslocamento = slide.offsetLeft;
    pista.style.transform = `translateX(-${deslocamento}px)`;

    // trava as setas nas pontas do carrossel (evita "arrasto vazio")
    btnPrev.disabled = indiceAtual === 0;
    btnNext.disabled = indiceAtual >= max;
    btnPrev.style.opacity = btnPrev.disabled ? '0.4' : '1';
    btnNext.style.opacity = btnNext.disabled ? '0.4' : '1';
    btnPrev.style.cursor = btnPrev.disabled ? 'default' : 'pointer';
    btnNext.style.cursor = btnNext.disabled ? 'default' : 'pointer';
  }

  btnPrev.addEventListener('click', () => irParaIndice(indiceAtual - 1));
  btnNext.addEventListener('click', () => irParaIndice(indiceAtual + 1));

  // Recalcula a posição ao redimensionar a janela (troca de breakpoint
  // muda quantas imagens cabem por vez)
  window.addEventListener('resize', () => irParaIndice(indiceAtual));

  // ---- Arrastar com o dedo/mouse (equivalente ao clique nas setas) ----
  let arrastando = false;
  let inicioX = 0;

  janela.addEventListener('pointerdown', (e) => {
    arrastando = true;
    inicioX = e.clientX;
  });

  window.addEventListener('pointerup', (e) => {
    if (!arrastando) return;
    arrastando = false;
    const diferenca = e.clientX - inicioX;
    if (diferenca > 40) irParaIndice(indiceAtual - 1);
    else if (diferenca < -40) irParaIndice(indiceAtual + 1);
  });

  // ---- Lightbox: abre em tela cheia ao clicar em uma imagem ----
  if (lightbox && lbImg) {
    slides.forEach((li) => {
      const img = li.querySelector('img');
      img.addEventListener('click', () => {
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lightbox.classList.add('is-aberto');
        document.body.style.overflow = 'hidden';
      });
    });

    function fecharLightbox() {
      lightbox.classList.remove('is-aberto');
      document.body.style.overflow = '';
    }

    // Fecha ao clicar fora da imagem (no fundo escuro)
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) fecharLightbox();
    });

    if (lbFechar) lbFechar.addEventListener('click', fecharLightbox);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') fecharLightbox();
    });
  }

  // posição inicial
  irParaIndice(0);
})();