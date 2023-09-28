export const debounce = (cb: Function, delay: number) => {
  let timeout: NodeJS.Timeout
  return (...args: any) => {
    clearTimeout(timeout)

    timeout = setTimeout(() => cb(...args), delay ?? 1000)
  }
}

export const throttle = (cb: Function, delay: number) => {
  let shouldWait = false
  let waitingArgs: any[] | null

  const timeoutFunc = () => {
    if (!waitingArgs) return (shouldWait = false)

    cb(...waitingArgs)
    waitingArgs = null

    setTimeout(timeoutFunc, delay ?? 1000)
  }

  return (...args: any) => {
    if (shouldWait) return (waitingArgs = args)

    cb(...args)
    shouldWait = true

    setTimeout(timeoutFunc, delay ?? 1000)
  }
}
