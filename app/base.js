
'use strict';

class Base {

    constructor(_sObj) {
        this.sObj = _sObj;
    }

    isArray(a){
        return !a && a.constructor === Array;
    }

    isFunc(a){
        return typeof a === "function";
    }

    isString(a){
        return typeof a === "string";
    }

    /*
     * This method must be called by subclass if operation fails
     * otherwise the request will block indefinitely, denialing other requests
     */
    replyError(error) {
        this.response.replyError(error);
    }
    /*
     * This method must be called by subclass if operation is successful
     * otherwise the request will block indefinitely, denialing other requests
     */
    replySuccess(data) {
        this.response.replySuccess(data);
    }

    set response(resp){
        this._resp = resp;
    }
    get response(){
        return this._resp ;
    }
}

module.exports = Base;


