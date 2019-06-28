// console.log('hello from pokeSearch');

$('#pokeSubmit').click( pokeSearch )

function pokeSearch(){

  //FEATURE: filter out bad responses and only forward user to
  //pokemon with id between 1-151

  //Manually change URL of website to match number provided
  window.location.href = window.location.origin + '/' + $('#pokeId').val();

}