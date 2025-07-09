// 변수선언
const main = document.querySelector(".main");
const desBg = document.querySelector(".overlay-design");
const pubBg = document.querySelector(".overlay-publishing");
const gnbBox = document.querySelector(".gnb > ul");
const desBox = document.querySelector(".gnb > .design");
const pubBox = document.querySelector(".gnb > .publishing");
const contents = document.querySelector(".contents");
const contentLinks = document.querySelectorAll(".contents > a");
const titleSpan = document.querySelector(".title span");
const titleP = document.querySelector(".title p");
const footer = document.querySelector(".footer");

// gnb 초기상태
desBox.classList.add("hide");
pubBox.classList.add("hide");

// ===== 메뉴 전환 함수 =====
function showMenu(showEl, ...hideEls) {
  showEl.classList.remove("hide");
  hideEls.forEach((el) => el.classList.add("hide"));
}

// ===== 메인 메뉴 클릭 이벤트 =====
document.querySelectorAll(".gnb > ul > li > a.mainmenu").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const menu = link.textContent.trim();
    if (menu === "Design") {
      showMenu(desBox, gnbBox, pubBox);
    } else if (menu === "Publishing") {
      showMenu(pubBox, gnbBox, desBox);
    }
  });
});

// ===== 뒤로가기(화살표) 클릭 시 메인 메뉴로 복귀 =====
document
  .querySelectorAll(".gnb > .design > img, .gnb > .publishing > img")
  .forEach((img) => {
    img.addEventListener("click", () => {
      showMenu(gnbBox, desBox, pubBox);
    });
  });

// ===== 컨텐츠 링크(카드) 인터랙션 =====
contentLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    // 오버레이 활성화
    if (link.classList.contains("design")) {
      desBg.classList.add("active");
    } else if (link.classList.contains("publishing")) {
      pubBg.classList.add("active");
    }
    // 나머지 링크 흐리게
    contentLinks.forEach((other) => {
      if (other !== link) other.classList.add("dimmed");
    });
  });

  link.addEventListener("mouseleave", () => {
    // 오버레이 비활성화
    desBg.classList.remove("active");
    pubBg.classList.remove("active");
    // 흐림 효과 해제
    contentLinks.forEach((other) => {
      other.classList.remove("dimmed");
    });
  });
});

// ===== 컨텐츠 영역 전체 호버 시 효과 =====
contents.addEventListener("mouseenter", () => {
  titleSpan.classList.add("hover-white");
  titleP.classList.add("hover-white");
  footer.classList.add("hover-white");
  main.style.backgroundColor = "#03101d";
});

contents.addEventListener("mouseleave", () => {
  titleSpan.classList.remove("hover-white");
  titleP.classList.remove("hover-white");
  footer.classList.remove("hover-white");
  main.style.backgroundColor = "";
});
