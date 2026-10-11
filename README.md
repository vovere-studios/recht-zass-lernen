# Klar · Recht lernen

Eine responsive Lernseite für die Prüfung am 4. November 2026. Browserseitige Anwendung ohne Build und ohne laufende Serverkosten für die App-Logik.

## Lernstoff

69 eigene, einfach formulierte Lernkarten, aufgeteilt in zwölf kleine Themen:

- **Recht & Verantwortung:** 20 Fragen aus den fünf Prüfungsfotos, zusätzlich mit ursprünglicher Antwortauswahl für das Quiz.
- **Sozialversicherung:** 34 Karten zu den lesbaren Themen der ersten Tafel und den dazugehörigen Skriptseiten.
- **Ordinationsalltag:** 15 Karten zur zweiten Tafel: e-card, Admin-Karte, Überweisung, e-Rezept und Krankmeldung.

Die vollständigen PDF-Skripten sind **nicht** als vollständiger Fragenkatalog eingearbeitet. Der unklare Tafeleintrag „GV + EV + SV“ wird auf Nutzerwunsch ausgelassen und nach dem nächsten Unterricht ergänzt. Der erste Stand konzentriert sich auf Fotos und Tafeln. Die Original-PDFs und Fotos werden nicht veröffentlicht.

## Lernen

1. Bereich oder kleine Themenportion wählen.
2. Karte im Kopf beantworten und durch Antippen aufklappen. „Kann ich“ oder „Noch einmal“ wählen. Alternativ nach rechts wischen/ziehen für „Kann ich“, nach links für „Noch einmal“. Eine Vorschau zeigt die Entscheidung; kleine oder abgebrochene Gesten kehren zurück. Vertikales Scrollen und Pinch-Zoom bleiben möglich.
3. „Überspringen“ schiebt eine Karte oder Quizfrage ans Ende, ohne sie als gelernt oder falsch zu zählen. „Zurück“ zeigt den bisherigen Verlauf mit unveränderter Wertung. Eine übersprungene, noch offene Frage lässt sich aus dem Rückblick wieder aufnehmen.
4. Im Quiz eine von vier Antworten wählen. Die Auswahl wird gemischt. Im Modus **Üben** zeigt eine falsche Antwort die Lösung samt Erklärung und kommt später wieder. Diese Runde endet, wenn jede Frage einmal richtig beantwortet wurde.
5. Die **Prüfungsrunde** bewertet jede Frage einmal und zeigt ebenfalls sofort richtig/falsch. Falsch beantwortete Fragen werden in dieser Runde nicht wiederholt. Das Ergebnis ist der Anteil richtiger erster Antworten an allen gewählten Fragen, in Prozent. Eine Rückschau zeigt die eigenen Antworten und die Erklärungen.
6. Eine Runde lässt sich pausieren oder über „Beenden“ abschließen. Bei einer vorzeitig beendeten Prüfung zählen offene Fragen mit null Punkten. Der bereits gespeicherte Lernfortschritt bleibt erhalten.

Ein korrekt beantworteter Punkt ist kein Nachweis für langfristiges Behalten; erneutes Lernen an einem späteren Tag bleibt sinnvoll.

Der Stand und die laufende Runde werden im lokalen Browser gespeichert. Ein erneuter Fehler nimmt eine Frage wieder aus „gelernt“. Merklisten und die Suche helfen beim Wiederholen. Export und Import übertragen den Stand zwischen Geräten. Es gibt keine automatische geräteübergreifende Synchronisierung. Private Browserfenster und das Löschen von Website-Daten können den Stand entfernen.

Die Kartenübersicht bietet Suche, Bereichsauswahl, die Filter Alle / Gemerkt / Fehler / Noch offen und einzeln aufklappbare Antworten. Filter, Antworten und Kartenwechsel aktualisieren nur den betroffenen Abschnitt; Navigation und Lernkopf bleiben bestehen. Die Tab- und Filtermarkierungen bewegen sich kontinuierlich und reagieren auch auf schnelle Wechsel.

Die App nutzt auf Apple-Geräten die Systemschrift. Navigation, Abstände und Bewegungen orientieren sich an Apples Designvorgaben. Es handelt sich um eine Web-Umsetzung, keine native SwiftUI-App. Systemeinstellungen für reduzierte Bewegung werden berücksichtigt. Hell, Dunkel und System sind wählbar.

Auf Telefonen und Tablets bleibt die Navigation unten, auch auf dem iPad Air 11″ im Querformat. Touch-Geräte behalten sie auch bei breiteren Fenstern. Eine Seitenleiste erscheint erst ab 1200 CSS-Pixeln auf Geräten mit Mausbedienung und Hover. Kleinere Desktop-Fenster wechseln ebenfalls zur unteren Navigation. Die Suche aktualisiert ihre Ergebnisse ohne wiederholtes Einblenden bei jedem Buchstaben; sofortiges Aufklappen während eines Kartenwechsels bleibt möglich.

## Lokal öffnen

```sh
python3 -m http.server 8896 --bind 127.0.0.1
```

Dann `http://127.0.0.1:8896` öffnen. Ein Doppelklick auf index.html funktioniert wegen der JavaScript-Module nicht in jedem Browser.

## Hosting

Für einen Link ohne Anmeldung eignet sich GitHub Pages aus einem öffentlichen Repository. Alle Dateien dieses Ordners werden in das Repository übernommen; `index.html` liegt im Repository-Wurzelverzeichnis. Pages kann von `main` und `/ (root)` veröffentlichen. Relative Pfade unterstützen auch Repository-Unterverzeichnisse.

Sites ist eine alternative Hosting-Möglichkeit, falls ein begrenzter Zugang gewünscht wird und der Account diese Freigabe unterstützt. Die veröffentlichte Version steht unter https://vovere-studios.github.io/recht-zass-lernen/ ohne Anmeldung zur Verfügung.

## Quellen und Genauigkeit

Die Quellenangabe steht an jeder Karte. Im SV-PDF wurden zusätzliche handschriftliche Lernfragen eingefügt: Ab PDF-Seite 6 weicht die gedruckte Seitennummer um eine Seite ab. Beträge und Beitragssätze aus den alten Skripten werden nicht als aktuelle Werte abgefragt.

Die vereinfachten Trägerzuordnungen auf Seite 4 wurden präzisiert: Selbständige sind nicht allgemein bei der PVA pensionsversichert; geringfügige Beschäftigung alleine begründet keine automatische Krankenversicherung. Bei Wahlzahnärzten beziehen sich die 80 Prozent im Skript auf die entsprechenden Kassentarife, nicht die gesamte Privatrechnung. Die Arbeitgeberbestätigung enthält keine konkrete Diagnose; die Meldung an den Krankenversicherungsträger kann medizinische Angaben enthalten.

Siehe auch `QUELLEN.md` sowie „Inhalte & Quellen“ in der App.
