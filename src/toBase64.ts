export const toBase64 = async (file: File) => {
  return new Promise((reslove, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => reslove(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
