# Agile Testmethoden

- [Agile Testmethoden](#agile-testmethoden)
  - [Tesst First](#tesst-first)
    - [Ideallfall im Test](#ideallfall-im-test)
    - [Der übliche Weg](#der-übliche-weg)
    - [Die übliche Lösung](#die-übliche-lösung)
    - [Das übliche Resultat](#das-übliche-resultat)
    - [Der bessere Weg](#der-bessere-weg)
    - [Positive Effekte](#positive-effekte)
  - [Entwicklungsmethoden](#entwicklungsmethoden)
    - [Verschiedene Ebenen](#verschiedene-ebenen)
    - [Testgetriebene Entwicklung - TDD](#testgetriebene-entwicklung---tdd)
      - [Ablauf](#ablauf)
      - [Einsatz](#einsatz)
      - [Nutzen](#nutzen)
    - [Abnahmegetriebene Entwicklung - ATDD](#abnahmegetriebene-entwicklung---atdd)
      - [Ablauf](#ablauf-1)
      - [Einsatz](#einsatz-1)
      - [Nutzen](#nutzen-1)
    - [Verhaltensgetriebene Entwicklung - BDD](#verhaltensgetriebene-entwicklung---bdd)
      - [Ablauf](#ablauf-2)
      - [Einsatz](#einsatz-2)
      - [Gherkin-Format](#gherkin-format)
      - [Nutzen](#nutzen-2)
    - [Möglichst rasche Rückmeldungen](#möglichst-rasche-rückmeldungen)
  - [Testpyramide](#testpyramide)
    - [Teststufen](#teststufen)
    - [Automatisierung](#automatisierung)
    - [So früh wie möglich testen](#so-früh-wie-möglich-testen)
  - [Testquadranten, Teststufen und Testarten](#testquadranten-teststufen-und-testarten)
    - [Testquadranten](#testquadranten)
      - [Struktur](#struktur)
      - [Quadrant 1](#quadrant-1)
      - [Quadrant 2](#quadrant-2)
      - [Quadrant 3](#quadrant-3)
      - [Quadrant 4](#quadrant-4)
      - [Anwendung der Testquadranten](#anwendung-der-testquadranten)
  - [Rolle des Testers](#rolle-des-testers)
    - [Tester in Scrum](#tester-in-scrum)
    - [Teamwork](#teamwork)
    - [Best Practices agiler Testteams](#best-practices-agiler-testteams)
      - [Funktionsübergreifend](#funktionsübergreifend)
      - [Selbstorganisierend](#selbstorganisierend)
      - [Ortsverbunden](#ortsverbunden)
      - [Zusammenarbeit](#zusammenarbeit)
      - [Bevollmächtigt](#bevollmächtigt)
      - [Engagiert](#engagiert)
      - [Transparent](#transparent)
      - [Glaubwürdig](#glaubwürdig)
      - [Offen für Rückmeldungen](#offen-für-rückmeldungen)
      - [Flexibel](#flexibel)
      - [Ziel](#ziel)
    - [Sprint Null](#sprint-null)
      - [Maßnahmen](#maßnahmen)
      - [Ziele für den Test](#ziele-für-den-test)
    - [Integration](#integration)
    - [Testplanung](#testplanung)
      - [Definition](#definition)
      - [Ergebnis](#ergebnis)
    - [Agile Testpraktiken](#agile-testpraktiken)
      - [Pairing](#pairing)
      - [Inkrementelles Testdesign](#inkrementelles-testdesign)
      - [Mindmapping](#mindmapping)
  - [Zusammenfassung](#zusammenfassung)

## Tesst First

### Ideallfall im Test

- Jede Funktionalität durch Testfälle abgedeckt
- Rückmeldung an Entwicklung bei Änderungen am System ohne Verzögerung
- Automatisierte Testfälle
- Wiederholte manuelle Testausführung entfällt

### Der übliche Weg

Ablauf:

1. Funktion fertigstellen
2. Testfälle schreiben
3. Testfälle ausführen
4. Rückmeldung => zurück zu 1.
5. Testfälle automatiseren

### Die übliche Lösung

Zeitdruck

- Schreiben bracucht Zeit
  - => zuerst manuell testen
- Feedback bereits da
  - => weniger Testfälle spezifizieren
- Fertig werden mit Iterationen
  - => weniger automatisieren

### Das übliche Resultat

- Testfälle nur teilweise spezifiziert
- Wenige Testfälle automatisert
- Geringe Sicherheit bei Entwicklern, Seiteneffekte zu bemerken
- Schnelle Rückmeldungen durch Testteam bedeuten hohen persönlichen Einsatz
- Erhöhte Last im Testteam

### Der bessere Weg

Ablauf:

1. Testfälle schreiben
2. Testfälle automatisieren
3. Funktion fertigstellen
4. Rückmeldung => zurück zu 3.

### Positive Effekte

- Sinnvolle Testfälle sind vorhanden
  - ... und automatiert
- Design berücksichtigt Testbarkeit
  - ... und wird modularer
- Schnellstmögliche Rückmeldung
  - ... macht Seiteneffekte sichtbar
- Zeitlich besser verteilter Aufwand
  - ... macht Qualität besser planbar

## Entwicklungsmethoden

### Verschiedene Ebenen

| Ebene            | Test             |
| ---------------- | ---------------- |
| Abnahmetest      | ATDD             |
| Systemtest       | ATDD, BDD, (TDD) |
| Integrationstest | (TDD)            |
| Komponententest  | TDD              |

- **A**ccepttance **T**est **D**riven **D**evelopment

- **B**ehavior **D**riven **D**evelopment

- **T**est **D**riven **D**evelopment

### Testgetriebene Entwicklung - TDD

#### Ablauf

- Engl. "Test Driven Development" = TDD
- Komponenten testen
  - Testfälle vor Entwicklung von Funktionalität
    - entwickeln
    - automatieren
- Iterativer Ansatz
  1. Testfall entwicklen
  2. Entwicklung und Integration von kleinen Quellcode-Stücken (z.B. Methode, Funktion)
  3. Komponententests
  4. Probleme beheben
  5. Aufräumen im Quellcode

#### Einsatz

- Schwerpunkt auf Unit Tests, code-bezogen
- Auch bei Integrations- und Systemtests möglich
- Bekannt geworden durch Extreme Programmierung (XP)
- Auch in anderen agilen Methoden angewandt
- Fallweise auch in sequentiellen Lebenszyklen

#### Nutzen

- Frühe Einbeziehung der Entwickler in Testentwurf
  - Bewusstsein über Funktion
  - Konzentration auf klar definierte, erwartete Ergebnisse
  - Testautomatisierung und Continuous Integration von Anfang an

### Abnahmegetriebene Entwicklung - ATDD

#### Ablauf

- Engl. "Acceptance Test Driven Development" = ATDD
- Abnahmekriterien (Akzeptanzkriterien) für jede User Story definiert
- Abnahmekriterien und Tests bereits mir Entwicklung der User Stories
- Kollaborativer Ansatz
- Jeder Stakeholder versteht Verhalten der Softwarekomponente
- Entwickler, Tester und Fachbereich wissen, was zu tun ist#

#### Einsatz

- Wiederverwendbare Tests für Regressionstest
- Spezifische Werkzeuge zur Erstellung und Durchführung der Tests
- Meist Teil der Continuous Integration
- Werkzeuge mit Zugriff auf Daten und Serviceebenen der Anwendung
- Ermöglicht System- und Abnahmetestniveau

#### Nutzen

- Schnelle Lösung von Fehlern
- Bewerten des Verhaltens der Features
- Beurteilung, ob Abnahmekriterien erfüllt

### Verhaltensgetriebene Entwicklung - BDD

#### Ablauf

- Engl. "Behaviour Driven Development" = BDD
- Entwickler konzentrieren sich auf Tests des erwarteten Softwareverhaltens
- Verhalten für andere Teammitglieder und Stakeholder verständlich
- Tests des Verhaltens auch für Nicht-Techniker nachvollziehbar

#### Einsatz

- Spezifische Frameworks für Formulierungen von Testfällen
- **Gegeben** ein definierter Einstiegskontext
- **Wenn** ein Ergebnis auftritt
- **Dann** werden bestimmte Wirkungen sichergestellt

#### Gherkin-Format

- Given - z.B. Gegeben => Geldautomat in Betrieb UND gültige Bankomatkarte in Automat gesteckt
- When - z.B. Wenn => Auswahl "Bargeld beheben" gedrückt
- Then - z.B- Dann => erfolgt Aufforderung zur PIN-Eingabe

#### Nutzen

- Framework erzeugt daraus ausführbaren Testcode
- Verhaltensgetriebene Entwicklung hilft, automatisierte Testfälle zu definieren
- Testfälle leicht lesbar und verständlich
- Testfallerstellung auch für Personen ohne Programmierkenntnisse möglich

### Möglichst rasche Rückmeldungen

- Immer frühestmöglich testen
  - Frühes Feedback
  - Frühe Qualitätssicherung
  - Frühe Fehlervermeidung
  - Frühe Fehlerbehebung
- Umsetzen durch
  - Passend gewählte Testarten
  - Passend geplante Teststufen
  - Früh entwickelte Tests
    - Ideal: Integriert in Entwicklungsmethodik

## Testpyramide

| Stufe              | Feedback      | Typ                    | Beispiele         |
| ------------------ | ------------- | ---------------------- | ----------------- |
| Akzeptanz System   | Tage, Stunden | Manuell                | User Interface    |
| Akzeptanz System   | Stunden       | Manuell, Automatisiert | User Interface    |
| System Integration | Minuten       | Automatisiert          | Services, APIs    |
| Komponente         | Sekunden      | Automatisiert          | Klassen, Methoden |

### Teststufen

- Tests sauf unterschiedlichen Ebenen
- Typischen Teststufen (von unten nach oben)
  - Komponente
  - Integration
  - System
  - Abnahme
- Größere Anzahl an Unit-Testfälle (unteres Ende der Pyramide)
- Geringere werdende Anzahl von Testfällen mit steigender Teststufe (zur Spitze der Pyramide hin)

### Automatisierung

- Unit- und Integrationstests typischerweise automatisiert
- Erstellung mit API-basierten Werkzeugen
- GUI-basierte Werkzeuge für automatisierte System- und Abnahmetests

### So früh wie möglich testen

- Testpyramide folgt Prinzip der frühestmöglichen Qualitätssicherung

## Testquadranten, Teststufen und Testarten

### Testquadranten

- Definition nach Brian Marick
- Stellen Verbindung zwischen Teststufen und passenden agilen Testarten her
- Stellt Einbeziehung aller wichtiger Testarten und Teststufen in Entwicklungslebenszyklus sicher
- Ermöglicht Beschreibung und Unterscheidung der Testarten
- Für alle Stakeholder (Entwickler, Tester, Fachbereich, ...) verständlich

#### Struktur

- Zwei Achsen zur Testklassifikation

![Machen wir mal einen Test – microTOOL Blog](https://www.microtool.de/wp-content/uploads/2017/07/Testquadranten.png)

#### Quadrant 1

- Auf Ebene von Units (kleinsten Einheiten)
- Technologieorientiert
- Unterstützt Entwickler
- Unit Tests
- Automatisiert
- Teil der Continuous Integration

#### Quadrant 2

- Systemebene
- Unternehmensorientiert
- Bestätigt Produktverhalten
- Funktionale Tests, Beispiele, Story Tests
- Prototypen (für User Experience) und Simulation
- Prüfen der Abnahmekriterien
- Manuell und automatisiert
- Parallel zur Entwicklung der User Story erstellt
- Tragen zur Qualität der Stories bei
- Helfen bei Erstellung der Testfolgen für automatisierte Regressionstests

#### Quadrant 3

- System- oder Nutzungsakzeptanzebene
- Unternehmensorientiert
- "Kritisieren" Produkt mit realistischen Szenarien und Daten
- Explorative Tests, Szenarios, Prozessabläufe, Benutzbarkeitstests, Benutzer-Abnahmetests, Alpha- und Beta-Tests
- Meist manuell und nutzerorientiert

#### Quadrant 4

- System- oder betriebliche Abnahmeebene
- Technologieorientiert
- "Kritisieren" Produkt
- Performanz-, Last-, Stress- und Zugriffssicherheitstest, Wartbarkeitstests, Tests für Kompatibilität und Interoperabilität, Datenintegration, Infrastruktur und Wiederherstellung
- Meist automatisiert

#### Anwendung der Testquadranten

- In jeder Iteration Tests aus allen Quadranten möglich
- Je nach Notwendigkeit
- Testquadranten eher für dynamischen Testen (kaum für statischen Testen)

## Rolle des Testers

### Tester in Scrum

- Kapitel betrachtet beispielhaft Rolle des Testers in einem Scrum-Projekt

### Teamwork

- Teamwork ist Grundprinzip in agiler Entwicklung
- Gesamtteamansatz aus Entwicklern, Tester und Fachbereichsvertretern
- Kollaborativ = alle arbeiten zusammen
- Best Practices für
  - Organisation
  - jedes einzelne Scrum-Team

### Best Practices agiler Testteams

#### Funktionsübergreifend

- Jedes Mitglied trägt mit speziellen Fähigkeiten zum Team bei
- Team arbeitet zusammen an Teststrategie, Testplanung, Testspezifikation, Testdurchführung, Testbewertung und Testergebnisberichten

#### Selbstorganisierend

- Team bestimmt selbstständig, was aus Product Backlog als nächstes abgearbeitet wird

#### Ortsverbunden

- Tester sitzen mit Entwickler und Product Owner zusammen

#### Zusammenarbeit

- Tester arbeiten mit allen Teammitgliedern, anderer Teams, Stakeholdern, Product Owner und Scrum Master zusammen

#### Bevollmächtigt

- Technische Entscheidungen bezüglich Design und Tests werden vom Team als Ganzes getroffen (Programmierer, Tester und Scrum Master), in Zusammenarbeit mit Product Owner und wenn nötig anderen Teams

#### Engagiert

- Tester ist engagiert im Hinterfragen und Bewerten von Produktverhalten und Produktcharakteristika, in Bezug auf Erwartungen und Bedürfnisse von Kunden und Nutzern

#### Transparent

- Status von Entwicklern und Test sind jederzeit auf agilem Task-Board sichtbar

#### Glaubwürdig

- Tester muss Glaubwürdigkeit der Teststrategie, deren Implementierung und Ausführung sicherstellen, da Stakeholder sonst kein Vertrauen in Testergebnisse haben
- Oft durch regelmäßige Berichte über Testprozess an Stakeholder realisiert

#### Offen für Rückmeldungen

- Rückmeldungen sind wichtiger Aspekt für Erfolg jedes Projekts, insbesondere im agilen Umfeld
- Retroperspektiven ermöglichen den Teams, aus Erfolgen und Misserfolgen zu lernen.

#### Flexibel

- Tester müssen auf Veränderungen reagieren können

#### Ziel

- Diese "Best Practices" maximieren die Wahrscheinlichkeit erfolgreichen Testens in Scrum-Projekten

### Sprint Null

- Erste Iteration des Projekts als "Sprint Null"
  - Viele Vorbereitungen werden getroffen
  - Tester arbeitet mit Team zusammen

#### Maßnahmen

- Identifikation des Projektumfangs
  - d.h. Anfertigung des Product Backlogs
- Erstellen der initialen Systemarchitektur
  - ggf. erste Prototypen
- Planung, Erwerb und Installation notwendiger Werkzeuge
  - z.B. für Testmanagement, Fehlermanagement, Testautomatisierung, Continuous Integration
- Erstellen des initialen Teststrategie
  - Für alle Teststufen
  - Zielt (unter anderem) ab auf
    - Testumfang
    - Technische Risiken
    - Testarten
    - Überdeckungsziele
- Durchführung einer initialen Qualitätsrisikoanalyse
- Definition von Metriken
  - zur Messung des Testfortschritts
  - zur Produktqualität
- Spezifikation der Definition of Done
- Festlegung der Struktur des Task-Boards
  - Incl. initiales "Befüllen" des Boards
- Definition des Zeitpunktes, zu dem Tests beendet werden sollen, bevor System an Kunden geliefert wird

#### Ziele für den Test

- Sprint Null legt Richtung fest
  - **was** in Tests erreicht werden soll (Zieldefinition)
  - **wie** es in Sprints erreicht werden soll (Verfahrensdefinition)

### Integration

- Kontinuierlicher Mehrwert für Kunden
  - vorzugsweise mit jedem Sprint
- Integration muss Design **und** Tests berücksichtigen
  - Testbarkeit des implementierten Design in aktueller Umgebung muss laufend sichergestellt sein
- Kontinuierliche Qualität für gelieferte Funktionalitäten und Charakteristika
- Wird erreicht durch
  - Identifikation der Abhängigkeiten zwischen Funktionen und Features
  - Sorgfältig ausgewählten Regressionstests

### Testplanung

#### Definition

- Vollständige Integration des Testens ins agile Team
- Testplanung beginnt bereits während Releaseplanung
- Testplanung während jedes Sprints aktualisiert
- Fokus auf Themen der Iterations- bzw. Releaseplanung
- Testplanung für Release
- Testplanung für jeden Sprint

#### Ergebnis

- Reihe von Aufgaben (Tasks)
- Kommen ins Task-Board
- Maximal ein bis zwei Arbeitsaufträge pro Task
  - Bevorzugt kleinere Tasks => leichter überschaubar
- Nachverfolgung aller Testprobleme
  - gewährleistet steigen Testablauf

### Agile Testpraktiken

#### Pairing

- Zwei Teammitglieder (z.B. Tester und Entwickler, zwei Tester, Tester und Product Owner, ...) setzen sich zusammen, um gemeinsam Test- oder andere Sprintaufgabe zu bearbeiten

#### Inkrementelles Testdesign

- Testfälle und Chartas schrittweise aus User Stories und anderen Testgrundlagen aufbauen
- Mit einfachen Tests beginnen, dann Übergang zu komplexeren Tests

#### Mindmapping

- Nützliches Werkzeug für Testen

  Tester können Mindmaping nutzen, um z.B.

  - zu bestimmen, welche Testsitzungen durchzuführen sind
  - um Teststrategien zu demonstrieren
  - um Testdaten zu beschreiben

- Agile Praktiken **zusätzlich** zu allgemeinen Verfahren

  - Agile Ergänzung zu Entwurfsverfahren aus CT-FL

## Zusammenfassung

- Testgetriebene Entwicklung
- Abnahmetestgetriebene Entwicklung
- Verhaltensgetriebene Entwicklung "Given - When - Then"
- Testpyramide
- Testquadranten
- Rolle des Testers
- Sprint Null
- Integration
