(function()
{
	if(document.URL.indexOf("docs.google.com/viewer?docex=1") !== -1) return;
	
	chrome.extension.sendMessage({data:"settings"}, function(response){ // get settings (filled with default values) from background.js
		if(response !== "") init_documents(response);
	});
	
	function init_documents(docs)
	{
		var wanted_docs = new RegExp("^(?:[^\?]+\\.[^\?]+\\/[^\?]+\\.(?:"+docs+")((?:\\?|\\#).*)*)$","i"); // (no"?").(no"?")/(no"?").ENDING(optionally ?/#JUNK)*

		window.addEventListener("animationEnd", changeLinks, false);
		window.addEventListener("webkitAnimationEnd", changeLinks, false);

		// DOMNodeInserted-hack by Daniel Buchner (http://www.backalleycoder.com/2012/04/25/i-want-a-damnodeinserted):
		if(document.readyState === "complete" || document.readyState === "interactive") detectLinksInserted();
		else window.addEventListener("DOMContentLoaded", detectLinksInserted, false);
		
		function detectLinksInserted(){
			var style = document.createElement("style");
			style.setAttribute("type","text/css");
			style.id = "Documents_extension_style";
			style.innerHTML = "@keyframes documents_linkInserted { from{ clip:rect(1px, auto, auto, auto); }to{ clip:rect(0px, auto, auto, auto); } }"+
			"@-webkit-keyframes documents_linkInserted { from{ clip:rect(1px, auto, auto, auto); }to{ clip:rect(0px, auto, auto, auto); } }"+
			"a { animation: documents_linkInserted 1ms; -webkit-animation: documents_linkInserted 1ms; }";
			document.getElementsByTagName("head")[0].appendChild(style);
		}

		function changeLinks()
		{
			if(window.event.animationName !== "documents_linkInserted") return;
			
			var l = window.event.target.href;
			if(l.match(wanted_docs)) {
				window.event.target.href="https://docs.google.com/viewer?docex=1&url="+l;
				console.log("Documents extension: handling "+l);
			}
		}
	}
})();