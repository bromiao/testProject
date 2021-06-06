/*
 内部状态储存于对象内部。
 内部状态可以被一些对象共享。
 内部状态独立于具体的场景，通常不会改变。
 外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享。*/

// 明确了 uploadType 作为内部状态之后，我们再把其他的外部状态从构造函数中抽离出来，
// Upload 构造函数中只保留 uploadType 参数
const Upload = function (uploadType) {
  this.uploadType = uploadType;
}

// 管理器封装外部状态
const uploadManager = (function () {
  const uploadDatebase = {};

  return {
    add: function (id, uploadType, fileName, fileSize) {
      const flyWeightObj = UploadFactory.create(uploadType);

      const dom = document.createElement('div');
      dom.innerHTML =
        '<span>文件名称:'+ fileName +', 文件大小: '+ fileSize +'</span>' +
        '<button class="delFile">删除</button>';

      dom.querySelector('.delFile').onclick = function () {
        flyWeightObj.delFile(id);
      }

      document.body.appendChild(dom);

      uploadDatebase[id] = {
        fileName,
        fileSize,
        dom
      }

      return flyWeightObj;
    },
    setExternalState: function (id, flyWeightObj) {
      const uploadData = uploadDatebase[id];

      for (let i in uploadData) {
        flyWeightObj[i] = uploadData[i];
      }
    }
  }
})();

Upload.prototype.delFile = function (id) {
  uploadManager.setExternalState(id, this);

  if (this.fileSize < 3000) {
    return this.dom.parentNode.removeChild(this.dom);
  }

  if (window.confirm('确定要删除该文件吗？' + this.fileName)) {
    return this.dom.parentNode.removeChild(this.dom);
  }
}


// 工厂进行对象实例化
const UploadFactory = (function () {
  const createdFlyWeightObjs = {};

  return {
    create: function (uploadType) {
      if (createdFlyWeightObjs[uploadType]) {  // 是否存在已有类型，减少内存开销
        return createdFlyWeightObjs[uploadType];
      }

      return createdFlyWeightObjs[uploadType] = new Upload(uploadType);
    }
  }
})();



let id = 0;
window.startUpload = function (uploadType, files) {
  for (let i = 0, file; file = files[i++]; ) {
    const uploadObj = uploadManager.add(++id, uploadType, file.fileName, file.fileSize);
  }
}


startUpload( 'plugin', [
  {
    fileName: '1.txt',
    fileSize: 1000
  },
  {
    fileName: '2.html',
    fileSize: 3000
  },
  {
    fileName: '3.txt',
    fileSize: 5000
  }
]);
startUpload( 'flash', [
  {
    fileName: '4.txt',
    fileSize: 1000
  },
  {
    fileName: '5.html',
    fileSize: 3000
  },
  {
    fileName: '6.txt',
    fileSize: 5000
  }
]);
