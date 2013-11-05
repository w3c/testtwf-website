---
layout: docs
type: [101]
title: Accessibility Testing Resource Page - Shenzhen
---

<h2 lang="en" id="a11y"><span lang="zho">简介</span> | Introduction to Web Accessibility</h2>

<p lang="zho"><span lang="en">Web Accessibility（Web</span>无障碍访问）旨在使得行动不便或者残障人士能够使用Web，即可以在Web上获取信息、理解信息、查找信息，以及网络交互。通常情况下，仅仅是确保每个网页的所有内容都有对应的文本（<span lang="en">Text</span>）信息，以及所有的交互都可以通过键盘来完成，就可以实现Web的无障碍访问。无障碍访问可以体现在一个单独的规范（例如<span lang="en">WAI-ARIA</span>）、指南（例如<span lang="en">WCAG</span>），或者某个规范中的一个部分（例如<span lang="en">HTML5</span>）。</p>

<p lang="en"><a href="http://www.w3.org/WAI/intro/accessibility.php">Web accessibility</a> means that people with disabilities can use the Web, that they can <a href="http://www.w3.org/TR/UNDERSTANDING-WCAG20/intro.html#introduction-fourprincs-head">perceive, understand, navigate, and interact</a> with it.  This can <em>usually</em> be accomplished simply be ensuring that <em>everything</em> be made available as text (or has a text equivalent), and that all interaction can be accomplished using a keyboard.  Accessibility can be defined in standalone specifications (like Accessibile Rich Internet Applications or WAI-ARIA), Guidelines (like Web Contect Accessibility Guidelines or WCAG) or as part of another specification (like HTML5).</p>


<h2 lang="en" id="a11ytest"><span lang="zho">测试</span> | Web Accessibility Testing</h2>

<p lang="zho">无障碍访问通常依赖于<span lang="en">Web</span>技术之外的操作系统层面的<span lang="en">API（Accessibility APIs</span>或<span lang="en">AAPIs）</span>。因此，对无障碍访问的测试也可以要求使用一些独立于<span lang="en">Web</span>浏览器的<span lang="en">UA</span>（例如<span lang="en">Screen Reader</span>），这些<span lang="en">UA</span>可以将从<span lang="en">DOM、AAPI、off-screen models</span>和<span lang="en">heuristics</span>获得的信息进行组合或者合并，从而提供对使用最新技术的<span lang="en">Web</span>文档或者Web应用中所包含所有数据和特性的无障碍访问能力。无障碍访问也常常使用浏览器本身完成用户交互的能力来进行评估。这类测试需要自动测试工具，例如<span lang="en">WebDriver</span>。</p>

<p  lang="en">Accessibility often depends on Accessibility Programming Interfaces (APIs) that operate outside of the web stack, at the Operating System level (commonly referred to as <a href="http://www.w3.org/TR/2013/WD-html-aapi-20131001/#introduction-accessibility-apis">Accessibility APIs</a> or AAPIs).  Testing accessibility can also require the use of User Agents that operate independently of the web browser (like a screen reader) that merge information gathered from the DOM, AAPIs, off-screen models and heuristics to provide access to all the data and features contained in modern web documents and apps.  Accessibility is also often measured by the ability of a user to complete interactions in the browser itself.  These types of tests require automation tools like WebDriver.</p>

<h2 lang="en" id="priorities"><span lang="zho">优先级</span> | Priorities</h2>

<p lang="zho">就像您看到的，对无障碍访问的测试并不总是像写<span lang="en">javascript</span>或者<span lang="en">reference tests</span>那么简单直接。但是，使用适当的工具以及与适当的人合作，可以实现更多测试工作的自动化或者半自动化。 本次活动第一次将<span lang="en">Web</span>无障碍专家和HTML以及其他OWP测试专家聚集在一起，紧密合作。我们希望这两类专家的聚会能够形成一个在<span lang="en">OWP</span>中高效测试无障碍访问的规划，并且通过这次活动能够产生一些测试内容和测试用例，展现开放<span lang="en">Web</span>平台<span lang="en">（Open Web Platform）</span>实现了真正向所有人开放的无障碍开放属性。</p>

<p  lang="en">Testing for Accessibility is not always as straightforward as writing javascript or reference tests.  However, with the right tools and the right people, it should be possible to automate or semi-automate more of these tests. This event marks the first time a group of accessibility experts will be available to work closely with HTML and other OWP testing experts.  We hope the proximity of these two groups will result in a plan for effectively testing accessibility in the OWP and generate the tests necessary to ensure that the Open Web Platform is available to everyone.</p>

<h2 lang="en" id="participate"><span lang="zho">我怎么参与</span> | How can I participate?</h2>

<p lang="zho">很可能你正在编写的测试用例也可以用来对无障碍访问特性进行测试！过来与我们的专家聊聊，看看你的测试用例可以怎样用于无障碍访问的测试。</p>

<p  lang="en">It's possible that the tests you're writing can <em>also</em> test for accessibility!  Stop by and talk with one of our accessibility experts to see if your test can be adapted to also test for accessibility.</p>

<p  lang="en">Are you an expert in testing?  Are you interested in applying this knowledge to solve testing challenges that involve AAPIs and WebDriver?  Please stop by and talk with us while we plan for the future of accessibility testing.</p>

<p  lang="en">For those who may be new to accessibility or are interested in gaining a better understanding of how assistive technologies work within the web stack, join us for an in depth analysis and review of the Test The Web Forward website as we attempt to identify opportunities to improve access to this resource.</p>

<p lang="zho">您是一位测试专家？是否有兴趣使用您的经验和知识来解决测试中涉及<span lang="en">AAPIs</span>和<span lang="en">WebDriver</span>的挑战？过来聊聊，我们正在规划无障碍访问测试未来工作。</p>

<p lang="zho">对于那些可能刚刚了解无障碍访问，或者有兴趣进一步了解辅助技术如何与Web技术协作的朋友，邀请您加入我们的讨论，深入分析<span lang="en">Test The Web Forward</span>网站，我们希望尽可能完善和改进这个资源的无障碍访问特性。</p>

<p lang="zho"><span lang="en">HTML Accessibility TF（HTML</span>无障碍访问特别任务组）非常期待听到您对OWP规范中无障碍访问特性的测试有关的任何想法和建议。来吧，给我们一些反馈意见。</p>

<p lang="en">The <a href="http://www.w3.org/WAI/PF/html-accessibility-tf.html">HTML Accessibility TF</a> is interested in hearing your thoughts and ideas regarding effective testing for accessibility in OWP specifications.  Feel free to reach out and give us some <a href="mailto:public-html-a11y@w3.org">feedback</a>.</p>

<h2 lang="en"><span lang="zho">我们测试什么？</span> | What are we testing?</h2>

<h3 lang="en">Canvas 2D</h3>

<p lang="zho"><span lang="en">Canvas 2D</span>规范具有的一些属性是面向无障碍访问的特殊要求的。其中一些属性是最近才实现的，还没有完成互操作性的测试。</p>

<p  lang="en">The <a href="http://www.w3.org/html/wg/drafts/2dcontext/html5_canvas_CR/">Canvas 2D</a> specification has a number of features that address accessibility specifically.  Some of these features were implemented very recently and have not been tested for interoperability.</p>

<h3 lang="en">ARIA</h3>

<p lang="zho">在<span lang="en">HTML5</span>，首次将<span lang="en">ARIA</span>特别定义在一个<span lang="en">HTML</span>规范文本（标准）中。</p>

<p  lang="en">HTML5 marks the first time ARIA has been specifically defined within the context of an HTML specification (see <a href="http://www.w3.org/TR/html/dom.html#sec-strong-native-semantics">3.2.7.3 Strong Native Semantics</a> and <a href="http://www.w3.org/TR/html/dom.html#sec-implicit-aria-semantics">3.2.7.4 Implicit ARIA Semantics</a>.</p>

<h3 lang="en">Interactive elements</h3>

<p lang="zho">我们希望一些测试工作，以验证交互元素的键盘无障碍访问特性，以及验证交互原色的角色、状态和组件的正确性。</p>

<p  lang="en">We are looking for tests that verify keyboard accessibility and tests that verify the correct role, state, and properties of interactive elements.</p>

<h2 lang="en">Resources</h2>

<ul>
<li><a href="http://www.w3.org/TR/html/">HTML5</a>

<ul>
<li><a href="http://www.w3.org/TR/html/dom.html#sec-strong-native-semantics">3.2.7.3 Strong Native Semantics</a></li>
<li><a href="http://www.w3.org/TR/html/dom.html#sec-implicit-aria-semantics">3.2.7.4 Implicit ARIA Semantics</a></li>
</ul>
</li>
<li><a href="http://www.w3.org/html/wg/drafts/2dcontext/html5_canvas_CR/">Canvas 2D</a></li>
<li><a href="http://www.html5accessibility.com/tests/form-test.html">HTML5 Interactive Controls Test/Demo Page</a></li>
<li><a href="https://github.com/stevefaulkner/HTML5accessibility/tree/master/tests">HTML5 Accessibility Test Pages (GitHub)</a></li>
<li><a href="http://www.w3.org/TR/2013/WD-html-aapi-20131001/#introduction-accessibility-apis">Intro to Accessibility APIs</a></li>
<li><a href="http://www.w3.org/TR/UNDERSTANDING-WCAG20/intro.html#introduction-fourprincs-head">Four Principles of Accessibility</a></li>
</ul>