define(['AbstractElement', 'Transform'], function (AE, Transform) {
  return AE.extend({

    initialize: function ($super) {
      $super({ left: 100, top: 100, width: 300, height: 300 });

      this.transform = null;
    },

    startUp: function () {
      this.transform = new Transform({ el: this.el });
    }

  });
});
