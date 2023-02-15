function SyncVM() {
    var self = this;
    self.ShowLogs = ko.observable(false);
    self.Progress = ko.observable(0);
    self.Unit = ko.observable(null);
    self.Course = ko.observable(null);
    self.Courses = ko.observableArray([]);
    self.State = ko.observable(0);

    self.HasError = ko.computed(function () {
        return self.State() === 10;
    }, self);
    self.IsLoaded = ko.computed(function () {
        return self.State() === 2;
    }, self);
    self.IsChecked = ko.computed(function () {
        return self.State() === 4;
    }, self);
    self.IsStarted = ko.computed(function () {
        return self.State() === 5;
    }, self);
    self.StateDesc = ko.computed(function () {
        if (self.State() === 0)
            return "Bağlanıyor";
        else if (self.State() === 1)
            return "Hazırlanıyor";
        else if (self.State() === 2)
            return "Hazır";
        else if (self.State() === 3)
            return "Yükleniyor";
        else if (self.State() === 4)
            return "Yüklendi";
        else if (self.State() === 5)
            return "Eşitleniyor";
        else if (self.State() === 6)
            return "Durduruldu";
        else if (self.State() === 7)
            return "<i class'fa fa-check'></i> Eşitlendi";
        else if (self.State() === 8)
            return "Arşivlendi";
        else if (self.State() === 9)
            return "Arşivleniyor";
        else if (self.State() === 10)
            return "Hata Oluştu";
        else
            return "Belirsiz";

    }, self);
    self.StateLabel = ko.computed(function () {
        if (self.State() === 0)
            return "badge border border-dark text-dark";
        else if (self.State() === 1)
            return "badge badge-primary";
        else if (self.State() === 2)
            return "badge border-primary border text-primary";
        else if (self.State() === 3)
            return "badge badge-info";
        else if (self.State() === 4)
            return "badge border-info border text-info";
        else if (self.State() === 5)
            return "badge badge-success";
        else if (self.State() === 6)
            return "badge badge-warning";
        else if (self.State() === 7)
            return "badge border-success border text-success";
        else if (self.State() === 8)
            return "badge border-secondary border text-secondary";
        else if (self.State() === 9)
            return "badge badge-secondary";
        else if (self.State() === 10)
            return "badge badge-danger";
        else
            return "badge border-secondary border text-secondary";

    }, self);
    self.Loaded = function (sync, courses) {
        self.State(sync.State);
        self.Unit(sync.UnitName);
        self.Course(sync.CourseName);
        console.log(courses);
        self.Courses.removeAll();
        $.each(courses,
            function (index, c) {
                var course = new Course();
                course.Load(c);
                self.Courses.push(course);
            });
    };


    self.StateChanged = function (state) {
        //alert(state);
        if (state == 7) {
            toastr.success("Senkronizasyon tamamlandı, yönlendiriliyorsunuz !", "Bilgi");
            //self.CompletedDate(s.CompletedDate)
            setTimeout(function () {
                window.location = finishedUrl;
            }, 2000);
        }
        else if (state == 10) {
            toastr.error("Hata Oluştu, yönlendiriliyorsunuz !", "Uyarı");
            setTimeout(function () {
                window.location = finishedUrl;
            }, 2000);
        }
        self.State(state);
    };

    // Course

    self.CourseFind = function (courseid) {
        var self = this;
        return ko.utils.arrayFirst(self.Courses(), function (c) {
            return c.CourseId() == courseid; // <-- is this the desired seat?
        });
    }
    self.CourseUpdated = function (data) {
        var course = self.CourseFind(data.CourseId);
        if (course) {
            course.Load(data);
        }
    };
    self.CourseProgress = function (c) {
        var course = self.CourseFind(c.CourseId);
        if (course) {
            course.ProgressUpdate(c);
        }
    };


    self.Logs = ko.observableArray([]);
    self.LogMessage = function (message) {
        //var log = new Log(message);
        //self.Logs.unshift(log);
        console.log(message);
    };
    self.LogData = function (d) {
        console.log(d);
    };


    self.Check = function () {
        if (self.IsLoaded()) {
            self.LogMessage("Client.Check:" + SyncOptions.SyncId);
            connection.invoke("Check", + SyncOptions.SyncId);
        }
        else {
            toastr.warning("Veriler henüz yüklenmedi !", "Uyarı");
        }

    };
    self.Start = function () {
        if (self.IsChecked()) {
            self.LogMessage("Client.Start:" + SyncOptions.SyncId);
            connection.invoke("Start", + SyncOptions.SyncId);
        }
        else {
            toastr.warning("Veriler henüz yüklenmedi !", "Uyarı");
        }

    };
    self.Pause = function () {
        self.LogMessage("Client.Pause");
        if (VModel.IsStarted()) {
            connection.invoke("Pause", + SyncOptions.SyncId);
        }
    };

}
var VModel = new SyncVM();
ko.applyBindings(VModel);