    var doc = document;

    var div = document.createElement('div');
    div.setAttribute("style", "z-index: 10000;");

    var docURL = doc.URL;

    console.log('Tic-Addon loaded');

    var ticUrl = "https://www.navikatzen.com/tic2";
    var ticVersion = "tic-1.19.1";
    var form0 = this.createTicForm(doc, ticVersion, ticUrl);
    if (form0 != false) div.appendChild(form0);
  
    //erst einhängen, wenn alle Buttons da sind, damit die Buttons nicht mitgesendet werden
    var hl = doc.getElementById("heading_line");
    if(hl) hl.appendChild(div);

    var docRoot = doc.documentElement;

    var headElement = doc.getElementsByTagName("head")[0];

    var docURL = doc.URL;

    var form = false;

function createTicForm(doc, version, url) {
    var bodyElement = doc.getElementsByTagName("html")[0];
    var sc = bodyElement.innerHTML;
	// var sc = document.documentElement.innerHTML;
    if (sc.search(/Flottenzusammensetzung/) != -1) { // Flotte
                sc = sc.replace(/<\/td>\s*<td/ig,"</td>\t<td");
                sc = sc.replace(/<br>/ig,"\n");
                sc = sc.replace(/<\/tr>\s*<tr/ig,"</tr>\n<tr");
                sc = sc.replace(/(<([^>]+)>)/ig,"");
                sc = sc.replace(/&nbsp;/ig," ");
                sc = sc.replace(/\s*[\n\r]\s*/ig, "\n");
                sc = sc.slice(sc.indexOf("Flottenzusammensetzung"));
                sc = sc.replace(/.*(Flottenzusammensetzung[^\n]*)/ig, "\n\n $1\n");
                sc = sc.replace(/Verteidigungseinheiten/ig, "\n\n Verteidigungseinheiten\n");
                sc = sc.replace(/©/ig, "\n\n\n©");
            } else if (sc.search(/Galaxie Taktik/) != -1) { // Taktikscreen
                sc = encodeURI(sc); // Alles enkodieren und uebergeben...
            } else { // Scan
                var scanStart = sc.search(/(Sektorscan)|(Einheitenscan)|(Militärscan)|(Geschützscan)/ig);
                sc = sc.slice(scanStart);
                sc = sc.replace(/<\/td>\s*<td/ig,"</td>\t<td");
                sc = sc.replace(/<br>/ig,"\n");
                sc = sc.replace(/<\/tr>\s*<tr/ig,"</tr>\n<tr");
                sc = sc.replace(/(<([^>]+)>)/ig,"");
                sc = sc.replace(/&nbsp;/ig," ");
                sc = sc.replace(/\s*[\n\r]\s*/ig, "\n");
            }
            form = doc.createElement("form");
            form.setAttribute("action", url+"/main.php");
            form.setAttribute("method", "POST");
            form.setAttribute("target", "_blank");
            form.setAttribute("name", "ticng_form");

            var parseText = doc.createElement("input");
            parseText.setAttribute("name", "txtScan");
            parseText.setAttribute("type", "hidden");
            parseText.setAttribute("value", sc);
            form.appendChild(parseText);

            var modul2Text = doc.createElement("input");
            modul2Text.setAttribute("name", "modul2");
            modul2Text.setAttribute("type", "hidden");
            modul2Text.setAttribute("value", "scan");
            form.appendChild(modul2Text);

            var actionText = doc.createElement("input");
            actionText.setAttribute("name", "action");
            actionText.setAttribute("type", "hidden");
            actionText.setAttribute("value", "addscan");
            form.appendChild(actionText);

            var subTxt = doc.createElement("input");
            subTxt.setAttribute("type", "submit");
            subTxt.setAttribute("name", "ab");
            subTxt.setAttribute("value", "->TIC");
            form.appendChild(subTxt);

            var autoClose = doc.createElement("input");
            autoClose.setAttribute("name", "autoclose");
            autoClose.setAttribute("type", "hidden");
            autoClose.setAttribute("value", "now");
            form.appendChild(autoClose);

     return form;
}
