import { Module, Global } from '@nestjs/common';
import { PrismaService } from 'src/modules/shared/services/prisma.service';
import { DB } from './services/db.service';

const sharedComponents = [
    DB,
    PrismaService
]

@Global()
@Module({
    providers: sharedComponents,
    exports: sharedComponents
})
export class SharedModule {}