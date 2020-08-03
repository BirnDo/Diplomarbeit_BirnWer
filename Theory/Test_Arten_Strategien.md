# Beschreibung von Testarten und Strategien

[TOC]

## Testarten

Softwaretests werden nach verschiedenen Kriterien klassifiziert.

- Prüftechnik
  - **Analytische Maßnahmen**
    Diese Test werden erst nach der Erstellung des Produkts durchgeführt. Man unterscheidet dabei noch nach statischen Test, welche ohne Ausführung des Codes durchgeführt werden, und dynamischen Tests. 
  - **Konstruktive Tests**
    Diese Test gehen der Entwicklung voraus und werden bei der Softwareerstellung durchgeführt. Dazu gehört zum Beispiel das Anforderungsmanagement, Prototyping oder das schreiben von Pflichtenheften.
  - **Spezifikationstechniken**
    Diese Test werden nicht zum Testen von Code verwendet, sondern dienen zum vorbereiten der anderen Tests.
- Art und Umfang der Testobjekte
  - **Debugging**: Testet einzelne Codeteile
  - **Unittests**: Testet die kleinstmöglichen Funktionalitäten, z.B. einzelne Funktionen 
  - **Integrationstests**: Testet die Zusammenarbeit der verschiedenen Komponenten
  - **Systemtests**: Testet das gesamte System
  - **Schnittstellentest**: Testet ob die einzelnen Schnittstellen planmäßig miteinander kommunizieren.
  - **Batchtest/Web-Test**: Testet Batch Dateien/Webseiten
  - **Hardwaretest**: Testet die Auslastung der verschiedenen Hardwarekomponenten
- Sichtweisen
  - **Sicht von Benutzern**
    Testet z.B. die Benutzeroberfläche und das Verhalten des Programms aus User Sicht
  - **Softwaretechnische Zusammenhänge**
    Dazu gehören z.B. das Testen von Datenkonsistenz, die Wiederaufnahme der Funktionalität nach einem Absturz oder gleich nach der Installation, Stress-, Crash-, Last- und Performance Tests und Sicherheitstests.
  - **Software-Qualitätsmerkmale**
    Dazu gehören funktionale und nicht funktionale Tests sowie Fehlertests
- Weitere Klassifikationen
  - Zeitpunkt
  - methodische Ansätze
  - Intensität
  - Informationsstand der Komponenten
  - Wer spezifiziert/führt Tests durch
  - Art der Softwaremaßnahme

Die 6 am häufigsten eingesetzten Testarten sind:

- **Unit Tests**
  Diese Tests werden schon während der Programmierung laufend vom Entwickler mit getestet.

- **Smoke Tests**
  Durch diesen Test wird getestet, ob die Basisfunktionalitäten vorhanden und funktionsfähig sind. So wird getestet ob die Software stabil und bereit zur zur Weiterentwicklung ist.

- **Sanity Tests**
  Sie werden nach Smoke Tests zum prüfen der Funktionen im Code durchgeführt.

- **Regressionstests**
  Dieser Test wird durchgeführt um zu testen, ob nach einer Codeänderung noch alle Funktionen ordnungsgemäß miteinander kommunizieren.

- **Integrationstests**

  Durch diese Test wird geprüft ob der Datenaustausch ordnungsgemäß von statten geht.

- **Abnahmetests**
  Wird auch als Betatest bezeichnet. Er dient um zu testen, ob alle Funktionen erfüllt sind und das Produkt wie erwartet ist. Man richtet sich bei der agilen Softwareentwicklung dabei nach den User Stories.

### Funktionale und nicht funktionale Tests

Funktionale Tests konzentriert sich auf die einzelnen Funktionen des Produkts. Es geht darum, die Anforderungen zu testen. Diese können manuell durchgeführt werden und schon leicht im Vorfeld definiert werden.

Nicht funktionale Tests beziehen sich hingegen auf das Gesamt Produkt. Hierbei wird meist die Leistung getestet und diese Test müssen oft simuliert werden. Sie werden meist erst während der Entwicklung definiert, da man davor die funktionsweise des Codes noch nicht weiß.

## Teststrategien

### Definitionen

**Nach Pol, Koomen und Spillner**

In der Teststrategie wird festgelegt, mit welcher Intensität die einzelnen Teile getestet werden. Es werden auch festgelegt welche Testmethoden und Techniken verwendet werden und welche Reihenfolge dabei verwendet wird. Diese Strategie wird  bei der Testplanung erarbeitet und im Testplan aufgezeichnet.

**nach International Software Testing Qualifications Board**

Das ISTQB bezeichnet die Ausprägungen der Teststrategien jedoch nach:

- **top-down**
  Es werden zuerst Hauptfunktionen getestet und erst anschließend die Detailfunktionen. Die Teilfunktionen werden entweder ignoriert oder durch Stubs simuliert
- **bottom-up**
  Detailfunktionen werden zuerst getestet und Hauptfunktionen werden durch Testdriver simuliert
- **hardest first**
  Die wichtigsten Funktionen werden je nach Situation zuerst getestet
- **big-bang**
  Alle Funktionen werden auf ein mal getestet

weitere Prinzipien:

- **Risk based Testing**
  Es wird nach den Risiken ausgerichtet, welche Funktionen getestet werden
- **Data driven Testing**
  In den Testskripts können Daten schnell geändert werden um viele Tests hintereinander durchführen zu können
- **Testgetriebene Entwicklung**
  Die Tests werden vor der Implementierung der Funktionen geschrieben
- **SMART**
  Die Tests sind Spezifisch, Messbar, Erreichbar, realistisch und Zeitgebunden (**S**pecific, **M**easurable, **A**chievable, **R**ealistic, **t**ime-bound)
- **Keyword driven testing**
  Dient zum, automatischen testen von Software
- **framework based testing**
  Testautomatisierung anhand spezifischer Programmiersprachen/IDEs
- **Testen nach ISO/IEC 25000**
  Die ISO/IEC 25000 definiert Qualitätskriterien und Bewertungsmethoden

### Risikobasiertes Testen

Es ist oft aus Zeit oder finanziellen Mitteln nicht möglich, Software in ihrer Gesamtheit zu testen. Aus diesem Grund müssen die Test Sinnvoll priorisiert werden, dazu wird oft die RPI-Methode verwendet (**R**isiko-**P**rioritäts Index). Zuerst werden die Anforderungen gruppen zugeordnet und danach werden Kriterien definiert. Dabei wird besonders auf 3 Kriterien eingegangen:

- **Businessrelevanz**
  Es wird darauf eingegangen wie groß der nutzen für die Anwender bzw. der Schaden bei Nichterfüllung ist. Es ist auch wichtig, wie viele Anwender betroffen sind, wenn eine Anwendung nicht erfüllt wird und ob eine Anforderung ein Muss, Soll oder Kann Ziel ist.
- **Auffindbarkeit**
  Es wird darauf eingegangen, wie schnell ein Fehler bei Nichterfüllung auffindbar ist, ob er überhaupt bemerkt wird und wie ersichtlich er ist.
- **Komplexität**
  Es wird geprüft wie komplex eine Anforderung ist und wie sehr sie von anderen Anforderungen abhängt oder wie viele von der Anforderung abhängen. Es wird auch darauf eingegangen, wie komplex die Umsetzung ist und wie komplex die verwendeten Technologien sind.

### Teststrategie nach ISO/IEC 25000

Die ISO/IEC 25000 definiert 8 Dimensionen:

- Funktionale Eignung
- Zuverlässigkeit
- Benutzbarkeit
- Leistungseffizienz
- Wartbarkeit
- Übertragbarkeit
- Sicherheit
- Kompatibilität

Diese Teststrategie bezieht sich auf diese 8 Merkmale und die Tests werden darauf ausgerichtet, dass diese Merkmale eingehalten werden

### Quellen

- https://de.wikipedia.org/wiki/Softwaretest#Teststrategie
- https://www.technosoft.de/qa-testing/funktionale-tests
- https://www.infobest.de/6-schritte-zur-optimalen-qualitatssicherung-in-der-softwareentwicklung/