function DatabaseConnection () {
  let databaseInstance = null;
// 追踪特定时间创建实例的数量
  let count = 0;
  function init() {
    console.log(`Opening database #${count + 1}`);
// 现在执行操作
  }
  function createIntance() {
    if(databaseInstance == null) {
      databaseInstance = init();
    }
    return databaseInstance;
  }
  function closeIntance() {
    console.log("closing database");
    databaseInstance = null;
  }
  return {
    open: createIntance,
    close: closeIntance
  }
}
const database = DatabaseConnection();
database.open(); //Open database #1
database.open(); //Open database #1
database.open(); //Open database #1
database.close(); //close database
