var cwg = undefined;

$(document).ready(function () {

        function populate_variables(frequency) {
            var variables = climate_widget.variables(frequency);
            $("select#variable").empty();
            $(variables.map(function (v) {
                return ('<option value="' + v.id + '"' + '>' + v.title + '</option>');
            }).join("")).appendTo($("select#variable"));
        }


    $('#forest').change(function () {
        if ($('#forest').val() === '') {
            return;
        }
        var ecoregions = ecoregion_list[$('#forest').val()];
        var $el = $("#ecoregion");
        $el.empty();
        $el.append($('<option value=""  selected></option>'));
        ecoregions.forEach(function (sc) {
            $el.append($("<option></option>")
                .attr("value", sc.bbox).text(sc.ecoregion));
        });
    });

        function initGraphEcoregion() {
            cwg = climate_widget.graph({
                'div': "div#widget",
                'dataprefix': 'http://climate-widget-data.nemac.org/data',
                'font': 'Roboto',
                'frequency': $('#frequency').val(),
                'timeperiod': $('#timeperiod').val(),
                'bbox': $('#ecoregion').val(),
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
            "Allegheny National Forest": [
                {
                    "ecoregion": "Allegheny High Plateau",
                    "bbox": "-79.99374759307693,41.24068624897126,-78.01728423457973,42.32118473868479"
                }
            ],
            "Angeles National Forest": [
                {
                    "ecoregion": "San Rafael-Topatopa Mountains",
                    "bbox": "-120.10697488728118,34.395844578764354,-118.61633802617894,34.85946751991014"
                },
                {
                    "ecoregion": "Simi Valley-Santa Susana Mountains",
                    "bbox": "-119.1205592198321,34.122443412033874,-118.48370746143019,34.39839832871996"
                },
                {
                    "ecoregion": "High Desert Plains and Hills",
                    "bbox": "-118.79258710680949,34.266078103821485,-116.89696900601479,35.9945155385613"
                },
                {
                    "ecoregion": "Northern Transverse Ranges",
                    "bbox": "-119.57436230437679,34.544278887560665,-118.17932732569551,34.93410818484489"
                },
                {
                    "ecoregion": "Upper San Gabriel Mountains",
                    "bbox": "-118.2393081320646,34.19456930003321,-117.49678045295553,34.426742674434934"
                },
                {
                    "ecoregion": "Sierra Pelona-Mint Canyon",
                    "bbox": "-118.71278422900895,34.34671201724586,-118.05154857100973,34.61640892233396"
                },
                {
                    "ecoregion": "San Gabriel Mountains",
                    "bbox": "-118.48693517501829,34.12377357409122,-117.38698767334239,34.500735679108345"
                },
                {
                    "ecoregion": "Los Angeles Plain",
                    "bbox": "-118.65732875092107,33.5647797530832,-117.65799237344925,34.33188048529621"
                }
            ],
            "Apache-Sitgreaves National Forests": [
                {
                    "ecoregion": "Coconino Plateau Coniferous Forest",
                    "bbox": "-112.18227945942948,34.08602751605707,-109.57939825442588,35.48587649910121"
                },
                {
                    "ecoregion": "White Mountains Scarp Woodland-Coniferous Forest",
                    "bbox": "-111.6552582854415,34.056220270149424,-109.5883756342281,34.87696108468634"
                },
                {
                    "ecoregion": "Coconino Plateau Woodland",
                    "bbox": "-112.70976226171899,34.204964363014994,-109.55669791987305,35.56199294341968"
                },
                {
                    "ecoregion": "White Mountains Coniferous Forest",
                    "bbox": "-110.94623726024133,33.178581809403056,-108.17858476197716,34.28800228207973"
                },
                {
                    "ecoregion": "White Mountains Woodland",
                    "bbox": "-109.77482369325878,33.052904392623645,-108.40291823618759,34.34915037968631"
                },
                {
                    "ecoregion": "Mogollon Mountains Woodland",
                    "bbox": "-109.32745842626531,32.38030504694041,-107.09551991111499,34.42818093140494"
                },
                {
                    "ecoregion": "Burro Mountains Oak-Juniper Woodland",
                    "bbox": "-109.15605139805353,32.811450592970516,-108.7599072151458,33.109534566966715"
                }
            ],
            "Arapaho and Roosevelt National Forests": [
                {
                    "ecoregion": "Medicine Bow Mountains",
                    "bbox": "-106.66751351793448,40.70229737722224,-105.86295420137526,41.701441572270824"
                },
                {
                    "ecoregion": "Denver-Julesburg Basin",
                    "bbox": "-105.21007037185012,40.80940694767253,-101.7228629201876,41.586065151185835"
                },
                {
                    "ecoregion": "Laramie Basin",
                    "bbox": "-106.17208142471793,40.95785879594672,-105.48082697688346,41.962550224313475"
                },
                {
                    "ecoregion": "North Front Range",
                    "bbox": "-106.04840047500187,39.70399406357524,-105.16871404121997,41.12968164279363"
                },
                {
                    "ecoregion": "Southern Denver-Julesburg Basin",
                    "bbox": "-105.19994411173133,40.273149056383886,-102.18343113234084,41.25076468404296"
                },
                {
                    "ecoregion": "Northern Front Range Foothills",
                    "bbox": "-105.32212800230542,39.38621444394147,-105.00590909133149,40.986373193568056"
                },
                {
                    "ecoregion": "Winter Park",
                    "bbox": "-105.98027084592275,39.90053962240569,-105.71416360186868,40.31657642406276"
                },
                {
                    "ecoregion": "Indian Peaks-Williams Mountains",
                    "bbox": "-106.30330527082157,39.420585716857374,-105.35918288997834,40.77465296106533"
                },
                {
                    "ecoregion": "Platte River",
                    "bbox": "-105.81635401292732,38.918389276643836,-105.07853523531281,39.74145142664207"
                },
                {
                    "ecoregion": "Middle Park",
                    "bbox": "-106.6458240924079,39.65710490856475,-106.05634120268434,40.54574333698548"
                },
                {
                    "ecoregion": "Rabbit Ears Range",
                    "bbox": "-106.55179520788249,39.93354894492791,-105.942239917738,40.49290872255955"
                }
            ],
            "Ashley National Forest": [
                {
                    "ecoregion": "Flaming Gorge Canyonlands",
                    "bbox": "-109.68444375937196,40.98253151461773,-109.15944459589133,41.72274322631887"
                },
                {
                    "ecoregion": "Clay Basin-Corson Peak Uplands",
                    "bbox": "-110.23348332189778,40.87556790863215,-109.32497681003173,41.01149860127947"
                },
                {
                    "ecoregion": "Trout Creek Peak Highlands",
                    "bbox": "-110.04545972528604,40.55423335258723,-109.40416151184428,40.91748891008518"
                },
                {
                    "ecoregion": "West Fork Duchesne River-Soapstone Mountain",
                    "bbox": "-111.41039905357343,40.24191160603584,-110.45078951792186,40.604987118360896"
                },
                {
                    "ecoregion": "Dutch John-Cold Spring Mountain",
                    "bbox": "-109.6433602884465,40.76605203207566,-108.71603055426664,41.015466860707136"
                },
                {
                    "ecoregion": "Diamond Mountain Highlands",
                    "bbox": "-109.51901028989295,40.521871122854066,-108.89382953010869,40.9133833556574"
                },
                {
                    "ecoregion": "Green River Basin",
                    "bbox": "-110.84841012142994,40.9434633308681,-108.58725788864064,42.75570647187624"
                },
                {
                    "ecoregion": "Little Mountain",
                    "bbox": "-109.91711326996142,40.40544929025259,-109.0826671318826,40.644862075824165"
                },
                {
                    "ecoregion": "Uinta Basin",
                    "bbox": "-110.96721165729213,39.7196768901764,-108.17112829673346,40.50281716597948"
                },
                {
                    "ecoregion": "Western High Uintas",
                    "bbox": "-110.94505564819957,40.44663571556589,-109.77174193064553,40.94143410060332"
                },
                {
                    "ecoregion": "Kamas Uplands",
                    "bbox": "-111.2692370468522,40.445654599280374,-110.61578760311534,40.84905373634092"
                },
                {
                    "ecoregion": "Axial Basin High",
                    "bbox": "-109.24197620024142,40.20188612184711,-107.1495154648668,40.92360467231782"
                },
                {
                    "ecoregion": "Johnny Star Flat Foothills",
                    "bbox": "-110.49693437602059,40.25577042676383,-109.85452019115388,40.57687758473281"
                },
                {
                    "ecoregion": "Semi-Arid Benchlands and Canyonlands",
                    "bbox": "-111.15317918157393,39.873841931759785,-110.20707257164185,40.18077702434027"
                },
                {
                    "ecoregion": "Semi-Arid Hills and Low Mountains",
                    "bbox": "-111.19625565627348,39.67237872709666,-110.38852564044589,40.03760759231659"
                },
                {
                    "ecoregion": "Tavaputs Plateau South Uinta Basin",
                    "bbox": "-110.57114015669282,39.359554787423576,-108.5233093876181,40.15832376592908"
                }
            ],
            "Beaverhead-Deerlodge National Forest": [
                {
                    "ecoregion": "Gravelly-Snowcrest Mountains",
                    "bbox": "-112.39022251955362,44.64143447991739,-111.46771144822475,45.39252758098314"
                },
                {
                    "ecoregion": "Madison Mountains",
                    "bbox": "-111.62966299095422,44.710584783760794,-111.05487275627263,45.38669795064993"
                },
                {
                    "ecoregion": "Southern Beaverhead Mountains",
                    "bbox": "-113.23267857915306,43.95000249062252,-111.36324206157184,44.98445516187627"
                },
                {
                    "ecoregion": "Garnet-Sapphire Mountains",
                    "bbox": "-114.08265067958519,46.036883698923646,-112.65230375421487,47.03502572725557"
                },
                {
                    "ecoregion": "Flint Creek-Upper Willow Creek Basins",
                    "bbox": "-113.49373383934517,46.14679257921421,-112.96555455529847,46.72429069326091"
                },
                {
                    "ecoregion": "Central Montana Broad Valleys",
                    "bbox": "-112.39488142323904,45.51314664310314,-110.00305531395156,46.900463354899955"
                },
                {
                    "ecoregion": "Anaconda-Flint Creek Mountains",
                    "bbox": "-113.69912211889061,45.95620354505763,-112.77285408025159,46.596455470143894"
                },
                {
                    "ecoregion": "Boulder-Elkhorn Mountains",
                    "bbox": "-112.75165901924828,45.44834529609858,-111.59437046782278,46.66750657476865"
                },
                {
                    "ecoregion": "Deerlodge Valley",
                    "bbox": "-113.03613461841786,45.840846200391866,-112.51251686216341,46.59473058574798"
                },
                {
                    "ecoregion": "South Anaconda-Bitterroot Mountains",
                    "bbox": "-114.56546483033759,45.459315498911224,-113.47952833356572,46.24880029120055"
                },
                {
                    "ecoregion": "Anaconda Mountains",
                    "bbox": "-113.94473286562919,45.64540371580887,-113.03613461841786,46.067025838871416"
                },
                {
                    "ecoregion": "East Pioneer Mountains",
                    "bbox": "-113.23765890683308,45.126130601446164,-112.74787913901105,46.0165526121134"
                },
                {
                    "ecoregion": "Southwest Montana Intermontane Basins and Valleys",
                    "bbox": "-113.69148368842144,44.51275086875762,-111.44737811940468,46.060849421863395"
                },
                {
                    "ecoregion": "West Pioneer Mountains",
                    "bbox": "-113.43327400099429,45.28658254175093,-112.83458133406128,45.902845418181585"
                },
                {
                    "ecoregion": "Biterroot Range",
                    "bbox": "-114.13409325679834,44.45193455533553,-112.99430902694002,45.70588239495663"
                },
                {
                    "ecoregion": "East Bitterroot Range-Big Hole Divide",
                    "bbox": "-113.93422122263127,44.78462263672537,-113.14480482018627,45.69281131558978"
                },
                {
                    "ecoregion": "Ruby-Tobacco Root Mountains",
                    "bbox": "-112.55131537070775,45.04218832413193,-111.65332487164545,45.930518029683356"
                },
                {
                    "ecoregion": "Gallatin Foothills-Spanish Peaks",
                    "bbox": "-111.69452205195108,45.26313531214498,-110.58644892737607,45.65359817821343"
                }
            ],
            "Bighorn National Forest": [
                {
                    "ecoregion": "Bighorn Basin",
                    "bbox": "-109.2831028368264,43.513137918280336,-107.1951387701381,45.25305694272379"
                },
                {
                    "ecoregion": "Bighorn Mountains - Sedimentary",
                    "bbox": "-108.72387973636069,43.30049295428648,-106.80749965388588,45.39280195514618"
                },
                {
                    "ecoregion": "Powder River Breaks",
                    "bbox": "-107.46274874266032,44.009886451698435,-105.73554187635648,45.119215230398595"
                },
                {
                    "ecoregion": "Powder River Basin",
                    "bbox": "-106.92974976064289,42.477662795201866,-104.24773158084776,45.10496856984366"
                },
                {
                    "ecoregion": "Bighorn Mountains - Granitic-Gneiss",
                    "bbox": "-107.50907273222077,44.01405132990499,-106.77623538755307,44.82588414104032"
                }
            ],
            "Bitterroot National Forest": [
                {
                    "ecoregion": "Clark Fork Valley and Mountains",
                    "bbox": "-115.7375468013438,46.6315316280822,-114.05021000558725,47.93894055796045"
                },
                {
                    "ecoregion": "Bitterroot-Frenchtown Valleys",
                    "bbox": "-114.64399891222001,45.92190533576269,-113.94509919367283,47.20585866244738"
                },
                {
                    "ecoregion": "Garnet-Sapphire Mountains",
                    "bbox": "-114.08265067958519,46.036883698923646,-112.65230375421487,47.03502572725557"
                },
                {
                    "ecoregion": "Bitterroot Glaciated Canyons",
                    "bbox": "-114.56617434596927,45.73262946108082,-114.11427151092147,46.7286071935672"
                },
                {
                    "ecoregion": "Lochsa-Salmon Breaklands",
                    "bbox": "-115.79222943713876,45.707047844382544,-114.67487297890483,46.540118590800375"
                },
                {
                    "ecoregion": "Anaconda-Flint Creek Mountains",
                    "bbox": "-113.69912211889061,45.95620354505763,-112.77285408025159,46.596455470143894"
                },
                {
                    "ecoregion": "Central Idaho Glaciated Mountains",
                    "bbox": "-115.54612661285285,45.46894820929248,-114.32024965040102,46.67106179176835"
                },
                {
                    "ecoregion": "South Anaconda-Bitterroot Mountains",
                    "bbox": "-114.56546483033759,45.459315498911224,-113.47952833356572,46.24880029120055"
                },
                {
                    "ecoregion": "Salmon River Canyonlands",
                    "bbox": "-116.31121209656095,44.71669982024059,-114.74142106473033,45.682275086026436"
                },
                {
                    "ecoregion": "Anaconda Mountains",
                    "bbox": "-113.94473286562919,45.64540371580887,-113.03613461841786,46.067025838871416"
                },
                {
                    "ecoregion": "Biterroot Range",
                    "bbox": "-114.13409325679834,44.45193455533553,-112.99430902694002,45.70588239495663"
                },
                {
                    "ecoregion": "Copper Mountain-Point of Rock",
                    "bbox": "-114.80669415201345,45.325835058641076,-114.01139658718273,45.57076954397934"
                },
                {
                    "ecoregion": "Upper Salmon River Canyonlands",
                    "bbox": "-114.80950230578674,44.833703650902805,-113.93605552034597,45.451074150351815"
                }
            ],
            "Black Hills National Forest": [
                {
                    "ecoregion": "Shale Scablands",
                    "bbox": "-105.19836050903024,42.75786742943836,-102.3152694789033,45.32699916717786"
                },
                {
                    "ecoregion": "Black Hills Foothills",
                    "bbox": "-104.86933162335572,43.23655597987465,-103.21738410069565,44.92409654402036"
                },
                {
                    "ecoregion": "Black Hills Limestone Plateau-Core Highlands",
                    "bbox": "-104.59357695781034,43.38704552283269,-103.25989976536187,44.78538221311868"
                }
            ],
            "Boise National Forest": [
                {
                    "ecoregion": "Middle and South Forks Boise River",
                    "bbox": "-116.10168294621099,43.47347331674024,-115.31072021706433,43.88190850077672"
                },
                {
                    "ecoregion": "Boise Ridge",
                    "bbox": "-116.21891049042677,43.57763256139367,-115.89078832911804,44.34039475541368"
                },
                {
                    "ecoregion": "Stanley Basin-Sawtooth Valley",
                    "bbox": "-115.285396355957,43.84362372095802,-114.71738997456765,44.473135538374436"
                },
                {
                    "ecoregion": "Boise Basin Lands",
                    "bbox": "-116.04073404484024,43.66067260016041,-115.67671524081567,44.17438534840517"
                },
                {
                    "ecoregion": "Sawtooth Range",
                    "bbox": "-115.2852452491689,43.60796345914639,-114.66172082115895,44.346646165987806"
                },
                {
                    "ecoregion": "South Fork Payette Canyon and Stream Cut Lands Canyon",
                    "bbox": "-115.9109258674348,44.00019646709336,-115.18021765871794,44.27213256086907"
                },
                {
                    "ecoregion": "Upper Middle Fork Boise River",
                    "bbox": "-115.82384435093599,43.68903753135703,-115.17094362225032,44.11747222126604"
                },
                {
                    "ecoregion": "South Fork Boise River Uplands",
                    "bbox": "-115.61874843739042,43.334653804729385,-114.6522137460675,43.866179779972924"
                },
                {
                    "ecoregion": "Salmon River Canyonlands",
                    "bbox": "-116.31121209656095,44.71669982024059,-114.74142106473033,45.682275086026436"
                },
                {
                    "ecoregion": "Fitsum Peak Glaciated Lands",
                    "bbox": "-116.08322539003967,44.72931809365514,-115.53533708473861,45.41297276028473"
                },
                {
                    "ecoregion": "Monumental Summit Mountains",
                    "bbox": "-115.63815029609924,44.68871395238705,-114.72868749193418,45.22676051968227"
                },
                {
                    "ecoregion": "Long Valley Foothills",
                    "bbox": "-116.10922820511752,44.503254878709754,-115.7935991792587,45.001604104645764"
                },
                {
                    "ecoregion": "Weiser River Valley and Uplands",
                    "bbox": "-117.17112907284837,43.72932415888289,-116.12006502498087,44.90078948094981"
                },
                {
                    "ecoregion": "Long Valley Basin",
                    "bbox": "-116.23858103508667,44.2301513453084,-115.86836737435482,44.931116214841495"
                },
                {
                    "ecoregion": "Bear Valley - Landmark Basin and Uplands",
                    "bbox": "-115.71422418989442,44.11891541101744,-115.26872854868355,44.96195996897745"
                },
                {
                    "ecoregion": "Middle Fork Payette Canyon and Stream Cut Lands",
                    "bbox": "-115.98186913165506,44.046864187432334,-115.57454081070983,44.74486653366364"
                },
                {
                    "ecoregion": "Stanley Uplands",
                    "bbox": "-115.40825436574636,44.36991584783817,-114.69897454803692,44.742239122037915"
                },
                {
                    "ecoregion": "Danskin Mountains and Valleys",
                    "bbox": "-115.96173754055502,43.26208457794098,-115.2658493017039,43.53470240189438"
                },
                {
                    "ecoregion": "Soldier Mountain Foothills",
                    "bbox": "-115.31340385520372,43.29960516514632,-114.71900193199355,43.579501742911134"
                },
                {
                    "ecoregion": "Mt. Bennett Hills-Camas Prairie",
                    "bbox": "-115.8049052257955,43.0032226571999,-113.97332011822886,43.483775862865855"
                }
            ],
            "Bridger-Teton National Forest": [
                {
                    "ecoregion": "Pitchstone Plateau",
                    "bbox": "-111.2424968209715,44.05967028335692,-110.00636076583663,44.90368477723075"
                },
                {
                    "ecoregion": "North Absaroka Range",
                    "bbox": "-110.48582690518748,44.15648886037263,-109.3082340892318,45.17083450281012"
                },
                {
                    "ecoregion": "Overthrust Belt-Channeled Hills",
                    "bbox": "-110.93754784425755,41.1296281214407,-110.60482903303341,42.16030996683156"
                },
                {
                    "ecoregion": "Jackson Hole",
                    "bbox": "-110.90390528839833,43.38844105031427,-110.24660610328903,44.07433617637349"
                },
                {
                    "ecoregion": "Red Mountains-Leidy Uplands",
                    "bbox": "-110.70534197105508,43.16420072518338,-109.7828599891971,44.306254709887014"
                },
                {
                    "ecoregion": "Throughfare Plateau",
                    "bbox": "-110.3673278805772,43.519091461701635,-109.42415761198419,44.38441670716537"
                },
                {
                    "ecoregion": "Teton Range",
                    "bbox": "-111.14382114393061,43.522906021595645,-110.69606793368814,44.16878862269681"
                },
                {
                    "ecoregion": "Wind River Mountains",
                    "bbox": "-109.99379805163875,42.47320007142622,-108.75647620890987,43.555437043284996"
                },
                {
                    "ecoregion": "Southwestern Overthrust Belt Mountains",
                    "bbox": "-111.54227625894214,41.97760030411081,-110.37988244781667,43.005500408816886"
                },
                {
                    "ecoregion": "Upper Green River Basin",
                    "bbox": "-110.469150837641,42.38924375389615,-109.35191629689956,43.21833212602684"
                },
                {
                    "ecoregion": "Caribou-Snake River Range",
                    "bbox": "-111.76568724457064,42.595950800189314,-110.75081623887831,43.82173874234911"
                },
                {
                    "ecoregion": "Wyoming-Salt River-Gro Ventre Ranges",
                    "bbox": "-110.98913117256552,42.25477502794524,-110.09311879439679,43.57660450769191"
                }
            ],
            "Caribou-Targhee National Forest": [
                {
                    "ecoregion": "West Yellowstone-Madison Valley",
                    "bbox": "-111.36673297884386,44.615478559987594,-110.93593829611547,44.86090334311484"
                },
                {
                    "ecoregion": "Island Park",
                    "bbox": "-111.73148796879468,44.05783178490901,-111.17906393904951,44.75513479043826"
                },
                {
                    "ecoregion": "Pitchstone Plateau",
                    "bbox": "-111.2424968209715,44.05967028335692,-110.00636076583663,44.90368477723075"
                },
                {
                    "ecoregion": "Gravelly-Snowcrest Mountains",
                    "bbox": "-112.39022251955362,44.64143447991739,-111.46771144822475,45.39252758098314"
                },
                {
                    "ecoregion": "Madison Mountains",
                    "bbox": "-111.62966299095422,44.710584783760794,-111.05487275627263,45.38669795064993"
                },
                {
                    "ecoregion": "Southern Beaverhead Mountains",
                    "bbox": "-113.23267857915306,43.95000249062252,-111.36324206157184,44.98445516187627"
                },
                {
                    "ecoregion": "Southern Lemhi Range",
                    "bbox": "-113.40875402138096,43.82290634205407,-112.83943287342834,44.574821806581156"
                },
                {
                    "ecoregion": "Blackfoot Mountains",
                    "bbox": "-112.35029587535433,42.37366947636531,-111.24145066391696,43.65816358787936"
                },
                {
                    "ecoregion": "Southwest Montana Intermontane Basins and Valleys",
                    "bbox": "-113.69148368842144,44.51275086875762,-111.44737811940468,46.060849421863395"
                },
                {
                    "ecoregion": "Lemhi and Birch Creek Valleys",
                    "bbox": "-113.9383749123723,43.82107787194627,-112.72826879137159,45.366268840434714"
                },
                {
                    "ecoregion": "Falls River",
                    "bbox": "-111.27993630821402,43.967535911553114,-110.86191460297653,44.636218072106374"
                },
                {
                    "ecoregion": "Eastern Idaho Plateaus North",
                    "bbox": "-112.50352193389011,43.585200404974785,-110.96873592092595,44.48535921985217"
                },
                {
                    "ecoregion": "Teton Range",
                    "bbox": "-111.14382114393061,43.522906021595645,-110.69606793368814,44.16878862269681"
                },
                {
                    "ecoregion": "Bannock-Malad-Pocatello Ranges",
                    "bbox": "-112.54943918796812,41.90947555295446,-111.9780284679394,43.01093509018233"
                },
                {
                    "ecoregion": "Cache Valley",
                    "bbox": "-112.35856502555544,41.49507531867107,-111.7463466719613,43.006718830109946"
                },
                {
                    "ecoregion": "Portneuf Range",
                    "bbox": "-112.21762356587482,42.26284627333689,-111.74708240193127,43.010505489436866"
                },
                {
                    "ecoregion": "South Central Idaho Ranges",
                    "bbox": "-114.85409041673933,41.340355396284565,-112.16042588244846,42.90051435175599"
                },
                {
                    "ecoregion": "Southwestern Overthrust Belt Mountains",
                    "bbox": "-111.54227625894214,41.97760030411081,-110.37988244781667,43.005500408816886"
                },
                {
                    "ecoregion": "Bear River Front Range",
                    "bbox": "-111.84139201073265,41.458580128570134,-111.55605738274198,42.650581792415835"
                },
                {
                    "ecoregion": "Northern Wasatch Range",
                    "bbox": "-111.73539657888898,41.43695696778991,-111.20481752860604,42.651852615405915"
                },
                {
                    "ecoregion": "Caribou-Snake River Range",
                    "bbox": "-111.76568724457064,42.595950800189314,-110.75081623887831,43.82173874234911"
                },
                {
                    "ecoregion": "Curlew-Bear River-Blue Creek Valleys",
                    "bbox": "-113.1982477630238,41.449512356110404,-112.00357426014398,42.528173917592255"
                }
            ],
            "Carson National Forest": [
                {
                    "ecoregion": "Brazos Uplift",
                    "bbox": "-106.73236035804405,36.14800651488878,-105.99716905230986,37.43505986761886"
                },
                {
                    "ecoregion": "Sangre de Cristo Mountains Woodland",
                    "bbox": "-105.87640160924684,35.469063335304725,-104.23305705703751,37.15389721798226"
                },
                {
                    "ecoregion": "Sangre de Cristo",
                    "bbox": "-106.13652238300153,35.72411167821144,-104.84103897157127,38.50378998372082"
                },
                {
                    "ecoregion": "Sangre de Cristo Mountains Coniferous Forest",
                    "bbox": "-106.01795325264044,35.32750131733201,-104.53010816236178,36.89910282743358"
                },
                {
                    "ecoregion": "Southern San Luis Grasslands",
                    "bbox": "-106.20266451305679,35.86548543120773,-105.90927551635195,36.40772259192414"
                },
                {
                    "ecoregion": "San Juan Basin North",
                    "bbox": "-108.20791160263832,36.82813750644084,-106.56404165030187,37.542364208741276"
                },
                {
                    "ecoregion": "Mogotes",
                    "bbox": "-106.43103419677072,36.514086481406025,-105.90287212394935,37.67425779885838"
                },
                {
                    "ecoregion": "Chaco Basin High Desert Shrubland",
                    "bbox": "-109.15041669037794,35.44622593597819,-106.43519025262805,36.97500773142173"
                },
                {
                    "ecoregion": "San Luis Hills",
                    "bbox": "-106.05332598270792,36.200738613796034,-105.23076265337374,37.57604349201358"
                }
            ],
            "Chattahoochee-Oconee National Forests": [
                {
                    "ecoregion": "Southern Blue Ridge Mountains",
                    "bbox": "-84.48033094111997,34.45017597174376,-80.93362685469555,36.826888572949315"
                },
                {
                    "ecoregion": "Metasedimentary Mountains",
                    "bbox": "-84.75421615625055,34.6843026970119,-82.3285912141132,36.30912780170672"
                },
                {
                    "ecoregion": "Shaley Limestone Valley",
                    "bbox": "-86.04674731103955,33.81408770358473,-84.64708848694409,35.01956019814469"
                },
                {
                    "ecoregion": "Sandstone Ridge",
                    "bbox": "-87.24352551978689,32.98781036665514,-84.86727201079464,34.99132612280238"
                },
                {
                    "ecoregion": "Schist Hills",
                    "bbox": "-84.76976528693842,34.17083605903696,-83.64555184973801,34.77406759624262"
                },
                {
                    "ecoregion": "Lower Foot Hills",
                    "bbox": "-83.67397774507685,34.17794030929787,-82.2631888879568,35.1599164770638"
                },
                {
                    "ecoregion": "Midland Plateau Central Uplands",
                    "bbox": "-85.44416692706199,32.56815152567242,-81.5784543037231,35.15744196637371"
                },
                {
                    "ecoregion": "Schist Plains",
                    "bbox": "-86.55490603608467,32.76981130774573,-83.3798425413002,34.7390491495986"
                },
                {
                    "ecoregion": "Piedmont Ridge",
                    "bbox": "-86.02310179081496,32.783739042622756,-83.32726493243064,34.73179432764613"
                },
                {
                    "ecoregion": "Chert Valley",
                    "bbox": "-87.10529155725953,33.04070647582324,-85.08665651668485,35.183178571334054"
                }
            ],
            "Chequamegon-Nicolet National Forest": [
                {
                    "ecoregion": "Bayfield Sand Plains",
                    "bbox": "-92.8804237226766,45.55019462128479,-90.94779922475436,46.80916753075701"
                },
                {
                    "ecoregion": "Gogebic-Penokee Iron Range",
                    "bbox": "-91.39986734080509,46.255896479938656,-88.81627838334066,46.98849075224649"
                },
                {
                    "ecoregion": "Perkinstown End Moraine",
                    "bbox": "-91.67629771826506,44.95497956615412,-88.76763870786004,45.87360369835204"
                },
                {
                    "ecoregion": "Superior-Ashland Clay Plain",
                    "bbox": "-92.66243075577472,46.3529305147315,-88.75157672258763,47.12370671319434"
                },
                {
                    "ecoregion": "Central-Northwest Wisconsin Loess Plains",
                    "bbox": "-91.4424481307766,45.07844322527467,-89.7213656233248,46.06048665603441"
                },
                {
                    "ecoregion": "Winegar Moraines",
                    "bbox": "-91.04723947392256,46.15716183075392,-88.5755231590665,46.52699455215691"
                },
                {
                    "ecoregion": "Brule and Paint Rivers Drumlinized Ground Moraine",
                    "bbox": "-89.28883370581082,45.22978575001241,-88.22379853437485,46.40855686670608"
                },
                {
                    "ecoregion": "Hayward Stagnation Moraines",
                    "bbox": "-91.91669532173165,45.56714912163471,-90.9932353550276,46.37545881886945"
                },
                {
                    "ecoregion": "Crystal Falls Till and Outwash",
                    "bbox": "-88.59641801827689,45.86146596867957,-88.09535328942275,46.35451126388375"
                },
                {
                    "ecoregion": "Glidden Loamy Drift Plain",
                    "bbox": "-91.35928879064511,45.363724991115475,-89.6757279306994,46.30624611466652"
                },
                {
                    "ecoregion": "Northern Highlands Pitted Outwash",
                    "bbox": "-90.27562122583885,45.33634176795829,-89.000512015617,46.28077531782674"
                },
                {
                    "ecoregion": "Athelstane Sandy Outwash and Moraines",
                    "bbox": "-88.84834329990332,44.75292321363543,-87.7746862659584,45.93536745744228"
                },
                {
                    "ecoregion": "Lincoln Formation Till Plain - Hemlock Hardwoods",
                    "bbox": "-91.15257934226281,44.566460634150985,-88.95097708482456,45.42379992592589"
                },
                {
                    "ecoregion": "Green Bay Lobe Stagnation Moraine",
                    "bbox": "-89.48739443310654,44.59271336273156,-88.35783436626298,45.39778623174925"
                },
                {
                    "ecoregion": "Water",
                    "bbox": "-97.78518055363958,24.53068882942597,-66.79803824267071,49.0053529188022"
                }
            ],
            "Cherokee National Forest": [
                {
                    "ecoregion": "Southern Blue Ridge Mountains",
                    "bbox": "-84.48033094111997,34.45017597174376,-80.93362685469555,36.826888572949315"
                },
                {
                    "ecoregion": "Great Valley of Virginia",
                    "bbox": "-83.30600283326413,35.828377445762555,-77.6883896446663,39.63817482700671"
                },
                {
                    "ecoregion": "Metasedimentary Mountains",
                    "bbox": "-84.75421615625055,34.6843026970119,-82.3285912141132,36.30912780170672"
                },
                {
                    "ecoregion": "Sandstone Hills",
                    "bbox": "-85.08665651668485,34.982053675436816,-83.22641523877223,36.04980099621906"
                },
                {
                    "ecoregion": "Shaley Limestone Valley",
                    "bbox": "-86.04674731103955,33.81408770358473,-84.64708848694409,35.01956019814469"
                }
            ],
            "Chippewa National Forest": [
                {
                    "ecoregion": "Pine Moraine and Outwash Plains",
                    "bbox": "-95.71335388037727,46.08029007732529,-93.77433503813148,47.34517088962491"
                },
                {
                    "ecoregion": "Littlefork-Vermillion Uplands",
                    "bbox": "-94.968937417228,47.66092226914748,-92.36348691478923,48.611325444114016"
                },
                {
                    "ecoregion": "Chippewa Plains",
                    "bbox": "-95.62212668080161,47.09477385832696,-93.5912832292376,47.97533048781179"
                },
                {
                    "ecoregion": "St. Louis Moraines",
                    "bbox": "-94.09523713718409,46.371562139181435,-92.58340929620203,47.88661342916646"
                }
            ],
            "Cibola National Forest": [
                {
                    "ecoregion": "Central Rio Grande Intermontane",
                    "bbox": "-107.4506217580876,33.77868368520399,-106.23202975566863,35.664586855099344"
                },
                {
                    "ecoregion": "Canadian River Canyon and Hills Woodland",
                    "bbox": "-104.84708848344673,34.5724605989775,-101.86700382056983,36.03409886477084"
                },
                {
                    "ecoregion": "Southern South Central and Red Bed Plains",
                    "bbox": "-100.52007068501405,34.071277577798014,-98.29261001843759,37.440542535010024"
                },
                {
                    "ecoregion": "Manzano Mountains Woodland",
                    "bbox": "-106.87098840798859,33.90168456309215,-104.62738592242232,36.20972334555603"
                },
                {
                    "ecoregion": "Caprock High Plains Grassland",
                    "bbox": "-103.83312678857038,35.34783046340522,-102.386660939151,36.492071816061525"
                },
                {
                    "ecoregion": "San Mateo Mountains Coniferous Forest",
                    "bbox": "-108.61514892568232,35.02898042660547,-107.25598864176237,35.61503549818974"
                },
                {
                    "ecoregion": "Sandy-Smooth High Plains",
                    "bbox": "-104.97579797889358,35.602743558168754,-100.40779728741484,37.50192980641549"
                },
                {
                    "ecoregion": "Canadian-Cimarron Breaks",
                    "bbox": "-102.94345462273265,34.89754877775397,-99.27266955105893,37.44278838137876"
                },
                {
                    "ecoregion": "San Mateo Mountain Woodlands",
                    "bbox": "-109.39516069391084,34.020457391695345,-106.96955521130394,35.70667777805704"
                },
                {
                    "ecoregion": "Chupadera High Plains Grassland",
                    "bbox": "-106.28379031876818,33.39321343515195,-103.99867045108044,35.75518623795455"
                },
                {
                    "ecoregion": "Red Prairie",
                    "bbox": "-100.70134394966351,34.622984784020616,-99.15419463817199,36.354838016561246"
                },
                {
                    "ecoregion": "Mogollon Mountains Woodland",
                    "bbox": "-109.32745842626531,32.38030504694041,-107.09551991111499,34.42818093140494"
                },
                {
                    "ecoregion": "San Francisco Peaks Coniferous Forest",
                    "bbox": "-108.339761910184,33.69135675091337,-107.234953846243,34.31097086101647"
                },
                {
                    "ecoregion": "Sacramento Mountains Woodland",
                    "bbox": "-106.10702548773605,32.49979125196478,-105.10430453332754,34.51228557232133"
                },
                {
                    "ecoregion": "Animas Valley Plains Desert Grass-Shrubland",
                    "bbox": "-109.48756013908911,31.343011286042042,-106.60466110792373,34.2958291807721"
                },
                {
                    "ecoregion": "Sand Hills",
                    "bbox": "-107.41658916895494,31.24454237123348,-102.18188663306165,34.29102503837487"
                },
                {
                    "ecoregion": "Mogollon Mountains Coniferous Forest",
                    "bbox": "-108.8939982132469,32.79574863509151,-107.13092588372251,34.1336684548354"
                }
            ],
            "Cleveland National Forest": [
                {
                    "ecoregion": "Fontana Plain-Calimesa Terraces",
                    "bbox": "-117.7999464463714,33.78311091723509,-116.70567574603882,34.24673277020122"
                },
                {
                    "ecoregion": "Coastal Hills",
                    "bbox": "-117.8445625757023,32.55452649000557,-116.72203832700717,33.868891132719625"
                },
                {
                    "ecoregion": "San Jacinto Foothills-Cahuilla Mountains",
                    "bbox": "-117.17446762428142,33.30924350188616,-116.21243148482512,33.99917440937156"
                },
                {
                    "ecoregion": "Palomar-Cuyamaca Peak",
                    "bbox": "-117.00657056637851,32.58268459871533,-116.21921605757495,33.48078532678147"
                },
                {
                    "ecoregion": "Santa Ana Mountains",
                    "bbox": "-117.94934363500073,33.33335231325873,-117.0882115163484,34.09116884936299"
                },
                {
                    "ecoregion": "Perris Valley and Hills",
                    "bbox": "-117.53277329704997,33.43164081327296,-116.84976036414946,34.04758545110775"
                },
                {
                    "ecoregion": "Desert Slopes",
                    "bbox": "-116.7493934490484,32.610764280247395,-115.90124386161489,33.91153473763808"
                },
                {
                    "ecoregion": "Western Granitic Foothills",
                    "bbox": "-117.18977753080839,32.56655276669687,-116.57132683676406,33.472885655848415"
                }
            ],
            "Coconino National Forest": [
                {
                    "ecoregion": "Verde Plains Desert Grass-Shrubland",
                    "bbox": "-112.17688964793888,32.864099342710574,-109.32745842626531,34.87507406871333"
                },
                {
                    "ecoregion": "Painted Desert Steppe Grassland",
                    "bbox": "-111.65818530620686,34.17957406179357,-108.36439818292979,36.333162035899306"
                },
                {
                    "ecoregion": "Coconino Plateau Coniferous Forest",
                    "bbox": "-112.18227945942948,34.08602751605707,-109.57939825442588,35.48587649910121"
                },
                {
                    "ecoregion": "White Mountains Scarp Woodland-Coniferous Forest",
                    "bbox": "-111.6552582854415,34.056220270149424,-109.5883756342281,34.87696108468634"
                },
                {
                    "ecoregion": "Coconino Plateau Woodland",
                    "bbox": "-112.70976226171899,34.204964363014994,-109.55669791987305,35.56199294341968"
                },
                {
                    "ecoregion": "Mazatzal Mountains Woodland",
                    "bbox": "-113.06679922760225,32.970238309950105,-109.53321247357678,35.124233554634884"
                },
                {
                    "ecoregion": "Mazatzal Mountains Interior Chapparral",
                    "bbox": "-113.15683299084981,33.158594042381196,-109.99945762466962,34.89931680442703"
                },
                {
                    "ecoregion": "Kaibab Woodland",
                    "bbox": "-112.60547863003472,35.41653751209657,-111.36500901625305,36.30985555918676"
                }
            ],
            "Columbia River Gorge National Scenic Area": [
                {
                    "ecoregion": "West Cascade Slope Forest",
                    "bbox": "-123.24044457915397,43.16430782994246,-121.04511434115386,47.53592981291058"
                },
                {
                    "ecoregion": "Western Cascades Highland Forest",
                    "bbox": "-122.99084123913184,42.862939303406165,-121.04186360402207,47.40690022086858"
                },
                {
                    "ecoregion": "Missoula Flood Slackwater Basins",
                    "bbox": "-121.29442865076157,45.5000125734216,-118.30224746874563,47.41396417610588"
                },
                {
                    "ecoregion": "Portland - Vancouver Basin",
                    "bbox": "-122.90563549258388,45.407458898109724,-122.27008451269006,46.004291006225"
                },
                {
                    "ecoregion": "Valley Foothills",
                    "bbox": "-123.68181861573652,43.602491894785146,-122.18614452325113,45.953719741672785"
                },
                {
                    "ecoregion": "Pine-Oak Foothills",
                    "bbox": "-121.72061641961204,45.14969033893806,-120.39442999794602,45.97821546657059"
                },
                {
                    "ecoregion": "Umatilla Plateau",
                    "bbox": "-121.41705191321518,44.79714388228439,-118.36988468303167,45.96055206662464"
                },
                {
                    "ecoregion": "Yakima Folds",
                    "bbox": "-121.20737358872009,45.66294039408399,-118.48310605959693,47.35329383524237"
                }
            ],
            "Colville National Forest": [
                {
                    "ecoregion": "Okanogan Highland Dry Forest",
                    "bbox": "-119.3465832441214,48.00443271829539,-118.16551501880303,48.998971970779905"
                },
                {
                    "ecoregion": "Columbia Valley and Foothills",
                    "bbox": "-118.82694212358012,47.813792260004846,-117.12909700332403,48.9998379216828"
                },
                {
                    "ecoregion": "Western Selkirk Maritime Forest",
                    "bbox": "-118.12699918066761,47.76119291901807,-116.79149102069402,48.9998379216828"
                },
                {
                    "ecoregion": "Inland Maritime Foothills and Valley",
                    "bbox": "-117.48996446238999,47.89209803189868,-116.15185879594662,48.999952045650446"
                }
            ],
            "Coronado National Forest": [
                {
                    "ecoregion": "Gila Bend Plain Desert Shrubland",
                    "bbox": "-114.71227164412102,31.52956449020911,-110.6101844553483,34.366713317265805"
                },
                {
                    "ecoregion": "Animas Valley Plains Desert Grass-Shrubland",
                    "bbox": "-109.48756013908911,31.343011286042042,-106.60466110792373,34.2958291807721"
                },
                {
                    "ecoregion": "Santa Catalina Mountains Encinal Woodland",
                    "bbox": "-111.46660040238663,31.335649004997606,-109.15337907158687,32.911717171610235"
                },
                {
                    "ecoregion": "Santa Catalina Mountains Sierra Madre Interior Chaparral",
                    "bbox": "-110.95395755239912,32.02165709939567,-110.11603159468234,33.130711958989764"
                },
                {
                    "ecoregion": "Sulphur Springs Plains Desert Grass-Shrubland",
                    "bbox": "-111.62492980506642,31.335910705015067,-108.95335392964012,33.16443993065832"
                },
                {
                    "ecoregion": "San Simon Valley Desert Shrubland",
                    "bbox": "-109.96606213056282,32.11918482332101,-108.78356587716348,33.052904392623645"
                },
                {
                    "ecoregion": "San Rafael Sierra Madre High Plains Grassland",
                    "bbox": "-110.69302536802627,31.337381407725843,-110.49342483199035,31.498751884991577"
                },
                {
                    "ecoregion": "Animas Mountains Oak-Juniper Woodland",
                    "bbox": "-109.15861404680078,31.3438748708287,-108.26308917042883,31.925892880352194"
                }
            ],
            "Custer National Forest": [
                {
                    "ecoregion": "Bighorn Basin",
                    "bbox": "-109.2831028368264,43.513137918280336,-107.1951387701381,45.25305694272379"
                },
                {
                    "ecoregion": "Central Montana Broad Valleys",
                    "bbox": "-110.00472123519683,44.92585515659027,-107.37874218810146,45.82414620728167"
                },
                {
                    "ecoregion": "Beartooth Front",
                    "bbox": "-110.26720162405564,45.03025879470766,-109.19809356426657,45.70362609756643"
                },
                {
                    "ecoregion": "Beartooth Mountains",
                    "bbox": "-110.26994900973898,44.776196251755664,-109.04026662720304,45.50287269631792"
                },
                {
                    "ecoregion": "Southern Powder River Basin-Scoria Hills",
                    "bbox": "-107.21669744862834,43.38151720225716,-105.04450967618055,45.94542802568287"
                },
                {
                    "ecoregion": "Bighorn Mountains - Sedimentary",
                    "bbox": "-108.72387973636069,43.30049295428648,-106.80749965388588,45.39280195514618"
                },
                {
                    "ecoregion": "Central Grassland",
                    "bbox": "-109.52518258171074,44.896025362880266,-104.04918353129489,47.83523131697177"
                },
                {
                    "ecoregion": "Missouri Plateau",
                    "bbox": "-103.82582171969659,45.34575216682907,-100.3984464047777,47.575934428331266"
                },
                {
                    "ecoregion": "Sagebrush Steppe",
                    "bbox": "-105.1699998451167,44.879652399238864,-102.99520522673981,47.16630964897115"
                },
                {
                    "ecoregion": "Moreau Prairie",
                    "bbox": "-103.74551804182414,44.808299074742536,-101.12853139770579,45.899695634446005"
                }
            ],
            "Dakota Prairie Grasslands": [
                {
                    "ecoregion": "Souris-Agassiz Stratified Fan Deposits",
                    "bbox": "-97.64221529380075,46.0680638606587,-96.77460141582264,46.75335844103927"
                },
                {
                    "ecoregion": "Souris Sand Deltas",
                    "bbox": "-101.22860097175743,47.994719219116746,-100.07222284271,48.75377216385431"
                },
                {
                    "ecoregion": "Lake Agassiz Plain",
                    "bbox": "-98.04745387899328,45.61303699036489,-95.74259048486294,49.002713857358685"
                },
                {
                    "ecoregion": "River Breaks",
                    "bbox": "-104.81976315594488,46.59550377967577,-100.671921949938,48.541948732348146"
                },
                {
                    "ecoregion": "Missouri Plateau and River Breaks",
                    "bbox": "-105.99658431941077,46.476824870871155,-102.45952301577455,48.10270258255821"
                },
                {
                    "ecoregion": "Little Missouri",
                    "bbox": "-104.01649815716416,46.088234779111815,-102.1967862409922,47.774633403908524"
                },
                {
                    "ecoregion": "Missouri Plateau",
                    "bbox": "-103.82582171969659,45.34575216682907,-100.3984464047777,47.575934428331266"
                },
                {
                    "ecoregion": "Sagebrush Steppe",
                    "bbox": "-105.1699998451167,44.879652399238864,-102.99520522673981,47.16630964897115"
                },
                {
                    "ecoregion": "River Breaks",
                    "bbox": "-102.9834903510988,43.78821842324169,-99.86486658842227,46.090604865022556"
                },
                {
                    "ecoregion": "Moreau Prairie",
                    "bbox": "-103.74551804182414,44.808299074742536,-101.12853139770579,45.899695634446005"
                },
                {
                    "ecoregion": "Missouri Plateau",
                    "bbox": "-101.53033923566716,45.230957030642514,-100.41515008330964,45.72740756021079"
                }
            ],
            "Daniel Boone National Forest": [
                {
                    "ecoregion": "Eastern  Knobs Transition",
                    "bbox": "-84.7088302549123,37.35386901664185,-83.48433944540903,38.687063847818365"
                },
                {
                    "ecoregion": "Rugged Eastern Hills",
                    "bbox": "-83.96529682438887,36.66779292090661,-82.71631006335872,38.1396892622497"
                },
                {
                    "ecoregion": "Miami-Scioto Plain-Tipton Till Plain",
                    "bbox": "-84.77921237814871,35.922538883162986,-82.81202116484485,38.67035234878193"
                },
                {
                    "ecoregion": "Southwestern Escarpment",
                    "bbox": "-85.96922768780752,34.99838874434511,-83.92690685176973,37.55428760029258"
                },
                {
                    "ecoregion": "Pine and Cumberland Mountains",
                    "bbox": "-84.31436506399649,36.316142337399015,-82.28660453067454,37.30132812259484"
                },
                {
                    "ecoregion": "Southern Cumberland Mountains",
                    "bbox": "-84.70923573134388,35.935129478142926,-83.91864580715821,36.76127839817957"
                },
                {
                    "ecoregion": "Western Coal Fields",
                    "bbox": "-83.18742567105784,36.94435293114293,-80.27350588119145,38.65453823734981"
                },
                {
                    "ecoregion": "Kinniconick and Licking Knobs",
                    "bbox": "-83.96976103384458,37.80455137904295,-82.72932379835459,38.80126996223902"
                },
                {
                    "ecoregion": "Kinniconick and Licking Knobs",
                    "bbox": "-84.3102177270664,37.3307669774141,-82.91744393089266,38.67674085110946"
                }
            ],
            "Deschutes National Forest": [
                {
                    "ecoregion": "Pluvial Lake Basins",
                    "bbox": "-121.16939048288447,42.29329575479528,-118.36884690855794,43.96069895329413"
                },
                {
                    "ecoregion": "Cascade Crest Forest and Volcanic Peaks",
                    "bbox": "-122.23167682432597,43.351430882329396,-121.32923382588035,47.05299090100931"
                },
                {
                    "ecoregion": "Ponderosa Pine-Bitterbrush Woodland",
                    "bbox": "-121.7708745159461,43.88318290037063,-121.10441714593452,45.52758571990512"
                },
                {
                    "ecoregion": "Deschutes River Valley",
                    "bbox": "-121.5446603264129,43.889714268099056,-120.65759981787727,44.959063422638906"
                },
                {
                    "ecoregion": "John Day-Clarno Uplands",
                    "bbox": "-121.4286312187557,43.69879737979528,-119.99546702138588,45.08635756594896"
                },
                {
                    "ecoregion": "Pumice Plateau Forest",
                    "bbox": "-122.12971260715108,42.38114683196079,-120.61913775740157,43.94147195876394"
                },
                {
                    "ecoregion": "Southern Oregon Cascade Highlands",
                    "bbox": "-122.35395221102567,42.23823813228404,-121.88308967075164,43.402764726111286"
                },
                {
                    "ecoregion": "High Lava Plains",
                    "bbox": "-121.30892279575039,40.47262246875198,-117.29109053180258,43.93081048511584"
                },
                {
                    "ecoregion": "Cold Wet Pumice Plateau Basins",
                    "bbox": "-121.90006897890021,42.7602683171292,-121.40053899887567,43.90924302204786"
                }
            ],
            "Dixie National Forest": [
                {
                    "ecoregion": "Sevier Plateau",
                    "bbox": "-112.35000387178121,37.790960334152146,-111.98061071741063,38.183853919322985"
                },
                {
                    "ecoregion": "Aquarius Plateau-Boulder Mountain",
                    "bbox": "-111.98914853107982,37.82079892772839,-111.25278486103247,38.27706656477022"
                },
                {
                    "ecoregion": "Kolob Terrace-Cedar Mountain",
                    "bbox": "-113.16704901679867,37.278506355284094,-112.76214564310692,37.83917163466327"
                },
                {
                    "ecoregion": "Southern Markagunt-Paunsaugunt Plateaus",
                    "bbox": "-112.89069699636923,37.380805524955065,-111.74167391332043,37.901781550578164"
                },
                {
                    "ecoregion": "Northern Markagunt Plateau",
                    "bbox": "-112.86828631096444,37.52866757984498,-112.29300631179183,38.13472283808858"
                },
                {
                    "ecoregion": "Kolob-Skutunpah Terraces and Cliffs",
                    "bbox": "-112.94101634372925,37.1773993583937,-111.80075021305186,37.73872661614047"
                },
                {
                    "ecoregion": "Saint George Basin",
                    "bbox": "-113.93460822698808,36.90374930158907,-113.27349355298503,37.29814421408429"
                },
                {
                    "ecoregion": "Escalante",
                    "bbox": "-111.68069301856792,37.15507416344195,-110.74509108278721,38.05622830569183"
                },
                {
                    "ecoregion": "Red Mountain",
                    "bbox": "-113.9418392052151,37.210937842007866,-113.25795072024948,37.47213722305446"
                },
                {
                    "ecoregion": "Shinarump Steppe",
                    "bbox": "-112.07062379625114,36.72290681579699,-110.94038842218788,37.899517983967826"
                },
                {
                    "ecoregion": "Clover Delamer-Bull Valley Mountains",
                    "bbox": "-115.93929602099456,37.02971926063543,-113.33654957760092,38.279645002015286"
                },
                {
                    "ecoregion": "Escalante Desert",
                    "bbox": "-114.11068999414789,37.44238053703219,-112.58620864521276,38.72759945265267"
                },
                {
                    "ecoregion": "John's Valley-Grass Valley",
                    "bbox": "-112.15890058009768,37.73573421556165,-111.77829890167294,38.68978658758101"
                },
                {
                    "ecoregion": "Awapa Plateau",
                    "bbox": "-111.95770540937713,38.06585286461808,-111.51225808963909,38.498590607270785"
                },
                {
                    "ecoregion": "Upper Sevier River Valley",
                    "bbox": "-112.59871478306076,37.61184614928044,-112.32476456673135,38.06683079910215"
                },
                {
                    "ecoregion": "Pine Valley Mountains",
                    "bbox": "-113.60372975332541,37.31822876434603,-113.17307987763422,37.811047815304505"
                }
            ],
            "Eldorado National Forest": [
                {
                    "ecoregion": "Glaciated Batholith and Volcanic Flows",
                    "bbox": "-120.34993133536278,38.19669883358438,-119.4588061726667,39.06450528519082"
                },
                {
                    "ecoregion": "Batholith and Volcanic Flows",
                    "bbox": "-120.62037110204471,37.77151269365595,-119.61711284318312,38.902987151835646"
                },
                {
                    "ecoregion": "Upper Batholith and Volcanic Flows",
                    "bbox": "-121.12486812676258,38.02476818320514,-119.63953560738236,39.8536662460005"
                },
                {
                    "ecoregion": "Upper Foothills Metamorphic Belt",
                    "bbox": "-121.1639416129151,37.468060675359936,-119.67924557702173,39.73211464357598"
                }
            ],
            "Fishlake National Forest": [
                {
                    "ecoregion": "Aquarius Plateau-Boulder Mountain",
                    "bbox": "-111.98914853107982,37.82079892772839,-111.25278486103247,38.27706656477022"
                },
                {
                    "ecoregion": "Canyon Mountain Range",
                    "bbox": "-112.31663532585958,39.18847754240471,-111.54742203040234,41.38820527185584"
                },
                {
                    "ecoregion": "Sevier Desert",
                    "bbox": "-113.06217245399552,38.67586055691925,-112.15093989735834,39.89857498774552"
                },
                {
                    "ecoregion": "Eastern Wasatch Mountain Zone",
                    "bbox": "-111.81534959670648,38.72388421388541,-111.00459607364985,39.986372631691665"
                },
                {
                    "ecoregion": "Semi-Arid Foothills",
                    "bbox": "-111.739621416695,39.014451738756804,-111.2978628569852,39.886405196342764"
                },
                {
                    "ecoregion": "North Basins and Slopes",
                    "bbox": "-112.30614444191241,38.09878803623894,-111.36709190636634,39.7956588957415"
                },
                {
                    "ecoregion": "Escalante",
                    "bbox": "-111.68069301856792,37.15507416344195,-110.74509108278721,38.05622830569183"
                },
                {
                    "ecoregion": "Fishlake Plateau",
                    "bbox": "-111.85615203129117,38.30859489363951,-111.28355086428093,38.92815957610361"
                },
                {
                    "ecoregion": "Mineral Mountains",
                    "bbox": "-113.19779987636315,37.82376860693569,-112.48896853976629,38.70466593468518"
                },
                {
                    "ecoregion": "Tushar Mountains",
                    "bbox": "-112.59059304523282,38.1064037678197,-112.0912430006639,38.70428077483797"
                },
                {
                    "ecoregion": "Stansbury Range",
                    "bbox": "-112.36969856503669,39.16584598260607,-112.13935841096185,39.5735939838753"
                },
                {
                    "ecoregion": "Monroe Mountain",
                    "bbox": "-112.18456821155371,38.16214565389885,-111.85456207577914,38.74945396133131"
                },
                {
                    "ecoregion": "John's Valley-Grass Valley",
                    "bbox": "-112.15890058009768,37.73573421556165,-111.77829890167294,38.68978658758101"
                },
                {
                    "ecoregion": "Mancos Shale Lowlands-Grand Valley",
                    "bbox": "-111.48442118458996,38.30667657766196,-107.5094741338242,39.701243283850545"
                },
                {
                    "ecoregion": "Awapa Plateau",
                    "bbox": "-111.95770540937713,38.06585286461808,-111.51225808963909,38.498590607270785"
                },
                {
                    "ecoregion": "Capital Reef-Waterpocket Fold",
                    "bbox": "-111.5269436400369,37.63037054666347,-110.91663767229073,38.59461015283631"
                },
                {
                    "ecoregion": "Pavant Range",
                    "bbox": "-112.5742733376444,38.592676777711176,-111.91247597298775,39.353628170603656"
                }
            ],
            "Flathead National Forest": [
                {
                    "ecoregion": "Salish Mountains",
                    "bbox": "-115.81185990800833,47.53666934431482,-114.18454622272998,48.99996261628178"
                },
                {
                    "ecoregion": "Flathead River Valley",
                    "bbox": "-115.33384774757548,47.027215963346066,-113.85058245211843,48.99976758390693"
                },
                {
                    "ecoregion": "Canadian Rockies-Whitefish-Swan Mountains",
                    "bbox": "-115.02773525317934,47.180441972419146,-113.00761452269205,48.99997730940538"
                },
                {
                    "ecoregion": "Mission-Swan Valley-Flathead River",
                    "bbox": "-114.56644999357229,48.38050017324446,-113.89963181555584,48.99997730940538"
                },
                {
                    "ecoregion": "Livingston Mountains",
                    "bbox": "-114.3951292283312,48.23873857772321,-113.3381250333436,48.999977929937586"
                },
                {
                    "ecoregion": "Middle Rocky Mountain Front",
                    "bbox": "-113.39201375213293,47.46129814839088,-112.59645274709658,48.44446661394312"
                },
                {
                    "ecoregion": "Flathead Thrust Faulted Mountains",
                    "bbox": "-113.49612903792473,47.279033068221565,-112.88599758002425,48.34319582622646"
                },
                {
                    "ecoregion": "Southern Rocky Mountain Front",
                    "bbox": "-113.1683245252566,47.16062673673457,-112.36868552731522,47.952387594412016"
                },
                {
                    "ecoregion": "Whitefish-Swan Mountains",
                    "bbox": "-113.46447267707237,46.944974822929794,-112.41350052103218,47.333445580948876"
                }
            ],
            "Francis Marion and Sumter National Forests": [
                {
                    "ecoregion": "Southern Blue Ridge Mountains",
                    "bbox": "-84.48033094111997,34.45017597174376,-80.93362685469555,36.826888572949315"
                },
                {
                    "ecoregion": "Water",
                    "bbox": "-97.78518055363958,24.53068882942597,-66.79803824267071,49.0053529188022"
                },
                {
                    "ecoregion": "Charlotte Belt-North",
                    "bbox": "-81.73654453620134,34.6940486320388,-77.14825716643503,38.835241394774584"
                },
                {
                    "ecoregion": "Carolina Slate",
                    "bbox": "-82.96654555933009,33.523917302241784,-79.8085638990047,35.15452637958879"
                },
                {
                    "ecoregion": "Lower Terraces",
                    "bbox": "-81.93484010019046,29.931375815241722,-77.11493366935332,34.89361096757216"
                },
                {
                    "ecoregion": "Lower Foot Hills",
                    "bbox": "-83.67397774507685,34.17794030929787,-82.2631888879568,35.1599164770638"
                },
                {
                    "ecoregion": "Charlotte Belt",
                    "bbox": "-83.09319844824972,33.67436857544942,-80.7294986188661,34.967812318183974"
                },
                {
                    "ecoregion": "Coastal Marsh and Island",
                    "bbox": "-81.73677006458678,30.111133876926942,-79.07751848678868,33.66336760323236"
                },
                {
                    "ecoregion": "Upper Terraces",
                    "bbox": "-82.67231040580054,29.805272009195903,-78.10745161639892,34.945224406980856"
                }
            ],
            "Fremont-Winema National Forests": [
                {
                    "ecoregion": "High Desert-Wetlands",
                    "bbox": "-120.82103886714998,40.83475527933274,-118.64428012762573,43.65060897782212"
                },
                {
                    "ecoregion": "Klamath Lake Basins and Juniper Foot",
                    "bbox": "-122.09772130009787,41.77571892908537,-120.86993638455647,42.76669473217618"
                },
                {
                    "ecoregion": "Medicine Lake Lava Flows",
                    "bbox": "-122.36841228519876,41.10303932070815,-121.15308190080907,42.4759183181759"
                },
                {
                    "ecoregion": "Fremont Pine-Fir Forest",
                    "bbox": "-121.86175284062108,41.779545929301264,-120.27859240991177,42.98015030908954"
                },
                {
                    "ecoregion": "Pumice Plateau Forest",
                    "bbox": "-122.12971260715108,42.38114683196079,-120.61913775740157,43.94147195876394"
                },
                {
                    "ecoregion": "Southern Oregon Cascades",
                    "bbox": "-123.12841323138548,42.080683631344584,-122.21723741927144,43.21238027063305"
                },
                {
                    "ecoregion": "Southern Oregon Cascade Highlands",
                    "bbox": "-122.35395221102567,42.23823813228404,-121.88308967075164,43.402764726111286"
                },
                {
                    "ecoregion": "High Lava Plains",
                    "bbox": "-121.30892279575039,40.47262246875198,-117.29109053180258,43.93081048511584"
                },
                {
                    "ecoregion": "Cold Wet Pumice Plateau Basins",
                    "bbox": "-121.90006897890021,42.7602683171292,-121.40053899887567,43.90924302204786"
                },
                {
                    "ecoregion": "Warner Mountains",
                    "bbox": "-120.4251816102431,41.10045144327955,-120.07243007758598,42.43449618505093"
                },
                {
                    "ecoregion": "Goose Lake Basin",
                    "bbox": "-120.57225412782572,41.64731564290264,-120.27345380335032,42.38859693629962"
                }
            ],
            "Gallatin National Forest": [
                {
                    "ecoregion": "West Yellowstone-Madison Valley",
                    "bbox": "-111.36673297884386,44.615478559987594,-110.93593829611547,44.86090334311484"
                },
                {
                    "ecoregion": "Island Park",
                    "bbox": "-111.73148796879468,44.05783178490901,-111.17906393904951,44.75513479043826"
                },
                {
                    "ecoregion": "Pitchstone Plateau",
                    "bbox": "-111.2424968209715,44.05967028335692,-110.00636076583663,44.90368477723075"
                },
                {
                    "ecoregion": "Central Montana Broad Valleys",
                    "bbox": "-110.00472123519683,44.92585515659027,-107.37874218810146,45.82414620728167"
                },
                {
                    "ecoregion": "Gravelly-Snowcrest Mountains",
                    "bbox": "-112.39022251955362,44.64143447991739,-111.46771144822475,45.39252758098314"
                },
                {
                    "ecoregion": "Absaroka-Gallatin Mountains",
                    "bbox": "-111.26391737079001,44.75971744780202,-110.16858968466619,45.64136544685795"
                },
                {
                    "ecoregion": "Central Montana Broad Valleys",
                    "bbox": "-111.07942838321327,45.13910794987203,-110.5035340301713,45.62909071716291"
                },
                {
                    "ecoregion": "Beartooth Front",
                    "bbox": "-110.26720162405564,45.03025879470766,-109.19809356426657,45.70362609756643"
                },
                {
                    "ecoregion": "Madison Mountains",
                    "bbox": "-111.62966299095422,44.710584783760794,-111.05487275627263,45.38669795064993"
                },
                {
                    "ecoregion": "Southern Beaverhead Mountains",
                    "bbox": "-113.23267857915306,43.95000249062252,-111.36324206157184,44.98445516187627"
                },
                {
                    "ecoregion": "Beartooth Mountains",
                    "bbox": "-110.26994900973898,44.776196251755664,-109.04026662720304,45.50287269631792"
                },
                {
                    "ecoregion": "North Absaroka Range",
                    "bbox": "-110.48582690518748,44.15648886037263,-109.3082340892318,45.17083450281012"
                },
                {
                    "ecoregion": "Central Montana Broad Valleys",
                    "bbox": "-112.39488142323904,45.51314664310314,-110.00305531395156,46.900463354899955"
                },
                {
                    "ecoregion": "Unglaciated Montana High Plains",
                    "bbox": "-110.25739102327708,45.51440887397041,-108.56526448326923,46.87669977167718"
                },
                {
                    "ecoregion": "Southwest Montana Intermontane Basins and Valleys",
                    "bbox": "-113.69148368842144,44.51275086875762,-111.44737811940468,46.060849421863395"
                },
                {
                    "ecoregion": "Crazy Mountains",
                    "bbox": "-110.72419093376453,45.74816931616107,-109.97586369585287,46.464612163820334"
                },
                {
                    "ecoregion": "Bridger Mountains and Foothills",
                    "bbox": "-111.4562015595543,45.66672697157253,-110.68468849707642,46.2358163363549"
                },
                {
                    "ecoregion": "Gallatin Foothills-Spanish Peaks",
                    "bbox": "-111.69452205195108,45.26313531214498,-110.58644892737607,45.65359817821343"
                },
                {
                    "ecoregion": "Falls River",
                    "bbox": "-111.27993630821402,43.967535911553114,-110.86191460297653,44.636218072106374"
                }
            ],
            "George Washington and Jefferson National Forest": [
                {
                    "ecoregion": "Southern Blue Ridge Mountains",
                    "bbox": "-84.48033094111997,34.45017597174376,-80.93362685469555,36.826888572949315"
                },
                {
                    "ecoregion": "Rolling Limestone Hills",
                    "bbox": "-85.3292042372857,34.97575813063327,-82.09264918930859,36.90537324158191"
                },
                {
                    "ecoregion": "Northern Piedmont",
                    "bbox": "-79.05967762722071,37.49038916812566,-77.47676050089638,39.57502564431809"
                },
                {
                    "ecoregion": "Great Valley of Virginia",
                    "bbox": "-83.30600283326413,35.828377445762555,-77.6883896446663,39.63817482700671"
                },
                {
                    "ecoregion": "Ridge and Valley",
                    "bbox": "-82.76085875073073,36.6081667271128,-78.28288738974123,39.40386939205882"
                },
                {
                    "ecoregion": "Northern High Allegheny Mountain",
                    "bbox": "-79.94179530890636,38.10329012334057,-79.06407126777475,39.404186353617376"
                },
                {
                    "ecoregion": "Lynchburg Belt",
                    "bbox": "-80.11728882322058,36.849338972415694,-77.55941256583719,38.58052085475367"
                },
                {
                    "ecoregion": "Northern Ridge and Valley",
                    "bbox": "-79.21141922341837,38.88493854168041,-75.22165990597983,41.7267650538642"
                },
                {
                    "ecoregion": "Pine and Cumberland Mountains",
                    "bbox": "-84.31436506399649,36.316142337399015,-82.28660453067454,37.30132812259484"
                },
                {
                    "ecoregion": "Central Blue Ridge Mountains",
                    "bbox": "-81.61773640920791,36.224861092165725,-79.8201512849538,37.2722826150507"
                },
                {
                    "ecoregion": "Black Mountains",
                    "bbox": "-84.29218772118634,36.34008261941739,-82.31784727083482,37.26150501374542"
                },
                {
                    "ecoregion": "Northern Blue Ridge Mountains",
                    "bbox": "-79.91401365190848,37.21648545304129,-77.04396080574656,40.13793696611816"
                },
                {
                    "ecoregion": "Eastern Allegheny Mountain and Valley",
                    "bbox": "-80.43361235322749,37.59990767519912,-79.7217625267192,38.62983071491561"
                },
                {
                    "ecoregion": "Western Coal Fields",
                    "bbox": "-83.18742567105784,36.94435293114293,-80.27350588119145,38.65453823734981"
                },
                {
                    "ecoregion": "Eastern Coal Fields",
                    "bbox": "-82.82469925037009,36.72878266139077,-80.41450471581993,38.46860681815019"
                }
            ],
            "Gifford Pinchot National Forest": [
                {
                    "ecoregion": "West Cascade Slope Forest",
                    "bbox": "-123.24044457915397,43.16430782994246,-121.04511434115386,47.53592981291058"
                },
                {
                    "ecoregion": "Western Cascades Highland Forest",
                    "bbox": "-122.99084123913184,42.862939303406165,-121.04186360402207,47.40690022086858"
                },
                {
                    "ecoregion": "Grand Fir Foothills",
                    "bbox": "-121.75977558687379,45.787419029864395,-120.90443559772461,47.215713508971305"
                },
                {
                    "ecoregion": "Cascade Crest Forest and Volcanic Peaks",
                    "bbox": "-122.23167682432597,43.351430882329396,-121.32923382588035,47.05299090100931"
                },
                {
                    "ecoregion": "Pine-Oak Foothills",
                    "bbox": "-121.72061641961204,45.14969033893806,-120.39442999794602,45.97821546657059"
                }
            ],
            "Gila National Forest": [
                {
                    "ecoregion": "Painted Desert Steppe Grassland",
                    "bbox": "-111.65818530620686,34.17957406179357,-108.36439818292979,36.333162035899306"
                },
                {
                    "ecoregion": "San Mateo Mountain Woodlands",
                    "bbox": "-109.39516069391084,34.020457391695345,-106.96955521130394,35.70667777805704"
                },
                {
                    "ecoregion": "White Mountains Coniferous Forest",
                    "bbox": "-110.94623726024133,33.178581809403056,-108.17858476197716,34.28800228207973"
                },
                {
                    "ecoregion": "White Mountains Woodland",
                    "bbox": "-109.77482369325878,33.052904392623645,-108.40291823618759,34.34915037968631"
                },
                {
                    "ecoregion": "Mogollon Mountains Woodland",
                    "bbox": "-109.32745842626531,32.38030504694041,-107.09551991111499,34.42818093140494"
                },
                {
                    "ecoregion": "San Francisco Peaks Coniferous Forest",
                    "bbox": "-108.339761910184,33.69135675091337,-107.234953846243,34.31097086101647"
                },
                {
                    "ecoregion": "Animas Valley Plains Desert Grass-Shrubland",
                    "bbox": "-109.48756013908911,31.343011286042042,-106.60466110792373,34.2958291807721"
                },
                {
                    "ecoregion": "Burro Mountains Oak-Juniper Woodland",
                    "bbox": "-109.15605139805353,32.811450592970516,-108.7599072151458,33.109534566966715"
                },
                {
                    "ecoregion": "Mogollon Mountains Coniferous Forest",
                    "bbox": "-108.8939982132469,32.79574863509151,-107.13092588372251,34.1336684548354"
                },
                {
                    "ecoregion": "Mangas High Plains Grassland",
                    "bbox": "-108.93923012457054,32.762655565901696,-108.40475916280508,33.22509651099523"
                }
            ],
            "Grand Mesa, Uncompahgre and Gunnison National Forests": [
                {
                    "ecoregion": "West Elks",
                    "bbox": "-107.59085408344913,38.44154149544369,-106.85538177105184,39.15790783777652"
                },
                {
                    "ecoregion": "Northeast Flank",
                    "bbox": "-108.46719714183462,38.17348204805813,-107.74603151344354,38.939286969618024"
                },
                {
                    "ecoregion": "Elk Mountains",
                    "bbox": "-107.2495591681211,38.69620013332957,-106.49513295292343,39.29558409832754"
                },
                {
                    "ecoregion": "Grand Mesa Break",
                    "bbox": "-108.03282094503055,38.79757116217945,-107.33047764502726,39.23940431705563"
                },
                {
                    "ecoregion": "North Uncompahgre Plateau",
                    "bbox": "-109.32101416597095,38.62931231960789,-108.39963441479637,39.22384477311783"
                },
                {
                    "ecoregion": "Sawatch Range",
                    "bbox": "-106.93768613830463,38.39095387222346,-106.10235331994971,39.59793988082089"
                },
                {
                    "ecoregion": "Monument Upwarp",
                    "bbox": "-110.49978326818325,35.58297452515427,-108.08933715098868,38.01346677087486"
                },
                {
                    "ecoregion": "Hills and Plateaus",
                    "bbox": "-108.02454138607607,38.029118019581006,-107.46470742290921,38.474090071000035"
                },
                {
                    "ecoregion": "San Juan Mountains - Weminuche Wilderness",
                    "bbox": "-107.97605245765476,37.38769806221586,-106.00804823743618,38.55266342807482"
                },
                {
                    "ecoregion": "San Juan Mountains West",
                    "bbox": "-108.33607200531878,37.26710803560741,-107.73839239139573,38.036034877207896"
                },
                {
                    "ecoregion": "Uncompahgre Plateau",
                    "bbox": "-108.83573463894243,38.20139565178795,-107.9629923877884,38.82031876060239"
                },
                {
                    "ecoregion": "Gunnison Basin-Black Canyon",
                    "bbox": "-107.89981530992856,38.107745223563256,-106.52211624936535,38.76772270843628"
                },
                {
                    "ecoregion": "South Uncompahgre Plateau",
                    "bbox": "-108.77002629957406,37.949732993782675,-107.92872798580788,38.54641483867391"
                },
                {
                    "ecoregion": "Divide and Plateau Creeks Uplands",
                    "bbox": "-108.30834411159145,39.12247602494864,-107.32574512823504,39.668265177695844"
                },
                {
                    "ecoregion": "Mancos Shale Lowlands-Grand Valley",
                    "bbox": "-111.48442118458996,38.30667657766196,-107.5094741338242,39.701243283850545"
                },
                {
                    "ecoregion": "Salt Anticline Benchlands",
                    "bbox": "-109.83440474288454,37.667302767708634,-108.21981387630933,38.87406890015967"
                },
                {
                    "ecoregion": "Grand Mesa",
                    "bbox": "-108.33438377728947,38.81770970863619,-107.53160335121368,39.24462350107376"
                },
                {
                    "ecoregion": "Grande Hogback",
                    "bbox": "-107.9871508282481,39.06965105485233,-107.07928472271175,40.12386122621467"
                }
            ],
            "Green Mountain and Finger Lakes National Forests": [
                {
                    "ecoregion": "Mahoosic Rangely Lakes",
                    "bbox": "-72.18423716111607,44.23282226613475,-70.0315993531276,45.192715104418596"
                },
                {
                    "ecoregion": "Cattaraugus Finger Lakes Moraine and Hills",
                    "bbox": "-78.9257675052661,42.31984951344435,-75.49898880778721,43.04265860790849"
                },
                {
                    "ecoregion": "Central Allegheny Plateau",
                    "bbox": "-77.73714016068982,41.251303820415046,-74.48533622968324,42.95525556219451"
                },
                {
                    "ecoregion": "Eastern Ontario Till Plain",
                    "bbox": "-78.09439128662854,42.492879497790625,-75.67906288674277,43.34923649067156"
                },
                {
                    "ecoregion": "Northern Green Mountain",
                    "bbox": "-73.07026273074041,43.70161570220296,-72.27158209713605,45.00600328232565"
                },
                {
                    "ecoregion": "Champlain Hills",
                    "bbox": "-73.16021977642151,44.08376631356458,-72.63891465918414,45.00765964737491"
                },
                {
                    "ecoregion": "Champlain Glacial Lake and Marine Plains",
                    "bbox": "-73.57455401575521,43.382776282799284,-72.94406168999495,45.00848753267354"
                },
                {
                    "ecoregion": "Berkshire-Vermont Upland",
                    "bbox": "-73.31005510485915,41.9942543436631,-72.50250223928686,43.870263395439395"
                },
                {
                    "ecoregion": "Taconic Mountains",
                    "bbox": "-73.55201432080423,41.93741084113748,-72.92095881889435,43.792890100897466"
                },
                {
                    "ecoregion": "Taconic Foothills",
                    "bbox": "-73.88805806772558,41.59722195432977,-73.12792502372082,43.80462160500315"
                },
                {
                    "ecoregion": "Southern Piedmont",
                    "bbox": "-72.83551138943903,42.44811241365704,-71.93833759170644,44.30234088372487"
                },
                {
                    "ecoregion": "Southern Green Mountain",
                    "bbox": "-73.18694428664946,42.68384753233778,-72.6953042585846,44.208532774667844"
                }
            ],
            "Helena National Forest": [
                {
                    "ecoregion": "Southern Rocky Mountain Front",
                    "bbox": "-113.1683245252566,47.16062673673457,-112.36868552731522,47.952387594412016"
                },
                {
                    "ecoregion": "Whitefish-Swan Mountains",
                    "bbox": "-113.46447267707237,46.944974822929794,-112.41350052103218,47.333445580948876"
                },
                {
                    "ecoregion": "Big Belt Foothills",
                    "bbox": "-112.1776113080154,46.60124227990735,-111.19819669721977,47.28013739522464"
                },
                {
                    "ecoregion": "Continental Divide Foothills",
                    "bbox": "-112.9804122368352,46.547142762728356,-112.22848272040119,47.169598397747905"
                },
                {
                    "ecoregion": "Continental Divide Foothills",
                    "bbox": "-112.53875082009426,46.663246756932324,-112.05773022327116,47.182972050419835"
                },
                {
                    "ecoregion": "Little Belt-Snown-Judith Mountains",
                    "bbox": "-111.42257761066816,46.37622334243338,-108.85770146125338,47.3494310608948"
                },
                {
                    "ecoregion": "Central Montana Broad Valleys",
                    "bbox": "-112.39488142323904,45.51314664310314,-110.00305531395156,46.900463354899955"
                },
                {
                    "ecoregion": "Big Belt Mountains",
                    "bbox": "-111.89430560631865,46.18556201177745,-111.0257942561999,46.9385890437494"
                },
                {
                    "ecoregion": "Boulder-Elkhorn Mountains",
                    "bbox": "-112.75165901924828,45.44834529609858,-111.59437046782278,46.66750657476865"
                },
                {
                    "ecoregion": "Bridger Mountains and Foothills",
                    "bbox": "-111.4562015595543,45.66672697157253,-110.68468849707642,46.2358163363549"
                }
            ],
            "Hiawatha National Forest": [
                {
                    "ecoregion": "Grand Marais Glaciofluvial - Moraine Complex",
                    "bbox": "-86.86336470881423,46.00316865590878,-84.63047195811436,46.77288550696062"
                },
                {
                    "ecoregion": "Suomi Till and Outwash Plain",
                    "bbox": "-88.78248199574745,46.08016519207001,-86.57049449772285,46.676131719803095"
                },
                {
                    "ecoregion": "Seney Lake Plain",
                    "bbox": "-86.91199451783268,45.91029318788037,-84.61797594573329,46.52452821810283"
                },
                {
                    "ecoregion": "St. Ignace Lake Plain",
                    "bbox": "-86.23631707067625,45.44923248629027,-81.52185249309804,46.3748281791772"
                },
                {
                    "ecoregion": "Rudyard Silty Lake Plain",
                    "bbox": "-84.80891864907636,46.06224630012673,-84.02644040739887,46.536321841979486"
                },
                {
                    "ecoregion": "West Green Bay Till Plain",
                    "bbox": "-88.98734401991055,44.48439140004314,-86.86468965660231,46.40692624564974"
                },
                {
                    "ecoregion": "Green Bay Sandy Lake Plain",
                    "bbox": "-87.98161496815624,44.78909405424724,-86.8313446729183,46.33982769559174"
                },
                {
                    "ecoregion": "Escanaba Lake Plain and Thin Till",
                    "bbox": "-87.00600919576772,45.600064254561744,-86.14676684411455,46.047916535919455"
                },
                {
                    "ecoregion": "Presque Isle Lake and Till Plains",
                    "bbox": "-84.84854815637226,44.44538893874858,-83.28529135930876,45.66764014767472"
                },
                {
                    "ecoregion": "Water",
                    "bbox": "-97.78518055363958,24.53068882942597,-66.79803824267071,49.0053529188022"
                }
            ],
            "Hoosier National Forest": [
                {
                    "ecoregion": "Mitchell Karst Plains",
                    "bbox": "-86.86629079878128,37.41296249522304,-85.35398590522533,39.60894202305599"
                },
                {
                    "ecoregion": "Brown County Hills",
                    "bbox": "-86.64610794312705,38.77523569876854,-86.02187389696275,39.58461806687035"
                },
                {
                    "ecoregion": "Crawford Uplands",
                    "bbox": "-87.03810280070365,37.83804816019449,-86.27660515420445,39.72634672921822"
                },
                {
                    "ecoregion": "Crawford Escarpment",
                    "bbox": "-86.94385649068448,38.14540798099358,-86.16591300308261,39.678633867159306"
                },
                {
                    "ecoregion": "Scottsburg Lowland",
                    "bbox": "-86.2293329140827,38.24855193962037,-85.58871006991376,39.533501013660896"
                }
            ],
            "Humboldt-Toiyabe National Forest": [
                {
                    "ecoregion": "Owyhee Basalt Plain",
                    "bbox": "-118.15829761134563,41.33612318943369,-116.16215305302097,43.268356529929974"
                },
                {
                    "ecoregion": "Stillwater-Northwestern Nevada Ranges",
                    "bbox": "-119.6983257257516,38.28155445337535,-117.02753034764737,41.00610738864515"
                },
                {
                    "ecoregion": "East Great Basin Ranges and Mountains",
                    "bbox": "-116.18454426000955,37.8348402128056,-114.04162823755308,40.744354967707636"
                },
                {
                    "ecoregion": "Carson Range",
                    "bbox": "-120.02850523912548,38.76392902810221,-119.79679046141064,39.50135490990124"
                },
                {
                    "ecoregion": "East Great Basin Valleys",
                    "bbox": "-116.05384075714517,37.820321392218545,-114.09322405744427,41.438293874762564"
                },
                {
                    "ecoregion": "Virginia Range",
                    "bbox": "-119.79615939184242,39.17242276339988,-119.25122361927458,39.56936776111331"
                },
                {
                    "ecoregion": "Tahoe-Truckee",
                    "bbox": "-120.40884082704252,39.04166096288316,-119.8634684641982,39.791810899953134"
                },
                {
                    "ecoregion": "Northern Ruby Mountains",
                    "bbox": "-115.66114123577938,40.24947722829148,-114.98742830637121,41.08769528580882"
                },
                {
                    "ecoregion": "High Lava Plains",
                    "bbox": "-121.30892279575039,40.47262246875198,-117.29109053180258,43.93081048511584"
                },
                {
                    "ecoregion": "Amargosa Desert-Pahrump Valley",
                    "bbox": "-117.04772606580525,35.642852231445374,-115.48053175893347,36.97744631509539"
                },
                {
                    "ecoregion": "Schell Creek and Deep Creek Ranges",
                    "bbox": "-114.81762802671204,37.808611732645375,-113.75048175343017,40.32036672744255"
                },
                {
                    "ecoregion": "Antelope-Mason Valleys and Hills",
                    "bbox": "-119.57673863517982,38.323794059448346,-118.71365703634314,38.777062978173944"
                },
                {
                    "ecoregion": "West Great Basin Ranges",
                    "bbox": "-118.16355825860671,38.568721343015625,-115.99799612082427,40.75239725133213"
                },
                {
                    "ecoregion": "Glaciated Batholith and Volcanic Flows",
                    "bbox": "-120.34993133536278,38.19669883358438,-119.4588061726667,39.06450528519082"
                },
                {
                    "ecoregion": "Carson Valley-Truckee Meadows",
                    "bbox": "-119.8735385922322,38.734680118192955,-119.5856089992559,39.223391171265575"
                },
                {
                    "ecoregion": "Pine Nut Mountains",
                    "bbox": "-119.80089153002007,38.461665977403015,-119.3524466107225,39.237429637867535"
                },
                {
                    "ecoregion": "West Great Basin Valleys",
                    "bbox": "-117.86655309784715,38.71087402761435,-116.05778511259285,40.728958686694114"
                },
                {
                    "ecoregion": "Tuscarora-Independence-Bull Run Mountains",
                    "bbox": "-117.64270523505854,40.682998711221614,-115.89916854918914,41.819851091854446"
                },
                {
                    "ecoregion": "Jarbridge Mountains and Foothills",
                    "bbox": "-116.20670670465068,40.64333093777259,-114.5093959012998,42.19005156942444"
                },
                {
                    "ecoregion": "Green River Basin",
                    "bbox": "-115.91114437481303,40.943582780620886,-115.00315055115698,41.81351741579613"
                },
                {
                    "ecoregion": "Owyhee Tablelands",
                    "bbox": "-116.70670644284803,41.72750236664098,-115.71221610359026,42.74668689678293"
                },
                {
                    "ecoregion": "Northwestern Nevada Basins",
                    "bbox": "-119.44956498483617,38.17502106956675,-116.36322008114178,41.92611129400109"
                },
                {
                    "ecoregion": "Toquima-Monitor-Antelope Ranges",
                    "bbox": "-117.06752178620144,38.559611403143776,-116.132567541259,39.427351971316455"
                },
                {
                    "ecoregion": "Gabbs Range-Ione Valley",
                    "bbox": "-118.4374651923647,37.856494130399824,-117.24036163408209,39.06910638135446"
                },
                {
                    "ecoregion": "Spring Mountains",
                    "bbox": "-116.36230297410293,35.80021841704638,-115.29965619967385,36.674000143292005"
                },
                {
                    "ecoregion": "Fort Sage Mountains-Lemmon Valley",
                    "bbox": "-120.12644448562446,39.17411374335461,-119.3162178618648,40.114334437084665"
                },
                {
                    "ecoregion": "East Great Basin Hills",
                    "bbox": "-116.09061353468684,39.08424658671066,-113.90660764982317,41.549956165944366"
                },
                {
                    "ecoregion": "South Central Nevada Ranges",
                    "bbox": "-117.79176844965417,36.94936853473013,-115.55131065586204,39.14344007889656"
                },
                {
                    "ecoregion": "Mount Moriah Range",
                    "bbox": "-114.39563727244212,39.12718390661206,-114.07822129277838,39.56689623077648"
                },
                {
                    "ecoregion": "Eastern Slopes",
                    "bbox": "-119.985234748285,34.81669572742595,-117.86965224705352,38.826133886669595"
                },
                {
                    "ecoregion": "Wassuk Range",
                    "bbox": "-119.02194642968396,38.30842606571042,-118.59377814504535,39.072216465417625"
                },
                {
                    "ecoregion": "Sweetwater Mountains-Pine Grove Hills",
                    "bbox": "-119.48344273229623,38.04631671644336,-118.95729957811301,38.74999103735655"
                },
                {
                    "ecoregion": "Kingston Range-Valley Wells",
                    "bbox": "-116.13150153706624,34.98139239134582,-115.4150467796851,35.92144350171628"
                },
                {
                    "ecoregion": "Hualapai Mountains Coniferous Forest",
                    "bbox": "-116.87770557185462,35.466267923126225,-114.04573225144219,37.38277411843086"
                },
                {
                    "ecoregion": "Glaciated Batholith",
                    "bbox": "-119.9555332329723,36.28050017404382,-118.10432225726635,38.30331992557416"
                },
                {
                    "ecoregion": "Bodie Hills-Excelsior Mountains",
                    "bbox": "-119.23958888042245,37.84258256623252,-118.13319265871422,38.4381976559971"
                },
                {
                    "ecoregion": "Sevier Lake-Western Utah Mountains and Valleys",
                    "bbox": "-114.27912288161565,38.08562291116846,-112.84139963498512,39.91059959079854"
                },
                {
                    "ecoregion": "Mono Valley",
                    "bbox": "-119.17791640431858,37.880457246205026,-118.72907789223092,38.191301022624145"
                },
                {
                    "ecoregion": "Southern Snake Range",
                    "bbox": "-114.41730388126905,38.60434684103393,-114.07420196894566,39.15409002683333"
                },
                {
                    "ecoregion": "South Central Nevada Valleys",
                    "bbox": "-117.84057433693607,37.02633912185303,-114.12432246990602,39.1205964238859"
                }
            ],
            "Huron-Manistee National Forest": [
                {
                    "ecoregion": "Valders Red Till and Sandy Lake Plain",
                    "bbox": "-85.08347701305365,44.667673908424206,-83.26102888437549,45.789355567905204"
                },
                {
                    "ecoregion": "Iona Moraines",
                    "bbox": "-85.7912139268812,42.35453257861565,-83.4018410746059,43.60863780858807"
                },
                {
                    "ecoregion": "Southeast Lake Michigan Plains and Dunes",
                    "bbox": "-87.64217267063219,41.48889758955215,-85.77394044689407,43.42926083012327"
                },
                {
                    "ecoregion": "Kalkaska Sandy Moraines",
                    "bbox": "-86.00063936561418,44.2674940097408,-84.51446698466356,45.09938628994536"
                },
                {
                    "ecoregion": "Alcona Gravelly Ice Contact",
                    "bbox": "-84.27735677289672,44.492968462824365,-83.46725779081436,45.03396262557476"
                },
                {
                    "ecoregion": "Kirtland's Warbler High Sand Plains",
                    "bbox": "-85.21347177730064,43.80831530141006,-83.31812663873336,44.97261115078402"
                },
                {
                    "ecoregion": "Oceana Sandy Lake Plains and Dunes",
                    "bbox": "-86.54121814140404,43.29589964805035,-85.7751131151781,44.96822307163751"
                },
                {
                    "ecoregion": "Grand Traverse Ground Moraine",
                    "bbox": "-86.10190387336502,44.30605461702703,-85.58824215175389,44.833838541115824"
                },
                {
                    "ecoregion": "Clare Moraines",
                    "bbox": "-84.95842296494783,43.57621607701037,-83.82219003823963,44.52436940902106"
                },
                {
                    "ecoregion": "Grand Traverse Drumlin Fields",
                    "bbox": "-86.15618923634412,44.65435390121161,-84.78980401044669,45.8294790925861"
                },
                {
                    "ecoregion": "Presque Isle Lake and Till Plains",
                    "bbox": "-84.84854815637226,44.44538893874858,-83.28529135930876,45.66764014767472"
                },
                {
                    "ecoregion": "Kalamazoo-Elkhart Moraines and Plains",
                    "bbox": "-87.09061026155427,41.287524023914614,-84.67475587698209,42.79602680869033"
                },
                {
                    "ecoregion": "Gladwin Silty Lake Plain",
                    "bbox": "-84.77704463070512,43.4527877468571,-83.61578724338654,44.47726995294602"
                },
                {
                    "ecoregion": "Interlobate End and Ground Moraines",
                    "bbox": "-85.78958849491306,43.278466313569595,-84.83606042314995,44.51894178373641"
                },
                {
                    "ecoregion": "Saginaw Clay Lake and Till Plain",
                    "bbox": "-84.693163239292,43.04833229579884,-83.52634946535551,44.29593897160629"
                },
                {
                    "ecoregion": "Manistee Sandy Outwash Plain",
                    "bbox": "-86.32987740122104,43.29315000596807,-85.41587134528629,44.382159404333095"
                },
                {
                    "ecoregion": "Southeast Lake Michigan Moraines",
                    "bbox": "-87.09952816199507,41.49760629239654,-85.61628896396445,43.37553438410458"
                },
                {
                    "ecoregion": "Water",
                    "bbox": "-97.78518055363958,24.53068882942597,-66.79803824267071,49.0053529188022"
                }
            ],
            "Idaho Panhandle National Forests": [
                {
                    "ecoregion": "Western Selkirk Maritime Forest",
                    "bbox": "-118.12699918066761,47.76119291901807,-116.79149102069402,48.9998379216828"
                },
                {
                    "ecoregion": "Selkirk Mountains",
                    "bbox": "-116.96563743691814,48.30117486962456,-116.40631157092224,48.999949163323265"
                },
                {
                    "ecoregion": "Inland Maritime Foothills and Valley",
                    "bbox": "-117.48996446238999,47.89209803189868,-116.15185879594662,48.999952045650446"
                },
                {
                    "ecoregion": "Purcell-North Cabinet Mountains",
                    "bbox": "-116.45594571402347,47.90519444516758,-115.48745062834377,48.99995968808918"
                },
                {
                    "ecoregion": "Spokane Valley Outwash Plains",
                    "bbox": "-117.68247701600143,47.5355283006906,-116.56120120796936,48.15253950569371"
                },
                {
                    "ecoregion": "Coeur d'Alene Mountains",
                    "bbox": "-116.78563277483266,47.38540416756831,-115.38865673721864,48.144320516978325"
                },
                {
                    "ecoregion": "Northern Idaho Hills and Low Mountain",
                    "bbox": "-117.34550404277729,46.59623291671579,-116.02313702475385,47.698731214074314"
                },
                {
                    "ecoregion": "St. Joe-Bitterroot Mountains",
                    "bbox": "-116.52180029574703,46.696658283253214,-114.6351470462991,47.4975697796217"
                },
                {
                    "ecoregion": "North Idaho Hills and Valleys",
                    "bbox": "-116.67085329224562,46.37557971922871,-115.49933188036198,47.43143719676925"
                },
                {
                    "ecoregion": "Clearwater Mountains and Breaks",
                    "bbox": "-115.88299624138341,46.14795781100423,-114.56297690356121,47.01787693916947"
                }
            ],
            "Inyo National Forest": [
                {
                    "ecoregion": "Gabbs Range-Ione Valley",
                    "bbox": "-118.4374651923647,37.856494130399824,-117.24036163408209,39.06910638135446"
                },
                {
                    "ecoregion": "Eastern Slopes",
                    "bbox": "-119.985234748285,34.81669572742595,-117.86965224705352,38.826133886669595"
                },
                {
                    "ecoregion": "Glaciated Batholith",
                    "bbox": "-119.9555332329723,36.28050017404382,-118.10432225726635,38.30331992557416"
                },
                {
                    "ecoregion": "Bodie Hills-Excelsior Mountains",
                    "bbox": "-119.23958888042245,37.84258256623252,-118.13319265871422,38.4381976559971"
                },
                {
                    "ecoregion": "Upper Batholith",
                    "bbox": "-119.81006914477518,36.00687921480397,-118.34251500006718,37.994568891341316"
                },
                {
                    "ecoregion": "Mono Valley",
                    "bbox": "-119.17791640431858,37.880457246205026,-118.72907789223092,38.191301022624145"
                },
                {
                    "ecoregion": "Lower Batholith",
                    "bbox": "-119.91834361786363,35.55244632333921,-118.32090949567663,37.76014349492641"
                },
                {
                    "ecoregion": "Crowley Flowlands",
                    "bbox": "-119.09390020363145,37.40725411328674,-118.36600638278833,37.98724924535645"
                },
                {
                    "ecoregion": "Glass Mountain",
                    "bbox": "-119.05657525944065,37.619008108137734,-118.6197818099825,37.90027629501503"
                },
                {
                    "ecoregion": "Inyo Mountains",
                    "bbox": "-118.2222285890781,36.35012401770928,-117.68133901658234,37.4292482605988"
                },
                {
                    "ecoregion": "Owens Valley",
                    "bbox": "-118.37110319335767,35.930431192245806,-117.796891438589,37.09294671312034"
                },
                {
                    "ecoregion": "Benton-Upper Owens Valleys",
                    "bbox": "-118.65394290594031,37.06570492094539,-118.1414490969982,37.957228800768576"
                },
                {
                    "ecoregion": "White Mountains",
                    "bbox": "-118.42758776296483,37.22529913105012,-117.87650823226909,37.965643034098775"
                },
                {
                    "ecoregion": "Silver Peak Range-Fish Lake Valley",
                    "bbox": "-118.23739293583526,37.260132079032246,-117.43330934534998,37.99665650199603"
                },
                {
                    "ecoregion": "Kern Plateau",
                    "bbox": "-118.48534976737784,35.55527172341135,-117.98274778418283,36.427438187222606"
                }
            ],
            "Kaibab National Forest": [
                {
                    "ecoregion": "Coconino Plateau Coniferous Forest",
                    "bbox": "-112.18227945942948,34.08602751605707,-109.57939825442588,35.48587649910121"
                },
                {
                    "ecoregion": "Chino High Plains Grassland",
                    "bbox": "-112.80464686825832,34.64240852683213,-112.17865881944891,35.144672593365556"
                },
                {
                    "ecoregion": "Kaibab Uplift",
                    "bbox": "-112.33948944358292,36.68801931763744,-111.97542991735679,37.18990550343631"
                },
                {
                    "ecoregion": "Grand Canyon Shrub- Woodland",
                    "bbox": "-113.95237261540382,35.71379274733749,-111.46124271018289,36.93776259037128"
                },
                {
                    "ecoregion": "Kaibab Plateau Montane Conifer Forest",
                    "bbox": "-112.31912601535328,36.26257692668389,-111.88949612104909,36.83622880491549"
                },
                {
                    "ecoregion": "Kaibab Coniferous Forest",
                    "bbox": "-112.17800308237634,35.840949479634844,-111.68381303744167,36.04360374641584"
                },
                {
                    "ecoregion": "Coconino Plateau Woodland",
                    "bbox": "-112.70976226171899,34.204964363014994,-109.55669791987305,35.56199294341968"
                },
                {
                    "ecoregion": "Mazatzal Mountains Woodland",
                    "bbox": "-113.06679922760225,32.970238309950105,-109.53321247357678,35.124233554634884"
                },
                {
                    "ecoregion": "Cold Desert-Great Basin Sagebrush",
                    "bbox": "-113.45398777631482,36.531865046734595,-111.9224086477409,37.56952914035759"
                },
                {
                    "ecoregion": "Shinarump Steppe",
                    "bbox": "-112.07062379625114,36.72290681579699,-110.94038842218788,37.899517983967826"
                },
                {
                    "ecoregion": "Kaibab Plateau Spruce-Fir Forest",
                    "bbox": "-112.24308252403921,36.235283742750596,-111.94071784005627,36.68271258821545"
                },
                {
                    "ecoregion": "Vermilion Cliffs Woodland",
                    "bbox": "-112.5750556183221,36.00580856291492,-109.8110983381178,36.981853993167306"
                },
                {
                    "ecoregion": "Kaibab Woodland",
                    "bbox": "-112.60547863003472,35.41653751209657,-111.36500901625305,36.30985555918676"
                },
                {
                    "ecoregion": "Aubrey High Plains Grassland",
                    "bbox": "-113.61599705282168,35.13091791682842,-112.05848834276276,36.17540696995576"
                }
            ],
            "Kisatchie National Forest": [
                {
                    "ecoregion": "Piney Woods Transition",
                    "bbox": "-95.22090271059159,30.948893068860116,-93.07941595368328,31.87395966810425"
                },
                {
                    "ecoregion": "Red River Alluvial Plain",
                    "bbox": "-92.5490095912196,30.47788459020171,-91.62924357183334,31.416689471342067"
                },
                {
                    "ecoregion": "Southern Loam Hills",
                    "bbox": "-96.03224096115139,30.132117972266656,-91.83465821770255,32.4320310077249"
                },
                {
                    "ecoregion": "Southwest Flatwoods",
                    "bbox": "-95.87822317635846,29.714536873677844,-92.42936492475144,31.048770598084673"
                },
                {
                    "ecoregion": "South Central Arkansas",
                    "bbox": "-94.76811249919245,31.518043580347012,-91.7080745549967,34.71911718101313"
                },
                {
                    "ecoregion": "Red River Alluvial Plain",
                    "bbox": "-93.3968617683559,31.243456499218098,-92.49652024271501,32.08547065624583"
                },
                {
                    "ecoregion": "South Central Arkansas Flatwoods",
                    "bbox": "-93.72730823558658,32.34603541180485,-92.0093294297094,33.875887861835395"
                }
            ],
            "Klamath National Forest": [
                {
                    "ecoregion": "High Cascade",
                    "bbox": "-122.4244327794492,41.24825360242187,-121.6873695348761,42.04308191090149"
                },
                {
                    "ecoregion": "Shasta Valley",
                    "bbox": "-122.609933401805,41.36778501996275,-122.18515666384894,41.84429061901693"
                },
                {
                    "ecoregion": "Siskiyou Mountains",
                    "bbox": "-123.85303326277483,41.48730379663294,-123.30080101795261,42.02318113889851"
                },
                {
                    "ecoregion": "Medicine Lake Lava Flows",
                    "bbox": "-122.36841228519876,41.10303932070815,-121.15308190080907,42.4759183181759"
                },
                {
                    "ecoregion": "Lower Salmon Mountains",
                    "bbox": "-123.58520947913411,41.16304987844916,-123.15262276772654,41.992836541773045"
                },
                {
                    "ecoregion": "Klamath River Ridges",
                    "bbox": "-123.28988760372988,41.30500014184315,-122.43311821503357,42.08816283504683"
                },
                {
                    "ecoregion": "Old Cascades",
                    "bbox": "-122.58877025774115,41.56080532270755,-122.0368252500852,42.11970994985438"
                },
                {
                    "ecoregion": "Upper Salmon Mountains",
                    "bbox": "-123.45720944086298,41.091177593870896,-122.88581601839451,41.789249876780445"
                },
                {
                    "ecoregion": "Inland Siskiyous",
                    "bbox": "-123.92499811636992,41.882480382763504,-122.60459735268563,43.20887599842865"
                },
                {
                    "ecoregion": "Siskiyou Serpentine",
                    "bbox": "-124.06790055766459,40.79954846788752,-123.26042889367847,42.561917839636635"
                },
                {
                    "ecoregion": "Forks of Salmon",
                    "bbox": "-123.43851669758749,41.04442791921315,-122.96279435767343,41.45791075058071"
                },
                {
                    "ecoregion": "North Trinity Mountain",
                    "bbox": "-123.58893554214154,40.78006444172064,-123.1642838980834,41.30312349865062"
                },
                {
                    "ecoregion": "Scott Valley",
                    "bbox": "-122.99464083610565,41.28783533593207,-122.51910013586257,41.74936641802583"
                },
                {
                    "ecoregion": "Upper Scott Mountains",
                    "bbox": "-123.17693965074426,40.77553349627391,-122.29002761488249,41.48533515639241"
                },
                {
                    "ecoregion": "Medicine Lake Highlands",
                    "bbox": "-121.92495843238572,41.42335920316475,-121.41651398822995,41.71739809404687"
                }
            ],
            "Kootenai National Forest": [
                {
                    "ecoregion": "Purcell-North Cabinet Mountains",
                    "bbox": "-116.45594571402347,47.90519444516758,-115.48745062834377,48.99995968808918"
                },
                {
                    "ecoregion": "Salish Mountains",
                    "bbox": "-115.81185990800833,47.53666934431482,-114.18454622272998,48.99996261628178"
                },
                {
                    "ecoregion": "Flathead River Valley",
                    "bbox": "-115.33384774757548,47.027215963346066,-113.85058245211843,48.99976758390693"
                },
                {
                    "ecoregion": "Canadian Rockies-Whitefish-Swan Mountains",
                    "bbox": "-115.02773525317934,47.180441972419146,-113.00761452269205,48.99997730940538"
                },
                {
                    "ecoregion": "Coeur d'Alene Mountains",
                    "bbox": "-116.78563277483266,47.38540416756831,-115.38865673721864,48.144320516978325"
                },
                {
                    "ecoregion": "Clark Fork Valley and Mountains",
                    "bbox": "-115.7375468013438,46.6315316280822,-114.05021000558725,47.93894055796045"
                }
            ],
            "Lake Tahoe Basin Management Unit": [
                {
                    "ecoregion": "Carson Range",
                    "bbox": "-120.02850523912548,38.76392902810221,-119.79679046141064,39.50135490990124"
                },
                {
                    "ecoregion": "Tahoe-Truckee",
                    "bbox": "-120.40884082704252,39.04166096288316,-119.8634684641982,39.791810899953134"
                },
                {
                    "ecoregion": "Tahoe Valley",
                    "bbox": "-120.16182665407678,38.789259993853705,-119.90905486668873,39.247091509665495"
                },
                {
                    "ecoregion": "Glaciated Batholith and Volcanic Flows",
                    "bbox": "-120.34993133536278,38.19669883358438,-119.4588061726667,39.06450528519082"
                },
                {
                    "ecoregion": "Upper Batholith and Volcanic Flows",
                    "bbox": "-121.12486812676258,38.02476818320514,-119.63953560738236,39.8536662460005"
                },
                {
                    "ecoregion": "Eastern Slopes",
                    "bbox": "-119.985234748285,34.81669572742595,-117.86965224705352,38.826133886669595"
                }
            ],
            "Land Between the Lakes": [
                {
                    "ecoregion": "Western Pennyroyal Karst Plain",
                    "bbox": "-88.37309172000681,34.854257096188064,-86.67356546017783,37.291470426119304"
                }
            ],
            "Lassen National Forest": [
                {
                    "ecoregion": "Medicine Lake Lava Flows",
                    "bbox": "-122.36841228519876,41.10303932070815,-121.15308190080907,42.4759183181759"
                },
                {
                    "ecoregion": "Shingletown-Paradise",
                    "bbox": "-122.08861115967727,39.72660965591092,-121.27201036158885,40.9954657882156"
                },
                {
                    "ecoregion": "Big Valley Mountains",
                    "bbox": "-121.54003588115097,40.8012015710957,-120.84077316474975,41.35230011885545"
                },
                {
                    "ecoregion": "Big Valley",
                    "bbox": "-121.51826625588296,41.026779063103334,-120.90934651393042,41.72099794439964"
                },
                {
                    "ecoregion": "Hat Creek Rim",
                    "bbox": "-122.21179909655103,40.595673018894786,-121.24937662902818,41.397670407963005"
                },
                {
                    "ecoregion": "Honey Lake Basin-Pyramid Lake Basin",
                    "bbox": "-120.70335340523542,39.58029372177788,-119.17439294687694,40.91824390533202"
                },
                {
                    "ecoregion": "Fredonyer Butte-Grizzly Peak",
                    "bbox": "-121.09133477737805,39.92541580279709,-120.65674345464669,40.425303133832585"
                },
                {
                    "ecoregion": "Diamond Mountains-Crystal Peak",
                    "bbox": "-120.80163112597563,39.85765915494608,-120.01987724773676,40.360433798980694"
                },
                {
                    "ecoregion": "Greenville-Graeagle",
                    "bbox": "-121.3539572528249,39.68988456402144,-120.50761085555649,40.20835520792656"
                },
                {
                    "ecoregion": "Granitic and Metamorphic Foothills",
                    "bbox": "-121.61184330572394,39.11628828187878,-120.78704689409886,40.063520433821"
                },
                {
                    "ecoregion": "Bucks Lake",
                    "bbox": "-121.51008386777625,39.77110939408334,-120.88366844764073,40.040173807775034"
                },
                {
                    "ecoregion": "Tehama Terraces",
                    "bbox": "-122.65548579193569,39.53297322493444,-122.11678953101199,40.73456577888766"
                },
                {
                    "ecoregion": "Tuscan Flows",
                    "bbox": "-122.22978627581597,39.608721863623146,-121.57772076010497,40.70438213792539"
                },
                {
                    "ecoregion": "Lassen-Almanor",
                    "bbox": "-121.71951627085917,40.01789379656151,-120.9301136163503,40.841833174061776"
                },
                {
                    "ecoregion": "Blacks Mountain-Susanville Peak",
                    "bbox": "-121.39211324343142,40.365785140172136,-120.58527067859893,40.88040620997867"
                },
                {
                    "ecoregion": "Eagle Lake-Observation Peak",
                    "bbox": "-120.9031513568496,40.40070231236189,-120.1150984561288,40.9665659771382"
                }
            ],
            "Lewis and Clark National Forest": [
                {
                    "ecoregion": "Rocky Mountain Front Foothills",
                    "bbox": "-113.44221910502762,47.01001916315391,-111.71710941636644,48.998904103441646"
                },
                {
                    "ecoregion": "Montana Glaciated Plains",
                    "bbox": "-113.06814841931407,47.15998540680113,-109.52443828300034,48.998915198377745"
                },
                {
                    "ecoregion": "Middle Rocky Mountain Front",
                    "bbox": "-113.39201375213293,47.46129814839088,-112.59645274709658,48.44446661394312"
                },
                {
                    "ecoregion": "Flathead Thrust Faulted Mountains",
                    "bbox": "-113.49612903792473,47.279033068221565,-112.88599758002425,48.34319582622646"
                },
                {
                    "ecoregion": "Southern Rocky Mountain Front",
                    "bbox": "-113.1683245252566,47.16062673673457,-112.36868552731522,47.952387594412016"
                },
                {
                    "ecoregion": "Whitefish-Swan Mountains",
                    "bbox": "-113.46447267707237,46.944974822929794,-112.41350052103218,47.333445580948876"
                },
                {
                    "ecoregion": "Western Igneous-Core Mountains Non-Calcareous Foothills",
                    "bbox": "-110.85491370100647,47.36100800931223,-110.20700793466841,47.64466951698466"
                },
                {
                    "ecoregion": "Unglaciated Montana High Plains",
                    "bbox": "-111.5597324218138,47.11568975088136,-110.53245395098901,47.50341955386938"
                },
                {
                    "ecoregion": "Continental Divide Foothills",
                    "bbox": "-112.9804122368352,46.547142762728356,-112.22848272040119,47.169598397747905"
                },
                {
                    "ecoregion": "Judith Basin Grassland",
                    "bbox": "-110.75895812241936,46.811677746330986,-109.38060496244901,47.50908180508128"
                },
                {
                    "ecoregion": "Little Belt-Snown-Judith Mountains",
                    "bbox": "-111.42257761066816,46.37622334243338,-108.85770146125338,47.3494310608948"
                },
                {
                    "ecoregion": "Central Montana Broad Valleys",
                    "bbox": "-112.39488142323904,45.51314664310314,-110.00305531395156,46.900463354899955"
                },
                {
                    "ecoregion": "Snowy Foothills",
                    "bbox": "-110.4297558780313,46.070180257712764,-108.56817772642091,47.392023953942385"
                },
                {
                    "ecoregion": "Unglaciated Montana High Plains",
                    "bbox": "-110.25739102327708,45.51440887397041,-108.56526448326923,46.87669977167718"
                },
                {
                    "ecoregion": "Crazy Mountains",
                    "bbox": "-110.72419093376453,45.74816931616107,-109.97586369585287,46.464612163820334"
                }
            ],
            "Lincoln National Forest": [
                {
                    "ecoregion": "Chupadera High Plains Grassland",
                    "bbox": "-106.28379031876818,33.39321343515195,-103.99867045108044,35.75518623795455"
                },
                {
                    "ecoregion": "Sacramento Mountains Woodland",
                    "bbox": "-106.10702548773605,32.49979125196478,-105.10430453332754,34.51228557232133"
                },
                {
                    "ecoregion": "Sacramento Mountains Coniferous Forest",
                    "bbox": "-105.93973567815897,32.599405929140346,-105.21769985676292,33.83867875931736"
                },
                {
                    "ecoregion": "Jornada Plains Desert Grass-Shrubland",
                    "bbox": "-107.29043231280099,31.272856995254187,-105.78210434184189,34.350168291733326"
                },
                {
                    "ecoregion": "Artesia Plains Desert Grass-Shrubland",
                    "bbox": "-105.5710869555985,31.883694178143855,-103.82946057544518,33.54334719371809"
                },
                {
                    "ecoregion": "Guadalupe Mountains Woodland",
                    "bbox": "-105.18602821732833,31.159293262074414,-104.11120779430422,32.704359902887234"
                },
                {
                    "ecoregion": "Trans-Pecos Desert Shrubland",
                    "bbox": "-106.22675864119827,29.48490015042165,-102.15210021725119,32.88231842025891"
                }
            ],
            "Lolo National Forest": [
                {
                    "ecoregion": "Salish Mountains",
                    "bbox": "-115.81185990800833,47.53666934431482,-114.18454622272998,48.99996261628178"
                },
                {
                    "ecoregion": "Flathead River Valley",
                    "bbox": "-115.33384774757548,47.027215963346066,-113.85058245211843,48.99976758390693"
                },
                {
                    "ecoregion": "Canadian Rockies-Whitefish-Swan Mountains",
                    "bbox": "-115.02773525317934,47.180441972419146,-113.00761452269205,48.99997730940538"
                },
                {
                    "ecoregion": "Coeur d'Alene Mountains",
                    "bbox": "-116.78563277483266,47.38540416756831,-115.38865673721864,48.144320516978325"
                },
                {
                    "ecoregion": "Clark Fork Valley and Mountains",
                    "bbox": "-115.7375468013438,46.6315316280822,-114.05021000558725,47.93894055796045"
                },
                {
                    "ecoregion": "Flathead Thrust Faulted Mountains",
                    "bbox": "-113.49612903792473,47.279033068221565,-112.88599758002425,48.34319582622646"
                },
                {
                    "ecoregion": "St. Joe-Bitterroot Mountains",
                    "bbox": "-116.52180029574703,46.696658283253214,-114.6351470462991,47.4975697796217"
                },
                {
                    "ecoregion": "Southern Rocky Mountain Front",
                    "bbox": "-113.1683245252566,47.16062673673457,-112.36868552731522,47.952387594412016"
                },
                {
                    "ecoregion": "Bitterroot-Frenchtown Valleys",
                    "bbox": "-114.64399891222001,45.92190533576269,-113.94509919367283,47.20585866244738"
                },
                {
                    "ecoregion": "Clark Fork Valley and Mountains",
                    "bbox": "-114.59260504678542,46.87269778857211,-113.3878582916268,47.2090857249263"
                },
                {
                    "ecoregion": "Clearwater Mountains and Breaks",
                    "bbox": "-115.88299624138341,46.14795781100423,-114.56297690356121,47.01787693916947"
                },
                {
                    "ecoregion": "Avon-Nevada Valleys",
                    "bbox": "-113.68339217860614,46.569547070141255,-112.50276359316524,47.301059546161184"
                },
                {
                    "ecoregion": "Whitefish-Swan Mountains",
                    "bbox": "-113.46447267707237,46.944974822929794,-112.41350052103218,47.333445580948876"
                },
                {
                    "ecoregion": "Garnet-Sapphire Mountains",
                    "bbox": "-114.08265067958519,46.036883698923646,-112.65230375421487,47.03502572725557"
                },
                {
                    "ecoregion": "Bitterroot Glaciated Canyons",
                    "bbox": "-114.56617434596927,45.73262946108082,-114.11427151092147,46.7286071935672"
                },
                {
                    "ecoregion": "Central Idaho Glaciated Mountains",
                    "bbox": "-115.54612661285285,45.46894820929248,-114.32024965040102,46.67106179176835"
                }
            ],
            "Los Padres National Forest": [
                {
                    "ecoregion": "South Coastal Santa Lucia Range",
                    "bbox": "-121.44763704841102,34.907731340828775,-120.27779661422232,35.901666519594244"
                },
                {
                    "ecoregion": "Paso Robles Hills and Valleys",
                    "bbox": "-120.96718620358041,35.33870739433081,-120.02274522621121,35.99801768566772"
                },
                {
                    "ecoregion": "Santa Ynez-Sulphur Mountains",
                    "bbox": "-120.64409270311575,34.28166261923457,-118.93323081534982,34.69359983706289"
                },
                {
                    "ecoregion": "San Rafael-Topatopa Mountains",
                    "bbox": "-120.10697488728118,34.395844578764354,-118.61633802617894,34.85946751991014"
                },
                {
                    "ecoregion": "Caliente Range-Cuyama Valley",
                    "bbox": "-120.21927875391134,34.78671729826476,-119.36282220967718,35.38455514790178"
                },
                {
                    "ecoregion": "Santa Maria Valley",
                    "bbox": "-120.6648987102073,34.843083661881565,-120.15875888491456,35.13943472593189"
                },
                {
                    "ecoregion": "Santa Ynez Valleys and Hills",
                    "bbox": "-120.66148477670106,34.537755753125566,-119.81107336464402,34.93106285736502"
                },
                {
                    "ecoregion": "Northern Transverse Ranges",
                    "bbox": "-119.57436230437679,34.544278887560665,-118.17932732569551,34.93410818484489"
                },
                {
                    "ecoregion": "San Emigdio Mountains",
                    "bbox": "-119.37370114838927,34.782647696933736,-118.6098628193136,34.99829113462823"
                },
                {
                    "ecoregion": "Interior Santa Lucia Range",
                    "bbox": "-121.53890750177976,34.741702373565715,-119.57033606295892,36.34526024576377"
                },
                {
                    "ecoregion": "North Coastal Santa Lucia Range",
                    "bbox": "-121.95582900880169,35.85544890634202,-121.25757382087511,36.62824083264837"
                }
            ],
            "Malheur National Forest": [
                {
                    "ecoregion": "High Desert-Wetlands",
                    "bbox": "-120.82103886714998,40.83475527933274,-118.64428012762573,43.65060897782212"
                },
                {
                    "ecoregion": "John Day River Valleys",
                    "bbox": "-120.21964821429361,44.2225290315896,-118.5499256777278,45.03610164597421"
                },
                {
                    "ecoregion": "Hornet Plateau",
                    "bbox": "-119.52594326317103,44.188984640328954,-117.6157942261226,45.066105079885574"
                },
                {
                    "ecoregion": "Semi-Arid Foothills",
                    "bbox": "-120.24638299477937,43.3715840103938,-117.1055212453092,45.12205644594826"
                },
                {
                    "ecoregion": "John Day-Clarno Highlands",
                    "bbox": "-120.96006936281083,43.97715553769797,-118.58331945862608,45.14706343902657"
                },
                {
                    "ecoregion": "Cold Moist Volcanic Ash Forest",
                    "bbox": "-118.93674678593538,44.18452737274009,-117.12669484039452,46.364166832333524"
                },
                {
                    "ecoregion": "Continental Highlands",
                    "bbox": "-119.83952652832659,43.59321525478026,-118.1892414150592,44.31664244339407"
                },
                {
                    "ecoregion": "High Lava Plains",
                    "bbox": "-121.30892279575039,40.47262246875198,-117.29109053180258,43.93081048511584"
                }
            ],
            "Manti-Lasal National Forest": [
                {
                    "ecoregion": "Hatch Point-Dry Valley",
                    "bbox": "-109.69491785297652,37.95850792360187,-109.2022959424038,38.48318162333328"
                },
                {
                    "ecoregion": "Canyon Mountain Range",
                    "bbox": "-112.31663532585958,39.18847754240471,-111.54742203040234,41.38820527185584"
                },
                {
                    "ecoregion": "Monument Upwarp",
                    "bbox": "-110.49978326818325,35.58297452515427,-108.08933715098868,38.01346677087486"
                },
                {
                    "ecoregion": "Southern Wasatch Range",
                    "bbox": "-111.72538609928904,39.52464093603044,-111.14467898115004,40.28085383703501"
                },
                {
                    "ecoregion": "Dove Creek-Egnar Plains",
                    "bbox": "-109.46372732335726,37.648687240224035,-108.87308524798578,38.1233929145514"
                },
                {
                    "ecoregion": "Abajo Mountains",
                    "bbox": "-110.04276191562985,37.56646692810631,-109.35100962019777,37.97542988468149"
                },
                {
                    "ecoregion": "Canyon of Ancients-Blanding Basin",
                    "bbox": "-110.28379317511491,35.92631621112429,-108.25493761108186,37.803501770390426"
                },
                {
                    "ecoregion": "Eastern Wasatch Mountain Zone",
                    "bbox": "-111.81534959670648,38.72388421388541,-111.00459607364985,39.986372631691665"
                },
                {
                    "ecoregion": "Semi-Arid Foothills",
                    "bbox": "-111.739621416695,39.014451738756804,-111.2978628569852,39.886405196342764"
                },
                {
                    "ecoregion": "Northwestern Woodlands and Shrub Mountains",
                    "bbox": "-111.93870079920248,39.13931368178106,-111.64105786622753,39.71755676093579"
                },
                {
                    "ecoregion": "North Basins and Slopes",
                    "bbox": "-112.30614444191241,38.09878803623894,-111.36709190636634,39.7956588957415"
                },
                {
                    "ecoregion": "Mancos Shale Lowlands-Grand Valley",
                    "bbox": "-111.48442118458996,38.30667657766196,-107.5094741338242,39.701243283850545"
                },
                {
                    "ecoregion": "Salt Anticline Benchlands",
                    "bbox": "-109.83440474288454,37.667302767708634,-108.21981387630933,38.87406890015967"
                },
                {
                    "ecoregion": "La Sal Mountains",
                    "bbox": "-109.40595162856476,38.29675154714624,-108.89153467518508,38.69750102964883"
                },
                {
                    "ecoregion": "Canyonlands",
                    "bbox": "-110.47783677864436,37.45450789122623,-109.53504906726062,38.57733498662037"
                }
            ],
            "Mark Twain National Forest": [
                {
                    "ecoregion": "Claypan Till Plain",
                    "bbox": "-92.63928852674405,38.67032608228294,-90.89296533108512,40.43543484474236"
                },
                {
                    "ecoregion": "White River Hills",
                    "bbox": "-93.99978413123262,35.79255964661047,-91.59286755988995,37.142469926645845"
                },
                {
                    "ecoregion": "St. Francois Knobs and Basins",
                    "bbox": "-90.93516729693317,37.14277480041676,-90.11636367064682,37.97709894366136"
                },
                {
                    "ecoregion": "White and Black Rivers Alluvial Plain",
                    "bbox": "-91.68775793917752,34.3552908220139,-89.77063648888281,37.25003921613694"
                },
                {
                    "ecoregion": "Inner Ozark Border",
                    "bbox": "-92.79764258883438,37.04570475227257,-89.6627271549342,38.80619744395693"
                },
                {
                    "ecoregion": "Central Plateau",
                    "bbox": "-93.52791402830974,35.666623847412666,-90.68245292136521,38.591514288853375"
                },
                {
                    "ecoregion": "Gasconade River Hills",
                    "bbox": "-92.72648353138982,37.16251365128403,-91.48196754396696,38.50583133235017"
                },
                {
                    "ecoregion": "Meramac River Hills",
                    "bbox": "-91.64798885440206,37.573368058389235,-90.46306901082613,38.47261520083089"
                },
                {
                    "ecoregion": "Springfield Plain",
                    "bbox": "-95.35855099323373,36.22578027394053,-92.65210877170239,38.14129969712337"
                },
                {
                    "ecoregion": "Black River Ozark Border",
                    "bbox": "-90.90369310994902,36.49876613105215,-89.9895815023844,37.76198517067911"
                },
                {
                    "ecoregion": "Current River Hills",
                    "bbox": "-91.98444689380909,36.551297890685134,-90.5127944036388,37.70256995873666"
                },
                {
                    "ecoregion": "Springfield Plateau",
                    "bbox": "-95.25342874194286,35.72378154608151,-91.67436745479415,36.67756657483761"
                },
                {
                    "ecoregion": "Outer Ozark Border",
                    "bbox": "-93.28976983091292,37.252259885984984,-89.43396760701938,39.34176591226708"
                }
            ],
            "Medicine Bow-Routt National Forest": [
                {
                    "ecoregion": "Southern Powder River Basin-Scoria Hills",
                    "bbox": "-107.21669744862834,43.38151720225716,-105.04450967618055,45.94542802568287"
                },
                {
                    "ecoregion": "North Laramie Mountains",
                    "bbox": "-106.45580359076308,41.68641210313609,-105.17873535944926,42.77907505307127"
                },
                {
                    "ecoregion": "High Plains",
                    "bbox": "-105.35113149262423,41.400086068817075,-103.99771508238513,42.85693776316731"
                },
                {
                    "ecoregion": "South Laramie Mountains",
                    "bbox": "-105.54944152760436,40.98277181616646,-104.89349520883678,41.90590338103624"
                },
                {
                    "ecoregion": "Medicine Bow Mountains",
                    "bbox": "-106.66751351793448,40.70229737722224,-105.86295420137526,41.701441572270824"
                },
                {
                    "ecoregion": "Hanna Basin-Rawlins Uplift",
                    "bbox": "-107.37469988659046,41.50121457659151,-106.0013912344179,42.20332074875358"
                },
                {
                    "ecoregion": "Shale Scablands",
                    "bbox": "-105.19836050903024,42.75786742943836,-102.3152694789033,45.32699916717786"
                },
                {
                    "ecoregion": "Powder River Basin",
                    "bbox": "-106.92974976064289,42.477662795201866,-104.24773158084776,45.10496856984366"
                },
                {
                    "ecoregion": "Black Hills Foothills",
                    "bbox": "-104.86933162335572,43.23655597987465,-103.21738410069565,44.92409654402036"
                },
                {
                    "ecoregion": "Park-Sierra Madre Ranges",
                    "bbox": "-107.25825058689503,39.92886806810691,-106.42018464340651,41.36523646089398"
                },
                {
                    "ecoregion": "Zirkle Range",
                    "bbox": "-106.93060662839315,40.529237637007384,-106.53468433881113,41.046927172950745"
                },
                {
                    "ecoregion": "Saratoga Basin",
                    "bbox": "-107.21235053594842,41.12442225278477,-106.56173717982693,41.809103006298756"
                },
                {
                    "ecoregion": "Laramie Basin",
                    "bbox": "-106.17208142471793,40.95785879594672,-105.48082697688346,41.962550224313475"
                },
                {
                    "ecoregion": "Elkhead Mountains",
                    "bbox": "-107.53780707343765,40.49263570277549,-107.0409692283472,41.54127842316075"
                },
                {
                    "ecoregion": "North Front Range",
                    "bbox": "-106.04840047500187,39.70399406357524,-105.16871404121997,41.12968164279363"
                },
                {
                    "ecoregion": "North Park",
                    "bbox": "-106.62114273215133,40.39315864165803,-105.98424180511518,40.956293409013654"
                },
                {
                    "ecoregion": "Williams Fork Mountains and Hills",
                    "bbox": "-108.14204021438434,39.655715482083906,-106.39561390335894,40.74748539983136"
                },
                {
                    "ecoregion": "Indian Peaks-Williams Mountains",
                    "bbox": "-106.30330527082157,39.420585716857374,-105.35918288997834,40.77465296106533"
                },
                {
                    "ecoregion": "Middle Park",
                    "bbox": "-106.6458240924079,39.65710490856475,-106.05634120268434,40.54574333698548"
                },
                {
                    "ecoregion": "Flat Tops",
                    "bbox": "-107.92489283863358,39.49665469675688,-107.0092040639164,40.34860187028016"
                },
                {
                    "ecoregion": "Rabbit Ears Range",
                    "bbox": "-106.55179520788249,39.93354894492791,-105.942239917738,40.49290872255955"
                }
            ],
            "Mendocino National Forest": [
                {
                    "ecoregion": "Eastern Franciscan",
                    "bbox": "-123.90652071935568,39.00779704789551,-122.40732233485784,41.50958941871676"
                },
                {
                    "ecoregion": "Central Franciscan",
                    "bbox": "-124.10581135800771,38.54716710537764,-122.36044421093158,41.329664425772705"
                },
                {
                    "ecoregion": "North Valley Alluvium",
                    "bbox": "-122.49221617313782,39.20745186701009,-121.64430909598798,40.238962917904416"
                },
                {
                    "ecoregion": "Tehama Terraces",
                    "bbox": "-122.65548579193569,39.53297322493444,-122.11678953101199,40.73456577888766"
                },
                {
                    "ecoregion": "Western Foothills",
                    "bbox": "-122.89937627859234,38.32558995431299,-122.03086322695634,40.48981514195526"
                },
                {
                    "ecoregion": "Clear Lake Hills and Valleys",
                    "bbox": "-122.98612354856289,38.903932684645724,-122.47996757414421,39.21656355156671"
                }
            ],
            "Midewin National Tallgrass Prairie": [
                {
                    "ecoregion": "Eastern Grand Prairie",
                    "bbox": "-89.31431505079894,40.09030712407457,-86.53265391734436,41.74262425820302"
                }
            ],
            "Modoc National Forest": [
                {
                    "ecoregion": "High Desert-Wetlands",
                    "bbox": "-120.82103886714998,40.83475527933274,-118.64428012762573,43.65060897782212"
                },
                {
                    "ecoregion": "Klamath Lake Basins and Juniper Foot",
                    "bbox": "-122.09772130009787,41.77571892908537,-120.86993638455647,42.76669473217618"
                },
                {
                    "ecoregion": "Medicine Lake Lava Flows",
                    "bbox": "-122.36841228519876,41.10303932070815,-121.15308190080907,42.4759183181759"
                },
                {
                    "ecoregion": "Fremont Pine-Fir Forest",
                    "bbox": "-121.86175284062108,41.779545929301264,-120.27859240991177,42.98015030908954"
                },
                {
                    "ecoregion": "High Lava Plains",
                    "bbox": "-121.30892279575039,40.47262246875198,-117.29109053180258,43.93081048511584"
                },
                {
                    "ecoregion": "Warner Mountains",
                    "bbox": "-120.4251816102431,41.10045144327955,-120.07243007758598,42.43449618505093"
                },
                {
                    "ecoregion": "Goose Lake Basin",
                    "bbox": "-120.57225412782572,41.64731564290264,-120.27345380335032,42.38859693629962"
                },
                {
                    "ecoregion": "Big Valley Mountains",
                    "bbox": "-121.54003588115097,40.8012015710957,-120.84077316474975,41.35230011885545"
                },
                {
                    "ecoregion": "Adin Mountains and Valleys",
                    "bbox": "-121.17757694671866,40.90206852724077,-120.68252689090326,41.49411011768785"
                },
                {
                    "ecoregion": "Pit River Valley",
                    "bbox": "-121.00998376523853,41.17889916416516,-120.3357929801619,41.66105362892188"
                },
                {
                    "ecoregion": "Medicine Lake Highlands",
                    "bbox": "-121.92495843238572,41.42335920316475,-121.41651398822995,41.71739809404687"
                },
                {
                    "ecoregion": "Devil's Garden",
                    "bbox": "-121.32869566257472,41.46310032801779,-120.42316457658393,41.90665404155084"
                },
                {
                    "ecoregion": "Big Valley",
                    "bbox": "-121.51826625588296,41.026779063103334,-120.90934651393042,41.72099794439964"
                },
                {
                    "ecoregion": "Likely Mountain",
                    "bbox": "-120.931682272319,40.85647916688009,-120.02259615189087,41.494474419558856"
                },
                {
                    "ecoregion": "Cottonwood-Skedaddle Mountains",
                    "bbox": "-120.53113048238583,40.25920273521808,-119.80495146273978,41.292375207150144"
                },
                {
                    "ecoregion": "Eagle Lake-Observation Peak",
                    "bbox": "-120.9031513568496,40.40070231236189,-120.1150984561288,40.9665659771382"
                },
                {
                    "ecoregion": "Madeline Plain",
                    "bbox": "-120.77310083733374,40.739482675585066,-120.07438477923415,41.081097252236475"
                }
            ],
            "Monongahela National Forest": [
                {
                    "ecoregion": "Ridge and Valley",
                    "bbox": "-82.76085875073073,36.6081667271128,-78.28288738974123,39.40386939205882"
                },
                {
                    "ecoregion": "Northern High Allegheny Mountain",
                    "bbox": "-79.94179530890636,38.10329012334057,-79.06407126777475,39.404186353617376"
                },
                {
                    "ecoregion": "Southern High Allegheny Mountains",
                    "bbox": "-80.82115187316037,37.8543273973915,-79.6646299551083,38.91196008898697"
                },
                {
                    "ecoregion": "Northern Ridge and Valley",
                    "bbox": "-79.21141922341837,38.88493854168041,-75.22165990597983,41.7267650538642"
                },
                {
                    "ecoregion": "Western Allegheny Mountains",
                    "bbox": "-80.46784865319273,38.49007700964631,-78.6494149002774,40.637740734847114"
                },
                {
                    "ecoregion": "Allegheny Mountain Plateau",
                    "bbox": "-79.4979931090947,39.19941394060095,-77.29344769795284,41.22501246505328"
                },
                {
                    "ecoregion": "Eastern Allegheny Mountain and Valley",
                    "bbox": "-80.43361235322749,37.59990767519912,-79.7217625267192,38.62983071491561"
                },
                {
                    "ecoregion": "Western Coal Fields",
                    "bbox": "-83.18742567105784,36.94435293114293,-80.27350588119145,38.65453823734981"
                },
                {
                    "ecoregion": "Eastern Coal Fields",
                    "bbox": "-82.82469925037009,36.72878266139077,-80.41450471581993,38.46860681815019"
                },
                {
                    "ecoregion": "Western Allegheny Mountain and Valley",
                    "bbox": "-81.3271855271903,37.26750159871983,-79.95171810280817,38.36579967991133"
                }
            ],
            "Mt Baker-Snoqualmie National Forest": [
                {
                    "ecoregion": "North Cascades Lowland Forests",
                    "bbox": "-122.35429524123236,47.39926086769492,-120.94186534171212,48.99528067736145"
                },
                {
                    "ecoregion": "North Cascades Highland Forests",
                    "bbox": "-122.09846625891066,47.23180927008178,-120.62832390942083,48.99800806302176"
                },
                {
                    "ecoregion": "Eastern Puget Riverine Lowlands",
                    "bbox": "-122.69956382361153,46.98337687973924,-121.70177814804305,48.61395309675805"
                },
                {
                    "ecoregion": "Eastern Puget Uplands",
                    "bbox": "-122.52239996788416,47.04039854875407,-121.62732254380035,48.80117088013208"
                },
                {
                    "ecoregion": "West Cascade Slope Forest",
                    "bbox": "-123.24044457915397,43.16430782994246,-121.04511434115386,47.53592981291058"
                },
                {
                    "ecoregion": "Western Cascades Highland Forest",
                    "bbox": "-122.99084123913184,42.862939303406165,-121.04186360402207,47.40690022086858"
                },
                {
                    "ecoregion": "Cascade Crest Forest and Volcanic Peaks",
                    "bbox": "-122.23167682432597,43.351430882329396,-121.32923382588035,47.05299090100931"
                }
            ],
            "Mt. Hood National Forest": [
                {
                    "ecoregion": "West Cascade Slope Forest",
                    "bbox": "-123.24044457915397,43.16430782994246,-121.04511434115386,47.53592981291058"
                },
                {
                    "ecoregion": "Western Cascades Highland Forest",
                    "bbox": "-122.99084123913184,42.862939303406165,-121.04186360402207,47.40690022086858"
                },
                {
                    "ecoregion": "Cascade Crest Forest and Volcanic Peaks",
                    "bbox": "-122.23167682432597,43.351430882329396,-121.32923382588035,47.05299090100931"
                },
                {
                    "ecoregion": "Pine-Oak Foothills",
                    "bbox": "-121.72061641961204,45.14969033893806,-120.39442999794602,45.97821546657059"
                },
                {
                    "ecoregion": "Ponderosa Pine-Bitterbrush Woodland",
                    "bbox": "-121.7708745159461,43.88318290037063,-121.10441714593452,45.52758571990512"
                },
                {
                    "ecoregion": "Umatilla Plateau",
                    "bbox": "-121.41705191321518,44.79714388228439,-118.36988468303167,45.96055206662464"
                }
            ],
            "National Forests in Alabama": [
                {
                    "ecoregion": "Lower Clay Hills",
                    "bbox": "-87.1501495430669,31.25798828443186,-84.60166878009011,32.31820446476428"
                },
                {
                    "ecoregion": "Upper Loam Hills",
                    "bbox": "-89.6887326356026,32.23219091837626,-84.76873982778079,36.345320215255754"
                },
                {
                    "ecoregion": "Moulton Valley",
                    "bbox": "-87.78888414998352,34.33717024001464,-86.65953328343426,34.58093795122551"
                },
                {
                    "ecoregion": "Sandstone Plateau",
                    "bbox": "-87.4748300573612,33.79499221601799,-86.3620790228286,34.49915358636895"
                },
                {
                    "ecoregion": "Sandstone-Shale and Chert Ridge",
                    "bbox": "-86.79045369108496,33.069140133210624,-85.00876813723971,34.36464505732357"
                },
                {
                    "ecoregion": "Quartzite and Talladega Slate Ridge",
                    "bbox": "-86.7510346773085,32.917592964144035,-84.75946339102262,34.17083605903696"
                },
                {
                    "ecoregion": "Shale Hills and Mountain",
                    "bbox": "-87.75676366880822,33.274586079983635,-86.46478973755632,34.24664859095975"
                },
                {
                    "ecoregion": "Schist Plains",
                    "bbox": "-86.55490603608467,32.76981130774573,-83.3798425413002,34.7390491495986"
                },
                {
                    "ecoregion": "Southern Loam Hills",
                    "bbox": "-90.35773892261312,30.325248661396643,-83.30684314719343,32.301691535136285"
                },
                {
                    "ecoregion": "Chert Valley",
                    "bbox": "-87.10529155725953,33.04070647582324,-85.08665651668485,35.183178571334054"
                },
                {
                    "ecoregion": "Sandstone Mountain",
                    "bbox": "-88.04110931684147,34.07705217591723,-85.709462782981,35.15315267685463"
                },
                {
                    "ecoregion": "Wiregrass Plains",
                    "bbox": "-86.31330922174317,31.00567848237614,-83.80781909497523,32.00728304897359"
                },
                {
                    "ecoregion": "Upper Clay Hills",
                    "bbox": "-89.72510902436193,31.60947430729351,-86.66394205688039,33.89263624836423"
                }
            ],
            "National Forests in Florida": [
                {
                    "ecoregion": "Water",
                    "bbox": "-97.78518055363958,24.53068882942597,-66.79803824267071,49.0053529188022"
                },
                {
                    "ecoregion": "Florida Northern Highlands",
                    "bbox": "-83.29652874260734,29.325186284619406,-82.50553066920497,30.480834496914554"
                },
                {
                    "ecoregion": "FL Gulf Coast Flatwoods-Bays and Barrier Islands",
                    "bbox": "-85.41723394678917,29.311713759582403,-82.95281901088862,30.454120722793164"
                },
                {
                    "ecoregion": "Eastern Beach and Lagoons",
                    "bbox": "-82.39393426415495,26.511334075007596,-80.10185044404273,30.111133876926942"
                },
                {
                    "ecoregion": "GA-FL Gulf Coast Flatwoods-Bays and Barrier Islands",
                    "bbox": "-88.35535717379452,29.923800849029988,-85.14556335086792,30.858216517878077"
                },
                {
                    "ecoregion": "Florida Central Highlands",
                    "bbox": "-82.72766033495645,27.14691526762556,-81.07745616966645,30.00305395507604"
                },
                {
                    "ecoregion": "Okeechobee Plain",
                    "bbox": "-81.57160235286625,27.046951157969602,-80.47046756442654,29.055257701581695"
                },
                {
                    "ecoregion": "Okefenokee Uplands",
                    "bbox": "-83.28135845942535,30.343798791081383,-82.34648093924392,31.417717032215307"
                },
                {
                    "ecoregion": "Gulf Southern Loam Hills",
                    "bbox": "-85.29180078317955,29.949391394197562,-83.86864035107129,31.344976471087307"
                },
                {
                    "ecoregion": "Okefenokee Swamp",
                    "bbox": "-82.64339120713845,30.301958937255222,-82.1582947038375,31.166398158947914"
                },
                {
                    "ecoregion": "South Coastal Plains",
                    "bbox": "-88.46471000865995,30.076683372839454,-83.93176743112201,30.98182084355716"
                },
                {
                    "ecoregion": "Upper Terraces",
                    "bbox": "-82.67231040580054,29.805272009195903,-78.10745161639892,34.945224406980856"
                }
            ],
            "National Forests in Mississippi": [
                {
                    "ecoregion": "North Mississippi River Alluvial Plain",
                    "bbox": "-91.34381233956776,32.42148531009906,-88.99824635538494,37.319782337784716"
                },
                {
                    "ecoregion": "Jackson Hills",
                    "bbox": "-89.92160833105959,31.71060366222929,-88.43334494721148,32.64591743723997"
                },
                {
                    "ecoregion": "Jackson Prairie",
                    "bbox": "-90.15995035592414,32.23091326503521,-89.58506816376473,32.570146021421806"
                },
                {
                    "ecoregion": "LA-MS Gulf Coast Flatwoods-Bays and Barrier Islands",
                    "bbox": "-90.90367401284539,30.136213876968895,-88.3491304190336,30.961617831897456"
                },
                {
                    "ecoregion": "Southern Clay Hills",
                    "bbox": "-89.13113384115383,31.061811799275176,-88.01173405668135,31.700410789326497"
                },
                {
                    "ecoregion": "Deep Loess Hills and Bluffs",
                    "bbox": "-91.02629725821186,32.028273661700155,-88.273970386624,36.67507138963299"
                },
                {
                    "ecoregion": "Northern Pontotoc Ridge",
                    "bbox": "-89.03422748491045,33.80205827566891,-88.03241109739417,36.36989361639735"
                },
                {
                    "ecoregion": "Upper Loam Hills",
                    "bbox": "-89.6887326356026,32.23219091837626,-84.76873982778079,36.345320215255754"
                },
                {
                    "ecoregion": "Northern Loessial Hills",
                    "bbox": "-89.94811795098263,32.60179287464149,-88.30612284589256,36.18789661333807"
                },
                {
                    "ecoregion": "Interior Flatwoods",
                    "bbox": "-89.10653335333154,32.28830166139261,-87.88111982501988,34.37406457442063"
                },
                {
                    "ecoregion": "Southern Loam Hills",
                    "bbox": "-90.35773892261312,30.325248661396643,-83.30684314719343,32.301691535136285"
                },
                {
                    "ecoregion": "Southern Loessial Plains",
                    "bbox": "-91.38315340190792,30.706643273868053,-89.87458281724321,32.270796353269134"
                },
                {
                    "ecoregion": "Delmarva Upland",
                    "bbox": "-91.5519165222297,30.777265906396508,-90.93933690377503,32.051760931821605"
                },
                {
                    "ecoregion": "Fragipan Loam Hills",
                    "bbox": "-91.21268382969492,30.567504605952877,-89.11524889821806,32.02573984971434"
                },
                {
                    "ecoregion": "Upper Clay Hills",
                    "bbox": "-89.72510902436193,31.60947430729351,-86.66394205688039,33.89263624836423"
                }
            ],
            "National Forests in North Carolina": [
                {
                    "ecoregion": "Southern Blue Ridge Mountains",
                    "bbox": "-84.48033094111997,34.45017597174376,-80.93362685469555,36.826888572949315"
                },
                {
                    "ecoregion": "Lower Terraces",
                    "bbox": "-78.32055721494345,34.76449318621161,-76.54101873043004,36.55320405682181"
                },
                {
                    "ecoregion": "Water",
                    "bbox": "-97.78518055363958,24.53068882942597,-66.79803824267071,49.0053529188022"
                },
                {
                    "ecoregion": "Carolina Slate-North",
                    "bbox": "-81.02148674431777,34.78767603042451,-78.15262274794145,37.07994874683726"
                },
                {
                    "ecoregion": "Southern Triassic Uplands",
                    "bbox": "-80.40811891865314,34.78372418092624,-78.12562922620776,36.93491464159746"
                },
                {
                    "ecoregion": "Midland Plateau Central Uplands-North",
                    "bbox": "-82.28651112708678,34.92241458536489,-79.3815779890329,36.97782533617038"
                },
                {
                    "ecoregion": "Metasedimentary Mountains",
                    "bbox": "-84.75421615625055,34.6843026970119,-82.3285912141132,36.30912780170672"
                },
                {
                    "ecoregion": "Sand Hills",
                    "bbox": "-85.00485010225037,32.09605923894276,-78.84959826264964,35.40951150824958"
                },
                {
                    "ecoregion": "Tidal Area",
                    "bbox": "-78.55207389629322,33.84239183161776,-75.45658419500455,38.40845374844179"
                },
                {
                    "ecoregion": "Lower Terraces",
                    "bbox": "-81.93484010019046,29.931375815241722,-77.11493366935332,34.89361096757216"
                }
            ],
            "National Forests in Texas": [
                {
                    "ecoregion": "Piney Woods Transition",
                    "bbox": "-95.22090271059159,30.948893068860116,-93.07941595368328,31.87395966810425"
                },
                {
                    "ecoregion": "Piney Woods Transition",
                    "bbox": "-95.66042261940834,30.914554556447683,-95.01871640064132,31.511366890269812"
                },
                {
                    "ecoregion": "Sabine Alluvial Valley",
                    "bbox": "-94.25408181902071,30.263910578410503,-93.3624251498008,31.55721150520685"
                },
                {
                    "ecoregion": "Southern Loam Hills",
                    "bbox": "-96.03224096115139,30.132117972266656,-91.83465821770255,32.4320310077249"
                },
                {
                    "ecoregion": "Blackland Prairie",
                    "bbox": "-97.33170842320516,29.09396028933594,-95.67073335835778,30.679165892591925"
                },
                {
                    "ecoregion": "Southwest Flatwoods",
                    "bbox": "-95.87822317635846,29.714536873677844,-92.42936492475144,31.048770598084673"
                },
                {
                    "ecoregion": "Eastern Rolling Plains",
                    "bbox": "-99.41431365375206,31.186656414162258,-97.50825286457803,34.04240057082973"
                },
                {
                    "ecoregion": "Red River Alluvial Plain",
                    "bbox": "-96.56037873069386,31.979718198735952,-93.22468025658856,34.00127428857763"
                },
                {
                    "ecoregion": "Western Cross Timbers",
                    "bbox": "-98.50405552424303,32.283359500940264,-97.32728361934352,33.8334432382149"
                },
                {
                    "ecoregion": "Texas Grand Prairie",
                    "bbox": "-98.97047881484542,30.963897067395806,-97.12153367024263,33.85055920284498"
                },
                {
                    "ecoregion": "South Central Arkansas",
                    "bbox": "-94.76811249919245,31.518043580347012,-91.7080745549967,34.71911718101313"
                },
                {
                    "ecoregion": "Blackland Prairie",
                    "bbox": "-98.88461361972276,29.27269811782395,-94.91056825262274,33.86796707931728"
                },
                {
                    "ecoregion": "Sand Hills",
                    "bbox": "-95.7306780020881,31.40247405233572,-93.92655945785265,33.64288459394891"
                }
            ],
            "Nebraska National Forest": [
                {
                    "ecoregion": "Pine Ridge Escarpment",
                    "bbox": "-104.62957692813268,42.52541384966946,-101.42231546118956,43.52243662764829"
                },
                {
                    "ecoregion": "River Breaks",
                    "bbox": "-102.9834903510988,43.78821842324169,-99.86486658842227,46.090604865022556"
                },
                {
                    "ecoregion": "West Nebraska Sandy and Silty Tablelands",
                    "bbox": "-104.2629889211018,41.519842714369815,-101.99182460612064,42.976882973170746"
                },
                {
                    "ecoregion": "Shale Scablands",
                    "bbox": "-105.19836050903024,42.75786742943836,-102.3152694789033,45.32699916717786"
                },
                {
                    "ecoregion": "Missouri Breaks",
                    "bbox": "-101.64851386672154,43.51095969283563,-99.010783545724,44.462049825738916"
                },
                {
                    "ecoregion": "White River Badlands",
                    "bbox": "-102.97577669413909,43.2111927644346,-101.08583922400095,43.95353603306154"
                },
                {
                    "ecoregion": "Northern Rolling Pierre Shale Plains",
                    "bbox": "-102.45647963712554,43.26362213715197,-99.35160338069142,45.3445855527811"
                },
                {
                    "ecoregion": "West Central Lakes",
                    "bbox": "-103.268994274666,41.32543085015368,-100.0570147142576,42.64006072812015"
                },
                {
                    "ecoregion": "Northern and Western Sand Hills",
                    "bbox": "-102.90209675875838,40.601551075022144,-98.42709622271246,43.16372782028276"
                }
            ],
            "Nez Perce-Clearwater National Forest": [
                {
                    "ecoregion": "Northern Idaho Hills and Low Mountain",
                    "bbox": "-117.34550404277729,46.59623291671579,-116.02313702475385,47.698731214074314"
                },
                {
                    "ecoregion": "Clark Fork Valley and Mountains",
                    "bbox": "-115.7375468013438,46.6315316280822,-114.05021000558725,47.93894055796045"
                },
                {
                    "ecoregion": "Palouse Hills",
                    "bbox": "-118.23957372704581,46.081464302335746,-116.41257840397014,47.541615645245884"
                },
                {
                    "ecoregion": "St. Joe-Bitterroot Mountains",
                    "bbox": "-116.52180029574703,46.696658283253214,-114.6351470462991,47.4975697796217"
                },
                {
                    "ecoregion": "North Idaho Hills and Valleys",
                    "bbox": "-116.67085329224562,46.37557971922871,-115.49933188036198,47.43143719676925"
                },
                {
                    "ecoregion": "Lower Snake and Clearwater Canyons",
                    "bbox": "-117.64116095791184,45.94960204459875,-115.77053473798776,46.75679444930444"
                },
                {
                    "ecoregion": "Clearwater Mountains and Breaks",
                    "bbox": "-115.88299624138341,46.14795781100423,-114.56297690356121,47.01787693916947"
                },
                {
                    "ecoregion": "Camas-Weippe Basalt Plateaus",
                    "bbox": "-116.87717739462101,45.844853508382755,-115.98828763266806,46.47579468757482"
                },
                {
                    "ecoregion": "Snake River Canyons and Dissected Uplands",
                    "bbox": "-117.6641506178567,44.95660403674697,-116.11045219231477,46.20471088579882"
                },
                {
                    "ecoregion": "Bitterroot Glaciated Canyons",
                    "bbox": "-114.56617434596927,45.73262946108082,-114.11427151092147,46.7286071935672"
                },
                {
                    "ecoregion": "Lochsa-Salmon Breaklands",
                    "bbox": "-115.79222943713876,45.707047844382544,-114.67487297890483,46.540118590800375"
                },
                {
                    "ecoregion": "Central Idaho Mountains and Basins",
                    "bbox": "-116.21644501162797,45.42701086535919,-114.94903905680701,46.10957709061029"
                },
                {
                    "ecoregion": "Central Idaho Glaciated Mountains",
                    "bbox": "-115.54612661285285,45.46894820929248,-114.32024965040102,46.67106179176835"
                },
                {
                    "ecoregion": "Salmon River Canyonlands",
                    "bbox": "-116.31121209656095,44.71669982024059,-114.74142106473033,45.682275086026436"
                }
            ],
            "Ochoco National Forest": [
                {
                    "ecoregion": "Ponderosa Pine-Bitterbrush Woodland",
                    "bbox": "-121.7708745159461,43.88318290037063,-121.10441714593452,45.52758571990512"
                },
                {
                    "ecoregion": "Deschutes River Valley",
                    "bbox": "-121.5446603264129,43.889714268099056,-120.65759981787727,44.959063422638906"
                },
                {
                    "ecoregion": "John Day-Clarno Uplands",
                    "bbox": "-121.4286312187557,43.69879737979528,-119.99546702138588,45.08635756594896"
                },
                {
                    "ecoregion": "John Day River Valleys",
                    "bbox": "-120.21964821429361,44.2225290315896,-118.5499256777278,45.03610164597421"
                },
                {
                    "ecoregion": "Semi-Arid Foothills",
                    "bbox": "-120.24638299477937,43.3715840103938,-117.1055212453092,45.12205644594826"
                },
                {
                    "ecoregion": "John Day-Clarno Highlands",
                    "bbox": "-120.96006936281083,43.97715553769797,-118.58331945862608,45.14706343902657"
                },
                {
                    "ecoregion": "Continental Highlands",
                    "bbox": "-119.83952652832659,43.59321525478026,-118.1892414150592,44.31664244339407"
                }
            ],
            "Okanogan-Wenatchee National Forest": [
                {
                    "ecoregion": "North Cascades Lowland Forests",
                    "bbox": "-122.35429524123236,47.39926086769492,-120.94186534171212,48.99528067736145"
                },
                {
                    "ecoregion": "North Cascades Highland Forests",
                    "bbox": "-122.09846625891066,47.23180927008178,-120.62832390942083,48.99800806302176"
                },
                {
                    "ecoregion": "Pasayten-Sawtooth Highlands",
                    "bbox": "-120.83830741975157,48.0981675371022,-119.71256323930203,48.99861744094221"
                },
                {
                    "ecoregion": "Okanogan Valley",
                    "bbox": "-120.31063180191609,47.83014116318418,-118.83291217675554,48.99860063441179"
                },
                {
                    "ecoregion": "Okanogan Pine-Fir Hills",
                    "bbox": "-120.54262024872548,47.846569705827335,-119.44892110262674,48.990254519330676"
                },
                {
                    "ecoregion": "Okanogan Semi-Arid Foothills",
                    "bbox": "-119.49755263294765,47.84271531136261,-118.35405706018514,48.998619805259864"
                },
                {
                    "ecoregion": "Okanogan Highland Dry Forest",
                    "bbox": "-119.3465832441214,48.00443271829539,-118.16551501880303,48.998971970779905"
                },
                {
                    "ecoregion": "Wenatchee-Chelan Highlands",
                    "bbox": "-121.01451373222295,47.394935804943486,-120.25426782420067,48.39658197597748"
                },
                {
                    "ecoregion": "Chelan Tephra Hills",
                    "bbox": "-120.59075599179556,47.539156078590224,-120.02039856674043,48.11814111731877"
                },
                {
                    "ecoregion": "Chiwaukum Hills and Lowlands",
                    "bbox": "-121.2189414054215,47.14535999856514,-120.34649122169247,47.962265829604405"
                },
                {
                    "ecoregion": "West Cascade Slope Forest",
                    "bbox": "-123.24044457915397,43.16430782994246,-121.04511434115386,47.53592981291058"
                },
                {
                    "ecoregion": "Missoula Flood Channeled Scablands",
                    "bbox": "-120.50869997682241,46.52440551460285,-117.24678360467959,48.14410373180186"
                },
                {
                    "ecoregion": "Western Cascades Highland Forest",
                    "bbox": "-122.99084123913184,42.862939303406165,-121.04186360402207,47.40690022086858"
                },
                {
                    "ecoregion": "Grand Fir Foothills",
                    "bbox": "-121.75977558687379,45.787419029864395,-120.90443559772461,47.215713508971305"
                },
                {
                    "ecoregion": "Yakima Plateau and Slopes",
                    "bbox": "-121.4137943403365,45.835130194003284,-120.22027728736691,47.33867620884001"
                },
                {
                    "ecoregion": "Cascade Crest Forest and Volcanic Peaks",
                    "bbox": "-122.23167682432597,43.351430882329396,-121.32923382588035,47.05299090100931"
                },
                {
                    "ecoregion": "Yakima Folds",
                    "bbox": "-121.20737358872009,45.66294039408399,-118.48310605959693,47.35329383524237"
                }
            ],
            "Olympic National Forest": [
                {
                    "ecoregion": "Olympic Rainshadow",
                    "bbox": "-123.60164986944591,47.680150706190204,-122.3555756896663,48.40561332769295"
                },
                {
                    "ecoregion": "High Olympics",
                    "bbox": "-123.82178748290596,47.53870494897427,-123.02144026795395,48.02395547916211"
                },
                {
                    "ecoregion": "Outwash",
                    "bbox": "-124.03689313590945,46.96445140900539,-123.43782859571309,47.44720753190211"
                },
                {
                    "ecoregion": "Volcanics",
                    "bbox": "-124.00342971870651,44.76555706060992,-122.68811727868945,47.90654309278955"
                },
                {
                    "ecoregion": "Southern Puget Prairies",
                    "bbox": "-123.26518443941029,46.72281602543927,-122.20613834810626,47.31689182120061"
                },
                {
                    "ecoregion": "Central Puget Lowlands",
                    "bbox": "-123.56354040796344,46.969008933015914,-122.03854766943937,48.01610603536528"
                },
                {
                    "ecoregion": "Coastal Lowlands and Uplands",
                    "bbox": "-124.76261517584965,42.08210297377326,-123.39990234141987,48.387801294993835"
                },
                {
                    "ecoregion": "Low Olympics",
                    "bbox": "-124.67080669407363,47.47838559461957,-123.23230241322574,48.35117412398671"
                }
            ],
            "Ottawa National Forest": [
                {
                    "ecoregion": "Michigamme Highlands",
                    "bbox": "-88.45415193276546,46.501999313217766,-87.37264652971356,46.909581933659354"
                },
                {
                    "ecoregion": "Ewen Dissected Lake Plain",
                    "bbox": "-89.56115444682024,46.372002389698594,-88.7617201372745,46.86892561822276"
                },
                {
                    "ecoregion": "Keewenaw Coarse Till and Lake Plain",
                    "bbox": "-88.99583202193025,46.483028305312075,-87.9384021373487,47.39153122888314"
                },
                {
                    "ecoregion": "Gogebic-Penokee Iron Range",
                    "bbox": "-91.39986734080509,46.255896479938656,-88.81627838334066,46.98849075224649"
                },
                {
                    "ecoregion": "Suomi Till and Outwash Plain",
                    "bbox": "-88.78248199574745,46.08016519207001,-86.57049449772285,46.676131719803095"
                },
                {
                    "ecoregion": "Superior-Ashland Clay Plain",
                    "bbox": "-92.66243075577472,46.3529305147315,-88.75157672258763,47.12370671319434"
                },
                {
                    "ecoregion": "Winegar Moraines",
                    "bbox": "-91.04723947392256,46.15716183075392,-88.5755231590665,46.52699455215691"
                },
                {
                    "ecoregion": "Brule and Paint Rivers Drumlinized Ground Moraine",
                    "bbox": "-89.28883370581082,45.22978575001241,-88.22379853437485,46.40855686670608"
                },
                {
                    "ecoregion": "Northern Highlands Pitted Outwash",
                    "bbox": "-90.27562122583885,45.33634176795829,-89.000512015617,46.28077531782674"
                },
                {
                    "ecoregion": "Water",
                    "bbox": "-97.78518055363958,24.53068882942597,-66.79803824267071,49.0053529188022"
                }
            ],
            "Ouachita National Forest": [
                {
                    "ecoregion": "West Central Ouachita Mountains",
                    "bbox": "-96.11035622875693,34.235671145007416,-92.59448153969129,34.84488087874962"
                },
                {
                    "ecoregion": "Southwestern Arkansas",
                    "bbox": "-95.14937442029321,33.63536736511185,-92.96915738460558,34.183347198914134"
                },
                {
                    "ecoregion": "Red River Alluvial Plain",
                    "bbox": "-96.56037873069386,31.979718198735952,-93.22468025658856,34.00127428857763"
                },
                {
                    "ecoregion": "Eastern Arkansas Valley and Ridges",
                    "bbox": "-94.23235394567803,34.66095883907923,-91.52927808441603,35.58649509037616"
                },
                {
                    "ecoregion": "Mount Magazine",
                    "bbox": "-94.31337726644767,35.0071067290923,-93.23436077492977,35.341439810798704"
                },
                {
                    "ecoregion": "East Central Ouachita Mountains",
                    "bbox": "-94.17135320738458,34.308880391417006,-92.33148605783526,34.79433301095975"
                },
                {
                    "ecoregion": "Athens Piedmont Plateau",
                    "bbox": "-95.56332535238306,34.05293030638859,-92.80800824038795,34.45095373332816"
                },
                {
                    "ecoregion": "Fourche Mountains",
                    "bbox": "-96.02950697266863,34.53358578925281,-92.65523780088375,35.19976670676817"
                },
                {
                    "ecoregion": "Bastrop Ridge",
                    "bbox": "-91.99228289723789,32.90134284429689,-91.45246991485465,34.039757440853236"
                }
            ],
            "Ozark-St. Francis National Forest": [
                {
                    "ecoregion": "White River Hills",
                    "bbox": "-93.99978413123262,35.79255964661047,-91.59286755988995,37.142469926645845"
                },
                {
                    "ecoregion": "Crowley's Ridge",
                    "bbox": "-91.17752261567614,34.39078381302261,-89.7454801103188,37.2090440928107"
                },
                {
                    "ecoregion": "North Mississippi River Alluvial Plain",
                    "bbox": "-91.34381233956776,32.42148531009906,-88.99824635538494,37.319782337784716"
                },
                {
                    "ecoregion": "Springfield Plateau",
                    "bbox": "-95.25342874194286,35.72378154608151,-91.67436745479415,36.67756657483761"
                },
                {
                    "ecoregion": "Boston Mountains",
                    "bbox": "-94.15293229768736,35.67000067309266,-92.94027801062168,36.4032943202767"
                },
                {
                    "ecoregion": "Boston Hills",
                    "bbox": "-95.32873120987739,35.33501844904225,-91.39731207639119,36.225678156821516"
                },
                {
                    "ecoregion": "Eastern Arkansas Valley and Ridges",
                    "bbox": "-94.23235394567803,34.66095883907923,-91.52927808441603,35.58649509037616"
                },
                {
                    "ecoregion": "Mount Magazine",
                    "bbox": "-94.31337726644767,35.0071067290923,-93.23436077492977,35.341439810798704"
                }
            ],
            "Payette National Forest": [
                {
                    "ecoregion": "Powder-Burnt River Valleys",
                    "bbox": "-118.59845496142731,43.130810558660414,-116.47328023369579,45.291716703862846"
                },
                {
                    "ecoregion": "Snake River Canyons and Dissected Uplands",
                    "bbox": "-117.6641506178567,44.95660403674697,-116.11045219231477,46.20471088579882"
                },
                {
                    "ecoregion": "Salmon River Canyonlands",
                    "bbox": "-116.31121209656095,44.71669982024059,-114.74142106473033,45.682275086026436"
                },
                {
                    "ecoregion": "Bruin Mountain",
                    "bbox": "-116.338502992619,44.87830056262089,-115.95317491908719,45.40616662359088"
                },
                {
                    "ecoregion": "Fitsum Peak Glaciated Lands",
                    "bbox": "-116.08322539003967,44.72931809365514,-115.53533708473861,45.41297276028473"
                },
                {
                    "ecoregion": "Chamberlain Basin",
                    "bbox": "-115.37884017033758,45.125172665186426,-114.66463992339374,45.54082191120227"
                },
                {
                    "ecoregion": "Ant Butte-Meadows Valley",
                    "bbox": "-116.78182530429433,44.828941675018314,-116.23647642904393,45.18977305238451"
                },
                {
                    "ecoregion": "Upper Salmon River Canyonlands",
                    "bbox": "-114.80950230578674,44.833703650902805,-113.93605552034597,45.451074150351815"
                },
                {
                    "ecoregion": "Monumental Summit Mountains",
                    "bbox": "-115.63815029609924,44.68871395238705,-114.72868749193418,45.22676051968227"
                },
                {
                    "ecoregion": "Long Valley Foothills",
                    "bbox": "-116.10922820511752,44.503254878709754,-115.7935991792587,45.001604104645764"
                },
                {
                    "ecoregion": "Weiser River Valley and Uplands",
                    "bbox": "-117.17112907284837,43.72932415888289,-116.12006502498087,44.90078948094981"
                },
                {
                    "ecoregion": "Long Valley Basin",
                    "bbox": "-116.23858103508667,44.2301513453084,-115.86836737435482,44.931116214841495"
                },
                {
                    "ecoregion": "Bear Valley - Landmark Basin and Uplands",
                    "bbox": "-115.71422418989442,44.11891541101744,-115.26872854868355,44.96195996897745"
                }
            ],
            "Pike and San Isabel National Forests": [
                {
                    "ecoregion": "Upper Arkansas Valley",
                    "bbox": "-106.39796884828371,38.45358464971184,-105.94057607572529,39.32459260956131"
                },
                {
                    "ecoregion": "Pikes Peak-Rampart Range",
                    "bbox": "-105.53583405120048,38.62096638618982,-104.859923023129,39.45703377708719"
                },
                {
                    "ecoregion": "Sawatch Range",
                    "bbox": "-106.93768613830463,38.39095387222346,-106.10235331994971,39.59793988082089"
                },
                {
                    "ecoregion": "South Park",
                    "bbox": "-106.10332020806112,38.640685562588715,-105.32122280139112,39.4340074598764"
                },
                {
                    "ecoregion": "Northern Arkansas Granitics-39 Mile Mountain",
                    "bbox": "-106.14868229804961,38.40584756441359,-104.83774420093408,38.92111185542785"
                },
                {
                    "ecoregion": "Arkansas Vally Tablelands",
                    "bbox": "-105.28845976000986,37.67252920925563,-102.49792547637958,38.83355409934228"
                },
                {
                    "ecoregion": "San Juan Mountains - Weminuche Wilderness",
                    "bbox": "-107.97605245765476,37.38769806221586,-106.00804823743618,38.55266342807482"
                },
                {
                    "ecoregion": "Sangre de Cristo",
                    "bbox": "-106.13652238300153,35.72411167821144,-104.84103897157127,38.50378998372082"
                },
                {
                    "ecoregion": "Wet Mountains",
                    "bbox": "-105.87593707883309,37.73802540844588,-104.89688927002373,38.54718449916538"
                },
                {
                    "ecoregion": "Wet Mountain Valley",
                    "bbox": "-105.85762569307127,37.40528145397599,-104.67910568417994,38.45768154906432"
                },
                {
                    "ecoregion": "Picketwire Canyonlands-Rolling Plains",
                    "bbox": "-104.85872391207886,37.04302774573392,-102.14870770109951,38.13148005456094"
                },
                {
                    "ecoregion": "Northern Front Range Foothills",
                    "bbox": "-105.32212800230542,39.38621444394147,-105.00590909133149,40.986373193568056"
                },
                {
                    "ecoregion": "Sandy-Smooth High Plains",
                    "bbox": "-104.97579797889358,35.602743558168754,-100.40779728741484,37.50192980641549"
                },
                {
                    "ecoregion": "Tablelands-Red Hills",
                    "bbox": "-104.28416021122473,36.73714531500434,-102.45953104312309,37.21280536697418"
                },
                {
                    "ecoregion": "Mosquito-Gore Range",
                    "bbox": "-106.4699373899985,38.897930816154314,-105.86513940735773,39.881371895896336"
                },
                {
                    "ecoregion": "Indian Peaks-Williams Mountains",
                    "bbox": "-106.30330527082157,39.420585716857374,-105.35918288997834,40.77465296106533"
                },
                {
                    "ecoregion": "Platte River",
                    "bbox": "-105.81635401292732,38.918389276643836,-105.07853523531281,39.74145142664207"
                },
                {
                    "ecoregion": "Black Forest",
                    "bbox": "-105.00707781788697,38.73766503641235,-103.84504904427791,39.753852170241544"
                },
                {
                    "ecoregion": "Southern Front Range Foothills",
                    "bbox": "-105.17762523631558,36.99980460240056,-103.96982469735184,39.44473147058096"
                },
                {
                    "ecoregion": "Sand Hill-Ogolla Plateau",
                    "bbox": "-103.2543704006734,36.882187670624546,-100.31876399296385,37.97471626634268"
                }
            ],
            "Plumas National Forest": [
                {
                    "ecoregion": "Shingletown-Paradise",
                    "bbox": "-122.08861115967727,39.72660965591092,-121.27201036158885,40.9954657882156"
                },
                {
                    "ecoregion": "Honey Lake Basin-Pyramid Lake Basin",
                    "bbox": "-120.70335340523542,39.58029372177788,-119.17439294687694,40.91824390533202"
                },
                {
                    "ecoregion": "Fredonyer Butte-Grizzly Peak",
                    "bbox": "-121.09133477737805,39.92541580279709,-120.65674345464669,40.425303133832585"
                },
                {
                    "ecoregion": "Diamond Mountains-Crystal Peak",
                    "bbox": "-120.80163112597563,39.85765915494608,-120.01987724773676,40.360433798980694"
                },
                {
                    "ecoregion": "Greenville-Graeagle",
                    "bbox": "-121.3539572528249,39.68988456402144,-120.50761085555649,40.20835520792656"
                },
                {
                    "ecoregion": "Granitic and Metamorphic Foothills",
                    "bbox": "-121.61184330572394,39.11628828187878,-120.78704689409886,40.063520433821"
                },
                {
                    "ecoregion": "Bucks Lake",
                    "bbox": "-121.51008386777625,39.77110939408334,-120.88366844764073,40.040173807775034"
                },
                {
                    "ecoregion": "Frenchman",
                    "bbox": "-120.74048815180674,39.61462984828893,-120.09412709878654,40.20859319731824"
                },
                {
                    "ecoregion": "Lower Foothills Metamorphic Belt",
                    "bbox": "-121.61221866386023,37.07732113286403,-119.89971675262598,39.82389576168009"
                },
                {
                    "ecoregion": "Tuscan Flows",
                    "bbox": "-122.22978627581597,39.608721863623146,-121.57772076010497,40.70438213792539"
                },
                {
                    "ecoregion": "Lassen-Almanor",
                    "bbox": "-121.71951627085917,40.01789379656151,-120.9301136163503,40.841833174061776"
                },
                {
                    "ecoregion": "Upper Batholith and Volcanic Flows",
                    "bbox": "-121.12486812676258,38.02476818320514,-119.63953560738236,39.8536662460005"
                },
                {
                    "ecoregion": "Fort Sage Mountains-Lemmon Valley",
                    "bbox": "-120.12644448562446,39.17411374335461,-119.3162178618648,40.114334437084665"
                },
                {
                    "ecoregion": "Upper Foothills Metamorphic Belt",
                    "bbox": "-121.1639416129151,37.468060675359936,-119.67924557702173,39.73211464357598"
                },
                {
                    "ecoregion": "Sierra Valley",
                    "bbox": "-120.4367234068597,39.56041039662256,-120.13474980475962,39.86673055257302"
                }
            ],
            "Prescott National Forest": [
                {
                    "ecoregion": "Verde Plains Desert Grass-Shrubland",
                    "bbox": "-112.17688964793888,32.864099342710574,-109.32745842626531,34.87507406871333"
                },
                {
                    "ecoregion": "Coconino Plateau Coniferous Forest",
                    "bbox": "-112.18227945942948,34.08602751605707,-109.57939825442588,35.48587649910121"
                },
                {
                    "ecoregion": "Chino High Plains Grassland",
                    "bbox": "-112.80464686825832,34.64240852683213,-112.17865881944891,35.144672593365556"
                },
                {
                    "ecoregion": "Coconino Plateau Woodland",
                    "bbox": "-112.70976226171899,34.204964363014994,-109.55669791987305,35.56199294341968"
                },
                {
                    "ecoregion": "Mazatzal Mountains Woodland",
                    "bbox": "-113.06679922760225,32.970238309950105,-109.53321247357678,35.124233554634884"
                },
                {
                    "ecoregion": "Mazatzal Mountains Interior Chapparral",
                    "bbox": "-113.15683299084981,33.158594042381196,-109.99945762466962,34.89931680442703"
                },
                {
                    "ecoregion": "Aquarius Mountains Woodland",
                    "bbox": "-113.95123504675996,34.844773564448474,-112.51185202035441,36.015330291559735"
                }
            ],
            "Rio Grande National Forest": [
                {
                    "ecoregion": "San Juan Hills",
                    "bbox": "-106.70169558967967,37.557313954775225,-105.97883318700195,38.259621291789244"
                },
                {
                    "ecoregion": "Brazos Uplift",
                    "bbox": "-106.73236035804405,36.14800651488878,-105.99716905230986,37.43505986761886"
                },
                {
                    "ecoregion": "San Juan Mountains - Weminuche Wilderness",
                    "bbox": "-107.97605245765476,37.38769806221586,-106.00804823743618,38.55266342807482"
                },
                {
                    "ecoregion": "Sangre de Cristo",
                    "bbox": "-106.13652238300153,35.72411167821144,-104.84103897157127,38.50378998372082"
                },
                {
                    "ecoregion": "San Luis Valley",
                    "bbox": "-106.56055265937772,37.019195395850886,-105.46629990141929,38.43222091995955"
                },
                {
                    "ecoregion": "San Juan Mountains Central",
                    "bbox": "-107.89925411858269,37.44054839858978,-107.2779779039571,37.79214245341154"
                },
                {
                    "ecoregion": "Mogotes",
                    "bbox": "-106.43103419677072,36.514086481406025,-105.90287212394935,37.67425779885838"
                },
                {
                    "ecoregion": "San Juan Mountains - South San Juan Wilderness",
                    "bbox": "-106.89652941130328,37.00094168271255,-106.31352234987651,37.62970654841854"
                }
            ],
            "Rogue River-Siskiyou National Forests": [
                {
                    "ecoregion": "Northern Franciscan Redwood Forest",
                    "bbox": "-124.24192597910064,41.08097615762364,-123.81165727476338,42.1008192352196"
                },
                {
                    "ecoregion": "Gasquet Mountain Ultramafics",
                    "bbox": "-124.08219306206013,41.20643018460538,-123.6401613350775,42.05106218806958"
                },
                {
                    "ecoregion": "Siskiyou Mountains",
                    "bbox": "-123.85303326277483,41.48730379663294,-123.30080101795261,42.02318113889851"
                },
                {
                    "ecoregion": "Medicine Lake Lava Flows",
                    "bbox": "-122.36841228519876,41.10303932070815,-121.15308190080907,42.4759183181759"
                },
                {
                    "ecoregion": "Lower Salmon Mountains",
                    "bbox": "-123.58520947913411,41.16304987844916,-123.15262276772654,41.992836541773045"
                },
                {
                    "ecoregion": "Klamath River Ridges",
                    "bbox": "-123.28988760372988,41.30500014184315,-122.43311821503357,42.08816283504683"
                },
                {
                    "ecoregion": "Western Cascades Highland Forest",
                    "bbox": "-122.99084123913184,42.862939303406165,-121.04186360402207,47.40690022086858"
                },
                {
                    "ecoregion": "Mid-Coastal Sedimentary",
                    "bbox": "-124.2303251743673,42.682223463741934,-123.28083938882668,44.85458071792584"
                },
                {
                    "ecoregion": "Coastal Lowlands and Uplands",
                    "bbox": "-124.76261517584965,42.08210297377326,-123.39990234141987,48.387801294993835"
                },
                {
                    "ecoregion": "Inland Siskiyous",
                    "bbox": "-123.92499811636992,41.882480382763504,-122.60459735268563,43.20887599842865"
                },
                {
                    "ecoregion": "Southern Oregon Cascades",
                    "bbox": "-123.12841323138548,42.080683631344584,-122.21723741927144,43.21238027063305"
                },
                {
                    "ecoregion": "Southern Oregon Cascade Highlands",
                    "bbox": "-122.35395221102567,42.23823813228404,-121.88308967075164,43.402764726111286"
                },
                {
                    "ecoregion": "Coastal Siskiyous",
                    "bbox": "-124.38046260306663,41.99679159735439,-123.7235274896019,42.8130271636727"
                },
                {
                    "ecoregion": "Siskiyou Serpentine",
                    "bbox": "-124.06790055766459,40.79954846788752,-123.26042889367847,42.561917839636635"
                },
                {
                    "ecoregion": "Rogue-Illinois Valleys and Foothills",
                    "bbox": "-123.74330482066091,42.00361418444709,-122.4077774313833,42.76079277296816"
                },
                {
                    "ecoregion": "Southern Coastal Mountains",
                    "bbox": "-124.4640349550491,41.99830524269282,-124.04131686687987,43.03838341975904"
                }
            ],
            "Salmon-Challis National Forest": [
                {
                    "ecoregion": "North Fork Big Lost River-Copper Basin-White Knob Mountains",
                    "bbox": "-114.5490756950872,43.54124306591484,-113.39872537817365,44.128108048947354"
                },
                {
                    "ecoregion": "East Fork Salmon River Mountains",
                    "bbox": "-114.75792939432603,43.95410893807707,-113.95658450477106,44.821721994074835"
                },
                {
                    "ecoregion": "Southern Beaverhead Mountains",
                    "bbox": "-113.23267857915306,43.95000249062252,-111.36324206157184,44.98445516187627"
                },
                {
                    "ecoregion": "Stanley Basin-Sawtooth Valley",
                    "bbox": "-115.285396355957,43.84362372095802,-114.71738997456765,44.473135538374436"
                },
                {
                    "ecoregion": "Cabin Creek Peak",
                    "bbox": "-115.0321977638157,43.96627585434726,-114.69940801766586,44.487950261095705"
                },
                {
                    "ecoregion": "Northern Lost River Range Mountains",
                    "bbox": "-114.23314622371919,43.59519478760939,-113.04640442112708,44.665572900568975"
                },
                {
                    "ecoregion": "Sawtooth Range",
                    "bbox": "-115.2852452491689,43.60796345914639,-114.66172082115895,44.346646165987806"
                },
                {
                    "ecoregion": "Pahsimeroi-Round-Big Lost-Little Lost River Valleys",
                    "bbox": "-114.23796701706414,43.63698202569998,-112.88152285209793,44.68572542968491"
                },
                {
                    "ecoregion": "Southern Lemhi Range",
                    "bbox": "-113.40875402138096,43.82290634205407,-112.83943287342834,44.574821806581156"
                },
                {
                    "ecoregion": "Smoky Mountains",
                    "bbox": "-114.74060969368236,43.46407218898037,-114.2387440618889,43.99791314957224"
                },
                {
                    "ecoregion": "Central Idaho Glaciated Mountains",
                    "bbox": "-115.54612661285285,45.46894820929248,-114.32024965040102,46.67106179176835"
                },
                {
                    "ecoregion": "South Anaconda-Bitterroot Mountains",
                    "bbox": "-114.56546483033759,45.459315498911224,-113.47952833356572,46.24880029120055"
                },
                {
                    "ecoregion": "Salmon River Canyonlands",
                    "bbox": "-116.31121209656095,44.71669982024059,-114.74142106473033,45.682275086026436"
                },
                {
                    "ecoregion": "Anaconda Mountains",
                    "bbox": "-113.94473286562919,45.64540371580887,-113.03613461841786,46.067025838871416"
                },
                {
                    "ecoregion": "Chamberlain Basin",
                    "bbox": "-115.37884017033758,45.125172665186426,-114.66463992339374,45.54082191120227"
                },
                {
                    "ecoregion": "Southwest Montana Intermontane Basins and Valleys",
                    "bbox": "-113.69148368842144,44.51275086875762,-111.44737811940468,46.060849421863395"
                },
                {
                    "ecoregion": "Biterroot Range",
                    "bbox": "-114.13409325679834,44.45193455533553,-112.99430902694002,45.70588239495663"
                },
                {
                    "ecoregion": "Copper Mountain-Point of Rock",
                    "bbox": "-114.80669415201345,45.325835058641076,-114.01139658718273,45.57076954397934"
                },
                {
                    "ecoregion": "East Bitterroot Range-Big Hole Divide",
                    "bbox": "-113.93422122263127,44.78462263672537,-113.14480482018627,45.69281131558978"
                },
                {
                    "ecoregion": "Upper Salmon River Canyonlands",
                    "bbox": "-114.80950230578674,44.833703650902805,-113.93605552034597,45.451074150351815"
                },
                {
                    "ecoregion": "Monumental Summit Mountains",
                    "bbox": "-115.63815029609924,44.68871395238705,-114.72868749193418,45.22676051968227"
                },
                {
                    "ecoregion": "Panther Creek Mountain",
                    "bbox": "-114.62454763486545,44.80604127728316,-113.95394021287052,45.36630006669475"
                },
                {
                    "ecoregion": "Big Horn Crags",
                    "bbox": "-114.67241524596682,44.88142620585478,-114.41386336200452,45.25228519940248"
                },
                {
                    "ecoregion": "Lemhi and Birch Creek Valleys",
                    "bbox": "-113.9383749123723,43.82107787194627,-112.72826879137159,45.366268840434714"
                },
                {
                    "ecoregion": "Bear Valley - Landmark Basin and Uplands",
                    "bbox": "-115.71422418989442,44.11891541101744,-115.26872854868355,44.96195996897745"
                },
                {
                    "ecoregion": "Salmon Front",
                    "bbox": "-114.26950572860648,44.56438361031542,-113.89669107743123,45.35266059600974"
                },
                {
                    "ecoregion": "Northern Lemhi Range",
                    "bbox": "-114.02680466910016,44.31666593728323,-113.36378148802521,45.09209365689679"
                },
                {
                    "ecoregion": "Yankee Fork-East Salmon River Mountains",
                    "bbox": "-114.97138739940891,44.16354245991664,-114.26950572860648,44.88775775771438"
                },
                {
                    "ecoregion": "Stanley Uplands",
                    "bbox": "-115.40825436574636,44.36991584783817,-114.69897454803692,44.742239122037915"
                },
                {
                    "ecoregion": "Lost River Valleys",
                    "bbox": "-113.12750897136192,43.47175775921329,-112.21932384392022,44.285658787123396"
                },
                {
                    "ecoregion": "Pioneer Mountains",
                    "bbox": "-114.34355086697889,43.43254701223486,-113.79051023685793,43.82842244084304"
                },
                {
                    "ecoregion": "Pioneer Foothills",
                    "bbox": "-114.75363460275469,43.2796546516409,-113.3957434133278,43.7289316560711"
                }
            ],
            "San Bernardino National Forest": [
                {
                    "ecoregion": "Fontana Plain-Calimesa Terraces",
                    "bbox": "-117.7999464463714,33.78311091723509,-116.70567574603882,34.24673277020122"
                },
                {
                    "ecoregion": "San Jacinto Foothills-Cahuilla Mountains",
                    "bbox": "-117.17446762428142,33.30924350188616,-116.21243148482512,33.99917440937156"
                },
                {
                    "ecoregion": "Little San Bernardino-Bighorn Mountains",
                    "bbox": "-117.22955234876184,33.70446613330546,-116.00482228631944,34.417820951875456"
                },
                {
                    "ecoregion": "San Gorgonio Mountains",
                    "bbox": "-117.46493569402702,33.94413174528387,-116.52319804275544,34.37614081314808"
                },
                {
                    "ecoregion": "High Desert Plains and Hills",
                    "bbox": "-118.79258710680949,34.266078103821485,-116.89696900601479,35.9945155385613"
                },
                {
                    "ecoregion": "Upper San Gabriel Mountains",
                    "bbox": "-118.2393081320646,34.19456930003321,-117.49678045295553,34.426742674434934"
                },
                {
                    "ecoregion": "Upper San Gorgornio Mountains",
                    "bbox": "-117.30809393278872,34.04116849692866,-116.61527370411812,34.32310780737947"
                },
                {
                    "ecoregion": "Perris Valley and Hills",
                    "bbox": "-117.53277329704997,33.43164081327296,-116.84976036414946,34.04758545110775"
                },
                {
                    "ecoregion": "Coachella Valley",
                    "bbox": "-116.74325272343441,33.09790850117645,-115.59229779140992,33.99801769506064"
                },
                {
                    "ecoregion": "San Jacinto Mountains",
                    "bbox": "-116.92853393819064,33.51905534602747,-116.41174478369476,33.89024191403314"
                },
                {
                    "ecoregion": "Desert Slopes",
                    "bbox": "-116.7493934490484,32.610764280247395,-115.90124386161489,33.91153473763808"
                },
                {
                    "ecoregion": "San Gabriel Mountains",
                    "bbox": "-118.48693517501829,34.12377357409122,-117.38698767334239,34.500735679108345"
                },
                {
                    "ecoregion": "Lucerne-Johnson Valleys and Hills",
                    "bbox": "-117.33321740785703,34.032434134627636,-115.75124185372852,34.82328416163483"
                }
            ],
            "San Juan National Forest": [
                {
                    "ecoregion": "Monument Upwarp",
                    "bbox": "-110.49978326818325,35.58297452515427,-108.08933715098868,38.01346677087486"
                },
                {
                    "ecoregion": "San Juan Mountains - Weminuche Wilderness",
                    "bbox": "-107.97605245765476,37.38769806221586,-106.00804823743618,38.55266342807482"
                },
                {
                    "ecoregion": "Canyon of Ancients-Blanding Basin",
                    "bbox": "-110.28379317511491,35.92631621112429,-108.25493761108186,37.803501770390426"
                },
                {
                    "ecoregion": "San Juan Mountains West",
                    "bbox": "-108.33607200531878,37.26710803560741,-107.73839239139573,38.036034877207896"
                },
                {
                    "ecoregion": "San Juan Mountains Central",
                    "bbox": "-107.89925411858269,37.44054839858978,-107.2779779039571,37.79214245341154"
                },
                {
                    "ecoregion": "Salt Anticline Benchlands",
                    "bbox": "-109.83440474288454,37.667302767708634,-108.21981387630933,38.87406890015967"
                },
                {
                    "ecoregion": "San Juan Mountains South Central",
                    "bbox": "-107.83436934686785,37.22605127005011,-107.17289492156334,37.59393245631787"
                },
                {
                    "ecoregion": "San Juan Basin-Mesa Verde",
                    "bbox": "-108.73603403334391,36.91325979590289,-108.04084297502322,37.346977109805835"
                },
                {
                    "ecoregion": "San Juan Basin North",
                    "bbox": "-108.20791160263832,36.82813750644084,-106.56404165030187,37.542364208741276"
                },
                {
                    "ecoregion": "San Juan Mountains - South San Juan Wilderness",
                    "bbox": "-106.89652941130328,37.00094168271255,-106.31352234987651,37.62970654841854"
                }
            ],
            "Santa Fe National Forest": [
                {
                    "ecoregion": "Manzano Mountains Woodland",
                    "bbox": "-106.87098840798859,33.90168456309215,-104.62738592242232,36.20972334555603"
                },
                {
                    "ecoregion": "North Central Rio Grande Intermontane",
                    "bbox": "-106.95294099373183,35.31647976502916,-106.27248673907172,35.737766560578336"
                },
                {
                    "ecoregion": "Brazos Uplift",
                    "bbox": "-106.73236035804405,36.14800651488878,-105.99716905230986,37.43505986761886"
                },
                {
                    "ecoregion": "Sangre de Cristo Mountains Woodland",
                    "bbox": "-105.87640160924684,35.469063335304725,-104.23305705703751,37.15389721798226"
                },
                {
                    "ecoregion": "Sangre de Cristo",
                    "bbox": "-106.13652238300153,35.72411167821144,-104.84103897157127,38.50378998372082"
                },
                {
                    "ecoregion": "Sangre de Cristo Mountains Coniferous Forest",
                    "bbox": "-106.01795325264044,35.32750131733201,-104.53010816236178,36.89910282743358"
                },
                {
                    "ecoregion": "Jemez and San Pedro Mountains Coniferous Forest",
                    "bbox": "-106.96291488081704,35.57580902566605,-106.14367526680007,36.40701434523589"
                },
                {
                    "ecoregion": "Southern San Luis Grasslands",
                    "bbox": "-106.20266451305679,35.86548543120773,-105.90927551635195,36.40772259192414"
                },
                {
                    "ecoregion": "Chaco Basin High Desert Shrubland",
                    "bbox": "-109.15041669037794,35.44622593597819,-106.43519025262805,36.97500773142173"
                }
            ],
            "Savannah River Site": [
                {
                    "ecoregion": "Floodplains and Terraces",
                    "bbox": "-83.47727712334051,31.672942280761674,-81.43209054274433,33.49203100722525"
                },
                {
                    "ecoregion": "Atlantic Southern Loam Hills",
                    "bbox": "-83.88654855906873,31.623647903328106,-81.27300711608552,33.73768790986918"
                }
            ],
            "Sawtooth National Forest": [
                {
                    "ecoregion": "North Fork Big Lost River-Copper Basin-White Knob Mountains",
                    "bbox": "-114.5490756950872,43.54124306591484,-113.39872537817365,44.128108048947354"
                },
                {
                    "ecoregion": "East Fork Salmon River Mountains",
                    "bbox": "-114.75792939432603,43.95410893807707,-113.95658450477106,44.821721994074835"
                },
                {
                    "ecoregion": "Stanley Basin-Sawtooth Valley",
                    "bbox": "-115.285396355957,43.84362372095802,-114.71738997456765,44.473135538374436"
                },
                {
                    "ecoregion": "Cabin Creek Peak",
                    "bbox": "-115.0321977638157,43.96627585434726,-114.69940801766586,44.487950261095705"
                },
                {
                    "ecoregion": "Sawtooth Range",
                    "bbox": "-115.2852452491689,43.60796345914639,-114.66172082115895,44.346646165987806"
                },
                {
                    "ecoregion": "South Fork Payette Canyon and Stream Cut Lands Canyon",
                    "bbox": "-115.9109258674348,44.00019646709336,-115.18021765871794,44.27213256086907"
                },
                {
                    "ecoregion": "Upper Middle Fork Boise River",
                    "bbox": "-115.82384435093599,43.68903753135703,-115.17094362225032,44.11747222126604"
                },
                {
                    "ecoregion": "South Fork Boise River Uplands",
                    "bbox": "-115.61874843739042,43.334653804729385,-114.6522137460675,43.866179779972924"
                },
                {
                    "ecoregion": "Smoky Mountains",
                    "bbox": "-114.74060969368236,43.46407218898037,-114.2387440618889,43.99791314957224"
                },
                {
                    "ecoregion": "Yankee Fork-East Salmon River Mountains",
                    "bbox": "-114.97138739940891,44.16354245991664,-114.26950572860648,44.88775775771438"
                },
                {
                    "ecoregion": "Pioneer Mountains",
                    "bbox": "-114.34355086697889,43.43254701223486,-113.79051023685793,43.82842244084304"
                },
                {
                    "ecoregion": "Soldier Mountain Foothills",
                    "bbox": "-115.31340385520372,43.29960516514632,-114.71900193199355,43.579501742911134"
                },
                {
                    "ecoregion": "Mt. Bennett Hills-Camas Prairie",
                    "bbox": "-115.8049052257955,43.0032226571999,-113.97332011822886,43.483775862865855"
                },
                {
                    "ecoregion": "Pioneer Foothills",
                    "bbox": "-114.75363460275469,43.2796546516409,-113.3957434133278,43.7289316560711"
                },
                {
                    "ecoregion": "South Central Idaho Ranges",
                    "bbox": "-114.85409041673933,41.340355396284565,-112.16042588244846,42.90051435175599"
                },
                {
                    "ecoregion": "Southern Idaho Terraces",
                    "bbox": "-114.16267033716628,42.023488326625,-111.65843439413197,43.95703118703972"
                },
                {
                    "ecoregion": "Salmon Falls Creek Buttes",
                    "bbox": "-116.01242423578981,42.01421420202388,-114.33965020419356,42.918735883554234"
                },
                {
                    "ecoregion": "Curlew-Bear River-Blue Creek Valleys",
                    "bbox": "-113.1982477630238,41.449512356110404,-112.00357426014398,42.528173917592255"
                }
            ],
            "Sequoia National Forest": [
                {
                    "ecoregion": "Eastern Slopes",
                    "bbox": "-119.985234748285,34.81669572742595,-117.86965224705352,38.826133886669595"
                },
                {
                    "ecoregion": "Southern Granitic Foothills",
                    "bbox": "-118.9190226187988,34.9794831621183,-118.31399991356511,35.92006520074847"
                },
                {
                    "ecoregion": "Tehachapi-Piute Mountains",
                    "bbox": "-118.7123543575675,34.919534023576375,-118.19330654406173,35.60611587914457"
                },
                {
                    "ecoregion": "Glaciated Batholith",
                    "bbox": "-119.9555332329723,36.28050017404382,-118.10432225726635,38.30331992557416"
                },
                {
                    "ecoregion": "Upper Batholith",
                    "bbox": "-119.81006914477518,36.00687921480397,-118.34251500006718,37.994568891341316"
                },
                {
                    "ecoregion": "Lower Batholith",
                    "bbox": "-119.91834361786363,35.55244632333921,-118.32090949567663,37.76014349492641"
                },
                {
                    "ecoregion": "Lower Granitic Foothills",
                    "bbox": "-120.12968805965619,35.759809047349734,-118.63018497495659,37.49976974997401"
                },
                {
                    "ecoregion": "Kern Plateau",
                    "bbox": "-118.48534976737784,35.55527172341135,-117.98274778418283,36.427438187222606"
                }
            ],
            "Shasta-Trinity National Forest": [
                {
                    "ecoregion": "Eastern Franciscan",
                    "bbox": "-123.90652071935568,39.00779704789551,-122.40732233485784,41.50958941871676"
                },
                {
                    "ecoregion": "High Cascade",
                    "bbox": "-122.4244327794492,41.24825360242187,-121.6873695348761,42.04308191090149"
                },
                {
                    "ecoregion": "Central Franciscan",
                    "bbox": "-124.10581135800771,38.54716710537764,-122.36044421093158,41.329664425772705"
                },
                {
                    "ecoregion": "Shasta Valley",
                    "bbox": "-122.609933401805,41.36778501996275,-122.18515666384894,41.84429061901693"
                },
                {
                    "ecoregion": "Medicine Lake Lava Flows",
                    "bbox": "-122.36841228519876,41.10303932070815,-121.15308190080907,42.4759183181759"
                },
                {
                    "ecoregion": "Upper Salmon Mountains",
                    "bbox": "-123.45720944086298,41.091177593870896,-122.88581601839451,41.789249876780445"
                },
                {
                    "ecoregion": "Shingletown-Paradise",
                    "bbox": "-122.08861115967727,39.72660965591092,-121.27201036158885,40.9954657882156"
                },
                {
                    "ecoregion": "Siskiyou Serpentine",
                    "bbox": "-124.06790055766459,40.79954846788752,-123.26042889367847,42.561917839636635"
                },
                {
                    "ecoregion": "North Trinity Mountain",
                    "bbox": "-123.58893554214154,40.78006444172064,-123.1642838980834,41.30312349865062"
                },
                {
                    "ecoregion": "Rattlesnake Creek",
                    "bbox": "-123.76891123526525,40.14471925189201,-122.73880154215743,41.15675212760863"
                },
                {
                    "ecoregion": "Scott Valley",
                    "bbox": "-122.99464083610565,41.28783533593207,-122.51910013586257,41.74936641802583"
                },
                {
                    "ecoregion": "Big Valley Mountains",
                    "bbox": "-121.54003588115097,40.8012015710957,-120.84077316474975,41.35230011885545"
                },
                {
                    "ecoregion": "Trinity Mountain-Hayfork",
                    "bbox": "-123.54456128997151,40.247867036234766,-122.79191858327596,41.205691960815386"
                },
                {
                    "ecoregion": "Upper Scott Mountains",
                    "bbox": "-123.17693965074426,40.77553349627391,-122.29002761488249,41.48533515639241"
                },
                {
                    "ecoregion": "Medicine Lake Highlands",
                    "bbox": "-121.92495843238572,41.42335920316475,-121.41651398822995,41.71739809404687"
                },
                {
                    "ecoregion": "Eastern Klamath Mountains",
                    "bbox": "-122.97492070732477,40.48751078029835,-121.78639903129022,41.37692743705162"
                },
                {
                    "ecoregion": "Oregon Mountain",
                    "bbox": "-123.18051307182077,40.417831161578874,-122.45365054133936,41.060108601830564"
                },
                {
                    "ecoregion": "Hat Creek Rim",
                    "bbox": "-122.21179909655103,40.595673018894786,-121.24937662902818,41.397670407963005"
                },
                {
                    "ecoregion": "Tehama Terraces",
                    "bbox": "-122.65548579193569,39.53297322493444,-122.11678953101199,40.73456577888766"
                },
                {
                    "ecoregion": "Western Foothills",
                    "bbox": "-122.89937627859234,38.32558995431299,-122.03086322695634,40.48981514195526"
                }
            ],
            "Shawnee National Forest": [
                {
                    "ecoregion": "North Mississippi River Alluvial Plain",
                    "bbox": "-91.34381233956776,32.42148531009906,-88.99824635538494,37.319782337784716"
                },
                {
                    "ecoregion": "Cretaceous Hills",
                    "bbox": "-89.25182377704562,37.115144119805336,-88.45570630660075,37.30678121218324"
                },
                {
                    "ecoregion": "Mount Vernon Hill Country",
                    "bbox": "-90.1386548712253,37.62848247758433,-87.78047712292084,38.823806434919106"
                },
                {
                    "ecoregion": "Lower Wabash Alluvial Plain",
                    "bbox": "-88.6624937693719,37.63731148543678,-87.00603368430706,39.70454520499726"
                },
                {
                    "ecoregion": "Lower Ohio-Cache-Wabash Alluvial Plains",
                    "bbox": "-88.23534044700398,37.52342868988217,-86.83268883741988,38.11974098086165"
                },
                {
                    "ecoregion": "Greater Shawnee Hills",
                    "bbox": "-89.65260678537481,37.44952153808856,-88.1702674507822,37.838585065348525"
                },
                {
                    "ecoregion": "Lesser Shawnee Hills",
                    "bbox": "-89.40624449678609,37.29849199091268,-87.97754724281094,37.633882105175076"
                },
                {
                    "ecoregion": "Illinois Ozarks",
                    "bbox": "-90.28922083857083,37.050638503164464,-89.22323851824297,38.91189219197116"
                },
                {
                    "ecoregion": "Ohio and Cache River Alluvial Plain",
                    "bbox": "-89.28345668178042,36.920326452703705,-88.21731904943454,37.43234887300213"
                },
                {
                    "ecoregion": "Mississippi River Alluvial Plain",
                    "bbox": "-90.3864348681746,37.15309759118094,-89.2933287566168,38.881047334367054"
                }
            ],
            "Shoshone National Forest": [
                {
                    "ecoregion": "Bighorn Basin",
                    "bbox": "-109.2831028368264,43.513137918280336,-107.1951387701381,45.25305694272379"
                },
                {
                    "ecoregion": "Beartooth Mountains",
                    "bbox": "-110.26994900973898,44.776196251755664,-109.04026662720304,45.50287269631792"
                },
                {
                    "ecoregion": "North Absaroka Range",
                    "bbox": "-110.48582690518748,44.15648886037263,-109.3082340892318,45.17083450281012"
                },
                {
                    "ecoregion": "Absaroka Sedimentary Mountains",
                    "bbox": "-109.5252018263032,44.47608221742047,-109.01889826414356,44.84020149460332"
                },
                {
                    "ecoregion": "Absaroka Range",
                    "bbox": "-109.61271670990823,43.51733574135142,-108.5722188363302,44.32655311083744"
                },
                {
                    "ecoregion": "Northern Rocky Mountain Foothills",
                    "bbox": "-109.64957865702934,43.92714656616113,-108.72872547959719,44.545986186413415"
                },
                {
                    "ecoregion": "Red Mountains-Leidy Uplands",
                    "bbox": "-110.70534197105508,43.16420072518338,-109.7828599891971,44.306254709887014"
                },
                {
                    "ecoregion": "Throughfare Plateau",
                    "bbox": "-110.3673278805772,43.519091461701635,-109.42415761198419,44.38441670716537"
                },
                {
                    "ecoregion": "Wind River Mountains",
                    "bbox": "-109.99379805163875,42.47320007142622,-108.75647620890987,43.555437043284996"
                },
                {
                    "ecoregion": "Wind River Mountains Flatirons",
                    "bbox": "-109.78232599604786,42.486828160291395,-108.59781490783172,43.56575351631176"
                },
                {
                    "ecoregion": "South Absaroka Range",
                    "bbox": "-109.86044092730691,43.52773146893219,-109.12131396077064,43.96522224371165"
                },
                {
                    "ecoregion": "Western Wind River Basin",
                    "bbox": "-109.89346057584487,42.47246573990202,-108.05498354165707,43.76160551168505"
                },
                {
                    "ecoregion": "Green River Basin",
                    "bbox": "-110.84841012142994,40.9434633308681,-108.58725788864064,42.75570647187624"
                }
            ],
            "Sierra National Forest": [
                {
                    "ecoregion": "Upper Foothills Metamorphic Belt",
                    "bbox": "-121.1639416129151,37.468060675359936,-119.67924557702173,39.73211464357598"
                },
                {
                    "ecoregion": "Glaciated Batholith",
                    "bbox": "-119.9555332329723,36.28050017404382,-118.10432225726635,38.30331992557416"
                },
                {
                    "ecoregion": "Upper Batholith",
                    "bbox": "-119.81006914477518,36.00687921480397,-118.34251500006718,37.994568891341316"
                },
                {
                    "ecoregion": "Lower Batholith",
                    "bbox": "-119.91834361786363,35.55244632333921,-118.32090949567663,37.76014349492641"
                },
                {
                    "ecoregion": "Lower Granitic Foothills",
                    "bbox": "-120.12968805965619,35.759809047349734,-118.63018497495659,37.49976974997401"
                }
            ],
            "Siuslaw National Forest": [
                {
                    "ecoregion": "Volcanics",
                    "bbox": "-124.00342971870651,44.76555706060992,-122.68811727868945,47.90654309278955"
                },
                {
                    "ecoregion": "Valley Foothills",
                    "bbox": "-123.68181861573652,43.602491894785146,-122.18614452325113,45.953719741672785"
                },
                {
                    "ecoregion": "Prairie Terraces and Floodplains",
                    "bbox": "-123.63255149405614,43.75785467595256,-122.34111517662404,45.65109523185953"
                },
                {
                    "ecoregion": "Mid-Coastal Sedimentary",
                    "bbox": "-124.2303251743673,42.682223463741934,-123.28083938882668,44.85458071792584"
                },
                {
                    "ecoregion": "Coastal Lowlands and Uplands",
                    "bbox": "-124.76261517584965,42.08210297377326,-123.39990234141987,48.387801294993835"
                }
            ],
            "Six Rivers National Forest": [
                {
                    "ecoregion": "Eastern Franciscan",
                    "bbox": "-123.90652071935568,39.00779704789551,-122.40732233485784,41.50958941871676"
                },
                {
                    "ecoregion": "Central Franciscan",
                    "bbox": "-124.10581135800771,38.54716710537764,-122.36044421093158,41.329664425772705"
                },
                {
                    "ecoregion": "Northern Franciscan Redwood Forest",
                    "bbox": "-124.24192597910064,41.08097615762364,-123.81165727476338,42.1008192352196"
                },
                {
                    "ecoregion": "Gasquet Mountain Ultramafics",
                    "bbox": "-124.08219306206013,41.20643018460538,-123.6401613350775,42.05106218806958"
                },
                {
                    "ecoregion": "Siskiyou Mountains",
                    "bbox": "-123.85303326277483,41.48730379663294,-123.30080101795261,42.02318113889851"
                },
                {
                    "ecoregion": "Lower Salmon Mountains",
                    "bbox": "-123.58520947913411,41.16304987844916,-123.15262276772654,41.992836541773045"
                },
                {
                    "ecoregion": "Upper Salmon Mountains",
                    "bbox": "-123.45720944086298,41.091177593870896,-122.88581601839451,41.789249876780445"
                },
                {
                    "ecoregion": "Siskiyou Serpentine",
                    "bbox": "-124.06790055766459,40.79954846788752,-123.26042889367847,42.561917839636635"
                },
                {
                    "ecoregion": "Humboldt Bay Flats and Terraces",
                    "bbox": "-124.34292192770477,40.462183702316054,-123.93330693206923,41.19793281075067"
                },
                {
                    "ecoregion": "Forks of Salmon",
                    "bbox": "-123.43851669758749,41.04442791921315,-122.96279435767343,41.45791075058071"
                },
                {
                    "ecoregion": "North Trinity Mountain",
                    "bbox": "-123.58893554214154,40.78006444172064,-123.1642838980834,41.30312349865062"
                },
                {
                    "ecoregion": "Rattlesnake Creek",
                    "bbox": "-123.76891123526525,40.14471925189201,-122.73880154215743,41.15675212760863"
                },
                {
                    "ecoregion": "Central Franciscan",
                    "bbox": "-124.13916353986542,40.01541144917911,-123.54105817069797,41.21694834588948"
                },
                {
                    "ecoregion": "Trinity Mountain-Hayfork",
                    "bbox": "-123.54456128997151,40.247867036234766,-122.79191858327596,41.205691960815386"
                }
            ],
            "Stanislaus National Forest": [
                {
                    "ecoregion": "Glaciated Batholith and Volcanic Flows",
                    "bbox": "-120.34993133536278,38.19669883358438,-119.4588061726667,39.06450528519082"
                },
                {
                    "ecoregion": "Batholith and Volcanic Flows",
                    "bbox": "-120.62037110204471,37.77151269365595,-119.61711284318312,38.902987151835646"
                },
                {
                    "ecoregion": "Lower Foothills Metamorphic Belt",
                    "bbox": "-121.61221866386023,37.07732113286403,-119.89971675262598,39.82389576168009"
                },
                {
                    "ecoregion": "Upper Batholith and Volcanic Flows",
                    "bbox": "-121.12486812676258,38.02476818320514,-119.63953560738236,39.8536662460005"
                },
                {
                    "ecoregion": "Upper Foothills Metamorphic Belt",
                    "bbox": "-121.1639416129151,37.468060675359936,-119.67924557702173,39.73211464357598"
                },
                {
                    "ecoregion": "Glaciated Batholith",
                    "bbox": "-119.9555332329723,36.28050017404382,-118.10432225726635,38.30331992557416"
                },
                {
                    "ecoregion": "Lower Batholith",
                    "bbox": "-119.91834361786363,35.55244632333921,-118.32090949567663,37.76014349492641"
                }
            ],
            "Superior National Forest": [
                {
                    "ecoregion": "Toimi Uplands",
                    "bbox": "-93.9722097688657,46.512886256795355,-92.12357094864035,47.5516058010669"
                },
                {
                    "ecoregion": "Toimi Uplands",
                    "bbox": "-92.51112982827891,46.919840636036554,-91.59554878424893,47.51111691061698"
                },
                {
                    "ecoregion": "Border Lakes",
                    "bbox": "-93.42587807311452,47.694623922156325,-89.71971444376652,48.64475053580861"
                },
                {
                    "ecoregion": "Littlefork-Vermillion Uplands",
                    "bbox": "-94.968937417228,47.66092226914748,-92.36348691478923,48.611325444114016"
                },
                {
                    "ecoregion": "North Shore Highlands",
                    "bbox": "-92.8703656914235,46.5969148726233,-88.42336688277538,48.190484264437316"
                },
                {
                    "ecoregion": "St. Louis Moraines",
                    "bbox": "-94.09523713718409,46.371562139181435,-92.58340929620203,47.88661342916646"
                },
                {
                    "ecoregion": "Laurentian Highlands",
                    "bbox": "-92.22920072962995,47.3862694799526,-90.75741520364869,47.888045301849274"
                },
                {
                    "ecoregion": "Laurentian Highlands",
                    "bbox": "-93.49519770221212,47.248873246703,-91.83019830700624,47.83889917765498"
                },
                {
                    "ecoregion": "Water",
                    "bbox": "-97.78518055363958,24.53068882942597,-66.79803824267071,49.0053529188022"
                }
            ],
            "Tahoe National Forest": [
                {
                    "ecoregion": "Carson Range",
                    "bbox": "-120.02850523912548,38.76392902810221,-119.79679046141064,39.50135490990124"
                },
                {
                    "ecoregion": "Tahoe-Truckee",
                    "bbox": "-120.40884082704252,39.04166096288316,-119.8634684641982,39.791810899953134"
                },
                {
                    "ecoregion": "Glaciated Batholith and Volcanic Flows",
                    "bbox": "-120.34993133536278,38.19669883358438,-119.4588061726667,39.06450528519082"
                },
                {
                    "ecoregion": "Granitic and Metamorphic Foothills",
                    "bbox": "-121.61184330572394,39.11628828187878,-120.78704689409886,40.063520433821"
                },
                {
                    "ecoregion": "Frenchman",
                    "bbox": "-120.74048815180674,39.61462984828893,-120.09412709878654,40.20859319731824"
                },
                {
                    "ecoregion": "Upper Batholith and Volcanic Flows",
                    "bbox": "-121.12486812676258,38.02476818320514,-119.63953560738236,39.8536662460005"
                },
                {
                    "ecoregion": "Upper Foothills Metamorphic Belt",
                    "bbox": "-121.1639416129151,37.468060675359936,-119.67924557702173,39.73211464357598"
                },
                {
                    "ecoregion": "Sierra Valley",
                    "bbox": "-120.4367234068597,39.56041039662256,-120.13474980475962,39.86673055257302"
                }
            ],
            "Tonto National Forest": [
                {
                    "ecoregion": "Verde Plains Desert Grass-Shrubland",
                    "bbox": "-112.17688964793888,32.864099342710574,-109.32745842626531,34.87507406871333"
                },
                {
                    "ecoregion": "Coconino Plateau Coniferous Forest",
                    "bbox": "-112.18227945942948,34.08602751605707,-109.57939825442588,35.48587649910121"
                },
                {
                    "ecoregion": "Gila Bend Plain Desert Shrubland",
                    "bbox": "-114.71227164412102,31.52956449020911,-110.6101844553483,34.366713317265805"
                },
                {
                    "ecoregion": "White Mountains Scarp Woodland-Coniferous Forest",
                    "bbox": "-111.6552582854415,34.056220270149424,-109.5883756342281,34.87696108468634"
                },
                {
                    "ecoregion": "Mazatzal Mountains Woodland",
                    "bbox": "-113.06679922760225,32.970238309950105,-109.53321247357678,35.124233554634884"
                },
                {
                    "ecoregion": "Mazatzal Mountains Interior Chapparral",
                    "bbox": "-113.15683299084981,33.158594042381196,-109.99945762466962,34.89931680442703"
                },
                {
                    "ecoregion": "White Mountains Coniferous Forest",
                    "bbox": "-110.94623726024133,33.178581809403056,-108.17858476197716,34.28800228207973"
                },
                {
                    "ecoregion": "Gila Bend Low Mountains Desert Cactus-Shrubland",
                    "bbox": "-114.64060013768619,31.5057326718254,-110.73942048496735,34.64364965960414"
                }
            ],
            "Uinta-Wasatch-Cache National Forest": [
                {
                    "ecoregion": "Southern Bear River-Wasatch Ranges",
                    "bbox": "-111.94082197795188,40.727800905787205,-110.96289141490684,41.52929960729108"
                },
                {
                    "ecoregion": "Northern Wasatch Mountains",
                    "bbox": "-112.1050187537125,40.83012252163712,-111.69557326409483,41.82301430606543"
                },
                {
                    "ecoregion": "Canyon Mountain Range",
                    "bbox": "-112.31663532585958,39.18847754240471,-111.54742203040234,41.38820527185584"
                },
                {
                    "ecoregion": "Cache Valley",
                    "bbox": "-112.35856502555544,41.49507531867107,-111.7463466719613,43.006718830109946"
                },
                {
                    "ecoregion": "Bear River Front Range",
                    "bbox": "-111.84139201073265,41.458580128570134,-111.55605738274198,42.650581792415835"
                },
                {
                    "ecoregion": "Northern Wasatch Range",
                    "bbox": "-111.73539657888898,41.43695696778991,-111.20481752860604,42.651852615405915"
                },
                {
                    "ecoregion": "Clay Basin-Corson Peak Uplands",
                    "bbox": "-110.23348332189778,40.87556790863215,-109.32497681003173,41.01149860127947"
                },
                {
                    "ecoregion": "Trout Creek Peak Highlands",
                    "bbox": "-110.04545972528604,40.55423335258723,-109.40416151184428,40.91748891008518"
                },
                {
                    "ecoregion": "West Fork Duchesne River-Soapstone Mountain",
                    "bbox": "-111.41039905357343,40.24191160603584,-110.45078951792186,40.604987118360896"
                },
                {
                    "ecoregion": "Northern Sevier Desert Mountains and Valleys",
                    "bbox": "-113.34019156029223,39.32885687904178,-111.82761084106744,40.25285133532094"
                },
                {
                    "ecoregion": "Curlew-Bear River-Blue Creek Valleys",
                    "bbox": "-113.1982477630238,41.449512356110404,-112.00357426014398,42.528173917592255"
                },
                {
                    "ecoregion": "Green River Basin",
                    "bbox": "-110.84841012142994,40.9434633308681,-108.58725788864064,42.75570647187624"
                },
                {
                    "ecoregion": "West Bear River Divide",
                    "bbox": "-111.47817702794742,40.960056059139845,-110.76268501100441,42.40310557835983"
                },
                {
                    "ecoregion": "Southern Wasatch Range",
                    "bbox": "-111.72538609928904,39.52464093603044,-111.14467898115004,40.28085383703501"
                },
                {
                    "ecoregion": "Southern Salt Lake Mountains and Valleys",
                    "bbox": "-113.10154969606157,40.16674342936585,-111.87122672913023,40.82215409213768"
                },
                {
                    "ecoregion": "North Slope Uinta Mountains",
                    "bbox": "-111.0175189861123,40.822329848443815,-110.18207398182875,41.188992116093345"
                },
                {
                    "ecoregion": "Front Wasatch Mountains",
                    "bbox": "-111.90041285287083,40.40669720571151,-111.50619870320753,40.85996816769682"
                },
                {
                    "ecoregion": "Wasatch Valleys and Hills",
                    "bbox": "-111.60199012944088,40.27242966080024,-111.16289865494895,40.79568632486405"
                },
                {
                    "ecoregion": "Western High Uintas",
                    "bbox": "-110.94505564819957,40.44663571556589,-109.77174193064553,40.94143410060332"
                },
                {
                    "ecoregion": "Kamas Uplands",
                    "bbox": "-111.2692370468522,40.445654599280374,-110.61578760311534,40.84905373634092"
                },
                {
                    "ecoregion": "Mt. Timpanogos-Southern Wasatch Front",
                    "bbox": "-111.82274905572433,39.710153253170176,-111.4120092141539,40.458569640876306"
                },
                {
                    "ecoregion": "Strawberry Valley-Current Creek",
                    "bbox": "-111.29571312296224,40.000829745296585,-110.75929993224605,40.37108955473923"
                },
                {
                    "ecoregion": "Semi-Arid Benchlands and Canyonlands",
                    "bbox": "-111.15317918157393,39.873841931759785,-110.20707257164185,40.18077702434027"
                },
                {
                    "ecoregion": "Eastern Wasatch Mountain Zone",
                    "bbox": "-111.81534959670648,38.72388421388541,-111.00459607364985,39.986372631691665"
                },
                {
                    "ecoregion": "Semi-Arid Hills and Low Mountains",
                    "bbox": "-111.19625565627348,39.67237872709666,-110.38852564044589,40.03760759231659"
                }
            ],
            "Umatilla National Forest": [
                {
                    "ecoregion": "Palouse Hills",
                    "bbox": "-118.23957372704581,46.081464302335746,-116.41257840397014,47.541615645245884"
                },
                {
                    "ecoregion": "Deep Loess Foothills",
                    "bbox": "-118.6380095246198,45.67316180157593,-117.6960792241768,46.445858323303014"
                },
                {
                    "ecoregion": "Umatilla Plateau",
                    "bbox": "-121.41705191321518,44.79714388228439,-118.36988468303167,45.96055206662464"
                },
                {
                    "ecoregion": "Snake River Canyons and Dissected Uplands",
                    "bbox": "-117.6641506178567,44.95660403674697,-116.11045219231477,46.20471088579882"
                },
                {
                    "ecoregion": "Maritime Influenced Forest",
                    "bbox": "-119.52273890137917,45.00023951923845,-117.87633123130126,45.86497980337526"
                },
                {
                    "ecoregion": "John Day River Valleys",
                    "bbox": "-120.21964821429361,44.2225290315896,-118.5499256777278,45.03610164597421"
                },
                {
                    "ecoregion": "Canyons and Dissected Highlands",
                    "bbox": "-118.0727831095528,44.931943159449304,-116.53088900082668,46.1220837707495"
                },
                {
                    "ecoregion": "John Day-Clarno Highlands",
                    "bbox": "-120.96006936281083,43.97715553769797,-118.58331945862608,45.14706343902657"
                },
                {
                    "ecoregion": "Cold Moist Volcanic Ash Forest",
                    "bbox": "-118.93674678593538,44.18452737274009,-117.12669484039452,46.364166832333524"
                }
            ],
            "Umpqua National Forest": [
                {
                    "ecoregion": "West Cascade Slope Forest",
                    "bbox": "-123.24044457915397,43.16430782994246,-121.04511434115386,47.53592981291058"
                },
                {
                    "ecoregion": "Western Cascades Highland Forest",
                    "bbox": "-122.99084123913184,42.862939303406165,-121.04186360402207,47.40690022086858"
                },
                {
                    "ecoregion": "Cascade Crest Forest and Volcanic Peaks",
                    "bbox": "-122.23167682432597,43.351430882329396,-121.32923382588035,47.05299090100931"
                },
                {
                    "ecoregion": "Mid-Coastal Sedimentary",
                    "bbox": "-124.2303251743673,42.682223463741934,-123.28083938882668,44.85458071792584"
                },
                {
                    "ecoregion": "Umpqua Interior Foothills",
                    "bbox": "-123.75373849243744,42.89821212868685,-123.0100595309226,43.720219551990795"
                },
                {
                    "ecoregion": "Inland Siskiyous",
                    "bbox": "-123.92499811636992,41.882480382763504,-122.60459735268563,43.20887599842865"
                },
                {
                    "ecoregion": "Southern Oregon Cascades",
                    "bbox": "-123.12841323138548,42.080683631344584,-122.21723741927144,43.21238027063305"
                },
                {
                    "ecoregion": "Southern Oregon Cascade Highlands",
                    "bbox": "-122.35395221102567,42.23823813228404,-121.88308967075164,43.402764726111286"
                }
            ],
            "Wallowa-Whitman National Forest": [
                {
                    "ecoregion": "Powder-Burnt River Valleys",
                    "bbox": "-118.59845496142731,43.130810558660414,-116.47328023369579,45.291716703862846"
                },
                {
                    "ecoregion": "Snake River Canyons and Dissected Uplands",
                    "bbox": "-117.6641506178567,44.95660403674697,-116.11045219231477,46.20471088579882"
                },
                {
                    "ecoregion": "Maritime Influenced Forest",
                    "bbox": "-119.52273890137917,45.00023951923845,-117.87633123130126,45.86497980337526"
                },
                {
                    "ecoregion": "Wallowa-Seven Devils Mountains",
                    "bbox": "-117.92224895392604,44.86032435778293,-116.91518923739335,45.63044600627825"
                },
                {
                    "ecoregion": "Continental Uplands",
                    "bbox": "-118.12693836401428,45.119654344172716,-116.89876346196417,45.74475008474866"
                },
                {
                    "ecoregion": "Canyons and Dissected Highlands",
                    "bbox": "-118.0727831095528,44.931943159449304,-116.53088900082668,46.1220837707495"
                },
                {
                    "ecoregion": "Subalpine Mountains",
                    "bbox": "-117.62010688542438,44.97577330829159,-117.06183994415807,45.44551141541956"
                },
                {
                    "ecoregion": "Hornet Plateau",
                    "bbox": "-119.52594326317103,44.188984640328954,-117.6157942261226,45.066105079885574"
                },
                {
                    "ecoregion": "Semi-Arid Foothills",
                    "bbox": "-120.24638299477937,43.3715840103938,-117.1055212453092,45.12205644594826"
                },
                {
                    "ecoregion": "Ant Butte-Meadows Valley",
                    "bbox": "-116.78182530429433,44.828941675018314,-116.23647642904393,45.18977305238451"
                },
                {
                    "ecoregion": "Cold Moist Volcanic Ash Forest",
                    "bbox": "-118.93674678593538,44.18452737274009,-117.12669484039452,46.364166832333524"
                },
                {
                    "ecoregion": "Continental Highlands",
                    "bbox": "-119.83952652832659,43.59321525478026,-118.1892414150592,44.31664244339407"
                }
            ],
            "Wayne National Forest": [
                {
                    "ecoregion": "East Hocking Plateau",
                    "bbox": "-82.6115670363896,38.449231806902446,-80.60302814932959,40.581419189843814"
                },
                {
                    "ecoregion": "Western Hocking Plateau",
                    "bbox": "-82.89806608767975,38.53593178422449,-81.83618419294612,39.937555534360456"
                },
                {
                    "ecoregion": "Teays Plateau",
                    "bbox": "-83.00895188711985,37.911541801912676,-81.5059365361422,38.6018457158072"
                },
                {
                    "ecoregion": "Lower Scioto River Plateau",
                    "bbox": "-83.47187706137726,38.58882247677593,-82.47194489474106,39.69820798830807"
                },
                {
                    "ecoregion": "Ohio Valley Lowland",
                    "bbox": "-82.38684918384274,38.413920392612056,-80.68729356384688,40.18454317912449"
                },
                {
                    "ecoregion": "Kinniconick and Licking Knobs",
                    "bbox": "-83.96976103384458,37.80455137904295,-82.72932379835459,38.80126996223902"
                }
            ],
            "White Mountain National Forest": [
                {
                    "ecoregion": "Mahoosic Rangely Lakes",
                    "bbox": "-72.18423716111607,44.23282226613475,-70.0315993531276,45.192715104418596"
                },
                {
                    "ecoregion": "Western Maine Foothills",
                    "bbox": "-71.02321263795284,44.16874780966373,-69.98398748403514,45.058938826765484"
                },
                {
                    "ecoregion": "Northern Piedmont",
                    "bbox": "-72.70428121210819,43.843635124361526,-71.5758031430006,45.00649257107534"
                },
                {
                    "ecoregion": "Gulf of Maine Coastal Plain",
                    "bbox": "-71.88164479397204,41.97200887271134,-70.43553642956255,43.75005447723237"
                },
                {
                    "ecoregion": "White Mountains",
                    "bbox": "-71.88775295333608,43.79439892856777,-70.80554157708207,44.41374564234758"
                },
                {
                    "ecoregion": "Sebago-Ossipee Hills and Plains",
                    "bbox": "-71.79689462688549,43.26009654202187,-70.25063914887755,44.25165341687176"
                },
                {
                    "ecoregion": "Southern Piedmont",
                    "bbox": "-72.83551138943903,42.44811241365704,-71.93833759170644,44.30234088372487"
                },
                {
                    "ecoregion": "Gulf of Maine Coastal Lowland",
                    "bbox": "-71.1090489027846,42.5428340900213,-70.19192350426624,43.93981738606357"
                },
                {
                    "ecoregion": "Sunapee Uplands",
                    "bbox": "-72.37997843195905,42.80387564814271,-71.50760152768834,44.106849484116424"
                }
            ],
            "White River National Forest": [
                {
                    "ecoregion": "West Elks",
                    "bbox": "-107.59085408344913,38.44154149544369,-106.85538177105184,39.15790783777652"
                },
                {
                    "ecoregion": "Elk Mountains",
                    "bbox": "-107.2495591681211,38.69620013332957,-106.49513295292343,39.29558409832754"
                },
                {
                    "ecoregion": "Grand Mesa Break",
                    "bbox": "-108.03282094503055,38.79757116217945,-107.33047764502726,39.23940431705563"
                },
                {
                    "ecoregion": "Lower Roaring Fork Valley",
                    "bbox": "-107.33023666898703,39.17165707161661,-106.7006078461751,39.84282369026113"
                },
                {
                    "ecoregion": "Sawatch Range",
                    "bbox": "-106.93768613830463,38.39095387222346,-106.10235331994971,39.59793988082089"
                },
                {
                    "ecoregion": "Williams Fork Mountains and Hills",
                    "bbox": "-108.14204021438434,39.655715482083906,-106.39561390335894,40.74748539983136"
                },
                {
                    "ecoregion": "Divide and Plateau Creeks Uplands",
                    "bbox": "-108.30834411159145,39.12247602494864,-107.32574512823504,39.668265177695844"
                },
                {
                    "ecoregion": "Mosquito-Gore Range",
                    "bbox": "-106.4699373899985,38.897930816154314,-105.86513940735773,39.881371895896336"
                },
                {
                    "ecoregion": "Hardscabble-Red and White Mountains",
                    "bbox": "-107.26878355821458,39.34799204199919,-106.36316729293617,39.80497933093142"
                },
                {
                    "ecoregion": "Indian Peaks-Williams Mountains",
                    "bbox": "-106.30330527082157,39.420585716857374,-105.35918288997834,40.77465296106533"
                },
                {
                    "ecoregion": "Middle Park",
                    "bbox": "-106.6458240924079,39.65710490856475,-106.05634120268434,40.54574333698548"
                },
                {
                    "ecoregion": "Flat Tops",
                    "bbox": "-107.92489283863358,39.49665469675688,-107.0092040639164,40.34860187028016"
                },
                {
                    "ecoregion": "Grande Hogback",
                    "bbox": "-107.9871508282481,39.06965105485233,-107.07928472271175,40.12386122621467"
                }
            ],
            "Willamette National Forest": [
                {
                    "ecoregion": "West Cascade Slope Forest",
                    "bbox": "-123.24044457915397,43.16430782994246,-121.04511434115386,47.53592981291058"
                },
                {
                    "ecoregion": "Western Cascades Highland Forest",
                    "bbox": "-122.99084123913184,42.862939303406165,-121.04186360402207,47.40690022086858"
                },
                {
                    "ecoregion": "Cascade Crest Forest and Volcanic Peaks",
                    "bbox": "-122.23167682432597,43.351430882329396,-121.32923382588035,47.05299090100931"
                },
                {
                    "ecoregion": "Valley Foothills",
                    "bbox": "-123.68181861573652,43.602491894785146,-122.18614452325113,45.953719741672785"
                },
                {
                    "ecoregion": "Prairie Terraces and Floodplains",
                    "bbox": "-123.63255149405614,43.75785467595256,-122.34111517662404,45.65109523185953"
                },
                {
                    "ecoregion": "Southern Oregon Cascade Highlands",
                    "bbox": "-122.35395221102567,42.23823813228404,-121.88308967075164,43.402764726111286"
                }
            ],
        }

    }
);

