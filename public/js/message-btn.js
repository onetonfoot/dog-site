$("#message-btn").click(function(){
    let classes = $("#message-btn").attr("class")
    let myRegexp = /ownerID-([^\s]*)/g;
    let ownerID = myRegexp.exec(classes)[1];

    $.ajax({
        type:"POST",
        url:"/chat/inbox",
        contentType: "application/json",
        data: JSON.stringify({ ownerID: ownerID})
    }).done(()=>{

        window.location.replace("http://localhost:8080/chat/inbox")

    })
})