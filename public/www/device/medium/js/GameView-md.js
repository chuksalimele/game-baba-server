

/* global Main, Ns */


Ns.GameView = {

    LANDSCAPE_RHS_PANEL_WIDTH: '65%',
    PORTRAIT_RHS_PANEL_WIDTH: '75%',

    extend: 'Ns.ui.AbstractGameSection',

    constructor: function () {
        Main.event.on(Ns.Const.EVT_LAYOUT_GAME_PANEL, this.layoutView.bind(this));
    },

    getRightPanelWidth: function () {
        return window.screen.height > window.screen.width ? this.PORTRAIT_RHS_PANEL_WIDTH : this.LANDSCAPE_RHS_PANEL_WIDTH;
    },

    getRightPanelOffRight: function () {
        return '-100%';
    },

    getRightPanelPinnedID: function () {
        //return nothing
    },

    getRightPanelCloseID: function () {
        return 'game-view-right-panel-close';
    },

    getRightPanelHeaderID: function () {
        return 'game-view-right-panel-header';
    },

    getRightPanelBodyID: function () {
        return 'game-view-right-panel-body';
    },

    getRightPanelHeaderTitleID: function () {
        return 'game-view-right-panel-header-title';
    },

    getRightContentID: function () {
        return 'game-view-right-content';
    },

    getMainID: function () {
        return 'game-view-main';
    },

    getMainBoardID: function () {
        return 'game-view-main-board';
    },

    getMainUpperID: function () {
        return 'game-view-main-upper';
    },

    getMainLowerID: function () {
        return 'game-view-main-lower';
    },

    getBackButtonID: function () {
        return 'game-view-back-btn';
    },

    onClickBackButton: function () {
        Ns.GameHome.home();
    },

    onViewReady: function (data) {
        Ns.ui.GamePanel.ownGameView(data);
    },

};
