| Date          | Tasks                                                        | Duration (hours) | Source/Issues                                                |
| ------------- | ------------------------------------------------------------ | ---------------- | ------------------------------------------------------------ |
| 01.07 - 03.07 | Kennerlernen und Testen der Technologien bei einem Seminar   | 15               | Location: Firma Smartpoint: Strasserau 6, 4020 Linz          |
| 22.07         | Zusammenfassung Agile Softwareentwicklung                    | 4                | Source: Software Quality Lab Unterlagen                      |
| 29.07         | Zusammenfassung Grundlegende Prinzipien, Praktiken und Prozesse des agilen Testens | 2                | Source: Software Quality Lab Unterlagen                      |
| 29.07         | Research Test Plans and Test Runs                            | 1                | Source: see file                                             |
| 30.07         | Zusammenfassung von Grundlegende Prinzipien, Praktiken und Prozesse des agilen Testens | 2                | Source: Software Quality Lab Unterlagen                      |
| 03.08         | aufsetzen Sandbox Entwicklungsumgebung                       | 3                | https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment |
| 03.08         | aufsetzen Sandbox Entwicklungsumgebung; schreiben von Dokumentation: setting up project | 2                | https://docs.microsoft.com/de-de/sharepoint/dev/spfx/web-parts/get-started/using-web-part-as-ms-teams-tab |
| 03.08         | Zusammenfassen von Test Techniken                            | 3                | Source: Software Quality Lab Unterlagen                      |
| 03.08         | Formattierung von allen Markdown Dokumenten (Inhaltsverzeichniss, Auslagerung von Themen) | 1                |                                                              |
| 04.08         | Zusammenfassung von Test Methoden                            | 3                | Source: Software Quality Lab Unterlagen                      |
| 18.09         | Mockup erstellen mit Adobe XD                                | 4                |                                                              |
| 25.09         | Pflichtenheft erstellen                                      | 1                |                                                              |
| 25.09         | Mockup testen und rendering ausprobieren in sanbox projekt   | 4                | Issues: Importing png in projects is difficult. Fixed by adding d.ts file to src folder which declares a module for png. |
|01.10|Rendering dynamisch erweitern; svgs statt pngs für hover effekt|3||
|03.10|Migration von Sandbox Projekt auf SmartQS Projekt; Markieren von Erfolgreichen und Fehlerhaften Tests nun möglich|2||
|09.10|Sichbarkeit von Status Buttons hinzugefügt; State erweitert; Rendering ausgelagert; Modal Interfaces hinzugefügt für wiederverwendbarkeit|5|||
|10.10|State Handhabung aktualisiert; callback Methode fürs State Handhabung hinzugefügt; rendering angepasst für logischen Aufbau; lokale Speicherung von Test Plans auf Arrray umgeschrieben|4|https://www.pluralsight.com/guides/how-to-pass-data-between-react-components|
|14.10|Callback Function aktualisiert damit sie state nicht direkt ersetzt; State Handhabung aktualisert und funktioniert nun korrekt|3|https://stackoverflow.com/questions/26253351/correct-modification-of-state-arrays-in-reactjs|
|15.10|svgs als React Component hinzugefügt; Element Rendering verbessert mithilfe von ausgelagerten Funktionen|2||
|15.10|updated the User stories that define the project|1||
|16.10|fixed project folder structure; fixed wrong terms for some words; fixed spelling mistakes|2|||
|18.10|added property active to display status buttons only if the test case is currently active; added functions in props interface|2||
|20.10|added comments to all functions|1||
|20.10|added Modal that shows the test case description when clicking on test case|1|https://developer.microsoft.com/en-us/fluentui#/controls/web/modal|
|03.11|added message property in test case; added dialog when marking test case as failure to enter the issue; updated the style of the modal to fluent ui style|3|https://developer.microsoft.com/en-us/fluentui#/controls/web/dialog|
|20.11|added Richtext to Dialog; added the Abillity to switch between test Runs|2||
|5.12|added React Router to Navigate between the TestRunOverview and the dashboard;|3|https://ravichandran.blog/2020/06/10/react-router-in-spfx/|
|11.12|added React Router and NavBar to TestRunOverview to navigate between different TestRuns; navbar dynamically renders links from data; added TestRunOverview to list all available TestRun|7| https://www.c-sharpcorner.com/article/single-page-app-in-spfx-using-re/ https://developer.microsoft.com/en-us/fluentui?fabricVer=6#/controls/web/nav|
|16.12|moved Modeldata; changed requests to channelid;added icon next to test run nav to display if a testrun is successfull or not|5|Problem with async request|
|20.12|added optional field to the test runs forms; added button to reorder all testcases (custom listview)|7|Problems implementing listview; did not work as it was a old react version; https://github.com/raisezhang/react-drag-listview|
|04.01|outsourced nav component; added dashboard component; worked on pnpjs charts for drill down chart|6|Problems implenting onclick event|
|15.01|pnpjs charts did not work; used chartsjs to implement drill down chart successfully|4|pnpjs charts dont work as onclick does not pass correct elements|
|29.01|added date field for deadline; sortierung der testruns nach Erstelldatum; optionale tests beim durchführen implementiert|5||
|03.02|implementiert das nach fehler beim testcase automatisch abbrechen; button zum testrun erneut durchführen hinzugefügt, kopiert und setzt testrun zurück|3|Probleme das bei der navbar automatisch der kopierte testrun ausgewählt wird|
|09.02|added functionallity to mark testcases as optional with comment popup; added tester field and popup when finishing a test; updated drill down chart colors to enable optional|3||
|10.02|added doneOn property to models; doneOn property gets set when a testrun if either faulty or successful; add popup when copying testrun to set new deadline|1||
|11.02|added readonly flag to set if the test runs should be read only or not; customized testrunoverview, testrun and testcase for generic use|3|Problems changing layout to generic; everything fixed after some testing|
|11.02|added statistics model; outsourced drill down component; added readonly testrunoverview to dashboard and fixed routing; added chart to dashboard page that displays the statistics of all test runs|4|Problems with routing in dashboard; fixed after some testing|
|12.02|added second Graph to Dashboard that displays all statistics of test cases;renamed Statistics Model to TestRun; added Model for TestCaseStatistics|2||
|13.02|added 2 datepicker to select the start and end date to filter the graphs and the testrun navbar; added reset button to reset the datepicker; added the abillity to filter the statistics of testcases and testruns by date range|3|Problems with Datepicker, it internally selects to previous date because it thinks the datepicker is meant as a "minDate"; fixed by added 1 hour to every datepicker date;
|13.02|added abillity to filter the testrun navbar by start and enddate; added props to parse the date values|2|problems with date request; problems when to refetch the request; lifecycle method used that only updates when props changed|
|16.02|added feature to configure server url of the backend; done via property pane; outsourced drilldown detailed chart to drilldown component; deleted unused code and comments|2||
