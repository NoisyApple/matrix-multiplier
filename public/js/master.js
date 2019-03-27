var Am, AnBm, Bn;

var amat = new Array(3);

for (var i = 0; i < amat.length; i++) {
  amat[i] = new Array(2);
}

for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 2; j++) {
    amat[i][j] = "15";
  }
}

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
  generateMatrix();
});

$('.btn-result').on('click', () =>{
  var result = calculateResult();
  //showResult(result);
});

$('.matA, .matB').on('input', '.matValue', () =>{
  checkResultButton();
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

//This function generates the HTML code for each matrix with its correspondent dimensions.
function generateMatrix(){
  $('.btn-result').attr('disabled', 'disabled');
  $('.values-input-container').css('display','flex');

  Am = $('#matAm').val();
  AnBm = $('#matAn').val();
  Bn = $('#matBn').val();

  var matAHtml = '';
  var matBHtml = '';

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

  $('.matA').html(matAHtml);
  $('.matB').html(matBHtml);
}

//Looks for unfilled input elements inside each matrix, if all are filled
//the result button will be enabled.
function checkResultButton(){
  var allFilled = true;

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

function calculateResult(){

  var arrayA;
  var arrayB;
  var arrayResult;

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

  // arrayResult = new Array(Am);
  //
  // for (var i = 0; i < Am; i++) {
  //   arrayResult[i] = new Array(Bn);
  // }

  // for (var i = 0; i < Bn; i++) {
  //   for (var j = 0; j < Am; j++) {
  //     arrayResult[i][j] = "Hey!";
  //   }
  // }

}
