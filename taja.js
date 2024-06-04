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
    { image: "./img/taja/taja_1.png", answer: "스스로 불러온 재앙" },
    { image: "./img/taja/taja_2.png", answer: "별걸 다 줄이네" },
    { image: "./img/taja/taja_3.png", answer: "중요한건 꺾이지않는 마음" },
    { image: "./img/taja/taja_4.png", answer: "옥상에서 떨어진 메주" },
    { image: "./img/taja/taja_5.png", answer: "시선 강탈" },
    { image: "./img/taja/taja_6.png", answer: "마음의 상처" },
    { image: "./img/taja/taja_7.png", answer: "꾸민듯 안 꾸민듯" },
    { image: "./img/taja/taja_8.png", answer: "점심 메뉴 추천" },
    { image: "./img/taja/taja_9.png", answer: "Too Much Information" },
    { image: "./img/taja/taja_10.png", answer: "억지 텐션" },
    { image: "./img/taja/taja_11.png", answer: "자존심 강한 두 천재의 싸움" },
    { image: "./img/taja/taja_12.png", answer: "불보며 멍때리기" },
    { image: "./img/taja/taja_13.png", answer: "얼어 죽어도 아이스아메리카노" },
    { image: "./img/taja/taja_14.png", answer: "자연스러운 만남 추구" },
    { image: "./img/taja/taja_15.png", answer: "소소하지만 확실한 행복" },
    { image: "./img/taja/taja_16.png", answer: "엄격 근엄 진지" },
    { image: "./img/taja/taja_17.png", answer: "무엇이든 물어보세요" },
    { image: "./img/taja/taja_18.png", answer: "갑자기 분위기 싸해짐" },
    { image: "./img/taja/taja_19.png", answer: "아이스 바닐라 라떼" },
    { image: "./img/taja/taja_20.png", answer: "좋아요 댓글 구독 알림설정" }
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
    localStorage.setItem('correctCount', correctCount); // 점수를 localStorage에 저장

    let resultPage = '';
    if (correctCount >= 12) {
        resultPage = `./taja_result/high_taja_result.html`;
    } else if (correctCount >= 8) {
        resultPage = `./taja_result/well_taja_result.html`;
    } else if (correctCount >= 4) {
        resultPage = `./taja_result/medium_taja_result.html`;
    } else {
        resultPage = `./taja_result/low_taja_result.html`;
    }
    window.location.href = resultPage;
}
    
document.addEventListener('DOMContentLoaded', (event) => {
    const answerInput = document.getElementById('answer-input');
    const submitBtn = document.getElementById('submit-btn');

    // 엔터키가 눌렸을 때 submit 버튼 클릭 이벤트 트리거
    answerInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // 기본 엔터키 동작 방지
            submitBtn.click(); // submit 버튼 클릭 이벤트 트리거
        }
    });

    // 처음 문제 로드
    loadNextQuestion();
});
