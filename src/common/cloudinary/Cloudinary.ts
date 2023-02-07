import { v2 as cloudinary } from 'cloudinary';

export class Cloudinary {
  private static object: Cloudinary;

  private constructor() {
    cloudinary.config({
      cloud_name: 'ddrmdpexm',
      api_key: '354137164941335',
      api_secret: 'X5Ie1W7kfrVjgL_cqPDRJQRPlqE',
    });
  }

  static get instance(): Cloudinary {
    if (!Cloudinary.object) {
      Cloudinary.object = new Cloudinary();
    }

    return Cloudinary.object;
  }

  async uploadImage(image: string): Promise<any> {
    try {
      const cloudinaryImageUploadResponseData =
        await cloudinary.uploader.upload(image, {
          folder: 'images',
        });

      const { url } = cloudinaryImageUploadResponseData;

      if (!url) {
        return {
          message:
            "Couldn't upload your image at the moment. Please try again later.",
          status: 400,
        };
      }

      return {
        message: 'Successfully uploaded image.',
        status: 200,
        url: url,
      };
    } catch (error) {
      return {
        message: 'Internal Server Error',
        status: 500,
      };
    }
  }
}
