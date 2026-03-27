// Efeito de clique nos botões da janela
document.querySelectorAll(".window-btn").forEach((btn) => {
	btn.addEventListener("click", function () {
		this.style.transform = "scale(0.95)";
		setTimeout(() => {
			this.style.transform = "scale(1)";
		}, 100);
	});
});

// Funcionalidade de arrastar — move o wrapper inteiro (janela + terminal)
const titleBar = document.querySelector(".title-bar");
const windowWrapper = document.querySelector(".window-wrapper");

let isDragging = false;
let currentX = 0;
let currentY = 0;
let initialX = 0;
let initialY = 0;
let xOffset = 0;
let yOffset = 0;

titleBar.addEventListener("mousedown", dragStart);
document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", dragEnd);

// Suporte para touch (mobile)
titleBar.addEventListener("touchstart", dragStart, { passive: false });
document.addEventListener("touchmove", drag, { passive: false });
document.addEventListener("touchend", dragEnd);

function dragStart(e) {
	if (e.target.classList.contains("window-btn")) return;

	const clientX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
	const clientY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;

	initialX = clientX - xOffset;
	initialY = clientY - yOffset;

	isDragging = true;
}

function drag(e) {
	if (!isDragging) return;
	e.preventDefault();

	const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
	const clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;

	currentX = clientX - initialX;
	currentY = clientY - initialY;

	xOffset = currentX;
	yOffset = currentY;

	windowWrapper.style.transform = `translate(${currentX}px, ${currentY}px)`;
}

function dragEnd() {
	if (!isDragging) return;
	initialX = currentX;
	initialY = currentY;
	isDragging = false;
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