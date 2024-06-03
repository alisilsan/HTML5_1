// testStartButton 요소의 클릭 이벤트 핸들러 등록
const testStartButton = document.getElementById("testStartButton");
testStartButton.textContent = "테스트 시작"; // 버튼 텍스트 설정
testStartButton.addEventListener("click", function() {
    startTest(); // startTest 함수 호출
});   

// 페이지 2로 이동하는 함수
function startTest() {
    // 페이지 1 숨기기
    document.getElementById("testStart-container").style.display = "none";
    // 페이지 2 보이기
    document.getElementById("test-container").style.display = "block";
}

const questions = [
    { image: "images/image1.jpg", answer: "스스로 불러온 재앙" },
    { image: "images/image2.jpg", answer: "별걸 다 줄이네" },
    { image: "images/image3.jpg", answer: "중요한건 꺾이지 않는 마음" },
    { image: "images/image4.jpg", answer: "answer4" },
    { image: "images/image5.jpg", answer: "answer5" },
    { image: "images/image6.jpg", answer: "answer6" },
    { image: "images/image7.jpg", answer: "answer7" },
    { image: "images/image8.jpg", answer: "answer8" },
    { image: "images/image9.jpg", answer: "answer9" },
    { image: "images/image10.jpg", answer: "answer10" },
    { image: "images/image11.jpg", answer: "answer11" },
    { image: "images/image12.jpg", answer: "answer12" },
    { image: "images/image13.jpg", answer: "answer13" },
    { image: "images/image14.jpg", answer: "answer14" },
    { image: "images/image15.jpg", answer: "answer15" },
    { image: "images/image16.jpg", answer: "answer16" },
    { image: "images/image17.jpg", answer: "answer17" },
    { image: "images/image18.jpg", answer: "answer18" },
    { image: "images/image19.jpg", answer: "answer19" },
    { image: "images/image20.jpg", answer: "answer20" }
    // ...총 20개의 문제를 여기 추가
    
];

let currentQuestionIndex = 0;
let correctCount = 0;

document.getElementById('submit-btn').addEventListener('click', function() {
    const userAnswer = document.getElementById('answer-input').value.trim();
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        correctCount++;
        document.getElementById('result').textContent = "Correct!";
    } else {
        document.getElementById('result').textContent = "Incorrect!";
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadNextQuestion();
    } else {
        showFinalResult();
    }
});

function loadNextQuestion() {
    const nextQuestion = questions[currentQuestionIndex];
    document.getElementById('test-image').src = nextQuestion.image;
    document.getElementById('answer-input').value = '';
    document.getElementById('result').textContent = '';
}

function showFinalResult() {
    document.getElementById('test-container').style.display = "none";
    document.getElementById('final-result').style.display = "block";
    document.getElementById('correct-count').textContent = correctCount;

    let resultMessage = '';
    if (correctCount >= 12) {
        resultMessage = 'Excellent! You scored between 12 and 20.';
    } else if (correctCount >= 8) {
        resultMessage = 'Good job! You scored between 8 and 11.';
    } else if (correctCount >= 4) {
        resultMessage = 'Not bad! You scored between 4 and 7.';
    } else {
        resultMessage = 'Keep practicing! You scored between 0 and 3.';
    }
    document.getElementById('result-message').textContent = resultMessage;
}

// 처음 문제 로드
loadNextQuestion();
