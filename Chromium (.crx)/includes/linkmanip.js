(function()
{
	chrome.extension.sendMessage({data:"settings"}, function(response){ // get settings (filled with default values) from background.js
		w = response;
		window.addEventListener("DOMContentLoaded", change_links, false);
	});
	
	function change_links()
	{
		var wanted_docs = new RegExp("^(?:[^\?]+\\.[^\?]+\\/[^\?]+\\.(?:"+w.wanted_docs+")((?:\\?|\\#).*)*)$","i"); // (no"?").(no"?")/(no"?").ENDING(optionally ?/#JUNK)*
	
		if(w.wanted_docs !== "")
		{
			var links = document.getElementsByTagName("a");
			for(var i = 0; i < links.length; i++)
			{
				if(links[i].href.match(wanted_docs))
				{
					var l = links[i].href;
					links[i].href = "https://docs.google.com/viewer?docex=1&url="+l;
				}
			}
			
			var DOM_observer = new WebKitMutationObserver(change_links);
			DOM_observer.observe(document.body, { childList:true, subtree:true });
		}
		
		function change_links()
		{
			return;
			
			var l = window.event.target.href;
			if(l.match(wanted_docs)) window.event.target.href="https://docs.google.com/viewer?docex=1&url="+l;
		}	
	}
})();