/***
  * 所有元素的基类，这个只是载体，真正业务开发需换，这次只是展示变形的效果
*/

define(['_', 'bC'], function (_, bC) {

  return bC({

    initialize: function (options) {
      options = _.defaults({}, options, {

        parentEl: document.body,

        left: 0,

        top: 0,

        width: 0,

        height: 0,

        backgroundColor: 'skyblue',

        // 子元素模板 [必写]
        template: ''
      });

      _.extend(this, options);
      this.createEl();
    },

    createEl: function () {
      this.el = document.createElement('div');
      this.el.style.width = this.width + 'px';
      this.el.style.height = this.height + 'px';
      this.el.style.left = this.left + 'px';
      this.el.style.top = this.top + 'px';
      this.el.style.position = 'absolute';
      this.el.style.backgroundColor = this.backgroundColor;
      this.el.innerHTML = this.template;
      this.parentEl.appendChild(this.el);
    }

  });
});
