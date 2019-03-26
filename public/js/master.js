$('.dimension-input-container').on('keypress', '.input',(e) => {
  numberFilter(e, 30);
});

$('.dimension-input-container').on('input', '.input',() => {
  checkGenButton();
});

$('.btn-matGen').on('click', () => {
  console.log("pressed!");
});

//Prevent inputs of getting non-numerical values and limits it to an specific value.
function numberFilter(e, limit){
  var code = (e.which) ? e.which : e.keyCode;
    if (code > 31 && (code < 48 || code > 57)) {
        e.preventDefault();
    } else {
      var actualValue = e.target.value;
      var typedNumber = String.fromCharCode(code);

      if(actualValue + typedNumber > limit){
        e.preventDefault();
      } else if (actualValue == "" && typedNumber == "0") {
        e.preventDefault();
      }
    }
}

//Checks if text inputs are all filled and enables the gen matrix button.
function checkGenButton(){
  var AmValueLenght = $('#matAm').val().length;
  var AnValueLenght = $('#matAn').val().length;
  var BmValueLenght = $('#matBm').val().length;
  var BnValueLenght = $('#matBn').val().length;

  if(AmValueLenght && AnValueLenght && BmValueLenght && BnValueLenght){
    $('.btn-matGen').removeAttr('disabled');
  } else {
    $('.btn-matGen').attr('disabled', 'disabled');
  }

}
