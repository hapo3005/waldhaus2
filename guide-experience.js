(() => {
  const extraConfig={
    'Arnika-Route KB 3':{
      image:'https://imxplatform-cust-et.fsn1.your-objectstorage.com/media/20250624_150912.jpg',
      place:'Direkt ab Kerschenbach',tag:'Wandern'
    },
    'XXL-Bank Kerschenbach':{
      image:'https://resc.deskline.net/images/RPT/1/3ee70ee3-6a3d-4c33-bd82-4c7dc548258b/99/image.jpg',
      place:'Kerschenbach',tag:'Aussicht'
    },
    'Wassererlebnisplatz':{
      image:'https://www.gerolstein.de/aktuelles/news/2021/westenergie-aktiv-vor-ort/wanderschutzhuette-am-wassererlebnisplatz-kerschenbach.jpg',
      place:'Kerschenbach',tag:'Natur & Familie'
    },
    'Café Doppelfeld':{
      image:'https://cafe-doppelfeld.de/wp-content/uploads/2022/10/rbd1-Cafe-Backerei-Eiscafe-Doppelfeld-facade.jpg',
      place:'Stadtkyll',tag:'Café & Bäckerei'
    },
    'REWE Stadtkyll':{
      image:'https://cs.rewe-static.de/v3/assets/blt23e2a0b7bfd23c1f/blt84858cfe9f6a12ce/657703b2e66582040a062b43/markt_alt.jpg',
      place:'Stadtkyll',tag:'Einkaufen'
    },
    'Marien-Apotheke':{
      image:'https://www.apotheke-stadtkyll.de/images/apotheke/marien_aussen_1200.webp',
      place:'Stadtkyll',tag:'Apotheke'
    },
    'Ärztliche Versorgung':{
      image:'https://drsteigerwald.de/assets/images/7/Praxis_dr_med_Steigerwald_1-rp5ddbrp108qe9a.jpg',
      place:'Stadtkyll',tag:'Gesundheit'
    },
    'E-Auto laden':{
      image:'https://www.gerolstein.de/leben-in-der-verbandsgemeinde/ortsgemeinden-und-staedte/kerschenbach/vg-gerolstein-kerschenbach.jpg?cid=kld.7eca&resize=e9112f%3A1200x400c',
      place:'Kerschenbach',tag:'E-Mobilität'
    },
    'Tourist-Information':{
      image:'https://resc.deskline.net/images/RPT/1/b2e9454c-9e94-4b76-9706-2721ac638006/99/image.jpg',
      place:'Stadtkyll',tag:'Information'
    }
  };

  const natureTitles=['Arnika-Route KB 3','XXL-Bank Kerschenbach','Wassererlebnisplatz'];
  const serviceTitles=['REWE Stadtkyll','Marien-Apotheke','Ärztliche Versorgung','E-Auto laden','Tourist-Information'];

  function esc(value){return String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');}
  function itemByTitle(title){return typeof guideItems==='undefined'?null:guideItems.find(item=>item.title===title)||null;}

  function experienceCard(item,config){
    if(!item||!config)return '';
    return `<a class="stay-experience-card guide-unified-card" href="${esc(item.url)}" target="_blank" rel="noreferrer"><div class="stay-experience-media guide-illustration"><img src="${esc(config.image)}" alt="${esc(item.title)}" loading="lazy" decoding="async" referrerpolicy="no-referrer"></div><div class="stay-experience-copy"><small>${esc(config.place)} · ${esc(config.tag)}</small><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p><span class="stay-experience-link">mehr erfahren <b>↗</b></span></div></a>`;
  }

  function railMarkup(id,title,titles){
    const cards=titles.map(title=>experienceCard(itemByTitle(title),extraConfig[title])).filter(Boolean);
    if(!cards.length)return '';
    return `<section class="stay-experience-group guide-unified-group"><div class="stay-experience-head"><div><span class="card-label">Entdecken</span><h2>${esc(title)}</h2></div><div class="stay-experience-controls"><button type="button" data-guide-scroll="${id}" data-direction="-1" aria-label="Zurück">‹</button><button type="button" data-guide-scroll="${id}" data-direction="1" aria-label="Weiter">›</button></div></div><div class="stay-experience-rail" id="${id}" tabindex="0">${cards.join('')}</div><div class="stay-experience-progress" data-guide-progress-for="${id}" aria-hidden="true">${cards.map((_,i)=>`<i${i===0?' class="active"':''}></i>`).join('')}</div></section>`;
  }

  function updateProgress(rail){
    const progress=document.querySelector(`[data-guide-progress-for="${rail.id}"]`);if(!progress)return;
    const cards=[...rail.querySelectorAll('.stay-experience-card')];if(!cards.length)return;
    let active=0,best=Infinity;
    cards.forEach((card,index)=>{const distance=Math.abs(card.offsetLeft-rail.scrollLeft);if(distance<best){best=distance;active=index;}});
    [...progress.children].forEach((node,index)=>node.classList.toggle('active',index===active));
  }

  function bindRail(rail){
    if(!rail||rail.dataset.guideBound==='1')return;rail.dataset.guideBound='1';
    let dragging=false,startX=0,startLeft=0,moved=false;
    const stop=()=>{if(!dragging)return;dragging=false;rail.classList.remove('is-dragging');};
    rail.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse'&&event.button!==0)return;dragging=true;moved=false;startX=event.clientX;startLeft=rail.scrollLeft;rail.classList.add('is-dragging');rail.setPointerCapture?.(event.pointerId);});
    rail.addEventListener('pointermove',event=>{if(!dragging)return;const delta=event.clientX-startX;if(Math.abs(delta)>6)moved=true;rail.scrollLeft=startLeft-delta;});
    rail.addEventListener('pointerup',stop);rail.addEventListener('pointercancel',stop);rail.addEventListener('lostpointercapture',stop);
    rail.addEventListener('click',event=>{if(moved){event.preventDefault();event.stopPropagation();moved=false;}},true);
    let raf=0;rail.addEventListener('scroll',()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>updateProgress(rail));},{passive:true});
    updateProgress(rail);
  }

  function appendCafeToDining(hub){
    const rail=hub.querySelector('#stayDiningRail');
    const cafe=itemByTitle('Café Doppelfeld');
    if(!rail||!cafe||rail.querySelector('[data-guide-cafe]'))return;
    const holder=document.createElement('div');
    holder.innerHTML=experienceCard(cafe,extraConfig['Café Doppelfeld']);
    const card=holder.firstElementChild;if(!card)return;card.dataset.guideCafe='1';rail.appendChild(card);
    const progress=hub.querySelector('[data-progress-for="stayDiningRail"]');if(progress)progress.appendChild(document.createElement('i'));
  }

  function prependNatureToActivities(hub){
    const rail=hub.querySelector('#stayActivityRail');
    if(!rail||rail.querySelector('[data-guide-local-nature]'))return;
    const cards=natureTitles.map(title=>experienceCard(itemByTitle(title),extraConfig[title])).filter(Boolean);
    if(!cards.length)return;

    const holder=document.createElement('div');
    holder.innerHTML=cards.join('');
    const fragment=document.createDocumentFragment();
    [...holder.children].forEach(card=>{card.dataset.guideLocalNature='1';fragment.appendChild(card);});
    rail.prepend(fragment);
    rail.scrollLeft=0;

    const progress=hub.querySelector('[data-progress-for="stayActivityRail"]');
    if(progress){
      const count=rail.querySelectorAll('.stay-experience-card').length;
      progress.replaceChildren(...Array.from({length:count},(_,index)=>{const dot=document.createElement('i');if(index===0)dot.classList.add('active');return dot;}));
    }
  }

  function unifyDiscover(){
    const guide=document.querySelector('[data-view="guide"]');
    const hub=document.querySelector('#stayExperiences');
    if(!guide||!hub)return false;

    hub.classList.add('guide-experience-hub');
    const intro=hub.querySelector('.stay-experiences-intro');
    if(intro){
      intro.querySelector('.card-label')?.replaceChildren(document.createTextNode('Entdecken'));
      const h2=intro.querySelector('h2');if(h2)h2.textContent='Essen, trinken, erleben.';
      const p=intro.querySelector('p');if(p)p.textContent='Unsere Waldhaus-Auswahl für gute Adressen, Natur und besondere Erlebnisse rund um Kerschenbach.';
      intro.querySelector('#stayMoreTips')?.remove();
    }

    guide.querySelector('.page-hero')?.insertAdjacentElement('afterend',hub);
    appendCafeToDining(hub);
    prependNatureToActivities(hub);

    hub.querySelectorAll('.guide-unified-group').forEach(node=>node.remove());
    const note=hub.querySelector('.stay-experience-note');
    const extra=document.createElement('div');extra.className='guide-unified-rails';
    extra.innerHTML=railMarkup('guideServiceRail','Praktisch vor Ort',serviceTitles);
    if(note)note.insertAdjacentElement('beforebegin',extra);else hub.appendChild(extra);

    if(note)note.textContent='Alle Empfehlungen sind bewusst nur einmal einsortiert. Die Carousels lassen sich mit Pfeilen, Maus-Drag oder auf Handy und Tablet per Swipe bedienen. Öffnungszeiten und Saisonbetrieb bitte vor der Abfahrt über den jeweiligen Link prüfen.';

    const filters=guide.querySelector('.filter-row');if(filters)filters.hidden=true;
    const grid=guide.querySelector('#guideGrid');if(grid)grid.hidden=true;
    guide.querySelector('.guide-directory-heading')?.remove();
    const verified=guide.querySelector('.verified-note');if(verified){verified.classList.add('guide-verification-note');hub.insertAdjacentElement('afterend',verified);}

    extra.querySelectorAll('.stay-experience-rail').forEach(bindRail);
    extra.querySelectorAll('[data-guide-scroll]').forEach(button=>button.addEventListener('click',()=>{const rail=document.getElementById(button.dataset.guideScroll);if(!rail)return;const card=rail.querySelector('.stay-experience-card');const step=(card?.getBoundingClientRect().width||300)+16;rail.scrollBy({left:(Number(button.dataset.direction)||1)*step,behavior:'smooth'});}));
    return true;
  }

  function boot(){
    let tries=0;
    const timer=setInterval(()=>{tries++;if(unifyDiscover()||tries>40)clearInterval(timer);},50);
  }

  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,100),{once:true}):setTimeout(boot,100);
})();
