
    var quiztitle = "";

    /**
    * Set the information about your questions here. The correct answer string needs to match
    * the correct choice exactly, as it does string matching. (case sensitive)
    *
    */
    var quiz = [
        {
            "question"      :   "Q1: ಯೇಸುಕ್ರಿಸ್ತನು ಯಾವ ವಯಸ್ಸಿನಲ್ಲಿ ತನ್ನ ಸೇವೆಯನ್ನು ಪ್ರಾರಂಭಿಸಿದನು. ? ' At what Age did Jesus begin His Ministry?",
            "image"         :   "http://res.cgvdt.vn/article/2015/3/91/b_gap-go-chua-jesus.jpg",
            "choices"       :   [
                                    "30",
                                    "33",
                                    "32",
                                    "21"
                                ],
            "correct"       :   "30",
            "explanation"   :   "Luke 3:23 ಯೇಸು ಉಪದೇಶಮಾಡುವದಕ್ಕೆ ಪ್ರಾರಂಭಿಸಿದಾಗ ಹೆಚ್ಚುಕಡಿಮೆ ಮೂವತ್ತು ವರುಷದವನಾಗಿದ್ದನು. ಆತನು ಜನರ ಎಣಿಕೆಯಲ್ಲಿ ಯೋಸೇಫನ ಮಗನು.",
        },
        {
            "question"      :   "Q2: ಯೇಸು ಕ್ರಿಸ್ತನು ಮಾಡಿದ ಮೊದಲ ಅದ್ಭುತ ಯಾವುದು? What was the first miracle that Jesus performed ?",
            "image"         :   "http://upload.wikimedia.org/wikipedia/commons/thumb/9/94/US_%242_obverse-high.jpg/320px-US_%242_obverse-high.jpg",
            "choices"       :   [
                                    "5 ರೊಟ್ಟಿ 2 ಮೀನುಗಳಿಂದ 5000 ಜನರನ್ನು ಪೋಷಿಸಿದ್ದು , fed 5000 people with 5 loaves & 2 fishes.",
									"ನೀರಿನ ಮೇಲೆ ನಡೆದು ಬಂದದ್ದು , walked on water",
									"ನೀರನ್ನು ದ್ರಾಕ್ಷರಸವಾಗಿ ಮಾಡಿದ್ದು, turned water into wine.",
									"ಸತ್ತ ಬಾಲಕನನ್ನು ಎಬ್ಬಿಸಿದ, resurrected a young boy"
                                ],
            "correct"       :   "ನೀರನ್ನು ದ್ರಾಕ್ಷರಸವಾಗಿ ಮಾಡಿದ್ದು, turned water into wine.",
            "explanation"   :   "ಯೋಹಾನ 2:1-11 ನೀರನ್ನು ದ್ರಾಕ್ಷರಸವಾಗಿ ಮಾಡಿದ್ದು, turned water into wine. John 2:1-11",
        },
        {
            "question"      :   "Q3: ಯೇಸುಕ್ರಿಸ್ತನು ಯಾವ ಸ್ಥಳದಲ್ಲಿ ಬೆಳೆದನು? Where did Jesus grow up ?",
            "image"         :   "",
            "choices"       :   [
                                    "ಯೆರೂಸಲೇಮ, Jerusalem",
									"ಯೆರಿಕೋ, Jericho",
									"ಬಾಬೆಲ್, Babylon",
									"ನಜರೇತ, Nazareth"
                                ],
            "correct"       :   "ನಜರೇತ, Nazareth",
            "explanation"   :   "ಲೂಕ 2: 51 ನಜರೇತ, - LUKE 2:51 Nazareth",
        },

    ];


    /******* No need to edit below this line *********/
    var currentquestion = 0, score = 0, submt=true, picked;

    jQuery(document).ready(function($){

        /**
         * HTML Encoding function for alt tags and attributes to prevent messy
         * data appearing inside tag attributes.
         */
        function htmlEncode(value){
          return $(document.createElement('div')).text(value).html();
        }

        /**
         * This will add the individual choices for each question to the ul#choice-block
         *
         * @param {choices} array The choices from each question
         */
        function addChoices(choices){
            if(typeof choices !== "undefined" && $.type(choices) == "array"){
                $('#choice-block').empty();
                for(var i=0;i<choices.length; i++){
                    $(document.createElement('li')).addClass('choice choice-box').attr('data-index', i).text(choices[i]).appendTo('#choice-block');                    
                }
            }
        }
        
        /**
         * Resets all of the fields to prepare for next question
         */
        function nextQuestion(){
            submt = true;
            $('#explanation').empty();
            $('#question').text(quiz[currentquestion]['question']);
            $('#pager').text('Question ' + Number(currentquestion + 1) + ' of ' + quiz.length);
            if(quiz[currentquestion].hasOwnProperty('image') && quiz[currentquestion]['image'] != ""){
                if($('#question-image').length == 0){
                    $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question'])).insertAfter('#question');
                } else {
                    $('#question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question']));
                }
            } else {
                $('#question-image').remove();
            }
            addChoices(quiz[currentquestion]['choices']);
            setupButtons();
        }

        /**
         * After a selection is submitted, checks if its the right answer
         *
         * @param {choice} number The li zero-based index of the choice picked
         */
        function processQuestion(choice){
            if(quiz[currentquestion]['choices'][choice] == quiz[currentquestion]['correct']){
                $('.choice').eq(choice).css({'background-color':'#50D943'});
                $('#explanation').html('<strong>Correct!</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
                score++;
            } else {
                $('.choice').eq(choice).css({'background-color':'#D92623'});
                $('#explanation').html('<strong>Incorrect.</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
            }
            currentquestion++;
            $('#submitbutton').html('NEXT QUESTION &raquo;').on('click', function(){
                if(currentquestion == quiz.length){
                    endQuiz();
                } else {
                    $(this).text('Check Answer').css({'color':'#222'}).off('click');
                    nextQuestion();
                }
            })
        }

        /**
         * Sets up the event listeners for each button.
         */
        function setupButtons(){
            $('.choice').on('mouseover', function(){
                $(this).css({'background-color':'#e1e1e1'});
            });
            $('.choice').on('mouseout', function(){
                $(this).css({'background-color':'#fff'});
            })
            $('.choice').on('click', function(){
                picked = $(this).attr('data-index');
                $('.choice').removeAttr('style').off('mouseout mouseover');
                $(this).css({'border-color':'#222','font-weight':700,'background-color':'#c1c1c1'});
                if(submt){
                    submt=false;
                    $('#submitbutton').css({'color':'#000'}).on('click', function(){
                        $('.choice').off('click');
                        $(this).off('click');
                        processQuestion(picked);
                    });
                }
            })
        }
        
        /**
         * Quiz ends, display a message.
         */
		 
        function endQuiz(){
			
            $('#explanation').empty();
            $('#question').empty();
            $('#choice-block').empty();
            $('#submitbutton').remove();
            $('#question').text("You got " + score + " out of " + quiz.length + " correct.");
            $(document.createElement('h2')).css({'text-align':'center', 'font-size':'4em'}).text(Math.round(score/quiz.length * 100) + '%').insertAfter('#question');
			
			if (score > 2 || score == 2 ){
			nextlevelshow();
			}
			else {
				samelevel();
			}
        }
		
		function samelevel(){
			$('#samelevel').show()
		}
		
		function nextlevelshow(){
			$('#nextlevel').show()
		}
        /**
         * Runs the first time and creates all of the elements for the quiz
         */
        function init(){
            //add title
            if(typeof quiztitle !== "undefined" && $.type(quiztitle) === "string"){
                $(document.createElement('h1')).text(quiztitle).appendTo('#frame');
            } else {
                $(document.createElement('h1')).text("Quiz").appendTo('#frame');
            }

            //add pager and questions
            if(typeof quiz !== "undefined" && $.type(quiz) === "array"){
                //add pager
                $(document.createElement('p')).addClass('pager').attr('id','pager').text('Question 1 of ' + quiz.length).appendTo('#frame');
                //add first question
                $(document.createElement('h2')).addClass('question').attr('id', 'question').text(quiz[0]['question']).appendTo('#frame');
                //add image if present
                if(quiz[0].hasOwnProperty('image') && quiz[0]['image'] != ""){
                    $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[0]['image']).attr('alt', htmlEncode(quiz[0]['question'])).appendTo('#frame');
                }
                $(document.createElement('p')).addClass('explanation').attr('id','explanation').html('&nbsp;').appendTo('#frame');
            
                //questions holder
                $(document.createElement('ul')).attr('id', 'choice-block').appendTo('#frame');
            
                //add choices
                addChoices(quiz[0]['choices']);
            
                //add submit button
                $(document.createElement('div')).addClass('choice-box').attr('id', 'submitbutton').text('Check Answer').css({'font-weight':700,'color':'#222','padding':'30px 0'}).appendTo('#frame');
            
                setupButtons();
            }
        }
        
        init();
    });
    