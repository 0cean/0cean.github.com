--- 
categories: 
  - Linux
comments: true
excerpt: "GCC一套由GNU开发的编程语言编译器。它是一套以GPL及LGPL许可证所发行的自由软件，也是GNU计划的关键部分，亦是自由的类Unix及苹果电脑Mac OS X 操作系统的标准编译器。GCC（特别是其中的C语言编译器）也常被认为是跨平台编译器的事实标准。"
layout: post
published: true
status: publish
tags: 
  - c程序
  - gcc
  - 程序员
  - 编译
title: Linux下的C程序编译与运行
type: post
---
在windows平台下编译c程序有诸多选择，作为初学者用的最多的是onboard公司的turboc，微软的visual studio系列，（这个举例不是很恰当，turboc是基于命令行的c语言编译器，而VS则是IDE集成开发环境，这一点需要说明）这些都不是本文的重点，如前文所说，本人将学习环境迁移到ubuntu下，所以面临如何在linux下编译c程序，古语曰：工欲善其事，必先利其器，gcc则是inux下最著名的c程序编译器也是系统默认的编译器，而linux下的cc是gcc的符号链接，可以通过$ls –l /usr/bin/cc来简单察看.而编译时看到的控制台输出CC则是一个指向gcc的变量，该变量是make程序的内建变量，就算你在Makefile 中没有CC= ，该变量也会存在，并默认指向gcc。cc的符号链接和变量存在的意义在于源码的移植性，可以方便的用GCC来编译老的用cc编译的unix软件，甚至连 Makefile都不要改。而且也便于linux程序在unix下编译。gcc的全称是Gnu   Compiler   Collection，它包括多个程序的编译器（C,   C++,   Objective-C,   Ada,   Fortran,and   Java），gcc根据文件扩展名自动识别并调用对应的编译器，具体可查阅$man gcc。
GCC一套由GNU开发的编程语言编译器。它是一套以GPL及LGPL许可证所发行的自由软件，也是GNU计划的关键部分，亦是自由的类Unix及苹果电脑Mac OS X 操作系统的标准编译器。GCC（特别是其中的C语言编译器）也常被认为是跨平台编译器的事实标准。
gcc的安装，不确定自己是否安装可以执行以下命令。

sudo apt-get install build-essential

在写c程序的编辑器方面可以选择emacs或vim，也可用gedit或medit，这取决于你的爱好，这里不做更多的讨论。

gcc   命令的常用选项

<!--more-->
选项                                                解释
-ansi                                             只支持   ANSI   标准的   C   语法。这一选项将禁止   GNU   C   的某些特色， 例如   asm   或   typeof   关键词。
-c                                                     只编译并生成目标文件。
-DMACRO                                   以字符串“1”定义   MACRO   宏。
-DMACRO=DEFN                   以字符串“DEFN”定义   MACRO   宏。
-E                                                     只运行   C   预编译器。
-g                                                     生成调试信息。GNU   调试器可利用该信息。
-IDIRECTORY                           指定额外的头文件搜索路径DIRECTORY。
-LDIRECTORY                          指定额外的函数库搜索路径DIRECTORY。
-lLIBRARY                                  连接时搜索指定的函数库LIBRARY。
-m486                                          针对   486   进行代码优化。
-o   FILE                                      生成指定的输出文件。用在生成可执行文件时。
-O0                                                不进行优化处理。
-O   或   -O1                            优化生成代码。
-O2                                                进一步优化。
-O3                                                比   -O2   更进一步优化，包括   inline   函数。
-shared                                      生成共享目标文件。通常用在建立共享库时。
-static                                        禁止使用共享连接。
-UMACRO                                   取消对   MACRO   宏的定义。
-w                                                   不生成任何警告信息。
-Wall                                             生成所有警告信息。

个人强烈建议在编译程序的时候使用-Wall，-Wall参数可以生成所有警告信息，可以准确的调试程序，捕捉错误，-g也可以加上，注意如果有用到math.h库等非gcc默认调用的标准库，请使用-lm参数。

gcc的how to中文翻译

<a href="http://www.lslnet.com/linux/books/howto/GCC-HOWTO.html#">http://www.lslnet.com/linux/books/howto/GCC-HOWTO.html#</a>
<a title="Permalink to Linux之GCC经典入门教程" rel="bookmark" href="http://www.ha97.com/2884.html">Linux之GCC经典入门教程</a>
<a href="http://www.cublog.cn/u/13991/showart.php?id=96714"><span style="color: #000066;"><strong>GCC笔记</strong></span></a>

注：红字部分摘自维基百科gcc条目
