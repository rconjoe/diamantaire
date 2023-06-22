import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  if (req.headers.get('x-github-event') !== 'pull_request') {
    return NextResponse.error();
  }
  const body = await req.json();

  if (body.action === 'labeled' && body.label) {
    if (body.label.name === 'Ready For Review') {
      const { title, html_url, user } = body.pull_request;

      try {
        return fetch('https://hooks.slack.com/workflows/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', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: html_url,
            title: title,
            author: user.login,
          }),
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
    }
  }
}
