TActions();
function TActions() {
    myapp_config.root_.on('click touchend', '[t-action]', function (e) {
        var actiontype = $(this).attr('t-action');
        switch (true) {
            case (actiontype === 'widget-toogle'):
                WidgetToogle(this);
                break;
            case (actiontype === 'dashboard-reset'):
                DashboardReset();
                break;
        }
        /* stop default link action */
        e.stopPropagation();
        e.preventDefault();
    });
}

var DashId = 0;
$(document).ready(function () {
    DashId = $(".Dashboard").attr("t-dash");
    DashboardLoad();
});
function DashboardLoad() {
    console.log("Dashboard.Load", DashId);
    $(".sortable").sortable({
        connectWith: 'div',
        stop: function (event, ui) {
            DashboardSave();
        }
    });
}
function DashboardSave() {
    var data = [];
    $(".sortable").each(function (index) {
        var column = $(this).attr("t-column");
        var Widgets = $(this).sortable('toArray', {
            attribute: 't-widget'
        });
        data.push({ "DashboardId": DashId, "ColumnId": column, "Widgets": Widgets });
        console.log(column, Widgets);
    });
    //console.log(data);
    $.post("/Home/DashboardSave?DashboardId=" + DashId, { columns: data }).done(function (result) {
        if (!result.IsSuccess) {
            ResultToast(result);
        }
    });
}
function DashboardReset() {
    console.log("Dashboard.Reset", DashId);
    $.post("/Home/DashboardReset?DashboardId=" + DashId).done(function (result) {
        if (!result.IsSuccess) {
            ResultToast(result);
        }
        else {
            location.reload();
        }
    });
}
function WidgetAdd(WidgetId, isnew) {
    $.post("/Home/WidgetAdd?DashboardId=" + DashId + "&WidgetId=" + WidgetId).done(function (result) {
        if (!result.IsSuccess) {
            ResultToast(result);
        }
        if (isnew) {
            location.reload();
        }
        else {
            $("#widget_" + WidgetId).show();
        }
    });
}
function WidgetRemove(WidgetId) {
    $.post("/Home/WidgetRemove?DashboardId=" + DashId + "&WidgetId=" + WidgetId).done(function (result) {
        if (!result.IsSuccess) {
            ResultToast(result);
        }
        $("#widget_" + WidgetId).hide();
    });
}
function WidgetToogle(caller) {
    var isnew = false;
    var enable = true;
    var link = $(caller);
    if (link.hasClass("active")) {
        enable = false;
        link.removeClass("active");
    }
    else {
        link.addClass("active");
    }
    var WidgetId = link.attr('t-target');
    var widget = $("#widget_" + WidgetId);
    if (widget.length > 0) {

    }
    else {
        isnew = true;
    }
    if (enable) {
        WidgetAdd(WidgetId, isnew);
    }
    else {
        WidgetRemove(WidgetId);
    }

}