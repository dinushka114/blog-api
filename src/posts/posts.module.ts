import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { postProviders } from './posts.providers';

@Module({
    imports:[DatabaseModule],
    controllers:[PostsController],
    providers:[
        PostsService,
        ...postProviders
    ],
    exports:[...postProviders]
})
export class PostsModule {}
