var http = require('http');
var mail = require('../config').mail;
var proxy = require('./proxy');

function appendMailToken(link, token) {
    var s = '?';

    if (link.indexOf('?') >= 0) {
        s = '&';
    }

    return link + s + 'mailToken=' + token;
}

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
            // 设置邮件模板:      http://submail.cn/chs
            // username :       jinwyp@163.com
            // password:        jinwyp2011
            return {
                code: mail.code,
                to: d.to,
                subject: d.subject,
                links: [{
                    code: 'link_password_reset',
                    value: appendMailToken(d.linkPasswordReset, res.locals.mailToken)
                }],
                vars: [{
                    code: 'username',
                    value: d.displayName
                }]
            };
        })(req, res, next);
    },

    sendVerification: function (req, res, next) {
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
            return {
                code: mail.code,
                to: d.to,
                subject: d.subject,
                links: [{
                    code: 'link_verification',
                    value: appendMailToken(d.linkVerification, res.locals.mailToken)
                }],
                vars: [{
                    code: 'username',
                    value: d.displayName
                }]
            };
        })(req, res, next);
    }
};