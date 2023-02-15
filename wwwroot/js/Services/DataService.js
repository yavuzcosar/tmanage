function GroupAdd() {
    var UnitId = $("#UnitId").val();
    var CourseId = $("#CourseId").val();
    var TermId = $("#TermId").val();
    var Name = $("#GName").val();
    if (TermId && Name) {
        var url = "/Group/Add?UnitId=" + UnitId + "&CourseId=" + CourseId + "&TermId=" + TermId + "&Name=" + Name;
        $.get(url, function (data) {
            ResultToast(data);
            if (data.IsSuccess) {
                $("#GName").val("");
                DataReload();
            }
        });
    }
    else {
        toastr.warning("Şube ekleyebilmek için dönem seçin ve şube adı girin !");
    }
}
function GroupDelete(el) {
    var GroupId = $(el).attr("groupid");
    if (GroupId) {
        var url = "/Group/Delete/" + GroupId;
        $.get(url, function (data) {
            ResultToast(data);
            if (data.IsSuccess) {
                DataReload();
            }
        });
    }
}

function TeacherFindAdd() {
    var CourseId = $("#CourseId").val();
    var GroupId = $("#GroupId").val();
    var UName = $("#UName").val();
    if (GroupId && UName) {
        var url = "/Teacher/AddJson?CourseId=" + CourseId + "&GroupId=" + GroupId + "&UName=" + UName;
        $.get(url, function (data) {
            ResultToast(data);
            if (data.IsSuccess) {
                $("#UName").val("");
                DataReload();
            }
        });
    }
    else {
        toastr.warning("Eğitmen ekleyebilmek için Şube seçin ve KullanıcıAdı girin !");
    }
}
function TeacherCoordinator(el) {
    ReloadAttr("/Teacher/CoordinatorJson/", "TeacherId", el);
}
function TeacherDelete(el) {
    ReloadAttr("/Teacher/DeleteJson/", "TeacherId", el);
}

function EnrollmentFindAdd() {
    var CourseId = $("#CourseId").val();
    var GroupId = $("#GroupId").val();
    var UName = $("#UName").val();
    if (GroupId && UName) {
        var url = "/Enrollment/AddJson?CourseId=" + CourseId + "&GroupId=" + GroupId + "&UName=" + UName;
        $.get(url, function (data) {
            ResultToast(data);
            if (data.IsSuccess) {
                $("#UName").val("");
                DataReload();
            }
        });
    }
    else {
        toastr.warning("Öğrenci ekleyebilmek için Şube seçin ve KullanıcıAdı girin !");
    }
}
function EnrollmentCancel(el) {
    ReloadAttr("/Enrollment/CancelJson/", "EnrollmentId", el);
}
function EnrollmentReturn(el) {
    ReloadAttr("/Enrollment/ReturnJson/", "EnrollmentId", el);
}
function EnrollmentDelete(el) {
    ReloadAttr("/Enrollment/DeleteJson/", "EnrollmentId", el);
}

/* Announce */
function AnnounceFileDelete(el) {
    var AFileId = $(el).attr("AFileId");
    console.log($(el));
    if (AFileId) {
        $.get("/Announce/FileDelete/" + AFileId, function (data) {
            ResultToast(data);
            if (data.IsSuccess) {
                FilesReload();
            }
        });
    }
}

function ReloadAttr(url, att, el) {
    var data = $(el).attr(att);
    if (data) {
        ReloadUrl(url + data);
    }
}
function ReloadUrl(url) {
    $.get(url, function (data) {
        ResultToast(data);
        if (data.IsSuccess) {
            DataReload();
        }
    });
}

