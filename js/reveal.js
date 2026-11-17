/* ==========================================================================
   reveal.js — 상세화면 스크롤 등장 애니메이션
   대상: prj-overview, prj-cover, prj-chapter-header, prj-section
   - 화면에 들어올 때 한 번만 .is-revealed를 붙임
   - 첫 화면에 이미 보이는 요소는 로드 시 바로 실행
   - html.has-reveal이 없으면(동작 줄이기 설정, IntersectionObserver 미지원) 아무것도 하지 않음
   ========================================================================== */
(function () {
    var root = document.documentElement;
    if (!root.classList.contains("has-reveal")) return;

    var targets = document.querySelectorAll(".prj-overview, .prj-cover, .prj-chapter-header, .prj-section");

    function reveal(el) {
        el.classList.add("is-revealed");
    }

    var observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                reveal(entry.target);
                observer.unobserve(entry.target);
            });
        },
        // 화면 아래쪽 10% 안으로 들어왔을 때 실행
        { rootMargin: "0px 0px -10% 0px" },
    );

    targets.forEach(function (el) {
        // 첫 화면에 보이는 요소(또는 이미 지나간 요소)는 바로 실행
        if (el.getBoundingClientRect().top < window.innerHeight) {
            reveal(el);
        } else {
            observer.observe(el);
        }
    });
})();
