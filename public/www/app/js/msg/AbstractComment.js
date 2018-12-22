/* global Ns, Main */

Ns.msg.AbstractComment = {

    extend: 'Ns.msg.AbstractMessage',
 
    /**
     * must override this method and return the promise of the rcall<br>
     * @param {type} comments
     * @returns {undefined}
     */
    rcallDeleteMessages: function(comments){    
        var msg_ids = [];
        for(var i=0; i<comments.length; i++){
            msg_ids.push(comments[i].msg_id);
        }
        var user_id = Ns.view.UserProfile.appUser.user_id;
        return Main.ro.comment.deleteFor(user_id, msg_ids);
    },
    getMsgType: function () {
        return 'comment';
    },

    getMsgSelectionClassName: function () {
        return 'game9ja-comment-selected';
    },

    getMsgSentClassName: function () {
        return 'game9ja-comment-item';//same as received
    },

    getMsgReceivedClassName: function () {
        return 'game9ja-comment-item';//same as sent
    },

    getNotSentIndicatorClassName: function () {
        return 'comment-not-sent';
    },

    getSentIndicatorClassName: function () {
        return 'comment-sent';
    },

    getDeliveredIndicatorClassName: function () {
        return '';
    },

    getSeenIndicatorClassName: function () {
        return '';
    },

    getMsgBodySelector: function () {
        return 'div[data-comment="body"]';
    },

    getMsgInputSelector: function () {
        return 'textarea[data-comment="input-msg"]';
    },

    getMsgSendBottonSelector: function () {
        return 'i[data-comment="send"]';
    },

    getMsgEmojisBottonSelector: function () {
        return 'div[data-comment="emoji"]';
    },

    getMsgStatusIndicatorSelector: function () {
        return 'span[data-comment-sent="indicator"]';
    },
    
    getMsgSentTimeSelector: function () {
        return 'div[data-comment-item="time"]';
    },    

    getMsgReceivedTimeSelector: function () {
        return 'div[data-comment-item="time"]';
    },    
    
    getMainTpl: function(){
      return 'commnet-tpl.html';  
    },

    getMsgReceivedTpl: function () {
        return 'comment-item-tpl.html';//same as sent tpl
    },

    getMsgSentTpl: function () {
        return 'comment-item-tpl.html';//same as received tpl
    },

    getResponseMsgs: function (response) {
        return response.comments;
    },
    /**
     * @param {type} tpl_var
     * @param {type} data
     * @returns {undefined}
     */
    onPrepareSentMsgTpl: function (tpl_var, data) {
    },

    /**
     * @param {type} el_item_added
     * @param {type} data
     * @returns {undefined}
     */
    onFinishPrepareSentMsgTpl: function (el_item_added, data) {
    },

    /**
     * @param {type} tpl_var
     * @param {type} data
     * @returns {undefined}
     */
    onPrepareReceivedMsgTpl: function (tpl_var, data) {
    },

    /**
     * @param {type} el_item_added
     * @param {type} data
     * @returns {undefined}
     */
    onFinishPrepareReceivedMsgTpl: function (el_item_added, data) {
        
    },

    createCommentListeners: function (el) {

        var btn_reply = $(el).find(this.getMsgSendBottonSelector())[0];
        var btn_like = $(el).find(this.getMsgInputSelector())[0];
        var btn_dislike = $(el).find(this.getMsgEmojisBottonSelector())[0];
        //var sent_indicator = $(html).find('')[0];

        
        Main.click(btn_reply, {}, this.replyComment);
        Main.click(btn_like, {}, this.likeComment);
        Main.click(btn_dislike, {}, this.dislikeComment);
    }

};