var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
    var storage = window.localStorage;
    function initialize() {
		var groupedData = [];
        for (var i = 0; i < localStorage.length; i++){
            var item = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if(item.hasOwnProperty("text") && item.text != "" && item.datetime !=null){
                item.datetime = item.datetime.replace("T"," ");
                item.datetime = item.datetime.replace("Z"," ");
                item.datetime = item.datetime.substring(0,item.datetime.length-5);
                
                var now = new Date();
                if(now.getMonth()>=1 && now.getMonth()<10){
                    var month = "0" + (now.getMonth()+1);
                }
                var strDate = now.getFullYear() + "-" + month + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() 
                    + ":" + now.getSeconds();
                if(item.datetime > strDate){ 
                   groupedData.push(item);
                }
            }
        }
        console.log(groupedData);
        function mobileListViewDataBindInitGrouped() {
            if(groupedData.length != 0){
                $("#grouped-listview").kendoMobileListView({
                    dataSource: kendo.data.DataSource.create({
                      data: groupedData, 
                      sort: {
                        field: "datetime",
                        dir: "asc"
                      },
                    }),
                    template: "${text} - ${datetime} - mode: ${mode}",
                    fixedHeaders: true
                });
            }
        }
        
        mobileListViewDataBindInitGrouped();
    }
    	
    scope.home = {
        initialize: initialize
    };
}(app.viewmodels));