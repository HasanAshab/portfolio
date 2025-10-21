import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    // Simple token validation (using same token as analytics)
    const ADMIN_TOKEN = process.env.ANALYTICS_ADMIN_TOKEN;
    
    if (!token || token !== ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Validate and normalize Google Docs URL
    if (!url.includes('docs.google.com/document')) {
      return NextResponse.json({ 
        error: 'Please provide a valid Google Docs URL (must contain docs.google.com/document)' 
      }, { status: 400 });
    }

    // Extract document ID from various Google Docs URL formats
    let docId = '';
    const docIdPatterns = [
      /\/document\/d\/([a-zA-Z0-9-_]+)/,
      /\/document\/u\/\d+\/d\/([a-zA-Z0-9-_]+)/,
      /id=([a-zA-Z0-9-_]+)/
    ];
    
    for (const pattern of docIdPatterns) {
      const match = url.match(pattern);
      if (match) {
        docId = match[1];
        break;
      }
    }
    
    if (!docId) {
      return NextResponse.json({ 
        error: 'Could not extract document ID from URL. Please check the URL format.' 
      }, { status: 400 });
    }

    const pdfUrl = `https://docs.google.com/document/d/${docId}/export?format=pdf`;
    
    // Download the PDF
    const response = await fetch(pdfUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });    

    if (!response.ok) {
      let errorMessage = 'Failed to download PDF. ';
      if (response.status === 403) {
        errorMessage += 'The document is not publicly accessible. Please share it with "Anyone with the link can view" permissions.';
      } else if (response.status === 404) {
        errorMessage += 'Document not found. Please check the URL.';
      } else {
        errorMessage += `Server returned status ${response.status}.`;
      }
      
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const pdfBuffer = await response.arrayBuffer();
    
    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (pdfBuffer.byteLength > maxSize) {
      return NextResponse.json({ 
        error: 'PDF file is too large (max 10MB allowed)' 
      }, { status: 400 });
    }

    if (pdfBuffer.byteLength === 0) {
      return NextResponse.json({ 
        error: 'Downloaded file is empty. Please check the document permissions.' 
      }, { status: 400 });
    }
    
    // Save to public/resume.pdf
    const publicPath = join(process.cwd(), 'public', 'resume.pdf');
    await writeFile(publicPath, Buffer.from(pdfBuffer));
    
    return NextResponse.json({ 
      success: true, 
      message: 'Resume downloaded successfully',
      path: '/resume.pdf'
    });

  } catch (error) {
    console.error('Resume download error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}