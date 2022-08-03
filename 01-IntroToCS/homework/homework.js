'use strict'

function BinarioADecimal(num) {
  // tu codigo aca
  var suma = 0;
  var pos = 0;
  for (var i = num.length - 1; i >= 0 ; i--){
    suma = suma + num[i] *2 ** pos;
    pos++
  }
  return suma;
};


function DecimalABinario(num) {
  // tu codigo aca
  var binariou = ''
  while(num !== 0){
    binariou = num % 2 + binariou
    num = Math.floor (num / 2)
}
return binariou; 
}
module.exports = {
  BinarioADecimal,
  DecimalABinario,
}