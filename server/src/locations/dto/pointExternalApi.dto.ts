import { ApiProperty } from '@nestjs/swagger';

class pointAddressExternalApi {
  @ApiProperty({ example: 'Berlin' })
  city: string;

  @ApiProperty({ example: 'Mitte' })
  city_district: string;

  @ApiProperty({ example: 'Unter den Linden' })
  construction: string;

  @ApiProperty({ example: 'European Union' })
  continent: string;

  @ApiProperty({ example: 'Deutschland' })
  country: string;

  @ApiProperty({ example: 'de' })
  country_code: string;

  @ApiProperty({ example: '1' })
  house_number: string;

  @ApiProperty({ example: 'Scheunenviertel' })
  neighbourhood: string;

  @ApiProperty({ example: '10117' })
  postcode: string;

  @ApiProperty({ example: 'Kommandantenhaus' })
  public_building: string;

  @ApiProperty({ example: 'Berlin' })
  state: string;

  @ApiProperty({ example: 'Mitte' })
  suburb: string;
}

export class pointExternalApi {
  @ApiProperty({ type: pointAddressExternalApi })
  address: pointAddressExternalApi;

  @ApiProperty({ type: [String] })
  boundingbox: [string];

  @ApiProperty({ example: 'amenity' })
  class: string;

  @ApiProperty({
    example:
      'Kommandantenhaus, 1, Unter den Linden, Scheunenviertel, Mitte, Berlin, 10117, Deutschland, European Union',
  })
  display_name: string;

  @ApiProperty({ example: 0.73606775332943 })
  importance: number;

  @ApiProperty({ example: '52.51719785' })
  lat: string;

  @ApiProperty({
    example:
      'Data © OpenStreetMap contributors, ODbL 1.0. https://www.openstreetmap.org/copyright',
  })
  licence: string;

  @ApiProperty({ example: '13.3978352028938' })
  lon: string;

  @ApiProperty({ example: '15976890' })
  osm_id: string;

  @ApiProperty({ example: 'way' })
  osm_type: string;

  @ApiProperty({ example: '30848715' })
  place_id: string;

  @ApiProperty({
    example:
      'M 13.397511 -52.517283599999999 L 13.397829400000001 -52.517299800000004 13.398131599999999 -52.517315099999998 13.398159400000001 -52.517112099999999 13.3975388 -52.517080700000001 Z',
  })
  svg: string;

  @ApiProperty({ example: 'public_building' })
  type: string;
}
