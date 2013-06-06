// ==UserScript==
// @exclude http://acid3.acidtests.org*
// ==/UserScript==

(function()
{	
	var extended_docs = new RegExp("^(?:[^\?]+\\.[^\?]+\\/[^\?]+\\.(?:"+widget.preferences.extended_docs+")((?:\\?|\\#).*)*)$","i");
	
	if(widget.preferences.extended_docs === "" || !document.URL.match(extended_docs)) return;
	
	window.stop();
	window.location.replace("https://docs.google.com/viewer?docex=1"+(widget.preferences.lang!="auto"?"&hl="+widget.preferences.lang:"")+"&url="+document.URL);
})();