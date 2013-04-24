--- 
categories: 
  - Linux
comments: true
excerpt: "最近经历了种种事情，索性脱离Windows平台，彻底扎根在linux平台，原来的双系统共存变成了Linux独占天下。格式化了硬盘的几个 Windows分区重新安装Linux，分区的时候，单独把tmp和home挂载到了两个格式化的独立分区上，usr有没有挂载到独立分区竟然没有印象了，看来睡眠不足会影响记忆力。这几天安装好后常用的软件，做了相应的配置后发现不能休眠了，Linux真不给力。"
layout: post
published: true
status: publish
tags: 
  - uswsusp
  - 休眠
title: Linux休眠问题
type: post
---
<span style="font-size: small;">最近经历了种种事情，索性脱离Windows平台，彻底扎根在linux平台，原来的双系统共存变成了Linux独占天下。格式化了硬盘的几个Windows分区重新安装Linux，分区的时候，单独把tmp和home挂载到了两个格式化的独立分区上，usr有没有挂载到独立分区竟然没有印象了，看来睡眠不足会影响记忆力。这几天安装好后常用的软件，做了相应的配置后发现不能休眠了，Linux真不给力。</span>

<span style="font-size: small;">技术水平有限，</span>没有找到有原因，不过意外的注意到uswsusp， 这是利用了 2.6.17-rc2 以来的 kernel 新特性所开发的 userland 的挂起系统的工具。uswsusp 利用了系统提供的一个设备文件，通过操作文件，可以 freeze 系统中的进程、读取/恢复内存的镜像、挂起等。这个工具需要 initramfs 支持，需要 2.6.17-rc2 以上内核。参考文档：http://suspend.sourceforge.net/

安装uswsusp：
<div class="source" style="font-family: &amp;amp; color: #dcdccc; background-color: #3f3f3f;"><span style="color: #dcdccc;">ocean@ocean-ThinkPad-T61:~$ sudo apt-get install uswsusp</span></div>
安装后开机会显示过程中会显示：resume: libgcrypt version: 1.4.4

<span style="font-size: small;">在终端里通过s2ram命令休眠会有如下提示：</span>
<div style="font-family: &amp;amp; color: #dcdccc; background-color: #3f3f3f;">
<span style="color: #dcdccc;">ocean@ocean-ThinkPad-T61:~$ sudo s2ram</span>
<span style="color: #dcdccc;">[sudo] password for ocean:</span>
<span style="color: #dcdccc;">Machine is unknown.</span>
<span style="color: #dcdccc;">This machine can be identified by:</span>
<span style="color: #dcdccc;">sys_vendor   = "LENOVO"</span>
<span style="color: #dcdccc;">sys_product  = "7661WH2"</span>
<span style="color: #dcdccc;">sys_version  = "ThinkPad T61"</span>
<span style="color: #dcdccc;">bios_version = "7LETC6WW (2.26 )"</span>
<span style="color: #dcdccc;">See http://suspend.sf.net/s2ram-support.html for details.</span>
<span style="color: #dcdccc;">If you report a problem, please include the complete output above.</span>
</div>
不过加了--force参数倒是可以休眠了，暂时就这样，明天起来了去看看上面代码里给出的链接里有没有解决方法可参考。

使 Gnome(或者说Hal)改用uswsusp方法休眠
代码:
<div class="source" style="font-family: &amp;amp; color: #dcdccc; background-color: #3f3f3f;"><span style="color: #dcdccc;">ocean@ocean-ThinkPad-T61:~$ sudo su</span></div>
<div class="source" style="font-family: &amp;amp; color: #dcdccc; background-color: #3f3f3f;">root@ocean-ThinkPad-T61# echo "SLEEP_MODULE=uswsusp">/etc/pm/config.d/module</div>
