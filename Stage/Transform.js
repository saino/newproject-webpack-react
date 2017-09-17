define(['_', 'bC'], function (_, bC) {

  var eventParser = {
    'start': 'mousedown',
    'move': 'mousemove',
    'end': 'mouseup'
  };

  var elProcesser = {

    css: function (el, name, value) {
      return value == null
        ? parseFloat(document.defaultView.getComputedStyle(el, null).getPropertyValue(name))
        : el.style[name] = value;
    },

    clearPreDef: function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }

  };

  return bC({

    /**
     * @constructor
     *
     * @param { HTMLElement } options.element
     * @param { Number } options.scale
     * @param { Number } options.translate
     */
    initialize: function (options) {
      options = _.defaults({}, options, {

        // 变形的dom [必传]
        el: null,

        // 父容器 [可传]
        parentEl: document.body,

        // 缩放 [可传]
        scale: 1
      });

      _.extend(this, options);

      // 是否拖拽中
      this.isDroping = false;

      // 是否缩放中
      this.isScaling = false;

      // 是否按住空格键
      this.isEnterSpace = false;

      this.drop();
    },

    /**
     * 拖拽
     */
    drop: function () {
      if (!this.el)
        return;

      var getOffsetMax = function () {
        var parentWidthSize = elProcesser.css(this.parentEl, 'padding-left') + elProcesser.css(this.parentEl, 'padding-right') + elProcesser.css(this.parentEl, 'width');
        var parentHeightSize = elProcesser.css(this.parentEl, 'padding-top') + elProcesser.css(this.parentEl, 'padding-bottom') + elProcesser.css(this.parentEl, 'height');
        var currWidthSize = elProcesser.css(this.el, 'border-left-width') + elProcesser.css(this.el, 'border-right-width') + elProcesser.css(this.el, 'margin-left') + elProcesser.css(this.el, 'margin-right') + elProcesser.css(this.el, 'width') + elProcesser.css(this.el, 'padding-left') + elProcesser.css(this.el, 'padding-right');
        var currHeightSize = elProcesser.css(this.el, 'border-top-width') + elProcesser.css(this.el, 'border-bottom-width') + elProcesser.css(this.el, 'margin-top') + elProcesser.css(this.el, 'margin-bottom') + elProcesser.css(this.el, 'height') + elProcesser.css(this.el, 'padding-top') + elProcesser.css(this.el, 'padding-bottom');

        return {
          left: parentWidthSize - currWidthSize,
          top: parentHeightSize - currHeightSize
        };
      };

      var mouseHandler = function (evt) {
        var context = this,
            currLeft = elProcesser.css(context.el, 'left'),
            currTop = elProcesser.css(context.el, 'top');

        var moveHandler = function (evtM) {
          var newLeft, newTop, offsetLeft, offsetTop, offsetMax;

          offsetMax = getOffsetMax.call(context);
          offsetLeft = evtM.clientX - evt.clientX;
          offsetTop = evtM.clientY - evt.clientY;

          newLeft = offsetLeft + currLeft;
          newTop = offsetTop + currTop;

          if (newLeft < 0) {
            newLeft = 0;
          }

          if (newTop < 0) {
            newTop = 0;
          }

          if (newLeft > offsetMax.left) {
            newLeft = offsetMax.left;
          }

          if (newTop > offsetMax.top) {
            newTop = offsetMax.top;
          }

          elProcesser.css(context.el, 'left', newLeft + 'px');
          elProcesser.css(context.el, 'top', newTop + 'px');
          elProcesser.css(context.el, 'cursor', 'move');
          elProcesser.clearPreDef(evtM);
        };
        var endHandler = function (evt) {
          cleanUp();
          elProcesser.css(context.el, 'cursor', 'default');
        };
        var cleanUp = function () {
          context.unbind(document, 'selectstart', elProcesser.clearPreDef);
          context.unbind(document, 'dragstart', elProcesser.clearPreDef);
          context.unbind(document, eventParser.move, moveHandler);
          context.unbind(document, eventParser.end, endHandler);
        }

        context.bind(document, 'selectstart', elProcesser.clearPreDef);
        context.bind(document, 'dragstart', elProcesser.clearPreDef);
        context.bind(document, eventParser.move, moveHandler);
        context.bind(document, eventParser.end, endHandler);
      }

      this.bind(this.el, eventParser.start, mouseHandler.bind(this));
    },

    /**
     * 缩放
     */

    /**
     * 绑定事件
     *
     * @param { HTMLElement } el dom
     * @param { String } eventName 事件名
     * @param { Function } handler 处理函数
     */
    bind: function (el, eventName, handler) {
      el.addEventListener(eventName, handler, false);
    },

    /**
     * 删除事件
     *
     * @param { HTMLElement } el dom
     * @param { String } eventName 事件名
     * @param { Function } handler 处理函数
     */
    unbind: function (el, eventName, handler) {
      el.removeEventListener(eventName, handler, false);
    }

  });

});
