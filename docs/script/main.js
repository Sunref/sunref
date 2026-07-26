document.addEventListener("DOMContentLoaded", function () {
	// ===== NAVEGAÇÃO POR ABAS =====
	var navItems = document.querySelectorAll(".nav-item");
	var panels = document.querySelectorAll(".tab-panel");

	navItems.forEach(function (item) {
		item.addEventListener("click", function () {
			var target = item.getAttribute("data-tab");
			var targetPanel = document.getElementById("tab-" + target);
			if (!targetPanel) return;

			navItems.forEach(function (n) {
				n.classList.remove("active");
			});
			item.classList.add("active");

			panels.forEach(function (p) {
				p.classList.remove("active");
			});
			targetPanel.classList.add("active");

			if (target === "skills") animateSkillBars();
		});
	});

	// ===== BARRAS DE SKILL (anima ao entrar na aba) =====
	function animateSkillBars() {
		document.querySelectorAll(".skill-bar").forEach(function (bar, i) {
			setTimeout(function () {
				bar.classList.add("in-view");
			}, i * 80);
		});
	}

	// anima uma vez se a página carregar já na aba de skills (ex: link direto)
	var activeNav = document.querySelector(".nav-item.active");
	if (activeNav && activeNav.dataset.tab === "skills") {
		animateSkillBars();
	}
});