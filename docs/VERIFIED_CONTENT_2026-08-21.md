# Waldhaus2 — verified content baseline (2026-08-21)

This document records the public facts used in the guest-facing Waldhaus2 content. The goal is to avoid reintroducing demo assumptions or stale information from the original prototype.

## Property identity

- Ferienhaus Waldhaus
- Killerberg 2, 54589 Kerschenbach
- Public accommodation contact: +49 171 4421800

Primary source: Eifel Tourismus / Gerolsteiner Land accommodation listing.
- https://www.eifel.info/unterkuenfte/waldhaus-1
- https://www.gerolsteiner-land.de/unterkuenfte/waldhaus-1

## Verified property facts used in the app

- Nurdach holiday house in a quiet private holiday-park setting
- approx. 80 m²
- up to 4 guests
- 2 bedrooms
- 1 bathroom with shower/WC
- kitchen / living-dining area
- Wi-Fi
- parking at/on the property
- terrace
- own garden
- barbecue possibility
- satellite TV / TV
- non-smoking
- pets welcome / pets allowed
- family-friendly

Supporting sources:
- https://www.eifel.info/unterkuenfte/waldhaus-1
- https://www.rlp-tourismus.com/de/unterkunft/ferienhaus-waldhaus/unterkunft.html
- https://www.booking.com/hotel/de/waldhaus-kerschenbach.de.html
- https://www.fewo-direkt.de/ferienwohnung-ferienhaus/p5003868

## Publicly listed arrival / departure rules

Current FeWo-direkt / public booking profile:
- check-in from 15:00
- check-out before 10:00
- minimum renting age: 18
- children allowed
- events not allowed
- pets allowed
- smoking not allowed

Source:
- https://www.fewo-direkt.de/ferienwohnung-ferienhaus/p5003868

The app uses only the high-confidence check-in/check-out and general house rules. A publicly listed EUR 100 deposit is **not** currently shown in Waldhaus2 because payment/deposit terms can vary by booking channel and should be owner-confirmed before becoming a canonical house rule.

## Location facts

Rheinland-Pfalz tourism currently lists approximately:
- hiking trail: 50 m
- forest: 100 m
- cycle route: 700 m
- river: 1,000 m
- centre: 1,500 m
- lake: 2,000 m
- station: 5,000 m
- motorway connection: 10,000 m

Source:
- https://www.rlp-tourismus.com/de/unterkunft/ferienhaus-waldhaus/unterkunft.html

Only the most useful short-distance facts are surfaced in the UI to keep it uncluttered.

## Guest contribution

Verbandsgemeinde Gerolstein currently levies EUR 0.75 per liable guest and overnight stay. Children under six and qualifying business / education travellers are exempt.

Official sources:
- https://www.gerolstein.de/dokumente/satzungen/2023-10-13-satzung-ueber-die-erhebung-eines-gaestebeitrags-in-der-verbandsgemeinde-gerolstein-ab-01.01.2024.pdf
- https://www.gerolstein.de/buergerservice/leistungen/RLP%3Aentry%3A5272537%3AANLR-VLR/gaestebeitrag-in-der-verbandsgemeinde-gerolstein-gaestekarte-vorteilsleistungen-und-meldesystem/

## Practical services

### REWE Stadtkyll
- Im Hahnborn 5, 54589 Stadtkyll
- Mon–Sat 07:00–22:00
- +49 6597 2990
- https://www.rewe.de/marktseite/stadtkyll/1765219/rewe-markt-im-hahnborn-5

### Marien-Apotheke Stadtkyll
- Hauptstraße 25, 54589 Stadtkyll
- Mon–Fri 08:30–19:00, Sat 08:30–13:00
- +49 6597 2319
- https://www.apotheke-stadtkyll.de/
- Municipality reference: https://www.stadtkyll.de/wohnen/gesundheit/apotheken/

### Doctors in Stadtkyll
- Gemeinschaftspraxis Tsallas, Kurallee 8, +49 6597 3609
- Gemeinschaftspraxis Steigerwald, Schwammertstraße 3, +49 6597 2425
- medical on-call service: 116117
- https://www.stadtkyll.de/wohnen/gesundheit/aerzte/

### Emergency
- emergency number: 112
- medical on-call service: 116117

### Tourist Information Stadtkyll
- Burgberg 22, 54589 Stadtkyll
- Mon–Fri 09:00–16:30
- Apr–Oct additionally Sat 09:00–13:00
- +49 6591 13-3200
- https://www.eifel.info/pois/tourist-information-oberes-kylltal

## Curated local guide

### Arnika-Route KB3
The newer official route sheet is authoritative for the app:
- 7 km
- approx. 1:50 h
- medium difficulty
- 127 m ascent/descent
- dog-friendly
- views toward Kronenburger See and historic Kronenburg
- https://www.gerolsteiner-land.de/action/download?downloadId=3389518&id=address_23802

Note: a Kerschenbach municipality summary describes local routes more generally and gives KB3 as 9 km. Waldhaus2 uses the newer, route-specific tourism data instead.

### XXL-Bank Kerschenbach
- on local route KB2
- panoramic view across the landscape and holiday village
- https://www.gerolsteiner-land.de/pois/xxl-bank-kerschenbach

### Wassererlebnisplatz Kerschenbach
- natural stream play / experience area
- shelter nearby
- stream access described by the municipality as barrier-free
- located at K1 / K2
- https://kerschenbach.de/wassererlebnisplatz-in-kerschenbach/

### Kronenburg
- historic castle village / walking destination
- https://www.eifel.info/pois/kronenburg

### Historische Wassermühle Birgel
- operating grain, saw, mustard and oil mills
- tours and gastronomy
- https://www.eifel.info/pois/historische-wassermuehle-birgel

## Food

### Pizzeria La Sirena, Stadtkyll
- Auelstraße 14–16
- Mediterranean / Italian
- current tourism listing: Wed closed; other days lunch + evening
- +49 6597 900623
- https://www.eifel.info/gastro/pizzeria-la-sirena-stadtkyll

### Bistro am See, Stadtkyll
- Wirftstraße / tennis hall at Wirftstausee
- regional food / home-style cooking
- current tourism listing: Mon–Fri 17:00–23:00; weekend closed
- +49 6597 9029606
- https://www.eifel.info/gastro/stadtkyll-bistro-am-see

### Restaurant Villa Kronenburg
- Burgbering 12, 53949 Dahlem-Kronenburg
- regional and vegetarian options, garden terrace, café / crêperie
- opening schedule varies by service; the app links to the live tourism source rather than hard-coding every time window
- https://www.eifel.info/gastro/restaurant-villa-kronenburg

## Intentionally not treated as verified house facts

### Indoor fireplace / stove
The old Waldhaus prototype prominently used an indoor `Kamin` workflow. Current public accommodation sources clearly verify a barbecue / outdoor area and Booking mentions an outdoor fireplace, but they do not provide sufficient evidence for the specific indoor fireplace workflow used by the prototype. Waldhaus2 therefore changes this guest-facing item to garden / terrace / barbecue until the owner confirms the exact fireplace equipment and operating instructions.

### Wi-Fi credentials
Wi-Fi availability is verified. SSID/password are private operational data and are not guessed or copied from the prototype. They require owner input.

### Key / lockbox instructions
Key access is publicly described, but the current lockbox workflow and code are not independently verified. The guest app therefore says that access details are supplied before arrival.

### Deposit
Some current booking profiles show EUR 100. It is not made canonical until the owner confirms that this applies across the intended direct-booking process.

## Maintenance rule

Time-sensitive opening hours and tourism details should carry a verification date and link to the authoritative source. Private house facts (Wi-Fi credentials, access instructions, personal contacts beyond publicly listed accommodation contact, appliance-specific instructions) must be owner-confirmed before publication.