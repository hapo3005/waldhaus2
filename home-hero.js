(() => {
  const HERO_PARTS = Array.from({length:11},(_,index)=>`./assets/hero-start-clean.v2/part-${String(index+1).padStart(2,'0')}.txt`);
  const HERO_BASE64_LENGTH = 128112;
  const HERO_BYTE_LENGTH = 96084;
  let heroObjectUrl='';

  function ensureStyles(){
    if(document.querySelector('link[data-home-hero-style]')) return;
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='home-hero.css';
    link.dataset.homeHeroStyle='1';
    document.head.appendChild(link);
  }

  function decodeBase64(base64){
    const binary=atob(base64);
    const bytes=new Uint8Array(binary.length);
    for(let i=0;i<binary.length;i+=1) bytes[i]=binary.charCodeAt(i);
    return bytes;
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
        return (await response.text()).trim();
      }));
      const base64=chunks.join('');
      if(base64.length!==HERO_BASE64_LENGTH) throw new Error(`hero asset incomplete: ${base64.length}/${HERO_BASE64_LENGTH}`);
      const bytes=decodeBase64(base64);
      if(bytes.length!==HERO_BYTE_LENGTH||String.fromCharCode(...bytes.slice(0,4))!=='RIFF'||String.fromCharCode(...bytes.slice(8,12))!=='WEBP') throw new Error('hero asset integrity check failed');
      if(heroObjectUrl) URL.revokeObjectURL(heroObjectUrl);
      heroObjectUrl=URL.createObjectURL(new Blob([bytes],{type:'image/webp'}));
      image.style.setProperty('background-image',`url("${heroObjectUrl}")`,'important');
      hero.dataset.heroImageReady='1';
      delete hero.dataset.heroImageError;
    }catch(error){
      hero.dataset.heroImageError='1';
      console.warn('Waldhaus clean hero could not be loaded',error);
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

  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();
