import { BadRequestException, HttpStatus, Res, UnsupportedMediaTypeException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { forbiddenTitleBlog } from './blog.interface';

export const multerBlog = {
  storage: diskStorage({
    destination: './images/blog',
    filename: (req, file, callBack) => {
      const upload = () => {
        const body = JSON.parse(JSON.stringify(req.body));
        if (forbiddenTitleBlog(body.title) === false) {
          callBack(null, uuidv4() + '-' + Date.now() + file.originalname);
        } else {
          return callBack(
            new BadRequestException({
              error: {
                title: 'Không nên dùng từ không đúng quy định'
              }
            }),
            null
          );
        }
      };
      upload();
    }
  }),
  fileFilter: (req, file, callBack) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
      callBack(null, true);
    } else {
      callBack(null, false);
      return callBack(
        new UnsupportedMediaTypeException({
          error: {
            featuredImage: 'featuredImage must be png or jpg or jpeg'
          }
        })
      );
    }
  }
};
