--- 
categories: 
  - Linux
comments: true
layout: post
published: true
status: publish
tags: 
  - usb
  - virtualbox
title: 解决virtualbox访问usb子系统失败问题的方法
type: post
---
安装virtualbox后运行虚拟机后发现usb不能识别，提示：

Could not load the Host USB Proxy Service (VERR_FILE_NOT_FOUND). The service might be not installed on the host computer. 

Result Code: 
0x80004005 
Component: 
Host 
Interface: 
IHost {81729c26-1aec-46f5-b7c0-cc7364738fdb} 
Callee: 
IMachine {31f7169f-14da-4c55-8cb6-a3665186e35e} 

在网上看到许多方法，都需要修改 /etc/fstab ，实际上最新版的virtualbox已经解决了这些问题，只需要将当前用户添加到vboxusers组：
<code>sudo  useradd -g  用户名 vboxusers
</code>
然后重启电脑，就可以在虚拟机里使用usb
