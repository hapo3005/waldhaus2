(() => {
  const HERO_PARTS = Array.from({length:11},(_,index)=>`./assets/hero-start-clean.v2/part-${String(index+1).padStart(2,'0')}.txt`);
  const HERO_BASE64_LENGTH = 128112;
  const HERO_BYTE_LENGTH = 96084;
  let heroObjectUrl='';

  function ensureStyles(){
    if(!document.querySelector('link[data-home-hero-style]')){
      const link=document.createElement('link');
      link.rel='stylesheet';
      link.href='home-hero.css?v=39';
      link.dataset.homeHeroStyle='1';
      document.head.appendChild(link);
    }
    if(!document.querySelector('link[data-welcome-icon-style]')){
      const link=document.createElement('link');
      link.rel='stylesheet';
      link.href='welcome-card-icon.css?v=40';
      link.dataset.welcomeIconStyle='1';
      document.head.appendChild(link);
    }
    if(!document.querySelector('link[data-content-prune-style]')){
      const link=document.createElement('link');
      link.rel='stylesheet';
      link.href='content-prune.css?v=44';
      link.dataset.contentPruneStyle='1';
      document.head.appendChild(link);
    }
    if(!document.querySelector('link[data-mobile-nav-icons-style]')){
      const link=document.createElement('link');
      link.rel='stylesheet';
      link.href='mobile-nav-icons.css?v=1';
      link.dataset.mobileNavIconsStyle='1';
      document.head.appendChild(link);
    }
    if(!document.querySelector('link[data-section-hero-style]')){
      const link=document.createElement('link');
      link.rel='stylesheet';
      link.href='section-hero.css?v=38';
      link.dataset.sectionHeroStyle='1';
      document.head.appendChild(link);
    }
    if(!document.querySelector('style[data-header-logo-style]')){
      const style=document.createElement('style');
      style.dataset.headerLogoStyle='1';
      style.textContent=`
        body .topbar .brand-mark{
          width:58px;height:58px;flex:0 0 58px;
          background:transparent!important;color:#F8F5ED!important;
          border-radius:0!important;overflow:visible!important;
          display:grid;place-items:center;
        }
        body .topbar .brand-mark svg{width:100%;height:100%;display:block;overflow:visible}
        body .topbar .brand-mark image{pointer-events:none}
        @media(max-width:760px){
          body .topbar .brand-mark{width:50px;height:50px;flex-basis:50px}
          body .topbar .brand{gap:9px}
        }
      `;
      document.head.appendChild(style);
    }
  }

  function applyHeaderLogo(){
    const mark=document.querySelector('.topbar .brand-mark');
    if(!mark||mark.dataset.approvedLogo==='1') return;
    mark.innerHTML=`<svg viewBox="0 0 192 192" role="presentation" aria-hidden="true" focusable="false">
      <defs>
        <filter id="waldhausHeaderLight" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
          <feColorMatrix in="SourceGraphic" type="luminanceToAlpha" result="logoLuminance"/>
          <feComponentTransfer in="logoLuminance" result="logoMask">
            <feFuncA type="linear" slope="8" intercept="-4"/>
          </feComponentTransfer>
          <feFlood flood-color="#F8F5ED" result="warmWhite"/>
          <feComposite in="warmWhite" in2="logoMask" operator="in"/>
        </filter>
      </defs>
      <image href="icon-192.png?v=31" x="0" y="0" width="192" height="192" preserveAspectRatio="xMidYMid meet" filter="url(#waldhausHeaderLight)"/>
    </svg>`;
    mark.dataset.approvedLogo='1';
  }

  function applyWelcomeCards(){
    const home=document.querySelector('[data-view="home"]');
    const trip=home?.querySelector('.trip-card');
    if(trip){
      trip.classList.add('welcome-trip-v2');
      const addButton=trip.querySelector(':scope > .text-link');
      if(addButton && addButton.dataset.welcomeV2!=='1'){
        addButton.dataset.welcomeV2='1';
        addButton.classList.add('trip-add-button');
        addButton.textContent='+ Reise hinzufügen';
      }
      if(!trip.querySelector('.trip-details-link')){
        const details=document.createElement('button');
        details.type='button';
        details.className='trip-details-link';
        details.textContent='Details ansehen →';
        details.addEventListener('click',()=>{
          const target=document.querySelector('.desktop-nav [data-view-target="stay"], .mobile-nav [data-view-target="stay"]');
          target?.click();
        });
        trip.appendChild(details);
      }
    }
    home?.querySelector('.next-card')?.classList.add('welcome-next-v2');
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
    applyHeaderLogo();
    applyWelcomeCards();
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
      ensureStyles();
      applyHeaderLogo();
      applyWelcomeCards();
      if(applyHero()||tries>30) clearInterval(timer);
    },40);
  }

  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();