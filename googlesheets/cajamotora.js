/* gsWITHSUCCESSHANDLERgs.gs. */
// need to refactor this into a solution, for now this demos the google.script.run.WSH(oSL) server function.

function alertgs_WSH_askAQuestion() {
// function askAQuestion() {
  var ss=SpreadsheetApp.getActive();
  var html='<select id="sel1" onchange="sendChoice()">'
  html+='<option value="no Choice">Make a Choice</option>';
  html+='<option value="Sheet1">Sheet1</option>';
  html+='<option value="Sheet2">Sheet2</option>';
  html+='<option value="Sheet3">Sheet3</option>';
  html+='</select>';
  html+='<script>var onSuccessLoad = function(name) { console.log("run onSuccessLoad"); }; function sendChoice() { var choice=document.getElementById(\'sel1\').value;google.script.run.withSuccessHandler(onSuccessLoad).displayChoice(choice);}console.log(\'My Code\');</script>';
  var userInterface=HtmlService.createHtmlOutput(html);
  SpreadsheetApp.getUi().showModelessDialog(userInterface, 'Make a Choice');
}

// google.script.host.close();
// google.script.run.withSuccessHandler
function displayChoice(choice) {
  SpreadsheetApp.getUi().alert(choice);
  return;
}

/* gsPOSTDATAgs and new alertgs_SubmitSuperNinjaForm_server() */

/* BEGIN POST DATA FUNCTIONS */
function postDataViaButton(sURL, sType, oData, sTitle, sBody) { 
  if (sTitle == undefined) { sTitle = "function() {};"; }
  
  if (sBody == undefined) { 
    sBody = sTitle;
  }

  var aPOSTVariables = sURL.split("&"); aPOSTVariables[0] = aPOSTVariables[0].split("?")[1];

  if (aPOSTVariables[0] != undefined) {
    // generate oPOSTVariables from URL parameters first
    var oPOSTVariables = aPOSTVariables.reduce(function(agg, oElement) { agg[oElement.split("=")[0]] = oElement.split("=")[1]; return agg; }, {} )
    // generate oPOSTVariables payload object keys second
    Object.keys(oData).forEach(function(oElement770) {
      oPOSTVariables[oElement770] = oData[oElement770]; // oData
    // oPOSTVariables.sPostDatax = sPostData;
    })
  } else {
    // var oPOSTVariables = JSON.parse(sPostData);
    var oPOSTVariables = oData;
  }
  
  var sSubmitSuperNinjaForm = "SubmitSuperNinjaForm="+SubmitSuperNinjaForm.toString();
  var sCode = "<script>" + sSubmitSuperNinjaForm + "</script>";
  // sCode += "<script>var sPostData = " + JSON.stringify(sPostData) + "</script>";
  sCode += "<script>var oPOSTVariables = " + JSON.stringify(oPOSTVariables) + "</script>";
  // sCode += '<script>var oTypeURLPayload = { type:"POST", payload: {script: 84, deploy: 1, context: "InternationalPaperwork", sPostData: sPostData, } }; var sURL = "' + sURL + '"; oTypeURLPayload.url = sURL;</script>';
  sCode += '<script>var oTypeURLPayload = { type:"' + sType + '", payload: oPOSTVariables }; var sURL = "' + sURL + '"; oTypeURLPayload.url = sURL;</script>';
  //  SERVER SEES: JSON.stringify(Object.keys(oGetAllParameters)) 
  var html = '<html><head>' + sCode + '</head><body>' + sBody + '<input type="button" onclick="SubmitSuperNinjaForm(oTypeURLPayload, \'_blank\');" value="' + sTitle + '" /></body></html>';
  alertHTML(html);
  //var ui = HtmlService.createHtmlOutput(html);
  //SpreadsheetApp.getUi().showModelessDialog(ui, sTitle);
}

function postDataDirectly(sURL, sType, sPostData) {
  //postToCualquierPotencialidad_PHP2() { 
  var oSend = {instruction: sPostData};
  var context = {
    'method' : sType,
    'Content-Type': 'application/json',
    "Accept": "application/json",
    'muteHttpExceptions': false,
    payload : { REST: JSON.stringify(oSend) },
  };
  var response = UrlFetchApp.fetch(sURL, context);
  SpreadsheetApp.getActiveSpreadsheet().toast(response, "done");
}
/* END POST DATA FUNCTIONS */

function alertgs_SubmitSuperNinjaForm_server(oAlertgs_SubmitSuperNinjaForm_server) {
// function alertgs_SubmitSuperNinjaForm_server(sPromptHTML, sButtonTitle, oHTTPMethodURLPayload, aSheets, sEncryption, ) {
    // This alertgs_SubmitSuperNinjaForm_server() can truly transform into a POSTMAN clone for googlesheets and everything!
    // perhaps refactor in the fun grid I was building for every type of connection out there and converting it to bash curl, javascript fetch, googlesheets URLfetch, etc..
    // I just need to "elevate" it off of googlesheets into perhaps a something that can domINJECTify itself into any page utilizing the domFETCH functions (fetchXML and submitsuperninja, etc?)
    // oHTTPMethodURLPayload = {url: "https://acct138579.app.netsuite.com/app/site/hosting/scriptlet.nl?script=45&deploy=1&context=OMR", method: "POST", "payload": "data" };

    // HTML forms support GET and POST. (HTML5 at one point added PUT/DELETE, but those were dropped.)
    // XMLHttpRequest supports every method, including CHICKEN, though some method names are matched against case-insensitively (methods are case-sensitive per HTTP) and some method names are not supported at all for security reasons (e.g. CONNECT).
    // Fetch API also supports any method except for CONNECT, TRACE, and TRACK, which are forbidden for security reasons.
    // Browsers are slowly converging on the rules specified by XMLHttpRequest, but as the other comment pointed out there are still some differences.
    // this superencrypt snippet is amazing: dom's browser client superencrypt in googlesheets server!  dependent on the CryptoJS library which this functio will alert from any system if its missing.  where should i permanently store this function? it's minified here for now in this alertgs_ function....
    // function superencrypt(e,o){try{return e?("string"==typeof e&&(e=[[e]]),e=e.map(((e,n)=>e.map((e=>{if(o||(o="AES.encrypt"),"superencode"==o||"encode"==o)return superencode(e);if("btoa"!=o&&"base64"!=o)return CryptoJS.AES.encrypt(superencode(e),o).toString();try{return btoa(e)}catch(e){return"unknown system/engine without base64Encode..."}})))),"hint"==o?`${JSON.stringify(e)}.map(o=>o.map(oo=>{ return decodeURIComponent( \n CryptoJS.AES.decrypt(oo, "hint").toString(CryptoJS.enc.Utf8)\n ) }) )`:e):(console.log('copy(superencrypt([["a", "b", "c"],["d - 1", "e - 2", "f - 3"]], "hint"))'),"")}catch(e){return superdecrypt()}}function superdecrypt(e,o){return"string"==typeof e&&(e=[[e]]),o?"encode"==o||"superencode"==o?e.map((e=>e.map((e=>decodeURIComponent(e))))):"btoa"==o||"base64"==o?e.map((e=>e.map((e=>atob(e))))):e.map((e=>e.map((e=>decodeURIComponent(CryptoJS.AES.decrypt(e,o).toString(CryptoJS.enc.Utf8)))))):(sError='\n domLoadScripts_Link("https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js")\n\n copy(superencrypt([["a", "b", "c"],["d - 1", "e - 2", "f - 3"]], "hint"));\n\n aVO.map(o=>o.map(oo=>{ return decodeURIComponent( CryptoJS.AES.decrypt(oo, "hint").toString(CryptoJS.enc.Utf8))}))\n aVO.map(o=>o.map(oo=>{ return decodeURIComponent( oo )}));\n aVO.map(o=>o.map(oo=>{ return atob( oo )}));\n\n superdecrypt(superencrypt([["a", "b", "c"],["d - 1", "e - 2", "f - 3"]], "password"), "password")\n superdecrypt(superencrypt([["a", "b", "c"],["d - 1", "e - 2", "f - 3"]], "btoa"), "btoa")\n superdecrypt(superencrypt([["a", "b", "c"],["d - 1", "e - 2", "f - 3"]], "encode"), "encode")\n\n\n ',console.log("LOAD CRYPTOJS:\n\n"+sError),sError)}
    
    // var {blah, hello} = { blah: "blah", "hello": "bye"}
    var { body, DOMContentLoaded, oHTTPMethodURLPayload, sButtonTitle, aSheets, sEncryption, sTitle, sPromptHTML} = oAlertgs_SubmitSuperNinjaForm_server;
    
    // HTMLLibrarify, HTMLDOMContentLoadedify, and HTMLify are a part of a lot of these solutions?
    Arrayify = function(aArray) { if (Array.isArray(aArray)) { return aArray; } else { return [aArray]; } }
    aSheets = Arrayify(aSheets);
    var sScripts = HTMLLibrarify(
      [
        "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js",
        "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
        "https://manueldelanda.github.io/datacss.css",
        "https://manueldelanda.github.io/datascripts.js",
        "https://manueldelanda.github.io/domscripts.js"
      ]
    );

    // sScripts += "<script>var aVO=" + JSON.stringify(getgs_sheetToAVO("aRawDataRestacked")) + "</script>";
    // selection vs whole sheet?
    oSheets = aSheets.reduce((a,e,i)=>{
        if (e == "getgs_selectedToAVO" || e == "select") {
            if (sEncryption) {
                a[e] = superencrypt(getgs_selectedToAVO(), sEncryption);
            } else {
                a[e] = getgs_selectedToAVO();
            }            
        } else if (e == "getgs_multiselectOSRish" || e == "multiselectOSRish") { // instead of multiselectAVO or multiselectOSR (neither of which exist because "multi-select" is a new concept specific to Myle's Stamping Q worksheet)
            if (sEncryption) {
                a[e] = superencrypt(JSON.stringify(getgs_multiselectOSRish()), sEncryption);
            } else {
                a[e] = getgs_multiselectOSRish();
            }  
        } else { // if not "select" or "multiselectOSRish" (yikes), then assume it's just the name of the worksheet
            if (sEncryption) {
                a[e] = superencrypt(getgs_sheetToAVO(e), sEncryption);
            } else {
                a[e] = getgs_sheetToAVO(e);
            }        
        }

        return a;
    }, {});
    
    // old aVO: sScripts += "<script>var aVO=" + JSON.stringify(superencrypt(getgs_sheetToAVO(sWorksheet), sEncryption)) + "</script>";
    // new oSheets:
    sScripts += "<script>var oSheets=" + JSON.stringify(oSheets) + "</script>";

    sScripts += "<script>" + HTMLDOMContentLoadedify(`
    // document.querySelectorAll("textarea")[0].value = JSON.stringify(aRO);

    `) + "</script>";
    
    if (DOMContentLoaded) {
        sScripts += "<script>" + HTMLDOMContentLoadedify(DOMContentLoaded) + "</script>";
    } else {}
    
    var sBody = `
        <script>
            var oHTTPMethodURLPayload_server = ${ ((oHTTPMethodURLPayload) ? JSON.stringify(oHTTPMethodURLPayload) : "{}" ) };

            pushgs_SubmitSuperNinjaForm_client = function(oHTTPMethodURLPayload) {
                if (oHTTPMethodURLPayload) {} else {
                    oHTTPMethodURLPayload = {};
                    // oHTTPMethodURLPayload.url = $$$$("#url").value;
                    // oHTTPMethodURLPayload.method = $$$$("#method").value;
                    // oHTTPMethodURLPayload.payload = $$$$("#payload").value;
                    // oHTTPMethodURLPayload.url = "${oHTTPMethodURLPayload.url}";
                    oHTTPMethodURLPayload.url = oHTTPMethodURLPayload_server.url;
                    // oHTTPMethodURLPayload.method = ${oHTTPMethodURLPayload.method};
                    oHTTPMethodURLPayload.method = "POST";
                    // oHTTPMethodURLPayload.$ {sSheet} = aVO;
                    // oHTTPMethodURLPayload.payload = JSON.stringify({ "sheets": { $ {sSheet}: aVO } });
                    oHTTPMethodURLPayload.payload = JSON.stringify({ "sheets": ${JSON.stringify(oSheets)} });
                    // oHTTPMethodURLPayload.encodify = $$$$("#encodify").value; // this one doesn't get pushed to post? SubmitSuperNinjaForm hardcoded to just look at payload, url, and method i guess?
                }
                // alert(JSON.stringify(oHTTPMethodURLPayload));
                SubmitSuperNinjaForm(oHTTPMethodURLPayload);
            }
        </script>

        <!-- 
            <p><b>Step XYZ:</b><button class='btn gray' onClick='pushgs_SubmitSuperNinjaForm_client();'>pushgs_SubmitSuperNinjaForm_client(oHTTPMethodURLPayload)</button></p>
            <p><b>Step XYZ:</b><button class='btn gray' onClick='pushgs_SubmitSuperNinjaForm_client();'>${sButtonTitle}</button></p>
        -->
    ` + ((sButtonTitle) ? `<p><b>Step XYZ:</b><button class='btn gray' onClick='pushgs_SubmitSuperNinjaForm_client();'>${sButtonTitle}</button></p>` : "" );
    
    if (true) {
        sPromptHTML = "";
    } else {
        sPromptHTML = `<div>var oHTTPMethodURLPayload.url=<textarea id="url" rows="2" cols="18">https://acct138579.app.netsuite.com/app/site/hosting/scriptlet.nl?script=45&deploy=1&context=OMR</textarea></div>
        <!-- <div>var oHTTPMethodURLPayload.method=<textarea id="type" rows="2" cols="18">GET</textarea></div> -->
        <div>var oHTTPMethodURLPayload.method=${toHTMLSelect(["GET", "POST"], "#method")}</div>
        <div>var oHTTPMethodURLPayload.payload=<textarea id="payload" rows="2" cols="18">{whatever: whatever}</textarea></div>
        <div>var oHTTPMethodURLPayload.encodify=<textarea id="encodify" rows="5" cols="18">encodify=function (a) { return a.map(o=>{ return o; } ) }</textarea></div>`;
    }
    alertHTML(sScripts + sPromptHTML + sBody + body, "1000x1000", sTitle);
  // + "<br /><textarea style='height:400px; width:100%;'>" + superhtmlEntities(JSON.stringify(getgs_rangeToARO())) + "</textarea>"
}

/* gsGSINTEGRATIONgs - gs dot io, alertgs_gsintegration_GSDS_ENGINE_FIRST, alertgs_gsintegration_GSDS_ENGINE_LAST, getgs_gsintegration, alertgs_gsintegration */

/* gs dot io functions */
function getSelectedCellToJspreadsheet() { alertgs_CQPifiedSolutionIsland("Jspreadsheet"); }
function getSelectedCellsToJSON() {  alertgs_CQPifiedSolutionIsland("Selected Cells -> JSONify"); }
function getSelectedCellsToMergely() {  alertgs_CQPifiedSolutionIsland("mergely.js diff checker"); }
function getSelectedCellToBeautifier() {  alertgs_CQPifiedSolutionIsland("beautify.js and excel-formula.js"); }
function getSelectedCellToCodeMirror() {  alertgs_CQPifiedSolutionIsland("codeMirror"); }

function getgs_gsintegration(sWorksheetName) {
  if (sWorksheetName) {} else { sWorksheetName = "webapp"; }
  // if (sWorksheetName) {} else { sWorksheetName = "cajamotora"; }
  // if GSDS_ENGINE no existe, then create samples!
  if ((SpreadsheetApp.getActive().getSheetByName(sWorksheetName))) { } else {
    confirm("Launching/Deploying new cajamotora now...");
    updategs_createNewWorksheet(sWorksheetName);
    aVO = [["","","","","",""],["","label","server","notes","body",""],["","Welcome to cajamotora","alert(\"Welcome to cajamotora. This GSDS Solution Island was just created to demonstrate what a GSDS integration looks like.\")","","<b>Cool congratulations, this popup is generated from the first \"island\" of data in the \"cajamotora\" worksheet.  Click on that worksheet to visualize the \"islands\" of solutions (henceforth known as \"solution islands\").  cajamotora itself is a meta-solution that deconstructs solutions to a set of cells, inspired by CodePen.io's framework.</b>\n<br />\n<b></b>\n<br />\n<br />\n\nCurrently functioning/operating/working columns/features/keys:\n\n<pre>\n\nlabel - just the title of the solution\ncontext - need to think this out to make it compatible with NS and WP solutions\n\nhead - loads to &lt;head&gt; tag\nstyle/css - loads to &lt;style&gt; tag\nscript - loads to &lt;script&gt; tag\nonload - executes as part of DOMContentLoaded\njs - loads to &lt;script&gt; tag AND executes it as part of DOMContentLoaded\n\nheadlist/library - quickly add CDNs - consider refactoring to allow for nexus/mirrors/backup CDNs...\n\nnotes - just tracks random notes, not even CQPified().\nlabelx, notesx, server_old, bugs - just more notes / backups of other ideas to be implemented within current Solution Island\n\nserver - aVO_server, sA1Notation_server variables - need to add more to this?\n\nbody - working?\nhtml - needs to be fixed, kinda hacky\npug - needs to be implemented\n\n\n</pre>",""],["","","","","",""],["","","","","",""],["","","","","",""],["","label","","","",""],["","blank","","","",""]];
    putgs_AVOToRange(aVO, "A1", sWorksheetName);
    removeEmptyRows(sWorksheetName);
    putgs_prependAVOToWorksheet([[],[],[],[]], sWorksheetName);
    putgs_appendAVOToWorksheet([[],[],[],[]], sWorksheetName);
    // resize all rows to same height
    var sheet = SpreadsheetApp.getActive().getSheetByName(sWorksheetName);
    sheet.setRowHeightsForced(1, sheet.getLastRow()-1, 20)
  }

  return aGet2DIslands(getgs_rangeToAVO(sWorksheetName + "!A27:"));
}
function alertgs_gsintegration() {
  // aVOIslands = aGet2DIslands(aVO);
  
  aVOIslands = getgs_gsintegration();
  
  aLabels_ = aVOIslands.map(e=>{
    return toRO(e).map(o=>{ return o.label; }).join(" ").replace(/\n/g, "");
  });
  sLabels = aLabels_.reduce( (a,e,i) => {
    if (e.trim().length > 0) {  // ignore empty labels
      a = a + i.toString() + " = " + e + "\n";
    }
    return a;
  }, "")
  // iIsland = prompt("which island? (eg: 0, 1, 2, etc whatever integer)");
  iIsland = prompt("aVOIslands = getgs_gsintegration()\n\nEvaluate which aVO island? eg: \n\n" + sLabels);

  // alertTextArea(JSON.stringify(aVOIslands));
  // alertHTML(CQPifyWithServer(toRO(aVOIslands[2])));
  aLabels = aVOIslands.reduce((a,o,i)=>{ if (o[0][0]=="label") { a.push(aVOIslands[i][1][0]) } else { a.push("empty label!"); }; return a; }, []);
  // aVOIslands_CQPifiedWithServer = aVOIslands.map((o,i)=>{
  aVOIslands_CQPifiedWithServer = [aVOIslands[iIsland]].map((o,i)=>{
    try {
      return CQPify(toRO(o));
    } catch(e) {
      return e;
    }
  });
  
  sHTML = aVOIslands_CQPifiedWithServer[0];
  sTitle = aLabels[iIsland];
  if (!(sTitle)) { sTitle = "GS Integration with iFrame/document.open"; }
  
  /* get rid of this abomination below of toggling between server-side in favor of prompting user for which island to run
  oGSIntegrationSolutions = aLabels.reduce( (a,e,i) => {
    a[e] = aVOIslands_CQPifiedWithServer[i];
    return a;
  }, {} )

  var sHTMLToggleBetweenSolutions = toHTMLSelect(Object.keys(oGSIntegrationSolutions));
  sHTMLToggleBetweenSolutions += `<div style="float:right; margin-right: 60%;"><p>Open in:</p><input checked type="radio" id="currentwindow" name="openinstructions" value="currentwindow"><label for="currentwindow">current window</label><br><input type="radio" id="newwindow" name="openinstructions" value="newwindow"><label for="newwindow">new window</label><br></div>`;
  
  sHTML = `<script>var oGSIntegrationSolutionsENCODED = "${superencode(JSON.stringify(oGSIntegrationSolutions))}";</script>`;
  sHTML += "<script>" + `function doAction() {
          var oGSIntegrationSolutions=JSON.parse(decodeURIComponent(oGSIntegrationSolutionsENCODED));
          sSolution = document.querySelector(".aArraySelect").value;
          if (!(document.querySelector("iframe"))) {
            var iframe = document.createElement('iframe');
            var div = document.createElement('div');
            div.innerHTML = "<br /><br />";
            iframe.id = "testiframe";
            iframe.width="100%";
            iframe.height="500px";
            // iframe.style.display = "none";
            // iframe.srcdoc = oGSIntegrationSolutions[sSolution];
            document.body.appendChild(div);
            document.body.appendChild(iframe);
          }
          if (document.querySelector("#newwindow").checked) { // vs "open in iframe"
            var wnd = window.open('', 'popup_name','_blank,height=' + screen.height + ',width=' + screen.width + ',resizable=yes,scrollbars=yes,toolbar=yes,menubar=yes,location=yes');
            // var div = wnd.document.createElement('div');
            // div.innerHTML = "<br /><br />"; 
            var iframe2 = wnd.document.createElement('iframe');
            iframe2.id = "testiframe";
            iframe2.width="100%";
            iframe2.height="500px";
            wnd.document.body.appendChild(iframe2);
            wnd.document.querySelector("iframe").srcdoc = oGSIntegrationSolutions[sSolution];
          } else {
            // alert("iframe?");
            document.querySelector("iframe").srcdoc = oGSIntegrationSolutions[sSolution];
          }
  }
  ` + HTMLDOMContentLoadedify(`
      document.querySelector(".aArraySelect").addEventListener("input", function() {
        doAction();
      });
      
      document.querySelector("select").selectedIndex=3; doAction();
    `) + "</script>";
  // sHTML = sHTML.replace(/\<body\>/, "<body>" + sHTMLToggleBetweenSolutions)
  sHTML += sHTMLToggleBetweenSolutions;
  */
  
  // alertHTML(sHTML, "1000x1000", "GS Integration with iFrame/document.open");
  alertHTML(sHTML, "1000x1000", sTitle);
  // alertTextArea(JSON.stringify(oGSIntegrationSolutions));
}
function alertgs_gsintegration_GSDS_ENGINE_FIRST() { //
  // aVOIslands = aGet2DIslands(aVO);
  // alertTextArea(JSON.stringify(aGet2DIslands(getgs_A1NotationToAVO())[0])); //  SpreadsheetApp.getActive().getRange("GSDS_ENGINE!A1:1")
  alertHTML(CQPify(toRO(getgs_gsintegration()[0])), "1000x1000", "cajamotora SOLUTION[0]");
  // alertHTML(CQPifyWithServer(toRO(aGet2DIslands(getgs_A1NotationToAVO("GSDS_ENGINE!A1:"))[0])), "1000x1000", "GSDS_ENGINE SOLUTION 1");
}
function alertgs_gsintegration_GSDS_ENGINE_LAST() {
  aVO = getgs_gsintegration();
  alertHTML(CQPify(toRO(aVO[aVO.length-1])), "1000x1000", "cajamotora SOLUTION[?]");
}

/* gsRENDERDSMENUgs - render_datascripts_menu, */
function render_datascripts_menu() {
// to do - refactor de_UNICODEize() so  can properly deploy/render this via a series of charCodeAt/fromCharCode
// DONE - deUNICODEize fixes this problem - unminified rather - how to keep this unencoded in my deployment/rendering process without losing special characters?

// encoded MenuItems in order to persist/preserve text decorations (Unicode strikethrough), upside down question marks, lambda/functions 
// puzzling / grappling over how to handle this menu item's text decorations to persist via encoding?

SpreadsheetApp.getUi()
.createMenu('' + String.fromCharCode(9669) + ' datascripts ' + String.fromCharCode(9659) + '')
.addSeparator()
.addSubMenu(SpreadsheetApp.getUi()
  .createMenu('' + String.fromCharCode(55358) + '' + String.fromCharCode(56825) + '' + String.fromCharCode(10024) + ' data cleanup ' + String.fromCharCode(43457) + '' + String.fromCharCode(55358) + '' + String.fromCharCode(56829) + '' + String.fromCharCode(55358) + '' + String.fromCharCode(56828) + '' + String.fromCharCode(10024) + '')
  .addItem('' + String.fromCharCode(9630) + ' Selected Cells ' + String.fromCharCode(10174) + ' Combined String.join("slash_n")', 'alertgs_selectedToCombinedStringWLINEBREAKS') // formerly S' + String.fromCharCode(822) + 'e' + String.fromCharCode(822) + 'l' + String.fromCharCode(822) + 'e' + String.fromCharCode(822) + 'c' + String.fromCharCode(822) + 't' + String.fromCharCode(822) + 'e' + String.fromCharCode(822) + 'd' + String.fromCharCode(822) + ' ' + String.fromCharCode(822) + 'C' + String.fromCharCode(822) + 'e' + String.fromCharCode(822) + 'l' + String.fromCharCode(822) + 'l' + String.fromCharCode(822) + 's' + String.fromCharCode(822) + ' ' + String.fromCharCode(822) + '-' + String.fromCharCode(822) + '>' + String.fromCharCode(822) + ' ' + String.fromCharCode(822) + 'c' + String.fromCharCode(822) + 'o' + String.fromCharCode(822) + 'm' + String.fromCharCode(822) + 'b' + String.fromCharCode(822) + 'i' + String.fromCharCode(822) + 'n' + String.fromCharCode(822) + 'e' + String.fromCharCode(822) + '  Selected Cell(s) -> ??' + String.fromCharCode(11800) + 'combine?!' + String.fromCharCode(8253) + ' and copy without annoying gs quotes
  .addItem('' + String.fromCharCode(9630) + ' Selected Cells ' + String.fromCharCode(10174) + ' Combined String', 'alertgs_selectedToCombinedString')
      .addItem('' + String.fromCharCode(9940) + ' Remove Empty Rows', 'removeEmptyRows')
      .addItem('' + String.fromCharCode(9940) + ' Remove Empty Columns', 'removeEmptyColumns')
      .addSeparator()
      .addItem('' + String.fromCharCode(9940) + ' Remove Empty Rows&Cols', 'removeEmptyRowsAndCols')
      .addSeparator()
  // .addItem(sMenuItem, 'alertgs_selectedToCombinedString') 
  .addItem('' + String.fromCharCode(55357) + '' + String.fromCharCode(56523) + ' Active Sheet ' + String.fromCharCode(10174) + ' replace "<googlesheetsbr>" with /n since Find & Replace doesnslasht allow regex in the Replace', 'updategs_googlesheetsbr')
  .addItem('' + String.fromCharCode(9723) + ' Selected Cell ' + String.fromCharCode(10174) + ' replace 5 spaces with "<tab>"', 'alertgs_slashnToslashslashn')
  .addItem('' + String.fromCharCode(9723) + ' Selected Cell ' + String.fromCharCode(10174) + ' replace slashsl_n with slashslslsl_n', 'alertgs_slashnToslashslashn')
  .addItem('' + String.fromCharCode(9723) + ' Selected Cell ' + String.fromCharCode(10174) + ' replace quote with quotequote (for googlesheets-ification)', 'alertgs_QuoteToDoubleQuote')
  .addItem('' + String.fromCharCode(9723) + ' Selected Cell ' + String.fromCharCode(10174) + ' replace apostrophe with quote and vice-versa (for various js purposes)', 'alertgs_ApostrapheTuhFrooQuote')
  // .addItem('' + String.fromCharCode(9723) + ' Selected Cell ' + String.fromCharCode(10174) + ' alert cell size/length', 'alertgs_sizeOfCell')
  .addSeparator()
  .addItem('' + String.fromCharCode(9723) + ' Selected Cell ' + String.fromCharCode(10174) + ' deFormula-ize (put apostraphe in front of equals signs)', 'filler')
  .addItem('' + String.fromCharCode(9723) + ' Selected Cell ' + String.fromCharCode(10174) + ' reFormula-ize (remove any apostrophes in front of equals signs)', 'filler')
  .addSeparator()
  .addItem('' + String.fromCharCode(9723) + '/' + String.fromCharCode(10697) + ' Selected Cell(s) ' + String.fromCharCode(10174) + ' swap .getValue() with .getNote() ', 'updategs_swapValueWithComment')
  .addItem('' + String.fromCharCode(9723) + '/' + String.fromCharCode(10697) + ' Selected Cells ' + String.fromCharCode(10174) + ' setValues() with getBackground() html color', 'updategs_selectedWithColor')


)
.addSeparator()

.addSubMenu(SpreadsheetApp.getUi()
  .createMenu('' + String.fromCharCode(9723) + ' Selected Cell ' + String.fromCharCode(10174) + '')
  .addSeparator()
  .addItem('' + String.fromCharCode(9723) + ' Selected Cell ' + String.fromCharCode(10174) + ' superencode()', 'alertgs_selectedCellToEncoded')
  .addItem('' + String.fromCharCode(9723) + ' Selected Cell ' + String.fromCharCode(10174) + ' superhtmlentities()', 'alertgs_selectedCellToHTMLEntities')
  .addSeparator()
  .addItem('' + String.fromCharCode(9723) + '/' + String.fromCharCode(10697) + ' Selected Cell(s) ' + String.fromCharCode(10174) + ' JS/Excel Beautifier', 'getSelectedCellToBeautifier')
  .addItem('' + String.fromCharCode(9723) + ' (' + String.fromCharCode(10697) + 'ish) Selected Cell(s) ' + String.fromCharCode(10174) + ' CodeMirror-ify', 'getSelectedCellToCodeMirror')
  .addItem('' + String.fromCharCode(9723) + ' (' + String.fromCharCode(10697) + 'ish) Selected Cell(s) ' + String.fromCharCode(10174) + ' JSON-BRACKET', 'getSelectedCellToJspreadsheet')
  .addSeparator()
  .addItem('' + String.fromCharCode(9723) + '/' + String.fromCharCode(10697) + ' Selected Cell(s) ' + String.fromCharCode(10174) + ' alert(eval())', 'alertevalgs_selected')
  .addItem('' + String.fromCharCode(9723) + '/' + String.fromCharCode(10697) + ' Selected Cell(s) ' + String.fromCharCode(10174) + ' eval()', 'evalgs_selected')
  .addSeparator()
)
.addSeparator()

.addSubMenu(SpreadsheetApp.getUi()
  .createMenu('' + String.fromCharCode(9723) + ' Selected Cell ' + String.fromCharCode(10174) + ' circumjacent isle ' + String.fromCharCode(10174) + ' ')
  .addSeparator()
  .addItem('' + String.fromCharCode(9723) + ' Selected Cell ' + String.fromCharCode(10174) + ' circumjacent isle ' + String.fromCharCode(10174) + ' aRO', 'alertgs_selectedCellToARO') // "cajamotora island" vs "gsdsengine island" vs "aVO island"?
  .addItem('' + String.fromCharCode(9723) + ' Selected Cell ' + String.fromCharCode(10174) + ' circumjacent isle ' + String.fromCharCode(10174) + ' aVO', 'alertgs_selectedCellToAVO')
  .addItem('' + String.fromCharCode(9723) + ' Selected Cell ' + String.fromCharCode(10174) + ' circumjacent isle ' + String.fromCharCode(10174) + ' CQPify() rendered', 'alertgs_selectedCellCQPified_rendered') // "CQPify" vs "cajamotorize"?
  .addItem('' + String.fromCharCode(9723) + ' Selected Cell ' + String.fromCharCode(10174) + ' circumjacent isle ' + String.fromCharCode(10174) + ' HTMLify() text', 'alertgs_selectedCellHTMLified_unrendered')
  .addItem('' + String.fromCharCode(9723) + ' Selected Cell ' + String.fromCharCode(10174) + ' circumjacent isle ' + String.fromCharCode(10174) + ' CodePenify() aVO', 'alertgs_selectedCellCodePenify_unrendered')
)
.addSeparator()

.addSubMenu(SpreadsheetApp.getUi()
  .createMenu('' + String.fromCharCode(55357) + '' + String.fromCharCode(56523) + ' Active Sheet/Multiple Sheets ' + String.fromCharCode(10174) + '')
  .addItem('' + String.fromCharCode(55357) + '' + String.fromCharCode(56523) + ' Active Sheet ' + String.fromCharCode(10174) + ' aRecordsOriented', 'getActiveSheet')
  .addItem('' + String.fromCharCode(55357) + '' + String.fromCharCode(56523) + ' Active Sheet ' + String.fromCharCode(10174) + ' aRecordsOriented (encoded)', 'alertgs_sheetToEncodedARO')
  .addItem('' + String.fromCharCode(55357) + '' + String.fromCharCode(56523) + ' Active Sheet ' + String.fromCharCode(10174) + ' aVO', 'alertgs_activeSheetToAVO') // getgs_activeSheetToAVO vs getgs_A1NotationToAVO
  .addItem('' + String.fromCharCode(55357) + '' + String.fromCharCode(56523) + ' Active Sheet ' + String.fromCharCode(10174) + ' aVO Islands', 'alertgs_activeSheetToAVOIslands') // 
  .addItem('' + String.fromCharCode(55357) + '' + String.fromCharCode(56523) + ' Active Sheet ' + String.fromCharCode(10174) + ' aVO Island Addresses', 'alertgs_activeSheetToAVOIslandAddresses') //
  .addItem('' + String.fromCharCode(55357) + '' + String.fromCharCode(56523) + ' Active Sheet ' + String.fromCharCode(10174) + ' oSmartRange', 'alertgs_sheetToOSR')
  .addSeparator() // why ' + String.fromCharCode(55356) + '' + String.fromCharCode(57101) + 'earths?  tangible illustration of "global" variable = all sheets?  or nah?
  .addItem('' + String.fromCharCode(55356) + '' + String.fromCharCode(57104) + ' Multiple Sheets ' + String.fromCharCode(10174) + ' aRecordsOrientedALL', 'getgs_multisheetsToARO')
  .addItem('' + String.fromCharCode(55356) + '' + String.fromCharCode(57104) + '  Multiple Sheets ' + String.fromCharCode(10174) + ' aValuesOrientedALL', 'getgs_multisheetsToAVO')
)
.addSeparator()

.addSubMenu(SpreadsheetApp.getUi()
    .createMenu('' + String.fromCharCode(402) + '' + String.fromCharCode(955) + '(webapp isle) ' + String.fromCharCode(10174) + '')
    .addItem('' + String.fromCharCode(55356) + '' + String.fromCharCode(57309) + '' + String.fromCharCode(65039) + ' alertgs_gsintegration() ' + String.fromCharCode(402) + '' + String.fromCharCode(955) + '(webapp isle)[0]', 'alertgs_gsintegration_GSDS_ENGINE_FIRST') // "cajamotora island" vs "gsdsengine island" vs "aVO island"?
    .addItem('' + String.fromCharCode(55356) + '' + String.fromCharCode(57309) + '' + String.fromCharCode(65039) + ' alertgs_gsintegration() ' + String.fromCharCode(402) + '' + String.fromCharCode(955) + '(webapp isle)[*]', 'alertgs_gsintegration')
    .addItem('' + String.fromCharCode(55356) + '' + String.fromCharCode(57309) + '' + String.fromCharCode(65039) + ' alertgs_gsintegration() ' + String.fromCharCode(402) + '' + String.fromCharCode(955) + '(webapp isle)[' + String.fromCharCode(8734) + ']', 'alertgs_gsintegration_GSDS_ENGINE_LAST')
    .addItem('' + String.fromCharCode(9729) + ' fillerforcloudidea() ' + String.fromCharCode(402) + '' + String.fromCharCode(955) + '(webapp island)[' + String.fromCharCode(8734) + ']', 'tbd')
)
.addSeparator()

.addItem('' + String.fromCharCode(9712) + ' Selected Cells ' + String.fromCharCode(10174) + ' oSmartRange', 'alertgs_selectedToOSR')
.addItem('' + String.fromCharCode(9712) + ' Selected Cells ' + String.fromCharCode(10174) + ' <table>-ify', 'getgs_selectedToHTMLTableWHeaderFooter')
.addItem('' + String.fromCharCode(9712) + ' Selected Cells ' + String.fromCharCode(10174) + ' JSON-ENCRYPT', 'getSelectedCellsToJSON')
.addItem('' + String.fromCharCode(10697) + ' Selected Cells ' + String.fromCharCode(10174) + ' MergelyDiffchecker', 'getSelectedCellsToMergely')
.addSubMenu(SpreadsheetApp.getUi()
   .createMenu('' + String.fromCharCode(9633) + '' + String.fromCharCode(9712) + '' + String.fromCharCode(10697) + '' + String.fromCharCode(9703) + '' + String.fromCharCode(11026) + '' + String.fromCharCode(9637) + '' + String.fromCharCode(9635) + '' + String.fromCharCode(9630) + ' Selected Cells ' + String.fromCharCode(10174) + '')
   .addItem('' + String.fromCharCode(9712) + ' Selected Cells ' + String.fromCharCode(10174) + ' aValuesOriented Transposed', 'alertgs_selectedToAVOT')
   .addItem('' + String.fromCharCode(9712) + '/' + String.fromCharCode(10697) + ' Selected Cells ' + String.fromCharCode(10174) + ' aArray (one dimensional)', 'alertgs_selectedToFlatArray')
   .addItem('' + String.fromCharCode(9630) + '/' + String.fromCharCode(9287) + '/' + String.fromCharCode(12323) + '/' + String.fromCharCode(9779) + ' Selected Cells ' + String.fromCharCode(10174) + ' cartesian Product', 'alertgs_selectedToCartesianProduct')
   // .addItem('?? Selected Cells ' + String.fromCharCode(10174) + ' ' + String.fromCharCode(402) + '' + String.fromCharCode(955) + ' CurrentSheet', 'selectedCellsFunction')
   // .addItem('?? Selected Cells ' + String.fromCharCode(10174) + ' ' + String.fromCharCode(402) + '' + String.fromCharCode(955) + ' aRecordsOriented', 'selectedCellsFunctionRecordsOriented')
   // .addItem('' + String.fromCharCode(55357) + '' + String.fromCharCode(57041) + ' pivottableaddItem() example', 'pivottableexample')
   .addSeparator()
   .addItem('' + String.fromCharCode(55357) + '' + String.fromCharCode(57041) + ' cheatsheet', 'alertCheatSheet')
)
.addSeparator()
// .addSeparator()     

.addSubMenu(SpreadsheetApp.getUi()
            .createMenu('' + String.fromCharCode(9684) + ' My Submenu')
            .addItem('' + String.fromCharCode(10066) + ' testing001', 'testing001')
           )
.addToUi();
}





/* gsOVERKILLgs - updategs_googlesheetsbr */
//  MENU.addItem('ActiveSheet() -> replace <googlesheetsbr> with /n since Find & Replace doesn\'t allow regex in the Replace', 'updategs_googlesheetsbr')

function updategs_googlesheetsbr() {
// Why does this function exist - because: "Oh my god, thanks so much. Exactly what I needed. At least they have this, horrible how they don't allow regex in replace too." 
// https://stackoverflow.com/questions/7528169/find-replace-commas-with-newline-on-google-spreadsheet
  var ss = SpreadsheetApp.getActive(); // .getSheetByName('Netsuite Items');
  activeRange = ss.getRange("A1:" + columnToLetter(ss.getLastColumn()) + ss.getLastRow());
  // activeRange = ss.getRange("A1:A1");
  forEachRangeCell(activeRange, (cell) => {
    sGetValue = cell.getValue();
    if (sGetValue) {
      if (sGetValue.match(/\<googlesheetsbr\>/g) ) {
        cell.setValue(`${sGetValue.replace(/\<googlesheetsbr\>/g, "\n").trim()}`);
      }
    }
  })
  alert("finally completed.");
}

function alertgs_QuoteToDoubleQuote() {
    // return alertTextArea( SpreadsheetApp.getActiveSpreadsheet().getActiveCell().getValue().replace(/\"/g, "\"\"") );
    return alertTextArea( '=\"' + SpreadsheetApp.getActiveSpreadsheet().getActiveCell().getValue().replace(/\"/g, "\"\"") + '\"' );
}


function alertgs_ApostrapheTuhFrooQuote() { // "TuhFroo" = "To/From and From/To"
    return  alertTextArea( SpreadsheetApp.getActiveSpreadsheet().getActiveCell().getValue().replace(/\"/g, "alertgs_QuoteToDoubleQuote").replace(/\'/g, "\"").replace(/alertgs_QuoteToDoubleQuote/g, "'") );
}


// is there more overkill??

/* gsTOASTALERTSETCgs alert, btoa, console, alertHTML, showModalDialog, showModelessDialog, alertTextArea, toast, sidebar, copy, confirmS, prompt, confirm */
/* BEGIN alerts/toast/debugging/polyfills/shims/shortcuts */

function alert(sString, sString2) {
  if (sString2 != undefined) { // then the first parameter is title and second parameter is content
      SpreadsheetApp.getUi().alert(sString, sString2, SpreadsheetApp.getUi().ButtonSet.OK);
  } else { // then the first parameter is content
      SpreadsheetApp.getUi().alert(sString);
  }
}
function alertS(sString, sString2) { return alert(JSON.stringify(sString), (sString2 ? JSON.stringify(sString2) : sString2) ); }
function prompt(sString) { return SpreadsheetApp.getUi().prompt(sString).getResponseText(); }
function promptS(sString) { return prompt(JSON.stringify(sString)); }
function confirm(sString, sTitle) { return SpreadsheetApp.getUi().alert((sTitle==undefined ? "confirm? " : sTitle), sString, SpreadsheetApp.getUi().ButtonSet.YES_NO) == "YES"; } // alert - This method suspends the server-side script while the dialog is open
function confirmS(sString, sTitle) { return confirm(JSON.stringify(sString), sTitle); }
function copy(sString) { alertHTML("<script>eval(decodeURIComponent(\"copyElementInnerText%20%3D%20function(sElement)%20%7B%0Adocument.querySelectorAll(sElement)%5B0%5D.select()%3B%20document.execCommand(%22copy%22)%3B%20alert(%22copied!%22)%3B%0A%7D%3B%20window.addEventListener(%27DOMContentLoaded%27%2C%20(event)%20%3D%3E%20%7B%20copyElementInnerText(%22%23myInput%22)%3B%7D)%3B\"))</script><button onclick='eval(decodeURIComponent(\"copyElementInnerText%20%3D%20function(sElement)%20%7B%0Adocument.querySelectorAll(sElement)%5B0%5D.select()%3B%20document.execCommand(%22copy%22)%3B%20alert(%22copied!%22)%3B%0A%7D%3B%20copyElementInnerText(%22%23myInput%22)%3B\"))'>copy</button><br /><textarea id='myInput' style='width:100%; height:250px;'>" + superhtmlEntities(sString) + "</textarea>"); }
//copy = function(sString) { alertHTML("<button onclick='document.getElementById(\"myInput\").select();  document.execCommand(\"copy\"); alert(\"copied!\");'>copy</button><br /><textarea id='myInput' style='width:100%; height:250px;'>" + superhtmlEntities(sString) + "</textarea>"); }



btoa = function(o) { return Utilities.base64Encode(o, Utilities.Charset.UTF_8); }
// btoa = function(o) { return Utilities.base64Encode(o); }

console = {}; console.log = function(sString) { alert(sString) } // browser console simulating

// log = {}; log.debug = function(sString) { alert(sString) }  // Netsuite simulating
function alertHTML(sHTML, sDimensions, sTitle) { // vs Excel's System.Windows.Forms.RichTextBox / MsgBox?
  ((sTitle) ? "" : sTitle='alertHTML()' );
  ((sDimensions) ? "" : sDimensions="700x500" );
  try {
    var htmlOutput = HtmlService
    // .createHtmlOutput(superhtmlEntities(sHTML))
    .createHtmlOutput((sHTML))
    .setWidth(sDimensions.split("x")[0])
    .setHeight(sDimensions.split("x")[1]);  
    SpreadsheetApp.getUi().showModalDialog(htmlOutput, sTitle); // showModalDialog - This method does NOT suspend the server-side script while the dialog is open.
    // .showModalDialog vs .showModelessDialog vs .showSidebar vs .alert vs .prompt? - Modeless dialogs let the user interact with the editor behind the dialog. By contrast, modal dialogs do not. In almost all cases, a modal dialog or sidebar is a better choice than a modeless dialog.
  } catch(e) { 
    confirm(e);
    alertTextArea(sHTML);
  }
}; function showModalDialog(sHTML, sDimensions, sTitle) { return alertHTML(sHTML, sDimensions, sTitle); }
function showModelessDialog(sHTML, sDimensions, sTitle) { return alertHTML(sHTML, sDimensions, "pretend this dialog has no buttons because thats the definition of showModelessDialog lol" + sTitle); }
function alertTextArea(sString, sDimensions, sTitle) { alertHTML("<textarea style='width:100%; height:250px;'>" + superhtmlEntities(sString) + "</textarea>", sDimensions, sTitle); }
function alertTextarea(sString, sDimensions, sTitle) { alertTextArea(sString, sDimensions, sTitle); }
function alertTextAreaS(sString, sDimensions, sTitle) { alertTextArea(JSON.stringify(sString), sDimensions, sTitle ); }

function toast(sString) { SpreadsheetApp.getActiveSpreadsheet().toast(sString, "toast()"); }
function sidebar(sHTML, sDimensions, sTitle) { //  This method does not suspend the server-side script while the sidebar is open. To communicate with the server-side script, the client-side component must make asynchronous callbacks using the google.script API for HtmlService. To close the sidebar programmatically, call google.script.host.close() on the client side of an HtmlService web app.
  if (!(sTitle)) { sTitle = "showSidebar"; }
  // Display a sidebar with custom HtmlService content.
  var htmlOutput = HtmlService
      .createHtmlOutput(sHTML)
      .setTitle(sTitle);
  SpreadsheetApp.getUi().showSidebar(htmlOutput);
}; function showSidebar(sHTML, sDimensions, sTitle) { return sidebar(sHTML, sDimensions, sTitle); };

/* END alerts/toast/debugging/polyfills/shims/shortcuts */


/* gsGET_SELECTEDgs */
/* BEGIN ?????? getgs_selectedCellToAVO, getgs_selectedToAVO, getgs_rangeToAVO/ARO, getgs_selectionTo1DArray, getgs_selectionTo1DArrayA1Notation, getgs_selectedToAVO/ARO_FIRSTROWASKEYS, getgs_selectedToAVO_MCandFR, getgs_selectedCellToEncoded, getgs_selectedCellToHTMLEntities, segmentRangesByColumn, getgs_SelectionFilteredToAVO, getgs_multiselectOSRish */


function updategs_swapValueWithComment() {
  // BEGIN to refactor into generic selection solution?
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  //var sheet = ss.getSheets()[0];
  sheet = ss;
  var selection = SpreadsheetApp.getActiveSpreadsheet().getSelection();
  var ranges = selection.getActiveRangeList().getRanges();
  aA1NotationArrays = [];
  for (var i = 0; i < ranges.length; i++) {
    aA1NotationArrays.push(GSDS_disjointedRangeToArray(ranges[i].getA1Notation()));
  }
  aA1NotationArrays = aA1NotationArrays.flat();
  // END to refactor into generic selection solution?
  aA1NotationArrays.forEach((sA1Notation, i)=>{
    // alertS(sA1Notation);
    var cell = sheet.getRange(sA1Notation);
    var sValue = cell.getValue();
    var sNote = cell.getNote();
    var sA1Notation = cell.getA1Notation();
    cell.setValue(sNote); 
    cell.setNote(sValue); 
  })
}


function getgs_selectedCellToAVO() {
  sA1Notation = SpreadsheetApp.getActiveSpreadsheet().getActiveCell().getA1Notation();
  sWorksheetName = getgs_worksheetname();
  return getgs_rangeToAVO(`${sWorksheetName}!` + GS_returnOuterRange(sA1Notation));
}; function alertgs_selectedCellToAVO() { alertTextArea(JSON.stringify(getgs_selectedCellToAVO()), "3000x2000", "aVO"); }
function getgs_selectedCellToARO() {
  return toRO(getgs_selectedCellToAVO());
}; function alertgs_selectedCellToARO() { alertTextArea(JSON.stringify(getgs_selectedCellToARO()), "3000x2000", "aRO"); }

function getgs_selectedToAVO() { // fix this bug / refactor the hardcode getSheetByName out of this customization. note2: IS THIS FLAT OR WHAT?  CONVERT THIS INTO PART OF getgs_selectedToARO() FAMILY OF FUNCTIONS?
    // this function assumes you're just grabbing non-sectional selections that isn't part of the first row, refactor into something more forwards compatible with any situash?
    // aFirstRow = SpreadsheetApp.getActive().getSheetByName("Partnumber/Matrix Template").getRange("A1:1").getValues()[0];
    // aRemainingRows = getgs_rangeToAVO(SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange())
    // return [aFirstRow].concat(aRemainingRows);
    var rRange = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange();
    // var aValuesOriented = toValuesOriented(getgs_rangeToARO(rRange)); // 6/30/2021 change request - get rid of toValuesOriented(getgs_rangeToARO()) in favor of getgs_rangeToAVO()
    // var aValuesOriented = getgs_rangeToAVO(rRange);
    return getgs_rangeToAVO(rRange);
    // alertHTML("<textarea style='width:100%; height:250px;'>var aVO = " + superhtmlEntities(JSON.stringify(aValuesOriented)) + "</textarea>");
    // return getgs_selectionTo1DArray();
}; function alertgs_selectedToAVO() { alertTextArea(JSON.stringify(getgs_selectedToAVO() )); }
function getgs_selectedToARO() { return toRO(getgs_selectedToAVO()) }; function alertgs_selectedToARO() { alertTextArea(JSON.stringify(getgs_selectedToARO() )); }

function getgs_rangeToAVO(rRange) { // getgs_sanitizeRange
    if (!(rRange)) { // if rRange is undefined, then get whole active spreadsheet?  or get selection from active spreadsheet?>?
      var ss = SpreadsheetApp.getActive(); // .getSheetByName('Netsuite Items');
      rRange = ss.getRange("A1:" + columnToLetter(ss.getLastColumn()) + ss.getLastRow());
    }
    rRange = getgs_sanitizeRange(rRange);
    
    aReturn = rRange.getValues().map(function(oEl) {
      return oEl.map(function(oEl2) {
        return (oEl2);
      });
    });
    
    return aReturn;
}; alertgs_rangeToAVO = function(rRange) { alertTextArea(JSON.stringify(getgs_rangeToAVO(rRange))); }
function getgs_rangeToARO(rRange) { return toRO(getgs_rangeToAVO(rRange)); }; alertgs_rangeToARO = function(rRange) { alertTextArea(JSON.stringify(getgs_rangeToARO(rRange))); }
//function getgs_selectedToARO() {
//  var rSelectedRange = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange();
//  return getgs_rangeToARO(rSelectedRange);
//}; function alertgs_selectedToARO() { // this assumes that first row in selection is in fact the columns
//  // alertHTML("<textarea style='width:100%; height:250px;'>var aRO = " + superhtmlEntities(JSON.stringify(getgs_selectedToARO())) + "</textarea>");
//  alertTextArea("var aRO = " + JSON.stringify(getgs_selectedToARO()) );
//}
function getgs_selectedToAVO_FIRSTROWASKEYS() {
  aFirstRowWhichIsActuallySecondRow = getgs_selectionTo2DArrayA1Notation()[0]
  sFirstColumn = cellToColumn(aFirstRowWhichIsActuallySecondRow[0]);
  sLastColumn = cellToColumn(aFirstRowWhichIsActuallySecondRow[aFirstRowWhichIsActuallySecondRow.length-1]);
  sAbsoluteFirstColumnRange = `${sFirstColumn}1:${sLastColumn}1`;
  aAbsoluteFirstRow = SpreadsheetApp.getActiveSpreadsheet().getRange(sAbsoluteFirstColumnRange).getValues()[0];
  aRemainingRows = getgs_rangeToAVO(SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange());
  return [aAbsoluteFirstRow].concat(aRemainingRows);
  // aFirstRow = SpreadsheetApp.getActiveSpreadsheet().getRange("A1:1").getValues()[0];
  // var rRange = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange();
  // var aValuesOriented = toValuesOriented(getgs_rangeToARO(rRange)); // 6/30/2021 change request - get rid of toValuesOriented(getgs_rangeToARO()) in favor of getgs_rangeToAVO()
  // var aValuesOriented = getgs_rangeToAVO(rRange);
  // alert("var aValuesOriented = " + JSON.stringify(aValuesOriented));
  // alertHTML("<textarea style='width:100%; height:250px;'>var aValuesOriented = " + JSON.stringify(aValuesOriented) + "</textarea>");
  // alertTextArea("var aValuesOriented = " + JSON.stringify(aValuesOriented) + ";");
}
function getgs_selectedToARO_FIRSTROWASKEYS() { return toRO(getgs_selectedToAVO_FIRSTROWASKEYS()); }
function alertgs_selectedToARO_FIRSTROWASKEYS() { alertTextArea("var aRO = " + JSON.stringify(getgs_selectedToARO_FIRSTROWASKEYS()) + ";\n"); }
function alertgs_selectedToAVO_FIRSTROWASKEYS() { alertTextArea("var aVO = " + JSON.stringify(getgs_selectedToAVO_FIRSTROWASKEYS()) + ";\n"); }

getgs_selectionTo1DArray = function() { // is this replacing getgs_selectedToAVO?  no I don't think so, but if so, refactor it out
  var ranges = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRangeList().getRanges();
  aSelection = [];
  if (ranges.length > 0) {
    for (var i = 0; i < ranges.length; i++) {
      aSelection = aSelection.concat(rangeToArray(ranges[i]));
    }
  }
  return aSelection;
}; alertgs_selectionTo1DArray = function() { alertTextArea(JSON.stringify(getgs_selectionTo1DArray())); }

getgs_selectionTo1DArrayA1Notation = function() { // is this replacing getgs_selectedToAVO?  no I don't think so, but if so, refactor it out
  var ranges = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRangeList().getRanges();
  aSelection = [];
  if (ranges.length > 0) {
    for (var i = 0; i < ranges.length; i++) {
      // rRange.getA1Notation()
      aSelection = aSelection.concat( GSDS_disjointedRangeToAVO(ranges[i].getA1Notation()).flat() );
    }
  }
  return aSelection;
};
getgs_selectionTo2DArrayA1Notation = function() {
  var ranges = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRangeList().getRanges();
  var sLastColumn = columnToLetter(SpreadsheetApp.getActiveSpreadsheet().getLastColumn()); var iLastRow = SpreadsheetApp.getActiveSpreadsheet().getLastRow();
  // confirm(ranges[0].getA1Notation()); 
  aSelection = [];
  if (ranges.length > 0) {
    for (var i = 0; i < ranges.length; i++) {
      sAbsoluteA1Notation = ranges[i].getA1Notation();
      // sAbsoluteA1Notation = "1:B1"; // works!
      // sAbsoluteA1Notation = "1:1"; // works!
      // sAbsoluteA1Notation = "1:B1,1"; // no funciona!
      sAbsoluteA1Notation = sAbsoluteA1Notation.replace(/(^|,)([0-9])(.*)/g, "$1A$2$3");
      sAbsoluteA1Notation = sAbsoluteA1Notation.replace(/(^.*:)([0-9])/g, "$1" + sLastColumn + "$2");
      // now do one for iLastRow
      
      // rRange.getA1Notation()
      aSelection = aSelection.concat( GSDS_disjointedRangeToAVO(sAbsoluteA1Notation) );
      //confirm(ranges[i].getA1Notation());
      //confirm(JSON.stringify(aSelection));
    }
  }
  return aSelection;
};

function getgs_selectedCellToA1Notation() {
  sA1Notation = SpreadsheetApp.getActiveSpreadsheet().getActiveCell().getA1Notation();
  sWorksheetName = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getName();
  return `${sWorksheetName}!${sA1Notation}`;
}


function getgs_selectedCellToEncoded() { return superencode ( SpreadsheetApp.getActiveSpreadsheet().getActiveCell().getValue() ); }; function alertgs_selectedCellToEncoded() { alertTextArea( getgs_selectedCellToEncoded() ); }
function getgs_selectedCellToHTMLEntities() { return superhtmlEntities ( SpreadsheetApp.getActiveSpreadsheet().getActiveCell().getValue() ) } 
function alertgs_selectedCellToHTMLEntities() { alertTextArea(getgs_selectedCellToHTMLEntities()); } 

function getgs_selectedToAVO_MCandFR() { // MC = multicolumn selection, FR = filtered rows (need to be REMOVED from getValues()
        // vs getgs_selectedToAVO() and vs getgs_selectedToAVO_FIRSTROWASKEYS() vs getgs_selectedToAVO_MCandFR()
        // ASSUMPTIONS - columns are selected (as opposed to rows being selected).  columns may or may not have a filter that will need to have rows eliminted from getValues()
        //
        // 
        // FIXED - fix bug where multicolumn selection only works when individually selecting each column
        // fix bug where filtered rows aren't filtered with good performance

        // getVisibleValues_() is some function from stackoverflow
        const getVisibleValues_ = (range) => {
                // sheet = range.getSheet().getName();
                sheet = range.getSheet();
                // confirm(range.getA1Notation());
                // /*
                   return range.getValues() 
                        .filter(
                                (_, rowIdx) =>
                                !sheet.isRowHiddenByFilter(rowIdx + 1) &&
                                !sheet.isRowHiddenByUser(rowIdx + 1)
                        ).map(e => {
                                return e[0]
                        }); 
                
                // */
                /*
                // return sheet.getFilter().getRange(range.getA1Notation())
                return sheet.getRange("A:E").getFilter().getHiddenValues()
                // return range.getFilter().getColumnFilterCriteria(range.getColumn()).getHiddenValues
                        // .getValues()
                        .map(e => {
                                return e[0]
                        }); // gotta include this since it's part of another solution that transposes the data
                 */      
        };

        // get ranges (eg: "A:A,C:C,D:D,E:F") - note how "E:F" is a multi-column range and needs to turn into two ranges (ie "E:E,F:F") for this solution to properly iterate thru the ranges
        var ranges = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRangeList().getRanges();

        aSelection = [];
        if (ranges.length > 0) {
                for (var i = 0; i < ranges.length; i++) {
                   // the next 2 lines checks to see if the range is multi-column; if so then re-create the ranges per column since this solution assumes that entire columns are selected
                   // consider refactoring this into ranges = getgs_normalizeRangesBySplittingMultiColumnRangesIntoTheirOwnIndividualRange(ranges) or something similarly titled??
                   sRangeA1Notation = ranges[i].getA1Notation();
                   confirm(sRangeA1Notation);
                   aRangeOfA1Notations = GSDS_disjointedRangeToArray(sRangeA1Notation.replace(/([A-Z]+)/g, "$11"))
                   if (aRangeOfA1Notations.length>1) {
                      aRangeOfA1Notations.forEach(sA1Notation => {
                         sColumn = sA1Notation.replace(/1/g, "");
                         range = SpreadsheetApp.getActiveSpreadsheet().getRange(sColumn + ":" + sColumn);
                         aSelection = aSelection.concat([getVisibleValues_(range)]);
                      })

                   } else {
                      aSelection = aSelection.concat([getVisibleValues_(ranges[i])]);
                   }
                }
        }

        aSelectionTransposed = _.zip.apply(_, aSelection);
        return aSelectionTransposed;
        // confirm(JSON.stringify(aSelectionTransposed));
        // confirm(JSON.stringify( getVisibleValues_(ranges[0]) ));
}
function segmentRangesByColumn(aRanges) { //  vs flattenRangesByRow?
        // segments ranges such as "B2:D5" to 3 new ranges: B2:B5, C2:C5 and D2:D5"
        // sA1Notation = "B2:C5"
        aNewRanges = [];
        ss = aRanges[0].getSheet();

        if (aRanges.length > 0) {    
          for (var i = 0; i < aRanges.length; i++) {
            sRangeA1Notation = aRanges[i].getA1Notation();
            // confirm(sRangeA1Notation);
            sColumn1 = sRangeA1Notation.match(/^([A-Z]*)/)[0];
            sRow1 = sRangeA1Notation.match(/([0-9]*)\:/)[1];
            sColumn2 = sRangeA1Notation.match(/\:([A-Z]*)/)[1];
            sRow2 = sRangeA1Notation.match(/([0-9]*)$/)[0];
      
            if (sRow1) {} else { sRow1 = "1"; } // if the A1Notation is "A:A" or "B:D" or some weird shit without rows, then make sRow1 just the first row
            if (sRow2) {} else { sRow2 = SpreadsheetApp.getActive().getLastRow(); } // if the A1Notation is "A:A" or "B:D" or some weird shit without rows, then get "literal" or "contextualized" A1Notation (with the PRECISE last row)
            
            if (sColumn1 != sColumn2) { // then split each column into its own range
                aSetOfRanges = GSDS_disjointedRangeToArray(sColumn1 + sRow1 + ":" + sColumn2 + sRow1).map(function(oEl, iIn) {
                    sCurrentColumn = columnToLetter(letterToColumn(sColumn1)+iIn);
                    sSegmentedA1Notation = oEl + ":" + sCurrentColumn + sRow2;
                    return ss.getRange(sSegmentedA1Notation);
                });
                aNewRanges = aNewRanges.concat(aSetOfRanges);
            } else {
                aNewRanges.push(aRanges[i]);
            }
          }
        }
        return aNewRanges;
}
function getgs_firstCellFromRanges(aRanges) { // vs getgs_FirstCellAmongArrayOfRanges? and getgs_LastCellAmongArrayOfRanges
  sFirstCell = "";
  sLastCell = "";
  // .match(/^[A-Z]*[0-9]*/)[0] // first cell in an A1Notation
  // .match(/\:([A-Z]*[0-9]*)$/)[1] // last cell in an A1Notation
  aRanges.forEach(function(oEl, iIn) {
    if (iIn == 0) {
      if (aRanges[0].getA1Notation().match(/^[A-Z]*\:[A-Z]*/)) { // if the A1Notation is "A:A" or "B:D" or some weird shit without rows, then get "literal" or "contextualized" A1Notation (with the PRECISE last row)
        sRow1 = "1"; 
        sColumn1 = aRanges[0].getA1Notation().match(/^[A-Z]*\:[A-Z]*/)[0].split(":")[0];
        sColumn2 = aRanges[0].getA1Notation().match(/^[A-Z]*\:[A-Z]*/)[0].split(":")[1];
        sLastRow = SpreadsheetApp.getActive().getLastRow();
        sFirstCell = sColumn1 + sRow1;
      } else {
        sFirstCell = aRanges[0].getA1Notation().match(/^[A-Z]*[0-9]*/)[0];
      }
    } else {
      sRangeA1Notation = aRanges[iIn].getA1Notation();
      sColumn1 = sRangeA1Notation.match(/^([A-Z]*)/)[0];
      sRow1 = sRangeA1Notation.match(/([0-9]*)\:/)[1];
      sCurrentFirstCell = sColumn1 + sRow1;
      // confirm(sCurrentFirstCell);
      if (subtractCells(sFirstCell, sCurrentFirstCell)[0] > 1) {
          sFirstCell = sCurrentFirstCell
          // second parameter is "first"
      } else {
          // first parameter is "first"
          // sFirstCell = sFirstCell;
          // console.log("first")
      }
    }
  })
  return sFirstCell;

}
function getgs_SelectionFilteredToAVO() { // fix bug where multicolumn selection only works when individually selecting each column
        // some function from stackoverflow // PROBLEM - THIS FUNCTION RUNS TOO SLOW. PROBLEM10DAYSLATER - WAIT THIS FUNCTION IS FAST AND DOESNT FUNCTION NOW, WTF?
        const getVisibleValues_ = (range) => {
                // sheet = range.getSheet().getName();
                sheet = range.getSheet();
                return range
                        .getValues()
                        .filter(
                                (_, rowIdx) =>
                                !sheet.isRowHiddenByFilter(rowIdx + 1) &&
                                !sheet.isRowHiddenByUser(rowIdx + 1)
                        ).map(e => {
                                return e[0]
                        }); // gotta include this since it's part of another solution that transposes the data
        };
        const getVisibleValues = function(range) { return range.getValues().map(e=>{return e[0]}) }

        var ranges = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRangeList().getRanges();
        // confirm(ranges.length);

        // segments ranges such as "B2:D5" to 3 new ranges: B2:B5, C2:C5 and D2:D5"
        ranges = segmentRangesByColumn(ranges);
        // confirm(ranges.length);
        // confirm(getFirstCellAmongArrayOfRanges(ranges));
        
        aSelection = [];
        if (ranges.length > 0) {
          for (var i = 0; i < ranges.length; i++) {
            sRangeA1Notation = ranges[i].getA1Notation();
            aSelection = aSelection.concat([getVisibleValues(ranges[i])]);
          }
        }

        aSelectionTransposed = _.zip.apply(_, aSelection);
        return aSelectionTransposed;
        // confirm(JSON.stringify(aSelectionTransposed));
        // confirm(JSON.stringify( getVisibleValues_(ranges[0]) ));
}

getgs_multiselectOSRish = function() { // added Dec 20 2021 - Jan 8 2022: a marriage between getgs_selectionTo1DArrayA1Notation and getgs_rangeToOSR
  var rRanges = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRangeList().getRanges();
  aSelection = [];
  if (rRanges.length > 0) {
    for (var i = 0; i < rRanges.length; i++) {
        var rRange = rRanges[i];
      // rRange.getA1Notation()
      // aSelection = aSelection.concat( GSDS_disjointedRangeToAVO(ranges[i].getA1Notation()).flat() );
      aSelection = aSelection.concat( getgs_rangeToOSR(rRange.getA1Notation()) );
    }
  }
  // return aSelection;
  // combine disjointed selected into a single OSRish object
  aMultiSelectOSRish = aSelection.reduce((a,e,i)=>{
      var aReturn = {...a,...e};
      aReturn.allcells = a.allcells.concat(e.allcells);
      if (a.range) {
          aReturn.range = a.range + "," + e.range;
      }
      aReturn.height = a.height;
      aReturn.width = a.width;
      aReturn.allcells_valuesoriented = a.allcells_valuesoriented;
  
      return aReturn;
  
  }, {allcells:[], height: "fix", width: "fix", allcells_valuesoriented: "fix", });

  // alertS((aMultiSelectOSRish));
  return aMultiSelectOSRish;
  //alert(JSON.stringify(StockStampingQ_TJO(aMultiSelectOSRish[aMultiSelectOSRish.allcells[0]].note))); // just test first one for now
}
/* END getgs_selectedCellToAVO, getgs_selectedToAVO, getgs_rangeToAVO, getgs_selectionTo1DArray, getgs_selectedToAVO_FIRSTROWASKEYS, getgs_selectedToAVO_MCandFR */

/* gsALERT_SELECTEDgs */
// alertgs_selectedCellHTMLified_unrendered, alertgs_selectedCQPify, getgs_selectedToEncodedARO, alertgs_selectedToAVOT, alertgs_selectedToFlatArray, alertgs_selectedToCartesianProduct, alertgs_selectedToCombinedString

function alertgs_selectedCellHTMLified_unrendered() {
  aCQPRO = toRO( getgs_selectedCellSurroundingAVO() );
  sTitle = aCQPRO[0]['label'];
  // alertHTML(CQPify(getgs_rangeToARO('scriptsnippets!' + GS_returnOuterRange('G30'))))
  alertTextArea(HTMLify(aCQPRO), undefined, sTitle)
}


function alertgs_selectedCQPify() {
  var aCQPRecordsOriented = getgs_selectedToARO_FIRSTROWASKEYS();
  alertTextArea(HTMLify(aCQPRecordsOriented), undefined, "raw html");
}

// function alertgs_selectedToARO_FIRSTROWASKEYS() {
//  alertTextArea("var aRecordsOriented = " + JSON.stringify(getgs_selectedToARO_FIRSTROWASKEYS) + ";");
// }
function getgs_selectedToEncodedARO() { // this assumes that first row in selection is in fact the columns
  var rSelectedRange = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange();
  var aRecordsOriented = getgs_rangeToARO(rSelectedRange);
  aRecordsOriented.forEach(function(oElement) {
    Object.keys(oElement).forEach(function(oElement000) {
        oElement[oElement000] = superencode(oElement[oElement000]);
    })
      return oElement; 
  })
  return aRecordsOriented;
  // alert("var aRecordsOrientedEncoded = " + JSON.stringify(aRecordsOriented));
  // alertHTML("<textarea style='width:100%; height:250px;'>var aROEncoded = " + JSON.stringify(aRecordsOriented) + "</textarea>");
}; function alertgs_selectedToEncodedARO() { alertTextArea("var aROEncoded = " + JSON.stringify(getgs_selectedToEncodedARO()) ); }

function alertgs_selectedToAVOT() {
  var rRange = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange();
  var aValuesOriented = toVO(getgs_rangeToARO(rRange));
  // alert("var aValuesOrientedTransposed = " + JSON.stringify(_.zip.apply(_, aValuesOriented)));
  alertHTML("<textarea style='width:100%; height:250px;'>var aVOT = " + JSON.stringify(_.zip.apply(_, aValuesOriented)) + "</textarea>");
}

function alertgs_selectedToFlatArray() {
  var selection = SpreadsheetApp.getActiveSpreadsheet().getSelection(); var ranges = selection.getActiveRangeList().getRanges();
  aArray = [];
  for (var i = 0; i < ranges.length; i++) {
      aArray = aArray.concat(rangeToArray(ranges[i]));
  }
  alertHTML("<textarea style='width:100%; height:250px;'>var aArray = " + JSON.stringify(aArray) + "</textarea>");
}

function alertgs_selectedToCartesianProduct() {
  var selection = SpreadsheetApp.getActiveSpreadsheet().getSelection(); var ranges = selection.getActiveRangeList().getRanges();
  aArrays = [];
  for (var i = 0; i < ranges.length; i++) {
      aArrays.push(rangeToArray(ranges[i]));
  }
  alertTextArea(toTabDelimited(cartesian(aArrays)));
}

function alertgs_selectedToCombinedStringWLINEBREAKS() { // britney
/*
  try {
    var selection = SpreadsheetApp.getActiveSheet().getSelection();
    var rRange = selection.getActiveRange();
  } catch(e) { var rRange = SpreadsheetApp.getActiveSheet().getCurrentCell();  confirm("working?") }
  // var selection = SpreadsheetApp.getActiveSpreadsheet().getSelection();
  // if (selection) { } else { confirm("wat");  }
  // var aValuesOriented = toVO(getgs_rangeToARO(rRange));
  var aValuesOriented = getgs_rangeToAVO(rRange);
  var sCombined = aValuesOriented.reduce(function(oAg, oEl) {
    oAg += oEl.reduce(function(oAg2, oEl2) {
       oAg2 += oEl2;
       return oAg2 + "\n\n";
    }, ""); return oAg;
  }, "");
  */
  alertHTML("<textarea style='width:100%; height:250px;'>" + getgs_selectionTo1DArray().join("\n\n") + "</textarea>");
}
function alertgs_selectedToCombinedString() { 
  alertHTML("<textarea style='width:100%; height:250px;'>" + getgs_selectionTo1DArray().join("") + "</textarea>");
}

/* gsVARIOUSSHORTIES */

function getCellObject() {
  getCellObjectSpecific("A1");
}
function getCellObjectSpecific(sCell) {
  rCell = SpreadsheetApp.getActiveSpreadsheet().getActiveCell();
  // rCell = SpreadsheetApp.getActiveSpreadsheet().getRange(sCell + ":" + sCell);
  // JSON.stringify(rCell);
  alertTextArea(JSON.stringify(rCell));
  // alertTextArea(JSON.stringify(rCell.getHeight()));
}
// added 7/15/2021
function getgs_rangeWidth(sRange) {  // getgs_rangeWidth("H47:J54");
  if (typeof(sRange) == "string") { var rRange = SpreadsheetApp.getActive().getRange(sRange); } else { var rRange = sRange; }
  return rRange.getWidth();
}
function getgs_rangeHeight(sRange) { // getgs_rangeHeight("H47:J54");
  if (typeof(sRange) == "string") { var rRange = SpreadsheetApp.getActive().getRange(sRange); } else { var rRange = sRange; }
  return rRange.getHeight();
}

/* gsFUNCTIONSSERVERgs */
/* FUNCTIONS WITH SERVER ACCESS! */

function evalgs_selected() {
  var rSelectionRange = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange();
  // sActiveRange = "A1:" + columnToLetter(rSelectionRange.getLastColumn()) + rSelectionRange.getLastRow();
  // var firstCell= SpreadsheetApp.getActiveSheet().getActiveSelection().getCell(1,1);
  sGottenRange = getgs_firstCellFromRanges(SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRangeList().getRanges());
  var firstCell = SpreadsheetApp.getActiveSpreadsheet().getRange(sGottenRange).getCell(1,1);
  
  var sA1Notation_server = rSelectionRange.getA1Notation();
  sEval = firstCell.getNote();
  if (sEval) { // selection is a solid grid, therefore eval the note onto the selection
    var aVO_server = getgs_rangeToAVO(rSelectionRange); // // CQPify's aVO_server vs evalgs_selected()'s aVO_server
    try { return eval(sEval) } catch(e) { toast(e) };       
  } else { // Selection can be anything (solid grid, scattered cells, solid column/row-selected,scattered column/row-selected), combine individual cells and eval whole thing?
    if(confirm("First Cell has no notation.  Pretend the notation are the cell contents and evaluate that instead?")) {
      var aArray = getgs_selectionTo1DArray();
      try { return eval(aArray.join("\n")) } catch(e) { toast(e) };
    }
  }
}; function alertevalgs_selected() { sReturn = evalgs_selected(); ((typeof(sReturn) == "string") ? alertTextArea(sReturn) : alertTextArea(JSON.stringify(sReturn)) ) }
function alertgs_selectedCellCQPified_rendered() { // move this to server access? edit: already here lol, renamed to CQPified instead of HTMLified
  aCQPRO = toRO( getgs_selectedCellSurroundingAVO() );
  // sHTMLCode = CQPify(aCQPRO);
  sTitle = aCQPRO[0]['label']; // refactored this on 10/9/2021, hopefully no bugs!
  // var sServer = aCQPRO.reduce((o, e, i) => { o+=e.server+"\n"; return o; }, "");
  // if (sServer) { eval(sServer); }
  var sHTMLCode = CQPify(aCQPRO); // refactored this on 10/9/2021, hopefully no bugs!
  alertHTML(sHTMLCode, "3000x2000", sTitle);  
}; function alertgs_selectedCellHTMLified_rendered() { return alertgs_selectedCellCQPified_rendered(); }

function getgs_selectedCellSurroundingAVO(sA1Notation) { // fix/refactor/tasks/TODO this function to allow worksheet name within A1Notation.  "distinguishWorksheetNameFromA1Notation"?
  if (!(sA1Notation)) { sA1Notation = SpreadsheetApp.getActiveSpreadsheet().getActiveCell().getA1Notation(); }
  sWorksheetName = getgs_worksheetname();
  return getgs_rangeToAVO(`${sWorksheetName}!` + GS_returnOuterRange(sA1Notation))
}
function getgs_CQPifiedSolutionIsland(sMatch) { // formerly alertgs_HTMLifiedSolution
  aCQPRO = getgs_rangeToARO("webapp!" + GS_returnOuterRange(getgs_quickAndDirtyLookup("webapp!A", sMatch)));
  // sHTMLCode = CQPify(aCQPRO);
  sTitle = aCQPRO[0]['label'];
  // var sServer = aCQPRO.reduce((o, e, i) => { o+=e.server+"\n"; return o; }, "");
  // if (sServer) { eval(sServer); }
  var sHTMLCode = CQPify(aCQPRO); // refactored this on 10/9/2021, hopefully no bugs!
  return sHTMLCode;
}; function alertgs_CQPifiedSolutionIsland(sMatch) { alertHTML(getgs_CQPifiedSolutionIsland(sMatch), "1000x2000", sTitle); }

function CQPify(aRO) { // renamed to CQPify: seems like HTMLify() is simple non-server resources, whereas CQPify() is w server access and "breaking the fourth wall"?
  var rSelectionRange = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange();  var sA1Notation_server = rSelectionRange.getA1Notation(); var aVO_server = getgs_rangeToAVO(rSelectionRange); // CQPify's aVO_server vs evalgs_selected()'s aVO_server
  sInitialVariables = `var sWorksheetName = "${getgs_worksheetname()}"; var aVO_server = JSON.parse(decodeURIComponent("${superencode(JSON.stringify(aVO_server))}")); var sA1Notation_server = ${JSON.stringify(sA1Notation_server)};\n`;
  (aRO[0].script ? aRO[0].script = sInitialVariables + aRO[0].script : aRO[0].script = sInitialVariables );
  
  // aRO.push( { "script": `var aVO_server = JSON.parse(decodeURIComponent("${superencode(JSON.stringify(aVO_server))}")); var sA1Notation_server = ${JSON.stringify(sA1Notation_server)}` } ); // add aVO_server and sA1Notation scripts here
  // (aRO[0].script ? aRO[0].script = "var aVO_server = JSON.parse(decodeURIComponent('" + JSON.stringify(aVO_server) + "'));var sA1Notation_server = " + JSON.stringify(sA1Notation_server) + ";\n" + aRO[0].script : aRO[0].script = "var aVO_server = JSON.parse(decodeURIComponent('" + superencode(JSON.stringify(aVO_server)) + "'));var sA1Notation_server = " + JSON.stringify(sA1Notation_server) + ";" );
  //   aRO.push([{ "server-globalvars": "aVO_server\nsA1Notation_server"}]); aRO = normalizeRecordsOriented(aRO);

  var sServer = aRO.reduce((o, e, i) => { o+=e.server+"\n"; return o; }, "");
  if (sServer) { eval(sServer); }
  
  var sServerGlobalVars = aRO.map(o=>o["server-globalvars"]?.trim()).join("\n").trim().split("\n").filter(o=>o).map(o=>{ return "var " + o + ` = JSON.parse(decodeURIComponent("${superencode(JSON.stringify(eval(o)))}")) `} ).join("\n").trim();
  // this try/catch removes the above's "?."
  //try {
  //  var sServerGlobalVars = aRO.map(o=>o["server-globalvars"].trim()).join("\n").trim().split("\n").filter(o=>o).map(o=>{ return "var " + o + ` = JSON.parse(decodeURIComponent("${superencode(JSON.stringify(eval(o)))}")) `} ).join("\n").trim();
  // } catch(e) {}
  
  if (sServerGlobalVars) {
      aRO.push({"script": sServerGlobalVars});
      aRO = normalizeRecordsOriented(aRO)
  }
  sHTMLCode = HTMLify(aRO);

  try {
    // var sServerPostHTMLification = aRO.map(o=>o["server-posthtmlification"]?.trim()).join("\n").trim();
    var sServerPostHTMLification = aRO.map(o=>o["server-posthtmlification"].trim()).join("\n").trim();
  } catch(e) {}
  if (sServerPostHTMLification) { eval(sServerPostHTMLification); }

  return sHTMLCode;
}; function CQPifyWithServer(aRO) { return CQPify(aRO); }

// googlesheets formulas - I'm blurring the lines between macros and formulas here, so be careful
function EVALUATE(data, aVO_server, aVO_server2) {
  if (typeof(aVO_server) == "string") {aVO_server = [[aVO_server]]};
  if (typeof(aVO_server2) == "string") {aVO_server2 = [[aVO_server2]]};
  var sVO_server = aVO_server?.map(o=>o.join("\t")).join("\n");
  var sVO_server2 = aVO_server2?.map(o=>o.join("\t")).join("\n");

  try {
    aVO_server = _REMOVEEMPTYROWS(aVO_server); aVO_server2 = _REMOVEEMPTYROWS(aVO_server2);
  } catch(e) {}
  return eval(data);
}
function EVALUATES(data, aVO_server, aVO_server2) { return JSON.stringify(EVALUATE(data, aVO_server, aVO_server2)); }
/* END FUNCTIONS WITH SERVER ACCESS */

/* gsGETgs - getActiveSheet, getgs_sheetToEncodedARO, functionFunction, activeSheetFunction, selectedCellsFunctionRecordsOriented, selectedCellsFunction, selectedCellsFunctionHTMLTable */
/* BEGIN "get" functions (for menu) */

function getActiveSheet(sInstruction) { // consider getting rid of this now that we have getgs_sheetToARO()?
  // getActiveSheet("noalert")
  var ss = SpreadsheetApp.getActive(); // .getSheetByName('Netsuite Items');
  activeRange = ss.getRange("A1:" + columnToLetter(ss.getLastColumn()) + ss.getLastRow());
  aRecordsOriented = getgs_rangeToARO(activeRange);
  //var ss = SpreadsheetApp.getActiveSpreadsheet();
  //var selection = SpreadsheetApp.getActiveSpreadsheet().getSelection();
  // var activeRange = selection.getActiveRange();
  // var aRecordsOriented = getgs_rangeToARO(activeRange);
  if (sInstruction != "noalert") {
    // alertHTML("<textarea style='width:100%; height:250px;'>var aRO = " + JSON.stringify(aRecordsOriented) + "</textarea>");
    alertTextArea("var aRO = " + JSON.stringify(aRecordsOriented) + ";\n");
  }
  return aRecordsOriented;
}

function getgs_sheetToEncodedARO(sWorksheetName) {
  sWorksheetName = getgs_worksheetname(sWorksheetName)
  activeRange = getgs_worksheetNameToFullRange(sWorksheetName);
  aRecordsOriented = getgs_rangeToARO(activeRange);
  aRecordsOriented.forEach(function(oElement) {
    Object.keys(oElement).forEach(function(oElement000) {
        oElement[oElement000] = superencode(oElement[oElement000]);
    })
      return oElement; 
  }) 
  return aRecordsOriented;
}; function alertgs_sheetToEncodedARO() { alertTextArea(JSON.stringify(getgs_sheetToEncodedARO())); } 

function functionFunction(aRecordsOriented, sWhereToDumpData) {
  
  var sIntegerColumns = Object.keys(aRecordsOriented[0]).reduce(function(agg000, oElement000, iIndex000) {
    return agg000 + "\n" + iIndex000 + "-" + oElement000;
  }, "");
  
  var sExampleInstructions = "\n\n" + 'explode 1 ";"\n0  1 listagg-sum\nmelt 0,1\nmelt -1,2\n';
  var sInstruction = prompt(sIntegerColumns + "\n\nOkay you want to perform a function on the selected cells? eg: " +sExampleInstructions + "\n Enter function here: ");
  
  if (sInstruction != "" && sInstruction != undefined && sInstruction != null) {
    var sCommand = sInstruction.split(" ")[0];
    sCommand = sCommand.toLowerCase().trim();

    if (sCommand == "melt") {

      var sColumns = sInstruction.split(" ")[1];
      
      //INVERSE COLUMNS sColumns =  "-1,2";
      if (sColumns[0] == "-") { // then inverse list of columns
        sColumns = sColumns.slice(1, sColumns.length);
        aColumns = Object.keys(aRecordsOriented[0]).map(function(oElement098, iIndex098) { return iIndex098.toString() })
        sColumns.split(",").forEach(function(oElement098) {
          aColumns.splice( aColumns.indexOf(oElement098), 1)
        })
      } else { aColumns = sColumns.split(","); }
      sColumns = aColumns.join(",")
      
      var sEvaluation = sCommand + "(aRecordsOriented, [" + sColumns + "])";
      var aManipulatedData = eval(sEvaluation);
    } else if (sCommand == "explode") { // refractor this solution because slice 2, 1000 is kinda a hack // also refractor explode() since it errors out when a value can't be exploded
      // var sEvaluation = sInstruction.split(" ")[0] + "(aRecordsOriented, [" + sInstruction.split(" ")[1] + "], " + sInstruction.split(" ")[2] + ")";
      var sEvaluation = sCommand + "(aRecordsOriented, [" + sInstruction.split(" ")[1] + "], " + sInstruction.split(" ").slice(2, 1000).join(" ") + ")";
      var aManipulatedData = eval(sEvaluation);
    } else if (sCommand == "t") { // transpose
      aManipulatedData = toRO(_.zip.apply(_, toVO(aRecordsOriented) ) );
      
    } else { // assume it's a pivottable() function
      var aInstruction = sInstruction.split(" ");
      var sEvaluation = "pivottable(aRecordsOriented, [ [" + aInstruction[0] + "], [" + aInstruction[1] + "], [" + aInstruction[2] + "], [" + "\"" + aInstruction[3].split(",").join("\",\"") + "\"" + "] ]);"
      var aManipulatedData = eval(sEvaluation);
    }
    
    if(sWhereToDumpData == "endOfCurrentSheet") {
      var sNameOfSpreadsheetToDumpDataInto = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getName()

    } else if (sWhereToDumpData == "newSheet") {
      //var yourNewSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Name of your new sheet");
      
      //if (yourNewSheet != null) {
      //  SpreadsheetApp.getActiveSpreadsheet().deleteSheet(yourNewSheet);
      //}
      sNameOfSpreadsheetToDumpDataInto = "Name of your new sheet";
      yourNewSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
      yourNewSheet.setName(sNameOfSpreadsheetToDumpDataInto);
    } else if (sWhereToDumpData == "popupHTML") {

    } else if (sWhereToDumpData == "popupTextArea") {
      sEncodedJavascript = '%0Afunction%20fauxcopy(sString)%7B%0A%20%20var%20aux%20%3D%20document.createElement(%22textarea%22)%3B%0A%20%20aux.setAttribute(%22contentEditable%22%2C%20true)%3B%0A%20%20%2F%2F%20aux.innerHTML%20%3D%20sString%3B%0A%20%20aux.value%20%3D%20sString%3B%0A%20%20aux.setAttribute(%22onfocus%22%2C%20%22document.execCommand(%27selectAll%27%2Cfalse%2Cnull)%22)%3B%20%0A%20%20document.body.appendChild(aux)%3B%0A%20%20aux.focus()%3B%0A%20%20document.execCommand(%22copy%22)%3B%0A%20%20document.body.removeChild(aux)%3B%0A%7D%0Asuperencode%20%3D%20function%20(str)%7B%20%20return%20encodeURIComponent(str).replace(%2F%27%2Fg%2C%20%22%2527%22)%3B%20%7D%0AtoDelimited%20%3D%20function(aInputArray%2C%20sDelimiter%2C%20sQualifier)%20%7B%20function%20returnAllKeysAmongAllObjectsInRecordsOrientedArray(aRecordsOriented)%20%7B%20return%20aRecordsOriented.reduce(function(agg%2C%20oElement313)%20%7B%20agg%20%3D%20agg.concat(Object.keys(oElement313))%3B%20agg%20%3D%20unique(agg)%3B%20return%20agg%3B%20%7D%2C%20%5B%5D)%20%7D%20var%20aColumns%20%3D%20returnAllKeysAmongAllObjectsInRecordsOrientedArray(aInputArray)%3B%20return%20aInputArray.reduce(function(agg%2C%20oElement)%20%7B%20return%20agg%20%2B%20%22%0A%22%20%2B%20aColumns.filter(function(oElement777)%20%7B%20return%20oElement777.trim()%20!%3D%20%22%22%20%7D).reduce(function(agg001%2C%20oElement001%2C%20iIndex001)%20%7B%20return%20agg001%20%2B%20((iIndex001%20%3D%3D%200)%20%3F%20%22%22%20%3A%20sDelimiter)%20%2B%20sQualifier%20%2B%20((oElement%5BoElement001%5D%20%3D%3D%20undefined%20%3F%20%22%22%20%3A%20oElement%5BoElement001%5D)).toString().replace(%2F%0D%0A%2Fg%2C%20%22%3Cbr%3E%22).replace(%2F%0A%2Fg%2C%20%22%3Cbr%3E%22)%20%2B%20sQualifier%3B%20%7D%2C%20%22%22)%20%7D%2C%20aColumns.map(function(oElement002)%20%7B%20return%20sQualifier%20%2B%20oElement002%20%2B%20sQualifier%3B%20%7D).join(sDelimiter))%20%7D%0AtoTabDelimited%20%3D%20function(aInputArray%2C%20sQualifier)%20%7B%20if%20(sQualifier%20%3D%3D%20undefined)%20%7B%20sQualifier%20%3D%20%22%22%20%7D%20return%20toDelimited(aInputArray%2C%20%22%09%22%2C%20sQualifier)%3B%20%7D%0Aunique%20%3D%20function(aArray)%20%7B%20var%20a%20%3D%20%5B%5D%3B%20for%20(var%20i%3D0%2C%20l%3DaArray.length%3B%20i%3Cl%3B%20i%2B%2B)%20if%20(a.indexOf(aArray%5Bi%5D)%20%3D%3D%3D%20-1)%20a.push(aArray%5Bi%5D)%3B%20return%20a%3B%20%7D%3B%0A%2F%2F%20fauxcopy(toTabDelimited(JSON.parse(decodeURIComponent(document.querySelectorAll(%22.RecordsOrientedArrayToHTML%22)%5B0%5D%5B%22dataset%22%5D.arecordsoriented))))%0Afauxcopy(document.querySelectorAll(%22textarea.arecordsoriented%22)%5B0%5D.value)%3B%0A%0Aalert(%22copied%20to%20clipboard!%22)'
      sHTMLButtonToCopyaRecordsOrientedData = "<input type='button' onClick='" + sEncodedJavascript + "' value='copy' />";
      alertHTML(sHTMLButtonToCopyaRecordsOrientedData + "<br /><textarea style='width:100%; height:250px;' class='arecordsoriented'>" + JSON.stringify(aManipulatedData) + "</textarea><br />" + sHTMLButtonToCopyaRecordsOrientedData );

    }
    
    if (sWhereToDumpData != "popupHTML") {
      putgs_AVOToRange (
        toVO(aManipulatedData),
        "A" + (SpreadsheetApp.getActiveSpreadsheet().getLastRow() + 2),
        sNameOfSpreadsheetToDumpDataInto
        );
    } else {
      sEncodedJavascript = 'eval(decodeURIComponent("function%20fauxcopy%28sString%29%7B%0A%20%20var%20aux%20%3D%20document.createElement%28%22textarea%22%29%3B%0A%20%20aux.setAttribute%28%22contentEditable%22%2C%20true%29%3B%0A%20%20%2F%2F%20aux.innerHTML%20%3D%20sString%3B%0A%20%20aux.value%20%3D%20sString%3B%0A%20%20aux.setAttribute%28%22onfocus%22%2C%20%22document.execCommand%28%27selectAll%27%2Cfalse%2Cnull%29%22%29%3B%20%0A%20%20document.body.appendChild%28aux%29%3B%0A%20%20aux.focus%28%29%3B%0A%20%20document.execCommand%28%22copy%22%29%3B%0A%20%20document.body.removeChild%28aux%29%3B%0A%7D%0Asuperencode%20%3D%20function%20%28str%29%7B%20%20return%20encodeURIComponent%28str%29.replace%28%2F%27%2Fg%2C%20%22%2527%22%29%3B%20%7D%0AtoDelimited%20%3D%20function%28aInputArray%2C%20sDelimiter%2C%20sQualifier%29%20%7B%20function%20returnAllKeysAmongAllObjectsInRecordsOrientedArray%28aRecordsOriented%29%20%7B%20return%20aRecordsOriented.reduce%28function%28agg%2C%20oElement313%29%20%7B%20agg%20%3D%20agg.concat%28Object.keys%28oElement313%29%29%3B%20agg%20%3D%20unique%28agg%29%3B%20return%20agg%3B%20%7D%2C%20%5B%5D%29%20%7D%20var%20aColumns%20%3D%20returnAllKeysAmongAllObjectsInRecordsOrientedArray%28aInputArray%29%3B%20return%20aInputArray.reduce%28function%28agg%2C%20oElement%29%20%7B%20return%20agg%20%2B%20%22%5Cn%22%20%2B%20aColumns.filter%28function%28oElement777%29%20%7B%20return%20oElement777.trim%28%29%20%21%3D%20%22%22%20%7D%29.reduce%28function%28agg001%2C%20oElement001%2C%20iIndex001%29%20%7B%20return%20agg001%20%2B%20%28%28iIndex001%20%3D%3D%200%29%20%3F%20%22%22%20%3A%20sDelimiter%29%20%2B%20sQualifier%20%2B%20%28%28oElement%5BoElement001%5D%20%3D%3D%20undefined%20%3F%20%22%22%20%3A%20oElement%5BoElement001%5D%29%29.toString%28%29.replace%28%2F%5Cr%5Cn%2Fg%2C%20%22%3Cbr%3E%22%29.replace%28%2F%5Cn%2Fg%2C%20%22%3Cbr%3E%22%29%20%2B%20sQualifier%3B%20%7D%2C%20%22%22%29%20%7D%2C%20aColumns.map%28function%28oElement002%29%20%7B%20return%20sQualifier%20%2B%20oElement002%20%2B%20sQualifier%3B%20%7D%29.join%28sDelimiter%29%29%20%7D%0AtoTabDelimited%20%3D%20function%28aInputArray%2C%20sQualifier%29%20%7B%20if%20%28sQualifier%20%3D%3D%20undefined%29%20%7B%20sQualifier%20%3D%20%22%22%20%7D%20return%20toDelimited%28aInputArray%2C%20%22%5Ct%22%2C%20sQualifier%29%3B%20%7D%0Aunique%20%3D%20function%28aArray%29%20%7B%20var%20a%20%3D%20%5B%5D%3B%20for%20%28var%20i%3D0%2C%20l%3DaArray.length%3B%20i%3Cl%3B%20i%2B%2B%29%20if%20%28a.indexOf%28aArray%5Bi%5D%29%20%3D%3D%3D%20-1%29%20a.push%28aArray%5Bi%5D%29%3B%20return%20a%3B%20%7D%3B%0Afauxcopy%28toTabDelimited%28JSON.parse%28decodeURIComponent%28document.querySelectorAll%28%22.RecordsOrientedArrayToHTML%22%29%5B0%5D%5B%22dataset%22%5D.arecordsoriented%29%29%29%29%0Aalert%28%22copied%20to%20clipboard%21%22%29"))'
      sHTMLButtonToCopyaRecordsOrientedData = "<input type='button' onClick='" + sEncodedJavascript + "' value='copy' />";
      alertHTML(sHTMLButtonToCopyaRecordsOrientedData + "<br />" + convertRecordsOrientedArrayToHTMLTable(aManipulatedData) + "<br />" + sHTMLButtonToCopyaRecordsOrientedData );
    }
    
  } else { alert("no input, therefore nothing performed."); }

  //alert(SpreadsheetApp.getActiveSpreadsheet().getLastRow());
  //alertTextArea(JSON.stringify(aManipulatedData));  
}

function activeSheetFunction() {
  var rSelectedRange = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange();
  var aRecordsOriented = getgs_rangeToARO(rSelectedRange);
  functionFunction(aRecordsOriented, "newSheet")
}

function selectedCellsFunctionRecordsOriented() {
  var rSelectedRange = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange();
  var aRecordsOriented = getgs_rangeToARO(rSelectedRange);
  functionFunction(aRecordsOriented, "popupTextArea"); // lololoo
}

function selectedCellsFunction() {
  var rSelectedRange = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange();
  var aRecordsOriented = getgs_rangeToARO(rSelectedRange);
  functionFunction(aRecordsOriented, "endOfCurrentSheet"); // wut
}

function selectedCellsFunctionHTMLTable() {
  var rSelectedRange = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange();
  var aRecordsOriented = getgs_rangeToARO(rSelectedRange);
  functionFunction(aRecordsOriented, "popupHTML"); // k
}
/* END "get" functions (for menu) */

/* gsPUTGSgs */

function putgs_appendAVOToWorksheet(aVO, sWorksheetName) {
  var {sA1Notation, sWorksheetName, sLastCell} = distinguishA1NotationFromWorksheet("A1", sWorksheetName);
  // putgs_AVOToRange(aVO, convertArrayToCell(addCells(sLastCell, [0,1] )), sWorksheetName)
  putgs_AVOToRange(aVO, convertArrayToCell([1, convertCellToArray(sLastCell)[1]+1]), sWorksheetName)
}

function putgs_prependAVOToWorksheet(aVO, sWorksheetName) {
  // insert aArray.length empty rows to top
  if (sWorksheetName) {
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sWorksheetName).insertRows(1, aVO.length+1);
  } else {
    SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().insertRows(1, aVO.length+1);
  }
  // getRange(1,aVO.length).forEach(o=>{ SpreadsheetApp.getActive().insertRowBefore(1); })
  putgs_AVOToRange(aVO, "A1", sWorksheetName)
}


function putgs_AVOToRange(aArray, sA1Notation, sWorksheetName) {
  // consider refactoring putgs_AVOToRange(aArray, sA1Notation, sWorksheetName) to allow putgs_AVOToRange(aArray, sWorksheetName) as parameters, and to assume "A1" if no second parameter?
  // the next line of code cannot be here because this creates a new worksheet for samples such as "putgs_AVOToRange(aVO, addA1Notation(sA1Notation_server, [0,1]));"
  // if ((SpreadsheetApp.getActive().getSheetByName(sWorksheetName))) { } else { updategs_createNewWorksheet(sWorksheetName); }
  oDistinguish = distinguishA1NotationFromWorksheet(sA1Notation, sWorksheetName);
  // the next line of code should be here because of the aforementioned bug with the creation of a new worksheet.
  sWorksheetName = oDistinguish.sWorksheetName;
  // confirm("sWorksheetName = " + sWorksheetName);
  if ((SpreadsheetApp.getActive().getSheetByName(sWorksheetName))) { } else { updategs_createNewWorksheet(sWorksheetName); }
  // alertHTML(JSON.stringify(oDistinguish));
  sA1Notation = oDistinguish.sA1Notation;
  sWorksheetName = oDistinguish.sWorksheetName;

  // if worksheet no existe then create new sheet
  // alertHTML("sWorksheetName name is " + sWorksheetName);
  // {sCell, sWorksheetName} = distinguishA1NotationFromWorksheet(sCell, sWorksheetName);
  // sample usage -  putgs_AVOToRange([1,2,3], "A2", "UPCs At-A-Glance");
  // sample usage -  putgs_AVOToRange([[1,2,3],[4,5,6]], "A2", "UPCs At-A-Glance").setFontWeight('bold');
  // sCell = "AR353";
  sColumn = sA1Notation.replace(/[0-9]*$/g, "")
  sRow = sA1Notation.replace(/^[A-Z]*/g, "")

  aArray = normalizeValuesOriented(aArray);
  //var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sWorksheetName);
  var ss = SpreadsheetApp.getActive().getSheetByName(sWorksheetName);

  var sGoogleSheetRange = sA1Notation + ":" + columnToLetter((Array.isArray(aArray[0]) ? aArray[0].length + letterToColumn(sColumn) -1 : letterToColumn(sColumn) )) + (aArray.length + parseInt(sRow) - 1);
  // hack when Array is 1 dimmensional, then always preesent it vertically
  if (!Array.isArray(aArray[0])) {  
    aArray = aArray.reduce(function(agg, oElement) {
      agg.push([oElement]);
      return agg;
    }, [])  
  }
  try {
    var rRange = ss.getRange(sGoogleSheetRange)
    return rRange.setValues(aArray).setNumberFormat("@"); // @ = Plain Text.    .setFontWeight('bold');
  } catch (e) {
    var rRange = ss.getRange(sA1Notation);
    rRange.setValue("ERROR\naArray.length = " + aArray.length + "\n" + "sGoogleSheetRange =" + sGoogleSheetRange + "\ne = " + JSON.stringify(e) );
  }
}

/* gsMULTISHEETSgs */

function getgs_multisheetsToARO() {
      // function sheetnms() {return SpreadsheetApp.getActiveSpreadsheet().getSheets().map(function(x) {return x.getName();});}
      var sSpreadsheets = SpreadsheetApp.getActiveSpreadsheet().getSheets().reduce(function(agg000, oElement) {
           agg000 += "+" + oElement.getName();
           return agg000;
      });
      // alert("only processing sponsorships+pandas+phptest, please manually change this in the MultisheetsToRecordsOriented code..");
 
      //sToProcessSpreadsheet = "sponsorships+pandas+phptest"
      // var sToProcessSpreadsheet = SpreadsheetApp.getUi().prompt("Which spreadsheets do you want to merge and generate aRecordsOriented from?\n\n\n" + sSpreadsheets).getResponseText();
      var sToProcessSpreadsheet = prompt("Which spreadsheets do you want to merge and generate aRecordsOriented from?\n\n\n" + sSpreadsheets);
      alert(sToProcessSpreadsheet);
  
      aRecordsOriented = sToProcessSpreadsheet.split("+").reduce(function(oAg, oEl) {
          oAg = oAg.concat(getgs_sheetToARO(oEl));
          return oAg;
      }, []);

      // normalizeRecordsOriented() may be faster than the hack below
      aRecordsOriented = toRO(toVO(aRecordsOriented));
      return aRecordsOriented; // alert("var aALLRecordsOriented = " + JSON.stringify(aRecordsOriented));
}; function alertgs_multisheetsToARO() { alertTextArea(JSON.stringify(getgs_multisheetsToARO())); } 

function getgs_multisheetsToAVO() {
      var sSpreadsheets = SpreadsheetApp.getActiveSpreadsheet().getSheets().reduce(function(agg000, oElement) {
           agg000 += "+" + oElement.getName();
           return agg000;
      });
      var sToProcessSpreadsheet = prompt("Which spreadsheets do you want to merge and generate aValuesOriented from?\n\n\n" + sSpreadsheets);
      aArray = sToProcessSpreadsheet.split("+").reduce(function(agg001, oElement001) {
          agg001 = agg001.concat(getWorksheetValuesOriented(oElement001));
          return agg001;
      }, []);

      alert("var aALLValuesOriented = " + JSON.stringify(aArray));
}; function alertgs_multisheetsToAVO() { alertTextArea(JSON.stringify(getgs_multisheetsToAVO())); }

/* gsUPDATE_REMOVE_GSgs */
/* BEGIN UPDATE/REMOVE FUNCTIONS */

function updategs_clearThisSheet(sSheet) {
  if ((SpreadsheetApp.getActive().getSheetByName(sSheet))) {
    SpreadsheetApp.getActive().getSheetByName(sSheet).getDataRange().clearContent();
  }
}
function updategs_createNewWorksheet(sName) { // rename to insertNewWorksheet? or make insertNewWorksheet the function that errors if worksheet already exists?
  if (sName == undefined) { sName = "NEWSHEET" + getYYYYMMDDHHMMSS(); }
  
  if ((SpreadsheetApp.getActive().getSheetByName(sName))) { // if sheet exists don't try to insertSheet.  Append or clear?
    updategs_clearThisSheet(sName);
  } else {
    // SAMPLE - createNewWorksheet('test' + getYYYYMMDDHHMMSS() )
    SpreadsheetApp.getActiveSpreadsheet().insertSheet().setName(sName);
    SpreadsheetApp.getActive().getSheetByName(sName).getRange("A1:Z26").setNumberFormat("@");  
  }

}
function updategs_selectedWithColor() {  
  var selection = SpreadsheetApp.getActive().getActiveSheet().getSelection(); var range = selection.getActiveRange();
  var numRows = range.getNumRows();
  var numCols = range.getNumColumns();
  var startRow = range.getRow();
  var startCol = range.getColumn();
  //Logger.log('row: ' + startRow); Logger.log('col: ' + startCol); Logger.log('num row: ' + numRows); Logger.log('num col: ' + numCols);
  // CONSIDER refractoring this to rRange.setValues() (fast?) instead of oCell.setValue() (slow!)
  for (var i = 0; i < numRows; i++) {
    for (var j = 0; j < numCols; j++) {
      //if ((startRow+i == okRow) || (startCol+j == okColumn)){
        //Logger.log('found: ' + i+' '+j);
        // alert(range.getCell(i+1,j+1).getBackground())  // .getFontColor() .setFontColor('#ffffff')
        oCell = range.getCell(i+1,j+1)
        oCell.setValue(oCell.getBackground());
        // alert(.getBackground())  // .getFontColor() .setFontColor('#ffffff')
        //.setValue('Hello')
      //}
    }
  } 
}

// Remove Empty Rows 
function updategs_removeEmptyRows(sWorksheetName) {
  sWorksheetName = getgs_worksheetname(sWorksheetName);
  var ss = SpreadsheetApp.getActive().getSheetByName(sWorksheetName);  
  var maxRows = ss.getMaxRows(); 
  var lastRow = ss.getLastRow();
  if (maxRows-lastRow != 0){
    ss.deleteRows(lastRow+1, maxRows-lastRow);
  }
}; function removeEmptyRows(sWorksheetName) { return updategs_removeEmptyRows(sWorksheetName); }
   
// Remove Empty Columns 
function updategs_removeEmptyColumns(sWorksheetName) {
  sWorksheetName = getgs_worksheetname(sWorksheetName);
  var ss = SpreadsheetApp.getActive().getSheetByName(sWorksheetName);
  var maxColumns = ss.getMaxColumns(); 
  var lastColumn = ss.getLastColumn();
  if (maxColumns-lastColumn != 0){
    ss.deleteColumns(lastColumn+1, maxColumns-lastColumn);
  }
}; function removeEmptyColumns(sWorksheetName) { return updategs_removeEmptyColumns(sWorksheetName); }

function updategs_removeEmptyRowsAndCols(sWorksheetName) {
  removeEmptyRows(sWorksheetName);
  removeEmptyColumns(sWorksheetName);
}; function removeEmptyRowsAndCols(sWorksheetName) { return updategs_removeEmptyRowsAndCols(sWorksheetName); }

//Remove All Empty Rows in the Entire Workbook
// from https://stackoverflow.com/questions/18679669/google-script-for-deleting-blank-or-unused-columns
// consider refractoring into removeEmptyRows?
function removeEmptyRowsALLXXX() {
  var ss = SpreadsheetApp.getActive();
  var allsheets = ss.getSheets();
  for (var s in allsheets){
    var sheet=allsheets[s]
    var maxRows = sheet.getMaxRows(); 
    var lastRow = sheet.getLastRow();
    if (maxRows-lastRow != 0){
      sheet.deleteRows(lastRow+1, maxRows-lastRow);
    }
  }
}

//Remove All Empty Columns in the Entire Workbook
// from https://stackoverflow.com/questions/18679669/google-script-for-deleting-blank-or-unused-columns
// consider refractoring into removeEmptyColumns?
function removeEmptyColumnsALLXXX() {
  var ss = SpreadsheetApp.getActive();
  var allsheets = ss.getSheets();
  for (var s in allsheets){
    var sheet=allsheets[s]
    var maxColumns = sheet.getMaxColumns(); 
    var lastColumn = sheet.getLastColumn();
    if (maxColumns-lastColumn != 0){
      sheet.deleteColumns(lastColumn+1, maxColumns-lastColumn);
    }
  }
}

function updategs_appendToMultisheets(oDataToSendToGS) { // eg { "worksheet1": aVO, "worksheet2": aVOMoreData, etc...
  Object.keys(oDataToSendToGS).forEach(function(sWorksheet) {
    var aVO = oDataToSendToGS[sWorksheet];
    if (sWorksheet.indexOf("!")>-1) { // allow sA1Notation for columns only (eg "snippets!B" )
        sA1NotationLastRow = sWorksheet.split("!")[1]?.toUpperCase().match(/[A-Z]*/g)[0]; if (sA1NotationLastRow) {} else {sA1NotationLastRow = "B";}
        sWorksheet = sWorksheet.split("!")[0];
    } else { sA1NotationLastRow = "D"; }

    if (!SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sWorksheet)) { SpreadsheetApp.getActiveSpreadsheet().insertSheet(sWorksheet); }
    sA1NotationLastRow = sA1NotationLastRow + (SpreadsheetApp.getActive().getSheetByName(sWorksheet).getLastRow()+1);
    putgs_AVOToRange(aVO, sA1NotationLastRow, sWorksheet);
  })
}

/* END UPDATE/REMOVE FUNCTIONS */

/* gsQUIRKYgs */
/* BEGIN QUIRKY GS-FORMULA-ONLY-RELATED FUNCTIONS THAT WILL NEVER BE NEEDED IN DATASCRIPTS/DOMSCRIPTS.JS */

function googlesheetsCustomFormula(aValues, sColumn) {
    // aArray = [1224, 1256, "ID"]; copy(googlesheetsCustomFormula(aArray, "A"))
    return "=OR(" + aValues.reduce(function(agg0, oElement0, iIndex0) {
        return agg0 + 'REGEXMATCH(TO_TEXT($' + sColumn + ':$' + sColumn + '), "^' + oElement0 + '$")' + ((iIndex0!=aValues.length-1) ? ", " : "" );
    }, "") + ")"
}
/* END QUIRKY GS-ONLY FUNCTIONS THAT WILL NEVER BE NEEDED IN DATASCRIPTS/DOMSCRIPTS.JS */

/* gsWRAPPERS4DATASCRIPTsgs: wrapper functions/classes around datascripts functions to assist with constructing formulas in googlesheets */
// gsPIVOT, gsEXPLODE, gsEXPLODEH, gsMELT, gsREMOVEEMPTYROWS, gsJOIN, gsTOVO, gsTOVOS, TORO, gsUNPIVOT
// BEGIN SPECIAL FUNCTIONS FROM OTHER DEVS OR FROM MYSELF
// PIVOT, EXPLODE AND MELT are googlesheets extensions of datascripts because I declared those functions differently (capitalized function names) that are inaccessible from formulas
// but I renamed them to gsPIVOT, gsEXPLODE, etc to reflect the need to keep gs-functions gs-only
// eg function EXPLODE () {} vs explode = function () {}

function gsPIVOT(data, sPivotInstructions, bReplaceColumnNames) {
  // gsPIVOT is javascriptic problem solving approach AOT Formulaic - =JOIN(";", IFNA(QUERY({G2:S37}, "SELECT Col1 WHERE Col3="& A3 & "", 0), "NO MATCH"))
  // gsPIVOT is javascriptic problem solving approach AOT Formulaic - =JOIN(";", IFNA(QUERY({G2:S37}, "SELECT Col1 WHERE Col3='"& A3 & "'", 0), "NO MATCH"))
  // gsPIVOT is javascriptic problem solving approach AOT Formulaic - =ArrayFormula(query(query({sort(QC_BACKEND!A3:B),if(len(QC_BACKEND!A3:A),row(QC_BACKEND!A3:A)-match(sort(QC_BACKEND!A3:A),sort(QC_BACKEND!A3:A),0),)},"Select Col1, max(Col2) where Col1 is not null group by Col1 Pivot Col3"),"Select * offset 1",0))
  // How to Aggregate Strings Using Query in Google Sheets https://infoinspired.com/google-docs/spreadsheet/aggregate-strings-using-query/
  return pivottable(data, sPivotInstructions, bReplaceColumnNames);  
}; function PIVOT(a,b,c) { return gsPIVOT(a,b,c) }
function gsEXPLODE(data, sColumns, sDelimiter) {
  if (sDelimiter) {} else { sDelimiter = "," }
  return explode(data, sColumns, sDelimiter);
}; function EXPLODE(a,b,c) { return gsEXPLODE(a,b,c) }
function gsEXPLODEH(data, sRows, sDelimiter) {
  if (sDelimiter) {} else { sDelimiter = "," }
  data = transpose(data);
  return transpose(((explode(data, sRows, sDelimiter))));
}; function EXPLODEH(a,b,c) { return gsEXPLODEH(a,b,c) }
function gsMELT(data, sColumns) {
  return melt(data, sColumns);
}; function MELT(a,b,c) { return gsMELT(a,b,c) }

// ES5 incompatible function REMOVEEMPTYROWS(data) { try { return data.filter(element => element.join("") != ""); } catch(e) { return data; } }
function gsREMOVEEMPTYROWS(data) {
  return _removeemptyrows(data);
  //try { return data.filter(function(o) { return o.join("") != ""; }) } catch(e) { return data; }
}; function _REMOVEEMPTYROWS(s) { return gsREMOVEEMPTYROWS(s);  }
/**
 * Join two tables using lodash-joins.js library functions
 *
 * @param {A1:D30} table A
 * @param {E1:J20} table B
 * @param {matching (multi-)column(s)} eg "id", "id;internalid", "first name,last name;First,Last", "first name,last name;fullname
 * @param {type} the name of the lodash-joins function, eg "hashInnerJoin", "hashFullOuterJoin", innerjoin" 
 * @param {"distance"[,...]} titleValue The title of pivot table values. Default "value".
 * @return The unpivoted table
 * @customfunction
 */
function gsJOIN(a,b,match,type,merger) { return _join(a,b,match,type,merger); }; function _JOIN(a,b,c,d,e) { return gsJOIN(a,b,c,d,e); }

/*
function _JOIN(a, b, match, type, merger) {
  // _.assign({}, leftRow, rightRow);
  // merger = (a: Row, b: Row): Row => assign({}, a, b)
  // aLodashJoinsFormula = toRO([["type","lodashJoins_formula"],["outer","hashFullOuterJoin"],["inner","hashInnerJoin"],["leftouter","hashLeftOuterJoin"],["leftsemi","hashLeftSemiJoin"],["leftanti","hashLeftAntiJoin"],["rightouter","hashRightOuterJoin"],["rightsemi","hashRightSemiJoin"],["rightanti","hashRightAntiJoin"],["h_outer","hashFullOuterJoin"],["h_inner","hashInnerJoin"],["h_leftouter","hashLeftOuterJoin"],["h_leftsemi","hashLeftSemiJoin"],["h_leftanti","hashLeftAntiJoin"],["h_rightouter","hashRightOuterJoin"],["h_rightsemi","hashRightSemiJoin"],["h_rightanti","hashRightAntiJoin"],["nl_outer","nestedLoopFullOuterJoin"],["nl_inner","nestedLoopInnerJoin"],["nl_leftouter","nestedLoopLeftOuterJoin"],["nl_leftsemi","nestedLoopLeftSemiJoin"],["nl_leftanti","nestedLoopLeftAntiJoin"],["nl_rightouter","nestedLoopRightOuterJoin"],["nl_rightsemi","nestedLoopRightSemiJoin"],["nl_rightanti","nestedLoopRightAntiJoin"],["sm_outer","sortedMergeFullOuterJoin"],["sm_inner","sortedMergeInnerJoin"],["sm_leftouter","sortedMergeLeftOuterJoin"],["sm_leftsemi","sortedMergeLeftSemiJoin"],["sm_leftanti","sortedMergeLeftAntiJoin"],["sm_rightouter","sortedMergeRightOuterJoin"],["sm_rightsemi","sortedMergeRightSemiJoin"],["sm_rightanti","sortedMergeRightAntiJoin"]]);
  aLodashJoinsFormula = toRO([["type","lodashJoins_formula"],["outer","hashFullOuterJoin"],["inner","hashInnerJoin"],["leftouter","hashLeftOuterJoin"],["leftsemi","hashLeftSemiJoin"],["leftanti","hashLeftAntiJoin"],["rightouter","hashRightOuterJoin"],["rightsemi","hashRightSemiJoin"],["rightanti","hashRightAntiJoin"]]);
  if (type) { type = type.toLowerCase(); } else { type = 'inner'; }; type = type.replace(/^\_\./, "").replace(/hash/g, "").replace(/nestedloop/g, "").replace(/sortedmerge/g, "");
  // if (type) {} else { type = '_.hashInnerJoin'; }; type = type.replace(/^\_\./, "");
  // es5 incompatible sType = findKey(aLodashJoinsFormula, "type", type)?.lodashJoins_formula;
  sType = (findKey(aLodashJoinsFormula, "type", type).lodashJoins_formula ? findKey(aLodashJoinsFormula, "type", type).lodashJoins_formula : undefined);
  if (sType) {} else { sType = '_.hashInnerJoin'; }; // sType = sType.replace(/^\_\./, "") // .replace(/hash/g, "").replace(/nestedloop/g, "").replace(/sortedmerge/g, "");;
  // type = sType;
  
  if (merger) {} else { merger = function(obj, leftRow, rightRow) { _.assign({}, leftRow, rightRow); } }
  // _.assign({}, leftRow, rightRow
  if (match.match(/\;/g)) { // ";" semicolon at the simplest level ("first;firstname") is a SINGLE column match where the column has different keys/columnnames between table A and table B 
    var match_a = match.split(";")[0];
    var match_b = match.split(";")[1];
  } else {
    var match_a = match;
    var match_b = match;
  }
  // a = REMOVEEMPTYROWS(a); b = REMOVEEMPTYROWS(b);
  if (isVO(a)) { a = toRO(_REMOVEEMPTYROWS(a)); } else { a = toRO(_REMOVEEMPTYROWS(toVO(a))); } // consider refactoring REMOVEEMPTYROWS to check for isVO?
  if (isVO(b)) { b = toRO(_REMOVEEMPTYROWS(b)); } else { b = toRO(_REMOVEEMPTYROWS(toVO(b))); }
  //if (typeof(match) == 'string') { 
  accessor_a = function (o) { // "," comma at the simplest level ("firstname,lastname;fullname") is a MULTI column match where the columns are concatenated in order to perform the match with a column (or multi columns) between table A and table B
    // return o[match_a];
    // es5 incompatible return match_a.split(",").map(o2=>o[o2]).join("-");
    return match_a.split(",").map(function(o2) { return o[o2]; }).join("-");
  } 
  accessor_b = function (o) {
    // return o[match_b];
    // es5 incompatible return match_b.split(",").map(o2=>o[o2]).join("-");
    return match_b.split(",").map(function(o2) { return o[o2]; }).join("-");
  }  
  //}
  sEv = `toVO(_.${sType}(a, accessor_a, b, accessor_b) )`;
  return eval(sEv);
  //return JSON.stringify(b);
  // return toVO(_.hashInnerJoin(a, accessor, b, accessor));
}
*/

function gsTOVO(data, aColumns) {
  data = eval(data);
  return toVO(data, aColumns);
}; function TOVO(a,b) { return gsTOVO(a,b); }
function gsTOVOS(data, aColumns) {
  data = eval(data);
  return JSON.stringify(toVO(data, aColumns));
}; function TOVOS(a,b) { return gsTOVOS(a,b); }
function gsTORO(data) {
  if (Array.isArray(data)) { } else { data = JSON.parse(eval(data)); } 
  return JSON.stringify(toRO(data));
}; function TORO(a) { return gsTORO(a); }
// unpivot comes from here
// https://www.benlcollins.com/spreadsheets/unpivot-in-google-sheets/
// https://gist.github.com/philippchistyakov/57390ec98dcaea4502fabc5a32242b3a
/**
 * Unpivot a pivot table of any size.
 *
 * @param {A1:D30} data The pivot table.
 * @param {1} fixColumns Number of columns, after which pivoted values begin. Default 1.
 * @param {1} fixRows Number of rows (1 or 2), after which pivoted values begin. Default 1.
 * @param {"city"} titlePivot The title of horizontal pivot values. Default "column".
 * @param {"distance"[,...]} titleValue The title of pivot table values. Default "value".
 * @return The unpivoted table
 * @customfunction
 */
 function gsUNPIVOT(data,fixColumns,fixRows,titlePivot,titleValue) {  
  var fixColumns = fixColumns || 1; // how many columns are fixed
  var fixRows = fixRows || 1; // how many rows are fixed
  var titlePivot = titlePivot || 'column';
  var titleValue = titleValue || 'value';
  var ret=[],i,j,row,uniqueCols=1;
  
  // we handle only 2 dimension arrays
  if (!Array.isArray(data) || data.length < fixRows || !Array.isArray(data[0]) || data[0].length < fixColumns)
    throw new Error('no data');
  // we handle max 2 fixed rows
  if (fixRows > 2)
    throw new Error('max 2 fixed rows are allowed');
  
  // fill empty cells in the first row with value set last in previous columns (for 2 fixed rows)
  var tmp = '';
  for (j=0;j<data[0].length;j++)
    if (data[0][j] != '') 
      tmp = data[0][j];
    else
      data[0][j] = tmp;
  
  // for 2 fixed rows calculate unique column number
  if (fixRows == 2)
  {
    uniqueCols = 0;
    tmp = {};
    for (j=fixColumns;j<data[1].length;j++)
      if (typeof tmp[ data[1][j] ] == 'undefined')
      {
        tmp[ data[1][j] ] = 1;
        uniqueCols++;
      }
  }
  
  // return first row: fix column titles + pivoted values column title + values column title(s)
  row = [];
    for (j=0;j<fixColumns;j++) row.push(fixRows == 2 ? data[0][j]||data[1][j] : data[0][j]); // for 2 fixed rows we try to find the title in row 1 and row 2
    for (j=3;j<arguments.length;j++) row.push(arguments[j]);
  ret.push(row);
    
  // processing rows (skipping the fixed columns, then dedicating a new row for each pivoted value)
  for (i=fixRows;i<data.length && data[i].length > 0;i++)
  {
    // skip totally empty or only whitespace containing rows
    if (data[i].join('').replace(/\s+/g,'').length == 0 ) continue;
    
    // unpivot the row
    row = [];
    for (j=0;j<fixColumns && j<data[i].length;j++)
      row.push(data[i][j]);
    for (j=fixColumns;j<data[i].length;j+=uniqueCols)
      ret.push( 
        row.concat([data[0][j]]) // the first row title value
        .concat(data[i].slice(j,j+uniqueCols)) // pivoted values
      );
  }

  return ret;
}; function UNPIVOT(a,b,c,d,e) { return gsUNPIVOT(a,b,c,d,e); }
// END EXTERNAL FUNCTIONS FROM OTHER DEVS


/* onOpen, forEachRangeCell, GETCOLOR, findTheLastRow, alertgs_slashnToslashslashn, alertgs_sizeOfCell, getgs_worksheetNameToFullRange, distinguishA1NotationFromWorksheet, rangeToArray */
/* ?googlesheets.gs! - where AVOs, AROs, OSRs, and HTMLifications reign supreme!

// BEGIN SAMPLE CUSTOMIZED MENU
function onOpen() {
  render_datascripts_menu();
   SpreadsheetApp.getUi()
      .createMenu('Custom Menu')
      .addItem('Custom Menu 1', 'custommenu1')
      .addItem('Custom Menu 2', 'custommenu2')
      .addSeparator()
      .addItem('Custom Menu 3', 'custommenu3')
      .addSeparator()
      .addSeparator()     
      .addSeparator()     
      .addSubMenu(SpreadsheetApp.getUi()
         .createMenu('Custom Submenu')
         .addItem('Custom Submenu 1', 'customsubmenu1')
       )
      .addToUi();       
}
// END SAMPLE CUSTOMIZED MENU - https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js

// QUESTIONS
// diff between SpreadsheetApp.getActiveSheet() & SpreadsheetApp.getActiveSpreadsheet()?
// diff between getMaxRow and getLastRow?
*/ 



function forEachRangeCell(range, f) {
// from https://stackoverflow.com/questions/13605213/iterate-over-range-append-string-to-each
  const numRows = range.getNumRows();
  const numCols = range.getNumColumns();

  for (let i = 1; i <= numCols; i++) {
    for (let j = 1; j <= numRows; j++) {
      const cell = range.getCell(j, i)
      f(cell)
    }
  }
}
function GETCOLOR(oCell) {
  return typeof(oCell) // .getA1Notation();
  // return oCell.getBackground();
  // getCell(row, column);
}
function alertgs_slashnToslashslashn() {
  confirm(getgs_selectedToAVO()[0][0].replace(/\\n/g, "\\\\n"));

}
function alertgs_sizeOfCell() {
  confirm("This cell has a size of " + getgs_selectedToAVO()[0][0].length);
}


function getgs_sanitizeRange(rRange) { // this converts a sRange to an rRange
  ((!(rRange)) ? rRange = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange() : "" );
  if (typeof(rRange) == "string") {
    if (rRange.match(/!/)) {       
       var { sA1Notation, sWorksheetName } = distinguishA1NotationFromWorksheet(rRange);
       rRange = SpreadsheetApp.getActive().getRange(sWorksheetName + "!" + sA1Notation);
    } else {
       if (rRange.match(/\:/)) {
         sWorksheetName = getgs_worksheetname();
         rRange = SpreadsheetApp.getActive().getSheetByName(sWorksheetName).getRange(rRange)
       } else {
         rRange = getgs_worksheetNameToFullRange(rRange);       
       }
    }
  } 
  return rRange;
}
function getgs_worksheetname(sWorksheetName) { if (sWorksheetName == "" || sWorksheetName == undefined || sWorksheetName == null) { var sWorksheetName = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getName(); }; return sWorksheetName; }
function getgs_worksheetName(sWorksheetName) { return getgs_worksheetname(sWorksheetName); }






function alertCheatSheet() {
  alertTextArea(`
                =ADDRESS(ROW(), COLUMN(), 4) // get current cell's A1Notation address
`)
}



function getgs_sheetName() {
  return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getName();
}

function encodeCellValue(sString){
  // SAMPLE USAGE sString = "pull C40 googlesheet cell CDD40 into variable"; encodeNotes(sString);
  // SAMPLE USAGE2 sString = "C40"; encodeNotes(sString);
  //STEP 1: EXTRACT CELL FROM STRING USING REGEX
  var re = /[A-Z]+[0-9]+/;
  var sCell = re.exec(sString)[0];

  //if (re.exec(sString) == null) { // if no match then assume the string is the name of the cell
  //  var sCell = sString;
  //} else { // else there's a match, then pull from that matching cell
  //  var sCell = re.exec(sString)[0];
  //}
  //STEP 2: GET CELL VALUE
  // SpreadsheetApp.getActiveSheet().getRange("A1").getValue()
  var sCellValue = SpreadsheetApp.getActiveSheet().getRange(sCell).getValue().trim();
  // superencode vs googlesheet's ENCODEURL - seems like ENCODEURL actually encodes apostrophe!
  return superencode(sCellValue);
}

function getFirstEmptyRow(ss) {
  // Gets first empty row in first column (alternative to SpreadsheetApp.getActiveSpreadsheet().getLastColumn(), which gets first empty row in amongst all columns
  // var spr = SpreadsheetApp.getActiveSpreadsheet();
  var column = ss.getRange('A:A');
  var values = column.getValues(); // get all data in one call
  var ct = 0;
  while ( values[ct][0] != "" ) {
    ct++;
  }
  return (ct);
}

function findTheLastRow(sSpreadsheet, sColumn, sFromStartingRow){
  // findTheLastRow("Men Rankings", "B", "5")  VS findTheLastRow("Men Rankings", "B");
  var ss = SpreadsheetApp.getActive().getSheetByName(sSpreadsheet);
  // https://stackoverflow.com/questions/44562592/google-script-get-last-row-of-specific-column
  if (sFromStartingRow == undefined) { sFromStartingRow = "1"; }
  var ui = SpreadsheetApp.getUi();
  // var ss = SpreadsheetApp.getActiveSpreadsheet();
  //var sheet = ss.getActiveSheet();
  // var range = sheet.getRange("B1:B").getValues();
  var range = ss.getRange(sColumn + sFromStartingRow + ":" + sColumn).getValues();
  var filtered_r = range.filter(String).length;
  iLastRow = filtered_r + parseInt(sFromStartingRow) - 1;
  return iLastRow;
  // alert("Column " + sColumn + "'s last cell is number: " + iLastRow + " and its value is: " + range[filtered_r - 1][0]);
}

function getgs_worksheetNameToFullRange(sWorksheetName) {
  sWorksheetName = getgs_worksheetname(sWorksheetName);
  // var ss = SpreadsheetApp.getActive().getSheetByName(sWorksheetName);
  // return ss.getRange("A1:" + columnToLetter(ss.getLastColumn()) + ss.getLastRow());
  return SpreadsheetApp.getActive().getSheetByName(sWorksheetName).getRange("A1:" + columnToLetter(SpreadsheetApp.getActive().getSheetByName(sWorksheetName).getLastColumn()) + SpreadsheetApp.getActive().getSheetByName(sWorksheetName).getLastRow());
}

function rangeToArray(rRange) { // vs getgs_1DArray or whatever-the-fk?
 return rRange.getValues().flat();
}

distinguishA1NotationFromWorksheet = function(sA1Notation, sWorksheetName) {
  try {
    sWorksheetName = getgs_worksheetname(sWorksheetName);
  
    if (sA1Notation.match(/!/)) {
      sWorksheetName = sA1Notation.match("(^.*)(!)")[1]; // vs sA1Notation.split("!")[0];
      sA1Notation = sA1Notation.match("(!)(.*$)")[2];
    }
  
    var ss = SpreadsheetApp.getActive().getSheetByName(sWorksheetName);
    var sLastColumn = columnToLetter(ss.getLastColumn()); var iLastRow = ss.getLastRow();
    if (sA1Notation.match(/:$/)) { // eg "F1:" -> "F1:last column last row"
        sA1Notation = sA1Notation.replace(/:$/, ":" + sLastColumn + iLastRow);
      // ss.getlastrow and getlastcolumn //columnToLetter(ss.getLastColumn()) + ss.getLastRow()
    }
    if (sA1Notation.match(/(^|,)([0-9])(.*)/g)) { // eg "1:F3" -> "A1:F3"
        sA1Notation = sA1Notation.replace(/(^|,)([0-9])(.*)/g, "$1A$2$3");
    }
    if (sA1Notation.match(/(^.*:)([0-9])/g)) { // eg "B2:3"
        sA1Notation = sA1Notation.replace(/(^.*:)([0-9])/g, "$1" + sLastColumn + "$2");
    }
    sLastCell = sLastColumn + iLastRow.toString()
    return {sA1Notation, sWorksheetName, sLastCell};
   } catch(e) { confirm("ERROR in distinguishA1NotationFromWorksheet() - perhaps sheet doesnt exist? " + e) } //   if ((SpreadsheetApp.getActive().getSheetByName(sWorksheetName))) { } else { updategs_createNewWorksheet(sWorksheetName); }
}

/* getgs_rangeToOSR, getgs_sheetToARO, getgs_sheetToAVO, getgs_A1NotationToAVO, getgs_quickAndDirtyLookup, getgs_selectedToHTMLTableWHeaderFooter, getgs_selectedToOSR, GS_returnOuterRange, shiftCellsInSmartRange, convertOSRToHTMLTable  */

function getgs_sheetToAVO(sWorksheetName) {
  sWorksheetName = getgs_worksheetname(sWorksheetName);
  // activeRange = getgs_worksheetNameToFullRange(sWorksheetName);
  aValuesOriented = getgs_rangeToAVO(getgs_worksheetNameToFullRange(sWorksheetName));
  return aValuesOriented;
}; function alertgs_sheetToARO() { alertTextArea("var aRO = " + JSON.stringify(getgs_sheetToAVO()) + ";\n"); }

function getgs_sheetToARO(sWorksheetName) {
  sWorksheetName = getgs_worksheetName(sWorksheetName)
  return toRO(getgs_sheetToAVO(sWorksheetName));
  // vs  return getgs_rangeToARO(getgs_worksheetNameToFullRange(sWorksheetName));
}; function alertgs_sheetToARO() { alertTextArea("var aRO = " + JSON.stringify(getgs_sheetToARO()) + ";\n"); }

// function getgs_activeSheetToAVO() {
//   getgs_A1NotationToAVO()
// }; 
function alertgs_activeSheetToAVO() {
  // alertTextArea(JSON.stringify(getgs_A1NotationToAVO()), undefined, "alertgs_activeSheetToAVO()"); // fixed on 1/24/22 -why getgs_A1NotationToAVO()???
  alertTextArea(JSON.stringify(getgs_sheetToAVO()), undefined, "alertgs_activeSheetToAVO()");
}
function alertgs_activeSheetToAVOIslands() {
  alertTextArea(JSON.stringify(aGet2DIslands(getgs_sheetToAVO())), undefined, "alertgs_activeSheetToAVOIslands()");
}
function alertgs_activeSheetToAVOIslandAddresses() {
  alertTextArea(JSON.stringify(aGet2DIslandsRanges(getgs_sheetToAVO())), undefined, "alertgs_activeSheetToAVOIslandAddresses()");
}


function getgs_A1NotationToAVO(sA1Notation) {
  var {sA1Notation, sWorksheetName} = distinguishA1NotationFromWorksheet(sA1Notation);
  activeRange = SpreadsheetApp.getActive().getRange(sWorksheetName + "!" + sA1Notation);
  //if (sA1Notation) {
  //  activeRange = SpreadsheetApp.getActive().getRange(sA1Notation);
  //} else {
  //  activeRange = SpreadsheetApp.getActive().getRange("A1:" + columnToLetter(SpreadsheetApp.getActive().getLastColumn()) + SpreadsheetApp.getActive().getLastRow());
  //}
  return getgs_rangeToAVO(activeRange);
  // var ss = ; SpreadsheetApp.getActive()// .getSheetByName('Netsuite Items');
}
getgs_quickAndDirtyLookup = function(sA1NotationColumnOnly, sString) {
  // quick and dirty lookup uses the sA1NotationColumnOnly (always column "A") as the index column to match the sString on 
  sTable = sA1NotationColumnOnly.split("!")[0]
  sColumn = sA1NotationColumnOnly.split("!")[1];
  sA1Notation = sA1NotationColumnOnly + "1:" + sColumn;
  // sA1Notation = sA1NotationColumnOnly + "27:"; // switched all solutions to only look at webapp!A27: to assist with performance; also removed + sColumn because "A27:A" doesn't mean anything
  // getgs_quickAndDirtyLookup("html!A", "jexcel");
  // aVO = getgs_A1NotationToAVO("html!A1:A")
  // rMatch = new RegExp("jexcel");
  aVO = getgs_A1NotationToAVO(sA1Notation);
  // confirm(aVO.length);
  rMatch = new RegExp(sString);
  return sA1NotationColumnOnly + aVO.reduce((o, e, i) => {  ( (o==-1) && e[0].toString().match(rMatch) ? o=i+1 : "" ); return o;        }, -1).toString();
}


/* BEGIN oSmartRange functions */
// function getSelectedCellsToHTMLSteroidsNOIDS() {
//  //  getSelectedCellsToHTMLSteroids("noIDs");
//}

function getgs_selectedToHTMLTableWHeaderFooter () { 
  // getSelectedCellsToHTMLSteroids("", "headerfooter");
  sHTML = convertOSRToHTMLTable(getgs_selectedToOSR(false), "headerfooter" != "headerfooter");
  alertHTML("<br />" + sHTML + "<br /><br />" + "<textarea style='width:100%; height:250px'>" + superhtmlEntities(sHTML) + "</textarea>");
}
function getgs_selectedToOSR(bSimple) { // getgs_selectedToOSR-britn vs getSelectedCellsToHTMLSteroids-britn, convertOSRToHTMLTable
  // getActiveSheetToOSmartRange() 
  var rSelectedRange = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange();
  // sActiveRange = "A1:" + columnToLetter(rSelectedRange.getLastColumn()) + rSelectedRange.getLastRow();
  var firstCell= SpreadsheetApp.getActiveSheet().getActiveSelection().getCell(1,1);
  // sFirstCell = columnToLetter(firstCell.getColumn()) + firstCell.getRow();
  sFirstCell = columnToLetter(rSelectedRange.getCell(1,1).getColumn()) + rSelectedRange.getCell(1,1).getRow();
  sLastCell = columnToLetter(rSelectedRange.getLastColumn()) + rSelectedRange.getLastRow();
  sActiveRange = sFirstCell + ":" + sLastCell;
  //return firstCell;
  // alert( sActiveRange );
  oSmartRange = getgs_rangeToOSR(sActiveRange, bSimple);
  return oSmartRange; // alertTextArea("var oSmartRange = " + JSON.stringify(oSmartRange));  
}; function alertgs_selectedToOSR() { alertTextArea("var oSmartRange = " + JSON.stringify(getgs_selectedToOSR())); }

function getgs_rangeToOSR(sRange, bSimple) { // MAIN SMARTRANGE, getgs_rangeToOSR vs getSelectedCellsToHTMLSteroids?
  var aArray = [];
  var oSmartRange = {};
  if (typeof(sRange) == "string") {
    var aRange = getGoogleSheetRangeValuesOriented(sRange); // vs getGoogleSheetRangeValuesOriented vs getgs_rangeToAVO?  the former is a datascripts.js script! maybe rename it to getgs_A1NotationToAVO?
    var rRange = SpreadsheetApp.getActive().getRange(sRange);
  } else { var rRange = sRange; }
// function forEachRangeCell(range, f) {
  const numRows = rRange.getNumRows();
  const numCols = rRange.getNumColumns();

  // var bIncludeColumnWidthAndRowHeight = confirm("Include cells' column width and row height (performance problem)?");
  // var bIncludeMergedProperties = confirm("Include cells' merged properties? (also performance problem)?");
  var bIncludeColumnWidthAndRowHeight = true; // !(bSimple);
  var bIncludeMergedProperties = true; // !(bSimple);

  for (var i = 1; i <= numCols; i++) {
    for (var j = 1; j <= numRows; j++) {
      const cell = rRange.getCell(j, i);
      var sCellKey = aRange[j-1][i-1]; // eg "A1"
      var oObject = {};
      oObject[sCellKey] = cell;
      aArray.push( oObject );
      
      if (bIncludeColumnWidthAndRowHeight) {
        iGetColumnWidth = SpreadsheetApp.getActiveSpreadsheet().getColumnWidth(cell.getColumnIndex());
        iGetRowHeight = SpreadsheetApp.getActiveSpreadsheet().getRowHeight(cell.getRowIndex());
      } else {
        iGetColumnWidth = 100;
        iGetRowHeight = 24;
      }
      
      //sCellsAddress = 
      sFirstCell = columnToLetter(cell.getCell(1,1).getColumn()) + cell.getCell(1,1).getRow();
      //sLastCell = columnToLetter(rSelectedRange.getLastColumn()) + rSelectedRange.getLastRow();
      //sActiveRange = sFirstCell + ":" + sLastCell;
      var bIsPartOfMerge = false;
      //if (!bSimple) {
      bIsPartOfMerge = cell.isPartOfMerge();
      if (bIsPartOfMerge) {
        var sGetMergedRanges = cell.getMergedRanges()[0].getA1Notation();
        iColspan = cell.getMergedRanges()[0].getWidth();
        iRowspan = cell.getMergedRanges()[0].getHeight();
      } else {
        var iColspan = 1;
        var iRowspan = 1;
      }
      //}
      oSmartRange[sCellKey] = {
        gscell: cell, // gscell object
        // cells: columnToLetter(i) + j, // removed because it assumes "A1" is first cell; should be the same as sCellKey; consider refractoring merged cells into this solution
        note: cell.getNote(),
        comment: cell.getComment(),
        value: cell.getValue(),
        formula: cell.getFormula(),
        "background-color": ( !bSimple ? cell.getBackground() : "white"),
        "font-color": ( !bSimple ? cell.getFontColor() : "black"),
        isPartOfMerge: (bIsPartOfMerge ? sGetMergedRanges : false),
        // cells: sFirstCell, // should be the same as sCellKey; consider refractoring merged cells into this solution
        cells: (bIsPartOfMerge ? getGoogleSheetRange(sGetMergedRanges).join(";") : sFirstCell), // getGoogleSheetRange("H48:H51").join(";"),
        // getMergedRanges: sGetMergedRanges,  
        getColumnWidth: iGetColumnWidth,
        getRowHeight: iGetRowHeight,
        colspan: iColspan,
        rowspan: iRowspan,
      }; 
    }
  }
  
  oSmartRange.allcells = unique(Object.keys(oSmartRange).reduce(function(agg, oElement) {
    return agg.concat(oElement).concat(oSmartRange[oElement].cells.split(";") );
  },[])).sort(sortAlphaNum);
  
  // add width, height and valuesoriented final values to the oSmartRange object
  sRange = oSmartRange.allcells[0] + ":" + oSmartRange.allcells[oSmartRange.allcells.length-1];
  var iHeight = getgs_rangeHeight(sRange); // 1; // getgs_rangeHeight(sRange) // britney - do gsds math instead?
  var iWidth = getgs_rangeWidth(sRange); // 1; // getgs_rangeWidth(sRange)
  oSmartRange.height = iHeight;
  oSmartRange.width = iWidth;
  oSmartRange.range = sRange;
  oSmartRange.allcells_valuesoriented = getRange3(1, iHeight).map(function(oEl) {
    return getRange3(1, iWidth).map(function(oEl2) {
      return oSmartRange.allcells[iHeight * oEl2 - iHeight + oEl - 1];
    })
  });  

  return oSmartRange;
}; function alertgs_sheetToOSR(sWorksheetName) {
  // var ss = SpreadsheetApp.getActive(); // .getSheetByName('Netsuite Items');
  sWorksheetName = getgs_worksheetname(sWorksheetName);  
  sActiveRange = "A1:" + columnToLetter(ss.getLastColumn()) + ss.getLastRow();
  oSmartRange = getgs_rangeToOSR(sActiveRange);
  alertTextArea("var oSmartRange = " + JSON.stringify(oSmartRange));
}


/*
function getSelectedCellsToHTMLSteroids(bOption, sHeaderFooter) { // getgs_selectedToOSR-britn vs getSelectedCellsToHTMLSteroids-britn
  var sStyle = "";
  var sFooter = "";
  var sGSWorksheet = ""; // sGSWorksheet is the name of the "worksheet" (aka table id in html)
  bOption = confirm("IDs on each <td> or no IDs? ");
  // bOption = (bOption == "no");
    
  if (sHeaderFooter != "headerfooter") {
    if (!bOption) { sGSWorksheet = prompt("Please enter a worksheet name:");  } else { sGSWorksheet = ""; } 
  } else { sGSWorksheet = ""; }
  // bOption = (bOption == "noIDs");
  // sStyle = prompt("please enter styletag:");
  // bOption = "headerfooter";
  // alert(sGSWorksheet);
  var rSelectedRange = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange();
  var oSmartRange = getgs_rangeToOSR(rSelectedRange.getA1Notation());
  oSmartRange = shiftCellsInSmartRange(oSmartRange, "A1");
  sHTML = convertOSRToHTMLTable(oSmartRange, (sHeaderFooter == "headerfooter") );
  alertHTML("<br />" + sHTML + "<br /><br />" + "<textarea style='width:100%; height:250px'>" + superhtmlEntities(sHTML) + "</textarea>");
  // "<textarea style='width:100%; height:250px;'>" + sString + "</textarea>"
}
*/

function shiftCellsInSmartRange(oSmartRange, sCellStarter) {
  // perform shift towards A1
  aCellShift = subtractCells(oSmartRange.allcells[0], sCellStarter)
  ooSmartRange = JSON.parse(JSON.stringify(oSmartRange))
  ooSmartRange.allcells = oSmartRange.allcells.map(function(oElement) {
    return convertArrayToCell(subtractCells(oElement, aCellShift))
  })
  Object.keys(oSmartRange).filter(function(oElement00) { return oElement00.match(/[A-Z]+[0-9]+/) }).forEach(function(oElement000) {
    oSmartRange[oElement000].cells = oSmartRange[oElement000].cells.split(";").map(function(oElement) { return convertArrayToCell(subtractCells(oElement, aCellShift)) }).join(";")
  })
  
  Object.keys(oSmartRange).filter(function(oElement00) { return oElement00.match(/[A-Z]+[0-9]+/) }).forEach(function(oElement000) {
    delete ooSmartRange[oElement000];
  })
  
  Object.keys(oSmartRange).filter(function(oElement00) { return oElement00.match(/[A-Z]+[0-9]+/) }).forEach(function(oElement000) {
    ooSmartRange[convertArrayToCell(subtractCells(oElement000, aCellShift))] = oSmartRange[oElement000];
    // delete ooSmartRange[oElement000];
  })
  
  sRange = ooSmartRange.allcells[0] + ":" + ooSmartRange.allcells[ooSmartRange.allcells.length-1];
  var iHeight = getgs_rangeHeight(sRange)
  var iWidth = getgs_rangeWidth(sRange)
  ooSmartRange.heigth = iHeight;
  ooSmartRange.width = iWidth;
  ooSmartRange.range = sRange;
  ooSmartRange.allcells_valuesoriented = getRange3(1, iHeight).map(function(oEl) {
    return getRange3(1, iWidth).map(function(oEl2) {
      return ooSmartRange.allcells[iHeight * oEl2 - iHeight + oEl - 1];
    })
  });  
  return ooSmartRange;
}

function convertOSRToHTMLTable(oSR, bHeaderFooter) {
  var sTableID = ""; var sHeader = ""; var sFooter = "";
  // confirm(JSON.stringify(oSR));
  sHeader += oSR.allcells_valuesoriented[0].map(function(oEl) { return oSR[oEl].comment; }).join("");
  sFooter += oSR.allcells_valuesoriented[oSR.allcells_valuesoriented.length-1].map(function(oEl) { return oSR[oEl].comment; }).join("");
    
  if (bHeaderFooter) {
    sHeader += oSR.allcells_valuesoriented[0].map(function(oEl) { return oSR[oEl].value; }).join("");
    sFooter += oSR.allcells_valuesoriented[oSR.allcells_valuesoriented.length-1].map(function(oEl) { return oSR[oEl].value; }).join("");
    aIterable = oSR.allcells_valuesoriented.slice(1,oSR.allcells_valuesoriented.length-1);
  
  } else { aIterable = oSR.allcells_valuesoriented; }
  
  if (sHeader.match(/(id=)(\")?([a-zA-Z]*)/)) { // look for <!-- id="whatever" or id=whatever --> string in style tag
    sTableID = sHeader.match(/(id=)(\")?([a-zA-Z]*)/)[3]; // .replace(/[\W_]+/g," ")?
  } else {} 
  
  sHTML = sHeader + `<table id="${sTableID}">` + aIterable.map(function(oEl, iIn) {
    return "<tr>" + oEl.map(function(oEl2) { // oEl2 = sCellAddress
      if (oSR[oEl2].cells.indexOf(oEl2) == 0) { // if "J2".indexOf("J2;J3;J4") == 0
        iColspan = oSR[oEl2].colspan;
        iRowspan = oSR[oEl2].rowspan;
        sStyle='background-color:' + oSR[oEl2]["background-color"] + '; ';
        sStyle+='color:' + oSR[oEl2]["font-color"] + '; ';
        sStyle+='height:' + iRowspan * parseInt(oSR[oEl2]["getRowHeight"]) + 'px; ';
        sStyle+='width:' + iColspan * parseInt(oSR[oEl2]["getColumnWidth"]) + 'px; ';
        return "<td style='" + sStyle + "' colspan=" + iColspan + " rowspan=" + iRowspan + ">" + oSR[oEl2].value + "</td>";
      } else {
        return "";
      }
    }).join("") + "</tr>";
  }).join("") + "</table>" + sFooter
  
  return sHTML.replace(/ id\=\"\"/g, ""); // replace blank ids just in case!
}
/* END oSmartRange functions */

function GS_returnOuterRange(sCell) { // this returns the range that contains surrounding cells with data in them    
    // refactor this quickhack for tables!cell
    sWorksheetName = "";
    // confirm(sCell);
    if (sCell.match(/\!/)) { sWorksheetName = sCell.split("!")[0] + ""; sCell = sCell.split("!")[1] }
    sWorksheetName = getgs_worksheetname(sWorksheetName);
    // confirm(sTable);
    // sA1Notation = SpreadsheetApp.getActive().getActiveRange().getA1Notation();
    // sA1Notation.split(":")[0];
    var sA1NotationOuterRange = aGet2DIslandsRanges(getgs_sheetToAVO(sWorksheetName)).reduce((a,e,i)=>{
      // if (GSDS_disjointedRangeToAVO("A1:D4").flat().indexOf(sA1Notation) > -1) {
      if (GSDS_disjointedRangeToAVO(e).flat().indexOf(sCell) > -1) {
        a = e;
      } else {}    
        return a;
    }, "");
    return sA1NotationOuterRange;
    /* // pre 1/26/2022 changes
    iRow = convertCellToArray(sCell)[1];
    iRowUpper = iRow; iRowLower = iRow;
    do {
       iRowLower = iRowLower-1;
       aArray = getgs_rangeToAVO(sWorksheetName + `!A${iRowLower}:${iRowLower}`);
    } while ( aArray[0].filter(e => (e.toString().trim() != "") ).length != 0 )

    do {
       iRowUpper = iRowUpper+1;
       aArray = getgs_rangeToAVO(sWorksheetName + `!A${iRowUpper}:${iRowUpper}`);
       // toast(iRowUpper);
    } while ( aArray[0].filter(e => (e.toString().trim() != "") ).length != 0 )
    // confirm(`wat A${iRowLower+1}:${iRowUpper-1}`);
    return `A${iRowLower+1}:${iRowUpper-1}`
    */
}

/* CryptoJS's AES?gs */
var CryptoJS=CryptoJS||function(u,p){var d={},l=d.lib={},s=function(){},t=l.Base={extend:function(a){s.prototype=this;var c=new s;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
r=l.WordArray=t.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=p?c:4*a.length},toString:function(a){return(a||v).stringify(this)},concat:function(a){var c=this.words,e=a.words,j=this.sigBytes;a=a.sigBytes;this.clamp();if(j%4)for(var k=0;k<a;k++)c[j+k>>>2]|=(e[k>>>2]>>>24-8*(k%4)&255)<<24-8*((j+k)%4);else if(65535<e.length)for(k=0;k<a;k+=4)c[j+k>>>2]=e[k>>>2];else c.push.apply(c,e);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=u.ceil(c/4)},clone:function(){var a=t.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],e=0;e<a;e+=4)c.push(4294967296*u.random()|0);return new r.init(c,a)}}),w=d.enc={},v=w.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++){var k=c[j>>>2]>>>24-8*(j%4)&255;e.push((k>>>4).toString(16));e.push((k&15).toString(16))}return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j+=2)e[j>>>3]|=parseInt(a.substr(j,
2),16)<<24-4*(j%8);return new r.init(e,c/2)}},b=w.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++)e.push(String.fromCharCode(c[j>>>2]>>>24-8*(j%4)&255));return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j++)e[j>>>2]|=(a.charCodeAt(j)&255)<<24-8*(j%4);return new r.init(e,c)}},x=w.Utf8={stringify:function(a){try{return decodeURIComponent(escape(b.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return b.parse(unescape(encodeURIComponent(a)))}},
q=l.BufferedBlockAlgorithm=t.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=x.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,e=c.words,j=c.sigBytes,k=this.blockSize,b=j/(4*k),b=a?u.ceil(b):u.max((b|0)-this._minBufferSize,0);a=b*k;j=u.min(4*a,j);if(a){for(var q=0;q<a;q+=k)this._doProcessBlock(e,q);q=e.splice(0,a);c.sigBytes-=j}return new r.init(q,j)},clone:function(){var a=t.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});l.Hasher=q.extend({cfg:t.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){q.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,e){return(new a.init(e)).finalize(b)}},_createHmacHelper:function(a){return function(b,e){return(new n.HMAC.init(a,
e)).finalize(b)}}});var n=d.algo={};return d}(Math);
(function(){var u=CryptoJS,p=u.lib.WordArray;u.enc.Base64={stringify:function(d){var l=d.words,p=d.sigBytes,t=this._map;d.clamp();d=[];for(var r=0;r<p;r+=3)for(var w=(l[r>>>2]>>>24-8*(r%4)&255)<<16|(l[r+1>>>2]>>>24-8*((r+1)%4)&255)<<8|l[r+2>>>2]>>>24-8*((r+2)%4)&255,v=0;4>v&&r+0.75*v<p;v++)d.push(t.charAt(w>>>6*(3-v)&63));if(l=t.charAt(64))for(;d.length%4;)d.push(l);return d.join("")},parse:function(d){var l=d.length,s=this._map,t=s.charAt(64);t&&(t=d.indexOf(t),-1!=t&&(l=t));for(var t=[],r=0,w=0;w<
l;w++)if(w%4){var v=s.indexOf(d.charAt(w-1))<<2*(w%4),b=s.indexOf(d.charAt(w))>>>6-2*(w%4);t[r>>>2]|=(v|b)<<24-8*(r%4);r++}return p.create(t,r)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();
(function(u){function p(b,n,a,c,e,j,k){b=b+(n&a|~n&c)+e+k;return(b<<j|b>>>32-j)+n}function d(b,n,a,c,e,j,k){b=b+(n&c|a&~c)+e+k;return(b<<j|b>>>32-j)+n}function l(b,n,a,c,e,j,k){b=b+(n^a^c)+e+k;return(b<<j|b>>>32-j)+n}function s(b,n,a,c,e,j,k){b=b+(a^(n|~c))+e+k;return(b<<j|b>>>32-j)+n}for(var t=CryptoJS,r=t.lib,w=r.WordArray,v=r.Hasher,r=t.algo,b=[],x=0;64>x;x++)b[x]=4294967296*u.abs(u.sin(x+1))|0;r=r.MD5=v.extend({_doReset:function(){this._hash=new w.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(q,n){for(var a=0;16>a;a++){var c=n+a,e=q[c];q[c]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360}var a=this._hash.words,c=q[n+0],e=q[n+1],j=q[n+2],k=q[n+3],z=q[n+4],r=q[n+5],t=q[n+6],w=q[n+7],v=q[n+8],A=q[n+9],B=q[n+10],C=q[n+11],u=q[n+12],D=q[n+13],E=q[n+14],x=q[n+15],f=a[0],m=a[1],g=a[2],h=a[3],f=p(f,m,g,h,c,7,b[0]),h=p(h,f,m,g,e,12,b[1]),g=p(g,h,f,m,j,17,b[2]),m=p(m,g,h,f,k,22,b[3]),f=p(f,m,g,h,z,7,b[4]),h=p(h,f,m,g,r,12,b[5]),g=p(g,h,f,m,t,17,b[6]),m=p(m,g,h,f,w,22,b[7]),
f=p(f,m,g,h,v,7,b[8]),h=p(h,f,m,g,A,12,b[9]),g=p(g,h,f,m,B,17,b[10]),m=p(m,g,h,f,C,22,b[11]),f=p(f,m,g,h,u,7,b[12]),h=p(h,f,m,g,D,12,b[13]),g=p(g,h,f,m,E,17,b[14]),m=p(m,g,h,f,x,22,b[15]),f=d(f,m,g,h,e,5,b[16]),h=d(h,f,m,g,t,9,b[17]),g=d(g,h,f,m,C,14,b[18]),m=d(m,g,h,f,c,20,b[19]),f=d(f,m,g,h,r,5,b[20]),h=d(h,f,m,g,B,9,b[21]),g=d(g,h,f,m,x,14,b[22]),m=d(m,g,h,f,z,20,b[23]),f=d(f,m,g,h,A,5,b[24]),h=d(h,f,m,g,E,9,b[25]),g=d(g,h,f,m,k,14,b[26]),m=d(m,g,h,f,v,20,b[27]),f=d(f,m,g,h,D,5,b[28]),h=d(h,f,
m,g,j,9,b[29]),g=d(g,h,f,m,w,14,b[30]),m=d(m,g,h,f,u,20,b[31]),f=l(f,m,g,h,r,4,b[32]),h=l(h,f,m,g,v,11,b[33]),g=l(g,h,f,m,C,16,b[34]),m=l(m,g,h,f,E,23,b[35]),f=l(f,m,g,h,e,4,b[36]),h=l(h,f,m,g,z,11,b[37]),g=l(g,h,f,m,w,16,b[38]),m=l(m,g,h,f,B,23,b[39]),f=l(f,m,g,h,D,4,b[40]),h=l(h,f,m,g,c,11,b[41]),g=l(g,h,f,m,k,16,b[42]),m=l(m,g,h,f,t,23,b[43]),f=l(f,m,g,h,A,4,b[44]),h=l(h,f,m,g,u,11,b[45]),g=l(g,h,f,m,x,16,b[46]),m=l(m,g,h,f,j,23,b[47]),f=s(f,m,g,h,c,6,b[48]),h=s(h,f,m,g,w,10,b[49]),g=s(g,h,f,m,
E,15,b[50]),m=s(m,g,h,f,r,21,b[51]),f=s(f,m,g,h,u,6,b[52]),h=s(h,f,m,g,k,10,b[53]),g=s(g,h,f,m,B,15,b[54]),m=s(m,g,h,f,e,21,b[55]),f=s(f,m,g,h,v,6,b[56]),h=s(h,f,m,g,x,10,b[57]),g=s(g,h,f,m,t,15,b[58]),m=s(m,g,h,f,D,21,b[59]),f=s(f,m,g,h,z,6,b[60]),h=s(h,f,m,g,C,10,b[61]),g=s(g,h,f,m,j,15,b[62]),m=s(m,g,h,f,A,21,b[63]);a[0]=a[0]+f|0;a[1]=a[1]+m|0;a[2]=a[2]+g|0;a[3]=a[3]+h|0},_doFinalize:function(){var b=this._data,n=b.words,a=8*this._nDataBytes,c=8*b.sigBytes;n[c>>>5]|=128<<24-c%32;var e=u.floor(a/
4294967296);n[(c+64>>>9<<4)+15]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360;n[(c+64>>>9<<4)+14]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360;b.sigBytes=4*(n.length+1);this._process();b=this._hash;n=b.words;for(a=0;4>a;a++)c=n[a],n[a]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360;return b},clone:function(){var b=v.clone.call(this);b._hash=this._hash.clone();return b}});t.MD5=v._createHelper(r);t.HmacMD5=v._createHmacHelper(r)})(Math);
(function(){var u=CryptoJS,p=u.lib,d=p.Base,l=p.WordArray,p=u.algo,s=p.EvpKDF=d.extend({cfg:d.extend({keySize:4,hasher:p.MD5,iterations:1}),init:function(d){this.cfg=this.cfg.extend(d)},compute:function(d,r){for(var p=this.cfg,s=p.hasher.create(),b=l.create(),u=b.words,q=p.keySize,p=p.iterations;u.length<q;){n&&s.update(n);var n=s.update(d).finalize(r);s.reset();for(var a=1;a<p;a++)n=s.finalize(n),s.reset();b.concat(n)}b.sigBytes=4*q;return b}});u.EvpKDF=function(d,l,p){return s.create(p).compute(d,
l)}})();
CryptoJS.lib.Cipher||function(u){var p=CryptoJS,d=p.lib,l=d.Base,s=d.WordArray,t=d.BufferedBlockAlgorithm,r=p.enc.Base64,w=p.algo.EvpKDF,v=d.Cipher=t.extend({cfg:l.extend(),createEncryptor:function(e,a){return this.create(this._ENC_XFORM_MODE,e,a)},createDecryptor:function(e,a){return this.create(this._DEC_XFORM_MODE,e,a)},init:function(e,a,b){this.cfg=this.cfg.extend(b);this._xformMode=e;this._key=a;this.reset()},reset:function(){t.reset.call(this);this._doReset()},process:function(e){this._append(e);return this._process()},
finalize:function(e){e&&this._append(e);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(b,k,d){return("string"==typeof k?c:a).encrypt(e,b,k,d)},decrypt:function(b,k,d){return("string"==typeof k?c:a).decrypt(e,b,k,d)}}}});d.StreamCipher=v.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var b=p.mode={},x=function(e,a,b){var c=this._iv;c?this._iv=u:c=this._prevBlock;for(var d=0;d<b;d++)e[a+d]^=
c[d]},q=(d.BlockCipherMode=l.extend({createEncryptor:function(e,a){return this.Encryptor.create(e,a)},createDecryptor:function(e,a){return this.Decryptor.create(e,a)},init:function(e,a){this._cipher=e;this._iv=a}})).extend();q.Encryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize;x.call(this,e,a,c);b.encryptBlock(e,a);this._prevBlock=e.slice(a,a+c)}});q.Decryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize,d=e.slice(a,a+c);b.decryptBlock(e,a);x.call(this,
e,a,c);this._prevBlock=d}});b=b.CBC=q;q=(p.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,d=c<<24|c<<16|c<<8|c,l=[],n=0;n<c;n+=4)l.push(d);c=s.create(l,c);a.concat(c)},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255}};d.BlockCipher=v.extend({cfg:v.cfg.extend({mode:b,padding:q}),reset:function(){v.reset.call(this);var a=this.cfg,b=a.iv,a=a.mode;if(this._xformMode==this._ENC_XFORM_MODE)var c=a.createEncryptor;else c=a.createDecryptor,this._minBufferSize=1;this._mode=c.call(a,
this,b&&b.words)},_doProcessBlock:function(a,b){this._mode.processBlock(a,b)},_doFinalize:function(){var a=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){a.pad(this._data,this.blockSize);var b=this._process(!0)}else b=this._process(!0),a.unpad(b);return b},blockSize:4});var n=d.CipherParams=l.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),b=(p.format={}).OpenSSL={stringify:function(a){var b=a.ciphertext;a=a.salt;return(a?s.create([1398893684,
1701076831]).concat(a).concat(b):b).toString(r)},parse:function(a){a=r.parse(a);var b=a.words;if(1398893684==b[0]&&1701076831==b[1]){var c=s.create(b.slice(2,4));b.splice(0,4);a.sigBytes-=16}return n.create({ciphertext:a,salt:c})}},a=d.SerializableCipher=l.extend({cfg:l.extend({format:b}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);var l=a.createEncryptor(c,d);b=l.finalize(b);l=l.cfg;return n.create({ciphertext:b,key:c,iv:l.iv,algorithm:a,mode:l.mode,padding:l.padding,blockSize:a.blockSize,formatter:d.format})},
decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);return a.createDecryptor(c,d).finalize(b.ciphertext)},_parse:function(a,b){return"string"==typeof a?b.parse(a,this):a}}),p=(p.kdf={}).OpenSSL={execute:function(a,b,c,d){d||(d=s.random(8));a=w.create({keySize:b+c}).compute(a,d);c=s.create(a.words.slice(b),4*c);a.sigBytes=4*b;return n.create({key:a,iv:c,salt:d})}},c=d.PasswordBasedCipher=a.extend({cfg:a.cfg.extend({kdf:p}),encrypt:function(b,c,d,l){l=this.cfg.extend(l);d=l.kdf.execute(d,
b.keySize,b.ivSize);l.iv=d.iv;b=a.encrypt.call(this,b,c,d.key,l);b.mixIn(d);return b},decrypt:function(b,c,d,l){l=this.cfg.extend(l);c=this._parse(c,l.format);d=l.kdf.execute(d,b.keySize,b.ivSize,c.salt);l.iv=d.iv;return a.decrypt.call(this,b,c,d.key,l)}})}();
(function(){for(var u=CryptoJS,p=u.lib.BlockCipher,d=u.algo,l=[],s=[],t=[],r=[],w=[],v=[],b=[],x=[],q=[],n=[],a=[],c=0;256>c;c++)a[c]=128>c?c<<1:c<<1^283;for(var e=0,j=0,c=0;256>c;c++){var k=j^j<<1^j<<2^j<<3^j<<4,k=k>>>8^k&255^99;l[e]=k;s[k]=e;var z=a[e],F=a[z],G=a[F],y=257*a[k]^16843008*k;t[e]=y<<24|y>>>8;r[e]=y<<16|y>>>16;w[e]=y<<8|y>>>24;v[e]=y;y=16843009*G^65537*F^257*z^16843008*e;b[k]=y<<24|y>>>8;x[k]=y<<16|y>>>16;q[k]=y<<8|y>>>24;n[k]=y;e?(e=z^a[a[a[G^z]]],j^=a[a[j]]):e=j=1}var H=[0,1,2,4,8,
16,32,64,128,27,54],d=d.AES=p.extend({_doReset:function(){for(var a=this._key,c=a.words,d=a.sigBytes/4,a=4*((this._nRounds=d+6)+1),e=this._keySchedule=[],j=0;j<a;j++)if(j<d)e[j]=c[j];else{var k=e[j-1];j%d?6<d&&4==j%d&&(k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255]):(k=k<<8|k>>>24,k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255],k^=H[j/d|0]<<24);e[j]=e[j-d]^k}c=this._invKeySchedule=[];for(d=0;d<a;d++)j=a-d,k=d%4?e[j]:e[j-4],c[d]=4>d||4>=j?k:b[l[k>>>24]]^x[l[k>>>16&255]]^q[l[k>>>
8&255]]^n[l[k&255]]},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._keySchedule,t,r,w,v,l)},decryptBlock:function(a,c){var d=a[c+1];a[c+1]=a[c+3];a[c+3]=d;this._doCryptBlock(a,c,this._invKeySchedule,b,x,q,n,s);d=a[c+1];a[c+1]=a[c+3];a[c+3]=d},_doCryptBlock:function(a,b,c,d,e,j,l,f){for(var m=this._nRounds,g=a[b]^c[0],h=a[b+1]^c[1],k=a[b+2]^c[2],n=a[b+3]^c[3],p=4,r=1;r<m;r++)var q=d[g>>>24]^e[h>>>16&255]^j[k>>>8&255]^l[n&255]^c[p++],s=d[h>>>24]^e[k>>>16&255]^j[n>>>8&255]^l[g&255]^c[p++],t=
d[k>>>24]^e[n>>>16&255]^j[g>>>8&255]^l[h&255]^c[p++],n=d[n>>>24]^e[g>>>16&255]^j[h>>>8&255]^l[k&255]^c[p++],g=q,h=s,k=t;q=(f[g>>>24]<<24|f[h>>>16&255]<<16|f[k>>>8&255]<<8|f[n&255])^c[p++];s=(f[h>>>24]<<24|f[k>>>16&255]<<16|f[n>>>8&255]<<8|f[g&255])^c[p++];t=(f[k>>>24]<<24|f[n>>>16&255]<<16|f[g>>>8&255]<<8|f[h&255])^c[p++];n=(f[n>>>24]<<24|f[g>>>16&255]<<16|f[h>>>8&255]<<8|f[k&255])^c[p++];a[b]=q;a[b+1]=s;a[b+2]=t;a[b+3]=n},keySize:8});u.AES=p._createHelper(d)})();


/* getgsPOLYFILLSgs */

// seems like these two rangeToOSRs put out two different sets of data?
// rangeToOSmartRange=getgs_rangeToOSR;
function rangeToOSmartRange(sRange) {
    var aArray = [];
    var oSmartRange = {};
    if (typeof(sRange) == "string") {
      var aRange = getGoogleSheetRangeValuesOriented(sRange);
      var rRange = SpreadsheetApp.getActive().getRange(sRange);
    } else { var rRange = sRange; }
// function forEachRangeCell(range, f) {
  const numRows = rRange.getNumRows();
  const numCols = rRange.getNumColumns();

  //var bIncludeColumnWidthAndRowHeight = confirm("Include cells' column width and row height (performance problem)?");
  //var bIncludeMergedProperties = confirm("Include cells' merged properties? (also performance problem)?");

  var bIncludeColumnWidthAndRowHeight = false;
  var bIncludeMergedProperties = false;


  for (let i = 1; i <= numCols; i++) {
    for (let j = 1; j <= numRows; j++) {
      const cell = rRange.getCell(j, i);
      var sCellKey = aRange[j-1][i-1]; // eg "A1"
      var oObject = {};
      oObject[sCellKey] = cell;
      aArray.push( oObject );
      
      if (bIncludeColumnWidthAndRowHeight) {
        iGetColumnWidth = SpreadsheetApp.getActiveSpreadsheet().getColumnWidth(cell.getColumnIndex());
        iGetRowHeight = SpreadsheetApp.getActiveSpreadsheet().getRowHeight(cell.getRowIndex());
      } else {
        iGetColumnWidth = 100;
        iGetRowHeight = 24;
      }
      
      oSmartRange[sCellKey] = {
        gscell: cell, // gscell object
        cells: columnToLetter(i) + j, // should be the same as sCellKey; consider refractoring merged cells into this solution
        note: cell.getNote(),
        value: cell.getValue(),
        "background-color": cell.getBackground(),
        "font-color": cell.getFontColor(),
        isPartOfMerge: cell.isPartOfMerge(),
        getColumnWidth: iGetColumnWidth,
        getRowHeight: iGetRowHeight,
      }; 
    }
  }
  
  sortAlphaNum = function (a, b) { // converts ["A10", "A1", "A20"] to ["A1", "A10", "A20"]
    return a.localeCompare(b, 'en', { numeric: true });
  };
  
  oSmartRange.allcells = unique(Object.keys(oSmartRange).reduce(function(agg, oElement) {
    return agg.concat(oElement).concat(oSmartRange[oElement].cells.split(";") );
  },[])).sort(sortAlphaNum);
  
  return oSmartRange;
}



// domFETCHscripts => SubmitSuperNinjaForm,fetch_XMLHttpRequest,oGetAllParameters_CLIENT(), oSetAParameter_CLIENT
fetch_XMLHttpRequest=function(oHTTPMethodURLPayload) {
    superencode = function (str){  return encodeURIComponent(str).replace(/'/g, "%27"); }

    var sXMLHttpRequestResponseText = "";
    var xmlhttp = new XMLHttpRequest();
    return new Promise(function (resolve, reject) {
        xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            sXMLHttpRequestResponseText = this.responseText;
            // console.log(sXMLHttpRequestResponseText);
            /* my solution currently responds with html, so I need to parse out the body's innerText */
            var parser = new DOMParser();
            var domXMLHttpRequestResponseText = parser.parseFromString(sXMLHttpRequestResponseText, "text/html");
            //sXMLHttpRequestResponseText = domXMLHttpRequestResponseText.getElementsByTagName('body')[0].innerText;

            resolve(sXMLHttpRequestResponseText);
          } else {}
        };
        xmlhttp.open(oHTTPMethodURLPayload.type, oHTTPMethodURLPayload.url, true);
        var sParams;
        if (oHTTPMethodURLPayload.payload != undefined) {
            sParams = Object.keys(oHTTPMethodURLPayload.payload).map(function(oElement) {
                return superencode(oElement) + "=" + superencode(oHTTPMethodURLPayload.payload[oElement]);
            }).join("&");
        }

        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        // JSON SENDING DOESN'T WORK!  HELP!
        //xmlhttp.setRequestHeader("Content-type","application/json;charset=UTF-8");

        xmlhttp.send(sParams);
    })
// }.then(function(sResponse) {  console.log(sResponse.trim());  })
};

function SubmitSuperNinjaForm(oHTTPMethodURLPayload, sTarget) {
    // SubmitSuperNinjaForm("");
    // SubmitSuperNinjaForm({url: "", payload: "whatever"});
    // SubmitSuperNinjaForm({url: "", type: "POST", payload: {"wat": "whatever"}},  );
    // SubmitSuperNinjaForm({url: "", method: "POST", payload: {"wat": "whatever"}},  );
    superencode = function (str){  return encodeURIComponent(str).replace(/'/g, "%27"); }
          function oSetAParameter_CLIENT(e){"string"==typeof e&&(e={DOMContentLoaded:e});var t=window.location.origin+window.location.pathname;return oGetAllParameters_COPY=JSON.parse(JSON.stringify(oGetAllParameters_CLIENT())),Object.keys(e).forEach((t=>{console.log(t),oGetAllParameters_COPY[t]=e[t]})),t=t+"?"+Object.keys(oGetAllParameters_COPY).map((e=>e+"="+superencode(oGetAllParameters_COPY[e]))).join("&")}oGetAllParameters_CLIENT=function(e){if(e)var t="?"+e.split("?")[1];else t=location.search;return t.substring(1)?JSON.parse('{"'+t.substring(1).split("&").map((function(e){return-1==e.indexOf("=")?e+"=":e})).join("&").replace(/&/g,'","').replace(/=/g,'":"')+'"}',(function(e,t){return""===e?t:decodeURIComponent(t)})):{}};
    // BEGIN fuzzy parameters: assume a string oHTTPMethodURLPayload is a URL, and assume a string oHTTPMethodURLPayload.payload is an object with a .payload key
    if (typeof(oHTTPMethodURLPayload) == "string") { oHTTPMethodURLPayload = { url: oHTTPMethodURLPayload, method: "GET" }; };
    if (oHTTPMethodURLPayload.type) { oHTTPMethodURLPayload.method = oHTTPMethodURLPayload.type; }; oHTTPMethodURLPayload.method = oHTTPMethodURLPayload.method.toUpperCase();
    if (oHTTPMethodURLPayload.method != "GET" && oHTTPMethodURLPayload.method != "POST") { oHTTPMethodURLPayload.method = "GET" }; // research other browser-based methods?  UPSERT???
    // HTML forms support GET and POST. (HTML5 at one point added PUT/DELETE, but those were dropped.)
    // XMLHttpRequest supports every method, including CHICKEN, though some method names are matched against case-insensitively (methods are case-sensitive per HTTP) and some method names are not supported at all for security reasons (e.g. CONNECT).
    // Fetch API also supports any method except for CONNECT, TRACE, and TRACK, which are forbidden for security reasons.
    // Browsers are slowly converging on the rules specified by XMLHttpRequest, but as the other comment pointed out there are still some differences.
    
    if (typeof(oHTTPMethodURLPayload.payload)=="string") {
        oHTTPMethodURLPayload.payload = { payload: oHTTPMethodURLPayload.payload };
    } else {} // it's a good .payload.
    // END fuzzy parameters
    console.log(JSON.stringify(oHTTPMethodURLPayload.payload));

    if ((oHTTPMethodURLPayload == null) || (oHTTPMethodURLPayload == undefined) || (oHTTPMethodURLPayload == "")) {
       var oHTTPMethodURLPayload = { type:"POST" , payload: {script: 84, deploy: 1, context: "llave", payload: "just testing" } }; 
       var sURL = "https://www.acct138579ns.com/app/site/hosting/scriptlet.nl?script=84&deploy=1&context=llave";
       oHTTPMethodURLPayload.url = sURL;
    }    
    
    var dom_form = document.createElement('form');
    if (sTarget != false && sTarget != "false") { dom_form.setAttribute("target","_blank"); }
    // if (sTarget) { dom_form.setAttribute("target",sTarget); }
    dom_form.name = 'superninjaform';
    dom_form.id = 'superninjaform';
    dom_form.method = oHTTPMethodURLPayload.method;
    dom_form.action = ((oHTTPMethodURLPayload.url != undefined) ? oHTTPMethodURLPayload.url : window.location.href.split("?")[0] ); 
    document.body.appendChild(dom_form);
    // BEGIN bring URL parameters into payload (and bring payload into URL parameters or nah?)
    // NOTE - for GET: even if URL has parameters, I MUST oGetAllParameters_CLIENTize out the parameters and put them into the form.inputs because why?  IDK.  POST doesn't make me do this.  But to stay safe I'm doing it for POST too.  REFACTORING opportunity: if-else by POST
    ooGetAllParameters_CLIENT = oGetAllParameters_CLIENT(oHTTPMethodURLPayload.url);
    Object.keys((ooGetAllParameters_CLIENT)).forEach(o=>{
    // console.log(oHTTPMethodURLPayload.payload);
        oHTTPMethodURLPayload.payload[o]=ooGetAllParameters_CLIENT[o];
    });
    // END bring URL parameters into payload
    dom_form.innerHTML = Object.keys(oHTTPMethodURLPayload.payload).map((o,i)=>{
        return '<input type="hidden" name="' + o + '" id="' + o + '" value="' + superencode(oHTTPMethodURLPayload.payload[o]) + '" />' + String.fromCharCode(10) + String.fromCharCode(13);
    }).join("");
    //alert(dom_form.innerHTML);
    /*
    dom_form.innerHTML = Object.keys(oHTTPMethodURLPayload.payload).reduce(function(agg, oElement) {
        agg += '<input type="hidden" name="' + oElement + '" id="' + oElement + '" value="' + superencode(oHTTPMethodURLPayload.payload[oElement]) + '" />' + String.fromCharCode(10) + String.fromCharCode(13);
        return agg;
    }, "")
    */
    dom_form.submit();
}
SubmitSuperNinjaForm.sample = function() { 
  console.log(`
            // with oHTTPMethodURLPayload:
            // oHTTPMethodURLPayload allows method, url, payload to be undefined
            // if payload == string, then payload becomes {payload: payload}
            // if GET method, then url parameters automatically payloadified into payload KeyboardEvent
            // if POST method, then consider pushing payload into URL parameters? (NO!)
            var oHTTPMethodURLPayload = { method:"POST", url: "url", payload: {sampledata: "2asdf"}};

            // oldschool html & javascript: SubmitSuperNinjaForm
            SubmitSuperNinjaForm(oHTTPMethodURLPayload);

            // oldschool javascript: fetch_XMLHttpRequest
            fetch_XMLHttpRequest(oHTTPMethodURLPayload).then(function(sResponse) { console.log(sResponse.trim()); });
            sResponse = await fetch_XMLHttpRequest(oHTTPMethodURLPayload);

            // without oHTTPMethodURLPayload:

            // traditional modern - simple
            fetch("url").then(o=>{return o.text().then(oo=>{ // vs o.json() vs o.blob()?
            console.log(oo);
            }) })

            // traditional modern - complex
            var myHeaders = new Headers();
            var myRequest = new Request('flowers.jpg', {
              method: 'GET',
              headers: myHeaders,
              mode: 'cors',
              cache: 'default',
            });
            fetch(myRequest).then(response => response.blob()).then(myBlob => {
                myImage.src = URL.createObjectURL(myBlob);
            });

  `)
}; fetch_XMLHttpRequest.sample = SubmitSuperNinjaForm.sample;
  
  
oGetAllParameters_CLIENT = function(sURL) {
        if (sURL) { var sURL_location_search = "?" + sURL.split("?")[1]; } else { var sURL_location_search = location.search; }
    return sURL_location_search.substring(1) ? JSON.parse('{"' + sURL_location_search.substring(1).split("&").map(function(e) {
        return -1 == e.indexOf("=") ? e + "=" : e
    }).join("&").replace(/&/g, '","').replace(/=/g, '":"') + '"}', function(e, t) {
        return "" === e ? t : decodeURIComponent(t)
    }) : {}
}

function oSetAParameter_CLIENT(oParameters) {
    // this function resets a parameter(s) from oGetAllParameters_CLIENT()
    // defaults to resetting &DOMContentLoaded parameter when a string and not an object is passed
    if (typeof(oParameters)=="string") {
        oParameters = { "DOMContentLoaded": oParameters }
    }

    var sURL = window.location.origin + window.location.pathname;

    oGetAllParameters_COPY = JSON.parse(JSON.stringify(oGetAllParameters_CLIENT()));
    Object.keys(oParameters).forEach(o=>{
        console.log(o)
        oGetAllParameters_COPY[o] = oParameters[o];
    })

    sURL = sURL + "?" + Object.keys(oGetAllParameters_COPY).map(o=>o + "=" + superencode(oGetAllParameters_COPY[o])).join("&");
    return sURL;
}

// domENCRYPTscripts => superencrypt and decrypt (CryptoJS,LZString)
function superencrypt(aVO, sPassword) { // need to fix oo.toString() to JSON.stringify(oo) if I want to convert objects?  or nah?
  // domLoadScripts_Link("https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js")
  // copy(superencrypt([["a", "b", "c"],["d - 1", "e - 2", "f - 3"]], "hint"))
  try {
      if (aVO) {} else { 
        console.log(`copy(superencrypt([["a", "b", "c"],["d - 1", "e - 2", "f - 3"]], "hint"))`);
        return "";
      }
      if (typeof(aVO)=="string") {
        aVO = [[aVO]]; // Arrayify? or Array2Dify?
      }
      aVO = aVO.map((o,i)=>{
          return o.map(oo=> {
            if (true) {
            // if (i>0) {
              if (sPassword) {} else {sPassword="AES.encrypt"}
              if (sPassword.toUpperCase()=="SUPERENCODE" || sPassword.toUpperCase()=="ENCODE") {
                return superencode( oo.toString() );
              // } else if (sPassword=="hint") {
              //  return "";
              } else if (sPassword.toUpperCase()=="BTOA" || sPassword.toUpperCase()=="BASE64") {
                try {
                    return btoa( oo.toString() );
                } catch(e) {
                    return "unknown system/engine without base64Encode...Utilities.base64Encode()?";
                    /*
                    try {
                        return Utilities.base64Encode(oo);
                    } catch(e) {
                    } */
                }
              } else if (sPassword.toUpperCase()=="LZ" || sPassword.toUpperCase()=="LZSTRING") {
                try {
                    return LZString.compress( oo.toString() );
                } catch(e) {
                    return "unknown system/engine without LZString...domLoadScripts_Link('https://cdn.jsdelivr.net/gh/pieroxy/lz-string/libs/lz-string.js')";
                }
              } else if (sPassword.toUpperCase()=="JSONH" || sPassword.toUpperCase()=="HPACK") {
                // https://stackoverflow.com/questions/11160941/is-it-worth-the-effort-to-try-to-reduce-json-size
                try {
                    return JSONH.pack( oo.toString() );
                } catch(e) {
                    return "unknown system/engine without JSONH...domLoadScripts_Link('https://cdn.jsdelivr.net/npm/jsonh@0.0.6/js/jsonh.min.js')";
                }
              } else {
                try {
                    return CryptoJS.AES.encrypt(superencode( oo.toString() ), sPassword).toString(); 
                } catch(e) {
                    return "unknown system/engine without CryptoJS...domLoadScripts_Link('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js')";
                }
              }    
            //return e;
            } else {
                return oo;
            }
      }) });
      if (sPassword.toUpperCase() =="HINT") {
        return `${JSON.stringify(aVO)}.map(o=>o.map(oo=>{ return decodeURIComponent( 
    CryptoJS.AES.decrypt(oo, "hint").toString(CryptoJS.enc.Utf8)
    ) }) )`;
      } else {
        return aVO;
      }
  } catch(e) {
    return superdecrypt();
  }
}

function superdecrypt(aVO, sPassword) {
    if (typeof(aVO)=="string") {
        aVO = [[aVO]]; // Arrayify? or Array2Dify?
    }

    if (sPassword) {
        // try {
            if (sPassword.toUpperCase()=="ENCODE"||sPassword.toUpperCase()=="SUPERENCODE") {
              try {
                return aVO.map(o=>o.map(oo=>{ return decodeURIComponent( oo )}));
              } catch(eee) { return eee; }
            } else if (sPassword.toUpperCase()=="BTOA"||sPassword.toUpperCase()=="BASE64") {
              try {
                return aVO.map(o=>o.map(oo=>{ return atob( oo )}));
              } catch(eee) { return eee; }
            } else if (sPassword.toUpperCase()=="LZ"||sPassword.toUpperCase()=="LZSTRING") {
              try {
                return aVO.map(o=>o.map(oo=>{ return LZString.decompress( oo )}));
              } catch(eee) { return eee + "unknown system/engine without LZString...domLoadScripts_Link('https://cdn.jsdelivr.net/gh/pieroxy/lz-string/libs/lz-string.js')"; }
            } else if (sPassword.toUpperCase()=="JSONH"||sPassword.toUpperCase()=="HPACK") {
              try {
                return aVO.map(o=>o.map(oo=>{ return JSONH.unpack( oo )}));
              } catch(eee) { return eee + "unknown system/engine without JSONH...domLoadScripts_Link('https://cdn.jsdelivr.net/npm/jsonh@0.0.6/js/jsonh.min.js')"; }
            } else {
              try {
                return aVO.map(o=>o.map(oo=>{ return decodeURIComponent( CryptoJS.AES.decrypt(oo, sPassword).toString(CryptoJS.enc.Utf8))}))
              } catch(eee) { return eee + "unknown system/engine without CryptoJS...domLoadScripts_Link('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js')"; }
            }
        // } catch(eee) {
        //    return 'domLoadScripts_Link("https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js");';
        // }
    } else {
        sError = `
                domLoadScripts_Link("https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js")

                copy(superencrypt([["a", "b", "c"],["d - 1", "e - 2", "f - 3"]], "hint"));

                aVO = [["a", "b", "c"],["d - 1", "e - 2", "f - 3"]];

                                        
                aEncryptedVO = aVO.map(o=>o.map(oo=>{ return CryptoJS.AES.encrypt(superencode(oo), sPassword).toString(); }))
                aEncodedVO = aVO; // superencode this
                aBase64VO = aVO; // btoa this

                aEncryptedVO.map(o=>o.map(oo=>{ return decodeURIComponent( CryptoJS.AES.decrypt(oo, "hint").toString(CryptoJS.enc.Utf8))}))
                aEncodedVO.map(o=>o.map(oo=>{ return decodeURIComponent( oo )}));
                aBase64VO.map(o=>o.map(oo=>{ return atob( oo )}));

                superdecrypt(superencrypt([["a", "b", "c"],["d - 1", "e - 2", "f - 3"]], "password"), "password")
                superdecrypt(superencrypt([["a", "b", "c"],["d - 1", "e - 2", "f - 3"]], "btoa"), "btoa")
                superdecrypt(superencrypt([["a", "b", "c"],["d - 1", "e - 2", "f - 3"]], "encode"), "encode")


    `;
        console.log("LOAD CRYPTOJS:\n\n" + sError);
        return sError;
    }

}

// domISLANDSscripts => aGet2DIslands - original es6 version (w/o sample)
// fing charity begins here at StackOverflow - refactor this into datascripts or keep in googlesheets.gs?
// https://stackoverflow.com/questions/68645601/how-to-extract-a-set-of-isolated-2d-arrays-from-a-larger-2d-array
function aGet2DIslands (aVO) {
    const Cell = memo(
      (r, c) => ({ r, c }),
      ([r, c]) => `${r}_${c}`
    );

    Cell.neighbors = ({ r, c }) => [
      Cell(r, c + 1), // Right
      Cell(r + 1, c), // Down
      Cell(r, c - 1), // Left
      Cell(r - 1, c), // Up
    ];

    // Create a single-cell group
    const Group = (cell) => ({
      minR: cell.r,
      maxR: cell.r + 1,
      minC: cell.c,
      maxC: cell.c + 1,
      cells: new Set([cell])
    });

    // Merge two groups into a new one
    Group.merge = (g1, g2) => ({
      minR: Math.min(g1.minR, g2.minR),
      maxR: Math.max(g1.maxR, g2.maxR),
      minC: Math.min(g1.minC, g2.minC),
      maxC: Math.max(g1.maxC, g2.maxC),
      cells: new Set([ ...g1.cells, ...g2.cells ])
    });

    // Take a grid and slice out the part covered by a group
    Group.extractFromGrid = grid => ({ minR, maxR, minC, maxC }) => grid
      .slice(minR, maxR)
      .map(row => row.slice(minC, maxC));

    // Create all cells with their values
    const grid = aVO;
    const allCells = grid.flatMap(
      (row, ri) => row.map(
        (value, ci) => Cell(ri, ci)
      )
    );

    const groupPerCell = new Map();

    allCells.forEach(current => {
      const inIsland = grid[current.r][current.c] !== "";
      if (inIsland) {  
        const newGroup = Cell
          .neighbors(current)
          .filter(c => groupPerCell.has(c))
          .map(c => groupPerCell.get(c))
          .reduce(Group.merge, Group(current));

        // Store a reference to the group for each member
        newGroup.cells.forEach(c => {
          groupPerCell.set(c, newGroup);
        });
      }  
    });

    const allGroups = [...new Set(groupPerCell.values())];
    const allValues = allGroups.map(Group.extractFromGrid(grid));

    function memo(f, hash) {
      const cache = {};

      return (...args) => {
        const k = hash(args);
        if (!cache[k]) cache[k] = f(...args);

        return cache[k];
      }
    }

    return allValues;
}



aGet2DIslandsRanges = function(aVO) {
    // searches a large set of 2D / VO data and outputs a list of SQUARE ranges that the data occupies (eg output: ['A1:D4', 'O1:T10', 'V1:Z10', 'I2:K10', 'E8:E8'])
    aVO_A1Notations = aVO.map((o,i)=>o.map((oo,ii)=>{ if (oo) { return convertArrayToCell([ii+1 , i+1]) } else { return ""; } }))
    aVO_A1Notations_Islands = aGet2DIslands(aVO_A1Notations);
    aVO_A1Notations_Islands_Ranges = aVO_A1Notations_Islands.map(aVOIsland=>{
        // aVOIsland = aVO_A1Notations_Islands[0];
        iHeight = aVOIsland.length;
        iWidth = aVOIsland[0].length;
        sFirstCell = aVOIsland.map(o=>o[0]).reduce((a,e,i)=>{ return a || cellToColumn(e) }, "") + aVOIsland[0].reduce((a,e,i)=>{ return a || cellToRow(e) }, "");
        sLastCell = aVOIsland.map(o=>o[iWidth-1]).reduce((a,e,i)=>{ return a || cellToColumn(e) }, "") + aVOIsland[iHeight-1].reduce((a,e,i)=>{ return a || cellToRow(e) }, "");
        return sFirstCell + ":" + sLastCell;
    });
    return aVO_A1Notations_Islands_Ranges;
}

// domDATAHTML.es6.scripts (aka domscripts.2.js)
/* domDATAHTMLscripts (superset of dataHTMLscripts.js) => datahtmlscripts.js => isomorphic, vanilla, es5-ish datascripts that are related to HTML and datascripts, without needing libraries (the dom, jquery, or lodash */
// refactor this whole solution into dataDATAHTMLscripts?  or dataHTMLscripts?  why dom?  because es5?
// note hyperlink() is both html and gs formula related? more functions similar to this concept"?
// HTMLLibrarify, HTMLInjecify, HTMLDOMContentLoadedLibrarify, HTMLDOMContentLoadedLibrarifySample, HTMLDOMContentLoadedify, getHelpfulDOMScripts
// HTMLify, GSDS_disjointedRangeToAVO, GSDS_disjointedRangeToArray
// toHTMLTable, returnIDAndOrClasses, toHTMLSelect, hyperlink, convertRecordsOrientedArrayToExcelXML, convertValuesOrientedArrayToHTMLTable, convertRecordsOrientedArrayToHTMLTable

// server and client-side friendly vanilla es5-ish data scripts that are related to HTML and datascripts, without needing librarys (the dom, jquery, or lodash)
// "FIRST PRINCIPLES FRAMEWORKING"
// obviously not a lot of these are pure es5 so I guess refactor this
// pending refactoring/TODO/tasks: move aGet2DIslands() off of this, es5-ify it, and move it to datascripts.js
// pending refactoring/TODO/tasks: getHelpfulDOMScripts - get rid of this or wat?
// completed refactoring/TODO/tasks: I removed CQPify polyfill because "CQPify()" is now defined as "HTMLify() with server access".  Make this vibe/jive with NS and WP solutions?
// pending refactoring/TODO/tasks: rename/polyfill CQPify to "CodePenify"?  Because that's basically all it is now, it's a first principles thinking/frameworking to carry to each system
function HTMLLibrarify (sHeadList) { // HTMLLibrarify is essentially a <script src> and <link> generator
  // consider refactoring this for domcontenloaded scripts?  also consider refactoring to allow async scripts (wtf that is?), also refactor from es5 to es6 i guess
  // eg HTMLLibrarify("https://manueldelanda.github.io/datascripts.js;https://manueldelanda.github.io/domscripts.js;https://cdn.jsdelivr.net/lodash/4/lodash.min.js;https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css;https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css")
  if (Array.isArray(sHeadList)) { sHeadList = sHeadList.join("\n"); }
  sHeadList = sHeadList.replace(/\;/g, "\n");
  return sHeadList.split("\n")
        .filter(oEl => oEl.trim().match(/\.js$||\.css$/) )
        .filter(oEl => !oEl.trim().match(/^\/\//) )
        .filter(oEl => oEl.trim().length > 0)
        .map(e => ((e.match(/\.js$/) ? `<script src="${e}"></script>`: `<link rel="stylesheet" href="${e}" type="text/css" />`)))
        .join("\n"); 
}
function HTMLInjecify(sHeadList) { // HTMLInjectify() is essentially a smart wrapper for domLoadStyles_Link() and domLoadScripts_Link(), refactor to allow domLoadScripts_SCRIPT() and domLoadStyles_CSS() too?
  // eg HTMLInjecify("https://manueldelanda.github.io/datascripts.js;https://manueldelanda.github.io/domscripts.js;https://cdn.jsdelivr.net/lodash/4/lodash.min.js;https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css;https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css")
  // The following sScripts variable is minified scripts from domscripts nobrainer section
  var sScripts = `domLoadStyles_Link=function(t){Array.isArray(t)||(t=[t]),t.forEach(function(t){var e=document.getElementsByTagName("head")[0],r=document.createElement("link");r.setAttribute("rel","stylesheet"),r.setAttribute("type","text/css"),r.setAttribute("href",t),e.appendChild(r)})},domLoadScripts_Link=function(t){Array.isArray(t)||(t=[t]),t.forEach(function(t){var e=document.getElementsByTagName("head")[0],r=document.createElement("script");r.setAttribute("src",t.trim()),e.appendChild(r)})};`
  if (Array.isArray(sHeadList)) { sHeadList = sHeadList.join("\n"); }
  sHeadList = sHeadList.replace(/\;/g, "\n");
  return sScripts + "\n\n" + sHeadList.split("\n")
        .filter(oEl => oEl.trim().match(/\.js$||\.css$/) )
        .filter(oEl => !oEl.trim().match(/^\/\//) )
        .filter(oEl => oEl.trim().length > 0)
        .map(e => ((e.match(/\.js$/) ? `domLoadScripts_Link("${e}")`: `domLoadStyles_Link("${e}")`)))
        .join("\n"); 
}
function HTMLDOMContentLoadedLibrarify(sHeadList) { // for loading CDN scripts dynamically injecting into <script>
  sHeadList = sHeadList.replace(/\;/g, "\n");
  var aLoadScripts = JSON.stringify(sHeadList.split("\n"));
  sCode = `
  var aLoadScripts=${aLoadScripts};
  
  function domLoadScripts(e,n){!function t(){var a,o,c;0!=e.length?(a=e.shift(),o=t,(c=document.createElement("script")).src=a,c.onload=c.onreadystatechange=function(){c.onreadystatechange=c.onload=null,o()},(document.getElementsByTagName("head")[0]||document.body).appendChild(c)):n&&n()}()}
  
  domLoadScripts(aLoadScripts,function(){
    alert('loaded cdn scripts');
  });
`;
  return sCode.trim();
  // alertTextArea(sCode);
}; function HTMLDOMContentLoadedLibrarifySample() { return 'HTMLDOMContentLoadedLibrarify("https://manueldelanda.github.io/datascripts.js;https://manueldelanda.github.io/domscripts.js;https://cdn.jsdelivr.net/lodash/4/lodash.min.js")'; }


function HTMLDOMContentLoadedify(sScript) {
        return `\n\nwindow.addEventListener('DOMContentLoaded', (event) => { \n\ntry {\n\n ${sScript} \n\n}\ncatch(e) { console.log(e); }\n})\n`;
}
function getHelpfulDOMScripts() { // note the 5 dollar signs instead of 3...seems like dollar signs vanish when used in a match function   
        return decodeURIComponent("%0A%3Cscript%3E%0A%20%20%20%20var%20%24%24%24%24%24%20%3D%20document.querySelectorAll.bind(document)%3B%0A%20%20%20%20HTMLElement.prototype.%24%24%24%24%24%20%3D%20function%20(element)%20%7B%20return%20this.querySelectorAll(element)%3B%20%7D%3B%0A%20%20%20%20domAppendStyle%20%3D%20function(e)%7Bconst%20t%3Ddocument.createElement(%22style%22)%3Bt.textContent%3De%2Cdocument.head.append(t)%7D%3B%20addStyle%20%3D%20domAppendStyle%3B%0A%20%20%20%20domAppendToHead%20%3D%20function(s)%7B%20%24%24%24%24%24(%27head%27)%5B0%5D.append(s)%3B%20%7D%0A%20%20%20%20domLoadScripts%20%3D%20function(e%2Cn)%7B!function%20t()%7Bvar%20a%2Co%2Cc%3B0!%3De.length%3F(a%3De.shift()%2Co%3Dt%2C(c%3Ddocument.createElement(%22script%22)).src%3Da%2Cc.onload%3Dc.onreadystatechange%3Dfunction()%7Bc.onreadystatechange%3Dc.onload%3Dnull%2Co()%7D%2C(document.getElementsByTagName(%22head%22)%5B0%5D%7C%7Cdocument.body).appendChild(c))%3An%26%26n()%7D()%7D%0A%3C%2Fscript%3E");
}

function HTMLify(aCQPRecordsOriented, bSansHTMLTag) {
  // context, label, server, server-condition, head, head-script/script/js, DOMContentLoaded/onload, html, body, css/style, and headlist/library
  var sHTML = undefined;
  var sHead = "";
  var sHeadStyles = "";
  var sHeadBabel = "";
  var sBodyTypeScript = "";
  var sHeadScripts = "";
  var sDomContentLoaded = "";
  var sBody = ""; 
  var sDomContentLoadedHEADSCRIPT = undefined;
  // alertTextArea(JSON.stringify(aCQPRecordsOriented));
  aCQPRecordsOriented.forEach(function(oEl) {
    var sLabel = superencode(oEl["label"]);
    if (oEl["html"]) {
      sHTML = oEl["html"]; // don't do +=, only =, only allow one cell in entire Solution Island to contain html data?  prioritize the last instance?  lots of assumptions to reconcile here...
    }
    if (oEl["head"]) {
      sHead += "\n" + oEl["head"] + "\n";
    }
    if (oEl["headlist"]) {
      oEl["headlist"] = HTMLLibrarify(oEl["headlist"]);
      sHeadScripts += "\n" + oEl["headlist"] + "\n";
    }
    if (oEl["library"]) {
      oEl["library"] = HTMLLibrarify(oEl["library"]);
      sHeadScripts += "\n" + oEl["library"] + "\n";
    }
    if (oEl["head-script"]) {
      sHeadScripts += "<script>\n//" + sLabel + ":";
      sHeadScripts += "\n" + oEl["head-script"] + "\n</script>\n";
    }
    if (oEl["script"]) {
      sHeadScripts += "<script>\n//" + sLabel + ":";
      sHeadScripts += "\n" + oEl["script"] + "\n</script>\n";
    }
    if (oEl["js"]) { // js is a hack that I suspect codepen does to load the script in both script and DOMContentLoaded, but idk
      sHeadScripts += "<script>\n//" + sLabel + ":";
      sHeadScripts += "\n" + oEl["js"] + "\n</script>\n";
      sDomContentLoaded += HTMLDOMContentLoadedify(oEl["js"]);
    }
    if (oEl["babel"]) { //<script type="text/babel"></script> 
      sHeadBabel = "<script src='https://unpkg.com/@babel/standalone/babel.min.js'></script>";
      sHeadScripts += "<script type='text/babel' charset='utf-8'>\n//" + sLabel + ":";
      sHeadScripts += "\n" + oEl["babel"] + "\n</script>\n";
    }
    if (oEl["typescript"]) {
      sBodyTypeScript = '<script type="text/javascript" src="https://niutech.github.io/typescript-compile/js/typescript.min.js"></script><script type="text/javascript" src="https://niutech.github.io/typescript-compile/js/typescript.compile.min.js"></script>';
      sHeadScripts += "<script type='text/typescript' charset='utf-8'>\n//" + sLabel + ":";
      sHeadScripts += "\n" + oEl["typescript"] + "\n</script>\n";      
    }
    if (oEl["style"]) {
      // sHeadStyles += "<style>\n//" + sLabel + ":";
      sHeadStyles += "<style>\n" + oEl["style"] + "\n</style>\n";
    }
    if (oEl["css"]) {
      // sHeadStyles += "<style>\n//" + sLabel + ":";
      sHeadStyles += "<style>\n" + oEl["css"] + "\n</style>\n";
    }
    if (oEl["head-script-document.addEventListener-DOMContentLoaded"]) {
      sDomContentLoaded += HTMLDOMContentLoadedify(oEl["head-script-document.addEventListener-DOMContentLoaded"]);
    }
    if (oEl["DOMContentLoaded"]) {
      sDomContentLoaded += HTMLDOMContentLoadedify(oEl["DOMContentLoaded"]);
    }
    if (oEl["onload"]) {
      sDomContentLoaded += HTMLDOMContentLoadedify(oEl["onload"]);
    }
    if (oEl.bodytable) {
      if (sLabel) {sBody += "\n<!-- " + sLabel + "-->\n"; }
      sBody += oEl.bodytable + "\n<br />\n";
    }
    if (oEl.body) {
      if (sLabel) {sBody += "\n<!-- " + sLabel + "-->\n"; }
      sBody += oEl.body + "\n<br />\n";
    }
    if (oEl.textarea) {
      if (sLabel) {sBody += "\n<!-- " + sLabel + "-->\n"; }
      sBody += "<textarea rows='10' style='width:100%;'>" + oEl.textarea + "</textarea>\n<br />\n";
    }
    // console.log(oEl)
  });
  
  ((sDomContentLoaded) ? sDomContentLoadedHEADSCRIPT = "<script>\n\n" + sDomContentLoaded + "\n\n</script>" : sDomContentLoadedHEADSCRIPT = "");
  sHead = sHead + sHeadStyles + sHeadBabel + sHeadScripts + sDomContentLoadedHEADSCRIPT;
  if (sHTML) { // sHTML is defined, therefore I need to DOMParse it and append all data thru DOMContentLoaded.  Sike I'm just doing a replace on the opening <head> tag, probably making my HTMLify solution less browser-tolerant but I can refactor/task/TODO this out later...
     // debugging - sHTML = "<html><head></head><body></body></html>"; sDomContentLoaded = "";
     sHelpfulDOMScripts = getHelpfulDOMScripts();
     sHead = sHelpfulDOMScripts + sHead;
     sHTML = sHTML.replace(/\<head\>/, `<head>\n${sHead}`);
     if (sBody) { sHTML = sHTML.replace(/\<body\>/, `<body>\n${sBody + sBodyTypeScript}`); } // a little charity for the body tag I guess
  } else { // sHTML is undefined, therefore define it using the usual vanilla html CQPify way
    if (bSansHTMLTag) { // then generate html without the <html> opening/closing tag
        sHTML = "<head>" + sHead + "</head>\n<body>" + sBody + sBodyTypeScript + "</body>";     
    } else {
        sHTML = "<html><head>" + sHead + "</head>\n<body>" + sBody + sBodyTypeScript + "</body></html>"; 
    }
  }
  return sHTML;
};
// I removed CQPify polyfill because "CQPify()" is now defined as "HTMLify() with server access"
// HTMLify alone is itself just a pure vanilla datascript.js function
// function CQPify(aCQPRecordsOriented) { return HTMLify(aCQPRecordsOriented) };

/* dataBASICscripts => isomorphic, vanilla-ish ES5-safe functions inspired from Python Pandas, uses lodash lightly  */

/* prototype altering functions */
//Array.prototype.toDelimited ="";

/* BEGIN no brainers / polyfills for es5 */
function padArray(array, length, fill) { return length > array.length ? array.concat(Array(length - array.length).fill(fill)) : array; }
padArray.sample=function(e){return "padArray([1,2,3]), 5, 'end');";}

// String.prototype.count=function(c) { var result = 0, i = 0; for(i;i<this.length;i++)if(this[i]==c)result++; return result; };
count=function(s, c) { var result = 0, i = 0; for(i;i<s.length;i++)if(s[i]==c)result++; return result; };
//Array.prototype.unique = function() { var a = []; for (var i=0, l=this.length; i<l; i++) if (a.indexOf(this[i]) === -1) a.push(this[i]); return a; };
// count=function(c) { var result = 0, i = 0; for(i;i<this.length;i++)if(this[i]==c)result++; return result; };
// Array.prototype.unique = function() { var a = []; for (var i=0, l=this.length; i<l; i++) if (a.indexOf(this[i]) === -1) a.push(this[i]); return a; };
unique = function(aArray) { var a = []; for (var i=0, l=aArray.length; i<l; i++) if (a.indexOf(aArray[i]) === -1) a.push(aArray[i]); return a; };
// Object.prototype.toArray = function () { var _this = this; var array = []; Object.keys(this).map(function (key) { array.push(_this[key]); }); return array; };                                                                 
/* END no brainer / polyfilles for es5 */

parseInt0 = function(sNum, iDefault) { if (sNum) {} else {sNum = 0;} var iNum; if (iDefault) {} else {iDefault = 0;} if (!isNaN(sNum)) { iNum = parseInt(sNum); } else { iNum = parseInt(iDefault); } return iNum; }

/* BEGIN values oriented / records oriented / tab delimited converter functions */
// toValuesOriented = function(aInputArray) { var aArrayOfAllPossibleColumnTitles = aInputArray.reduce(function(agg123, oElement123) { Object.keys(oElement123).forEach(function(oElement751) { if (!agg123.includes(oElement751)) { agg123.push(oElement751); } else {} }); return agg123; }, Object.keys(aInputArray[0])); var aValuesOrientation = aInputArray.map(function(oElement123, iIndex123) { return aArrayOfAllPossibleColumnTitles.reduce(function(agg751, oElement751) { if (oElement123[oElement751] == undefined) { agg751.push(); } else { agg751.push(oElement123[oElement751]); } return agg751; }, []) }); aValuesOrientation.unshift(aArrayOfAllPossibleColumnTitles); return aValuesOrientation; }
// findKey = function(aData,sKey,sVal) { return aData[_.findKey(aData, o=>o[sKey]==sVal)] }
// findKeys = function(aData,sKey,sVal) { return aData.filter(function(e){return e[sKey]==sVal}) }
findKeys = function(aRO,sKey,sVal) {
    // consider refactoring this to make it more concise, eg 
    // interesting notes: my intuition says sKey can be string, regex or array, whereas sVal should be string or regex (and never array?)
    
    // obligatory convert aVO to aRO
    if (isVO(aRO)) { aRO = toRO(aRO); }

    // normalize in order to get first row and all its keys / columns that way
    aRO = normalizeRecordsOriented(JSONPS(aRO));
    
    if (sKey instanceof RegExp) { // regex
        sKey = Object.keys(aRO[0]).filter(function(k) { return k.match(sKey); }); // to array;
        // return findKeys(aRO, aKeys, sVal);
    }

    if (Array.isArray(sKey)) { // array
        if (sVal instanceof RegExp) {
            return aRO.filter(function(e){
                return sKey.reduce(function(a1, e1, i1) {
                    a1 = a1 || e[e1].match(sVal); 
                    return a1;
                }, false) 
            })
        } else { // sVal is exact match
            return aRO.filter(function(e){
                return sKey.reduce(function(a1, e1, i1) {
                    a1 = a1 || e[e1]==sVal; 
                    return a1;
                }, false) 
            })        }
    } else { // string
        if (sVal instanceof RegExp) {
            return aRO.filter(function(e){return e[sKey].match(sVal) });
        } else { // sVal is exact match
            return aRO.filter(function(e){return e[sKey]==sVal});
        }
    }
}
findKey = function(aData,sKey,sVal) { return findKeys(aData,sKey,sVal)[0]; }
findKeysIndex = function(aData,sKey,sVal) { return findKeyIndexes(aData,sKey,sVal)[0]; }
findKeyIndexes = function(aData,sKey,sVal) { return JSONPS(aData).map(function(e, i) { e.index = i; return e; }).filter(function(e) { return e[sKey] == sVal; }).map(function(e) { return e.index }) }
ObjectKeysRegex = function(oObject, rRegexKey) {
    return Object.keys(oObject).filter(function(oEl) {
        return oEl.match(rRegexKey);
    })
}
function ObjectKeyRegex(oObject,rRegexKey) { return ObjectKeysRegex(oObject,rRegexKey)[0]; }

ObjectValuesRegex = function(oObject, rRegexKey) {
    return Object.keys(oObject).filter(function(oEl) {
        return oEl.match(rRegexKey);
    }).map(function(oEl) {
        return oObject[oEl];
    })
}
function ObjectValueRegex(oObject,rRegexKey) { return ObjectValuesRegex(oObject,rRegexKey)[0]; }
Arrayify = function(aArray) { if (Array.isArray(aArray)) {} else { aArray = [aArray]; } }

toVO = function(aInputArray, aColumns) {
    if (isOBJ(aInputArray)) { // checks for objects.  note how toVO([{"one": "two", "three": "four"}] = [["one","three"],["two","four"]] and toVO({"one": "two", "three": "four"}) = [["one","two"],["three","four"]]
        aInputArray = Object.keys(aInputArray).reduce(function(a,e,i,o) { a.push([e,aInputArray[e]]); return a; }, [] )
    }
    if (typeof(aInputArray)=="string") { return [[aInputArray]]; };
    if (isVO(aInputArray)) { return aInputArray; };
    // REFACTOR: replace aArrayOfAllPossibleColumnTitles now that there's a normalizeRecordsOriented function?
    var aArrayOfAllPossibleColumnTitles = aInputArray.reduce(function(agg123, oElement123) {
        Object.keys(oElement123).forEach(function(oElement751) {
            if (agg123.indexOf(oElement751) == -1) {
            // if (!agg123.includes(oElement751)) { // not es5-friendly
                agg123.push(oElement751);
            } else {}
        });
        return agg123;
    }, Object.keys(aInputArray[0]));
    if (aColumns == undefined) { aColumns = aArrayOfAllPossibleColumnTitles; }
    var aValuesOrientation = aInputArray.map(function(oElement123, iIndex123) {
        return aColumns.reduce(function(agg751, oElement751) {
            if (oElement123[oElement751] == undefined) {
                agg751.push("");
            } else {
                agg751.push(oElement123[oElement751]);
            }
            return agg751;
        }, [])
    });
    aValuesOrientation.unshift(aColumns);
    return aValuesOrientation;
}; toValuesOriented = function(aInputArray, aColumns) { return toVO(aInputArray, aColumns); }
toRO = function(aInputArray) {
    if (!isVO(aInputArray)) { return aInputArray; }
    var aValuesOrientation = normalizeValuesOriented(sanitizeValuesOrientedData(JSONPS(aInputArray)));
    aValuesOrientation[0] = aValuesOrientation[0].slice().reverse().map(function(oElement, iIndex, aArray) {
        if (aValuesOrientation[0].indexOf(oElement) == aValuesOrientation[0].length - aArray.indexOf(oElement) - 1) {
            return oElement.toString().trim();
        } else {
            return oElement.toString().trim() + "_" + (aValuesOrientation[0].length - iIndex)
        }
    }).reverse();
    return aValuesOrientation.reduce(function(agg, oElement, iIndex, aArray) {
        return (iIndex != 0) ? agg.concat(aArray[0].reduce(function(oagg0, oElement0, iIndex0) {
            oagg0[oElement0] = oElement[iIndex0];
            return oagg0
        }, {})) : []
    }, [])
}; toRecordsOriented = function(aInputArray) { return toRO(aInputArray); }

toXXXOriented = function (aInputArray, sXXX) { var aRecordsOrientation = JSONPS(aInputArray); return aRecordsOrientation.reduce(function (agg, oElement) { if (agg[oElement[sXXX]]==undefined) { agg[oElement[sXXX]] = oElement; } else { if (!Array.isArray(agg[oElement[sXXX]])) { agg[oElement[sXXX]] = [agg[oElement[sXXX]]].concat(oElement) } else { agg[oElement[sXXX]] = agg[oElement[sXXX]].concat(oElement) } } return agg; }, {}); }

toXXXOrientated = function (aInputArray, sXXX) { var aRecordsOrientation = JSONPS(aInputArray); return aRecordsOrientation.reduce(function (agg, oElement) { if (agg[oElement[sXXX]]==undefined) { agg[oElement[sXXX]] = oElement; } else { if (!Array.isArray(agg[oElement[sXXX]])) { agg[oElement[sXXX]] = [agg[oElement[sXXX]]].concat(oElement) } else { agg[oElement[sXXX]] = agg[oElement[sXXX]].concat(oElement) } } return agg; }, {}); }

toXXXOrientedDEDUPED = function(aInputArray, sXXX)  { var aRecordsOrientation = JSONPS(aInputArray); var o_XXX_Orientation = aRecordsOrientation.reduce(function (agg, oElement) { if (agg[oElement[sXXX]]==undefined) { agg[oElement[sXXX]] = oElement; } else { if (!Array.isArray(agg[oElement[sXXX]])) { agg[oElement[sXXX]] = [agg[oElement[sXXX]]].concat(oElement) } else { agg[oElement[sXXX]] = agg[oElement[sXXX]].concat(oElement) } } return agg; }, {}); return Object.keys(o_XXX_Orientation).reduce(function(agg777, oElement777) { if (Array.isArray(o_XXX_Orientation[oElement777])) { agg777[oElement777] = o_XXX_Orientation[oElement777].reduce(function(agg778, oElement778) { return Object.keys(oElement778).reduce(function(agg779, oElement779) { if (agg778[oElement779] == undefined) { agg778[oElement779] = oElement778[oElement779]; } else { agg778[oElement779] = agg778[oElement779] + ";" + oElement778[oElement779]; } return agg778; }, "") }, {}) } else { agg777[oElement777] = o_XXX_Orientation[oElement777]; } return agg777; }, {}) }; toXXXOrientatedDEDUPED=toXXXOrientedDEDUPED;


toTabDelimited = function (aInputArray, sDelimiter, sQualifier) {
  // get rid of stray tabs in array so it doesn't create duplciate tabs in tab delimited data
  Object.keys(normalizeRecordsOriented(aInputArray)[0]).forEach(function(oElement) {
      aInputArray.forEach(function(oElement0) {
          if (typeof(oElement0[oElement]) == "string") {
              oElement0[oElement] = oElement0[oElement].replace(/\t/g, "");
          }
      })
  })
  if (Object.prototype.toString.call(aInputArray[0]) == '[object Array]') { // hack for aValuesOriented
      return toDelimited(aInputArray, String.fromCharCode(9), "").split(String.fromCharCode(10)).splice(1,aInputArray.length+1).join(String.fromCharCode(10));
  } else { // else return aRecordsOriented
      return toDelimited(aInputArray, String.fromCharCode(9), "");
  }
}; toTab = function(a,b,c) { return toTabDelimited(a,b,c); }; toTAB = function(a,b,c) { return toTabDelimited(a,b,c); }

toCSVDelimited = function (a) {
  // toCSVDelimited([["Country","Value"],["United States","12394"],["Russia","6148"],["Germany (FRG)","1653"],["France","2162"],["United Kingdom","1214"],["China","1131"],["Spain","814"],["Netherlands","1167"],["Italy","660"],["Israel","1263"]])
  a = toRO(a);
  // get rid of stray tabs in array so it doesn't create duplciate tabs in tab delimited data
  Object.keys(normalizeRecordsOriented(a)[0]).forEach(function(oElement) {
      a.forEach(function(oElement0) {
          if (typeof(oElement0[oElement]) == "string") {
              oElement0[oElement] = oElement0[oElement].replace(/,/g, "<comma>");
          }
      })
  })
  if (Object.prototype.toString.call(a[0]) == '[object Array]') { // hack for aValuesOriented
      return toDelimited(a, ",", "").split(String.fromCharCode(10)).splice(1,a.length+1).join(String.fromCharCode(10));
  } else { // else return aRecordsOriented
      return toDelimited(a, ",", "");
  }
}; toCSV = function(s) { return toCSVDelimited(s); }

// begin csv/tabs functions
toDelimited = function(aInputArray, sDelimiter, sQualifier) { function returnAllKeysAmongAllObjectsInRecordsOrientedArray(aRecordsOriented) { return aRecordsOriented.reduce(function(agg, oElement313) { agg = agg.concat(Object.keys(oElement313)); agg = unique(agg); return agg; }, []) } var aColumns = returnAllKeysAmongAllObjectsInRecordsOrientedArray(aInputArray); return aInputArray.reduce(function(agg, oElement) { return agg + "\n" + aColumns.filter(function(oElement777) { return oElement777.trim() != "" }).reduce(function(agg001, oElement001, iIndex001) { return agg001 + ((iIndex001 == 0) ? "" : sDelimiter) + sQualifier + ((oElement[oElement001] == undefined ? "" : oElement[oElement001])).toString().replace(/\r\n/g, "<br>").replace(/\n/g, "<br>") + sQualifier; }, "") }, aColumns.map(function(oElement002) { return sQualifier + oElement002 + sQualifier; }).join(sDelimiter)) }

// 01/09/2022 - place beside datascripts.convertTabDelimitedToValuesOriented
function fromCSVToVO(sCSV) { return sCSV.split(String.fromCharCode(10)).map(o=>o.split(",")); }; convertCSVToValuesOriented = function(s) { return fromCSVToVO(s); }
function fromCSVToRO(sCSV) { return toRO(fromCSVToVO(sCSV)); }; convertCSVToRecordsOriented = function(s) { return fromCSVToRO(s); }

fromTABToVO = function(sText) { return sText.split(String.fromCharCode(10)).map(function(oElement) { return oElement.split(String.fromCharCode(9)); }); }; convertTabDelimitedToValuesOriented = function(s) { return fromTABToVO(s); }
fromTABToRO = function(sText) { return toRO(fromTABToVO(sText)); }; convertTabDelimitedToRecordsOriented = function(s) { return fromTABToRO(s); }
fTABToVO=fromTABToVO;fTABToRO=fromTABToRO;fCSVToVO=fromCSVToVO;fCSVToRO=fromCSVToRO;
f8SpaceToVO = function(s) { return fTABToVO(s.replace(/        /g, String.fromCharCode(9) )); }
// end csv/tabs functions

isVO = function(a) { return Array.isArray(a[0]); }; isValuesOriented = function(a) { return isVO(a); }
isRO = function(a) { return (Array.isArray(a) && !Array.isArray(a[0]) && typeof(a[0]) == "object"); }; isRecordsOriented = function(a) { return isRO(a); }
isTAB = function(s) { return (typeof(s) == "string" && s.indexOf(String.fromCharCode(9)) > -1) }; isTabDelimited = function(a) { return isTAB(a); }
isCSV = function(s) { return (typeof(s) == "string" && s.indexOf(",") > -1) }; isCSVDelimited = function(a) { return isTAB(a); }
isOBJ = function(a) { return (typeof a=="object" && !Array.isArray(a)); }; isObj = function(a) { return isOBJ(a); }

typeofdata = function (s) {
    // typeofData([{"to": "wat"}])
    // typeofData({"to": "wat"})
    if (Array.isArray(s) && !Array.isArray(s[0]) && typeof(s[0]) == "object") {
        return "isRO";
    } else if (Array.isArray(s[0])) {
        return "isVO";
    } else if ((typeof(s) == "string" && s.indexOf(String.fromCharCode(9)) > -1)) {
        return "isTAB";
    } else if ((typeof(s) == "string" && s.indexOf(",") > -1)) {
        return "isCSV";
    } else if (Array.isArray(s) == "isArray") {
    } else if (typeof(s) == "string") {
        return "string";
    // } else if (typeof(s) == "string") {
    //    return "object";
    } else {
        return "idk"; // return undefined
    }
}
/* END values oriented / records oriented / tab delimited converter functions */

/* BEGIN CLEANER/NORMALIZER/SANITIZER FUNCTIONS */
// sanitizeValues I think puts an empty string in cells that are ambiguous, sanitizeRecords just gets rid of line breaks in keys
sanitizeValuesOrientedData = function(aValuesOriented) { return aValuesOriented.map(function(oElement) { return oElement.map(function(oElement0) { if (oElement0 == null || oElement == undefined || oElement == NaN ) { return ""; } else { return oElement0; } }) }) }
sanitizeRecordsOrientedData = function(aRecordsOriented) { var aValuesOriented = toVO(aRecordsOriented); aValuesOriented[0] = aValuesOriented[0].map(function(oEl) { return oEl.replace(/\n/g, "") }); return toRO(aValuesOriented); }
normalizeValuesOriented = function (aValuesOriented) {
    // normalizeValuesOriented([["a", "b", "c"], ["e", "f"], ["t", "h", {"blah": "hello" } ]])
    iMaxLength = aValuesOriented.reduce(function(oAg, oEl, iIn) {
        if (oEl.length > oAg) { oAg = oEl.length; }
        return oAg;
    }, 1);
    return aValuesOriented.map(function(oEl) {
        if (!Array.isArray(oEl)) { oEl = [oEl]; }
        return padArray(oEl, iMaxLength, "");
        return oEl;
    })
}

normalizeRecordsOriented = function(aRecordsOriented) { // AOT toRecordsOriented(toValuesOriented(aRecordsOrientation));
    function returnAllKeysAmongAllObjectsInRecordsOrientedArray(aRecordsOriented) { return aRecordsOriented.reduce(function(agg, oElement313) { agg = agg.concat(Object.keys(oElement313)); agg = unique(agg); return agg; }, []) }
         var aColumns = returnAllKeysAmongAllObjectsInRecordsOrientedArray(aRecordsOriented);
    aRecordsOriented.forEach(function(oElement3245) {
        aColumns.forEach(function(oElement8726) {
            if (oElement3245[oElement8726] == undefined || oElement3245[oElement8726] == null || oElement3245[oElement8726] == NaN) {
                oElement3245[oElement8726] = "";
            }
        })
    })
    return aRecordsOriented;
}
// overkill?
replaceColumnNameInRecordsOrientedArray = function(aRecordsOriented, sMatchingString, sReplacementString) {
// vs function renameColumnNameInRecordsOrientedArray(aRecordsOriented, sMatchingString, sReplacementString) {
    // SAMPLE CALL:
    // aRecordsOriented = replaceColumnNameInRecordsOrientedArray(aRecordsOriented, "Rack # / Location", "Bin");
    var aValuesOriented = toVO(aRecordsOriented);
    aValuesOriented[0] = aValuesOriented[0].map(function(oElement) {
        // console.log(oElement == sMatchingString)
        if (oElement == sMatchingString) { oElement = sReplacementString; }
        return oElement;
    })
    return toRO(aValuesOriented);
}
/* END CLEANER/NORMALIZER/SANITIZER FUNCTIONS */

/* BEGIN DATE-RELATED FUNCTIONS */
// MUCH REFACTORING AND CLEANING REQUIRED
function convertIntToDate(sDate, sWhatDo) {
    // SAMPLE: convertIntToDate(new Date(), "YYYYMMDDHHMMSS")
    // SAMPLE: convertIntToDate(1593442444000, "mm/dd/yyyy")
    // SAMPLE: convertIntToDate(1593442444000)
    var dDate = new Date(sDate);
    switch(sWhatDo) {
        case "Netsuite":
                return format.format({ value: new Date(sDate), type:format.Type.DATETIME, timezone:format.Timezone.AMERICA_NEWYORK })
            break;
        case "mm/dd/yyyy":
            return (dDate.getMonth() + 1).toString().padStart(2, "0") + "/" + dDate.getDate().toString().padStart(2, "0") + "/" + dDate.getFullYear();
            break;
        case "m/d/yyyy":
            return dDate.getMonth() + 1 + "/" + dDate.getDate() + "/" + dDate.getFullYear();
            break;
        case "YYYYMMDDHHMMSS":
            return getYYYYMMDDHHMMSS(sDate);
            break;
        default:
            return new Date(sDate).toString().split(" ").filter(function(oElement, iIndex) { return iIndex == 1 || iIndex == 2 || iIndex == 3; }).join(" ");
            break;
    }
}
getYYYYMMDDHHMMSS = function(sDate) {
    if (sDate) { var date = new Date(sDate); } else { var date = new Date(); }    
    return date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2) + ("0" + date.getHours() + 1 ).slice(-2) + ("0" + date.getMinutes()).slice(-2) + ("0" + date.getSeconds()).slice(-2)
}
/* END SOME DATE-RELATED FUNCTIONS */


/* BEGIN JSON.whatever scripts */
// consider refactoring JSONObjectify try/catch errors and keep trying to make assumptions about the data passed into it.  assumptions aren't good but this function is experimental anyways so it'd be cool if I can figure out whether the sSeparator is , vs ; so come up with some sDelimiter (' / ") vs sSeparator ("," / ";") vs sTerminator ("/n")
// note2: sDelimiter should not be considered at all for JSONObjectify, only sSeparator and sTerminator.
JSONObjectify = function(sString, sDelimiter, sColon) {
  if (!sDelimiter) { sDelimiter = ","; } // for now, assume , or \n as delimiters
  if (!sColon) { sColon = ":";} // for now, assume : or = as colons
  // JSONObjectify("branch:main,folder:datascripts");
  // JSONObjectify('{"branch":"main","folder":"datascripts"}');
  try {
    return JSON.parse(sString);
  } catch(e) {
    aReturn = sString.trim().replace(/\,/g, String.fromCharCode(10)).split(String.fromCharCode(10)).map(function(oEl) {
      return oEl;
    })
    return aReturn.reduce(function(oAg, oEl) {
      oEl = oEl.replace(/\=/g, ":");
      sKey = oEl.split(sColon)[0].trim();
      sValue = oEl.split(sColon)[1].trim();
      oAg[sKey] = sValue;
      return oAg;
    }, {})
  }
}
JSONObjectify.sample=function() { return 'JSONObjectify("branch:main,folder:datascripts");'; }
JSONPS = function(o) { return JSON.parse(JSON.stringify(o)); }
/* END JSON.whatever scripts */

// unique2D vs uniqueLodash vs unique vs unique_getdupes/unique2D_getdupes
function unique2D(aArray) { return unique(aArray.map(function(o){ return JSON.stringify(o); })).map(function(o) { return JSON.parse(o); }) }
function unique2D_getdupes(aArray) {
    var bIsRO = true; if (isVO(aArray)) { aArray = toRO(aArray); bIsRO = false; }; //   if (!bIsRO) { aReturn = toValuesOriented(aReturn); }
    var oReturn = {}
    aArray.forEach(function(oEl) {
      sEl = JSON.stringify(oEl);
      if (oReturn[sEl]) {
        oReturn[sEl] += 1;
      } else {
        oReturn[sEl] = 1;
      }
    })
    
    aReturn = Object.keys(oReturn).map(function(oEl) {
      i = oReturn[oEl];
      oObject = JSON.parse(oEl);
      oObject.dupes = i;
      return oObject;
    })
    if (bIsRO) { return aReturn; } else { return toVO(aReturn); }
}
function unique2D_getdupesOverOne(aArray) {
  var aArrayWDupes = unique2D_getdupes(aArray)
  var bIsRO = true; if (isVO(aArrayWDupes)) { aArrayWDupes = toRO(aArrayWDupes); bIsRO = false; }
  var aArrayWDupesOverOne = aArrayWDupes.filter(function(oEl) { return oEl.dupes > 1; })
  if (aArrayWDupesOverOne.length == 0) { aArrayWDupesOverOne = [{"dupes": "0"}]; }
  if (!bIsRO) { aArrayWDupesOverOne = toVO(aArrayWDupesOverOne); }
  return aArrayWDupesOverOne;
}
// 1D de-duplicating functions...note how 1D getdupes() is derivative of 2D by converting 1D array to a simple 2D array via the new f1Dto2D function
f1Dto2D = function(a) { return a.map(function(oo) { return [oo]; }); }
unique_getdupes = function(a) { return unique2D_getdupes(f1Dto2D(["col"].concat(a)) ); }; unique1D_getdupes = function(a) { return unique_getdupes(a) } 
unique_getdupesOverOne = function(a) { return unique2D_getdupesOverOne(f1Dto2D(["col"].concat(a)) ); }; unique1D_getdupesOverOne = function(a) { return unique_getdupesOverOne(a) } 
// var aArray = 


cartesian = function(args) { // args = aArrayOfArarys
    // permutations / combinations?
    // aArrays = [[0,1], [0,1,2,3], [0,1,2]]; cartesian(aArrays);
    // aArrays = [["a","b","c"], ["d","e"], ["f", "g", "h"], ["i"] ]; cartesian(aArrays);
    var r = [], max = args.length-1;
    function helper(arr, i) {
        for (var j=0, l=args[i].length; j<l; j++) {
            var a = arr.slice(0); // clone arr
            a.push(args[i][j]);
            if (i==max)
                r.push(a);
            else
                helper(a, i+1);
        }
    }
    helper([], 0);
    return r;
}
cartesian.sample=function() { return 'aArrays = [["a","b","c"], ["d","e"], ["f", "g", "h"], ["i"] ]; cartesian(aArrays);'; }

combineArraysRecursivelyCartesian=function(array_of_arrays){if(!array_of_arrays){return[]} // refactor this with cartesian()?  same thing?
if(!Array.isArray(array_of_arrays)){return[]}
if(array_of_arrays.length==0){return[]}
for(var i=0;i<array_of_arrays.length;i++){if(!Array.isArray(array_of_arrays[i])||array_of_arrays[i].length==0){return[]}}
var outputs=[];function permute(arrayOfArrays){var whichArray=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;var output=arguments.length>2&&arguments[2]!==undefined?arguments[2]:"";arrayOfArrays[whichArray].forEach(function(array_element){if(whichArray==array_of_arrays.length-1){outputs.push([output.toString(),array_element.toString()])}else{permute(arrayOfArrays,whichArray+1,output+array_element)}})}
permute(array_of_arrays);return outputs}

chunkize = function(aArray, iChunkSize) {
    var i,j 
    var aChunkedArray = [];
    for (i=0,j=aArray.length; i<j; i+=iChunkSize) {
        aChunkedArray.push(aArray.slice(i,i+iChunkSize));
    }
    return aChunkedArray;
}
chunkize.sample=function() { return "chunkize([1,2,3,4,5,6,7,8,9,0,'A','B','C'], 3)"; }

intersectionString = function(sS1, sS2) { return (sS2.match(new RegExp('[' + sS1 + ']', 'g')) || []).join(''); }
intersectionArray = function(aAr1, aAr2) { return aAr1.filter(function(n) { return aAr2.indexOf(n) !== -1; }); }
intersection = function(aTwoArrays) { // consider refactoring this into datascripts.js
  var s = new Set(aTwoArrays[1]);
  return aTwoArrays[0].filter(function(item)  { s.has(item) } );
};
intersectionMultipleWords = function(sWords) { // this function assumes the sWords are delimited by semicolon.  consider refactoring?
  return intersection(sWords.split(";").map(function(oEl) { return oEl.split(" "); }));
}
// intersectionMultipleWords("TFR Halo Star Valkyrie;Halo Star Valkyrie").join(" ");

intersperse = function(arr, el) {
    var res = [], i=0;
    if (i < arr.length)
        res.push(arr[i++]);
    while (i < arr.length)
        res.push(el, arr[i++]);
    return res;
}
intersperse.sample=function() { return 'intersperse(["a", "b", "c", "d"], "0");'; }

getRanges = function(aArray) {
  // eg getRanges([0,2.1,1,"blah",100,101,2,3,56]) returns ["0-3", "56", "100-101"]
  // converts an array of ints to a list of ranges they are represented by
  uniqueArray=function(arrArg){return arrArg.filter(function(elem,pos,arr){return arr.indexOf(elem)==pos})}
  aArray = aArray.filter(function(oElement) { return !isNaN(parseInt(oElement)); }).map(function(oElement) { return parseInt(oElement) }).sort(function (a, b) {  return a - b;  });
  aArray = uniqueArray(aArray);
  var ranges = [], rstart, rend;
  for (var i = 0; i < aArray.length; i++) {
    rstart = aArray[i];
    rend = rstart;
    while (aArray[i + 1] - aArray[i] == 1) {
      rend = aArray[i + 1]; // increment the index if the numbers sequential
      i++;
    }
    ranges.push(rstart == rend ? rstart+'' : rstart + '-' + rend);
  }
  return ranges;
}
getRange = function(n,r){for(var e=[],t=n;t<=r;t++)e.push(t);return e}
range = function(n,r){for(var e=[],t=n;t<=r;t+=1)e.push(t);return e};
getRange3 = getRange; getRanges2 = getRanges;
getRanges.sample=function() { return 'getRanges([0,2.1,1,"blah",100,101,2,3,56])'; }
getRange.sample=function() { return "getRange(1,5)"; }

getRandomInt = function (min, max) {
  if (!min) { min = 1;}; if (!max) { max = 10;};
  min = min-1; max=max+1; min = Math.ceil(min); max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
getRandomInt.sample=function(){return "_.countBy( getRange(0,1000).map(function(oEl) { return getRandomInt(0,1) }) )";}
getRandomArbitrary=getRandomInt;
/* // getRandomArrayToken is currently in domscripts but needs to be es5ified into datascripts.js
getRandomArrayToken = function(a,i) { // consider refactoring this into datascripts.js?  make es5-friendly
    if (i) {} else (i = 1);
    if (i==1) {
        return a[getRandomInt(0,a.length-1)];
    } else {
        return getRange(0, i-1).map(o=>{ return a[getRandomInt(0,a.length-1)]; });
    }
}
*/

/* string cleanup functions */
function strip_tags(str) {
    str = str.toString();
    return str.replace(/<\/?[^>]+>/gi, '');
}
strip_tags.sample=function() { return '"<table><tr><td>blah</td></tr><tr><td>blah2</td></tr></table"'; }
/* END string cleanup functions */

/* dataGSDSscripts.js => isomorphic, maybe es5 idk, maybe vanilla idk functions that are inspired by and complement googlesheets functions */
// REMOVE dataGSscripts.js from github in favor of datagsscripts.js (make sure I dont do a "Border Gateway Protocol fiasco" like Facebook did)
// 12/15/21 - REMOVE datagsscripts.js entirely from existence and refactor it into permanent part of datascripts.js
try { // remove try/catch when es5ified 100%
    function convertCellToArray(sCell) { return [letterToColumn(sCell.replace(/[0-9]*$/g, "")), parseInt(sCell.replace(/^[A-Z]*/g, ""))]; }
    function convertArrayToCell(aArray) { return columnToLetter(aArray[0]) + aArray[1]; }
    sortAlphaNum = function (a, b) { // converts ["A10", "A1", "A20"] to ["A1", "A10", "A20"]
      return a.localeCompare(b, 'en', { numeric: true });
    };
    cellToColumn = function(sCell) { try { return sCell.toUpperCase().match(/^[A-Z]+/g)[0]; } catch(e) { return undefined; } }
    cellToRow = function(sCell) { try { return sCell.toUpperCase().match(/[0-9]+$/g)[0]; } catch(e) { return undefined; }  }
    // cellToRow("AH378"); cellToColumn("AH378")
    columnToLetter = function(column) {
      // column = column.toUpperCase().match(/[A-Z]+/)[0];
      // columnToLetter(12)
      var temp, letter = '';
      while (column > 0) {
        temp = (column - 1) % 26;
        letter = String.fromCharCode(temp + 65) + letter;
        column = (column - temp - 1) / 26;
      }
      return letter;
    }
    letterToColumn = function(letter) {
      // letter = letter.toString().toUpperCase().match(/[0-9]+/)[0];;
      var column = 0, length = letter.length;
      for (var i = 0; i < length; i++) {
        column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
      }
      return parseInt(column);
    }

    subtractCells = function (sCell1, sCell2) { if (typeof(sCell1) == "string") { var aCell1 = convertCellToArray(sCell1) } else { aCell1
    = sCell1; }  if (typeof(sCell2) == "string") { var aCell2 = convertCellToArray(sCell2) } else { aCell2
    = sCell2; }  return aCell1.map(function(oElement, iIndex) { return oElement - parseInt(aCell2[iIndex]) }) }
    // subtractCells("B1", "A1")
    addCells = function (sCell1, sCell2) { if (typeof(sCell1) == "string") { var aCell1 = convertCellToArray(sCell1) } else { aCell1
    = sCell1; }  if (typeof(sCell2) == "string") { var aCell2 = convertCellToArray(sCell2) } else { aCell2
    = sCell2; }  return aCell1.map(function(oElement, iIndex) { return oElement + parseInt(aCell2[iIndex]) }) }
    // addCells("B1", "A1"); addCells("B1", [1,'1']); addCells("B1", [1,1])


    addA1Notation = function(sA1Notation, sOffset) {
      ((Array.isArray(sA1Notation) ) ? sA1Notation = convertArrayToCell(sA1Notation) : "" );
      ((Array.isArray(sOffset) ) ? sOffset = convertArrayToCell(sOffset) : "" );
      // addA1Notation("table!C2", "C2")
      // sColumn = sA1Notation.match(/([A-Z]*)([0-9]*$)/)[1]
      if (sA1Notation.match(/!/g)) {
        var sTable = sA1Notation.split("!")[0] + "!";
        sA1Notation = sA1Notation.split("!")[1];
      } else {
        var sTable = "";
      }
      // sColumnOffset = convertArrayToCell(addCells(sColumn, sOffset))
      sA1NotationOffset = convertArrayToCell(addCells(sA1Notation, sOffset))
      return sTable + sA1NotationOffset;
    }
    subtractA1Notation = function(sA1Notation, sOffset) {
      ((Array.isArray(sA1Notation) ) ? sA1Notation = convertArrayToCell(sA1Notation) : "" );
      ((Array.isArray(sOffset) ) ? sOffset = convertArrayToCell(sOffset) : "" );
      if (sA1Notation.match(/!/g)) {
        var sTable = sA1Notation.split("!")[0] + "!";
        sA1Notation = sA1Notation.split("!")[1];
      } else {
        var sTable = "";
      }
      sA1NotationOffset = convertArrayToCell(subtractCells(sA1Notation, sOffset))
      return sTable + sA1NotationOffset;
    }

    getGoogleSheetRange = function (sCells) {
        // getGoogleSheetRange("A3:G3,H5,H7")
        aReturn = []
        sCells.replace(/;/, ",").split(",").forEach(function(oElement343) {
            if (oElement343.indexOf(":") > -1) {
                var aCell1Array = convertCellToArray(oElement343.toString().split(":")[0]);
                var aCell2Array = convertCellToArray(oElement343.toString().split(":")[1]);

                aReturn = aReturn.concat(combineArraysRecursivelyCartesian([getRange3(aCell1Array[0],aCell2Array[0]), getRange3(aCell1Array[1],aCell2Array[1])]).map(function(oElement) {
                    return convertArrayToCell(oElement);
                }))
            } else {
                aReturn.push(oElement343);
            }
        })
        return aReturn;
    }
    getGoogleSheetRangeValuesOriented = function(sCells) {  // good lord, can I just refactor getGoogleSheetRangeValuesOriented into rangeToValuesOrientedArray?
        // getGoogleSheetRangeValuesOriented("C4:G5");
        aArray = getGoogleSheetRange(sCells).filter(function(oElement) {
            return oElement.match(/[A-Z]+[0-9]+/);
        }).reduce(function(oAgg, oElement, iIndex) {
            // if (oElement.match(/[A-Z]+/)[0] != oAgg[iIndex].match(/[A-Z]+/)[0])
            if (iIndex == 0) {
                oAgg[0].push(oElement);
                return oAgg;
            } else {
                //console.log("iIndex =" + iIndex);
                //console.log("oAgg = " + JSON.stringify(oAgg));
                //console.log("oElement = " + oElement);
                // console.log("---");
                bCompletedMatrixingTask = false;
                //if (oAgg[oAgg.length-1][0].match(/[0-9]+/)[0] == oElement.match(/[0-9]+/)[0]) {
                // if (oAgg[oAgg.length-1][0].match(/[A-Z]+/)[0] == oElement.match(/[A-Z]+/)[0]) {
                oAgg.forEach(function(oElement345, iIndex) {
                    if(oElement345[0].match(/[0-9]+/)[0] == oElement.match(/[0-9]+/)[0]) {
                        // oAgg[oAgg.length-1].push(oElement);
                        // oAgg[oAgg.length-iIndex].push(oElement);
                        oAgg[iIndex].push(oElement);
                        bCompletedMatrixingTask = true;
                    }
                })
                    // return oAgg;
                //} else {
                if (!bCompletedMatrixingTask) {
                    oAgg.push([oElement]);
                } 
                return oAgg;
                //oAgg[0].push([oElement]);
                //return oAgg;

            }
        }, [[]])
        return aArray; // don't need lodash anymore now that i've done the bCompletedMatrixingTask method
        // return _.zip.apply(_, aArray); // transposes data
    }
} catch(e) {}

/* dataLODASH?PANDASscripts => BEGIN PANDAS-INSPIRED, LODASH-DEPENDENT FUNCTIONS */


// these lodash-related functions are minified into datascripts so I can keep datascripts under 50000 characters, also so I can focus on the "lodash"-ness of these data-related functions.
// note that note all of them are lodash-dependent but the ones that lodash-independent (list them out?) are deeply related to the ones that are lodash-dependent (list those out too?)

// these next two lines are a minified, de-ES6ified version from gs.  think about its repercussions before refactoring officially into datascripts.js
_removeemptyrows = function (e){try{return e.filter(function(e){return""!=e.join("").trim()})}catch(t){return e}}
_join = function(a, b, match, type, merger) {
  // _.assign({}, leftRow, rightRow);
  // merger = (a: Row, b: Row): Row => assign({}, a, b)
  // aLodashJoinsFormulas = toRO([["type","lodashJoins_formula"],["outer","hashFullOuterJoin"],["inner","hashInnerJoin"],["leftouter","hashLeftOuterJoin"],["leftsemi","hashLeftSemiJoin"],["leftanti","hashLeftAntiJoin"],["rightouter","hashRightOuterJoin"],["rightsemi","hashRightSemiJoin"],["rightanti","hashRightAntiJoin"],["h_outer","hashFullOuterJoin"],["h_inner","hashInnerJoin"],["h_leftouter","hashLeftOuterJoin"],["h_leftsemi","hashLeftSemiJoin"],["h_leftanti","hashLeftAntiJoin"],["h_rightouter","hashRightOuterJoin"],["h_rightsemi","hashRightSemiJoin"],["h_rightanti","hashRightAntiJoin"],["nl_outer","nestedLoopFullOuterJoin"],["nl_inner","nestedLoopInnerJoin"],["nl_leftouter","nestedLoopLeftOuterJoin"],["nl_leftsemi","nestedLoopLeftSemiJoin"],["nl_leftanti","nestedLoopLeftAntiJoin"],["nl_rightouter","nestedLoopRightOuterJoin"],["nl_rightsemi","nestedLoopRightSemiJoin"],["nl_rightanti","nestedLoopRightAntiJoin"],["sm_outer","sortedMergeFullOuterJoin"],["sm_inner","sortedMergeInnerJoin"],["sm_leftouter","sortedMergeLeftOuterJoin"],["sm_leftsemi","sortedMergeLeftSemiJoin"],["sm_leftanti","sortedMergeLeftAntiJoin"],["sm_rightouter","sortedMergeRightOuterJoin"],["sm_rightsemi","sortedMergeRightSemiJoin"],["sm_rightanti","sortedMergeRightAntiJoin"]]);
  // a = REMOVEEMPTYROWS(a); b = REMOVEEMPTYROWS(b);
  
  // CLEANSE TABLE A AND TABLE B
  if (isVO(a)) { a = toRO(_removeemptyrows(a)); } else { a = toRO(_removeemptyrows(toVO(a))); } // consider refactoring REMOVEEMPTYROWS to check for isVO?
  if (isVO(b)) { b = toRO(_removeemptyrows(b)); } else { b = toRO(_removeemptyrows(toVO(b))); }
  
  // DETERMINE MATCH
  if (match) {} else { match = toVO(a)[0][0].toString() + ";" + toVO(b)[0][0].toString(); }
  if (match.match(/\;/g)) { // ";" semicolon at the simplest level ("first;firstname") is a SINGLE column match where the column has different keys/columnnames between table A and table B 
    var match_a = match.split(";")[0];
    var match_b = match.split(";")[1];
  } else {
    var match_a = match;
    var match_b = match;
  }
  
  // DETERMINE TYPE
  // rule of thumb: when lodash join type is in doubt, "outer" it out.  
  aLodashJoinsFormulas = toRO([["type","lodashJoins_formula"],["outer","FullOuterJoin"],["inner","InnerJoin"],["left","LeftOuterJoin"],["leftsemi","LeftSemiJoin"],["leftanti","LeftAntiJoin"],["right","RightOuterJoin"],["rightsemi","RightSemiJoin"],["rightanti","RightAntiJoin"]]);
  type = type.toLowerCase();
  type = type.replace(/semiright/, "rightsemi").replace(/semileft/, "leftsemi").replace(/antiright/, "rightanti").replace(/antileft/, "leftanti").replace(/outerright/, "right").replace(/rightouter/, "right").replace(/outerleft/, "left").replace(/leftouter/, "left").replace(/fullouter/, "outer");
  /* PIVOT LOGIC FOR COMBINING PIVOT AND JOIN
  aLodashJoinsFormulas = toRO([["type","lodashJoins_formula"],["outer","FullOuterJoin"],["inner","InnerJoin"],["left","LeftOuterJoin"],["leftsemi","LeftSemiJoin"],["leftanti","LeftAntiJoin"],["right","RightOuterJoin"],["rightsemi","RightSemiJoin"],["rightanti","RightAntiJoin"]]);
  type = type.toLowerCase();
  if type.match(/pivot/g) {
    type = type.replace(/pivot/g, "");
    iIndexA = Object.keys(a[0]).reduce([match_a]
    a = pivottable(a, 
  } else { }
  */
  if (type.match(/^h\_/)) {
      type = type.replace(/^h\_/, "");
      sImplementationAndType = "hash"
  } else if (type.match(/^nl\_/)) {
      type = type.replace(/^nl\_/, "");
      sImplementationAndType = "nestedLoop"
  } else if (type.match(/^sm\_/)) {
      type = type.replace(/^sm\_/, "");
      sImplementationAndType = "sortedMerge"
  } else {
      type = type.replace(/^h\_/, "");
      sImplementationAndType = "hash"
  }
  // aLodashJoinsFormulas = toRO([["type","lodashJoins_formula"],["outer","FullOuterJoin"],["inner","InnerJoin"],["leftouter","LeftOuterJoin"],["leftsemi","LeftSemiJoin"],["leftanti","LeftAntiJoin"],["rightouter","RightOuterJoin"],["rightsemi","RightSemiJoin"],["rightanti","RightAntiJoin"]]);
  sType = (findKey(aLodashJoinsFormulas, "type", type) ? findKey(aLodashJoinsFormulas, "type", type).lodashJoins_formula : "FullOuterJoin");
  sImplementationAndType = sImplementationAndType + sType
  // if (type) { type = type.toLowerCase(); } else { type = 'inner'; }; type = type.replace(/^\_\./, "").replace(/hash/g, "").replace(/nestedloop/g, "").replace(/sortedmerge/g, "");
  // if (type) {} else { type = '_.hashInnerJoin'; }; type = type.replace(/^\_\./, "");
  // es5 incompatible sType = findKey(aLodashJoinsFormulas, "type", type)?.lodashJoins_formula;
  // refactor this type stuff here
  // sType = (findKey(aLodashJoinsFormulas, "type", type).lodashJoins_formula ? findKey(aLodashJoinsFormulas, "type", type).lodashJoins_formula : undefined);
  // if (sType) {} else { sType = '_.hashInnerJoin'; }; // sType = sType.replace(/^\_\./, "") // .replace(/hash/g, "").replace(/nestedloop/g, "").replace(/sortedmerge/g, "");;
  // type = sType;
  
  // DETERMINE MERGER
  // if (merger) {} else { merger = function(obj, leftRow, rightRow) { _.assign({}, leftRow, rightRow); } }
  // _.assign({}, leftRow, rightRow


  //if (typeof(match) == 'string') { 
  accessor_a = function (o) { // "," comma at the simplest level ("firstname,lastname;fullname") is a MULTI column match where the columns are concatenated in order to perform the match with a column (or multi columns) between table A and table B
    // return o[match_a];
    // es5 incompatible return match_a.split(",").map(o2=>o[o2]).join("-");
    return match_a.split(",").map(function(o2) { return o[o2]; }).join("");
  } 
  accessor_b = function (o) {
    // return o[match_b];
    // es5 incompatible return match_b.split(",").map(o2=>o[o2]).join("-");
    return match_b.split(",").map(function(o2) { return o[o2]; }).join("");
  }  
  //}
  sEv = "(_." + sImplementationAndType + "(a, accessor_a, b, accessor_b) )";
  sEvDebugging = JSON.stringify(sEv);
  try {
    sEvd = eval(sEv);
    if (sEvd.length>0) {
      return toVO(sEvd);
    } else {
      return [["no results"]];
    }
  } catch(e) { return [[e+sEvDebugging]] }
  // return function () { try { return eval(sEv) } catch (e) { return [[e + sEv]]; } }();
  //return JSON.stringify(b);
  // return toVO(_.hashInnerJoin(a, accessor, b, accessor));
}

_unique = function(aArray, aColumns) {
    // eg uniqueLodash(aRO, ["Type", "Document Number", "Internal ID"])
    var bIsRO = true; if (isVO(aArray)) { aArray = toRO(aArray); bIsRO = false; }; 
    if (aColumns == undefined) {
      aColumns = Object.keys(aArray[0]);
    }
    var aArrayReturn = _.uniqWith(
      aArray,
      function (oA, oB) {
        // oA[aColumns[0]] === oB[aColumns[0]]
        aColumns.reduce( function (oAgg, oEl, iIn) {
            oAgg = oAgg && (oA[oEl] == oB[oEl]);
            return oAgg;
        }, true )
      });
    if (bIsRO) { return aArrayReturn; } else { return toVO(aArrayReturn); }
}; lodashunique = function(a,b) { return _unique(a,b); }

// _merge is basically replaced by _join / lodash-joins.js.  I don't think it's used anywhere?  Get rid?
_merge = function(a, b, sKey, sKey2) { if (sKey2) {} else {sKey2 = sKey}; return _.values(_.merge(_.keyBy(a, sKey), _.keyBy(b, sKey2))); }; lodashmerge = function(a,b,c,d) { return _merge(a,b,c,d); }

_transpose = function (a) {
  if (isVO(a)) {
    aReturn = a[0].map(function (_, colIndex) {
      return a.map(function (row) {
        return row[colIndex];
      });
    });
    // aReturn = _.zip.apply(_, a);
  } else {
    aReturn = toRO(toVO(a)[0].map(function (_, colIndex) {
      return toVO(a).map(function (row) {
        return row[colIndex];
      });
    }));
    // aReturn = toRO(_.zip.apply(_, toVO(a)));
  }
  return aReturn;
};transpose = function (a) {
  return _transpose(a);
};


melt = function (aInputArray, aColumns) {
  // if (isVO(aInputArray)) { aInputArray = toRecordsOriented(aInputArray); }
  var bIsRO = true; if (isVO(aInputArray)) { aInputArray = toRO(aInputArray); bIsRO = false; };

  aInputArray = normalizeRecordsOriented(aInputArray);
  // REFACTOR OUT .flat() in favor of flatten() to make this friendly with es5 servers?
  // aColumns = ["COUNT(*)", "matrix_child", "matrix_child_2"];
  // aColumns = [0,1,2];
  aRecordsOrientedArray = JSONPS(aInputArray);
  
  var aColumnsIntegers = Object.keys(aRecordsOrientedArray[0]).map(function(oElement098, iIndex098) { return iIndex098.toString() });
  if (aColumns) {} else { aColumns = "-0"; } // "-0" is the default parameter expectation from UNPIVOT or MELT.
  if (aColumns == "*") { aColumns = aColumnsIntegers.join(","); } // melting all columns into just a variables and values columns is silly but it's good for demo purposes 
  var sColumnsChecker = aColumns;

  if (sColumnsChecker[0] == "-") { // then inverse list of columns
    sColumnsChecker = sColumnsChecker.slice(1, sColumnsChecker.length);
    aColumns = aColumnsIntegers; // Object.keys(aRecordsOrientedArray[0]).map(function(oElement098, iIndex098) { return iIndex098.toString() })
    sColumnsChecker.split(",").forEach(function(oElement098) {
      aColumns.splice( aColumns.indexOf(oElement098), 1)
    })
  } else { if (!Array.isArray(aColumns)) { aColumns = sColumnsChecker.split(","); } }
  sColumns = aColumns.join(",")
  
  if (parseInt(aColumns[0]) != NaN) { // convert ints to columnnames - old: typeof(aColumns[0])=="number" || 
      aColumns = aColumns.map(function(oElement) { return Object.keys(aRecordsOrientedArray[0])[parseInt(oElement)] })
  } else {}
    // console.log(aColumns);

    var aReturn = aRecordsOrientedArray.map(function(oElement) {
    // return flatten(aRecordsOrientedArray.map(function(oElement) {
        oElement = JSONPS(oElement);
        return aColumns.map(function(oElement000) {
            //console.log(oElement000)
            oElement.variable = oElement000;
            oElement.value = oElement[oElement000];
            // console.log(oElement);
            oElement = JSONPS(oElement);
            //delete oElement[oElement000];
            return JSONPS(oElement);
        })
    }).flat().map(function(oElement) {
    // }) ).map(function(oElement) {
        oElement = JSONPS(oElement);
        aColumns.forEach(function(oElement000) {
            delete oElement[oElement000];
        })

        return oElement; 
    })
    
    if (!bIsRO) { aReturn = toVO(aReturn); };
    return aReturn;
}

flatten = function(aArray) {
    // if (!isVO(aArray)) { aArray = toVO(aArray)};
    // this = aArray;
    // Array.prototype.flatten = Array.prototype.flatten || function() {
    // consider refractoring this prototype function or nah?
    var flattened = [];
    for (var i = 0; i < aArray.length; ++i) {
        if (Array.isArray(aArray[i])) {
            flattened = flattened.concat(aArray[i]); // .flatten());
        } else {
            flattened.push(aArray[i]);
        }
    }
    return flattened;
};

explode = function (aInputArray, aColumns, sDelimiter) {
    var bIsRO = true; if (isVO(aInputArray)) { aInputArray = toRO(aInputArray); bIsRO = false; }; // if (!bIsRO) { aReturn = toVO(aReturn); };

    aInputArray = normalizeRecordsOriented(aInputArray);
    // explode is like excel's horizontal splitting/unnesting, but it unnests vertically
    if (typeof(aColumns) == "string" && aColumns.match(/^[0-9]*/)) {
        aColumns = aColumns.replace(/ /g, ","); aColumns = aColumns.split(",").map(function(o) { return parseInt(o); })
    }
    
    if (!Array.isArray(aColumns)) { aColumns=[aColumns]; }

    function flatten(a) {
      return Array.isArray(a) ? [].concat.apply([], a.map(flatten)) : a;
    }
     // "Directed by";
    if (typeof(aColumns[0]) == "number") {
        var sColumn = Object.keys(aInputArray[0])[aColumns[0]]
    } else { var sColumn = aColumns[0]; }
    aReturn = flatten(aInputArray.map(function(oElement999) {
        if (oElement999[sColumn].toString().split(sDelimiter).length > 1) { 
            return oElement999[sColumn].toString().split(sDelimiter).map(function(oElement) {
                return Object.keys(oElement999).reduce(function(oAgg000, oElemment000) {
                    if (oElemment000 == sColumn) {
                        oAgg000[oElemment000] = oElement.trim(); // oElement.toString().trim();
                    } else {
                        oAgg000[oElemment000] = oElement999[oElemment000];
                    }
                    return oAgg000;
                }, {})
                //console.log(aResults[0][oElement]);
                //console.log(Object.keys(aResults[0]).indexOf("Directed by"))

            }) 
        } else { return oElement999 }
    })); // .flat()
    if (!bIsRO) { aReturn = toVO(aReturn); };
    return aReturn;
}
// SAMPLE DATA FROM https://en.wikipedia.org/wiki/List_of_The_X-Files_episodes
// sanitizeRecordsOrientedData(toRecordsOriented(convertHTMLTableToValuesOriented("table.wikitable.plainrowheaders.wikiepisodetable")))

leftantiArray = function(a,b) { return a.filter(function(item) { return b.indexOf(item) === -1 }) };

pivottable=function(aInputArray, aPivotInstructions, bReplaceColumnNames) {
    var bIsRO = true; if (isVO(aInputArray)) { aInputArray = toRO(aInputArray); bIsRO = false; };
    aInputArray = normalizeRecordsOriented(aInputArray);
    
    function parseFloatForSUM(sString) {
        if (isNaN(sString) || sString == "" || sString == undefined || sString == null || sString == NaN) { sString = 0 }
        return parseFloat(sString);
    }
    
    function pivot_table(aRecordsOrientation, aPivotInstructions, bReplaceColumnNames) {
       // replace columns starting with an int with "num_" to temporarily fix bug
       aRecordsOrientation = toRO(toVO(aRecordsOrientation));
       aRecordsOrientationCOPY = toRO(toVO(aRecordsOrientation));
       var aValuesaOriented = toVO(aRecordsOrientation);
       aValuesaOriented[0] = aValuesaOriented[0].map(function(oElement) { if (oElement.match(/^[0-9]/g)) { oElement = "num_" + oElement } return oElement; })
       aRecordsOrientation = toRO(aValuesaOriented);

      if (aPivotInstructions) {} else { // if aPivotInstructions is null then do a random pivot
        aPivotInstructions = getRandomInt(0, Object.keys(aRecordsOrientation[0]).length-1) + "  * listaggU";
      }
      
      // aPivotInstructions = "2 4,5 7 listaggU";      
      if (typeof(aPivotInstructions) == "string") {
        
        aPivotInstructions = aPivotInstructions.split(" ").map(function(oEl, iIn) {
          if (iIn == 3) {
            return oEl.split(",")
          } else {
            return oEl.split(",").map(function(oEl0) {
                if (oEl0 == "") {
                    // return 0;
                    return "";
                } else {
                    if (oEl0 == "*") {
                        return oEl0;
                    } else { return parseInt(oEl0); }
                }
            })
          }
        })
        // console.log(aPivotInstructions);
      }
       // aPivotInstructions = [[2],[4,5],[7],[listaggU]]      
       if (typeof(aPivotInstructions[0][0]) == "number") {
        // convert strs to int columns
        // aPivotInstructions2 = aPivotInstructions.map(function(oElement0, iIndex0) { return ((iIndex0 != 3 ) ? oElement0.map(function(oElement) { return Object.keys(aRecordsOrientation[0]).indexOf(oElement) }) : oElement0); })
        // convert int to str columns
           // console.log(aPivotInstructions)
            aUsedColumns = []; // aPivotInstructions[2][0] == "*"
            aPivotInstructions = aPivotInstructions.map(function(oElement0, iIndex0) {
                return ((iIndex0 != 3 ) ? function() {aAA = flatten(oElement0.map(function(oElement) {
                sColumnNameFromInteger = Object.keys(aRecordsOrientation[0])[oElement.toString()];
                if(oElement) { aUsedColumns.push(oElement.toString()); }
                if (sColumnNameFromInteger != undefined) {
                    return sColumnNameFromInteger;
                } else {
                    if (oElement == "*") {
                        // aUsedColumns = ['0', '3']
                        // find where values in the left 1D array are NOT in the right 1D array
                        aAllColsInts = range(0,Object.keys(aRecordsOrientation[0]).length-1).map(function(o9) { return o9.toString(); });
                        aAsteriskColumns = leftantiArray(aAllColsInts, aUsedColumns).map(function(o231) { return Object.keys(aRecordsOrientation[0])[o231]; } );
                        return aAsteriskColumns;
                    } else {
                        return [];
                    }
                }
            })); return(aAA) }() : oElement0); })
            if (aPivotInstructions[1][0] == "") { aPivotInstructions[1] = []; }
        }
        // .replace(/[^A-Za-z_]+/g,"_")
        // REPLACE aRecordsOrientation with underscored keys and toString()'d values'
        var sToEval = "";
        try {
            aRecordsOrientation = aRecordsOrientation.map(function(oElement001) {
                return Object.keys(oElement001).reduce(function(agg000, oElement000) {
                    // is this null to blank string necessary?  consider removing...
                    oElement000 = ((oElement000 == null) ? "" : oElement000)
                    var sNewKey = oElement000.replace(/[^A-Za-z_0-9]+/g,"_");
                    agg000[sNewKey] = ((oElement001[oElement000] == null) ? "" : oElement001[oElement000].toString());
                    return agg000;
                }, {})
            });
            // REPLACE aPivotInstructions
            aPivotInstructions[0] = aPivotInstructions[0].map(function(oElement000) {
                return oElement000.toString().replace(/[^A-Za-z_0-9]+/g,"_")
            });
            aPivotInstructions[1] = aPivotInstructions[1].map(function(oElement000) {
                return oElement000.toString().replace(/[^A-Za-z_0-9]+/g,"_")
            });
            aPivotInstructions[2] = aPivotInstructions[2].map(function(oElement000) {
                return oElement000.toString().replace(/[^A-Za-z_0-9]+/g,"_")
            });

            var oRecordsOrientationGroup = _.groupBy(aRecordsOrientation, function(value){
                    return aPivotInstructions[0].map(function(oElement) { return value[oElement] }).join("#");
                });

            var aColumnsIndex = [["_"]]; var aColumnsIndexAllCombinations = [["_"]];

            if (aPivotInstructions[1].length > 0) {
                aColumnsIndex = aPivotInstructions[1].map(function(oElement0){ return _.uniqBy(aRecordsOrientation, oElement0).map(function(oElement1) { return oElement1[oElement0]; }); });

                aColumnsIndexAllCombinations = aColumnsIndex.reduce(function (a, b) {
                  return a.reduce(function (r, v) {
                    return r.concat(b.map(function (w) {
                      return [].concat(v, w);
                    }));
                  }, []);
                });

                // do this iff the len of aPivotInstructions[2] is only 1 (aka only one columns index)
                if (typeof(aColumnsIndexAllCombinations[0]) == "string") { aColumnsIndexAllCombinations = aColumnsIndexAllCombinations.map(function(oElement0) { return [oElement0] }) }
            }
            sFirstPartOfReturn = aPivotInstructions[0].reduce(function(agg, oElement) { return agg + "'" + oElement + "': group[0]['" + oElement + "'],\n"}, "");
            sSecondPartOfReturn = ""

            aPivotInstructions[2].forEach(function(sValueTitle, iIndex0) {
                var sFunctionInstructions = aPivotInstructions[3][iIndex0];
                if (!sFunctionInstructions) { sFunctionInstructions = aPivotInstructions[3][0]; } // allows me to shorthand a single function to all data
                sFunctionInstructions.split("-").forEach(function(sAggInstruction, iIndex000) {
                    sAggInstruction = sAggInstruction.toLowerCase(); sAggInstruction = sAggInstruction.replace(/np\./g, "").replace(/ns\_concat/g, "listagg");
                    if (JSON.stringify(aColumnsIndexAllCombinations) != '[["_"]]') { // if there exists columns as defined in aColumnsIndex
                        aColumnsIndexAllCombinations.forEach(function(aColumnsTitle) {
                            // .replace(/[\W_]+/g,"") - replace all non-alphanumeric characters with blank
                            sTitle = "'" + sValueTitle.replace(/[\W_]+/g,"") + "_" + sAggInstruction + "_" + aColumnsTitle.join('_').replace(/[\W_]+/g,"") + "'"; // console.log(sTitle);
                            sObject = aColumnsTitle.reduce(function(agg, oElement1, iIndex1){ return agg + "'" + aPivotInstructions[1][iIndex1] + "': '" + oElement1 + "',"} , "")
                            if (sAggInstruction == "listagg") {
                                var sObjectToBuildOutTemplate = "<%= sTitle %>: _.filter(group, {<%= sObject %>}).reduce(function(agg, oElement) { return {<%= sValueTitle %>: [agg.<%= sValueTitle %>, oElement.<%= sValueTitle %>].filter(function (sElement) { return sElement != ''; }).join(';')}}, {<%= sValueTitle %>: ''}).<%= sValueTitle %>,";
                            } else if (sAggInstruction == "listaggu") {
                                var sObjectToBuildOutTemplate = "<%= sTitle %>: _.uniq(_.filter(group, {<%= sObject %>}).reduce(function(agg, oElement) { return {<%= sValueTitle %>: [agg.<%= sValueTitle %>, oElement.<%= sValueTitle %>].filter(function (sElement) { return sElement != ''; }).join(';')}}, {<%= sValueTitle %>: ''}).<%= sValueTitle %>.split(';')).join(';'),";
                            } else if (sAggInstruction == "sum") {
                                var sObjectToBuildOutTemplate = "<%= sTitle %>: _.filter(group, {<%= sObject %>}).reduce(function(agg, oElement) { return {<%= sValueTitle %>: agg.<%= sValueTitle %> + parseFloatForSUM(oElement.<%= sValueTitle %>) }}, {<%= sValueTitle %>: 0}).<%= sValueTitle %>,";
                            } else if (sAggInstruction == "len") {
                                var sObjectToBuildOutTemplate = "<%= sTitle %>: _.filter(group, {<%= sObject %>}).length,";
                            } else {
                                var sObjectToBuildOutTemplate = "<%= sTitle %>: JSON.stringify(group),"; // 'Sorry, this is not a valid agg instruction!'";
                                var sObjectToBuildOutTemplate = "<%= sTitle %>: {sTitle: <%= sTitle %>, sObject: <%= sObject %>, sValueTitle: <%= sValueTitle %>, group: JSON.stringify(group)},"; // 'Sorry, this is not a valid agg instruction!'";
                                // var sObjectToBuildOutTemplate = "<%= sTitle %>: 'Sorry, this is not a valid agg instruction!'"
                            } 
                            var templateFn = _.template(sObjectToBuildOutTemplate);
                            sSecondPartOfReturn += templateFn({sTitle: sTitle, sObject: sObject, sValueTitle: sValueTitle}) + String.fromCharCode(10);

                        })
                    } else {  // elseif there exists NO columns (aColumnsIndex is blank)
                        sTitle = "'" + sValueTitle.replace(/[\W_]+/g,"") + "_" + sAggInstruction + "'";
                        //  sObject = aColumnsTitle.reduce(function(agg, oElement1, iIndex1){ return agg + "'" + aPivotInstructions[1][iIndex1] + "': '" + oElement1+ "',"} , "")
                        if (sAggInstruction == "listagg") {
                            var sObjectToBuildOutTemplate = "<%= sTitle %>: group.reduce(function(agg, oElement) { return {<%= sValueTitle %>: [agg.<%= sValueTitle %>, oElement.<%= sValueTitle %>].filter(function (sElement) { return sElement != ''; }).join(';')}}, {<%= sValueTitle %>: ''}).<%= sValueTitle %>,";
                        } else if (sAggInstruction == "listaggu") {
                            var sObjectToBuildOutTemplate = "<%= sTitle %>: _.uniq(group.reduce(function(agg, oElement) { return {<%= sValueTitle %>: [agg.<%= sValueTitle %>, oElement.<%= sValueTitle %>].filter(function (sElement) { return sElement != ''; }).join(';')}}, {<%= sValueTitle %>: ''}).<%= sValueTitle %>.split(';')).join(';'),";
                        } else if (sAggInstruction == "sum") {
                            var sObjectToBuildOutTemplate = "<%= sTitle %>: group.reduce(function(agg, oElement) { return {<%= sValueTitle %>: agg.<%= sValueTitle %> + parseFloatForSUM(oElement.<%= sValueTitle %>) }}, {<%= sValueTitle %>: 0}).<%= sValueTitle %>,";
                        } else if (sAggInstruction == "len") {
                            var sObjectToBuildOutTemplate = "<%= sTitle %>: group.length,";
                        } else {
                            // var sObjectToBuildOutTemplate = "<%= sTitle %>: JSON.stringify(group),"; // 'Sorry, this is not a valid agg instruction!'";
                            var sObjectToBuildOutTemplate = "<%= sTitle %>: JSON.stringify({<%= sTitle %>: JSON.stringify(group)}),"; // 'Sorry, this is not a valid agg instruction!'";
                            // var sObjectToBuildOutTemplate = "<%= sTitle %>: {sTitle: <%= sTitle %>, sObject: 'sObject', sValueTitle: <%= sValueTitle %>, group: JSON.stringify(group)},"; // 'Sorry, this is not a valid agg instruction!'";
                        } 
                        var templateFn = _.template(sObjectToBuildOutTemplate);
                        sSecondPartOfReturn += templateFn({sTitle: sTitle, sValueTitle: sValueTitle}) + String.fromCharCode(10);
                    }
                })
            })

            sToEval = "var aPivotedData = _.map(oRecordsOrientationGroup, function(group){ return {\n" + sFirstPartOfReturn + sSecondPartOfReturn + "\n}; });"
            // console.log(sToEval); // eval(sToEval)
            eval(sToEval);
            // copy(JSON.stringify(aPivotedData))
            //console.log("oRecordsOrientationGroup = " + JSON.stringify(oRecordsOrientationGroup));
            //console.log("aColumnsIndexAllCombinations" + JSON.stringify(aColumnsIndexAllCombinations));
            //console.log(sToEval)
            
            if (bReplaceColumnNames) {
                // this 3rd parameter (bReplaceColumnNames) only works when there's no more than 1 sAggInstruction AND when there's no columnColumns
                // console.log(aRenamedColumns);
                // aRenamedColumns = Object.keys(aRecordsOrientationCOPY[0]);
                // console.log(aPivotInstructions[0]);
                // console.log(aPivotInstructions[2]);
                aRenamedColumns = aPivotInstructions[0].concat(aPivotInstructions[2]);
                // console.log(aRenamedColumns);

                aPivotedData.forEach(function(oEl) {
                    Object.keys(oEl).forEach(function(oEl0, iIn0) {
                        if (iIn0 > 0) {
                            oEl[aRenamedColumns[iIn0]] = oEl[oEl0];
                            delete oEl[oEl0];
                        }
                    })
                })

            }
            return aPivotedData;
        } catch(eError) {
            return [eError, sToEval];
        }
    }
    var aReturn = pivot_table(aInputArray, aPivotInstructions, bReplaceColumnNames);
    if (!bIsRO) { aReturn = toVO(aReturn); };
    return aReturn;

}




/* END PANDAS-INSPIRED, LODASH-DEPENDENT FUNCTIONS */


/* data JMP Tidy.js dplyr and the tidyverse in R */

/* dataENCODEscripts => superhtmlEntities/superencode/superHtmlDecode.minified.js */
// encode encodes apostrophes too!
superencode = function(s){ // superencode("~!.*()-_") is the same, consider refractoring? DONE -> refactored this into supersuperencode if needed.
  // superencode = function (str){  return encodeURIComponent(str).replace(/'/g, "%27"); }
  // return w.replace(/[^]/g,function(w){return '%'+w.charCodeAt(0).toString(16)})
  return encodeURIComponent(s).replace(/'/g, "%27");
}

supersuperencode = function(s) { // this is a more zealous version of superencode where it attempts to encodeURIComponent as much as possible (rather than just apostraphes)
  return superencode(s).replace(/\!/g, "%21").replace(/\*/g, "%2A").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\`/g, "%60")
}

superhtmlEntities = function(s) {
  // superhtmlEntities=function(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;").replace(/`/,"&#96;")};
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;').replace(/`/g, '&#96;'); //.replace(/?/g, '&#xB4;');
}


superencodeS = function (s) { return superencode(s); }
supersuperencodeS = function (s) { return supersuperencode(s); }
superhtmlEntitiesS = function (s) { return superhtmlEntities(s); }


superHtmlDecode = function(sString) {
  // superHtmlDecode("blah blah blah &lt;whatever&gt;");
  // consider refactoring this in:
  // replace(/&lt/g, "&lt;").replace(/&gt/g, "glt;")
  // in order to include "blah blah $ltwhatever&gt".  why do some sources not include semicolon?
  var entities= {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": "\"",

    "&apos;": "'",
    "&#96;": "`",
  };

  for (var prop in entities) {
    if (entities.hasOwnProperty(prop)) {
      sString = sString.replace(new RegExp(prop, "g"), entities[prop]);
    }
  }
  return sString;
}

// need to "supervariablize()" the columns in _pivot()'s input aRO data because columns with symbols (such as <> or ampersand) in them I get a "Error Result was not automatically expanded, please insert more columns (4052)".  supervariableize() is just a wrapper around superencode() and probably needs have better replacement logic than "PERCENTANGESIGN", maybe btoa("PERCENTAGESIGN")?
supervariableize = function(s) {
  return supersuperencode(s).replace(/\~/g, "TILDESIGN").replace(/\./g, "PERIODSIGN").replace(/\%/g, "PERCENTANGESIGN").replace(/-/g, "DASHSIGN").replace(/\&/g, "AMPERSANDSIGN").replace(/\?/g, "QUESTIONSIGN");
}
superdevariableize = function(s) { return decodeURIComponent(s.replace(/TILDESIGN/g, "~").replace(/PERIODSIGN/g, ".").replace(/PERCENTANGESIGN/g, "%").replace(/DASHSIGN/g, "-").replace(/PERCENTANGESIGN/g, "%").replace(/AMPERSANDSIGN/g, "&").replace(/QUESTIONSIGN/g, "?")); }


// domDATAHTML.es5.scripts
// THE FOLLOWING CODE USED TO BE "domscripts.serversafe", but now its just part of domDATAHTML.es.js scripts
// pseudocode for new domscript function - refactor convertOSRToHTMLTable, convertRecordsOrientedArrayToHTMLTable, convertValuesOrientedToHTMLTable into one solution? 
toHTMLSelect=function(aArray, sSelectIDOrClasses, iSelected, bBlank) { // refractor this to accept array of values vs array of objects (select id?)
    var sSelectID = returnIDAndOrClasses(sSelectIDOrClasses).id;
    var sSelectClasses = (returnIDAndOrClasses(sSelectIDOrClasses).classes + " aArraySelect").trim();
    if (sSelectID) { sSelectID = " id='" + sSelectID + "'"; }        
    
    if (Array.isArray(aArray)) {} else { aArray = [aArray]; }
    if (bBlank) { bBlank = "" } else { bBlank = "<option></option>"; }
    // aArray = JSON.parse(JSON.stringify(aArray)); aArray.unshift
    return "<select " + sSelectID + " class='" + sSelectClasses + "'>" + bBlank + aArray.map(function(o,i) { return "<option value='" + superhtmlEntities(o) + "'" + ((iSelected==i) ? " selected": "")+ ">" + superhtmlEntities(o) + "</option>"; }).join("")+"</select>";
}
toHTMLTable = function(aArrayOrObject, aColumns, sTableID) {
  // refactor the two functions into datascripts
  isRO = function(a) { return (Array.isArray(a) && !Array.isArray(a[0]) ); }; isRecordsOriented = function(a) { return isRO(a); }
  isOSR = function(a) { return (!Array.isArray(a) && a.allcells != undefined); };

  if (isVO(aArrayOrObject)) {
    return convertValuesOrientedToHTMLTable(aArrayOrObject, aColumns, sTableID);
  } else if (isOSR(aArrayOrObject)) {
    return convertOSRToHTMLTable(aArrayOrObject, aColumns, sTableID);
  } else if (isRO(aArrayOrObject)) {
    return convertRecordsOrientedArrayToHTMLTable(aArrayOrObject, aColumns, sTableID);
  }
}
// refactoring opportunities for returnIDAndOrClasses, convertRecordsOrientedArrayToHTMLTable, and convertValuesOrientedToHTMLTable
// get rid of try/catches in favor of the es6-friendly versions (these are es5-friendly only for NS purposes), get rid of fFunction = function() format, use destructuring in convertRecordsOrientedArrayToHTMLTable and convertValuesOrientedToHTMLTable rather than calling returnIDAndOrClasses() twice, etc etc
returnIDAndOrClasses = function(sIDAndOrClasses) {
    try { sIDAndOrClasses = sIDAndOrClasses.replace(" ", "_"); } catch(e) {}
    var sID = ""; var sClasses = ""; var aMatches;
    try { aMatches = sIDAndOrClasses.match(/(\#|\.)(\w*)/g); } catch(e) {}
    if (aMatches) { // try to find an id and/or classes
        // console.log(aMatches);
        try { sID = sIDAndOrClasses.match(/(\#)(\w*)/)[2]; } catch(e) {} // just match the first (ie 2th) match - eg returnIDAndOrClasses(".blah#wat#what#whatever"); returns id=wat
        try { sClasses = sIDAndOrClasses.match(/(\.)(\w*)/g).map(function(ooo) { return ooo.replace(/\./g, "").replace(" ", "_") }).join(" "); } catch(e) {}
        // sTableID = "";
    } else { // if (sID) { // assume it's an id being passed through if no # and . indicators
        sID = (sIDAndOrClasses ? sIDAndOrClasses : "" );
        // sTableID = sTableID;
        // sClasses = "aRO aRecordsOriented convertRecordsOrientedArrayToHTMLTable _gsws gsws";
    }
    // if (sID == undefined || sID.length==0 ) { sID = ""; } else { sID = " id='" + sID + "'"; }
    return {id: sID, classes: sClasses};
}
// convertValuesOrientedToHTMLTable(toVO(toRO([["one","two","three"],[4,5,6],[7,8,9]])), undefined, "#wat")
// convertRecordsOrientedToHTMLTable((toRO([["one","two","three"],[4,5,6],[7,8,9]])), undefined, "#wat")
// returnIDAndOrClasses(".blah");
// returnIDAndOrClasses("#blah.wat#what.whatever.whateverblah");
// returnIDAndOrClasses("#blah.testing_12.hello.wat");
// returnIDAndOrClasses("blah");
// returnIDAndOrClasses(".blah# blah2");
convertRecordsOrientedArrayToHTMLTable = function(aRecordsOriented, aColumns, sTableIDOrClasses) {
    // sTableID = "#blah.testing_12.hello"; sTableID = "asdfasf";
    var sTableID = returnIDAndOrClasses(sTableIDOrClasses).id;
    var sTableClasses = (returnIDAndOrClasses(sTableIDOrClasses).classes + " aRO aRecordsOriented convertRecordsOrientedArrayToHTMLTable convertRecordsOrientedToHTMLTable RecordsOrientedArrayToHTML _gsws gsws").trim();
    var sRawTableID = ""; // consider refactoring this redundant variable out?
    if (sTableID) { sRawTableID = sTableID; sTableID = " id='" + sTableID + "'"; }
    
    console.log(sRawTableID);
    // convertRecordsOrientedArrayToHTMLTable(aRecordsOriented)
    function returnAllKeysAmongAllObjectsInRecordsOrientedArray(aRecordsOriented) { return aRecordsOriented.reduce(function(agg, oElement313) { agg = agg.concat(Object.keys(oElement313)); agg = unique(agg); return agg; }, []) }
    if (aColumns == undefined) {
        // var aColumns = Object.keys(aRecordsOriented[0]);
        aColumns = returnAllKeysAmongAllObjectsInRecordsOrientedArray(aRecordsOriented);
    }

    sHTMLTable = "<table " + sTableID + " class='" + sTableClasses + "' style='margin: 0 auto; text-align: center;'>" + aRecordsOriented.reduce(function(agg, oElement, iIndex) {
        agg = agg + "<tr>" + aColumns.reduce(function(agg000, oElement000, iIndex000) {
            var sCell = columnToLetter(iIndex000+1) + (iIndex+2);
            var sClasses = "gsws gscell gsws_" + sRawTableID + " " + sCell + " row" + (iIndex+2) + " column" + columnToLetter(iIndex000+1) + " cellcolumn" + iIndex000;
            console.log(sClasses);
            agg000 = agg000 + "<td title='" + sCell + "' class='" + sClasses + "'>" + oElement[oElement000] + "</td>"; // style='text-align:left'
            return agg000;
        }, "") + "</tr>";
        return agg;
    }, 
        "<thead><tr>" + aColumns.reduce(function(agg001, oElement001, iIndex001) {
            var sCell = columnToLetter(iIndex001+1) + "1";
            var sClasses = "gsws gscell gsws_" + sRawTableID + " " + sCell + " row1 column" + columnToLetter(iIndex001+1) + " cellcolumn" + iIndex001;
            // var sClasses = "gsws row1 column" + columnToLetter(iIndex001+1) + " cellcolumn" + iIndex001;
            return agg001 + "<th title='" + sCell + "' class='" + sClasses + "'>" + oElement001 + "</th>"; // style='border-right: 1px solid black; border-left: 1px solid black;'
        }, "") + "</tr></thead><tbody>"
    ) + "</tbody></table>";
        return sHTMLTable;
}; convertRecordsOrientedToHTMLTable = function(aRO, aColumns, sTableIDOrClasses) { return convertRecordsOrientedArrayToHTMLTable(aRO, aColumns, sTableIDOrClasses) }

convertValuesOrientedArrayToHTMLTable = function(aValuesOriented, aColumns, sTableIDOrClasses) {
    var sTableID = returnIDAndOrClasses(sTableIDOrClasses).id;
    var sTableClasses = (returnIDAndOrClasses(sTableIDOrClasses).classes + " aVO aValuesOriented convertValuesOrientedArrayToHTMLTable convertValuesOrientedToHTMLTable ValuesOrientedArrayToHTML _gsws gsws").trim();
    if (sTableID) { sTableID = " id='" + sTableID + "'"; }
    /// convertValuesOrientedToHTMLTable([[1,2,3,4],[0,0,0,0],[9,9,9,9]], undefined, "gswsvo")
    function returnAllKeysAmongAllObjectsInRecordsOrientedArray(aRecordsOriented) { return aRecordsOriented.reduce(function(agg, oElement313) { agg = agg.concat(Object.keys(oElement313)); agg = unique(agg); return agg; }, []) }

    if (aColumns == undefined) {
        // var aColumns = Object.keys(aRecordsOriented[0]);
                 // aColumns = returnAllKeysAmongAllObjectsInRecordsOrientedArray(aRecordsOriented);
    }
    // gsws gsws_SDJOWholeForm A4 gscell columnA row4
    sHTMLTable = "<table " + sTableID + " class='" + sTableClasses + "'" + " style='margin: 0 auto; text-align: center;'>" + aValuesOriented.reduce(function(agg, oElement, iIndex) {
    // sHTMLTable = "<table id='" + sTableID + "' class='convertValuesOrientedToHTMLTable gsws gsws_" + sTableID + "' style='margin: 0 auto; text-align: center;'>" + aValuesOriented.reduce(function(agg, oElement, iIndex) {
                if (iIndex==0) {
          sTHEADBODYBEG = "<thead>";
          sTHEADBODYEND = "</thead>";
          sTDTH = "th";
        } else {
          sTHEADBODYBEG = "";
          sTHEADBODYEND = "";
          sTDTH = "td";
        }
              if (iIndex==1) {
          sTHEADBODYBEG = "<tbody>";
          if (aValuesOriented.length != 2) {
            sTHEADBODYEND = "";
          }
        }
              if (iIndex==aValuesOriented.length-1 && iIndex!=0) {
          if (aValuesOriented.length != 2) {
            sTHEADBODYBEG = "";
          }
          sTHEADBODYEND = "</tbody>";          
        }
              agg = agg + sTHEADBODYBEG + "<tr>" + oElement.reduce(function(agg000, oElement000, iIndex000) {
            //console.log(oElement);
            var sCell = columnToLetter(iIndex000+1) + (iIndex+1);
            var sClasses = "gsws gscell gsws_" + sTableID + " " + sCell + " row" + (iIndex+1) + " column" + columnToLetter(iIndex000+1) + " cellcolumn" + iIndex000;
            agg000 = agg000 + "<" + sTDTH + " title='" + sCell + "' class='" + sClasses + "'>" + oElement000 + "</" + sTDTH + ">"; // style='text-align:left'
            return agg000;
        }, "") + "</tr>" + sTHEADBODYEND;
        return agg;
    }, "") + "</table>";
    return sHTMLTable.replace(/ id=''/g, "");
}; convertValuesOrientedToHTMLTable = function(aVO, aColumns, sTableIDOrClasses) { return convertValuesOrientedArrayToHTMLTable(aVO, aColumns, sTableIDOrClasses) }

convertRecordsOrientedArrayToExcelXML = function(aArray, aColumns) {
  // convertRecordsOrientedArrayToExcelXML
  // normalize aRecordsOriented
  var aRecordsOriented = normalizeRecordsOriented(toValuesOriented(aArray));
  aColumns = aColumns || undefined;
  if (aColumns == undefined) {
    var aColumns = Object.keys(aArray[0]);
  }
  function convertSingleArrayToExcelRow(aSingleArray) {
    return "<Row>" + aSingleArray.reduce(function(agg000, oElement000, iIndex000) {
      if (Array.isArray(oElement000)) { oElement000 = JSON.stringify(oElement000) }
      oElement000 = oElement000.toString();
      agg000 = agg000 + "<Cell><Data ss:Type=\"String\">" + oElement000.replace(/</g, "").replace(/>/g, "").replace(/\"/g, "").replace(/\n/g, " ") + "</Data></Cell>";
      return agg000;
    }, "") + "</Row>";
  }
  return '<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40"><Worksheet ss:Name="Sheet1"><Table>' + aArray.reduce(function(agg, oElement, iIndex) { // Object.keys(oElement).map vs aColumns.map
    return agg + convertSingleArrayToExcelRow(aColumns.map(function(oElement007){ return oElement[oElement007]}) );
  }, convertSingleArrayToExcelRow(aColumns) ) + "</Table></Worksheet></Workbook>";
}

convertaRecordsOrientedToInputBoxesForm = function(oICIResponse, aFields) {  
    if (aFields == undefined) { aFields = Object.keys(oICIResponse); }
    return aFields.reduce(function(agg009, oElement009, iIndex009) {
        if (oICIResponse[oElement009] == undefined) { oICIResponse[oElement009] = ""; }
        sValue = oICIResponse[oElement009];
        if (typeof(sValue) != "string") { sValue = JSON.stringify(sValue) }
        if (oICIResponse[oElement009].toString().indexOf("\n") > -1) {
            agg009 = agg009 + "<tr><td><b>" + oElement009 + ": </b></td><td><textarea rows='10' cols='30' class='inputtedObject' id='label_" + oElement009 + "' name='label_" + oElement009 + "' />" +  superhtmlEntities(sValue) + "</textarea></td>";
        } else {
            agg009 = agg009 + "<tr><td><b>" + oElement009 + ": </b></td><td><input style='width:100%' class='inputtedObject' type='text' id='label_" + oElement009 + "' name='label_" + oElement009 + "' value='" + superhtmlEntities(sValue) + "' /><td>";
        }
        return agg009;
    }, "<table>") + "</table>"
}
GSDS_disjointedRangeToAVO = function(sA1Notation) { // this function is NOT FOR DOM, just string/data-only
  if (sA1Notation.match(/\*/g)) { return "ERROR - ASTERISK functions are for domTable ONLY!" } else {
    // this function single-handledly dismantles getGoogleSheetRange and getGoogleSheetRangeValuesOriented
    sA1Notation = sA1Notation.replace(/\-/g, ":").replace(/,/g, ";"); // sanitize
    a1DCells = unique(sA1Notation.split(";").map(function(oEl) {
      oEl=oEl.trim();
      if (oEl.match("^:")) { oEl = "A1" + oEl; }
      if (oEl.match(":$")) { return "ERROR - ASTERISK IS ASSUMED HERE.";  }
      if (oEl.indexOf("\:") > -1) { return getGoogleSheetRange(oEl); } else { return oEl; }
    }).flat().sort(sortAlphaNum));
    // determine lowest cell and highest cell
    iHighestColumn = a1DCells.reduce(function(oAg, oEl) {
      return ((oAg<letterToColumn(cellToColumn(oEl))) ? letterToColumn(cellToColumn(oEl)) : oAg) 
    }, 0)
    
    iLowestColumn = a1DCells.reduce(function(oAg, oEl) {
      return ((oAg>letterToColumn(cellToColumn(oEl))) ? letterToColumn(cellToColumn(oEl)) : oAg) 
    }, iHighestColumn)
    
    iHighestRow = a1DCells.reduce(function(oAg, oEl) {
      return ((oAg<parseInt(cellToRow(oEl))) ? parseInt(cellToRow(oEl)) : oAg) 
    }, 0);
    
    iLowestRow = a1DCells.reduce(function(oAg, oEl) {
      return ((oAg>parseInt(cellToRow(oEl))) ? parseInt(cellToRow(oEl)) : oAg) 
    }, iHighestRow);
    sExpansiverRange = columnToLetter(iLowestColumn) + iLowestRow + ":" + columnToLetter(iHighestColumn) + iHighestRow;
    //console.log("Expansive Range - " + sExpansiverRange);
    var a2DCells = getGoogleSheetRangeValuesOriented(sExpansiverRange);
    // var a2DCells = getGoogleSheetRangeValuesOriented(a1DCells[0] + ":" + a1DCells.slice(-1)[0]); NO FUNCIONA
    return a2DCells.map(function(oEl) { return oEl.map(function(oEl2) {
      if (a1DCells.indexOf(oEl2) > -1) { return oEl2; }
    }) }); 
  }
}
GSDS_disjointedRangeToAVO.sample = function() { return 'GSDS_disjointedRangeToAVO("-A2;A2:B4; D4,E5:F5;G1:H2,H1-H9,L8,:B2, G8")' }
// REFACTOR - I don't think flat() is es5-friendly but let it through for now
// GSDS_disjointedRangeToArray = function(sA1Notation) { return GSDS_disjointedRangeToAVO(sA1Notation).flat().filter(function(oEl) { return oEl; }) }
GSDS_disjointedRangeToArray = function(sA1Notation) { return flatten(GSDS_disjointedRangeToAVO(sA1Notation)).filter(function(oEl) { return oEl; }) }

function hyperlink(sURL, sName, bNoTarget) {
   if (sName) {} else {sName = "link"}
   if (sName.match(/hyperlink/)) { // html ahref hyperlink
     return "=hyperlink(\"" + sURL + "\", \"" + sName + "\")";
   } else { // googlesheets hyperlink
     return "<a " + ((bNoTarget) ? "": "target='_blank' ") + "href='" + sURL + "'>link</a>";
   }
}