import json
import os

locales = ['nl', 'da', 'sv', 'no', 'fi']

translations = {
    'nl': {
        'sections': { 'projectLibrary': 'Projectbibliotheek', 'interface': 'Editor Interface' },
        'interfaceContent': {
            'toolbar': {
                'title': 'Bovenste Werkbalk',
                'desc': 'Snelle toegang tot alle tekengereedschappen en bestandsbewerkingen.',
                'tools': [
                    { 'icon': '🖱️', 'name': 'Selecteren', 'desc': 'Vormen selecteren en verplaatsen' },
                    { 'icon': '✏️', 'name': 'Punten Bewerken', 'desc': 'Ankerpunten en handgrepen bewerken' },
                    { 'icon': '✒️', 'name': 'Pen', 'desc': 'Vrije vormen tekenen' },
                    { 'icon': '📏', 'name': 'Lijn', 'desc': 'Rechte lijnen tekenen' },
                    { 'icon': '▭', 'name': 'Rechthoek', 'desc': 'Rechthoeken tekenen' },
                    { 'icon': '⭕', 'name': 'Cirkel', 'desc': 'Cirkels en ellipsen tekenen' },
                    { 'icon': '⬟', 'name': 'Veelhoek', 'desc': 'Regelmatige veelhoeken tekenen' },
                    { 'icon': '🎨', 'name': 'Bezier', 'desc': 'Bezier-curven tekenen' }
                ],
                'buttons': {
                    'import': 'Bestaande SVG-bestanden importeren',
                    'export': 'Ontwerp exporteren als SVG',
                    'projectName': 'Toont projectnaam en aantal vormen'
                }
            },
            'canvas': {
                'title': 'Oneindig Canvas',
                'desc': 'De belangrijkste werkruimte voor je ontwerpen.',
                'features': [
                    'Oneindig scrollen in alle richtingen',
                    'Liniaal met pixelmetingen',
                    'Raster voor nauwkeurige uitlijning',
                    'Zoomen met scrollwiel of knijpbeweging',
                    'Pannen met spatiebalk of twee vingers',
                    'Selectiekader zichtbaar bij selectie'
                ],
                'tip': 'Gebruik ⌘0 om zoom te resetten, ⌘1 om aan venster aan te passen.'
            },
            'toolsPanel': {
                'title': 'Gereedschapspaneel',
                'desc': 'Snelle toegang tot veelvoorkomende bewerkingen.',
                'sections': {
                    'currentTool': { 'title': 'Huidig Gereedschap', 'desc': 'Toont het geselecteerde gereedschap.' },
                    'elementOps': { 'title': 'Element Ops', 'desc': 'Geselecteerd element kopiëren of verwijderen.' },
                    'canvasOps': { 'title': 'Canvas Ops', 'desc': 'Weergave resetten en zoom aanpassen.' },
                    'quickOps': { 'title': 'Snelle Ops', 'desc': 'Canvas wissen, Alles selecteren, Deselecteren.' }
                }
            },
            'layersPanel': {
                'title': 'Lagenpaneel',
                'desc': 'Beheer de ontwerphiërarchie.',
                'features': [
                    'Zie groepen en vormen in boomstructuur',
                    'Groepen uitvouwen om items te zien',
                    'Vormen vergrendelen (slot)',
                    'Zichtbaarheid wisselen (oog)',
                    'Totaal aantal lagen bovenaan'
                ]
            },
            'templatesPanel': {
                'title': 'Sjablonenpaneel',
                'desc': 'Sjablonen definiëren de vorm van verbindingen.',
                'features': [
                    'Ingebouwde sjablonen: Standaard, Rechte lijn, enz.',
                    'Aangepaste sjablonen maken met "+"',
                    'Sjablonen zoeken op naam',
                    'Sjabloon selecteren voor generatie'
                ]
            }
        }
    },
    'da': {
        'sections': { 'projectLibrary': 'Projektbibliotek', 'interface': 'Editor Interface' },
        'interfaceContent': {
            'toolbar': {
                'title': 'Øverste Værktøjslinje',
                'desc': 'Hurtig adgang til alle tegneværktøjer og filoperationer.',
                'tools': [
                    { 'icon': '🖱️', 'name': 'Vælg', 'desc': 'Vælg og flyt former' },
                    { 'icon': '✏️', 'name': 'Rediger Punkter', 'desc': 'Rediger ankerpunkter og håndtag' },
                    { 'icon': '✒️', 'name': 'Pen', 'desc': 'Tegn frihåndsformer' },
                    { 'icon': '📏', 'name': 'Linje', 'desc': 'Tegn rette linjer' },
                    { 'icon': '▭', 'name': 'Rektangel', 'desc': 'Tegn rektangler' },
                    { 'icon': '⭕', 'name': 'Cirkel', 'desc': 'Tegn cirkler og ellipser' },
                    { 'icon': '⬟', 'name': 'Polygon', 'desc': 'Tegn regulære polygoner' },
                    { 'icon': '🎨', 'name': 'Bezier', 'desc': 'Tegn Bezier-kurver' }
                ],
                'buttons': {
                    'import': 'Importer eksisterende SVG-filer',
                    'export': 'Eksporter design som SVG',
                    'projectName': 'Viser projektnavn og forme antal'
                }
            },
            'canvas': {
                'title': 'Uendeligt Lærred',
                'desc': 'Det primære arbejdsområde til dine designs.',
                'features': [
                    'Uendelig scrolling i alle retninger',
                    'Lineal med pixelmålinger',
                    'Gitter til præcis justering',
                    'Zoom med rullehjul eller knibebevægelse',
                    'Panorer med mellemrumstast eller to fingre',
                    'Markeringsboks synlig ved valg'
                ],
                'tip': 'Brug ⌘0 til at nulstille zoom, ⌘1 til at tilpasse vindue.'
            },
            'toolsPanel': {
                'title': 'Værktøjspanel',
                'desc': 'Hurtig adgang til almindelige operationer.',
                'sections': {
                    'currentTool': { 'title': 'Nuværende Værktøj', 'desc': 'Viser det valgte værktøj.' },
                    'elementOps': { 'title': 'Element Ops', 'desc': 'Kopier eller slet valgte element.' },
                    'canvasOps': { 'title': 'Lærred Ops', 'desc': 'Nulstil visning og juster zoom.' },
                    'quickOps': { 'title': 'Hurtige Ops', 'desc': 'Ryd lærred, Vælg alt, Fravælg.' }
                }
            },
            'layersPanel': {
                'title': 'Lagpanel',
                'desc': 'Administrer designhierarki.',
                'features': [
                    'Se grupper og former i træstruktur',
                    'Udvid grupper for at se elementer',
                    'Lås former (lås)',
                    'Skift synlighed (øje)',
                    'Samlet lagantal øverst'
                ]
            },
            'templatesPanel': {
                'title': 'Skabelonpanel',
                'desc': 'Skabeloner definerer formen på forbindelser.',
                'features': [
                    'Indbyggede skabeloner: Standard, Lige linje, osv.',
                    'Opret brugerdefinerede skabeloner med "+"',
                    'Søg skabeloner efter navn',
                    'Vælg skabelon til generering'
                ]
            }
        }
    },
    'sv': {
        'sections': { 'projectLibrary': 'Projektbibliotek', 'interface': 'Editor Gränssnitt' },
        'interfaceContent': {
            'toolbar': {
                'title': 'Övre Verktygsfält',
                'desc': 'Snabb åtkomst till alla ritverktyg och filåtgärder.',
                'tools': [
                    { 'icon': '🖱️', 'name': 'Välj', 'desc': 'Välj och flytta former' },
                    { 'icon': '✏️', 'name': 'Redigera Punkter', 'desc': 'Redigera ankar-punkter och handtag' },
                    { 'icon': '✒️', 'name': 'Penna', 'desc': 'Rita frihandsbanor' },
                    { 'icon': '📏', 'name': 'Linje', 'desc': 'Rita räta linjer' },
                    { 'icon': '▭', 'name': 'Rektangel', 'desc': 'Rita rektanglar' },
                    { 'icon': '⭕', 'name': 'Cirkel', 'desc': 'Rita cirklar och ellipser' },
                    { 'icon': '⬟', 'name': 'Polygon', 'desc': 'Rita regelbundna polygoner' },
                    { 'icon': '🎨', 'name': 'Bezier', 'desc': 'Rita Bezier-kurvor' }
                ],
                'buttons': {
                    'import': 'Importera befintliga SVG-filer',
                    'export': 'Exportera design som SVG',
                    'projectName': 'Visar projektnamn och formantal'
                }
            },
            'canvas': {
                'title': 'Oändlig Canvas',
                'desc': 'Huvudytan för dina mönster.',
                'features': [
                    'Oändlig rullning åt alla håll',
                    'Linjal med pixelmått',
                    'Rutnät för exakt justering',
                    'Zooma med scrollhjul eller nyp',
                    'Panorera med mellanslag eller två fingrar',
                    'Markeringsruta synlig vid val'
                ],
                'tip': 'Använd ⌘0 för att återställa zoom, ⌘1 för att anpassa till fönster.'
            },
            'toolsPanel': {
                'title': 'Verktygspanel',
                'desc': 'Snabb åtkomst till vanliga åtgärder.',
                'sections': {
                    'currentTool': { 'title': 'Aktuellt Verktyg', 'desc': 'Visar valt verktyg.' },
                    'elementOps': { 'title': 'Element Ops', 'desc': 'Kopiera eller ta bort valt element.' },
                    'canvasOps': { 'title': 'Canvas Ops', 'desc': 'Återställ vy och justera zoom.' },
                    'quickOps': { 'title': 'Snabba Ops', 'desc': 'Rensa canvas, Markera allt, Avmarkera.' }
                }
            },
            'layersPanel': {
                'title': 'Lagerpanel',
                'desc': 'Hantera designhierarkin.',
                'features': [
                    'Se grupper och former i trädstruktur',
                    'Expandera grupper för objekt',
                    'Lås former (lås)',
                    'Växla synlighet (öga)',
                    'Totalt lagerantal överst'
                ]
            },
            'templatesPanel': {
                'title': 'Mallpanel',
                'desc': 'Mallar definierar formen på anslutningar.',
                'features': [
                    'Inbyggda mallar: Standard, Rak linje, osv.',
                    'Skapa egna mallar med "+"',
                    'Sök mallar efter namn',
                    'Välj mall för generering'
                ]
            }
        }
    },
    'no': {
        'sections': { 'projectLibrary': 'Prosjektbibliotek', 'interface': 'Editor Grensesnitt' },
        'interfaceContent': {
            'toolbar': {
                'title': 'Topp Verktøylinje',
                'desc': 'Rask tilgang til alle tegneverktøy og filoperasjoner.',
                'tools': [
                    { 'icon': '🖱️', 'name': 'Velg', 'desc': 'Velg og flytt former' },
                    { 'icon': '✏️', 'name': 'Rediger Punkter', 'desc': 'Rediger ankerpunkter og håndtak' },
                    { 'icon': '✒️', 'name': 'Penn', 'desc': 'Tegn frihåndsbaner' },
                    { 'icon': '📏', 'name': 'Linje', 'desc': 'Tegn rette linjer' },
                    { 'icon': '▭', 'name': 'Rektangel', 'desc': 'Tegn rektangler' },
                    { 'icon': '⭕', 'name': 'Sirkel', 'desc': 'Tegn sirkler og ellipser' },
                    { 'icon': '⬟', 'name': 'Polygon', 'desc': 'Tegn regulære polygoner' },
                    { 'icon': '🎨', 'name': 'Bezier', 'desc': 'Tegn Bezier-kurver' }
                ],
                'buttons': {
                    'import': 'Importer eksisterende SVG-filer',
                    'export': 'Eksporter design som SVG',
                    'projectName': 'Viser prosjektnavn og formtall'
                }
            },
            'canvas': {
                'title': 'Uendelig Lerret',
                'desc': 'Hovedarbeidsområdet for dine design.',
                'features': [
                    'Uendelig rulling i alle retninger',
                    'Linjal med pikselmålinger',
                    'Rutenett for presis justering',
                    'Zoom med rullehjul eller klypegest',
                    'Panorer med mellomromstast eller to fingre',
                    'Valgboks synlig ved valg'
                ],
                'tip': 'Bruk ⌘0 for å nullstille zoom, ⌘1 for å tilpasse til vindu.'
            },
            'toolsPanel': {
                'title': 'Verktøypanel',
                'desc': 'Rask tilgang til vanlige operasjoner.',
                'sections': {
                    'currentTool': { 'title': 'Gjeldende Verktøy', 'desc': 'Viser valgt verktøy.' },
                    'elementOps': { 'title': 'Element Ops', 'desc': 'Kopier eller slett valgt element.' },
                    'canvasOps': { 'title': 'Lerret Ops', 'desc': 'Nullstill visning og juster zoom.' },
                    'quickOps': { 'title': 'Raske Ops', 'desc': 'Tøm lerret, Velg alt, Avvelg.' }
                }
            },
            'layersPanel': {
                'title': 'Lagpanel',
                'desc': 'Administrer designhierarkiet.',
                'features': [
                    'Se grupper og former i trestruktur',
                    'Utvid grupper for å se elementer',
                    'Lås former (lås)',
                    'Bytt synlighet (øye)',
                    'Totalt lagantall øverst'
                ]
            },
            'templatesPanel': {
                'title': 'Malpanel',
                'desc': 'Maler definerer formen på tilkoblinger.',
                'features': [
                    'Innebygde maler: Standard, Rett linje, osv.',
                    'Lag egne maler med "+"',
                    'Søk etter maler ved navn',
                    'Velg mal for generering'
                ]
            }
        }
    },
    'fi': {
        'sections': { 'projectLibrary': 'Projektikirjasto', 'interface': 'Editorin Käyttöliittymä' },
        'interfaceContent': {
            'toolbar': {
                'title': 'Ylätyökalupalkki',
                'desc': 'Nopea pääsy kaikkiin piirtotyökaluihin ja tiedostotoimintoihin.',
                'tools': [
                    { 'icon': '🖱️', 'name': 'Valitse', 'desc': 'Valitse ja siirrä muotoja' },
                    { 'icon': '✏️', 'name': 'Muokkaa Pisteitä', 'desc': 'Muokkaa ankkuripisteitä ja kahvoja' },
                    { 'icon': '✒️', 'name': 'Kynä', 'desc': 'Piirrä vapaan käden polkuja' },
                    { 'icon': '📏', 'name': 'Viiva', 'desc': 'Piirrä suoria viivoja' },
                    { 'icon': '▭', 'name': 'Suorakulmio', 'desc': 'Piirrä suorakulmioita' },
                    { 'icon': '⭕', 'name': 'Ympyrä', 'desc': 'Piirrä ympyröitä ja ellipsejä' },
                    { 'icon': '⬟', 'name': 'Monikulmio', 'desc': 'Piirrä säännöllisiä monikulmioita' },
                    { 'icon': '🎨', 'name': 'Bezier', 'desc': 'Piirrä Bezier-käyrät' }
                ],
                'buttons': {
                    'import': 'Tuo olemassa olevat SVG-tiedostot',
                    'export': 'Vie suunnittelu SVG:nä',
                    'projectName': 'Näyttää projektin nimen ja muotojen määrän'
                }
            },
            'canvas': {
                'title': 'Ääretön Kangas',
                'desc': 'Päätyötila malleillesi.',
                'features': [
                    'Ääretön vieritys kaikkiin suuntiin',
                    'Viivain pikselimittauksilla',
                    'Ruudukko tarkkaa kohdistusta varten',
                    'Zoomaus hiiren rullalla tai nipistyksellä',
                    'Panoroi välilyönnillä tai kahdella sormella',
                    'Valintalaatikko näkyvissä valinnan aikana'
                ],
                'tip': 'Käytä ⌘0 nollataksesi zoomin, ⌘1 sovittaaksesi ikkunaan.'
            },
            'toolsPanel': {
                'title': 'Työkalupaneeli',
                'desc': 'Nopea pääsy yleisiin toimintoihin.',
                'sections': {
                    'currentTool': { 'title': 'Nykyinen Työkalu', 'desc': 'Näyttää valitun työkalun.' },
                    'elementOps': { 'title': 'Elementti Ops', 'desc': 'Kopioi tai poista valittu elementti.' },
                    'canvasOps': { 'title': 'Kangas Ops', 'desc': 'Nollaa näkymä ja säädä zoomia.' },
                    'quickOps': { 'title': 'Pika Ops', 'desc': 'Tyhjennä kangas, Valitse kaikki, Poista valinta.' }
                }
            },
            'layersPanel': {
                'title': 'Tasopaneeli',
                'desc': 'Hallitse suunnitteluhierarkiaa.',
                'features': [
                    'Katso ryhmät ja muodot puurakenteessa',
                    'Laajenna ryhmät nähdäksesi kohteet',
                    'Lukitse muodot (lukko)',
                    'Vaihda näkyvyyttä (silmä)',
                    'Tasojen kokonaismäärä ylhäällä'
                ]
            },
            'templatesPanel': {
                'title': 'Mallipaneeli',
                'desc': 'Mallit määrittelevät liitosten muodon.',
                'features': [
                    'Sisäänrakennetut mallit: Vakio, Suora viiva jne.',
                    'Luo mukautettuja malleja "+"-merkillä',
                    'Hae malleja nimellä',
                    'Valitse malli luomista varten'
                ]
            }
        }
    }
}

def update_json(locale):
    filepath = f'src/messages/{locale}.json'
    if not os.path.exists(filepath):
        return
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # 1. Update Help.sections
    if 'Help' not in data:
        data['Help'] = {}
    if 'sections' not in data['Help']:
        data['Help']['sections'] = {}
    
    # Update projectLibrary and interface keys in sections
    for key, val in translations[locale]['sections'].items():
        data['Help']['sections'][key] = val
        
    # 2. Update Help.interfaceContent (Deep Merge)
    if 'interfaceContent' not in data['Help']:
        data['Help']['interfaceContent'] = {}
        
    source_ic = translations[locale]['interfaceContent']
    target_ic = data['Help']['interfaceContent']
    
    for key, value in source_ic.items():
        if isinstance(value, dict):
            if key not in target_ic:
                target_ic[key] = {}
            for k2, v2 in value.items():
                if isinstance(v2, dict):
                    if k2 not in target_ic[key]:
                        target_ic[key][k2] = {}
                    if isinstance(v2, dict): 
                         target_ic[key][k2] = v2 
                    else:
                         target_ic[key][k2] = v2
                else:
                    target_ic[key][k2] = v2
        else:
            target_ic[key] = value

    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

for locale in locales:
    update_json(locale)
