import emailjs from 'emailjs-com';
import {User} from "../models/user";


export const SendEmail = (props: any, callback: any) => {
    let user = User;
    user = props.user;
    //let num = props.level;
    //let lvlScore = user.score[num - 1];
    const total = () => {
        let totalNum = 0;
        user.score.forEach((element: any) => {
            totalNum += element.score;
        })
        return totalNum
    };
    let totalScore = "Puntaje total: " + total();
    //let info: any = {userName: user.name, level: lvlScore.level, scoreLevel: lvlScore.score, totalScore: totalScore};
    let info: any = {userName: user.name, totalScore: totalScore};
    const getScores = (json: any) => {
        user.score.forEach((element) => {
            json["score" + element.level] = "Nivel " + element.level + ": " + element.score;
        })
        return json;
    };
    info = getScores(info);
    const temlateTest = "template_cJPH7HCg";
    const temlate = "template_w1odKeGS";
    const userIDTest = "user_fpNDLPWJm8a7JTZCHRRAU";
    const userID = "user_qJFCqCTcLI2K2B6wvUEKr";
    const sendEmail = emailjs.send("gmail", temlate, info, userID)
        .then((result) => {
            console.log(result.text);
            callback(true)
        }, (error) => {
            console.log("error, acá hay un error");
            console.log(error.text);
            callback(false)
        });
}

