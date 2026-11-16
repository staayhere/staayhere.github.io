/* ==========================================================================
   main.js
   ========================================================================== */

/* contact — 클릭 시 이메일 복사 시도
   성공: 링크 이동을 막고 copied 상태 약 2초 표시 + aria-live 알림
   실패(file://, 권한 차단 등): mailto 기본 동작으로 메일 앱 열기 */
(function () {
  var COPIED_DURATION = 2000;
  var links = document.querySelectorAll("[data-copy]");
  var status = document.getElementById("copy-status");

  links.forEach(function (link) {
    var timer;

    link.addEventListener("click", function (event) {
      // 복사 API를 쓸 수 없으면 기본 동작(mailto) 그대로
      if (!window.isSecureContext || !navigator.clipboard) return;

      event.preventDefault();

      navigator.clipboard.writeText(link.dataset.copy).then(
        function () {
          var copiedText = link.querySelector(".meta--copied");

          link.classList.add("is-copied");
          if (status) {
            // 같은 문구를 다시 읽도록 비운 뒤 넣음
            status.textContent = "";
            window.setTimeout(function () {
              status.textContent = copiedText ? copiedText.textContent : "";
            }, 50);
          }

          window.clearTimeout(timer);
          timer = window.setTimeout(function () {
            link.classList.remove("is-copied");
            if (status) status.textContent = "";
          }, COPIED_DURATION);
        },
        function () {
          window.location.href = link.href;
        }
      );
    });
  });
})();

/* about 모달 — <dialog> + showModal()
   닫기 버튼·Esc로 닫힘. 닫히면 여는 버튼으로 포커스 복귀(dialog 기본 동작)
   열린 동안 뒤 화면 스크롤 막기 */
(function () {
  var root = document.documentElement;

  document.querySelectorAll("[data-modal-open]").forEach(function (opener) {
    var dialog = document.getElementById(opener.dataset.modalOpen);
    if (!dialog || typeof dialog.showModal !== "function") return;

    opener.addEventListener("click", function () {
      dialog.showModal();
      root.classList.add("is-modal-open");
    });

    dialog.querySelectorAll("[data-modal-close]").forEach(function (button) {
      button.addEventListener("click", function () {
        dialog.close();
      });
    });

    // Esc·close() 모두 close 이벤트가 발생함
    dialog.addEventListener("close", function () {
      root.classList.remove("is-modal-open");
    });
  });
})();
