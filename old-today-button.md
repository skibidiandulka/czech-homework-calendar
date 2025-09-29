# Original Today Button Implementation (Backup)

Toto je backup původní implementace today buttonu před přepsáním na jednoduší verzi.

## CSS

```css
/* Smart Today Button - Hidden on desktop, shown on mobile */
.today-button {
    position: fixed;
    bottom: 32px;
    right: 32px;
    width: 56px;
    height: 56px;
    background: var(--anthropic-coral);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    box-shadow: 0 6px 24px var(--anthropic-shadow-strong);
    transition: all 0.3s ease;
    opacity: 0;
    visibility: hidden;
    z-index: 1000;
    display: none; /* Hidden on desktop */
    align-items: center;
    justify-content: center;
}

.today-button.show {
    opacity: 1;
    visibility: visible;
}

.today-button:hover {
    background: #c15946;
    transform: translateY(-3px);
    box-shadow: 0 8px 32px var(--anthropic-shadow-strong);
}

.today-button.direction-up::before {
    content: '↑';
}

.today-button.direction-down::before {
    content: '↓';
}

@media (max-width: 768px) {
    .today-button {
        bottom: 24px;
        right: 24px;
        width: 48px;
        height: 48px;
        font-size: 18px;
        display: flex; /* Show on mobile */
    }
}
```

## JavaScript Functions

```javascript
function setupTodayButtonBehavior() {
    const todayButton = document.getElementById('todayButton');
    let ticking = false;

    // Add click event listener
    todayButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        scrollToTodayFirst();
    });

    function updateTodayButton() {
        try {
            const header = document.querySelector('.calendar-header');
            const todayCard = document.querySelector('.daily-card.today');

            if (!todayCard || !header) {
                todayButton.classList.remove('show', 'direction-up', 'direction-down');
                ticking = false;
                return;
            }

            // Check if header is visible first - iPhone compatible method
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const headerRect = header.getBoundingClientRect();
            const isHeaderVisible = headerRect.bottom > 0;

            // Debug for iPhone
            if (Math.random() < 0.01) { // Log only occasionally to avoid spam
                console.log('Header visibility:', {
                    scrollTop,
                    headerBottom: headerRect.bottom,
                    isHeaderVisible
                });
            }

            // If header is not visible, hide the today button
            if (!isHeaderVisible) {
                todayButton.classList.remove('show', 'direction-up', 'direction-down');
                ticking = false;
                return;
            }

            // Header is visible, now check today card visibility
            const viewportHeight = window.innerHeight;
            const cardOffsetTop = todayCard.offsetTop;
            const cardHeight = todayCard.offsetHeight;

            // Calculate visible area
            const cardScreenTop = cardOffsetTop - scrollTop;
            const cardScreenBottom = cardScreenTop + cardHeight;

            // Simple visibility check
            const isVisible = cardScreenTop < viewportHeight && cardScreenBottom > 0;

            if (isVisible) {
                // Today is visible - hide button
                todayButton.classList.remove('show', 'direction-up', 'direction-down');
            } else {
                // Today is not visible but header is visible - show button
                todayButton.classList.add('show');
                todayButton.classList.remove('direction-up', 'direction-down');

                if (cardScreenBottom <= 0) {
                    // Today is above screen
                    todayButton.classList.add('direction-up');
                } else {
                    // Today is below screen
                    todayButton.classList.add('direction-down');
                }
            }
        } catch (e) {
            // Fallback - just show button pointing down
            todayButton.classList.add('show', 'direction-down');
        }
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateTodayButton);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick, { passive: true });

    // Initial check with delay
    setTimeout(updateTodayButton, 300);
}

function scrollToTodayFirst() {
    const todayCard = document.querySelector('.daily-card.today');
    if (!todayCard) {
        alert('Dnešní den nenalezen!');
        return;
    }

    // Simple robust scroll - always account for potential header space
    const offsetTop = todayCard.offsetTop - 100; // 100px buffer for header + padding

    window.scrollTo({
        top: Math.max(0, offsetTop),
        behavior: 'smooth'
    });

    // Force hide button immediately (it will reappear if needed)
    const todayButton = document.getElementById('todayButton');
    todayButton.classList.remove('show', 'direction-up', 'direction-down');
}
```

## HTML

```html
<!-- Smart Today Button -->
<button class="today-button" id="todayButton"></button>
```

## Problémy původní implementace

1. **Závislost na header visibility** - tlačítko nefungovalo když header nebyl vidět
2. **Komplexní logika** - mnoho kontrol a edge cases
3. **Debug výpisy** - občasné console.log zprávy
4. **RequestAnimationFrame throttling** - možné performance problémy
5. **iPhone specific workarounds** - hack pro iOS compatibility

## Důvod přepsání

Uživatel chtěl "dumb proof" řešení které funguje vždycky, bez ohledu na stav headeru nebo jiných elementů.