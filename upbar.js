/*
 * Upbar v 1.0.0
 * MIT
 * Sam John Duke - https://samjohnduke.com
 * @preserve
 */
;(function(root) {
  'use strict';

  function Upbar(el, opts) {

    var defaults = {
      delta: 20,
      showClass: 'abs-show',
      hideClass: 'abs-hide',
      animateClass: 'abs-animate',
    };

    this.opts = Object.assign(defaults, opts);

    this.didScroll = false;
    this.delta = this.opts.delta;
    this.interval = undefined;
    this.lastScrollY = 0;

    this.el = el;
    this.elHeight = el.offsetHeight;

    this.onScroll = this.onScroll.bind(this);
    this.up = this.up.bind(this);

    this.attach();
  };


  Upbar.prototype.attach = function() {
    window.addEventListener('scroll', this.onScroll);
    this.interval = setInterval(this.up, 200);
  };

  Upbar.prototype.detach = function() {
    window.removeEventListener('scroll', this.onScroll);
    clearInterval(this.interval);
  };

  Upbar.prototype.onScroll = function() {
    this.didScroll = true;
  };

  Upbar.prototype.up = function() {
    if(!this.didScroll) {
      return
    }
    this.didScroll = false;

    var scrollY = window.scrollY

    if( Math.abs(this.lastScrollY - scrollY) <= this.delta ) {
      return;
    }

    if(scrollY <= 0) {
      this.el.classList.remove(this.opts.showClass);
      this.el.classList.remove(this.opts.hideClass);
      this.el.classList.remove(this.opts.animateClass);
    } else if(scrollY < this.lastScrollY && scrollY > this.elHeight) {
      this.el.classList.add(this.opts.showClass);
      this.el.classList.add(this.opts.animateClass);
      this.el.classList.remove(this.opts.hideClass);
    } else if(scrollY > this.lastScrollY && scrollY > this.elHeight) {
      this.el.classList.remove(this.opts.showClass);
      this.el.classList.add(this.opts.hideClass);
    }

    this.lastScrollY = scrollY;
  };

  if( typeof exports !== 'undefined' ) {
    if( typeof module !== 'undefined' && module.exports ) {
      exports = module.exports = mymodule
    }
    exports.Upbar = Upbar
  }
  else {
    root.Upbar = Upbar
  }

}(this || {}))
