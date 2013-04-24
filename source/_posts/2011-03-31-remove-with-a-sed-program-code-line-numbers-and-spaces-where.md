--- 
categories: 
  - Shell
comments: true
layout: post
published: true
status: publish
tags: 
  - linux
  - SED
  - vim
  - 删除行号
  - 正则表达式
  - 程序
title: 用SED删除程序代码里的行号以及空格
type: post
---
有时候在网上搜索到的程序代码复制下来后会有行号，在代码行数较少的情况下可以手动删除，遇到上百行代码的时候要是手动删除就是对体力加毅力的考验，而且不符合电工风格，于是想到使用正则表达式来实现自动删除。
分别使用VIM和SED实现删除代码里的行号以及空格，最近才开始学正则表达式，语法参数还不是很熟悉，反复调试了几次后才成功的。
1.使用VIM
vim finlname,在command模式, :%s/^[0-9][ ]*//
2.使用SED
sed -r 's/^\s*[0-9]+[ ]+//' filename >filename1
sed加-i参数可以直接修改文件，-i 后面指定扩展名则会生成备份文件，就可以不用管道命令。
AWK还不会用，学会了在补上
