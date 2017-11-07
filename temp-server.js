const express = require('express')
const app = express()

// Log all requested URL's:
app.use(function (req, res, next) {
  console.log(req.url)
  next()
})

// Fake the packager:
app.use('/', express.static('.'))
app.use('/assets', express.static('.'))
app.get('/status', function (req, res) {
  res.send('packager-status:running')
})

app.listen(8081, function () {
  console.log('Serving currency directory as localhost:8081!')
})
