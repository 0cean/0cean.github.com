--- 
categories: 
  - Linux
comments: true
layout: post
published: true
status: publish
tags: 
  - extundelete
  - linux
  - 删除
  - 恢复
  - 文件
  - 文件夹
  - 误删
title: Linux下ext4分区格式恢复删除文件
type: post
---
作为键盘党，下午在用键盘选择文件夹的时候，没有盯对文件夹就shift+delete删除了一个重要文件夹，之前就发生过丢失数据的悲剧，于是给笔记本增加了一块硬盘，重要数据定时同步到光驱位硬盘，不过今天误删除的文件夹还没同步到光驱位硬盘。在ext2分区格式下有许多文件恢复软件，但是这些软件都不支持ext4，或兼容的不太好，如testdisk，虽然可以看到误删的文件但是恢复出来的文件是损坏的。最后通过一番搜索找到了一款支持ext4的的恢复软件extundelete。
  安装extundelete，可以去软件主页http://extundelete.sourceforge.net下载编译，或者从服务器获取，不同的发行版的安装方法不同，这里不再详述。
extundelete --help 查看软件帮助
<code>
Usage: extundelete [options] [--] device-file
Options:
  --version, -[vV]       Print version and exit successfully.
  --help,                Print this help and exit successfully.
  --superblock           Print contents of superblock in addition to the rest.
                         If no action is specified then this option is implied.
  --journal              Show content of journal.
  --after dtime          Only process entries deleted on or after 'dtime'.
  --before dtime         Only process entries deleted before 'dtime'.
Actions:
  --inode ino            Show info on inode 'ino'.
  --block blk            Show info on block 'blk'.
  --restore-inode ino[,ino,...]
                         Restore the file(s) with known inode number 'ino'.
                         The restored files are created in ./RESTORED_FILES
                         with their inode number as extension (ie, file.12345).
  --restore-file 'path'  Will restore file 'path'. 'path' is relative to root
                         of the partition and does not start with a '/' (it
                         must be one of the paths returned by --dump-names).
                         The restored file is created in the current
                         directory as 'RECOVERED_FILES/path'.
  --restore-files 'path' Will restore files which are listed in the file 'path'.
                         Each filename should be in the same format as an option
                         to --restore-file, and there should be one per line.
  --restore-all          Attempts to restore everything.
  -j journal             Reads an external journal from the named file.
  -b blocknumber         Uses the backup superblock at blocknumber when opening
                         the file system.
  -B blocksize           Uses blocksize as the block size when opening the file
                         system.  The number should be the number of bytes.
</code>

软件支持根据时间，文件路径，inode恢复删除的文件，这里指定文件路径恢复误删文件
根据文件路径恢复也有多种方式，如下：
恢复/dev/sda3里一个被误删除的文件

<code>
extundelete /dev/sda3 --restore-file /an/important/file
</code>
恢复/dev/sda3里一个被误删除的文件夹
<code>
extundelete /dev/sda3 --restore-directory /an/important
</code>
恢复/dev/sda3里所有被删除的东西
<code>
extundelete /dev/sda3 --restore-all
</code>
extundelete恢复误删除的文件不需要进入live环境，也不需要umount误删文件所在分区，运行命令后会在你运行命令的目录下产生一个RECOVERED_FILES/的目录，恢复的文件会按照原来的路径创建在该路径下面，所以做恢复操作的时候一定要把终端路径切换到其他分区下，不能在当前误删文件所在分区操作，否则恢复出来的文件会覆盖误删除的文件，导致恢复出来的部分或全部文件损坏。
