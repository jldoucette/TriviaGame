$(document).ready(function() {
	var numWrongAnswers=3;
	var numberGameQuestions=5;
	var numberTotalQuestions=14;
	var numberOfAnswers=4;
	var arrQuestions=[];
	var currentWrongAnswer;
	var arrQuestionOptions=["Ulysses S Grant","Thomas Jefferson","Susan B Anthony","Sacagwea","John F Kennedy", "Abraham Lincoln", "Alexander Hamilton", "Andrew Jackson","Benjamin Franklin", "William Henry Harrison","Gerald Ford","Barack Obama", "Donald Trump", "George Bush", "George Washington","Jimmy Carter","Richard Nixon", "Bill Clinton","Ronald Reagan", "Harriet Tubman","John Quincy Adams", "Paul Revere", "Samuel Adams"];
	var arrAdjQuestionOptions=["Ulysses S Grant","Thomas Jefferson","Susan B Anthony","Sacagwea","John F Kennedy", "Abraham Lincoln", "Alexander Hamilton", "Andrew Jackson","Benjamin Franklin", "William Henry Harrison","Gerald Ford","Barack Obama", "Donald Trump", "George Bush", "George Washington","Jimmy Carter","Richard Nixon", "Bill Clinton","Ronald Reagan", "Harriet Tubman","John Quincy Adams", "Paul Revere", "Samuel Adams"];
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



	function getRandomSequence(sequence){
		while(arrRandomSequence.length < sequence){
		    var randomNumber = Math.floor(Math.random()*sequence)
		    if(arrRandomSequence.indexOf(randomNumber) > -1) continue;
		    arrRandomSequence[arrRandomSequence.length] = randomNumber;
		}
		
	}

	function wrongAnswerOptions() {
		arrCurrentQuestionWrongOptions=[];

		for(var i = 0; i < numWrongAnswers; i++) {
	        var uniqueNum=true;
	        var n = Math.floor(Math.random()*arrAdjQuestionOptions.length);
	       
	        var randomAnswerToCheck=arrAdjQuestionOptions[n];
	  
	            
		          
	        for(var j = 0; j<arrCurrentQuestionWrongOptions.length; j++) {
	        	var currentWrongAnswer=arrCurrentQuestionWrongOptions[j];
	        	
	        	console.log("QuestionToAsk IS CURRENTLY: " + questionToAsk.answer);
	        	 if ((randomAnswerToCheck===currentWrongAnswer) || (randomAnswerToCheck===questionToAsk.answer)) {	
	                	
	                	console.log("DUPLICATE VALUE FOUND Value in array: " + currentWrongAnswer);
	                    uniqueNum = false;
	                } 
	                //new test to remove dups 042217
	             else if (currentWrongAnswer===questionToAsk.answer) {
	             	console.log("DUPLICATE IN ARRAY_REAL ANSWER");
	             	arrCurrentQuestionWrongOptions.splice(j,1);
	             	console.log("****removed duplicate ****");
	             	// arrCurrentQuestionWrongOptions.push("Millard Fillmore");
	             	uniqueNum=false;
	             }    
			}

	    	if (uniqueNum) {
	    		arrCurrentQuestionWrongOptions.push(randomAnswerToCheck);
	        }
	        else
	        {
	            i--;
	        }
		        		
	           
	     	wrongAnswer1value=arrCurrentQuestionWrongOptions[0];
	    	wrongAnswer2value=arrCurrentQuestionWrongOptions[1];
	    	wrongAnswer3value=arrCurrentQuestionWrongOptions[2];

	    } 
	} 

	function gameQuestions() {
		getRandomSequence(numberTotalQuestions);
		for (var k=0; k<numberTotalQuestions;k++) {
			arrRoundQuestions.push(arrRandomSequence[k]);
		
	}
		askQuestion();
	}

	function askQuestion() {
	
				var questionIndex=arrRoundQuestions[roundNumber];
				questionToAsk=arrAllQuestions[questionIndex];
				var questionText=questionToAsk.question;
				var questionRightAnswer=questionToAsk.answer;

				questionAnswerImageOne=questionToAsk.personImage;
				questionAnswerImageTwo=questionToAsk.moneyImage;
				var questionContent=questionText;
				var questionAnswers=$("#question");
				var questionAnswersValue=questionAnswers.html("<h3>" + questionContent+"</h3>");
				questionAnswers.append(questionAnswersValue);
					for(m=0;m<arrAdjQuestionOptions.length;m++) { 
						var checkAdjArrayItem=arrAdjQuestionOptions[m];
						if(questionRightAnswer===checkAdjArrayItem) {
								arrAdjQuestionOptions.splice(m,1);
								console.log("Removed " + questionToAsk.answer + " from adjusted array");
						}
					}
				wrongAnswerOptions();
				arrCurrentQuestionWrongOptions.push(questionToAsk.answer);
				arrQuestionOptions=arrAdjQuestionOptions;
				console.log("Replaced Array: " + arrAdjQuestionOptions);
				arrRandomSequence=[];
				getRandomSequence(numberOfAnswers);
					
					for (var j=0; j<numberOfAnswers;j++) {
						sequenceNum=arrRandomSequence[j];
						arrRoundAnswerOptions.push(arrCurrentQuestionWrongOptions[sequenceNum]);
						correctAnswerIndex=arrRoundAnswerOptions.indexOf(questionToAsk.answer);
				
						var answerOptionsValue;
						var answerOptions=$("#answers");
						var answerContent=arrRoundAnswerOptions[j];
						answerOptions.append('<h4 '+ 'id="ans">' + answerContent +'<h4>');
					}
					answered=false;
			
			questionTimerStart();
			getAnswer();

	

	} 


	function getAnswer() {
			$("#answers").click(function(event){
			
				var clickedValue=$(event.target).text();
		
				 $("#answers").off("click");
				 		questionTimerStop();
				 		roundNumber++;
						if (clickedValue==arrRoundAnswerOptions[correctAnswerIndex]) {
						
							answered=true;
							correct++;
							var clickedValueHTML="<h2> Correct it is "+arrRoundAnswerOptions[correctAnswerIndex]+"!</h2>";
							var answerstatusURL="<img src='"+correctAnswerSymbol+"' alt='Correct Answer Symbol' width='300' height='300'>";
							$("#answer-result").append(clickedValueHTML);
							$("#answer-result").append(answerstatusURL);
						
							// setTimeout(function() {
							// 	$("#question").empty();
							// 	$("#answers").empty();
							// 	$("#answer-result").empty();
							// },2000);
							
						}
						else {
							answered=true;
							incorrect++;
							var clickedValueHTML="<h2> Wrong! The correct person is  "+arrRoundAnswerOptions[correctAnswerIndex]+"!</h2>";
							var moneyURL="<img id='imgMoney' src='"+questionAnswerImageTwo+"' alt='Money Two Image'>";
							var personURL="<img src='"+questionAnswerImageOne+"' alt='Money One Image' width='400' height='400'>";
							$("#answer-result").append(clickedValueHTML);
							$("#answer-result").append(moneyURL);
							$("#answer-result").append(personURL);

								// setTimeout(function() {
								// 	$("#question").empty();
								// 	$("#answers").empty();
								// 	$("#answer-result").empty();
								// },2000);
							}
							if (roundNumber==numberGameQuestions) {
								arrRoundAnswerOptions=[];
								setTimeout(function() {
									$("#answer-result").empty();
									$("#question").empty();
									$("#answers").empty();
								gameEndStats();
								},2000);
								
							}
							else {
								arrRoundAnswerOptions=[];
								setTimeout(function() {
									$("#question").empty();
									$("#answers").empty();
									$("#answer-result").empty();
								askQuestion();
							},2000);
							}

			});
		}


	function questionTimerStart() {
	console.log("TIMER STARTED");
    answerWaitTimer = setTimeout(tenSeconds,10000);
    timer.start();
	}

	function questionTimerStop() {
		console.log("TIMER STOPPED*****");
		timer.stop();
		timer.reset();
    clearTimeout(answerWaitTimer);
    $("#timerdisplay").empty();
    // roundNumber++;
		}

		function tenSeconds(){
			console.log("TIMED OUT!!!!!!!!!!!!!!!!  " + roundNumber);
				questionTimerStop();
				roundNumber++;
					$("#answers").off("click");
				
					
						notAnswered++;
						var clickedValueHTML="<h2> You didn't answer! The correct person is  "+arrRoundAnswerOptions[correctAnswerIndex]+"!</h2>";
						var moneyURL="<img id='imgMoney' src='"+questionAnswerImageTwo+"' alt='Money Two Image'>";
						var personURL="<img src='"+questionAnswerImageOne+"' alt='Money One Image' width='400' height='400'>";
							$("#answer-result").append(clickedValueHTML);
							$("#answer-result").append(moneyURL);
							$("#answer-result").append(personURL);
							setTimeout(function() {
							$("#question").empty();
							$("#answers").empty();
							$("#answer-result").empty();
							},2000);
					
							if (roundNumber==numberGameQuestions) {
								console.log("Triggered end of game in timeout routine");
								arrRoundAnswerOptions=[];
								setTimeout(function() {
									// $("#question").empty();
									// $("#answers").empty();
									// $("#answer-result").empty();
								gameEndStats();
							},3000);
							}

							else if (roundNumber<numberGameQuestions) {
								console.log("Triggered continue game in timeout routine");
								arrRoundAnswerOptions=[];
								setTimeout(function() {
								// $("#question").empty();
								// $("#answers").empty();
								// $("#answer-result").empty();
								askQuestion();
							},2000);
							
								
							}
		}

		function gameEndStats() {
			// questionTimerStop();
			console.log("Triggered gameEndStats");
			var resultsSection=$("#results");
			var resultsCorrect=resultsSection.append("<h3>Here's your results after 5 rounds!</h3>");
			var resultsCorrect=resultsSection.append("<h2>Correct: " + correct+"</h2>");
			var resultsInCorrect=resultsSection.append("<h2>Incorrect: " + incorrect+"</h2>");
			var resultsNotAnswered=resultsSection.append("<h2>Unanswered: " + notAnswered+"</h2>");
				setTimeout(function() {
								// $("#question").empty();
								// $("#answers").empty();
								// $("#answer-result").empty();
								restartGame();
							},3000);
			
		}

			function restartGame() {
				questionTimerStop();
				console.log("Triger restartGame");
				$("#results").append("<h2>Click <em> here </em> to Play Again!!!!!</h2>");
			$("#results").click(function(event) {
			// questionTimerStop();	
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
				console.log("Triggered RESTART gameQuestions");
				$("#results").off("click");
				gameQuestions();
				});
			
		}

	gameQuestions();
	console.log("Triggered INITIAL gameQuestions");

});



var timer = {

  time: 11,

  reset: function() {

    timer.time = 11;

    // $("#timerdisplay").empty();

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





