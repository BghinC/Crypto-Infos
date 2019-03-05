/* 
  changeBackground :: (String, String) → ()
  Change the background color of the clicked item and reset the background color of the others 
*/
const changeBackground = (id,classe) => {
	/* Get all the elements corresponding to the same class */
    var elements = document.getElementsByClassName(classe);

	for (var i = 0; i < elements.length; i++) {
	    if(id == elements[i].id){
	      /* Change background color */
	      elements[i].style.backgroundColor="#FF7F50";
	    }
	    else{
	      /* Reset background color */
	      elements[i].style.backgroundColor="#404040";
	    }
	}

	/* Rename the id to match with what we need */
	id = id.toLowerCase().replace(' ','');

	/* When item is clicked we change background and we call the function to uptade datas depending on the options */
    vm.getFromApiOptions(id,classe,vm.cryptocurrencies.id);
}