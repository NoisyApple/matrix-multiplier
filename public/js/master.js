$('.dimension-input-container').on('keypress', '.input',(e) => {
  numberFilter(e, 10);
});

$('.dimension-input-container').on('input', '.input',() => {
  checkGenButton();
});

$('.dimension-input-container').on('input', '#matAn, #matBm',(e) => {
  completeANBM(e);
});

$('.btn-matGen').on('click', () => {
  console.log("GENERATE MATRIX!");
  var Am = $('#matAm').val();
  var AmBn = $('#matAn').val();
  var Bn = $('#matBn').val();

  console.log(Am, AmBn, Bn);

  var matAHtml;
  var matBHtml;


});

$('.btn-reset').on('click', () => {
  console.log("RESET!");
  $('#matAm').val('');
  $('#matAn').val('');
  $('#matBm').val('');
  $('#matBn').val('');

  $('.btn-matGen').attr('disabled', 'disabled');
  $('.btn-result').attr('disabled', 'disabled');
  $('.btn-reset').attr('disabled', 'disabled');
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

//Checks if text inputs are all filled and enables buttons.
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

  if(AmValueLenght || AnValueLenght || BmValueLenght || BnValueLenght){
    $('.btn-reset').removeAttr('disabled');
  } else {
    $('.btn-reset').attr('disabled', 'disabled');
  }

}

//Knowing that n of matrix A and m of matrix B should be equal to succesfully
//multiply them, this function watch both inputs and makes its values the same.
function completeANBM(e){
  var id = e.target.id;

  if(id == 'matAn'){
    $('#matBm').val(e.target.value);
  } else {
    $('#matAn').val(e.target.value);
  }
}
