---
layout: docs
type: [101]
title: Accessibility Testing Resource Page - Shenzhen
---

<h2 lang="en" id="a11y"><span lang="ko">개요</span> | Introduction to Web Accessibility</h2>

<p lang="ko">웹 접근성은 장애인들이 웹을 사용할 수 있게 하는 것 즉, 웹을 인식하고 이해하며 운용하고 상호작용할 수 있는 것을 의미합니다. 웹 페이지의 모든 내용에 해당하는 대체 텍스트를 제공하고 모든 상호 작용을 키보드로 진행할 수 있도록 하는 것 만으로도 웹 접근성을 준수했다고 할 수 있습니다. 접근성은 하나의 규범(<span lang="en">WAI-ARIA</span> 등), 가이드(<span lang="en">WCAG</span>)로 정의할 수도 있고 표준안(<span lang="en">HTML5</span> 같은)의 일부로 포함될 수도 있습니다.</p>

<p lang="en"><a href="http://www.w3.org/WAI/intro/accessibility.php">Web accessibility</a> means that people with disabilities can use the Web, that they can <a href="http://www.w3.org/TR/UNDERSTANDING-WCAG20/intro.html#introduction-fourprincs-head">perceive, understand, navigate, and interact</a> with it.  This can <em>usually</em> be accomplished simply be ensuring that <em>everything</em> be made available as text (or has a text equivalent), and that all interaction can be accomplished using a keyboard.  Accessibility can be defined in standalone specifications (like Accessibile Rich Internet Applications or WAI-ARIA), Guidelines (like Web Contect Accessibility Guidelines or WCAG) or as part of another specification (like HTML5).</p>


<h2 lang="en" id="a11ytest"><span lang="ko">웹 접근성 테스트</span> | Web Accessibility Testing</h2>

<p lang="ko">접근성은 보통 웹 기술 이외의 운영체제 <span lang="en">API</span>(접근성 <span lang="en"><a href="http://www.w3.org/TR/2013/WD-html-aapi-20131001/#introduction-accessibility-apis">APIs</a></span> 혹은 <span lang="en">AAPIs</span>)에 의존하기 때문에 접근성에 대한 테스트도 웹 브라우저와 분리된 소프트웨어(<span lang="en">Screen Reader</span> 등)를 활용하는게 좋을 것 같습니다. 이런 소프트웨어는 <span lang="en">DOM</span>, 접근성 <span lang="en">API, off-screen models</span>과 경험 정보를 재조합 혹은 병합하여, 신기술을 사용한 웹 문서 혹은 웹 프로그램중 모든 데이터와 특성을 포함한 접근성을 제공합니다. 접근성은 또한 브라우저 자체의 사용자 상호작용으로 테스트를 진행하기도 합니다. 이런 테스트는 자동 테스트 도구(<span lang="en">WebDriver</span> 등)가 필요합니다.</p>

<p lang="en">Accessibility often depends on Accessibility Programming Interfaces (APIs) that operate outside of the web stack, at the Operating System level (commonly referred to as <a href="http://www.w3.org/TR/2013/WD-html-aapi-20131001/#introduction-accessibility-apis">Accessibility APIs</a> or AAPIs).  Testing accessibility can also require the use of User Agents that operate independently of the web browser (like a screen reader) that merge information gathered from the DOM, AAPIs, off-screen models and heuristics to provide access to all the data and features contained in modern web documents and apps.  Accessibility is also often measured by the ability of a user to complete interactions in the browser itself.  These types of tests require automation tools like WebDriver.</p>

<h2 lang="en" id="priorities"><span lang="ko">중요성</span> | Priorities</h2>

<p lang="ko">보시는 바와 같이, 접근성 테스트는 자바스크립트나 시각화한 테스트처럼 단순하지 않지만 올바른 툴, 사람들과 함께하면 더 많은 테스트 작업의 자동화 혹은 반자동화를 실현할 수 있습니다. 이번 행사는 최초로 웹 접근성 전문가와 <span lang="en">HTML</span> 및 기타 <span lang="en">OWP</span>테스트 전문가를 한자리에 모았습니다. 우리는 전문가들의 협업을 통해 효과적으로 <span lang="en">OWP</span>에서 접근성 테스트를 진행하고, 이번 행사를 통해 테스트 내용 및 테스트 사례를 추출해 열린 웹 플랫폼(<span lang="en">Open Web Platform</span>)으로 진정한 모든 사람들에게 개방된 접근성을 실현하고자 합니다.</p>

<p lang="en">Testing for Accessibility is not always as straightforward as writing javascript or reference tests.  However, with the right tools and the right people, it should be possible to automate or semi-automate more of these tests. This event marks the first time a group of accessibility experts will be available to work closely with HTML and other OWP testing experts.  We hope the proximity of these two groups will result in a plan for effectively testing accessibility in the OWP and generate the tests necessary to ensure that the Open Web Platform is available to everyone.</p>

<h2 lang="en" id="participate"><span lang="ko">어떻게 참여하나요?</span> | How can I participate?</h2>

<p lang="ko">당신이 지금 작성하고 있는 테스트 케이스로 접근성을 테스트 할 수도 있습니다! 우리의 전문가와 함께 당신의 테스트 케이스가 어떻게 접근성 테스트에 사용되는지에 대해 얘기를 나눠봅시다.</p>

<p lang="ko">테스트 전문가인가요? 당신의 경험과 지식으로 테스트 때 <span lang="en">AAPIs</span>와 <span lang="en">WebDriver</span>에 관련된 과제에 도전해 보고 싶지 않나요? 오세요, 우리는 접근성 테스트를 준비중 입니다.</p>

<p lang="ko">이제 접근성을 접한 혹은 보조기술이 어떻게 웹 기술과 작동하는지에 대해 관심이 있는 분들을 우리의 행사에 초대합니다. 더욱 깊이 <span lang="en">Test The Web Forward</span> 사이트에 대해 분석하고 접근성에 대해 보완하고 개선하고 싶습니다.</p>

<p lang="ko"><a href="http://www.w3.org/WAI/PF/html-accessibility-tf.html">HTML 접근성 TF</a>는 OWP 규범 중 접근성 테스트에 대한 당신의 의견이나 생각에 매우 관심 있습니다. 저희에게 <a href="mailto:public-html-a11y@w3.org">피드백</a>을 주세요.</p>

<p lang="en">It's possible that the tests you're writing can <em>also</em> test for accessibility!  Stop by and talk with one of our accessibility experts to see if your test can be adapted to also test for accessibility.</p>

<p lang="en">Are you an expert in testing?  Are you interested in applying this knowledge to solve testing challenges that involve AAPIs and WebDriver?  Please stop by and talk with us while we plan for the future of accessibility testing.</p>

<p lang="en">For those who may be new to accessibility or are interested in gaining a better understanding of how assistive technologies work within the web stack, join us for an in depth analysis and review of the Test The Web Forward website as we attempt to identify opportunities to improve access to this resource.</p>

<p lang="en">The <a href="http://www.w3.org/WAI/PF/html-accessibility-tf.html">HTML Accessibility TF</a> is interested in hearing your thoughts and ideas regarding effective testing for accessibility in OWP specifications.  Feel free to reach out and give us some <a href="mailto:public-html-a11y@w3.org">feedback</a>.</p>

<h2 lang="en"><span lang="ko">무엇을 테스트 하는가？</span> | What are we testing?</h2>

<h3 lang="en">Canvas 2D</h3>

<p lang="ko"><span lang="en"><a href="http://www.w3.org/html/wg/drafts/2dcontext/html5_canvas_CR/">Canvas 2D</a></span>스펙의 일부 속성은 접근성에 대한 특수요구가 있습니다. 그 중 일부 속성은 최근에 구현된 것으로 아직 운용성 테스트를 진행하지 않았습니다.</p>

<p lang="en">The <a href="http://www.w3.org/html/wg/drafts/2dcontext/html5_canvas_CR/">Canvas 2D</a> specification has a number of features that address accessibility specifically.  Some of these features were implemented very recently and have not been tested for interoperability.</p>

<h3 lang="en">ARIA</h3>

<p lang="ko"><span lang="en">HTML5</span>에서 최초로 <span lang="en">ARIA</span>를 특별히 <span lang="en">HTML</span>스펙(표준)에 정의하였습니다.</p>

<p lang="en">HTML5 marks the first time ARIA has been specifically defined within the context of an HTML specification (see <a href="http://www.w3.org/TR/html/dom.html#sec-strong-native-semantics">3.2.7.3 Strong Native Semantics</a> and <a href="http://www.w3.org/TR/html/dom.html#sec-implicit-aria-semantics">3.2.7.4 Implicit ARIA Semantics</a>.</p>

<h3 lang="en">Interactive elements</h3>

<p lang="ko">우리는 테스터가 필요합니다. 인터랙션 요소의 키보드 접근성 특성에 대한 검증 및 인터랙션 요소의 역할, 상태 및 컴포넌트의 정확성에 대한 테스트가 필요합니다.</p>

<p lang="en">We are looking for tests that verify keyboard accessibility and tests that verify the correct role, state, and properties of interactive elements.</p>

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