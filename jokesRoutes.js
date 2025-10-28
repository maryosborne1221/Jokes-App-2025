const express = require('express')
const router = express.Router()
const axios = require('axios')
const PORT = process.env.PORT || 3001

// http://localhost:3001/jokes
router.get('/', (req, res)=> {
    // res.send('This works')
    const url = `https://api.sampleapis.com/jokes/goodJokes`
    /** pagination...🤞🏾 */
    const query = req.query ? req.query : {}

    // get page & limit
    let page = parseInt(query.page) || 1
    let limit = parseInt(query.limit) || 12

    const startIdx = (page - 1) * limit
    const endIdx = page * limit 

    // will store jokes in here...
    let jokesArr = []

    axios.get(url)
        .then(resp => {

            for (let i = startIdx; i < endIdx; i++) {
                jokesArr = [...jokesArr, resp.data[i]]
            }

            res.render('pages/allJokes', {
                title: 'All Jokes',
                name: 'All Jokes',
                data: jokesArr
            })
        })
})

// Joke Type
// localhost:3001/jokes/type/:type
router.get('/type/:type', (req, res)=> {

    const type = req.params.type
    const url = `https://api.sampleapis.com/jokes/goodJokes`

    // We will filter through resp.data and store in typeArr
    let typeArr = []

    axios.get(url)
        .then(resp => typeArr = resp.data.filter(item => item.type == type))
        .then(typeArr => {
            res.render('pages/allJokes', {
                title: type,
                name: `${type} jokes`,
                data: typeArr
            })
        })
})

module.exports = router