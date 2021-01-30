const _isEmptyWord = (c) => {
  return (
    (' ' === c) ||
    ('\n' === c) ||
    ('\r' === c) ||
    ('\t' === c)
  )
}

const readingTime = (text, options) => {
  var words = 0, start = 0, end = text.length - 1, isEmptyWord, i

  options = options || {}

  options.wordsPerMinute = options.wordsPerMinute || 200

  isEmptyWord = options.isEmptyWord || _isEmptyWord

  // fetch bounds
  while (isEmptyWord(text[start])) start++
  while (isEmptyWord(text[end])) end--

  // calculate the number of words
  for (i = start; i <= end; i ++) {
    if(!isEmptyWord(text[i])){
      words++;
    }
  }

  // reading time stats
  var minutes = words / options.wordsPerMinute
  var time = minutes * 60 * 1000
  var displayed = Math.ceil(minutes.toFixed(2))

  return {
    text: displayed + ' min read',
    minutes: minutes,
    time: time,
    words: words
  }
}

export default readingTime;
