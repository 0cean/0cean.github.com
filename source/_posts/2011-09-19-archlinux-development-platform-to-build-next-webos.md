--- 
categories: 
  - Linux
  - 手机数码
comments: true
layout: post
published: true
status: publish
tags: 
  - "arch linux"
  - palm
  - sdk
  - 开发环境
title: "Arch Linux下webOS开发平台的搭建"
type: post
---
作为一个02年开始使用palm的资深palm用户，对palm有着根深蒂固的感情。在palm的陪伴下，经历了高中大学的学生时代，步入社会，开始工作。palm曾经的辉煌也一去不复返，在这个物质，浮躁，快速化的世界，palm系统的单线程，简洁的特性在全球网络化的时代逐渐淡出人们的视线，随后palm公司发布了webOS，被惠普公司收购。发现跑题已经是我写技术文章的特色之一了，言归正传。

在webOS的开发网站上，针对linux环境只提供了ubuntu发行版的驱动和SDK，而我在几个月前从ubuntu阵营转向简洁轻巧的archlinux阵营。两者采用不通的包管理机制。为了让archlinux识别palm pre，需要先安装设备驱动，既然官方没有不提供，尝试用deb2targz转换失败后，只好自己动手解开deb格式的驱动，通过谷歌了解了一下deb的制作方法后，大概理解了deb的安装方式，解压出来的deb包目录下，将data目录的文件按照文件路径名复制到archlinux对应的目录下，control目录下的postinst文件是安装脚本，如下
<code lang="bash">
#!/bin/sh
#
# kill and remove OLD novacomd upstart
#
if [ -e /etc/event.d/novacomd ] ; then
stop novacomd
rm -f /etc/event.d/novacomd
fi

#
# remove novacomd from /usr/local/bin
#
if [ -e /usr/local/bin/novacomd ] ; then
rm -f /usr/local/bin/novacomd
fi

#
# check for new upstart
#
if [ -e /etc/init/rc.conf ] ; then
if [ -e /etc/init/palm-novacomd.conf ] ; then
rm -f /etc/init/palm-novacomd.conf
fi
cp -a  /opt/Palm/novacom/scripts/novacomd-conf    /etc/init/palm-novacomd.conf
elif [ -e /etc/event.d ] ; then
ln -fs /opt/Palm/novacom/scripts/novacomd-upstart /etc/event.d/palm-novacomd
fi

#
# (re)start novacomd
#
stop palm-novacomd || true
killall -v -q novacomd

start palm-novacomd || true




</code>





直接运行脚本显然是不行的，archlinux没有/etc/init/和/etc/event.d/目录，/etc/init/实际是指向/etc/rc.d/int.d/的一个符号链接文件，/etc/event.d/是ubuntu特有的upstart机制的核心目录，archlinux的服务可以通过特有的rc.conf启动，也可以通过/etc/init.d/或者/etc/rc.d/下建立脚本创建服务。了解脚本后将novacomd复制到/etc/rc.d/,novacomd.conf复制到/etc/conf.d/做完archlinux下的改动后，在终端里输入
<code lang="bash">

/etc/rc.d/novacom start


</code>


提示未找的设备，谷歌一番后在http://www.webos-internals.org/wiki/Accessing_Linux_archlinux 上发现解决方法:"novacomd doesn't work under archlinux , so we have to use ubuntu's libusb. "意想不到的是wiki中给出了一条简便方法，从aur下载网友打包好的novacom驱动，汗，之前怎么没有想到在aur里搜索一下。
<!--more-->
一番折腾后palm pre在archlinux下的驱动搞定了，解压deb驱动包的时候看到过novaterm的文件，运行后登录到手机shell，webOS是linux核心，busybox中带有linux常用命令，于是可以在电脑上查看手机的运行状态了。

<a href="http://nwy.me/wp-content/uploads/2011/09/Screenshot-ocean@ocean-laptop.png"><img class="alignnone size-medium wp-image-63017" title="Screenshot-ocean@ocean-laptop:~" src="http://nwy.me/wp-content/uploads/2011/09/Screenshot-ocean@ocean-laptop-300x211.png" alt="" width="300" height="211"></a>

显摆几张手机桌面

<a href="http://nwy.me/wp-content/uploads/2011/09/Unknown_2011-19-09_040802.png"><img class="alignnone size-medium wp-image-63018" title="Unknown_2011-19-09_040802" src="http://nwy.me/wp-content/uploads/2011/09/Unknown_2011-19-09_040802-200x300.png" alt="" width="200" height="300"></a><a href="http://nwy.me/wp-content/uploads/2011/09/Unknown_2011-19-09_040751.png"><img class="alignnone size-medium wp-image-63019" title="Unknown_2011-19-09_040751" src="http://nwy.me/wp-content/uploads/2011/09/Unknown_2011-19-09_040751-200x300.png" alt="" width="200" height="300"></a><a href="http://nwy.me/wp-content/uploads/2011/09/Unknown_2011-19-09_040742.png"><img class="alignnone size-medium wp-image-63020" title="Unknown_2011-19-09_040742" src="http://nwy.me/wp-content/uploads/2011/09/Unknown_2011-19-09_040742-200x300.png" alt="" width="200" height="300"></a>

 

 

接下来安装webOS的SDK，有了之前的经验，直接从aur搜索网友打包好的sdk，下载安装。
手机平台webOS1.45 SDK截图

<a href="http://nwy.me/wp-content/uploads/2011/09/Screenshot-SDK-1.4.5.465-320x480-Running-Oracle-VM-VirtualBox.png"><img class="alignnone size-medium wp-image-63021" title="Screenshot-SDK 1.4.5.465 (320x480) [Running] - Oracle VM VirtualBox" src="http://nwy.me/wp-content/uploads/2011/09/Screenshot-SDK-1.4.5.465-320x480-Running-Oracle-VM-VirtualBox-173x300.png" alt="" width="173" height="300"></a>

TouchPad平板 webOS3.0.2 SDk截图

<a href="http://nwy.me/wp-content/uploads/2011/09/SDK-3.0.2.652-1024x768-Running-Oracle-VM-VirtualBox_001.png"><img class="alignnone size-medium wp-image-63033" title="SDK 3.0.2.652 (1024x768) [Running] - Oracle VM VirtualBox_001" src="http://nwy.me/wp-content/uploads/2011/09/SDK-3.0.2.652-1024x768-Running-Oracle-VM-VirtualBox_001-300x247.png" alt="" width="300" height="247"></a><a href="http://nwy.me/wp-content/uploads/2011/09/SDK-3.0.2.652-1024x768-Running-Oracle-VM-VirtualBox_003.png"><img class="alignnone size-medium wp-image-63034" title="SDK 3.0.2.652 (1024x768) [Running] - Oracle VM VirtualBox_003" src="http://nwy.me/wp-content/uploads/2011/09/SDK-3.0.2.652-1024x768-Running-Oracle-VM-VirtualBox_003-300x247.png" alt="" width="300" height="247"></a>

至此，archlinux下webOS的开发环境搭建完成。
