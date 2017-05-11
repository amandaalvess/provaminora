var fs   = require('fs')
var file = process.argv[2]
var extensao = file.split('.')[file.split('.').length-1]
var numeros

function json()
{
	var numeros = require('./numeros.json');
	numeros = numeros.numeros;
}
function csv()
{
	var csv = require('csv-string');
	var resul;

	fs.readFile(file, 'utf8', function(err, data)  {
    resul = csv.parse(data);
    numeros  = resul[0];
	});
	
}
function xml()
{
	var xmlParser = require('xml2js').parseString;

    fs.readFile(file, function(err, data) {
        xmlParser(data, function(err, result)
        	{
        		numeros = result.numeros.split(',');
        	});
    });
    
}
if(extensao == 'json')
	json();
if(extensao == 'csv')
	csv();
if(extensao == 'xml')
	xml();

numeros.sort(function(a, b){return a-b});
var inicio = numeros[0];
var fim = [];
var resultado = "";
for(var i = 0; i < numeros.length;  i++)
{
	if(numeros[i + 1] != numeros[i] + 1)
	{
       		fim = numeros[i];
       		if(fim == inicio)
       		{
       			resultado += "[" + inicio + "]";
       		}
       		else {
       			resultado += "[" + inicio + "-" + fim + "] ";	
       		}
       		inicio = numeros[i+1];
	}
}
fs.writeFile('resultado.json', JSON.stringify(resultado), function (err) {
	if (err) return console.log(err);
	console.log('Concluido');
});
