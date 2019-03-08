import config from '@/config';
import Vue from 'vue';
import VueGeolocation from 'vue-browser-geolocation';
import VueResource from "vue-resource";
import { getInfo } from 'localStorage-info';
import SecureLS from 'secure-ls';

import { authService } from "./components/common/services/auth";

Vue.use(VueResource);
Vue.use(VueGeolocation);

export const func = {
    data() {
        return {
            lsSecure: false,
            waitCallers: [],
            locale: {
                city: {
                    name: null,
                    short: null,
                },
                state: {
                    name: null,
                    short: null,
                },
                country: {
                    name: null,
                    short: null,
                },
            }

        }
    },
    computed: {
        template() {
            return config.info.template;
        }
    },
    
    filters: {
        truncate: function (text, length, clamp) {
            clamp = clamp || '...';
            var node = document.createElement('div');
            node.innerHTML = text;
            var content = node.textContent;
            return content.length > length ? content.slice(0, length) + clamp : content;
        },
        replace: function (message, toReplace, replacement) {
            return message.replace(toReplace, replacement);
        },
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            value = value.toLowerCase();
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    },
    methods: {
        validateCPF(cpf) {	
            cpf = cpf.replace(/[^\d]+/g,'');	
            if(cpf == '') return false;	
            // Elimina CPFs invalidos conhecidos	
            if (cpf.length != 11 || 
                cpf == "00000000000" || 
                cpf == "11111111111" || 
                cpf == "22222222222" || 
                cpf == "33333333333" || 
                cpf == "44444444444" || 
                cpf == "55555555555" || 
                cpf == "66666666666" || 
                cpf == "77777777777" || 
                cpf == "88888888888" || 
                cpf == "99999999999")
                    return false;		
            // Valida 1o digito	
            let add = 0;	
            let rev = 0;
            for (let i=0; i < 9; i ++)		
                add += parseInt(cpf.charAt(i)) * (10 - i);	
                rev = 11 - (add % 11);	
                if (rev == 10 || rev == 11)		
                    rev = 0;	
                if (rev != parseInt(cpf.charAt(9)))		
                    return false;		
            // Valida 2o digito	
            add = 0;	
            for (let i = 0; i < 10; i ++)		
                add += parseInt(cpf.charAt(i)) * (11 - i);	
            rev = 11 - (add % 11);	
            if (rev == 10 || rev == 11)	
                rev = 0;	
            if (rev != parseInt(cpf.charAt(10)))
                return false;		
            return true;   
        },
        youshallnotpass() {
            if (config.environment != 'dev')
            {
                setTimeout(console.log.bind(console, '%cSTOP, HAMMER TIME!', 'color: #FF00FF;font-size:32px;'), 0);
                setTimeout(console.log.bind(console, '%cOh-oh-oh-oh-oh-oh-oh-oh-oh-oh-oh', 'color: #FF00FF;font-size:42px;'), 0);
            }
        },
        keepalive() {
            let user = this.ls_get("client");
            if (user != "") {
                let obj = JSON.parse(user);
                if (obj!= null && obj.token != '' && obj.token != null) {
                    authService.keepalive(obj.token);
                }
           }
        },
        metatag_getObj() {
            return {
                appName: '',
                description: '',
                keywords: '',
                name: '',
                twitter: {
                  card: 'summary_large_image',
                  title: '',
                  description: '',
                  image: {
                    root: '',
                    alt: ''
                  }
                },
                og: {
                  title: '',
                  type: 'website',
                  url: '',
                  description: '',
                  site_name: '',
                  image: {
                    root: '',
                    secure_url: '',
                    type: 'image/jpeg',
                    alt: ''
                  }
                }
            }        
        },
        ls_add(key, obj) {
            if (this.lsSecure) {
                
                if (this.ls_get(key))
                    this.ls_remove(key);

                const ls = new SecureLS({encodingType: 'aes'});
                
                ls.set(key, obj);
            }
            else {
                localStorage.setItem(key, obj);
            }
        },
        ls_get(key) {
            if (this.lsSecure)
            {
                const ls = new SecureLS({encodingType: 'aes'});
                return ls.get(key);
            }
            else {
                return localStorage.getItem(key);
            }
        },
        ls_clear() {
            const ls = new SecureLS({encodingType: 'aes'});
            ls.removeAll();
        },
        ls_remove(key) {
            const ls = new SecureLS({encodingType: 'aes'});
            ls.remove(key);
        },
        queryString(name) {
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
            var results = regex.exec(location.search);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        },
        localStorageInfo() {
            console.log(getInfo());
        },
        gotoLegacy(id, type) {
            let token = "";
            if (this.ls_get("client")) {
                let client = JSON.parse(this.ls_get("client"));
                token = client.token;
            }
            switch (type) {
                case "cardnow":
                    window.location = `${config.legacy}/comprar/gotocard.php`;
                break;
                case "shopping":
                    //alert(""+`${config.legacy}/comprar/gotoshopping.php?token=${token}&id=${id}`);
                    window.location = `${config.legacy}/comprar/gotoshopping.php?token=${token}&id=${id}`;
                break;
                case "myaccount":
                    //console.log(`${config.legacy}/comprar/gotomyaccount.php?token=${token}`);
                    window.location = `${config.legacy}/comprar/gotomyaccount.php?token=${token}`;
                break;
            }
        },
        showWaitAboveAll() {
            this.waitCallers.push("a");
            this.$wait.start("loadingAboveAll");
        },
        hideWaitAboveAll() {
            if (this.waitCallers.length>0)
            {
                this.waitCallers.splice(0, 1);
            }

            if (this.waitCallers.length == 0)
                this.$wait.end("loadingAboveAll");
        },
        getLoggedId() {
            return this.ls_get("id");
        },
        toastSuccess(message, timer = 4000, showbutton = false) {
            this.$swal({
                type: 'success',
                toast: true,
                text: message,
                position: 'top-end',
                customClass: 'alert__tixsme alert__sucess',
                background: '#333',
                timer: timer,
                showConfirmButton: showbutton,
            });
        },
        toastError(message, timer = 4000, showbutton = false) {
            this.$swal({
                type: 'error',
                toast: true,
                text: message,
                background: '#333',
                customClass: 'alert__tixsme alert_error',
                position: 'top-end',
                timer: timer,
                showConfirmButton: showbutton,
            });
        },
        toastWarning(message, timer = 4000, showbutton = false) {
            this.$swal({
                type: 'warning',
                toast: true,
                text: message,
                background: '#333',
                position: 'top-end',
                customClass: 'alert__tixsme alert__warning',
                timer: timer,
                showConfirmButton: showbutton,
            });
        },
        toastInfo(message, timer = 4000, showbutton = false) {
            this.$swal({
                type: 'info',
                toast: true,
                text: message,
                background: '#333',
                customClass: 'alert__tixsme alert__info',
                position: 'top-end',
                timer: timer,
                showConfirmButton: showbutton,
            });
        },
        popupError(message, timer = 4000, showbutton = false) {
            this.$swal({
                type: 'error',
                //                toast: true,
                text: message,
                //                position: 'top-end',
                timer: timer,
                showConfirmButton: showbutton,
            });
        },
        validateJSON(ret) {
            if (ret.error) {
                this.toastError(ret.message);
                return false;
            }
            return true;
        },
        getLocation(callBack) {
            let options = null;
            this.$getLocation(options)
                .then(coordinates => {
                    this.getCity(coordinates, callBack);
                });
        },
        getCity(coordinates, callBack) {
            let url = config.geo.replace(/{key}/gi, config.geokey).replace(/{lat}/gi, coordinates.lat).replace(/{lng}/gi, coordinates.lng);
            Vue.http.get(url).then(res => {
                if (res.body.status == "OK" && res.body.results.length > 0) {
                    for (let index = 0; index < res.body.results[0].address_components.length; index++) {
                        const element = res.body.results[0].address_components[index];
                        switch (element.types[0]) {
                            case "administrative_area_level_2":
                                this.locale.city.name = element.long_name;
                                this.locale.city.short = element.short_name;
                                break
                            case "administrative_area_level_1":
                                this.locale.state.name = element.long_name;
                                this.locale.state.short = element.short_name;
                                break
                            case "country":
                                this.locale.country.name = element.long_name;
                                this.locale.country.short = element.short_name;
                                break
                        }
                    }
                    if (callBack!=null && callBack !=undefined)
                    {
                        callBack();
                    } 
                    //console.log(JSON.stringify(this.locale));
                }
            }, err => {
                console.log(2, err);
            });
        },
        initializeMenuOverlay() {
            /* Open when someone clicks on the span element */
            function openNav() {
                document.getElementById("myNav").style.width = "100%";
            }

            /* Close when someone clicks on the "x" symbol inside the overlay */
            function closeNav() {
                document.getElementById("myNav").style.width = "0%";
            }
        },
        initializeMenu() {
            /**
             * Header
             */
            function globalNavDropdowns(e) {
                var t = this;
                this.container = document.querySelector(e), this.root = this.container.querySelector(".navRoot"), this.primaryNav = this.root.querySelector(".navSection.primary"), this.primaryNavItem = this.root.querySelector(".navSection.primary .rootLink:last-child"), this.secondaryNavItem = this.root.querySelector(".navSection.secondary .rootLink:first-child"), this.checkCollision(), window.addEventListener("load", this.checkCollision.bind(this)), window.addEventListener("resize", this.checkCollision.bind(this)), this.container.classList.add("noDropdownTransition"), this.dropdownBackground = this.container.querySelector(".dropdownBackground"), this.dropdownBackgroundAlt = this.container.querySelector(".alternateBackground"), this.dropdownContainer = this.container.querySelector(".dropdownContainer"), this.dropdownArrow = this.container.querySelector(".dropdownArrow"), this.dropdownRoots = Strut.queryArray(".hasDropdown", this.root), this.dropdownSections = Strut.queryArray(".dropdownSection", this.container).map(function (e) {
                    return {
                        el: e,
                        name: e.getAttribute("data-dropdown"),
                        content: e.querySelector(".dropdownContent")
                    }
                });
                var n = window.PointerEvent ? {
                    end: "pointerup",
                    enter: "pointerenter",
                    leave: "pointerleave"
                } : {
                    end: "touchend",
                    enter: "mouseenter",
                    leave: "mouseleave"
                };
                this.dropdownRoots.forEach(function (e, r) {
                    e.addEventListener(n.end, function (n) {
                        n.preventDefault(), n.stopPropagation(), t.toggleDropdown(e)
                    }), e.addEventListener(n.enter, function (n) {
                        if (n.pointerType == "touch") return;
                        t.stopCloseTimeout(), t.openDropdown(e)
                    }), e.addEventListener(n.leave, function (e) {
                        if (e.pointerType == "touch") return;
                        t.startCloseTimeout()
                    })
                }), this.dropdownContainer.addEventListener(n.end, function (e) {
                    e.stopPropagation()
                }), this.dropdownContainer.addEventListener(n.enter, function (e) {
                    if (e.pointerType == "touch") return;
                    t.stopCloseTimeout()
                }), this.dropdownContainer.addEventListener(n.leave, function (e) {
                    if (e.pointerType == "touch") return;
                    t.startCloseTimeout()
                }), document.body.addEventListener(n.end, function (e) {
                    Strut.touch.isDragging || t.closeDropdown()
                })
            }

            function globalNavPopup(e) {
                var t = this,
                    n = Strut.touch.isSupported ? "touchend" : "click";
                this.activeClass = "globalPopupActive", this.root = document.querySelector(e), this.link = this.root.querySelector(".rootLink"), this.popup = this.root.querySelector(".popup"), this.closeButton = this.root.querySelector(".popupCloseButton"), this.link.addEventListener(n, function (e) {
                    e.stopPropagation(), t.togglePopup()
                }), this.popup.addEventListener(n, function (e) {
                    e.stopPropagation()
                }), this.closeButton && this.closeButton.addEventListener(n, function (e) {
                    t.closeAllPopups()
                }), document.body.addEventListener(n, function (e) {
                    Strut.touch.isDragging || t.closeAllPopups()
                }, !1)
            }(function () {
                window.$ && window.$.ajaxPrefilter && $(function () {
                    return $.ajaxPrefilter(function (e, t, n) {
                        var r, i;
                        return i = $("meta[name=csrf-token]"), r = i ? i.attr("content") : "", n.setRequestHeader("x-stripe-csrf-token", r)
                    })
                })
            }).call(this),
                function () {
                    function i(e, t, n) {
                        if (!("Analytics" in window)) return;
                        n ? window.Analytics[e](t, {
                            source: n
                        }) : window.Analytics[e](t)
                    }

                    function s(e, t, n, r) {
                        e.addEventListener("click", function (e) {
                            i(t, n, r)
                        })
                    }

                    function o() {
                        var n = document.querySelectorAll("[" + e + "]");
                        [].slice.call(n).forEach(function (n) {
                            s(n, "action", n.getAttribute(e), n.getAttribute(t))
                        })
                    }

                    function u(e) {
                        var t = document.querySelectorAll("[" + n + "]");
                        [].slice.call(t).forEach(function (e) {
                            s(e, "modal", e.getAttribute(n), e.getAttribute(r))
                        })
                    }
                    var e = "data-analytics-action",
                        t = "data-action-source",
                        n = "data-analytics-modal",
                        r = "data-modal-source";
                    document.addEventListener("DOMContentLoaded", function () {
                        o(), u()
                    })
                }(), "use strict";
            var Strut = {
                random: function (e, t) {
                    return Math.random() * (t - e) + e
                },
                arrayRandom: function (e) {
                    return e[Math.floor(Math.random() * e.length)]
                },
                interpolate: function (e, t, n) {
                    return e * (1 - n) + t * n
                },
                rangePosition: function (e, t, n) {
                    return (n - e) / (t - e)
                },
                clamp: function (e, t, n) {
                    return Math.max(Math.min(e, n), t)
                },
                queryArray: function (e, t) {
                    return t || (t = document.body), Array.prototype.slice.call(t.querySelectorAll(e))
                },
                ready: function (e) {
                    document.readyState !== "loading" ? e() : document.addEventListener("DOMContentLoaded", e)
                }
            };
            Strut.isRetina = window.devicePixelRatio > 1.3, Strut.mobileViewportWidth = 670, Strut.isMobileViewport = window.innerWidth < Strut.mobileViewportWidth, window.addEventListener("resize", function () {
                Strut.isMobileViewport = window.innerWidth < Strut.mobileViewportWidth
            }), Strut.touch = {
                isSupported: "ontouchstart" in window || navigator.maxTouchPoints,
                isDragging: !1
            }, document.addEventListener("DOMContentLoaded", function () {
                document.body.addEventListener("touchmove", function () {
                    Strut.touch.isDragging = !0
                }), document.body.addEventListener("touchstart", function () {
                    Strut.touch.isDragging = !1
                })
            }), Strut.load = {
                images: function (e, t) {
                    typeof e == "string" && (e = [e]);
                    var n = -e.length;
                    e.forEach(function (e) {
                        var r = new Image;
                        r.src = e, r.onload = function () {
                            n++, n === 0 && t && t()
                        }
                    })
                },
                css: function (e, t) {
                    var n = document.createElement("link"),
                        r = window.readConfig("strut_files") || {},
                        i = r[e];
                    if (!i) throw new Error('CSS file "' + e + '" not found in strut_files config');
                    n.href = i, n.rel = "stylesheet", document.head.appendChild(n), t && (n.onload = t)
                },
                js: function (e, t) {
                    var n = document.createElement("script"),
                        r = window.readConfig("strut_files") || {},
                        i = r[e];
                    if (!i) throw new Error('Javascript file "' + e + '" not found in strut_files config');
                    n.src = i, document.head.appendChild(n), t && (n.onload = t)
                }
            }, Strut.supports = {
                es6: function () {
                    try {
                        return new Function("(a = 0) => a"), !0
                    } catch (e) {
                        return !1
                    }
                }(),
                pointerEvents: function () {
                    var e = document.createElement("a").style;
                    return e.cssText = "pointer-events:auto", e.pointerEvents === "auto"
                }(),
                positionSticky: function () {
                    var e = "position:",
                        t = "sticky",
                        n = document.createElement("a"),
                        r = n.style,
                        i = " -webkit- -moz- -o- -ms- ".split(" ");
                    return r.cssText = e + i.join(t + ";" + e).slice(0, -e.length), r.position.indexOf(t) !== -1
                }(),
                masks: function () {
                    return !/MSIE|Trident|Edge/i.test(navigator.userAgent)
                }()
            }, globalNavDropdowns.prototype.checkCollision = function () {
                var e = this;
                if (Strut.isMobileViewport) return;
                if (e.compact == 1) {
                    var t = document.body.clientWidth,
                        n = e.primaryNav.getBoundingClientRect();
                    n.left + n.width / 2 > t / 2 && (e.container.classList.remove("compact"), e.compact = !1)
                } else {
                    var r = e.primaryNavItem.getBoundingClientRect(),
                        i = e.secondaryNavItem.getBoundingClientRect();
                    r.right > i.left && (e.container.classList.add("compact"), e.compact = !0)
                }
            }, globalNavDropdowns.prototype.openDropdown = function (e) {
                var t = this;
                if (this.activeDropdown === e) return;
                this.container.classList.add("overlayActive"), this.container.classList.add("dropdownActive"), this.activeDropdown = e, this.dropdownRoots.forEach(function (e, t) {
                    e.classList.remove("active")
                }), e.classList.add("active");
                var n = e.getAttribute("data-dropdown"),
                    r = "left",
                    i, s, o;
                this.dropdownSections.forEach(function (e) {
                    e.el.classList.remove("active"), e.el.classList.remove("left"), e.el.classList.remove("right"), e.name == n ? (e.el.classList.add("active"), r = "right", i = e.content.offsetWidth, s = e.content.offsetHeight, o = e.content) : e.el.classList.add(r)
                });
                var u = 520,
                    a = 400,
                    f = i / u,
                    l = s / a,
                    c = e.getBoundingClientRect(),
                    h = c.left + c.width / 2 - i / 2;
                h = Math.round(Math.max(h, 10)), clearTimeout(this.disableTransitionTimeout), this.enableTransitionTimeout = setTimeout(function () {
                    t.container.classList.remove("noDropdownTransition")
                }, 50), this.dropdownBackground.style.transform = "translateX(" + h + "px) scaleX(" + f + ") scaleY(" + l + ")", this.dropdownContainer.style.transform = "translateX(" + h + "px)", this.dropdownContainer.style.width = i + "px", this.dropdownContainer.style.height = s + "px";
                var p = Math.round(c.left + c.width / 2);
                this.dropdownArrow.style.transform = "translateX(" + p + "px) rotate(45deg)";
                var d = o.children[0].offsetHeight / l;
                this.dropdownBackgroundAlt.style.transform = "translateY(" + d + "px)"
            }, globalNavDropdowns.prototype.closeDropdown = function () {
                var e = this;
                if (!this.activeDropdown) return;
                this.dropdownRoots.forEach(function (e, t) {
                    e.classList.remove("active")
                }), clearTimeout(this.enableTransitionTimeout), this.disableTransitionTimeout = setTimeout(function () {
                    e.container.classList.add("noDropdownTransition")
                }, 50), this.container.classList.remove("overlayActive"), this.container.classList.remove("dropdownActive"), this.activeDropdown = undefined
            }, globalNavDropdowns.prototype.toggleDropdown = function (e) {
                this.activeDropdown === e ? this.closeDropdown() : this.openDropdown(e)
            }, globalNavDropdowns.prototype.startCloseTimeout = function () {
                var e = this;
                e.closeDropdownTimeout = setTimeout(function () {
                    e.closeDropdown()
                }, 50)
            }, globalNavDropdowns.prototype.stopCloseTimeout = function () {
                var e = this;
                clearTimeout(e.closeDropdownTimeout)
            }, globalNavPopup.prototype.togglePopup = function () {
                var e = this.root.classList.contains(this.activeClass);
                this.closeAllPopups(!0), e || this.root.classList.add(this.activeClass)
            }, globalNavPopup.prototype.closeAllPopups = function (e) {
                var t = document.getElementsByClassName(this.activeClass);
                for (var n = 0; n < t.length; n++) t[n].classList.remove(this.activeClass)
            }, Strut.supports.pointerEvents || Strut.load.css("v3/shared/navigation_ie10.css"), Strut.ready(function () {
                new globalNavDropdowns(".globalNav"), new globalNavPopup(".globalNav .navSection.mobile"), new globalNavPopup(".globalFooterNav .select.country"), new globalNavPopup(".globalFooterNav .select.language")
            });
        }
    }
}

func.methods.youshallnotpass();