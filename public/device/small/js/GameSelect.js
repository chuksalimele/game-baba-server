
Main.on("pagecreate", function (arg) {

    $('#test-game-view').on('click', function () {

        Main.page.show({//TESTING!!!
            url: "game-view.html",
            effect: "slideleft",
            duration: 500,
            onBeforeShow: Main.controller.GameView.onBeforeShow,
            data: {
                game: "name of game e.g chess , draft etc",
                gameId: "3i393kj383k2c83j", //a unique id for this match
                white_player_id: "07038428492", //must be a phone number
                white_player_name: "Chuks Alimele",
                white_player_pic: "app/images/white_player.jpg",
                black_player_id: "08024044943", //must be a phone number
                black_player_name: "Onome Okoro",
                black_player_pic: "app/images/black_player.jpg",
                score: "2 - 0",
                game_status: "Live",
                game_position: "The game position goes here",
                game_duration: "the game duration goes here"

            }
        });

    });

    $('#test-busy-indicator').on('click', function () {
        Main.busy.show({
            el: document.body,
            defaultText : false,
            text:"Please waiting..."
        });
        
        
        window.setTimeout(function(){
            alert('hiding busy indicator');
            Main.busy.hide();
        }, 20000);
    });

    $('#test-fullscreen').on('click', function () {
        
        Main.fullscreen.show({
            html: '<div style="color: white;">This is full screen</div>',
            closeButton : true,
            effect:'fade'
        });
        
        window.setTimeout(function(){
            alert('hiding fullscreen');
            Main.fullscreen.hide();
        }, 20000);
        
        Main.fullscreen.show({
            html: '<div style="color: white;">This is a second full screen</div>',
            closeButton : true,
            effect:'fade'
        });
        
        Main.fullscreen.show({
            html: '<div style="color: white;">This is a third full screen</div>',
            closeButton : true,
            effect:'slidein'
        });
        
    });

    $('#game-select-chess').on('click', function () {

        Main.page.show({
            url: "game-home.html",
            effect: "slideleft",
            duration: 500,
            onBeforeShow: Main.controller.GameHome.onBeforeShow,
            data: {
                game: "chess"
            }
        });

    });

    $('#game-select-draft').on('click', function () {
        Main.page.show({
            url: "game-home.html",
            effect: "slideleft",
            duration: 500,
            onBeforeShow: Main.controller.GameHome.onBeforeShow,
            data: {
                game: "draft"
            }
        });
    });

    $('#game-select-ludo').on('click', function () {
        Main.page.show({
            url: "game-home.html",
            effect: "slideleft",
            duration: 500,
            onBeforeShow: Main.controller.GameHome.onBeforeShow,
            data: {
                game: "ludo"
            }
        });
    });

    $('#game-select-solitaire').on('click', function () {
        Main.page.show({
            url: "game-home.html",
            effect: "slideleft",
            duration: 500,
            onBeforeShow: Main.controller.GameHome.onBeforeShow,
            data: {
                game: "solitaire"
            }
        });
    });

    $('#game-select-whot').on('click', function () {
        Main.page.show({
            url: "game-home.html",
            effect: "slideleft",
            duration: 500,
            onBeforeShow: Main.controller.GameHome.onBeforeShow,
            data: {
                game: "whot"
            }
        });
    });

});