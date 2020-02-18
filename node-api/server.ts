const express = require('express');
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});
const jsonLines = require('jsonlines');
const concat = require('concat-stream');
const summaryService = require('./services/summary.service.ts');
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, '/../dist/chat-stats')));

const server = app.listen(process.env.PORT || 8080, () => {
  const port = server.address().port;
  console.log('App now running on port', port);
});

app.post('/api/chat-summary', upload.single('file'), function(req, res) {
  handleChatSummaryPostRequest(req, res);
});

function handleChatSummaryPostRequest(req, res) {
  const parser = jsonLines.parse();
  const file = req.file;
  validateFile(res, file);
  parser.pipe(concat({encoding: 'object'}, function(result) {
    try {
      res.status(200).send(summaryService.buildSummary(result));
    } catch (err) {
      handleError(res, err.message, 'Failed to get summary.', 500);
    }
  }));
  parser.write(file.buffer.toString('utf-8'));
  parser.end();
}

function handleError(res, reason, message, code) {
  console.log('ERROR: ' + reason);
  res.status(code || 500).send({error: message});
}

function validateFile(res, file) {
  if (!file) {
    handleError(res, 'File is absent.', 'Please upload a file', 400);
  }
}
