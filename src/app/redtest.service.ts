import { HttpClient, HttpEventType, HttpDownloadProgressEvent, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedtestService {
  private testFileUrl = 'https://gcccsarco.online/redtest/testfile.pdf';

  constructor(private http: HttpClient) {}

  measureSpeed(): Observable<{ speedBps: number; speedKbps: number; speedMbps: number; duration: number; bitsLoaded: number }> {
    const startTime = (new Date()).getTime();
    let bitsLoaded = 0;

    return this.http.get(this.testFileUrl, { reportProgress: true, observe: 'events', responseType: 'blob' }).pipe(
      filter((event: HttpEvent<Blob>) => event.type === HttpEventType.DownloadProgress),
      map(event => {
        if (event.type === HttpEventType.DownloadProgress) {
          const endTime = (new Date()).getTime();
          const duration = (endTime - startTime) / 1000; 
          bitsLoaded = event.loaded * 8; 

          const speedBps = Math.round(bitsLoaded / duration);
          const speedKbps = Math.round(speedBps / 1024)
          const speedMbps = Math.round(speedKbps / 1024)
          return { speedBps, speedKbps, speedMbps, duration, bitsLoaded };
        }
        return { speedBps: 0, speedKbps: 0, speedMbps: 0, duration: 0, bitsLoaded: 0 }; 
      })
    );
  }
}