/**
 * Define action to pen draw by mouse action
 */
(function () {
  'use strict';

  var freeDrawSettings = function () {
    let width = 1;
    let style = 'pencil';
    let color = 'black';

    const _self = this;
    $(`${this.containerSelector} .main-panel`).append(`<div class="toolpanel" id="draw-panel"><div class="content"><p class="title">자유그리기</p></div></div>`);

    // set dimension section
    $(`${this.containerSelector} .toolpanel#draw-panel .content`).append(`
      <div>
        <div class="input-container">
          <label>브러쉬 너비</label>
          <div class="custom-number-input">
          <button class="decrease">-</button>
          <input type="number" min="1" value="1" id="input-brush-width"/>
          <button class="increase">+</button>
          </div>
        </div>
        <div class="input-container">
          <label>브러쉬 유형</label>
          <select id="input-brush-type">
            <option value="pencil" selected>연필</option>
            <option value="circle">점</option>
            <option value="spray">스프레이</option>
          </select>
        </div>
        <div class="input-container">
          <label>브러쉬 색상</label>
          <input id="color-picker" value='black'/>
        </div>
      </div>
    `);

    let updateBrush = () => {
      try {
        switch (style) {
          case 'circle':
            _self.canvas.freeDrawingBrush = new fabric.CircleBrush(_self.canvas)
            break

          case 'spray':
            _self.canvas.freeDrawingBrush = new fabric.SprayBrush(_self.canvas)
            break

          default:
            _self.canvas.freeDrawingBrush = new fabric.PencilBrush(_self.canvas)
            break
        }

        _self.canvas.freeDrawingBrush.width = width;
        _self.canvas.freeDrawingBrush.color = color;

      } catch (_) {}
    }

    $(`${this.containerSelector} .toolpanel#draw-panel .content #input-brush-width`).change(function () {
      try {
        width = parseInt($(this).val());
        updateBrush();
      } catch (_) {}
    })

    $(`${this.containerSelector} .toolpanel#draw-panel .content #input-brush-type`).change(function () {
      style = $(this).val();
      updateBrush();
    })

    $(`${this.containerSelector} .toolpanel#draw-panel .content #color-picker`).spectrum({
      type: "color",
      showInput: "true",
      showInitial: "true",
      allowEmpty: "false",
    });

    $(`${this.containerSelector} .toolpanel#draw-panel .content #color-picker`).change(function () {
      try {
        color = $(this).val();
        updateBrush();
      } catch (_) {}
    })
  }

  window.ImageEditor.prototype.initializeFreeDrawSettings = freeDrawSettings;
})();