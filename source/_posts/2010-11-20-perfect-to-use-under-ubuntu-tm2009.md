--- 
categories: 
  - Linux
comments: true
excerpt: |-
    虽然在经历了3Q大战后，许多朋友放弃QQ，只用MSN，如果都用MSN或Gtalk问题就简单了，遗憾的是周边还有不少的朋友还在用QQ，于是我转移到linux下仍然想着如何继续使用QQ。
    
    在Linux下使用QQ常见的方法有四种：
    
    方法一：使用腾讯官方的QQ for linux，这还是beta版，腾讯放出这个版本后可能发现linux用户都不怎么用QQ，下载量没有达到预期的数值，于是搁浅这个项目，用腾讯官方版会产生的后果是QQ好友会抱怨你为什么频繁上线，为什么发的消息不回，原因是你登录QQ上去后还没有看到消息，程序就崩溃消失了，再次登录你会发现之前的聊天记录也没有了，工作中用到QQ或有女朋友的linux用户强烈不建议使用腾讯的QQ for linux。
layout: post
published: true
status: publish
tags: 
  - tm2009
  - ubuntu
  - wine
title: Ubuntu下完美使用TM2009
type: post
---
虽然在经历了3Q大战后，许多朋友放弃QQ，只用MSN，如果都用MSN或Gtalk问题就简单了，遗憾的是周边还有不少的朋友还在用QQ，于是我转移到linux下仍然想着如何继续使用QQ。

在Linux下使用QQ常见的方法有四种：

方法一：使用腾讯官方的QQ for linux，这还是beta版，腾讯放出这个版本后可能发现linux用户都不怎么用QQ，下载量没有达到预期的数值，于是搁浅这个项目，用腾讯官方版会产生的后果是QQ好友会抱怨你为什么频繁上线，为什么发的消息不回，原因是你登录QQ上去后还没有看到消息，程序就崩溃消失了，再次登录你会发现之前的聊天记录也没有了，工作中用到QQ或有女朋友的linux用户强烈不建议使用腾讯的QQ for linux。

方法二：使用EVA，这是一个基于GTK的通讯软件，支持QQ登录，不过在ubutun10.10下，从源里安装会经常出现和QQ for linux一样的问题，登录的程序就崩溃了，建议使用网上流传的eva_0.4.921bugfix58_etch_i386，这个版本修复了登录后会崩溃的bug，不过需要注意的是系统更新的时候的时候不要更新EVA否则就会出现之前的问题。

方法三：使用virtualbox虚拟windows系统，在windows系统里使用qq，这个方法是目前最稳定的方法，不过有网友真的这样做的话，我建议这样的网友还是用会windows系统。

方法四：这是本文的重点，通过wine来实现ubuntu下QQ的登录，wine是这个方法网上的许多教程，不过都是安装QQ而不是TM，网友尝试发现通过wine安装TM后，程序无法登录，运行后就会崩溃，不过本人windows平台下一直再用TM，转而用QQ一时无法适应，而且程序在打开群聊天的时候会经常无响应，以及最小化到托盘后无法呼出主界面，总之用的很郁闷，于是决定另辟蹊径尝试安装TM。

在尝试了诸多版本的TM后，发现之前U盘PE里经常用的一款单文件TM，所谓单文件TM其实是将TM程序文件目录里不可取少的文件做成一个exe自释放文件，这个单文件TM在运行的时候不会立刻崩溃，不过因为单文件，做过一些精简，如果不安装必要的运行库是无法运行的，这涉及到wine以及winetricks，这些会单独写一篇博客作为笔记。

<a href="/wp-content/uploads/2010/11/Screenshot-4.png"><img class="alignnone size-medium wp-image-62128" title="Screenshot-4" src="/wp-content/uploads/2010/11/Screenshot-4-260x300.png" alt="" width="260" height="300"></a>
