# Klar · Recht lernen

Eine responsive Lernseite für die Prüfung am 4. November 2026. Browserseitige Anwendung ohne Build und ohne laufende Serverkosten für die App-Logik.

## Lernstoff

Standardmäßig **50 Fragen** in zwei Bereichen:

- **Recht & Verantwortung:** die bisherigen 20 Fotofragen, standardmäßig im Prüfungswortlaut.
- **Tafelfragen & Abrechnung:** genau die 30 nummerierten Fragen aus den neuen Screenshots vom 18. Oktober. Kurze Antworten, Skriptseiten und je ein markierter Quellenausschnitt.

Die bisherigen Kategorien **Sozialversicherung** (34) und **Ordinationsalltag** (15) bleiben erhalten und werden nur mit **Einstellungen → Erweiterte Fragen** angezeigt. Dann sind 99 Fragen sichtbar. Die Einstellung gilt für Übersicht, Themen, Suche, Fortschritt und Rundenauswahl. Ausgeblendete Lernstände werden nicht gelöscht. Eine laufende Runde mit ausgeblendeten Fragen bleibt gespeichert; vor dem Ersetzen wird wie gewohnt gefragt.

Die neue Kategorie öffnet eine **Vorschau ohne Bewertung** mit Vor/Zurück, Kurzantwort und markiertem Beleg. Der Beleg ist vergrößerbar. Alle 30 Fragen sind zusätzlich aufklappbar aufgelistet und können als Karten- oder Quizrunde gelernt werden. Die Vorschau verändert den Lernstand nicht.

GV, EV und SV sind durch die neuen Unterlagen als **Gesamtvertrag, Einzelvertrag und Stellvertretung** geklärt. Nur Fragen 1–30 aus den neun Screenshots sind neu hinzugefügt; andere markierte Abschnitte und nur auf der Tafel stehende Fragen sind ausgeschlossen. Die neuen Texte orientieren sich am markierten Skript von 2024, mit knappen sachlichen Präzisierungen. Das vollständige PDF wird nicht veröffentlicht; eingebunden sind ausschließlich die ausgewählten Belegausschnitte.

## Lernen

Standardmäßig zeigen Themen, Karteikarten und Quiz bei den 20 Fotofragen den Prüfungswortlaut. Die einfache Fassung kann ausschließlich in den Einstellungen nach zwei Bestätigungen aktiviert werden. Es erscheint immer nur eine Fassung. Zurück zum Prüfungswortlaut geht es mit einer Aktion. Die übrigen 49 Fragen bleiben unverändert, da hierfür kein fotografierter Prüfungswortlaut vorliegt. Bestehende Runden übernehmen die Einstellung ohne Änderung ihrer Wertung; Antwortpositionen werden entsprechend zugeordnet.

1. Bereich oder kleine Themenportion wählen.
   Für Karteikarten und Quiz ist „Nach Nummer“ oder „Gemischt“ wählbar. Jede Frage hat eine feste Nummer: die 20 Fotofragen genau 1–20, Sozialversicherung 21–54, Ordinationsalltag 55–69. Die neuen Fragen werden als „Tafelfrage 1–30“ bezeichnet (interne Sortiernummern 70–99), in der abgestimmten Lernreihenfolge. Bei verschobenen Fragen nennt der Beleg zusätzlich die ursprüngliche Foto-Nummer. Die Nummer bleibt bei Filtern, Rückblick und Wiederholung gleich. „Nach Nummer“ beginnt aufsteigend; übersprungene und im Übungsmodus falsche Fragen werden später wieder aufgenommen. Die Antwortauswahl im Quiz wird unabhängig davon weiterhin gemischt. Die gewählte Reihenfolge bleibt für weitere Runden gespeichert.
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

## Neue Lernreihenfolge der Tafelfragen

Die neue Folge der ursprünglichen Foto-Nummern ist 1–7, 14, 9, 10, 12, 11, 8, 13, 15–30. Die App nummeriert diese Folge wieder durchgehend 1–30. IDs, Antworten, Belege und Lernstände bleiben der jeweiligen Frage zugeordnet. Neue Runden „Nach Nummer“ folgen der neuen Reihenfolge; eine bereits laufende Runde bleibt erhalten.
