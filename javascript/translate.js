function change_lang(new_lang){
	widget.preferences.lang = new_lang;
	document.getElementById("current_lang").src = "images/"+new_lang+".jpg";
	window.setTimeout(function(){ location.reload(); }, 300);
}

function _(to_translate){
	if(!widget.preferences.lang || widget.preferences.lang == "auto") document.write( lang[autolang][to_translate] );
	else document.write( lang[widget.preferences.lang][to_translate] );
}

var lang = {
	"ar" : {
		"by" : "by",
		"Options" : "خيارات",
		"choosedocs" : "Which kinds of documents do you want to associate with this extension?",
		"0" : "not handled by Documents",
		"1" : "basic function (links are opened with Documents; standard)",
		"2" : "extended function (basic + extended functions; choose if you did the additional setup (see below))",
		"manual_setup_instruction" : "To make links, which you dragged or pasted into the address bar or selected in your browsing history work, do the following:<br>1. go to Settings -> Preferences (Ctrl+F12) -> Advanced -> Downloads<br>2. uncheck 'hide file types opened with Opera'<br>3. now choose any supported extension in the list (e.g. pdf) and click edit<br>4. select 'Open with Opera' and click OK<br><br>Repeat steps 3 and 4 for every supported file type you want the two aforementioned features to work. Then press OK to close Settings. Now choose the third option (extended function) for all concerned file types in Documents settings dialog and you're all set :)",
		"footer" : "للرد على الأستفسارات و المساعدة لا تتردد في الأتصال الي<br>Thanks to <a href='http://my.opera.com/mha2999' target='_blank' style='background-color:transparent;'>Muneer Hassan Abdulla</a> for translating!"
	},
	"de" : {
		"by" : "von",
		"Options" : "Optionen",
		"choosedocs" : "Welche Dokumente sollen mit dieser Erweiterung geöffnet werden?",
		"0" : "nicht mit Documents öffnen",
		"1" : "Basis-Funktion (Links werden mit Documents geöffnet; Standard)",
		"2" : "Erweitert (Basis- & erweiterte Funktionen; auswählen, wenn das zusätzliche Setup (siehe unten) konfiguriert wurde)",
		"manual_setup_instruction" : "Damit in die Adress-Leiste eingefügte oder gezogene Links und Dateien, die über die History aufgerufen werden unterstützt werden musst du folgendes tun:<br>1. rufe Einstellungen -> Einstellungen... (Strg+F12) -> Erweitert -> Downloads auf<br>2. deaktiviere 'In Opera zu öffnende Dateitypen ausblenden'<br>3. wähle ein beliebiges unterstütztes Format (z.B. pdf) und klicke auf 'Bearbeiten...'<br>4. wähle 'Mit Opera öffnen' und klicke 'OK'<br><br>Wiederhole Schritte 3 und 4 für jeden unterstützten Datei-Typ für den die beiden oben genannten Features funktionieren sollen. Bestätige am Ende mit 'OK' um die Einstellungen zu schließen. Jetzt wähle in den Einstellungen von Documents die 3. Option (Erweitert) für die ausgewählten Dateitypen und es kann losgehn :)",
		"footer" : "Für Feedback, Fragen und Wünsche könnt ihr mich gerne auch direkt kontaktieren"
	},
	"en" : {
		"by" : "by",
		"Options" : "Options",
		"choosedocs" : "Which kinds of documents do you want to associate with this extension?",
		"0" : "not handled by Documents",
		"1" : "basic function (links are opened with Documents; standard)",
		"2" : "extended function (basic + extended functions; choose if you did the additional setup (see below))",
		"manual_setup_instruction" : "To make links, which you dragged or pasted into the address bar or selected in your browsing history work, do the following:<br>1. go to Settings -> Preferences (Ctrl+F12) -> Advanced -> Downloads<br>2. uncheck 'hide file types opened with Opera'<br>3. now choose any supported extension in the list (e.g. pdf) and click edit<br>4. select 'Open with Opera' and click OK<br><br>Repeat steps 3 and 4 for every supported file type you want the two aforementioned features to work. Then press OK to close Settings. Now choose the third option (extended function) for all concerned file types in Documents settings dialog and you're all set :)",
		"footer" : "For Feedback and help don't hesitate to contact me"
	},
	"fr" : {
		"by" : "de",
		"Options" : "Options",
		"choosedocs" : "Quels types de documents voulez-vous obtenir ouvert par cette extension?",
		"0" : "not handled by Documents",
		"1" : "basic function (links are opened with Documents; standard)",
		"2" : "extended function (basic + extended functions; choose if you did the additional setup (see below))",
		"manual_setup_instruction" : "To make links, which you dragged or pasted into the address bar or selected in your browsing history work, do the following:<br>1. go to Settings -> Preferences (Ctrl+F12) -> Advanced -> Downloads<br>2. uncheck 'hide file types opened with Opera'<br>3. now choose any supported extension in the list (e.g. pdf) and click edit<br>4. select 'Open with Opera' and click OK<br><br>Repeat steps 3 and 4 for every supported file type you want the two aforementioned features to work. Then press OK to close Settings. Now choose the third option (extended function) for all concerned file types in Documents settings dialog and you're all set :)",
		"footer" : "Pour rétroaction et de l'aide, n'hésite pas à me contacter"
	},
	"nb" : {
		"by" : "by",
		"Options" : "Valg",
		"choosedocs" : "Hvilke dokumenttyper ønsker du å åpne med denne utvidelsen?",
		"0" : "ikke håndtert av Dokumenter",
		"1" : "standard funksjonalitet (lenker er åpnet med Dokumenter; forhåndsvalgt)",
		"2" : "utvidet funksjonalitet (standard og utvidede funksjoner; velg dette om du har gjort andre valg (se under))",
		"manual_setup_instruction" : "Gjør følgende for å få lenker—som du har dratt og limt inn i adressefeltet eller valgt i historievisning—til å fungere:<br>1. Instillinger -> Valg (Ctrl+F12) -> Avansert -> Nedlastninger<br>2. avmerk 'skjul filtyper som åpnes med Opera'<br>3. velg en hvilkensomhelst støttet utvidelse fra listen (f.eks. pdf) og trykk Endre<br>4. velg 'Åpne med Opera' og klikk OK<br><br>Gjenta steg 3–4 for alle støttede filtyper. Trykk til slutt OK for å lukke Instillinger. Velg så utvidet funksjonalitet for de samme filtypene i valg for Dokumenter og du er ferdig :)",
	    "footer" : "For å gi tilbakemeldinger og be om hjelp, ikke nøl med å kontakte meg<br>takk til<a href='https://twitter.com/Aeyoun' target='_blank' style='background-color:transparent;'>Daniel</a>for oversettelsen!"
	},
	"pl" : {
		"by" : "by",
		"Options" : "Ustawienia",
		"choosedocs" : "Dokumentami w których formatach ma się zająć rozszerzenie?",
		"0" : "not handled by Documents",
		"1" : "basic function (links are opened with Documents; standard)",
		"2" : "extended function (basic + extended functions; choose if you did the additional setup (see below))",
		"manual_setup_instruction" : "Aby otwierać łącza upuszczone na lub wklejone w pasek adresu, albo wybrane z historii, wykonaj co następuje:<br>1. otwórz Ustawienia → Preferencje (Ctrl+F12) → Zaawansowane → Pobieranie<br>2. odznacz „Ukryj typy plików obsługiwane przez Operę”<br>3. wybierz któreś z rozszerzeń obsługiwanych przez rozszerzenie, np. pdf i kliknij „Edytuj…”<br>4. zaznacz „Otwórz w Operze” i zatwierdź<br><br>Kroki 3 i 4 powtórz dla każdego typu pliku, który ma być obsługiwany w wyżej wymienionych sytuacjach. Na koniec klikając OK zamknij okno preferencji. Now choose the third option (extended function) for all concerned file types in Documents settings dialog and you're all set :)",
		"footer" : "Nie wahaj się kontaktować ze mną, jeśli chcesz wyrazić swoją opinię lub pomóc<br>Dzięki <a href='http://my.opera.com/chocimir' target='_blank' style='background-color:transparent;'>Chocimier</a> za tłumaczenia!"
	},
	"ru" : {
		"by" : "by",
		"Options" : "Настройка",
		"choosedocs" : "Which kinds of documents do you want to associate with this extension?",
		"0" : "not handled by Documents",
		"1" : "basic function (links are opened with Documents; standard)",
		"2" : "extended function (basic + extended functions; choose if you did the additional setup (see below))",
		"manual_setup_instruction" : "To make links, which you dragged or pasted into the address bar or selected in your browsing history work, do the following:<br>1. go to Settings -> Preferences (Ctrl+F12) -> Advanced -> Downloads<br>2. uncheck 'hide file types opened with Opera'<br>3. now choose any supported extension in the list (e.g. pdf) and click edit<br>4. select 'Open with Opera' and click OK<br><br>Repeat steps 3 and 4 for every supported file type you want the two aforementioned features to work. Then press OK to close Settings. Now choose the third option (extended function) for all concerned file types in Documents settings dialog and you're all set :)",
		"footer" : "Для обратной связи и помощи не стесняйтесь связатся со мной"
	}
};