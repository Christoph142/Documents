// ==UserScript==
// @exclude https://docs.google.com/viewer?*
// @exclude http://acid3.acidtests.org*
// @exclude http://www.megalab.it/*
// @exclude http://www.17track.net/*
// @exclude http://shinydemos.com/*
// ==/UserScript==

(function()
{
	if(window.opera.version() >= 12) return;
	
	var wanted_docs = new RegExp("^(?:[^\?]+\\.[^\?]+\\/[^\?]+\\.(?:"+widget.preferences.wanted_docs+")((?:\\?|\\#).*)*)$","i"); // (no"?").(no"?")/(no"?").ENDING(optionally ?/#JUNK)*
	
	if(widget.preferences.wanted_docs != "")
	{
		window.addEventListener("DOMContentLoaded", function(){ change_links(document); }, false);
		window.addEventListener("DOMNodeInserted", function(){ change_links(window.event.target); }, false);
	}
	
	function change_links(param)
	{
		try{
		all_links = param.getElementsByTagName("a");
		for(var i=0; i < all_links.length; i++)
			if(all_links[i].href.match(wanted_docs)) all_links[i].href = "https://docs.google.com/viewer?docex=1"+(widget.preferences.lang!="auto"?"&hl="+widget.preferences.lang:"")+"&url="+param.getElementsByTagName("a")[i].href;
		}catch(e){}
	}
})();