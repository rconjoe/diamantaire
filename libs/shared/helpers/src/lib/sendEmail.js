const mandrill = require('mandrill-api/mandrill');
const getEnvConfig = require('../env');
const { MANDRILL_API_KEY } = getEnvConfig();
const mandrillClient = new mandrill.Mandrill(MANDRILL_API_KEY);

/**
 * This helper method sends a plain text email.
 *
 * This should only be used for important internal notifications,
 * such as critical error reports.
 *
 * See https://mandrillapp.com/api/docs/messages.nodejs.html#method=send
 *
 * You should never use this to send an email to a customer, however,
 * this could be extended to send templated emails.
 * See https://mandrillapp.com/api/docs/messages.nodejs.html#method=send-template
 */
export default function sendEmail(
  toAddress,
  subject,
  messageText,
  messageHtml = null
) {
  // if there's no Mandrill API key (as on staging and development), then return rather than failing below.
  if (!MANDRILL_API_KEY) {
    return;
  }

  if (!messageHtml) {
    messageHtml = `<p>${messageText}</p>`;
  }

  var message = {
    html: messageHtml,
    text: messageText,
    subject: `[${process.env.DEPLOYMENT_ENV || 'development'}] ${subject}`,
    from_email: 'no-reply@diamondfoundry.com',
    from_name: 'No Reply',
    to: [
      {
        email: toAddress,
        type: 'to',
      },
    ],
    headers: {
      'Reply-To': 'evan@diamondfoundry.com',
    },
    important: false,
    track_opens: null,
    track_clicks: null,
    auto_text: null,
    auto_html: null,
    inline_css: null,
    url_strip_qs: null,
    preserve_recipients: null,
    view_content_link: null,
    bcc_address: null,
    tracking_domain: null,
    signing_domain: null,
    return_path_domain: null,
    merge: false,
    merge_language: 'mailchimp',
    global_merge_vars: [],
    merge_vars: [],
    tags: [],
    metadata: {},
    recipient_metadata: [],
    attachments: [],
    images: [],
  };

  mandrillClient.messages.send(
    { message: message, async: false, ip_pool: 'Main Pool', send_at: null },
    function() {},
    function(e) {
      // eslint-disable-next-line no-console
      console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    }
  );
}
