import json
import os

locales = ['es', 'fr', 'de', 'it', 'pt']

# Translations for Interface Content
translations = {
    'es': {
        'sections': { 'projectLibrary': 'Biblioteca de Proyectos', 'interface': 'Interfaz del Editor' },
        'interfaceContent': {
            'toolbar': {
                'title': 'Barra de Herramientas Superior',
                'desc': 'Acceso rápido a todas las herramientas de dibujo y operaciones de archivo.',
                'tools': [
                    { 'icon': '🖱️', 'name': 'Seleccionar', 'desc': 'Seleccionar y mover formas' },
                    { 'icon': '✏️', 'name': 'Editar Puntos', 'desc': 'Editar puntos de anclaje y tiradores' },
                    { 'icon': '✒️', 'name': 'Pluma', 'desc': 'Dibujar trazos libres' },
                    { 'icon': '📏', 'name': 'Línea', 'desc': 'Dibujar líneas rectas' },
                    { 'icon': '▭', 'name': 'Rectángulo', 'desc': 'Dibujar rectángulos' },
                    { 'icon': '⭕', 'name': 'Círculo', 'desc': 'Dibujar círculos y elipses' },
                    { 'icon': '⬟', 'name': 'Polígono', 'desc': 'Dibujar polígonos regulares' },
                    { 'icon': '🎨', 'name': 'Bézier', 'desc': 'Dibujar curvas Bézier' }
                ],
                'buttons': {
                    'import': 'Importar archivos SVG existentes',
                    'export': 'Exportar diseño como SVG',
                    'projectName': 'Muestra el nombre del proyecto y conteo de formas'
                }
            },
            'canvas': {
                'title': 'Lienzo Infinito',
                'desc': 'El espacio de trabajo principal para tus diseños.',
                'features': [
                    'Desplazamiento infinito en todas direcciones',
                    'Regla con medidas en píxeles',
                    'Cuadrícula para alineación precisa',
                    'Zoom con rueda o gesto de pellizco',
                    'Panorámica arrastrando con espacio o dos dedos',
                    'Caja de selección visible al seleccionar'
                ],
                'tip': 'Usa ⌘0 para reiniciar zoom, ⌘1 para ajustar a ventana.'
            },
            'toolsPanel': {
                'title': 'Panel de Herramientas',
                'desc': 'Acceso rápido a operaciones comunes e información de herramienta.',
                'sections': {
                    'currentTool': { 'title': 'Herramienta Actual', 'desc': 'Muestra la herramienta seleccionada.' },
                    'elementOps': { 'title': 'Operaciones de Elemento', 'desc': 'Copiar o eliminar elemento seleccionado.' },
                    'canvasOps': { 'title': 'Operaciones de Lienzo', 'desc': 'Reiniciar vista y ajustar nivel de zoom.' },
                    'quickOps': { 'title': 'Operaciones Rápidas', 'desc': 'Limpiar lienzo, seleccionar todo o deseleccionar.' }
                }
            },
            'layersPanel': {
                'title': 'Panel de Capas',
                'desc': 'Gestiona la jerarquía de diseño (similar a Photoshop/Illustrator).',
                'features': [
                    'Ver grupos y formas en estructura de árbol',
                    'Expandir grupos para ver ítems anidados',
                    'Bloquear formas para evitar edición',
                    'Alternar visibilidad (icono de ojo)',
                    'Conteo total de capas arriba'
                ]
            },
            'templatesPanel': {
                'title': 'Panel de Plantillas',
                'desc': 'Las plantillas definen la forma de las conexiones de las piezas.',
                'features': [
                    'Plantillas integradas: Estándar, Recta, etc.',
                    'Crear plantillas personalizadas con "+"',
                    'Buscar plantillas por nombre',
                    'Seleccionar plantilla para generación'
                ]
            }
        }
    },
    'fr': {
        'sections': { 'projectLibrary': 'Bibliothèque de Projets', 'interface': 'Interface de l\'Éditeur' },
        'interfaceContent': {
            'toolbar': {
                'title': 'Barre d\'Outils Supérieure',
                'desc': 'Accès rapide à tous les outils de dessin et opérations de fichier.',
                'tools': [
                    { 'icon': '🖱️', 'name': 'Sélection', 'desc': 'Sélectionner et déplacer des formes' },
                    { 'icon': '✏️', 'name': 'Édition de Points', 'desc': 'Éditer points d\'ancrage et poignées' },
                    { 'icon': '✒️', 'name': 'Plume', 'desc': 'Dessiner des tracés libres' },
                    { 'icon': '📏', 'name': 'Ligne', 'desc': 'Dessiner des lignes droites' },
                    { 'icon': '▭', 'name': 'Rectangle', 'desc': 'Dessiner des rectangles' },
                    { 'icon': '⭕', 'name': 'Cercle', 'desc': 'Dessiner des cercles et ellipses' },
                    { 'icon': '⬟', 'name': 'Polygone', 'desc': 'Dessiner des polygones réguliers' },
                    { 'icon': '🎨', 'name': 'Bézier', 'desc': 'Dessiner des courbes de Bézier' }
                ],
                'buttons': {
                    'import': 'Importer des fichiers SVG existants',
                    'export': 'Exporter le design en SVG',
                    'projectName': 'Affiche le nom du projet et le nombre de formes'
                }
            },
            'canvas': {
                'title': 'Canevas Infini',
                'desc': 'L\'espace de travail principal pour vos designs.',
                'features': [
                    'Défilement infini dans toutes les directions',
                    'Règle avec mesures en pixels',
                    'Grille pour un alignement précis',
                    'Zoom avec molette ou pincement',
                    'Panoramique avec barre d\'espace ou deux doigts',
                    'Boîte de sélection visible lors de la sélection'
                ],
                'tip': 'Utilisez ⌘0 pour réinitialiser le zoom, ⌘1 pour ajuster à la fenêtre.'
            },
            'toolsPanel': {
                'title': 'Panneau d\'Outils',
                'desc': 'Accès rapide aux opérations courantes et infos outils.',
                'sections': {
                    'currentTool': { 'title': 'Outil Actuel', 'desc': 'Affiche l\'outil sélectionné.' },
                    'elementOps': { 'title': 'Opérations Élément', 'desc': 'Copier ou supprimer l\'élément sélectionné.' },
                    'canvasOps': { 'title': 'Opérations Canevas', 'desc': 'Réinitialiser la vue et ajuster le zoom.' },
                    'quickOps': { 'title': 'Opérations Rapides', 'desc': 'Effacer canevas, tout sélectionner, désélectionner.' }
                }
            },
            'layersPanel': {
                'title': 'Panneau de Calques',
                'desc': 'Gérez la hiérarchie de conception (comme Photoshop/Illustrator).',
                'features': [
                    'Voir groupes et formes en arborescence',
                    'Développer groupes pour voir éléments',
                    'Verrouiller formes (cadenas)',
                    'Basculer visibilité (œil)',
                    'Nombre total de calques en haut'
                ]
            },
            'templatesPanel': {
                'title': 'Panneau de Modèles',
                'desc': 'Les modèles définissent la forme des connexions des pièces.',
                'features': [
                    'Modèles intégrés : Standard, Ligne Droite, etc.',
                    'Créer modèles personnalisés avec "+"',
                    'Rechercher modèles par nom',
                    'Sélectionner modèle pour génération'
                ]
            }
        }
    },
    'de': {
        'sections': { 'projectLibrary': 'Projektbibliothek', 'interface': 'Editor-Oberfläche' },
        'interfaceContent': {
            'toolbar': {
                'title': 'Obere Werkzeugleiste',
                'desc': 'Schnellzugriff auf alle Zeichenwerkzeuge und Dateioperationen.',
                'tools': [
                    { 'icon': '🖱️', 'name': 'Auswahl', 'desc': 'Formen auswählen und verschieben' },
                    { 'icon': '✏️', 'name': 'Punkt-Editor', 'desc': 'Ankerpunkte und Griffe bearbeiten' },
                    { 'icon': '✒️', 'name': 'Stift', 'desc': 'Freihandpfade zeichnen' },
                    { 'icon': '📏', 'name': 'Linie', 'desc': 'Gerade Linien zeichnen' },
                    { 'icon': '▭', 'name': 'Rechteck', 'desc': 'Rechtecke zeichnen' },
                    { 'icon': '⭕', 'name': 'Kreis', 'desc': 'Kreise und Ellipsen zeichnen' },
                    { 'icon': '⬟', 'name': 'Polygon', 'desc': 'Regelmäßige Polygone zeichnen' },
                    { 'icon': '🎨', 'name': 'Bézier', 'desc': 'Bézier-Kurven zeichnen' }
                ],
                'buttons': {
                    'import': 'Vorhandene SVG-Dateien importieren',
                    'export': 'Design als SVG exportieren',
                    'projectName': 'Zeigt Projektnamen und Formanzahl'
                }
            },
            'canvas': {
                'title': 'Unendliche Leinwand',
                'desc': 'Der Hauptarbeitsbereich für Ihre Puzzle-Designs.',
                'features': [
                    'Unendliches Scrollen in alle Richtungen',
                    'Lineal mit Pixelmessungen',
                    'Raster für präzise Ausrichtung',
                    'Zoomen mit Mausrad oder Geste',
                    'Verschieben mit Leertaste oder zwei Fingern',
                    'Auswahlbox bei Selektion sichtbar'
                ],
                'tip': '⌘0 zum Zurücksetzen, ⌘1 zum Anpassen an Fenster.'
            },
            'toolsPanel': {
                'title': 'Werkzeug-Panel',
                'desc': 'Schnellzugriff auf häufige Operationen.',
                'sections': {
                    'currentTool': { 'title': 'Aktuelles Werkzeug', 'desc': 'Zeigt das gewählte Werkzeug.' },
                    'elementOps': { 'title': 'Element-OPs', 'desc': 'Kopieren oder Löschen des Elements.' },
                    'canvasOps': { 'title': 'Leinwand-OPs', 'desc': 'Ansicht zurücksetzen, Zoom anpassen.' },
                    'quickOps': { 'title': 'Schnell-OPs', 'desc': 'Leinwand leeren, Alles auswählen, Abwählen.' }
                }
            },
            'layersPanel': {
                'title': 'Ebenen-Panel',
                'desc': 'Verwalten Sie die Design-Hierarchie.',
                'features': [
                    'Gruppen und Formen in Baumstruktur',
                    'Gruppen erweitern',
                    'Formen sperren (Schloss)',
                    'Sichtbarkeit umschalten (Auge)',
                    'Gesamte Ebenenanzahl oben'
                ]
            },
            'templatesPanel': {
                'title': 'Vorlagen-Panel',
                'desc': 'Vorlagen definieren die Form der Teilverbindungen.',
                'features': [
                    'Integrierte Vorlagen: Standard, Gerade Linie usw.',
                    'Eigene Vorlagen mit "+" erstellen',
                    'Vorlagen nach Namen suchen',
                    'Vorlage zur Generierung wählen'
                ]
            }
        }
    },
    'it': {
        'sections': { 'projectLibrary': 'Libreria Progetti', 'interface': 'Interfaccia Editor' },
        'interfaceContent': {
            'toolbar': {
                'title': 'Barra degli Strumenti Superiore',
                'desc': 'Accesso rapido a strumenti di disegno e file.',
                'tools': [
                    { 'icon': '🖱️', 'name': 'Seleziona', 'desc': 'Seleziona e sposta forme' },
                    { 'icon': '✏️', 'name': 'Modifica Punti', 'desc': 'Modifica punti di ancoraggio' },
                    { 'icon': '✒️', 'name': 'Penna', 'desc': 'Disegna tracciati a mano libera' },
                    { 'icon': '📏', 'name': 'Linea', 'desc': 'Disegna linee rette' },
                    { 'icon': '▭', 'name': 'Rettangolo', 'desc': 'Disegna rettangoli' },
                    { 'icon': '⭕', 'name': 'Cerchio', 'desc': 'Disegna cerchi ed ellissi' },
                    { 'icon': '⬟', 'name': 'Poligono', 'desc': 'Disegna poligoni regolari' },
                    { 'icon': '🎨', 'name': 'Bézier', 'desc': 'Disegna curve di Bézier' }
                ],
                'buttons': {
                    'import': 'Importa file SVG esistenti',
                    'export': 'Esporta design come SVG',
                    'projectName': 'Mostra nome progetto e conteggio forme'
                }
            },
            'canvas': {
                'title': 'Tela Infinita',
                'desc': 'Lo spazio di lavoro principale per i tuoi design.',
                'features': [
                    'Scorrimento infinito in tutte le direzioni',
                    'Righello con misure in pixel',
                    'Griglia per allineamento preciso',
                    'Zoom con rotella o pizzico',
                    'Panoramica con barra spaziatrice o due dita',
                    'Riquadro di selezione visibile'
                ],
                'tip': 'Usa ⌘0 per reset zoom, ⌘1 per adattare alla finestra.'
            },
            'toolsPanel': {
                'title': 'Pannello Strumenti',
                'desc': 'Accesso rapido a operazioni comuni.',
                'sections': {
                    'currentTool': { 'title': 'Strumento Attuale', 'desc': 'Mostra lo strumento selezionato.' },
                    'elementOps': { 'title': 'Op. Elemento', 'desc': 'Copia o elimina elemento selezionato.' },
                    'canvasOps': { 'title': 'Op. Tela', 'desc': 'Resetta vista e regola zoom.' },
                    'quickOps': { 'title': 'Op. Rapide', 'desc': 'Pulisci tela, Seleziona tutto.' }
                }
            },
            'layersPanel': {
                'title': 'Pannello Livelli',
                'desc': 'Gestisci la gerarchia del design.',
                'features': [
                    'Vedi gruppi e forme ad albero',
                    'Espandi gruppi',
                    'Blocca forme (lucchetto)',
                    'Visibilità (occhio)',
                    'Conteggio livelli in alto'
                ]
            },
            'templatesPanel': {
                'title': 'Pannello Modelli',
                'desc': 'I modelli definiscono la forma delle connessioni.',
                'features': [
                    'Modelli integrati: Standard, Linea retta, ecc.',
                    'Crea modelli personalizzati con "+"',
                    'Cerca modelli per nome',
                    'Seleziona modello per generazione'
                ]
            }
        }
    },
    'pt': {
        'sections': { 'projectLibrary': 'Biblioteca de Projetos', 'interface': 'Interface do Editor' },
        'interfaceContent': {
            'toolbar': {
                'title': 'Barra de Ferramentas Superior',
                'desc': 'Acesso rápido a ferramentas de desenho e arquivos.',
                'tools': [
                    { 'icon': '🖱️', 'name': 'Selecionar', 'desc': 'Selecionar e mover formas' },
                    { 'icon': '✏️', 'name': 'Editar Pontos', 'desc': 'Editar pontos de ancoragem' },
                    { 'icon': '✒️', 'name': 'Caneta', 'desc': 'Desenhar caminhos livres' },
                    { 'icon': '📏', 'name': 'Linha', 'desc': 'Desenhar linhas retas' },
                    { 'icon': '▭', 'name': 'Retângulo', 'desc': 'Desenhar retângulos' },
                    { 'icon': '⭕', 'name': 'Círculo', 'desc': 'Desenhar círculos e elipses' },
                    { 'icon': '⬟', 'name': 'Polígono', 'desc': 'Desenhar polígonos regulares' },
                    { 'icon': '🎨', 'name': 'Bézier', 'desc': 'Desenhar curvas de Bézier' }
                ],
                'buttons': {
                    'import': 'Importar arquivos SVG existentes',
                    'export': 'Exportar design como SVG',
                    'projectName': 'Mostra nome do projeto e contagem'
                }
            },
            'canvas': {
                'title': 'Tela Infinita',
                'desc': 'Espaço de trabalho principal para seus designs.',
                'features': [
                    'Rolagem infinita em todas as direções',
                    'Régua com medidas em pixels',
                    'Grade para alinhamento preciso',
                    'Zoom com roda ou pinça',
                    'Panorâmica com barra de espaço ou dois dedos',
                    'Caixa de seleção visível'
                ],
                'tip': 'Use ⌘0 para resetar zoom, ⌘1 para ajustar à janela.'
            },
            'toolsPanel': {
                'title': 'Painel de Ferramentas',
                'desc': 'Acesso rápido a operações comuns.',
                'sections': {
                    'currentTool': { 'title': 'Ferramenta Atual', 'desc': 'Mostra ferramenta selecionada.' },
                    'elementOps': { 'title': 'Ops Elemento', 'desc': 'Copiar ou excluir selecionado.' },
                    'canvasOps': { 'title': 'Ops Tela', 'desc': 'Resetar visão e zoom.' },
                    'quickOps': { 'title': 'Ops Rápidas', 'desc': 'Limpar tela, Selecionar tudo.' }
                }
            },
            'layersPanel': {
                'title': 'Painel de Camadas',
                'desc': 'Gerencie a hierarquia de design.',
                'features': [
                    'Ver grupos e formas',
                    'Expandir grupos',
                    'Bloquear formas (cadeado)',
                    'Visibilidade (olho)',
                    'Contagem total de camadas'
                ]
            },
            'templatesPanel': {
                'title': 'Painel de Modelos',
                'desc': 'Modelos definem a forma das conexões.',
                'features': [
                    'Modelos integrados: Padrão, Linha Reta, etc.',
                    'Criar modelos personalizados com "+"',
                    'Buscar modelos por nome',
                    'Selecionar modelo para geração'
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
                    if isinstance(v2, dict): # For Tools List, Features List, etc - actually they are Lists in some cases
                         target_ic[key][k2] = v2 # Just overwrite/set if it's a dict or list
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
