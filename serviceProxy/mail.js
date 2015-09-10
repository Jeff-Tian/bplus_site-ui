var http = require('http');
var mail = require('../config').mail;
var proxy = require('./proxy');

module.exports = {
    send: proxy(mail.host, mail.port, '/service/mail/send', function (d) {
        // 设置邮件模板:      http://submail.cn/chs
        // username : jinwyp@163.com
        // password: jinwyp2011
        return {
            code: mail.code,
            to: d.to,
            subject: '请重设您的密码',
            links: [{
                code: 'link_password_reset',
                value: d.linkPasswordReset
            }],
            vars: [{
                code: 'username',
                value: d.displayName
            }]
        };
    })
};