# Leseatelier — Version 1

Eine lokale, private Progressive Web App für die eigene Bibliothek.

## Enthalten
- Buchverwaltung mit Nachname, Vorname, Verlag, Erscheinungsjahr, Format und ISBN.
- ISBN-Metadatensuche bei Open Library; Barcode-Kamera, sofern der Browser die native `BarcodeDetector`-API anbietet.
- Automatische Cover-Suche bei Open Library und Google Books: ISBN oder Titel/Autor, auswählbare Vorschläge, Nachsuche für Bücher ohne Cover.
- Buchcover via ISBN oder eigener Bilddatei (Bilddatei wird komprimiert).
- Schlagworte, Notizen, Bewertung 1–10, Ausleihen und Rückgabetermine.
- Lesestatus: Want to Read, Reading, Read, DNF.
- Lesesitzungen (Seiten, optionale Lesezeit) und Hörsitzungen (reale Hörminuten, optionale Inhaltsminuten).
- Diagramme für laufende Woche, laufenden Monat und laufendes Jahr.
- JSON-Backup/-Import, CSV-Export, freiwilliger Bibliothekstext für ChatGPT.
- Empfehlung-Deep-Links von ChatGPT zum vorausgefüllten Want-to-Read-Eintrag.
- Offline nutzbare App-Oberfläche nach erstmaligem Laden.

## Einrichten (GitHub Pages)
1. Auf github.com ein neues öffentliches Repository anlegen, zum Beispiel `leseatelier`.
2. **Alle Dateien dieses Ordners** (nicht die ZIP selbst) in die oberste Ebene des Repositorys laden und committen.
3. Repository `Settings` → `Pages` → `Build and deployment` → `Deploy from a branch` wählen; Branch `main`, Ordner `/(root)` und speichern.
4. GitHub zeigt nach der Veröffentlichung deine HTTPS-Adresse an, z. B. `https://username.github.io/leseatelier/`.
5. Diese Adresse in Safari auf dem iPhone öffnen → Teilen → „Zum Home-Bildschirm" → „Als Web-App öffnen".
6. Im App-Bereich „Mehr" → „Chat-Vorlage kopieren" wählen und in deinen Literatur-Chat einfügen.

**Achtung:** Bei GitHub Pages liegen die App-Dateien öffentlich im Repository, nicht aber deine Bücher. **Buchdaten werden nur im Browser auf deinem Gerät gespeichert**, standardmäßig in IndexedDB mit Fallback auf lokalen Browser-Speicher. Die App sendet keine Sammlung an GitHub. Buchdaten werden nur für die ISBN-Suche zu Open Library angefragt (ISBN) bzw. durch explizites Kopieren an ChatGPT übermittelt.

## Verwendung ohne Installation
Die `index.html` kann auch lokal zusammen mit `app.js` und `styles.css` geöffnet werden; Kamerafunktionen, Zwischenspeicherung und manche Dateifunktionen können ohne HTTPS eingeschränkt sein. Mit GitHub Pages funktioniert die Installation als PWA.

## ChatGPT-Links
Die App versteht folgende URL-Parameter (alle Werte URL-kodieren):
```
https://username.github.io/leseatelier/?title=Das%20Buch&author=Vorname%20Nachname&want=1
```
Optional: `&isbn=978...`. Beim Öffnen erscheint ein vorausgefüllter Bearbeitungsdialog. Gespeichert wird erst nach Bestätigung.

## Grenzen dieser ersten Version
- Keine direkte Schreib- oder Leseberechtigung für ChatGPT; vorerst Empfehlung-Links und kopierbare Bestandsliste.
- Keine Cloud-/Geräte-Synchronisierung. Lokale Löschung von Safari-Website-Daten kann Einträge entfernen. Regelmäßig JSON-Backups machen!
- Coverfoto hochladen ist möglich, **automatische Identifikation allein aus dem Coverfoto noch nicht**.
- Barcode-Erkennung ist browserabhängig; iOS-Safari kann `BarcodeDetector` möglicherweise nicht anbieten. In diesem Fall ISBN manuell erfassen oder später eine zusätzliche Scan-Bibliothek integrieren.
- Keine automatische Übernahme von BookBeat/Audible/Apple Books.
- Noch keine Nutzerkonten, Push-Erinnerungen oder Ausleihbenachrichtigungen.

## Datenschutz
Die Datenbank bleibt lokal. Für einen späteren Cloud-Sync oder eine direkte ChatGPT-Anbindung ist ein separates, authentifiziertes Backend nötig. Veröffentliche **niemals** API-Schlüssel, Tokens, Datenbankzugänge oder deine persönliche exportierte JSON-Datei in einem öffentlichen GitHub-Repository.
