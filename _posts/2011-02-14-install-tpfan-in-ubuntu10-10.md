--- 
categories: 
  - Linux
comments: true
layout: post
published: true
status: publish
tags: 
  - t61
  - tpfan
  - ubuntu
title: 在ubuntu10.10下安装tpfan
type: post
---
tpfan的最后一个版本0.96,只适用于ubuntu9.04，本文是基于T61而写。

1.下载tpfan的deb文件，http://ppa.launchpad.net/tp-fan/ppa/ubuntu/pool/main/t/tpfan-admin/tpfan-admin_0.96-ubuntu1_all.deb

2.解压后修改debian文件夹中的control文件，将“python-gnome2-desktop”替换为“python-gnome2-desktop-dev”

3.重写打包
<pre>dpkg-deb -D --build tpfan-admin_0.96-ubuntu1_all</pre>
4.安转

5.修改/usr/lib/python2.6/dist-packages/tpfand/settings.py7. 替换行 170-174
<pre>self.product_id = None
self.product_name = None
self.product_pretty_vendor = None
self.product_pretty_name = None
self.product_pretty_id = None</pre>
替换为
<pre>self.product_id = ""
self.product_name = ""
self.product_pretty_vendor = ""
self.product_pretty_name = ""
self.product_pretty_id = ""</pre>
6.
<pre>sudo /etc/init.d/tpfand restart</pre>
