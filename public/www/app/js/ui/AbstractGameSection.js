
/* global Ns, Main */

Ns.ui.AbstractGameSection = {

    rightPanelTitleComp: null,
    rightPanelHTML: null,
    isLayoutViewListener: false,
    isRigthPanelPinned: false,

    afterRightContentHide: function () {

        if (this.rightPanelTitleComp) {
            this.rightPanelTitleComp.innerHTML = '';
            Ns.ui.GamePanel.rightContentName = '';
        }
    },

    getRightPanelWidth: function () {
        throw Error('Abstract method expected to be implemented by subclass.');
    },

    getRightPanelOffRight: function () {
        throw Error('Abstract method expected to be implemented by subclass.');
    },

    getRightPanelPinnedID: function () {
        throw Error('Abstract method expected to be implemented by subclass.');
    },

    getRightPanelCloseID: function () {
        throw Error('Abstract method expected to be implemented by subclass.');
    },

    getRightPanelHeaderID: function () {
        throw Error('Abstract method expected to be implemented by subclass.');
    },

    getRightPanelBodyID: function () {
        throw Error('Abstract method expected to be implemented by subclass.');
    },

    getRightPanelHeaderTitleID: function () {
        throw Error('Abstract method expected to be implemented by subclass.');
    },

    getRightContentID: function () {
        throw Error('Abstract method expected to be implemented by subclass.');
    },

    getMainID: function () {
        throw Error('Abstract method expected to be implemented by subclass.');
    },

    getMainBoardID: function () {
        throw Error('Abstract method expected to be implemented by subclass.');
    },

    getMainUpperID: function () {
        throw Error('Abstract method expected to be implemented by subclass.');
    },

    getMainLowerID: function () {
        throw Error('Abstract method expected to be implemented by subclass.');
    },

    onViewReady: function () {
        throw Error('Abstract method expected to be implemented by subclass.');
    },

    getBackButtonID: function () {
        throw Error('Abstract method expected to be implemented by subclass.');
    },

    onClickBackButton: function () {
        throw Error('Abstract method expected to be implemented by subclass.');
    },

    unpinRightContent: function () {
        var main_panel = document.getElementById(this.getMainID());
        main_panel.style.width = '100%';
        if (this.isRigthPanelPinned) {
            this.layoutView();
        }
        this.isRigthPanelPinned = false;
    },

    togglePinRightContent: function () {
        if (this.isRigthPanelPinned) {
            return this.unpinRightContent();
        }
        var main_panel = document.getElementById(this.getMainID());
        var rp_w = this.getRightPanelWidth();
        if (!rp_w.endsWith('%')) {
            console.error('invalid width properties of element of id "' + this.getMainID() + '" - expected percent width property e.g 40%');
            return;
        }

        var rp_w = rp_w.substring(0, rp_w.length - 1);

        main_panel.style.width = (100 - rp_w) + '%';

        this.layoutView();

        this.isRigthPanelPinned = true;
    },

    showRightContent: function (data, title, func) {

        var me = this;

        $('#' + this.getRightPanelCloseID()).off('click');
        $('#' + this.getRightPanelCloseID()).on('click', function () {
            me.hideRightContent();
        });

        if (this.getRightPanelPinnedID()) {
            $('#' + this.getRightPanelPinnedID()).off('click');
            $('#' + this.getRightPanelPinnedID()).on('click', function () {
                me.togglePinRightContent();
            });
        }
        Main.card.back(me.getRightPanelHeaderID());//clear any card on the header

        document.getElementById(me.getRightPanelBodyID()).innerHTML = '';

        Ns.GameViewB.rightPanelHTML = document.getElementById(me.getRightContentID()).outerHTML;

        me.rightPanelTitleComp = document.getElementById(me.getRightPanelHeaderTitleID());
        me.rightPanelTitleComp.innerHTML = title;

        var el = document.getElementById(me.getRightContentID());
        //var is_visible = $(el).is(':visible');

        el.style.display = 'block';//make visible

        func();

        if (el.style.right !== '0%' || el.style.right === '') {//not showing

            el.style.width = this.getRightPanelWidth();//we set this width programatically here
            el.style.right = '-' + this.getRightPanelWidth();//set to negative of the width we have in css file or the width we set programatically here
            //animate the element to right of 0%
            Main.anim.to(me.getRightContentID(), 500, {right: '0%'});
        }

    },

    hideRightContent: function () {
        var me = this;

        var el = document.getElementById(me.getRightContentID());
        var negative_width = this.getRightPanelOffRight();//set to negative of the width we have in css file or the width we set programatically here

        if (el.style.right === '0%') {
            me.unpinRightContent();
            el.style.display = 'block';//ensure visible        
            Main.anim.to(me.getRightContentID(), 500, {right: negative_width}, me.afterRightContentHide.bind(me));
        }
    },

    layoutView: function (data) {
        var match = data;
        if (!data) {
            var gameObj = Ns.Util.getGameObject(Ns.ui.UI.selectedGame);
            if (!gameObj.config) {
                return;
            }
            match = gameObj.config.match;
        }
        var board_el = document.getElementById(this.getMainBoardID());
        var upper_el = document.getElementById(this.getMainUpperID());
        var lower_el = document.getElementById(this.getMainLowerID());

        if (!board_el || !upper_el || !lower_el) {
            return;
        }
        //panel_main.style = 'background-color: brown;';

        var topBottomHeight = 50;

        upper_el.style = 'position: absolute; top: 0; left: 0; right: 0; height: ' + topBottomHeight + 'px';
        board_el.style = 'position: absolute; top: ' + topBottomHeight + 'px; bottom: ' + topBottomHeight + 'px; left: 0; right: 0;';
        lower_el.style = 'position: absolute; bottom: 0; left: 0; right: 0;  height: ' + topBottomHeight + 'px;';

        var padding = 10;

        var bound = board_el.getBoundingClientRect();

        var size = bound.width < bound.height ? bound.width : bound.height;
        var biggerSize = bound.width > bound.height ? bound.width : bound.height;

        var diffSize = biggerSize - size;
        var extraPadding = diffSize / 2;
        var extraVerticalPadding = 0;
        var extraHorizontalPadding = 0;

        if (bound.height > bound.width) {
            extraVerticalPadding = extraPadding;
        } else {
            extraHorizontalPadding = extraPadding;
        }

        size -= padding;

        board_el.style.top = (topBottomHeight + padding + extraVerticalPadding) + 'px';
        board_el.style.bottom = (topBottomHeight + padding + extraVerticalPadding) + 'px';
        board_el.style.left = (padding + extraHorizontalPadding) + 'px';
        board_el.style.right = (padding + extraHorizontalPadding) + 'px';

        console.log(board_el.getBoundingClientRect());

        Ns.ui.GamePanel.showGame(match, this.getMainBoardID());
        //resize right panel

        var right_panel = document.getElementById(this.getRightContentID());
        right_panel.style.width = this.getRightPanelWidth();

    },

    Content: function (data) {
        var me = this;
        if (!this.isLayoutViewListenerAdded) {
            //Do not use orientationchange - does not work properly because it fires too quickly before Dom elements are resized, i believe!
            Main.dom.addListener(window, 'resize', function (evt) {
                me.layoutView.call(me);
            });
            this.isLayoutViewListenerAdded = true;
        }

        Ns.ui.GamePanel.rightContentName = '';

        this.layoutView(data);

        this.onViewReady(data);

        $('#' + this.getBackButtonID()).off('click');
        $('#' + this.getBackButtonID()).on('click', function () {
            me.onClickBackButton.call(me);
        });

    }

};