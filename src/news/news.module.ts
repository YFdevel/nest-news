import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import {DatabaseModule} from "../database/database.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {NewsEntity} from "../database/entities/news.entity";

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([NewsEntity])],
  controllers: [NewsController],
  providers: [NewsService]
})
export class NewsModule {}
