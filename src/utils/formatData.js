//把数据库中的数据格式化为树状结构
export default function formatTreeData(data) {
  var tree = [];
  var pos = [];

  GetData("#", data);
  GetData(undefined, data);
  return tree;

  function GetData(id, arry) {
    var childArry = GetParentArry(id, arry);

    if (childArry.length > 0) {
      for (var i in childArry) {
        if (childArry[i].super_unid == undefined || childArry[i].super_unid == "#") {
          tree.push({
            unid: childArry[i].unid,
            label: childArry[i].name,
            unit_unid: childArry[i].unit_unid,
            backgroudImage: childArry[i].graph_url || require('../assets/img/bg.png'),
            containerHight: 400, //底图高度
            containerWidth: 300, //底图宽度
            children: []
          });
          pos[childArry[i].unid] = [tree.length - 1];
        } else {
          var posArr = pos[childArry[i].super_unid];
          if (posArr != undefined) {
            var obj = tree[posArr[0]];
            for (var j = 1; j < posArr.length; j++) {
              obj = obj.children[posArr[j]];
            }

            obj.children.push({
              unid: childArry[i].unid,
              label: childArry[i].name,
              unit_unid: childArry[i].unit_unid,
              backgroudImage: childArry[i].graph_url || require('../assets/img/svg.svg'),
              containerHight: 400, //底图高度
              containerWidth: 300, //底图宽度
              children: []
            });
            pos[childArry[i].unid] = posArr.concat([obj.children.length - 1]);

          }
        }
        GetData(childArry[i].unid, arry);
      }
    }
  }



  function GetParentArry(id, arry) {
    var newArry = new Array();
    for (var i in arry) {
      if (arry[i].super_unid == id) {
        newArry.push(arry[i]);
      }
    }
    return newArry;
  }



}
