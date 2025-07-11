// 주요 DOM 요소 선택
const main = document.querySelector(".main");
const gnbBox = document.querySelector(".gnb > ul");
const desBox = document.querySelector(".gnb > .design");
const pubBox = document.querySelector(".gnb > .publishing");
const photoBox = document.querySelector(".gnb > .photoshop");
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".modal-close-btn");

// ===== gnb 초기상태 =====
desBox.classList.add("hide");
pubBox.classList.add("hide");
photoBox.classList.add("hide");

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
      showMenu(desBox, gnbBox, pubBox, photoBox);
    } else if (menu === "Publishing") {
      showMenu(pubBox, gnbBox, desBox, photoBox);
    } else if (menu === "Photoshop") {
      showMenu(photoBox, gnbBox, desBox, pubBox);
    }
    // "About Me"는 아래에서 별도 처리
  });
});

// ===== 뒤로가기(화살표) 클릭 시 메인 메뉴로 복귀 =====
document
  .querySelectorAll(
    ".gnb > .design > img, .gnb > .publishing > img, .gnb > .photoshop > img"
  )
  .forEach((img) => {
    img.addEventListener("click", () => {
      showMenu(gnbBox, desBox, pubBox, photoBox);
    });
  });

// "About Me" 모달 오픈/클로즈
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

// Isotope 콘텐츠 필터링
window.addEventListener("load", () => {
  const grid = new Isotope(".section", {
    itemSelector: "article",
    transitionDuration: "0.3s",
    masonry: { columnWidth: "article" },
  });

  const btns = document.querySelectorAll(".sorting > li");

  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const sort = btn.querySelector("a").getAttribute("href");
      grid.arrange({ filter: sort });

      btns.forEach((el) => el.classList.remove("on"));
      btn.classList.add("on");
    });
  });
});
