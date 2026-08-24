(() => {
  const BKEY='waldhaus2.bookings';
  const RKEY='waldhaus2.requests';
  const DAY=86400000;
  const iso=d=>new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,10);
  const date=s=>new Date(`${s}T12:00:00`);
  const plus=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x;};
  const safe=v=>String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
  const load=key=>{try{const raw=localStorage.getItem(key);if(raw!==null){const value=JSON.parse(raw);return Array.isArray(value)?value:[];}}catch{}return[];};
  const today=()=>iso(new Date());
  const state={
    month:new Date(new Date().getFullYear(),new Date().getMonth(),1),
    bookings:load(BKEY),
    requests:load(RKEY),
    selectionStart:'',
    selectionEnd:''
  };

  function ensureStyle(){
    if(document.querySelector('link[data-guest-planner-style]'))return;
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='guest-planner.css?v=2';
    link.dataset.guestPlannerStyle='1';
    document.head.appendChild(link);
  }

  function go(view){
    document.querySelectorAll('.view').forEach(section=>section.classList.toggle('is-active',section.dataset.view===view));
    document.querySelectorAll('.nav-item,.mobile-nav-item').forEach(button=>button.classList.toggle('is-active',button.dataset.viewTarget===view));
    if(view==='planner'){
      refreshData();
      renderCalendar();
      renderRequestStatus();
    }
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function overlap(start,end){return state.bookings.some(item=>start<item.end&&end>item.start);}
  function refreshData(){state.bookings=load(BKEY);state.requests=load(RKEY);}
  function isBookedDay(value){return state.bookings.some(item=>value>=item.start&&value<item.end);}
  function isRequestedDay(value){return state.requests.some(item=>value>=item.start&&value<item.end);}

  function injectView(){
    const main=document.querySelector('main');
    if(!main||main.querySelector('[data-view="planner"]'))return;
    const owner=main.querySelector('[data-view="owner"]');
    const section=document.createElement('section');
    section.className='view guest-planner-view';
    section.dataset.view='planner';
    section.innerHTML=`
      <div class="page-hero guest-planner-hero">
        <div>
          <span class="eyebrow">Aufenthalt planen</span>
          <h1>Wann möchtet ihr ins Waldhaus?</h1>
          <p>Freie Zeiten prüfen, Wunschzeitraum auswählen und direkt eine Anfrage hinterlegen.</p>
        </div>
        <button class="button button-white" type="button" data-planner-back>Zurück zum Start</button>
      </div>
      <section class="content-section guest-planner-layout">
        <article class="card guest-calendar-card">
          <div class="guest-planner-card-head">
            <div><span class="card-label">Verfügbarkeit</span><h2 id="guestCalendarTitle"></h2></div>
            <div class="guest-calendar-controls"><button type="button" id="guestPrevMonth" aria-label="Vorheriger Monat">‹</button><button type="button" id="guestNextMonth" aria-label="Nächster Monat">›</button></div>
          </div>
          <div class="guest-weekdays" aria-hidden="true"><span>Mo</span><span>Di</span><span>Mi</span><span>Do</span><span>Fr</span><span>Sa</span><span>So</span></div>
          <div id="guestCalendar" class="guest-calendar" aria-label="Verfügbarkeitskalender"></div>
          <div class="guest-legend"><span><i></i>Frei</span><span><i class="booked"></i>Belegt</span><span><i class="requested"></i>Angefragt</span></div>
          <div class="guest-calendar-tip"><span aria-hidden="true">☝</span><p><strong>Zeitraum wählen:</strong> zuerst Anreise, dann Abreise antippen.</p></div>
          <div id="guestSelectionSummary" class="guest-selection-summary" aria-live="polite"></div>
        </article>

        <article class="card guest-request-card">
          <span class="card-label">Wunschzeitraum</span>
          <h2>Aufenthalt anfragen.</h2>
          <p class="guest-request-copy">Kalender antippen oder Anreise und Abreise direkt eintragen.</p>
          <form id="guestRequestForm" class="guest-request-form">
            <label>Name / Familie<input id="guestRequestName" maxlength="80" placeholder="z. B. Familie Müller" autocomplete="name" required></label>
            <div><label>Anreise<input id="guestRequestStart" type="date" required></label><label>Abreise<input id="guestRequestEnd" type="date" required></label></div>
            <label>Personen<input id="guestRequestGuests" type="number" min="1" max="20" value="2" inputmode="numeric" required></label>
            <label>Nachricht<textarea id="guestRequestNote" rows="4" maxlength="320" placeholder="Optional: flexible Anreise, Kinder, Hund …"></textarea></label>
            <button class="button button-primary" type="submit">Aufenthalt anfragen <span>→</span></button>
          </form>
          <div id="guestRequestFeedback" class="guest-request-feedback" aria-live="polite"></div>
          <div id="guestRequestStatus" class="guest-request-status" aria-live="polite"></div>
        </article>
      </section>`;
    owner?main.insertBefore(section,owner):main.appendChild(section);
    section.querySelector('[data-planner-back]').onclick=()=>go('home');
  }

  function injectAccessPoints(){
    const tripButton=document.querySelector('[data-view="home"] .trip-card > .text-link');
    if(tripButton){
      tripButton.dataset.viewTarget='planner';
      tripButton.textContent='Aufenthalt planen →';
      tripButton.onclick=event=>{event.preventDefault();event.stopPropagation();go('planner');};
    }

    const stayHero=document.querySelector('[data-view="stay"] .page-hero');
    if(stayHero&&!stayHero.querySelector('[data-open-planner]')){
      const button=document.createElement('button');
      button.type='button';
      button.className='button button-primary guest-planner-stay-cta';
      button.dataset.openPlanner='1';
      button.innerHTML='Kalender & Aufenthalt planen <span>→</span>';
      button.onclick=()=>go('planner');
      stayHero.appendChild(button);
    }

    const desktop=document.querySelector('.desktop-nav');
    if(desktop&&!desktop.querySelector('[data-planner-nav]')){
      const button=document.createElement('button');
      button.type='button';
      button.className='nav-item';
      button.dataset.plannerNav='1';
      button.textContent='Planen';
      button.onclick=()=>go('planner');
      const stay=desktop.querySelector('[data-view-target="stay"]');
      stay?desktop.insertBefore(button,stay):desktop.appendChild(button);
    }
  }

  function selectionClass(value){
    if(!state.selectionStart)return '';
    if(value===state.selectionStart)return ' is-selected-start';
    if(state.selectionEnd&&value===state.selectionEnd)return ' is-selected-end';
    if(state.selectionEnd&&value>state.selectionStart&&value<state.selectionEnd)return ' is-selected-range';
    return '';
  }

  function renderSelectionSummary(){
    const target=document.querySelector('#guestSelectionSummary');
    if(!target)return;
    if(!state.selectionStart){target.innerHTML='<span>Noch kein Zeitraum gewählt.</span>';return;}
    const startLabel=new Intl.DateTimeFormat('de-DE',{weekday:'short',day:'2-digit',month:'short'}).format(date(state.selectionStart));
    if(!state.selectionEnd){target.innerHTML=`<strong>${safe(startLabel)}</strong><span>als Anreise gewählt · jetzt Abreise antippen</span>`;return;}
    const endLabel=new Intl.DateTimeFormat('de-DE',{weekday:'short',day:'2-digit',month:'short'}).format(date(state.selectionEnd));
    const nights=Math.max(1,Math.round((date(state.selectionEnd)-date(state.selectionStart))/DAY));
    target.innerHTML=`<strong>${safe(startLabel)} → ${safe(endLabel)}</strong><span>${nights} ${nights===1?'Nacht':'Nächte'} ausgewählt</span>`;
  }

  function renderCalendar(){
    refreshData();
    const grid=document.querySelector('#guestCalendar');
    const title=document.querySelector('#guestCalendarTitle');
    if(!grid||!title)return;
    const y=state.month.getFullYear(),m=state.month.getMonth(),first=new Date(y,m,1),start=plus(first,-((first.getDay()+6)%7)),now=today();
    title.textContent=new Intl.DateTimeFormat('de-DE',{month:'long',year:'numeric'}).format(state.month);
    grid.innerHTML=Array.from({length:42},(_,index)=>{
      const d=plus(start,index),value=iso(d);
      const booked=isBookedDay(value),requested=!booked&&isRequestedDay(value),past=value<now;
      const classes=['guest-day'];
      if(d.getMonth()!==m)classes.push('outside');
      if(value===now)classes.push('today');
      if(past)classes.push('is-past');
      if(booked)classes.push('has-booking');else if(requested)classes.push('has-request');
      const selected=selectionClass(value);
      const stateLabel=booked?'belegt':requested?'angefragt':'frei';
      return `<button class="${classes.join(' ')}${selected}" type="button" data-guest-date="${value}" ${past?'disabled':''} aria-label="${safe(new Intl.DateTimeFormat('de-DE',{weekday:'long',day:'2-digit',month:'long',year:'numeric'}).format(d))}, ${stateLabel}" aria-pressed="${selected?'true':'false'}"><span>${d.getDate()}</span>${booked||requested?'<i></i>':''}</button>`;
    }).join('');
    grid.querySelectorAll('[data-guest-date]:not(:disabled)').forEach(button=>button.onclick=()=>pickDate(button.dataset.guestDate));
    renderSelectionSummary();
  }

  function pickDate(value){
    refreshData();
    clearFeedback();
    if(value<today())return;

    if(!state.selectionStart||state.selectionEnd){
      if(isBookedDay(value)){showStatus('Dieser Tag ist bereits belegt. Bitte wählt einen freien Anreisetag.','error');return;}
      state.selectionStart=value;
      state.selectionEnd='';
    }else if(value<=state.selectionStart){
      if(isBookedDay(value)){showStatus('Dieser Tag ist bereits belegt. Bitte wählt einen freien Anreisetag.','error');return;}
      state.selectionStart=value;
      state.selectionEnd='';
    }else{
      if(overlap(state.selectionStart,value)){
        showStatus('Zwischen Anreise und Abreise liegt bereits eine Belegung. Bitte wählt einen anderen Zeitraum.','error');
        return;
      }
      state.selectionEnd=value;
    }

    syncFormFromSelection();
    renderCalendar();
  }

  function syncFormFromSelection(){
    const start=document.querySelector('#guestRequestStart'),end=document.querySelector('#guestRequestEnd');
    if(!start||!end)return;
    start.value=state.selectionStart||'';
    end.value=state.selectionEnd||'';
    start.min=today();
    end.min=state.selectionStart?iso(plus(date(state.selectionStart),1)):today();
  }

  function syncSelectionFromForm(){
    const start=document.querySelector('#guestRequestStart'),end=document.querySelector('#guestRequestEnd');
    if(!start||!end)return;
    state.selectionStart=start.value||'';
    state.selectionEnd=end.value&&end.value>state.selectionStart?end.value:'';
    end.min=state.selectionStart?iso(plus(date(state.selectionStart),1)):today();
    if(state.selectionStart){
      const d=date(state.selectionStart);
      state.month=new Date(d.getFullYear(),d.getMonth(),1);
    }
    renderCalendar();
  }

  function renderRequestStatus(){
    const target=document.querySelector('#guestRequestStatus');
    if(!target)return;
    refreshData();
    const own=state.requests.filter(item=>item.createdBy==='guest-planner').sort((a,b)=>String(b.createdAt||'').localeCompare(String(a.createdAt||''))).slice(0,2);
    target.innerHTML=own.length?`<span class="card-label">Eure Anfrage${own.length>1?'n':''}</span>${own.map(item=>`<article><strong>${safe(item.guest)}</strong><span>${new Intl.DateTimeFormat('de-DE',{day:'2-digit',month:'2-digit'}).format(date(item.start))}–${new Intl.DateTimeFormat('de-DE',{day:'2-digit',month:'2-digit'}).format(date(item.end))} · ${safe(item.guests)} Pers.</span><small>angefragt</small></article>`).join('')}`:'';
  }

  function prepareDateInputs(){
    const start=document.querySelector('#guestRequestStart'),end=document.querySelector('#guestRequestEnd');
    if(!start||!end)return;
    start.min=today();
    end.min=today();
  }

  function bind(){
    const prev=document.querySelector('#guestPrevMonth'),next=document.querySelector('#guestNextMonth'),form=document.querySelector('#guestRequestForm'),start=document.querySelector('#guestRequestStart'),end=document.querySelector('#guestRequestEnd');
    if(!prev||prev.dataset.bound==='1')return;
    prev.dataset.bound='1';
    prepareDateInputs();
    prev.onclick=()=>{state.month=new Date(state.month.getFullYear(),state.month.getMonth()-1,1);renderCalendar();};
    next.onclick=()=>{state.month=new Date(state.month.getFullYear(),state.month.getMonth()+1,1);renderCalendar();};
    start.onchange=()=>{clearFeedback();if(start.value<today())start.value=today();if(start.value&&end.value&&end.value<=start.value)end.value='';syncSelectionFromForm();};
    end.onchange=()=>{clearFeedback();syncSelectionFromForm();};
    form.onsubmit=event=>{
      event.preventDefault();
      refreshData();
      const item={
        id:crypto.randomUUID?.()||`request-${Date.now()}`,
        guest:document.querySelector('#guestRequestName').value.trim(),
        guests:+document.querySelector('#guestRequestGuests').value||1,
        start:start.value,
        end:end.value,
        note:document.querySelector('#guestRequestNote').value.trim(),
        createdBy:'guest-planner',
        createdAt:new Date().toISOString()
      };
      if(!item.guest)return;
      if(!item.start||!item.end||item.end<=item.start){showStatus('Bitte wählt Anreise und Abreise aus.','error');return;}
      if(item.start<today()){showStatus('Die Anreise kann nicht in der Vergangenheit liegen.','error');return;}
      if(overlap(item.start,item.end)){showStatus('Dieser Zeitraum überschneidet sich mit einer bestehenden Belegung. Bitte wählt einen anderen Zeitraum.','error');return;}
      state.requests.push(item);
      localStorage.setItem(RKEY,JSON.stringify(state.requests));
      form.reset();
      document.querySelector('#guestRequestGuests').value=2;
      state.selectionStart='';
      state.selectionEnd='';
      prepareDateInputs();
      renderCalendar();
      renderRequestStatus();
      showStatus('Anfrage gespeichert. Euer Wunschzeitraum ist jetzt im Kalender als angefragt markiert.','success');
      window.dispatchEvent(new CustomEvent('waldhaus2:request-updated',{detail:item}));
    };
  }

  function clearFeedback(){
    const target=document.querySelector('#guestRequestFeedback');
    if(target)target.innerHTML='';
  }

  function showStatus(message,type){
    const target=document.querySelector('#guestRequestFeedback');
    if(!target)return;
    target.innerHTML=`<p class="guest-request-message ${type==='error'?'is-error':'is-success'}">${safe(message)}</p>`;
  }

  function boot(){
    ensureStyle();
    injectView();
    injectAccessPoints();
    bind();
    renderCalendar();
    renderRequestStatus();
    let tries=0;
    const timer=setInterval(()=>{
      tries+=1;
      injectView();
      injectAccessPoints();
      bind();
      renderCalendar();
      if((document.querySelector('[data-view="planner"]')&&document.querySelector('[data-view="home"] .trip-card > .text-link'))||tries>40)clearInterval(timer);
    },80);
  }

  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();