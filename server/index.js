const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/company-website', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 路由
app.use('/api/packages', require('./routes/packages'));
app.use('/api/agent', require('./routes/agent'));
app.use('/api/gallery', require('./routes/gallery'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 