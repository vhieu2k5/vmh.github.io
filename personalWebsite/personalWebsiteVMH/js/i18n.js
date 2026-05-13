(function () {
  var STORAGE_KEY = "vhieu-site-lang";
  var defaults = new WeakMap();
  var defaultTitle = "";

  var VI = {
    "nav.home": "Trang chủ",
    "nav.cv": "CV",
    "nav.exp": "Kinh nghiệm",
    "nav.contact": "Liên hệ",
    "home.portfolio": "Portfolio",
    "intro.heading": "GIỚI THIỆU",
    "contact.heading": "Liên hệ",
    "contact.email": "Email:",
    "contact.phone": "Điện thoại:",
    "contact.github": "GitHub:",
    "contact.linkedin": "LinkedIn:",
    "scroll.hint": "Kéo xuống",
    "exp.h1_main": "Kinh nghiệm",
    "exp.h1_extra": "Hoạt động ngoại khoá & Dự án",
  };

  var TITLE_VI = {
    "title.home": "Trang chủ — Vũ Mạnh Hiếu",
    "title.intro": "Giới thiệu — Vũ Mạnh Hiếu",
    "title.exp": "Kinh nghiệm — Vũ Mạnh Hiếu",
    "title.contact": "Liên hệ — Vũ Mạnh Hiếu",
  };

  var VI_HTML = {
    home_tagline:
      "Chào mừng đến website cá nhân của tôi — nơi tôi chia sẻ thông tin, thành tích và kinh nghiệm làm việc.",
    intro_bio:
      "Bạn có tin rằng tôi có thể tự học mọi thứ không? <br>" +
      "Tôi thích khám phá ý tưởng mới, đón nhận thử thách và không ngừng mở rộng kỹ năng. Với nền tảng công nghệ đa phương tiện và đam mê thiết kế cùng phát triển, tôi luôn sẵn sàng lao vào dự án mới và đẩy ranh giới sáng tạo. Tôi tin với sự tò mò và kiên trì, không có gì là không thể tự học." +
      '<br> <span style="color: red;">Hãy làm quen với tôi nhé!</span>',
    intro_cv_col1:
      "Trong hành trình của mình, tôi đã đạt được nhiều thành tự đáng tự hào. Các dự án tôi tham gia đã mang lại giá trị lớn cho tổ chức." +
      "<br>Muốn hiểu rõ hơn về năng lực của tôi?" +
      "<br>Hãy xem mục Kinh nghiệm (Exp).",
    intro_cv_col2:
      '<span style="font-weight: 700;">Học vấn</span> <br>' +
      "- Sinh viên năm 3 ngành Công nghệ Đa phương tiện, Học viện Công nghệ Bưu chính Viễn thông (PTIT). <br>" +
      "GPA hiện tại: 3,61 <br>" +
      "- TOEIC 895 <br>" +
      "- IELTS 6.5 (tổng). <br>" +
      "- 03 học bổng Khuyến khích Học tập Xuất sắc PTIT. <br>" +
      "- Học bổng JASSO trao đổi Gifu 2025. <br>" +
      "- Sinh viên trao đổi JNBU — Hàn Quốc học kỳ 2 năm 2025–2026 <br>" +
      "- Học bổng Coursera Google Career Certificate 2025. <br>" +
      "______________________________ <br>" +
      "<br>" +
      '<span style="font-weight: 700;">Kinh nghiệm</span><br>' +
      "- Founder/Quản lý dự án truyền thông IT — COKN <br>" +
      "- Quản trị truyền thông dự án IT có lưu lượng lớn. <br>" +
      "- Thực tập sinh nghiên cứu AI tại Cao đẳng Quốc gia Gifu — Nhật Bản. <br>" +
      "- Freelance phát triển website Frontend, nhảy múa và truyền thông. <br>" +
      "______________________________ <br>" +
      "<br>" +
      '<span style="font-weight: 700;">Đóng góp & giải thưởng</span> <br>' +
      "- Tham gia Global Game Jam 2025, 2026. <br>" +
      "- Giải Nhì CAUxPTIT Hackathon 2025. <br>" +
      "- Giải Đặc biệt — Cuộc thi Khởi nghiệp Toàn cầu. <br>" +
      "- Thành viên xuất sắc CLB Nhảy trường. <br>" +
      "- Tham gia dự án MV, dự án 3D. <br>" +
      "- Tham gia hoạt động ngoại khóa và các dự án cấp quốc gia.",
  };

  var EXP_CARD_VI = {
    web_fe:
      '<span style="font-size: 30px;">Website FE</span> <br><br>Công việc freelance thiết kế website/landing page cho cửa hàng tại Nhật Bản.<br><br>Ngôn ngữ: HTML/CSS/Javascript<br><br>Nền tảng khác: Wix Studio<br><br>Nhấn vào các dự án bên cạnh để xem chi tiết.',
    game:
      '<span style="font-size: 30px;"><br>Lập trình game</span> <br><br>' +
      "- Lập trình viên game casual tại Global Game Jam 2025.<br><br>" +
      "- PM & lập trình viên game casual tại Global Game Jam 2026.<br><br>" +
      "- Lập trình viên game casual trong dự án nghiên cứu game khoa học.<br><br>",
    product3d:
      '<span style="font-size: 30px;"><br>Sản phẩm 3D</span> <br><br>' +
      "- PM sản phẩm 3D<br><br>" +
      "- Đồng góp các dự án 3D sau đây<br><br>",
    social:
      '<span style="font-size: 30px;"><br>Quản lý mạng xã hội</span> <br><br>' +
      "- Quản trị nhóm IT for Beginner hơn 260.000 thành viên (tăng trưởng tự nhiên).<br>" +
      "- Quản lý trang Coding Reshape Future với hơn 2.500 người theo dõi.<br>" +
      "- Founder/Quản lý dự án truyền thông IT COKN.<br>" +
      "- Phó ban dự án song ngữ lịch sử Việt Nam Z.His.<br>" +
      "- Thành viên Ban Truyền thông Sự kiện dự án học tiếng Anh MGTATVĐ.<br>" +
      "- Thành viên Ban Thiết kế cuộc thi marketing.<br><br>",
    pm_event:
      '<span style="font-size: 30px;"><br>PM / Người sáng lập sự kiện</span> <br><br>' +
      '- Lên ý tưởng webinar "IT Career Talk".<br>' +
      "- Tổ chức và dẫn dắt talkshow với diễn giả chuyên gia trong ngành IT định hướng cho sinh viên.<br><br>",
    dancer:
      '<span style="font-size: 30px;"><br>Nhảy múa</span> <br><br>' +
      "- Thành viên CLB Nghệ thuật Dance PTIT.<br>" +
      "- Tham gia nhiều tiết mục và cuộc thi nhảy.<br><br>",
    design:
      '<span style="font-size: 30px;"><br>Thiết kế</span> <br><br>' +
      "- Các dự án thiết kế tự do của tôi<br><br>",
    mv:
      '<span style="font-size: 30px;"><br>MV</span> <br><br>' +
      "- Ca sĩ trong MV của CLB.<br>" +
      "- Diễn viên trong MV của CLB.<br>" +
      "- Đạo diễn & diễn viên trong dự án MV.<br><br>",
  };

  var LABEL_VI = {
    "Landing Page Spa Beauty": "Landing page spa làm đẹp",
    "Website Multi-service Aozora": "Website đa dịch vụ Aozora",
    "Real Estate Website": "Website bất động sản",
    "Furniture Store Website": "Website cửa hàng nội thất",
    "Wood Crafting Website": "Website đồ gỗ thủ công",
    "Banhmi Stall - Developer": "Banhmi Stall — Lập trình viên",
    "Way to Home-PM & Developer": "Way to Home — PM & Lập trình viên",
    "Elemask - PM & Developer - Gamejam2026": "Elemask — PM & Lập trình viên — Game Jam 2026",
    "1st Game ever made - Bubble Princess - Gamejam 2025":
      "Game đầu tiên — Bubble Princess — Game Jam 2025",
    "Abandon Parking": "Bãi đỗ bỏ hoang",
    "Ocean Floor": "Đáy đại dương",
    "Admin Group Facebook": "Quản trị nhóm Facebook",
    "Coding Reshape Future": "Coding Reshape Future",
    "Z.His Project": "Dự án Z.His",
    "Event Communications": "Truyền thông sự kiện",
    "Certificate": "Chứng chỉ",
    "Event Team member": "Thành viên ban sự kiện",
    "IT Career Talk": "IT Career Talk",
    "Dev Career Talk": "Dev Career Talk",
    "Logo Page Design": "Thiết kế logo trang",
    "MiniGame Social Design": "Thiết kế minigame mạng xã hội",
    "Facebook Event Design": "Thiết kế sự kiện Facebook",
    "Facebook Page Design": "Thiết kế trang Facebook",
    "Actor": "Diễn viên",
    "Director & Actor": "Đạo diễn & diễn viên",
    "Singer": "Ca sĩ",
  };

  var PILL_VI = {
    "Product link": "Link sản phẩm",
    "GitHub link": "Link GitHub",
    "Demo link": "Link demo",
    "Video Gameplay": "Video gameplay",
    "Video Link": "Link video",
    "Post Link": "Link bài đăng",
    "Link Facebook": "Link Facebook",
    "Link Page": "Link trang",
    "Link YouTube Recap": "Tóm tắt YouTube",
    Github: "GitHub",
  };

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) === "vi" ? "vi" : "en";
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang === "vi" ? "vi" : "en");
    document.documentElement.setAttribute("lang", lang);
    apply();
    syncToggle();
  }

  function remember(el, asHtml) {
    if (defaults.has(el)) return;
    defaults.set(el, asHtml ? el.innerHTML : el.textContent);
  }

  function normPill(s) {
    return String(s).replace(/\s+/g, " ").trim();
  }

  function apply() {
    var lang = getLang();
    if (!defaultTitle) defaultTitle = document.title;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      remember(el, false);
      var k = el.getAttribute("data-i18n");
      var base = defaults.get(el);
      el.textContent = lang === "vi" && VI[k] ? VI[k] : base;
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      remember(el, true);
      var k = el.getAttribute("data-i18n-html");
      var base = defaults.get(el);
      el.innerHTML = lang === "vi" && VI_HTML[k] ? VI_HTML[k] : base;
    });

    document.querySelectorAll("[data-exp-card]").forEach(function (el) {
      remember(el, true);
      var id = el.getAttribute("data-exp-card");
      var base = defaults.get(el);
      el.innerHTML = lang === "vi" && EXP_CARD_VI[id] ? EXP_CARD_VI[id] : base;
    });

    document.querySelectorAll(".product-label").forEach(function (el) {
      remember(el, false);
      var base = defaults.get(el);
      var t = base.trim();
      el.textContent = lang === "vi" && LABEL_VI[t] ? LABEL_VI[t] : base;
    });

    document.querySelectorAll("a.pill").forEach(function (el) {
      remember(el, false);
      var base = defaults.get(el);
      var key = normPill(base);
      el.textContent = lang === "vi" && PILL_VI[key] ? PILL_VI[key] : base;
    });

    var tk = document.documentElement.getAttribute("data-i18n-title");
    if (tk && TITLE_VI[tk]) {
      document.title = lang === "vi" ? TITLE_VI[tk] : defaultTitle;
    }
  }

  var FLAG_VN =
'<svg class="lang-flag-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="30" height="20" aria-hidden="true"><rect width="300" height="200" fill="#da251d"/><path fill="#ffcd00" d="M150 40 L168 88 L220 88 L178 118 L194 168 L150 138 L106 168 L122 118 L80 88 L132 88 Z"/></svg>';
  var FLAG_GB =
    '<svg class="lang-flag-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="28" height="14" aria-hidden="true"><path fill="#012169" d="M0 0h60v30H0z"/><path stroke="#fff" stroke-width="6" d="M0 0l60 30M60 0L0 30"/><path stroke="#c8102e" stroke-width="3.5" d="M0 0l60 30M60 0L0 30"/><path stroke="#fff" stroke-width="10" d="M30 0v30M0 15h60"/><path stroke="#c8102e" stroke-width="6" d="M30 0v30M0 15h60"/></svg>';

  var toggleBtn;
  var vnFlagBtn;
  var enFlagBtn;

  function syncToggle() {
    if (!toggleBtn) return;
    var lang = getLang();
    toggleBtn.textContent = lang === "vi" ? "EN" : "VI";
    toggleBtn.setAttribute("aria-pressed", lang === "vi" ? "true" : "false");
    toggleBtn.title = lang === "vi" ? "Switch to English" : "Chuyển sang tiếng Việt";
    if (vnFlagBtn) {
      vnFlagBtn.classList.toggle("is-active", lang === "vi");
      vnFlagBtn.setAttribute("aria-pressed", lang === "vi" ? "true" : "false");
    }
    if (enFlagBtn) {
      enFlagBtn.classList.toggle("is-active", lang === "en");
      enFlagBtn.setAttribute("aria-pressed", lang === "en" ? "true" : "false");
    }
  }

  function ensureToggle() {
    if (document.getElementById("lang-switcher")) return;

    var wrap = document.createElement("div");
    wrap.id = "lang-switcher";
    wrap.className = "lang-switcher";
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", "Chọn ngôn ngữ / Language");

    vnFlagBtn = document.createElement("button");
    vnFlagBtn.type = "button";
    vnFlagBtn.className = "lang-flag-btn lang-flag-btn--vn";
    vnFlagBtn.setAttribute("aria-label", "Tiếng Việt");
    vnFlagBtn.title = "Tiếng Việt";
    vnFlagBtn.innerHTML = FLAG_VN;
    vnFlagBtn.addEventListener("click", function () {
      setLang("vi");
    });

    toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.id = "lang-toggle";
    toggleBtn.className = "lang-toggle";
    toggleBtn.setAttribute("aria-label", "Chuyển ngôn ngữ / Switch language");
    toggleBtn.addEventListener("click", function () {
      setLang(getLang() === "vi" ? "en" : "vi");
    });

    enFlagBtn = document.createElement("button");
    enFlagBtn.type = "button";
    enFlagBtn.className = "lang-flag-btn lang-flag-btn--en";
    enFlagBtn.setAttribute("aria-label", "English");
    enFlagBtn.title = "English";
    enFlagBtn.innerHTML = FLAG_GB;
    enFlagBtn.addEventListener("click", function () {
      setLang("en");
    });

    wrap.appendChild(vnFlagBtn);
    wrap.appendChild(toggleBtn);
    wrap.appendChild(enFlagBtn);
    document.body.appendChild(wrap);
    syncToggle();
  }

  function init() {
    document.documentElement.setAttribute("lang", getLang());
    ensureToggle();
    apply();
    syncToggle();
  }

  document.addEventListener("DOMContentLoaded", init);
  document.addEventListener("headers-loaded", apply);
})();
