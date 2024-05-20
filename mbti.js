const startButton = document.getElementById("startButton");
startButton.textContent="테스트 시작";
startButton.addEventListener("click", function() {
    startTest()
});   

function startTest() {
    // 페이지 1 숨기고
    document.getElementById("start-box").style.display = "none";
    // 페이지 2 보이기
    document.getElementById("question-box").style.display = "block";
}


// 질문과 답변을 배열에 객체로 저장
const questions = [
    {
        question: "당신은 사람들과 어울리는 것을 좋아하세요?", // 질문
        options: ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"], // 선택지
        answer: 1 // 정답의 인덱스
    },
    {
        question: "새로운 도전에 대한 자신의 태도는 어떤가요?",
        options: ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"],
        answer: 2
    },
    {
        question: "스트레스 상황에서 자신의 감정을 어떻게 통제하나요?",
        options: ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"],
        answer: 3
    },
    {
        question: "새로운 아이디어에 대해 얼마나 열려 있나요?",
        options: ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"],
        answer: 4
    },
    {
        question: "고난과 역경에 직면했을 때, 어떤 대처 방식을 택하시나요?",
        options: ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"],
        answer: 5
    },
    {
        question: "당신은 사람들과 어울리는 것을 좋아하세요?", // 질문
        options: ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"], // 선택지
        answer: 1 // 정답의 인덱스
    },
    {
        question: "새로운 도전에 대한 자신의 태도는 어떤가요?",
        options: ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"],
        answer: 2
    },
    {
        question: "스트레스 상황에서 자신의 감정을 어떻게 통제하나요?",
        options: ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"],
        answer: 3
    },
    {
        question: "새로운 아이디어에 대해 얼마나 열려 있나요?",
        options: ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"],
        answer: 4
    },
    {
        question: "고난과 역경에 직면했을 때, 어떤 대처 방식을 택하시나요?",
        options: ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"],
        answer: 5
    },
    // ... 추가 질문들
];

let currentQuestion = 0; // 현재 질문 인덱스
let score = 0; // 사용자 점수

function showQuestion() {
    // 현재 질문 객체 가져오기
    const question = questions[currentQuestion];
    // 질문 텍스트 엘리먼트에 질문 내용 설정
    document.getElementById("question").textContent = question.question;
    // 선택지 버튼 생성 및 이벤트 설정
    for (let i = 0; i < question.options.length; i++) {
        const optionButton = document.getElementById(`option${i + 1}`);
        optionButton.textContent = question.options[i];
        optionButton.onclick = () => selectAnswer(i); // 클릭 이벤트에 해당 선택지의 인덱스 전달
    }
}

function selectAnswer(index) {
    const question = questions[currentQuestion];
    // 정답일 경우 점수 증가
    if (index === question.answer) {
        score++;
    }
    currentQuestion++; // 다음 질문 인덱스로 이동
    // 모든 질문에 대한 답변이 아직 남아있으면 다음 질문 보여주기, 아니면 결과 페이지로 이동
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        // 결과 페이지로 이동하는 버튼 생성
        const button = document.createElement('button');
        button.textContent = '결과창으로 이동';
        button.id = "answerButton";
        // 버튼 클릭 시 결과 함수 호출
        document.getElementById("question-box").appendChild(button);

        button.addEventListener('click', function() {
            goToResult(); // 결과 함수 호출
        });
    }
}

// 결과 페이지로 이동하는 함수
function goToResult() {
    // 질문 페이지 숨기고 결과 페이지 보이기
    document.getElementById("question-box").style.display = "none";
    document.getElementById("result-box").style.display = "block";

    // 결과 계산 및 표시
    const resultBox = document.getElementById("result-box");
    resultBox.style.display = "block";
    let resultText;
    if (score < 3) {
        resultText = "당신은 내향적인 성격입니다.";
    } else if (score < 6) {
        resultText = "당신은 혼합적인 성격입니다.";
    } else {
        resultText = "당신은 외향적인 성격입니다.";
    }
    document.getElementById("result").textContent = resultText;

    // 결과 페이지로 이동한 후 버튼 숨김
    const answerButton = document.getElementById("answerButton");
    if (answerButton) {
        answerButton.parentNode.removeChild(answerButton);
    }
}

// 초기에 첫 번째 질문 표시
showQuestion();