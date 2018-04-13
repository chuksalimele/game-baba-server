
/* global Main, Ns */


Ns.game.two.Chess2D = {

    chess: null,
    userSide: null, //whether 'b' or 'w'. ie black or white. default is null for watched game
    isBoardFlip: false, //whether black to white direction. default is white to black (false)
    squareList: {},
    hoverSquare: null,
    pickedSquare: null,
    boardRowCount: 8, //for chess it is fixed
    boardContainer: null,
    boardX: -1,
    boardY: -1,
    boardRow: -1,
    boardCol: -1,
    boardSq: -1,
    startTouchBoardX: -1,
    startTouchBoardY: -1,
    startTouchBoardRow: -1,
    startTouchBoardCol: -1,
    startTouchBoardSq: -1,
    isTouchingBoard: false,
    /**
     * Loads and sets up the game on the specified contaner using
     * the provided game position. If the game position is not provided
     * then the starting position is setup. The provided theme is used
     * if provided otherwise the default is used.<br>
     * 
     * The argument is expected to be an object with the following 
     * properties:<br>
     * <br>
     * obj = {<br>
     *        container: 'the_container', //compulsory <br>
     *        gamePosition: 'the_game_posiont', //optional<br>
     *        white: true, //whether the user is white or black. For watched games this field in absent<br>
     *        flip: true, //used in watched games only. whether the board should face black to white direction. ie black is below and white above<br>
     *        pieceTheme: 'the_piece_theme', //optional<br>
     *        boardTheme: 'the_board_theme'  //optional<br>
     * }<br>
     *
     * The chessboard squares are indexed as illustrated below:
     * 
     *   +----+----+----+----+----+----+----+----+
     * 8 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 |
     *   +----+----+----+----+----+----+----+----+
     * 7 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 |
     *   +----+----+----+----+----+----+----+----+
     * 6 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 |
     *   +----+----+----+----+----+----+----+----+
     * 5 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 |
     *   +----+----+----+----+----+----+----+----+
     * 4 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 |
     *   +----+----+----+----+----+----+----+----+
     * 3 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 |
     *   +----+----+----+----+----+----+----+----+
     * 2 |  8 |  9 | 10 | 11 | 12 | 13 | 14 | 15 |
     *   +----+----+----+----+----+----+----+----+
     * 1 |  0 |  1 |  2 |  3 |  4 |  5 |  6 |  7 |
     *   +----+----+----+----+----+----+----+----+
     *      a    b    c    d    e    f    g    h
     *      
     * @param {type} obj
     * @returns {undefined}
     */
    load: function (chess, obj, callback) {
        this.chess = chess;
        this.userSide = obj.white === true ? 'w' : (obj.white === false ? 'b' : null); //strictly true or false
        this.isBoardFlip = obj.flip;

        var el = document.getElementById(obj.container);
        Ns.game.two.Chess2D.boardContainer = el;
        el.innerHTML = '';//clear any previous
        var chessboad = this.board(el, obj.pieceTheme, obj.bordTheme);
        el.appendChild(chessboad);

        callback(this); // note for 3D which may be asynchronous this may not be call here but after the async proccess

    },

    board: function (container, piece_theme, board_theme) {
        var table = document.createElement('table');
        table.className = 'game9ja-chess-board';

        if (this.userSide) {//enable board listener only if the user is playing game
            if (Main.device.isMobileDeviceReady) {
                container.addEventListener('touchstart', this.onTouchStartBoard);
                container.addEventListener('touchmove', this.onHoverBoard);
                container.addEventListener('touchend', this.onHoverBoardEnd);
                container.addEventListener('touchcancel', this.onHoverBoardEnd);
            } else {
                container.addEventListener('click', this.onClickBoard);
                container.addEventListener('mousemove', this.onHoverBoard);
                container.addEventListener('mouseleave', this.onHoverBoardEnd);//mouseout behaviour is not appropriate because is fires for every children
            }
        }

        for (var i = 0; i < this.boardRowCount; i++) {
            var tr = document.createElement('tr');
            for (var k = 0; k < this.boardRowCount; k++) {
                var td = document.createElement('td');
                td.dataset.square = '';
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }


        var rw = table.children;
        var sq = -1;
        for (var i = rw.length - 1; i > -1; i--) {
            var sqs = rw[i].children;
            for (var k = 0; k < sqs.length; k++) {
                sq++;
                this.squareList[sq] = sqs[k];
            }
        }

        var box = container.getBoundingClientRect();

        var sq_w = box.width / this.boardRowCount;
        var sq_h = box.height / this.boardRowCount;

        var pw = sq_w * 0.8; // piece width
        var ph = sq_h * 0.8; //piece height

        //range pieces
        for (var i = 0; i < 64; i++) {
            var nsq = this.toSquareNotation(i);
            var pce = this.chess.get(nsq);
            if (!pce) {
                continue;
            }
            var sq = i;
            if (this.isBoardFlip) {
                sq = this.flipSquare(i);
            }

            //create piece element
            var pe = document.createElement('img');

            pe.src = '../resources/games/chess/2D/pieces/' + piece_theme + '/' + pce.color + pce.type + '.png';
            pe.style.width = pw + 'px';
            pe.style.height = ph + 'px';
            var center = this.squareCenter(sq);
            var py = center.y - ph / 2;
            var px = center.x - pw / 2;
            pe.style.position = 'absolute';
            pe.style.top = py + 'px';
            pe.style.left = px + 'px';

            container.appendChild(pe);

            console.log(pce);
        }

        return table;
    },
    toNumericSq: function (notation) {
        notation = notation + "";
        var a = notation.charAt(0);
        var b = notation.charAt(1);
        var b = (b - 1) * this.boardRowCount - 1;

        switch (a) {
            case 'a':
                a = 1;
                break;
            case 'b':
                a = 2;
                break;
            case 'c':
                a = 3;
                break;
            case 'd':
                a = 4;
                break;
            case 'e':
                a = 5;
                break;
            case 'f':
                a = 6;
                break;
            case 'g':
                a = 7;
                break;
            case 'h':
                a = 8;
                break;
        }

        return b + a;
    },
    toSquareNotation: function (sq) {

        var row = Math.floor(sq / this.boardRowCount);
        var col = sq % this.boardRowCount;
        row += 1;
        switch (col) {
            case 0:
                col = 'a';
                break;
            case 1:
                col = 'b';
                break;
            case 2:
                col = 'c';
                break;
            case 3:
                col = 'd';
                break;
            case 4:
                col = 'e';
                break;
            case 5:
                col = 'f';
                break;
            case 6:
                col = 'g';
                break;
            case 7:
                col = 'h';
                break;
        }

        return col + row;
    },
    getPieceOnSquare: function (sq) {

    },

    setPieceOnSquare: function (pieces, sq) {

    },

    movePiece: function (from_sq, to_sq) {
        if (this.isBoardFlip) {
            from_sq = this.flipSquare(from_sq);
            to_sq = this.flipSquare(to_sq);
        }

        var el = this.getPieceOnSquare(from_sq);
        if (!el) {
            console.warn('piece not found on sqare ', from_sq);
            return;
        }

        var duration = 1000; //in milliseconds
        var center = this.squareCenter(to_sq);
        var prop = {
            top: center.y,
            left: center.x
        };
        var me = this;
        Main.anim.to(el, duration, prop, function () {
            //making sure the piece is on the right spot just in
            //case the orientation changes or the board is resized
            center = me.squareCenter(to_sq);
            el.style.top = center.y + 'px';
            el.style.left = center.x + 'px';
        });
    },
    /**
     * The method is required if the board is flipped
     *  black-to-white direction.ie black is down and white up
     *  @argument {Integer} sq 
     */
    flipSquare: function (sq) {
        var row = Math.floor(sq / this.boardRowCount);
        var col = sq % this.boardRowCount;

        var flip_row = this.boardRowCount - row - 1;
        var flip_col = this.boardRowCount - col - 1;

        var flip_sq = flip_row * this.boardRowCount + flip_col;

        return flip_sq;
    },
    squareCenter: function (sq) {
        //NOTE: this code here may not be applicable to both
        //chess and draft - chess is being consider here.
        //it depends on the squares arrangement
        var box = this.boardContainer.getBoundingClientRect();
        var center_x, center_y;

        var sq_w = box.width / this.boardRowCount;
        var sq_h = box.height / this.boardRowCount;

        var row = Math.floor(sq / this.boardRowCount);
        var col = this.boardRowCount - sq % this.boardRowCount - 1;

        center_x = (this.boardRowCount - col) * sq_w - sq_w / 2;
        center_y = (this.boardRowCount - row) * sq_h - sq_h / 2;

        return {
            x: center_x,
            y: center_y
        };
    },
    highlightSquare: function (sqEl, style) {
        if (sqEl) {
            sqEl.style = style;
        }
    },
    onClickBoard: function (evt, is_tap) {
        var me = Ns.game.two.Chess2D;
        if (is_tap) {
            me.boardX = me.startTouchBoardX;
            me.boardY = me.startTouchBoardY;
            me.boardRow = me.startTouchBoardRow;
            me.boardCol = me.startTouchBoardCol;
            me.boardSq = me.startTouchBoardSq;
        } else {
            me.boardXY(this, evt, is_tap);
        }

        if (me.pickedSquare) {
            me.highlightSquare(me.pickedSquare, '');//remove the highlight
            me.pickedSquare = null;
            return;
        }

        var sq = me.boardSq;
        var sqn = me.toSquareNotation(sq);
        var pce = me.chess.get(sqn);
        if (pce && pce.color === me.userSide) {
            me.pickedSquare = me.squareList[sq];
            me.highlightSquare(me.pickedSquare, 'background: yellow');
        }
    },
    onTouchStartBoard: function (evt) {
        var me = Ns.game.two.Chess2D;
        if (evt.touches) {
            if (evt.touches.length === 1) {
                evt.preventDefault();//important!
                me.boardXY(this, evt, true);
            }
        }
    },
    onHoverBoard: function (evt) {
        var me = Ns.game.two.Chess2D;
        if (evt.touches) {
            if (evt.touches.length === 1) {
                evt.preventDefault();
                me.boardXY(this, evt);
                me.isTouchingBoard = true;
            }
        } else {
            //mouse move
            me.boardXY(this, evt);
        }
        //small problem still dey - come back later
        var sq = me.boardSq;
        if (me.squareList[sq] === me.pickedSquare) {
            if (me.hoverSquare !== me.pickedSquare) {
                me.highlightSquare(me.hoverSquare, '');//remove the highlight
            }
            return;
        }

        if (me.hoverSquare !== me.pickedSquare) {
            me.highlightSquare(me.hoverSquare, '');//remove the highlight
        }
        me.hoverSquare = me.squareList[sq];
        me.highlightSquare(me.hoverSquare, 'background: red');

    },

    onHoverBoardEnd: function (evt) {
        var me = Ns.game.two.Chess2D;
        if (evt.touches && !me.isTouchingBoard) {// tap detected
            me.onClickBoard(null, true);
            return;
        }
        me.boardX = -1;
        me.boardY = -1;
        me.isTouchingBoard = false;
        if (me.hoverSquare !== me.pickedSquare) {
            me.highlightSquare(me.hoverSquare, '');//remove the highlight
        }
    },
    boardXY: function (container, e, is_start_touch) {
        var me = Ns.game.two.Chess2D;
        var posx = 0;
        var posy = 0;

        if (!e)
            var e = window.event;
        if (e.touches && e.touches.length) {
            posx = e.touches[0].pageX;
            posy = e.touches[0].pageY;
        } else if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        } else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft
                    + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop
                    + document.documentElement.scrollTop;
        }
        // posx and posy contain the mouse position relative to the document

        var box = container.getBoundingClientRect();
        var x = posx - box.left;
        var y = posy - box.top;

        //row and col

        var sq_w = box.width / me.boardRowCount;
        var sq_h = box.height / me.boardRowCount;

        if (Main.device.isMobileDeviceReady
                && !Main.device.isLarge()) {//for only smart phones and tablets of medium size
            //Now make the y offset allow easy pick of piece especailly on small device
            if (y < box.height - sq_h / 2) {//above middle of first row
                y -= sq_h; // offset y by square height
            }
        }

        var row = Math.floor((box.height - y) / sq_h);
        var col = me.boardRowCount - Math.floor((box.width - x) / sq_w) - 1;

        if (row < 0
                || col < 0
                || row > me.boardRowCount - 1
                || col > me.boardRowCount - 1) {//OFF BOARD

            me.boardX = -1;
            me.boardY = -1;
            me.boardRow = -1;
            me.boardCol = -1;
            me.boardSq = -1;
            //Clear highlighted squares
            me.highlightSquare(me.hoverSquare, '');//remove the highlight
            me.hoverSquare = null;
            console.log('leave');
            return;
        }

        var sq = row * me.boardRowCount + col;

        if (is_start_touch) {
            me.startTouchBoardX = x;
            me.startTouchBoardY = y;
            me.startTouchBoardRow = row;
            me.startTouchBoardCol = col;
            me.startTouchBoardSq = sq;
        } else {
            me.boardX = x;
            me.boardY = y;
            me.boardRow = row;
            me.boardCol = col;
            me.boardSq = sq;
        }

        //console.log(posx, posy);
        //console.log(x, y);
        //console.log('x=', x, 'y=', y, 'row=', row, 'col=', col, 'sq=', sq);

    }
};