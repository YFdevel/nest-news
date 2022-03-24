import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {
   private result:number|null;

   async calculate(firstNumber: number, secondNumber: number, flag: string):Promise<number | null>{
       switch (flag){
           case "plus":
               this.result=+firstNumber + +secondNumber;
               break;
           case "-":
               this.result=+firstNumber - +secondNumber;
               break;
           case "*":
               this.result=+firstNumber * +secondNumber;
               break;
           case "/":
               if(+secondNumber!==0)
               this.result= +firstNumber / +secondNumber;
               break;
           default:
               this.result=null;
       }
       return this.result;
   }
}
