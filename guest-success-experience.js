(() => {
  const RKEY='waldhaus2.requests';
  const DAY=86400000;
  let activeSuccessId='';

  const safe=value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
  const loadRequests=()=>{try{const raw=localStorage.getItem(RKEY);const value=raw?JSON.parse(raw):[];return Array.isArray(value)?value:[];}catch{return[];}};
  const date=value=>new Date(`${value}T12:00:00`);
  const isPending=item=>(item?.status||'pending')==='pending';
  const fmtLong=value=>new Intl.DateTimeFormat('de-DE',{day:'numeric',month:'long',year:'numeric'}).format(date(value));
  const fmtShort=value=>new Intl.DateTimeFormat('de-DE',{day:'2-digit',month:'short'}).format(date(value));
  const nights=item=>Math.max(1,Math.round((date(item.end)-date(item.start))/DAY));

  function ensureStyle(){
    if(document.querySelector('link[data-guest-success-style]'))return;
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='guest-success-experience.css?v=1';
    link.dataset.guestSuccessStyle='1';
    document.head.appendChild(link);
  }

  function go(view){
    document.querySelectorAll('.view').forEach(section=>section.classList.toggle('is-active',section.dataset.view===view));
    document.querySelectorAll('.nav-item,.mobile-nav-item').forEach(button=>button.classList.toggle('is-active',button.dataset.viewTarget===view));
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function latestPending(){
    return loadRequests()
      .filter(item=>item.createdBy==='guest-planner'&&isPending(item))
      .sort((a,b)=>String(b.createdAt||'').localeCompare(String(a.createdAt||'')))[0]||null;
  }

  function calendarIcon(){
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v3m10-3v3M4 9h16M5.5 5.5h13A1.5 1.5 0 0 1 20 7v11.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5V7a1.5 1.5 0 0 1 1.5-1.5Z"/></svg>';
  }

  function checkIcon(){
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6.5 12.5 3.3 3.3 7.7-8"/></svg>';
  }

  function homeIcon(){
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 11 8-7 8 7v9h-5v-6H9v6H4Z"/></svg>';
  }

  function compassIcon(){
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1 5.1-2.1Z"/></svg>';
  }

  function forestMark(){
    return '<svg viewBox="0 0 220 150" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2"><path d="M70 126h82V78l-41-36-41 36v48Z"/><path d="m58 85 53-51 53 51M96 126V96h30v30M145 67l20-32 20 32h-13l18 29h-17l17 28M50 70l-17-29-17 29h12L10 99h16L10 126M177 126h28M18 126h37"/><path d="M82 78h58M111 42v36"/></g></svg>';
  }

  function renderPersistentCard(){
    const requestCard=document.querySelector('[data-view="planner"] .guest-request-card');
    if(!requestCard)return;
    const existing=requestCard.querySelector('.guest-pending-card');
    const status=requestCard.querySelector('#guestRequestStatus');
    const item=latestPending();
    if(!item){
      existing?.remove();
      if(status)status.hidden=false;
      return;
    }

    const card=existing||document.createElement('section');
    card.className='guest-pending-card';
    card.setAttribute('aria-label','Eure offene Anfrage');
    card.innerHTML=`
      <div class="guest-pending-card-copy">
        <span class="guest-pending-kicker">Eure Anfrage</span>
        <strong>${safe(fmtShort(item.start))}–${safe(fmtShort(item.end))} · ${safe(item.guests)} ${Number(item.guests)===1?'Person':'Personen'}</strong>
        <small><i></i> Wir prüfen euren Wunschzeitraum</small>
      </div>
      <span class="guest-pending-calendar">${calendarIcon()}</span>`;
    if(!existing)requestCard.insertBefore(card,requestCard.firstChild);
    if(status)status.hidden=true;
  }

  function cleanupSuccess(){
    const planner=document.querySelector('[data-view="planner"]');
    planner?.classList.remove('guest-success-active');
    planner?.querySelector('#guestSuccessExperience')?.remove();
    activeSuccessId='';
    renderPersistentCard();
  }

  function showSuccess(item){
    if(!item||!item.id||activeSuccessId===item.id)return;
    const planner=document.querySelector('[data-view="planner"]');
    if(!planner)return;
    ensureStyle();
    activeSuccessId=item.id;
    planner.querySelector('#guestSuccessExperience')?.remove();

    const countNights=nights(item);
    const section=document.createElement('section');
    section.id='guestSuccessExperience';
    section.className='guest-success-experience content-section';
    section.setAttribute('aria-live','polite');
    section.innerHTML=`
      <article class="guest-success-card">
        <div class="guest-success-forest" aria-hidden="true">${forestMark()}</div>
        <div class="guest-success-kicker"><i></i>Anfrage gesendet</div>
        <div class="guest-success-heading-row">
          <div>
            <h1>Danke für eure Anfrage.</h1>
            <p>Schön, dass ihr eine Auszeit bei uns plant. Wir schauen uns euren Wunschzeitraum an und melden uns bei euch.</p>
          </div>
          <span class="guest-success-check">${checkIcon()}</span>
        </div>

        <div class="guest-success-summary">
          <span class="guest-success-calendar">${calendarIcon()}</span>
          <div class="guest-success-summary-copy">
            <strong>${safe(fmtLong(item.start))} – ${safe(fmtLong(item.end))}</strong>
            <span>${countNights} ${countNights===1?'Nacht':'Nächte'} · ${safe(item.guests)} ${Number(item.guests)===1?'Person':'Personen'}</span>
            <small>${safe(item.guest)}</small>
          </div>
          <span class="guest-success-badge"><i></i>Anfrage offen</span>
        </div>

        <div class="guest-success-note">
          <span>i</span>
          <p>Eure Anfrage ist noch keine verbindliche Buchung. Erst wenn wir sie bestätigt haben, ist der Zeitraum für euch reserviert.</p>
        </div>
      </article>

      <article class="guest-success-next">
        <span class="guest-success-section-kicker">So geht es weiter</span>
        <h2>Wie geht es weiter?</h2>
        <ol>
          <li><span>1</span><div><strong>Wir prüfen euren Wunschzeitraum</strong><small>Wir schauen, ob alles zu eurer Anfrage passt.</small></div></li>
          <li><span>2</span><div><strong>Wir melden uns per E-Mail bei euch</strong><small>An ${safe(item.email||'eure angegebene Adresse')}.</small></div></li>
          <li><span>3</span><div><strong>Nach der Bestätigung wird daraus euer Aufenthalt</strong><small>Dann ist der Zeitraum verbindlich für euch reserviert.</small></div></li>
        </ol>
      </article>

      <div class="guest-success-actions">
        <button class="guest-success-primary" type="button" data-success-home>${homeIcon()}<span>Zurück zum Start</span></button>
        <button class="guest-success-secondary" type="button" data-success-guide>${compassIcon()}<span>Unsere Tipps entdecken</span></button>
      </div>

      <article class="guest-success-status-card">
        <div>
          <span>Eure Anfrage</span>
          <strong>${safe(fmtShort(item.start))}–${safe(fmtShort(item.end))} · ${safe(item.guests)} ${Number(item.guests)===1?'Person':'Personen'}</strong>
          <small><i></i> Wir prüfen euren Wunschzeitraum</small>
        </div>
        <span class="guest-success-status-icon">${calendarIcon()}</span>
      </article>`;

    planner.classList.add('guest-success-active');
    const hero=planner.querySelector('.guest-planner-hero');
    hero?hero.insertAdjacentElement('beforebegin',section):planner.prepend(section);

    section.querySelector('[data-success-home]')?.addEventListener('click',()=>{cleanupSuccess();go('home');});
    section.querySelector('[data-success-guide]')?.addEventListener('click',()=>{cleanupSuccess();go('guide');});
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function handleRequestUpdate(event){
    const item=event?.detail;
    if(!item||item.createdBy!=='guest-planner')return;
    renderPersistentCard();
    showSuccess(item);
  }

  function bindFallbackSubmit(){
    document.addEventListener('submit',event=>{
      if(event.target?.id!=='guestRequestForm')return;
      const before=new Set(loadRequests().map(item=>item.id));
      window.setTimeout(()=>{
        const item=loadRequests()
          .filter(request=>request.createdBy==='guest-planner'&&isPending(request)&&!before.has(request.id))
          .sort((a,b)=>String(b.createdAt||'').localeCompare(String(a.createdAt||'')))[0];
        if(item)showSuccess(item);
      },80);
    });
  }

  function bindNavigationCleanup(){
    document.addEventListener('click',event=>{
      if(!activeSuccessId)return;
      const target=event.target.closest('[data-view-target]');
      if(target&&target.dataset.viewTarget!=='planner')cleanupSuccess();
    },true);
  }

  function boot(){
    ensureStyle();
    window.addEventListener('waldhaus2:request-updated',handleRequestUpdate);
    bindFallbackSubmit();
    bindNavigationCleanup();
    let tries=0;
    const timer=setInterval(()=>{
      tries+=1;
      renderPersistentCard();
      if(document.querySelector('[data-view="planner"] .guest-request-card')||tries>50)clearInterval(timer);
    },80);
    setInterval(renderPersistentCard,1800);
  }

  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();