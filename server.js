const express = require("express")
const path = require("path")

const app = express()

app.use(express.static(path.join(__dirname, "dist/bug-market-angular")))

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/bug-market-angular/index.html"))
})

const port = process.env.PORT || 4201

app.listen(port)
