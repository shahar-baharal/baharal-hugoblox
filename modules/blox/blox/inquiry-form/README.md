# Inquiry Form block (Menashe Forge)

A request form (quote, booking, contact) whose fields are listed in the
block's `content`. It posts JSON to `/api/inquiry`, the site's Worker from
hugo-shared, which emails the owner one message laid out like the form:
setup, the request format and the email: `hugo-shared/README.md`, "Inquiry form".
Without that Worker, set `preview: true`.

## Usage

```yaml
- block: inquiry-form
  id: inquiry            # anchor for "#inquiry" links
  content:
    title: "Get a quote"           # optional
    subtitle: "…"                  # optional
    subject: "New quote request"   # email subject and heading; the visitor's name is appended
    fields:
      - label: "Full name"         # shown, and the email's label; the first field should be the name
        type: text                 # text | tel | email | date | number | select | textarea
        required: true
        width: half                # full (default) | half | third; also the email's cell width
      - label: "Phone"
        type: tel                  # in the email: call + WhatsApp links
        required: true
        width: half
      - label: "Trip type"
        type: select
        options: ["Round trip", "One way"]
      - label: "Adults"
        type: number
        default: 1                 # also: placeholder, min
        min: 1
        width: third
    # Optional overrides of the interface text (else i18n block_inquiry_form_*):
    # submit, sending, success, error, required_note, preview_note
    # preview: true              # submit disabled, "coming soon" note: before the Worker is set up
```

A field labeled with `type: email` becomes the email's reply-to. Content may
also come from `data/blocks/<ref>.yaml` with `ref:`.

## Notes

- One code path for both directions: `tel`/`email` inputs are `dir="ltr"` but
  align with the form's start edge (`rtl:text-right`).
- A hidden `botcheck` checkbox is the honeypot; the Worker drops submissions
  that tick it.
- Interface text: `i18n/{en,he}.yaml` (`block_inquiry_form_*`), English in the
  template as the last fallback.
