/// <reference path="../build/ckeditor.js" />
const REditors = new Map();
function richEditor(id, h, browse, upload) {
    return ClassicEditor.create(document.querySelector("#" + id + "_Editor"),
        {
            config: {
                ui: {
                    width: '100%',
                    height: h,
                }
            },
            image: {
                toolbar: ['imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight'],
                styles: [
                    'full',
                    'alignLeft',
                    'alignRight'
                ]
            },
            autosave:
            {
                save(editor) {
                    richDataUpdate(id, editor.getData());
                }
            },
            ImageUploader:
            {
                uploadUrl: upload,
                headers: { 'x-header': 'ImageUploaderHeader' }
            },
            ImageBrowser: {
                browserUrl: browse
            }
        }
    )
        .then(editor => {
            REditors.set(id, editor);
        })
        .catch(err => {
            console.error(err.stack);
        });
}
function richDataGet(id) {
    REditors.get(id).getData();
}
function richDataSet(id, value) {
    REditors.get(id).setData(value);
}
function richDataUpdate(id, value) {
    $("#" + id).val(value);
    console.log(id);
    console.log(val);
}
function richExecute(id, command, val) {
    REditors.get(id).execute(command, val);
}
function richImageSelected(id, imageUrl) {
    richExecute(id, 'insertImage', imageUrl);
}
