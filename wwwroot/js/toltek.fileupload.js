$(document).ready(function () {
    $(".FileUpload").each(function (i, el) {
        UploderBind($(el));
    });

});
function UploderBind(el) {
    try {
        var toast = null;
        var model = {
            SourceType: el.attr("to-sourceType"),
            SourceId: el.attr("to-sourceId"),
            SourceKey: el.attr("to-sourceKey"),
            SourceTitle: el.attr("to-sourceTitle"),
            MaxFileSize: el.attr("to-maxFileSize"),
            FileTypes: el.attr("to-filesTypes"),
            FilesPath: el.attr("to-filesPath"),
            UploadUrl: el.attr("to-endpoint"),
            ProgressId: el.attr("to-progressId"),
            ButtonId: el.attr("to-buttonId"),
            OnAdd: el.attr("to-onAdd"),
            OnDone: el.attr("to-onDone"),
            PrintAuto: el.attr("to-printAuto")
        };
        if (!model.MaxFileSize) {
            model.MaxFileSize = 1;
        }

        //console.log(model);
        el.fileupload(
            {
                //url: model.UploadUrl,
                dataType: "json",
                formData: model,
                maxFileSize: model.SizeLimit,
                add: function (e, data) {
                    var goUpload = true;
                    var uploadFile = data.files[0];

                    if (model.FileTypes) {
                        var regex = new RegExp("^\.*\\.(?!" + model.FileTypes + ")[^.]+$", "i");
                        //console.log(regex);
                        //if (!regex.test(uploadFile.name)) {
                        //    toastr.warning('Dosya türü uygun değil !');
                        //    goUpload = false;
                        //} 
                    }

                    if (model.MaxFileSize) {
                        if (uploadFile.size > model.MaxFileSize * 1000000) {
                            toastr.warning('Seçilen dosya çok büyük ' + model.MaxFileSize + " MB");
                            goUpload = false;
                        }
                    }

                    if (model.OnAdd) {
                        eval(model.OnAdd)(uploadFile);
                    }
                    if (goUpload == true) {


                        if (model.ButtonId) {
                            $("#" + model.ButtonId).attr("disabled", true);
                        }
                        if (model.ProgressId) {
                            $("#" + model.ProgressId + " .progress-bar").css('width', '0');
                            $("#" + model.ProgressId).show();
                        }
                        data.context = $('<p/>').text('Uploading...').appendTo(document.body);
                        data.submit();
                    }

                },
                done: function (e, data) {
                    var response = data.response();
                    if (response.textStatus == "success") {
                        var result = response.result;
                        if (result) {
                            if (model.OnDone) {
                                eval(model.OnDone)(result);
                            }
                        }
                        else {
                            toastr.error("Dosya sunucusuna erişilemedi.");
                        }
                    }
                    if (model.ButtonId) {
                        $("#" + model.ButtonId).attr("disabled", false);
                    }
                    if (model.ProgressId) {
                        $("#" + model.ProgressId).hide();
                    }
                }
            });
        //console.log("%c✔ FileUploader loaded", "color: #148f32");
        if (model.ProgressId) {
            //console.log("%c✔ FileUploader.Progress:" + model.ProgressId, "color: #148f32");
            $(el).bind('fileuploadprogress', function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                $("#" + model.ProgressId + " .progress-bar").css(
                    'width',
                    progress + '%'
                );
            });
        }


    }
    catch (ex) {
        console.log("%c× FileUploader exception", "color: #d9534f");
    }

}
