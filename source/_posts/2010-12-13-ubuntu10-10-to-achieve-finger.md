--- 
categories: 
  - Linux
comments: true
layout: post
published: true
status: publish
tags: 
  - ubuntu
  - 指纹
  - 登录
  - 识别
title: Ubuntu10.10下实现指纹登录
type: post
---
1、安装thinkfinger软件
<div style="font-family: &amp;amp; color: #dcdccc; background-color: #3f3f3f;"><span style="color: #dcdccc;">ocean@ocean-laptop:~$ sudo apt-get install thinkfinger-tools libpam-thinkfinger</span></div>
2、采集指纹并校验：
<div style="font-family: &amp;amp; color: #dcdccc; background-color: #3f3f3f;"><span style="color: #dcdccc;">ocean@ocean-laptop:~$ sudo tf-tool --acquire //采集指纹,连续扫描三次指纹</span></div>
<div style="font-family: &amp;amp; color: #dcdccc; background-color: #3f3f3f;"><span style="color: #dcdccc;">ocean@ocean-laptop:~$ sudo tf-tool --verify //校验指纹</span></div>
#第二步需要超级用户权限,否则不能驱动指纹传感器,,如果提示Initializing...USB device not found,建议重启一下系统,然后再进行这一步操作,由于博客主题代码问题"- -acquire"会显示为"--acquire",操作的时候请注意

3、启用指纹功能
<div style="font-family: &amp;amp; color: #dcdccc; background-color: #3f3f3f;"><span style="color: #dcdccc;">ocean@ocean-laptop:~$ sudo /usr/lib/pam-thinkfinger/pam-thinkfinger-enable</span></div>
4、在debian最新的thinkfinger包中已经放弃原用的 --add-user参数,而是在第二次运行程序时仍然使用--acquire参数,自动生成后缀为bir的指纹文件存放在家目录下.
如果希望在su,sudo时也使用指纹识别(gksu,gksudo包括emacs的tramp也已经可以使用了)就以root用户身份登录后生成指纹文 件.然后重启,登录时先输入用户名,然后原来password处应该已经变成password or swipe finger了.之后就可以用刷指纹代替输入密码了.
