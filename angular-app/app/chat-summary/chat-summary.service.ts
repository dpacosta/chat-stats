import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ChatSummaryService {
  private apiPrefix = '/api';

  constructor(private httpClient: HttpClient) { }

  processChatHistory(fileToUpload: File): Promise<any> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, 'file');
    return this.httpClient.post(this.apiPrefix + '/chat-summary', formData)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
  }
}
