//retrieve and store settings (filled with default values) for all pages:
function update_settings(){ chrome.storage.sync.get( null, function(storage){
	w = {
	"pdf" :		(!storage["pdf"]	? "1" : storage["pdf"]),
	"doc" :		(!storage["doc"]	? "1" : storage["doc"]),
	"xls" :		(!storage["xls"]	? "1" : storage["xls"]),
	"ppt" :		(!storage["ppt"]	? "1" : storage["ppt"]),
	"odt" :		(!storage["odt"]	? "1" : storage["odt"]),
	"pages" :	(!storage["pages"]	? "1" : storage["pages"]),
	"ai" :		(!storage["ai"]		? "1" : storage["ai"]),
	"psd" :		(!storage["psd"]	? "1" : storage["psd"]),
	"tiff" :	(!storage["tiff"]	? "1" : storage["tiff"]),
	"dxf" :		(!storage["dxf"]	? "1" : storage["dxf"]),
	"svg" :		(!storage["svg"]	? "1" : storage["svg"]),
	"eps" :		(!storage["eps"]	? "1" : storage["eps"]),
	"ttf" :		(!storage["ttf"]	? "1" : storage["ttf"]),
	"xps" :		(!storage["xps"]	? "1" : storage["xps"]),
	
	"wanted_docs" : (!storage["wanted_docs"] ? "pdf|doc[x]?|xls[x]?|ppt[x]?|od(t|s)|pages|ai|psd|tiff|dxf|svg|[e]?ps|(o|t)tf|xps" : storage["wanted_docs"])
	};
}); }
update_settings();

chrome.extension.onMessage.addListener( function(request, sender, sendResponse){
	if(request.data === "settings") sendResponse( w.wanted_docs );
});