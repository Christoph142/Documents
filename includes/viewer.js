// ==UserScript==
// @include https://docs.google.com/viewer?docex=1&*
// ==/UserScript==

window.opera.addEventListener("BeforeEvent.DOMContentLoaded", function(){
	
	// set top to 28px to prevent the documents jumping around during page loading:
	document.getElementById("content-pane").style.top = "28px";
	document.getElementById("thumb-pane").style.top = "28px";
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
	docs_menubar_shadow.style = "position:fixed; height:1px; width:100%; top:27px; left:0px; z-index:98; box-shadow:0 -2px 2px rgba(255,255,255,0.9),0 3px 5px rgba(0,0,0,0.45); border:none; border-bottom:1px solid #ccc;";
	document.body.appendChild(docs_menubar_shadow);
	
	// display document's file name or its title (if available) at the right side of white docs-menubar:
	var titlediv = document.createElement("div");
	titlediv.id = "docex_titlediv";
	titlediv.setAttribute("style","float:right; height:22px; padding-top:5px; color:#666; transition:0.5s; oTransition:0.5s;");
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
	document.getElementById("bugreport").firstChild.innerHTML = "Report an issue";
	document.getElementById("bugreport").onclick = function(){
		window.open("https://addons.opera.com/extensions/details/documents/?reports#feedback-container"); };
	document.getElementById("bugreport").onmouseover = function(){ this.style.backgroundColor = "#eee"; };
	document.getElementById("bugreport").onmouseout = function(){ this.style.backgroundColor = "#fff"; };
	document.getElementById(":n").id = "rate_extension";
	document.getElementById("rate_extension").firstChild.innerHTML = "Rate Documents";
	document.getElementById("rate_extension").onclick = function(){
		window.open("https://addons.opera.com/extensions/details/documents/#feedback-container"); };
	document.getElementById("rate_extension").onmouseover = function(){ this.style.backgroundColor = "#eee"; };
	document.getElementById("rate_extension").onmouseout = function(){ this.style.backgroundColor = "#fff"; };
	
	// grey control bar:
	document.getElementById("controlbar").style.position = "fixed"; 
	document.getElementById("controlbar").style.top = "28px";
	document.getElementById("controlbar").style.zIndex = "99";
	document.getElementById("controlbar").style.display = "none";
	document.getElementById("controlbar").style.transitionDuration = "500ms";
	document.getElementById("controlbar").style.OTransitionDuration = "500ms";
	document.getElementById("controlbar").style.boxShadow = "0 5px 5px rgba(0,0,0,0.2)";
	// insert a button to save the documents:
	var printbutton = document.getElementById("printToolbarButton");
	var savebutton = printbutton.cloneNode(true);
	savebutton.id = "saveToolbarButton";
	if(document.URL.split("&docid")[0].match(extended_docs)){ // for extended functions selected:
		savebutton.dataset.tooltip = "rightclick here and choose \"Save Linked Content as...\" to download this file";
		savebutton.setAttribute("aria-label", "rightclick here and choose \"Save Linked Content as...\" to download this file");
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
	if(document.getElementsByClassName("docs-title-inner")[0].innerHTML.match(new RegExp("(pdf)$","gi")) || widget.preferences.pdf == "2"){
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
	if(document.URL.match(/\#page([0-9]+)$/)) window.setTimeout(function(){
		try{document.getElementById(":r.thumb."+(document.URL.match(/\#page([0-9]+)$/)[1]-1)).lastChild.click();}catch(e){/* !page */}
	},1000);
}, false);

var controlbar_is_visible = 0;
function adjust_controlbar(){
	var e = window.event;
	var active = document.activeElement.id;
	if(!controlbar_is_visible && (e.pageY<29 || active=="searchBox")){
		document.getElementById("controlbar").style.display = "block";
		document.getElementById("controlbar").style.opacity = "1";
		controlbar_is_visible = 1;
	}
	else if(controlbar_is_visible && ((e.keyCode==27 && active=="searchBox") || (active!="searchBox" && e.pageY>100))){
		document.getElementById("controlbar").style.opacity = "0";
		window.setTimeout(function(){document.getElementById("controlbar").style.display = "none";}, 500);
		controlbar_is_visible = 0;
	}
}

function localize_it(savebutton){
	if(widget.preferences.lang == "de" || (widget.preferences.lang=="auto" && window.navigator.language=="de")){
		document.getElementById("bugreport").firstChild.innerHTML = "Melde einen Fehler";
		document.getElementById("rate_extension").firstChild.innerHTML = "Bewerte Documents";
		if(savebutton.dataset.tooltip == "Save file (Ctrl+S)"){
			savebutton.dataset.tooltip = "Datei speichern (Ctrl+S)";
			savebutton.setAttribute("aria-label", "Datei speichern (Ctrl+S)");
		}
		else {
			savebutton.dataset.tooltip = "klicke hier mit der rechten Maustaste und wähle \"Verlinkten Inhalt speichern als...\" um die Datei zu speichern";
			savebutton.setAttribute("aria-label", "klicke hier mit der rechten Maustaste und wähle \"Verlinkten Inhalt speichern als...\" um die Datei zu speichern");
		}
	}
	else if(widget.preferences.lang == "fr" || (widget.preferences.lang=="auto" && window.navigator.language=="fr")){
		document.getElementById("bugreport").firstChild.innerHTML = "Rapporte une erreur";
		document.getElementById("rate_extension").firstChild.innerHTML = "Evalue Documents";
		if(savebutton.dataset.tooltip == "Save file (Ctrl+S)"){
			savebutton.dataset.tooltip = "Enregistre le fichier (Ctrl+S)";
			savebutton.setAttribute("aria-label", "Enregistre le fichier (Ctrl+S)");
		}
		else {
			savebutton.dataset.tooltip = "fais un clic droit ici et choisis \"Enregistrer le contenu lié sous ... \" pour télécharger ce fichier";
			savebutton.setAttribute("aria-label", "fais un clic droit ici et choisis \"Enregistrer le contenu lié sous ... \" pour télécharger ce fichier");
		}
	}
	else if(widget.preferences.lang == "tr" || (widget.preferences.lang=="auto" && window.navigator.language=="tr")){
		document.getElementById("bugreport").firstChild.innerHTML = "Report an issue";
		document.getElementById("rate_extension").firstChild.innerHTML = "Rate Documents";
		if(savebutton.dataset.tooltip == "Save file (Ctrl+S)"){
			savebutton.dataset.tooltip = "Save file (Ctrl+S)";
			savebutton.setAttribute("aria-label", "Save file (Ctrl+S)");
		}
		else {
			savebutton.dataset.tooltip = "rightclick here and choose \"Save Linked Content as...\" to download this file";
			savebutton.setAttribute("aria-label", "rightclick here and choose \"Save Linked Content as...\" to download this file");
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