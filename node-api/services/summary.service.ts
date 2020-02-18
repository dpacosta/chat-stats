function buildSummary(messages) {
  let playersCount = new Map();
  let topicsCount = new Map();
  messages.forEach(message => {
    const playerString = String(message.player);
    let currentPlayerCount = playersCount.has(playerString) ? playersCount.get(playerString) : 0;
    playersCount.set(playerString, ++currentPlayerCount);
    message.topics.forEach(topicObject => {
      const topicString = String(topicObject.topic);
      let currentTopicCount = topicsCount.has(topicString) ? topicsCount.get(topicString) : 0;
      topicsCount.set(topicString, ++currentTopicCount);
    });
  });

  const totalNumberOfMessages = messages.length;
  const totalNumberOfTopicsOccurrences = Array.from(topicsCount.values()).reduce((a, b) => a + b, 0);
  let summary = {
    totalNumberOfMessages: totalNumberOfMessages,
    totalNumberOfPlayers: playersCount.size,
    totalNumberOfTopics: topicsCount.size,
    totalNumberOfTopicsOccurrences: totalNumberOfTopicsOccurrences,
    players: buildPlayersSummary(playersCount, totalNumberOfMessages),
    topics: buildTopicsSummary(topicsCount, totalNumberOfTopicsOccurrences)
  };

  return summary;
}

function buildPlayersSummary(playersCountMap, totalNumberOfMessages) {
  return Array.from(playersCountMap, ([key, value]) =>
    ({player: key, numberOfMessages: value, rate: parseFloat((value / totalNumberOfMessages).toFixed(4))}))
    .sort((a, b) => b.numberOfMessages - a.numberOfMessages);
}

function buildTopicsSummary(topicsCountMap, totalNumberOfTopicsOccurrences) {
  return Array.from(topicsCountMap, ([key, value]) =>
    ({topic: key, numberOfOccurrences: value, rate: parseFloat((value / totalNumberOfTopicsOccurrences).toFixed(4))}))
    .sort((a, b) => b.numberOfOccurrences - a.numberOfOccurrences);
}

module.exports  = {
  buildSummary,
  buildPlayersSummary,
  buildTopicsSummary
}
