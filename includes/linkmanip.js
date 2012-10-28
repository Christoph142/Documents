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

window.addEventListener("DOMContentLoaded", function(){ change_links(document); }, false);
window.addEventListener("DOMNodeInserted", function(){ change_links(window.event.target); }, false);

function change_links(param){
	try{
	all_links = param.getElementsByTagName("a");
	for(i=0; i < all_links.length; i++){
		if(all_links[i].href.match(wanted_docs)&&all_links[i].href.match(/\?/)==null){
			if(widget.preferences.lang!="auto")
				param.getElementsByTagName("a")[i].href = "https://docs.google.com/viewer?docex=1&hl="+widget.preferences.lang+"&url="+param.getElementsByTagName("a")[i].href;
			else
				param.getElementsByTagName("a")[i].href = "https://docs.google.com/viewer?docex=1&url="+param.getElementsByTagName("a")[i].href;
		}
	}
	}catch(e){}
}