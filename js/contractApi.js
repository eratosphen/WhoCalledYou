const CONTRACT_ADDRESS = "n1wf9LQ6BuhT8NvSEss9kDzkBa2QJFxYmHX"; //e5a4ce5ba9e5ada887f055ed4fe8d1b9fc964623a2d716ac7d700f7a9240ad1e

class SmartContractApi {
    constructor(contractAdress) {
        let NebPay = require("nebpay");
        this.nebPay = new NebPay();
        this._contractAdress = contractAdress || CONTRACT_ADDRESS;
    }

    getContractAddress() {
        return this.contractAdress;
    }

    _simulateCall({ value = "0", callArgs = "[]", callFunction, callback }) {
        this.nebPay.simulateCall(this._contractAdress, value, callFunction, callArgs, {
            callback: function (resp) {
                if (callback) {
                    callback(resp);
                }
            }
        });
    }

    _call({ value = "0", callArgs = "[]", callFunction, callback }) {
        this.nebPay.call(this._contractAdress, value, callFunction, callArgs, {
            callback: function (resp) {
                if (callback) {
                    callback(resp);
                }
            }
        });
    }
}

class PhoneContract extends SmartContractApi {
    addComment(phone, message, cb) {
        this._call({
            callArgs: `["${phone}", "${message}"]`,
            callFunction: "addComment",
            callback: cb
        });
    }

    getComments(phone, cb) {
        this._simulateCall({
            callArgs: `["${phone}"]`,
            callFunction: "getComments",
            callback: cb
        });;
    }

    totalComments(cb) {
        this._simulateCall({
            callFunction: "totalComments",
            callback: cb
        });;
    }

    totalPhones(cb) {
        this._simulateCall({
            callFunction: "totalPhones",
            callback: cb
        });;
    }
}
