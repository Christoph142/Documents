// ==UserScript==
// @include http://*
// @include https://*
// @exclude https://docs.google.com/viewer?*
// @exclude http://www.megalab.it/*
// ==/UserScript==

//////////////////////////////////// Documents by Christoph142 ////////////////////////////////////
//                                                                                               //
// You're welcome to use or modify this code (or parts of it) for your personal use as a userjs  //
//              but please refrain from copying its functionality to other extensions            //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////

var wanted_docs = new RegExp("\\.("+widget.preferences.wanted_docs+")$","gim");//$ = end of string
window.addEventListener('DOMContentLoaded', function(){
	
	var all_links = document.getElementsByTagName("a");
	for(i=0;i<all_links.length;i++){
		
		if(all_links[i].href.match(wanted_docs)&&all_links[i].href.match(/\?/)==null)
			document.getElementsByTagName("a")[i].href = "https://docs.google.com/viewer?docex=1&url="+document.getElementsByTagName("a")[i].href;
	}
	
}, false);

window.addEventListener('DOMNodeInserted', function(){
	
	try{
		if(window.event.target.getElementsByTagName("a")[0].href.match(wanted_docs)&&window.event.target.getElementsByTagName("a")[0].href.match(/\?/)==null)
			window.event.target.getElementsByTagName("a")[0].href = "https://docs.google.com/viewer?docex=1&url="+window.event.target.getElementsByTagName("a")[0].href;
	}catch(e){}
	
}, false);