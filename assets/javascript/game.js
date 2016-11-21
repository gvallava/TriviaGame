

var myVar;
function startTimer() {
  myVar = setInterval(function(){myTimer()},1000);
  timelimit = maxtimelimit;
}
function myTimer() {
  if (timelimit > 0) {
    curmin=Math.floor(timelimit/60);
    cursec=timelimit%60;
    if (curmin!=0) { curtime=curmin+" minutes and "+cursec+" seconds left"; }
              else { curtime=cursec+" seconds left"; }
    $_('timeleft').innerHTML = curtime;
  } else {
    $_('timeleft').innerHTML = timelimit+' - Out of Time!';
    clearInterval(myVar);
  }
  timelimit--;
}


var pos = 0, posn, choice, correct = 0, rscore = 0;
var maxtimelimit = 20, timelimit = maxtimelimit; 
var questions = [
	["Who is Sheneneh's neighbor?", "Martin", "Pam", "Tommy", "A" ],
	["What is Sheneneh's profession?", "Lawyer", "Doctor", "Hairdresser", "C" ],
	["How would Sheneneh's describe herself?", "a true friend" , "a tennis pro", "a lady", "C" ],
	["What is Sheneneh's last name?", "Johnson", "Jenkins", "Jones", "B" ],
	["Finish this quote: 'You can buy a one way ticket to...'", "Heaven", "Hell", "Get-The-Hell-Out-Of-My-Face-ville", "C" ],
	["Who is Sheneneh's boyfriend?", "Lawrence", "Lafonz", "Lorenzo", "B" ],
	["What does Sheneneh say when she's surprised?", "Oh my goodness!", "Zoinks!", "Woah!", "A" ],	
];

var questionOrder = [];
function setQuestionOrder() {
  questionOrder.length = 0;
  for (var i=0; i<questions.length; i++) { questionOrder.push(i); }
  questionOrder.sort(randOrd);
  pos = 0;  posn = questionOrder[pos];
}

function $_(IDS) { return document.getElementById(IDS); }
function randOrd() { return (Math.round(Math.random())-0.5); }
function renderResults(){
  var test = $_("test");
  test.innerHTML = "<h2>Damn, Gina! You got "+correct+" of "+questions.length+" right!</h2>";
  $_("test_status").innerHTML = "Done!";
  $_('timeleft').innerHTML = '';
  test.innerHTML += '<button onclick="location.reload()">Try Again</a> ';
  setQuestionOrder();
  correct = 0;
  clearInterval(myVar);
  return false;
}

function renderQuestion() {
  var test = $_("test");
  $_("test_status").innerHTML = "Question "+(pos+1)+" of "+questions.length;
  if (rscore != 0) { $_("test_status").innerHTML += '<br>Currently: '+(correct/rscore*100).toFixed(0)+'% correct'; }
  var question = questions[posn][0];
  var chA = questions[posn][1];
  var chB = questions[posn][2];
  var chC = questions[posn][3];
  test.innerHTML = "<h3>"+question+"</h3>";
  test.innerHTML += "<label><input type='radio' name='choices' value='A'> "+chA+"</label><br>";
  test.innerHTML += "<label><input type='radio' name='choices' value='B'> "+chB+"</label><br>";
  test.innerHTML += "<label><input type='radio' name='choices' value='C'> "+chC+"</label><br><br>";
  test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
  timelimit = maxtimelimit;
  clearInterval(myVar);
  startTimer();
}

function checkAnswer(){
  var choices = document.getElementsByName("choices");
  for (var i=0; i<choices.length; i++) {
    if (choices[i].checked) { choice = choices[i].value; }
  }
  rscore++;
  if (choice == questions[posn][4] && timelimit > 0) { correct++; }
  pos++;  posn = questionOrder[pos];
  if (pos < questions.length) { renderQuestion(); } else { renderResults(); }
}

window.onload = function() {
  setQuestionOrder();
  renderQuestion();
}