
/* global Ns, Main */

Ns.Options = {

    THEME_SAVE_KEY: '_THEME_SAVE_KEY',

    DEFAULT_CHESS_PIECE_2D: 'alpha',
    DEFAULT_CHESS_PIECE_3D: '', //TODO
    DEFAULT_CHESS_BOARD_TOP: 'woodlight',
    DEFAULT_CHESS_BOARD_FRAME: 'wood_base_1',
    DEFAULT_CHESS_BOARD_FLOOR: 'wood_base_1',

    DEFAULT_DRAUGHTS_PIECE_2D: '', //TODO
    DEFAULT_DRAUGHTS_PIECE_3D: '', //TODO
    DEFAULT_DRAUGHTS_BOARD_TOP: '', //TODO
    DEFAULT_DRAUGHTS_BOARD_FRAME: '', //TODO
    DEFAULT_DRAUGHTS_BOARD_FLOOR: '', //TODO

    DEFAULT_LIGHT_INTENSITY: 50,//in percent
    DEFAUTLT_IS_SOUND: true,

    chessPiece2d: null,
    chessPiece3d: null,
    chessBoardTop: null,
    chessBoardFrame: null,
    chessBoardFloor: null,

    draughtsPiece2d: null,
    draughtsPiece3d: null,
    draughtsBoardTop: null,
    draughtsBoardFrame: null,
    draughtsBoardFloor: null,

    lightIntensity: null,
    isSound: null,

    constructor: function () {

        this.chessPiece2d = this._localGetOption('chessPiece2d');
        if (this.chessPiece2d === null) {
            this.chessPiece2d = this.DEFAULT_CHESS_PIECE_2D;
        }

        this.chessPiece3d = this._localGetOption('chessPiece3d');
        if (this.chessPiece3d === null) {
            this.chessPiece3d = this.DEFAULT_CHESS_PIECE_3D;
        }

        this.chessBoardTop = this._localGetOption('chessBoardTop');
        if (this.chessBoardTop === null) {
            this.chessBoardTop = this.DEFAULT_CHESS_BOARD_TOP;
        }

        this.chessBoardFrame = this._localGetOption('chessBoardFrame');
        if (this.chessBoardFrame === null) {
            this.chessBoardFrame = this.DEFAULT_CHESS_BOARD_FRAME;
        }

        this.chessBoardFloor = this._localGetOption('chessBoardFloor');
        if (this.chessBoardFloor === null) {
            this.chessBoardFloor = this.DEFAULT_CHESS_BOARD_FLOOR;
        }

        this.draughtsPiece2d = this._localGetOption('draughtsPiece2d');
        if (this.draughtsPiece2d === null) {
            this.draughtsPiece2d = this.DEFAULT_DRAUGHTS_PIECE_2D;
        }

        this.draughtsPiece3d = this._localGetOption('draughtsPiece3d');
        if (this.draughtsPiece3d === null) {
            this.draughtsPiece3d = this.DEFAULT_DRAUGHTS_PIECE_3D;
        }

        this.draughtsBoardTop = this._localGetOption('draughtsBoardTop');
        if (this.draughtsBoardTop === null) {
            this.draughtsBoardTop = this.DEFAULT_DRAUGHTS_BOARD_TOP;
        }

        this.draughtsBoardFrame = this._localGetOption('draughtsBoardFrame');
        if (this.draughtsBoardFrame === null) {
            this.draughtsBoardFrame = this.DEFAULT_DRAUGHTS_BOARD_FRAME;
        }

        this.draughtsBoardFloor = this._localGetOption('draughtsBoardFloor');
        if (this.draughtsBoardFloor === null) {
            this.draughtsBoardFloor = this.DEFAULT_DRAUGHTS_BOARD_FLOOR;
        }


        this.isSound = this._localGetOption('isSound');
        if (this.isSound === null) {
            this.isSound = this.DEFAUTLT_IS_SOUND;
        }

        this.lightIntensity = this._localGetOption('lightIntensity');
        if (this.lightIntensity === null) {
            this.lightIntensity = this.DEFAULT_LIGHT_INTENSITY;
        }

    },

    content: function (match, id_obj) {

        var me = this;
        Main.tpl.template({
            tplUrl: 'game-view-options.html',
            data: match.wdl,
            onReplace: function (tpl_var, wdl) {


            },
            afterReplace: function (el, data) {
                document.getElementById(id_obj.view_body_id).innerHTML = el.outerHTML;

                $(document.body).find('div[data-game]').each(function () {
                    if (this.dataset.game !== Ns.ui.UI.selectedGame) {
                        $(this).hide();
                    }
                });

                var o = me._els();
                me._setOptions(o);

                //for chess
                Main.click(o.el_chess_piece_2d, data, me._onClickChessPiece2d.bind(me));
                Main.click(o.el_chess_piece_3d, data, me._onClickChessPiece3d.bind(me));
                Main.click(o.el_chess_board_top, data, me._onClickChessBoardTop.bind(me));
                Main.click(o.el_chess_board_frame, data, me._onClickChessBoardFrame.bind(me));
                Main.click(o.el_chess_board_floor, data, me._onClickChessBoardFloor.bind(me));

                //for draughts
                Main.click(o.el_draughts_piece_2d, data, me._onClickDraughtsPiece2d.bind(me));
                Main.click(o.el_draughts_piece_3d, data, me._onClickDraughtsPiece3d.bind(me));
                Main.click(o.el_draughts_board_top, data, me._onClickDraughtsBoardTop.bind(me));
                Main.click(o.el_draughts_board_frame, data, me._onClickDraughtsBoardFrame.bind(me));
                Main.click(o.el_draughts_board_floor, data, me._onClickDraughtsBoardFloor.bind(me));

                Main.click(o.el_light, data, me._onClickLight.bind(me));
                Main.click(o.el_sound, data, me._onClickSound.bind(me));

                var el_reset = document.getElementById('game_view_option_reset');
                Main.click(el_reset, data, me._onClickReset.bind(me));

            }
        });
    },

    _localSaveOption: function (prefix, opt) {
        window.localStorage.setItem(prefix + this.THEME_SAVE_KEY, opt);
    },

    _localGetOption: function (prefix) {
        try {
            var opt = window.localStorage.getItem(prefix + this.THEME_SAVE_KEY);
            if (opt === null) {//yes
                return null;
            }
        } catch (e) {
            console.log(e);
        }

        if (opt === 'false') {
            opt = false;
        } else
        if (opt === 'true') {
            opt = true;
        } else if (opt !== true || opt !== false) {//except true or false
            var num = opt - 0;//implicitly convert to numeric
            if (!isNaN(num)) {//is a number
                opt = num;
            }
        }
        return opt;
    },

    _preSelectHoziListItemTheme: function (theme, container) {
        if (!theme || !container) {
            return;
        }

        var children = container.children;
        for (var i = 0; i < children.length; i++) {
            if (children[i].dataset.name === theme) {
                children[i].className = 'game-view-options-item-select';
            } else {
                children[i].className = 'game-view-options-item';
            }
        }

    },

    _selectHoziListItemTheme: function (evt, data) {
        var target = evt.target;
        if (target.tagName.toLowerCase() !== 'img') {
            return;
        }
        var children = target.parentNode.children;
        target.className = 'game-view-options-item-select';
        for (var i = 0; i < children.length; i++) {
            if (children[i] === target) {
                continue;
            }
            children[i].className = 'game-view-options-item';
        }

        return target.dataset.name;
    },

    _onClickChessPiece2d: function (evt, data) {
        var theme = this._selectHoziListItemTheme(evt, data);
        if (!theme) {
            return;
        }

        this.chessPiece2d = theme;

        this._localSaveOption('chessPiece2d', theme);
    },

    _onClickDraughtsPiece2d: function (evt, data) {
        var theme = this._selectHoziListItemTheme(evt, data);
        if (!theme) {
            return;
        }

        this.draughtsPiece2d = theme;

        this._localSaveOption('draughtsPiece2d', theme);
    },

    _onClickChessPiece3d: function (evt, data) {
        var theme = this._selectHoziListItemTheme(evt, data);
        if (!theme) {
            return;
        }

        this.chessPiece3d = theme;

        this._localSaveOption('chessPiece3d', theme);

    },

    _onClickDraughtsPiece3d: function (evt, data) {
        var theme = this._selectHoziListItemTheme(evt, data);
        if (!theme) {
            return;
        }

        this.draughtsPiece3d = theme;

        this._localSaveOption('draughtsPiece3d', theme);
    },

    _onClickChessBoardTop: function (evt, data) {
        var theme = this._selectHoziListItemTheme(evt, data);
        if (!theme) {
            return;
        }

        this.chessBoardTop = theme;

        this._localSaveOption('chessBoardTop', theme);

    },

    _onClickDraughtsBoardTop: function (evt, data) {
        var theme = this._selectHoziListItemTheme(evt, data);
        if (!theme) {
            return;
        }

        this.draughtsBoardTop = theme;

        this._localSaveOption('draughtsBoardTop', theme);
    },

    _onClickChessBoardFrame: function (evt, data) {
        var theme = this._selectHoziListItemTheme(evt, data);
        if (!theme) {
            return;
        }

        this.chessBoardFrame = theme;

        this._localSaveOption('chessBoardFrame', theme);

    },

    _onClickDraughtsBoardFrame: function (evt, data) {
        var theme = this._selectHoziListItemTheme(evt, data);
        if (!theme) {
            return;
        }

        this.draughtsBoardFrame = theme;

        this._localSaveOption('draughtsBoardFrame', theme);

    },

    _onClickChessBoardFloor: function (evt, data) {
        var theme = this._selectHoziListItemTheme(evt, data);
        if (!theme) {
            return;
        }

        this.chessBoardFloor = theme;

        this._localSaveOption('chessBoardFloor', theme);

    },

    _onClickDraughtsBoardFloor: function (evt, data) {
        var theme = this._selectHoziListItemTheme(evt, data);
        if (!theme) {
            return;
        }

        this.draughtsBoardFloor = theme;

        this._localSaveOption('draughtsBoardFloor', theme);

    },

    _onClickLight: function (evt, data) {

    },

    _onClickSound: function (evt, data) {
        var check_btn = evt.target;
        this._localSaveOption('isSound', check_btn.checked);
    },

    _els: function () {

        var obj = {};
        //for chess
        obj.el_chess_piece_2d = document.querySelector('div[data-chess-piece="2d"]');
        obj.el_chess_piece_3d = document.querySelector('div[data-chess-piece="3d"]');
        obj.el_chess_board_top = document.querySelector('div[data-chess-board="top"]');
        obj.el_chess_board_frame = document.querySelector('div[data-chess-board="frame"]');
        obj.el_chess_board_floor = document.querySelector('div[data-chess-board="floor"]');

        //for draughts
        obj.el_draughts_piece_2d = document.querySelector('div[data-draughts-piece="2d"]');
        obj.el_draughts_piece_3d = document.querySelector('div[data-draughts-piece="3d"]');
        obj.el_draughts_board_top = document.querySelector('div[data-draughts-board="top"]');
        obj.el_draughts_board_frame = document.querySelector('div[data-draughts-board="frame"]');
        obj.el_draughts_board_floor = document.querySelector('div[data-draughts-board="floor"]');

        obj.el_light = document.querySelector('div[data-light="intensity"]');
        obj.el_sound = document.getElementById('game_view_option_checkbox_slide_id');

        return obj;
    },

    _onClickReset: function (evt, data) {
        var o = this._els();
        this._setOptions(o, true);
    },

    _setOptions: function (o, reset) {
        
        if (reset) {
            this.chessPiece2d = this.DEFAULT_CHESS_PIECE_2D;
            this.chessPiece3d = this.DEFAULT_CHESS_PIECE_3D;
            this.chessBoardTop = this.DEFAULT_CHESS_BOARD_TOP;
            this.chessBoardFrame = this.DEFAULT_CHESS_BOARD_FRAME;
            this.chessBoardFloor = this.DEFAULT_CHESS_BOARD_FLOOR;

            this.draughtsPiece2d = this.DEFAULT_DRAUGHTS_PIECE_2D;
            this.draughtsPiece3d = this.DEFAULT_DRAUGHTS_PIECE_3D;
            this.draughtsBoardTop = this.DEFAULT_DRAUGHTS_BOARD_TOP;
            this.draughtsBoardFrame = this.DEFAULT_DRAUGHTS_BOARD_FRAME;
            this.draughtsBoardFloor = this.DEFAULT_DRAUGHTS_BOARD_FLOOR;
            
            this.isSound = this.DEFAUTLT_IS_SOUND;
            this.lightIntensity = this.DEFAULT_LIGHT_INTENSITY;
        }

        //for chess
        this._preSelectHoziListItemTheme(this.chessPiece2d, o.el_chess_piece_2d);
        this._preSelectHoziListItemTheme(this.chessPiece3d, o.el_chess_piece_3d);
        this._preSelectHoziListItemTheme(this.chessBoardTop, o.el_chess_board_top);
        this._preSelectHoziListItemTheme(this.chessBoardFrame, o.el_chess_board_frame);
        this._preSelectHoziListItemTheme(this.chessBoardFloor, o.el_chess_board_floor);

        //for draughts
        this._preSelectHoziListItemTheme(this.draughtsPiece2d, o.el_draughts_piece_2d);
        this._preSelectHoziListItemTheme(this.draughtsPiece3d, o.el_draughts_piece_3d);
        this._preSelectHoziListItemTheme(this.draughtsBoardTop, o.el_draughts_board_top);
        this._preSelectHoziListItemTheme(this.draughtsBoardFrame, o.el_draughts_board_frame);
        this._preSelectHoziListItemTheme(this.draughtsBoardFloor, o.el_draughts_board_floor);


        //TODO - preselect light intensity

        //preselect sound
        o.el_sound.checked = this.isSound;
        
        if(reset){
            this._localSaveOption('chessPiece2d', this.chessPiece2d);
            this._localSaveOption('chessPiece3d', this.chessPiece3d);
            this._localSaveOption('chessBoardTop', this.chessBoardTop);
            this._localSaveOption('chessBoardFrame', this.chessBoardFrame);
            this._localSaveOption('chessBoardFloor', this.chessBoardFloor);
            
            this._localSaveOption('draughtsPiece2d', this.draughtsPiece2d);
            this._localSaveOption('draughtsPiece3d', this.draughtsPiece3d);
            this._localSaveOption('draughtsBoardTop', this.draughtsBoardTop);
            this._localSaveOption('draughtsBoardFrame', this.draughtsBoardFrame);
            this._localSaveOption('draughtsBoardFloor', this.draughtsBoardFloor);
            
            this._localSaveOption('isSound', this.isSound);
            this._localSaveOption('lightIntensity', this.lightIntensity);            
        }
        
    },

    get2DChessPieceThemeUrl: function (pce) {
        return "../resources/games/chess/2D/pieces/" + this.chessPiece2d + "/" + pce.color + pce.type + ".png";
    },

    get2DDraughtsPieceThemeUrl: function (pce) {//TODO
        return;
    },

    get3DChessPieceThemeUrl: function () {
        //TODO
    },

    get3DDraughtsPieceThemeUrl: function (pce) {//TODO
        return;
    },

    getChessBoardThemeUrl: function () {
        return "../resources/games/chess/board/themes/" + this.chessBoardTop + "/60.png";
    },

    getDraughtsBoardThemeUrl: function (inverted_board) {
        return "../resources/games/draughts/board/themes/" + this.draughtsBoardTop + "/60" + (inverted_board ? "-inverse" : "") + ".png";
    },

    getChessBoardFrameThemeUrl: function () {
        return "../resources/images/" + this.chessBoardFrame + ".jpg";
    },

    getDrauhtsBoardFrameThemeUrl: function () {
        return "../resources/images/" + this.draughtsBoardFrame + ".jpg";
    },

    getChessBoardFloorThemeUrl: function () {
        return "../resources/images/" + this.chessBoardFloor + ".jpg";
    },

    getDraughtsBoardFloorThemeUrl: function () {
        return "../resources/images/" + this.druahtsBoardFloor + ".jpg";
    },

    isSoundAllow: function () {
        return this.isSound;
    },

    getLightIntensity: function () {

    },

};


