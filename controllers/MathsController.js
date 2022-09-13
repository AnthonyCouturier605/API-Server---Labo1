const path = require('path');
const fs = require('fs');
module.exports =
    class MathsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext);
        }
        verifyXandYPresence(){
            if(!this.HttpContext.path.params.x){
                this.HttpContext.path.params.error = "parameter 'x' is missing";
                this.HttpContext.response.JSON(this.HttpContext.path.params);
                return false;
            }
            else if(!this.HttpContext.path.params.y){
                this.HttpContext.path.params.error = "parameter 'y' is missing";
                this.HttpContext.response.JSON(this.HttpContext.path.params);
                return false;
            }
            return true;
        }
        verifyNPresence(){
            if(!this.HttpContext.path.params.n){
                this.HttpContext.path.params.error = "parameter 'n' is missing";
                this.HttpContext.response.JSON(this.HttpContext.path.params);
                return false;
            }
            return true;
        }
        verifyNumberOfParameters(number){
            if(Object.keys(this.HttpContext.path.params).length == number){
                return true;
            }
            this.HttpContext.path.params.error = `number of parameters invalid`;
            this.HttpContext.response.JSON(this.HttpContext.path.params);
            return false;
            
        }
        sendErrorIfNaN(value){
            if(isNaN(value)){
                this.HttpContext.path.params.error = `'${value}' is not a number`;
                this.HttpContext.response.JSON(this.HttpContext.path.params);
                return true;
            }
            return false;
        }
        sendErrorIfNotInteger(value){
            if(!Number.isInteger(parseFloat(value))){
                this.HttpContext.path.params.error = `'${value}' is not an integer`;
                this.HttpContext.response.JSON(this.HttpContext.path.params);
                return true;
            }
            return false;
        }
        static factorial(n){
            if(n===0||n===1){
              return 1;
            }
            return n*MathsController.factorial(n-1);
        }
        static isPrime(value) {
            for(var i = 2; i < value; i++) {
                if(value % i === 0) {
                    return false;
                }
            }
            return value > 1;
        }
        static findPrime(n){
            let primeNumer = 0;
            for ( let i=0; i < n; i++){
                primeNumer++;
                while (!MathsController.isPrime(primeNumer)){
                    primeNumer++;
                }
            }
            return primeNumer;
        }
        
        get() {
            if(this.HttpContext.path.queryString == '?'){
                //send help page
                let helpPagePath = path.join(process.cwd(),"wwwroot/helpPages/mathsServiceHelp.html");
                let content = fs.readFileSync(helpPagePath);
                this.HttpContext.response.content('text/html', content);
            }else{
                if(this.HttpContext.path.params.op){
                    switch(this.HttpContext.path.params.op){
                        case '+':
                        case ' ':
                            this.HttpContext.path.params.op = '+';

                            if(this.verifyXandYPresence() && this.verifyNumberOfParameters(3)){
                                if(!this.sendErrorIfNaN(this.HttpContext.path.params.x) && !this.sendErrorIfNaN(this.HttpContext.path.params.y)){
                                    this.HttpContext.path.params.value = parseInt(this.HttpContext.path.params.x) + parseInt(this.HttpContext.path.params.y);
                                    this.HttpContext.response.JSON(this.HttpContext.path.params); 
                                }
                            }
                            break;
                        case '-':
                            if(this.verifyXandYPresence() && this.verifyNumberOfParameters(3)){
                                if(!this.sendErrorIfNaN(this.HttpContext.path.params.x) && !this.sendErrorIfNaN(this.HttpContext.path.params.y)){
                                    this.HttpContext.path.params.value = parseInt(this.HttpContext.path.params.x) - parseInt(this.HttpContext.path.params.y);
                                    this.HttpContext.response.JSON(this.HttpContext.path.params); 
                                }
                            }
                            break;
                        case '*':
                            if(this.verifyXandYPresence() && this.verifyNumberOfParameters(3)){
                                if(!this.sendErrorIfNaN(this.HttpContext.path.params.x) && !this.sendErrorIfNaN(this.HttpContext.path.params.y)){
                                    this.HttpContext.path.params.value = parseInt(this.HttpContext.path.params.x) * parseInt(this.HttpContext.path.params.y);
                                    this.HttpContext.response.JSON(this.HttpContext.path.params); 
                                }
                            }
                            break;
                        case '/':
                            //DIVISION PAR 0
                            if(this.verifyXandYPresence() && this.verifyNumberOfParameters(3)){
                                if(!this.sendErrorIfNaN(this.HttpContext.path.params.x) && !this.sendErrorIfNaN(this.HttpContext.path.params.y)){
                                    // if(this.HttpContext.path.params.y == ){
                                    //     this.HttpContext.path.params.error = "Cannot divide by zero";
                                    //     //this.HttpContext.path.params.value = "NaN";
                                    //     this.HttpContext.response.JSON(this.HttpContext.path.params);
                                    // }
                                    //else{
                                        let result = parseInt(this.HttpContext.path.params.x) / parseInt(this.HttpContext.path.params.y);

                                        if(result == Infinity) result = "Infinity";
                                        if(isNaN(result)) result = "NaN";

                                        this.HttpContext.path.params.value = result;
                                        this.HttpContext.response.JSON(this.HttpContext.path.params); 
                                    //}
                                }
                            }
                            break;
                        case '%':
                            if(this.verifyXandYPresence() && this.verifyNumberOfParameters(3)){
                                if(!this.sendErrorIfNaN(this.HttpContext.path.params.x) && !this.sendErrorIfNaN(this.HttpContext.path.params.y)){
                                    // if(this.HttpContext.path.params.y == 0){
                                    //     this.HttpContext.path.params.error = "Cannot divide by zero";
                                    //     this.HttpContext.response.JSON(this.HttpContext.path.params);
                                    // }
                                    // else{
                                        let result = parseInt(this.HttpContext.path.params.x) % parseInt(this.HttpContext.path.params.y);

                                        if(result == Infinity) result = "Infinity";
                                        if(isNaN(result)) result = "NaN";

                                        this.HttpContext.path.params.value = result
                                        this.HttpContext.response.JSON(this.HttpContext.path.params); 
                                    //}
                                }
                            }
                            break;
                        case '!':
                            if(this.verifyNPresence() && this.verifyNumberOfParameters(2)){
                                if(!this.sendErrorIfNaN(this.HttpContext.path.params.n)){
                                    this.HttpContext.path.params.value = MathsController.factorial(parseInt(this.HttpContext.path.params.n));
                                    this.HttpContext.response.JSON(this.HttpContext.path.params); 
                                }
                            }
                            break;
                        case 'p':
                            if(this.verifyNPresence() && this.verifyNumberOfParameters(2)){
                                if(!this.sendErrorIfNaN(this.HttpContext.path.params.n) && !this.sendErrorIfNotInteger(this.HttpContext.path.params.n)){
                                    this.HttpContext.path.params.value = MathsController.isPrime(parseInt(this.HttpContext.path.params.n));
                                    this.HttpContext.response.JSON(this.HttpContext.path.params); 
                                }
                            }
                            break;
                        case 'np':
                            if(this.verifyNPresence() && this.verifyNumberOfParameters(2)){
                                if(!this.sendErrorIfNaN(this.HttpContext.path.params.n) && !this.sendErrorIfNotInteger(this.HttpContext.path.params.n)){
                                    this.HttpContext.path.params.value = MathsController.findPrime(parseInt(this.HttpContext.path.params.n));
                                    this.HttpContext.response.JSON(this.HttpContext.path.params); 
                                }
                            }
                            break;
                        default:
                            this.HttpContext.path.params.error = `parameter 'op': '${this.HttpContext.path.params.op}' is not implemented`;
                            this.HttpContext.response.JSON(this.HttpContext.path.params);
                            break;
                    }
                }else{
                    this.HttpContext.path.params.error = "parameter 'op' is missing";
                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                }
            }
        }}
    