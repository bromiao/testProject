const goods = {
  "red|32G": 3,
  "red|16G": 0,
  "blue|32G": 4,
  "blur|16G": 6
}

let colorSelect = document.querySelector('#colorSelect'),
    memorySelect = document.querySelector('#memorySelect'),
    numberInput = document.querySelector('#numberInput');

const mediator = (function (){
  let colorInfo = document.querySelector('#colorInfo'),
      memoryInfo = document.querySelector('#memoryInfo'),
      numberInfo = document.querySelector('#numberInfo'),
      nextBtn = document.querySelector('#nextBtn');

  return {
    changed: function (obj) {
      let color = colorSelect.value,
          memory = memorySelect.value,
          count = parseFloat(numberInput.value),
          stock = goods[color + '|' + memory];

      if (obj === colorSelect) {
        colorInfo.innerHTML = color;
      } else if (obj === memorySelect) {
        memoryInfo.innerHTML = memory;
      } else if (obj === numberInput) {
        numberInfo.innerHTML = count;
      }

      if (!color) {
        nextBtn.disabled = true;
        nextBtn.innerHTML = '请选择手机颜色';
        return;
      }

      if (!memory) {
        nextBtn.disabled = true;
        nextBtn.innerHTML = '请选择内存大小';
        return;
      }

      if ((count < 0) || (count | 0) !== count) {
        nextBtn.disabled = true;
        nextBtn.innerHTML = '请输入正确的购买数量';
        return;
      }

      if ( count > stock ){ // 当前选择数量没有超过库存量
        nextBtn.disabled = true;
        nextBtn.innerHTML = '库存不足';
        return ;
      }

      nextBtn.disabled = false;
      nextBtn.innerHTML = '放入购物车';
    }
  }
})();


const bindEvent = function () {
  colorSelect.onchange = function () {
    mediator.changed(this);
  }

  memorySelect.onchange = function () {
    mediator.changed(this);
  }

  numberInput.oninput = function () {
    mediator.changed(this);
  }
};

bindEvent();
