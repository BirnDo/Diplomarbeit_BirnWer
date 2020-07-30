# Allgemeines Beschreibung von Testing in Unternehmen und Qualitätssicherung



[TOC]

## Agile Softwareentwicklung

### Grundlagen Agiler Softwareentwicklung

#### Agiles Manifest: 4 Werte

##### Individuen und Interaktionen

Effiziente Kommunikation:

* Jede(r) mit jeder/m - voll vernetzt
* Auf direktem Weg - persönlich, ungefiltert, vor Ort
* wenn Team <= 9 Mitglieder - Kommunikation funktioniert selbstorganisierend 
* wenn Team > 9 Mitglieder - Kommunikation explizit zu organisieren, um effizient zu sein

##### Funktionierende Software

Nur was benutzbar ist, hat Wert:

* Frühes Bereitstellen von Funktionalität
* "Fertig" im Sinne agiler Entwicklung = "benutzbar"

##### Zusammenarbeit mit Kunden

* Durchgehende Transparenz der Produktentwicklung - Steuerungsmöglichkeiten abseits von Change-Requests 
* Entscheidungen können später getroffen werden - Vorstellung hat Grenzen
* Früher Einsatz/frühe Erprobung des Produkts
* **???** Kunde kann sich auf "Was" konzentrieren und "Wie im Detail" leichter dem Team überlassen - Tun & Anpassen

##### Reagieren auf Veränderungen

Überlegung:

Wenn man sich immer nur an einen detaillierten Plan hält, wird man am Ende das bekommen, was anfangs geplant wurde, 

unabhängig davon ob es dann wirklich brauchbar ist.

#### Agiles Manifest: 12 Prinzipien

12  Prinzipien die in der Praxis  zu erfolgreichen Projekten geführt haben:

1. ##### Kundenzufriedenheit 

   + entsteht durch frühe und kontinuierliche Auslieferung von Software mit Kundennutzen

2. ##### Verändernde Anforderungen sind willkommen

   * auch spät in der Entwicklung, Agile Prozesse nutzen Veränderungen zum Wettbewerbsvorteil des Kunden

3. ##### Regelmäßige Auslieferung funktionierender Software

   * erfolgt in kurzen Zeitspannen von wenigen Wochen bis hin zu wenigen Monaten - bevorzugt kürzer

4. ##### Fachexperten und Entwickler arbeiten direkt zusammen

   * auf täglicher Basis, während des ganzen Projekts

5. ##### Projekte werden rund um motivierte Personen errichtet

   Gib ihnen 

   * das Umfeld und die Unterstützung die sie benötigen
   * und das Vertrauen, dass sie die Aufgabe erledigen

6. ##### Informationsaustausch

   * geschieht am effektivsten und effizientesten im Gespräch von Angesicht zu Angesicht
   * sowohl bei Informationen an das Entwicklungsteam
   * als auch innerhalb des Entwicklungsteams

7. ##### Funktionierende Software ist das wichtigste Fortschrittsmaß

8. ##### Gleichmäßiges Arbeitstempo

   * Agile Prozesse fördern nachhaltige Entwicklung
   * Auftraggeber, Entwickler und Benutzer sollten ein gleichmäßiges Tempo unbegrenzt halten können

9. ##### Technische Exzellenz und gutes Design

   * bekommen ständige Aufmerksamkeit und fördern Agilität

10. ##### Einfachheit ist essentiell

    * Die Kunst, die Menge nicht getaner Arbeit zu maximieren

11. ##### In selbstorganisierenden Teams

    * entstehen die besten Architekturen, Anforderungen und Entwürfe

12. ##### Regelmäßige Selbstreflexion des Teams

    * um effektiver zu werden, indem das eigene Verhalten angepasst wird

#### Whole-Team Approach

Alle Stakeholder eines Systems arbeiten gleichmäßig zusammen

#### Fähigkeiten im Team

* Ideal: Jeder kann alles

* Realistisch: Generalisten mit einem Spezialgebiet

  "T" - förmige Fähigkeitsverteilung

  * Überlappenden Fähigkeiten im Team

  * Leichterer Ausgleich von Engpässen

  * Leichtere Verteilung des Wissens

    

  Dazu braucht es unbedingt

* Offenheit für neues

* Interesse daran, Spektrum eigener Fähigkeiten zu verbreitern

#### Iterativ und Inkrementell

* Inkrementelle Produktentwicklung
  * Stückweise Erweiterung
  * Stetige Verbesserung
  * Herzeigen und Klären mit jeder Iteration
  * Hohe Frequenz des Kundenfeedbacks
* Kurze Iteration
  * Wiederkehrende Zyklen
  * Wochen bis Monate(e)
  * Sehr hohe Flexibilität

#### Frühe regelmäßige Rückmeldung

* Vermeidung von Missverständnissen
  * z.B. bei Anforderungen, die erst im Laufe des Entwicklungszyklus erkannt werden und dann teuer würden
* Klären von Kundenanforderungen zu Produkt-Features
  * Wichtigste Features früh für Kunden verfügbar
  * Bessere Abdeckung von Kundenwünschen 
* Frühes Entdecken, Isolieren und Lösen von Qualitätsproblemen
  * Einsatz von Continous Integration
* Informationen für agiles Team
  * Produktivität und Fähigkeiten, Gewünschtes zu realisieren
* Fördern beständiger Projektdynamik

#### Priorisierung 

* Klare Priorisierung von Features und Anforderung
* Häufige, regelmäßige Rückmeldung und Neubewertung
* Priorisierung nach Geschäftswert
* Priorisierung nach Risiken -> fail fast/fail early

#### Schätzung im Team

* Was kann in aktueller Iteration fertiggestellt werden
* Wie wird es fertiggestellt
* Feature-Umfang der nächsten Iteration
* Umsetzung dafür



### Aspekte agiler Ansätze

**todo**



+++



## Grundlegende Prinzipien, Praktiken und Prozesse des agilen Testens

### Unterschiede zwischen traditionellen und agilen Ansätzen im Test

#### Bereiche der Unterschiede

* Art der Integration von Test- und Entwicklungstätigkeiten
* Arbeitsergebnisse im Projekt
* Verwendung der Begrifflichkeiten
* Testeingang- und -endkriterien
* Einsatz von Werkzeugen
* Umsetzung unabhängigen Testens

#### Agil ist nicht gleich agil

* Entwicklungsmodelle an Projekt- und Kundenbedürfnisse angepasst
* Tester muss begründete und sinnvolle Abweichungen vom Idealmodell verstehen
* Testvorgehen kann sehr unterschiedlich sein
* Releaseplanung vor ersten Iteration
* Iterationsplanung am Beginn jeder Iteration

#### Vergleich der Aktivitäten

| Traditionell                                  | Agil                                           |
| --------------------------------------------- | ---------------------------------------------- |
| Längerer Produktentwicklungszyklus            | Inkrementelle Wertschöpfung in jeder Iteration |
| Tests nach Entwicklung                        | Test parallel zur Entwicklung                  |
| Feature "fertig" nach Entwicklung             | Feature "fertig" nach Integration und Test     |
| Testautomatisierung vorwiegend bei Unit Tests | Hohe Testautomatisierung auf allen Teststufen  |
| Viele systematische Tests auch manuell        | Manuell häufiger erfahrungsbasierte Tests      |

#### Rolle der Testautomatisierung

* Automatisierte von Beginn an
* Agile Entwicklung funktioniert nur mit umfassender Testautomatisierung
* Testbares Design
* Kein Rückstau
* Verstärktes Ausmaß an Automatisierungstätigkeiten 
* Auf allen Teststufen
* Mehr können und Erfahrung in Technik und Automatisierung vom Tester erwartet/gefordert

#### Risiko- und Qualitätsmanagement

* Risikoorientiertes Testen möglich
* Tester in Risikoanalyse involviert
* Grobe Risikoanalyse bei Releaseplanung
* Finden und Bewerten spezifischer Qualitätsrisiken bei Iterationsplanung
* Auswirkung auf
  * Reihenfolge der Features
  * Priorisierung der Features
  * Testtiefe
  * Testaufwände

#### Umgang mit Fehlerkorrekturen

* Unterschiedliche Praktiken üblich
* Eigene Stabilisierungsiterationen ("hardening iterations")
  * Auch zur Bereinigung "technischer Schulden"
* Offene Korrekturen als explizite Aufgaben in Folgeiteration geplant ("fix Bugs first"-Ansatz)
  * Gefahr, dass Burn Down der Iteration dadurch verschleiert wird
  * Schleichende Evolution neuer Aufwände im Projektverlauf
  * Vorab nicht planbar

#### Pairing (XP)

* Paarweises Zusammenarbeiten am selben Feature
* Tester mit Tester
* Tester mit Entwickler
* Günstig an einem Standort
* Werkzeugunterstützung notwendig bei verteilten Team

#### Auswirkung von Änderungen

* "Willkommene" Änderungen in jeder Phase erfordern gutes Augenmaß für Dokumentation
* Leichtgewichtige Dokumentation
* So viel wie notwendig
* So wenig wie sinnvoll möglich
* Geeignete Formulierungsgrad zu finden
* Änderungsrate und Risiken dürfen Team nicht überfordern

#### Arten von Arbeitsergebnisse

* Geschäftsprozessorientiert 
  * z.B. User Stories, Artefakte, Use Cases
* Entwicklungsorientiert
  * z.B. automatisierte Unit Tests
* Testorientiert 
  * z.B. Fehlerberichte, Metriken

#### Umfang von Dokumentation

* "Just enough documentation"
* Gute Entscheidungen liegen in Teamverantwortung
* Weitergehende Formmulierungen kann notwendig sein
  * z.B. sicherheitsrelevant, regulierungsbedingt, Audits, hochkomplexe Systeme, dezentralisiert

#### Geschäftsprozess-orientierte Artefakte

* User Stories & Abnahmekriterien
  * Größe von User Stories
* Epics
  * Auch Aufteilung darunterliegende User Stories auf unterschiedliche Entwicklungsteams möglich, z.B. API (Middleware) - Benutzer (Anwendung)

#### Entwicklungsorientierte Artefakte

* Code
* Automatisierte Unit Tests
* TDD als "ausführbare Spezifikation"

#### Testorientierte Artefakte

* Testdokumente
* Tests
* Qualitätsrisikokataloge
* Fehlerbeichte
* Metriken

#### Teststufen

* Oft überlappende Teststufen und Aktivitäten
* Endekriterien einer Stufe nicht strikt Teil der Eingangskriterien der nächsten Stufe
* Anforderungsänderungen in Iteration
* In Scrum zwar "verboten", kann aber trotzdem vorkommen (nur in Abstimmung zwischen Entwicklungsteam und Product Owner)

#### Testaktivitäten pro User Story

* **Units Tests** durch Entwickler
* **Abnahmetest** des Features durch
  * Verifizierungstest --> Meist automatisiert, Entwickler oder Tester, gegen Abnahmekriterien
  * Validierungstests --> Eher manuell, Entwickler, Tester, Fachbereich

#### Weitere Testaktivitäten im agilen Umfeld

* Paralleler Regressionstest während gesamter Iteration
  * Automatisierte Unit Tests
  * Verifizierungstest aller Features
  * Oft in Continuous Integration
* Manchmal eigene Systemteststufe, sobald User Story dafür bereit
  * Funktional und nicht-funktional
* Alle Formen von Abnahmetests möglich (Alpha, Beta, regulatorisch, ...)
  * Am Iterationsende
  * Nach mehreren Iterationen
  * Nach Abschluss aller Iterationen

Konfiguration und Testverwaltungstools

* Starke Nutzung automatisierter Werkzeuge für
  * Entwicklung
  * Test
  * Verwaltung der Entwicklung
* Einsatz nicht nur während Entwicklung, sondern auch nach Code-Check-In
  * Statische Codeanalyse
  * Unit Tests
  * Continuous Integration
* Automatisierung auch von funktionalen Integrations- und Systemtests
* Automatisierte Unit Tests bei Check-in
  * Optionale Möglichkeit, entlastet Entwicklung
  * z.B. Bestehen für 2-Stufen-Check-In erforderlich
* Funktionale Tests meist über Nacht ("nightly bullets") oder in größeren Intervallen

#### Ziele der Testautomatisierung

* Lauffähiger Build
* Kurze Reaktionszeiten
* Fehlerkorrektur vor nächstem Check-in
* Nachweis der Installierbarkeit
* Risikominimierung häufiger Änderungen

#### Gefahren der Testautomatisierung

* Vernachlässigung wirkungsvoller manueller Tests
* Vernachlässigung höhere Teststufen
* Vernachlässigung der Pflege und Anpassung automatisierte Testfälle

#### Organisation des unabhängigen Testens

* Professionelle Tester im agilen Team integriert
  * Gefahr des Verlustes der Unabhängigkeit
* Separates Testteam stellt Tester auf Abruf
  * Oft Kommunikations- oder Verständnisprobleme z.B. zwischen Testern aus Fachbereich und Entwicklern
* Separates Testteam arbeitet langfristig mit agilem Team zusammen
  * Organisatorische Matrixstruktur

#### Separate Testteams

* Kann auch spezialisierte Tester beinhalten für
  * Langfristige Tätigkeiten
  * Nicht iterationsbezogene Testaktivitäten
* Beispiele
  * Entwicklung von Testautomatisierungswerkzeugen
  * Nicht-funktionale Tests
  * Erstellung von Testumgebung und Testdaten
  * Nicht sprinttaugliche Teststufen wie Systemintegrationstests

+++

### Status des Testens in agilen Projekten

#### Fortschrittsmessung

* Ziel der Fortschrittsmessung
  * Aussage, wann funktionale Software bereitgestellt werden kann
* Medien
  * Task-Board, Burndown-Charts
* Kommunikation über Wiki-Dashboards, E-Mails, ...

#### Automatisierte Statusbericht

* Berichte bei definierten Ereignissen generiert
* Dadurch häufige(re) Berichterstellung
* Dadurch Dashboards automatisch aktuell
* Metriken permanent erfasst
* Metriken für Testprozessverbesserungen genützt
* Tester haben mehr Zeit für Testentwurf und -durchführung

#### Testaufgaben im Task Board

* Beziehen sich auf Abnahmekriterien
* Erledigt, wenn
  * Testautomatisierungsskripts erfolgreich gelaufen
  * Manuelle Tests erfolgreich gelaufen
  * Explorative Tests erfolgreich gelaufen
* Ständige Überwachung im Task Board
  * z.B. beim täglichen Stand-Up Meeting

#### Tägliches Stand-Up Meeting

Im täglichen Stand-Up Meeting werden von jedem Mitglied des agilen Teams (auch Tester) primär 3 Fragen beantwortet (15 min Timebox):

* Was habe ich seit dem letzten Stand-Up Meeting abgeschlossen?
* Was plane ich bis zum nächsten Stand-Up Meeting abzuschließen?
* Was steht mir dabei im Weg?

#### Tägliches Stand-Up

* Probleme im Testfortschritt sofort kommunizieren
* Grundlage für Team, um bei Stillstand einer (Test)aufgabe Gründe zu prüfen und Lösungen zu finden

#### Produktqualität

* Kundenzufriedenheitsbefragung
* Auch traditionelle Metriken
  * z.B. erfolgreiche/fehlerhafte Tests, Fehlerdichte, Risikoabdeckung
* Entscheidungrelevante Metriken
* Metriken dienen NICHT der Belohnung, Bestrafen oder Isolation von Teammitgliedern

#### Regressionsrisiko

* testumfang wächst mit jeder Produktiteration
* Dazu Tests für bereits getestete Features von früher
  * Testergebnisse dürfen sich nicht verschlechtern
* Risiko für Verschlechterung wegen tendenziell hoher Codeveränderung hoch
* Auch bereits gelieferte Features können sich jederzeit ändern

#### Regressionstests automatisieren

* Testautomatisierung so früh wie möglich
* Velocity mit minimalen technischen Schulden beibehalten
* Bestand an automatisierten und manuellen Tests, Testdaten, Artefakten stets aktuell halten
* Konfigurationsmanagement mit Versionierung
* Einfacher Zugriff für alle Teammitglieder

#### Regressionstests pflegen

* Zeit für Aktualisierung vorhandener Testfälle einplanen
* Auf Eignung für Regressionstests prüfen
* Feature-Änderungen können Regressionstests relativieren
* Auf Automatisierungseignung prüfen
* Möglichst hohe Automatisierung reduziert Durchführungszeit für Regressionstests
* Gewonnene Zeit --> sorgfältigere Tests

#### Regressionstestentwurf

* Kurze Testzeiten erfordern guten Testentwurf
* Durch aktuelle Änderungen betroffene Tests aus früheren Iteration müssen rasch identifiziert- und aktualisierbar sein
* Vorgehensweisen für Testentwurf schon in Releaseplanung festlegen

#### Regressionstests und Produktqualität

* Testautomatisierung auf allen Teststufen liefert rasches Feedback zur Produktqualität 
* Automatisierte Tests samt Ergebnissen als "lebendes Dokument der Systemfunktionalität"
* Check-In in Konfigurationsmanagement ermöglich jederzeitigen Abruf der Tests und Testergebnisse für jeden Build

#### Automatisierte Unit Tests

* Automatisierte Unit Tests vor Check-In des Quellcodes
* Nur erfolgreich Unit-getesteten Code zu Baseline hinzufügen
  * Kann automatisiert werden
* Integrität des Builds sicherstellen
* Unit Tests geben Feedback
  * zu Code- und Buildqualität
  * jedoch nicht zu Produktqualität 

#### Automatisierte Abnahmetests

* Automatisierte Abnahmetests als Teil der Continuous Integration
* Abnahmetests dauern typischerweise länger als Unit Tests
* Mindestens Täglich, aus Zeitgründen nicht bei jedem Check-In
* Geben Feedback
  * zu Produktqualität im Vergleich zum letzten Build
  * jedoch nicht zu allgemeiner Produktqualität

#### Build-Verifizierungstests

* Build-Verifizierungstests decken kritische Systemfunktionalität und Integrationspunkte ab
* Laufen unmittelbar bei jedem neuen Build
* Schnelles Feedback nach Deployment
* Vermeidet Zeitverschwendung für Tests instabiler Builds

#### Fehler aus Regressionstest

* Automatisierte Regressionstests als Teil des täglichen Haupt-Builds in der Continuous Integration
* Sonst nur bei Auslieferung eines neuen Builds in Testumgebung
* Fehlgeschlagener Regressionstest hat hohe Priorität
* Muss sofort untersucht werden

#### Gründe für Regressionstestfehler

* Gewollte Funktionsänderung
  * Test und/oder User Story muss aktualisiert werden
* Veralteter Test nach Änderung
  * Nach Erstellung neuer/aktualisierter Tests müssen ungültige Tests entfernt werden
* Fehler in Software
  * zuerst Fehler beheben
  * danach weitere Features implementieren

#### Weitere automatisierte Testaufgaben

* Testdatenerstellung
* Laden der Testdaten in Systeme
* Auslieferung von Builds in Testumgebung
* Zurücksetzen einer Testumgebung in Grundzustand
* Vergleich von Daten/Ergebnissen

### Rolle und Fähigkeiten eines Testers im agilen Team

#### Fähigkeiten besonders im agilen Umfeld

* Zusätzlich zu allgemeinen Fähigkeiten eines Testers speziell im agilen Umfeld
* Testautomatisierung
* Testgetriebene und abnahmetestgetriebene Entwicklung
* White-, Blackbox und erfahrungsbasierte Tests
* "just enough" Dokumentation

#### Soft Skills

* Positives, lösungsorientiertes Auftreten im und außerhalb des Teams
* Kritische, qualitätsorientierte skeptische Denkweise
* Aktiv Informationen vom Fachbereich bzw. Auftraggeber einholen
* Testergebnisse, -fortschritte, Produktqualität exakt und schnell beurteilen und berichten
* Prüfbare User Stories und Abnahmekriterien mir Kunden und Fachbereich erarbeiten
* Im Team (auch paarweise) mit Entwicklern zusammenarbeiten
* Testfälle bei Veränderungen rasch anpassen
* Eigene Arbeit planen und organisieren

#### Zusatzaufgaben für Tester

* Teststrategie verstehen, implementieren und aktualisieren
* Testüberdeckung über Metriken messen, auswerten und berichten
* Richtiger Einsatz von Testwerkzeugen sicherstellen
* Testumgebung und -daten konfigurieren, verwenden und verwalten
* Fehlerberichte erstellen
* Zusammenarbeit bei Fehlerbehebung
* Teammitglieder in Testen einweisen
* Angemessene Tests und Berücksichtigung in Iterations- und Releaseplanung sicherstellen
* Zusammenarbeit mit Entwicklern, Fachbereich und Product Owner bei Klärung der Anforderungen
* Proaktive Teilnahme an Retrospektiven

#### Organisationsbezogene Risiken

* Tester verlieren Unabhängigkeit
* Tester tolerieren ineffiziente, ineffektive oder qualitativ schwache Teampraktiken
* Tester können mir kurzen Iterationen und ständigen Änderungen nicht mithalten

#### Zusammenfassung

* Agil ist nicht gleich agil
* Tester viel früher und intensiver eingebunden
* Hardening Iterations, Fix Bugs First, Pairing
* 3 Typen von Arbeitsergebnissen
* Überlappende Teststufen
* Bedeutung der Regressionstests
* Notwendigkeit von Tools und Testautomatisierung
* Teststatus, Task Boards, Burndown Charts
* Soft Skills für Tester
* Blick auf Prozessqualität

