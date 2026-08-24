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
      link.href='mobile-nav-icons.css?v=2';
      link.dataset.mobileNavIconsStyle='1';
      document.head.appendChild(link);
    }
    if(!document.querySelector('link[data-footer-style]')){
      const link=document.createElement('link');
      link.rel='stylesheet';
      link.href='footer.css?v=1';
      link.dataset.footerStyle='1';
      document.head.appendChild(link);
    }
    if(!document.querySelector('link[data-brand-typography-style]')){
      const link=document.createElement('link');
      link.rel='stylesheet';
      link.href='brand-typography.css?v=49';
      link.dataset.brandTypographyStyle='1';
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
          width:62px;height:62px;flex:0 0 62px;
          background:transparent!important;color:#F8F5ED!important;
          border-radius:0!important;overflow:visible!important;
          display:grid;place-items:center;box-shadow:none!important;
        }
        body .topbar .brand-mark img{width:100%;height:100%;display:block;object-fit:contain;pointer-events:none}
        @media(max-width:760px){
          body .topbar .brand-mark{width:54px;height:54px;flex-basis:54px}
          body .topbar .brand{gap:9px}
        }
      `;
      document.head.appendChild(style);
    }
  }

  function applyHeaderLogo(){
    const mark=document.querySelector('.topbar .brand-mark');
    if(!mark||mark.dataset.approvedLogo==='white-48') return;
    mark.innerHTML='<img src="assets/waldhaus-logo-mark-white.svg?v=48" alt="" aria-hidden="true" width="120" height="120">';
    mark.dataset.approvedLogo='white-48';
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
        details.textContent='Alles zur Anreise →';
        details.addEventListener('click',()=>{
          const target=document.querySelector('.desktop-nav [data-view-target="stay"], .mobile-nav [data-view-target="stay"]');
          target?.click();
        });
        trip.appendChild(details);
      }
    }
    home?.querySelector('.next-card')?.classList.add('welcome-next-v2');
  }

  function setText(selector,text){
    const node=document.querySelector(selector);
    if(node) node.textContent=text;
  }

  function applyGuestVoice(){
    const home=document.querySelector('[data-view="home"]');
    if(home){
      const tripLabel=home.querySelector('.trip-card .card-label');
      if(tripLabel) tripLabel.textContent='Eure Auszeit bei uns';
      const neutralHeadline=home.querySelector('#tripHeadline');
      const neutralRange=home.querySelector('#tripRange');
      const neutralAvatars=home.querySelector('.avatar-row small');
      if(neutralHeadline?.textContent.trim()==='Noch kein Aufenthalt geplant.') neutralHeadline.textContent='Wann dürfen wir euch begrüßen?';
      if(neutralRange?.textContent.trim()==='Sobald ein Aufenthalt eingetragen ist, stehen hier die Reisedetails.') neutralRange.textContent='Schaut in unseren Kalender, sucht euch freie Tage aus und schickt uns euren Wunschzeitraum.';
      if(neutralAvatars?.textContent.trim()==='Aufenthalt wird hier angezeigt') neutralAvatars.textContent='Wir freuen uns auf eure Anfrage';

      const next=home.querySelector('.next-card');
      if(next){
        const label=next.querySelector('.card-label');
        const title=next.querySelector('h2');
        const copy=next.querySelector(':scope > p');
        const button=next.querySelector('.button');
        if(label) label.textContent='Gut vorbereitet';
        if(title) title.textContent='Damit ihr entspannt bei uns ankommt.';
        if(copy) copy.textContent='Wir haben euch Adresse, Parkplatz, Check-in und die wichtigsten Infos für die Anreise an einem Ort zusammengestellt.';
        if(button) button.textContent='Alles zur Anreise';
      }

      const curated=home.querySelector('.section-heading');
      if(curated){
        const label=curated.querySelector('.card-label');
        const title=curated.querySelector('h2');
        if(label) label.textContent='Unsere Tipps für euch';
        if(title) title.textContent='Was wir euch in der Eifel ans Herz legen.';
      }
    }

    const stay=document.querySelector('[data-view="stay"]');
    if(stay){
      setText('[data-view="stay"] .page-hero .eyebrow','Gut ankommen');
      setText('[data-view="stay"] .page-hero h1','Damit eure Auszeit entspannt beginnt.');
      setText('[data-view="stay"] .page-hero > div:first-child > p','Wir haben euch hier alles zusammengestellt, was ihr vor der Anreise und für die ersten Minuten im Waldhaus braucht.');
      const cards=stay.querySelectorAll('.timeline-card');
      if(cards[0]){
        setText('[data-view="stay"] .timeline-card:nth-child(1) .card-label','Für eure Anreise');
        setText('[data-view="stay"] .timeline-card:nth-child(1) h2','So findet ihr entspannt zu uns.');
        setText('[data-view="stay"] .timeline-card:nth-child(1) .timeline-body > p','Adresse, Parkmöglichkeit und Zugang haben wir euch hier übersichtlich zusammengefasst.');
      }
      if(cards[1]){
        setText('[data-view="stay"] .timeline-card:nth-child(2) .card-label','Wenn ihr da seid');
        setText('[data-view="stay"] .timeline-card:nth-child(2) h2','Erst einmal ankommen.');
      }
      if(cards[2]){
        setText('[data-view="stay"] .timeline-card:nth-child(3) .card-label','Während eurer Auszeit');
        setText('[data-view="stay"] .timeline-card:nth-child(3) h2','Fühlt euch einfach wie zu Hause.');
        setText('[data-view="stay"] .timeline-card:nth-child(3) .timeline-body > p','Alles rund um Garten, Heizung, Geräte, Müll und unsere Tipps für die Umgebung bleibt für euch jederzeit griffbereit.');
      }
    }

    const guide=document.querySelector('[data-view="guide"]');
    if(guide){
      setText('[data-view="guide"] .page-hero .eyebrow','Unsere Empfehlungen für euch');
      setText('[data-view="guide"] .page-hero h1','Was wir euch gerne zeigen würden.');
      setText('[data-view="guide"] .page-hero > div:first-child > p','Wir haben euch einige unserer liebsten Ideen für Natur, Essen und kleine Ausflüge rund um Kerschenbach zusammengestellt.');
    }

    const house=document.querySelector('[data-view="house"]');
    if(house){
      setText('[data-view="house"] .page-hero .eyebrow','Für eure Zeit bei uns');
      setText('[data-view="house"] .page-hero h1','Alles, was ihr im Waldhaus wissen möchtet.');
      setText('[data-view="house"] .page-hero > div:first-child > p','Damit ihr euch schnell zurechtfindet, haben wir die wichtigsten Dinge rund ums Haus kurz und verständlich für euch gesammelt.');
    }

    const checkout=document.querySelector('[data-view="checkout"]');
    if(checkout){
      setText('[data-view="checkout"] .page-hero .eyebrow','Bevor ihr fahrt');
      setText('[data-view="checkout"] .page-hero h1','Schön, dass ihr bei uns wart.');
      setText('[data-view="checkout"] .page-hero > div:first-child > p','Ein letzter kurzer Rundgang, dann wünschen wir euch eine gute Heimfahrt – und vielleicht bis zum nächsten Mal.');
      const farewell=checkout.querySelector('.farewell p');
      if(farewell) farewell.innerHTML='Danke, dass ihr so gut auf unser <strong data-brand-name>Waldhaus</strong> aufgepasst habt.';
    }

    const planner=document.querySelector('[data-view="planner"]');
    if(planner){
      setText('[data-view="planner"] .page-hero .eyebrow','Eure Auszeit bei uns');
      setText('[data-view="planner"] .page-hero h1','Wann dürfen wir euch begrüßen?');
      setText('[data-view="planner"] .page-hero > div:first-child > p','Schaut in unseren Kalender, sucht euch einen passenden freien Zeitraum aus und hinterlegt eure Anfrage ganz unkompliziert.');
      setText('[data-view="planner"] .guest-request-card h2','Schickt uns euren Wunschzeitraum.');
      setText('[data-view="planner"] .guest-request-copy','Wählt eure An- und Abreise direkt im Kalender oder tragt die Daten unten ein.');
      const submit=planner.querySelector('#guestRequestForm .button');
      if(submit) submit.innerHTML='Wunschzeitraum anfragen <span>→</span>';
      const tip=planner.querySelector('.guest-calendar-tip p');
      if(tip) tip.innerHTML='<strong>So geht’s:</strong> zuerst die Anreise, danach die Abreise antippen.';
    }
  }

  function applyFooter(){
    if(document.querySelector('.waldhaus-footer')) return;
    const shell=document.querySelector('.app-shell');
    const mobileNav=shell?.querySelector('.mobile-nav');
    if(!shell||!mobileNav) return;

    const footer=document.createElement('footer');
    footer.className='waldhaus-footer';
    footer.setAttribute('aria-label','Waldhaus Abschluss');
    footer.innerHTML=`
      <div class="waldhaus-footer-main">
        <div class="waldhaus-footer-brand">
          <span class="waldhaus-footer-mark" aria-hidden="true" style="background:transparent;box-shadow:none;border-radius:0;color:transparent;font-size:0;line-height:0"><img src="assets/waldhaus-logo-mark-white.svg?v=48" alt="" width="120" height="120" style="width:100%;height:100%;display:block;object-fit:contain"></span>
          <div class="waldhaus-footer-copy">
            <strong>Waldhaus</strong>
            <span>Kerschenbach · Eifel</span>
            <p>Wir wünschen euch eine richtig schöne und entspannte Zeit bei uns im Waldhaus.</p>
          </div>
        </div>
        <nav class="waldhaus-footer-nav" aria-label="Seitennavigation im Footer">
          <button type="button" data-footer-view="home">Start</button>
          <button type="button" data-footer-view="stay">Aufenthalt</button>
          <button type="button" data-footer-view="guide">Entdecken</button>
          <button type="button" data-footer-view="house">Haus</button>
          <button type="button" data-footer-view="checkout">Abreise</button>
        </nav>
      </div>
      <div class="waldhaus-footer-bottom">
        <span>© 2026 Waldhaus</span>
        <span>Kerschenbach · Eifel</span>
      </div>`;

    footer.querySelectorAll('[data-footer-view]').forEach(button=>{
      button.addEventListener('click',()=>{
        const view=button.dataset.footerView;
        const target=document.querySelector(`.desktop-nav [data-view-target="${view}"], .mobile-nav [data-view-target="${view}"]`);
        target?.click();
        window.scrollTo({top:0,behavior:'smooth'});
      });
    });

    shell.insertBefore(footer,mobileNav);
  }

  function loadNewsExperience(){
    if(document.querySelector('script[data-news-experience-script]')) return;
    const script=document.createElement('script');
    script.src='news-experience.js?v=3';
    script.defer=true;
    script.dataset.newsExperienceScript='1';
    document.head.appendChild(script);
  }

  function loadGuestPlanner(){
    if(document.querySelector('script[data-guest-planner-script]')) return;
    const script=document.createElement('script');
    script.src='guest-planner.js?v=2';
    script.defer=true;
    script.dataset.guestPlannerScript='1';
    script.addEventListener('load',applyGuestVoice,{once:true});
    document.head.appendChild(script);
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
    applyFooter();
    loadNewsExperience();
    loadGuestPlanner();
    applyGuestVoice();
    const hero=document.querySelector('[data-view="home"] .hero');
    if(!hero) return false;
    hero.classList.add('hero-daytime');
    const copy=hero.querySelector('.hero-copy');
    const heading=copy?.querySelector('h1');
    const body=copy?.querySelector('p:not(.eyebrow)');
    const actions=copy?.querySelector('.hero-actions');
    const buttons=actions?[...actions.querySelectorAll('.button')]:[];
    if(heading) heading.innerHTML='Willkommen <em>bei uns</em><br>im Waldhaus.';
    if(body) body.textContent='Ob ihr eure Auszeit gerade plant oder schon vor Ort seid: Wir möchten, dass ihr euch bei uns vom ersten Moment an gut aufgehoben fühlt.';
    if(buttons[0]){
      buttons[0].dataset.viewTarget='guide';
      buttons[0].classList.add('hero-plan-button');
      buttons[0].innerHTML='Unsere Tipps für eure Auszeit <span>→</span>';
    }
    buttons.slice(1).forEach(button=>button.remove());
    loadHeroImage(hero);
    return true;
  }

  function boot(){
    let tries=0;
    loadNewsExperience();
    loadGuestPlanner();
    applyGuestVoice();
    const timer=setInterval(()=>{
      tries+=1;
      ensureStyles();
      applyHeaderLogo();
      applyWelcomeCards();
      applyFooter();
      loadNewsExperience();
      loadGuestPlanner();
      applyGuestVoice();
      if(applyHero()||tries>30) clearInterval(timer);
    },40);
  }

  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();