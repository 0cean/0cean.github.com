--- 
categories: 
  - 生活娱乐
comments: true
layout: post
published: true
status: publish
tags: 
  - qq空间
  - qzone
  - wordPress
  - 博客
  - 同步
  - 艰难的决定
  - 转发
  - 邮件
title: 一个艰难的决定
type: post
---
当您看到这篇文章的时候，我刚刚作出了一个非常艰难的决定,在腾讯没有开放Qzone的API的情况下,再次开通QQ空间,同步自己WordPress博客上的文章到Qzone,因为腾讯没有开放Qzone的API,想从自己的WordPress博客上自动同步文章到QQ空间只能另辟蹊径,好在腾讯提供了QQ邮件发布的方式,而QQ邮箱支持SMTP协议, WordPress 所包含的 PHPMailer 类可以使用 SMTP 发邮件，所以可以通过使用 PHPMailer 同步 WordPress 博客文章到 Qzone。总之由于腾讯的不开放这个过程曲折坎坷,感谢SMTP协议,感谢腾讯没有对QQ邮箱的SMTP登录做基于IP的验证,否则我的WordPress主机就不能通过PHPMailer类远程登录发送邮件到Qzone.

下一步增加同步WordPress文章的时候把文章的分类也同步到Qzone,目前自动同步过来的文章都会归类在个人日记分类下,等以后同步过来的文章增多的时候,浏览起来会很乱.这个问题比较好解决,看腾讯的帮助文档,邮件发布日志的分类可以在邮件的标题里加上,格式为"[某分类]文章标题",如果所属分类不存在，会自动创建新的分类.回头把WordPress上的PHP博客同步代码修改一下就可以实现.
