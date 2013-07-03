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
	if		(request.data === "settings")						sendResponse(w);
	else if (request.data === "update_settings")				update_settings();
	else if	(request.data === "show_contextmenu")				show_contextmenu(request.string);
	else if	(request.data === "hide_contextmenu")				hide_contextmenu();
});

var contextmenu = false;
function show_contextmenu(s)
{
	if(!contextmenu)chrome.contextMenus.create({ "id":"ms_contextmenu",	"title" : chrome.i18n.getMessage("contextmenu_"+s), "onclick" : contextmenu_click});
	else			chrome.contextMenus.update("ms_contextmenu", {"title" : chrome.i18n.getMessage("contextmenu_"+s)});
	contextmenu = true;
}
function contextmenu_click(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {data:"ms_toggle_visibility"});
	});
}
function hide_contextmenu()
{
	if(!contextmenu) return;
	chrome.contextMenus.remove("ms_contextmenu"); contextmenu = false;
}