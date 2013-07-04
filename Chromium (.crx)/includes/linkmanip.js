(function()
{
	if(document.URL.indexOf("docs.google.com/viewer?docex=1") !== -1) return;
	
	chrome.extension.sendMessage({data:"settings"}, function(response){ // get settings (filled with default values) from background.js
		w = response;
		if(w.wanted_docs !== "") init_documents();
	});
	
	function init_documents()
	{
		var wanted_docs = new RegExp("^(?:[^\?]+\\.[^\?]+\\/[^\?]+\\.(?:"+w.wanted_docs+")((?:\\?|\\#).*)*)$","i"); // (no"?").(no"?")/(no"?").ENDING(optionally ?/#JUNK)*
		
		// DOMNodeInserted-hack by Daniel Buchner (http://www.backalleycoder.com/2012/04/25/i-want-a-damnodeinserted)
		window.addEventListener("DOMContentLoaded", function(){
			var style = document.createElement("style");
			style.setAttribute("type","text/css");
			style.id = "Documents_extension_style";
			style.innerHTML = "@keyframes documents_linkInserted { from{ clip:rect(1px, auto, auto, auto); }to{ clip:rect(0px, auto, auto, auto); } }"+
			"@-webkit-keyframes documents_linkInserted { from{ clip:rect(1px, auto, auto, auto); }to{ clip:rect(0px, auto, auto, auto); } }"+
			"a { animation: documents_linkInserted 1ms; -webkit-animation: documents_linkInserted 1ms; }";
			document.getElementsByTagName("head")[0].appendChild(style);
		}, false);

		window.addEventListener("animationEnd", change_links, false);
		window.addEventListener("webkitAnimationEnd", change_links, false);
		
		function change_links()
		{
			if(window.event.animationName !== "documents_linkInserted") return;
			
			var l = window.event.target.href;
			if(l.match(wanted_docs)) window.event.target.href="https://docs.google.com/viewer?docex=1&url="+l;
		}
	}
})();