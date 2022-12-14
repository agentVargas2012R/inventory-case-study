import { Module } from '@nestjs/common';
import { InventoryResolver } from './inventory.resolver';
import { InventoryService } from './inventory.service';

@Module({
  imports: [],
  controllers: [],
  providers: [InventoryResolver, InventoryService],
})
export class InventoryModule {}
