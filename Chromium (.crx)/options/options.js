window.addEventListener("load", init, false);
w = chrome.extension.getBackgroundPage().w;

function init()
{
	localize();
	init_inputs();
}

function localize()
{
	if(chrome.i18n.getMessage("lang") === "ar" || chrome.i18n.getMessage("lang") === "ur_PK") document.body.dir = "rtl";
	
	var strings = document.getElementsByClassName("i18n");
	for(var i = 0; i < strings.length; i++) strings[i].innerHTML += chrome.i18n.getMessage(strings[i].dataset.i18n);
}

function init_inputs()
{
	var inputs = document.getElementsByTagName("input");
	for(var i = 0; i < inputs.length; i++)
	{
		inputs[i].addEventListener("change", save_prefs, false);
		if(w[inputs[i].id] === "0") inputs[i].checked = null;
	}
}

function save_prefs()
{
	var input = window.event.target, key = input.id, value = input.checked ? "1" : "0";
	
	var saveobject = {};
	saveobject[key] = value;
	chrome.storage.sync.set(saveobject);					// save it in Chrome's synced storage
	chrome.extension.getBackgroundPage().w[key] = value;	// update settings in background.js
	
	set_wanted_docs();
}

function set_wanted_docs(){
	var possible_docs = {"pdf":"pdf","doc":"doc[x]?","xls":"xls[x]?","ppt":"ppt[x]?","odt":"od(t|s)","pages":"pages","ai":"ai","psd":"psd","tiff":"tiff","dxf":"dxf","svg":"svg","eps":"[e]?ps","ttf":"(o|t)tf","xps":"xps"};
	var wanted_docs = "";
	
	for(doctype in possible_docs)
	{
		insert_separator(doctype);
		if(w[doctype] === "1") wanted_docs += possible_docs[doctype];
	}
	
	chrome.storage.sync.set({ "wanted_docs" : wanted_docs });				// save it in Chrome's synced storage
	chrome.extension.getBackgroundPage().w["wanted_docs"] = wanted_docs;	// update settings in background.js
	
	function insert_separator(next_filetype){
		if(wanted_docs.length > 1 && wanted_docs[wanted_docs.length-1] !== "|" && w[next_filetype] !== "0") wanted_docs += "|";
	}
}