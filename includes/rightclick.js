// ==UserScript==
// @exclude http://www.megalab.it/*
// @exclude https://docs.google.com/viewer?*
// @exclude http://acid3.acidtests.org*
// ==/UserScript==

//////////////////////////////////// Documents by Christoph142 ////////////////////////////////////
//                                                                                               //
// You're welcome to use or modify this code (or parts of it) for your personal use as a userjs  //
//              but please refrain from copying its functionality to other extensions            //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////

var rightclick_docs = new RegExp("\\.("+widget.preferences.rightclick_docs+")(\#page[0-9]+)*$","gim");//$ = end of string

window.addEventListener("DOMContentLoaded", function(){ adjust_rightclick(document); }, false);
window.addEventListener("DOMNodeInserted", function(){ adjust_rightclick(window.event.target); }, false);
//window.oncontextmenu = function(event){ alert(event.currentTarget); alert(event.target); alert(event.relatedTarget); };
function adjust_rightclick(param){
	try{
	all_links = param.getElementsByTagName("a");
	for(var i=0; i < all_links.length; i++){
		if(all_links[i].href.match(rightclick_docs) && (!all_links[i].href.match(/\?/) || all_links[i].href.match(/\?docex/))){
			all_links[i].onmousedown = function(event){
				if(event.which != 3) return; // only right-clicks
				opera.extension.postMessage("add");
			};
		}
		else{
			all_links[i].onmousedown = function(event){
				if(event.which != 3) return; // only right-clicks
				opera.extension.postMessage("remove");
			};
		}
	}
	}catch(e){}
}

if(window.opera.version()>=12.10) opera.contexts.menu.onclick = function(menuEvent){
	window.location.href = (!menuEvent.linkURL.match(/\?docex/)?"https://docs.google.com/viewer?docex=1"+(widget.preferences.lang!="auto"?"&hl="+widget.preferences.lang:"")+"&url=":"")+menuEvent.linkURL;
};