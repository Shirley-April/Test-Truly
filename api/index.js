const express = require('express')

const app = express()

app.get("/file", (req, res) => {
    res.json({
        status: 200,
        message: "This is the home route!"
    })
})

const PORT = 3005

app.listen(PORT, () => {console.log("App running on port ", PORT)})
