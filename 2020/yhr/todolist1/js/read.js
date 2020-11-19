window.onload=function(){
    btn_addrow = document.getElementById("btn_addrow");
    btn_addrow.onclick = function(){
        addRow();
    }
    var _request=new XMLHttpRequest();
    _request.open("get","../json/data.json");
    _request.onload=function(){
        if(_request.status==200){
            var _json=JSON.parse(_request.responseText);
            var obj=getElementById("main");
            for(var i=1;i<=Object.keys(_json.lines);i++)
            {
                var line=document.createElement("tr");
                line.innerHTML="<td>"+i+"</td><td>"+line.things[i]+"</td><td>"+line.times[i]+"</td><td><a>save</a><a>delete</a></td>";
                line.append(str);
            }
        }
    }
}