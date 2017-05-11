var fs = require('fs');
var file = process.argv[2];
var extensao = file.split('.')[file.split('.').length-1]
var number;

function json()
{
	var number = require('./numeros.json');
	number = number.numeros;
  intervalos();
}
function csv()
{
	var csv = require('csv-string');
	var results;

	fs.readFile(file, 'utf8', function(err, data)  {
    results = csv.parse(data);
    number  = results[0];
    intervalos();
	});
	
}
function xml()
{
	var xmlParser = require('xml2js').parseString;

    fs.readFile(file, function(err, data) {
        xmlParser(data, function(err, result)
        	{
        		number = result.number.split(',');
            intervalos();
        	});
    });
    
}
if(extensao == 'json')
	json();
if(extensao == 'csv')
	csv();
if(extensao == 'xml')
	xml();
function intervalos(){
number.sort(function(a, b){return a-b});
var inicio = number[0];
var fim = [];
var results = "";
for(var i = 0; i < number.length;  i++)
{
  if(number[i + 1] != number[i] + 1)
  {
          fim = number[i];
          if(fim == inicio)
          {
            results += "[" + inicio + "]";
          }
          else {
            results += "[" + inicio + "-" + fim + "] "; 
          }
          inicio = number[i+1];

  }
}
fs.writeFile('resultado.json', JSON.stringify(results
  ), function (err) {
  if (err) return console.log(err);
  console.log(results);
});

}

