const getJoke =(arr)=> {

    const randomJoke = arr[Math.floor(Math.random() * arr.length)]
    return randomJoke
}

module.exports = getJoke 