(() => {
  const guideStyles=document.createElement('link');
  guideStyles.rel='stylesheet';
  guideStyles.href='guide-experience.css';
  document.head.appendChild(guideStyles);

  const verifiedScript=document.createElement('script');
  verifiedScript.src='verified-content.js';
  verifiedScript.defer=true;
  verifiedScript.addEventListener('load',()=>{
    const guideScript=document.createElement('script');
    guideScript.src='guide-experience.js';
    guideScript.defer=true;
    document.head.appendChild(guideScript);
  },{once:true});
  document.head.appendChild(verifiedScript);

  const BKEY='waldhaus2.bookings', RKEY='waldhaus2.requests', DAY=86400000;
  const mode=window.WALDHAUS_APP_MODE || {demo:false,owner:false};
  const iso=d=>new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,10);
  const date=s=>new Date(`${s}T12:00:00`);
  const plus=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x;};
  const safe=v=>String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
  const load=key=>{try{const raw=localStorage.getItem(key);if(raw!==null){const v=JSON.parse(raw);return Array.isArray(v)?v:[];}}catch{}return[];};
  const demoBookings=()=>{const a=plus(new Date(),1),b=plus(new Date(),12);return[
    {id:'demo-becker',guest:'Familie Becker',guests:4,start:iso(a),end:iso(plus(a,3)),source:'Direkt'},
    {id:'demo-schmitz',guest:'Familie Schmitz',guests:2,start:iso(b),end:iso(plus(b,4)),source:'Booking'}
  ];};
  const demoRequests=()=>{const a=plus(new Date(),22);return[{id:'demo-weber',guest:'Familie Weber',guests:3,start:iso(a),end:iso(plus(a,3)),note:'Wochenende in der Eifel'}];};
  const cleanDemoRows=rows=>mode.demo ? rows : rows.filter(x=>!String(x.id||'').startsWith('demo-'));
  const existingBookings=cleanDemoRows(load(BKEY));
  const existingRequests=cleanDemoRows(load(RKEY));
  const state={month:new Date(new Date().getFullYear(),new Date().getMonth(),1),bookings:mode.demo&&!existingBookings.length?demoBookings():existingBookings,requests:mode.demo&&!existingRequests.length?demoRequests():existingRequests};
  const persist=()=>{localStorage.setItem(BKEY,JSON.stringify(state.bookings));localStorage.setItem(RKEY,JSON.stringify(state.requests));};
  if(!mode.demo)persist();
  const upcoming=()=>state.bookings.filter(x=>x.end>=iso(new Date())).sort((a,b)=>a.start.localeCompare(b.start));
  const overlap=(a,b)=>state.bookings.some(x=>a<x.end&&b>x.start);
  const nights=x=>Math.max(1,Math.round((date(x.end)-date(x.start))/DAY));
  const fmt=s=>new Intl.DateTimeFormat('de-DE',{day:'2-digit',month:'2-digit'}).format(date(s));
  const toast=m=>{if(typeof window.showToast==='function')return window.showToast(m);const t=document.querySelector('#toast');if(t){t.textContent=m;t.classList.add('is-visible');setTimeout(()=>t.classList.remove('is-visible'),2200);}};

  function cleanVisiblePlaceholders(){
    if(mode.demo)return;
    const wifi=document.querySelector('#wifiPassword');
    const copy=document.querySelector('#copyWifi');
    if(wifi?.textContent.trim()==='eifelzeit26')wifi.textContent='noch nicht hinterlegt';
    if(copy && wifi?.textContent.trim()==='noch nicht hinterlegt'){copy.disabled=true;copy.textContent='Offen';copy.title='WLAN-Zugangsdaten müssen noch hinterlegt werden';}
  }

  function inject(){
    if(document.querySelector('#ownerOps'))return;
    const view=document.querySelector('[data-view="owner"]'),dash=view?.querySelector('.owner-dashboard');if(!dash)return;
    const link=document.createElement('link');link.rel='stylesheet';link.href='owner-ops.css';document.head.appendChild(link);
    const stats=dash.querySelectorAll('.owner-stat');
    if(stats[0]){stats[0].querySelector('strong').id='ownerStayCount';stats[0].querySelector('span').textContent='im Blick';}
    if(stats[1]){stats[1].querySelector('small').textContent='Offene Anfragen';stats[1].querySelector('strong').id='ownerRequestCount';stats[1].querySelector('span').textContent='noch zu entscheiden';}
    if(!mode.demo&&stats[2]){stats[2].querySelector('small').textContent='Gästeansicht';stats[2].querySelector('strong').textContent='Aktiv';stats[2].querySelector('span').textContent='Hauswissen gebündelt';}
    if(!mode.demo&&stats[3]){stats[3].querySelector('small').textContent='App';stats[3].querySelector('strong').textContent='PWA';stats[3].querySelector('span').textContent='installierbar & mobil';}
    const s=document.createElement('section');s.id='ownerOps';s.className='content-section owner-ops';s.innerHTML=`
      <div class="owner-ops-head"><span class="card-label">Übersicht</span><h2>Belegung & Anfragen.</h2><p>Freie Zeiten sehen, Anfragen entscheiden und Aufenthalte eintragen – ohne unnötige Verwaltung.</p></div>
      <div class="owner-ops-grid">
        <article class="card owner-calendar-card"><div class="owner-card-head"><div><span class="card-label">Belegung</span><h3 id="ownerCalendarTitle"></h3></div><div><button id="ownerPrevMonth" aria-label="Vorheriger Monat">‹</button><button id="ownerNextMonth" aria-label="Nächster Monat">›</button></div></div><div class="owner-weekdays"><span>Mo</span><span>Di</span><span>Mi</span><span>Do</span><span>Fr</span><span>Sa</span><span>So</span></div><div id="ownerCalendar" class="owner-calendar"></div><div class="owner-legend"><span><i class="booked"></i>Belegt</span><span><i></i>Anfrage</span></div></article>
        <article class="card"><span class="card-label">Nächste Aufenthalte</span><h3>Wer kommt als Nächstes?</h3><div id="ownerBookingList" class="owner-list"></div></article>
        <article class="card"><span class="card-label">Anfragen</span><h3>Offen & schnell entschieden.</h3><div id="ownerRequestList" class="owner-list"></div></article>
        <article class="card"><span class="card-label">Aufenthalt eintragen</span><h3>In wenigen Sekunden erledigt.</h3><form id="ownerBookingForm" class="owner-form"><label>Gast / Familie<input id="ownerGuest" required placeholder="z. B. Familie Müller"></label><div><label>Von<input id="ownerStart" type="date" required></label><label>Bis<input id="ownerEnd" type="date" required></label></div><div><label>Personen<input id="ownerGuests" type="number" min="1" max="20" value="2" required></label><label>Quelle<select id="ownerSource"><option>Direkt</option><option>Booking</option><option>Airbnb</option><option>Privat</option></select></label></div><button class="button button-primary">Aufenthalt speichern</button></form></article>
      </div>`;
    dash.insertAdjacentElement('afterend',s);
  }

  function renderCalendar(){
    const grid=document.querySelector('#ownerCalendar'),title=document.querySelector('#ownerCalendarTitle');if(!grid||!title)return;
    const y=state.month.getFullYear(),m=state.month.getMonth(),first=new Date(y,m,1),start=plus(first,-((first.getDay()+6)%7)),today=iso(new Date());
    title.textContent=new Intl.DateTimeFormat('de-DE',{month:'long',year:'numeric'}).format(state.month);
    grid.innerHTML=Array.from({length:42},(_,i)=>{const d=plus(start,i),s=iso(d),b=state.bookings.some(x=>s>=x.start&&s<x.end),r=state.requests.some(x=>s>=x.start&&s<x.end),c=['owner-day'];if(d.getMonth()!==m)c.push('outside');if(s===today)c.push('today');if(b)c.push('has-booking');else if(r)c.push('has-request');return`<div class="${c.join(' ')}"><span>${d.getDate()}</span>${b||r?'<i></i>':''}</div>`;}).join('');
  }

  function renderLists(){
    const bl=document.querySelector('#ownerBookingList'),rl=document.querySelector('#ownerRequestList');if(!bl||!rl)return;
    const b=upcoming().slice(0,5);bl.innerHTML=b.length?b.map(x=>`<article class="owner-item"><div><strong>${safe(x.guest)}</strong><span>${fmt(x.start)}–${fmt(x.end)} · ${nights(x)} Nächte · ${x.guests} Pers.</span></div><div><small>${safe(x.source||'Direkt')}</small><button data-del-booking="${safe(x.id)}" aria-label="Aufenthalt entfernen">×</button></div></article>`).join(''):'<p class="owner-empty">Noch keine kommenden Aufenthalte.</p>';
    rl.innerHTML=state.requests.length?state.requests.map(x=>`<article class="owner-item"><div><strong>${safe(x.guest)}</strong><span>${fmt(x.start)}–${fmt(x.end)} · ${x.guests} Pers.</span></div><div><button class="confirm" data-confirm="${safe(x.id)}">Bestätigen</button><button data-del-request="${safe(x.id)}" aria-label="Anfrage entfernen">×</button></div></article>`).join(''):'<p class="owner-empty">Keine offenen Anfragen.</p>';
    document.querySelectorAll('[data-del-booking]').forEach(b=>b.onclick=()=>{state.bookings=state.bookings.filter(x=>x.id!==b.dataset.delBooking);persist();render();toast('Aufenthalt entfernt');});
    document.querySelectorAll('[data-del-request]').forEach(b=>b.onclick=()=>{state.requests=state.requests.filter(x=>x.id!==b.dataset.delRequest);persist();render();toast('Anfrage entfernt');});
    document.querySelectorAll('[data-confirm]').forEach(b=>b.onclick=()=>{const r=state.requests.find(x=>x.id===b.dataset.confirm);if(!r)return;if(overlap(r.start,r.end))return toast('Zeitraum ist bereits belegt');state.bookings.push({...r,source:'Direkt'});state.requests=state.requests.filter(x=>x.id!==r.id);persist();render();toast('Anfrage bestätigt');});
  }

  function syncGuest(){
    const x=upcoming()[0];
    if(!x){if(mode.demo)return;const avatars=document.querySelector('.avatar-row');if(avatars)avatars.innerHTML='<span>+</span><small>Aufenthalt wird hier angezeigt</small>';return;}
    const s=date(x.start),e=date(x.end),days=Math.round((s-date(iso(new Date())))/DAY),set=(q,v)=>{const el=document.querySelector(q);if(el)el.textContent=v;};
    set('#tripDay',new Intl.DateTimeFormat('de-DE',{weekday:'short'}).format(s).replace('.','').toUpperCase());set('#tripDate',new Intl.DateTimeFormat('de-DE',{day:'2-digit'}).format(s));set('#tripMonth',new Intl.DateTimeFormat('de-DE',{month:'short'}).format(s).replace('.','').toUpperCase());set('#tripHeadline',days<=0?'Eure Auszeit läuft.':days===1?'Morgen geht\'s los.':`Noch ${days} Tage.`);set('#tripRange',`${new Intl.DateTimeFormat('de-DE',{day:'numeric',month:'long'}).format(s)}–${new Intl.DateTimeFormat('de-DE',{day:'numeric',month:'long'}).format(e)} · ${nights(x)} Nächte`);set('#stayDateBadge',new Intl.DateTimeFormat('de-DE',{weekday:'short',day:'2-digit',month:'short'}).format(s));
    const avatars=document.querySelector('.avatar-row');if(avatars)avatars.innerHTML=`<span>✓</span><small>${x.guests} Gäste</small>`;
    const g=document.querySelector('#greeting');if(g){const h=new Date().getHours(),w=h<11?'Guten Morgen':h<18?'Guten Tag':'Guten Abend';g.textContent=`${w}, ${x.guest}.`;}
    const pill=document.querySelector('.status-pill');if(pill)pill.innerHTML='<i></i> Aufenthalt vorbereitet';
  }

  function render(){const a=document.querySelector('#ownerStayCount'),r=document.querySelector('#ownerRequestCount');if(a)a.textContent=upcoming().length;if(r)r.textContent=state.requests.length;renderCalendar();renderLists();syncGuest();}

  function bind(){
    document.querySelector('#ownerPrevMonth').onclick=()=>{state.month=new Date(state.month.getFullYear(),state.month.getMonth()-1,1);renderCalendar();};
    document.querySelector('#ownerNextMonth').onclick=()=>{state.month=new Date(state.month.getFullYear(),state.month.getMonth()+1,1);renderCalendar();};
    const start=document.querySelector('#ownerStart'),end=document.querySelector('#ownerEnd'),form=document.querySelector('#ownerBookingForm'),seed=()=>{const a=plus(new Date(),7);start.value=iso(a);end.value=iso(plus(a,3));};seed();
    start.onchange=()=>{if(start.value&&(!end.value||end.value<=start.value))end.value=iso(plus(date(start.value),3));};
    form.onsubmit=e=>{e.preventDefault();const x={id:crypto.randomUUID?.()||`b-${Date.now()}`,guest:document.querySelector('#ownerGuest').value.trim(),guests:+document.querySelector('#ownerGuests').value||1,start:start.value,end:end.value,source:document.querySelector('#ownerSource').value};if(x.end<=x.start)return toast('Abreise muss nach der Anreise liegen');if(overlap(x.start,x.end))return toast('Zeitraum ist bereits belegt');state.bookings.push(x);persist();form.reset();document.querySelector('#ownerGuests').value=2;document.querySelector('#ownerSource').value='Direkt';seed();render();toast('Aufenthalt gespeichert');};
  }

  function init(){cleanVisiblePlaceholders();inject();if(!document.querySelector('#ownerOps'))return;bind();render();}
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init,{once:true}):init();
})();