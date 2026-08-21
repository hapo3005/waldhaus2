(() => {
  const HERO_IMAGE = './assets/hero-start-clean.webp';

  function ensureStyles(){
    if(document.querySelector('link[data-home-hero-style]')) return;
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='home-hero.css?v=30';
    link.dataset.homeHeroStyle='1';
    document.head.appendChild(link);
  }

  function loadHeroImage(hero){
    if(hero.dataset.heroImageLoading==='1'||hero.dataset.heroImageReady==='1') return;
    const layer=hero.querySelector('.hero-image');
    if(!layer) return;

    hero.dataset.heroImageLoading='1';
    const image=new Image();
    image.onload=()=>{
      layer.style.setProperty('background-image',`url("${HERO_IMAGE}")`,'important');
      hero.dataset.heroImageReady='1';
      delete hero.dataset.heroImageLoading;
      delete hero.dataset.heroImageError;
    };
    image.onerror=()=>{
      hero.dataset.heroImageError='1';
      delete hero.dataset.heroImageLoading;
      console.warn('Waldhaus Start-Hero konnte nicht geladen werden.');
    };
    image.src=HERO_IMAGE;
  }

  function applyHero(){
    ensureStyles();
    const hero=document.querySelector('[data-view="home"] .hero');
    if(!hero) return false;
    hero.classList.add('hero-daytime');

    const copy=hero.querySelector('.hero-copy');
    const heading=copy?.querySelector('h1');
    const body=copy?.querySelector('p:not(.eyebrow)');
    const actions=copy?.querySelector('.hero-actions');
    const buttons=actions?[...actions.querySelectorAll('.button')]:[];

    if(heading) heading.innerHTML='Was passt <em>heute</em><br>zu euch?';
    if(body) body.textContent='Ausgewählte Ideen für Natur, Essen, Ausflüge und die praktischen Dinge vor Ort.';
    if(buttons[0]){
      buttons[0].dataset.viewTarget='guide';
      buttons[0].classList.add('hero-plan-button');
      buttons[0].innerHTML='Meinen perfekten Tag planen <span>→</span>';
    }
    buttons.slice(1).forEach(button=>button.remove());

    loadHeroImage(hero);
    return true;
  }

  function boot(){
    let tries=0;
    const timer=setInterval(()=>{
      tries+=1;
      if(applyHero()||tries>30) clearInterval(timer);
    },40);
  }

  document.readyState==='loading'
    ? document.addEventListener('DOMContentLoaded',boot,{once:true})
    : boot();
})();
