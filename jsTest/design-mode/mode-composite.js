/******************************* Folder ******************************/
const Folder = function (name) {
  this.name = name;
  this.parent = null;
  this.files = [];
}

Folder.prototype.add = function (file) {
  file.parent = this;
  this.files.push(file);
}

Folder.prototype.scan = function () {
  console.log('--------开始扫描文件夹--------', this.name);

  for (let i = 0, file, files = this.files; file = files[i++]; ) {
    file.scan();
  }
}

Folder.prototype.remove = function () {
  if (!this.parent) {   // 根节点或树外的游离节点
    return;
  }

  for (let files = this.parent.files, i = files.length - 1; i >= 0; i--) {
    const file = files[i];
    if (file === this) {
      files.splice(i, 1);
    }
  }
}

/******************************* File ******************************/
const File = function (name) {
  this.name = name;
  this.parent = null;
}

File.prototype.add = function () {
  throw new Error('文件下面不能再添加文件');
}

File.prototype.scan = function () {
  console.log('--------开始扫描文件--------', this.name);
}

File.prototype.remove = function () {
  if (!this.parent) {   // 根节点或树外的游离节点
    return
  }

  for (let files = this.parent.files, i = files.length - 1; i >= 0; i--) {
    const file = files[i];
    if (file === this) {
      files.splice(i, 1);
    }
  }
}

const folder = new Folder('学习资料');
const folderJavaScript = new Folder('JavaScript');
const folderJQuery = new Folder('jQuery');

const file1 = new File('JavaScript设计模式与开发实践');
const file2 = new File( '精通jQuery' );
const file3 = new File( '重构与模式' );

folderJavaScript.add(file1);
folderJQuery.add(file2);

folder.add(folderJavaScript);
folder.add(folderJQuery);
folder.add(file3);

const folderNodejs = new Folder('Nodejs');
const file4 = new File('深入浅出Nodejs');
folderNodejs.add(file4);

const file5 = new File('JavaScript语言精髓与编程实践');

folder.add(folderNodejs);
folder.add(file5);

folderJQuery.remove();
folder.scan();
