type Result =
  | { data: string; error: null }
  | { data: null; error: ProgressEvent<FileReader> }

export const toBase64 = (file: Blob) => {
  return new Promise<Result>((reslove) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () =>
      reslove({ data: reader.result, error: null } as Result)
    reader.onerror = (error) => reslove({ data: null, error })
  })
}
