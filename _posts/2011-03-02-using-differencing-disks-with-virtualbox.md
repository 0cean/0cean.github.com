--- 
categories: 
  - 转载
comments: true
excerpt: "When evaluating new software, you often need to setup an isolated environment using virtual machines. This can be a lot of work when you have to install the machines from scratch. To avoid this you can setup a base configuration (for instance a machine which already has SQL server and Visual Studio installed) and copy the hard disk when creating a new instance. The downside of this method is that you waste a lot of disk space. To avoid this most virtualization products such as VmWare, VirtualBox and Virtual PC use differencing disks. These are disks that store only the different sectors in regard to their base or parent disk."
layout: post
published: true
status: publish
tags: 
  - differencing
  - disks
  - virtualbox
  - windows7
  - 转移user目录
title: "Using differencing disks with VirtualBox /在VirtualBox下使用系统差分"
type: post
---
from http://lucvknet.blogspot.com/2010/01/using-differencing-disks-with.html
When evaluating new software, you often need to setup an isolated environment using virtual machines. This can be a lot of work when you have to install the machines from scratch. To avoid this you can setup a base configuration (for instance a machine which already has SQL server and Visual Studio installed) and copy the hard disk when creating a new instance. The downside of this method is that you waste a lot of disk space. To avoid this most virtualization products such as VmWare, VirtualBox and Virtual PC use differencing disks. These are disks that store only the different sectors in regard to their base or parent disk.
<!--more-->
Following procedure shows how to use differencing disks with VirtualBox:

   1. Build the base system.
      After installing the operating system, apply all necessary update and install the VirtualBox additions.
   2. Release the base disk
      Since the base disk will become ‘read-only’, it must be detached form all virtual machines. 
<a href="http://nwy.me/wp-content/uploads/2011/03/ReleaseDisc_thumb7.jpg"><img src="http://nwy.me/wp-content/uploads/2011/03/ReleaseDisc_thumb7-300x236.jpg" alt="" title="ReleaseDisc_thumb[7]" width="300" height="236" class="alignnone size-medium wp-image-62616"></a>
3 Make the base disk immutable
Use the following command:
VBoxManage modifyhd <disk file>  --type immutable

<del datetime="2011-03-02T11:00:22+00:00">把文件权限设为400</del>
4 Create a new system from the base disk
When creating the new system attach the immutable base disk. A new differencing disk will be created. 
<a href="http://nwy.me/wp-content/uploads/2011/03/NewSystem_thumb1.jpg"><img src="http://nwy.me/wp-content/uploads/2011/03/NewSystem_thumb1-300x225.jpg" alt="" title="NewSystem_thumb[1]" width="300" height="225" class="alignnone size-medium wp-image-62617"></a>
<a href="http://nwy.me/wp-content/uploads/2011/03/NewDisc_thumb1.jpg"><img src="http://nwy.me/wp-content/uploads/2011/03/NewDisc_thumb1-300x150.jpg" alt="" title="NewDisc_thumb[1]" width="300" height="150" class="alignnone size-medium wp-image-62618"></a>
5   5. Turn off the autoreset feature of the differencing disk
      This is necessary since the content of a differencing disk will be destroyed when the virtual machine is started.
      Use the following command:
      VBoxManage modifyhd <differencing disk file> --autoreset false



If you want to start a new hierarchy from a differencing disk, you can use the ‘VBoxManage clonehd’ command to build the new base disk. Following figure shows an example:

<a href="http://nwy.me/wp-content/uploads/2011/03/diskgen_thumb1.jpg"><img src="http://nwy.me/wp-content/uploads/2011/03/diskgen_thumb1-300x260.jpg" alt="" title="diskgen_thumb[1]" width="300" height="260" class="alignnone size-medium wp-image-62619"></a>

转移user目录


1、新系统安装时：

　　在安装Win7的过程中，要求输入用户名及密码的时候，先不如输入任何信息，按“Shift+F10”呼出DOS窗口，输入以下命令：

　　robocopy "C:\Users" "D:\Users" /E /COPYALL /XJ    ------而后按下回车键，再输入

　　rmdir "C:\Users" /S /Q   ------再按下回车键，最后输入

　　mklink /J "C:\Users" "D:\Users"    ------以回车键结束命令输入

　　而后关闭DOS窗口，按部就班继续安装直至完成。

　　如此安装的Windows7，所有“用户特殊文件夹”（User Special Folder）的内容都已经被设置在D盘（非系统盘）上。



2、已经安装好的win7系统：

　　如果想要移动已安装好的Windows7中的用户文件夹，那么就要按以下步骤操作（稍微麻烦一点，并且过程中可能会出现无法拷贝文件的情况）：

①关闭所有应用程序：

　　1. 按一下“Windows”键，输入“计算机管理”之后按“Enter”，呼出“计算机管理器”；

　　2. 鼠标点击“Administrator”，选择属性，而后在随后的对话框中去掉“帐户已禁用”之前的勾，而后关闭“计算机管理器”；

　　3. 注销当前用户（注意，不是“切换用户”），而后以“Administrator”登录

　　4. 打开命令行窗口，输入以下命令：robocopy "C:\Users" "D:\Users" /E /COPYALL /XJ /XD "C:\Users\Administrator"

　　5. 注销Administrator，重新用你的用户名登录Windows7，而后到“计算机管理器”里禁用Administrator；

　　6. 以管理员身份打开一个DOS窗口，输入以下命令：

　　rmdir "C:\Users" /S /Q

　　mklink /J "C:\Users" "D:\Users"</differencing></disk>
