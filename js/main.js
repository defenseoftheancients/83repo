$(document).ready(function() {
    // process bar
    setTimeout(function() {
        firstQuestion();
        $('.spinner').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({
            'overflow': 'visible'
        });
    }, 600);
})

function init(){
    $('#title').text(CONFIG.title)
    $('#desc').text(CONFIG.desc)
    $('#yes').text(CONFIG.btnYes)
    $('#no').text(CONFIG.btnNo)
}

function firstQuestion(){
    $('.content').hide();
    Swal.fire({
        title: CONFIG.introTitle,
        text: CONFIG.introDesc,
        imageUrl: 'img/images.jpeg',
        imageWidth: 300,
        imageHeight: 300,
        // background: '#fff url("img/iput-bg.jpg")',
        imageAlt: 'Custom image',
        confirmButtonText: CONFIG.btnIntro
      }).then(function(){
        $('.content').show(200);
      })
}

 // switch button position
 function switchButton() {
    var audio = new Audio('sound/duck.mp3');
    audio.play();
    var leftNo = $('#no').css("left");
    var topNO = $('#no').css("top");
    var leftY = $('#yes').css("left");
    var topY = $('#yes').css("top");
    $('#no').css("left", leftY);
    $('#no').css("top", topY);
    $('#yes').css("left", leftNo);
    $('#yes').css("top", topNO);
}
// move random button póition
function moveButton() {
    var audio = new Audio('sound/Swish1.mp3');
    audio.play();
    var x = Math.random() * ($(window).width() - $('#no').width()) * 0.9 ;
    var y = Math.random() * ($(window).height() - $('#no').height()) * 0.9;
    var left = x + 'px';
    var top = y + 'px';
    $('#no').css("left", left);
    $('#no').css("top", top);
}

init()

var n = 0;
$('#no').mousemove(function() {
    if (n < 1)
        switchButton();
    if (n > 1)
        moveButton();
    n++;
});
$('#no').click(() => {
    if (screen.width>=900)
        switchButton();
})

// generate text in input
function textGenerate() {
    var n = "";
    var text = " " + CONFIG.reply;
    var a = Array.from(text);
    var textVal = $('#txtReason').val() ? $('#txtReason').val() : "";
    var count = textVal.length;
    if (count > 0) {
        for (let i = 1; i <= count; i++) {
            n = n + a[i];
            if (i == text.length + 1) {
                $('#txtReason').val("");
                n = "";
                break;
            }
        }
    }
    $('#txtReason').val(n);
    setTimeout("textGenerate()", 1);
}


// show popup
$('#yes').click(function() {
    var audio = new Audio('sound/tick.mp3');
    audio.play();
    Swal.fire({
        title: CONFIG.question,
        html: true,
        width: 900,
        padding: '3em',
        html: "<input type='text' class='form-control' id='txtReason' onmousemove=textGenerate()  placeholder='Điền tầm tư vào đây'>",
        // background: '#fff url("img/iput-bg.jpg")',
        // backdrop: `
        //       rgba(0,0,123,0.4)
        //       url("img/giphy2.gif")
        //       left top
        //       no-repeat
        //     `,
        confirmButtonColor: '#3085d6',
        confirmButtonColor: '#fe8a71',
        confirmButtonText: CONFIG.btnReply
    }).then((result) => {
        if (result.value) {
            // Fade out current content smoothly
            $('body').addClass('second-page-active');
            $('.wrapper').fadeOut(600, function() {
                // Hide first page completely
                $('.wrapper').hide();
                
                // Show second page with fade in
                $('#second-page').css({
                    'display': 'block',
                    'opacity': 0
                });
                
                // Execute scripts from second page
                setTimeout(function() {
                    // Execute GSAP animations
                    if (typeof gsap !== 'undefined') {
                        var where = $("#where"),
                            there1 = $("#there_1"),
                            is1 = $("#is_1"),
                            a = $("#a"),
                            woman = $("#woman"),
                            there2 = $("#there_2"),
                            is2 = $("#is_2"),
                            magic = $("#magic"),
                            plant = $("#plants"),
                            star1 = $("#stars_1"),
                            star2 = $("#stars_2"),
                            star3 = $("#stars_3");
                        var delay = .3;
                        var delta = 2;

                        function mainScene() {
                            var tl = gsap.timeline();
                            tl.set([plant, where, there1, is1, a, woman, there2, is2, magic, star1, star2, star3, "#second-page p"], { autoAlpha: 0 });
                            tl.add("start")
                                .from(plant, { duration: 1, delay: 0.5, autoAlpha: 0, ease: "none" })
                                .to("#second-page p", { duration: 1, autoAlpha: 1, ease: "none" })
                                .from([where, there1, is1, a], { duration: delay, autoAlpha: 0, ease: "none", stagger: delay })
                                .to(woman, { duration: 1.5, autoAlpha: 1, ease: "none", x: 100, y: -20 })
                                .from([there2, is2], { duration: delay, autoAlpha: 0, ease: "none", stagger: delay })
                                .to(magic, { duration: 1, autoAlpha: 1, ease: "none", x: 20, y: 5 })
                                .to(star1, { duration: 1.5, autoAlpha: 1, repeat: -1, ease: "none", rotation: 1, yoyo: true })
                                .to(star2, { duration: 2, autoAlpha: 1, repeat: -1, ease: "none", rotation: 5, yoyo: true })
                                .to(star3, { duration: 2.5, autoAlpha: 1, repeat: -1, ease: "none", rotation: -2, yoyo: true });
                        }

                        var master = gsap.timeline();
                        master.add(mainScene(), "mainScene");
                    }
                    
                    // Execute TweenMax animation for background
                    if (typeof TweenMax !== 'undefined') {
                        TweenMax.to("#second-page", 20, { backgroundPositionY: -100, repeat: -1, ease: Power0.easeNone });
                    }
                    
                    // Fade in second page smoothly
                    $('#second-page').animate({
                        opacity: 1
                    }, 800, function() {
                        $('body').removeClass('second-page-active');
                        // Trigger event for music player auto-play
                        $(document).trigger('secondPageShown');
                    });
                }, 100);
            });
        }
    })
})
