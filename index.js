//CRUD
const express = require("express");
const app = express(); //express 구축
const dotenv = require("dotenv");
var { users } = require("./data");

//json 파싱되어 백엔드 코드에서 사용가능
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//환경변수 로드, .env에작성한포트정보 PORT
dotenv.config();
const PORT = process.env.PORT;

app.get('/', (req, res)=>{
    res.json({message: "Hello World"})
});

app.get('/info', (req, res)=>{
    res.status(200).json({message: {title : "Information", last_update_date : "2025-07-14"}})
});

// 특정 id값의 데이터 조회
app.get('/user/:id',(req, res)=>{
    const id = req.params.id;
    //console.log("🚀 ~ app.get ~ id:", id, "type:", typeof id)
    const findItem = users.find(item=> item.id === Number(id));
    console.log("🚀 ~ app.get ~ users:", users)
    if(!findItem){
        res.status(404).json({message: "존재하지 않는 사용자"});
    } else {
        res.status(200).json(findItem);
    }
});

app.post('/user', (req, res)=>{
    const userInfo = req.body;
    console.log("name : ", userInfo.name, "mbti : ", userInfo.mbti);
    // res.status(201).json({
    //     id: Date.now(),
    //     name: userInfo.name + "💖",
    //     mbti: `${userInfo.mbti}😊`
    // });

    // users.push({
    //     id: Date.now(),
    //     name: userInfo.name + "💖",
    //     mbti: `${userInfo.mbti}😊`
    // });
    
    const newUser = {
        id: Date.now(),
        name: userInfo.name + "💖",
        mbti: `${userInfo.mbti}😊`
    }

    const addUsers = [...users, newUser];

    console.log("🚀 ~ app.post ~ users:",addUsers)
    res.status(201).json({data:addUsers});
});

app.listen((PORT), () => {
    console.log("Server running at...", PORT);
});