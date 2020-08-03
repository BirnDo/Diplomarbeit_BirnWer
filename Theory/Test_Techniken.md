# Techniken in agilen Projekten

[Relevante Informationen interpretieren](#relevante-informationen-interpretieren)

[Abnahmekriterien, Definiton of Done](#abnahmekriterien-definiton-of-done)

[Abnahmetestgeriebene Entwicklung](#abnahmetestgeriebene-entwicklung)

[Testfälle für User Stories erstellen](#testfälle-für-user-stories-erstellen)

[Exploratives Testen](#exploratives-testen)

[TOC]

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

## Testfälle für User Stories erstellen

## Exploratives Testen