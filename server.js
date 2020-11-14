const express = require("express")
const app = express()


app.use(express.static(__dirname+'/dist/SraaClient'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/SraaClient/index.html'));
});
app.set("port", process.env.PORT || 3000)

app.listen(app.get("port"))