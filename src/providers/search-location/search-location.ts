import { Injectable } from '@angular/core';

declare var google: any;

@Injectable()
export class SearchLocationProvider {

  constructor() {
    console.log('Hello SearchLocationProvider Provider');
  }

  LocalizacaoCoordenadas(lat, lng): any {
    var local = new google.maps.Geocoder();
    return new Promise(function (resolve, reject) {
      local.geocode({'location': new google.maps.LatLng(lat, lng)}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          resolve(results[0]['formatted_address']);
        } else {
          reject(status);
        }
      })
    })
  }

  LocalizacaoEndereco(endereco): any {
    var local = new google.maps.Geocoder();
    return new Promise(function (resolve, reject) {
      local.geocode({'address': endereco}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          resolve(results);
        } else {
          reject(status);
        }
      });
    });
  }
}
