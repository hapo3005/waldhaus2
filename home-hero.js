(() => {
  const HERO_PARTS = [
    './assets/hero-start-day.parts/part-01.txt',
    './assets/hero-start-day.parts/part-01-tail.txt',
    './assets/hero-start-day.parts/part-02.txt',
    './assets/hero-start-day.parts/part-03.txt',
    './assets/hero-start-day.parts/part-04.txt',
    './assets/hero-start-day.parts/part-05.txt',
    './assets/hero-start-day.parts/part-06.txt'
  ];
  const HERO_BASE64_LENGTH = 69368;

  function ensureStyles(){
    if(document.querySelector('link[data-home-hero-style]')) return;
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='home-hero.css';
    link.dataset.homeHeroStyle='1';
    document.head.appendChild(link);
  }

  async function loadHeroImage(hero){
    if(hero.dataset.heroImageLoading==='1'||hero.dataset.heroImageReady==='1') return;
    hero.dataset.heroImageLoading='1';
    const image=hero.querySelector('.hero-image');
    if(!image) return;
    try{
      const chunks=await Promise.all(HERO_PARTS.map(async url=>{
        const response=await fetch(url,{cache:'no-store'});
        if(!response.ok) throw new Error(`hero asset ${response.status}`);
        return response.text();
      }));
      const base64=chunks.join('').trim();
      if(base64.length!==HERO_BASE64_LENGTH) throw new Error(`hero asset incomplete: ${base64.length}/${HERO_BASE64_LENGTH}`);
      const source=`url("data:image/webp;base64,${base64}")`;
      image.style.setProperty('background-image',source,'important');
      hero.dataset.heroImageReady='1';
      delete hero.dataset.heroImageError;
    }catch(error){
      hero.dataset.heroImageError='1';
      console.warn('Waldhaus daytime hero could not be loaded',error);
    }finally{
      delete hero.dataset.heroImageLoading;
    }
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
