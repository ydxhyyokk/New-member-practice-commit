$(function(){
    registerClick();
});
function registerClick(){
    $("#main tbody tr td a").off("click").on("click", function(){
        var text = $(this).text();
        switch(text){
            case "change":
                updateRow($(this));
                break;
            case "save":
                saveRow($(this));
                break;
            case "delete":
                deleteRow($(this));
                break;
        }
    });
}
function addRow(){
	var rowindex = $("#main tbody tr").length+1;
    var str = document.createElement("tr");
    str.innerHTML="<td>"+rowindex+"</td><td><input type='text'></td><td><input type='text'></td><td><a>save</a><a>delete</a></td>";
	$("#main tbody").append(str);
	registerClick();
	saveAllRow();
}
function updateRow(t){
    $(t).text("save");
    var tr = $(t).parent().parent();
    var tds = $(tr).children();
    for (var i = 0; i < tds.length; i++) {
        if(i>0 && i<tds.length-1){
            var td = tds[i];
            var text = $(td).text();
            $(td).html("<input type='text' value='"+text+"'>");
        }
    }
}
function saveRow(t){
    $(t).text("change");
    var tr = $(t).parent().parent();
    var tds = $(tr).children();
    for (var i = 0; i < tds.length; i++) {
        if(i>0 && i<tds.length-1){
            var td = tds[i];
            var text = $(td).children("input").val();
            $(td).html(text);
        }
    }
}
function deleteRow(t){
    if(confirm("Are you sure you want to delete it?")){
        var tr = $(t).parent().parent();
        $(tr).remove();
        resetSerialNum();
    }
}
function saveAllRow(){
    var trs = $("#main tbody tr");
    for (var i = 0; i < trs.length; i++) {
        if($(trs[i]).children("td:nth-child(4)").children("a:nth-child(1)").text() == "save"){
            $(trs[i]).children("td:nth-child(4)").children("a:nth-child(1)").click();
            
        }
    }
}