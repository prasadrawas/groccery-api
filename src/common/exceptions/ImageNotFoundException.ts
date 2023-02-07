class ImageNotFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ImageNotFoundException';
  }
}

export default ImageNotFoundException;
