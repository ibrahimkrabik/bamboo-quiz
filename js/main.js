let buttonTah1 = document.querySelector('#tahleel-1');
let buttonTah2 = document.querySelector('#tahleel-2');
let question = document.querySelector('.main-quiz img');
let answers = document.querySelectorAll('.main-quiz p');
let userScore = document.querySelector('.your-score');
let successSong = document.querySelector('.success');
let failSong = document.querySelector('.fail');
let correctAnswer;
let score = 0;
let i = 0;
let myAnswer;
let myData;
let currentQuestion = document.querySelector('.current-question');
let allQuestion = document.querySelector('.all-questions');
let nextQuestion = document.querySelector('.next');
currentQuestion.innerHTML = i + 1;

document.querySelector('.first button').onclick = () => {
       document.querySelector('.first').classList.add('hide');
       document.querySelector('.seconde').classList.remove('hide');
};
document.querySelector('.continue').onclick = () => {
       document.querySelector('.seconde').classList.add('hide');
       document.querySelector('.main-page').classList.remove('hide');
};
document.querySelector('.exit').onclick = () => {
       window.close();
};
document.querySelectorAll('.choose button').forEach((ele) => {
       ele.onclick = () => {
              document.querySelector('.choose').classList.add('hide');
              document.querySelector('.first').classList.remove('hide');
       };
});
buttonTah1.onclick = () => {
       document.querySelector('.choose').classList.add('hide');
       document.querySelector('.first').classList.remove('hide');
       fetch('/js/tahleel1.json')
              .then((response) => response.json())
              .then((data) => {
                     myData = data;
                     allQuestion.innerHTML = myData.length;
                     correctAnswer = myData[i].coorectAnswer;
                     question.src = myData[i].question;
                     answers.forEach((element, index) => {
                            element.innerHTML = myData[i].answers[index];
                     });
              });
};

buttonTah2.onclick = () => {
       document.querySelector('.choose').classList.add('hide');
       document.querySelector('.first').classList.remove('hide');
       fetch('/js/tahleel2.json')
              .then((response) => response.json())
              .then((data) => {
                     myData = data;
                     allQuestion.innerHTML = myData.length;
                     correctAnswer = myData[i].coorectAnswer;
                     question.src = myData[i].question;
                     answers.forEach((element, index) => {
                            element.innerHTML = myData[i].answers[index];
                     });
              });
};

function selectAnswer() {
       answers.forEach((element) => {
              element.onclick = () => {
                     nextQuestion.classList.remove('hide');
                     myAnswer = element.innerHTML;
                     if (myAnswer == correctAnswer) {
                            score++;
                            answers.forEach((ele) => {
                                   if (ele.innerHTML == myAnswer) {
                                          ele.classList.add('true');
                                   }
                            });
                            successSong.play();
                     } else {
                            answers.forEach((ele) => {
                                   if (ele.innerHTML == myAnswer) {
                                          ele.classList.add('false');
                                   } else if (ele.innerHTML == correctAnswer) {
                                          ele.classList.add('true');
                                   }
                            });
                            failSong.play();
                     }
              };
       });
}
selectAnswer();
function nextQuestionIs() {
       answers.forEach((ele) => {
              ele.classList.remove('false');
              ele.classList.remove('true');
       });

       if (i < myData.length - 1) {
              ++i;
              currentQuestion.innerHTML = i + 1;
              nextQuestion.classList.add('hide');
              correctAnswer = myData[i].coorectAnswer;
              question.src = myData[i].question;
              answers.forEach((element, index) => {
                     element.innerHTML = myData[i].answers[index];
              });
       } else {
              userScore.innerHTML = score;
              if (score > 20) {
                     document.querySelector('.emojy').innerHTML =
                            "<i class='fa-solid fa-face-smile-wink'></i>";
              } else {
                     document.querySelector('.emojy').innerHTML =
                            "<i class='fa-solid fa-face-frown'></i>";
              }
              document.querySelector('.main-page').classList.add('hide');
              document.querySelector('.score-page').classList.remove('hide');
       }
}

nextQuestion.onclick = nextQuestionIs;
