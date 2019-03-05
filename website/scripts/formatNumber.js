/* 
  formatNumber :: (Number) → (Number)
  Change the format of the number to have space every 3 digits 
*/
const formatNumber = number => {
  var number = number + '';
  var numbers = number.split('.');
  numbers[0] += '';
  var sep = ' ';
  var reg = /(\d+)(\d{3})/;
  while( reg.test( numbers[0])) {
    numbers[0] = numbers[0].replace( reg, '$1' +sep +'$2');
  }
  if(numbers[1] === undefined){
  	return numbers[0];
  }
  else{
  	return numbers[0]+'.'+numbers[1];
  }
}