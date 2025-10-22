// Efeito de clique nos botões da janela
document.querySelectorAll(".window-btn").forEach((btn) => {
	btn.addEventListener("click", function () {
		this.style.transform = "scale(0.95)";
		setTimeout(() => {
			this.style.transform = "scale(1)";
		}, 100);
	});
});

// Funcionalidade de arrastar a janela
const titleBar = document.querySelector(".title-bar");
const windowXP = document.querySelector(".window-xp");
const container = document.querySelector(".container");

let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

// Adiciona cursor pointer na barra de título
titleBar.style.cursor = "move";

// Prepara a janela para ser movida
windowXP.style.position = "relative";
windowXP.style.left = "0px";
windowXP.style.top = "0px";

titleBar.addEventListener("mousedown", dragStart);
document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", dragEnd);

// Suporte para touch (mobile)
titleBar.addEventListener("touchstart", dragStart);
document.addEventListener("touchmove", drag);
document.addEventListener("touchend", dragEnd);

function dragStart(e) {
	// Não arrasta se clicar nos botões
	if (e.target.classList.contains("window-btn")) {
		return;
	}

	if (e.type === "touchstart") {
		initialX = e.touches[0].clientX - xOffset;
		initialY = e.touches[0].clientY - yOffset;
	} else {
		initialX = e.clientX - xOffset;
		initialY = e.clientY - yOffset;
	}

	if (e.target === titleBar || e.target.parentElement === titleBar) {
		isDragging = true;
		windowXP.style.transition = "none";
	}
}

function drag(e) {
	if (isDragging) {
		e.preventDefault();

		if (e.type === "touchmove") {
			currentX = e.touches[0].clientX - initialX;
			currentY = e.touches[0].clientY - initialY;
		} else {
			currentX = e.clientX - initialX;
			currentY = e.clientY - initialY;
		}

		xOffset = currentX;
		yOffset = currentY;

		setTranslate(currentX, currentY, windowXP);
	}
}

function dragEnd(e) {
	if (isDragging) {
		initialX = currentX;
		initialY = currentY;
		isDragging = false;
	}
}

function setTranslate(xPos, yPos, el) {
	el.style.transform = `translate(${xPos}px, ${yPos}px)`;
}

// Relógio da barra de tarefas
function updateClock() {
	const now = new Date();
	const hours = String(now.getHours()).padStart(2, "0");
	const minutes = String(now.getMinutes()).padStart(2, "0");
	document.getElementById("clock").textContent = `${hours}:${minutes}`;
}

updateClock();
setInterval(updateClock, 1000);

// Efeito no botão Iniciar
document.querySelector(".start-button").addEventListener("click", function () {
	this.style.transform = "translateY(1px)";
	setTimeout(() => {
		this.style.transform = "translateY(0)";
	}, 100);
});
