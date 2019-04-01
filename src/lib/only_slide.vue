<template>
    <div class="o-sldie-container" :style="{width:slideViewWidth + 'px'}">
        <ul class="photo-album-btn clear">
            <li v-for="(item,index) in slideData" :key="index" :class="{active:caIdx==index?true:false}" @click="cutAlbum(index)">
                {{item.albumName}}（{{item.photo.length}}）
            </li>
            <li class="no-album" v-if="slideData.length == 0">暂无图集</li>
        </ul>
        <div class="only-slide" :style="{height:slideViewHeight + 'px'}" @mouseover="hoverPrevNextVisible" @mouseleave="hoverPrevNextHide">
            <div class="o-slide-wapper">
                <transition :name="slideAnimate" tag="div">
                    <div class="o-slide-item" :key="isShowing" :style="{backgroundImage: 'url('+ currUrl +')'}">
                        <div class="no-pic" v-if="!currUrl" :style="{lineHeight: slideViewHeight + 'px'}">暂无图片</div>
                        <span v-if="prevNextVisible && (slideData[caIdx].photo && slideData[caIdx].photo.length > 0) ? slideData[caIdx].photo[cpIdx].descr : false">{{slideData[caIdx].photo[cpIdx].descr}}</span>
                    </div>
                </transition>
            </div>
            <div class="o-prev" @click="cutPage('prev')" v-if="prevNextVisible">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCODNERjI0OTc4RTkxMUU3QjlEQkU0NDIyMTVBRTlCRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCODNERjI0QTc4RTkxMUU3QjlEQkU0NDIyMTVBRTlCRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkI4M0RGMjQ3NzhFOTExRTdCOURCRTQ0MjIxNUFFOUJGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkI4M0RGMjQ4NzhFOTExRTdCOURCRTQ0MjIxNUFFOUJGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/fXlQgAAAZlJREFUeNrs2+GtgkAMB3DOCRjBDXQERmCEcwJXcQNwAzZgBNzEEbCXwCeDHHetaXttcnnJi3m5/y96Qulz8zxXJdepKrwMwAAMwAAMwAAMwACSyzmHuqDusCZYb1gdrHr5PU2FS+GchbyXbv6uCWOfm/vnArARfi1PBcDiDAjh4Yf/8ZKz2kMwInyoQSVAZPgnHIIvdYfgzmd+rR5rn6wOwaPhVQGkhFcDkBpeBUBOePEAueFFA2CEFwuAFV4kAGZ4cQDY4UUBUIQXA0AVXgQAZXj2ANThWQPAaqnDUwJg9AOaiPt5XzGtfzRELiBdawbYe3tfYY1cETCeC4R21U0sAuLXoI84DKdUBCkXQmQIki6FSRCk3QyhI0i8HUZFkNoQQUOQ3BJDQZDeFM1G0NAWz0LQ8mAkGUHTo7EkBG0PRw8jqBuROYqgckYoEmFUPSQViXBVOyTlnOsj+gmt2iGpSASyISlug5J+q6NM9RFwuSGwx1hhP80yORZmAwf4+48VgOTdZ/81VngZgAEYgAEYgAEYQLn1EWAAQFrgEZNBEzkAAAAASUVORK5CYII=" alt="">
            </div>
            <div class="o-next" @click="cutPage('next')" v-if="prevNextVisible">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBMzA5Mzc1Njc4RTkxMUU3OUM5RUJCQUI2ODQ1RDNERiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBMzA5Mzc1Nzc4RTkxMUU3OUM5RUJCQUI2ODQ1RDNERiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkEzMDkzNzU0NzhFOTExRTc5QzlFQkJBQjY4NDVEM0RGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkEzMDkzNzU1NzhFOTExRTc5QzlFQkJBQjY4NDVEM0RGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+bVSsJwAAAaFJREFUeNrsmoFtwkAMRXOoAzAKHYEN2KDpBO1GMEI3aDYANmCDdoOrUwWpagWBO//K32dLlqUkSu4/InOxnXLOXcu26Bq3ABAAAkAACAABIAC0aw+oG6eUvqPsNF8lbMRP4js5Pmg+p3onO94A4dO9d/mv9doAqtaJAiC+ypettwIAmQM2V85ttd8Ei0nwbea8CQgLYBI8SBjMQwAnwaX4Ps9b7y4J/lggFIJ5AGgIFACQEGgAoCBQAUBAoAOgDYESgCYEWgBaEKgBaECgB1ALwQWAGghuAJRCcAWgBELtOhOqO3yuCZZCkPAuvpq59FH84K4qLPA+JaxvEFddSzBbFp8gHJvtC4wVZQlPM5cNGg8ylQSvlNN/29brv8DN4j3uA+4S720neLd4T98CReK9fA0Wi/dQD6gSz14RqhbPXBNUEc9aFVYTz9gXUBXP1hlSF8/UG4SIZ+kOw8SbB4AWzzwkpSKeeUiqm2YGnz0PSZ2si/+PGaE94rVnSoJjjX+cBPuYYLxY+wFhfQEWi3H5ABAAAkAACAABIAA0a18CDAB6UWSzZ1MpswAAAABJRU5ErkJggg==" alt="">
            </div>
            <div class="pagination">{{slideData[caIdx] && slideData[caIdx].photo && slideData[caIdx].photo.length > 0 ? (cpIdx + 1) : 0}}/{{slideData[caIdx] && slideData[caIdx].photo ? slideData[caIdx].photo.length : 0}}</div>
        </div>
        <div class="o-preview">
            <div class="o-preview-wapper">
                <ul :style="{left:previewLeft+'px'}" ref="hidebox">
                    <li class="cut-album-btn" v-if="caIdx == 0 ? false : true" @click="cutAlbumInPreview('prev')">上一图集</li>
                    <li v-for="(item,index) in slideData[caIdx] && slideData[caIdx].photo ? slideData[caIdx].photo : 0" :key="index" @click="clickPreview(index)" :style="{opacity: cpIdx == index ? 1 : .4}">
                        <div class="preview-img" :style="{backgroundImage: 'url('+ item.img +')'}"></div>
                    </li>
                    <li class="preview-no-pic" v-if="!slideData[caIdx] || !slideData[caIdx].photo || slideData[caIdx].photo.length == 0">暂无图片</li>
                    <li class="cut-album-btn" v-if="(slideData.length == 0 || caIdx == slideData.length - 1) ? false : true" @click="cutAlbumInPreview('next')">下一图集</li>
                </ul>
            </div>
            <div class="o-preview-prev" @click="cutPreview('prev')">《</div>
            <div class="o-preview-next" @click="cutPreview('next')">》</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'onlySlide',
    props: {
        slideViewWidth: {
            type: Number,
            default: 700
        },
        slideViewHeight: {
            type: Number,
            default: 300
        },
        slideData: {
            type: Array,
            default: () => {}
        }
    },
    data() {
        return {
            isShowing: true,
            // transition 动态name
            slideAnimate: "",
            // 图集总数组
            sca: [],
            // 当前图集数组index位置
            caIdx: 0,
            // 当前图集图片index位置
            cpIdx: 0,
            // 当前图片url
            currUrl: "",
            // preview left
            previewLeft: 0,
            // moveable preview box current width
            currWidth: 0,
            // prevNextBtn vieible
            prevNextVisible: false
        }
    },
    mounted() {
        // 初始获取预览可移动区域宽度
        this.moveablePreviewResetWidth();

        if (this.slideData.length > 0) {
            this.currUrl = this.slideData[this.caIdx].photo && this.slideData[this.caIdx].photo.length > 0 ? this.slideData[this.caIdx].photo[this.cpIdx].img : ''
        }
    },
    watch: {
        slideData: {
            handler(val, oldVal) {
                this.caIdx = 0;
                this.cpIdx = 0;
                this.currUrl = val[this.caIdx].photo && val[this.caIdx].photo.length > 0 ? val[this.caIdx].photo[this.cpIdx].img : ''
            },
            deep: true
        }
    },
    methods: {
        // 切换图片 逻辑
        cutPage(type) {
            this.sca = this.slideData;
            switch (type) {
                case "prev":
                    if (this.cpIdx == 0) {
                        if (this.caIdx == 0) {
                            this.caIdx = this.sca.length - 1;
                        } else {
                            this.caIdx--;
                        }
                        this.moveablePreviewResetWidth();
                        this.cpIdx = this.sca[this.caIdx].photo.length == 0 ? 0 : this.sca[this.caIdx].photo.length - 1;
                        this.currUrl = this.sca[this.caIdx].photo.length > 0 ? this.sca[this.caIdx].photo[this.cpIdx].img : '';
                    } else {
                        this.cpIdx--;
                        this.currUrl = this.sca[this.caIdx].photo[this.cpIdx].img;
                    }
                    this.isShowing = !this.isShowing;
                    this.slideAnimate = "slideright";
                    break;
                case "next":
                    if (this.cpIdx == (this.sca[this.caIdx].photo.length == 0 ? 0 : this.sca[this.caIdx].photo.length - 1)) {
                        this.cpIdx = 0;
                        if (this.caIdx == this.sca.length - 1) {
                            this.caIdx = 0;
                        } else {
                            this.caIdx++;
                        }
                        this.moveablePreviewResetWidth();
                        this.currUrl = this.sca[this.caIdx].photo.length > 0 ? this.sca[this.caIdx].photo[this.cpIdx].img : '';
                    } else {
                        this.cpIdx++;
                        this.currUrl = this.sca[this.caIdx].photo[this.cpIdx].img;
                    }
                    this.isShowing = !this.isShowing;
                    this.slideAnimate = "slideleft";
                    break;
            }
        },
        // 切换图集 按钮逻辑
        cutAlbum(index) {
            this.sca = this.slideData;
            this.caIdx = index;
            this.cpIdx = 0;
            this.currUrl = this.sca[this.caIdx].photo.length > 0 ? this.sca[this.caIdx].photo[this.cpIdx].img : '';
            this.moveablePreviewResetWidth();
        },
        // 预览区图片滚动
        cutPreview(type) {
            if (this.slideData.length == 0) return;
            let pvw = this.slideViewWidth - 70;
            let sw = 85;
            let hideBoxWidth = this.$refs.hidebox.getBoundingClientRect().width;
            switch (type) {
                case 'prev':
                    if (this.previewLeft == 0) return;
                    this.previewLeft += sw;
                    this.currWidth += sw;
                    break;
                case 'next':
                    if (this.currWidth - pvw <= 5) return;
                    this.previewLeft -= sw;
                    this.currWidth -= sw;
                    break;
            };
        },
        // 点击预览图片
        clickPreview(index) {
            this.sca = this.slideData;
            if (this.cpIdx == index) return;
            if (this.cpIdx < index) {
                this.slideAnimate = "slideleft";
            } else {
                this.slideAnimate = "slideright";
            }
            this.isShowing = !this.isShowing;
            this.cpIdx = index;
            this.currUrl = this.sca[this.caIdx].photo[this.cpIdx].img;
        },
        // 预览区图集切换
        cutAlbumInPreview(type) {
            this.sca = this.slideData;
            if (type == "prev") {
                this.caIdx--;
                this.cpIdx = 0;
                this.currUrl = this.sca[this.caIdx].photo && this.sca[this.caIdx].photo.length > 0 ? this.sca[this.caIdx].photo[this.cpIdx].img : '';
                this.moveablePreviewResetWidth();
            } else {
                this.caIdx++;
                this.cpIdx = 0;
                this.currUrl = this.sca[this.caIdx].photo && this.sca[this.caIdx].photo.length > 0 ? this.sca[this.caIdx].photo[this.cpIdx].img : '';
                this.moveablePreviewResetWidth();
            }
        },
        // reset width
        moveablePreviewResetWidth() {
            let self = this;
            self.previewLeft = 0;
            self.$nextTick(() => {
                self.currWidth = self.$refs.hidebox.getBoundingClientRect().width;
            })
        },
        // prevNextBtn vieible
        hoverPrevNextVisible() {
            if (this.slideData.length == 0) return;
            this.prevNextVisible = true;
        },
        hoverPrevNextHide() {
            if (this.slideData.length == 0) return;
            this.prevNextVisible = false;
        }
    }
}
</script>
<style lang="scss" scoped>
ul {
    list-style: none;
}

.clear:after {
    content: "";
    height: 0;
    display: block;
    clear: both;
}

.no-album {
    background: #f5f5f5;
    color: #969696!important;
}

.no-pic {
    background: #eee;
    font-size: 14px;
    height: 100%;
    text-align: center;
    color: #969696;
    line-height: 100%;
    vertical-align: middle;
}

.preview-img {
    width: 100%;
    height: 100%;
    background-size: 100% auto;
    background-position: center center;
    background-repeat: no-repeat;
    background-color: #eee;
}

.preview-no-pic {
    text-align: center;
    font-size: 14px;
    color: #969696;
    background: #eee;
}

.only-slide,
.o-slide-item {
    position: relative;
    width: 100%;
    height: 100%;
}

.o-sldie-container {
    margin-bottom: 100px;
}

.only-slide {
    overflow: hidden;
}

.o-slide-wapper {
    width: auto;
    height: 100%;
    white-space: nowrap;
}

.o-slide-item {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    vertical-align: top;
    background-size: 100% auto;
    background-position: center center;
    background-repeat: no-repeat;
    span {
        position: absolute;
        left: 10px;
        bottom: 10px;
        display: inline-block;
        padding: 3px 10px;
        background: rgba(0, 0, 0, .4);
        color: #fff;
        border-radius: 3px;
        max-width: 50%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
    }
}

.o-prev,
.o-next {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    width: 55px;
    height: 55px;
    font-size: 20px;
    line-height: 55px;
    color: #fff;
    cursor: pointer;
    background: rgba(0, 0, 0, .4);
    text-align: center;
    border-radius: 50%;
    transition: all .2s;
    img {
        vertical-align: middle;
        display: inline-block;
        width: 32px;
        height: 32px;
    }
}

.o-prev {
    left: 10px;
}

.o-next {
    right: 10px;
}

.pagination {
    position: absolute;
    right: 6px;
    bottom: 6px;
    font-size: 12px;
    color: #fff;
    text-shadow: 0 0 7px rgba(0, 0, 0, .9);
}

.photo-album-btn {
    padding: 0;
    width: 100%;
    line-height: 20px;
    font-size: 16px;
    background: #fff;
    margin-bottom: 10px;
    li {
        float: left;
        padding: 3px 8px;
        margin-right: 5px;
        color: #454545;
        border-radius: 3px;
        cursor: pointer;
    }
    li.active {
        background: #454545;
        color: #fff;
    }
}

.o-preview {
    margin-top: 15px;
    width: 100%;
    height: 60px;
    padding: 0 35px;
    line-height: 60px;
    position: relative;
    box-sizing: border-box;
    .o-preview-wapper {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    ul {
        position: absolute;
        top: 0;
        left: 0;
        width: auto;
        height: 100%;
        padding: 0;
        margin: 0;
        white-space: nowrap;
        text-align: left;
        transition: all .3s;
        li {
            vertical-align: top;
            display: inline-block;
            width: 80px;
            height: 100%;
            margin-right: 5px;
            cursor: pointer;
            transition: all .2s;
            &:hover {
                opacity: 1!important;
            }
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}

.o-preview-prev,
.o-preview-next {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    width: 35px;
    height: 100%;
    font-size: 28px;
    line-height: 60px;
    color: #454545;
    cursor: pointer;
    opacity: .5;
    transition: all .2s;
    &:hover {
        opacity: 1;
    }
}

.o-preview-prev {
    left: 0;
    text-align: left;
}

.o-preview-next {
    right: 0;
    text-align: right;
}

.cut-album-btn {
    text-align: center;
    font-size: 12px;
    background: #f9f9f9;
    color: #454545;
}

//过渡 css 
.slideleft-enter-active {
    animation: slideLeftEnter .5s;
}

.slideleft-leave-active {
    animation: slideLeftLeave .5s;
}

@keyframes slideLeftEnter {
    0% {
        transform: translateX(100%);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideLeftLeave {
    0% {
        transform: translateX(0);
        opacity: 1;
    }
    100% {
        transform: translateX(-100%);
        opacity: 0;
    }
}

.slideright-enter-active {
    animation: slideRightEnter .5s;
}

.slideright-leave-active {
    animation: slideRightLeave .5s;
}

@keyframes slideRightEnter {
    0% {
        transform: translateX(-100%);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideRightLeave {
    0% {
        transform: translateX(0);
        opacity: 1;
    }
    100% {
        transform: translateX(100%);
        opacity: 0;
    }
}
</style>
