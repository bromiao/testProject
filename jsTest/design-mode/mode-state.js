window.external.upload = function (state) {
  console.log(state)  // scanning, uploading, pause, done, error
}

const plugin = (function () {
  const plugin = document.createElement('embed');
  plugin.style.display = 'none';

  plugin.type = 'application/txftn-webkit';

  plugin.scanning = function () {
    console.log('开始文件扫描');
  }

  plugin.pause = function () {
    console.log('暂停文件上传');
  }

  plugin.uploading = function () {
    console.log('开始文件上传');
  }

  plugin.del = function () {
    console.log('删除文件上传');
  }

  plugin.done = function () {
    console.log('文件上传完成');
  }

  document.body.appendChild(plugin);

  return plugin;
})()


/*在Upload构造函数中为每种状态子类都创建一个实例对象*/
const Upload = function (fileName) {
  this.plugin = plugin;
  this.fileName = fileName;
  this.button1 = null;
  this.button2 = null;

  this.scanningState = new ScanningState(this);
  this.uploadingState = new UploadingState(this);
  this.pauseState = new PauseState(this);
  this.doneState = new DoneState(this);
  this.errorState = new ErrorState(this);
  this.currState = this.scanningState;  // 设置当前状态
}

Upload.prototype.init = function () {
  this.dom = document.createElement('div');
  this.dom.innerHTML = `<span>文件名称：${this.fileName}</span>
                        <button data-action="button1">扫描中</button>
                        <button data-action="button2">删除</button>`;

  document.body.appendChild(this.dom);

  this.button1 = document.querySelector('[data-action="button1"]');
  this.button2 = document.querySelector('[data-action="button2"]');

  this.bindEvent();
}

/*负责具体的按钮事件实现，在点击了按钮之后，Context 并不做任何具体的操作，
而是把请求委托给当前的状态类来执行*/
Upload.prototype.bindEvent = function () {
  const self = this;

  this.button1.onclick = function () {
    self.currState.clickHandler1();
  }
  this.button2.onclick = function () {
    self.currState.clickHandler2();
  }
}

/*把状态对应的逻辑行为放在 Upload 类中*/
Upload.prototype.scanning = function () {
  this.plugin.scanning();
  this.currState = this.scanningState;
}

Upload.prototype.uploading = function () {
  this.button1.innerHTML = '正在上传，点击暂停';
  this.plugin.uploading();
  this.currState = this.uploadingState;
}

Upload.prototype.pause = function () {
  this.button1.innerHTML = '已暂停，点击继续上传';
  this.plugin.pause();
  this.currState = this.pauseState;
}

Upload.prototype.done = function () {
  this.button1.innerHTML = '上传完成';
  this.plugin.done();
  this.currState = this.doneState;
}

Upload.prototype.error = function () {
  this.button1.innerHTML = '上传失败';
  this.currState = this.errorState;
}

Upload.prototype.del = function () {
  this.plugin.del();
  this.dom.parentNode.removeChild(this.dom);
}


/*StateFactory来实现各个状态类*/
const StateFactory = (function () {
  const State = function () {};

  State.prototype.clickHandler1 = function(){
    throw new Error( '子类必须重写父类的 clickHandler1 方法' );
  }
  State.prototype.clickHandler2 = function(){
    throw new Error( '子类必须重写父类的 clickHandler2 方法' );
  }

  return function (param) {
    const F = function (uploadObj) {
      this.uploadObj = uploadObj;
    }

    F.prototype = new State();

    for (let i in param) {
      F.prototype[i] = param[i];
    }

    return F;
  }
})();

const ScanningState = StateFactory({
  clickHandler1: function () {
    console.log('扫描中，点击无效...');
  },
  clickHandler2: function () {
    console.log('文件正在上传中，不能删除');
  }
})

const UploadingState = StateFactory({
  clickHandler1: function () {
    this.uploadObj.pause();
  },
  clickHandler2: function () {
    console.log('文件正在上传中，不能删除');
  }
})

const PauseState = StateFactory({
  clickHandler1: function () {
    this.uploadObj.uploading();
  },
  clickHandler2: function () {
    this.uploadObj.del();
  }
})

const DoneState = StateFactory({
  clickHandler1: function () {
    console.log('文件已完成上传, 点击无效');
  },
  clickHandler2: function () {
    this.uploadObj.del();
  }
})

const ErrorState = StateFactory({
  clickHandler1: function () {
    console.log( '文件上传失败, 点击无效' );
  },
  clickHandler2: function () {
    this.uploadObj.del();
  }
})


/*测试*/
const uploadObj = new Upload( 'JavaScript 设计模式与开发实践' );
uploadObj.init();
window.external.upload = function( state ){
  uploadObj[ state ]();
};
window.external.upload( 'scanning' );
setTimeout(function(){
  window.external.upload( 'uploading' ); // 1 秒后开始上传
}, 1000 );
setTimeout(function(){
  window.external.upload( 'done' ); // 5 秒后上传完成
}, 5000 );
