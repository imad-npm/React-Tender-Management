import { createServer, IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import { mockUsers, mockTenders, mockChatMessages, mockKPIData } from './mockData.ts'; // adjust path if needed

const PORT = 5000;

// Simple helper to send JSON
function sendJSON(res: ServerResponse, data: any, status = 200) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // enable CORS
  });
  res.end(JSON.stringify(data, null, 2));
}

// Simple router
const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const url = parse(req.url || '', true);
  const { pathname } = url;

  if (req.method === 'OPTIONS') {
    // Handle CORS preflight
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return res.end();
  }

  // Root
  if (pathname === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('🟢 In-memory mock API running!');
  }

  // Users
  if (pathname === '/api/users' && req.method === 'GET') {
    return sendJSON(res, mockUsers);
  }

  // Tenders
  if (pathname === '/api/tenders' && req.method === 'GET') {
    return sendJSON(res, mockTenders);
  }

  if (pathname?.startsWith('/api/tenders/') && req.method === 'GET') {
    const id = pathname.split('/').pop();
    const tender = mockTenders.find(t => t.id === id);
    if (!tender) return sendJSON(res, { message: 'Tender not found' }, 404);
    return sendJSON(res, tender);
  }

  // Chats
  if (pathname === '/api/chats' && req.method === 'GET') {
    return sendJSON(res, mockChatMessages);
  }

  if (pathname === '/api/chats' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const newMessage = JSON.parse(body);
        // Generate a simple unique ID and timestamp
        newMessage.id = (mockChatMessages.length + 1).toString();
        newMessage.timestamp = new Date().toISOString();
        mockChatMessages.push(newMessage);
        sendJSON(res, newMessage, 201);
      } catch (error) {
        sendJSON(res, { message: 'Invalid JSON' }, 400);
      }
    });
    return;
  }

  if (pathname?.startsWith('/api/chats/') && req.method === 'GET') {
    const tenderId = pathname.split('/').pop();
    const messages = mockChatMessages.filter(m => m.tenderId === tenderId);
    return sendJSON(res, messages);
  }
  if (pathname?.startsWith('/api/tenders/') && req.method === 'PUT') {
  const id = pathname.split('/').pop();
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const updateData = JSON.parse(body);
      const index = mockTenders.findIndex(t => t.id === id);

      if (index === -1) return sendJSON(res, { message: 'Tender not found' }, 404);

      // Merge update data
      mockTenders[index] = { ...mockTenders[index], ...updateData };
      sendJSON(res, mockTenders[index], 200);
    } catch (error) {
      sendJSON(res, { message: 'Invalid JSON' }, 400);
    }
  });
  return;
}


  // KPIs
  if (pathname === '/api/kpis' && req.method === 'GET') {
    return sendJSON(res, mockKPIData);
  }

  // Fallback 404
  sendJSON(res, { message: 'Not Found' }, 404);
});


// Start server
server.listen(PORT, () => {
  console.log(`✅ Mock API (no Express) running on http://localhost:${PORT}`);
});
