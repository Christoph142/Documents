// ==UserScript==
// @include https://docs.google.com/viewer?docex=1&*
// ==/UserScript==

window.opera.addEventListener("BeforeEvent", adjustCSS ,false);
function adjustCSS(){
	if(document.styleSheets){
		var last = document.styleSheets.length-1;
		var position_of_last_rule = document.styleSheets[document.styleSheets.length-1].cssRules.length;
		
		// set top to 28px to prevent the documents jumping around during page loading:
		document.styleSheets[last].insertRule("#content-pane, #thumb-pane{ top:28px !important; }", position_of_last_rule);
		document.styleSheets[last].insertRule("#controlbar{ position:fixed !important; top:28px !important; z-index:99 !important; display:none; transition:500ms; -o-transition:500ms; box-shadow:0 5px 10px -5px rgba(0,0,0,0.3); }", position_of_last_rule); // grey control bar
		document.styleSheets[last].insertRule("#docex_titlediv{ float:right; height:22px; padding-top:5px; color:#666; transition:0.5s; -o-transition:0.5s;", position_of_last_rule);
		document.styleSheets[last].insertRule("#menubar-shadow{ position:fixed; height:1px; width:100%; top:27px; left:0px; z-index:98; box-shadow:0 -2px 0 #FFF, 0 3px 5px rgba(0,0,0,0.45); border:none; border-bottom:1px solid #ccc; }", position_of_last_rule);
		document.styleSheets[last].insertRule("#bugreport:hover, #rate_extension:hover{ background:#eee; }", position_of_last_rule);
		
		window.opera.removeEventListener("BeforeEvent", adjustCSS ,false);
	}
}

window.opera.addEventListener("BeforeEvent.DOMContentLoaded", function()
{
	document.getElementById("content-pane").style.height = document.body.offsetHeight-28+"px";
	document.getElementById("thumb-pane").style.height = document.body.offsetHeight-28+"px";
	document.getElementById("thumb-pane-lower").style.height = document.body.offsetHeight-28+"px";
	
	// get rid of black google bar and big title of document:
	document.getElementById("docs-header").style.height = "0px";
	document.getElementById("docs-header").style.overflow = "hidden";
	
	// set height/offsetheight, because Google calculates top of document = docs-menubar + controlbar
	document.getElementById("docs-menubar").style.height = "0px";
	document.getElementById("docs-menubar").style.overflow = "visible";
	document.getElementById("controlbar").offsetHeight = "28";
	// add a fixed invisible div for the shadow of docs-menubar:
	var docs_menubar_shadow = document.createElement("div");
	docs_menubar_shadow.id = "menubar-shadow";
	document.body.appendChild(docs_menubar_shadow);
	
	// display document's file name or its title (if available) at the right side of white docs-menubar:
	var titlediv = document.createElement("div");
	titlediv.id = "docex_titlediv";
	titlediv.innerHTML = document.title;
	document.getElementById("docs-menubar").appendChild(titlediv);
	window.setTimeout(check_title,1000); window.setTimeout(check_title,3000);
	window.setTimeout(check_title,5000); window.setTimeout(check_title,10000);
	
	// adjust menu:
	document.getElementById(":9").outerHTML = "";
	document.getElementById(":b").outerHTML = "";
	document.getElementById(":h").outerHTML = "";
	document.getElementById(":i").outerHTML = "";
	document.getElementById(":m").id = "bugreport";
	document.getElementById("bugreport").firstChild.innerHTML = "Report an error";
	document.getElementById("bugreport").onclick = function(){
		window.open("https://addons.opera.com/extensions/details/documents/?reports#feedback-container"); };
	document.getElementById(":n").id = "rate_extension";
	document.getElementById("rate_extension").firstChild.innerHTML = "Rate Documents";
	document.getElementById("rate_extension").onclick = function(){
		window.open("https://addons.opera.com/extensions/details/documents/#feedback-container"); };
	
	// grey control bar: insert a button to save the documents:
	var printbutton = document.getElementById("printToolbarButton");
	var savebutton = printbutton.cloneNode(true);
	savebutton.id = "saveToolbarButton";
	if(document.URL.split("&docid")[0].match(extended_docs)){ // for extended functions selected:
		savebutton.dataset.tooltip = "Rightclick here and choose \"Save Linked Content as...\" to download this file";
		savebutton.setAttribute("aria-label", "Rightclick here and choose \"Save Linked Content as...\" to download this file");
		savebutton.firstChild.firstChild.innerHTML = "<a href='"+document.URL.split("&url=")[1].split("&docid")[0]+"' style='cursor:default;' onclick='javascript:return false;'><img src='"+savebutton_src+"' height='29' style='margin-top:-2px;'></a>";
	}
	else{ //for basic mode:
		savebutton.dataset.tooltip = "Save file (Ctrl+S)";
		savebutton.setAttribute("aria-label", "Save file (Ctrl+S)");
		savebutton.firstChild.firstChild.innerHTML = "<a href='"+document.URL.split("&url=")[1].split("&docid")[0]+"' style='cursor:default;'><img src='"+savebutton_src+"' height='29' style='margin-top:-2px;'></a>";
		savebutton.onmouseover = function(){ savebutton.getElementsByTagName("img")[0].src = savebutton_hover_src; };
		savebutton.onmouseout = function(){ savebutton.getElementsByTagName("img")[0].src = savebutton_src; };
	}
	// change language of inserted menu items and button if necessary:
	localize_it(savebutton);
	// and some space to keep the alignments:
	var spacer = document.createElement("div");
	spacer.className = "goog-inline-block separator";
	printbutton.parentNode.insertBefore(savebutton, printbutton);
	printbutton.parentNode.insertBefore(spacer, printbutton);
	// don't show print(PDF)-button if viewed file is a pdf or extended functions is active for PDFs:
	if(document.getElementsByClassName("docs-title-inner")[0].innerHTML.match(new RegExp("\.pdf","i")) || widget.preferences.pdf == "3"){
		document.getElementById("printToolbarButton").outerHTML = "";
		document.getElementById("separator2").outerHTML = "";
	}
	
	// correct the link for password protected files:
	try{ document.getElementById("password-div").firstChild.action =
			document.getElementById("password-div").firstChild.action.replace("docs.google.com/viewer?url=","docs.google.com/viewer?docex=1&url=");
	}catch(e){}
	
	// show / hide controlbar:
	window.addEventListener("keydown", function(){ adjust_controlbar(); }, false);
	window.addEventListener("mousemove", function(){ adjust_controlbar(); }, false);
	
	// if available go to page nr X in link:
	if(document.URL.match(/\#page([0-9]+)/)) window.setTimeout(function(){
		try{document.getElementById(":r.thumb."+(document.URL.match(/\#page([0-9]+)/)[1]-1)).lastChild.click();}catch(e){/* !page */}
	},1000);
}, false);

var controlbar_is_visible = 0; var controlbar_timeout;
function adjust_controlbar(){
	var e = window.event;
	var active = document.activeElement.id;
	if(!controlbar_is_visible && (e.pageY<29 || active=="searchBox")){
		window.clearTimeout(controlbar_timeout);
		document.getElementById("controlbar").style.display = "block";
		document.getElementById("controlbar").style.opacity = "1";
		document.getElementById("menubar-shadow").style.display = "none";
		controlbar_is_visible = 1;
	}
	else if(controlbar_is_visible && ((e.keyCode==27 && active=="searchBox") || (active!="searchBox" && e.pageY>100))){
		document.getElementById("controlbar").style.opacity = "0";
		controlbar_timeout = window.setTimeout(function(){document.getElementById("controlbar").style.display = null;}, 500);
		document.getElementById("menubar-shadow").style.display = null;
		controlbar_is_visible = 0;
	}
}

function localize_it(savebutton){
	var strings = {
		"### DEFAULT: English ###" : {
			"bugreport" : "Report an error",
			"rate_extension" : "Rate Documents",
			"Save file" : "Save file (Ctrl+S)",
			"Save file rightclick" : "Rightclick here and choose \"Save Linked Content as...\" to download this file"
		},
		"de" : {
			"bugreport" : "Melde einen Fehler",
			"rate_extension" : "Bewerte Documents",
			"Save file" : "Datei speichern (Ctrl+S)",
			"Save file rightclick" : "Klicke hier mit der rechten Maustaste und wähle \"Verlinkten Inhalt speichern als...\" um die Datei herunterzuladen"
		},
		"fr" : {
			"bugreport" : "Rapporte une erreur",
			"rate_extension" : "Evalue Documents",
			"Save file" : "Enregistre le fichier (Ctrl+S)",
			"Save file rightclick" : "Fais un clic droit ici et choisis \"Enregistrer le contenu lié sous ... \" pour télécharger ce fichier"
		},
		"tr" : {
			"bugreport" : "Hata bildir",
			"rate_extension" : "Documents'i oyla",
			"Save file" : "Dosyayı kaydet (Ctrl+S)",
			"Save file rightclick" : "Dosyayı kaydetmek için buraya sağ tıklayın ve \"Hedefi farklı kaydet...\" i seçin"
		}
	};
	var lang = widget.preferences.lang=="auto" ? window.navigator.language : widget.preferences.lang;
	
	if(strings[lang]){
		document.getElementById("bugreport").firstChild.innerHTML = strings[lang]["bugreport"];
		document.getElementById("rate_extension").firstChild.innerHTML = strings[lang]["rate_extension"];
		if(savebutton.dataset.tooltip == "Save file (Ctrl+S)"){
			savebutton.dataset.tooltip = strings[lang]["Save file"];
			savebutton.setAttribute("aria-label", strings[lang]["Save file"]);
		}
		else {
			savebutton.dataset.tooltip = strings[lang]["Save file rightclick"];
			savebutton.setAttribute("aria-label", strings[lang]["Save file rightclick"]);
		}
	}
}

function check_title(){
	if(document.getElementById("docex_titlediv").innerHTML != document.title){
		document.getElementById("docex_titlediv").style.opacity = "0";
		window.setTimeout(function(){
			document.getElementById("docex_titlediv").innerHTML = document.title;
			document.getElementById("docex_titlediv").style.opacity = "1";
		},500);
	}
}

var savebutton_src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAdCAYAAAAgqdWEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAHQSURBVFhHzZa9zcIwEIbtlAghEKxAS4dEzwLQIzEFDQMwAytQIGAAeiSaiIIGIVGwAP8V8OlOtj/HuQTHkMAjnRwb5/zyXi4Kv91uT6bBORdX6fJ8Bo5FPDH+BAExoNaMT0DlhTAJiJElglHGJ9DzyfC8cFH49XoNSYTNOubcBcoJc81KTFq8JWY8HrPlconXvV4Px1KphOPhcGC73Y4VCgXm+z6utVotlYsqiymG7CbYpIcNq9WKjUYjvAbBENPpVN1v5pTrOqQYk6ibXyEF2WIlJis83TZXB1wxz3V+ZjabDcZ6vcYol8us0+mw7XYrdgQxc1J5+eVysbZiMpmobrKlXq+zdrstZvE4iel2u2y/34vVMNVqFcfhcJhIjFOZ8vk8q1QqkZHL5TB0zJxU8PP5bO0MtCk4U6vV8L0SRbPZxHE+nytn4LBXOLV2sVhU/54KeAtDJMW5m5Ji5qTykmWiNgKz2QzL1O/3xUo8g8FAlenxeIjVf0JfB6fTyfqvg5jFYiFmdjQaDRRzv99xHvdFkEjMO0i348Rk9sxI4vKSznxaQBSmS06tnRakM9STnwahbjoejygGfsi6POZ5v1Um3ZlvlUeinMmqRNEw9gfQ8pSgoVZQeAAAAABJRU5ErkJggg==";

var savebutton_hover_src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAdCAYAAAAgqdWEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAIVSURBVFhHzZfLjgFBFIZPDxJxCyGxYCWxkPAEHsDKip0NKwvxAN7AG/AgljZiT4KwEIkIG4mIWwihRx1V0jHFVPWMnvmSP3XprvLrU1XdR9ntdir8E9DMarWC2WwGp9OJdhuHxWKBYDAILpcLlO12qw4GAwiFQmC32+ktxrHZbGA8HkMkEoEPVVXxifyFEYLT6cTfJz7QDIGUz/Qb8OZlYtc/sPYNj4P1SAQhM4x8Pg+BQAC1WCxQl8sFtVwuod1uw2g0gmQyiTqfz/frItzN8P4NkwidTgeKxSLWW60WKpFI3Mc/zqkVQypMspBdWiqVaOt7pML0bv6nGW0MH8VjOByi+v0+yuv1QrVaxQXMgzcvE0P3mkmlUiiySLXK5XL0DnnMtJSiXq/DdDqlra+Ew2Es4/E4lqLoCpPD4QCfz/dUNpsNpYU3LxND6MloBxCazSY0Gg3a+ko6naY1OXTtJrfbfT+JeSKfA0Sy6N5NsvDmZWIo6/Va7fV6EIvFaNdzCoUC1Go1PFlFIN8omUwGyuXyy/dTt9uFaDQqZ6ZSqcBkMqEtMYihbDaLL02CoihYatFl5iewcLwyY9iaYbyaX+oE/olE0LW134VQmN4tBpoxm82w3++xw2iueRvmTgTlmreo5Pt1Pp/D8XjETiMhRvx+P3g8nlsSdzgc0CE7C4zEZDJhzma1Wm/pLS9+RkHOnZsU+AQ8X63UgZIW7wAAAABJRU5ErkJggg==";