const express = require('express');
const router = express.Router();
const db = require('../../module/db');
const check = require('../../module/check');

/* 테스트용 입니다. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'api/dup' });
});

//로그인 라우터
router.post('/', async (req, res, next) => {

    //유저 닉네임 받기 위한 변수
    let userNickname = req.body.nickname;

    //유저 닉네임이 빈 값으로 왔는 지 검증
    if (check.checkNull([userNickname])){
        res.status(400).send({
            message: "Null Value"
        })
    } else { //잘 입력 됐다면 ...

        //1) db에 등록된 유저가 있는 지 검증
        let checkQuery = 'SELECT * FROM user WHERE nickname = ?';
        let checkResult = await db.queryParamArr(checkQuery, [userNickname]);

        if (!checkResult) { // 쿼리수행중 에러가 있을 경우
            res.status(500).send({
                message : "Internal Server Error"
            });

        } else if (checkResult.length >= 1){ // 유저가 존재할 때
            res.status(200).send({
                message: "duplication"
            })

        } else { // 유저가 없을 때
            res.status(200).send({
                message : "available"
            });
        }
    }
});


module.exports = router;