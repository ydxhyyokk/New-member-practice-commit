
function appendTodo()
{
    document.getElementById('content').focus();
    var text = document.getElementById("content").value;
    //如果输入为空弹出提示
    if (text == "")
    {
        alert("Please write something!");
    }
    else
    {
        document.getElementById("content").value = "";
        //列表里新建li
        var list = document.getElementById("list");
        var li = document.createElement("li");
        list.appendChild(li);
        //li里加入label，为输入框里的内容
        var label = document.createElement("label");
        label.appendChild(document.createTextNode(text));
        li.appendChild(label);
        //li里加入button，用于delete
        var button = document.createElement("button");
        button.appendChild(document.createTextNode("Delete"));
        button.className = "delbtn";
        li.appendChild(button);
        //点击delete button删除当前li
        button.onclick = function()
        {
            list.removeChild(li);
            document.getElementById('content').focus();
        }
    }   
}