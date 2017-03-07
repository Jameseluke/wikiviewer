function search(query){
  $('#results').empty();
  if (query == ""){
    $('#search').addClass("absolute-center");
    
    return;
  }  
  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=";
  url += query;
  url += "&format=json&callback=?";

  var output = ""
  $.getJSON(url, function(result){
    console.log(result);
    for(var i = 0; i < result[1].length; i++){
      var string = "<div onclick=\"window.open('" + result[3][i] + "','mywindow');\" class = \"result grow\"><p class = \"title\">";
      string += result[1][i];
      string += '</p><p class="summary">';
      string += result[2][i];
      string += "</p></div>";
      output+= string;
    }
    $('#results').html(output);
  });
    $('#search').removeClass("absolute-center");
}

function handle(e){
        if(e.keyCode === 13){
            e.preventDefault(); // Ensure it is only this code that rusn
            search($('#query').val());
           
        }   
}

var touch = 'ontouchstart' in document.documentElement
            || (navigator.MaxTouchPoints > 0)
            || (navigator.msMaxTouchPoints > 0);

if (touch) { // remove all :hover stylesheets
    try { // prevent exception on browsers not supporting DOM styleSheets properly
        for (var si in document.styleSheets) {
            var styleSheet = document.styleSheets[si];
            if (!styleSheet.rules) continue;

            for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                if (!styleSheet.rules[ri].selectorText) continue;

                if (styleSheet.rules[ri].selectorText.match(':hover')) {
                    styleSheet.deleteRule(ri);
                }
            }
        }
    } catch (ex) {}
}

$('#search-btn').click(function(){
   search($('#query').val());
});

$('#random-btn').click(function(){
  window.open('https://en.wikipedia.org/wiki/Special:Random', 'mywindow');
})
