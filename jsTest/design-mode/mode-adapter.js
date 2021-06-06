/*地图渲染适配*/
const googleMap = {
  show: function () {
    console.log('开始渲染谷歌地图...');
  }
}

const baiduMap = {
  render: function () {
    console.log('开始渲染百度地图...');
  }
}

const renderMap = function (map) {
  if (map.show instanceof Function) {
    map.show();
  }
}

/*适配百度地图渲染*/
const baiduMapAdapter = {
  show: function () {
    return baiduMap.render();
  }
}

renderMap(googleMap);
renderMap(baiduMapAdapter);



/*级联城市数据*/
const getGuangdongCity = function () {
  let guangdongCity = [
    {
      name: 'shenzhen',
      id: 11
    },
    {
      name: 'guangzhou',
      id: 12
    }
  ]

  return guangdongCity;
}

const render = function (fn) {
  console.log('广东省地区级联数据展示。。。');
  console.log(fn())
}

const addressAdapter = function (oldAddressfn) {
  const address = {},
        oldAddress = oldAddressfn();

  for (let i = 0, c; c = oldAddress[i++]; ) {
    address[c.name] = c.id;
  }

  return function () {
    return address;
  }
}

render(addressAdapter(getGuangdongCity));
