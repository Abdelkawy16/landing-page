
let UIController = function () {
    const DOMStrings = {
        NavbarList: '#navbar__list',
        activeSection: '.your-active-class',
        sec: 'section'
    };
    return {
        addSection: function (indrx) {
            let html, htmlObject;
            htmlObject = document.createElement('li');
            html = `<a class="section${indrx}">section ${indrx}</a>`;
            htmlObject.innerHTML = html;
            document.querySelector(DOMStrings.NavbarList).insertAdjacentElement('beforeend', htmlObject);
        },
        isInViewPort: function (element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        },
        getDOMString: function () {
            return DOMStrings;
        }
    };
}();

let controller = function (UICtrl) {
    let setupApp = function () {
        let numOfSections = document.querySelectorAll(UICtrl.getDOMString().sec).length;
        addSections(numOfSections);
        Array.prototype.slice.call(document.querySelectorAll('a')).forEach(element => {
            element.addEventListener('click', function (event) {
                let rect = document.getElementById(event.target.getAttribute('class').split(' ')[0]);
                rect.scrollIntoView({
                    behavior: 'smooth'
                });
                [...links] = document.querySelectorAll('a');
                links.forEach(link=>{
                    if (link === event.target) {
                        link.classList.add('active');
                    }else{
                        link.classList.remove('active');
                    }
                })
            });
        });
        document.addEventListener('scroll', setActive);
    };
    let addSections = function (num) {
        for (let i = 1; i <= num; i++) {
            UICtrl.addSection(i);
        }
    };
    let setActive = function () {
        let secs = document.querySelectorAll("section");
        let secsArr = Array.prototype.slice.call(secs);
        for (let i = 0; i < secsArr.length; i++) {
            if (UICtrl.isInViewPort(secsArr[i])) {
                secsArr[i].classList.add("your-active-class");
                document.querySelector(`.section${i}`).classList.add('active');
            } else {
                secsArr[i].classList.remove("your-active-class");
            }
        }
    };
    return {
        init: function () {
            console.log('Application has started!');
            setupApp();
        }
    };
}(UIController);


controller.init();