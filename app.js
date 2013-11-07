var request = require('request');
var cheerio = require('cheerio');
var express = require('express')
var http = require("http");


//web scraping...
var getTrucks = function(callBack){
    var url = "http://www.foodtrucksmap.com/sf/"
    request(url, function(err, resp, body) {
        if (err)
            throw err;
        var $ = cheerio.load(body);

        var truckDict = {};
        var truckName;


        $('#open_trucks_list .truck_info').each(function(){
            $(this).find('h2').each(function(){
                truckName = $(this).text();
            });
            var infoList = []
            $(this).find('p').each(function(){

                infoList.push($(this).text());
            });

            truckDict[truckName]=infoList

        });
    console.log(truckDict)
    callBack(truckDict)
    });
}

// web server
var pub = __dirname;


var app = express();
app.use(app.router);
app.use(express.static(pub));
app.use(express.errorHandler());


app.set('views', __dirname);
app.set('view engine', 'jade');


app.get('/',function(req,res){
    trucks = getTrucks(function(trucks){

    })
    res.render('test',{})


});

http.createServer(app).listen(1337);