(() => {
  const STORAGE_KEY='waldhaus2.news';
  const mode=window.WALDHAUS_APP_MODE || {owner:false,demo:false};
  const oldAsset=name=>`https://raw.githubusercontent.com/hapo3005/Waldhaus/main/assets/${name}`;
  const defaults=[
    {id:'firewood',category:'Haus-Update',title:'Neues Kaminholz aufgefüllt',text:'Der Holzkorb und das Lager sind frisch aufgefüllt. Bitte trockenes Holz zuerst aus dem Innenkorb nehmen.',image:oldAsset('news-firewood.png')},
    {id:'wifi',category:'Hinweis',title:'WLAN-Daten geprüft',text:'Netzwerk und Passwort wurden kontrolliert. Die aktuellen Zugangsdaten stehen weiterhin im Bereich Anreise.',image:oldAsset('news-wifi.png')},
    {id:'terrace',category:'Garten',title:'Terrasse vorbereitet',text:'Die Sitzgruppe ist gereinigt und die Auflagen liegen wieder trocken im vorgesehenen Fach.',image:oldAsset('news-terrace.png')},
    {id:'heating',category:'Technik',title:'Heizung im Sommermodus',text:'Die Heizung ist saisonal angepasst. Bei kühlen Abenden bitte nur kurz manuell nachregeln.',image:oldAsset('news-heating.png')},
    {id:'emergency',category:'Hausbuch',title:'Neue Notfallinfos',text:'Die Notfallseite wurde als Grundgerüst angelegt. Telefonnummern und konkrete Kontakte können ergänzt werden.',image:oldAsset('news-emergency.png')},
    {id:'cleaning',category:'Reinigung',title:'Checkliste aktualisiert',text:'Die Übergabe-Checkliste steuert jetzt den Status auf Start und hilft bei einer klaren Abreise.',image:oldAsset('news-cleaning.png')},
    {id:'calendar',category:'Kalender',title:'Agenda vorbereitet',text:'Anfragen, Reservierungen und blockierte Zeiträume haben jetzt einen sichtbaren Platz im Kalender.',image:oldAsset('news-calendar.png')},
    {id:'admin',category:'Admin',title:'Platz für Neuigkeiten',text:'Hier können Eigentümer künftig aktuelle Meldungen für Gäste direkt veröffentlichen.',image:oldAsset('news-admin.png')}
  ];
  const originalNewsIds=new Set(['firewood','wifi','terrace','heating','emergency','cleaning','calendar','admin']);

  const safe=value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
  const uid=()=>crypto.randomUUID?.()||`news-${Date.now()}`;
  const upgradeOriginalImage=item=>{
    if(!item||typeof item!=='object')return item;
    if(!originalNewsIds.has(item.id))return item;
    const image=String(item.image||'');
    const expected=oldAsset(`news-${item.id}.png`);
    if(image===expected)return item;
    if(!image || image.includes(`/news-${item.id}.svg`) || image.includes(`/news-${item.id}.png`))return {...item,image:expected};
    return item;
  };
  const load=()=>{
    try{
      const raw=localStorage.getItem(STORAGE_KEY);
      if(raw){
        const parsed=JSON.parse(raw);
        if(Array.isArray(parsed)){
          const upgraded=parsed.map(upgradeOriginalImage);
          if(JSON.stringify(upgraded)!==JSON.stringify(parsed))localStorage.setItem(STORAGE_KEY,JSON.stringify(upgraded));
          return upgraded;
        }
      }
    }catch{}
    return defaults.map(item=>({...item}));
  };
  const state={items:load()};
  const persist=()=>localStorage.setItem(STORAGE_KEY,JSON.stringify(state.items));

  function ensureStyle(){
    if(document.querySelector('link[data-news-experience-style]'))return;
    const link=document.createElement('link');
    link.rel='stylesheet';link.href='news-experience.css?v=3';link.dataset.newsExperienceStyle='1';document.head.appendChild(link);
  }

  function go(view){
    document.querySelectorAll('.view').forEach(section=>section.classList.toggle('is-active',section.dataset.view===view));
    document.querySelectorAll('.nav-item,.mobile-nav-item').forEach(btn=>btn.classList.toggle('is-active',btn.dataset.viewTarget===view));
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function openNews(item){
    const sheet=document.querySelector('#detailSheet'),backdrop=document.querySelector('#sheetBackdrop');
    if(!sheet||!backdrop)return;
    const label=sheet.querySelector('#sheetLabel'),title=sheet.querySelector('#sheetTitle'),content=sheet.querySelector('#sheetContent');
    if(label)label.textContent=item.category||'Aktuelles';
    if(title)title.textContent=item.title;
    if(content)content.innerHTML=`<div class="news-sheet-media" style="--news-image:url('${safe(item.image||'')}')"></div><p>${safe(item.text)}</p>`;
    backdrop.hidden=false;sheet.classList.add('is-open');sheet.setAttribute('aria-hidden','false');
  }

  function card(item,compact=false){
    return `<button class="news-card${compact?' news-card-compact':''}" type="button" data-news-id="${safe(item.id)}"><span class="news-card-media" style="--news-image:url('${safe(item.image||'')}')"></span><span class="news-card-copy"><small>${safe(item.category||'Aktuelles')}</small><strong>${safe(item.title)}</strong><span>${safe(item.text)}</span><b>Mehr lesen →</b></span></button>`;
  }

  function bindCards(root=document){
    root.querySelectorAll('[data-news-id]').forEach(button=>button.onclick=()=>{const item=state.items.find(x=>x.id===button.dataset.newsId);if(item)openNews(item);});
  }

  function injectHome(){
    const home=document.querySelector('[data-view="home"]');
    if(!home)return;
    const hero=home.querySelector('.hero');
    const existing=home.querySelector('#homeNews');
    if(existing){
      if(hero&&existing.previousElementSibling!==hero)hero.insertAdjacentElement('afterend',existing);
      return;
    }
    const section=document.createElement('section');section.id='homeNews';section.className='content-section news-home';
    section.innerHTML=`<div class="section-heading news-heading"><div><span class="card-label">Aktuelles</span><h2>Neuigkeiten aus dem Waldhaus.</h2></div><button class="text-link" type="button" data-open-news-view>Alle Neuigkeiten →</button></div><div id="homeNewsGrid" class="news-home-grid"></div>`;
    if(hero)hero.insertAdjacentElement('afterend',section);else home.prepend(section);
    section.querySelector('[data-open-news-view]').onclick=()=>go('news');
  }

  function injectNewsView(){
    const main=document.querySelector('main');if(!main||main.querySelector('[data-view="news"]'))return;
    const owner=main.querySelector('[data-view="owner"]');
    const section=document.createElement('section');section.className='view news-view';section.dataset.view='news';
    section.innerHTML=`<div class="page-hero news-hero"><div><span class="eyebrow">Aktuelles aus dem Waldhaus</span><h1>Gut zu wissen, bevor ihr fragt.</h1><p>Neue Hinweise, kleine Änderungen und wichtige Informationen rund um Haus und Aufenthalt.</p></div><button class="button button-white" type="button" data-news-back>Zurück zum Start</button></div><section class="content-section news-all"><div class="news-all-head"><span class="card-label">Alle Meldungen</span><h2>Das ist neu.</h2></div><div id="newsAllGrid" class="news-all-grid"></div></section>`;
    owner?main.insertBefore(section,owner):main.appendChild(section);
    section.querySelector('[data-news-back]').onclick=()=>go('home');
  }

  function injectDesktopNav(){
    const nav=document.querySelector('.desktop-nav');if(!nav||nav.querySelector('[data-news-nav]'))return;
    const button=document.createElement('button');button.type='button';button.className='nav-item';button.dataset.newsNav='1';button.textContent='Aktuelles';button.onclick=()=>go('news');
    const guide=nav.querySelector('[data-view-target="guide"]');guide?nav.insertBefore(button,guide):nav.appendChild(button);
  }

  function injectOwner(){
    if(!mode.owner)return;
    const owner=document.querySelector('[data-view="owner"]');if(!owner||owner.querySelector('#ownerNewsManager'))return;
    const anchor=owner.querySelector('#ownerOps')||owner.querySelector('.owner-dashboard');if(!anchor)return;
    const section=document.createElement('section');section.id='ownerNewsManager';section.className='content-section owner-news-manager';
    section.innerHTML=`<div class="owner-news-head"><div><span class="card-label">Aktuelles</span><h2>Neuigkeiten veröffentlichen.</h2><p>Kurze Hinweise erscheinen direkt auf der Startseite und im vollständigen News-Bereich.</p></div></div><div class="owner-news-layout"><article class="card owner-news-form-card"><span class="card-label">Neue Meldung</span><form id="ownerNewsForm" class="owner-news-form"><label>Kategorie<input id="ownerNewsCategory" maxlength="28" placeholder="z. B. Haus-Update" required></label><label>Titel<input id="ownerNewsTitle" maxlength="80" placeholder="Was ist neu?" required></label><label>Text<textarea id="ownerNewsText" rows="4" maxlength="320" placeholder="Kurze Information für eure Gäste" required></textarea></label><button class="button button-primary" type="submit">Meldung veröffentlichen</button></form></article><article class="card owner-news-list-card"><span class="card-label">Veröffentlicht</span><div id="ownerNewsList" class="owner-news-list"></div></article></div>`;
    anchor.insertAdjacentElement('afterend',section);
    section.querySelector('#ownerNewsForm').onsubmit=event=>{
      event.preventDefault();
      const category=section.querySelector('#ownerNewsCategory').value.trim(),title=section.querySelector('#ownerNewsTitle').value.trim(),text=section.querySelector('#ownerNewsText').value.trim();
      if(!category||!title||!text)return;
      state.items.unshift({id:uid(),category,title,text,image:oldAsset('news-admin.png')});persist();event.target.reset();render();
      if(typeof window.showToast==='function')window.showToast('Neuigkeit veröffentlicht');
    };
  }

  function renderOwner(){
    const list=document.querySelector('#ownerNewsList');if(!list)return;
    list.innerHTML=state.items.length?state.items.map(item=>`<article class="owner-news-row"><div><small>${safe(item.category)}</small><strong>${safe(item.title)}</strong></div><button type="button" data-delete-news="${safe(item.id)}" aria-label="Meldung löschen">×</button></article>`).join(''):'<p class="owner-empty">Noch keine Meldungen.</p>';
    list.querySelectorAll('[data-delete-news]').forEach(button=>button.onclick=()=>{state.items=state.items.filter(item=>item.id!==button.dataset.deleteNews);persist();render();if(typeof window.showToast==='function')window.showToast('Neuigkeit entfernt');});
  }

  function render(){
    const home=document.querySelector('#homeNewsGrid');if(home){home.innerHTML=state.items.slice(0,3).map(item=>card(item,true)).join('');bindCards(home);}
    const all=document.querySelector('#newsAllGrid');if(all){all.innerHTML=state.items.map(item=>card(item)).join('');bindCards(all);}
    renderOwner();
  }

  function loadGuestSuccessExperience(){
    if(document.querySelector('script[data-guest-success-script]'))return;
    const script=document.createElement('script');
    script.src='guest-success-experience.js?v=1';
    script.defer=true;
    script.dataset.guestSuccessScript='1';
    document.head.appendChild(script);
  }

  function boot(){
    loadGuestSuccessExperience();
    ensureStyle();injectHome();injectNewsView();injectDesktopNav();injectOwner();render();
    let tries=0;const timer=setInterval(()=>{tries+=1;loadGuestSuccessExperience();injectHome();injectNewsView();injectDesktopNav();injectOwner();render();if((document.querySelector('#homeNews')&&(!mode.owner||document.querySelector('#ownerNewsManager')))||tries>30)clearInterval(timer);},80);
  }

  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();