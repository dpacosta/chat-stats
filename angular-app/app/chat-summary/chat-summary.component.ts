import {Component, OnInit} from '@angular/core';

import {ChatSummaryService} from './chat-summary.service';

@Component({
  selector: 'chat-summary',
  templateUrl: './chat-summary.component.html',
  providers: [ChatSummaryService]
})

export class ChatSummaryComponent implements OnInit {
  loading: boolean = false;
  view: any[] = [900, 300];
  fileToUpload: File;
  players: any[];
  topics: any[];

  constructor(private chatSummaryService: ChatSummaryService) {
  }

  ngOnInit() {
    this.loading = false;
    this.fileToUpload = undefined;
    this.players = undefined;
    this.topics = undefined;
  }

  populateGraphs(summary: Summary) {
    this.players = summary.players.map(data => ({name: 'Player ' + data.player, value: data.numberOfMessages}));
    this.topics = summary.topics.map(data => ({name: 'Topic ' + data.topic, value: data.numberOfOccurrences}));
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFile() {
    this.loading = true;
    this.chatSummaryService.processChatHistory(this.fileToUpload).then(data => {
      this.populateGraphs(data);
      this.loading = false;
    }, error => {
      this.loading = false;
      console.log(error);
    });
  }
}

interface Player {
  player: String,
  numberOfMessages: Number
}

interface Topic {
  topic: String,
  numberOfOccurrences: Number
}

interface Summary {
  players: Array<Player>,
  topics: Array<Topic>
}
