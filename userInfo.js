$(document).ready(function(){

    var table = $("table");

    $("#username").html("<i class='far fa-user-circle'></i>"+localStorage.getItem("person"));

    let persons = JSON.parse(localStorage.getItem("persons"));

    table.append(`
    <tr>
        <th style = "width:80px"></th>
        <th>İsim</th>
        <th>Kullanıcı Adı</th>
        <th style = "width:80px">Yaş</th>
        <th>Şifre</th>
        <th>İşlemler</th>
    </tr>
    `)

    for(i in persons){
        let vals = JSON.parse(localStorage.getItem(persons[i]));
        let backgroundColorAge = "color:white;border-radius:50px;background-color:";

        if(vals[1]>=10 && vals[1]<20){backgroundColorAge+="green;"}
        else if(vals[1]>=20 && vals[1]<35){backgroundColorAge+="red;"}
        else if(vals[1]>=35){backgroundColorAge+="blue;"};
        table.append(`
        <tr>
            <td style = "width:80px" class = "icons"><i class="fas fa-user-circle"></i></td>
            <td>${vals[0]}</td>
            <td class = "usernames">${persons[i]}</td>
            <td style = "width:80px;${backgroundColorAge}" >${vals[1]}</td>
            <td>${vals[2]}</td>
            <td class = "deleteItem">Hesabı Kaldır</td>
        </tr>
        `)
    }

    var targetElement = "";

    $(".deleteItem").click(function(e){
        $("#deleteConfirmBox").fadeIn(400);
        $("#deleteConfirmBox").css("padding-top","300px");
        targetElement = e;
    })

    $("#cancelButton").click(function(){
        $("#deleteConfirmBox").fadeOut(400);
        $("#deleteConfirmBox").css("padding-top","0px");
    })

    
    $("#deleteButton").click(function(){
            
        parent = targetElement.target.parentElement;
        
        for(i=0;i<parent.children.length;i++){
        if(parent.children[i].className == "usernames"){
            localStorage.removeItem(parent.children[i].textContent);
            let persons = JSON.parse(localStorage.getItem("persons"));

            let index = persons.indexOf(parent.children[i].textContent);
            persons.splice(index,1);
            localStorage.setItem("persons",JSON.stringify(persons));

            parent.remove();
            
            
            }
        }
            $("#deleteConfirmBox").fadeOut(400);
            $("#deleteConfirmBox").css("padding-top","0px");
    })

    setInterval(function(){
        $("#deleteConfirmBox").css("height",$(document).height())
    },300)
    


});