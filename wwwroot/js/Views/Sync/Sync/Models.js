var Log = function (message) {
    var self = this;
    self.Message = message;
}
var Course = function () {
    var self = this;
    self.SyncId = ko.observable(0);
    self.CourseId = ko.observable(0);
    self.Status = ko.observable(0);
    self.StatusText = ko.computed(function () {
        if (self.Status() === 1)
            return "Hazır";
        else if (self.Status() === 2)
            return "Yükleniyor";
        else if (self.Status() === 3)
            return "Kontrol Ediliyor";
        else if (self.Status() === 4)
            return "Yüklendi";
        else if (self.Status() === 5)
            return "Eşitleniyor";
        else if (self.Status() === 6)
            return "Kaydediliyor";
        else if (self.Status() === 7)
            return "<i class'fa fa-check'></i> Eşitlendi";

        else if (self.Status() === 9)
            return "Hata Oluştu";
        else
            return "-";

    }, self);
    self.StatusLabel = ko.computed(function () {
        if (self.Status() === 1)
            return "badge border border-primary text-primary";
        else if (self.Status() === 2)
            return "badge badge-info";
        else if (self.Status() === 3)
            return "badge badge-info";
        else if (self.Status() === 4)
            return "badge border border-info text-info";
        else if (self.Status() === 5)
            return "badge badge-success";
        else if (self.Status() === 6)
            return "badge badge-warning";
        else if (self.Status() === 7)
            return "badge border border-success text-success";
        else if (self.Status() === 9)
            return "badge badge-danger";
        else
            return "badge border border-secondary text-secondary";

    }, self);

    self.Step = ko.observable("-");

    self.Progress = ko.observable(0);

    self.GroupsCount = ko.observable(0);
    self.LessonsCount = ko.observable(0);
    self.UnMappedCount = ko.observable(0);

    self.EnrollmentsCount = ko.observable(0);
    self.StudentsCount = ko.observable(0);

    self.StudentAdded = ko.observable(0);
    self.StudentAddedError = ko.observable(0);
    self.StudentCanceled = ko.observable(0);
    self.StudentCanceledError = ko.observable(0);
    self.StudentChanged = ko.observable(0);
    self.StudentChangedError = ko.observable(0);
    self.StudentReturned = ko.observable(0);
    self.StudentReturnedError = ko.observable(0);
    self.UnMappedStudentCount = ko.observable(0);
    self.StudentDublicated = ko.observable(0);

    self.Loaded = ko.observable(false);
    self.LoadedDate = ko.observable(null);
    self.Started = ko.observable(false);
    self.StartedDate = ko.observable(null);
    self.Checked = ko.observable(false);
    self.CheckedDate = ko.observable(null);
    self.Completed = ko.observable(false);
    self.CompletedDate = ko.observable(null);

    self.Load = function (c) {

        self.UnitId = c.UnitId;
        self.UnitName = c.UnitName;
        self.CourseName = c.CourseName;
        self.Step(c.Step);
        //console.log(c.CourseName + "--->" + c.Step);
        self.Status(c.Status);

        self.GroupsCount(c.GroupsCount);
        self.LessonsCount(c.LessonsCount);
        self.UnMappedCount(c.UnMappedCount);

        self.EnrollmentsCount(c.EnrollmentsCount);
        self.StudentsCount(c.StudentsCount);

        self.StudentAdded(c.StudentAdded - c.StudentAddedError);
        self.StudentAddedError(c.StudentAddedError);

        self.StudentCanceled(c.StudentCanceled - c.StudentCanceledError);
        self.StudentCanceledError(c.StudentCanceledError);

        self.StudentChanged(c.StudentChanged - c.StudentChangedError);
        self.StudentChangedError(c.StudentChangedError);

        self.StudentReturned(c.StudentReturned - c.StudentReturnedError);
        self.StudentReturnedError(c.StudentReturnedError);
        self.UnMappedStudentCount(c.UnMappedStudentCount);
        self.StudentDublicated(c.StudentDublicated);

        self.Loaded(c.Loaded);
        self.LoadedDate(c.LoadedDate);
        self.Started(c.Started);
        self.StartedDate(c.StartedDate);
        self.Checked(c.Checked);
        self.CheckedDate(c.CheckedDate);
        self.Completed(c.Completed);
        self.CompletedDate(c.CompletedDate);

        self.SyncId(c.SyncId);
        self.CourseId(c.CourseId);
    }

    self.ProgressUpdate = function (c) {
        self.Progress(c.Progress);
        //console.log(id + ":" + p);
    }

    self.StepVisible = function (step) {
        return self.Step() == step;
    };

    self.CourseUrl = ko.computed(function () {
        return "/Sync/Course?SyncId=" + self.SyncId() + "&CourseId=" + self.CourseId();
    }, self);
}
var Lesson = function (id, name, state, sadded, schanged, sdeleted) {
    var self = this;
    self.LessonId = ko.observable(id);
    self.LessonName = ko.observable(name);
    self.State = state;
    self.SAdded = ko.observable(sadded);
    self.SChanged = ko.observable(schanged);
    self.SDeleted = ko.observable(sdeleted);
}