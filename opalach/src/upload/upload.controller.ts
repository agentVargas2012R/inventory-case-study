import { UploadService } from './upload.service';
import {Body, Controller, Param, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
import * as csv from 'csvtojson';
import {FILE_TYPE} from "./upload.model";

@Controller()
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File, @Body("fileType") fileType: FILE_TYPE) {
    console.log("uploadFile Method Called with data: ")
    console.log(file);
    console.log(fileType);

    const jsonObjs = await csv().fromString(Buffer.from(file.buffer).toString());

    console.log("Json Objects: ")
    console.log(JSON.stringify(jsonObjs, undefined, 2));

    const records = this.uploadService.transform(jsonObjs, fileType);

    console.log("Records: ")
    console.log(JSON.stringify(records, undefined, 2));

    return await this.uploadService.save(records);
  }
}
