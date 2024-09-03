class RequestFailureSimulator {
    constructor(){
        this.failureCount =0 ;
    }
    async findMany() {
        if (this.failureCount < 3){
            this.failureCount ++ ;
            throw new Error("Simulate Error")
        }
        return []
    }
}
module.exports = RequestFailureSimulator