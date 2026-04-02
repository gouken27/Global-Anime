document.addEventListener("DOMContentLoaded", () => {
    const scrollableRect = document.getElementById("scrollable-rect");
    let positionY = 0;
    const minY = -300; // Верхняя граница
    const maxY = 300;  // Нижняя граница
    let isDragging = false;

    // Скролл колесом мыши
    window.addEventListener("wheel", (event) => {
        event.preventDefault();
        positionY += event.deltaY * 0.5;
        positionY = Math.max(minY, Math.min(maxY, positionY));
        scrollableRect.style.transform = `translateY(${positionY}px)`;
    }, { passive: false });

    // Обработка касания (свайп)
    let touchStartY = 0;
    window.addEventListener("touchstart", (event) => {
        touchStartY = event.touches[0].clientY;
    });

    window.addEventListener("touchmove", (event) => {
        const touchY = event.touches[0].clientY;
        const deltaY = (touchY - touchStartY) * 0.5;
        positionY += deltaY;
        positionY = Math.max(minY, Math.min(maxY, positionY));
        scrollableRect.style.transform = `translateY(${positionY}px)`;
        touchStartY = touchY;
    });

    // Перетаскивание мышью
    window.addEventListener("mousedown", () => {
        isDragging = true;
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
    });

    window.addEventListener("mousemove", (event) => {
        if (isDragging) {
            positionY += event.movementY * 0.5;
            positionY = Math.max(minY, Math.min(maxY, positionY));
            scrollableRect.style.transform = `translateY(${positionY}px)`;
        }
    });
});