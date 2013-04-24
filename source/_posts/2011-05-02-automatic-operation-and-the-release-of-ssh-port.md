--- 
categories: 
  - Linux
comments: true
layout: post
published: true
status: publish
tags: 
  - linux
  - ssh
  - ubuntu
  - 端口释放
  - 自动运行
title: SSH自动运行以及端口释放
type: post
---
由于某墙的原因，之前一直在使用vpn代理国外的网站。由于vpn是全局代理，开了vpn后会影响访问国内网站的速度，甚至有些国内网络服务屏蔽了国外IP，因此还需要配置路由表，访问国外网站的走vpn，国内网站走本地网络。目前改用ssh代理，ssh端口转发配合firefox的autoproxy的实现socks 5代理。autoproxy的自动模式可以根据已有规则对被墙掉的网站自动代理。
ssh连接每次输入密码很麻烦，索性生成ssh证书用ssh-copy-id 将本地证书上传服务器，这样每次ssh连接验证证书就不用输入密码，不过这样做的缺点是降低了安全性，可能会造成证书泄漏。手动SSH连接也很麻烦，而且ssh掉线或超过Idle时间被ssh服务端踢出后不会自动连接，虽然可以通过脚本定时查看SSH进程是否存在自动重连，但遇到隧道假死也就没办法了，好在后来发现一个小工具autossh可以实现SSH自动连接，于是写了一个脚本，开机自动运行：
<code>export AUTOSSH_LOGLEVEL=7
export AUTOSSH_DEBUG=DEBUG
export AUTOSSH_LOGFILE=~/.autossh.log
autossh -M 2000 -N -f -q -D 127.0.0.1:7070 user@hostname</code>
autossh支持环境变量，具体参考 http://www.harding.motd.ca/autossh/README ，上面的脚本里指定了debug级别以及debug log存放路径。
但是每次系统挂起或休眠后再唤醒ssh代理就失效了，查看autossh.log发现是端口占用问题,直接结束占用端口的ssh，重新运行脚本。此处因为
知道是什么进程占用哪个端口，所以可以直接结束。如果遇到未知的程序占用问题，可以用下列方法查看
<code>lsof -i :port
netstat -an |grep port
fuser -n tcp/udp port</code>
查到后kill掉就可以释放端口，如果是释放mysq的端口则建议使用kill结束指定占用端口的进程而不要killall mysql程序，否则可能会产生数据库碎片。

后续:我写的ssh自动运行脚本是通过系统的启动运行程序来是实现开机自动运行，所以会导致挂起或休眠后再次唤醒ssh隧道无法使用提示端口占用
Ubuntu下写daemon脚本有两个选择，一种是写传统的/etc/init.d下的脚本，另一种就是Ubuntu特有的upstart脚本。
upstart是Ubuntu设计用来替换传统的SysV init的软件。upstart的daemon脚本除了更加简洁之外，还支持服务的自动唤醒（respawn）。这样autossh本身如果出错退出了，也会立即被upstart唤醒。避免autossh出错退出导致ssh隧道无法访问。
