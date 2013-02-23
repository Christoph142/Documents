// DOMNodeInserted-hack by Daniel Buchner (http://www.backalleycoder.com/2012/04/25/i-want-a-damnodeinserted)
(function()
{
	if(window.opera.version() < 12) return;
	
	window.addEventListener("load", function()
	{	
		var style = document.createElement("style");
		style.setAttribute("type","text/css");
		style.id = "Documents extension";
		style.innerHTML = "@keyframes documents_linkInserted { from{ clip:rect(1px, auto, auto, auto); }to{ clip:rect(0px, auto, auto, auto); } }"+
		"@-o-keyframes documents_linkInserted { from{ clip:rect(1px, auto, auto, auto); }to{ clip:rect(0px, auto, auto, auto); } }"+
		"a { animation: documents_linkInserted 1ms; -o-animation: documents_linkInserted 1ms; }";
		document.getElementsByTagName("head")[0].appendChild(style);
	
	}, false);
})();