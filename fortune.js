$(document).ready(function() {
    // 포춘 쿠키 이미지 클릭 이벤트
    $('#fortune-cookie').click(function() {
        $(this).fadeOut(800); // 기존 포춘 쿠키 이미지 사라짐
        $('.infocontainer').fadeIn(3000); // infocontainer 컨테이너 출력
    });

    // fortune-info 클릭 이벤트
    $('.fortune-image').click(function() {
        $(this).fadeOut(800); // 포춘 쿠키 이미지 사라짐
        $('.fortune-info').fadeOut();
        
        setTimeout(function() {
            $('<div class="fortuneSecondimage"><img src="./img/fortunecookieBreak.png" alt="Temporary Fortune Cookie"></div>').insertAfter('.container').hide().fadeIn(1000);
            console.log("123"); // 임시 포춘쿠키 이미지 출력
        }, 1000);

        setTimeout(function() {
            $('.fortuneSecondimage').fadeOut(500); // 임시 포춘쿠키 이미지 사라짐
            // 랜덤으로 운세 쪽지 출력
            var fortunes = ['./img/text1.jpg', './img/text2.jpg', './img/text3.jpg', './img/text4.jpg', './img/text5.jpg', './img/text6.jpg'];
            var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
            $('<img src="' + randomFortune + '" alt="Fortune" class="randomFortune">').appendTo('body').fadeOut(0).fadeIn(3000); // randomfortune 클래스명 추가
            setTimeout(function() {
                $('<button class="restart-button">다시 시작</button>').appendTo('body'); // 처음으로 돌아가는 버튼 출력
                $('<button class="reset-button">홈으로</button>').appendTo('body'); // 홈으로 이동하는 버튼 출력

                // 처음으로 돌아가는 버튼 클릭 이벤트
                $('.restart-button').click(function() {
                    location.reload(); // 페이지 새로고침
                });

                // 홈으로 이동하는 버튼 클릭 이벤트
                $('.reset-button').click(function() {
                    window.location.href = 'index.html'; // index.html로 이동
                });
            }, 5000);
        }, 3000);
    });
});
