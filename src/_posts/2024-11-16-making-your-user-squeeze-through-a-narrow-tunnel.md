---
layout: post
id: 5
title: "Making your user squeeze through a narrow tunnel"
date: 2024-11-16 10:35:49 +0300
description: "Completely frictionless isn't always the best solution. Throwing some obstacles in the way can make things feel almost instantanious."
image: "/images/ape.jpg"
---

When playing video games, you've probably noticed those sections where your character is forced to walk slowly through a long corridor while having chat with someone or where they squeeze through a narrow tunnel. One reason for this is to allow the next section of the game to load. It's a handy way to create a continuous experience for the player.

I've rarely found game design techniques to be applicable to web design, but I couldn't help but think about those hidden loading sequences from games when we were building a feature for a client. The crux of the feature was to allow users to create questionnaires out of video transcripts using AI. The problem? The videos can be anything from a couple of minutes to a couple of hours long. Therefore, as the prompt for the AI included the entire transcript, it could take some time to process the request to generate the questionnaire. Due to that variance, we could perhaps make the users _feel_ like there's no waiting at all for most of the videos.

<div class="flex items-center justify-center max-w-xs gap-2 p-4 mx-auto my-8 border border-white rounded-md animate-pulse" style="color: sandybrown; filter: drop-shadow(0px 0px 3px hotpink)" aria-hidden="true">
  <div class="w-6 h-6">
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="216" y1="128" x2="216" y2="176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="192" y1="152" x2="240" y2="152" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="80" y1="40" x2="80" y2="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="56" y1="64" x2="104" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="168" y1="184" x2="168" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="152" y1="200" x2="184" y2="200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="144" y1="80" x2="176" y2="112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><rect x="21.49" y="105.37" width="213.02" height="45.25" rx="8" transform="translate(-53.02 128) rotate(-45)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
  </div>
  Generate questionnaire
</div>

So what do we do? I like to think of UX design as playing magic tricks on the users. Since we were working with a Ruby on Rails app that has been around for over 10+ years (and to be efficient), we wanted to do something simple. What we needed to do was play some time until the AI had managed to generate the questions, like a video game would by forcing the player to walk through a corridor. Instead of removing friction from the flow, we add some. After the user clicks the button, we start a background job and then greet them with a static view. Here are the considerations that we had:

- We want to indicate that the request is being processed, so we show a spinner.
- We don't want the user to click "back" on their browser so that we don't queue up the same job multiple times, so we redirect them by force after a while.
- Due to the variance in how long the AI takes to process the request, we didn't want to build auto-redirect to the processed questions so that the user wouldn't stay on the page waiting for the questions to be generated. We'd rather have them work on something else if the process takes long.

<div class="grid w-full grid-cols-1 mt-6 border border-white rounded-lg h-min-content" aria-hidden="true">
  <div class="flex items-center justify-start w-full gap-2 px-2 py-2 bg-white border-b border-white sm:gap-3">
    <a href="/" class="flex items-center w-5 h-5 pl-1 text-sm">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="216" y1="128" x2="40" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="112 56 40 128 112 200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
    </a>
    <div class="flex items-center w-5 h-5 pl-1">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="144 56 216 128 144 200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
    </div>
    <div class="flex items-center w-5 h-5 cursor-pointer" onclick="window.location.reload()">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><polyline points="184 104 232 104 232 56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M188.4,192a88,88,0,1,1,1.83-126.23L232,104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
    </div>
    <div class="flex items-center w-full h-8 pl-3 sm:pl-2  text-xs sm:text-sm overflow-x-auto border border-white rounded-full whitespace-nowrap grow [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <script>document.write(window.location.href)</script>
    </div>
    <div class="flex items-center w-5 h-5 ">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><circle fill="currentColor" cx="128" cy="128" r="12"/><circle fill="currentColor" cx="128" cy="60" r="12"/><circle fill="currentColor" cx="128" cy="196" r="12"/></svg>
    </div>
  </div>
  <div class="flex flex-col items-center justify-center w-full py-12 aspect-video">
    <div class="w-8 animate-spin">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="128" y1="32" x2="128" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="224" y1="128" x2="192" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="195.88" y1="195.88" x2="173.25" y2="173.25" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="128" y1="224" x2="128" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="60.12" y1="195.88" x2="82.75" y2="173.25" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="32" y1="128" x2="64" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="60.12" y1="60.12" x2="82.75" y2="82.75" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
    </div>
    <p class="max-w-lg text-center text-balance">We're processing your request. You can leave the page and continue working on other things. <br/> We'll notify you when it's done.</p>
    <p class="text-sm text-center">Redirecting you in <span id="countdown">30</span> seconds...</p>
    <script>
      function startTimer() {
        let timeLeft = 30;
        const timerElement = document.getElementById('countdown');
        
        const timer = setInterval(() => {
          timeLeft--;
          timerElement.textContent = timeLeft;
          
          if (timeLeft <= 0) {
            timeLeft = 30;
          }
        }, 1000);
      }
      startTimer();
    </script>
  </div>
</div>

In most cases, the user will be greeted with a notification alerting them that the questions are ready right after the redirect – especially if they let the timer run out. This is really what we want, but we also want to make sure they can continue creating content and queue up another questionnaire if the process takes longer than expected. While we could've just given the users a flash notification and let them continue working on other things, we wanted to make the user feel like the questions get generated instantly (at least most of the time) and that they could also keep focusing on one thing at a time. By mitigating the opportunities for the user to get side-tracked, we make sure the questionnaires get reviewed and published as the task is fresh on the user's mind. Sometimes even a simple solution like this can be effective.
