function Slider(roundSliders, effect = 'slide') {
    const slider = {};
    const renders = {
        default: render,
        slide: render,
        fadeOut: fadeOutRender
    };

    slider._el = document.querySelector('.slider');
    slider._body = slider._el.querySelector('.slider__body');
    slider._items = slider._body.querySelectorAll('.slider__item');
    slider._controls = slider._el.querySelector('.slider__controls');

    slider._controlItems = [];
    slider._elementsCount = slider._items.length;
    slider._currentSlideId = 0;

    slider.render = renders[effect] || renders.default;
    slider._setCurrentSlideId = setCurrentSlideId;
    slider.next = nextSlide;
    slider.prev = prevSlide;

    fillControls();
    setEffect();
    slider.render();

    function fillControls() {
        for(let id = 0; id < slider._elementsCount; id++) {
            const item = createControl(id.toString());

            slider._controlItems.push(item);
            slider._controls.append(item);
        }
    }

    function removeActive() {
        const activeItem = slider._controls.querySelector('.slider__controls-item--active');

        if (activeItem) {
            activeItem.classList.remove('slider__controls-item--active');
        }
    }

    function setActiveControl() {
        const activeItem = slider._controlItems[slider._currentSlideId];

        activeItem.classList.add('slider__controls-item--active');
    }

    function createControl(id) {
        const li = document.createElement('li');

        li.className = 'slider__controls-item';
        li.dataset.id = id;

        return li;
    }

    function setEffect() {
        slider._body.classList.add(`slider__body--${effect}`);
    }

    function render() {
        removeActive();
        setActiveControl();
        slider._body.style.transform = `translateX(-${slider._currentSlideId * 100}%)`;
    }

    function fadeOutRender() {
        removeActive();
        setActiveControl();

        const currentSlide = slider._items[slider._currentSlideId],
            activeSlide = slider._body.querySelector('.slider__item--active');

        if (activeSlide) {
            activeSlide.classList.remove('slider__item--active');
        }

        currentSlide.classList.add('slider__item--active');
    }

    function setCurrentSlideId( id ) {
        const newId = parseInt(id, 10);

        if (!isNaN(newId) && newId >= 0 && newId < slider._elementsCount) {
            slider._currentSlideId = newId;
            slider.render();
        }
    }

    function nextSlide() {
        const nextId = roundSliders
            ? (slider._currentSlideId + 1) % slider._elementsCount
            : slider._currentSlideId + 1;

        slider._setCurrentSlideId(nextId);
    }

    function prevSlide() {
        const prevId = roundSliders
            ? (slider._currentSlideId - 1 + slider._elementsCount) % slider._elementsCount
            : slider._currentSlideId - 1;

        slider._setCurrentSlideId(prevId);
    }

    return slider;
}

const slider = Slider(true, 'fadeOut');

console.log(slider);
