const connection = new signalR.HubConnectionBuilder()
    .withUrl(hubUrl)
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Debug)
    .build();

connection.on('Loaded', function (sync, courses) {
    VModel.Loaded(sync, courses);
});

connection.on("StateChanged", function (state) {
    VModel.StateChanged(state);
});
connection.on("CourseUpdated", function (data) {
    VModel.CourseUpdated(data);
    //LogData(data);
});
connection.on("CourseProgress", function (data) {
    VModel.CourseProgress(data);
});
connection.on("OnError", function (data) {
    toastr.error(data, "Hata");
});

connection.start().then(function () {
    //console.log("Sync.Start --> Options :");
    //console.log(SyncOptions);
    connection.invoke("Load", SyncOptions);
});
function LogData(data) {
    console.log(data);
};
function Log(message) {
    console.log(message);
    //VModel.LogMessage(message);
};