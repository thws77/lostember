export function smoothScroll(container, target, duration = 3000) {
    return new Promise((resolve) => {

        const start = container.scrollTop;

        const end = target.offsetTop;

        const distance = end - start;

        let startTime = null;

        function animate(currentTime) {

            if (!startTime) {
                startTime = currentTime;
            }

            const elapsed = currentTime - startTime;

            const progress = Math.min(elapsed / duration, 1);

            const ease =
                progress < 0.5
                    ? 2 * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            container.scrollTop = start + distance * ease;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                resolve();
            }
        }
        requestAnimationFrame(animate);
    });
}