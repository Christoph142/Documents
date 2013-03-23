function lang_menu(element){
	if(element.className !== "choose"){
		element.className = "choose";
		window.addEventListener("keydown", close_lang_menu, false);
		window.addEventListener("click", close_lang_menu, false);
	}
	else element.className = null;
}
function close_lang_menu(){
	if(window.event.keyCode === 27 || window.event.type === "click"){
		document.getElementById("lang").className = null;
		window.removeEventListener("keydown", close_lang_menu, false);
		window.removeEventListener("click", close_lang_menu, false);
	}	
}

window.addEventListener("load", getprefs, false);
function getprefs()
{
	if(widget.preferences.lang !== "auto") document.getElementById("current_lang").src = "images/"+widget.preferences.lang+".jpg";
	
	var doctypes = document.getElementsByTagName("input");
	for(var i = 0; i+3 < doctypes.length; i++){ // last 3 inputs are in explanation section
		if(widget.preferences[doctypes[i].name] === doctypes[i].value) doctypes[i].checked = true;
	}
}
function set_wanted_docs(){
	var possible_docs = {"pdf":"pdf","doc":"doc[x]?","xls":"xls[x]?","ppt":"ppt[x]?","odt":"od(t|s)","pages":"pages","ai":"ai","psd":"psd","tiff":"tiff","dxf":"dxf","svg":"svg","eps":"[e]?ps","ttf":"(o|t)tf","xps":"xps"};
	var wanted_docs = "";
	var extended_docs = "";
	
	for(doctype in possible_docs){
		insert_separator(doctype);
		if		(widget.preferences[doctype] === "2") extended_docs += possible_docs[doctype];
		else if	(widget.preferences[doctype] !== "0") wanted_docs 	+= possible_docs[doctype];
	}
	
	widget.preferences.wanted_docs = wanted_docs;
	widget.preferences.extended_docs = extended_docs;
	
	function insert_separator(next_filetype){
		if(extended_docs.length > 1 && extended_docs[extended_docs.length-1] !== "|" && widget.preferences[next_filetype] === "2")
			extended_docs += "|";
		if(wanted_docs.length > 1 && wanted_docs[wanted_docs.length-1] !== "|" && widget.preferences[next_filetype] !== "0" && widget.preferences[next_filetype] !== "2") wanted_docs += "|";
	}
}