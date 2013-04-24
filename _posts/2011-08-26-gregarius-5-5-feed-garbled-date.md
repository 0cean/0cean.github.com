--- 
categories: 
  - PHP
comments: true
layout: post
published: true
status: publish
tags: 
  - feed
  - Gregarius
  - 乱码
title: "Gregarius 5.5 feed更新日期乱码问题"
type: post
---
之前安装Gregarius的时候就注意到页面footer部分显示的feed更新时间会乱码，Gregarius对中文的支持很差，后台问题更多。

解决方法：找到util.php文件，做如下改动：
<code lang="php">function rss_locale_date ($fmt, $ts, $addTZOffset = true) {
    if (isset($_SERVER["WINDIR"])) {
            //%e doesnt’ exists under windows!
            $fmt=str_replace("%e","%#d",$fmt);
        }
     
    if ($addTZOffset) {
            return iconv("UTF-8", "utf-8", strftime($fmt, $ts +3600 * getConfig 
    (‘rss.config.tzoffset’)));
        }   
        return iconv("UTF-8", "utf-8", strftime($fmt, $ts));
        //return utf8_encode(strftime($fmt, $ts));
}</code>
