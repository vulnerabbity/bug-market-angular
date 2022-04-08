const express = require("express")
const path = require("path")

const app = express()

app.use(express.static(path.join(__dirname, "dist/bug-market-angular")))

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/bug-market-angular/index.html"))
})

const port = process.env.PORT ?? 4201

const server = app.listen(port, () => {
  const currentPort = server.address().port
  console.log(`Running on port ${currentPort}`)
})
