/*!
 * animatedBg v1
 * by E-magineurs
 *
 */

// Uses Node, AMD or browser globals to create a module.

function throttle(fn, wait) {

    var time = Date.now();
    return function () {

        if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals (root is window)
        root.animatedBg = factory(root.jQuery);
    }
}(this, function ($) {

    'use strict';

    function animatedBg(options) {
        this.init();

        // options
        this.options = $.extend({}, this.constructor.defaults);
        this.option(options);

    }
    animatedBg.defaults = {
        element: '.slider',
        style: 'bulles',
        quantity: 10
    }
    animatedBg.prototype.option = function (options) {
        $.extend(this.options, options);
        //console.log(this.options);
    }
    animatedBg.prototype.init = function () {
        var self = this;

        $(document).ready(function () {
            self.build();
        });

    }


    /***************************
    
    Initialisation
    
    ***************************/

    animatedBg.prototype.build = function () {
        let self = this;

        //gsap.registerPlugin(MorphSVGPlugin);

        this.$element = $(self.options.element).addClass('animatedBg').append('<div class="animated-container"></div>');
        this.$container = this.$element.children('.animated-container');
        //basic gradient demo using webkit gradient + ColorPropsPlugin
        this.$iOS = /iPad|iPhone|iPod/.test(navigator.platform),
            this.$isChrome_iOS = false;

        this.$isChromium = window.chrome,
            this.$vendorName = window.navigator.vendor,
            this.$isOpera = window.navigator.userAgent.indexOf("OPR") > -1,
            this.$isChrome = false;
        if (this.$isChromium !== null && this.$isChromium !== undefined && this.$vendorName === "Google Inc." && this.$isOpera == false) {
            // is Google chrome on iOS
            //if(iOS){
            //isChrome_iOS = true;
            //} 
            this.$isChrome = true;
        }

        if (self.options.style == "bulles") {
            self.bulles();
        }
        if (self.options.style == "traits") {
            self.traits();
        }
        if (self.options.style == "blur") {
            self.blur();
        }
        if (self.options.style == "gradient") {
            self.gradient();
        }

    }

    animatedBg.prototype.traits = function () {
        let self = this;
        self.$element.addClass('aniamtedBg-traits');
        let bubbles = [];
        let quantity = self.options.quantity;
        let width = $(self.$element).width();
        let height = $(self.$element).height();
        $(window).on('resize', function(){
            let width = $(self.$element).width();
            let height = $(self.$element).height();
        })
        
        for (let i = 0; i < quantity; i++) {
            let complementaryClass = "odd-" + i % 4;

            let bubblehTML = $('<span class="trait ' + complementaryClass + '"></span>');
            let xPosition = getRandomInt(width);
            let yPosition = getRandomInt(height);

            bubblehTML.css('bottom', 0);
            bubblehTML.css('left', xPosition);
            self.$container.append(bubblehTML);
            let bubbleWidth = bubblehTML.width();
            let bubbleHeight = bubblehTML.height();
            
            function toRadians (angle) {
              return angle * (Math.PI / 180);
            }
            
            let angleRadiant = toRadians(60);
            let angleOpRadiant = toRadians(30);
            
            let hypothenuse = height / Math.sin(angleRadiant);
            
            
            
            let oppositeSide = Math.sin(angleOpRadiant) * hypothenuse;
            
           
            var tl = gsap.timeline();
            tl.to(bubblehTML, {
                y: -(bubbleHeight+10),
                x:oppositeSide/2,
                duration:0
            });
            tl.to(bubblehTML, {
                y: height+bubbleHeight+40,
                x:(-oppositeSide)/2,
                repeat: -1,
                delay: getRandomInt(i)/2,
                repeatDelay: getRandomInt(i)/2,
                duration: (height/100),
                ease: "power1.in"

            });
            
            bubbles.push(bubblehTML);

        }
        

        

    }
    
     animatedBg.prototype.bulles = function () {
        let self = this;
        self.$element.addClass('aniamtedBg-bulles');
        let bubbles = [];
        let quantity = self.options.quantity;
        let width = $(self.$element).width();
        let height = $(self.$element).height();

        for (let i = 0; i < quantity; i++) {
            let complementaryClass = "odd-" + i % 4;

            let bubblehTML = $('<span class="bubble ' + complementaryClass + '"></span>');
            let xPosition = getRandomInt(width);
            let yPosition = getRandomInt(height);

            bubblehTML.css('bottom', 0);
            bubblehTML.css('left', xPosition);
            self.$container.append(bubblehTML);

            var tl = gsap.timeline();
            tl.to(bubblehTML, {
                y: 0,
                opacity: 0,


            });
            tl.to(bubblehTML, {
                y: -height,
                opacity: 1,
                repeat: -1,
                delay: getRandomInt(i),
                repeatDelay: getRandomInt(i),
                duration: 10 * (i * 0.5)

            });
            tl.to(bubblehTML, {

                opacity: 0,
                duration: 0

            });
            bubbles.push(bubblehTML);

        }
        self.$element.on("mousemove", moveCircle)

        function moveCircle(e) {
            console.log('ici');
            let eLeft = e.pageX;
            let eTop = e.pageY;
            for (let i = 0; i < quantity; i++) {
                var tl = gsap.timeline();
                if (i % 4 == 1) {
                    tl.to(bubbles[i], {
                        translateX: -(eLeft * 0.01),
                        ease: "elastic.out(1, 0.3)"

                    });
                } else if (i % 4 == 2) {
                    tl.to(bubbles[i], {
                        translateX: -(eLeft * 0.01),
                        ease: "elastic.out(1, 0.3)"
                    });

                } else if (i % 4 == 3) {
                    tl.to(bubbles[i], {
                        translateX: eLeft * 0.01,
                        ease: "elastic.out(1, 0.3)"

                    });

                } else {
                    tl.to(bubbles[i], {
                        translateX: eLeft * 0.01,
                        ease: "elastic.out(1, 0.3)"

                    });
                }

            }


        }

    }

    animatedBg.prototype.blur = function () {
        let self = this;
        self.$element.addClass('aniamtedBg-blur');
        let bubbles = [];
        let quantity = self.options.quantity;
        let width = $(self.$element).width();
        let height = $(self.$element).height();

        for (let i = 0; i < quantity; i++) {
            let complementaryClass = "odd-" + i % 4;

            let bubblehTML = $('<span class="blur ' + complementaryClass + '"></span>');
            let xPosition = getRandomInt(width);
            let yPosition = getRandomInt(height);

            bubblehTML.css('bottom', yPosition);
            bubblehTML.css('left', xPosition);
            self.$container.append(bubblehTML);

            var tl = gsap.timeline({
                repeat: -1
            });
            tl.to(bubblehTML, {
                scale: 0.5,
                opacity: 0,
                duration: 1 * (i * 0.5)

            });
            tl.to(bubblehTML, {
                scale: 1,
                opacity: 0.5,
                duration: 5 * (i * 0.5)

            });
            tl.to(bubblehTML, {

                opacity: 0,
                scale: 4,
                duration: 5 * (i * 0.5)
            });
            bubbles.push(bubblehTML);

        }

        self.$element.on("mousemove", moveCircle)

        function moveCircle(e) {
            console.log('ici');
            let eLeft = e.pageX;
            let eTop = e.pageY;
            for (let i = 0; i < quantity; i++) {
                var tl = gsap.timeline();
                if (i % 4 == 1) {
                    tl.to(bubbles[i], {
                        translateX: -(eLeft * 0.05),
                        translateY: -(eTop * 0.1),

                    });
                } else if (i % 4 == 2) {
                    tl.to(bubbles[i], {
                        translateX: -(eLeft * 0.1),
                        translateY: eTop * 0.05,

                    });

                } else if (i % 4 == 3) {
                    tl.to(bubbles[i], {
                        translateX: eLeft * 0.1,
                        translateY: -(eTop * 0.1),

                    });

                } else {
                    tl.to(bubbles[i], {
                        translateX: eLeft * 0.1,
                        translateY: eTop * 0.05,

                    });
                }

            }


        }
    }
    animatedBg.prototype.gradient = function () {

        let self = this;
        self.$element.addClass('aniamtedBg-gradient');

        if (self.$element.attr('data-colors')) {
            let colorsdata = self.$element.attr('data-colors').substring(1);
            colorsdata = colorsdata.substring(0, colorsdata.length - 1);
            // let colorsis = colorsdata.replace(/ /g,'')
            let colorsList = colorsdata.split(', ');
            let timer = 0;
            const hexToRgb = hex =>
                hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
                .substring(1).match(/.{2}/g)
                .map(x => parseInt(x, 16))
            let colors = new Array();
            for (let i = 0; i < colorsList.length; i++) {
                let rgbaColor = hexToRgb(colorsList[i]);
               
                colors.push(rgbaColor);
            }
            
            var step = 0;
            //color table indices for: 
            // current color left
            // next color left
            // current color right
            // next color right
            var colorIndices = [0, 1, 2, 3];

            //transition speed
            var gradientSpeed = 0.002;

            function updateGradient() {

                if ($ === undefined) return;

                var c0_0 = colors[colorIndices[0]];
                var c0_1 = colors[colorIndices[1]];
                var c1_0 = colors[colorIndices[2]];
                var c1_1 = colors[colorIndices[3]];

                var istep = 1 - step;
                var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
                var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
                var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
                var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

                var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
                var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
                var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
                var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

                self.$container.css({
                    background: "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))"
                }).css({
                    background: "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)"
                });

                step += gradientSpeed;
                if (step >= 1) {
                    step %= 1;
                    colorIndices[0] = colorIndices[1];
                    colorIndices[2] = colorIndices[3];

                    //pick two new target color indices
                    //do not pick the same as the current one
                    colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
                    colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;

                }
            }

            setInterval(updateGradient, 10);
            //updateGradient();
        }

    }
    return animatedBg;
}));
