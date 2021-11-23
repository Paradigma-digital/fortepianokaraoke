document.addEventListener('DOMContentLoaded', () => {

    const createPlayerAndPopup = (src) => {
        //add player

        const tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        let player;

        const createPlayer = (src) => {
            player = new YT.Player('player', {
                height: '100%',
                width: '100%',
                videoId: src
            });
        }
        const stopVideo = (player) => {
            player.stopVideo();
        }

        // add popup 
        const trigger = document.querySelector('.top-form__media > img'),
          overlay = document.querySelector('.overlay');

        trigger.addEventListener('click', () => {
            overlay.style.visibility = 'visible';
                overlay.classList.remove('fadeOut');
                overlay.classList.add('fade');
            if (!document.querySelector('iframe#player')) {
                createPlayer('X8Z8okhkjv8');
            } 
        }); 
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('fade');
                overlay.classList.add('fadeOut');
                overlay.style.visibility = 'hidden';
                stopVideo(player);
            }
        });
    }

    document.querySelector('#top-form').addEventListener('submit', () => {
        console.log('sadf');
    });
    // uri video
    createPlayerAndPopup('X8Z8okhkjv8');

    // mask and validate form 
    const selector = document.querySelector("#topTel");
    const im = new Inputmask("+7 (999) 999-99-99");
    im.mask(selector);

    new JustValidate('#top-form', {
        rules: {
            topName: {
                required: true,
                minLength: 3
            },
            topTel: {
                required: true,
                function: () => {
                    const phone = selector.inputmask.unmaskedvalue();
                    return Number(phone) && phone.length === 10;
                }
            }
        },
        messages: {
            topName: {
                required: 'Это поле обязательное для ввода',
                minLength: 'Минимум 3 символа'
            },
            topTel: {
                required: 'Это поле обязательное для ввода',
                tel: "Введите номер телефона корректно",
                function: "Введите номер телефона корректно"
            }
        }
    });
});