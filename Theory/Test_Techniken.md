# Techniken in agilen Projekten

[Relevante Informationen interpretieren](#relevante-informationen-interpretieren)

[Abnahmekriterien, Definiton of Done](#abnahmekriterien-definiton-of-done)

[Abnahmetestgeriebene Entwicklung](#abnahmetestgeriebene-entwicklung)

[Testfälle für User Stories erstellen](#testfälle-für-user-stories-erstellen)

[Exploratives Testen](#exploratives-testen)

[TOC]





## Relevante Informationen interpretieren

### Anfangsanforderungen

* Anfangsanforderungen zu Projektbeginn
* Typischerweise User Stories
* Priorisiertes Backlog
* Kurze Formulierung
* Vorab definiertes Format

### Nicht-funktionale Anforderungen

* Beispiele: Benutzbarkeit, Performaz
* Eigene User Stories
* oder an bestehende funktionale User Stories geknüpft
* Vorab definiertes Format möglich
  * Standard ISO 25000
  * Sonstiger industriebezogener Standard

### Testbasis

* User Stories wichtigste Testbasis
* Weitere Informationsquellen als Testbasis
  * Erfahrung aus aktuellen oder vergangenen Projekten
  * Bestehende Funktionen, Features und Qualitätsmerkmale des Systems
  * Code, Architektur und Entwurf
  * Nutzerprofile (Kontext, Systemkonfiguration und Nutzverhalten)
* Weitere Informationen als Testbasis (Fortsetzung)
  * Informationen zu Fehlern aus aktuellen und vorangegangen Projekten
  * Kategorisierung der Fehler in Fehlertaxonomie
  * Anwendbare Standards (z.B. [DO-178B] für Avionik Software)
  * Qualitätsrisiken

### Infos für Abnahmekriterien

* In jeder Iteration erfolgt Implementierung 
  * der in der User Story beschriebene Funktionen und Features
  * mit dem relevanten Qualitätsmerkmalen
* Verifikation und Validierung durch Abnahmetests
* Testbare Abnahmekriterien  decken folgende Themen ab
  * Funktionales Verhalten
  * Qualitätsmerkmale 
  * Szenarien
  * Geschäftsprozessregeln
  * Externe Schnittstellen
  * Einschränkungen
  * Datendefinitionen
* Funktionales Verhalten
  * von außen beobachtbares Verhalten
  * Nutzeraktionen als Input
  * Unter den relevanten Konfigurationen
* Qualitätsmerkmale
  * Bewertung, wie System gefordertes Verhalten ausgeführt
  * Eigenschaften oft Qualitätsattribute oder nicht-funktionale Anforderungen genannt
  * Beispiele
    * Performanz
    * Verlässlichkeit
    * Benutzbarkeit (siehe auch [ISO25000])
* Szenarios (Use Cases)
  * Abfolge von Aktionen
  * Zwischen externem Akteur (oft Nutzer) und System
  * Erfüllt bestimmtes Ziel/definierte Aufgabe
* Geschäftsprozessregeln
  * Aktivitäten, die nur unter bestimmten Bedingungen im System ausgeführt werden können
  * Bedingungen durch externe Vorgehensweisen und Beschränkungen bestimmt
    * z.B. Verfahrensweise eines Versicherungsunternehmens, um Versicherungsansprüche zu behandeln
* Externe Schnittstellen
  * Verbindungspunkte zwischen System und Außenwelt
  * Verschiedene Arten
    * Benutzerschnittstelle
    * Programmierschnittstelle, etc.
* Einschränkungen
  * Entwurf- und Implementierungsbedingung begrenzen Möglichkeiten der Entwickler
  * Bei Embedded Systems (eingebettete Software) oft physische Grenzen
    * Größe
    * Gewicht
    * Schnittstellen
* Datendefinition
  * Beschreibung durch Kunden bzgl.
  * Format
  * Datentyp
  * erlaubte Werte
  * Standartwerte
  * Anordnung des Datensatzes in komplexer Unternehmensdatenstruktur (z.B. Postleitzahl in US-Adressen)

### Weitere Informationen

* Zusätzlich zu User Stories und Abnahmekriterien
* Wie wird System arbeiten?
* Wie wird System genutzt werden?
* Testrelevante Systemschnittstellen
  * Speziell für Test erstellt
  * Nur für Test- und Diagnosenutzung vorgesehen
  * Aber: gleich hoher Qualitätsanspruch wie an Echtschnittstellen
* Reicht verfügbare Werkzeugunterstützung aus
* Genügend Wissen und Fähigkeiten bei Testern vorhanden
  * um notwendige Tests durchzuführen

### Informationsbeschaffung

* Tester erkennen oft während laufender Iteration Bedarf an weiterer Informationen (z.B. Codeüberdeckung)
* Zusammenarbeit mit anderen Teammitgliedern, um Informationen zu erhalten

## Abnahmekriterien, Definiton of Done

### Info und DoD

* Beurteilung, ob bestimmte Aktivität erledigt ist
* Dafür relevante Informationen notwendig
* Wesentliches agiles Konzept ist Definition of Done (DoD)
* Verschiedenartig verwendet
  * je Teststufe
  * Pro Feature
  * Pro User Story
  * Bezogen auf Iterationen
  * Bezogen auf Release

### DoD pro Teststufe

* Eigene Definition of Done je Teststufe
* Unterschiedliche Informationen je Teststufe relevant

### DoD für Unit Tests

* 100% Entscheidungsüberdeckung
  * wo möglich, mit Reviews nicht abgedeckter Wege
* Statische Analyse des gesamten Codes
* Keine ungelöste schweren Fehler
  * Rangfolge gemäß Risiko und Schwere
* Keine bekannten inakzeptablen technischen Schulden (Technical Debt) in Entwurf oder Code
* Reviews vollständig abgeschlossen
  * Gesamter Code
  * Unit Tests
  * Ergebnisse der Unit Tests
* Alle Unit Tests automatisierte und vollständig durchgeführt
* Wichtige Qualitätsmerkmale innerhalb vereinbarter Grenzen (z.B. Performanz)

### DoD für Integrationstest

* Alle funktionalen Anforderungen getestet
  * Positiv- und Negativtests
  * Testanzahl basierend auf Größe, Komplexität und Kritikalität der Applikation
* Alle äußeren Komponentenschnittstellen vollständig getestet
* Alle Qualitätsrisiken gemäß vereinbartem Testausmaß abgedeckt
* Keine ungelösten schweren Fehler
  * priorisiert gemäß Risiko und Bedeutung
* Alle gefundenen Fehler dokumentiert
* alle Regressionstests automatisiert
  * soweit technisch möglich
* Alle automatisierten Tests in gemeiner Ablage gespeichert

### DoD für Systemtest

* Alle End-to-End Tests durchgeführt und dokumentiert
  * für User Stories, Features und Funktionen
* Alle Nutzeridentitäten abgedeckt
* Wichtige Qualitätsmerkmale des Systems abgedeckt
  * z.B. Performanz, Robustheit, Zuverlässigkeit
* Tests in produktionsähnlichen Umgebung
* Gesamte Hard- und Software für alle unterstützten Konfiguration verfügbar
  * soweit möglich
* Alle Qualitätsrisiken gemäß des vereinbarten Testumfangs abgedeckt
* Alle Regressionstests automatisert
  * soweit möglich
* alle automatisierte Tests in gemeiner Ablage hinterlegt
* Alle offene Fehler 
  * dokumentiert
  * priorisiert (gemäß Risiko und Bedeutung)
  * akzeptiert im aktuellen Status

### DoD pro User Story

* Alle für Iteration gewählten User Stories sind
  * vollständig
  * vom Team verstanden
  * haben detaillierte, testbare Abnahmekriterien
* Alle Elemente jeder User Story sind
  * spezifiziert
  * einem Review unterzogen
* Abnahmetests der User Stories stehen bereit
  * Testbeschreibung für manuelle Tests
  * Testskript für automatisierte Tests
* Notwendige Aufgaben für Implementierung und Test sind
  * identifiziert
  * vom Team geschätzt

### DoD pro Feature

* Feature umfasst mehrere User Stories oder Epics
* Jede wesentliche User Story mit ihren Abnahmekriterien vom Kunden
  * definiert
  * abgenommen
* Entwurf vollständig
* Code vollständig
* Unit Tests mit definiertem Überdeckungsgrad durchgeführt
* Integrations- und Systemtests für Feature mit definierten Überdeckungskriterien
* Alle schweren Fehler korrigiert
* Feature-Dokumentation vollständig
  * Auch Release Notes
  * Bedienungsanleitung für Nutzer
  * Online-Hilfefunktion

### DoD pro Iteration

* Alle Features der Iteration
  * fertig entwickelt
  * individuell getestet
  * gemäß Feature-Level Kriterien
* Alle offenen, nicht-kritischen Fehler
  * im Product Backlog enthalten
  * priorisiert
* Integration aller Features der Iteration erfolgt und getestet
* Dokumentation geschrieben und nach Review abgenommen
* Software potenziell auslieferbar
* Iteration erfolgreich abgeschlossen
* Nicht alle Iterationen erden zwingend released

### DoD pro Release

* Release kann mehrere Iterationen umfassen
* Überdeckung
  * Alle relevanten Testbasiselemente für gesamten Inhalt des Releases durch Tests abgedeckt
* Angemessenheit der Überdeckung abhängig von
  * Anteil an Neuem bzw. Änderungen
  * Komplexität
  * Göße
  * Risiko für Misserfolg
* Qualität
  * Fehlerhäufung (z.B. wie viele Fehler werden pro Tag oder pro Transaktion gefunden)
  * Fehlerdichte (z.B. Anzahl gefundener Fehler im Vergleich zur Anzahl der User Stories und/oder Qualitätsattribute)
  * geschätzte Anzahl verbleibender Fehler in akzeptablem Rahmen
  * Folgen (Schwere, Priorität) offener Fehler sind verstanden und akzeptabel
  * Restrisiko aller identifizierten Qualitätsrisiken verstanden und akzeptabel
* Zeit
  * zum festgelegten Lieferdatum müssen die geschäftlichen Auswirkungen bezüglich der Veröffentlichen oder Nicht-Verantwortung abgewogen werden
  * Liegt nicht in primären Testverantwortung
  * Tester kann Informationen für Entscheider beisteuern
* Kosten
  * Rendite auf Basis geschätzter Lebenszykluskosten
  * d.h. berechnete Entwicklungs- und Wartungskosten sollten weit geringer sein als erwarteter Gesamtumsatz des Produkts
  * Unbemerkte Fehler in Produktion übernommen
  * Oft Hauptteil der Lebenszykluskosten

## Abnahmetestgeriebene Entwicklung

### Test First

* Testfälle vor Implemntierung der User Story erstellt
* Testfälle vom gesamten agilen Team erstellt
* Testfälle können sowohl manuell als auch automatisiert sein

### Ablauf

* Spezifikationsworkshop

  * User Story von

    * Entwicklern
    * Testern
    * Fachbereichsvertretern

     analysiert, diskutiert und geschrieben

* Prozess korrigiert (d.h. verändert) User Story

  * Löst Unvollständigkeiten
  * Löst Mehrdeutigkeiten
  * Korrigiert Fehler

* Testerstellung

  * Gemeinsam im Team oder im Tester allein

* Beurteilung der Tests durch unabhängige Person

  * z.B. Fachbereichsvertreter

* Tests beschrieben als Beispiele spezifische Eigenschaften der User Story

* Test = Beispiel

* Beispiele helffen Team bei korrekten Implementierung

  * "specification by example"

* Arbeit beginnt mit Basisbeispielen und offenen Fragen

* Zuerst Positivtests

  * Testen Standardverhalten ohne Ausnahme- oder Fehlerbedingung
  * Umfassen Abfolgen der Aktivitäten nach Plan
  * Aber: Beinhalten definiertes Ausnahmeverhalten, falls vorhanden
    * Gehört damit zum definierten Umfang
    * Gelegentlich nicht einfach zu erkennen

* Danach Negativtests

  * Nach Abschluss der Positivtests
  * auch nicht-funktionale Attribute abdecken (z.B. Performanz, Benutzbarkeit)

### Verständlichkeit

* Formulierung in normaler Sprache
  * Vorbedingung, Inputs, Ergebnisse
  * Jeder Stakeholder soll sie verstehen können

### Überdeckung

* Beispiele (=Testfälle) müssen alle Eigenschaften der User Story abdecken
* Beispiele solle nichts hinzufügen
* Keine Beispiele für in User Story nicht dokumentierte Aspekte
* Genau ein Beispiel für jedes Merkmal einer User Story
  * Überdefinition --> Aufwand nicht erforderlich
  * Unterschiedliche Beispiele --> mögliche Fehlerquelle, Unklarheit

## Testfälle für User Stories erstellen

### Übersicht

* Black-Box Testentwurf
* Funktionale und nicht-funktionale Tests
* Oft zeitgleich Testentwicklung und Software-Programmierung
  * Tester und Entwickler arbeiten überlappend
* User Stories und Abnahmekriterien sind Grundlagen
  * sowohl für Entwickler bei Programmierung
  * als auch für Tester bei Testerstellung

### Funktionale Blackbox-Tests

* Traditionelle Black-Box Testentwurfsverfahren
  * Äquivalenzklassenbildung
  * Grenzwertanalyse
  * Entscheidungstabellen
  * Zustandsbasierte Tests

### Blackbox vs. Explorativ

* Explorative und andere erfahrungsbasierte Tests erst später
  * Erstellung während Testdurchführung

### Nicht-funktionale Blackbox-Tests

* User Story auch für nicht-funktionale Anforderungen
  * Kann Performanz- oder Zuverlässigkeitsbedingung enthalten
  * z.B. Zeitlimit für Ausführung einer Aktion, Durchführung nur bis zu begrenzter Zahl von Fehleingaben

### Blackbox-Testentwurf

* Bekannte Blackbox-Verfahren im agilen Umfeld vollinhaltlich gültig
  * aus Foundation Level
  * aus Advanced Level - Test Analyst

## Exploratives Testen

### Motivation

* Begrenzte  Zeit
  * Kurze Iteration
* Begrenzte Detailgenauigkeit der User Stories
* Exploratives Testen in agilen Projekten wichtig
* Rein explorative Methoden mit anderen erfahrungsbasierten Verfahren kombinierten
  * Liefern in Kombination bessere Ergebnisse
  * Bilden Teile einer reaktiven Teststrategie

### Teststrategien

* Reaktive Strategie mit anderen kombinierbar
  * analytisches risikobasiertes Testen
  * analytischen anforderungsbasiertes Testen
  * modellbasiertes Testen
  * regressionsvermeidendes Testen
* Teststrategien und Kombination von Teststrategien aus Foundation Level

### Exploration

* Zeitglich Testentwurf und -durchführung
* Vorbereitete Test-Charta
* Test-Charta für Testbedingungen
* Zeitlich begrenzte Testsitzung deckt Test-Charta ab

### Testentwurf

* Basierend auf Ergebnissen der zuletzt durchgeführten Tests werden nachfolgende Testfälle entworfen
* Dieselben White-Box- und Black-Box- Verfahren wie bei vorentworfenen Tests

### Inhalt einer Test-Charta

* Akteur
  * Vorgesehener Nutzer des Systems
* Zweck
  * Angabe von Testziel und Testbedingung
* Set-Up
  * Was muss vorhanden sein, um mit Testdurchführung beginnen zu können
* Priorität
  * relativer Stellenwert dieser Charta, auf Grundlage der Priorität der User Story Risikostufe
* Referenz
  * Spezifikationen (z.B. User Story), Risiken, andere Informationsquellen
* Daten
  * Jegliche Daten, die benötigt werden, um Test-Charta durchzuführen
* Aktivitäten
  * Liste von Ideen, was Akteur mit System vielleicht tun will (z.B als "Super User" in System einloggen) und welche Tests interessant wären (sowohl Positiv- als auch Negativtests)
* Orakel-Notizen
  * Wie soll beurteilt werden, was korrekte Ergebnisse sind (z.B. erfassen, was auf Bildschirm passiert und dies mit dem Benutzerhandbuch vergleichen)
* Variationen
  * Alternative Aktionen und Auswertungen, um Ideen zu ergänzen, die unter Aktivitäten beschrieben sind

### Sitzungsbasiertes Testmanagement

* Sitzungsbasiertes Testmanagement

  ist eine Methode zur Messung und Steuerung des Testens in Sitzungen ("sitzungsbasiertes Testen"), z.B. exploratives Testens

* Sitzungsbasiertes Testen 

  ist eine Vorgehensweise beim Testen, bei der die Testaktivitäten - insbesondere Testentwurf und Testdurchführung - als unterbrechungsfreie Sitzungen geplant werden, oft in Verbindung mit exploratives Testen

### Session based Testing

* Organisation des explorativen Tests oft durch sitzungsbasiertes Testmanagement
  * session based test management
  * session based testing
* "Sitzung" ist ununterbrochene Zeitspanne des Testens
  * Dauer zwischen 60 und 120 Minuten

### Testsitzungen

* Können verschiedene Themen beinhalten
* Überblickssitzung
  * um zu lernen, wie System funktioniert
* Analysesitzung
  * Bewertung der Funktionalität oder Eigenschaften
* Genaue Überdeckung
  * Ausnahmefälle, Szenarien, Interaktionen

### Testqualität

* Qualität stark vom Tester abhängig
  * Fähigkeit des Testers, relevante Fragen darüber zu stellen, was getestet werden soll
* Beispiele für Fragen des Testers
  * Was ist das Wichtigste, das über das System herauszufinden ist?
  * Auf welcher Art und Weise kann das System versagen?
  * Was passiert, wenn ...?
  * Was sollte passieren, wenn ...?
  * Werden die Bedürfnisse, Anforderungen und Erwartungen des Kunden erfüllt?
  * Ist das System installationsfähig (und wenn nötig deinstallationsfähig) für alle unterstützen Upgrades?

### Fähigkeiten des Testers

* Kreativität
* Intuition
* Erkenntnisvermögen
* Fachkenntnisse
* Gutes Verständnis der Software unter Testbedingungen
* Kenntnisse über Fachbereich
* Kenntnisse über Systemnutzung und Beurteilung von Fehlschlägen

### Heuristiken

bezeichnet die Kunst, mit begrenztem Wissen und wenig Zeit zu guten Lösungen zu kommen. Es bezeichnet ein analytischen Vorgehen, bei dem mit begrenztem Wissen über ein System mit Hilfe von mutmaßenden Schlussfolgerungen Aussagen über das System getroffen werden.

Im Kontext exploratives Testens: Finden typischer Testfälle, geeigneter Abläufe und Interpretation der Ergebnisse aufgrund "soeben" gemachter Testerfahrungen

* Reihe von Heuristiken kann für Tests genutzt werden
* Heuristik kann Tester Anleitung geben, wie Tests durchgeführt werden und wie Ergebnisse zu bewerten sind

### Beispiele von Heuristiken

* Grenzen
* CRUD
  * Create, Read, Update, Delete
* Konfigurationsvariation
* Unterbrechungen
  * z.B. Abmelden, Schließen, Neustarten

### Dokumentation

* Prozesse so genau wie möglich dokumentieren
* Testüberdeckung 
  * Welche Eingabewerte wurden genutzt
  * Wieviel wurde abgedeckt
  * Wieviel muss noch getestet werden
* Bewertungsnotizen
  * Beobachtungen während des Testens
  * Sind System und getestetes Feature stabil
  * Wurden Fehler gefunden
  * Was ist als nächster Schritt als Folge der aktuellen Beobachtung geplant
  * Gibt es weitere Ideen
* Risiko-/Strategieliste
  * Welche Risiken wurden abgedeckt
  * Welche verbleiben von den wichtigsten
  * Wird ursprüngliche Strategie weiterverfolgt
  * Sind Änderungen nötig
* Probleme, Fragen und Anomalien
  * jegliches unerwartetes Verhalten
  * jegliches Fragen bezüglich Effizienz des Ansatzes
  * jegliches Bedenken bezüglich Ideen/Testversuche, Testumgebung, Testdaten
  * Missverständnisse bezüglich Funktionen, Testskripts oder System unter Testbedingung
* Tatsächliches Verhalten
  * Aufzeichnung des tatsächlichen Verhaltens des Systems
  * Muss gespeichert werden (z.B. Video, Screenshots, Ergebnisdateien)
* Aufgezeichnete Information in Statusmanagementwerkzeug erfassen
  * z.B. Testmanagementwerkzeuge, Taskmanagementwerkzeuge, Task Board
  * ggf. Informationen zusammenfassen
* Stakeholder sollen aktuellen Status aller durchgeführten Tests verstehen können

## Zusammenfassung

* User Stories als Anfangsanforderungen
* Unterschiedliche Formen von Abnahmekriterien
* Unterschiedliche Verwendung der Definition of Done
* ATDD (abnahmetestgetriebene Entwicklung)
* Black-Box-Verfahren für User Stories, funktional und nicht-funktional
* Exploratives Testen, Testcharta, sitzungsbasierter Test