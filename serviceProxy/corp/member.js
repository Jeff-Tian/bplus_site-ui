var proxy = require('../proxy');
var leaveTrimmer = require('../../utils/leaveTrimmer');
var config = require('../../config');
var corpServiceUrls = leaveTrimmer.trim(config.serviceUrls.corp, '/corp-service-proxy/member');

module.exports = require('express').Router()
    .put(corpServiceUrls.member.register, require('../captcha').validate, proxy.proxyBPlus({
        path: '/corp/member/register',
        method: 'POST'
    }))
    .post(corpServiceUrls.member.login, proxy.proxyBPlus({
        path: '/corp/member/logon',
        method: 'POST',
        responseInterceptor: function (originalResponse, upstreamJson, originalRequest, next) {
            var sso = require('../sso.js');

            if (upstreamJson.isSuccess) {
                sso.setAuthToken(originalResponse, upstreamJson.result.token, originalRequest.body.remember, upstreamJson.result.member_id);

                if (sso.jumpToReturnUrl(originalRequest, originalResponse)) {
                    return undefined;
                }
            }

            return false;
        }
    }))
    .post(corpServiceUrls.member.uploadLicense, function (req, res, next) {
        req.files = {};

        req.busboy.on('file', function (fieldName, file, fileName, encoding, mimeType) {
            if (!fileName) {
                return;
            }

            file.fileRead = [];

            console.log('uploading: ', fileName);
            console.log(file);
            file.on('data', function (data) {
                console.log('File [' + fieldName + '] got ' + data.length + ' bytes');
                file.fileRead.push(data);
            });

            file.on('end', function () {
                var finalBuffer = Buffer.concat(this.fileRead);

                req.files[fieldName] = {
                    buffer: finalBuffer,
                    size: finalBuffer.length,
                    filename: fileName,
                    mimetype: mimeType
                };

                console.log('File [' + fieldName + '] Finished');
            });
        });

        req.busboy.on('field', function (key, value, keyTruncated, valueTruncated) {
            console.log(key, '=', value);
            req.body[key] = value;
        });

        req.busboy.on('finish', function () {
            console.log('busboy finish');
            next();
        });

        return req.pipe(req.busboy);
    }, function (req, res, next) {
        req.body.file = req.files.file;
        next();
    }, proxy({
        host: config.upload.public.host,
        port: config.upload.public.port,
        path: '/upload/bplus-corp-resource',
        method: 'PUT',
        headers: {
            'Content-Type': 'multipart/form-data; boundary=' + Math.random().toString(16)
        }
    }))
;
