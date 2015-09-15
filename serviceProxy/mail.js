var http = require('http');
var mail = require('../config').mail;
var proxy = require('./proxy');

module.exports = {
    send: function (req, res, next) {
        if (!res.locals.mailToken) {
            res.status(503).send({
                isSuccess: false,
                code: 'B+FailedToGetMailToken',
                message: 'Failed to get mail token.'
            });

            next();

            return;
        }

        proxy(mail.host, mail.port, '/service/mail/send', function (d) {
            function appendMailToken(link) {
                var s = '?';
                
                if (link.indexOf('?') >= 0) {
                    s = '&';
                }

                return link + s + 'mailToken=' + res.locals.mailToken;
            }

            // 设置邮件模板:      http://submail.cn/chs
            // username :       jinwyp@163.com
            // password:        jinwyp2011
            return {
                code: mail.code,
                to: d.to,
                subject: '请重设您的密码',
                links: [{
                    code: 'link_password_reset',
                    value: appendMailToken(d.linkPasswordReset)
                }],
                vars: [{
                    code: 'username',
                    value: d.displayName
                }]
            };
        })(req, res, next);
    }
};