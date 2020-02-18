import {expect} from 'chai';

const summaryService = require('./summary.service.ts');

describe('Summary Service Tests', () => {
  it('buildPlayersSummary should descending sort players\' summary by number of messages', () => {
    const numberOfMessages = 6;
    const playersCountMap = new Map([['1', 1], ['2', 2], ['3', 3]]);

    expect(summaryService.buildPlayersSummary(playersCountMap, numberOfMessages)).to.deep.equal([
      {
        numberOfMessages: 3,
        player: '3',
        rate: 0.50,
      },
      {
        numberOfMessages: 2,
        player: '2',
        rate: 0.3333,
      },
      {
        numberOfMessages: 1,
        player: '1',
        rate: 0.1667,
      }
    ]);
  });

  it('buildTopicsSummary should descending sort topics\' summary by number of messages', () => {
    const totalNumberOfTopicsOccurrences = 6;
    const topicsCountMap = new Map([['1', 1], ['2', 2], ['3', 3]]);

    expect(summaryService.buildTopicsSummary(topicsCountMap, totalNumberOfTopicsOccurrences)).to.deep.equal([
      {
        numberOfOccurrences: 3,
        topic: '3',
        rate: 0.50,
      },
      {
        numberOfOccurrences: 2,
        topic: '2',
        rate: 0.3333,
      },
      {
        numberOfOccurrences: 1,
        topic: '1',
        rate: 0.1667,
      }
    ]);
  });

  it('buildSummary should return proper summary', () => {
    const message1 = {
      count: 0, text: 'it was photo day argh', topics: [{topic: 0, relevance: 64, confidence: 224},
        {topic: 1, relevance: 0, confidence: 224}, {topic: 3, relevance: 64, confidence: 224}, {topic: 4, relevance: 64, confidence: 224},
        {topic: 10, relevance: 0, confidence: 224}, {topic: 12, relevance: 0, confidence: 224}], player: '1', flags: 0, client_id: 999,
      filtered: 0, simplified: 'it was photo day argh'
    };
    const message2 = JSON.parse(JSON.stringify(message1));
    message2.player = '2';
    expect(summaryService.buildSummary([message1, message2])).to.deep.equal({
      players: [
        {
          numberOfMessages: 1,
          player: '1',
          rate: 0.50,
        },
        {
          numberOfMessages: 1,
          player: '2',
          rate: 0.50,
        }
      ],
      topics: [
        {
          numberOfOccurrences: 2,
          rate: 0.1667,
          topic: '0',
        },
        {
          numberOfOccurrences: 2,
          rate: 0.1667,
          topic: '1',
        },
        {
          numberOfOccurrences: 2,
          rate: 0.1667,
          topic: '3',
        },
        {
          numberOfOccurrences: 2,
          rate: 0.1667,
          topic: '4',
        },
        {
          numberOfOccurrences: 2,
          rate: 0.1667,
          topic: '10',
        },
        {
          numberOfOccurrences: 2,
          rate: 0.1667,
          topic: '12',
        }
      ],
      totalNumberOfMessages: 2,
      totalNumberOfPlayers: 2,
      totalNumberOfTopics: 6,
      totalNumberOfTopicsOccurrences: 12,
    });
  });
});
