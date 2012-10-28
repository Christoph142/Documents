// ==UserScript==
// @include http://*
// @include https://*
// @exclude http://www.megalab.it/*
// ==/UserScript==

//////////////////////////////////// Documents by Christoph142 ////////////////////////////////////
//                                                                                               //
// You're welcome to use or modify this code (or parts of it) for your personal use as a userjs  //
//              but please refrain from copying its functionality to other extensions            //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////

var wanted_docs = new RegExp("\\.("+widget.preferences.wanted_docs+")$","gim");//$ = end of string

window.addEventListener("DOMContentLoaded", function(){
	if(opera.contexts.menu) opera.contexts.menu.onclick = function(menuEvent){
		if(menuEvent.linkURL.match(wanted_docs)&&!menuEvent.linkURL.match(/\?/)) alert("");
	};
}, false);