var quiztitle = "Test your maths skills!";


var quiz = [
       {
           "question" : "Q1: 2 + 3?",
           "image" : "",
           "choices" : [
                                   "6",
                                   "5",
                                   "1",
                                   "4"
                               ],
           "correct" : "5",
           "explanation" : "Practise makes perfect!",
       },
       {
           "question" : "Q2: 2 + 5 * 2?",
           "image" : "",
           "choices" : [
                                   "8",
                                   "14",
                                   "9",
                                   "12"
                               ],
           "correct" : "12",
           "explanation" : "Don't forget to do multiplication before addition!",
       },
       {
           "question" : "Q3: 5 - 2 + 8 % 4?",
           "image" : "",
           "choices" : [
                                   "3",
                                   "5",
                                   "11",
                                   "4"
                               ],
           "correct" : "5",
           "explanation" : "Did you remember BODMAS? Click on next question to find out your score!",
       },


   ];


var currentquestion = 0,
    score = 0,
    submt = true,
    picked;

jQuery(document).ready(function ($) {


    function htmlEncode(value) {
        return $(document.createElement('div')).text(value).html();
    }


    function addChoices(choices) {
        if (typeof choices !== "undefined" && $.type(choices) == "array") {
            $('#choice-block').empty();
            for (var i = 0; i < choices.length; i++) {
                $(document.createElement('li')).addClass('choice choice-box').attr('data-index', i).text(choices[i]).appendTo('#choice-block');
            }
        }
    }

    function nextQuestion() {
        submt = true;
        $('#explanation').empty();
        $('#question').text(quiz[currentquestion]['question']);
        $('#pager').text('Question ' + Number(currentquestion + 1) + ' of ' + quiz.length);
        if (quiz[currentquestion].hasOwnProperty('image') && quiz[currentquestion]['image'] != "") {
            if ($('#question-image').length == 0) {
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


    function processQuestion(choice) {
        if (quiz[currentquestion]['choices'][choice] == quiz[currentquestion]['correct']) {
            $('.choice').eq(choice).css({
                'background-color': '#50D943'
            });
            $('#explanation').html('<strong>Correct!</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
            score++;
        } else {
            $('.choice').eq(choice).css({
                'background-color': '#D92623'
            });
            $('#explanation').html('<strong>Incorrect.</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
        }
        currentquestion++;
        $('#submitbutton').html('NEXT QUESTION &raquo;').on('click', function () {
            if (currentquestion == quiz.length) {
                endQuiz();
            } else {
                $(this).text('Check Answer').css({
                    'color': '#222'
                }).off('click');
                nextQuestion();
            }
        })
    }


    function setupButtons() {
        $('.choice').on('mouseover', function () {
            $(this).css({
                'background-color': '#e1e1e1'
            });
        });
        $('.choice').on('mouseout', function () {
            $(this).css({
                'background-color': '#fff'
            });
        })
        $('.choice').on('click', function () {
            picked = $(this).attr('data-index');
            $('.choice').removeAttr('style').off('mouseout mouseover');
            $(this).css({
                'border-color': '#222',
                'font-weight': 700,
                'background-color': '#c1c1c1'
            });
            if (submt) {
                submt = false;
                $('#submitbutton').css({
                    'color': '#000'
                }).on('click', function () {
                    $('.choice').off('click');
                    $(this).off('click');
                    processQuestion(picked);
                });
            }
        })
    }


    function endQuiz() {
        $('#explanation').empty();
        $('#question').empty();
        $('#choice-block').empty();
        $('#submitbutton').remove();
        $('#question').text("You got " + score + " out of " + quiz.length + " correct.");
        $(document.createElement('h2')).css({
            'text-align': 'center',
            'font-size': '4em'
        }).text(Math.round(score / quiz.length * 100) + '%').insertAfter('#question');
    }


    function init() {
        //add title
        if (typeof quiztitle !== "undefined" && $.type(quiztitle) === "string") {
            $(document.createElement('h1')).text(quiztitle).appendTo('#frame');
        } else {
            $(document.createElement('h1')).text("Quiz").appendTo('#frame');
        }

        //add pager and questions
        if (typeof quiz !== "undefined" && $.type(quiz) === "array") {
            //add pager
            $(document.createElement('p')).addClass('pager').attr('id', 'pager').text('Question 1 of ' + quiz.length).appendTo('#frame');
            //add first question
            $(document.createElement('h2')).addClass('question').attr('id', 'question').text(quiz[0]['question']).appendTo('#frame');
            //add image if present
            if (quiz[0].hasOwnProperty('image') && quiz[0]['image'] != "") {
                $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[0]['image']).attr('alt', htmlEncode(quiz[0]['question'])).appendTo('#frame');
            }
            $(document.createElement('p')).addClass('explanation').attr('id', 'explanation').html('&nbsp;').appendTo('#frame');

            //questions holder
            $(document.createElement('ul')).attr('id', 'choice-block').appendTo('#frame');

            //add choices
            addChoices(quiz[0]['choices']);

            //add submit button
            $(document.createElement('div')).addClass('choice-box').attr('id', 'submitbutton').text('Check Answer').css({
                'font-weight': 700,
                'color': '#222',
                'padding': '30px 0'
            }).appendTo('#frame');

            setupButtons();
        }
    }

    init();
});
