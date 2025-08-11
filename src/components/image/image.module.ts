import { Module } from "@nestjs/common";
import { ProjectModule } from "../project/project.module";
import { ImageController } from "./image.controller";
import { ImageService } from "./image.service";
import { CloudinaryService } from "../services/cloudinary.service";

@Module({
    imports:[ProjectModule],
    controllers:[ImageController],
    providers:[ImageService,CloudinaryService],
    exports:[ImageService]
})
export class ImageModule {}