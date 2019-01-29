var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var TITLE = 'formidable上传示例';
var AVATAR_UPLOAD_FOLDER = '/avatar/';

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.render('index', { title: TITLE });
});

router.post('/', function (req, res) {
    // 创建上传表单
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = 'F:\\work\\WebstormProjects\\test\\public' + AVATAR_UPLOAD_FOLDER;
    // form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;
    form.keepExtensions = true; // 保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024; // 文件大小

    form.parse(req, function (err, fields, files) {
        if (err) {
            res.locals.error = err;
            res.render('index', {title: TITLE});
            return;
        }

        var extName = ''; // 后缀名
        console.log("files.fulAvatar.type=" + files.fulAvatar.trpe);
        switch (files.fulAvatar.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }
        if (extName.length == 0) {
            res.locals.error = '只支持png和jpg格式图片';
            res.render('index', {title: TITLE});
            return;
        }

        var avatarName = Math.random() + '.' + extName;
        var newPath = form.uploadDir + avatarName;

        console.log(newPath);
        fs.renameSync(files.fulAvatar.path, newPath); //重命名
    });

    res.locals.success = '上传成功';
    res.render('index', {title: TITLE})
})

module.exports = router;
