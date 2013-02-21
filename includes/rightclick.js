// ==UserScript==
// @exclude https://docs.google.com/viewer?*
// @exclude http://acid3.acidtests.org*
// @exclude http://www.17track.net/*
// ==/UserScript==

//////////////////////////////////// Documents by Christoph142 ////////////////////////////////////
//                                                                                               //
// You're welcome to use or modify this code (or parts of it) for your personal use as a userjs  //
//              but please refrain from copying its functionality to other extensions            //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////

var rightclick_docs = new RegExp("^(?:[^\?]+\\.[^\?]+\\/[^\?]+\\.(?:"+widget.preferences.rightclick_docs+")((?:\\?|\\#).*)*)$","i");

window.addEventListener("animationend", adjust_rightclick, false);
//window.oncontextmenu = function(event){ alert(event.currentTarget); alert(event.target); alert(event.relatedTarget); };

function adjust_rightclick()
{
	if(window.event.animationName !== "documents_linkInserted") return;
	var l = window.event.target;
	
	if((l.href.match(rightclick_docs) && !l.href.match(/\?/)) || l.href.match(/\?docex/))
		l.addEventListener("mousedown", function(event){
			if(event.which !== 3) return; // only right-clicks
			opera.extension.postMessage("add");
		}, false);
	else
		l.addEventListener("mousedown", function(event){
			if(event.which !== 3) return; // only right-clicks
			opera.extension.postMessage("remove");
		}, false);
}

if(window.opera.version()>=12.10) opera.contexts.menu.onclick = function(menuEvent){
	window.location.href = (!menuEvent.linkURL.match(/\?docex/)?"https://docs.google.com/viewer?docex=1"+(widget.preferences.lang!="auto"?"&hl="+widget.preferences.lang:"")+"&url=":"")+menuEvent.linkURL;
};