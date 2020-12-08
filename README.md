# Climate By Forest

This interactive graph shows modeled RCP 8.5 and RCP 4.5 data for forest ecoregions. This project is a fork of Climate By Location (a project for the NOAA Climate Program Office) for the US Forest Service.

## Methodology and sources
Forest climate data is selected by bounding box from the pre-gridded LOCA and Livneh datasets. This data is pre-reduced temporally to yearly or monthly values. Once the data is loaded it is reduced spatially to mean yearly or mean monthly values for the selected bounding box. For monthly/seasonal views the data is further reduced to show a given month across all years in the selected range of years.
 
* Downscaled modeled data: [LOCA](http://loca.ucsd.edu/).
* Historical observed data: [Livneh](https://www.esrl.noaa.gov/psd/data/gridded/data.livneh.metvars.html).
* Data services:  [Applied Climate Information System (ACIS)](http://www.rcc-acis.org/index.html).
 
 

      `hist_mod` for historical modeled data

      `proj_mod` for projected modeled data

      Note that not all presentations use all datasets, so there may be graphs
      that when `dataurls()` is called do not return an object with all three keys.

   3. `downloadImage` is a function that the contaiming application may call
      in its click-event-handling code for an `<a>` element, in order to modify that
      `<a>` element so that clicking on it will download the current canvas image.
      The `downloadImage` function takes two arguments.  The first argument
      should be the `<a>` element -- i.e. it should be the value of `this` inside
      the click-event-handler function for an `<a>` tag.  The second argument
      gives the name that will be used for the downloaded file.
      
      For example:

      ```javascript
      $('a#download-image-link-id').click(function() {
          // cwg is the object returned by the climate_widget.graph constructor
          cwg.downloadImage(this, 'nameOfDownloadedImage.png');
          // note that the 'this' argument is important as this function modifies
          // the <a> tag
      });
      ```
      
   4. `setXRange` is a function that will set the range of data visible on the
      graph's x-axis when an annual data graph is displayed (monthly and seasonal
      data graphs have fixed x-axes).  It takes two arguments, which are the
      desired minimum and maximum values for the axis.  `setXRange` returns either
      true or false, depending on whether the specified range is allowed according
      to whatever pan and/or zoom limits have been specified for the axis:  if
      the specified range is allowed, the axis is adjusted and true is returned;
      if the specified range is not allowed, the axis is unchanged and false is
      returned.
      
   5. `resize` is a function that will cause the graph to resize itself to fit
      the `<div>` that contains it; you can call this function to adjust the size
      of the graph if the `<div>` changes size after the graph has been displayed.
      `resize` takes no arguments; just call it like `cwg.resize()` and the
      graph will adjust to fit its container.

### `climate_widget.variables(FREQUENCY)`

The function `climate_widget.variables(FREQUENCY)` will return an
array giving the ids and the titles of all the climate variables for
the given frequency; FREQUENCY should be one of the strings "annual",
"monthly", or "seasonal".

## Examples

The following will create a graph in the div with id "widget", showing
annual average daily minimum temperature for Buncombe county NC, showing
the rcp85 scenario for the projection data:

```javascript
var cwg = climate_widget.graph({
    div        : "div#widget",
    dataprefix : "http://climate-widget-data.nemac.org/data",
    font       : "Roboto",
    frequency  : "annual",
    fips       : "37021",
    variable   : "tasmin",
    scenario   : "rcp85"
});
```

The following will modify the above graph to show both the rcp45 and rcp85
scenarios:

```javascript
cwg.update({
    scenario : "both"
});
```

The following will modify the above graph to show annual average daily precipitation:

```javascript
cwg.update({
    variable : "pr"
});
```

For a more complete example, see the files `demo.html` and `demo.js` in this
directory.
