// ==UserScript==
// @exclude http://acid3.acidtests.org*
// ==/UserScript==

//////////////////////////////////// Documents by Christoph142 ////////////////////////////////////
//                                                                                               //
// You're welcome to use or modify this code (or parts of it) for your personal use as a userjs  //
//              but please refrain from copying its functionality to other extensions            //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////

var extended_docs = new RegExp("^(?:[^\?]+\\.[^\?]+\\/[^\?]+\\.(?:"+widget.preferences.extended_docs+")((?:\\?|\\#).*)*)$","i");

if(widget.preferences.extended_docs != ""){ window.opera.addEventListener("BeforeEvent", handle_pasted_urls, false); }
function handle_pasted_urls(){
	//alert(document.contentType);
	if(document.URL.match(extended_docs)){
		window.stop();
		window.location.replace("https://docs.google.com/viewer?docex=1"+(widget.preferences.lang!="auto"?"&hl="+widget.preferences.lang:"")+"&url="+document.URL);
	}
	window.opera.removeEventListener("BeforeEvent", handle_pasted_urls, false);
}