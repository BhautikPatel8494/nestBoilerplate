import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UtilityService {
}

// Multer configuration
export const multerConfig = {
  dest: './upload',
};

export const multerUpload = ({ destination }) => {
  multerConfig.dest = `./upload/${destination}`;
  return uploadFile;
};

// Multer upload options
export const uploadFile = {
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      cb(null, true);
    } else {
      cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
    }
  },
  // Storage properties
  storage: diskStorage({
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = multerConfig.dest;
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    // File modification details
    filename: (req: any, file: any, cb: any) => {
      const extArray = file.mimetype.split('/');
      const extension = extArray[extArray.length - 1];
      cb(null, file.fieldname + '-' + Date.now() + '.' + extension);
    },
  }),
};
