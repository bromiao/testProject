/************使用return退出多重循环************/

var print = function( i ){
  console.log( i );
};
var func = function(){
  for ( var i = 0; i < 10; i++ ){
    for ( var j = 0; j < 10; j++ ){
      if ( i * j >30 ){
        return print( i );
      }
    }
  }
};
func();
