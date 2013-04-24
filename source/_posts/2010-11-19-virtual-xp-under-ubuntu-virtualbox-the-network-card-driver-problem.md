--- 
categories: 
  - Linux
comments: true
layout: post
published: true
status: publish
tags: 
  - adapter
  - ubuntu
  - virtualbox
  - 网卡
title: Ubuntu下VirtualBox虚拟XP之网卡驱动问题
type: post
---
由于一些软件以及网银只能在Windows平台下使用，在Ubuntu下只能通过虚拟windows系统来实现。继之前彻底把windows从硬盘里删除后，昨天重新把硬盘分区，在漫长的复制备份出去的120G数据的过程中，索性配置ubuntu，安装常用的软件，在virtualbox里装好XP后发现网卡驱动没有装好，于是在网上找virtualbox虚拟出来的amd pcnet这款的驱动，耗时半个小时，找到的都是linux下的驱动，期间还被google的搜索结果误导访问了一个国外虚假骗钱的垃圾网站，看资料介绍虚拟机采用这款网卡原因是考虑其良好的兼容性，于是想到windows系统应该会集成了该驱动，虽然之前在安装驱动的时候尝试了系统自动安装驱动的选项，但提示没有找到，于是决定采用半手动的方式安装驱动。具体操作步骤如下：

1.在设备光管理器网卡选项上右键选择从列表指定位置安装，在下一步中选择“不要安装，我要自己选择安装的驱动程序”，如图选择“amd pcnet family pci ethernet adapter",单击下一步，问题解决。

<a href="/wp-content/uploads/2010/11/Screenshot-1.png"><img class="alignnone size-medium wp-image-62124" title="Screenshot-1" src="/wp-content/uploads/2010/11/Screenshot-1-300x217.png" alt="" width="300" height="217"></a>
