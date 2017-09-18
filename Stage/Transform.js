define(['_', 'bC'], function (_, bC) {

  var eventParser = {
    enter: 'mouseover',
    leave: 'mouseleave',
    start: 'mousedown',
    move: 'mousemove',
    end: 'mouseup'
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

      var context = this;
      var mouseHandler = function (evt) {
        if (!this.isEnterSpace)
          return;

        var currLeft = elProcesser.css(context.el, 'left'),
            currTop = elProcesser.css(context.el, 'top');

        var moveHandler = function (evtM) {
          if (!context.isEnterSpace)
            return;

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
          elProcesser.clearPreDef(evtM);
        };
        var endHandler = function (evt) {
          cleanUp();
        };
        var cleanUp = function () {
          context._unbind(document, 'selectstart', elProcesser.clearPreDef);
          context._unbind(document, 'dragstart', elProcesser.clearPreDef);
          context._unbind(document, eventParser.move, moveHandler);
          context._unbind(document, eventParser.end, endHandler);
        }

        context._bind(document, 'selectstart', elProcesser.clearPreDef);
        context._bind(document, 'dragstart', elProcesser.clearPreDef);
        context._bind(document, eventParser.move, moveHandler);
        context._bind(document, eventParser.end, endHandler);
      };
      var mouseEnterHandler = function (evt) {
        elProcesser.css(this.el, 'cursor', 'move');

        var mouseLeaveHandler = function (evt) {
          elProcesser.css(context.el, 'cursor', 'default');
          context._unbind(context.el, eventParser.leave, mouseLeaveHandler);
        };

        this._bind(this.el, eventParser.leave, mouseLeaveHandler);
      };
      var keyDownHandler = function (evt) {
        this.isEnterSpace = evt.keyCode == 32 ? true : false;

        var keyUpHandler = function (evt) {
          context.isEnterSpace = false;
          context._unbind(document, 'keyup', keyUpHandler);
        };

        this._bind(document, 'keyup', keyUpHandler.bind(this));
      };


      this._bind(this.el, eventParser.start, mouseHandler.bind(this));
      this._bind(this.el, eventParser.enter, mouseEnterHandler.bind(this));
      this._bind(document, 'keydown', keyDownHandler.bind(this));
    },

    /**
     * 缩放
     */
    scale: function () {

    },

    /**
     * 绑定事件
     *
     * @param { HTMLElement } el dom
     * @param { String } eventName 事件名
     * @param { Function } handler 处理函数
     */
    _bind: function (el, eventName, handler) {
      el.addEventListener(eventName, handler, false);
    },

    /**
     * 删除事件
     *
     * @param { HTMLElement } el dom
     * @param { String } eventName 事件名
     * @param { Function } handler 处理函数
     */
    _unbind: function (el, eventName, handler) {
      el.removeEventListener(eventName, handler, false);
    }

  });

});
