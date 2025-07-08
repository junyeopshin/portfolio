const gnbUl = document.querySelector(".gnb > ul");
const designDiv = document.querySelector(".gnb > .design");
const publishingDiv = document.querySelector(".gnb > .publishing");

// 초기 상태: design, publishing 숨김
designDiv.classList.add("hide");
publishingDiv.classList.add("hide");

// 전환 함수
function showMenu(showEl, ...hideEls) {
  showEl.classList.remove("hide");
  hideEls.forEach((el) => el.classList.add("hide"));
}

// 메뉴 클릭 이벤트
document.querySelectorAll(".gnb > ul > li > a.mainmenu").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    if (link.textContent.trim() === "Design") {
      showMenu(designDiv, gnbUl, publishingDiv);
    } else if (link.textContent.trim() === "Publishing") {
      showMenu(publishingDiv, gnbUl, designDiv);
    }
  });
});

// 뒤로가기(왼쪽 화살표) 클릭 시 메인 메뉴로 복귀
document
  .querySelectorAll(".gnb > .design > img, .gnb > .publishing > img")
  .forEach((img) => {
    img.addEventListener("click", () => {
      showMenu(gnbUl, designDiv, publishingDiv);
    });
  });

//   호버했을때 배경 나오게하기
const overlayDesign = document.querySelector(".overlay-design");
const overlayPublishing = document.querySelector(".overlay-publishing");
const contentLinks = document.querySelectorAll(".contents > a");

contentLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    if (link.classList.contains("design")) {
      overlayDesign.classList.add("active");
    } else if (link.classList.contains("publishing")) {
      overlayPublishing.classList.add("active");
    }
  });
  link.addEventListener("mouseleave", () => {
    overlayDesign.classList.remove("active");
    overlayPublishing.classList.remove("active");
  });
});

// 글자색바꾸기
const titleSpan = document.querySelector(".title span");
const titleP = document.querySelector(".title p");
const footer = document.querySelector(".footer");
document.querySelectorAll(".contents > a").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    titleSpan.classList.add("hover-white");
    titleP.classList.add("hover-white");
    footer.classList.add("hover-white");
  });
  item.addEventListener("mouseleave", () => {
    titleSpan.classList.remove("hover-white");
    titleP.classList.remove("hover-white");
    footer.classList.remove("hover-white");
  });
});

// a태그 호버시 나머지 흐리게
// const contentLinks = document.querySelectorAll(".contents > a");
contentLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    contentLinks.forEach((other) => {
      if (other !== link) {
        other.classList.add("dimmed");
      }
    });
  });
  link.addEventListener("mouseleave", () => {
    contentLinks.forEach((other) => {
      other.classList.remove("dimmed");
    });
  });
});

document.querySelectorAll(".contents > a").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    if (link.classList.contains("design")) {
      overlayDesign.classList.add("active");
    } else if (link.classList.contains("publishing")) {
      overlayPublishing.classList.add("active");
    }
  });
  link.addEventListener("mouseleave", () => {
    overlayDesign.classList.remove("active");
    overlayPublishing.classList.remove("active");
  });
});
