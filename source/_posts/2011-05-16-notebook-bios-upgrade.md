--- 
categories: 
  - 生活娱乐
comments: true
layout: post
published: true
status: publish
tags: 
  - "2.29"
  - bios
  - sata
  - t61
  - 升级
  - 密码忘记
title: 升级笔记本BIOS
type: post
---
前几天看到论坛网友讨论联想官方放出T61新的BIOS，看了更新说明:，由于没有做多大的变动，就没有更新。今天看到有国外网友发布了基于这次更新BIOS的版本，做了以下修改：
1.SATA-II 3Gb/s
2.SLIC2.1
3.whitelist removed
4.Dual-IDA support
这次升级BIOS的主要原因是：破解了联想的SATA限制，SATA从1.5Gb/s上升到3Gb/s，硬盘读写速度可以从130MB/s达到260MB/s。本次升级是刻盘刷的BIOS，整个过程有惊无险。
虽然之前在Windows XP和Windows PE下刷过BIOS，不过随着年龄的增长，做事有些畏首畏尾了，觉得没必要为了节省一张刻录光盘冒风险，反正手头有一桶莱德的DVD-RW盘。整个过程有些惊险，进入BIOS关闭power on password的时候才发现自己忘记了power on password，平时用的是指纹和super password，于是拆机CMOS放电，中间不小心还把主板上CMOS电池的插座一起拔下来了，好在没有拔断针脚，又小心的插回去了。清除了power on password后，开机放入光盘后，从光盘启动，报错，提示flash over lan没有开启，又重启进BIOS设置，之后等待检测正常后开始升级BIOS，30s左右，伴随长鸣升级完成，笔记本重新启动，正常进入系统。
测试了一下硬盘的读取速度，附图
<a href="/wp-content/uploads/2011/05/Screenshot-500-GB-%E7%A1%AC%E7%9B%98-ATA-Hitachi-HTS725050A9A364-%E2%80%93-%E6%80%A7%E8%83%BD%E6%B5%8B%E8%AF%95.png"><img src="/wp-content/uploads/2011/05/Screenshot-500-GB-%E7%A1%AC%E7%9B%98-ATA-Hitachi-HTS725050A9A364-%E2%80%93-%E6%80%A7%E8%83%BD%E6%B5%8B%E8%AF%95-300x217.png" alt="" title="Screenshot-500 GB 硬盘 (ATA Hitachi HTS725050A9A364) – 性能测试" width="300" height="217" class="alignnone size-medium wp-image-62837"></a>
附下载链接:<br><a href="http://forum.notebookreview.com/lenovo-ibm/459591-t61-x61-sata-ii-1-5-gb-s-cap-willing-pay-solution-8.html">http://forum.notebookreview.com/lenovo-ibm/459591-t61-x61-sata-ii-1-5-gb-s-cap-willing-pay-solution-8.html</a>
