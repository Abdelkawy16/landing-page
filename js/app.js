
let UIController = function () {
    const DOMStrings = {
        NavbarList: '#navbar__list',
        sec: 'section',
        activeSection: "your-active-class",
        activeClass: "active"
    };
    return {
        // adding navigation menu
        addSection: function (indrx) {
            let html, htmlObject;
            htmlObject = document.createElement('li');
            html = `<a class="section${indrx}">section ${indrx}</a>`;
            htmlObject.innerHTML = html;
            document.querySelector(DOMStrings.NavbarList).insertAdjacentElement('beforeend', htmlObject);
        },
        // check if the section in view port
        isInViewPort: function (el) {
            let rect = el.getBoundingClientRect(),
                vWidth = window.innerWidth || document.documentElement.clientWidth,
                vHeight = window.innerHeight || document.documentElement.clientHeight,
                efp = function (x, y) { return document.elementFromPoint(x, y) };

            // Return false if it's not in the viewport
            if (rect.right < 0 || rect.bottom < 0
                || rect.left > vWidth || rect.top > vHeight)
                return false;

            // Return true if any of its four corners are visible
            return (
                el.contains(efp(rect.left, rect.top))
                || el.contains(efp(rect.right, rect.top))
                || el.contains(efp(rect.right, rect.bottom))
                || el.contains(efp(rect.left, rect.bottom))
            );
        },
        getDOMString: function () {
            return DOMStrings;
        }
    };
}();

let controller = function (UICtrl) {
    let setupAppListenter = function () {
        let numOfSections = document.querySelectorAll(UICtrl.getDOMString().sec).length;
        addSections(numOfSections);
        Array.prototype.slice.call(document.querySelectorAll('a')).forEach(element => {
            element.addEventListener('click', function (event) {
                let rect = document.getElementById(event.target.getAttribute('class').split(' ')[0]);
                rect.scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        document.addEventListener('scroll', setActive);
    };
    let addSections = function (num) {
        for (let i = 1; i <= num; i++) {
            UICtrl.addSection(i);
        }
    };
    //setting active to navbar and section
    let setActive = function () {
        let sections = document.querySelectorAll("section");
        let sectonsArr = Array.prototype.slice.call(sections);
        [...links] = document.querySelectorAll('a');

        for (let i = 0; i < sectonsArr.length; i++) {
            if (UICtrl.isInViewPort(sectonsArr[i])) {
                sectonsArr[i].classList.add(UICtrl.getDOMString().activeSection);
                links[i].classList.add(UICtrl.getDOMString().activeClass);
            } else {
                sectonsArr[i].classList.remove(UICtrl.getDOMString().activeSection);
                links[i].classList.remove(UICtrl.getDOMString().activeClass);
            }
        }
    };
    return {
        init: function () {
            console.log('Application has started!');
            setupAppListenter();
        }
    };
}(UIController);


controller.init();