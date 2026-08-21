const appState = {
  view: 'home',
  brand: localStorage.getItem('waldhaus2.brand') || 'Waldhaus',
  accent: localStorage.getItem('waldhaus2.accent') || 'forest',
  weather: { temp: 19, code: 1, live: false },
  installPrompt: null,
  guideFilter: 'all',
  checkout: JSON.parse(localStorage.getItem('waldhaus2.checkout') || '{}')
};

const guideItems = [
  { category:'nature', kicker:'Direkt ab Kerschenbach', title:'Arnika-Route KB 3', text:'Leichte 7-km-Rundtour Richtung Kronenburg – Natur, Aussicht und ein starker Einstieg in die Region.', meta:['7,0 km','ca. 1:50 h','leicht'], url:'https://www.eifel.info/touren/kerschenbach-kb3' },
  { category:'culture', kicker:'Historische Eifel', title:'Kronenburg', text:'Historischer Burgort auf dem Bergkegel mit alten Gassen, Wehranlage und Blick in die Eifellandschaft.', meta:['Ausflug','Spaziergang','Kronenburger See'], url:'https://www.eifel.info/pois/kronenburg' },
  { category:'nature', kicker:'Stadtkyll', title:'Kyllpark', text:'Entspannt am Wasser, kurze Runde durch den Park oder Startpunkt für eine kleine Radtour auf dem Kyllradweg.', meta:['Park','Wasser','Radweg'], url:'https://www.eifel.info/en/pois/kurpark-stadtkyll' },
  { category:'service', kicker:'Gut vorbereitet', title:'Tourist-Information Stadtkyll', text:'Wanderkarten, aktuelle Ausflugstipps, Tickets und persönliche Beratung direkt in Stadtkyll.', meta:['Infos','Karten','Tickets'], url:'https://www.eifel.info/pois/tourist-information-oberes-kylltal' },
  { category:'nature', kicker:'Kerschenbach', title:'Freizeitfläche & Schutzhütte', text:'Rastplatz, Übersichtskarte des Naturparks und Sinnesliege – ideal für einen kurzen Spaziergang ohne große Planung.', meta:['nah','Picknick','Naturpark'], url:'https://www.eifel.info/pois/wanderschutzhuette-kerschenbach' },
  { category:'service', kicker:'Waldhaus Tipp', title:'Einfach spontan bleiben', text:'Das Wetter kippt? In der App können Empfehlungen automatisch angepasst werden – ohne dass der Gast lange suchen muss.', meta:['wetterabhängig','persönlich','aktuell'], url:'' }
];

const checkoutItems = [
  ['dishes','Küche kurz zurücksetzen','Geschirr einräumen und Spülmaschine starten.'],
  ['waste','Müll mitnehmen','Restmüll und Recycling in die vorgesehenen Tonnen bringen.'],
  ['windows','Fenster & Türen','Fenster schließen und Terrassentür kontrollieren.'],
  ['fire','Kamin prüfen','Feuer vollständig aus, Asche sicher und Klappe geschlossen.'],
  ['heat','Heizung einstellen','Heizung auf die hinterlegte Abreise-Einstellung setzen.'],
  ['key','Schlüssel zurück','Schlüssel wieder in den Tresor legen und Code verdrehen.']
];

const sheetContent = {
  fireplace:{label:'Wohlfühlen',title:'Kamin sicher nutzen',html:'<ol><li>Luftzufuhr öffnen und trockenes Holz bereitlegen.</li><li>Anzünder und kleines Holz locker stapeln.</li><li>Nach dem Entzünden die Tür schließen und Zug beobachten.</li><li>Vor der Abreise prüfen, dass Feuer und Glut vollständig aus sind.</li></ol><p>In einer echten Hausversion ergänzen wir hier die konkrete Anleitung, Fotos und Besonderheiten Ihres Kamins.</p>'},
  heating:{label:'Technik',title:'Heizung ohne Rätsel',html:'<p>Für Gäste reichen wenige klare Regeln: Komforttemperatur, Nachtabsenkung und die Einstellung bei Abreise.</p><ul><li>Tagsüber: 20–21 °C</li><li>Nachts: 18–19 °C</li><li>Abreise: hinterlegte Eco-Einstellung</li></ul>'},
  waste:{label:'Alltag',title:'Müll & Recycling',html:'<p>Die Tonnen stehen in der vorgesehenen Müllzone am Grundstück. In der finalen Hausversion können hier Müllarten, Abholtage und ein Foto der Stellfläche hinterlegt werden.</p>'},
  emergency:{label:'Wichtig',title:'Notfall & Kontakte',html:'<p><strong>Notruf:</strong> 112</p><p><strong>Eigentümer:</strong> Kontakt wird individuell hinterlegt.</p><p><strong>Hausservice:</strong> Kontakt wird individuell hinterlegt.</p><p>So finden Gäste im Ernstfall alles sofort – ohne alte Nachrichten durchsuchen zu müssen.</p>'},
  appliances:{label:'Küche',title:'Geräte kurz erklärt',html:'<p>Statt Bedienungsanleitungen im Schrank: kurze, bildgestützte Schritte für Kaffeemaschine, Spülmaschine, Herd und weitere Geräte.</p><p>Für jedes Ferienhaus können genau die Geräte aufgenommen werden, die tatsächlich vor Ort stehen.</p>'}
};

function $(selector, root=document){ return root.querySelector(selector); }
function $$(selector, root=document){ return [...root.querySelectorAll(selector)]; }
function escapeHtml(value){ return String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }
function toLocalDate(date){ return new Intl.DateTimeFormat('de-DE',{weekday:'short',day:'2-digit',month:'short'}).format(date); }

function setDynamicTrip(){
  const start = new Date(); start.setDate(start.getDate()+1);
  const end = new Date(start); end.setDate(end.getDate()+3);
  const day = new Intl.DateTimeFormat('de-DE',{weekday:'short'}).format(start).replace('.','').toUpperCase();
  const date = new Intl.DateTimeFormat('de-DE',{day:'2-digit'}).format(start);
  const month = new Intl.DateTimeFormat('de-DE',{month:'short'}).format(start).replace('.','').toUpperCase();
  $('#tripDay').textContent = day;
  $('#tripDate').textContent = date;
  $('#tripMonth').textContent = month;
  $('#tripHeadline').textContent = 'Morgen geht\'s los.';
  $('#tripRange').textContent = `${new Intl.DateTimeFormat('de-DE',{day:'numeric',month:'long'}).format(start)}–${new Intl.DateTimeFormat('de-DE',{day:'numeric',month:'long'}).format(end)} · 3 Nächte`;
  $('#stayDateBadge').textContent = toLocalDate(start);
}

function setGreeting(){
  const hour = new Date().getHours();
  const word = hour < 11 ? 'Guten Morgen' : hour < 18 ? 'Guten Tag' : 'Guten Abend';
  $('#greeting').textContent = `${word}, Familie Becker.`;
}

function updateBrand(name){
  const clean = name.trim() || 'Waldhaus';
  appState.brand = clean;
  localStorage.setItem('waldhaus2.brand', clean);
  $$('[data-brand-name]').forEach(el => el.textContent = clean);
  $('#brandInput').value = clean;
  document.title = `${clean} · Gäste-App`;
}

function applyAccent(accent){
  appState.accent = accent;
  document.documentElement.dataset.accent = accent;
  localStorage.setItem('waldhaus2.accent', accent);
  $$('[data-accent-choice]').forEach(btn => btn.classList.toggle('is-active', btn.dataset.accentChoice === accent));
}

function navigate(view){
  appState.view = view;
  $$('.view').forEach(section => section.classList.toggle('is-active', section.dataset.view === view));
  $$('.nav-item,.mobile-nav-item').forEach(btn => btn.classList.toggle('is-active', btn.dataset.viewTarget === view));
  window.scrollTo({top:0,behavior:'smooth'});
}

function bindNavigation(){
  $$('[data-view-target]').forEach(btn => btn.addEventListener('click', () => navigate(btn.dataset.viewTarget)));
  $('#ownerSwitch').addEventListener('click', () => navigate('owner'));
  $('#backToGuest').addEventListener('click', () => navigate('home'));
  $('#salesGuestPreview').addEventListener('click', () => navigate('home'));
}

function weatherSymbol(code){
  if (code === 0) return '☀';
  if ([1,2].includes(code)) return '◐';
  if (code === 3) return '☁';
  if ([45,48].includes(code)) return '≋';
  if ([51,53,55,56,57,61,63,65,66,67,80,81,82].includes(code)) return '☂';
  if ([71,73,75,77,85,86].includes(code)) return '❄';
  if ([95,96,99].includes(code)) return 'ϟ';
  return '◐';
}

function weatherText(code){
  if (code <= 2) return 'Gutes Wetter für draußen.';
  if ([3,45,48].includes(code)) return 'Ruhig und eher bedeckt.';
  if ([51,53,55,61,63,65,80,81,82].includes(code)) return 'Regenschirm einpacken.';
  if ([71,73,75,77,85,86].includes(code)) return 'Winterwetter in der Eifel.';
  return 'Wetter im Blick behalten.';
}

function renderWeather(){
  const {temp,code,live} = appState.weather;
  const icon = weatherSymbol(code);
  $('#heroWeatherIcon').textContent = icon;
  $('#guideWeatherIcon').textContent = icon;
  $('#heroWeatherTemp').textContent = `${Math.round(temp)}°`;
  $('#guideWeatherTemp').textContent = `${Math.round(temp)}°`;
  $('#guideWeatherText').textContent = weatherText(code);
  const wet = [51,53,55,56,57,61,63,65,66,67,80,81,82,95,96,99].includes(code);
  $('#smartTipLabel').textContent = wet ? 'Wenn es draußen nass ist' : 'Bei gutem Wetter';
  $('#smartTipTitle').textContent = wet ? 'Ein entspannter Tag mit Plan B.' : 'Arnika-Route nach Kronenburg.';
  $('#smartTipText').textContent = wet ? 'Hauszeit genießen, später nach Stadtkyll – und die nächsten trockenen Stunden automatisch im Blick behalten.' : 'Leichte 7-km-Runde direkt aus Kerschenbach – Natur, Aussicht und historischer Ortskern.';
  if (!live) $('#guideWeatherText').textContent += ' · Demo';
}

async function loadWeather(){
  try {
    const geo = await fetch('https://geocoding-api.open-meteo.com/v1/search?name=Kerschenbach&count=5&language=de&format=json&countryCode=DE').then(r => r.json());
    const place = geo.results?.find(item => item.admin1 === 'Rheinland-Pfalz') || geo.results?.[0];
    if (!place) throw new Error('place');
    const data = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,weather_code&timezone=auto`).then(r => r.json());
    if (typeof data.current?.temperature_2m !== 'number') throw new Error('weather');
    appState.weather = {temp:data.current.temperature_2m, code:data.current.weather_code ?? 1, live:true};
  } catch (error) {
    appState.weather = {temp:19, code:1, live:false};
  }
  renderWeather();
}

function renderRecommendations(){
  const top = guideItems.slice(0,3);
  $('#homeRecommendations').innerHTML = top.map(item => `<article class="recommend-card"><small>${escapeHtml(item.kicker)}</small><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.meta.join(' · '))}</span></article>`).join('');
}

function renderGuide(){
  const items = appState.guideFilter === 'all' ? guideItems : guideItems.filter(item => item.category === appState.guideFilter);
  $('#guideGrid').innerHTML = items.map(item => `<article class="guide-card"><span class="guide-kicker">${escapeHtml(item.kicker)}</span><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.text)}</p><div class="guide-meta">${item.meta.map(value=>`<span>${escapeHtml(value)}</span>`).join('')}</div>${item.url ? `<a class="text-link" href="${item.url}" target="_blank" rel="noreferrer">Mehr erfahren ↗</a>` : `<button class="text-link" type="button" data-view-target="house">Hauszeit ansehen →</button>`}</article>`).join('');
  $$('[data-view-target]', $('#guideGrid')).forEach(btn => btn.addEventListener('click',()=>navigate(btn.dataset.viewTarget)));
}

function bindGuideFilters(){
  $$('[data-guide-filter]').forEach(btn => btn.addEventListener('click',()=>{
    appState.guideFilter = btn.dataset.guideFilter;
    $$('[data-guide-filter]').forEach(item=>item.classList.toggle('is-active',item===btn));
    renderGuide();
  }));
}

function renderCheckout(){
  $('#checkoutList').innerHTML = checkoutItems.map(([id,title,text])=>`<label class="checkout-item"><input type="checkbox" data-checkout-id="${id}" ${appState.checkout[id]?'checked':''}><span class="fake-check">✓</span><span><strong>${escapeHtml(title)}</strong><small>${escapeHtml(text)}</small></span></label>`).join('');
  $$('[data-checkout-id]').forEach(input=>input.addEventListener('change',()=>{
    appState.checkout[input.dataset.checkoutId]=input.checked;
    localStorage.setItem('waldhaus2.checkout',JSON.stringify(appState.checkout));
    updateCheckoutProgress();
  }));
  updateCheckoutProgress();
}

function updateCheckoutProgress(){
  const done = checkoutItems.filter(([id])=>appState.checkout[id]).length;
  const percent = Math.round((done/checkoutItems.length)*100);
  $('#checkoutPercent').textContent=`${percent}%`;
  $('#progressRing').style.setProperty('--progress',`${percent}%`);
}

function showToast(message){
  const toast=$('#toast'); toast.textContent=message; toast.classList.add('is-visible');
  clearTimeout(showToast.timer); showToast.timer=setTimeout(()=>toast.classList.remove('is-visible'),2200);
}

function bindHouse(){
  $('#copyWifi').addEventListener('click', async ()=>{
    const value=$('#wifiPassword').textContent;
    try{ await navigator.clipboard.writeText(value); showToast('WLAN-Passwort kopiert'); }
    catch{ showToast(`WLAN: ${value}`); }
  });
  $$('[data-sheet]').forEach(btn=>btn.addEventListener('click',()=>openSheet(btn.dataset.sheet)));
  $('#sheetClose').addEventListener('click',closeSheet);
  $('#sheetBackdrop').addEventListener('click',closeSheet);
  document.addEventListener('keydown',event=>{if(event.key==='Escape') closeSheet();});
}

function openSheet(key){
  const content=sheetContent[key]; if(!content) return;
  $('#sheetLabel').textContent=content.label; $('#sheetTitle').textContent=content.title; $('#sheetContent').innerHTML=content.html;
  $('#sheetBackdrop').hidden=false; $('#detailSheet').classList.add('is-open'); $('#detailSheet').setAttribute('aria-hidden','false');
}
function closeSheet(){ $('#detailSheet').classList.remove('is-open'); $('#detailSheet').setAttribute('aria-hidden','true'); $('#sheetBackdrop').hidden=true; }

function bindOwnerConfigurator(){
  $('#applyBrand').addEventListener('click',()=>{ updateBrand($('#brandInput').value); showToast('Hausname live übernommen'); });
  $('#brandInput').addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();$('#applyBrand').click();}});
  $$('[data-accent-choice]').forEach(btn=>btn.addEventListener('click',()=>{applyAccent(btn.dataset.accentChoice);showToast('Designstimmung angepasst');}));
}

function bindInstall(){
  window.addEventListener('beforeinstallprompt',event=>{ event.preventDefault(); appState.installPrompt=event; $('#installButton').style.display='grid'; });
  $('#installButton').addEventListener('click',async()=>{
    if(appState.installPrompt){ appState.installPrompt.prompt(); await appState.installPrompt.userChoice; appState.installPrompt=null; }
    else showToast('Im Browsermenü „Zum Startbildschirm“ wählen');
  });
  if('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('./service-worker.js').catch(()=>{});
}

function bindCheckoutFinish(){
  $('#finishCheckout').addEventListener('click',()=>{
    const done=checkoutItems.filter(([id])=>appState.checkout[id]).length;
    if(done<checkoutItems.length){ showToast(`Noch ${checkoutItems.length-done} Punkte offen`); return; }
    showToast('Alles erledigt · gute Heimfahrt ♥');
  });
}

function init(){
  updateBrand(appState.brand);
  applyAccent(appState.accent);
  setDynamicTrip();
  setGreeting();
  bindNavigation();
  bindGuideFilters();
  bindHouse();
  bindOwnerConfigurator();
  bindInstall();
  bindCheckoutFinish();
  renderRecommendations();
  renderGuide();
  renderCheckout();
  renderWeather();
  loadWeather();
}

function loadOwnerOps(){
  const script=document.createElement('script');
  script.src='owner-ops.js';
  script.defer=true;
  document.head.appendChild(script);
}

loadOwnerOps();
document.addEventListener('DOMContentLoaded',init);
