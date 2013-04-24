--- 
categories: 
  - Linux
comments: true
layout: post
published: true
status: publish
tags: 
  - ubuntu
  - 中文路径
  - 用户目录
  - 英文
  - 转换
title: Ubuntu中文环境下转换用户目录里的中文路径为英文
type: post
---
使用ubuntu中文环境的用户自然会发现home下用户目录的“桌面”、“图片”、“视频”、“音乐”都是中文的。

很多时候都喜欢在桌面上放一些要操作的文件，linux里命令行操作又多，难免会用命令行操作桌面上的东西，那么就要 “cd  桌面”，打“桌面”的时候要输入法切换，所以就想办法把用户目录下的路径改成英文，而其他的中文不变， 方法如下：
打开终端，在终端中输入命令:
<blockquote>export LANG=en_US

xdg-user-dirs-gtk-update</blockquote>
跳出对话框询问是否将目录转化为英文路径,同意并关闭.

在终端中输入命令:
<blockquote>export LANG=zh_CN</blockquote>
关闭终端,并重起.下次进入系统,系统会提示是否把转化好的目录改回中文.选择不再提示,并取消修改.主目录的中文转英文就完成了.
