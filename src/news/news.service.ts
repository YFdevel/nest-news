import {Injectable} from '@nestjs/common';
import {NewsEntity} from "../database/entities/news.entity";
import {NewsDTO} from "../dto/news.dto";
import {Repository} from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";


export const arrNews: NewsDTO[] = [
    {
        id: 1,
        title: 'TitleArr1',
        author: 'AuthorArr1',
        description: 'DescArr1',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
    },
];

@Injectable()
export class NewsService {
    // private readonly news: NewsDTO[] = [];

    constructor(
        @InjectRepository(NewsEntity)
        private readonly newsRepository: Repository<NewsEntity>,
    ) {
    }

// create
    async createNewsArr(data: NewsDTO): Promise<NewsDTO[]> {
        arrNews.push(data);
        return arrNews;
    }

    async createNewsBD(data: NewsEntity): Promise<NewsEntity> {
        return this.newsRepository.save(data);
    }

//get one
    async getOneNewsBD(id: number): Promise<NewsEntity | undefined> {
        return this.newsRepository.findOne({
            where: {
                id,
            },
        });
    }

    async getOneNewsArr(id: number): Promise<NewsDTO | undefined> {
        return arrNews[id - 1];
    }

    //update
    async updateNewsBD(data: NewsEntity): Promise<Boolean> {
        const existingPost = await this.newsRepository.findOne({
            where: {
                id: data.id,
            },
        });
        if(existingPost){
            await this.newsRepository.save({
                ...existingPost,
                ...data,
            });
            return true;
        }
       return false;
    }

    async updateNewsArr(id: number, data: NewsDTO): Promise<boolean> {
        if (arrNews[id-1]) {
            let existingNews = arrNews[id-1];
            existingNews = {
                ...existingNews,
                ...data,
            };
            arrNews[id-1] = existingNews;
            return true;
        }

        return false;
    }

//get all
    async getAllBD(): Promise<NewsEntity[]> {
        const news = this.newsRepository.find();
        return news;
    }

    async getAllArr(): Promise<NewsDTO[]> {
        return arrNews;
    }

    //delete
    async deleteNewsArr(id: number): Promise<Boolean> {
        if (arrNews[id-1]) {
            arrNews.splice(id-1, 1);
            return true;
        }
        return false;
    }

    async deleteNewsBD(id: number): Promise<Boolean> {
        const news = await this.newsRepository.findOne({
            where: {
                id,
            },
        });
        if (news) {
            await this.newsRepository.remove(news);
            return true;
        } else {
            return false;
        }
    }
}
