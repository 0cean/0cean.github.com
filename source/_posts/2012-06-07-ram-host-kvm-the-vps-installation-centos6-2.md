--- 
categories: 
  - Linux
comments: true
layout: post
published: true
status: publish
tags: 
  - "6.2"
  - centos
  - console
  - ip配置
  - kvm
  - ramhost
  - vps
title: "RAM Host的KVM VPS安装CentOS6.2"
type: post
---
RAM Host的VPS由于站长也是Linux技术大牛，做过优化，即使低端配置性能也不错，所以销量一直很好，加上站长不超售的原则，往往一放出就告罄，上周末终于抢到一个。购买的时候因为开着代理，被Ram Host的订单系统检测到当作风险订单处理了，最后发ticket和站长解释了一番天朝的网络环境才订单才得以通过。
这次买的是RAM Host的Premium West Coast Los Angeles Virtual Dedicated Server的Standard VPS，512MB内存，这个机房的VPS都是KVM的，没有部署站长优化过得系统，需要先在VPS管理面板里选择引导安装系统的镜像ISO。
<a href="http://nwy.me/wp-content/uploads/2012/06/%E9%80%89%E5%8C%BA_002.png"><img src="http://nwy.me/wp-content/uploads/2012/06/%E9%80%89%E5%8C%BA_002-300x228.png" alt="" title="系统选择" width="300" height="228" class="aligncenter size-medium wp-image-63200"></a>
VNC连接主机后进Console，需要注意的是VPS管理面板里VM Console页面给的连接端口是随机的。
<a href="http://nwy.me/wp-content/uploads/2012/06/QEMU-oceannan-%E5%9C%A8-2012-06-07-003459-%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png"><img src="http://nwy.me/wp-content/uploads/2012/06/QEMU-oceannan-%E5%9C%A8-2012-06-07-003459-%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE-300x166.png" alt="" title="QEMU (oceannan) 在 2012-06-07 00:34:59 的屏幕截图" width="300" height="166" class="aligncenter size-medium wp-image-63201"></a>
这部分就不一一截图了，一路空格加回车，然后重启。
登录系统后需要先配置ip，修改对应网卡的网关的配置文件，
<code>vi /etc/sysconfig/network </code>
设置本机连接的网关的IP地址,在VPS管理面板里有给出，加入一行：
<code>GATEWAY=10.0.0.1</code>
修改对应网卡的IP地址的配置文件：
<code>vi /etc/sysconfig/network-scripts/ifcfg-eth0</code>
修改以下内容
DEVICE=eth0 #描述网卡对应的设备别名，例如ifcfg-eth0的文件中它为eth0
BOOTPROTO=static #设置网卡获得ip地址的方式，可能的选项为static，dhcp或bootp，分别对应静态指定的 ip地址，通过dhcp协议获得的ip地址，通过bootp协议获得的ip地址
BROADCAST=192.168.0.255 #对应的子网广播地址
HWADDR=00:03:E8:04:D8:B3 #对应的网卡物理地址
IPADDR=192.168.1.2 #如果设置网卡获得 ip地址的方式为静态指定，此字段就指定了网卡对应的ip地址
NETMASK=255.255.255.0 #网卡对应的网络掩码
NETWORK=192.168.1.0 #网卡对应的网络地址
IPV6INIT=no
IPV6_AUTOCONF=no
ONBOOT=yes #系统启动时是否设置此网络接口，设置为yes时，系统启动时激活此设备
重启网络，使刚才的设置生效。
<code>service network restart</code>
至此Centos6.2就安装完成了。
