const express = require("express")
const path = require("path")
const dotenv = require("dotenv")

dotenv.config()

const app = express()

app.use(express.static(path.join(__dirname, "dist/bug-market-angular")))

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/bug-market-angular/index.html"))
})

const port = process.env.PORT ?? 4201

const server = app.listen(port, "0.0.0.0", () => {
  const address = server.address()
  const currentPort = address.port
  console.log(`Running on port ${currentPort}`)
})
