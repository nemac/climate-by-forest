var cwg = undefined;

$(document).ready(function () {

    function populate_variables(frequency) {
        var variables = climate_widget.variables(frequency);
        $("select#variable").empty();
        $(variables.map(function (v) {
            return ('<option value="' + v.id + '"' + '>' + v.title + '</option>');
        }).join("")).appendTo($("select#variable"));
    }

    function initGraph() {
        console.log()
        cwg = climate_widget.graph({
            'div': "div#widget",
            'dataprefix': 'http://climate-widget-data.nemac.org/data',
            'font': 'Roboto',
            'frequency': $('#frequency').val(),
            'timeperiod': $('#timeperiod').val(),
            'bbox': $('#bbox').val(),
            'variable': $('#variable').val(),
            'scenario': $('#scenario').val(),
            'xrangefunc': xrangeset,
            'pmedian': true,
            'hmedian': true
        });
        $('#bbox').off().change(function () {
            cwg.update({
                bbox: $('#bbox').val()
            });
        });
        $(window).resize(function () {
            cwg.resize();
        });
    }

    $('#bbox').change(initGraph);


    function update_frequency_ui() {
        var freq = $('#frequency').val();
        if (freq === "annual") {
            $('#timeperiod-wrapper').hide();
            $('#slider-range').show();
            $('#x-axis-pan-note').hide();
            $('#download_hist_mod_data_li').show();
        }
        if (freq === "monthly") {
            $('#timeperiod-wrapper').show();
            $('#slider-range').hide();
            $('#x-axis-pan-note').show();
            $('#download_hist_mod_data_li').hide();
        }
        if (freq === "seasonal") {
            $('#timeperiod-wrapper').show();
            $('#slider-range').hide();
            $('#x-axis-pan-note').show();
            $('#download_hist_mod_data_li').hide();
        }
        populate_variables(freq);
    }

    update_frequency_ui();


    $('#frequency').change(function () {

        update_frequency_ui();
        if (cwg) {
            cwg.update({
                frequency: $('#frequency').val(),
                variable: $('#variable').val()
            });
        }
    });

    $('#timeperiod').change(function () {
        if (cwg) {
            cwg.update({
                timeperiod: $('#timeperiod').val()
            });
        }
    });

    $('#variable').change(function () {
        if (cwg) {
            cwg.update({
                variable: $('#variable').val()
            });
        }
    });
    $('#rcp85, #rcp45').change(function () {
        if (cwg) {
            var scenario;
            if ($('#rcp85').prop('checked')) {
                if ($('#rcp45').prop('checked')) {
                    scenario = 'both';
                } else {
                    scenario = 'rcp85';
                }
            } else if ($('#rcp45').prop('checked')) {
                scenario = 'rcp45';
            }
            else {
                scenario = '';
            }
            cwg.update({
                scenario: scenario
            });
        }
    });
    $('#download-button').click(function () {
        if (cwg) {
            $('#download-panel').removeClass("hidden");
        }
    });

    $('#download-dismiss-button').click(function () {
        $('#download-panel').addClass("hidden");
    });

    // download hooks
    $('#download-image-link').click(function () {
        if (cwg) {
            cwg.download_image(this)
        }
    });
    $('#download_hist_obs_data').click(function () {
        if (cwg) {
            cwg.download_hist_obs_data(this)
        }
    });
    $('#download_hist_mod_data').click(function () {
        if (cwg) {
            cwg.download_hist_mod_data(this)
        }
    });
    $('#download_proj_mod_data').click(function () {
        if (cwg) {
            cwg.download_proj_mod_data(this)
        }
    });


    $("#slider-range").slider({
        range: true,
        min: 1950,
        max: 2099,
        values: [1950, 2099],
        slide: function (event, ui) {
            // return the return value returned by setXRange, to keep
            // the slider thumb(s) from moving into a disallowed range
            return cwg.setXRange(ui.values[0], ui.values[1]);
        }
    });

    // This function will be called whenever the user changes the x-scale in the graph.
    function xrangeset(min, max) {
        // Force the slider thumbs to adjust to the appropriate place
        $("#slider-range").slider("option", "values", [min, max]);
    }

    WebFont.load({
        google: {
            families: ['Pacifico', 'Roboto']
        }
    });


});

//--------------------------------------------------------------------------
var newcounties = []
