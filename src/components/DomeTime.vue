<template>
    <div class="body-wrap0">
        <!-- # component starts -->
        <div class="pres-timeline" ref="domeline">
            <!-- ###   -->
            <!--   <div class="periods-section"> -->
            <div class="periods-container">
                <section class="period-single" period="period1">
                    <h4 class="year">先秦</h4>
                    <h2 class="title">貔貅</h2>
                </section>
                <section class="period-single" period="period2">
                    <h4 class="year">西汉</h4>
                    <h2 class="title">猛氏</h2>
                </section>
                <section class="period-single" period="period3">
                    <h4 class="year">东晋</h4>
                    <h2 class="title">貊</h2>
                </section>
                <section class="period-single" period="period4">
                    <h4 class="year">宋</h4>
                    <h2 class="title">貘</h2>
                </section>
                <section class="period-single" period="period5">
                    <h4 class="year">民国</h4>
                    <h2 class="title">白熊</h2>
                </section>
                <div class="btn-back"></div>
                <div class="btn-next"></div>
            </div>
            <!--   </div> -->
            <!-- ### -->
            <!--   <div class="timeline-section"> -->
            <div class="timeline-container">
                <!--     # timeline graphic place holder - fill with js -->
                <div class="timeline"></div>

                <div class="btn-back"><svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" d="M0 0h30v30H0z" />
                        <path fill="#D8D8D8" fill-rule="evenodd"
                            d="M11.828 15l7.89-7.89-2.83-2.828L6.283 14.89l.11.11-.11.11L16.89 25.72l2.828-2.83" />
                    </svg></div>
                <div class="btn-next"><svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" d="M0 0h30v30H0z" />
                        <path fill="#D8D8D8" fill-rule="evenodd"
                            d="M18.172 14.718l-7.89-7.89L13.112 4l10.606 10.607-.11.11.11.11-10.608 10.61-2.828-2.83 7.89-7.89" />
                    </svg></div>
            </div>
            <!--   </div> -->
            <!-- ### -->
            <!--   <div class="cards-section"> -->
            <div class="cards-container0">
                <section class="card-single active" period="period1">
                    <h4 class="year">——《礼记·曲礼》</h4>
                    <h2 class="title">前有水，则载青旌，前有尘埃，则载鸣鸢，前有车骑，则载飞鸿，前有士师，则载虎皮，前有挚兽，则载貔貅。</h2>
                </section>
                <section class="card-single" period="period2">
                    <h4 class="year">——《上林赋》</h4>
                    <h2 class="title">椎蜚廉，弄獬豸，格虾蛤，鋋猛氏，羂騕褭，射封豕。</h2>
                </section>
                <section class="card-single" period="period3">
                    <h4 class="year">——《南中八郡志》</h4>
                    <h2 class="title">貊大如驴，状颇似熊，多力，食铁，所触无不拉。</h2>
                </section>
                <section class="card-single" period="period4">
                    <h4 class="year">——《尔雅翼》</h4>
                    <h2 class="title">貘，今出建宁郡，毛黑白，臆似熊而小，能食蛇，以舌舐铁，可顿进数十斤⋯ ⋯ 今蜀人云峨眉山多有之。</h2>
                </section>
                <section class="card-single" period="period5">
                    <h4 class="year">——《人言周刊》</h4>
                    <h2 class="title">四川人有名曰白熊之野兽，居于高山竹林中，性不畏寒，全身毛色殊为特别，眼睛一圈之毛色及耳朵之前后腿为黑色，余皆白色。</h2>
                </section>
            </div>
            <!--   </div> -->
            <!-- ###   -->
        </div>
        <!-- # component ends -->
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import $ from 'jquery';
"use strict";
class PRESTimeline0 {
    constructor(target, color) {
        // this.__process_stylesheet(document.styleSheets[0]);
        this.base = target;
        this.color = color;
        // console.log(this.color)
        this.periodContainer = $(this.base).find('.periods-container');
        this.cardContainer = $(this.base).find('.cards-container0');
        this.timelineNodeContainer = $(this.base).find('.timeline-container .timeline');
        // this.activePeriod = $(this.base).find('.periods-container section.active')
        this._parseData();
        this._initialColor();
        this._generateTimeline();
        this._setStateClasses();
        this._assignBtn();
        this._adjustPeriodContainer();
        this._adjustCardContainer();
        // console.log(this.cardData)
    }
    _parseData() {
        let base = this.base;
        let periods = $(base).find('.periods-container section');
        for (let section of periods) {
            section.period = $(section).attr('period');
            section.index = $(section).index();
        }
        // console.log(periods)
        this.periodData = periods;
        let data = $(base).find('.cards-container0 section');
        // console.log(data)
        for (let section of data) {
            section.period = $(section).attr('period');
            section.index = $(section).index();
        }
        // console.log(data)
        this.cardData0 = data;
        // #assign initial entry point (active items)
        this.activePeriod = this.periodData[0];
        this.activePeriodIndex = 0;
        this.activeCard = this.cardData0[0];
        this.activeCardIndex = 0;
    }
    _setStateClasses() {
        // # periods
        $(this.base).find('.periods-container section.active').removeClass('active');
        $(this.base).find('.periods-container section.prev').removeClass('prev');
        $(this.base).find('.periods-container section.next').removeClass('next');
        // console.log("setclass: " + this.activePeriod.index)
        $(this.activePeriod).addClass('active');
        // console.log(this.activePeriod.index)
        // this.activePeriodIndex = this.activePeriod.index
        if ($(this.activePeriod).prev().length != 0) {
            $(this.activePeriod).prev().addClass('prev');
            $(this.base).find('.periods-container .btn-back').removeClass('hide');
        }
        else {
            $(this.base).find('.periods-container .btn-back').addClass('hide');
        }
        if ($(this.activePeriod).next().length != 0) {
            $(this.activePeriod).next().addClass('next');
            $(this.base).find('.periods-container .btn-next').removeClass('hide');
        }
        else {
            $(this.base).find('.periods-container .btn-next').addClass('hide');
        }
        // ## cards
        $(this.base).find('.cards-container0 section.active').removeClass('active');
        $(this.base).find('.cards-container0 section.prev').removeClass('prev');
        $(this.base).find('.cards-container0 section.next').removeClass('next');
        $(this.activeCard).addClass('active');
        // this.activeCardIndex - this.activeCard.index
        if ($(this.activeCard).prev().length != 0) {
            $(this.activeCard).prev().addClass('prev');
        }
        if ($(this.activeCard).next().length != 0) {
            $(this.activeCard).next().addClass('next');
        }
        // ## timeline 
        $(this.base).find('.timeline li.active').removeClass('active');
        // let findNode = $(this.base).find('.timeline ol li')[this.activeCard.index]
        $(this.timelineData[this.activeCard.index]).addClass('active');
        let timelineB = $(this.base).find('.timeline-container .btn-back');
        let timelineN = $(this.base).find('.timeline-container .btn-next');
        // console.log($(timelineN))
        if (this.activeCardIndex === 0) {
            timelineB.addClass('hide');
        }
        else {
            timelineB.removeClass('hide');
        }
        if (this.activeCardIndex >= this.cardData0.length - 1) {
            timelineN.addClass('hide');
        }
        else {
            timelineN.removeClass('hide');
        }
    }
    // ## timeline generater
    _generateTimeline() {
        // ## create node list
        let htmlWrap = '<ol></ol>';
        $(this.timelineNodeContainer).append(htmlWrap);
        let wrap = $(this.timelineNodeContainer).find('ol');
        let numNode = this.cardData0.length;
        for (let i = 0; i < numNode; i++) {
            let c = this.cardData0[i].color;
            let el = wrap.append('<li class="' + this.cardData0[i].period + '" style="border-color: ' + c + '"></li>');
        }
        // ## width of timeline
        let nodeW = 200;
        wrap.css('width', nodeW * numNode - 16);
        let nodeList = $(this.base).find('.timeline ol li');
        this.timelineData = nodeList;
    }
    // ## assign button actions
    _assignBtn() {
        let periodPrev = $(this.base).find('.periods-container .btn-back');
        let periodNext = $(this.base).find('.periods-container .btn-next');
        periodPrev.click(() => {
            if (this.activePeriodIndex > 0) {
                // console.log('prev')
                this.activePeriodIndex -= 1;
                this.activePeriod = this.periodData[this.activePeriodIndex];
                this._chainActions('period');
                this._setStateClasses();
            }
            this._adjustPeriodContainer();
        });
        periodNext.click(() => {
            if (this.activePeriodIndex < this.periodData.length - 1) {
                // console.log('next' + this.activePeriodIndex)
                this.activePeriodIndex += 1;
                this.activePeriod = this.periodData[this.activePeriodIndex];
                this._chainActions('period');
                this._setStateClasses();
            }
            this._adjustPeriodContainer();
        });
        let timelinePrev = $(this.base).find('.timeline-container .btn-back');
        let timelineNext = $(this.base).find('.timeline-container .btn-next');
        timelinePrev.click(() => {
            if (this.activeCardIndex > 0) {
                this.activeCardIndex -= 1;
                this.activeCard = this.cardData0[this.activeCardIndex];
                this._chainActions('timeline');
                this._setStateClasses();
            }
            this._adjustCardContainer();
            this._adjustPeriodContainer();
        });
        timelineNext.click(() => {
            if (this.activeCardIndex < this.cardData0.length - 1) {
                this.activeCardIndex += 1;
                this.activeCard = this.cardData0[this.activeCardIndex];
                this._chainActions('timeline');
                this._setStateClasses();
            }
            this._adjustCardContainer();
            this._adjustPeriodContainer();
        });
        // ## assign each timeline li
        for (let i = 0; i < this.timelineData.length; i++) {
            $(this.timelineData[i]).click(() => {
                this.activeCardIndex = this.cardData0[i].index;
                this.activeCard = this.cardData0[this.activeCardIndex];
                this._chainActions('timeline');
                this._setStateClasses();
                this._adjustCardContainer();
                this._shiftTimeline();
            });
        }
    }
    // ## color ##
    _initialColor() {
        for (let i = 0; i < this.periodData.length; i++) {
            let p = this.periodData[i].period;
            this.periodData[i].color = this.color[p];
            let temp = this.periodData[i];
            $(temp).css('border-color', temp.color);
            $(temp).find('.year').css('color', temp.color);
            // ## color for timeline items, this part utilize the period name as class which will be add to the li later
            // ### cross browser bug fix
            let sbstyle = document.createElement("style");
            document.head.appendChild(sbstyle);
            // let sheet = document.styleSheets[0]
            sbstyle.sheet.insertRule('li.' + p + '.active { background-color: ' + this.color[p] + ' !important } ', 0);
            sbstyle.sheet.insertRule('li.' + p + '::before { background-color: ' + this.color[p] + ' } ', 0);
            sbstyle.sheet.insertRule('li.' + p + '::after { background-color: ' + this.color[p] + ' } ', 0);
        }
        for (let i = 0; i < this.cardData0.length; i++) {
            let p = this.cardData0[i].period;
            this.cardData0[i].color = this.color[p];
            let temp = this.cardData0[i];
            $(temp).css('border-color', temp.color);
            $(temp).find('.year').css('color', temp.color);
        }
    }
    _adjustPeriodContainer() {
        let activeH = $(this.activePeriod).outerHeight();
        $(this.periodContainer).height(activeH);
        console.log('top adjusted');
    }
    _adjustCardContainer() {
        let activeH = $(this.activeCard).outerHeight() + 24;
        $(this.cardContainer).height(activeH);
        console.log('bot adjusted');
    }
    _shiftTimeline() {
        // #### We need to fix this part if using this component in different sizes ####
        let timelineW = $(this.base).find('.timeline-container').outerWidth();
        let timelinePadding = 210;
        let timelineCenter = 300;
        let liWidth = 16;
        let activeNodeX = $(this.timelineData[this.activeCardIndex]).position().left;
        let finalPos = -activeNodeX + timelinePadding;
        $(this.timelineNodeContainer).css('left', finalPos);
        console.log(activeNodeX);
    }
    _chainActions(state) {
        switch (state) {
            case 'period':
                console.log('period');
                if (this.activePeriod.period != this.activeCard.period) {
                    // ## find the closest li with the active period
                    let ta = [];
                    for (let i = 0; i < this.cardData0.length; i++) {
                        let temp = this.cardData0[i];
                        if (this.activePeriod.period === temp.period)
                            ta.push(temp);
                    }
                    this.activeCard = ta[0];
                    this.activeCardIndex = ta[0].index;
                }
                break;
            case 'timeline':
                console.log('timeline');
                if (this.activeCard.period != this.activePeriod.period) {
                    let ta;
                    for (let i = 0; i < this.periodData.length; i++) {
                        let temp = this.periodData[i];
                        if (this.activeCard.period === temp.period)
                            ta = temp;
                    }
                    this.activePeriod = ta;
                    this.activePeriodIndex = ta.index;
                }
                break;
        }
        this._shiftTimeline();
        this._adjustCardContainer();
    }
}

const domeline = ref(null);

onMounted(() => {
    // 在组件的 mounted 钩子函数中创建 PRESTimeline 实例
    let colorcode = {
        'period1': "#0080ae",
        'period2': "#009abd",
        'period3': "#88be6e",
        'period4': "#ffd867",
        'period5': "#f0c9cf"
    };
    // 将当前组件的 DOM 元素传递给 PRESTimeline 类的构造函数
    new PRESTimeline0(domeline.value, colorcode);
});
</script>

<!-- 规律为，至少有一个不是scoped -->
<style>
body {
    margin: 0;
}

.body-wrap0 {
    background-color: #fff;
    width: 99%;
    /* 改 */
    height: 90%;

    margin: 0 auto;
    /* 改 */
    font-size: 12px;
}

.pres-timeline {
    font-family: roboto, helvetica, sans-serif;
    /* 改 */
    font-size: 12px;
    color: #4A4A4A;
    width: 100%;
    margin: 1% 0;
}

.pres-timeline>div>div {
    padding: 1em 0;
    box-sizing: border-box;
}

.pres-timeline .periods-container,
.pres-timeline .cards-container0 {
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    min-height: 100px;
    transition: height 0.5s ease-in-out;
    background-color: #FFF;
}

.periods-container:before {
    background-image: linear-gradient(left, #FFF, rgba(248, 248, 248, 0));
    left: 0;
    content: "";
    position: absolute;
    z-index: 2;
    top: 0;
    height: 100%;
    width: 200px;
}

.periods-container:after {
    background-image: linear-gradient(right, #FFF, rgba(248, 248, 248, 0));
    right: 0;
    content: "";
    position: absolute;
    z-index: 2;
    top: 0;
    height: 100%;
    width: 100px;
}

.periods-container .btn-back,
.periods-container .btn-next {
    display: inline-block;
    width: 15%;
    height: 100%;
    position: absolute;
    cursor: pointer;
    z-index: 10;
    transition: 0.3s ease-in-out;
}

.periods-container .btn-back:hover,
.periods-container .btn-next:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.periods-container .btn-back.hide,
.periods-container .btn-next.hide {
    display: none;
}

.periods-container .btn-back {
    left: 0;
}

.periods-container .btn-next {
    right: 0;
}

.periods-container section {
    width: 70%;
    height: 0;
    position: absolute;
    margin-left: 15%;
    border-bottom: 5px solid #dfe3e6;
    padding: 1.5em;
    box-sizing: border-box;
    transition: transform 0.3s ease-in-out, opacity 0.2s ease, height 0.3s ease;
    bottom: 0;
    opacity: 0;
    background-color: #fff;
}

.periods-container section.active {
    height: auto;
    opacity: 1;
    transform: translateX(0);
    z-index: 5;
}

.periods-container section.active .title,
.periods-container section.active p {
    display: block;
}

.periods-container section.prev {
    height: auto;
    opacity: 0.4;
    transform: translateX(-100%);
    z-index: 0;
}

.periods-container section.prev .year {
    text-align: right;
}

.periods-container section.next {
    height: auto;
    opacity: 0.4;
    transform: translateX(100%);
    z-index: 0;
}

.periods-container section .year {
    font-size: 20px;
    font-weight: 400;
}

.periods-container section .title {
    color: #4A4A4A;
    font-size: 28px;
    font-weight: 400;
    display: none;
}

.periods-container section p {
    display: none;
}

.timeline-container {
    position: relative;
    width: 100%;
    height: 50px;
    overflow: hidden;
}

.timeline-container:before {
    background-image: linear-gradient(left, #FFF, rgba(248, 248, 248, 0));
    left: 0;
    content: "";
    position: absolute;
    z-index: 2;
    top: 0;
    height: 100%;
    width: 100px;
}

.timeline-container:after {
    background-image: linear-gradient(right, #FFF, rgba(248, 248, 248, 0));
    right: 0;
    content: "";
    position: absolute;
    z-index: 2;
    top: 0;
    height: 100%;
    width: 100px;
}

.timeline-container .timeline {
    position: absolute;
    display: block;
    height: 50px;
    transition: left 0.3s ease-in-out;
}

.timeline-container .timeline ol {
    display: block;
    width: 100%;
    height: 2px;
    background-color: #dfe3e6;
    list-style: none;
    /* 改这？ */
    padding-left: 100px;
    padding-right: 100px;
}

.timeline-container .timeline ol li {
    display: inline-block;
    padding: 5px;
    margin-top: -11px;
    /* 圆点间距 */
    margin-left: 15%;
    border-radius: 50%;
    border: 3px solid #7f9298;
    background-color: #FFF;
    position: relative;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.timeline-container .timeline ol li.active {
    box-shadow: none;
}

.timeline-container .timeline ol li.active:before {
    content: "";
    display: block;
    height: 25px;
    width: 1px;
    position: absolute;
    top: -25px;
    transition: opacity 0.3s ease-in-out;
}

.timeline-container .timeline ol li.active:after {
    content: "";
    display: block;
    height: 25px;
    width: 1px;
    position: absolute;
    bottom: -25px;
    transition: opacity 0.3s ease-in-out;
}

.timeline-container .btn-back,
.timeline-container .btn-next {
    display: inline-block;
    position: absolute;
    cursor: pointer;
    margin-top: -2px;
    z-index: 11;
    transition: all 0.3s ease;
}

.timeline-container .btn-back.hide,
.timeline-container .btn-next.hide {
    display: none;
}

.timeline-container .btn-back:hover,
.timeline-container .btn-next:hover {
    border-color: #7f9298;
}

.timeline-container .btn-back {
    left: 1em;
}

.timeline-container .btn-next {
    right: 1em;
}

.cards-container0:before {
    background-image: linear-gradient(left, #FFF, rgba(248, 248, 248, 0));
    left: 0;
    content: "";
    position: absolute;
    z-index: 2;
    top: 0;
    height: 100%;
    width: 100px;
}

.cards-container0:after {
    background-image: linear-gradient(right, #FFF, rgba(248, 248, 248, 0));
    right: 0;
    content: "";
    position: absolute;
    z-index: 2;
    top: 0;
    height: 100%;
    width: 100px;
}

.cards-container0 section {
    width: 40%;
    position: absolute;
    margin-left: 10%;
    margin-bottom: 2em;
    border: 1px solid #f5f7f6;
    padding: 1.5em;
    box-sizing: border-box;
    transition: transform 0.3s ease-in-out;
    top: 0;
    opacity: 0;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
}

.cards-container0 section.active {
    height: auto;
    opacity: 1;
    transform: translateX(0);
    z-index: 5;
}

.cards-container0 section.prev {
    height: auto;
    opacity: 0.4;
    transform: translateX(-105%);
    z-index: 0;
}

.cards-container0 section.next {
    height: auto;
    opacity: 0.4;
    transform: translateX(105%);
    z-index: 0;
}

.cards-container0 section .year {
    text-align: center;
    font-size: 16px;
    margin: 0;
}

.cards-container0 section .title {
    font-weight: 400;
}

.cards-container0 section img {
    width: 100%;
}

.content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.event {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    flex-direction: column;
}

.divider {
    width: 3px;
    height: 200px;
    background-color: #8e8b8b;
    /* 分割线的颜色 */
}

.image {
    max-width: 200px;
}
</style>