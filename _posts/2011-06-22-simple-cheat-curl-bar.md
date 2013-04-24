--- 
categories: 
  - Linux
comments: true
layout: post
published: true
status: publish
tags: 
  - curl
  - 命令
title: "curl 简单作弊条"
type: post
---
<div id="content">
<div class="entry">
<h5>原文出处：<a href="http://liluo.org/2011/05/curl-%E7%AE%80%E5%8D%95%E4%BD%9C%E5%BC%8A%E6%9D%A1/">http://liluo.org/2011/05/curl-%E7%AE%80%E5%8D%95%E4%BD%9C%E5%BC%8A%E6%9D%A1/</a>
</h5>
<h5>1  curl是什么？</h5>
curl 是一款命令行多协议支持的服务器访问工具,可以用它来访问HTTP服务器，就像浏览器一样。当然了，它也是可以通过FTP下载或上传文件，下次再说这块。
<h5>2 基本应用</h5>
<blockquote>curl http://www.douban.com</blockquote>
上面的命令会在屏幕上输出服务器的响应信息，需要headers信息加 -i/--include 参数，只需要headers信息可以使用 -I/--head。

重定向输出：
<blockquote>curl http://www.douban.com > response.html
curl http://www.douban.com | grep 'douban.com'</blockquote>
如果使用管道，默认会有一个进程信息显示出来，可以使用 -s/--silent 来不显示它们：
<blockquote>curl -s http://www.douban.com | grep 'douban.com'</blockquote>
如果想保存服务器返回的内容的话，除了使用 > 重定向到一个文件外，还可以使用 -o/--output 参数指定需要保存到的文件：
<blockquote>curl http://www.douban.com -o response.html</blockquote>
非文本文件也能这样保存：
<blockquote>curl http://img3.douban.com/pics/nav/lg_main_a7.png -o logo.png</blockquote>
原名保存使用 -O/--remote-name 选项：
<blockquote>curl http://img3.douban.com/pics/nav/lg_main_a7.png -O</blockquote>
不过豆瓣的图片有简单的防盗链，所以可能下载不成功 : ( 继续往下看
<h5>
<!--more-->3   发送数据</h5>
GET 方法的请求没什么特殊的，直接在 url 中放上数据就可以了：
<blockquote>curl http://www.douban.com/?name=luo
curl http://www.douban.com/?name=小落</blockquote>
POST 方法的话就需要使用 -d/--data 参数，只要有这个参数，即使值是空字符串，那么出去的就是 POST 方法的访问：
<blockquote>curl -d 'name=luoluo&passwd=*****' http://www.douban.com</blockquote>
<h5>4   头部信息</h5>
先说最常构造的两个 User-Agent 和 Referer ，这两个分别使用 -A/--user-agent 和 -e/--referer 来指定：
<blockquote>curl -A Chrome http://www.douban.com
curl -e http://liluo.org http://www.douban.com</blockquote>
包含这两个头部信息，所有的头部信息参数都可以使用 -H/--header 来设置：
<blockquote>curl -H Referer:http://liluo.org http://www.douban.com
curl -H User-Agent:Chrome -H Accept-Language:zh-cn http://www.douban.com</blockquote>
<h5>5   COOKIE控制</h5>
curl 是可以支持带 cookie 的交互行为的。使用方式是 -D/--dump-header 用于指定一个文件保存获取到的 cookie 信息（实际上包含了整个头部信息）， 然后用 -b/--cookie 指定一文件用于读取保存的 cookie 。
<blockquote>curl http://www.douban.com -D cookie.txt
curl http://www.douban.com -b cookie.txx</blockquote>
-D 保存出来的头部信息就是以纯文本形式存放的，所以，你可以方便地随便修改。
<h5>6   代理和通配符</h5>
6.1   代理设置

使用 -x/--proxy 参数：
<blockquote>curl -x http://web.proxy.url http://www.douban.com</blockquote>
6.2   通配符
<blockquote>curl -O http://www.douban.com/~liluo/screen[1-10].jpg
curl -O http://www.douban.com/~{liluo,luoluo}/[001-201].jpg</blockquote>
反向引用分组：
<blockquote>curl -o #2_#1.jpg http://www.douban.com/~{liluo,luo}/[001-201].jpg</blockquote>
</div>
</div>
