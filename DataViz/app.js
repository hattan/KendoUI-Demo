$(function(){
    var request = $.ajax({
        url: "http://api.ent.nokia.com/1.x/us//products/charts/track?domain=music&app_id=799121394f21416d9c2126cb8bde0534&itemsperpage=100",
        dataType: "jsonp"
    })

    request.done(function(response) {
        var genres = _.chain(response.data.items)
                      .map(function(item){ return item.genres[0]; })
                      .countBy(function (item) { return item.name;})
                      .map(function(item,key){ return {category : key, value : item} })
                      .value();

        $("#chart").kendoChart({
            theme:  "default",
            title: {
                text: "Top Chart Songs by Genre"
            },
            legend: {
                position: "bottom"
            },
            seriesDefaults: {
                labels: {
                    visible: true,
                    template: "#= category # - #= value#"
                }
            },
            series: [{
                type: "pie",
                data: genres
            }],
            tooltip: {
                visible: true,
                format: "{1}"
            }
        });

    });


})

