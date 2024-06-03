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
    { image: "./img/taja_1.png", answer: "스스로 불러온 재앙" },
    { image: "./img/taja_2.png", answer: "별걸 다 줄이네" },
    { image: "./img/taja_3.png", answer: "중요한건 꺾이지않는 마음" },
    { image: "./img/taja_4.png", answer: "옥상에서 떨어진 메주" },
    { image: "./img/taja_5.png", answer: "시선 강탈" },
    { image: "./img/taja_6.png", answer: "마음의 상처" },
    { image: "./img/taja_7.png", answer: "꾸민듯 안 꾸민듯" },
    { image: "./img/taja_8.png", answer: "점심 메뉴 추천" },
    { image: "./img/taja_9.png", answer: "Too Much Information" },
    { image: "./img/taja_10.png", answer: "억지 텐션" },
    { image: "./img/taja_11.png", answer: "자존심 강한 두 천재의 대결" },
    { image: "./img/taja_12.png", answer: "불보고 멍때리기" },
    { image: "./img/taja_13.png", answer: "얼어 죽어도 아이스아메리카노" },
    { image: "./img/taja_14.png", answer: "자연스러운 만남 추구" },
    { image: "./img/taja_15.png", answer: "소소하지만 확실한 행복" },
    { image: "./img/taja_16.png", answer: "엄격 근엄 진지" },
    { image: "./img/taja_17.png", answer: "무엇이든 물어보세요" },
    { image: "./img/taja_18.png", answer: "갑자기 분위기 싸해짐" },
    { image: "./img/taja_19.png", answer: "아이스 바닐라 라떼" },
    { image: "./img/taja_20.png", answer: "구독 취소" }
    // ...총 20개의 문제6 여기 추가
    
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
        resultMessage = '대단해요! 혹시 MZ 신가요?';
    } else if (correctCount >= 8) {
        resultMessage = '좋아요! 유행에는 따라가는거 같네요~';
    } else if (correctCount >= 4) {
        resultMessage = '흠... 조금 유행에 뒤쳐지시는거 같은데요?';
    } else {
        resultMessage = '킁킁.. 어디서 홍삼캔디 냄새 나지 않아요?';
    }
    document.getElementById('result-message').textContent = resultMessage;
}

// 처음 문제 로드
loadNextQuestion();
