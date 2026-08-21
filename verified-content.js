(() => {
  const VERIFIED_AT = '21.08.2026';

  const verifiedGuideItems = [
    {category:'nature',kicker:'Direkt ab Kerschenbach',title:'Arnika-Route KB 3',text:'7-km-Rundtour entlang des Dürrbachs Richtung Kronenburg mit rund 127 Höhenmetern, Arnikawiese und schönen Blicken auf Kronenburg. Die offiziellen Quellen widersprechen sich bei der Einstufung „leicht/mittel“, deshalb zeigen wir bewusst keine Schwierigkeitsstufe.',meta:['7,0 km','ca. 1:50 h','127 hm'],url:'https://www.gerolsteiner-land.de/touren/kerschenbach-kb3'},
    {category:'nature',kicker:'Kerschenbach · KB2',title:'XXL-Bank Kerschenbach',text:'Große Aussichtsbank mit weitem Blick über die Landschaft und das Feriendorf. Sie liegt am örtlichen Rundwanderweg KB2.',meta:['Aussicht','KB2','kostenlos'],url:'https://www.gerolsteiner-land.de/pois/xxl-bank-kerschenbach'},
    {category:'nature',kicker:'Kerschenbach · familienfreundlich',title:'Wassererlebnisplatz',text:'Naturerlebnis direkt am Bach mit Schutzhütte. Der Bachzugang ist barrierefrei erreichbar und der Platz liegt an den Wanderwegen K1 und K2.',meta:['Kinder','Bach','K1 · K2'],url:'https://kerschenbach.de/wassererlebnisplatz-in-kerschenbach/'},
    {category:'nature',kicker:'Stadtkyll',title:'Kyllpark & Kyllradweg',text:'Kurpark an der Kyll für eine kleine Runde am Wasser und als guter Einstieg in die Umgebung von Stadtkyll.',meta:['Park','Wasser','Radweg'],url:'https://www.eifel.info/pois/kurpark-stadtkyll'},
    {category:'culture',kicker:'Historische Eifel',title:'Kronenburg',text:'Historischer Burgort mit alten Gassen, Burgresten und weitem Blick über die Eifellandschaft.',meta:['Burgort','Spaziergang','Ausflug'],url:'https://www.eifel.info/pois/kronenburg'},
    {category:'culture',kicker:'Birgel',title:'Historische Wassermühle',text:'Mühlen-Erlebniszentrum mit Getreide-, Säge-, Senf- und Ölmühle. Führungen und Gastronomie machen die Mühle auch bei wechselhaftem Wetter interessant.',meta:['Mühlen','Führung','Gastronomie'],url:'https://www.eifel.info/pois/historische-wassermuehle-birgel'},
    {category:'food',kicker:'Stadtkyll · Auelstraße 14–16',title:'Pizzeria La Sirena',text:'Mediterrane Küche mit Pizza, Pasta, Fisch- und Fleischgerichten. Aktuell mittwochs Ruhetag; an den übrigen Tagen mittags und abends geöffnet.',meta:['italienisch','Terrasse','06597 900623'],url:'https://www.eifel.info/gastro/pizzeria-la-sirena-stadtkyll'},
    {category:'food',kicker:'Stadtkyll · Wirftstraße 19',title:'Woodstock Food & Musik',text:'Erlebnisgastronomie mit Lavasteingrill, Tapas und Musik-Ambiente im früheren Balkan Land.',meta:['Lavastein','Tapas','06597 900538'],url:'https://www.gerolsteiner-land.de/gastro/hotel-restaurant-balkan-land'},
    {category:'food',kicker:'Stadtkyll · Wirftstausee',title:'Bistro am See',text:'Unkomplizierte Einkehr in der Tennishalle am Wirftstausee mit regionaler Küche und Hausmannskost. Aktuell Montag bis Freitag ab 17 Uhr.',meta:['regional','Bistro','06597 9029606'],url:'https://www.eifel.info/gastro/stadtkyll-bistro-am-see'},
    {category:'food',kicker:'Dahlem-Kronenburg',title:'Restaurant Villa Kronenburg',text:'Restaurant mit großer Gartenterrasse, regionalem Angebot, vegetarischen Optionen sowie Café/Crêperie am Tag.',meta:['regional','vegetarisch','Terrasse'],url:'https://www.eifel.info/gastro/restaurant-villa-kronenburg'},
    {category:'food',kicker:'Stadtkyll · Raiffeisenplatz 3',title:'Café Doppelfeld',text:'Bäckerei, Café und Eisdiele mit selbst angesetztem Sauerteig und Eis nach italienischem Originalrezept. Aktuelle Öffnungszeiten bitte vor dem Besuch über die verlinkte Tourismusseite prüfen.',meta:['Bäckerei','Café','06597 4973'],url:'https://www.eifel.info/gastro/cafe-conditorei-baeckerei-doppelfeld'},
    {category:'service',kicker:'Einkaufen · Stadtkyll',title:'REWE Stadtkyll',text:'Vollsortimenter in Stadtkyll, Im Hahnborn 5. Aktuell Montag bis Samstag von 07:00 bis 22:00 Uhr geöffnet.',meta:['Im Hahnborn 5','07–22 Uhr','06597 2990'],url:'https://www.rewe.de/marktseite/stadtkyll/1765219/rewe-markt-im-hahnborn-5'},
    {category:'service',kicker:'Gesundheit · Stadtkyll',title:'Marien-Apotheke',text:'Hauptstraße 25. Aktuell Montag bis Freitag 08:30–19:00 Uhr und Samstag 08:30–13:00 Uhr. Die Apotheke bietet unter anderem Vorbestellung und Botendienst.',meta:['Hauptstr. 25','06597 2319','Apotheke'],url:'https://www.apotheke-stadtkyll.de/'},
    {category:'service',kicker:'Gesundheit · Stadtkyll',title:'Ärztliche Versorgung',text:'Gemeinschaftspraxen in der Kurallee 8 (06597 3609) und Schwammertstraße 3 (06597 2425). Außerhalb der Sprechzeiten hilft der ärztliche Bereitschaftsdienst unter 116117.',meta:['2 Praxen','116117','Stadtkyll'],url:'https://www.stadtkyll.de/wohnen/gesundheit/aerzte/'},
    {category:'service',kicker:'Kerschenbach · Gemeindehaus',title:'E-Auto laden',text:'Am Gemeindehaus stehen zwei Ladestationen für E-Autos. Die Bedienung wird am Display erklärt; für die Bezahlung ist eine App erforderlich. Vor Ort steht dafür auch das freie WLAN der Ortsgemeinde zur Verfügung.',meta:['2 Ladepunkte','Gemeindehaus','Free WiFi'],url:'https://kerschenbach.de/aktuelles/?e-page-baf20b0=2'},
    {category:'service',kicker:'Vor Ort · Stadtkyll',title:'Tourist-Information',text:'Beratung, Wander- und Radkarten sowie aktuelle Ausflugstipps im Bahnhofsgebäude. Mo–Fr 09:00–16:30 Uhr, April–Oktober zusätzlich Sa 09:00–13:00 Uhr.',meta:['Burgberg 22','06591 13-3200','Tourist-Info'],url:'https://www.eifel.info/pois/tourist-information-oberes-kylltal'}
  ];

  // Complete curated selection from the original Waldhaus "Aufenthalt" area.
  // Distances from the legacy prototype are intentionally not shown because several were not measured from Killerberg 2.
  const stayDining = [
    {place:'Stadtkyll',title:'Pizzeria La Sirena',text:'Italienische und mediterrane Küche mit Pizza, Pasta, Fisch, Fleisch und Desserts.',image:'https://www.eifel.info/images/ka_H2uz6ZMM/rs:fill:2560:0/cb:/g:ce/aHR0cHM6Ly9yZXNjLmRlc2tsaW5lLm5ldC9pbWFnZXMvUlBULzEvNzgwNWYxZDktZGQ4Zi00MGE3LWExMDItZGM5MjVkZjFlMjdiLzk5L2ltYWdlLmpwZw',url:'https://www.eifel.info/gastro/pizzeria-la-sirena-stadtkyll',tag:'Italienisch'},
    {place:'Stadtkyll',title:'Woodstock Food & Musik',text:'Tapas, Lavasteingrill und Musik-Ambiente im neu aufgestellten ehemaligen Balkan Land.',image:'https://www.gerolsteiner-land.de/images/FYZJoPlPWBE/rs:fill:2560:0/cb:/g:ce/aHR0cHM6Ly9yZXNjLmRlc2tsaW5lLm5ldC9pbWFnZXMvUlBULzEvNzIzYTI1YTktYWU0Ny00ZTA5LWFkNGYtN2E2OThlNDhjNmU4Lzk5L2ltYWdlLmpwZw',url:'https://www.gerolsteiner-land.de/gastro/hotel-restaurant-balkan-land',tag:'Erlebnisgastronomie'},
    {place:'Stadtkyll · Wirftstausee',title:'Bistro am See',text:'Lockeres Bistro an der Tennishalle beim Wirftstausee – für einen Happen, Hausmannskost oder einen kleinen Absacker.',image:'https://www.eifel.info/images/0qNThWa4M98/rs:fill:2560:0/cb:/g:ce/aHR0cHM6Ly9yZXNjLmRlc2tsaW5lLm5ldC9pbWFnZXMvUlBULzEvYWJiMWM5ZTMtNmFjYi00OGY5LTkzNDAtZjhhOTY5NDBlNWM0Lzk5L2ltYWdlLmpwZw',url:'https://www.eifel.info/gastro/stadtkyll-bistro-am-see',tag:'Regional'},
    {place:'Blankenheim-Ripsdorf',title:'Restaurant Breuer',text:'Klassisches Restaurant und Hotel mit regionaler Küche, Tagesgerichten und Biergarten.',image:'https://www.breuer-ripsdorf.de/Breuer_Ripsdorf/Willkommen_files/hotel-biergarten_600.jpg',url:'https://www.breuer-ripsdorf.de/',tag:'Ausflugslokal'},
    {place:'Kronenburg',title:'Restaurant Villa Kronenburg',text:'Regionale Küche, vegetarische Optionen und eine große Gartenterrasse im historischen Burgort.',image:'https://www.eifel.info/images/7Oibiw43GFk/rs:fill:2560:0/cb:/g:ce/aHR0cHM6Ly9yZXNjLmRlc2tsaW5lLm5ldC9pbWFnZXMvUlBULzEvZTljZWNiZGQtM2M3Zi00OGM2LWE2NjMtNWU0ZWFjZTYwYTllLzk5L2ltYWdlLmpwZw',url:'https://www.eifel.info/gastro/restaurant-villa-kronenburg',tag:'Terrasse'},
    {place:'Birgel',title:'Historische Wassermühle Birgel',text:'Mühlen-Erlebniszentrum mit Gastronomie und Biergarten – Essen lässt sich hier gut mit einem Ausflug verbinden.',image:'https://www.urlaub-in-rheinland-pfalz.de/domizil-390/73528/Historische_Wassermuehle_Birgel.webp',url:'https://www.eifel.info/pois/historische-wassermuehle-birgel',tag:'Erlebnis & Essen'},
    {place:'Birgel',title:'Hotel-Restaurant Birgeler Hof',text:'Gutbürgerliche Küche, regionale Gerichte, Moselwein und Biergarten.',image:'https://www.eifel.info/images/_shZLf_nIAc/rs:fill:2560:0/cb:/g:ce/aHR0cHM6Ly9yZXNjLmRlc2tsaW5lLm5ldC9pbWFnZXMvUlBULzEvMzM3YmZiMjMtZGIzMi00MTczLWExZmUtMDM3MzgwNzIwNDU2Lzk5L2ltYWdlLmpwZw',url:'https://www.birgelerhof.de/restaurant/',tag:'Gutbürgerlich'},
    {place:'Olzheim',title:'Hotel Feldmaus',text:'Deutsch-französische Abendküche im Landhotel; aktuelle Speisekarte und Öffnungstage werden auf der eigenen Website gepflegt.',image:'https://static.wixstatic.com/media/9b6f19_774e5f869e8c48b99ed236006d89e65f%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/9b6f19_774e5f869e8c48b99ed236006d89e65f%7Emv2.jpg',url:'https://www.feldmaus.de/restaurant',tag:'Deutsch-französisch'}
  ];

  const stayActivities = [
    {place:'Stadtkyll',title:'Kurpark Stadtkyll',text:'Ruhiger Spaziergang durch den Park an der Kyll – ideal für eine unkomplizierte erste Runde nach der Ankunft.',image:'https://www.eifel.info/images/f4uJBKVpLVw/rs:fill:1400:788/cb:/g:ce/aHR0cHM6Ly9yZXNjLmRlc2tsaW5lLm5ldC9pbWFnZXMvUlBULzEvODk3N2M3ZTItMTQ2ZS00NzE2LThlZmItZTg4OGExY2NjNTBiLzk5L2ltYWdlLmpwZw',url:'https://www.eifel.info/pois/kurpark-stadtkyll',tag:'Spaziergang'},
    {place:'Wirfttal',title:'Minigolf Landal Wirfttal',text:'Kompakte Familienrunde im Ferienpark – gut für einen lockeren Nachmittag ohne lange Planung.',image:'https://www.eifel.info/images/BtwGtFbMwEk/rs:fill:1400:788/cb:/g:ce/aHR0cHM6Ly9yZXNjLmRlc2tsaW5lLm5ldC9pbWFnZXMvUlBULzEvMTI5YTNiMDEtODI3Mi00NTkxLTllMTEtNDkxNjkxYzc1YmI4Lzk5L2ltYWdlLmpwZw',url:'https://www.eifel.info/pois/minigolf-landal-wirfttal',tag:'Familie'},
    {place:'Wirfttal',title:'Angeln am Wirftstausee',text:'Ruhige Stunden am Wasser mit Waldkulisse. Vor dem Angeln bitte die aktuellen Voraussetzungen und Tageskarten prüfen.',image:'https://www.eifel.info/images/YaVUJQQtO1E/rs:fill:1400:788/cb:/g:ce/aHR0cHM6Ly9yZXNjLmRlc2tsaW5lLm5ldC9pbWFnZXMvUlBULzEvNWFiNWVmZTAtMTk4ZS00MWQ1LTk4YmMtMWEyMWM0YWRkYzkzLzk5L2ltYWdlLmpwZWc',url:'https://www.eifel.info/pois/angeln-am-stausee-wirfttal',tag:'Am Wasser'},
    {place:'Kronenburg',title:'Kronenburger See',text:'Seeufer, Wasserblick und Sommermomente in wenigen Fahrminuten Entfernung.',image:'https://www.eifel.info/images/FJHkRY2rGxo/rs:fill:1400:788/cb:/g:ce/aHR0cHM6Ly9yZXNjLmRlc2tsaW5lLm5ldC9pbWFnZXMvUlBULzEvYWExY2Q1NzktMDA4MS00NTVjLTgyNzQtMDM1ZWM5Zjk3ZTE5Lzk5L2ltYWdlLmpwZw',url:'https://www.eifel.info/en/pois/angeln-am-kronenburger-see',tag:'See'},
    {place:'Kronenburg',title:'Burgort Kronenburg',text:'Historischer Ortskern mit Burgruine, Fachwerk, kleinen Gassen und weitem Blick über die Eifellandschaft.',image:'https://www.eifel.info/images/jfIFm08HktU/rs:fill:1400:788/cb:/g:ce/aHR0cHM6Ly9yZXNjLmRlc2tsaW5lLm5ldC9pbWFnZXMvUlBULzEvZGVhMGE3NWQtZjVmNi00NTc1LThjOTctYjZhZWQ2YThkNDEwLzk5L2ltYWdlLmpwZw',url:'https://www.eifel.info/pois/kronenburg',tag:'Historisch'},
    {place:'Steffeln',title:'Eichholzmaar',text:'Kleines Vulkanmaar mit Rundweg, viel Ruhe und einem sehr typischen Landschaftsgefühl der Vulkaneifel.',image:'https://www.eifel.info/images/ILqDxkXHt9w/rs:fill:1400:788/cb:/g:ce/aHR0cHM6Ly9yZXNjLmRlc2tsaW5lLm5ldC9pbWFnZXMvUlBULzEvOGE4OTNmM2EtNDU2Zi00NDIyLTg0NjgtOWY4NzU5ZjczMjYwLzk5L2ltYWdlLmpwZw',url:'https://www.eifel.info/pois/eichholzmaar',tag:'Vulkaneifel'},
    {place:'Gerolstein',title:'Gerolsteiner Dolomiten',text:'Markante Felsen, Aussichtspunkte und eine der charakteristischen Wanderkulissen rund um Gerolstein.',image:'https://www.eifel.info/images/o8TRP61yGkM/rs:fill:1400:788/cb:/g:ce/aHR0cHM6Ly9yZXNjLmRlc2tsaW5lLm5ldC9pbWFnZXMvUlBULzEvM2U1NWVkZmYtZGY0My00YjQ0LWEwNmYtNDIwMWJjNzBiMDE5Lzk5L2ltYWdlLmpwZw',url:'https://www.eifel.info/pois/gerolsteiner-dolomiten',tag:'Wandern'},
    {place:'Pelm',title:'Adler- und Wolfspark Kasselburg',text:'Greifvögel, Wolfsrudel und die Kasselburg – ein großes Ausflugsziel besonders für Familien.',image:'https://www.eifel.info/images/EBu8tgFAmAU/rs:fill:1400:788/cb:/g:ce/aHR0cHM6Ly9yZXNjLmRlc2tsaW5lLm5ldC9pbWFnZXMvUlBULzEvMWJhMmM0OTEtMzk2Mi00NjFjLWFlYmUtY2I3M2VkMjA1M2MxLzk5L2ltYWdlLmpwZw',url:'https://www.eifel.info/pois/adler-und-wolfspark-kasselburg',tag:'Familie'}
  ];

  function byText(selector,text){return [...document.querySelectorAll(selector)].find(el=>el.textContent.trim()===text);}
  function esc(value){return String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');}

  function patchGuide(){
    if(typeof guideItems!=='undefined')guideItems.splice(0,guideItems.length,...verifiedGuideItems);
    const allFilter=document.querySelector('[data-guide-filter="all"]');
    if(allFilter)allFilter.textContent='Alle Tipps';
    if(typeof renderRecommendations==='function')renderRecommendations();
    if(typeof renderGuide==='function')renderGuide();
    const guideView=document.querySelector('[data-view="guide"]');
    if(guideView&&!guideView.querySelector('.verified-note')){
      const note=document.createElement('p');
      note.className='verified-note';
      note.textContent=`Lokale Angaben geprüft am ${VERIFIED_AT}. Öffnungszeiten können sich kurzfristig ändern – vor der Abfahrt bitte die verlinkte Quelle prüfen.`;
      guideView.querySelector('#guideGrid')?.insertAdjacentElement('afterend',note);
    }
  }

  function experienceCard(item){
    return `<a class="stay-experience-card" href="${esc(item.url)}" target="_blank" rel="noreferrer"><div class="stay-experience-media"><img src="${esc(item.image)}" alt="" loading="lazy" decoding="async"><span class="stay-experience-tag">${esc(item.tag)}</span></div><div class="stay-experience-copy"><small>${esc(item.place)}</small><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p><span class="stay-experience-link">Details ansehen <b>↗</b></span></div></a>`;
  }

  function experienceRail(id,label,title,copy,items){
    return `<section class="stay-experience-group"><div class="stay-experience-head"><div><span class="card-label">${esc(label)}</span><h2>${esc(title)}</h2><p>${esc(copy)}</p></div><div class="stay-experience-controls"><button type="button" data-stay-scroll="${id}" data-direction="-1" aria-label="Zurück">‹</button><button type="button" data-stay-scroll="${id}" data-direction="1" aria-label="Weiter">›</button></div></div><div class="stay-experience-rail" id="${id}">${items.map(experienceCard).join('')}</div></section>`;
  }

  function patchStayExperiences(stay){
    if(!stay||document.querySelector('#stayExperiences'))return;
    const timeline=stay.querySelector('.timeline');
    if(!timeline)return;
    const hub=document.createElement('section');
    hub.id='stayExperiences';
    hub.className='content-section stay-experiences';
    hub.innerHTML=`<div class="stay-experiences-intro"><div><span class="card-label">Während eures Aufenthalts</span><h2>Essen, trinken, rausgehen.</h2><p>Die komplette kuratierte Auswahl aus dem ursprünglichen Waldhaus – im neuen Waldhaus2 klarer, bildstärker und mobil besser nutzbar.</p></div><button class="text-link" id="stayMoreTips" type="button">Alle weiteren Tipps →</button></div>${experienceRail('stayDiningRail','Essen & Trinken','Unsere Auswahl zum Einkehren.','Vom unkomplizierten Abendessen bis zum Ausflugslokal – acht bewährte Adressen aus der Waldhaus-Auswahl.',stayDining)}${experienceRail('stayActivityRail','Aktivitäten','Was wir rund ums Waldhaus mögen.','Acht Ausflüge und Aktivitäten von der kleinen Runde in Stadtkyll bis zum großen Familientag.',stayActivities)}<p class="stay-experience-note">Auswahl aus dem ursprünglichen Waldhaus übernommen und in Waldhaus2 weitergeführt. Öffnungszeiten, Saisonbetrieb und einzelne Angebote bitte vor der Abfahrt über den jeweiligen Link prüfen.</p>`;
    timeline.insertAdjacentElement('afterend',hub);

    hub.querySelectorAll('[data-stay-scroll]').forEach(button=>button.addEventListener('click',()=>{
      const rail=document.getElementById(button.dataset.stayScroll);
      const direction=Number(button.dataset.direction)||1;
      if(rail)rail.scrollBy({left:direction*Math.min(720,rail.clientWidth*.84),behavior:'smooth'});
    }));
    hub.querySelector('#stayMoreTips')?.addEventListener('click',()=>{if(typeof navigate==='function')navigate('guide');});
    hub.querySelectorAll('.stay-experience-media img').forEach(img=>img.addEventListener('error',()=>img.closest('.stay-experience-media')?.classList.add('image-missing'),{once:true}));
  }

  function patchStay(){
    const stay=document.querySelector('[data-view="stay"]');
    if(!stay)return;
    const info=stay.querySelector('.info-grid');
    if(info)info.innerHTML='<div><small>Adresse</small><strong>Killerberg 2 · 54589 Kerschenbach</strong></div><div><small>Parken</small><strong>PKW-Parkplatz vorhanden</strong></div><div><small>Zugang</small><strong>Mit Schlüssel · Details vor Anreise</strong></div><div><small>Check-in</small><strong>ab 15:00 Uhr</strong></div>';
    const route=stay.querySelector('a[href*="google.com/maps"]');
    if(route)route.href='https://www.google.com/maps/search/?api=1&query=Killerberg%202%2C%2054589%20Kerschenbach';
    const badge=stay.querySelector('.stay-badge');
    if(badge)badge.querySelector('strong').textContent='15:00';
    const timeline=stay.querySelector('.timeline');
    if(timeline&&!document.querySelector('#guestContribution')){
      const article=document.createElement('article');
      article.id='guestContribution';article.className='timeline-card';
      article.innerHTML='<div class="timeline-time">Gut zu wissen</div><div class="timeline-dot"></div><div class="timeline-body"><span class="card-label">Gästebeitrag</span><h2>Aktuell 0,75 € pro Person & Nacht.</h2><p>Der einheitliche Gästebeitrag der Verbandsgemeinde Gerolstein gilt für beitragspflichtige Übernachtungsgäste. Kinder unter 6 Jahren sowie Geschäfts- und Bildungsreisende sind befreit.</p><a class="text-link" href="https://www.gerolstein.de/buergerservice/leistungen/RLP%3Aentry%3A5272537%3AANLR-VLR/gaestebeitrag-in-der-verbandsgemeinde-gerolstein-gaestekarte-vorteilsleistungen-und-meldesystem/" target="_blank" rel="noreferrer">Offizielle Information ↗</a></div>';
      timeline.appendChild(article);
    }
    patchStayExperiences(stay);
  }

  function patchHouse(){
    const house=document.querySelector('[data-view="house"]');if(!house)return;
    const heroCopy=house.querySelector('.page-hero p');if(heroCopy)heroCopy.textContent='Die wichtigsten Informationen zum Waldhaus, zur Ausstattung und für den Aufenthalt – kurz und griffbereit.';
    const status=house.querySelector('.house-status');if(status){status.querySelector('strong').textContent='Hausinfos geprüft';status.querySelector('small').textContent=`Stand · ${VERIFIED_AT}`;}
    const wifi=house.querySelector('.house-card.featured');if(wifi){wifi.querySelector('small').textContent='WLAN';wifi.querySelector('h2').textContent='Kostenloses WLAN';wifi.querySelector('p').innerHTML='Zugangsdaten erhaltet ihr mit den Anreiseinformationen.';const copy=wifi.querySelector('#copyWifi');if(copy){copy.hidden=true;copy.disabled=true;}}
    const wlanQuick=byText('.quick-card strong','WLAN')?.closest('.quick-card');if(wlanQuick)wlanQuick.querySelector('small').textContent='Kostenlos vorhanden';
    const fireplace=byText('.house-card h2','Kamin')?.closest('.house-card');if(fireplace){fireplace.querySelector('small').textContent='Draußen';fireplace.querySelector('h2').textContent='Garten, Terrasse & Grill';fireplace.querySelector('p').textContent='Eigener Garten, Terrasse und Grillmöglichkeit.';const button=fireplace.querySelector('[data-sheet]');if(button){button.dataset.sheet='outdoor';button.textContent='Details →';}}
    const fireQuick=byText('.quick-card strong','Kamin')?.closest('.quick-card');if(fireQuick){fireQuick.querySelector('strong').textContent='Draußen';fireQuick.querySelector('small').textContent='Garten, Terrasse & Grill';}
    if(typeof sheetContent!=='undefined'){
      sheetContent.outdoor={label:'Draußen',title:'Garten, Terrasse & Grill',html:'<p>Zum Waldhaus gehören ein eigener Garten, eine Terrasse und eine Grillmöglichkeit. Bitte den Grill nur beaufsichtigt nutzen und vor dem Verlassen vollständig löschen beziehungsweise abkühlen lassen.</p>'};
      sheetContent.appliances={label:'Küche',title:'Küche & Geräte',html:'<p>Die öffentlich beschriebenen Ausstattungsmerkmale umfassen eine Küche mit Kühlschrank, Backofen, Kaffeemaschine, Wasserkocher und Toaster sowie TV/Satelliten-TV.</p>'};
      sheetContent.emergency={label:'Wichtig',title:'Notfall & Kontakte',html:'<p><strong>Akuter Notfall:</strong> 112</p><p><strong>Ärztlicher Bereitschaftsdienst:</strong> 116117</p><p><strong>Gastgeber-Kontakt:</strong> +49 171 4421800</p><p><strong>Marien-Apotheke Stadtkyll:</strong> +49 6597 2319</p><p>Bei einem Problem am Haus bitte zuerst den Gastgeber-Kontakt nutzen, sofern kein akuter medizinischer oder sonstiger Notfall vorliegt.</p>'};
    }
    const grid=house.querySelector('.house-grid');
    if(grid&&!document.querySelector('#verifiedHouseFacts')){
      const section=document.createElement('section');section.id='verifiedHouseFacts';section.className='content-section welcome-grid verified-facts';
      section.innerHTML='<article class="card"><span class="card-label">Das Waldhaus</span><h2>80 m² für bis zu 4 Gäste.</h2><div class="info-grid verified-info"><div><small>Schlafen</small><strong>2 Schlafzimmer</strong></div><div><small>Bad</small><strong>1 Bad mit Dusche/WC</strong></div><div><small>Haustiere</small><strong>willkommen</strong></div><div><small>Hausregel</small><strong>Nichtraucher</strong></div></div><p class="verified-copy">Nurdach-Ferienhaus mit Wohn-/Essbereich, Küche, Terrasse und eigenem Garten.</p></article><article class="card"><span class="card-label">Ausstattung & Lage</span><h2>Ruhig – und schnell draußen.</h2><div class="info-grid verified-info"><div><small>Wanderweg</small><strong>ca. 50 m</strong></div><div><small>Wald</small><strong>ca. 100 m</strong></div><div><small>Radweg</small><strong>ca. 700 m</strong></div><div><small>Zentrum</small><strong>ca. 1,5 km</strong></div></div><p class="verified-copy">WLAN, Parkplatz, Satelliten-TV, Terrasse, Garten und Grillmöglichkeit sind öffentlich als Ausstattung geführt.</p></article>';
      grid.insertAdjacentElement('afterend',section);
    }
  }

  function patchCheckout(){
    if(typeof checkoutItems!=='undefined'){
      const fire=checkoutItems.findIndex(item=>item[0]==='fire');if(fire>=0)checkoutItems[fire]=['fire','Außenbereich prüfen','Grill vollständig aus bzw. abgekühlt, Terrasse ordentlich hinterlassen.'];
      const key=checkoutItems.findIndex(item=>item[0]==='key');if(key>=0)checkoutItems[key]=['key','Schlüssel zurückgeben','Schlüssel nach den vereinbarten Abreisehinweisen zurückgeben.'];
      if(typeof renderCheckout==='function')renderCheckout();
    }
    const side=document.querySelector('.checkout-side');if(side){const h2=side.querySelector('h2');if(h2)h2.textContent='Bis 10:00 Uhr';const p=side.querySelector('p');if(p)p.textContent='Bitte das Haus bis 10:00 Uhr verlassen und den Schlüssel nach den vereinbarten Abreisehinweisen zurückgeben.';}
  }

  function patchHome(){
    const next=document.querySelector('.next-card');if(next){const p=next.querySelector('p');if(p)p.textContent='Adresse, Parkplatz, Check-in und die wichtigsten Hausinfos sind für euch gebündelt.';const list=next.querySelector('.mini-list');if(list)list.innerHTML='<span><b>15:00</b> Check-in</span><span><b>10:00</b> Check-out</span><span><b>1,5 km</b> bis Stadtkyll-Zentrum</span>';}
  }

  function addStyles(){
    if(document.querySelector('#verifiedContentStyles'))return;
    const style=document.createElement('style');style.id='verifiedContentStyles';
    style.textContent=`
      .verified-note{max-width:1100px;margin:.7rem auto 0;padding:0 1.25rem 1.4rem;color:var(--muted,rgba(255,255,255,.58));font-size:.76rem;line-height:1.5}
      .verified-facts{margin-top:1rem}.verified-info{margin-top:1rem}.verified-copy{margin-top:1rem;color:var(--muted,rgba(255,255,255,.66))}.verified-facts .card{min-height:100%}
      .stay-experiences{padding-top:1.5rem;padding-bottom:2.5rem}.stay-experiences-intro,.stay-experience-head{display:flex;align-items:flex-end;justify-content:space-between;gap:1.25rem}.stay-experiences-intro{padding:1.2rem 0 .3rem}.stay-experiences-intro>div,.stay-experience-head>div{max-width:760px}.stay-experiences-intro h2,.stay-experience-head h2{margin:.35rem 0 .45rem}.stay-experiences-intro p,.stay-experience-head p{margin:0;color:var(--muted,rgba(255,255,255,.65));line-height:1.55}.stay-experience-group{margin-top:2.4rem}.stay-experience-controls{display:flex;gap:.45rem;flex:0 0 auto}.stay-experience-controls button{width:2.7rem;height:2.7rem;border-radius:999px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.055);color:inherit;font:inherit;font-size:1.45rem;cursor:pointer}.stay-experience-rail{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(285px,32%);gap:1rem;overflow-x:auto;scroll-snap-type:x mandatory;overscroll-behavior-inline:contain;padding:.9rem .1rem .8rem;scrollbar-width:none}.stay-experience-rail::-webkit-scrollbar{display:none}.stay-experience-card{scroll-snap-align:start;display:grid;grid-template-rows:210px 1fr;min-height:410px;border-radius:1.35rem;overflow:hidden;text-decoration:none;color:inherit;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.1);box-shadow:0 18px 45px rgba(0,0,0,.18);transition:transform .2s ease,border-color .2s ease,background .2s ease}.stay-experience-card:hover{transform:translateY(-3px);border-color:rgba(255,255,255,.23);background:rgba(255,255,255,.06)}.stay-experience-media{position:relative;overflow:hidden;background:linear-gradient(135deg,rgba(62,88,70,.7),rgba(22,39,32,.95))}.stay-experience-media img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .35s ease}.stay-experience-card:hover .stay-experience-media img{transform:scale(1.025)}.stay-experience-media:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 42%,rgba(4,10,8,.58))}.stay-experience-media.image-missing img{display:none}.stay-experience-tag{position:absolute;z-index:1;left:.9rem;bottom:.8rem;padding:.35rem .58rem;border-radius:999px;background:rgba(6,13,10,.72);border:1px solid rgba(255,255,255,.16);backdrop-filter:blur(8px);font-size:.68rem;font-weight:700}.stay-experience-copy{display:flex;flex-direction:column;padding:1rem 1rem 1.1rem}.stay-experience-copy small{color:var(--muted,rgba(255,255,255,.58));font-size:.73rem}.stay-experience-copy h3{margin:.3rem 0 .45rem;font-size:1.15rem}.stay-experience-copy p{margin:0;color:var(--muted,rgba(255,255,255,.68));font-size:.84rem;line-height:1.55}.stay-experience-link{margin-top:auto;padding-top:.9rem;font-size:.79rem;font-weight:700}.stay-experience-link b{font-size:.95rem}.stay-experience-note{margin:1rem 0 0;color:var(--muted,rgba(255,255,255,.55));font-size:.72rem;line-height:1.5}
      @media(max-width:900px){.stay-experience-rail{grid-auto-columns:minmax(280px,58%)}.stay-experiences-intro,.stay-experience-head{align-items:flex-start}}
      @media(max-width:620px){.stay-experiences{padding-top:.5rem}.stay-experiences-intro{display:block}.stay-experiences-intro .text-link{margin-top:.8rem}.stay-experience-head{align-items:flex-end}.stay-experience-head p{font-size:.84rem}.stay-experience-rail{grid-auto-columns:84%;gap:.8rem;margin-right:-1rem}.stay-experience-card{grid-template-rows:185px 1fr;min-height:380px}.stay-experience-controls button{width:2.35rem;height:2.35rem}.stay-experience-copy{padding:.9rem}.stay-experience-copy h3{font-size:1.05rem}}
      @media(prefers-reduced-motion:reduce){.stay-experience-card,.stay-experience-media img{transition:none!important}.stay-experience-rail{scroll-behavior:auto}}
    `;
    document.head.appendChild(style);
  }

  function apply(){addStyles();patchGuide();patchHome();patchStay();patchHouse();patchCheckout();}
  const run=()=>setTimeout(apply,60);
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',run,{once:true}):run();
})();