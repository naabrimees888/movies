
async function getResults({search}) {
  const requestUrl = `https://api.themoviedb.org/3/search/movie?api_key=33e888754888fa676d6454f2d61920d3&language=en&query=${search}&page=1&include_adult=false`
  const response = await fetch(requestUrl)
  const data = await response.json()
  console.log(data)

  return data
}

export {
  getResults
}
