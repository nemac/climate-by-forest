import geopandas as gpd
import requests
import click


@click.command()
@click.option('--shapefile', prompt='Please point to associative shapefile',
              default='BoundaryShapefiles/Ecological Sub-sections/tx_subsection.shp',
              help='Original Shapefile Geometries.')
def find_bounding_box(shapefile):
    gdf = gpd.read_file(shapefile)
    with open("output.txt", 'w') as file:
        for index, row in gdf.iterrows():
            foo = f'{row["geometry"].bounds}'.replace(" ", "")
            file.write(f'<option value = "{foo}"> {row["MAP_UNIT_N"]}</option>\n')


if __name__ == '__main__':
    find_bounding_box()
