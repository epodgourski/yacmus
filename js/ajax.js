Handlebars.registerHelper('getNodeControlButton', function(id) {
  var _t="node";
  var result = '<div style="float:right" class="dropdown"><button style="margin:0px;" href="#" data-toggle="dropdown" class="dropdown-toggle btn btn-default btn-xs glyphicon glyphicon-cog" onClick="getControlActions(this,'+id+',\'' + _t +'\');"></button> <ul id="control_' + id + '" class="dropdown-menu dropdown-menu-right" role="menu"></ul></div>';
return result;
});

function responsive_filemanager_callback(field_id){
    return ya_GBLocalClose_();
    }

function getControlActions(btn,node_id,elem) {
    $(btn).parent().find("ul:first").html("");
    $.getJSON("/my/actions/"+node_id+"/"+elem,function(data) {
        $.each(data, function(i, field){
           $(btn).parent().find("ul:first").append("<li>" + field.content + "</li>");
            });
        });
    }

function __getScrollY (document) {
var scrollY = 0;
  if( document.documentElement && document.documentElement.scrollTop ) {
    return document.documentElement.scrollTop;
  }
  else if( document.body && document.body.scrollTop ) {
    return document.body.scrollTop;
  }
  else if( window.pageYOffset ) {
    return window.pageYOffset;
  }
  else if( window.scrollY ) {
    return window.scrollY;
  }
  return scrollY;

    }

function ya_GBdoCalc() {
// ## @fixme очень странное сочетание jQuery и javascript - position vs offset + show() ???

    trans   = document.getElementById('ya_gbCalc');
    //trans.style.position='absolute';
//    setPositionX(trans,0,0);
//    setPositionY(trans,0,0);
    
    trans.style.height = Math.max(document.body.clientHeight,document.documentElement.clientHeight)+'px';
    trans.style.width = (document.body.clientWidth)+'px'; // ### @fixme : doesn't work !!!
    trans.style.display='block';

    var calc = $('#ya_gbCalc');
    calc.offset({top:0, left:0});
    calc.css('width',$(window).width);
    calc.css('height',($(window).height+$(document).scrollTop()));
//   calc.show();
 
    return true;
    }   

function setPositionX (block,marge,shift) {
    block.style.right = (marge-shift)+'px'; 
    return true;
    }
function setPositionY (block,marge,shift) {
    scrollY = __getScrollY(document);
    block.style.bottom = (marge-shift-scrollY)+'px';
    return true;
    }

function ya_showGB(url,message) {
    $('html, body').css({'overflow': 'hidden','height': '100%'});

    scrollY = __getScrollY (document);
    ya_GBdoCalc();
    dc      = document.getElementById('ya_gbContainer');
    title   = document.getElementById('ya_gbTitle');
    shad    = document.getElementById('ya_gbShadow');

    dc.innerHTML = "<iframe id='ya_gbFrame' scrolling='yes' src=''></iframe>";
    iframe  = document.getElementById('ya_gbFrame');

    dc.style.top=(scrollY+25)+'px';
    dc.style.left='25px';
    setPositionX(dc,25,0);
    setPositionY(dc,25,0);

    shad.style.left='35px';
    shad.style.top=(scrollY+35)+'px';
    setPositionX(shad,25,10);
    setPositionY(shad,25,10);

    title.style.top=(scrollY+25)+'px';
    title.style.left='25px';
    setPositionX(title,25,0);

    shad.style.display='block';

    dc.style.display='block';

    title.innerHTML = "<img src='/my/static/img/close.png' onClick='javascript:ya_GBLocalClose_();'><span>"+message+"</span>";
    title.style.display = 'block';

    iframe.style.width=iframe.parentNode.style.width;
    iframe.src=url;
    }
function ya_GBLocalClose_() {
//alert('test');
    $('html, body').css({'overflow': 'auto', 'height': 'auto'});

    document.getElementById('ya_gbFrame').src='';
    document.getElementById('ya_gbCalc').style.display='none';
    document.getElementById('ya_gbContainer').style.display='none';
    document.getElementById('ya_gbShadow').style.display='none';
    document.getElementById('ya_gbTitle').style.display='none';


    $('#ya_gbFrame').fadeOut(1600);
    $('#ya_gbCalc').fadeOut(1600);
    $('#ya_gbContainer').fadeOut(1600);
    $('#ya_gbShadow').fadeOut(1600);
    $('#ya_gbTitle').fadeOut(1600);

    }   
function ya_GBRemoteClose_ () {
//    $('html, body').css({'overflow': 'auto','height': 'auto'});
    parent.document.getElementById('ya_gbFrame').src='';
    parent.document.getElementById('ya_gbCalc').style.display='none';
    parent.document.getElementById('ya_gbContainer').style.display='none';
    parent.document.getElementById('ya_gbShadow').style.display='none';
    parent.document.getElementById('ya_gbTitle').style.display='none';
    }
