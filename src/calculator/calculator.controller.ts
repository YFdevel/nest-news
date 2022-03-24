import {Controller, Put, Query, Req} from '@nestjs/common';
import {CalculatorService} from "./calculator.service";
import {Request} from "express";

@Controller('calculator')
export class CalculatorController {
    constructor(private calculatorService:CalculatorService) {
    }

    @Put()
   async calculate(@Query() query:{a:number,b:number,c:string}, @Req() req:Request):Promise<number|null>{
        if(req.headers['type-operation'])
        console.log(req.headers['type-operation'])
        return this.calculatorService.calculate(query.a,query.b,query.c)
    }
}
