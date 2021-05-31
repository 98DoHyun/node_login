const express = require('express') ;
const app = express() ;
const port = 3000 ;
const bodyParser = require('body-parser');
const {User} = require("./models/User");
const mongoose = require('mongoose');
const config = require('./config/key')

//어플리케이션 / x-ww-form-urlencoded
app.use(express.urlencoded({extended:true}));
// 어플리케이션 /json
app.use(express.json());



mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false 
    }).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))



app.get('/', (req, res) => {
  res.send('바로바로 변경~')
})

app.post('/register', (req, res) => {
  //회원 가입 할때 필요한 정보들을 클라이언트에서 가져오면 
  // 그것들을 데이터베이스에 넣어준다
  
  const user = new User(req.body)

  user.save((err, userInfo)=> {
     if(err) return res.json({ success: false, err })
     return res.status(200).json({
       success: true
     })
  })

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  
})