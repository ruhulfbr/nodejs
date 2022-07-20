class Flash{

    constructor(req){
        this.req = req
        this.error = this.extractFlashMsg('error')
        this.success = this.extractFlashMsg('success')
        this.hasMessage = this.hasMessage();
    }

    extractFlashMsg(name){
        let message = this.req.flash(name)
        return message.length > 0 ? message[0] : false;
    }

    hasMessage(){
        return  !this.error && !this.success ? false : true;
    }

    static getMessage(req){
        let flash = new Flash(req);
        
        return {
            success: flash.success, 
            error: flash.error,
            hasMessage: !flash.error && !flash.success ? false : true
        } 
    }
}

module.exports = Flash