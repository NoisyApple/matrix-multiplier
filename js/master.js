var Am, AnBm, Bn, ABm, ABn, op = 0;

$('.dimension-input-container').on('keypress', '.input',(e) => {
  numberFilter(e, 10);
});

$('.dimension-input-container').on('input', '.input',() => {
  checkGenButton();
});

$('.dimension-input-container').on('input', '#matAn, #matBm',(e) => {
  completeANBM(e);
});

$('.values-input-container').on('keypress', '.input', (e) =>{
  numberConstraint(e);
});

$('.dimension-input-container').on('click', '.btn-matGen', () => {
  generateMatrix();
});

$('.dimension-input-container').on('click', '.btn-result', () =>{
  calculateResult();
});

$('.matA, .matB').on('input', '.matValue', () =>{
  checkResultButton();
});

$('.dimension-input-container').on('click', '.btn-reset', () => {
  resetValues();
});

$('.dimension-input-container').on('click', '.btn-op', () => {
  setOperation();
});

//When operation button is clicked this method changes the operand
function setOperation(){
  if(op == 0){
    op = 1;
    $('.dimension-input-container').html('<div style="display: contents" class="inputs-ctnr"><span class="label">Matriz A y B: </span><input type="text" id="matABm" class="input" maxlength="2"></input><span class="label"> × </span><input type="text" id="matABn" class="input" maxlength="2"></input></div><div style="display: contents" class="inputs-ctnr"><button class="input-btn btn-matGen" style="margin-left: 20px" type="button" name="button" disabled><i class="fas fa-table"></i></button><button class="input-btn btn-result" type="button" name="button" disabled><i class="fas fa-equals"></i></button><button class="input-btn btn-reset" type="button" name="button" disabled><i class="fas fa-trash"></i></button><button class="input-btn btn-op"  style="margin-left: 20px"type="button" name="button"><i class="fas fa-plus"></i></button></div>');
    $('.label-op').html('+');
  } else if (op == 1) {
    op = 2;
    $('.dimension-input-container').html('<div style="display: contents" class="inputs-ctnr"><span class="label">Matriz A y B: </span><input type="text" id="matABm" class="input" maxlength="2"></input><span class="label"> × </span><input type="text" id="matABn" class="input" maxlength="2"></input></div><div style="display: contents" class="inputs-ctnr"><button class="input-btn btn-matGen" style="margin-left: 20px" type="button" name="button" disabled><i class="fas fa-table"></i></button><button class="input-btn btn-result" type="button" name="button" disabled><i class="fas fa-equals"></i></button><button class="input-btn btn-reset" type="button" name="button" disabled><i class="fas fa-trash"></i></button><button class="input-btn btn-op"  style="margin-left: 20px"type="button" name="button"><i class="fas fa-minus"></i></button></div>');
    $('.label-op').html('−');
  } else if (op == 2) {
    op = 0
    $('.dimension-input-container').html('<div style="display: contents" class="inputs-ctnr"><span class="label">Matriz A: </span><input type="text" id="matAm" class="input" maxlength="2"></input><span class="label"> × </span><input type="text" id="matAn" class="input" maxlength="2"></input></div><div style="display: contents" class="inputs-ctnr"><span class="label" style="margin-left: 20px">Matriz B: </span><input type="text" id="matBm" class="input" maxlength="2"></input><span class="label"> × </span><input type="text" id="matBn" class="input" maxlength="2"></input></div><div style="display: contents" class="inputs-ctnr"><button class="input-btn btn-matGen" style="margin-left: 20px" type="button" name="button" disabled><i class="fas fa-table"></i></button><button class="input-btn btn-result" type="button" name="button" disabled><i class="fas fa-equals"></i></button><button class="input-btn btn-reset" type="button" name="button" disabled><i class="fas fa-trash"></i></button><button class="input-btn btn-op" style="margin-left: 20px"type="button" name="button"><i class="fas fa-times"></i></button></div>');
    $('.label-op').html('×');
  }
  resetValues();
}

//Resets all values in the app.
function resetValues(){
  $('#matAm').val('');
  $('#matAn').val('');
  $('#matBm').val('');
  $('#matBn').val('');
  $('#matABm').val('');
  $('#matABn').val('');

  $('.btn-matGen').attr('disabled', 'disabled');
  $('.btn-result').attr('disabled', 'disabled');
  $('.btn-reset').attr('disabled', 'disabled');

  $('.results-container').css('display','none');
  $('.values-input-container').css('display','none');
  $('.info-container').css('display','block');
}

//Checks if keycode pressed is an usable character ('0-9', '-' and '.')
function numberConstraint(e){
  var code = (e.which) ? e.which : e.keyCode;
  console.log(code);
    if (
      code != 31 &&
      code != 32 &&
      code != 33 &&
      code != 34 &&
      code != 35 &&
      code != 36 &&
      code != 37 &&
      code != 38 &&
      code != 39 &&
      code != 40 &&
      code != 41 &&
      code != 45 &&
      code != 46 &&
      code != 48 &&
      code != 49 &&
      code != 50 &&
      code != 51 &&
      code != 52 &&
      code != 53 &&
      code != 54 &&
      code != 55 &&
      code != 56 &&
      code != 57
    ) e.preventDefault();
}

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

  if (op == 0) {
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
  } else {
    var ABmValueLenght = $('#matABm').val().length;
    var ABnValueLenght = $('#matABn').val().length;

    if(ABmValueLenght && ABnValueLenght){
      $('.btn-matGen').removeAttr('disabled');
    } else {
      $('.btn-matGen').attr('disabled', 'disabled');
    }

    if(ABmValueLenght || ABnValueLenght){
      $('.btn-reset').removeAttr('disabled');
    } else {
      $('.btn-reset').attr('disabled', 'disabled');
    }
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

//This function generates the HTML code for each matrix with its correspondent dimensions.
function generateMatrix(){

  //$(document).scrollTop( $(".values-input-container").offset().top );

  $('.btn-result').attr('disabled', 'disabled');
  $('.values-input-container').css('display','flex');
  $('.info-container').css('display','none');

  var matAHtml = '';
  var matBHtml = '';
  var matRHtml = '';

  if (op == 0) {
    Am = $('#matAm').val();
    AnBm = $('#matAn').val();
    Bn = $('#matBn').val();

    for(var i = 0; i < Am; i++){
      for(var j = 0; j < AnBm; j++){
        matAHtml += '<input type="text" id="elementA' + (i+1) + (j+1) + '" class="matValue input">';
      }
      matAHtml += '<div></div>';
    }

    for(var i = 0; i < AnBm; i++){
      for(var j = 0; j < Bn; j++){
        matBHtml += '<input type="text" id="elementB' + (i+1) + (j+1) + '" class="matValue input">';
      }
      matBHtml += '<div></div>';
    }

    for(var i = 0; i < Am; i++){
      for(var j = 0; j < Bn; j++){
        matRHtml += '<input type="text" id="elementR' + (i+1) + (j+1) + '" class="input" readonly>';
      }
      matRHtml += '<div></div>';
    }

  } else {

    ABm = $('#matABm').val();
    ABn = $('#matABn').val();

    for(var i = 0; i < ABm; i++){
      for(var j = 0; j < ABn; j++){
        matAHtml += '<input type="text" id="elementA' + (i+1) + (j+1) + '" class="matValue input">';
        matBHtml += '<input type="text" id="elementB' + (i+1) + (j+1) + '" class="matValue input">';
        matRHtml += '<input type="text" id="elementR' + (i+1) + (j+1) + '" class="input" readonly>';
      }
      matAHtml += '<div></div>';
      matBHtml += '<div></div>';
      matRHtml += '<div></div>';
    }
  }

  $('.matA').html(matAHtml);
  $('.matB').html(matBHtml);
  $('.matR').html(matRHtml);
}

//Looks for unfilled input elements inside each matrix, if all are filled
//the result button will be enabled.
function checkResultButton(){

  var allFilled = true;

  console.log(20);

  $('.matValue').each((index, element) => {
    console.log(index);
  });

  $('.matValue').each((index, element) => {

    if (element.value.length == 0) {
      allFilled = false;
      return false;
    }
  });

  if (allFilled) {
    $('.btn-result').removeAttr('disabled');
  } else {
    $('.btn-result').attr('disabled', 'disabled');
  }
}

//Calculates the result with the given arrays
function calculateResult(){

  $('.results-container').css('display','flex');

  $(document).scrollTop( $(".label-result").offset().top );

  var arrayA;
  var arrayB;
  var arrayResult;

  if (op == 0) {
    arrayA = new Array(Am);

    //BIDIMENSIONAL ARRAY OF MAT-A CREATION
    for (var i = 0; i < Am; i++) {
      arrayA[i] = new Array(AnBm);
    }

    //FILLING OF MAT-A BIDIMENSION ARRAY
    for (var i = 0; i < Am; i++) {
      for (var j = 0; j < AnBm; j++) {
        arrayA[i][j] = $('#elementA' + (i+1) + (j+1)).val();
      }
    }

    console.table(arrayA);

    arrayB = new Array(AnBm);

    //BIDIMENSIONAL ARRAY OF MAT-B CREATION
    for (var i = 0; i < AnBm; i++) {
      arrayB[i] = new Array(Bn);
    }

    //FILLING OF MAT-B BIDIMENSION ARRAY
    for (var i = 0; i < AnBm; i++) {
      for (var j = 0; j < Bn; j++) {
        arrayB[i][j] = $('#elementB' + (i+1) + (j+1)).val();
      }
    }

    console.table(arrayB);

    arrayResult = new Array(Am);

    //BIDIMENSIONAL ARRAY OF MAT-R CREATION
    for (var i = 0; i < Am; i++) {
      arrayResult[i] = new Array(Bn);
    }

    //FILLING OF MAT-R BIDIMENSION ARRAY
    for (var i = 0; i < Am; i++) {
      for (var j = 0; j < Bn; j++) {

        var resValue = 0;

        for (var k = 0; k < AnBm; k++) {
          resValue += (arrayA[i][k]*arrayB[k][j]);
        }

        arrayResult[i][j] = resValue;
        $('#elementR' + (i+1) + (j+1)).val(resValue);

      }
    }

    console.table(arrayResult);

  } else {

    arrayA = new Array(ABm);
    arrayB = new Array(ABm);
    arrayResult = new Array(ABm);

    //BIDIMENSIONAL ARRAY OF MAT-A,B,R CREATION
    for (var i = 0; i < ABm; i++) {
      arrayA[i] = new Array(ABn);
      arrayB[i] = new Array(ABn);
      arrayResult[i] = new Array(ABn);
    }

    //FILLING OF MAT-A,B,R BIDIMENSION ARRAY
    for (var i = 0; i < ABm; i++) {
      for (var j = 0; j < ABn; j++) {
        arrayA[i][j] = $('#elementA' + (i+1) + (j+1)).val();
        arrayB[i][j] = $('#elementB' + (i+1) + (j+1)).val();

        var resValue ;

        if (op == 1) {
          resValue = parseInt(arrayA[i][j]) + parseInt(arrayB[i][j]);
        } else {
          resValue = parseInt(arrayA[i][j]) - parseInt(arrayB[i][j]);
        }
        $('#elementR' + (i+1) + (j+1)).val(resValue);
      }
    }

    console.table(arrayA);
    console.table(arrayB);
    console.table(arrayResult);
  }

}
