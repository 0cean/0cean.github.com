--- 
categories: 
  - Linux
comments: true
layout: post
published: true
status: publish
tags: 
  - mp3乱码
  - rhythmbox
title: Rhythmbox播放mp3乱码问题
type: post
---
<div>rhythmbox在更新了本地的mp3文件后会有许多mp3文件在播放列表里显示乱码，原因是软件对mp3文件的id3等标签里的中文信息不识别导致的。通过如下方法可以解决问题。</div>
<div>1:安装mid3iconv，在终端里输入：</div>
<div style="font-family: &amp;amp; color: #dcdccc; background-color: #3f3f3f;"><span style="color: #dcdccc;">ocean@ocean-laptop:~$ sudo apt-get install python-mutagen</span></div>
<div>2:将本地音频文件的id3标签全部转换为gbk，在终端里通过cd命令转到你的MP3目录，输入：</div>
<div style="font-family: &amp;amp; color: #dcdccc; background-color: #3f3f3f;"><span style="color: #dcdccc;">ocean@ocean-laptop:~/Data/Music$mid3iconv -e GBK *.mp3</span></div>
<div>如果本地的mp3目录包含子目录，可需要将第二步里的命令改成如下格式：</div>
<div style="font-family: &amp;amp; color: #dcdccc; background-color: #3f3f3f;"><span style="color: #dcdccc;">ocean@ocean-laptop:~/Data/Music$mid3iconv -e GBK */*.mp3</span></div>
<div>

3.运行rhythmbox后重新导入本地mp3文件
<div>方法一的拓展:</div>
<div style="font-family: &amp;amp; color: #dcdccc; background-color: #3f3f3f;">sudo apt-get install convmv iconv python-mutagen
#文件名由GBK转换为UTF8
convmv -r -f cp936 -t utf8 --notest --nosmart *
#文件内容由GBK到UTF8
iconv -f gbk -t utf8 $i > newfile
#将 mp3 标签编码 由GBK转换至utf-8
find . -iname "*.mp3" -execdir mid3iconv -e GBK {} \;
#或 mid3iconv -e GBK ×/*.mp3
# find . \( -iname "*.mp3" -o -iname "*.wma" \) -exec mid3iconv -e</div>
</div>
<div>推荐第二种方法:</div>
<div>二，修改变量法
以用gstreamer做后端的播放器Rhythmbox为例，可以在系统环境变量或用户的环境变量中增加如下内容：
vim .profile</div>
<div style="font-family: &amp;amp; color: #dcdccc; background-color: #3f3f3f;">
<div>export GST_ID3_TAG_ENCODING=GBK:UTF-8:GB18030
export GST_ID3V2_TAG_ENCODING=GBK:UTF-8:GB18030</div>
</div>
保存修改后注销一次电脑,运行Rhythmbox重新导入音频文件.
