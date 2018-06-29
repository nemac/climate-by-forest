import geopandas as gpd
import pandas as pd
import requests
import click


@click.command()
@click.option('--shapefile', prompt='Please point to associative shapefile',
              default='BoundaryShapefiles/Ecological Sub-sections/tx_subsection.shp',
              help='Original Shapefile Geometries.')
def find_bounding_box(shapefile):
    gdf = gpd.read_file(shapefile)
    gdf = gdf[~pd.isnull(gdf['FORESTNAME'])]
    x = gdf[gdf['MAP_UNIT_N'].duplicated(keep=False)].copy()
    x['ecoregion'] = x['MAP_UNIT_N'].str.cat(x['MAP_UNIT_S'], sep=" ")
    y = gdf[~gdf['MAP_UNIT_N'].duplicated(keep=False)].copy()
    y['ecoregion'] = y['MAP_UNIT_N']
    z = pd.concat([y, x])
    z['bbox'] = z['geometry'].apply(lambda a: str(a.bbox).replace(" ", "").replace("(", "").replace(")", ""))
    z[['bbox', 'ecoregion', 'FORESTNAME']].copy()
    z.groupby(by='FORESTNAME').apply(lambda b: b[['ecoregion', 'bbox']].sort_values(by='ecoregion').to_json(orient="records")).to_json('output.json', orient='index')
    # after this you'll have to un-escape the inner json arrays

if __name__ == '__main__':
    find_bounding_box()
