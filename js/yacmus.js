function confirmDelete(message,link) {
    if (confirm('Are you sure to delete node : \n«'+message+'» ???\n\nNB: All other relative information will also be deleted!')) {
        window.location.href=link;
        }
    else {
        void(0);
        }
    } 

function doCenter() {
    $('.centered').css({
        position:'absolute',
        left: ($(document).width() - $('.centered').outerWidth())/2,
        top: ($(document).height() - $('.centered').outerHeight())/3
        });
    };

function toggleSexPersonField (elem) {
    gn = document.getElementById('girlName');
    return gn.style.display = ('male' == elem.value) ? 'none' : 'block';
    }

function switchActivate(node) {
    //var container = $('#container_'+node);
    var elm = $('#profile\\['+node+'\\]');

    // heritated value
    elm.prop('disabled') ?  
       ( elm.attr('data-defined') ? elm.val(elm.attr('data-defined')) : elm.val(elm.attr('data-heritated'))    ) : elm.val(elm.attr('data-heritated'));

    elm.prop('disabled',!elm.prop('disabled'));
    //container.toggle();
    return true; 
    }
function doRevokeOption(elem) {
    $("#tr_"+elem).remove();
    $("#af_cf option[value='"+elem+"']").attr("disabled",false);
    }
function doAddNewFieldToContentType() {
    var cnt = $("#fieldsTableBody");
    var slct = $("#af_cf :selected");
    var n_fn = $("#af_cf :selected").text();
    var n_id = $("#af_cf :selected").val();

    cnt.append(
	"<tr id='tr_"+n_id+"'><td>"+n_fn+"</td>"+
	"<td><input class='form-control' name='new["+n_id+"][fieldLabelUser]' type='text' value='"+n_fn+"'></td>"+
	"<td><input class='form-control' value='"+n_id+"' type='radio' name='isKey'></td>"+
        "<td><input class='form-control' type='text' name='new["+n_id+"][inputOrder]' style='width:65px;' value='0'></td>"+
        "<td>default</td>"+
        "<td><span style='font-color:red;color:red;' class='fa fa-remove btn btn-default btn-xs' onClick=\"doRevokeOption('"+n_id+"')\"></span></td>"+
	"</tr>"
	);
    $("#af_cf :selected").attr("disabled",true);
    $("#af_cf :selected").prop("selected", false);
    }

function doToggleBgr(elm) {
    co = 'transparent';
    c = elm.parentNode.parentNode.style.backgroundColor == 'red';
    if (!c) {
        alert('ATTENTION!!!\n All data containing in this field will be deleted in every record of this content type');
        co = 'red';
        }
    return elm.parentNode.parentNode.style.background = co;
    }

function toggleModelActions(switcher,mode) {
    return $(switcher).parent().find("button:first").attr("onClick","getControlActions(this,"+$(switcher).val()+",'"+mode+"');");
    //var elm = $('#container_'+key);
    }
function meter(act) {
    doCenter();
    ya_GBdoCalc();
    ("off" == act) ? $('#ya_loadMeter').hide() : $('#ya_loadMeter').show();
    
    doCenter();
    $('#ya_loadMeter').css('visibility','visible');
    return true;
    }
