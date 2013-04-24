--- 
categories: 
  - Linux
comments: true
layout: post
published: true
status: publish
tags: 
  - firefox
  - "high cpu"
  - plugin-container
  - ubuntu
title: "Fix firefox high CPU load with plugin-container"
type: post
---
from: http://blog.gnu-designs.com/solved-firefox-high-cpu-load-with-plugin-container

If you’re like me, you use a lot of tabs at once in Firefox… a LOT (50+). Even with a few tabs, the new Firefox with the <a href="http://support.mozilla.com/en-US/kb/What+is+plugin-container">Plugin Container</a> tends to sit there chewing up CPU, grinding core temperature higher and  higher. In my case, it ran my CPU up to over 200F, before I had to kill  it off from the shell.

The idea is sound, but the implementation  is absolutely horrible. If a webpage has flash components (and really,  what webpage doesn’t these days), but isn’t actually <em>playing</em> Flash content, the plugin should be idle. With plugin-container, it sits  there spinning, eating valuable CPU cycles and generating a LOT more  heat than necessary.

So here’s how to stop it:

Under ‘<code>about:config</code>‘, do a search for ‘<code>dom.ipc</code>‘, and you’ll see something like this:

<img src="http://blog.gnu-designs.com/images/plugin-container-before.png" alt="">

The values you want to change, are the ones related to the plugin(s) you do <em>not</em> want to run in a separate namespace. In my case, that was the two plugins listed.

Just double-click the key, and change the values from ‘true’ to ‘false’, as shown here:

<img src="http://blog.gnu-designs.com/images/plugin-container-after.png" alt="">

That’s  it… just restart Firefox, and now your plugins will run in “legacy”  mode, the same way they did before plugin-container came alone. The only  problem is that you’ll be much more prone to Flash crashes taking out  the browser itself, so save often, or use a <a href="https://addons.mozilla.org/en-US/firefox/search/?q=session">Session Manager</a> to help restore the tabs you had loaded if/when Firefox crashes.

http://kb.mozillazine.org/Plugin-container_and_out-of-process_plugins
