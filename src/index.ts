export * from './arrays'
export * as dates from './dates'
export * from './numbers'
export * from './objects'
export * from './optimizers'
export * from './Translator'
export * from './utils'

export { toBase64 }

type Base64Result =
  | { data: string; error: null }
  | { data: null; error: ProgressEvent<FileReader> }

const toBase64 = (file: Blob) => {
  return new Promise<Base64Result>((reslove) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () =>
      reslove({ data: reader.result, error: null } as Base64Result)
    reader.onerror = (error) => reslove({ data: null, error })
  })
}
