# Diplomarbeit von Birngruber und Werner

## Important Links

### Office 365
https://M365x750080.sharepoint.com
#### megan b
* meganb@m365x750080.onmicrosoft.com
#### admin
* admin@m365x750080.onmicrosoft.com
### Azure Devops
* https://dev.azure.com/40146720160360
* only 30 day trial
### Azure
* https://portal.azure.com/

## Toolgestütztes Testing in Entwicklungsprojekten auf Basis moderner Web-Technologien

### Theroieteil
* Allgemeine Beschreibung von Testing in Unternehmen und Qualitätssicherung
* Beschreibung von Testarten und Strategien
* Definition von Test Plans und Test Runs

### Case Studies
* Azure Devops (kompliziert & umfangreich & teuer)
* Excel (unmanaged & simple)
* (Testrail)

### Development
* Integrierbare Lösung mit MS-Teams (als Tab)
* Plans & Runs definieren
* Runs durchführen und Ergebnisse Dokumentieren (evtl. Dox42)
* Ablage in Sharepoint/Team und Versand einer "Card"
* UI so simple wie möglich (keine Überladung)
* Default Tests integrieren (z.B. Test, ob Bestands-System funktioniert)
* Speicherung sollte in Azure SQL passieren und Zugriff (via Azure functions oder mongoose)

* Optional: Schnittstellen Anbindung von smartERP, Azure DevOps, Planner
* Optional: Generierung eines "Change-Log" E-Mails

# todo
## doku
* firmenlogo
* name und unterrerschrift bei 3.
* bis inhaltsverzeichnis abgabe auf plattform
* zitate erstellen bei referenzen apa


## dev
* grid beim testfall erstellen listview
* tenet property mit baseurl
* azure ad authentifizierung
* property drill down ja nein
* home mit test runs von dashboard mit filter möglichkeit; navbar unbennen zu druchgeführte tests; nur completed angezeigt
* dashboard page graphs nebeneinander; datepicker nebeinander
* bei optioal abgehackte tests bei readonly steht fehlermeldung
### known bugs
* beschreibung im richtext ändert sich nicht beim reorder -> state ist richtig; richtext aktualisiert den wert nicht
* dialog mit datepicker hat teilweise anzeigefehler
* beim Filtern der test runs durch einen Zeitraum -> falls die datumseingrenzung keiner Ergebnisse liefert werden die nav links nicht aktualiesert; warum?
