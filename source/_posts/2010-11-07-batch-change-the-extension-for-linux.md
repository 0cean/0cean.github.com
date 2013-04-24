--- 
categories: 
  - Linux
comments: true
layout: post
published: true
status: publish
tags: 
  - linux
  - 修改
  - 扩展名
  - 批量
  - 改名
title: Linux下批量修改扩展名
type: post
---
这两天在整理一些照片，在Linux下文件名区分大小写，而要处理的照片的扩展名都是JPG导致在软件和上传页面里不能识别，需要将JPG改成jpg，于是发挥电工的智慧通过正则命令批量修改扩展名。

下面演示将/home/ocean/2010/下JPG文件批量修改为jpg文件.如sam_4533.JPG修改为sam_4533.jpg

1.
<code lang="bash">for file in *.JPG;do mv $file ${file%.*}.jpg;done</code>
2.
<code lang="bash">for i in *.JPG; do mv $i `basename $i .JPG`.jpg ;done</code>
3.
<code lang="bash">rename 'y/A-Z/a-z/' *  </code>
rename在不同的发行版是不同，此处的是perl-rename，还有c语言的rename
