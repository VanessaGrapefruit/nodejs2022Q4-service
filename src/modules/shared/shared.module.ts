import { Module, Global } from '@nestjs/common';
import { DB } from './services/db.service';

const sharedComponents = [
    DB
]

@Global()
@Module({
    providers: sharedComponents,
    exports: sharedComponents
})
export class SharedModule {}