--- 
categories: 
  - Linux
comments: true
excerpt: "Conky是一种自由软件，用于X视窗系统的系统监视，可以在FreeBSD、OpenBSD和各种Linux发布上使用的自由软件。Conky具有很高的可配置性，可以监视许多系统参数，如：CPU、内存、交换内存、硬盘使用情况等状态；各种硬件的温度；系统的进程（top）；网络状态；电池电量；系统信息和邮件收发；各种音乐播放器MPD、XMMS2、BMPx、Audacious）的控制。不像其他系统监视器那样需要高级别的部件工具箱（widget toolkits）来渲染他们的信息，Conky可以直接在X视窗下渲染，这意味着在相同配置下Conky可以消耗更少的资源。"
layout: post
published: true
status: publish
tags: 
  - conky
  - ubuntu
title: Ubuntu下的conky配置
type: post
---
Conky是一种自由软件，用于X视窗系统的系统监视，可以在FreeBSD、OpenBSD和各种Linux发布上使用的自由软件。Conky具有很高的可配置性，可以监视许多系统参数，如：CPU、内存、交换内存、硬盘使用情况等状态；各种硬件的温度；系统的进程（top）；网络状态；电池电量；系统信息和邮件收发；各种音乐播放器MPD、XMMS2、BMPx、Audacious）的控制。不像其他系统监视器那样需要高级别的部件工具箱（widget toolkits）来渲染他们的信息，Conky可以直接在X视窗下渲染，这意味着在相同配置下Conky可以消耗更少的资源。

<span style="color: #ff0000;">本文的最后提供了截图中的conky配置文件以及桌面的下载.</span>

安装conky

ocean@ocean-ThinkPad-T61:~$ sudo apt-get install conky

conky默认没有提供配置文件，需要使用者手动创建配置：

ocean@ocean-ThinkPad-T61:~$ gedit<code> ~/.conkyrc</code>

复制下面的代码,并保存,在终端运行conky
<blockquote>
<pre># .conkyrc - Edited from Russian Conky from Gnome-Look.org
# Edited by Alpha-Thinker
# Made specifically for the Lenovo T61 with NVIDIA Quadro NVS 140M discrete graphics

# --- Window Layout & Options --- #
own_window yes
own_window_colour brown
own_window_transparent yes
own_window_type normal
own_window_transparent yes
own_window_hints undecorated,below,sticky,skip_taskbar,skip_pager
double_buffer yes
use_spacer right
use_xft yes
alignment top_right
gap_x 20
gap_y 45

# --- Colours, Sizes, Fonts & Margins --- #
update_interval 1.0
maximum_width 250
stippled_borders 3
border_margin 9
border_width 10
default_color white

# --- Text --- #
draw_outline no
draw_borders no
font Sans:size=8:weight=bold
uppercase no
draw_shades yes
override_utf8_locale yes

TEXT
${font Sans:size=14:weight=bold}${color red} ${alignc} ${time %r}
${font Sans:size=11:weight=bold}${color white} ${alignc} ${time %A} ${time %e} ${time %B} ${time %G}

${font Sans:size=9:weight=bold}${color orange}SYSTEM INFO${hr 2}$color${font Sans:size=8:weight=bold}
${color orange}Machine$color Thinkpad T61 ${alignr}${color orange} Uptime$color $uptime
${color orange}Kernel$color  $kernel ${alignr}${color orange}Type$color $machine

${font Sans:size=9:weight=bold}${color orange}Processor ${hr 2}$color
${font Arial:bold:size=8}${color #ff0000}${execi 99999 cat /proc/cpuinfo | grep "model name" -m1 | cut -d":" -f2 | cut -d" " -f2- | sed 's#Processor ##'}$font$color
${color orange}Speed:$color${execi 20 sensors |grep "Core0 Temp" | cut -d" " -f4}$font$color$alignr${freq_g 2}Ghz         ${color #c0ff3e}${execi 20 sensors |grep "Core1 Temp" | cut -d" " -f4}  $color${alignr}${color orange}Processes:$color $running_processes/ $processes

${font Sans:size=9:weight=bold}${color orange}CPU Usage ${hr 2}$color
${color white}Core 1   ${color red}${cpu cpu0}%           ${color white}Core 2   ${color red}${cpu cpu1}% $color
${cpugraph cpu0 25,120 000000 ff6600 }  ${cpugraph cpu1 25,120 000000 ff6600 }
${font Sans:size=8:weight=bold}${color red}CPU Temp${color white}              ${acpitemp}小$color
${font Sans:size=8:weight=bold}${color red}NVIDIA GPU Temp ${color white}  ${execi 30 nvidia-settings -q gpucoretemp | grep '):' | awk '{print $4}' | cut -c -2} C$color
${font Sans:size=8:weight=bold}${color red}FAN SPEED${color white}             ${ibm_fan} rpm$color

${font Sans:size=9:weight=bold}${color orange}TOP 5 CPU Users ${hr 2}$color${font Sans:size=8:weight=bold}${color #ff0000}
Process                          ${alignr}ID      ${alignr}CPU  $color
1. ${top name 1}     ${alignr}${top pid 1}   ${alignr}${top cpu 1}
2. ${top name 2}     ${alignr}${top pid 2}   ${alignr}${top cpu 2}
3. ${top name 3}     ${alignr}${top pid 3}   ${alignr}${top cpu 3}
4. ${top name 4}     ${alignr}${top pid 4}   ${alignr}${top cpu 4}
5. ${top name 5}     ${alignr}${top pid 5}   ${alignr}${top cpu 5}

${font Sans:size=9:weight=bold}${color orange}TOP 5 RAM Users ${hr 2}$color${font Sans:size=8:weight=bold}${color #ff0000}
Process                             ${alignr}ID      ${alignr}RAM $color
1. ${top_mem name 1}     ${alignr}${top_mem pid 1}   ${alignr}${top_mem mem 1}
2. ${top_mem name 2}     ${alignr}${top_mem pid 2}   ${alignr}${top_mem mem 2}
3. ${top_mem name 3}     ${alignr}${top_mem pid 3}   ${alignr}${top_mem mem 3}
4. ${top_mem name 4}     ${alignr}${top_mem pid 4}   ${alignr}${top_mem mem 4}
5. ${top_mem name 5}     ${alignr}${top_mem pid 5}   ${alignr}${top_mem mem 5}

${font Sans:size=9:weight=bold}${color orange}RAM & SWAP ${hr 2}$color${font Sans:size=8:weight=bold}
${color white}RAM$color  ${memperc}%  ${color #ff6600}${membar 3.180}
${color white}SWAP$color  ${swapperc}%  ${color #ff6600}${swapbar 3.180}

${font Sans:size=9:weight=bold}${color orange}LAN (IP: ${addr eth0}) ${hr 2}$color${font Sans:size=8:weight=bold}
${color white}Down$color ${downspeed eth0}/s${alignr}${color white}Up$color${alignr}    ${upspeed eth0}/s
${downspeedgraph eth0 25,120 000000 00ff00} ${alignr}${upspeedgraph eth0 25,120 000000 ff0000}$color
${font Sans:size=9:weight=bold}${color orange}Wi-fi (IP: ${addr wlan0}) ${hr 2}$color${font Sans:size=8:weight=bold}
${color white}Down$color ${downspeed wlan0}/s${alignr}${color white}Up$color${alignr}    ${upspeed wlan0}/s
${downspeedgraph wlan0 25,120 000000 00ff00} ${alignr}${upspeedgraph wlan0 25,120 000000 ff0000}$color
${font Sans:size=9:weight=bold}${color orange}GSM/3G (IP: ${addr ppp0}) ${hr 2}$color${font Sans:size=8:weight=bold}
${color white}Down$color ${downspeed ppp0}/s${alignr}${color white}Up$color${alignr}    ${upspeed ppp0}/s
${downspeedgraph ppp0 25,120 000000 00ff00} ${alignr}${upspeedgraph ppp0 25,120 000000 ff0000}$color
</pre>
</blockquote>
本文最后有文章中的截图的conky配置文件的下载，如果想更进一步定制需要使用者自己动手，当然网上论坛也有大量的配置可以参考。

配置的语法定义在软件官方网站有说明，在本地"/usr/share/doc/conky-all/"路径下也有帮助文档。

一些网友提供的配置截图以及相应的配置文件，http://conky.sourceforge.net/screenshots.html

附一张自己定制的conky截图

<a href="/wp-content/uploads/2010/11/0cean.jpg"><img class="alignnone size-medium wp-image-62054" title="ocean" src="/wp-content/uploads/2010/11/0cean-97x300.jpg" alt="" width="97" height="300"></a><a href="/wp-content/uploads/2010/11/conky.png"><img class="alignnone size-medium wp-image-62058" title="conky" src="/wp-content/uploads/2010/11/conky-300x225.png" alt="" width="300" height="225"></a>

右边的截图是网友评论最帅的conky配置，配置文件见 <a rel="nofollow" href="http://blog.brixandersen.dk/?p=67">http://blog.brixandersen.dk/?p=67</a>

配置文件下载:<a href="../wp-content/uploads/2010/11/conkyrc.tar.gz">.conkyrc.tar</a>

壁纸下载:<a href="/wp-content/uploads/2010/11/conky.tar.gz">conky.tar</a>

conky默认不会开机自动运行可以创建一个文件,复制下面的内容,并保存为myconky.sh,在系统/首选项/启动应用程序里添加这个文件,延迟十五秒是为了避免conky先于Gonme运行,而无法显示.
<blockquote>#!/bin/bash
sleep 15 && conky</blockquote>
