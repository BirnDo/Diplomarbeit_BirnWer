# Definition von Test Plans und Test Runs

- [Definition von Test Plans und Test Runs](#definition-von-test-plans-und-test-runs)
  - [Test Plan](#test-plan)
    - [Arten](#arten)
      - [Master Test Plan](#master-test-plan)
      - [Testing Level Specific Test Plans](#testing-level-specific-test-plans)
      - [Testing Type Specific Test Plans](#testing-type-specific-test-plans)
  - [Test Case](#test-case)
    - [Inhalt](#inhalt)
  - [Test Runs](#test-runs)
  - [Zusammenhang zwischen Plans, Cases und Runs](#zusammenhang-zwischen-plans-cases-und-runs)
  - [Quellen](#quellen)

## Test Plan

Ein Test Plan ist ein Dokument das die Ziele, Prozesse und Ressourcen eines spezifischen Tests von einem Software oder Hardware Produkt beschreibt.

Der Test Plan enthält den Umfang, den Testansatz, die Ressourcen und den Zeitplan der geplanten Tests. Es definiert auch die zu testenden Gegenstände, Features, Aufgaben und wer diese Testet, der Grad von Freiheit beim testen. Weiters wird auch die Testumgebung, die Test Design Techniken, die Start- und Endkriterien und die Begründung für diese und die Gefahren durch Zufälligkeit. Es wird auch definiert, an wen man sich bei Fehlern meldet und wie man bei der Meldung vorgeht. Der Test Plan wird im Laufe des Testens immer angepasst.

Er dient als Anhaltspunkt für dir Durchführung der Tests in der Qualitätssicherung und wird auch mit Geschäfts Analysten, Projektmanagern, dem Entwicklerteam und anderen Teams geteilt. Es wird durch den QA (Quality Assurance, dt. Qualitätssicherung) Manager/Lead Anhand von Inputs der Teammitglieder dokumentiert. Es wird ca. 1/3 des Zeitaufwandes zum, testen zum erstellen des Plans verwendet. Es gilt: je genauer der Test Plan, desto erfolgreicher werden die Tests ablaufen.

### Arten

#### Master Test Plan

Der Master Test Plan vereint alle anderen Test Plans.

#### Testing Level Specific Test Plans

Sie definieren die Tests für die einzelnen Stufen von Tests. Dazu gehören Unit Test Plans, Integration Test Plans, System Test Plans und Acceptance Test Plans.

#### Testing Type Specific Test Plans

Diese Test Plans definieren Test für oft genutzte Arten des Testens wie Leistungstests oder Sicherheitstests.

## Test Case

Unter einem Test Case versteht man eine Sammlung von Bedingungen, welche es dem Tester erleichtern zu überprüfen, ob alle Anforderungen ausreichend erfüllt sind. Beim erstellen dieser Test Cases erkennt man auch oft Probleme in den Anforderungen oder in der Anwendung.

### Inhalt

In einem Test Case werden alle Daten, die für einen Test wichtig sind aufgezeichnet. Dazu gehören

- **Test Suite/Case ID**
  ID zu der Suite des Tests und die ID des Test Cases selbst.
- **Test Case Zusammenfassung**
  Zusammenfassung des Ziels des Test Cases
- **Zugehörige Anforderungen**
  Die ID der Anforderungen die zu diesem Test Case gehören
- **Vorbedingungen**
  Alle Bedingungen die vor dem Ausführen des Tests erfüllt sein müssen
- **Testhandlungen**
  Eine Schritt für Schritt Anleitung zum ausführen des Tests
- **Testdaten**
  Alle Daten, welche zum durchführe des Tests notwendig sind
- **Erwartetes Ergebnis**
- **Testumgebung**
  Genaue Beschreibung der Testumgebung

Test Cases sollen immer so geschrieben sein, dass sie nur eine Sache testen, und dabei sollen sowohl Positive Fälle, als auch Fehlerfälle getestet werden. Sie sollten genau, nicht zu kompliziert, Nachverfolgbar, wiederholbar und wieder benutzbar sein.

## Test Runs

Ein Test Run enthält zusätzliche Daten zu einem Test Case

- **Tatsächliches Ergebnis**
- **Status**
- **Anmerkungen**
- **Erstellt von**
- **Datum der Erstellung**
- **Durchgeführt von**
- **Datum der Durchführung**

## Zusammenhang zwischen Plans, Cases und Runs

Während ein Test Plan nur die allgemeinen Ansätze des Testens beinhalten, beinhalten Test Cases spezifische Daten zum durchführen der Tests. Mehrere Test Cases können noch mit Test Suites zusammengefasst werden. Test Runs sind das Ergebnis eines durchgeführten Test Cases.

## Quellen

- http://softwaretestingfundamentals.com/test-plan/
- https://www.softwaretestinghelp.com/how-to-write-test-plan-document-software-testing-training-day3/
- https://www.testmonitor.com/blog/test-case-test-suite-test-run-whats-the-difference
- http://softwaretestingfundamentals.com/test-case/
- https://sqa.stackexchange.com/questions/9119/test-suite-vs-test-plan
