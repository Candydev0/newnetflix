const express = require('express');
const app = express();
const mysql = require("./mysql.js");

const {
  Telegraf,
  session,
  Markup
} = require('telegraf');
const url = "https://app-3d719d27-5f9d-4eb6-b8f8-9abd90562db8.cleverapps.io/refer/";
const bot = new Telegraf("5138093222:AAGKD8jXFBbPdiU6ZnNQC6cHBPvJ5pdjld4");
const setnew = (msg, refby, refst)=> {
  var sql = `INSERT INTO users(id, balance, refer_count, refer_by, total_earned, refer_status) VALUES (${msg.message.chat.id},0,0,${refby},0,${refst})`;
  mysql.query(sql, function (err, result, fields) {
  if (err) msg.reply(err);
  });
};
bot.start((msg) => {
  
  var cmdstart = msg.message.text.split(' ');
  if (cmdstart.length == 2) {
    var sql = `SELECT * FROM users WHERE id = ${msg.message.chat.id}`;
    mysql.query(sql, function (err, result, fields) {
      if (result.length != 1) {

        var sql = `SELECT * FROM users WHERE id = ${cmdstart[1]}`;
        mysql.query(sql, function (err, result1, fields) {
          if (result1.length != 0) {
            setnew(msg, cmdstart[1], 0);
var sql = `UPDATE users SET refer_count = '${result1[0].refer_count+1}' WHERE users.id = ${cmdstart[1]}`;
mysql.query(sql, function (err, result1, fields) {
  
});
msg.replyWithHTML(`π°<b> Welcome In Our Premium Account Giveaway Bot
--------------------------------------------------------
πJoin Our Payment Proof Channel:</b>
@NetProof
π<b>Join Our Giveaway Channel :</b>
@Nathan_Netflix
--------------------------------------------------------
π <b>Before Using This Bot, After completing all tasks Click on β Check!</b>`, Markup.inlineKeyboard([
                Markup.button.callback('β Check', 'check')
              ]));


          } else {
            setnew(msg,
              0,
              1);
msg.replyWithHTML(`π°<b> Welcome In Our Premium Account Giveaway Bot

--------------------------------------------------------
πJoin Our Payment Proof Channel:</b>
@NetProof
π<b>Join Our Giveaway Channel :</b>
@Nathan_Netflix
--------------------------------------------------------
π <b>Before Using This Bot, After completing all tasks Click on β Check!</b>`, Markup.inlineKeyboard([
                Markup.button.callback('β Check', 'check')
              ]));
          }
        });

      } else {
msg.replyWithHTML(`π°<b> Welcome In Our Premium Account Giveaway Bot
--------------------------------------------------------
πJoin Our Payment Proof Channel:</b>
@NetProof
π<b>Join Our Giveaway Channel :</b>
@Nathan_Netflix
--------------------------------------------------------
π <b>Before Using This Bot, After completing all tasks Click on β Check!</b>`, Markup.inlineKeyboard([
            Markup.button.callback('β Check', 'check')
          ]));
      }
    });
  } else {
    var sql = `SELECT * FROM users WHERE id = ${msg.message.chat.id}`;
    mysql.query(sql, function (err, result, fields) {
      if (result.length != 1) {
msg.replyWithHTML(`π°<b> Welcome In Our Premium Account Giveaway Bot
--------------------------------------------------------
πJoin Our Payment Proof Channel:</b>
@NetProof
π<b>Join Our Giveaway Channel :</b>
@Nathan_Netflix
--------------------------------------------------------
π <b>Before Using This Bot, After completing all tasks Click on β Check!</b>`, Markup.inlineKeyboard([
            Markup.button.callback('β Check', 'check')
          ]));
        setnew(msg, 0, 1);
      } else {
msg.replyWithHTML(`π°<b> Welcome In Our Premium Account Giveaway Bot
--------------------------------------------------------
πJoin Our Payment Proof Channel:</b>
@NetProof
π<b>Join Our Giveaway Channel :</b>
@Nathan_Netflix
--------------------------------------------------------
π <b>Before Using This Bot, After completing all tasks Click on β Check!</b>`, Markup.inlineKeyboard([
            Markup.button.callback('β Check', 'check')
          ]));
      }
    });
  }});
bot.action('check', (msg) => {
  const jet=async ()=>{
  const channel = ["@Nathan_Netflix","@NetProof"]; 
  let nu = 0;
let i = 0; 
let len = channel.length;
let text = "";
var sql = `SELECT * FROM users WHERE id = ${msg.update.callback_query.message.chat.id}`;
var refst;
    mysql.query(sql, function (err, result, fields) {
      refst = result[0].refer_status;
      refby = result[0].refer_by;
    });
while (i < len) {
  var stst = await msg.telegram.getChatMember(channel[i],msg.update.callback_query.message.chat.id);
  if(stst.status=='creator'||stst.status=='member'||stst.status=='administrator'){
    nu++;}
    
    if(nu==len){
      if(refst!=1){
        sql = `UPDATE users SET refer_status = '1' WHERE users.id = ${msg.update.callback_query.message.chat.id}`;
       // msg.reply(sql);
        mysql.query(sql, function (err, result) {
      sql = `SELECT * FROM users WHERE id=${refby}`;
      mysql.query(sql, function (err, result, fields) {
       sql = `UPDATE users SET balance = ${result[0].balance+1} WHERE users.id = ${refby}`;
       mysql.query(sql, function (err, result, fields) {
         msg.telegram.sendMessage(refby,`π <b>+1 From Refer System
<a href="tg://user?id=${msg.update.callback_query.message.chat.id}">${msg.update.callback_query.message.chat.id}</a> Completed All the task </b>`,{parse_mode: 'HTML'});
       });
    });
    });
      }
      msg.reply(
    'π  Main Menu',
    Markup.keyboard([
      ['π° Balance', 'π«Referral'],
      ['π₯Withdraw'],
      ['π’ Giveaway', 'πSupport']
    ])
    .resize()
  );
  
    }else{
      if(i==1){
      msg.reply("β Must join all channels",{reply_markup: {remove_keyboard: true}});
      msg.answerCbQuery("β Must join all channels");}
    }
  
  i++;
} };
jet();
   
});
bot.hears('πSupport', (msg)=> {
  msg.replyWithHTML(`<b>Hi Dear,
If You have Problems than Contact Us @Nathan_ou .</b>`,
Markup.inlineKeyboard([
      Markup.button.url("Chat with Developer","https://t.me/Candydev")
 ])
)});
bot.hears('π’ Giveaway', msg => msg.reply('Join For Giveaway @Nathan_Netflix'));
bot.hears('π° Balance', (msg)=> {
  var sql = `SELECT * FROM users WHERE id = ${msg.message.chat.id}`;

  mysql.query(sql,
    function (err, result, fields) {

      msg.replyWithHTML(`<b>
π° Balance : ${result[0].balance} Point

βοΈRefer And Earn More</b>`);

    });

});
bot.hears('π«Referral', (msg)=> {
  var sql = `SELECT * FROM users WHERE id = ${msg.message.chat.id}`;

  mysql.query(sql,
    function (err, result, fields) {
      msg.replyWithHTML(`<b>π° Invite Users And Earn 1 POINT

πΉ Your Link :</b> https://t.me/Nathan_Netflix_Bot?start=${
  msg.message.chat.id}
  
π―<b> You Invited :</b> ${result[0].refer_count} <b>Users</b>`);
    });
});
bot.hears('π₯Withdraw', (msg)=> {
   var sql = `SELECT * FROM users WHERE id = ${msg.message.chat.id}`;

  mysql.query(sql,
    function (err, result, fields) {
  msg.replyWithHTML(`π¨<b>You Can Exchange Your Point to Many Premium Accounts.
  
π°Your Balance</b> ${result[0].balance} <b>Points.

πExchange Point to ~
πNetflix Account [ 5 Point ].
πHotstar Account [ 10 Points ].</b>`,Markup.inlineKeyboard([[
      Markup.button.callback('Netflix [ 5 Point ]', 'netflix')],[
      Markup.button.callback('Hotstar [ 10 Point ]', 'hotstar')
    ]]));
    });
    }
);
bot.action('netflix', (msg) => {
  msg.editMessageText(`πFor Exchange Points to Netflix Account :-
π²Please Click on Comfirm`,Markup.inlineKeyboard([
      Markup.button.callback('Comfirm', 'com_net'),
      Markup.button.callback('Cancel', 'back')
    ]));
});
bot.action('com_net', (msg) => {
    var sql = `SELECT * FROM users WHERE id = ${msg.update.callback_query.message.chat.id}`;

  mysql.query(sql,
    function (err, result12, fields) {
      if(result12[0].balance>=5){
    var sql = `SELECT * FROM acc WHERE type="netflix" and status=0`;
  mysql.query(sql,
    function (err, result, fields) {
      if(result.length!=0){
        msg.answerCbQuery("π Order Processing");
        msg.editMessageText("π Order Processing",{
  parse_mode: 'HTML'
});
setTimeout(() => {
msg.editMessageText(`β <b>Generating Account Log... 
β° Wait For </b>3 <b>second ....</b>`,
{parse_mode: 'HTML'});},1000);
setTimeout(() => {
msg.editMessageText(`β <b>Generating Account Log... 
β° Wait For </b>2 <b>second ....</b>`,
{parse_mode: 'HTML'});},2000);
setTimeout(() => {
msg.editMessageText(`β <b>Generating Account Log... 
β° Wait For </b>1 <b>second ....</b>`,
{parse_mode: 'HTML'});},3000);
setTimeout(() => {
msg.editMessageText(`β <b>Generating Account Log... 
β° Wait For </b>0 <b>second ....</b>`,
{parse_mode: 'HTML'});},4000);
setTimeout(() => {
msg.editMessageText(`π<b> Order Successfully Completed..
π§ Account Details:-
π§ Email :-</b> <code>${result[0].email}</code>
π<b> Password :-</b> <code>${result[0].pass}</code>
πThanks For Using Our Botπ
~Send Screenshot To @Natproof_bot`,
{parse_mode: 'HTML'});
  var sql = `UPDATE acc SET Id = '${msg.update.callback_query.message.chat.id}', status = '1' WHERE acc.uid = ${result[0].uid}`;
  mysql.query(sql,
    function (err, result) {
      var sql = `UPDATE users SET balance = '${result12[0].balance-5}' WHERE users.id = ${msg.update.callback_query.message.chat.id};`;
      mysql.query(sql,
    function (err, result) {
      msg.reply(err);
    });
    });
},4400);
      }else{
        msg.editMessageText(`π<b>Sorry , This Product is out of stock .</b>
πͺ<i> We will Inform You when it cames back.</i>`,{
  parse_mode: 'HTML'
});
      }
    });
      }else{
        msg.answerCbQuery("β Sorry To Say You have not enough Points to Exchange ...",{show_alert:false});
        msg.editMessageText(`π« You Need 5 Points For Exchanging .
π¬ Refer More to Earn .`,Markup.inlineKeyboard([
      Markup.button.callback('< Back', 'back')
    ]));
      }
    });
});
bot.action('back', (msg)=> {
   var sql = `SELECT * FROM users WHERE id = ${msg.update.callback_query.message.chat.id}`;

  mysql.query(sql,
    function (err, result, fields) {
  msg.editMessageText(`π¨<b>You Can Exchange Your Point to Many Premium Accounts.
  
π°Your Balance</b> ${result[0].balance} <b>Points.

πExchange Point to ~
πNetflix Account [ 5 Point ].
πHotstar Account [ 10 Points ].</b>`,{
  parse_mode: 'HTML',
  ...Markup.inlineKeyboard([[
      Markup.button.callback('Netflix [ 5 Point ]', 'netflix')],[
      Markup.button.callback('Hotstar [ 10 Points ]', 'hotstar')
    ]])});
    });
    }
);
bot.action('hotstar', (msg) => {
  msg.editMessageText(`πFor Exchange Points to Hotstar Account :-
π²Please Click on Comfirm`,Markup.inlineKeyboard([
      Markup.button.callback('Comfirm', 'com_hot'),
      Markup.button.callback('Cancel', 'back')
    ]));
});
bot.action('com_hot', (msg) => {
    var sql = `SELECT * FROM users WHERE id = ${msg.update.callback_query.message.chat.id}`;

  mysql.query(sql,
    function (err, result12, fields) {
      if(result12[0].balance>=10){
    var sql = `SELECT * FROM acc WHERE type="hotstar" and status=0`;
  mysql.query(sql,
    function (err, result, fields) {
      if(result.length!=0){
        msg.answerCbQuery("π Order Processing");
        msg.editMessageText("π Order Processing",{
  parse_mode: 'HTML'
});
setTimeout(() => {
msg.editMessageText(`β <b>Generating Account Log... 
β° Wait For </b>3 <b>second ....</b>`,
{parse_mode: 'HTML'});},1000);
setTimeout(() => {
msg.editMessageText(`β <b>Generating Account Log... 
β° Wait For </b>2 <b>second ....</b>`,
{parse_mode: 'HTML'});},2000);
setTimeout(() => {
msg.editMessageText(`β <b>Generating Account Log... 
β° Wait For </b>1 <b>second ....</b>`,
{parse_mode: 'HTML'});},3000);
setTimeout(() => {
msg.editMessageText(`β <b>Generating Account Log... 
β° Wait For </b>0 <b>second ....</b>`,
{parse_mode: 'HTML'});},4000);
setTimeout(() => {
msg.editMessageText(`π<b> Order Successfully Completed..
π§ Account Details:-
π§ Email :-</b> <code>${result[0].email}</code>
π<b> Password :-</b> <code>${result[0].pass}</code>
πThanks For Using Our Botπ
~Send Screenshot To @Natproof_bot`,
{parse_mode: 'HTML'});
  var sql = `UPDATE acc SET Id = '${msg.update.callback_query.message.chat.id}', status = '1' WHERE acc.uid = ${result[0].uid}`;
  mysql.query(sql,
    function (err, result) {
      var sql = `UPDATE users SET balance = '${result12[0].balance-10}' WHERE users.id = ${msg.update.callback_query.message.chat.id};`;
      mysql.query(sql,
    function (err, result) {});});
},4400);
      }else{
        msg.editMessageText(`π<b>Sorry , This Product is out of stock .</b>
πͺ<i> We will Inform You when it cames back.</i>`,{
  parse_mode: 'HTML'
});
      }
    });
      }else{
        msg.answerCbQuery("β Sorry To Say You have not enough Points to Exchange ...",{show_alert:false});
        msg.editMessageText(`π« You Need 10 Points For Exchanging .
π¬ Refer More to Earn .`,Markup.inlineKeyboard([
      Markup.button.callback('< Back', 'back')
    ]));
      }
    });
});
bot.command('/netflix', (msg) =>{ 
  if(msg.message.chat.id==1890681503){
  var myArray = msg.message.text.split(" ");
  //msg.reply(myArray);
  if(myArray.length==3){
    sql = `INSERT INTO acc (uid, email, pass, Id, type, status) VALUES (NULL, '${myArray[1]}', '${myArray[2]}', '0', 'netflix', '0');`
    mysql.query(sql,
    function (err, result) {
        msg.reply("Successful Added...");
    })
    
    
  }else{
    var sql = `SELECT * FROM acc WHERE type="netflix" `;
  mysql.query(sql,
    function (err, result, fields) {
   // msg.reply(result.length);
      text = `π§§<b> Total Account :- </b> ${result.length}
-------------------------------------------------------
`
for (var i = 0; i < result.length; i++) {
        text += `π<b> UDI :- </b> ${result[i].uid}
π§<b> Email :-</b> <code>${result[i].email}</code>
π<b> Password :-</b> <code>${result[i].pass}</code>
π<b> Status :-</b> ${result[i].status}
For Delete /delete_${result[i].uid}
--------------------------------------------------------
`;
}
msg.replyWithHTML(text);
    }); }
  }
  } );
bot.command('/hotstar', (msg) =>{ 
if(msg.message.chat.id==1890681503){
  var myArray = msg.message.text.split(" ");

  //msg.reply(myArray);
  if(myArray.length==3){
    sql = `INSERT INTO acc (uid, email, pass, Id, type, status) VALUES (NULL, '${myArray[1]}', '${myArray[2]}', '0', 'hotstar', '0');`
    mysql.query(sql,
    function (err, result) {
        msg.reply("Successful Added...");
    })
    
    
  }else{
    var sql = `SELECT * FROM acc WHERE type="hotstar" `;
  mysql.query(sql,
    function (err, result, fields) {
   // msg.reply(result.length);
      text = `π§§<b> Total Account :- </b> ${result.length}
-------------------------------------------------------
`
for (var i = 0; i < result.length; i++) {
        text += `π<b> UDI :- </b> ${result[i].uid}
π§<b> Email :-</b> <code>${result[i].email}</code>
π<b> Password :-</b> <code>${result[i].pass}</code>
π<b> Status :-</b> ${result[i].status}
For Delete /delete_${result[i].uid}
--------------------------------------------------------
`;
}
msg.replyWithHTML(text);
    }); }
}
} );
bot.hears(/\/delete_(\d+)/, (msg) => {
 if(msg.message.chat.id==1890681503){
  del = msg.message.text.split("_");
  sql = `SELECT * FROM acc WHERE uid = ${del[1]}`;
  mysql.query(sql,
    function (err, result, fields) {
     if (result.length!=0){
        sql=`DELETE FROM acc WHERE uid=${del[1]}`;
mysql.query(sql,
    function (err, result) {
      msg.reply("Deleted Successful..")
    });
      }else{
        msg.reply("Account Not found...");
      }
      if (err) msg.reply(err);
    });}
});
bot.telegram.setWebhook(url);
app.get('/refer/', (req, res) => res.send('i am out of world!'));
app.get('/mysql/', (req, res) => {

  mysql.ping((err) => {

        if(err) return res.status(500).send("MySQL Server is Down");

        res.send("MySQL Server is Active");});});
app.use(bot.webhookCallback("/refer/"));
app.listen(8080);
