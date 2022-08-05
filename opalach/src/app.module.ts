import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { InventoryModule } from './inventory/inventory.module';
import { UploadModule } from "./upload/upload.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      path: '/inventory/graphql',
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      cors: {
        origin: ['*'],
        credentials: true,
      },
    }),
    InventoryModule,
    UploadModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
