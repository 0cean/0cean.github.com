--- 
categories: 
  - 转载
comments: true
layout: post
published: true
status: publish
tags: []
title: 一个程序员的爱情故事
type: post
---
作者：http://topic.csdn.net/u/20110517/12/0ab11541-6206-40c9-a8b1-5439d642ab49.html
注释：http://www.cnblogs.com/zhuqil/archive/2011/05/19/2051373.html
今天在csdn上看了一篇帖子：《这段代码描述我最近的心情》。 才发现原来用代码可以书写人生，对代码的作者十分钦佩。
<div>
<pre>
<div>     //一个程序员的爱情故事
    public class MyLoveStory
    {
        public static void Main(string[] args)
        {
            //The ForeStory
            int result = 1;
            bool love = false;//以前有个小男孩，没有爱情，孤孤单单一个人。
            if (love)   //他认为如果是爱情。
                result = AtOneTime();//那必须是两个人在同一个时间爱上彼此。
            //But Now...</div>
<div>            //但是现在长大了，有了爱情，却出现了第三者

            if (args[0] == "Has" && args[1] == "Third" && args[2] == "One")            {
              love = false;//爱情没了
                result = DoPart();//分手，独自一个人。
                //现在这个男孩的心情是：如果女生生活的很悲惨，自己会伤心。
                //如果看到女生活的很幸福，自己更伤心，因为幸福不是自己给的。
                Console.WriteLine(GetNowHeartState.ToString());
            }
        }
        //男生的心情
        internal enum HeartState
        {
            Sad,
            MoreSad
        }
        //女生的生活状态
        internal enum LifeState
        {
            Nice,
            Poor,
        }
        //男生现在的心情
        internal HeartState GetNowHeartState(LifeState girlLife)
        {
            //现在这个小男孩的心情是：如果生活的很悲惨，自己会伤心。
            //如果看到女生活的很幸福，自己更伤心，因为幸福不是自己给的。
            if (gilrLife == LifeState.Poor)
                return HeartState.Sad;
            else
                return HeartState.MoreSad;
        }
        //爱情是在同一时间爱上彼此
        internal static int AtOneTime()
        {
            //1+1=2
            return 1 + 1;
        }
        //分手
        internal static int DoPart()
        {
            // 2-1=1
            return 2 - 1;
        }
    }</div></pre>
</div>
