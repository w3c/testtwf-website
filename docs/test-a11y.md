---
layout: docs
type: [101]
title: Accessibility Testing Resource Page
---

<h2 lang="en" id="a11y"><span lang="zho" class="a11y-zh-cn">简介</span><span lang="ko" class="a11y-ko-kr">개요</span> | Introduction to Web Accessibility</h2>

<p lang="en"><a href="http://www.w3.org/WAI/intro/accessibility.php">Web accessibility</a> means that people with disabilities can use the Web, that they can <a href="http://www.w3.org/TR/UNDERSTANDING-WCAG20/intro.html#introduction-fourprincs-head">perceive, understand, navigate, and interact</a> with it.  This can <em>usually</em> be accomplished simply be ensuring that <em>everything</em> be made available as text (or has a text equivalent), and that all interaction can be accomplished using a keyboard.  Accessibility can be defined in standalone specifications (like Accessibile Rich Internet Applications or WAI-ARIA), Guidelines (like Web Contect Accessibility Guidelines or WCAG) or as part of another specification (like HTML5).</p>

<p lang="zho" class="a11y-zh-cn"><span lang="en">Web Accessibility（Web</span>无障碍访问）旨在使得行动不便或者残障人士能够使用Web，即可以在Web上获取信息、理解信息、查找信息，以及网络交互。通常情况下，仅仅是确保每个网页的所有内容都有对应的文本（<span lang="en">Text</span>）信息，以及所有的交互都可以通过键盘来完成，就可以实现Web的无障碍访问。无障碍访问可以体现在一个单独的规范（例如<span lang="en">WAI-ARIA</span>）、指南（例如<span lang="en">WCAG</span>），或者某个规范中的一个部分（例如<span lang="en">HTML5</span>）。</p>

<p lang="ko" class="a11y-ko-kr">웹 접근성은 장애인들이 웹을 사용할 수 있게 하는 것 즉, 웹을 인식하고 이해하며 운용하고 상호작용할 수 있는 것을 의미합니다. 웹 페이지의 모든 내용에 해당하는 대체 텍스트를 제공하고 모든 상호 작용을 키보드로 진행할 수 있도록 하는 것 만으로도 웹 접근성을 준수했다고 할 수 있습니다. 접근성은 하나의 규범(<span lang="en">WAI-ARIA</span> 등), 가이드(<span lang="en">WCAG</span>)로 정의할 수도 있고 표준안(<span lang="en">HTML5</span> 같은)의 일부로 포함될 수도 있습니다.</p>

<h2 lang="en" id="a11ytest"><span lang="zho" class="a11y-zh-cn">测试</span><span lang="ko" class="a11y-ko-kr">웹 접근성 테스트</span> | Web Accessibility Testing</h2>

<p lang="en">Accessibility often depends on Accessibility Programming Interfaces (APIs) that operate outside of the web stack, at the Operating System level (commonly referred to as <a href="http://www.w3.org/TR/2013/WD-html-aapi-20131001/#introduction-accessibility-apis">Accessibility APIs</a> or AAPIs).  Testing accessibility can also require the use of User Agents that operate independently of the web browser (like a screen reader) that merge information gathered from the DOM, AAPIs, off-screen models and heuristics to provide access to all the data and features contained in modern web documents and apps.  Accessibility is also often measured by the ability of a user to complete interactions in the browser itself.  These types of tests require automation tools like WebDriver.</p>

<p lang="zho" class="a11y-zh-cn">无障碍访问通常依赖于<span lang="en">Web</span>技术之外的操作系统层面的<span lang="en">API（Accessibility APIs</span>或<span lang="en">AAPIs）</span>。因此，对无障碍访问的测试也可以要求使用一些独立于<span lang="en">Web</span>浏览器的<span lang="en">UA</span>（例如<span lang="en">Screen Reader</span>），这些<span lang="en">UA</span>可以将从<span lang="en">DOM、AAPI、off-screen models</span>和<span lang="en">heuristics</span>获得的信息进行组合或者合并，从而提供对使用最新技术的<span lang="en">Web</span>文档或者Web应用中所包含所有数据和特性的无障碍访问能力。无障碍访问也常常使用浏览器本身完成用户交互的能力来进行评估。这类测试需要自动测试工具，例如<span lang="en">WebDriver</span>。</p>

<p lang="ko" class="a11y-ko-kr">접근성은 보통 웹 기술 이외의 운영체제 <span lang="en">API</span>(접근성 <span lang="en"><a href="http://www.w3.org/TR/2013/WD-html-aapi-20131001/#introduction-accessibility-apis">APIs</a></span> 혹은 <span lang="en">AAPIs</span>)에 의존하기 때문에 접근성에 대한 테스트도 웹 브라우저와 분리된 소프트웨어(<span lang="en">Screen Reader</span> 등)를 활용하는게 좋을 것 같습니다. 이런 소프트웨어는 <span lang="en">DOM</span>, 접근성 <span lang="en">API, off-screen models</span>과 경험 정보를 재조합 혹은 병합하여, 신기술을 사용한 웹 문서 혹은 웹 프로그램중 모든 데이터와 특성을 포함한 접근성을 제공합니다. 접근성은 또한 브라우저 자체의 사용자 상호작용으로 테스트를 진행하기도 합니다. 이런 테스트는 자동 테스트 도구(<span lang="en">WebDriver</span> 등)가 필요합니다.</p>

<h2 lang="en" id="priorities"><span lang="zho" class="a11y-zh-cn">优先级</span><span lang="ko" class="a11y-ko-kr">중요성</span> | Priorities</h2>

<p lang="en">Testing for Accessibility is not always as straightforward as writing javascript or reference tests.  However, with the right tools and the right people, it should be possible to automate or semi-automate more of these tests. This event marks the first time a group of accessibility experts will be available to work closely with HTML and other OWP testing experts.  We hope the proximity of these two groups will result in a plan for effectively testing accessibility in the OWP and generate the tests necessary to ensure that the Open Web Platform is available to everyone.</p>

<p lang="zho" class="a11y-zh-cn">就像您看到的，对无障碍访问的测试并不总是像写<span lang="en">javascript</span>或者<span lang="en">reference tests</span>那么简单直接。但是，使用适当的工具以及与适当的人合作，可以实现更多测试工作的自动化或者半自动化。 本次活动第一次将<span lang="en">Web</span>无障碍专家和HTML以及其他OWP测试专家聚集在一起，紧密合作。我们希望这两类专家的聚会能够形成一个在<span lang="en">OWP</span>中高效测试无障碍访问的规划，并且通过这次活动能够产生一些测试内容和测试用例，展现开放<span lang="en">Web</span>平台<span lang="en">（Open Web Platform）</span>实现了真正向所有人开放的无障碍开放属性。</p>

<p lang="ko" class="a11y-ko-kr">보시는 바와 같이, 접근성 테스트는 자바스크립트나 시각화한 테스트처럼 단순하지 않지만 올바른 툴, 사람들과 함께하면 더 많은 테스트 작업의 자동화 혹은 반자동화를 실현할 수 있습니다. 이번 행사는 최초로 웹 접근성 전문가와 <span lang="en">HTML</span> 및 기타 <span lang="en">OWP</span>테스트 전문가를 한자리에 모았습니다. 우리는 전문가들의 협업을 통해 효과적으로 <span lang="en">OWP</span>에서 접근성 테스트를 진행하고, 이번 행사를 통해 테스트 내용 및 테스트 사례를 추출해 열린 웹 플랫폼(<span lang="en">Open Web Platform</span>)으로 진정한 모든 사람들에게 개방된 접근성을 실현하고자 합니다.</p>

<h2 lang="en" id="participate"><span lang="zho" class="a11y-zh-cn">我怎么参与</span><span lang="ko" class="a11y-ko-kr">어떻게 참여하나요?</span> | How can I participate?</h2>

<p lang="en">It's possible that the tests you're writing can <em>also</em> test for accessibility!  Stop by and talk with one of our accessibility experts to see if your test can be adapted to also test for accessibility.</p>

<p lang="en">Are you an expert in testing?  Are you interested in applying this knowledge to solve testing challenges that involve AAPIs and WebDriver?  Please stop by and talk with us while we plan for the future of accessibility testing.</p>

<p lang="en">For those who may be new to accessibility or are interested in gaining a better understanding of how assistive technologies work within the web stack, join us for an in depth analysis and review of the Test The Web Forward website as we attempt to identify opportunities to improve access to this resource.</p>

<p lang="en">The <a href="http://www.w3.org/WAI/PF/html-accessibility-tf.html">HTML Accessibility TF</a> is interested in hearing your thoughts and ideas regarding effective testing for accessibility in OWP specifications.  Feel free to reach out and give us some <a href="mailto:public-html-a11y@w3.org">feedback</a>.</p>

<p lang="zho" class="a11y-zh-cn">很可能你正在编写的测试用例也可以用来对无障碍访问特性进行测试！过来与我们的专家聊聊，看看你的测试用例可以怎样用于无障碍访问的测试。</p>

<p lang="zho" class="a11y-zh-cn">您是一位测试专家？是否有兴趣使用您的经验和知识来解决测试中涉及<span lang="en">AAPIs</span>和<span lang="en">WebDriver</span>的挑战？过来聊聊，我们正在规划无障碍访问测试未来工作。</p>

<p lang="zho" class="a11y-zh-cn">对于那些可能刚刚了解无障碍访问，或者有兴趣进一步了解辅助技术如何与Web技术协作的朋友，邀请您加入我们的讨论，深入分析<span lang="en">Test The Web Forward</span>网站，我们希望尽可能完善和改进这个资源的无障碍访问特性。</p>

<p lang="zho" class="a11y-zh-cn"><span lang="en">HTML Accessibility TF（HTML</span>无障碍访问特别任务组）非常期待听到您对OWP规范中无障碍访问特性的测试有关的任何想法和建议。来吧，给我们一些反馈意见。</p>

<p lang="ko" class="a11y-ko-kr">당신이 지금 작성하고 있는 테스트 케이스로 접근성을 테스트 할 수도 있습니다! 우리의 전문가와 함께 당신의 테스트 케이스가 어떻게 접근성 테스트에 사용되는지에 대해 얘기를 나눠봅시다.</p>

<p lang="ko" class="a11y-ko-kr">테스트 전문가인가요? 당신의 경험과 지식으로 테스트 때 <span lang="en">AAPIs</span>와 <span lang="en">WebDriver</span>에 관련된 과제에 도전해 보고 싶지 않나요? 오세요, 우리는 접근성 테스트를 준비중 입니다.</p>

<p lang="ko" class="a11y-ko-kr">이제 접근성을 접한 혹은 보조기술이 어떻게 웹 기술과 작동하는지에 대해 관심이 있는 분들을 우리의 행사에 초대합니다. 더욱 깊이 <span lang="en">Test The Web Forward</span> 사이트에 대해 분석하고 접근성에 대해 보완하고 개선하고 싶습니다.</p>

<p lang="ko" class="a11y-ko-kr"><a href="http://www.w3.org/WAI/PF/html-accessibility-tf.html">HTML 접근성 TF</a>는 OWP 규범 중 접근성 테스트에 대한 당신의 의견이나 생각에 매우 관심 있습니다. 저희에게 <a href="mailto:public-html-a11y@w3.org">피드백</a>을 주세요.</p>

<h2 lang="en"><span lang="zho" class="a11y-zh-cn">我们测试什么？</span><span lang="ko" class="a11y-ko-kr">무엇을 테스트 하는가？</span> | What are we testing?</h2>

<h3 lang="en">Canvas 2D</h3>

<p lang="en">The <a href="http://www.w3.org/html/wg/drafts/2dcontext/html5_canvas_CR/">Canvas 2D</a> specification has a number of features that address accessibility specifically.  Two features (<a href="http://www.w3.org/html/wg/drafts/2dcontext/html5_canvas_CR/#hit-regions">Hit Regions</a> and <a href="http://www.w3.org/html/wg/drafts/2dcontext/html5_canvas_CR/#dom-context-2d-drawfocusifneeded">drawFocusIfNeeded()</a>) were added very recently and currently <a href="https://github.com/w3c/web-platform-tests/tree/master/2dcontext/hit-regions">need test development</a>.</p>

<p lang="zho" class="a11y-zh-cn"><span lang="en">Canvas 2D</span>规范具有的一些属性是面向无障碍访问的特殊要求的。其中一些属性是最近才实现的，还没有完成互操作性的测试。</p>

<p lang="ko" class="a11y-ko-kr"><span lang="en"><a href="http://www.w3.org/html/wg/drafts/2dcontext/html5_canvas_CR/">Canvas 2D</a></span>스펙의 일부 속성은 접근성에 대한 특수요구가 있습니다. 그 중 일부 속성은 최근에 구현된 것으로 아직 운용성 테스트를 진행하지 않았습니다. 최근에 추가된 기능 두개가 (<a href="http://www.w3.org/html/wg/drafts/2dcontext/html5_canvas_CR/#hit-regions">Hit Regions</a> 그리고 <a href="http://www.w3.org/html/wg/drafts/2dcontext/html5_canvas_CR/#dom-context-2d-drawfocusifneeded">drawFocusIfNeeded()</a>) 가 비교적 최근에 추가되었으며, <a href="https://github.com/w3c/web-platform-tests/tree/master/2dcontext/hit-regions">테스트가 필요한 상황</a>입니다.</p>

<h3 lang="en">Media</h3>

<p lang="en"><a href="http://www.w3.org/html/wg/drafts/html/CR/embedded-content-0.html#media-elements">HTML5 Media elements</a> were designed to support a broad range of alternative content, like subtitles, captions and audio descriptions.  Most of these features are delivered using the <a href="http://www.w3.org/html/wg/drafts/html/CR/embedded-content-0.html#timed-text-tracks"><code>&lt;track&gt;</code></a> element and the <a href="http://www.w3.org/html/wg/drafts/html/CR/embedded-content-0.html#text-track-api">Text Track API</a>.  <a href="https://github.com/w3c/web-platform-tests/tree/master/html/semantics/embedded-content/media-elements/track/track-element">Tests are needed</a> for these essential media features.</p>

<p lang="ko" class="a11y-ko-kr"><a href="http://www.w3.org/html/wg/drafts/html/CR/embedded-content-0.html#media-elements">HTML5 Media 요소</a> 는 자막, 음성 설명 등 다양한 대체 컨텐츠를 제공할 수 있도록 만들어졌습니다. 이러한 기능 대부분은 <a href="http://www.w3.org/html/wg/drafts/html/CR/embedded-content-0.html#timed-text-tracks"><code>&lt;track&gt;</code></a> 요소와 <a href="http://www.w3.org/html/wg/drafts/html/CR/embedded-content-0.html#text-track-api">Text Track API</a>를 이용하여 제공됩니다. 해당 HTML5 Media 표준 기능을 위한 <a href="https://github.com/w3c/web-platform-tests/tree/master/html/semantics/embedded-content/media-elements/track/track-element">테스트가 필요</a>합니다.</p>

<h3 lang="en">ARIA</h3>

<p lang="en">HTML5 marks the first time ARIA has been specifically defined within the context of an HTML specification (see <a href="http://www.w3.org/TR/html/dom.html#sec-strong-native-semantics">3.2.7.3 Strong Native Semantics</a> and <a href="http://www.w3.org/TR/html/dom.html#sec-implicit-aria-semantics">3.2.7.4 Implicit ARIA Semantics</a>.</p>

<p lang="zho" class="a11y-zh-cn">在<span lang="en">HTML5</span>，首次将<span lang="en">ARIA</span>特别定义在一个<span lang="en">HTML</span>规范文本（标准）中。</p>

<p lang="ko" class="a11y-ko-kr"><span lang="en">HTML5</span>에서 최초로 <span lang="en">ARIA</span>를 특별히 <span lang="en">HTML</span>스펙(표준)에 정의하였습니다.</p>

<h3 lang="en">Interactive elements</h3>

<p lang="en">We are looking for tests that verify keyboard accessibility and tests that verify the correct role, state, and properties of interactive elements.</p>

<p lang="zho" class="a11y-zh-cn">我们希望一些测试工作，以验证交互元素的键盘无障碍访问特性，以及验证交互原色的角色、状态和组件的正确性。</p>

<p lang="ko" class="a11y-ko-kr">우리는 테스터가 필요합니다. 인터랙션 요소의 키보드 접근성 특성에 대한 검증 및 인터랙션 요소의 역할, 상태 및 컴포넌트의 정확성에 대한 테스트가 필요합니다.</p>

<h2 lang="en">Resources</h2>

<ul>
<li>
	<a href="http://www.w3.org/TR/html/">HTML5</a>
	<ul>
	<li><a href="http://www.w3.org/TR/html/dom.html#sec-strong-native-semantics">3.2.7.3 Strong Native Semantics</a></li>
	<li><a href="http://www.w3.org/TR/html/dom.html#sec-implicit-aria-semantics">3.2.7.4 Implicit ARIA Semantics</a></li>
	</ul>
</li>
<li>
	<a href="http://www.w3.org/html/wg/drafts/2dcontext/html5_canvas_CR/">Canvas 2D</a>
	<ul>
	<li><a href="http://www.w3.org/html/wg/drafts/2dcontext/html5_canvas_CR/#hit-regions">Hit Regions</a></li>
	<li><a href="http://www.w3.org/html/wg/drafts/2dcontext/html5_canvas_CR/#dom-context-2d-drawfocusifneeded">drawFocusIfNeeded(</a></li>
	</ul>
</li>
<li><a href="http://www.html5accessibility.com/tests/form-test.html">HTML5 Interactive Controls Test/Demo Page</a></li>
<li><a href="https://github.com/stevefaulkner/HTML5accessibility/tree/master/tests">HTML5 Accessibility Test Pages (GitHub)</a></li>
<li><a href="http://www.w3.org/TR/2013/WD-html-aapi-20131001/#introduction-accessibility-apis">Intro to Accessibility APIs</a></li>
<li><a href="http://www.w3.org/TR/UNDERSTANDING-WCAG20/intro.html#introduction-fourprincs-head">Four Principles of Accessibility</a></li>
</ul>

<script type="text/javascript">
document.addEventListener('DOMContentLoaded', function(e) {
	/************************************************************************
	* TL:DR; We should really try to fix this later in a better way.
	************************************************************************
	* Hack alert. While this looks really complicated, it's just a simple
	* script that grabs the "l" item from the query string, and if it's
	* "ko-kr", it will nuke all of the zh-cn localized elements. If it's
	* not, it will nuke all the ko-kr localized elements. As this page was
	* a complete mess, and I didn't quite have the time to do learn Jekyll
	* up to a point where I could do a proper i18n fix, this was a last
	* minute hack to make sure that the Korean localization doesn't destroy
	* the existing page like it originally did in the first localization
	* attempt. And yes, I am the psychopath moron who hand wrote this code.
	************************************************************************/
	var s = document.querySelectorAll((decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI('l').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1")) == 'ko-kr') ? '.a11y-zh-cn' : '.a11y-ko-kr');
	if (s.length > 0) for (var i = 0; i < s.length; s[i].parentNode.removeChild(s[i++]));
}, false);
</script>
