import {Controller, Get, Post, Put, Delete, Body, Param, Res, Query} from '@nestjs/common';
import {NewsService} from "./news.service";
import {NewsEntity} from "../database/entities/news.entity";
import {NewsDTO} from "../dto/news.dto";
import {Response} from "express";
import {arrNews} from "./news.service";


@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {
    }

//create
    @Post('create-bd')
    async createNewsBD(@Body() data: NewsEntity): Promise<NewsEntity> {
        return this.newsService.createNewsBD(data);
    }

    @Post('create-arr')
    async createNewsArr(@Body() data: NewsDTO): Promise<NewsDTO[]> {
        await this.newsService.createNewsArr(data);
        return arrNews;
    }

    //get-one
    @Get('get-one-bd')
    async getOneNewsBd(@Query() query: { id: number }): Promise<NewsEntity | undefined> {
        return this.newsService.getOneNewsBD(query.id);
    }
    @Get('get-one-arr')
    async getOneNewsArr(@Query() query: { id: number }): Promise<NewsDTO | undefined> {
        return this.newsService.getOneNewsArr(query.id);
    }
    //update
    @Post('update-bd')
    async updateNewsBD(@Body() data: NewsEntity,@Res() res: Response): Promise<Response> {
        const isSuccess =  await this.newsService.updateNewsBD(data);
        if (isSuccess) {
            return res.status(200).send("Успешно");
        } else {
            return res.status(500).send("Ошибка обработки данных");
        }
    }
    @Post('update-arr/:id')
    async updateNewsArr(@Param('id') id: number, @Body() data: NewsDTO, @Res() res: Response): Promise<Response> {
        const isSuccess = await this.newsService.updateNewsArr(id, data);
        if (isSuccess) {
            return res.status(200).send("Успешно");
        } else {
            return res.status(500).send("Ошибка обработки данных");
        }
    }

// get all
    @Get('all-from-bd')
    async getAllBD(@Res() res: Response): Promise<Response> {

        const data = await this.newsService.getAllBD();
        if (data)
            return res.status(200).send(data || []);
        else
            return res.status(500).send("Ошибка получения данных");
    }

    @Get('all-from-arr')
    async getAllArr(@Res() res: Response): Promise<Response> {

        const data = await this.newsService.getAllArr();
        if (data)
            return res.status(200).send(data || []);
        else
            return res.status(500).send("Ошибка получения данных");
    }

    //delete
    @Delete('delete-from-arr')
    async deleteNewsArr(@Body() body: { id: number },@Res() res: Response): Promise<Response> {

        const isSuccess=await this.newsService.deleteNewsArr(body.id);

        if (isSuccess)
            return res.status(200).send("Данные успешно удалены");
        else
            return res.status(500).send("Данные для удаления отсутствуют");

    }
    @Delete('delete-from-bd')
    async deleteNewsBD(@Body() body: { id: number },@Res() res: Response): Promise<Response> {

        const isSuccess=await this.newsService.deleteNewsBD(body.id);

        if (isSuccess)
            return res.status(200).send("Данные успешно удалены");
        else
            return res.status(500).send("Данные для удаления отсутствуют");

    }
}
