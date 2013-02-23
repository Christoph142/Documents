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

(function()
{
	if(window.opera.version() < 12) return;
	
	var w = widget.preferences;
	var wanted_docs = new RegExp("^(?:[^\?]+\\.[^\?]+\\/[^\?]+\\.(?:"+w.wanted_docs+")((?:\\?|\\#).*)*)$","i"); // (no"?").(no"?")/(no"?").ENDING(optionally ?/#JUNK)*
	
	if(w.wanted_docs !== "")
	{
		window.addEventListener("oAnimationEnd", change_links, false);	// Opera 12.0X
		window.addEventListener("animationEnd", change_links, false);	// Opera 12.10+
	}
	
	function change_links()
	{
		if(window.event.animationName !== "documents_linkInserted") return;
		
		var l = window.event.target.href;
		if(l.match(wanted_docs)) window.event.target.href="https://docs.google.com/viewer?docex=1"+(w.lang!=="auto"?"&hl="+w.lang:"")+"&url="+l;
	}
})();