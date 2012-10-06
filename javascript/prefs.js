function lang_menu(element){
	if(element.className=='done'){
		element.className='choose';
		window.addEventListener("keydown", close_lang_menu, false);
		window.addEventListener("click", close_lang_menu, false);
	}
	else element.className='done';
}
function close_lang_menu(){
	if(window.event.keyCode==27 || window.event.type=="click"){
		document.getElementById("lang").className='done';
		window.removeEventListener("keydown", close_lang_menu, false);
		window.removeEventListener("click", close_lang_menu, false);
	}	
}

function getprefs(){
	if(widget.preferences.lang!="auto")	document.getElementById('current_lang').src = "images/"+widget.preferences.lang+".jpg";
		
	if(widget.preferences.pdf=="0")			document.getElementById('pdf0').checked = true;
	else if(widget.preferences.pdf=="2")	document.getElementById('pdf2').checked = true;
	else									document.getElementById('pdf1').checked = true;
	if(widget.preferences.doc=="0")			document.getElementById('doc0').checked = true;
	else if(widget.preferences.doc=="2")	document.getElementById('doc2').checked = true;
	else									document.getElementById('doc1').checked = true;
	if(widget.preferences.xls=="0")			document.getElementById('xls0').checked = true;
	else if(widget.preferences.xls=="2")	document.getElementById('xls2').checked = true;
	else									document.getElementById('xls1').checked = true;
	if(widget.preferences.ppt=="0")			document.getElementById('ppt0').checked = true;
	else if(widget.preferences.ppt=="2")	document.getElementById('ppt2').checked = true;
	else									document.getElementById('ppt1').checked = true;
	if(widget.preferences.odt=="0")			document.getElementById('odt0').checked = true;
	else if(widget.preferences.odt=="2")	document.getElementById('odt2').checked = true;
	else									document.getElementById('odt1').checked = true;
	if(widget.preferences.pages=="0")		document.getElementById('pages0').checked = true;
	else if(widget.preferences.pages=="2")	document.getElementById('pages2').checked = true;
	else									document.getElementById('pages1').checked = true;
	if(widget.preferences.ai=="0")			document.getElementById('ai0').checked = true;
	else if(widget.preferences.ai=="2")		document.getElementById('ai2').checked = true;
	else									document.getElementById('ai1').checked = true;
	
	if(widget.preferences.psd=="0")			document.getElementById('psd0').checked = true;
	else if(widget.preferences.psd=="2")	document.getElementById('psd2').checked = true;
	else									document.getElementById('psd1').checked = true;
	if(widget.preferences.tiff=="0")		document.getElementById('tiff0').checked = true;
	else if(widget.preferences.tiff=="2")	document.getElementById('tiff2').checked = true;
	else									document.getElementById('tiff1').checked = true;
	if(widget.preferences.dxf=="0")			document.getElementById('dxf0').checked = true;
	else if(widget.preferences.dxf=="2")	document.getElementById('dxf2').checked = true;
	else									document.getElementById('dxf1').checked = true;
	if(widget.preferences.svg=="0")			document.getElementById('svg0').checked = true;
	else if(widget.preferences.svg=="2")	document.getElementById('svg2').checked = true;
	else									document.getElementById('svg1').checked = true;
	if(widget.preferences.eps=="0")			document.getElementById('eps0').checked = true;
	else if(widget.preferences.eps=="2")	document.getElementById('eps2').checked = true;
	else									document.getElementById('eps1').checked = true;
	if(widget.preferences.ttf=="0")			document.getElementById('ttf0').checked = true;
	else if(widget.preferences.ttf=="2")	document.getElementById('ttf2').checked = true;
	else									document.getElementById('ttf1').checked = true;
	if(widget.preferences.xps=="0")			document.getElementById('xps0').checked = true;
	else if(widget.preferences.xps=="2")	document.getElementById('xps2').checked = true;
	else									document.getElementById('xps1').checked = true;
}
function set_wanted_docs(){
	var wanted_docs = "";
	var extended_docs = "";
	
	if(widget.preferences.pdf=="2") 		extended_docs = "pdf";
	else if(widget.preferences.pdf!="0") 	wanted_docs = "pdf";
	
	if(extended_docs.length>1&&widget.preferences.doc=="2") extended_docs += "|";
	if(wanted_docs.length>1&&widget.preferences.doc!="0"&&widget.preferences.doc!="2") wanted_docs += "|";
	if(widget.preferences.doc=="2") 		extended_docs += "doc[x]?"; // [x]? = 0 or 1 time x
	else if(widget.preferences.doc!="0") 	wanted_docs += "doc[x]?";
	
	if(extended_docs.length>1&&extended_docs[extended_docs.length-1]!="|"&&widget.preferences.xls=="2")
		extended_docs += "|";
	if(wanted_docs.length>1&&wanted_docs[wanted_docs.length-1]!="|"&&widget.preferences.xls!="0"&&widget.preferences.xls!="2") wanted_docs += "|";
	if(widget.preferences.xls=="2") 		extended_docs += "xls[x]?";
	else if(widget.preferences.xls!="0") 	wanted_docs += "xls[x]?";
	
	if(extended_docs.length>1&&extended_docs[extended_docs.length-1]!="|"&&widget.preferences.ppt=="2")
		extended_docs += "|";
	if(wanted_docs.length>1&&wanted_docs[wanted_docs.length-1]!="|"&&widget.preferences.ppt!="0"&&widget.preferences.ppt!="2") wanted_docs += "|";
	if(widget.preferences.ppt=="2") 		extended_docs += "ppt[x]?";
	else if(widget.preferences.ppt!="0") 	wanted_docs += "ppt[x]?";
	
	if(extended_docs.length>1&&extended_docs[extended_docs.length-1]!="|"&&widget.preferences.odt=="2")
		extended_docs += "|";
	if(wanted_docs.length>1&&wanted_docs[wanted_docs.length-1]!="|"&&widget.preferences.odt!="0"&&widget.preferences.odt!="2") wanted_docs += "|";
	if(widget.preferences.odt=="2") 		extended_docs += "od(t|s)";
	else if(widget.preferences.odt!="0") 	wanted_docs += "od(t|s)";
	
	if(extended_docs.length>1&&extended_docs[extended_docs.length-1]!="|"&&widget.preferences.pages=="2")
		extended_docs += "|";
	if(wanted_docs.length>1&&wanted_docs[wanted_docs.length-1]!="|"&&widget.preferences.pages!="0"&&widget.preferences.pages!="2") wanted_docs += "|";
	if(widget.preferences.pages=="2") 		extended_docs += "pages";
	else if(widget.preferences.pages!="0") 	wanted_docs += "pages";
	
	if(extended_docs.length>1&&extended_docs[extended_docs.length-1]!="|"&&widget.preferences.ai=="2")
		extended_docs += "|";
	if(wanted_docs.length>1&&wanted_docs[wanted_docs.length-1]!="|"&&widget.preferences.ai!="0"&&widget.preferences.ai!="2") wanted_docs += "|";
	if(widget.preferences.ai=="2") 		extended_docs += "ai";
	else if(widget.preferences.ai!="0") 	wanted_docs += "ai";
	
	if(extended_docs.length>1&&extended_docs[extended_docs.length-1]!="|"&&widget.preferences.psd=="2")
		extended_docs += "|";
	if(wanted_docs.length>1&&wanted_docs[wanted_docs.length-1]!="|"&&widget.preferences.psd!="0"&&widget.preferences.psd!="2") wanted_docs += "|";
	if(widget.preferences.psd=="2") 		extended_docs += "psd";
	else if(widget.preferences.psd!="0") 	wanted_docs += "psd";
	
	if(extended_docs.length>1&&extended_docs[extended_docs.length-1]!="|"&&widget.preferences.tiff=="2")
		extended_docs += "|";
	if(wanted_docs.length>1&&wanted_docs[wanted_docs.length-1]!="|"&&widget.preferences.tiff!="0"&&widget.preferences.tiff!="2") wanted_docs += "|";
	if(widget.preferences.tiff=="2") 		extended_docs += "tiff";
	else if(widget.preferences.tiff!="0") 	wanted_docs += "tiff";
	
	if(extended_docs.length>1&&extended_docs[extended_docs.length-1]!="|"&&widget.preferences.dxf=="2")
		extended_docs += "|";
	if(wanted_docs.length>1&&wanted_docs[wanted_docs.length-1]!="|"&&widget.preferences.dxf!="0"&&widget.preferences.dxf!="2") wanted_docs += "|";
	if(widget.preferences.dxf=="2") 		extended_docs += "dxf";
	else if(widget.preferences.dxf!="0") 	wanted_docs += "dxf";
	
	if(extended_docs.length>1&&extended_docs[extended_docs.length-1]!="|"&&widget.preferences.svg=="2")
		extended_docs += "|";
	if(wanted_docs.length>1&&wanted_docs[wanted_docs.length-1]!="|"&&widget.preferences.svg!="0"&&widget.preferences.svg!="2") wanted_docs += "|";
	if(widget.preferences.svg=="2") 		extended_docs += "svg";
	else if(widget.preferences.svg!="0") 	wanted_docs += "svg";
	
	if(extended_docs.length>1&&extended_docs[extended_docs.length-1]!="|"&&widget.preferences.eps=="2")
		extended_docs += "|";
	if(wanted_docs.length>1&&wanted_docs[wanted_docs.length-1]!="|"&&widget.preferences.eps!="0"&&widget.preferences.eps!="2") wanted_docs += "|";
	if(widget.preferences.eps=="2") 		extended_docs += "[e]?ps";
	else if(widget.preferences.eps!="0") 	wanted_docs += "[e]?ps";
	
	if(extended_docs.length>1&&extended_docs[extended_docs.length-1]!="|"&&widget.preferences.ttf=="2")
		extended_docs += "|";
	if(wanted_docs.length>1&&wanted_docs[wanted_docs.length-1]!="|"&&widget.preferences.ttf!="0"&&widget.preferences.ttf!="2") wanted_docs += "|";
	if(widget.preferences.ttf=="2") 		extended_docs += "(o|t)tf";
	else if(widget.preferences.ttf!="0") 	wanted_docs += "(o|t)tf";
	
	if(extended_docs.length>1&&extended_docs[extended_docs.length-1]!="|"&&widget.preferences.xps=="2")
		extended_docs += "|";
	if(wanted_docs.length>1&&wanted_docs[wanted_docs.length-1]!="|"&&widget.preferences.xps!="0"&&widget.preferences.xps!="2") wanted_docs += "|";
	if(widget.preferences.xps=="2") 		extended_docs += "xps";
	else if(widget.preferences.xps!="0") 	wanted_docs += "xps";
	
	widget.preferences.wanted_docs = wanted_docs;
	widget.preferences.extended_docs = extended_docs;
}