const express = require("express")
const path = require("path")

const app = express()

app.use(express.static(path.join(__dirname, "dist/bug-market-angular")))

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/bug-market-angular/index.html"))
})

const httpsPort = 443

const server = app.listen(httpsPort, () => {
  const port = server.address().port
  console.log(`Running on port ${port}`)
})
