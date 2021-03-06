var processTable;
var isTableLoading = true;

function initDatatablePage(testTableId, url) {
    processTable = $('#' + testTableId).DataTable({
        "pagingType": "full_numbers",//Set the mode of the paging control
        "searching": true,//Query the query box for datatales
        "aLengthMenu": [10, 20, 50, 100],//Set one page to display 10 records
        "bAutoWidth": true,
        "bLengthChange": true,//A drop-down list of how many records are displayed on a page of a blocked table
        "ordering": false, // Prohibit sorting
        "oLanguage": {
            "sSearch": "<span>Filter records:</span> _INPUT_",
            "sLengthMenu": "<span>Show entries:</span> _MENU_",
            "oPaginate": {"sFirst": "First", "sLast": "Last", "sNext": ">", "sPrevious": "<"}
        },
        "processing": true, //Open wait effect when data is loaded
        "serverSide": true,//Open background paging
        "ajax": {
            "url": url,
            "data": function (d) {
                var level1 = $('#level1').val();
                //Add additional parameters to the server
                d.extra_search = d.search.value;
            },
            "dataSrc": responseHandler
        },
        "columns": [
            {"mDataProp": "appId",},
            {"mDataProp": "name"},
            {"mDataProp": "description",},
            {"mDataProp": "startTime",},
            {"mDataProp": "endTime",},
            {"mDataProp": "progress",},
            {"mDataProp": "state",},
            {"mDataProp": "actions",}
        ]

    });
}

//Results returned in the background
function responseHandler(res) {
    var resPageData = res.pageData;
    var pageData = []
    if (resPageData && resPageData.length > 0) {
        for (var i = 0; i < resPageData.length; i++) {
            var data1 = {
                "appId": "<div name='processAppId'></div>",
                "name": "",
                "description": "",
                "startTime": "<div id='" + resPageData[i].id + "startTime' name='processStartTime'></div>",
                "endTime": "<div id='" + resPageData[i].id + "endTime' name='processEndTime'></div>",
                "progress": "",
                "state": "<div name='processState'>No State</div>",
                "actions": ""
            }

            if (resPageData[i]) {
                var progressHtmlStr = '<div>' +
                    '<p id="' + resPageData[i].id + 'Info">progress:' +
                    (resPageData[i].progress ? (resPageData[i].progress + '%') : '0.00%') +
                    '</p>' +
                    '<progress id="' + resPageData[i].id + '" max="100" value="' +
                    (resPageData[i].progress ? (resPageData[i].progress) : '0.00')
                    + '">' +
                    '</progress>' +
                    '</div>';

                var actionsHtmlStr = '<p style="width: 100%; text-align: center" >' +
                    '<a class="btn" ' +
                    'href="javascript:void(0);" ' +
                    'onclick="javascript:openProcessGroup(\'' + resPageData[i].id + '\');" ' +
                    'style="margin-right: 2px;">' +
                    '<i class="icon-share-alt icon-white"></i>' +
                    '</a>' +
                    '<a class="btn" ' +
                    'href="javascript:void(0);" ' +
                    'onclick="javascript:selectRunMode(\'' + resPageData[i].id + '\',\'' + resPageData[i].parentProcessId + '\',\'null\');" ' +
                    'style="margin-right: 2px;">' +
                    '<i class="icon-play icon-white"></i>' +
                    '</a>' +
                    '<a class="btn" ' +
                    'href="javascript:void(0);" ' +
                    'onclick="javascript:listStopProcessGroup(\'' + resPageData[i].id + '\');" ' +
                    'style="margin-right: 2px;">' +
                    '<i class="icon-stop icon-white"></i>' +
                    '</a>' +
                    '<a class="btn" ' +
                    'href="javascript:void(0);" ' +
                    'onclick="javascript:delProcessGroup(\'' + resPageData[i].id + '\');" ' +
                    'style="margin-right: 2px;">' +
                    '<i class="icon-trash icon-white"></i>' +
                    '</a>' +
                    '</p>';
                if (resPageData[i].appId) {
                    data1.appId = '<div name="processAppId" style="word-wrap: break-word;">' + resPageData[i].appId + '</div>';
                }
                if (resPageData[i].name) {
                    data1.name = resPageData[i].name;
                }
                if (resPageData[i].startTime) {
                    data1.startTime = '<div id="' + resPageData[i].id + 'startTime" name="processStartTime" style="word-wrap: break-word;">' +
                        resPageData[i].startTime +
                        '</div>';
                }
                if (resPageData[i].endTime) {
                    data1.endTime = '<div id="' + resPageData[i].id + 'endTime" name="processEndTime" style="word-wrap: break-word;">' +
                        resPageData[i].endTime + '</div>';
                }
                if (resPageData[i].state) {
                    data1.state = '<div id="' + resPageData[i].id + 'state" name="processState" style="word-wrap: break-word;">' +
                        resPageData[i].state.text + '</div>';
                }
                if (resPageData[i].description) {
                    var descriptionHtmlStr = '<div ' +
                        'style="width: 85px;overflow: hidden;text-overflow:ellipsis;white-space:nowrap;" ' +
                        'data-toggle="tooltip" ' +
                        'data-placement="top" ' +
                        'title="' + resPageData[i].description + '">' +
                        resPageData[i].description +
                        '</div>';
                    data1.description = descriptionHtmlStr;
                }
                if (progressHtmlStr) {
                    data1.progress = progressHtmlStr;
                }
                if (actionsHtmlStr) {
                    data1.actions = actionsHtmlStr;
                }
            }
            pageData.push(data1);
        }
    }
    return pageData;
}

function processGroupListMonitoring() {
    console.log("--------");
    var arrayObj = new Array();
    var processAppIds = $("div[name='processAppId']");
    var processStartTimes = $("div[name='processStartTime']");
    var processStates = $("div[name='processState']");
    if (processAppIds && processStartTimes && processStates) {
        if (processAppIds.length == processStartTimes.length && processStartTimes.length === processStates.length) {
            for (var i = 0; i < processAppIds.length; i++) {
                if (processAppIds[i].innerHTML != "") {
                    if (processStates[i].innerHTML != "No state" && processStates[i].innerHTML == "STARTED") {
                        arrayObj.push(processAppIds[i].innerHTML);
                    }
                }
                if (processStartTimes[i].innerHTML == '') {
                    arrayObj.push(processAppIds[i].innerHTML);
                }
            }
            if (processAppIds.length > 0) {
                isTableLoading = false;
            }
        }
    } else {
        isTableLoading = true;
    }
    if (isTableLoading) {
        return;
    } else {
        if (arrayObj.length == 0) {
            window.clearInterval(timer);
            return;
        }
        $.ajax({
            cache: true,
            type: "get",
            url: "/piflow-web/processGroup/getAppInfoList",
            data: {arrayObj: arrayObj},
            async: true,
            traditional: true,
            error: function (request) {
                console.log("error");
                return;
            },
            success: function (data) {
                if (null != data) {
                    var dataMap = JSON.parse(data);
                    if (200 === dataMap.code) {
                        if (arrayObj && arrayObj.length > 0) {
                            for (var i in arrayObj) {
                                var strAppID = arrayObj[i];
                                if (strAppID && '' !== strAppID) {
                                    var processGroup = dataMap[strAppID];
                                    if (processGroup && '' !== processGroup) {
                                        if (processGroup.id && '' != processGroup.id) {
                                            document.getElementById("" + processGroup.id + "").value = processGroup.progress;
                                            document.getElementById("" + processGroup.id + "Info").innerHTML = "progress:" + processGroup.progress + "%";
                                            if (processGroup.state && "" !== processGroup.state) {
                                                document.getElementById("" + processGroup.id + "state").innerHTML = processGroup.state.text;
                                            }
                                            if (processGroup.startTime && "" !== processGroup.startTime) {
                                                document.getElementById("" + processGroup.id + "startTime").innerHTML = processGroup.startTime;
                                            }
                                            if (processGroup.endTime && "" !== processGroup.endTime) {
                                                document.getElementById("" + processGroup.id + "endTime").innerHTML = processGroup.endTime;
                                            }
                                        }
                                    }

                                }
                            }
                        }
                    }
                }
            }
        });
    }
}

//Select run mode
function selectRunMode(id, processId, parentProcessId, runMode) {
    var runModeContent = '<div style="width: 100%;">'
        + '<div style="width: 210px;height: 50px;line-height: 50px;overflow: hidden;text-align: center;">'
        + '<button type="button" class="btn btn-default" onclick="listRunProcessGroup(\'' + id + '\',null)">Run</button>&nbsp;'
        // + '<button type="button" class="btn btn-default" onclick="listRunProcessGroup(\'' + id + '\',\'DEBUG\')">Debug</button>&nbsp;'
        + '<button type="button" class="btn btn-default" onclick="cancelListRunProcessGroup()">Cancel</button>'
        + '</div>'
        + '</div>';
    layer.open({
        type: 1,
        title: '<span style="color: #269252;">Select Run Mode</span>',
        shadeClose: true,
        closeBtn: 1,
        shift: 7,
        //area: ['600px', '200px'], //Width height
        skin: 'layui-layer-rim', //Add borders
        content: runModeContent
    });
}

function cancelListRunProcessGroup() {
    layer.closeAll();
    $('#fullScreen').hide();
    return;
}

//run
function listRunProcessGroup(id, runMode) {
    $('#fullScreen').show();
    var data = {
        id: id,
    }
    if (runMode) {
        data.runMode = runMode;
    }
    $.ajax({
        cache: true,//Keep cached data
        type: "POST",//Request type post
        url: "/piflow-web/processGroup/runProcessGroup",//This is the name of the file where I receive data in the background.
        //data:$('#loginForm').serialize(),//Serialize the form
        data: data,
        async: true,//Setting it to true indicates that other code can still be executed after the request has started. If this option is set to false, it means that all requests are no longer asynchronous, which also causes the browser to be locked.
        error: function (request) {//Operation after request failure
            alert("Request Failed");
            $('#fullScreen').hide();
            return;
        },
        success: function (data) {//Operation after request successful
            //console.log("success");
            var dataMap = JSON.parse(data);
            if (200 === dataMap.code) {
                //alert(dataMap.errorMsg);
                window.location.reload();
                var windowOpen = window.open("/piflow-web/processGroup/getProcessGroupById?processGroupId=" + dataMap.processGroupId);
                if (windowOpen == null || typeof(windowOpen)=='undefined'){
                    alert('The window cannot be opened. Please check your browser settings.')
                }
            } else {
                alert("Startup Failed");
                $('#fullScreen').hide();
            }

        }
    });
}

//stop
function listStopProcessGroup(processGroupID) {
    $('#fullScreen').show();
    $.ajax({
        cache: true,//Keep cached data
        type: "POST",//Request type post
        url: "/piflow-web/processGroup/stopProcessGroup",//This is the name of the file where I receive data in the background.
        //data:$('#loginForm').serialize(),//Serialize the form
        data: {
            processGroupId: processGroupID
        },
        async: true,//Setting it to true indicates that other code can still be executed after the request has started. If this option is set to false, it means that all requests are no longer asynchronous, which also causes the browser to be locked.
        error: function (request) {//Operation after request failure
            alert("Request Failed");
            $('#fullScreen').hide();
            return;
        },
        success: function (data) {//Operation after request successful
            //console.log("success");
            var dataMap = JSON.parse(data);
            if (200 === dataMap.code) {
                alert(dataMap.errorMsg);
                window.location.reload();
            } else {
                alert("Stop Failed:" + dataMap.errorMsg);
            }
            $('#fullScreen').hide();

        }
    });
}

//remove
function delProcessGroup(processGroupID) {
    $('#fullScreen').show();
    $.ajax({
        cache: true,//Keep cached data
        type: "get",//get
        url: "/piflow-web/processGroup/delProcessGroup",//This is the name of the file where I receive data in the background.
        //data:$('#loginForm').serialize(),//Serialize the form
        data: {
            processGroupId: processGroupID
        },
        async: true,//Setting it to true indicates that other code can still be executed after the request has started. If this option is set to false, it means that all requests are no longer asynchronous, which also causes the browser to be locked.
        error: function (request) {//Operation after request failure
            alert("Request Failed");
            $('#fullScreen').hide();
            return;
        },
        success: function (data) {//Operation after request successful
            var dataMap = JSON.parse(data);
            if (200 === dataMap.code) {
                alert(dataMap.errorMsg);
                window.location.reload();
            } else {
                alert("Delete Failed" + dataMap.errorMsg);
            }
            $('#fullScreen').hide();
        }
    });
}

function search1() {
    processTable.ajax.reload();
}

function openProcessGroup(processGroupId) {
    var windowOpen = window.open('/piflow-web/processGroup/getProcessGroupById?processGroupId=' + processGroupId);
    if (windowOpen == null || typeof(windowOpen)=='undefined'){
        alert('The window cannot be opened. Please check your browser settings.')
    }
}
