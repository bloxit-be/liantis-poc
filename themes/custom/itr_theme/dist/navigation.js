/******/ (function() { // webpackBootstrap
window.addEventListener('DOMContentLoaded', () => {
    const mqL = window.matchMedia('(min-width: 1024px)');
    const navToggle = document.querySelector('.js-mobile-nav-toggle');
    const body = document.querySelector('html');
    const searchToggle = document.querySelector('.btn-main-search');
    const bgOverlay = document.querySelector('.js-header-overlay');
    const navSecondary = document.querySelector('.nav-secondary');
    const subDropdown = document.querySelector('.navigation__dropdown');
    const langSwitch = document.querySelector('.lang-switch');
    const navWrapper = document.querySelector('.main-navigation__wrapper');
    const navItems = document.querySelectorAll('.main-navigation__items .navigation__link--w-sub');
    const navTabTriggers = document.querySelectorAll('.js-nav-tab-trigger');
    const subBack = document.querySelectorAll('.js-sub-back');
    const navSecondaryClone = langSwitch.cloneNode(true);
    const langSwitchClone = navSecondary.cloneNode(true);
    if (document.getElementsByClassName('btn-header-cta').length > 0) {
        const headerCtaClone = document.querySelector('.btn-header-cta').cloneNode(true);
        navWrapper.appendChild(headerCtaClone);
    }
    navWrapper.appendChild(langSwitchClone).appendChild(navSecondaryClone);
    function resetScrollPositionDropdown() {
        navWrapper.scrollTop = 0;
        subDropdown.scrollTop = 0;
    }
    function openNav() {
        body.classList.add('nav-is-open');
    }
    function closeNav() {
        if (body.classList.contains('nav-is-open')) {
            body.classList.remove('nav-is-open');
        }
    }
    function openSubNav(subnavTrigger, target = null) {
        const dropdown = subnavTrigger.closest('.navigation__item').querySelector('.navigation__dropdown');
        body.classList.add('sub-nav-is-open');
        if (dropdown.classList.contains('sub-open')) {
            dropdown.querySelectorAll('[data-target-result]').forEach(panel => { panel.classList.remove('is-open'); });
            if (target) {
                dropdown.querySelector(`[data-target-result=${target}]`).classList.add('is-open');
            }
            dropdown.classList.add('sub-sub-open');
        }
        else {
            dropdown.classList.add('sub-open');
        }
    }
    function closeSubNav(btn) {
        const dropdown = btn.closest('.navigation__dropdown');
        if (dropdown.classList.contains('sub-sub-open')) {
            dropdown.classList.remove('sub-sub-open');
        }
        else {
            dropdown.classList.remove('sub-open');
            body.classList.remove('sub-nav-is-open');
        }
    }
    function isTouchEnabled() {
        return ('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0);
    }
    function handleClick(e) {
        e.preventDefault();
        const activeClass = 'link--active';
        const activeClassContent = 'is-active';
        const index = Array.from(this.parentNode.children).indexOf(this);
        const subTabClass = window.innerWidth < 940 ? 'main-menu__sub-block-tabs-nav__item--has-children' : 'main-menu__sub-block-tabs-nav__item--with-sub';
        if (this.classList.contains(subTabClass)) {
            resetScrollPositionDropdown();
            const subBlockTabsNav = this.closest('.main-menu__sub-block-tabs-nav');
            const subBlockTabs = subBlockTabsNav.querySelectorAll('li a');
            subBlockTabs.forEach((tab) => {
                tab.classList.remove(activeClass);
            });
            this.querySelector('a').classList.add(activeClass);
            body.classList.add('sub-sub-nav-is-open');
        }
        const dropdownTabNav = this.closest('.dropdown-tab-nav');
        const tabContentOverviewNext = dropdownTabNav.nextElementSibling;
        const nextTabContent = tabContentOverviewNext.querySelectorAll('.dropdown-tab-content');
        if (window.innerWidth < 940) {
            if (!this.classList.contains('main-menu__sub-block-tabs-nav__item--has-children')) {
                window.location.href = this.querySelector('a').getAttribute('href');
            }
            else {
                nextTabContent.forEach((content) => {
                    content.classList.remove('sub-sub-open');
                });
                nextTabContent[index].classList.add('sub-sub-open');
            }
        }
        else {
            nextTabContent.forEach((content) => {
                content.classList.remove(activeClassContent);
            });
            nextTabContent[index].classList.add(activeClassContent);
        }
    }
    navToggle.addEventListener('click', () => {
        if (body.classList.contains('nav-is-open')) {
            closeNav();
        }
        else {
            openNav();
        }
    });
    Array.from(navItems).forEach((toggle) => {
        toggle.addEventListener('click', (e) => {
            if (!mqL.matches) {
                e.preventDefault();
                resetScrollPositionDropdown();
                openSubNav(toggle);
            }
        });
    });
    Array.from(navTabTriggers).forEach((trigger) => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const target = trigger.getAttribute('data-target-trigger');
            if (!mqL.matches) {
                resetScrollPositionDropdown();
                openSubNav(trigger, target);
            }
            else {
                const subContentWrapper = trigger.closest('.main_nav_drop__left');
                const subContentBoxes = subContentWrapper.querySelector('.navigation__dropdown__content');
                const subContentActiveBoxes = subContentBoxes.querySelectorAll('.main-nav-sub');
                subContentWrapper.querySelectorAll('.js-nav-tab-trigger').forEach(tabs => { tabs.classList.remove('is-active'); });
                trigger.classList.add('is-active');
                subContentActiveBoxes.forEach(subBox => {
                    const targetId = subBox.getAttribute('data-target-result');
                    if (targetId === target) {
                        subBox.classList.add('is-active');
                    }
                    else {
                        subBox.classList.remove('is-active');
                    }
                });
            }
        });
    });
    Array.from(subBack).forEach((btnBack) => {
        btnBack.addEventListener('click', () => {
            resetScrollPositionDropdown();
            closeSubNav(btnBack);
        });
    });
    searchToggle.addEventListener('click', () => {
        closeNav();
    });
    bgOverlay.addEventListener('click', () => {
        closeNav();
    });
});

/******/ })()
;