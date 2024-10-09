<template>
    <div class="body-wrap">
        <!-- # component starts -->
        <div class="pres-timeline" ref="timeline">
            <!-- ###   -->
            <!--   <div class="periods-section"> -->
            <div class="periods-container">
                <section class="period-single" period="period1">
                    <h4 class="year">1957-1982</h4>
                    <h2 class="title">赠送时期</h2>
                    <p>从1950年代起，至1982年止，熊猫外交模式一直是纯政治性的赠送模式，
                        既不和商业挂钩，又不采取租借的形式。1982年，为了响应保护濒危动物的全球性号召，
                        中华人民共和国政府宣布从1982年开始停止赠送大熊猫出国。
                        这标志着传统的政治性赠送模式下的“熊猫外交”宣告结束。</p>
                </section>
                <section class="period-single" period="period2">
                    <h4 class="year">1982-1994</h4>
                    <h2 class="title">巡展与商业性租借时期</h2>
                    <p>大熊猫便采取短至数月、长至1年巡展的方式出国。大熊猫巡展是一种既可以带有政治色彩，又可具有商业效益的活动。</p>
                    <p>90年代中期以后，为解决商业性租借带来的问题而采取的各项措施使大熊猫出国巡展的机会大大减少，基本结束了主要采取巡展方式进行熊猫外交的潮流。但在极个别的特殊情况的下，仍有采取短期出国方式进行外交活动者。
                    </p>
                </section>
                <section class="period-single" period="period3">
                    <h4 class="year">1995年至今</h4>
                    <h2 class="title">合作研究时期</h2>
                    <p>为了解决大熊猫出国带来的种种问题，更好地保护大熊猫，
                        中国野生动物保护协会和中国动物园协会与国际动物保护机构达成协议，
                        中国可以将一对健康、有繁殖能力的大熊猫送至其他国家进行为期10年的合作研究，
                        其间繁殖的后代归中方所有。若大熊猫意外死亡，其遗体也归中方所有。
                        中方可派出技术人员与外方共同进行对大熊猫的研究工作，
                        外方每年付给中方100万美元，10年总共支付1000万美元。</p>
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
            <div class="cards-container">
                <section class="card-single" period="period1">
                    <h4 class="year">1972 赴美熊猫</h4>
                    <div class="content">
                        <div class="event">
                            <img class="image" src="../assets/images/events/1E1.jpg" alt="国家关系图" />
                            <h3>1972年2月</h3>
                            <p>尼克松访华，中美关系正常化 </p>
                        </div>
                        <div class="divider"></div>
                        <div class="event">
                            <img class="image" src="../assets/images/events/1P1.png" alt="熊猫图" />
                            <h3>1972年9月</h3>
                            <p>赠与美国玲玲、兴兴</p>
                        </div>
                    </div>
                </section>
                <section class="card-single" period="period2">
                    <h4 class="year">1984 赴美熊猫</h4>
                    <div class="content">
                        <div class="event">
                            <img class="image" src="../assets/images/events/2E1.png" alt="国家关系图" />
                            <h3>1984年的美国洛杉矶奥运会期间</h3>
                            <p>表达中国的支持</p>
                        </div>
                        <div class="divider"></div>
                        <div class="event">
                            <img class="image" src="../assets/images/events/2P1.png" alt="熊猫图" />
                            <h3>1984年的美国洛杉矶奥运会期间</h3>
                            <p>北京动物园的永永、迎新两头大熊猫被临时借给洛杉矶动物园，进行为期3个月的巡展</p>
                        </div>
                    </div>
                </section>
                <section class="card-single" period="period2">
                    <h4 class="year">1984 赴英国熊猫</h4>
                    <div class="content">
                        <div class="event">
                            <img class="image" src="../assets/images/events/2E2.png" alt="国家关系图" />
                        </div>
                        <div class="divider"></div>
                        <div class="event">
                            <img class="image" src="../assets/images/events/2P2.png" alt="熊猫图" />
                            <p>大熊猫明明在伦敦动物园巡展三年</p>
                        </div>
                    </div>
                </section>
                <section class="card-single" period="period3">
                    <h4 class="year">2014 赴比利时熊猫</h4>
                    <div class="content">
                        <div class="event">
                            <img class="image" src="../assets/images/events/C3.png" alt="国家关系图" />
                            <h3>2014年2月</h3>
                            <p>习近平主席对比利时王国进行国事访问</p>
                            <p>深化全方位友好合作伙伴关系</p>
                        </div>
                        <div class="divider"></div>
                        <div class="event">
                            <img class="image" src="../assets/images/events/P3.png" alt="熊猫图" />
                            <h3>2014年3月</h3>
                            <p>好好、星徽来到比利时</p>
                        </div>
                    </div>
                </section>
                <section class="card-single" period="period3">
                    <h4 class="year">2019 赴奥地利熊猫</h4>
                    <div class="content">
                        <div class="event">
                            <img class="image" src="../assets/images/events/C12.png" alt="国家关系图" />
                            <h3>2019年4月</h3>
                            <p>奥地利总理库尔茨出席第二届“一带一路”国际合作高峰论坛</p>
                            <p>中国科学院同奥科研促进署签署《2020-2025年合作研究协议》</p>
                        </div>
                        <div class="divider"></div>
                        <div class="event">
                            <img class="image" src="../assets/images/events/P12.png" alt="熊猫图" />
                            <h3>2019年4月</h3>
                            <p>大熊猫园园来到奥地利，增补去世的大熊猫龙徽</p>
                        </div>
                    </div>
                </section>
                <section class="card-single" period="period3">
                    <h4 class="year">2019 赴俄罗斯熊猫</h4>
                    <div class="content">
                        <div class="event">
                            <img class="image" src="../assets/images/events/C23.png" alt="国家关系图" />
                            <p>中俄建交70周年</p>
                        </div>
                        <div class="divider"></div>
                        <div class="event">
                            <img class="image" src="../assets/images/events/P23.png" alt="熊猫图" />
                            <p>如意、丁丁来到俄罗斯旅居</p>
                        </div>
                    </div>
                </section>
                <!-- <section v-for="(item, index) in cardData" :key="index" class="card-single" :period="item.period">
                    <h4 class="year">{{ item.year }}</h4>
                    <h2 class="title">{{ item.title }}</h2>
                    <div class="content">
                        <p v-if="item.content">{{ item.content }}</p>
                        <div v-if="item.events">
                            <div v-for="(event, eventIndex) in item.events" :key="eventIndex" class="event">
                                <img class="image" :src="event.image" :alt="event.alt" />
                                <h3>{{ event.date }}</h3>
                                <p>{{ event.description }}</p>
                            </div>
                            <div class="divider"></div>
                        </div>
                    </div>
                </section> -->
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
// const cardData = [
//     {
//         year: '1816',
//         title: 'Lorem ipsum dolor sit amet.',
//         content: '从1950年代起，至1982年止...',
//         period: 'period1'
//     },
//     {
//         year: '1972',
//         title: '赴美熊猫',
//         events: [
//             {
//                 image: '../assets/images/panda.jpg',
//                 alt: '国家关系图',
//                 date: '1972年2月',
//                 description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
//             },
//             {
//                 image: '../assets/images/panda.jpg',
//                 alt: '熊猫图',
//                 date: '1972年4月',
//                 description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
//             }
//         ],
//         period: 'period1'
//     },
//     // 这里添加更多的数据项
// ];
class PRESTimeline {
    constructor(target, color) {
        // this.__process_stylesheet(document.styleSheets[0]);
        this.base = target;
        this.color = color;
        // console.log(this.color)
        this.periodContainer = $(this.base).find('.periods-container');
        this.cardContainer = $(this.base).find('.cards-container');
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
        let data = $(base).find('.cards-container section');
        // console.log(data)
        for (let section of data) {
            section.period = $(section).attr('period');
            section.index = $(section).index();
        }
        // console.log(data)
        this.cardData = data;
        // #assign initial entry point (active items)
        this.activePeriod = this.periodData[0];
        this.activePeriodIndex = 0;
        this.activeCard = this.cardData[0];
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
        $(this.base).find('.cards-container section.active').removeClass('active');
        $(this.base).find('.cards-container section.prev').removeClass('prev');
        $(this.base).find('.cards-container section.next').removeClass('next');
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
        if (this.activeCardIndex >= this.cardData.length - 1) {
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
        let numNode = this.cardData.length;
        for (let i = 0; i < numNode; i++) {
            let c = this.cardData[i].color;
            let el = wrap.append('<li class="' + this.cardData[i].period + '" style="border-color: ' + c + '"></li>');
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
                this.activeCard = this.cardData[this.activeCardIndex];
                this._chainActions('timeline');
                this._setStateClasses();
            }
            this._adjustCardContainer();
            this._adjustPeriodContainer();
        });
        timelineNext.click(() => {
            if (this.activeCardIndex < this.cardData.length - 1) {
                this.activeCardIndex += 1;
                this.activeCard = this.cardData[this.activeCardIndex];
                this._chainActions('timeline');
                this._setStateClasses();
            }
            this._adjustCardContainer();
            this._adjustPeriodContainer();
        });
        // ## assign each timeline li
        for (let i = 0; i < this.timelineData.length; i++) {
            $(this.timelineData[i]).click(() => {
                this.activeCardIndex = this.cardData[i].index;
                this.activeCard = this.cardData[this.activeCardIndex];
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
        for (let i = 0; i < this.cardData.length; i++) {
            let p = this.cardData[i].period;
            this.cardData[i].color = this.color[p];
            let temp = this.cardData[i];
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
                    for (let i = 0; i < this.cardData.length; i++) {
                        let temp = this.cardData[i];
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

const timeline = ref(null);

onMounted(() => {
    // 在组件的 mounted 钩子函数中创建 PRESTimeline 实例
    let colorcode = {
        'period1': "#0080ae",
        'period2': "#88be6e",
        'period3': "#ffd867"
    };
    // 将当前组件的 DOM 元素传递给 PRESTimeline 类的构造函数
    new PRESTimeline(timeline.value, colorcode);
});
</script>

<style scoped>
body {
    margin: 0;
}

.body-wrap {
    background-color: #fff;
    width: 100%;
    /* 改 */
    height: 90%;

    margin: 0 auto;
    /* 改 */
    font-size: 12px;

    /* border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
    border: 1px solid #fff;
    margin: 10px; */
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
.pres-timeline .cards-container {
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
    margin-left: 10%;
    border-bottom: 5px solid #dfe3e6;
    padding: 1vh;
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

.cards-container:before {
    background-image: linear-gradient(left, #FFF, rgba(248, 248, 248, 0));
    left: 0;
    content: "";
    position: absolute;
    z-index: 2;
    top: 0;
    height: 100%;
    width: 100px;
}

.cards-container:after {
    background-image: linear-gradient(right, #FFF, rgba(248, 248, 248, 0));
    right: 0;
    content: "";
    position: absolute;
    z-index: 2;
    top: 0;
    height: 100%;
    width: 100px;
}

.cards-container section {
    width: 25%;
    position: absolute;
    margin-left: 35%;
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

.cards-container section.active {
    height: auto;
    opacity: 1;
    transform: translateX(0);
    z-index: 5;
}

.cards-container section.prev {
    height: auto;
    opacity: 0.4;
    transform: translateX(-105%);
    z-index: 0;
}

.cards-container section.next {
    height: auto;
    opacity: 0.4;
    transform: translateX(105%);
    z-index: 0;
}

.cards-container section .year {
    text-align: center;
    font-size: 16px;
    margin: 0;
}

.cards-container section .title {
    font-weight: 400;
}

.cards-container section img {
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
    height: 7vh;
    background-color: #8e8b8b;
    /* 分割线的颜色 */
}

.image {
    max-width: 8vh;
}
</style>