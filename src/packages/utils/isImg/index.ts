const isImg = (path: string) => /\w.(png|jpg|jpeg|svg|webp|gif|bmp)$/i.test(path);

export default isImg;
