type Result<T> =
  | { error: null; image: T }
  | { error: ProgressEvent<FileReader>; image: null }

export const toBase64 = async <T extends string | ArrayBuffer>(file: Blob) => {
  return new Promise<Result<T>>((reslove) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => reslove({ error: null, image: reader.result as T })
    reader.onerror = (error) => reslove({ error, image: null })
  })
}
