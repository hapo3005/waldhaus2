(() => {
  const categoryLabel={nature:'Natur',culture:'Entdecken',food:'Essen',service:'Praktisch'};
  const categoryIcon={nature:'⌁',culture:'◇',food:'◌',service:'+'};

  function esc(value){return String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');}

  function enhancedGuideRender(){
    const grid=document.querySelector('#guideGrid');
    if(!grid || typeof guideItems==='undefined' || typeof appState==='undefined') return;
    const items=appState.guideFilter==='all'?guideItems:guideItems.filter(item=>item.category===appState.guideFilter);
    grid.innerHTML=items.map(item=>`<article class="guide-card guide-card-${esc(item.category)}"><div class="guide-card-top"><span class="guide-symbol">${categoryIcon[item.category]||'•'}</span><span class="guide-kicker">${esc(categoryLabel[item.category]||item.category)} · ${esc(item.kicker)}</span></div><h2>${esc(item.title)}</h2><p>${esc(item.text)}</p><div class="guide-meta">${item.meta.map(value=>`<span>${esc(value)}</span>`).join('')}</div><a class="guide-card-link" href="${esc(item.url)}" target="_blank" rel="noreferrer">mehr erfahren <b>↗</b></a></article>`).join('');
  }

  try{renderGuide=enhancedGuideRender;}catch{}

  function relocateExperienceHub(){
    const guide=document.querySelector('[data-view="guide"]');
    const hub=document.querySelector('#stayExperiences');
    const filters=guide?.querySelector('.filter-row');
    if(!guide||!hub||!filters)return false;

    hub.classList.add('guide-experience-hub');
    const intro=hub.querySelector('.stay-experiences-intro');
    if(intro){
      intro.querySelector('.card-label')?.replaceChildren(document.createTextNode('Entdecken'));
      const h2=intro.querySelector('h2');if(h2)h2.textContent='Essen, trinken, erleben.';
      const p=intro.querySelector('p');if(p)p.textContent='Unsere kuratierte Waldhaus-Auswahl für gute Adressen und besondere Erlebnisse rund um Kerschenbach.';
      intro.querySelector('#stayMoreTips')?.remove();
    }
    const note=hub.querySelector('.stay-experience-note');
    if(note)note.textContent='Mit den Pfeilen, per Maus-Drag oder auf Handy und Tablet direkt per Swipe bedienen. Öffnungszeiten und Saisonbetrieb bitte vor der Abfahrt über den jeweiligen Link prüfen.';

    guide.querySelector('.page-hero').insertAdjacentElement('afterend',hub);

    if(!guide.querySelector('.guide-directory-heading')){
      const heading=document.createElement('section');
      heading.className='content-section guide-directory-heading';
      heading.innerHTML='<div><span class="card-label">Mehr entdecken</span><h2>Weitere Tipps für eure Auszeit.</h2><p>Natur, Ausflüge und alles Praktische – im gleichen ruhigen Waldhaus-Look.</p></div>';
      filters.insertAdjacentElement('beforebegin',heading);
    }
    enhancedGuideRender();
    return true;
  }

  function boot(){
    enhancedGuideRender();
    let tries=0;
    const timer=setInterval(()=>{
      tries++;
      if(relocateExperienceHub()||tries>30)clearInterval(timer);
    },50);
  }

  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,90),{once:true}):setTimeout(boot,90);
})();
