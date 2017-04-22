$(document).ready(function() {
	var numWrongAnswers=3;
	var numberGameQuestions=3;
	var numberTotalQuestions=14;
	var numberOfAnswers=4;
	var arrQuestions=[];
	var currentWrongAnswer;
	var arrQuestionOptions=["Ulysses S Grant","Thomas Jefferson","Susan B Anthony","Sacagwea","John F Kennedy", "Abraham Lincoln", "Alexander Hamilton", "Andrew Jackson","Benjamin Franklin", "William Henry Harrison","Gerald Ford","Barack Obama", "Donald Trump", "George Bush", "George Washington","Jimmy Carter","Richard Nixon", "Bill Clinton","Ronald Reagan", "Harriet Tubman","John Quincy Adams", "Paul Revere", "Samuel Adams"];
	var arrQuestionOptionsTest=["Ulysses S Grant","Thomas Jefferson","Susan B Anthony","Sacagwea"];
	var arrCurrentQuestionWrongOptions=[];
	var sequence;
	var correct=0;
	var incorrect=0;
	var notAnswered=0;
	var arrRandomSequence = [];
	var arrRoundQuestions=[];
	var arrRoundAnswerOptions=[];
	var correctAnswerIndex;
	var questionToAsk;
	var answered=false;
	var answerWaitTimer;
	var roundNumber=0;
	var answerOptions;
	var intervalId;
	var questionAnswerImageOne;
	var questionAnswerImageTwo;
	var correctAnswerSymbol="assets/images/rightanswercheck.gif";
	

		function triviaQuestion(question,answer,moneyImage,personImage) {
		this.question=question;
		this.answer=answer;
		this.moneyImage=moneyImage;
		this.personImage=personImage;
		}
	
	var question0=new triviaQuestion("Who is on the US Penny?", "Abraham Lincoln", "assets/images/penny.png", "assets/images/AbrahamLincoln.jpg");
	var question1=new triviaQuestion("Who is on the US Nickel?", "Thomas Jefferson", "assets/images/nickel.gif", "assets/images/ThomasJefferson.jpg" );
	var question2=new triviaQuestion("Who is on the US Dime?", "Frankin Delano Roosevelt", "assets/images/dime.gif", "assets/images/FDR.jpg" );
	var question3=new triviaQuestion("Who is on the US Quarter?", "George Washington", "assets/images/quarter.gif", "assets/images/georgewashington.jpg" );
	var question4=new triviaQuestion("Who is on the US Half-Dollar?", "John F Kennedy", "assets/images/halfdollar.gif", "assets/images/JFK.jpg" );
	var question5=new triviaQuestion("Who is on the US Silver Dollar?", "Susan B Anthony", "assets/images/sbadollar.png", "assets/images/SusanBAnthony.jpg" );
	var question6=new triviaQuestion("Who is on the US Golden Dollar?", "Sacagwea", "assets/images/sacagawea-golden-dollar.gif", "assets/images/Sacagwea.jpg" );
	var question7=new triviaQuestion("Who is on the US Dollar Bill?", "George Washington", "assets/images/dollarbill.gif", "assets/images/georgewashington.jpg" );
	var question8=new triviaQuestion("Who is on the US Two Dollar Bill?", "Thomas Jefferson", "assets/images/twodollarbill.gif", "assets/images/ThomasJefferson.jpg" );
	var question9=new triviaQuestion("Who is on the US Five Dollar Bill?", "Abraham Lincoln", "assets/images/fivedollarbill.gif", "assets/images/AbrahamLincoln.jpg" );
	var question10=new triviaQuestion("Who is on the US Ten Dollar Bill?", "Alexander Hamilton", "assets/images/tendollarbill.gif", "assets/images/AlexanderHamilton.jpg" );
	var question11=new triviaQuestion("Who is on the US Twenty Dollar Bill?", "Andrew Jackson", "assets/images/twentydollarbill.gif", "assets/images/AndrewJackson.jpg" );
	var question12=new triviaQuestion("Who is on the US Fifty Dollar Bill?", "Ulysses S Grant", "assets/images/fiftydollarbill.gif", "assets/images/ulyssessgrant.jpg" );
	var question13=new triviaQuestion("Who is on the US One Hundred Dollar Bill?", "Benjamin Franklin", "assets/images/onehundreddollarbill.gif", "assets/images/benjaminfranklin.jpg" );

	var arrAllQuestions=[question0,question1,question2,question3,question4,question5,question6,question7,question8,question9,question10,question11,question12,question13];
	console.log(arrQuestionOptions.length);


	function getRandomSequence(sequence){
		while(arrRandomSequence.length < sequence){
		    var randomNumber = Math.floor(Math.random()*sequence)
		    if(arrRandomSequence.indexOf(randomNumber) > -1) continue;
		    arrRandomSequence[arrRandomSequence.length] = randomNumber;
		}
		// console.log("Random Sequence Result: " + arrRandomSequence);
	}

	function wrongAnswerOptions() {
		arrCurrentQuestionWrongOptions=[];

		for(var i = 0; i < numWrongAnswers; i++) {
	        var uniqueNum=true;
	        var n = Math.floor(Math.random()*arrQuestionOptions.length);
	        // console.log("Random Index Number is: " + n);
	        var randomAnswerToCheck=arrQuestionOptions[n];
	        // console.log("Loop " + i + " for Questions Options RATC: " + randomAnswerToCheck);
	            
		          
	        for(var j = 0; j<arrCurrentQuestionWrongOptions.length; j++) {
	        	var currentWrongAnswer=arrCurrentQuestionWrongOptions[j];
	        	// console.log("Value of j is: " + j);
	        	// console.log("Value of currentWrongAnswer is: " + currentWrongAnswer);
	        	// console.log("arrCurrentQuestionWrongOptions length is " + arrCurrentQuestionWrongOptions.length);
	        	// console.log("arrCurrentQuestionWrongOptions index is " + j);
	        
	        	console.log("arrCurrentQWrong Loop: "+ j);
	        	console.log("Value of randomAnswer to Check: " + randomAnswerToCheck + " Value of Current Question Wrong Answer is " + currentWrongAnswer);
	             if ((randomAnswerToCheck===currentWrongAnswer) || (randomAnswerToCheck===questionToAsk.answer)) {	
	                	
	                	console.log("DUPLICATE VALUE FOUND Value in array: " + currentWrongAnswer);
	                    uniqueNum = false;
	                    // j--;
	                }  
			}

	    	if (uniqueNum) {
	    		console.log("value of uniqueNum: " + uniqueNum);
	    		console.log("RATC to be pushed to array: " + randomAnswerToCheck);
	        	arrCurrentQuestionWrongOptions.push(randomAnswerToCheck);
	        	console.log("WrongQArray " + arrCurrentQuestionWrongOptions); 
	        	console.log("CurrentValue of CurrentQuestion and index " + currentWrongAnswer);          		
			}
	        else
	        {
	        	// console.log("Everything failed");
	            i--;
	        }
	        		
	           
	     	wrongAnswer1value=arrCurrentQuestionWrongOptions[0];
	    	wrongAnswer2value=arrCurrentQuestionWrongOptions[1];
	    	wrongAnswer3value=arrCurrentQuestionWrongOptions[2];

	      
	    	// console.log("Wrong Answer 1: " + wrongAnswer1value);
	    	// console.log("Wrong Answer 2: " + wrongAnswer2value);
	    	// console.log("Wrong Answer 3: " + wrongAnswer3value);


	    } //End wrongAnswerOptions for loop
	} //End wrongAnswerOptions
	    

	      
	// wrongAnswerOptions();

	function gameQuestions() {
		// console.log("Start wrongAnswerOptions");
		getRandomSequence(numberTotalQuestions);
		// console.log("Return from getRandomSequence");
		for (var k=0; k<numberTotalQuestions;k++) {
			arrRoundQuestions.push(arrRandomSequence[k]);
			// console.log("Round Question Sequence " + arrRoundQuestions);

		}
		askQuestion();
	}

	function askQuestion() {
		// console.log("Start askQuestion");
			

				console.log("Round Number " + roundNumber);
		// for (i=0;i<numberGameQuestions;i++) {
	
				var questionIndex=arrRoundQuestions[roundNumber];
				questionToAsk=arrAllQuestions[questionIndex];
				console.log(questionToAsk);
				var questionText=questionToAsk.question;
				questionAnswerImageOne=questionToAsk.personImage;
				questionAnswerImageTwo=questionToAsk.moneyImage;
				console.log("ImageOne "+questionAnswerImageOne);
				console.log("ImageTwo "+questionAnswerImageTwo);

				// console.log(questionText);
				var questionContent=questionText;
				console.log("QuestionContent: " + questionContent);

				var questionAnswers=$("#question");
				// console.log("questionAnswers" + questionAnswers);
				var questionAnswersValue=questionAnswers.html("<h3>" + questionContent+"</h3>");
				// console.log("questionAnswersValue: "+ questionAnswersValue);
				questionAnswers.append(questionAnswersValue);
				// console.log("Finished appending to site");
		//trying wrong question options here april 21
		wrongAnswerOptions();
				console.log("answerChoices section Start " + questionToAsk.answer);
				arrCurrentQuestionWrongOptions.push(questionToAsk.answer);
				console.log("PUSHED " + questionToAsk.answer);
				console.log(arrCurrentQuestionWrongOptions);
				arrRandomSequence=[];
				getRandomSequence(numberOfAnswers);
				// console.log("back from getRandomSequence" + arrRandomSequence);
					
					for (var j=0; j<numberOfAnswers;j++) {
						sequenceNum=arrRandomSequence[j];
						// console.log(numberOfAnswers);
						// console.log("Current Sequence Number: " + sequenceNum);
						arrRoundAnswerOptions.push(arrCurrentQuestionWrongOptions[sequenceNum]);
						// console.log(arrCurrentQuestionWrongOptions[sequenceNum]);
						// console.log("Array of answer Options " +arrRoundAnswerOptions);
						correctAnswerIndex=arrRoundAnswerOptions.indexOf(questionToAsk.answer);
						console.log(correctAnswerIndex);

						var answerOptionsValue;
						var answerOptions=$("#answers");
						var answerContent=arrRoundAnswerOptions[j];
						answerOptions.append('<h4 '+ 'id="ans">' + answerContent +'<h4>');
						// console.log("For Loop: " + j + " " + answerContent);
						// console.log("Finished appending to answers");
					}
					answered=false;
			
			questionTimerStart();
			// getAnswer();

	
			// getAnswer();
	
		// } // End question for loop
	} //End askQuestion Function 
// getAnswer();

	function getAnswer() {
		console.log("This is questionAnswerImageTwo before on click  "+ questionAnswerImageTwo);
			$("#answers").click(function(event){
			
				var clickedValue=$(event.target).text();
				// console.log("Clicked " + clickedValue);
				 $("#answers").off("click");
				 		questionTimerStop();
				 		$("#timerdisplay").empty();
						if (clickedValue==arrRoundAnswerOptions[correctAnswerIndex]) {
							
							console.log("Correct Answer!!! " + clickedValue + arrRoundAnswerOptions[correctAnswerIndex]);
							answered=true;
							correct++;
							console.log("Correct Answers: " + correct);
							var clickedValueHTML="<h2> Correct it is "+arrRoundAnswerOptions[correctAnswerIndex]+"!</h2>";
							var answerstatusURL="<img src='"+correctAnswerSymbol+"' alt='Correct Answer Symbol' width='300' height='300'>";
							console.log("Correct Image URL: "+ answerstatusURL);
							$("#answer-result").append(clickedValueHTML);
							$("#answer-result").append(answerstatusURL);
						
							setTimeout(function() {$("#answer-result").empty();
						},2000);
							
						}
						else {
							console.log("WRONG Answer!!! " + clickedValue + arrRoundAnswerOptions[correctAnswerIndex]);
							answered=true;
							incorrect++;
							
							console.log("Incorrect Answer: " + incorrect);
							console.log("This is questionAnswerImageTwo "+ questionAnswerImageTwo);
							var clickedValueHTML="<h2> Wrong! The correct person is  "+arrRoundAnswerOptions[correctAnswerIndex]+"!</h2>";
							var moneyURL="<img src='"+questionAnswerImageTwo+"' alt='Money Two Image' width='400' height='300'>";
							console.log("Money Image URL: "+ moneyURL);
							$("#answer-result").append(clickedValueHTML);
							$("#answer-result").append(moneyURL);
							var personURL="<img src='"+questionAnswerImageOne+"' alt='Money One Image' width='400' height='400'>";
							console.log("Person Image URL: "+ personURL);
							$("#answer-result").append(personURL);

							setTimeout(function() {
							$("#answer-result").empty();
							$("#question").empty();
							$("#answers").empty();

						},3000);
							}
							// console.log("RoundNumber before if check " + roundNumber + " numberGameQuestions" + numberGameQuestions);
							if (roundNumber==numberGameQuestions) {
								console.log("GAME OVER");
									$("#question").empty();
									$("#answers").empty();
								arrRoundAnswerOptions=[];
									// wrongAnswerOptions();
								setTimeout(function() {
								gameEndStats();
							},3000);
								
							}
							else {
									$("#question").empty();
									$("#answers").empty();
								arrRoundAnswerOptions=[];
									// wrongAnswerOptions();
								setTimeout(function() {
									$("#answer-result").empty();
								askQuestion();
							},3000);
							}

			});
		}


	function questionTimerStart() {
    answerWaitTimer = setTimeout(tenSeconds,10000);
    timer.start();
    getAnswer();
	}

	function questionTimerStop() {
		timer.stop();
		timer.reset();
    clearTimeout(answerWaitTimer);
    roundNumber++;
		}

		function tenSeconds(){
					$("#answers").off("click");
					questionTimerStop();
					$("#timerdisplay").empty();
					if(answered) {
						console.log("Answered= " + answered);
					}
					else {
						notAnswered++;
						var clickedValueHTML="<h2> You didn't answer! The correct person is  "+arrRoundAnswerOptions[correctAnswerIndex]+"!</h2>";
						var moneyURL="<img src='"+questionAnswerImageTwo+"' alt='Money Two Image' width='400' height='300'>";
							console.log("Money Image URL: "+ moneyURL);
							$("#answer-result").append(clickedValueHTML);
							$("#answer-result").append(moneyURL);
							var personURL="<img src='"+questionAnswerImageOne+"' alt='Money One Image' width='400' height='400'>";
							console.log("Person Image URL: "+ personURL);
							$("#answer-result").append(personURL);
							setTimeout(function() {
							$("#question").empty();
							$("#answers").empty();
							$("#answer-result").empty();
							
							},3000);
						console.log("Answered= " + answered);
						console.log("Not Answered= " + notAnswered);
					}
						// console.log("RoundNumber before if check " + roundNumber + " numberGameQuestions" + numberGameQuestions);
							if (roundNumber==numberGameQuestions) {
									console.log("GAME OVER");
									$("#question").empty();
									$("#answers").empty();
								arrRoundAnswerOptions=[];
									// wrongAnswerOptions();

								setTimeout(function() {
									$("#answer-result").empty();
								gameEndStats();
							},3000);
							}
							else {
								$("#question").empty();
								$("#answers").empty();
								arrRoundAnswerOptions=[];
									// wrongAnswerOptions();
								setTimeout(function() {
								$("#answer-result").empty();
								askQuestion();
							},3000);
							
								
							}
		}

		function gameEndStats() {
			var resultsSection=$("#results");
			var resultsCorrect=resultsSection.append("<h3>Here's your results after 5 rounds!</h3>");
			var resultsCorrect=resultsSection.append("<h2>Correct: " + correct+"</h2>");
			var resultsInCorrect=resultsSection.append("<h2>Incorrect: " + incorrect+"</h2>");
			var resultsNotAnswered=resultsSection.append("<h2>Unanswered: " + notAnswered+"</h2>");
			restartGame();
			
		}

			function restartGame() {
				$("#results").append("<h2>Click <em> here </em> to Play Again!!!!!</h2>");
				// $("#results").html();
			$("#results").click(function(event) {

			arrQuestions=[];
			currentWrongAnswer;
			arrCurrentQuestionWrongOptions=[];
			sequence;
			correct=0;
			incorrect=0;
			notAnswered=0;
			arrRandomSequence = [];
			arrRoundQuestions=[];
			arrRoundAnswerOptions=[];
			correctAnswerIndex;
			questionToAsk;
			answered=false;
			answerWaitTimer;
			roundNumber=0;
			answerOptions;
			intervalId;
			questionAnswerImageOne;
			questionAnswerImageTwo;
				$("#results").empty();
				$("#question").empty();
				$("#answers").empty();
				$("#answer-result").empty();
				$("timer-display").empty();
				timer.stop();
				timer.reset();


				// wrongAnswerOptions();
				gameQuestions();
				});
		
			
	
		}


	gameQuestions();

});

var timer = {

  time: 11,


  reset: function() {

    timer.time = 11;

    $("#timerdisplay").empty();

  },

   stop: function() {

    clearInterval(intervalId);
  },

  start: function() {

    intervalId=setInterval(timer.count,1000);
  
  },

  
  count: function() {
    timer.time--;
    var timeResult=timer.timeConverter(timer.time);
    $("#timerdisplay").html("<h2>Time Remaining to Answer: " +timeResult+"<h2>");
  },



  timeConverter: function(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }

    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
}





