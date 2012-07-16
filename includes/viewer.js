// ==UserScript==
// @include https://docs.google.com/viewer?docex=1&url=*
// ==/UserScript==

window.addEventListener('DOMContentLoaded', function(){
	
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
	
	// display document title on the right side of white docs-menubar:
	var titlediv = document.createElement("div");
	titlediv.setAttribute("style","float:right; height:22px; padding-top:5px; color:#666;");
	titlediv.innerHTML = document.getElementsByClassName("docs-title-inner")[0].innerHTML;
	document.getElementById("docs-menubar").appendChild(titlediv);
	
	// adjust menu:
	document.getElementById(":9").outerHTML = "";
	document.getElementById(":b").outerHTML = "";
	document.getElementById(":h").outerHTML = "";
	document.getElementById(":i").outerHTML = "";
	document.getElementById(":m").id = "bugreport";
	document.getElementById("bugreport").firstChild.innerHTML = "Report an issue";
	document.getElementById("bugreport").onclick = "javascript:window.open('https://addons.opera.com/extensions/details/documents/?reports#feedback-container');";
	document.getElementById("bugreport").onmouseover = "this.style.backgroundColor = '#eee';";
	document.getElementById("bugreport").onmouseout = "this.style.backgroundColor = '#fff';";
	document.getElementById(":n").id = "rate_extension";
	document.getElementById("rate_extension").firstChild.innerHTML = "Rate Documents";
	document.getElementById("rate_extension").onclick = "javascript:window.open('https://addons.opera.com/extensions/details/documents/#feedback-container');";
	document.getElementById("rate_extension").onmouseover = "this.style.backgroundColor = '#eee';";
	document.getElementById("rate_extension").onmouseout = "this.style.backgroundColor = '#fff';";
	
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
		savebutton.firstChild.firstChild.innerHTML = "<a href='"+document.URL.split("&url=")[1].split("&docid")[0]+"' style='cursor:default;' onclick='javascript:return false;'><img src='http://www.codog.de/Documents/save.png' alt='save' height='12' style='margin-top:5px;'></a>";
	}
	else{ //for basic mode:
		savebutton.dataset.tooltip = "Save file (Ctrl+S)";
		savebutton.setAttribute("aria-label", "Save file (Ctrl+S)");
		savebutton.firstChild.firstChild.innerHTML = "<a href='"+document.URL.split("&url=")[1].split("&docid")[0]+"' style='cursor:default;'><img src='http://www.codog.de/Documents/save.png' alt='save' height='12' style='margin-top:5px;'></a>";
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
	
}, false);

// show / hide controlbar:
var controlbar_is_visible = 0;
window.addEventListener("keydown", function(){ adjust_controlbar(); }, false);
window.addEventListener("mousemove", function(){ adjust_controlbar(); }, false);

function adjust_controlbar(){
	if(!controlbar_is_visible && (mouse_pos()<29 || document.activeElement.id=="searchBox")){
		document.getElementById("controlbar").style.display = "block";
		document.getElementById("controlbar").style.opacity = "1";
		controlbar_is_visible = 1;
	}
	else if(controlbar_is_visible && ((window.event.keyCode==27 && document.activeElement.id=="searchBox") || (document.activeElement.id!="searchBox" && mouse_pos()>100))){
		document.getElementById("controlbar").style.opacity = "0";
		window.setTimeout(function(){document.getElementById("controlbar").style.display = "none";}, 500);
		controlbar_is_visible = 0;
	}
}

function mouse_pos(){
	e = window.event;
	var body = (window.document.compatMode && window.document.compatMode == "CSS1Compat") ? 
	window.document.documentElement : window.document.body;
	return e.pageY ? e.pageY : e.clientY + body.scrollTop - body.clientTop;
}

function localize_it(savebutton){
	if(window.navigator.language=="de"){
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
	else if(window.navigator.language=="fr"){
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
}