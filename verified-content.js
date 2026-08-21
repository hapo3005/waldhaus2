(() => {
  const VERIFIED_AT = '21.08.2026';

  const verifiedGuideItems = [
    {
      category:'nature', kicker:'Direkt ab Kerschenbach', title:'Arnika-Route KB 3',
      text:'7-km-Rundtour entlang des Dürrbachs Richtung Kronenburg mit rund 127 Höhenmetern, Arnikawiese und schönen Blicken auf Kronenburg. Die offiziellen Quellen widersprechen sich bei der Einstufung „leicht/mittel“, deshalb zeigen wir bewusst keine Schwierigkeitsstufe.',
      meta:['7,0 km','ca. 1:50 h','127 hm'], url:'https://www.gerolsteiner-land.de/touren/kerschenbach-kb3'
    },
    {
      category:'nature', kicker:'Kerschenbach · KB2', title:'XXL-Bank Kerschenbach',
      text:'Große Aussichtsbank mit weitem Blick über die Landschaft und das Feriendorf. Sie liegt am örtlichen Rundwanderweg KB2.',
      meta:['Aussicht','KB2','kostenlos'], url:'https://www.gerolsteiner-land.de/pois/xxl-bank-kerschenbach'
    },
    {
      category:'nature', kicker:'Kerschenbach · familienfreundlich', title:'Wassererlebnisplatz',
      text:'Naturerlebnis direkt am Bach mit Schutzhütte. Der Bachzugang ist barrierefrei erreichbar und der Platz liegt an den Wanderwegen K1 und K2.',
      meta:['Kinder','Bach','K1 · K2'], url:'https://kerschenbach.de/wassererlebnisplatz-in-kerschenbach/'
    },
    {
      category:'nature', kicker:'Stadtkyll', title:'Kyllpark & Kyllradweg',
      text:'Kurpark an der Kyll für eine kleine Runde am Wasser und als guter Einstieg in die Umgebung von Stadtkyll.',
      meta:['Park','Wasser','Radweg'], url:'https://www.stadtkyll.de/'
    },
    {
      category:'culture', kicker:'Historische Eifel', title:'Kronenburg',
      text:'Historischer Burgort mit alten Gassen, Burgresten und weitem Blick über die Eifellandschaft.',
      meta:['Burgort','Spaziergang','Ausflug'], url:'https://www.eifel.info/pois/kronenburg'
    },
    {
      category:'culture', kicker:'Birgel', title:'Historische Wassermühle',
      text:'Mühlen-Erlebniszentrum mit Getreide-, Säge-, Senf- und Ölmühle. Führungen und Gastronomie machen die Mühle auch bei wechselhaftem Wetter interessant.',
      meta:['Mühlen','Führung','Gastronomie'], url:'https://www.eifel.info/pois/historische-wassermuehle-birgel'
    },
    {
      category:'food', kicker:'Stadtkyll · Auelstraße 14–16', title:'Pizzeria La Sirena',
      text:'Mediterrane Küche mit Pizza, Pasta, Fisch- und Fleischgerichten. Aktuell mittwochs Ruhetag; an den übrigen Tagen mittags und abends geöffnet.',
      meta:['italienisch','Terrasse','06597 900623'], url:'https://www.eifel.info/gastro/pizzeria-la-sirena-stadtkyll'
    },
    {
      category:'food', kicker:'Stadtkyll · Wirftstausee', title:'Bistro am See',
      text:'Unkomplizierte Einkehr in der Tennishalle am Wirftstausee mit regionaler Küche und Hausmannskost. Aktuell Montag bis Freitag ab 17 Uhr.',
      meta:['regional','Bistro','06597 9029606'], url:'https://www.eifel.info/gastro/stadtkyll-bistro-am-see'
    },
    {
      category:'food', kicker:'Dahlem-Kronenburg', title:'Restaurant Villa Kronenburg',
      text:'Restaurant mit großer Gartenterrasse, regionalem Angebot, vegetarischen Optionen sowie Café/Crêperie am Tag.',
      meta:['regional','vegetarisch','Terrasse'], url:'https://www.eifel.info/gastro/restaurant-villa-kronenburg'
    },
    {
      category:'food', kicker:'Stadtkyll · Raiffeisenplatz 3', title:'Café Doppelfeld',
      text:'Bäckerei, Café und Eisdiele mit selbst angesetztem Sauerteig und Eis nach italienischem Originalrezept. Aktuelle Öffnungszeiten bitte vor dem Besuch über die verlinkte Tourismusseite prüfen.',
      meta:['Bäckerei','Café','06597 4973'], url:'https://www.eifel.info/gastro/cafe-conditorei-baeckerei-doppelfeld'
    },
    {
      category:'service', kicker:'Einkaufen · Stadtkyll', title:'REWE Stadtkyll',
      text:'Vollsortimenter in Stadtkyll, Im Hahnborn 5. Aktuell Montag bis Samstag von 07:00 bis 22:00 Uhr geöffnet.',
      meta:['Im Hahnborn 5','07–22 Uhr','06597 2990'], url:'https://www.rewe.de/marktseite/stadtkyll/1765219/rewe-markt-im-hahnborn-5'
    },
    {
      category:'service', kicker:'Gesundheit · Stadtkyll', title:'Marien-Apotheke',
      text:'Hauptstraße 25. Aktuell Montag bis Freitag 08:30–19:00 Uhr und Samstag 08:30–13:00 Uhr. Die Apotheke bietet unter anderem Vorbestellung und Botendienst.',
      meta:['Hauptstr. 25','06597 2319','Apotheke'], url:'https://www.apotheke-stadtkyll.de/'
    },
    {
      category:'service', kicker:'Gesundheit · Stadtkyll', title:'Ärztliche Versorgung',
      text:'Gemeinschaftspraxen in der Kurallee 8 (06597 3609) und Schwammertstraße 3 (06597 2425). Außerhalb der Sprechzeiten hilft der ärztliche Bereitschaftsdienst unter 116117.',
      meta:['2 Praxen','116117','Stadtkyll'], url:'https://www.stadtkyll.de/wohnen/gesundheit/aerzte/'
    },
    {
      category:'service', kicker:'Kerschenbach · Gemeindehaus', title:'E-Auto laden',
      text:'Am Gemeindehaus stehen zwei Ladestationen für E-Autos. Die Bedienung wird am Display erklärt; für die Bezahlung ist eine App erforderlich. Vor Ort steht dafür auch das freie WLAN der Ortsgemeinde zur Verfügung.',
      meta:['2 Ladepunkte','Gemeindehaus','Free WiFi'], url:'https://kerschenbach.de/aktuelles/?e-page-baf20b0=2'
    },
    {
      category:'service', kicker:'Vor Ort · Stadtkyll', title:'Tourist-Information',
      text:'Beratung, Wander- und Radkarten sowie aktuelle Ausflugstipps im Bahnhofsgebäude. Mo–Fr 09:00–16:30 Uhr, April–Oktober zusätzlich Sa 09:00–13:00 Uhr.',
      meta:['Burgberg 22','06591 13-3200','Tourist-Info'], url:'https://www.eifel.info/pois/tourist-information-oberes-kylltal'
    }
  ];

  function byText(selector, text){
    return [...document.querySelectorAll(selector)].find(el => el.textContent.trim() === text);
  }

  function patchGuide(){
    if (typeof guideItems !== 'undefined') {
      guideItems.splice(0, guideItems.length, ...verifiedGuideItems);
    }
    const allFilter=document.querySelector('[data-guide-filter="all"]');
    if(allFilter) allFilter.textContent='Alle Tipps';
    if(typeof renderRecommendations==='function') renderRecommendations();
    if(typeof renderGuide==='function') renderGuide();

    const guideView=document.querySelector('[data-view="guide"]');
    if(guideView && !guideView.querySelector('.verified-note')){
      const note=document.createElement('p');
      note.className='verified-note';
      note.textContent=`Lokale Angaben geprüft am ${VERIFIED_AT}. Öffnungszeiten können sich kurzfristig ändern – vor der Abfahrt bitte die verlinkte Quelle prüfen.`;
      guideView.querySelector('#guideGrid')?.insertAdjacentElement('afterend',note);
    }
  }

  function patchStay(){
    const stay=document.querySelector('[data-view="stay"]');
    if(!stay)return;
    const info=stay.querySelector('.info-grid');
    if(info){
      info.innerHTML=`
        <div><small>Adresse</small><strong>Killerberg 2 · 54589 Kerschenbach</strong></div>
        <div><small>Parken</small><strong>PKW-Parkplatz vorhanden</strong></div>
        <div><small>Zugang</small><strong>Mit Schlüssel · Details vor Anreise</strong></div>
        <div><small>Check-in</small><strong>ab 15:00 Uhr</strong></div>`;
    }
    const route=stay.querySelector('a[href*="google.com/maps"]');
    if(route) route.href='https://www.google.com/maps/search/?api=1&query=Killerberg%202%2C%2054589%20Kerschenbach';

    const badge=stay.querySelector('.stay-badge');
    if(badge){badge.querySelector('strong').textContent='15:00';}

    const timeline=stay.querySelector('.timeline');
    if(timeline && !document.querySelector('#guestContribution')){
      const article=document.createElement('article');
      article.id='guestContribution';
      article.className='timeline-card';
      article.innerHTML=`<div class="timeline-time">Gut zu wissen</div><div class="timeline-dot"></div><div class="timeline-body"><span class="card-label">Gästebeitrag</span><h2>Aktuell 0,75 € pro Person & Nacht.</h2><p>Der einheitliche Gästebeitrag der Verbandsgemeinde Gerolstein gilt für beitragspflichtige Übernachtungsgäste. Kinder unter 6 Jahren sowie Geschäfts- und Bildungsreisende sind befreit.</p><a class="text-link" href="https://www.gerolstein.de/buergerservice/leistungen/RLP%3Aentry%3A5272537%3AANLR-VLR/gaestebeitrag-in-der-verbandsgemeinde-gerolstein-gaestekarte-vorteilsleistungen-und-meldesystem/" target="_blank" rel="noreferrer">Offizielle Information ↗</a></div>`;
      timeline.appendChild(article);
    }
  }

  function patchHouse(){
    const house=document.querySelector('[data-view="house"]');
    if(!house)return;

    const heroCopy=house.querySelector('.page-hero p');
    if(heroCopy) heroCopy.textContent='Die wichtigsten Informationen zum Waldhaus, zur Ausstattung und für den Aufenthalt – kurz und griffbereit.';
    const status=house.querySelector('.house-status');
    if(status){
      status.querySelector('strong').textContent='Hausinfos geprüft';
      status.querySelector('small').textContent=`Stand · ${VERIFIED_AT}`;
    }

    const wifi=house.querySelector('.house-card.featured');
    if(wifi){
      wifi.querySelector('small').textContent='WLAN';
      wifi.querySelector('h2').textContent='Kostenloses WLAN';
      wifi.querySelector('p').innerHTML='Zugangsdaten erhaltet ihr mit den Anreiseinformationen.';
      const copy=wifi.querySelector('#copyWifi');
      if(copy){copy.hidden=true;copy.disabled=true;}
    }
    const wlanQuick=byText('.quick-card strong','WLAN')?.closest('.quick-card');
    if(wlanQuick) wlanQuick.querySelector('small').textContent='Kostenlos vorhanden';

    const fireplace=byText('.house-card h2','Kamin')?.closest('.house-card');
    if(fireplace){
      fireplace.querySelector('small').textContent='Draußen';
      fireplace.querySelector('h2').textContent='Garten, Terrasse & Grill';
      fireplace.querySelector('p').textContent='Eigener Garten, Terrasse und Grillmöglichkeit.';
      const button=fireplace.querySelector('[data-sheet]');
      if(button){button.dataset.sheet='outdoor';button.textContent='Details →';}
    }
    const fireQuick=byText('.quick-card strong','Kamin')?.closest('.quick-card');
    if(fireQuick){fireQuick.querySelector('strong').textContent='Draußen';fireQuick.querySelector('small').textContent='Garten, Terrasse & Grill';}

    if(typeof sheetContent!=='undefined'){
      sheetContent.outdoor={label:'Draußen',title:'Garten, Terrasse & Grill',html:'<p>Zum Waldhaus gehören ein eigener Garten, eine Terrasse und eine Grillmöglichkeit. Bitte den Grill nur beaufsichtigt nutzen und vor dem Verlassen vollständig löschen beziehungsweise abkühlen lassen.</p>'};
      sheetContent.appliances={label:'Küche',title:'Küche & Geräte',html:'<p>Die öffentlich beschriebenen Ausstattungsmerkmale umfassen eine Küche mit Kühlschrank, Backofen, Kaffeemaschine, Wasserkocher und Toaster sowie TV/Satelliten-TV.</p>'};
      sheetContent.emergency={label:'Wichtig',title:'Notfall & Kontakte',html:'<p><strong>Akuter Notfall:</strong> 112</p><p><strong>Ärztlicher Bereitschaftsdienst:</strong> 116117</p><p><strong>Gastgeber-Kontakt:</strong> +49 171 4421800</p><p><strong>Marien-Apotheke Stadtkyll:</strong> +49 6597 2319</p><p>Bei einem Problem am Haus bitte zuerst den Gastgeber-Kontakt nutzen, sofern kein akuter medizinischer oder sonstiger Notfall vorliegt.</p>'};
    }

    const grid=house.querySelector('.house-grid');
    if(grid && !document.querySelector('#verifiedHouseFacts')){
      const section=document.createElement('section');
      section.id='verifiedHouseFacts';
      section.className='content-section welcome-grid verified-facts';
      section.innerHTML=`
        <article class="card"><span class="card-label">Das Waldhaus</span><h2>80 m² für bis zu 4 Gäste.</h2><div class="info-grid verified-info"><div><small>Schlafen</small><strong>2 Schlafzimmer</strong></div><div><small>Bad</small><strong>1 Bad mit Dusche/WC</strong></div><div><small>Haustiere</small><strong>willkommen</strong></div><div><small>Hausregel</small><strong>Nichtraucher</strong></div></div><p class="verified-copy">Nurdach-Ferienhaus mit Wohn-/Essbereich, Küche, Terrasse und eigenem Garten.</p></article>
        <article class="card"><span class="card-label">Ausstattung & Lage</span><h2>Ruhig – und schnell draußen.</h2><div class="info-grid verified-info"><div><small>Wanderweg</small><strong>ca. 50 m</strong></div><div><small>Wald</small><strong>ca. 100 m</strong></div><div><small>Radweg</small><strong>ca. 700 m</strong></div><div><small>Zentrum</small><strong>ca. 1,5 km</strong></div></div><p class="verified-copy">WLAN, Parkplatz, Satelliten-TV, Terrasse, Garten und Grillmöglichkeit sind öffentlich als Ausstattung geführt.</p></article>`;
      grid.insertAdjacentElement('afterend',section);
    }
  }

  function patchCheckout(){
    if(typeof checkoutItems!=='undefined'){
      const fire=checkoutItems.findIndex(item=>item[0]==='fire');
      if(fire>=0) checkoutItems[fire]=['fire','Außenbereich prüfen','Grill vollständig aus bzw. abgekühlt, Terrasse ordentlich hinterlassen.'];
      const key=checkoutItems.findIndex(item=>item[0]==='key');
      if(key>=0) checkoutItems[key]=['key','Schlüssel zurückgeben','Schlüssel nach den vereinbarten Abreisehinweisen zurückgeben.'];
      if(typeof renderCheckout==='function') renderCheckout();
    }
    const side=document.querySelector('.checkout-side');
    if(side){
      const h2=side.querySelector('h2');
      if(h2) h2.textContent='Bis 10:00 Uhr';
      const p=side.querySelector('p');
      if(p) p.textContent='Bitte das Haus bis 10:00 Uhr verlassen und den Schlüssel nach den vereinbarten Abreisehinweisen zurückgeben.';
    }
  }

  function patchHome(){
    const next=document.querySelector('.next-card');
    if(next){
      const p=next.querySelector('p');
      if(p) p.textContent='Adresse, Parkplatz, Check-in und die wichtigsten Hausinfos sind für euch gebündelt.';
      const list=next.querySelector('.mini-list');
      if(list) list.innerHTML='<span><b>15:00</b> Check-in</span><span><b>10:00</b> Check-out</span><span><b>1,5 km</b> bis Stadtkyll-Zentrum</span>';
    }
  }

  function addStyles(){
    if(document.querySelector('#verifiedContentStyles'))return;
    const style=document.createElement('style');
    style.id='verifiedContentStyles';
    style.textContent=`
      .verified-note{max-width:1100px;margin:.7rem auto 0;padding:0 1.25rem 1.4rem;color:var(--muted,rgba(255,255,255,.58));font-size:.76rem;line-height:1.5}
      .verified-facts{margin-top:1rem}.verified-info{margin-top:1rem}.verified-copy{margin-top:1rem;color:var(--muted,rgba(255,255,255,.66))}
      .verified-facts .card{min-height:100%}
    `;
    document.head.appendChild(style);
  }

  function apply(){
    addStyles();
    patchGuide();
    patchHome();
    patchStay();
    patchHouse();
    patchCheckout();
  }

  const run=()=>setTimeout(apply,60);
  document.readyState==='loading' ? document.addEventListener('DOMContentLoaded',run,{once:true}) : run();
})();