function typeaheadRemoveValue(elem) {
    $('#'+elem).val(0);
    $("[data-typeahead-id='"+elem+"']").val('');
    }
function _typeaheadHashByKey(key) {
    var _ta = {};
    _ta["ya_node"]	= "88dbab87ff73b94abed2a773391b4500";
    _ta["ya_user"]	= "4f7c57fb90c2e21e9f29473198673d60";
    _ta["fa_person"]	= "4d44c90e6548c5a4799d5f44feae7dbe";
    _ta["ya_catalog"]	= "186b256a3722f4a393214d8cd1d83aaa";
    _ta["fa_source"]	= "7892e1a70a72163333a048567316f534";
    _ta["parish_location"] = "9f480dae83309e6790e5eafb44857089";
    _ta["aDocumentID"]	= "6c6ba0a817f8267bd239741f36a22465";
    _ta["lastName"]	= "e600f9080729deb8e901dbe9c03901bc";
    _ta["firstName"]	= "a82699bba69e5251dc6ba0b1be6e6ad5";
    return _ta[key]; 
    }
function _typeaheadBH(key) {
    var hash = _typeaheadHashByKey(key);
    return new Bloodhound({
	datumTokenizer: function (datum) { return Bloodhound.tokenizers.whitespace(datum.value); },
	queryTokenizer: Bloodhound.tokenizers.whitespace,
	limit: 15,
	remote: { url: '/my/static/typeahead.php?hash='+hash+'&q=%QUERY' }
	});
    }
$(window).load(function(){
    $(':input[data-typeahead-field]').each(function(){
        var $this = $(this);
        var bh = _typeaheadBH($this.attr("data-typeahead-field"));
        bh.initialize();
        $this.typeahead({
            limit: 10,
            minLength: 3,
            hint: true,
            highlight: true,
            },
            {
            displayKey: 'nodeTitle',
            source: bh.ttAdapter(),
            templates: {
                empty: [ '<div class="empty-message">','no results found','</div>'].join('\n'),
                suggestion: function(data){
                    return data.nodeTitle;
//                  console.log(data);
                    }
                }
           }).on('typeahead:selected',function(event,data) { $("#"+$this.attr("data-typeahead-id")).val(data.nodeTitle); });
        });

    $(':input[data-typeahead-object]').each(function(){
	var $this = $(this);
	var bh = _typeaheadBH($this.attr("data-typeahead-object"));
	bh.initialize();
	$this.typeahead({
	    limit: 10,
	    minLength: 3,
	    hint: true,
	    highlight: true,
	    },
	    {
	    displayKey: 'nodeTitle',
	    source: bh.ttAdapter(),
	    templates: {
		empty: [ '<div class="empty-message">','no results found','</div>'].join('\n'),
		suggestion: function(data){ 
		    return data.nodeTitle;
//		    console.log(data);
		    }
		}
	   }).on('typeahead:selected',function(event,data) { meter('on'); $(location).attr("href", "/content/"+data.numObj); });
	});
    $(':input[data-typeahead-ptype]').each(function(){
    	var $this = $(this);
	var bh = _typeaheadBH($this.attr("data-typeahead-ptype"));
	bh.initialize();
    	//console.log(bh);
    	$this.typeahead({
	   limit: 10,
	   minLength: 3,
	    hint: true,
	   highlight: true,
	   },
	   {
	   displayKey: 'nodeTitle',
	   source: bh.ttAdapter(),
	   templates: {
	    empty: [ '<div class="empty-message">','no results found','</div>'].join('\n'),
            suggestion: function(data){
            	console.log(this);
            	return "<span class='fa fa-male'></span> ["+data.numObj+"] "+data.nodeTitle;
            	}
            }
	   }).on('typeahead:selected', function(event, data){ $("#"+$this.attr("data-typeahead-id")).val(data.numObj); });
  	});
    });
