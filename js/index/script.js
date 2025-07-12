// ===== 변수 선언 =====
const main = document.querySelector(".main");
const uiuxBg = document.querySelector(".overlay-uiux");
const pubBg = document.querySelector(".overlay-publishing");
const desBg = document.querySelector(".overlay-design");
const gnbBox = document.querySelector(".gnb > ul");
const uiuxBox = document.querySelector(".gnb > .uiux");
const pubBox = document.querySelector(".gnb > .publishing");
const desBox = document.querySelector(".gnb > .design");
const contents = document.querySelector(".contents");
const contentLinks = document.querySelectorAll(".contents > a");
const titleSpan = document.querySelector(".title span");
const titleP = document.querySelector(".title p");
const footer = document.querySelector(".footer");
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".modal-close-btn");

// ===== gnb 초기상태 =====
uiuxBox.classList.add("hide");
pubBox.classList.add("hide");
desBox.classList.add("hide");

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
    if (menu === "UI/UX") {
      showMenu(uiuxBox, gnbBox, pubBox, desBox);
    } else if (menu === "Publishing") {
      showMenu(pubBox, gnbBox, uiuxBox, desBox);
    } else if (menu === "Design") {
      showMenu(desBox, gnbBox, uiuxBox, pubBox);
    }
    // "About Me"는 아래에서 별도 처리
  });
});

// ===== 뒤로가기(화살표) 클릭 시 메인 메뉴로 복귀 =====
document
  .querySelectorAll(
    ".gnb > .uiux > img, .gnb > .publishing > img, .gnb > .design > img"
  )
  .forEach((img) => {
    img.addEventListener("click", () => {
      showMenu(gnbBox, uiuxBox, pubBox, desBox);
    });
  });

// ===== 컨텐츠 링크(카드) 인터랙션 =====
contentLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    // 오버레이 활성화
    if (link.classList.contains("uiux")) {
      uiuxBg.classList.add("active");
    } else if (link.classList.contains("publishing")) {
      pubBg.classList.add("active");
    } else if (link.classList.contains("design")) {
      desBg.classList.add("active");
    }
    // 나머지 링크 흐리게
    contentLinks.forEach((other) => {
      if (other !== link) other.classList.add("dimmed");
    });
  });

  link.addEventListener("mouseleave", () => {
    // 오버레이 비활성화 및 흐림 효과 해제
    uiuxBg.classList.remove("active");
    pubBg.classList.remove("active");
    desBg.classList.remove("active");
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

// ===== "About Me" 클릭 시 모달 오픈/클로즈 =====
const aboutMeLink = Array.from(
  document.querySelectorAll(".gnb > ul > li > a.mainmenu")
).find((a) => a.textContent.trim() === "About Me");

function openModal() {
  modal.style.visibility = "visible";
  modal.style.pointerEvents = "auto";
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  document.body.style.overflow = "";
  setTimeout(() => {
    modal.style.visibility = "hidden";
    modal.style.pointerEvents = "none";
  }, 400); // transition 시간과 맞춤
}

if (aboutMeLink) {
  aboutMeLink.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
  });
}
if (closeBtn) {
  closeBtn.addEventListener("click", closeModal);
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) {
    closeModal();
  }
});
