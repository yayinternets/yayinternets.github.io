// 2022 "meta-dom" functions - dom_modalize_img_tags,dom_li_paginate, dom_li_paginate_fadeGroup, dom_changeTitleAndFavicon, dom_addImageOverlays, dom_deconstructDOM, dom_load_library
function dom_modalize_img_tags() {
    // solution from codepen https://codepen.io/RileyB/pen/XQyaXy
    // prereqs: in your HTML just surround the img elements with <span class="image-modal-content"><img ></span>;
    // where img has these attributes: data-title="My Cool Title" data-description="This is a super Cool Title" data-url="https://riley.gg/" data-repo="https://github.com/Riley-Brown"
    // SURROUND IT ALL W/: 
    // script type="text/javascript">document.addEventListener("DOMContentLoaded", function(event) { /* code */ }); /script>
    /* eg: 
    script type="text/javascript">document.addEventListener("DOMContentLoaded", function(event) {
        dom_modalize_img_tags();
    }); </script
    */

    var sModalHTML = `
    <style>
    .image-modal-content {cursor: zoom-in;}  
    /* style for demo purposes   */
    /*
    * {
      margin: 0;
      padding: 0;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }
    */
    
    /* modal content styles */
    .modal-content-wrapper {
      max-width: 1400px;
      width: 90%;
      display: flex;
      margin: auto;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 70px 0;
    }
    .modal-content-wrapper .image-modal-content {
      flex: 0 0 30%;
      cursor: pointer;
      transition: 300ms ease-out;
      margin-right: 20px;
      margin-bottom: 40px;
    }
    @media (max-width: 992px) {
      .modal-content-wrapper .image-modal-content {
        flex: 0 0 45%;
      }
    }
    @media (max-width: 550px) {
      .modal-content-wrapper .image-modal-content {
        flex: 0 0 100%;
      }
    }
    .modal-content-wrapper .image-modal-content:hover {
      transform: scale(1.03);
      transition: 300ms ease-in;
    }
    .modal-content-wrapper .image-modal-content img {
      width: 100%;
      height: 300px;
      object-fit: cover;
      border-radius: 10px;
      border: 1px solid #222;
    }
    
    /* modal popup styles */
    .image-modal-popup {
      position: fixed;
      overflow: auto;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.8);
      color: #fff;
      animation: 500ms fadeIn;
      display: none;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    .image-modal-popup .wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 1200px;
      margin: auto;
      margin-top: 30px;
      position: relative;
    }
    
    .image-modal-popup .description {
      text-align: center;
    }
    .image-modal-popup img {
      width: 80%;
      max-height: calc(100vh - 150px);
      margin-bottom: 10px;
      cursor: pointer;
    }
    .image-modal-popup span {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 4rem;
      color: red;
      cursor: pointer;
    }
    .image-modal-popup p {
      margin: 5px auto;
      font-size: 1.1rem;
    }
    .image-modal-popup a {
      margin-bottom: 5px;
      display: inline-block;
      color: #222;
      font-weight: 500;
      text-decoration: none;
      background: #fff;
      margin: 10px 10px;
      padding: 10px 15px;
      border-radius: 6px;
    }
    
    </style>
    <div class="image-modal-popup">
        <div class="wrapper">
         <span>&times;</span>
          <img src="" alt="Image Modal">
          <div class="description">
            <h1>This is placeholder content</h1>
            <p>This content will be overwritten when the modal opens</p>
            <a href="#" target="_blank" rel="noopener noreferrer">View Cool Link</a>
            <a href="#" class="secondary-link" target="_blank" rel="noopener noreferrer">View Another Link</a>
          </div>
        </div>
      </div>
    `;
    oEl = document.createElement("div");
    oEl.innerHTML = sModalHTML;
    document.body.appendChild(oEl);
    
    
    // code from https://codepen.io/RileyB/pen/XQyaXy
    // all images inside the image modal content class
    const lightboxImages = document.querySelectorAll('.image-modal-content img');
    
    // dynamically selects all elements inside modal popup
    const modalElement = element =>
      document.querySelector(`.image-modal-popup ${element}`);
    
    const body = document.querySelector('body');
    
    // closes modal on clicking anywhere and adds overflow back
    document.addEventListener('click', () => {
      body.style.overflow = 'auto';
      modalPopup.style.display = 'none';
    });
    
    const modalPopup = document.querySelector('.image-modal-popup');
    
    // .title, .description, .url, .repo, .src 
    
    // loops over each modal content img and adds click event functionality
    lightboxImages.forEach(img => {
      const data = img.dataset;
      img.addEventListener('click', e => {
        body.style.overflow = 'hidden';
        e.stopPropagation();
        modalPopup.style.display = 'block';
        if (data.title) { modalElement('h1').style.display = ""; modalElement('h1').innerHTML = data.title; } else { modalElement('h1').style.display = "none"; }
        if (data.description) { modalElement('p').style.display = ""; modalElement('p').innerHTML = data.description; } else { modalElement('p').style.display = "none"; }
        if (data.url) { modalElement('a').style.display = ""; modalElement('a').href = data.url; } else { modalElement('a').style.display = "none"; }
        if (data.repo) { modalElement('.secondary-link').style.display = ""; modalElement('.secondary-link').href = data.repo; } else { modalElement('.secondary-link').style.display = "none"; }
    
        modalElement('img').src = img.src;
      });
    });    
}

function dom_li_paginate(el, aList) {
	// el is any <li> in the dom, it will hide all its ul/ol and append a button to paginate it out
    // consider refactoring withoutu aList allow it to assume that the button always says 'more', and that the chunksize number is assumed by spaces?  idk, gotta think it out...
	//eg:
	if (aList) {} else { aList = ["More..."]; }
    // assumptions:
    el.$$$("ul, ol").forEach(o=>o.style.display="none");
    el.appendHTML(`<button onclick='dom_li_paginate_fadeGroup(this);' id='show-more-btn'>${aList[0]}</button>`);
    $$$$("#show-more-btn").dataset.index = "0";
    $$$$("#show-more-btn").dataset.total = el.$$$("ul, ol").length;
    $$$$("#show-more-btn").dataset.iterations = aList.length;
    $$$$("#show-more-btn").dataset.chunksize = Math.ceil( el.$$$("ul, ol").length / aList.length );
    $$$$("#show-more-btn").dataset.aList = JSON.stringify(aList); // figure out a way to refactor this out..
}

function dom_li_paginate_fadeGroup(oThis) { // assumes .show-more-item:hidden and aImages exists
    // eg oThis = $$$$("li")
    // console.log(oThis.parentNode.$$$('.li[style="display:none;"'));

    aHiddenNodes = oThis.parentNode.$$$a('ul[style="display: none;"], ol[style="display: none;"]');
    
    var iNumberOfElementsToFadeIn = parseInt(oThis.dataset.chunksize);
    // console.log(aHiddenNodes);
    aHiddenNodes = aHiddenNodes.slice(0,iNumberOfElementsToFadeIn);
    // OLD vanilla, but need to refactor back in since I like vanilla over jQuery
    // $(".show-more-item:hidden").slice(0,3).fadeIn();
    aHiddenNodes.forEach(o=>$(o).fadeIn());

    if (oThis.parentNode.$$$a('ul[style="display: none;"], ol[style="display: none;"]').length == 0) {
        oThis.style.display="none";
    }

    aList = JSON.parse(oThis.dataset.aList);

    // iterator - certainly there's a way to simplify?
    var iIndex = parseInt($$$$("#show-more-btn").dataset.index);
    $$$$("#show-more-btn").innerHTML = aList[parseInt(iIndex+1)];
    $$$$("#show-more-btn").dataset.index = JSON.stringify(iIndex+1);

    
    /*
    var iIndex = parseInt($$$$("#show-more-btn").dataset.index);
    $$$$("#show-more-btn").innerHTML = aMoreButton[parseInt(iIndex+1)];
    $$$$("#show-more-btn").dataset.index = JSON.stringify(iIndex+1);
    
    // document.querySelector("#mario").src = aImages[Math.ceil($(".show-more-item:hidden").length / 3 - 1)];
    $(".show-more-item:hidden").slice(0,3).fadeIn();
    // if ($(".show-more-item:hidden").length < 1) $(".show-more-btn").fadeOut();
    */
}

function dom_changeTitleAndFavicon(sTitle, sURL) { // refactor to make <link rel undoable
    // eg dom_changeTitleAndFavicon("title",'❤️');
    // dom_changeTitleAndFavicon("title",'https://earlyinvesting.com/wp-content/themes/earlyinvesting-redesign/templates/components/svgs/inc-icon-logo.svg');
    // GITHUB.io hack - change favicon/title -->
    document.title = sTitle; // vs window.top.document.title?
    if (sURL) {
        if (sURL.length<5) { // then assume emoji.ico
            document.head.appendHTML(`<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${sURL}</text></svg>">`)
        } else { // then assume url.ico
            // script>window.addEventListener('load', function() { changeFavIcon(); }, false )</script
            var link = document.querySelector("link[rel~='icon']");
            if (!link) {
                            link = document.createElement('link');
                            link.rel = 'icon';
                            document.getElementsByTagName('head')[0].appendChild(link);
            }
            link.href = sURL;
        }
    }
}
function dom_addImageOverlays(oElement, sURL, aaTags, iHeight, iWidth, ) {
    /* injects an image onto a dom element and overlays html over it. use GIMP to get pixels eg:
        script> // Bensinger AGI Political Compass
        window.addEventListener('load', function() { 
                // BEGIN - clear tags
                //document.querySelectorAll(".tags").forEach(o=>o.remove())
                // generated from // https://docs.google.com/spreadsheets/d/1QtdWMxs7QlL2Q1czk07uGEBmldwplOFB064-Z6z1BAc/edit#gid=373060173
                var aaTags = [["blah",0,0], ["blah",50,50], ["blah",100,100]];
                // var oElement = document.querySelectorAll(".Bensinger")[0];
                dom_addOverlaysToImage (
                        document.body,
                        "https://i.imgur.com/NTL6S2y.jpg",
                        aaTags,
                        1000, 1000
                );

        }, false )
        </script

    */
                // undo - 
                // document.querySelectorAll(".tags").forEach(o=>o.remove())
                oElement.style.backgroundImage = "url(" + sURL + ")"
                oElement.style.height = iHeight;
                oElement.style.width = iWidth;
                oElement.style.backgroundSize = "100% 100%";

                aaTags.forEach((a)=>{
                                oNewElement = document.createElement("div");
                                oNewElement.classList = ["tags"];
                                oNewElement.innerHTML = a[0];
                                oNewElement.style.position = "absolute";
                                oNewElement.style.left = oElement.getBoundingClientRect().x + a[1];
                                oNewElement.style.top = oElement.getBoundingClientRect().y + a[2];
                                document.body.appendChild(oNewElement);
                })

}

function dom_deconstructDOM(bDebug) {
    function cropLeft45000(s) {
        if (s.length>45000) {
            s = "YIKES" + s.length + "\n" + s.substring(0,45000);
        }
        return s;
    }
    
// function dom_deconstructDOM(sType, bDontDelete50000) {
    bDontDelete50000 = true;
    sType = "";
    //bDelete50000 = !bDelete50000; // 
// function deconstructDOM(sType, bDelete50000) {
    // copy(toTabDelimited(dom_deconstructDOM()))
        var aArray = Array.from(document.head.children).concat(Array.from(document.body.children));
  
    if (sType == "all") { // because sType == undefined doesn't work 
        
    } else if (sType == "head") {
        var aArray = Array.from(document.head.children);
    } else if (sType == "body") {
        var aArray = Array.from(document.body.children);
    }
    var aReturn = aArray.map((o,i)=>{
        if (o.nodeName == "SCRIPT") {
            if (o.src && o.src.match(/js$/) ) {
                // return { "head": o.outerHTML }
                return { "library": cropLeft45000(o.src), }
            } else {
                // if (o.innerHTML.trim().match(/document\.addEventListener\('DOMContentLoaded'\, \(event\) \=\> \{(.*)\}\)\;/)) {
                if (o.outerHTML.trim().match(/addEventListener/)) {
                    console.log("test")
                }
                return { "script": cropLeft45000(o.innerText), }
            }
        } else if (o.nodeName == "LINK" && o.href.match(/css$/) ) {
            return { "library": cropLeft45000(o.href), };
        } else if (o.nodeName == "STYLE") {
            return { "css": cropLeft45000(o.innerText), };
        } else {
            // var bDontDelete50000 = bDelete50000// !bDelete50000;
                //if (bDelete50000) {
                //    return {"script": ""};
                //} else 
            sText = cropLeft45000(o.outerHTML);
            /*
            if (sText.length > 49000) {
                try {
                    sDeconstructionNotes = "yikes, @" + i + " - " + sText.length + " cannot be deconstructed into a gscell, but o has " + o.children.length + " children and can be deconstructed maybe? " + (Array.from(o.children).map(oo=>oo.children.length).join(",") );
                    // o.children.map(oo=>console.log(oo.children));
                } catch(e) { sDeconstructionNotes = ""; } 
            }*/ 
            oReturn = {};
            // oReturn[o.parentNode.nodeName.toLowerCase()] = (o.outerHTML.length > 49000 && bDontDelete50000 ? `<pre>${o.outerHTML.length} was removed per bDontDelete50000; sDeconstructionNotes = ${sDeconstructionNotes}</pre>` : o.outerHTML);
            oReturn[o.parentNode.nodeName.toLowerCase()] = sText;
            return oReturn;
        }
    }).flat();

    // begin reduce
    // consolidate library into single cell
    aLibraries = [];
    aReturn = aReturn.reduce((a,e,i) => { if (e.library) { aLibraries.push(e.library); } else { a=a.concat(e) }; return a; }, [])
    aReturn[0].library = aLibraries.join("\n");

    // remove blanks
    aReturn = toRO(toVO(aReturn).filter(o=>o.join("")))
    // end reduce
    aReturn[0].notes = window.location.href + "/n" + "https://wappalyzer.com/lookup/" + window.location.href + "/n" + "https://builtwith.com/?" + superencode(window.location.href);
    console.log("copy(toTabDelimited(dom_deconstructDOM()))");
    window.open("https://builtwith.com/?" + superencode(window.location.href));
    if (bDebug) {
        return aReturn.map((oo,ii)=>{ return Object.keys(aReturn[ii]).map(o=>aReturn[ii][o].length) });
    } else {
        return aReturn;
    }

    // window.open("https://wappalyzer.com/lookup/" + window.location.href);
    
}


function dom_load_library(sLibrary, bDisplaySample) {
    var aLibrariesVO = [["object","link","unit test sample"],["chart","https://cdn.jsdelivr.net/npm/chart.js","// pending"],["highcharts","https://code.highcharts.com/highcharts.js","// pending"],["p5","https://cdnjs.com/libraries/p5.js","// pending"],["pug","https://s3-us-west-2.amazonaws.com/s.cdpn.io/229301/jade.js","div.my-class#my-id\n  h1.my-heading An example page of Jade/Pug elements in context\n  p Set \"Jade\" as the HTML preprocesor for this to work, view the HTML & toggle \"View Compiled\".\n  \n  h2 HTML stuff: images, lists, paragraphs, amd links\n  img.my-img-class(src=\"http://www.webdevelopersstudio.com/images/logo.png\")\n  ul.genre-list\n    li An unordered list\n    li The first letter grouping on a line assumed to be a tag\n    li Indents and white space count\n  p. \n    This is a long paragraph that will not be treated as individual lines because of the dot after the p tag.  Note the verbiage must start on the line following the p and the dot.\n  p But apparently, you can have a long paragraph that goes to the end of the soft line wrap like this line is doing just about now, and you don't need the dot thing.  Not sure about that.    \n  p By the way, we're following along with \n    a(href='https://www.sitepoint.com/jade-tutorial-for-beginners/') this nice tutorial,\n    |  but we don't always need to pace through.  Sometimes we just need robust examples in context! For example, examine the uncompiled code to see the \"pipe\" mark to indicate not to start a new paragarph after the anchor.  \n \n  h2 Javascript: the easy bits\n   div\n    ol\n     - for (var i=1; i<=x; i++) {\n      li a dash introduces a bit of js. a FOR, on index # #{i}!\n     - }\n  p But we can also use magic Jade looping syntax\n  - var points = [\"Array item 1\", \"Item 2\", \"And here 3 are all shown with a shortened 'for' situatated inside abbreviated tags\"]\n  \n  h3 Let's Iterate the Jade way\n  for point in points\n    div.card\n     p= point\n  em But for some reason 'span' doesn't work.  'div' does.  \n  \n  h3 An  Interpolation example\n  - var myName = \"Terri Karp\";\n  div\n    p This is my name #{myName} as you can see.  Similar to Template Literals in ES6, but we use a pound sign.  OK then.  (See othr ex. in the ul above.)\n  \n  h2 Mixins: define a pattern and use again and again\n  \n  h3 Simple list as a mixin (not much point)\n  mixin a-list(name)\n    li.a-list= name\n  ul\n    +a-list('item 1')\n    +a-list('second item')\n    +a-list('last one') \n  \n  h3 But they get more complex, and the tighter syntax is useful  \n  mixin pic(picHeight, picWidth, picCaption)\n    figure.pic\n      img(src=\"http://placekitten.com/#{picHeight}/#{picWidth}\")\n      figcaption.image-caption= picCaption\n  +pic (\"300\", \"200\", \"Specifing width, height, & caption.\")\n  +pic (\"300\", \"100\", \"Short cute kitten.\")\n \n  h3 And we can ask questions\n  mixin book(bookTitle, bookRating)\n   ul.book\n     li.title-class= bookTitle \n       if bookRating > 3\n         span.rating    ...You'll love it\n       else\n         span.rating    ...You won't like it\n \n  +book (\"Othello\", 2)\n  +book (\"Hamlet\", 4)"],["marked","https://cdnjs.cloudflare.com/ajax/libs/marked/0.5.0/marked.min.js\nhttps://unpkg.com/turndown/dist/turndown.js\n","// pending"],["_","https://cdn.jsdelivr.net/lodash/4/lodash.min.js","// pending"],["$","https://code.jquery.com/jquery-3.6.0.min.js","// pending"],["animate.css","https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css","// pending"],["d3","https://cdnjs.cloudflare.com/ajax/libs/d3/7.3.0/d3.min.js","// pending"],["d3v4","https://d3js.org/d3.v4.js","// pending"],["gsap","https://unpkg.co/gsap@3/dist/gsap.min.js","// pending"],["ALL","https://cdnjs.cloudflare.com/ajax/libs/marked/0.5.0/marked.min.js\nmylibraries+animate+lodash+moment+d3\n\nhttps://manueldelanda.github.io/datascripts.js\nhttps://manueldelanda.github.io/datacss.css\nhttps://manueldelanda.github.io/domscripts.js\n\nhttps://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css\n\nhttps://cdn.jsdelivr.net/lodash/4/lodash.min.js\nhttps://cdn.jsdelivr.net/npm/lodash-joins@3.1.1/dist/lodash-joins.min.js\n\nhttps://unpkg.com/lodash.combinations@18.10.0/index.js\nhttps://unpkg.com/lodash.multicombinations@1.0.0/index.js\nhttps://unpkg.com/lodash.permutations@1.0.0/index.js\nhttps://unpkg.com/lodash.multipermutations@1.0.0/index.js\n\n// https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js\nhttps://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js\n\nhttps://cdnjs.cloudflare.com/ajax/libs/lz-string/1.4.4/lz-string.min.js\n\nhttps://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js\n\nhttps://d3js.org/d3.v4.js\n// https://cdnjs.cloudflare.com/ajax/libs/d3/7.3.0/d3.min.js\n\nhttps://manueldelanda.github.io/datascripts.js\nhttps://manueldelanda.github.io/datacss.css\nhttps://manueldelanda.github.io/domscripts.js\n\nhttps://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css\n\nhttps://cdn.jsdelivr.net/lodash/4/lodash.min.js\nhttps://cdn.jsdelivr.net/npm/lodash-joins@3.1.1/dist/lodash-joins.min.js\n\nhttps://unpkg.com/lodash.combinations@18.10.0/index.js\nhttps://unpkg.com/lodash.multicombinations@1.0.0/index.js\nhttps://unpkg.com/lodash.permutations@1.0.0/index.js\nhttps://unpkg.com/lodash.multipermutations@1.0.0/index.js\n\n\nhttps://manueldelanda.github.io/datascripts.js\nhttps://manueldelanda.github.io/datacss.css\nhttps://manueldelanda.github.io/domscripts.js","   \"https://cdnjs.cloudflare.com/ajax/libs/mathjs/9.4.4/math.js\",\n   //\"https://cdnjs.cloudflare.com/ajax/libs/html-minifier/4.0.0/htmlminifier.min.js\",   \n   //\"https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.10.2/beautifier.min.js\",\n   //\"https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js\",\n   //\"https://cdn.jsdelivr.net/npm/php-js@0.0.5/index.min.js\",\n   \"https://cdn.jsdelivr.net/lodash/4/lodash.min.js\",\n   \"https://code.jquery.com/jquery-3.6.0.min.js\",\n   \"https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/js/bootstrap.min.js\",\n   \"https://bossanova.uk/jspreadsheet/v4/jexcel.js\",\n   \"https://jsuites.net/v4/jsuites.js\",\n   //\"https://cdnjs.cloudflare.com/ajax/libs/fuzzyset.js/0.0.8/fuzzyset.min.js\",\n   //\"https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.0.1/papaparse.min.js\",\n   //\"https://gmousse.github.io/dataframe-js/dist/dataframe.min.js\",\n   //\"https://cdnjs.cloudflare.com/ajax/libs/ramda/0.25.0/ramda.min.js\", \n   //\"https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/moment.min.js\",\n   \"https://manueldelanda.github.io/datascripts.js\",\n   \"https://manueldelanda.github.io/domscripts.js\",\n   \"https://manueldelanda.github.io/dataGSscripts.js\","],["_joins","https://cdn.jsdelivr.net/npm/lodash-joins@3.1.1/dist/lodash-joins.min.js\nhttps://unpkg.com/lodash.combinations\nhttps://unpkg.com/lodash.multicombinations\nhttps://unpkg.com/lodash.permutations\nhttps://unpkg.com/lodash.multipermutations","// unit tests for lodash.joins and lodash.combinations\naLengths = []; // lodash unit test for lengths\naLengths[aLengths.length] = _.permutations([\"apple\",\"banana\",\"orange\"], 3).length; // returns 6\naLengths[aLengths.length] = _.multipermutations([\"apple\",\"banana\",\"orange\"], 3).length; // returns 27\naLengths[aLengths.length] = _.combinations([\"apple\",\"banana\",\"orange\"], 3).length; // returns 1\naLengths[aLengths.length] = _.multicombinations([\"apple\",\"banana\",\"orange\"], 3).length; // returns 10\n\nvar left = toRO([[\"id\",\"left\"],[\"c\",0],[\"c\",1],[\"e\",2]]);\nvar right = toRO([[\"id\",\"right\"],[\"a\",0],[\"b\",1],[\"c\",2],[\"c\",3],[\"d\",4],[\"f\",5],[\"g\",6]]);\nvar accessor = function (obj) { return obj['id']; };\naLengths[aLengths.length] = _.hashInnerJoin(left, accessor, right, accessor).length; // returns 4\n\naLengths[aLengths.length] = _join(left,right,undefined,\"inner\").length; // _join is a wrapper that also returns 4, but actually returns 5 because it's VO and not RO\n\naLengths.join(\",\"); // should return 6,27,1,10,4,5"],["lz","https://cdn.jsdelivr.net/gh/pieroxy/lz-string/libs/lz-string.js","// pending"],["moment","https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js","// pending"],["date-fns","https://cdnjs.cloudflare.com/ajax/libs/date-fns/1.30.1/date_fns.min.js","// pending"],["aes","https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js","// pending"],["pandas","https://cdn.jsdelivr.net/npm/danfojs@1.1.0/lib/bundle.min.js","json_data = [{ A: 0.4612, B: 4.28283, C: -1.509, D: -1.1352 },\n            { A: 0.5112, B: -0.22863, C: -3.39059, D: 1.1632 },\n            { A: 0.6911, B: -0.82863, C: -1.5059, D: 2.1352 },\n            { A: 0.4692, B: -1.28863, C: 4.5059, D: 4.1632 }]\n\ndf = new dfd.DataFrame(json_data)\ndf.print()"]];

    aLibrariesRO = toXXXOrientated(toRO(aLibrariesVO), "object")
    sLinks = aLibrariesRO[sLibrary].link.split("\n");
    sSample = aLibrariesRO[sLibrary]["unit test sample"]; //.split("\n");
    if (bDisplaySample) {
        console.log(sSample);
    }
    domLoadScripts_Link(sLinks);
    //try {marked} catch(ee) {
    //    domLoadScripts_Link(sLinks)
    //}
}



