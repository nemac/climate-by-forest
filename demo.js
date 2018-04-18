var cwg = undefined;

$(document).ready(function () {

    function populate_variables(frequency) {
        var variables = climate_widget.variables(frequency);
        $("select#variable").empty();
        $(variables.map(function (v) {
            return ('<option value="' + v.id + '"' + '>' + v.title + '</option>');
        }).join("")).appendTo($("select#variable"));
    }


    $('#province').change(initGraphEcoregion);



        function initGraphEcoregion() {
            console.log(ecoregion_list[$('#province').val()][0].bbox);
            cwg = climate_widget.graph({
                'div': "div#widget",
                'dataprefix': 'http://climate-widget-data.nemac.org/data',
                'font': 'Roboto',
                'frequency': $('#frequency').val(),
                'timeperiod': $('#timeperiod').val(),
                'bbox': ecoregion_list[$('#province').val()][0].bbox,
                'variable': $('#variable').val(),
                'scenario': $('#scenario').val(),
                'xrangefunc': xrangeset,
                'pmedian': true,
                'hmedian': true
            });
            $('#ecoregion').off().change(function () {
                cwg.update({
                    bbox: $('#ecoregion').val()
                });
            });
            $(window).resize(function () {
                cwg.resize();
            });
        }


        $('#ecoregion').change(initGraphEcoregion);


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

        var ecoregion_list = {
            "Pacific Lowland Mixed Forest Province": [
                {
                    "ecoregion": "Pacific Lowland Mixed Forest Province",
                    "bbox": "-123.68183310475524,43.60249725292919,-121.62733731457311,48.99933526065233"
                }
            ],
            "Cascade Mixed Forest - Coniferous Forest - Alpine Meadow Province": [
                {
                    "ecoregion": "Cascade Mixed Forest - Coniferous Forest - Alpine Meadow Province",
                    "bbox": "-124.76263052255362,41.99831039917284,-119.44893574022225,48.998623418173445"
                }
            ],
            "Northern Rocky Mountain Forest-Steppe - Coniferous Forest - Alpine Meadow Province": [
                {
                    "ecoregion": "Northern Rocky Mountain Forest-Steppe - Coniferous Forest - Alpine Meadow Province",
                    "bbox": "-119.4975671969548,46.14796406875693,-112.3686983803185,48.9999845702427"
                }
            ],
            "Great Plains Steppe Province": [
                {
                    "ecoregion": "Great Plains Steppe Province",
                    "bbox": "-103.69420645964266,34.07128348629399,-96.92277654805751,49.00002069844287"
                }
            ],
            "Prairie Parkland (Temperate) Province": [
                {
                    "ecoregion": "Prairie Parkland (Temperate) Province",
                    "bbox": "-98.05359604069938,35.97255688586777,-86.26997641081815,49.00272211269546"
                }
            ],
            "Laurentian Mixed Forest Province": [
                {
                    "ecoregion": "Laurentian Mixed Forest Province",
                    "bbox": "-95.92044595612903,43.02549465998646,-81.52185661496353,49.38640013821757"
                }
            ],
            "Middle Rocky Mountain Steppe - Coniferous Forest - Alpine Meadow Province": [
                {
                    "ecoregion": "Middle Rocky Mountain Steppe - Coniferous Forest - Alpine Meadow Province",
                    "bbox": "-120.96008329489798,43.26209062143723,-108.8577134403513,47.34943803456907"
                }
            ],
            "Northeastern Mixed Forest Province": [
                {
                    "ecoregion": "Northeastern Mixed Forest Province",
                    "bbox": "-79.99375083144086,40.930808691439886,-66.95722548032337,47.35978863806664"
                }
            ],
            "Black Hills Coniferous Forest Province": [
                {
                    "ecoregion": "Black Hills Coniferous Forest Province",
                    "bbox": "-104.86934226081993,43.23656300729949,-103.21739425073154,44.924103697322074"
                }
            ],
            "Adirondack-New England Mixed Forest--Coniferous Forest--Alpine Meadow Province": [
                {
                    "ecoregion": "Adirondack-New England Mixed Forest--Coniferous Forest--Alpine Meadow Province",
                    "bbox": "-75.40590907111131,41.93741933668425,-68.58450286103295,47.45467195129324"
                }
            ],
            "Intermountain Semi-Desert Province": [
                {
                    "ecoregion": "Intermountain Semi-Desert Province",
                    "bbox": "-121.54467432506043,39.58029909979693,-105.48083726690484,48.998606722073866"
                }
            ],
            "Great Plains - Palouse Dry Steppe Province": [
                {
                    "ecoregion": "Great Plains - Palouse Dry Steppe Province",
                    "bbox": "-118.63802329841424,35.60274956036249,-98.82367798671902,48.99892207107384"
                }
            ],
            "Eastern Broadleaf Forest Province": [
                {
                    "ecoregion": "Eastern Broadleaf Forest Province",
                    "bbox": "-85.96923230696511,34.97576478513872,-69.92554107667863,44.25166243608514"
                }
            ],
            "California Coastal Steppe - Mixed Forest - Redwood Forest Province": [
                {
                    "ecoregion": "California Coastal Steppe - Mixed Forest - Redwood Forest Province",
                    "bbox": "-124.39250741467386,37.82087581463659,-122.12170891480078,42.10082440871318"
                }
            ],
            "Sierran Steppe - Mixed Forest - Coniferous Forest - Alpine Meadow Province": [
                {
                    "ecoregion": "Sierran Steppe - Mixed Forest - Coniferous Forest - Alpine Meadow Province",
                    "bbox": "-124.38047670297678,34.78265263491685,-117.86966445585684,43.72022489263995"
                }
            ],
            "Midwest Broadleaf Forest Province": [
                {
                    "ecoregion": "Midwest Broadleaf Forest Province",
                    "bbox": "-96.98621462569942,38.76311359541524,-75.32097410210794,49.002106163248975"
                }
            ],
            "Intermountain Semi-Desert and Desert Province": [
                {
                    "ecoregion": "Intermountain Semi-Desert and Desert Province",
                    "bbox": "-120.12645752874772,35.81929920589951,-107.50948458904696,42.19005758126415"
                }
            ],
            "Water": [
                {
                    "ecoregion": "Water",
                    "bbox": "-97.78518798396934,24.53069313734909,-66.79803738151229,49.00536185622173"
                }
            ],
            "Southern Rocky Mountain Steppe - Open Woodland - Coniferous Forest - Alpine Meadow Province": [
                {
                    "ecoregion": "Southern Rocky Mountain Steppe - Open Woodland - Coniferous Forest - Alpine Meadow Province",
                    "bbox": "-112.54945127504173,35.327507092379186,-104.23306660778508,45.70363286612959"
                }
            ],
            "California Dry Steppe Province": [
                {
                    "ecoregion": "California Dry Steppe Province",
                    "bbox": "-122.492229616127,34.9050840263236,-118.59002772763031,40.23896812234413"
                }
            ],
            "Nevada-Utah Mountains Semi-Desert - Coniferous Forest - Alpine Meadow Province": [
                {
                    "ecoregion": "Nevada-Utah Mountains Semi-Desert - Coniferous Forest - Alpine Meadow Province",
                    "bbox": "-118.16357093411013,37.278511943957284,-107.8980298787512,41.5499621218954"
                }
            ],
            "American Semi-Desert and Desert Province": [
                {
                    "ecoregion": "American Semi-Desert and Desert Province",
                    "bbox": "-118.79259939175944,31.505737562132634,-110.61019501576818,37.385573577446145"
                }
            ],
            "Central Appalachian Broadleaf Forest-Coniferous Forest-Meadow Province": [
                {
                    "ecoregion": "Central Appalachian Broadleaf Forest-Coniferous Forest-Meadow Province",
                    "bbox": "-84.75422040980172,34.450182550869705,-75.02802439880251,41.72677344028033"
                }
            ],
            "California Coastal Chaparral Forest and Shrub Province": [
                {
                    "ecoregion": "California Coastal Chaparral Forest and Shrub Province",
                    "bbox": "-122.51207116394811,32.53583268689819,-116.72205008401927,38.46723440252128"
                }
            ],
            "Central Interior Broadleaf Forest Province": [
                {
                    "ecoregion": "Central Interior Broadleaf Forest Province",
                    "bbox": "-95.35855828619567,34.497462121961505,-83.32612868869218,39.72635423862798"
                }
            ],
            "California Coastal Range Open Woodland - Shrub - Coniferous Forest - Meadow Province": [
                {
                    "ecoregion": "California Coastal Range Open Woodland - Shrub - Coniferous Forest - Meadow Province",
                    "bbox": "-121.99047781774941,32.56655755660373,-115.90125548956969,37.91331998712194"
                }
            ],
            "Lower Mississippi Riverine Forest Province": [
                {
                    "ecoregion": "Lower Mississippi Riverine Forest Province",
                    "bbox": "-92.58736316392478,29.687223217504364,-88.99825195659842,37.3197892771572"
                }
            ],
            "Colorado Plateau Semi-Desert Province": [
                {
                    "ecoregion": "Colorado Plateau Semi-Desert Province",
                    "bbox": "-113.99648859574904,32.86410452772765,-106.4352002768587,38.05623410574059"
                }
            ],
            "Ozark Broadleaf Forest Province": [
                {
                    "ecoregion": "Ozark Broadleaf Forest Province",
                    "bbox": "-95.32873847498072,35.335024913804126,-91.39731824675916,36.4033008940498"
                }
            ],
            "Arizona-New Mexico Mountains Semi-Desert - Open Woodland - Coniferous Forest - Alpine Meadow Province": [
                {
                    "ecoregion": "Arizona-New Mexico Mountains Semi-Desert - Open Woodland - Coniferous Forest - Alpine Meadow Province",
                    "bbox": "-112.7097734717462,31.159298400817566,-104.1112169074016,36.209729280442"
                }
            ],
            "Southeastern Mixed Forest Province": [
                {
                    "ecoregion": "Southeastern Mixed Forest Province",
                    "bbox": "-96.56038616060133,30.70664880579115,-77.14825935153246,38.83524914710027"
                }
            ],
            "Ouachita Mixed Forest-Meadow Province": [
                {
                    "ecoregion": "Ouachita Mixed Forest-Meadow Province",
                    "bbox": "-96.11036358375509,34.05293644341978,-92.33149242828787,35.19977302018164"
                }
            ],
            "Prairie Parkland (Subtropical) Province": [
                {
                    "ecoregion": "Prairie Parkland (Subtropical) Province",
                    "bbox": "-99.03474495291304,25.95477997931036,-94.63777489661831,38.35307930883874"
                }
            ],
            "Chihuahuan Semi-Desert Province": [
                {
                    "ecoregion": "Chihuahuan Semi-Desert Province",
                    "bbox": "-111.62494054770539,28.97869872912264,-100.11840556113503,34.35017387722565"
                }
            ],
            "Outer Coastal Plain Mixed Forest Province": [
                {
                    "ecoregion": "Outer Coastal Plain Mixed Forest Province",
                    "bbox": "-96.03224806024674,25.951150463585673,-73.96390604490182,40.57787136635988"
                }
            ],
            "Southwest Plateau and Plains Dry Steppe and Shrub Province": [
                {
                    "ecoregion": "Southwest Plateau and Plains Dry Steppe and Shrub Province",
                    "bbox": "-107.45063182073734,25.84485803070601,-97.10797716794075,37.44279473070239"
                }
            ],
            "Everglades Province": [
                {
                    "ecoregion": "Everglades Province",
                    "bbox": "-82.92461204967879,24.54522489051892,-80.11584313713816,27.211471091003673"
                }
            ]};



    }
);

