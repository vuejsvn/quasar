
let now = Date.now

export default function (func, wait, immediate) {
  let
    timeout, args, context, timestamp, result,
    later = () => {
      let last = now() - timestamp

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last)
      }
      else {
        timeout = null
        if (!immediate) {
          result = func.apply(context, args)
          if (!timeout) {
            context = args = null
          }
        }
      }
    }

  return function (...args) {
    var callNow = immediate && !timeout

    context = this
    timestamp = now()

    if (!timeout) {
      timeout = setTimeout(later, wait)
    }
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}
